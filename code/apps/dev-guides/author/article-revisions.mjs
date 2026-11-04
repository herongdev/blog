import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { chmod, lstat, mkdir, open, readdir, rename, rm, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { parseDocument } from 'yaml';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HASH = /^[a-f0-9]{64}$/;
const PLAN = /^[a-f0-9-]{36}$/;
const MAX_DOCUMENT = 2 * 1024 * 1024;
const MAX_ASSET = 32 * 1024 * 1024;
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const fail = (message, status = 422) => { throw Object.assign(new Error(message), { status }); };
const empty = () => ({ version: 1, baselineVerified: false, published: Object.create(null), unpublished: [], history: Object.create(null), lastPlan: null });
const baselineHash = (state) => hash(JSON.stringify({ published: state.published, unpublished: state.unpublished }));

async function directory(path) {
  await mkdir(path, { recursive: true, mode: 0o700 });
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail('文章修订目录不安全', 500);
  await chmod(path, 0o700);
}
async function safeRead(path, { optional = false, limit = MAX_DOCUMENT } = {}) {
  const stat = await lstat(path).catch((error) => { if (optional && error.code === 'ENOENT') return null; throw error; });
  if (!stat) return null;
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1 || stat.size > limit) fail('文章修订文件不安全或超过容量限制', 422);
  const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const current = await handle.stat();
    if (!current.isFile() || current.nlink !== 1 || current.size > limit) fail('文章修订文件不安全或超过容量限制', 422);
    return await handle.readFile();
  } finally { await handle.close(); }
}
async function atomic(path, bytes) {
  await directory(dirname(path));
  const temporary = `${path}.${randomUUID()}.tmp`;
  try { await writeFile(temporary, bytes, { flag: 'wx', mode: 0o600 }); await rename(temporary, path); }
  finally { await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
}
function split(content) {
  const normalized = content.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(normalized);
  if (!match) fail('文章缺少 frontmatter');
  return { frontmatter: match[1], body: normalized.slice(match[0].length).replace(/^\n/, '') };
}
function metadata(content, tolerant = false) {
  const article = split(content);
  const document = parseDocument(article.frontmatter, { uniqueKeys: true });
  if (document.errors.length) { if (tolerant) return { ...article, data: {} }; fail('文章信息格式错误，请先保存正确的文章'); }
  let data;
  try { data = document.toJS({ maxAliasCount: 100 }); } catch { if (tolerant) return { ...article, data: {} }; fail('文章信息格式错误'); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) { if (tolerant) return { ...article, data: {} }; fail('文章信息格式错误'); }
  return { ...article, data };
}

/** Private immutable article versions. No content is considered live without an
 * explicit baseline import or a successful production activation. */
export async function createArticleRevisions({ projectRoot, clock = () => new Date(), bootstrapPublished = false }) {
  projectRoot = resolve(projectRoot);
  const root = join(projectRoot, '.article-revisions');
  const statePath = join(root, 'state.json');
  const objects = join(root, 'objects');
  const plans = join(root, 'plans');
  let lock = Promise.resolve();
  const serialized = (action) => {
    const result = lock.then(action);
    lock = result.catch(() => {});
    return result;
  };
  function articlePath({ kind, slug }) {
    if (!['draft', 'content'].includes(kind) || !SLUG.test(slug)) fail('文章地址无效', 400);
    return join(projectRoot, kind === 'draft' ? 'drafts' : 'src/content/tutorials', `${slug}.md`);
  }
  async function checkArticleDirectory(input) {
    let current = projectRoot;
    for (const segment of (input.kind === 'draft' ? ['drafts'] : ['src', 'content', 'tutorials'])) {
      current = join(current, segment);
      const stat = await lstat(current).catch((error) => { if (error.code === 'ENOENT') fail('文章不存在', 404); throw error; });
      if (!stat.isDirectory() || stat.isSymbolicLink()) fail('文章目录不安全');
    }
  }
  async function loadState() {
    const bytes = await safeRead(statePath, { optional: true, limit: 16 * 1024 * 1024 });
    if (bytes === null) return empty();
    let state;
    try { state = JSON.parse(bytes); } catch { fail('文章修订记录损坏，请从私有备份恢复', 500); }
    if (state.version !== 1 || !state.published || typeof state.published !== 'object' || !state.history || !Array.isArray(state.unpublished)) fail('文章修订记录格式无效', 500);
    Object.setPrototypeOf(state.published, null);
    Object.setPrototypeOf(state.history, null);
    for (const [slug, item] of Object.entries(state.published)) if (!SLUG.test(slug) || !HASH.test(item?.revision)) fail('文章线上版本记录无效', 500);
    return state;
  }
  const saveState = (state) => atomic(statePath, `${JSON.stringify(state, null, 2)}\n`);
  async function putObject(bytes) {
    const revision = hash(bytes);
    const path = join(objects, revision);
    const existing = await safeRead(path, { optional: true, limit: MAX_ASSET });
    if (existing !== null) { if (hash(existing) !== revision) fail('文章历史版本校验失败', 500); }
    else {
      try { await writeFile(path, bytes, { flag: 'wx', mode: 0o600 }); }
      catch (error) { if (error.code !== 'EEXIST') throw error; if (hash(await safeRead(path, { limit: MAX_ASSET })) !== revision) fail('文章历史版本校验失败', 500); }
    }
    return revision;
  }
  async function getObject(revision, limit = MAX_DOCUMENT) {
    if (!HASH.test(revision)) fail('文章版本无效', 400);
    const bytes = await safeRead(join(objects, revision), { limit });
    if (hash(bytes) !== revision) fail('文章历史版本校验失败', 500);
    return bytes;
  }
  async function assetSnapshots(input, content, strict = false) {
    const paths = new Set();
    for (const match of content.matchAll(/(?:!\[[^\]]*\]\(\s*|\bsrc=["'])([^\s)"'<>]+)/g)) {
      const value = match[1].replace(/^\.\//, '');
      if (/^(?:[a-z]+:|\/|#)/i.test(value)) continue;
      if (!value.startsWith(`${input.slug}/`) || !/^[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(value) || value.split('/').some((part) => !part || part === '.' || part === '..')) { if (strict) fail('文章本地图片地址无效，请使用当前文章的图片目录'); continue; }
      paths.add(value);
    }
    const result = [];
    const articleRoot = dirname(articlePath(input));
    for (const path of paths) {
      try {
        let current = articleRoot;
        for (const segment of path.split('/').slice(0, -1)) {
          current = join(current, segment);
          const stat = await lstat(current);
          if (!stat.isDirectory() || stat.isSymbolicLink()) fail('文章图片目录不安全');
        }
        const bytes = await safeRead(join(articleRoot, path), { limit: MAX_ASSET });
        result.push({ path, revision: await putObject(bytes) });
      } catch { if (strict) fail('文章引用的本地图片无法保存到发布版本，请检查图片文件'); }
    }
    return result;
  }
  async function current(input) {
    articlePath(input);
    await checkArticleDirectory(input);
    const bytes = await safeRead(articlePath(input), { optional: true });
    if (bytes === null) fail('文章不存在', 404);
    const content = bytes.toString('utf8');
    return { bytes, revision: hash(bytes), ...metadata(content, true) };
  }
  async function capture(input, state) {
    const item = await current(input);
    await putObject(item.bytes);
    state.history[input.slug] ??= {};
    if (!state.history[input.slug][item.revision]) state.history[input.slug][item.revision] = { kind: input.kind, createdAt: clock().toISOString(), assets: await assetSnapshots(input, item.bytes.toString('utf8')) };
    return item;
  }
  async function importHistory(input, state) {
    const directoryPath = join(projectRoot, '.history', input.kind, input.slug);
    const stat = await lstat(directoryPath).catch((error) => { if (error.code === 'ENOENT') return null; throw error; });
    if (!stat) return;
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail('文章历史目录不安全');
    const entries = await readdir(directoryPath);
    if (entries.length > 10000) fail('文章历史版本过多，请联系维护者');
    for (const name of entries) {
      if (!/^[a-f0-9]{64}\.md$/.test(name)) continue;
      if (state.history[input.slug]?.[name.slice(0, -3)]) continue;
      const bytes = await safeRead(join(directoryPath, name));
      if (hash(bytes) !== name.slice(0, -3)) fail('文章历史版本校验失败', 500);
      await putObject(bytes);
      const revision = name.slice(0, -3);
      state.history[input.slug] ??= {};
      state.history[input.slug][revision] ??= { kind: input.kind, createdAt: (await lstat(join(directoryPath, name))).mtime.toISOString(), assets: [] };
    }
  }
  async function summaries(input, state, workingRevision) {
    return Promise.all(Object.entries(state.history[input.slug] ?? {}).sort(([, a], [, b]) => b.createdAt.localeCompare(a.createdAt)).slice(0, 100).map(async ([revision, item]) => {
      const data = metadata((await getObject(revision)).toString('utf8'), true).data;
      return { revision, createdAt: item.createdAt, title: typeof data.title === 'string' ? data.title : input.slug, current: revision === workingRevision, published: revision === state.published[input.slug]?.revision };
    }));
  }
  async function read(input) {
    return serialized(async () => {
      const state = await loadState();
      const working = await capture(input, state);
      await importHistory(input, state);
      await saveState(state);
      const published = state.published[input.slug];
      return { kind: input.kind, slug: input.slug, title: typeof working.data.title === 'string' ? working.data.title : input.slug, workingRevision: working.revision, publishedRevision: published?.revision ?? null, publishedAt: published?.publishedAt ?? null, hasChanges: !published || published.revision !== working.revision, status: published ? (published.revision === working.revision ? 'published' : 'modified') : state.unpublished.includes(input.slug) ? 'unpublished' : 'draft', history: await summaries(input, state, working.revision) };
    });
  }
  async function version(input, revision) {
    articlePath(input);
    const state = await loadState();
    if (!HASH.test(revision) || !state.history[input.slug]?.[revision]) fail('文章历史版本不存在', 404);
    return { kind: input.kind, slug: input.slug, revision, images: imageUrls(input, revision, state.history[input.slug][revision].assets), ...split((await getObject(revision)).toString('utf8')) };
  }
  function imageUrls(input, revision, assets = []) {
    const result = {};
    for (const asset of assets) {
      if (!asset.path.startsWith(`${input.slug}/`)) continue;
      const filename = asset.path.slice(input.slug.length + 1);
      const url = `/api/article-revisions/${input.kind}/${input.slug}/history/${revision}/assets/${filename.split('/').map(encodeURIComponent).join('/')}`;
      result[`./${asset.path}`] = url;
      result[asset.path] = url;
    }
    return result;
  }
  async function versionImage(input, revision, filename) {
    articlePath(input);
    if (!HASH.test(revision) || !/^[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(filename) || filename.split('/').some((part) => !part || part === '.' || part === '..')) fail('历史图片地址无效', 400);
    const state = await loadState();
    const asset = state.history[input.slug]?.[revision]?.assets?.find((item) => item.path === `${input.slug}/${filename}`);
    if (!asset) fail('此文章版本未引用这张图片', 404);
    const bytes = await getObject(asset.revision, MAX_ASSET);
    const ext = filename.split('.').at(-1).toLowerCase();
    const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' }[ext];
    return { bytes, mime };
  }
  async function restore(input) {
    return serialized(async () => {
      const state = await loadState();
      const working = await capture(input, state);
      await importHistory(input, state);
      if (input.targetRevision !== working.revision) fail('文章已在其他窗口修改，请刷新后再恢复', 409);
      if (!HASH.test(input.revision) || !state.history[input.slug]?.[input.revision]) fail('文章历史版本不存在', 404);
      const bytes = await getObject(input.revision);
      // Images from old versions are restored only into the article's own
      // namespace. Never overwrite another immutable image with different bytes.
      for (const asset of state.history[input.slug][input.revision].assets ?? []) {
        if (!asset.path.startsWith(`${input.slug}/`) || asset.path.split('/').some((part) => !part || part === '..' || part === '.')) fail('历史图片地址无效', 500);
        const destination = join(dirname(articlePath(input)), asset.path);
        const existing = await safeRead(destination, { optional: true, limit: MAX_ASSET });
        if (existing && hash(existing) !== asset.revision) fail('历史图片与当前同名文件冲突，请先核对素材', 409);
        if (!existing) await atomic(destination, await getObject(asset.revision, MAX_ASSET));
      }
      await saveState(state);
      await atomic(articlePath(input), bytes);
      return { kind: input.kind, slug: input.slug, revision: input.revision, ...split(bytes.toString('utf8')) };
    });
  }
  async function freeze(state, selection = null) {
    const selected = Object.assign(Object.create(null), structuredClone(state.published));
    if (selection) {
      if (selection.action === 'unpublish') {
        if (!selected[selection.slug]) fail('这篇文章尚未发布，不能下架', 409);
        delete selected[selection.slug];
      } else {
        const working = await capture(selection, state);
        if (selection.revision !== working.revision) fail('文章已修改，请保存并重新预览', 409);
        const data = metadata(working.bytes.toString('utf8')).data;
        if (!['lead', 'published'].includes(data.status) || (data.visibility !== undefined && data.visibility !== 'public') || [data.private, data.draft, data.unlisted].some((value) => value === true || value === 'true')) fail('请先在文章发布信息中设置允许公开的内容状态');
        const assets = await assetSnapshots(selection, working.bytes.toString('utf8'), true);
        state.history[selection.slug][working.revision].assets = assets;
        selected[selection.slug] = { revision: working.revision, assets, publishedAt: null };
      }
    }
    const id = randomUUID();
    const planRoot = join(plans, id);
    const plan = { version: 1, id, createdAt: clock().toISOString(), baseline: baselineHash(state), selected, selection: selection ? { kind: selection.kind, slug: selection.slug, revision: selection.revision, action: selection.action } : null };
    await atomic(join(planRoot, 'plan.json'), `${JSON.stringify(plan)}\n`);
    await saveState(state);
    return { ...plan, contentRoot: await projection(plan) };
  }
  async function projection(value) {
    const contentRoot = join(plans, value.id, 'content');
    const existing = await lstat(contentRoot).catch((error) => { if (error.code === 'ENOENT') return null; throw error; });
    if (existing) { if (!existing.isDirectory() || existing.isSymbolicLink()) fail('文章预览目录不安全', 500); return contentRoot; }
    // A failed read/write must never leave a partial directory that the next
    // preview accepts as a complete projection of the confirmed article set.
    const temporary = join(plans, value.id, `content-${randomUUID()}.tmp`);
    await directory(temporary);
    try {
      for (const [slug, item] of Object.entries(value.selected)) {
        if (!SLUG.test(slug) || !HASH.test(item.revision)) fail('文章预览记录无效', 500);
        await writeFile(join(temporary, `${slug}.md`), await getObject(item.revision), { flag: 'wx', mode: 0o600 });
        for (const asset of item.assets ?? []) {
          if (!asset.path.startsWith(`${slug}/`) || asset.path.split('/').some((part) => !part || part === '..' || part === '.') || !HASH.test(asset.revision)) fail('文章图片版本记录无效', 500);
          await directory(dirname(join(temporary, asset.path)));
          await writeFile(join(temporary, asset.path), await getObject(asset.revision, MAX_ASSET), { flag: 'wx', mode: 0o600 });
        }
      }
      await rename(temporary, contentRoot);
    } finally { await rm(temporary, { recursive: true, force: true }); }
    return contentRoot;
  }
  async function plan(id) {
    if (!PLAN.test(id ?? '')) fail('请先生成并检查本文预览', 409);
    const bytes = await safeRead(join(plans, id, 'plan.json'), { optional: true, limit: 16 * 1024 * 1024 });
    if (bytes === null) fail('预览版本不存在，请重新生成', 409);
    let value;
    try { value = JSON.parse(bytes); } catch { fail('预览版本记录损坏', 500); }
    if (value.version !== 1 || value.id !== id || !value.selected || !HASH.test(value.baseline)) fail('预览版本记录无效', 500);
    return { ...value, contentRoot: await projection(value) };
  }
  async function assertBaseline(value) {
    const state = await loadState();
    if (state.lastPlan !== value.id && value.baseline !== baselineHash(state)) fail('网站已发布其他内容，请重新生成本文预览', 409);
  }
  async function commit(value, publishedAt = clock().toISOString()) {
    return serialized(async () => {
      const state = await loadState();
      if (state.lastPlan === value.id) return;
      if (value.baseline !== baselineHash(state)) fail('网站发布基线已变化，请联系维护者核对', 409);
      state.published = structuredClone(value.selected);
      if (value.selection?.action === 'unpublish') state.unpublished = [...new Set([...state.unpublished, value.selection.slug])];
      if (value.selection?.action === 'publish') {
        state.published[value.selection.slug].publishedAt = publishedAt;
        state.unpublished = state.unpublished.filter((slug) => slug !== value.selection.slug);
      }
      state.lastPlan = value.id;
      state.baselineVerified = true;
      await saveState(state);
    });
  }
  async function initialize({ seedPublished = false } = {}) {
    return serialized(async () => {
      await directory(root); await directory(objects); await directory(plans);
      const exists = await safeRead(statePath, { optional: true, limit: 16 * 1024 * 1024 }) !== null;
      if (exists && !seedPublished) return;
      const state = exists ? await loadState() : empty();
      if (exists && (state.baselineVerified || state.lastPlan || Object.keys(state.published).length)) return;
      if (seedPublished) {
        const contentRoot = join(projectRoot, 'src/content/tutorials');
        for (const name of await readdir(contentRoot)) {
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) continue;
          const input = { kind: 'content', slug: name.slice(0, -3) };
          const working = await capture(input, state);
          if (['lead', 'published'].includes(working.data.status) && (working.data.visibility === undefined || working.data.visibility === 'public') && !working.data.private && !working.data.draft && !working.data.unlisted) state.published[input.slug] = { revision: working.revision, assets: state.history[input.slug][working.revision].assets, publishedAt: null };
        }
        state.baselineVerified = true;
      }
      await saveState(state);
    });
  }
  await initialize({ seedPublished: bootstrapPublished });
  return {
    initialize, read, version, restore,
    async baselineReady() { return (await loadState()).baselineVerified === true; },
    async recordBeforeSave(input) { return serialized(async () => { const state = await loadState(); const item = await capture(input, state); await saveState(state); return item.revision; }); },
    async listHistory(input) { return { items: (await read(input)).history }; },
    async published(input) {
      articlePath(input);
      const state = await loadState();
      const published = state.published[input.slug];
      if (!published) fail('这篇文章还没有已确认的线上版本', 404);
      return { kind: input.kind, slug: input.slug, revision: published.revision, images: imageUrls(input, published.revision, published.assets), ...split((await getObject(published.revision)).toString('utf8')) };
    },
    async prepareSelection(input) {
      if (input && (!['publish', 'unpublish'].includes(input.action ?? 'publish') || !['draft', 'content'].includes(input.kind) || !SLUG.test(input.slug))) fail('文章发布选择无效', 400);
      return serialized(async () => freeze(await loadState(), input ? { ...input, action: input.action ?? 'publish' } : null));
    },
    plan, assertBaseline, commit,
    async releaseProjection(id) {
      if (!PLAN.test(id ?? '')) fail('文章预览版本无效', 400);
      await rm(join(plans, id, 'content'), { recursive: true, force: true });
    },
    async recoverFromRelease(releasePath) {
      if (!releasePath) return;
      const bytes = await safeRead(join(releasePath, 'release.json'), { limit: 16 * 1024 * 1024 });
      const metadata = JSON.parse(bytes);
      if (metadata.environment === 'production' && metadata.articleRevisionPlan) await commit(await plan(metadata.articleRevisionPlan), metadata.built_at_utc);
    },
    async handle(request, response, context) {
      const imageMatch = /^\/api\/article-revisions\/(draft|content)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/history\/([a-f0-9]{64})\/assets\/(.+)$/.exec(context.url.pathname);
      if (imageMatch) {
        if (!['GET', 'HEAD'].includes(request.method)) fail('请求方式不支持', 405);
        let filename;
        try { filename = decodeURIComponent(imageMatch[4]); } catch { fail('历史图片地址无效', 400); }
        const image = await versionImage({ kind: imageMatch[1], slug: imageMatch[2] }, imageMatch[3], filename);
        response.writeHead(200, { 'Content-Type': image.mime, 'Content-Length': image.bytes.length, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin', 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'Content-Security-Policy': "default-src 'none'; sandbox" });
        response.end(request.method === 'HEAD' ? undefined : image.bytes);
        return true;
      }
      const match = /^\/api\/article-revisions\/(draft|content)\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\/(published|history|restore)(?:\/([a-f0-9]{64}))?)?$/.exec(context.url.pathname);
      if (!match) return false;
      const [, kind, slug, action, revision] = match;
      const input = { kind, slug };
      if (request.method === 'GET' && !action) context.sendJson(response, 200, await read(input));
      else if (request.method === 'GET' && action === 'published') context.sendJson(response, 200, await this.published(input));
      else if (request.method === 'GET' && action === 'history') context.sendJson(response, 200, revision ? await version(input, revision) : await this.listHistory(input));
      else if (request.method === 'POST' && action === 'restore' && !revision) {
        const payload = { ...await context.readJson(request, 4096), ...input };
        const result = context.withArticleLock ? await context.withArticleLock(slug, () => restore(payload)) : await restore(payload);
        context.sendJson(response, 200, result);
      }
      else fail('请求方式不支持', 405);
      return true;
    },
  };
}
