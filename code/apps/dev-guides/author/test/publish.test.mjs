import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, readlink, symlink, stat, lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createPublishManager } from '../publish-manager.mjs';
import { createPublishProfiles } from '../publish-profiles.mjs';

async function fixture(t, options = {}) {
  const root = await mkdtemp(join(tmpdir(), 'guides-publish-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const projectRoot = join(root, 'code/apps/dev-guides');
  const contentRoot = join(root, 'persistent/content');
  for (const name of ['src/content/tutorials', 'public', 'scripts', 'templates', 'node_modules']) await mkdir(join(projectRoot, name), { recursive: true });
  await mkdir(contentRoot, { recursive: true });
  for (const name of ['astro.config.mjs', 'package.json', 'tsconfig.json']) await writeFile(join(projectRoot, name), '{}');
  await writeFile(join(projectRoot, 'src/content/tutorials/bundled-stale.md'), 'must not be copied');
  await writeFile(join(projectRoot, '.env.media.local'), 'MEDIA_S3_SECRET_ACCESS_KEY=PRIVATE_TEST_MARKER');
  await writeFile(join(projectRoot, 'templates/tutorial.md'), 'template-v1');
  await writeFile(join(contentRoot, 'first.md'), 'persistent-v1');
  await writeFile(join(root, 'code/pnpm-lock.yaml'), 'lockfile-v1');
  const profiles = {
    staging: { root: join(root, 'web-staging'), site: 'https://101.96.210.172', basePath: '/test-dev/' },
    production: { root: join(root, 'web-production'), site: 'https://101.96.210.172', basePath: '/dev/' },
  };
  const managerOptions = { projectRoot, contentRoot, stateRoot: join(root, 'state'), profiles, runBuild: fakeBuild, ...options };
  return { root, projectRoot, contentRoot, profiles, managerOptions, manager: await createPublishManager(managerOptions) };
}

async function fakeBuild({ snapshotRoot, profile, onPhase }) {
  await onPhase('checking');
  assert.equal((await lstat(join(snapshotRoot, 'node_modules'))).isDirectory(), true);
  await mkdir(join(snapshotRoot, 'node_modules/.astro'), { recursive: true });
  await writeFile(join(snapshotRoot, 'node_modules/.astro/cache-test'), 'snapshot only');
  assert.equal(await readFile(join(snapshotRoot, 'src/content/tutorials/first.md'), 'utf8').then((x) => x.startsWith('persistent-')), true);
  await assert.rejects(readFile(join(snapshotRoot, 'src/content/tutorials/bundled-stale.md')), { code: 'ENOENT' });
  await assert.rejects(readFile(join(snapshotRoot, '.env.media.local')), { code: 'ENOENT' });
  await onPhase('building');
  await writeArtifacts(snapshotRoot, profile);
}

async function writeArtifacts(snapshotRoot, profile) {
  const dist = join(snapshotRoot, 'dist');
  await mkdir(join(dist, '_astro'), { recursive: true });
  const html = `<html><head><meta name="robots" content="noindex, nofollow, noarchive"><link rel="canonical" href="${profile.site}${profile.basePath}"></head><body>Example</body></html>`;
  for (const name of ['index.html', '404.html']) await writeFile(join(dist, name), html);
  await writeFile(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  await writeFile(join(dist, 'sitemap.xml'), '<urlset/>');
  await writeFile(join(dist, 'search-index.json'), '[]');
  await writeFile(join(dist, '_astro', 'app.123.js'), 'console.log("ready")');
}

async function publish(manager, environment) {
  await manager.start(environment);
  await manager.waitForIdle();
  return manager.getStatus().lastJob;
}

test('production requires the same successful staging snapshot; persistent source wins over bundled content', async (t) => {
  const f = await fixture(t);
  assert.equal((await publish(f.manager, 'production')).status, 'failed');
  await assert.rejects(readlink(join(f.profiles.production.root, 'current')), { code: 'ENOENT' });
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  assert.equal((await publish(f.manager, 'production')).status, 'succeeded');
  const state = f.manager.getStatus();
  assert.equal(state.environments.staging.sourceFingerprint, state.environments.production.sourceFingerprint);
  assert.notEqual(await readlink(join(f.profiles.staging.root, 'current')), await readlink(join(f.profiles.production.root, 'current')));
  const web = join(await readlink(join(f.profiles.production.root, 'current')), 'web');
  assert.match(await readFile(join(web, 'index.html'), 'utf8'), /https:\/\/101\.96\.210\.172\/dev\//);
  assert.equal(await readFile(join(f.profiles.production.root, 'shared/_astro/app.123.js'), 'utf8'), 'console.log("ready")');
});

test('changed article, template, or lockfile invalidates the staging receipt across restarts', async (t) => {
  const f = await fixture(t);
  await publish(f.manager, 'staging');
  for (const [path, content] of [
    [join(f.contentRoot, 'first.md'), 'persistent-v2'],
    [join(f.projectRoot, 'templates/tutorial.md'), 'template-v2'],
    [join(f.root, 'code/pnpm-lock.yaml'), 'lockfile-v2'],
  ]) {
    await writeFile(path, content);
    const manager = await createPublishManager(f.managerOptions);
    assert.match((await publish(manager, 'production')).error, /先发布测试环境/);
    assert.equal((await publish(manager, 'staging')).status, 'succeeded');
  }
});

test('switching to domains requires a new staging publication and uses isolated canonical URLs', async (t) => {
  const f = await fixture(t);
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  const domains = createPublishProfiles({ target: 'domains', authorOrigin: 'https://101.96.210.172' });
  // Keep the real server's directory separation, with temporary roots for this test.
  for (const name of ['staging', 'production']) domains[name].root = f.profiles[name].root;
  const manager = await createPublishManager({ ...f.managerOptions, profiles: domains });
  assert.match((await publish(manager, 'production')).error, /先发布测试环境/);
  await assert.rejects(readlink(join(domains.production.root, 'current')), { code: 'ENOENT' });
  assert.equal((await publish(manager, 'staging')).status, 'succeeded');
  assert.equal((await publish(manager, 'production')).status, 'succeeded');
  for (const name of ['staging', 'production']) {
    const release = await readlink(join(domains[name].root, 'current'));
    const metadata = JSON.parse(await readFile(join(release, 'release.json'), 'utf8'));
    assert.equal(metadata.public_url, domains[name].site + '/');
    assert.equal(metadata.base_path, '/');
    assert.equal(metadata.preview, name === 'staging');
    const html = await readFile(join(release, 'web/index.html'), 'utf8');
    assert.ok(html.includes(`href="${domains[name].site}/"`));
    assert.doesNotMatch(html, /101\.96\.210\.172/);
  }
});

test('domain profile swaps and staging pages missing noindex are rejected', async (t) => {
  const f = await fixture(t);
  const domains = createPublishProfiles({ target: 'domains', authorOrigin: 'https://101.96.210.172' });
  for (const name of ['staging', 'production']) domains[name].root = f.profiles[name].root;
  await assert.rejects(createPublishManager({ ...f.managerOptions, profiles: { staging: domains.production, production: domains.staging } }), /origin\/base/);
  const manager = await createPublishManager({
    ...f.managerOptions,
    profiles: domains,
    runBuild: async (args) => {
      await fakeBuild(args);
      await writeFile(join(args.snapshotRoot, 'dist/index.html'), `<link rel="canonical" href="${args.profile.site}/"><meta name="robots" content="index, follow">`);
    },
  });
  assert.match((await publish(manager, 'staging')).error, /禁止索引/);
  await assert.rejects(readlink(join(domains.staging.root, 'current')), { code: 'ENOENT' });
});

test('only one job can run and article changes during build stop activation', async (t) => {
  let releaseBuild;
  const hold = new Promise((done) => { releaseBuild = done; });
  const f = await fixture(t, { runBuild: async (args) => { await hold; await fakeBuild(args); } });
  await f.manager.start('staging');
  await assert.rejects(f.manager.start('staging'), { status: 409 });
  await assert.rejects(f.manager.start('garbage;touch /tmp/foo'), { status: 400 });
  // Wait until the input snapshot has been read and the fake builder is pending.
  await new Promise((done) => setTimeout(done, 20));
  await writeFile(join(f.contentRoot, 'first.md'), 'persistent-v2');
  releaseBuild();
  await f.manager.waitForIdle();
  assert.match(f.manager.getStatus().lastJob.error, /发布期间被修改/);
  await assert.rejects(readlink(join(f.profiles.staging.root, 'current')), { code: 'ENOENT' });
});

test('failed validation and unsafe outputs preserve the active release and keep errors generic', async (t) => {
  const f = await fixture(t);
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  const previous = await readlink(join(f.profiles.staging.root, 'current'));
  const cases = [
    async () => { throw new Error('secret/path/PRIVATE_TEST_MARKER'); },
    async (args) => { await fakeBuild(args); await writeFile(join(args.snapshotRoot, 'dist/private.env'), 'PRIVATE_TEST_MARKER'); },
    async (args) => { await fakeBuild(args); await writeFile(join(args.snapshotRoot, 'dist/leak.txt'), 'MEDIA_S3_SECRET_ACCESS_KEY=PRIVATE_TEST_MARKER'); },
    async (args) => { await fakeBuild(args); await writeFile(join(args.snapshotRoot, 'dist/index.html'), '<html>no robots protection</html>'); },
    async (args) => { await fakeBuild(args); await symlink('/etc/passwd', join(args.snapshotRoot, 'dist/leak.txt')); },
  ];
  for (const runBuild of cases) {
    const manager = await createPublishManager({ ...f.managerOptions, runBuild });
    assert.equal((await publish(manager, 'staging')).status, 'failed');
    assert.doesNotMatch(manager.getStatus().lastJob.error, /PRIVATE_TEST_MARKER|secret\/path/);
    assert.equal(await readlink(join(f.profiles.staging.root, 'current')), previous);
  }
});

test('history metadata retains previous version and can be verified by existing release tooling', async (t) => {
  const f = await fixture(t);
  await publish(f.manager, 'staging');
  const first = await readlink(join(f.profiles.staging.root, 'current'));
  await writeFile(join(f.contentRoot, 'first.md'), 'persistent-v2');
  await publish(f.manager, 'staging');
  const second = await readlink(join(f.profiles.staging.root, 'current'));
  assert.notEqual(first, second);
  assert.equal(await readlink(join(f.profiles.staging.root, 'previous')), first);
  const metadata = JSON.parse(await readFile(join(second, 'release.json'), 'utf8'));
  const manifest = JSON.parse(await readFile(join(second, 'manifest.json'), 'utf8'));
  assert.equal(metadata.environment, 'staging');
  assert.equal(metadata.base_path, '/test-dev/');
  assert.equal(metadata.public_url, 'https://101.96.210.172/test-dev/');
  assert.equal(manifest.version, 1);
  assert.equal(manifest.files.length, 6);
  assert.equal(metadata.source_fingerprint, f.manager.getStatus().environments.staging.sourceFingerprint);
});

test('source symlinks and shared environment roots are rejected', async (t) => {
  const f = await fixture(t);
  await symlink('/etc/passwd', join(f.contentRoot, 'secret.md'));
  assert.match((await publish(f.manager, 'staging')).error, /链接/);
  await assert.rejects(createPublishManager({ ...f.managerOptions, profiles: { ...f.profiles, production: { ...f.profiles.production, root: f.profiles.staging.root } } }), /isolated/);
});

test('publisher does not inherit media or login secrets into check/build child processes', async (t) => {
  const f = await fixture(t);
  const pnpm = join(f.root, 'fake-pnpm');
  const record = join(f.root, 'child-env.json');
  const helper = `#!${process.execPath}\nimport fs from 'node:fs/promises';\nawait fs.writeFile(${JSON.stringify(record)}, JSON.stringify({secretPresent:!!process.env.MEDIA_S3_SECRET_ACCESS_KEY,authPresent:!!process.env.AUTH_SECRET,publicBase:process.env.MEDIA_PUBLIC_BASE_URL,site:process.env.PUBLIC_SITE_URL}));\nif(process.argv[3]==='build'){const d='dist';await fs.mkdir(d,{recursive:true});const h='<meta name="robots" content="noindex, nofollow, noarchive"><link rel="canonical" href="'+process.env.PUBLIC_SITE_URL+process.env.PUBLIC_BASE_PATH+'">';for(const n of ['index.html','404.html'])await fs.writeFile(d+'/'+n,h);await fs.writeFile(d+'/robots.txt','Disallow: /');await fs.writeFile(d+'/sitemap.xml','<urlset/>');await fs.writeFile(d+'/search-index.json','[]');}\n`;
  await writeFile(pnpm, helper, { mode: 0o700 });
  const { runBuild, ...realOptions } = f.managerOptions;
  const oldMedia = process.env.MEDIA_S3_SECRET_ACCESS_KEY, oldAuth = process.env.AUTH_SECRET;
  process.env.MEDIA_S3_SECRET_ACCESS_KEY = 'PRIVATE_TEST_MARKER'; process.env.AUTH_SECRET = 'PRIVATE_TEST_MARKER';
  t.after(() => { if (oldMedia === undefined) delete process.env.MEDIA_S3_SECRET_ACCESS_KEY; else process.env.MEDIA_S3_SECRET_ACCESS_KEY = oldMedia; if (oldAuth === undefined) delete process.env.AUTH_SECRET; else process.env.AUTH_SECRET = oldAuth; });
  const manager = await createPublishManager({ ...realOptions, pnpmCommand: pnpm, buildEnv: { MEDIA_PUBLIC_BASE_URL: 'https://media.herong.info' } });
  assert.equal((await publish(manager, 'staging')).status, 'succeeded');
  assert.deepEqual(JSON.parse(await readFile(record, 'utf8')), { secretPresent: false, authPresent: false, publicBase: 'https://media.herong.info', site: 'https://101.96.210.172' });
});


test('public directories and assets remain readable with the production private umask', async (t) => {
  const f = await fixture(t);
  const previous = process.umask(0o077);
  try {
    assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
    const release = await readlink(join(f.profiles.staging.root, 'current'));
    for (const directory of [f.profiles.staging.root, join(f.profiles.staging.root, 'releases'), release, join(release, 'web'), join(release, 'web/_astro'), join(f.profiles.staging.root, 'shared/_astro')]) {
      assert.equal((await stat(directory)).mode & 0o777, 0o755);
    }
    assert.equal((await stat(join(release, 'web/index.html'))).mode & 0o777, 0o644);
    assert.equal((await stat(join(f.root, 'state/state.json'))).mode & 0o777, 0o600);
  } finally { process.umask(previous); }
});
