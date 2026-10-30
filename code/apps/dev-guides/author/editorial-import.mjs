import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, mkdir, open, readFile, readdir, rename, unlink } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';
import { createLibraryStore } from './library-store.mjs';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_MARKDOWN = 2 * 1024 * 1024;
const hash = (text) => createHash('sha256').update(text).digest('hex');
const fail = (message) => { throw new Error(message); };
const record = (value) => value && typeof value === 'object' && !Array.isArray(value);

async function info(path) {
  return lstat(path).catch((error) => { if (error.code === 'ENOENT') return null; throw error; });
}

async function directory(path, create = false) {
  const state = await info(path);
  if (state) { if (!state.isDirectory() || state.isSymbolicLink()) fail(`不是普通目录：${path}`); return; }
  if (!create) fail(`目录不存在：${path}`);
  await directory(dirname(path), true);
  await mkdir(path, { mode: 0o700 });
}

async function ordinaryText(path, required = false, max = MAX_MARKDOWN) {
  const state = await info(path);
  if (!state) { if (required) fail(`文件不存在：${path}`); return null; }
  if (!state.isFile() || state.isSymbolicLink() || state.nlink !== 1 || state.size > max) fail(`不是独立普通文件或文件过大：${path}`);
  const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try { return await handle.readFile('utf8'); } finally { await handle.close(); }
}

async function writeExclusive(path, text) {
  const handle = await open(path, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
  try { await handle.writeFile(text); await handle.sync(); }
  catch (error) { await unlink(path); throw error; }
  finally { await handle.close(); }
}

async function atomicWrite(path, text) {
  const temp = `${path}.${randomUUID()}.tmp`;
  await writeExclusive(temp, text);
  try { await rename(temp, path); } finally { await unlink(temp).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
}

function metadata(markdown, label) {
  if (typeof markdown !== 'string' || Buffer.byteLength(markdown) > MAX_MARKDOWN || markdown.includes('\0')) fail(`文章内容无效：${label}`);
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown);
  if (!match) fail(`缺少 frontmatter：${label}`);
  const doc = parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length) fail(`frontmatter 无效：${label}`);
  const data = doc.toJS({ maxAliasCount: 20 });
  if (!record(data) || typeof data.title !== 'string' || !data.title.trim() || typeof data.tool !== 'string' || !SLUG.test(data.tool)) fail(`标题或工具无效：${label}`);
  return data;
}

function validatePayload(payload) {
  if (!record(payload) || payload.version !== 1 || typeof payload.batchId !== 'string' || payload.batchId.length > 80 || !SLUG.test(payload.batchId) || !Array.isArray(payload.entries) || payload.entries.length > 1000) fail('导入清单格式无效');
  const ids = new Set(); const slugs = new Set();
  for (const entry of payload.entries) {
    if (!record(entry) || typeof entry.sourceId !== 'string' || !/^[A-Za-z0-9-]{1,80}$/.test(entry.sourceId) || ids.has(entry.sourceId) || typeof entry.slug !== 'string' || !SLUG.test(entry.slug) || slugs.has(entry.slug) || !['draft', 'content'].includes(entry.kind) || typeof entry.title !== 'string' || !entry.title.trim()) fail('选题 ID、地址、标题或类型无效/重复');
    ids.add(entry.sourceId); slugs.add(entry.slug);
    if (!Array.isArray(entry.folderPath) || entry.folderPath.length < 1 || entry.folderPath.length > 6) fail(`目录深度无效：${entry.sourceId}`);
    for (const name of entry.folderPath) if (typeof name !== 'string' || name !== name.trim().normalize('NFC') || !name || [...name].length > 60 || /[\x00-\x1f\x7f/\\]/.test(name) || /^\.+$/.test(name)) fail(`目录名称无效：${entry.sourceId}`);
    if (entry.kind === 'draft') {
      const data = metadata(entry.markdown, entry.sourceId);
      if (data.status !== 'draft' || data.title !== entry.title || data.editorial?.sourceId !== entry.sourceId) fail(`草稿状态、标题或 editorial.sourceId 不匹配：${entry.sourceId}`);
    } else if (entry.markdown !== undefined) fail(`复用稿件不能提供覆盖内容：${entry.sourceId}`);
  }
}

/** Offline maintenance only: stop the author writer before calling with dryRun=false.
 * New drafts are exclusive writes; existing text and existing organization are preserved.
 * A private transaction receipt records the exact created files and metadata backup.
 */
export async function importEditorial({ projectRoot, payload, dryRun = true }) {
  validatePayload(payload);
  const root = resolve(projectRoot);
  await directory(root);
  const roots = { draft: join(root, 'drafts'), content: join(root, 'src/content/tutorials') };
  // Check every path component, not only the last directory, before reading/writing.
  for (const relative of ['drafts', 'src', 'src/content', 'src/content/tutorials']) {
    const state = await info(join(root, relative));
    if (state && (!state.isDirectory() || state.isSymbolicLink())) fail(`文章路径不是普通目录：${relative}`);
  }
  const existing = new Map(); const sourceOwners = new Map();
  for (const [kind, path] of Object.entries(roots)) {
    if (!await info(path)) continue;
    for (const name of await readdir(path)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) continue;
      const slug = name.slice(0, -3);
      const text = await ordinaryText(join(path, name), true);
      const data = metadata(text, `${kind}/${slug}`);
      if (existing.has(slug)) fail(`草稿和发布内容有相同地址：${slug}`);
      existing.set(slug, { kind, path: join(path, name), data });
      if (data.editorial?.sourceId) {
        if (sourceOwners.has(data.editorial.sourceId)) fail(`已有选题 ID 重复：${data.editorial.sourceId}`);
        sourceOwners.set(data.editorial.sourceId, slug);
      }
    }
  }
  const receiptRoot = join(root, '.editorial-imports');
  if (await info(receiptRoot)) await directory(receiptRoot);
  const manifestPath = join(receiptRoot, `${payload.batchId}.json`);
  const manifestBefore = await ordinaryText(manifestPath);
  const manifest = manifestBefore ? JSON.parse(manifestBefore) : { version: 1, batchId: payload.batchId, entries: {} };
  if (!record(manifest) || manifest.version !== 1 || manifest.batchId !== payload.batchId || !record(manifest.entries)) fail('已有导入记录无效');
  const listArticleKeys = async () => [...existing].map(([slug, item]) => `${item.kind}/${slug}`);
  const library = createLibraryStore({ projectRoot: root, listArticleKeys });
  const before = await library.read();
  const libraryPath = join(root, '.library.json');
  const libraryBefore = await ordinaryText(libraryPath);
  const plan = [];
  for (const entry of payload.entries) {
    const found = existing.get(entry.slug); const prior = Object.hasOwn(manifest.entries, entry.sourceId) ? manifest.entries[entry.sourceId] : undefined;
    if (prior && (prior.slug !== entry.slug || prior.requestedKind !== entry.kind)) fail(`选题地址与先前导入不一致：${entry.sourceId}`);
    if (sourceOwners.has(entry.sourceId) && sourceOwners.get(entry.sourceId) !== entry.slug) fail(`选题 ID 已被其他文章使用：${entry.sourceId}`);
    if (entry.kind === 'content' && (!found || found.kind !== 'content') && !prior) fail(`复用文章不存在：${entry.slug}`);
    if (entry.kind === 'draft' && found && found.data.editorial?.sourceId !== entry.sourceId) fail(`文章地址冲突，不会覆盖：${entry.slug}`);
    const action = prior || (entry.kind === 'draft' && found) ? 'preserve' : found ? 'reuse' : 'create';
    // A completed import does not recreate a draft that its author later removed.
    plan.push({ ...entry, action, actualKind: found?.kind ?? entry.kind });
  }
  const folderPaths = new Set();
  for (const entry of plan.filter((item) => item.action !== 'preserve')) for (let i = 1; i <= entry.folderPath.length; i++) folderPaths.add(JSON.stringify(entry.folderPath.slice(0, i).map((name) => name.toLocaleLowerCase('en-US'))));
  const knownPaths = new Set();
  for (const folder of before.folders) {
    const path = []; let current = folder;
    while (current) { path.unshift(current.name.toLocaleLowerCase('en-US')); current = before.folders.find((candidate) => candidate.id === current.parentId); }
    knownPaths.add(JSON.stringify(path));
  }
  const missingFolders = [...folderPaths].filter((path) => !knownPaths.has(path));
  if (before.folders.length + missingFolders.length > 500) fail('导入后目录超过 500 个');
  const result = { batchId: payload.batchId, dryRun, planned: plan.length, created: plan.filter((entry) => entry.action === 'create').length, reused: plan.filter((entry) => entry.action === 'reuse').length, preserved: plan.filter((entry) => entry.action === 'preserve').length, newFolders: missingFolders.length };
  if (dryRun) return result;
  await directory(receiptRoot, true);
  const lockPath = join(receiptRoot, '.import.lock');
  await writeExclusive(lockPath, `${process.pid}\n`);
  const transaction = join(receiptRoot, `${payload.batchId}-${Date.now()}-${randomUUID()}`);
  const created = []; let mutationStarted = false;
  try {
    await directory(transaction, true);
    await writeExclusive(join(transaction, 'before.json'), JSON.stringify({ library: libraryBefore, manifest: manifestBefore }));
    await writeExclusive(join(transaction, 'plan.json'), JSON.stringify(plan.map(({ sourceId, slug, action, folderPath }) => ({ sourceId, slug, action, folderPath }))));
    await writeExclusive(join(transaction, 'created.json'), '[]');
    // Refuse changes since preflight, including a concurrent second import.
    if ((await library.read()).revision !== before.revision || await ordinaryText(manifestPath) !== manifestBefore) fail('预检后目录或导入记录改变，请重试');
    for (const entry of plan) {
      if (entry.action === 'create') {
        await directory(roots.draft, true);
        const path = join(roots.draft, `${entry.slug}.md`);
        // Record intent before the exclusive write so a crashed run is recoverable.
        const record = { relative: `drafts/${entry.slug}.md`, sha256: hash(entry.markdown) };
        await atomicWrite(join(transaction, 'created.json'), JSON.stringify([...created, record]));
        await writeExclusive(path, entry.markdown);
        created.push(record);
        mutationStarted = true;
        existing.set(entry.slug, { kind: 'draft', path, data: metadata(entry.markdown, entry.sourceId) });
      }
      if (entry.action !== 'preserve') {
        let state = await library.read(); const key = `${entry.actualKind}/${entry.slug}`;
        // Leave a reused article in its existing folder, including user-created organization.
        if (!state.assignments[key]) {
          let parentId = null;
          for (const name of entry.folderPath) {
            const found = state.folders.find((folder) => folder.parentId === parentId && folder.name.toLocaleLowerCase('en-US') === name.toLocaleLowerCase('en-US'));
            if (found) parentId = found.id;
            else { mutationStarted = true; state = await library.apply({ revision: state.revision, action: 'create', name, parentId }); parentId = state.createdId; }
          }
          mutationStarted = true;
          await library.apply({ revision: state.revision, action: 'assign', articleKey: key, folderId: parentId });
        }
      }
      Object.defineProperty(manifest.entries, entry.sourceId, { enumerable: true, configurable: true, writable: true, value: { slug: entry.slug, requestedKind: entry.kind } });
    }
    mutationStarted = true;
    await atomicWrite(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    await writeExclusive(join(transaction, 'complete.json'), JSON.stringify({ ...result, completedAt: new Date().toISOString() }));
    return { ...result, receipt: transaction };
  } catch (error) {
    if (mutationStarted) {
      for (const item of created) {
        const path = join(root, item.relative); const text = await ordinaryText(path);
        if (text !== null && hash(text) === item.sha256) await unlink(path);
        else if (text !== null) fail(`回滚停止：新文章已改变，请检查 ${transaction}`);
      }
      if (libraryBefore === null) await unlink(libraryPath).catch((problem) => { if (problem.code !== 'ENOENT') throw problem; });
      else await atomicWrite(libraryPath, libraryBefore);
      if (manifestBefore === null) await unlink(manifestPath).catch((problem) => { if (problem.code !== 'ENOENT') throw problem; });
      else await atomicWrite(manifestPath, manifestBefore);
    }
    throw error;
  } finally { await unlink(lockPath); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2); const flags = new Set(['--apply', '--offline']); const values = new Map();
    for (let index = 0; index < args.length; index++) {
      const name = args[index];
      if (flags.has(name)) values.set(name, true);
      else if (['--project', '--payload'].includes(name) && args[index + 1] && !args[index + 1].startsWith('--')) values.set(name, args[++index]);
      else fail(`未知参数：${name}`);
    }
    if (!values.has('--project') || !values.has('--payload')) fail('用法：node editorial-import.mjs --project PATH --payload JSON [--apply --offline]');
    if (values.has('--apply') && !values.has('--offline')) fail('写入前需停止写作服务，并显式传入 --offline；默认只预检');
    const payload = JSON.parse(await readFile(values.get('--payload'), 'utf8'));
    console.log(JSON.stringify(await importEditorial({ projectRoot: values.get('--project'), payload, dryRun: !values.has('--apply') })));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
