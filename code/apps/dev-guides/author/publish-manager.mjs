import { createHash, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { isIP } from 'node:net';
import { chmod, copyFile, lstat, mkdir, readFile, readdir, readlink, realpath, rename, rm, symlink, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';

const INPUTS = ['src', 'public', 'scripts', 'templates', 'astro.config.mjs', 'package.json', 'tsconfig.json'];
const REQUIRED = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'search-index.json'];
const EXTENSIONS = /\.(?:html|css|js|json|xml|txt|svg|png|jpe?g|webp|ico|woff2?)$/i;
const RELEASE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/;
const MAX_FILES = 10000;
const MAX_BYTES = 512 * 1024 * 1024;
const hash = (value) => createHash('sha256').update(value).digest('hex');
const now = () => new Date().toISOString();
const failure = (message, status = 409) => Object.assign(new Error(message), { status });

async function info(path) {
  try { return await lstat(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function directory(path, mode = 0o700) {
  await mkdir(path, { recursive: true, mode });
  if (!(await lstat(path)).isDirectory()) throw failure('发布目录不安全', 500);
}

async function atomicJson(path, value) {
  const temp = `${path}.${randomUUID()}.tmp`;
  try {
    await writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
    await rename(temp, path);
  } finally { await unlink(temp).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
}

async function tree(root, prefix = '') {
  const rootInfo = await info(root);
  if (!rootInfo) return [];
  if (!rootInfo.isDirectory()) throw failure('源码目录不安全', 500);
  const files = [];
  async function walk(path, name) {
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) throw failure('源码或产物中包含不允许的链接', 422);
    if (stat.isDirectory()) {
      for (const entry of (await readdir(path)).sort()) await walk(join(path, entry), name ? `${name}/${entry}` : entry);
    } else if (stat.isFile()) {
      files.push({ path, name, size: stat.size });
      if (files.length > MAX_FILES || files.reduce((sum, item) => sum + item.size, 0) > MAX_BYTES) throw failure('发布文件超过容量限制', 422);
    } else throw failure('源码或产物包含非普通文件', 422);
  }
  for (const entry of (await readdir(root)).sort()) await walk(join(root, entry), prefix ? `${prefix}/${entry}` : entry);
  return files;
}

async function inputs(projectRoot, contentRoot) {
  const result = [];
  for (const name of INPUTS) {
    const path = join(projectRoot, name);
    const stat = await info(path);
    if (!stat) {
      if (['public', 'templates'].includes(name)) continue;
      throw failure('发布源码不完整', 500);
    }
    if (stat.isDirectory()) {
      // Content is supplied by the persistent writer store, never a bundled older copy.
      if (name === 'src') {
        async function walkSrc(root, prefix) {
          for (const entry of (await readdir(root)).sort()) {
            const child = join(root, entry), childName = `${prefix}/${entry}`;
            if (childName === 'src/content/tutorials') continue;
            const childInfo = await lstat(child);
            if (childInfo.isDirectory()) await walkSrc(child, childName);
            else if (childInfo.isFile()) result.push({ path: child, name: childName, size: childInfo.size });
            else throw failure('源码中包含不允许的链接或文件', 422);
          }
        }
        await walkSrc(path, name);
      } else result.push(...await tree(path, name));
    } else if (stat.isFile()) result.push({ path, name, size: stat.size });
    else throw failure('源码中包含不允许的链接或文件', 422);
  }
  if (!(await info(contentRoot))?.isDirectory()) throw failure('教程内容目录不可用', 500);
  result.push(...await tree(contentRoot, 'src/content/tutorials'));
  if (result.length > MAX_FILES || result.reduce((sum, item) => sum + item.size, 0) > MAX_BYTES) throw failure('发布源码超过容量限制', 422);
  return result.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

async function sourceSnapshot(projectRoot, contentRoot, destination) {
  const digest = createHash('sha256');
  for (const item of await inputs(projectRoot, contentRoot)) {
    const bytes = await readFile(item.path);
    digest.update(`${item.name}\0${bytes.length}\0`).update(bytes).update('\0');
    if (destination) {
      const target = join(destination, item.name);
      await mkdir(dirname(target), { recursive: true, mode: 0o700 });
      await writeFile(target, bytes, { flag: 'wx', mode: 0o600 });
    }
  }
  // Lockfile changes are part of the tested revision even though the snapshot uses installed dependencies.
  for (const path of [resolve(projectRoot, '../../pnpm-lock.yaml'), resolve(projectRoot, '../../pnpm-workspace.yaml')]) {
    const stat = await info(path);
    if (stat && !stat.isFile()) throw failure('依赖锁定文件不安全', 500);
    if (stat) digest.update(`${relative(projectRoot, path)}\0`).update(await readFile(path)).update('\0');
  }
  return digest.digest('hex');
}

function profileOf(environment, profile) {
  if (!profile || typeof profile.root !== 'string') throw new Error('A release root is required for each environment');
  const origin = new URL(profile.site);
  if (origin.protocol !== 'https:' || origin.origin !== profile.site || origin.username || origin.password) throw new Error('Publish site must be a trusted HTTPS origin');
  const expectedDomain = environment === 'staging' ? 'test-dev.herong.info' : 'dev.herong.info';
  const ip = isIP(origin.hostname) !== 0;
  const basePath = ip ? (environment === 'staging' ? '/test-dev/' : '/dev/') : '/';
  if ((!ip && origin.hostname !== expectedDomain) || profile.basePath !== basePath || origin.port) throw new Error('Publish origin/base does not match its environment');
  return { root: resolve(profile.root), site: profile.site, basePath, preview: ip || environment === 'staging' };
}

async function defaultBuild({ snapshotRoot, environment, profile, pnpmCommand, buildEnv, onPhase }) {
  const env = {};
  for (const key of ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL']) if (process.env[key]) env[key] = process.env[key];
  env.CI = 'true';
  env.ASTRO_TELEMETRY_DISABLED = '1';
  env.PUBLIC_SITE_URL = profile.site;
  env.PUBLIC_BASE_PATH = profile.basePath;
  env.PUBLIC_DEPLOY_ENV = environment;
  if (buildEnv.MEDIA_PUBLIC_BASE_URL) env.MEDIA_PUBLIC_BASE_URL = buildEnv.MEDIA_PUBLIC_BASE_URL;
  async function command(script) {
    await new Promise((done, reject) => {
      const child = spawn(pnpmCommand, ['run', script], { cwd: snapshotRoot, env, stdio: ['ignore', 'pipe', 'pipe'], shell: false });
      // Consume output without retaining article text, commands or environment values in API-visible status.
      child.stdout.resume(); child.stderr.resume();
      const timer = setTimeout(() => { child.kill('SIGTERM'); }, 10 * 60 * 1000);
      child.once('error', () => { clearTimeout(timer); reject(failure('发布运行环境不可用，请联系维护者', 503)); });
      child.once('exit', (code) => {
        clearTimeout(timer);
        if (code === 0) done();
        else reject(failure(script === 'check' ? '内容检查未通过，请检查文章字段和实测信息后重试' : '构建未通过，请检查文章正文、图片和发布信息后重试', 422));
      });
    });
  }
  await onPhase('checking'); await command('check');
  await onPhase('building'); await command('build');
}

async function artifactManifest(dist, profile) {
  if (!(await info(dist))?.isDirectory()) throw failure('构建没有生成静态网页', 422);
  const files = [];
  for (const item of await tree(dist)) {
    if (item.name.split('/').some((part) => part.startsWith('.') || ['author', 'drafts', 'node_modules'].includes(part)) || !EXTENSIONS.test(item.name)) throw failure('构建包含不应公开的文件', 422);
    const bytes = await readFile(item.path);
    if (bytes.includes('MEDIA_S3_SECRET_ACCESS_KEY=') || bytes.includes('MEDIA_S3_ACCESS_KEY_ID=')) throw failure('构建含有私有配置，已停止发布', 422);
    if (item.name.endsWith('.html')) {
      const html = bytes.toString('utf8');
      const tags = html.match(/<(?:meta|link)\b[^>]*>/gi) ?? [];
      for (const tag of tags) {
        if (/\brel\s*=\s*["']canonical["']/i.test(tag)) {
          const href = /\bhref\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1];
          if (!href?.startsWith(profile.site + profile.basePath)) throw failure('页面地址与发布环境不一致', 422);
        }
      }
      if (profile.preview) {
        const tag = tags.find((item) => /\bname\s*=\s*["']robots["']/i.test(item));
        const robots = /\bcontent\s*=\s*["']([^"']*)["']/i.exec(tag ?? '')?.[1]?.toLowerCase().split(',').map((s) => s.trim()) ?? [];
        if (!['noindex', 'nofollow', 'noarchive'].every((value) => robots.includes(value))) throw failure('预览页面缺少禁止索引配置', 422);
      }
    }
    files.push({ path: item.name, sha256: hash(bytes), size: bytes.length });
  }
  if (!REQUIRED.every((name) => files.some((item) => item.path === name))) throw failure('构建缺少必要页面', 422);
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  if (profile.preview && !/^Disallow:\s*\/\s*$/im.test(robots)) throw failure('预览站点未禁止抓取', 422);
  return { version: 1, files };
}

async function publicDirectory(path, root) {
  const suffix = relative(root, path);
  if (suffix.startsWith('..') || suffix.startsWith('/')) throw failure('发布目录超出允许范围', 500);
  let current = root;
  await directory(current, 0o755);
  await chmod(current, 0o755);
  for (const part of suffix.split('/').filter(Boolean)) {
    current = join(current, part);
    await directory(current, 0o755);
    await chmod(current, 0o755);
  }
}

async function currentRelease(root) {
  const path = join(root, 'current'), stat = await info(path);
  if (!stat) return null;
  if (!stat.isSymbolicLink()) throw failure('当前版本入口不安全', 500);
  const target = await realpath(path);
  if (dirname(target) !== await realpath(join(root, 'releases')) || !RELEASE.test(target.split('/').at(-1))) throw failure('当前版本超出发布目录', 500);
  return resolve(root, await readlink(path));
}

async function switchLink(root, name, target) {
  const path = join(root, `${name}.${randomUUID()}.next`);
  try { await symlink(target, path); await rename(path, join(root, name)); }
  finally { await unlink(path).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
}

async function install(snapshotRoot, environment, profile, manifest, fingerprint, job) {
  await publicDirectory(profile.root, profile.root);
  await publicDirectory(join(profile.root, 'releases'), profile.root);
  await publicDirectory(join(profile.root, 'shared'), profile.root);
  await publicDirectory(join(profile.root, 'shared/_astro'), profile.root);
  const release = `${now().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}-${randomUUID().slice(0, 8)}`;
  const releasePath = join(profile.root, 'releases', release);
  await mkdir(releasePath, { mode: 0o755 });
  await chmod(releasePath, 0o755);
  const manifestBytes = `${JSON.stringify(manifest, null, 2)}\n`;
  const metadata = { release, environment, site: profile.site, base_path: profile.basePath, public_url: profile.site + profile.basePath, preview: profile.preview, manifest_sha256: hash(manifestBytes), built_at_utc: now(), source_fingerprint: fingerprint, author_job: job.id };
  for (const item of manifest.files) {
    const source = join(snapshotRoot, 'dist', item.path), target = join(releasePath, 'web', item.path);
    await publicDirectory(dirname(target), profile.root);
    await copyFile(source, target); await chmod(target, 0o644);
    if (hash(await readFile(target)) !== item.sha256) throw failure('发布文件校验失败', 500);
    if (item.path.startsWith('_astro/')) {
      const shared = join(profile.root, 'shared', item.path);
      await publicDirectory(dirname(shared), profile.root);
      const previous = await info(shared);
      if (previous) {
        if (!previous.isFile() || hash(await readFile(shared)) !== item.sha256) throw failure('静态资源缓存冲突，已停止发布', 500);
      } else { await copyFile(source, shared); await chmod(shared, 0o644); }
    }
  }
  await writeFile(join(releasePath, 'manifest.json'), manifestBytes, { mode: 0o644, flag: 'wx' });
  await writeFile(join(releasePath, 'release.json'), `${JSON.stringify(metadata, null, 2)}\n`, { mode: 0o644, flag: 'wx' });
  const previous = await currentRelease(profile.root);
  if (previous) await switchLink(profile.root, 'previous', previous);
  await switchLink(profile.root, 'current', releasePath);
  const result = { status: 'activated', environment, release, previous: previous?.split('/').at(-1) ?? null, at_utc: now(), source_fingerprint: fingerprint };
  await atomicJson(join(profile.root, 'last-deployment.json'), result);
  return { release, atUtc: result.at_utc, url: metadata.public_url, sourceFingerprint: fingerprint, previous: result.previous };
}

/** Fixed-environment publisher. Never pass request-controlled paths, commands or env here. */
export async function createPublishManager({ projectRoot, contentRoot = join(projectRoot, 'src/content/tutorials'), stateRoot, profiles, pnpmCommand = 'pnpm', buildEnv = {}, runBuild = defaultBuild }) {
  if (!stateRoot) throw new Error('A private publisher state directory is required');
  projectRoot = resolve(projectRoot); contentRoot = resolve(contentRoot); stateRoot = resolve(stateRoot);
  const trustedProfiles = Object.fromEntries(['staging', 'production'].map((key) => [key, profileOf(key, profiles?.[key])]));
  if (trustedProfiles.staging.root === trustedProfiles.production.root) throw new Error('Release directories must be isolated');
  await directory(stateRoot);
  const statePath = join(stateRoot, 'state.json');
  let persisted;
  try {
    if (!(await lstat(statePath)).isFile()) throw new Error('Unsafe publisher state');
    persisted = JSON.parse(await readFile(statePath, 'utf8'));
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  let state = { enabled: true, active: null, lastJob: persisted?.lastJob ?? null, environments: { staging: persisted?.environments?.staging ?? null, production: persisted?.environments?.production ?? null } };
  if (persisted?.active) state.lastJob = { ...persisted.active, status: 'failed', finishedAt: now(), error: '上次发布因服务重启中断，请重新发布预览' };
  let work = Promise.resolve();
  async function save() { await atomicJson(statePath, state); }
  async function execute(job) {
    const snapshotRoot = join(stateRoot, 'work', job.id);
    try {
      await directory(snapshotRoot);
      const fingerprint = await sourceSnapshot(projectRoot, contentRoot, snapshotRoot);
      const stagingReceipt = state.environments.staging;
      const stagingUrl = trustedProfiles.staging.site + trustedProfiles.staging.basePath;
      if (job.environment === 'production' && (stagingReceipt?.sourceFingerprint !== fingerprint || stagingReceipt?.url !== stagingUrl)) {
        throw failure('内容或发布地址已更新，请先发布测试环境并检查效果，再发布正式环境');
      }
      const nodeModules = join(projectRoot, 'node_modules');
      if (!await info(nodeModules)) throw failure('发布依赖尚未准备好', 503);
      // Astro and Vite put caches under node_modules. Keep that directory local
      // to the writable snapshot while linking only immutable installed packages.
      const snapshotModules = join(snapshotRoot, 'node_modules');
      await mkdir(snapshotModules, { mode: 0o700 });
      for (const entry of await readdir(nodeModules)) {
        if (/^\.(?:astro|vite|cache)(?:$|[-.])/.test(entry)) continue;
        await symlink(join(nodeModules, entry), join(snapshotModules, entry));
      }
      const profile = trustedProfiles[job.environment];
      const onPhase = async (status) => { job.status = status; await save(); };
      await runBuild({ snapshotRoot, environment: job.environment, profile, pnpmCommand, buildEnv, onPhase });
      await onPhase('verifying');
      const manifest = await artifactManifest(join(snapshotRoot, 'dist'), profile);
      if (await sourceSnapshot(projectRoot, contentRoot) !== fingerprint) throw failure('内容在发布期间被修改，请保存后重新发布测试环境');
      await onPhase('activating');
      const release = await install(snapshotRoot, job.environment, profile, manifest, fingerprint, job);
      state.environments[job.environment] = release;
      Object.assign(job, { status: 'succeeded', finishedAt: now(), release: release.release, url: release.url });
    } catch (error) {
      Object.assign(job, { status: 'failed', finishedAt: now(), error: error.status ? error.message : '发布失败，现有线上版本保持可用，请联系维护者' });
    } finally {
      state.active = null; state.lastJob = job;
      await save();
      await rm(snapshotRoot, { recursive: true, force: true });
    }
  }
  await save();
  return {
    getStatus() { return structuredClone(state); },
    async start(environment) {
      if (!['staging', 'production'].includes(environment)) throw failure('请选择测试环境或正式环境', 400);
      if (state.active) throw failure('已有发布正在进行，请稍候');
      const job = { id: randomUUID(), environment, status: 'queued', createdAt: now() };
      state.active = job;
      try { await save(); } catch (error) { state.active = null; throw error; }
      work = execute(job);
      // Handle storage failures without an unhandled rejection; waitForIdle still reports them.
      work.catch(() => {});
      return structuredClone(job);
    },
    async waitForIdle() { await work; },
  };
}
