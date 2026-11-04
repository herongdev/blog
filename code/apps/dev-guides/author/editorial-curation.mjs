import { createHash, randomUUID } from 'node:crypto';
import { constants, realpathSync } from 'node:fs';
import { lstat, mkdir, open, readFile, readdir, rename, unlink } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';
import { validateLibraryState } from './library-store.mjs';
import { emptyPreparation, validatePreparation, validateFilmingState } from './filming-store.mjs';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const hash = (value) => createHash('sha256').update(value).digest('hex');
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
const FILES = ['.library.json', '.filming.json', '.schedule.json'];
const recentTools = ['codex', 'codex', 'zcode', 'ttok', 'codex', 'remotion', 'codex', 'claude-code'];
const reused = { DG004: 'codex-worktrees', DG006: 'apifox-actual-request', DG125: 'cursor-remote-control' };
const format = (value) => typeof value === 'string' ? value : Array.isArray(value) ? value.map(format).join('\n') : record(value) ? Object.entries(value).map(([key, text]) => `${key}: ${format(text)}`).join('\n') : value == null ? '' : String(value);
const prose = (value) => record(value) ? Object.values(value).map(prose).join('\n') : Array.isArray(value) ? value.map(prose).join('\n') : format(value);

async function info(path) { return lstat(path).catch((error) => { if (error.code === 'ENOENT') return null; throw error; }); }
async function directory(path, create = false) {
  if (create) await mkdir(path, { mode: 0o700 }).catch((error) => { if (error.code !== 'EEXIST') throw error; });
  const value = await info(path);
  if (!value?.isDirectory() || value.isSymbolicLink()) fail(`不是普通目录：${path}`);
}
async function text(path, optional = true) {
  const value = await info(path);
  if (!value && optional) return null;
  if (!value?.isFile() || value.nlink !== 1 || value.size > 32 * 1024 * 1024) fail(`不是独立普通文件：${path}`);
  const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const current = await handle.stat();
    if (!current.isFile() || current.nlink !== 1 || current.size > 32 * 1024 * 1024) fail(`文件无效：${path}`);
    const contents = await handle.readFile('utf8');
    if (Buffer.byteLength(contents) > 32 * 1024 * 1024) fail('文件超过限制');
    return contents;
  } finally { await handle.close(); }
}
async function exclusive(path, contents) {
  const handle = await open(path, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
  try { await handle.writeFile(contents); await handle.sync(); } finally { await handle.close(); }
}
async function atomic(path, contents) {
  await text(path);
  const temporary = `${path}.${randomUUID()}.tmp`;
  try { await exclusive(temporary, contents); await text(path); await rename(temporary, path); await syncDirectory(dirname(path)); }
  finally { await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
}
async function syncDirectory(path) {
  const handle = await open(path, constants.O_RDONLY);
  try { await handle.sync(); } finally { await handle.close(); }
}
// Called only while holding the migration lock. A receipt becomes visible only
// after its complete bytes are durable; existing final receipts are never replaced.
async function publishReceipt(path, contents, beforeCommit) {
  if (await info(path)) fail('整理回执已存在，不能覆盖', 409);
  const temporary = `${path}.${randomUUID()}.tmp`;
  try {
    await exclusive(temporary, contents);
    if (beforeCommit) await beforeCommit(temporary);
    if (await info(path)) fail('整理回执已存在，不能覆盖', 409);
    await rename(temporary, path);
    await syncDirectory(dirname(path));
  } finally { await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
}
function parse(contents, fallback) { if (contents === null) return structuredClone(fallback); try { return JSON.parse(contents); } catch { fail('私有元数据不是有效 JSON'); } }
function validPath(path, allowEmpty = false) {
  if (!Array.isArray(path) || path.length > 6 || (!allowEmpty && !path.length) || path.some((name) => typeof name !== 'string' || !name.trim() || name !== name.trim().normalize('NFC') || [...name].length > 60 || /[\x00-\x1f\x7f/\\]/.test(name) || /^\.+$/.test(name))) fail('整理目录路径无效');
}

/** Local-only preparation embeds original research JSON; applying needs no docs tree. */
export async function prepareEditorialCuration(curation, { sourceDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../../../docs/dev-guides/editorial/2026-10-27') } = {}) {
  const topics = parse(await text(join(sourceDirectory, 'topics.json'), false));
  const recent = parse(await text(join(sourceDirectory, 'creator-month-scan.json'), false));
  const originals = new Map(topics.topics.map((topic) => [topic.id, { payload: topic, title: topic.title, path: topic.queue === '主计划' ? ['半年主计划（每周3篇）', `第${String(topic.week).padStart(2, '0')}周 · ${topics.weeks.find((week) => week.week === topic.week)?.theme}`] : ['备选题库', topic.tool], file: 'topics.json', urls: [...(topic.sourceUrls ?? []), ...(topic.discoveryUrls ?? [])] }]));
  recent.selectedIds.forEach((id, index) => {
    const topic = recent.items.find((entry) => entry.id === id && entry.selected);
    if (!topic) fail(`近期来源缺失：${id}`);
    originals.set(id, { payload: topic, title: topic.proposedTitle, path: ['近期候选（拍前复核）', index < 4 ? '先亲测' : '第二批与进阶'], file: 'creator-month-scan.json', urls: [topic.url, ...(topic.officialUrls ?? [])], slug: `${recentTools[index]}-${id.toLowerCase()}` });
  });
  if (!Array.isArray(curation?.entries) || curation.entries.length !== originals.size || new Set(curation.entries.map((item) => item.sourceId)).size !== originals.size) fail('必须明确审查全部导入选题');
  const entries = curation.entries.map((entry) => {
    const original = originals.get(entry.sourceId); if (!original) fail(`来源编号不存在：${entry.sourceId}`);
    const sha256 = hash(JSON.stringify(original.payload));
    const topic = original.payload, urls = [...new Set(original.urls.filter(Boolean))];
    const sections = [
      ['原调研标题', original.title], ['要解决的问题', topic.hook ?? topic.whyUseful],
      ['参考案例', topic.summary], ['演示提纲', topic.demo ?? topic.demo60s],
      ['拟验证的成功证据', topic.proof], ['适用条件与准备', topic.prerequisites],
      ['演示素材', topic.demoFixture], ['限制与拍前复核', topic.risks ?? topic.verification],
      ['网站补充', topic.webSupplement], ['与已有选题的区别', topic.novelty],
      ['原核对状态', [topic.evidenceStatus, topic.evidenceNote].filter(Boolean).join('\n')],
      ['原核对日期', topic.researchCheckedAt ?? topic.checkedAt ?? '2026-10-27'],
      ['参考作者与发表日期', [topic.creator, topic.originalTitle, topic.publishedAt].filter(Boolean).join(' · ')],
      ['来源背景', topic.commercialContext],
      ['原始链接', urls.map((url) => `- ${url}`).join('\n')],
    ];
    const body = '> 这是历史调研资料，保留当时记录，不代表已经亲测，也不是用户原始笔记。\n\n' + sections.filter(([, value]) => Boolean(prose(value).trim())).map(([label, value]) => `## ${label}\n\n${prose(value)}`).join('\n\n');
    const source = { id: `research-${entry.sourceId}-${sha256.slice(0, 16)}`, kind: 'research', label: '历史调研资料（非用户原笔记）', sourceId: entry.sourceId, title: original.title, body, urls, payload: original.payload, sha256, sourceFile: original.file, checkedAt: original.payload.researchCheckedAt ?? original.payload.checkedAt ?? '2026-10-27' };
    return { ...entry, originalFolderPath: original.path, source };
  });
  const payload = { ...curation, version: 1, entries };
  validatePayload(payload); return payload;
}

function validatePayload(payload) {
  if (!record(payload) || payload.version !== 1 || !SLUG.test(payload.batchId ?? '') || payload.batchId.length > 80 || !Array.isArray(payload.entries) || !payload.entries.length || payload.entries.length > 1000) fail('整理清单无效');
  const ids = new Set(), slugs = new Set();
  for (const entry of payload.entries) {
    if (!record(entry) || !/^[A-Za-z0-9-]{1,80}$/.test(entry.sourceId ?? '') || ids.has(entry.sourceId) || !SLUG.test(entry.slug ?? '') || slugs.has(entry.slug) || !['keep', 'archive'].includes(entry.decision) || typeof entry.reason !== 'string' || !entry.reason.trim() || entry.reason.length > 1000) fail('整理选题重复或缺少明确结论');
    ids.add(entry.sourceId); slugs.add(entry.slug);
    validPath(entry.folderPath, entry.decision === 'archive'); validPath(entry.originalFolderPath);
    if (entry.filming) validatePreparation(entry.filming);
    if (entry.source?.sourceId !== entry.sourceId) fail('调研来源编号不匹配');
    validateFilmingState({ version: 1, cards: { [entry.slug]: { preparation: emptyPreparation(), sources: [entry.source] } } });
  }
}

async function snapshot(root, batchId) {
  await directory(root);
  const before = Object.fromEntries(await Promise.all(FILES.map(async (name) => [name, await text(join(root, name))])));
  const articles = [], sourceOwners = new Map();
  for (const relative of ['drafts', 'src', 'src/content', 'src/content/tutorials']) if (await info(join(root, relative))) await directory(join(root, relative));
  for (const [kind, relative] of [['draft', 'drafts'], ['content', 'src/content/tutorials']]) {
    const path = join(root, relative); if (!await info(path)) continue;
    for (const name of (await readdir(path)).sort()) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) continue;
      const contents = await text(join(path, name), false), slug = name.slice(0, -3);
      const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(contents); if (!match) fail(`文章缺少有效元数据：${slug}`);
      const doc = parseDocument(match[1], { uniqueKeys: true }); if (doc.errors.length) fail(`文章元数据无效：${slug}`);
      const data = doc.toJS({ maxAliasCount: 20 });
      if (!record(data) || articles.some((article) => article.slug === slug)) fail(`重复或无效文章：${slug}`);
      articles.push({ kind, slug, hash: hash(contents), title: data.title, status: data.status });
      if (data.editorial?.sourceId) {
        if (sourceOwners.has(data.editorial.sourceId)) fail('已有选题来源编号重复');
        sourceOwners.set(data.editorial.sourceId, slug);
      }
    }
  }
  const imports = join(root, '.editorial-imports'), receipts = [], priorFolderIds = new Set(), generatedPaths = new Set();
  if (await info(imports)) {
    await directory(imports);
    for (const name of (await readdir(imports)).sort()) {
      if (!name.startsWith(`${batchId}-`)) continue;
      const path = join(imports, name); await directory(path);
      const completed = await text(join(path, 'complete.json')); if (!completed) continue;
      if (parse(completed)?.batchId !== batchId) continue;
      const beforeText = await text(join(path, 'before.json'), false), planText = await text(join(path, 'plan.json'), false);
      receipts.push([name, completed, beforeText, planText]);
      const originalLibrary = parse(parse(beforeText).library, { folders: [] });
      for (const folder of originalLibrary.folders) priorFolderIds.add(folder.id);
      for (const entry of parse(planText)) if (Array.isArray(entry.folderPath)) for (let count = 1; count <= entry.folderPath.length; count++) generatedPaths.add(JSON.stringify(entry.folderPath.slice(0, count)));
    }
  }
  const manifestText = await text(join(imports, `${batchId}.json`));
  const manifest = parse(manifestText, { entries: {} });
  return { before, articles, sourceOwners, manifest, priorFolderIds, generatedPaths, fingerprint: hash(JSON.stringify([before, articles, receipts, manifestText])) };
}
function folderPath(library, id) {
  const names = []; let folder = library.folders.find((item) => item.id === id);
  while (folder) { names.unshift(folder.name); folder = library.folders.find((item) => item.id === folder.parentId); }
  return names;
}

/** Requires stopped author writer when dryRun=false. Touches only private metadata. */
export async function curateEditorial({ projectRoot, payload, dryRun = true, expectedRevision, cleanupLegacyFolders = false, beforeWrite, beforeReceiptCommit }) {
  validatePayload(payload);
  const root = resolve(projectRoot), receiptsRoot = join(root, '.editorial-curation');
  const payloadHash = hash(JSON.stringify([payload, cleanupLegacyFolders]));
  if (await info(receiptsRoot)) await directory(receiptsRoot);
  if (await info(join(receiptsRoot, 'pending.json'))) fail('有未完成的整理事务，请先离线恢复', 409);
  const completePath = join(receiptsRoot, `${payloadHash}.json`);
  const completed = await text(completePath);
  if (completed !== null) {
    const receipt = parse(completed);
    if (receipt.version !== 1 || receipt.payloadHash !== payloadHash || !record(receipt.summary)) fail('整理完成回执损坏');
    return { ...receipt.summary, dryRun, alreadyApplied: true };
  }
  const source = await snapshot(root, payload.batchId);
  const revision = hash(JSON.stringify([source.fingerprint, payloadHash]));
  if (!dryRun && expectedRevision !== revision) fail('整理预检后内容或目录已变化，请重新预检', 409);
  const library = parse(source.before['.library.json'], { version: 1, folders: [], assignmentsBySlug: {} });
  validateLibraryState(library); library.lifecycleBySlug ??= {};
  const filming = parse(source.before['.filming.json'], { version: 1, cards: {} }); validateFilmingState(filming);
  const now = new Date().toISOString(), changes = [], missing = [], affected = new Set();
  for (const entry of payload.entries) {
    const actualSlug = source.sourceOwners.get(entry.sourceId) ?? source.manifest.entries?.[entry.sourceId]?.slug ?? reused[entry.sourceId] ?? entry.slug;
    const article = source.articles.find((item) => item.slug === actualSlug);
    if (!article) { missing.push({ sourceId: entry.sourceId, slug: actualSlug }); continue; }
    // Never adopt an unrelated same-slug draft after import identity is lost.
    if (article.kind === 'draft' && source.sourceOwners.get(entry.sourceId) !== actualSlug) fail(`草稿来源身份不匹配：${actualSlug}`);
    if (affected.has(actualSlug)) fail('多个选题不能迁移到同一个内容'); affected.add(actualSlug);
    const originalFolderPath = folderPath(library, library.assignmentsBySlug[actualSlug]);
    const archived = entry.decision === 'archive', current = library.lifecycleBySlug[actualSlug];
    if ((current?.archived ?? false) !== archived) library.lifecycleBySlug[actualSlug] = { archived, changedAt: now, revision: randomUUID(), reason: entry.reason };
    if (archived) delete library.assignmentsBySlug[actualSlug];
    else {
      let parentId = null;
      for (const name of entry.folderPath) {
        let folder = library.folders.find((item) => item.parentId === parentId && item.name.toLocaleLowerCase('en-US') === name.toLocaleLowerCase('en-US'));
        if (!folder) { folder = { id: randomUUID(), name, parentId }; library.folders.push(folder); }
        parentId = folder.id;
      }
      library.assignmentsBySlug[actualSlug] = parentId;
    }
    const card = filming.cards[actualSlug] ?? { preparation: { ...emptyPreparation(), ...(entry.filming ?? {}) }, sources: [] };
    if (!card.sources.some((item) => item.id === entry.source.id)) card.sources.push({ ...entry.source, importedAt: now });
    const originalPath = card.curation?.originalFolderPath ?? originalFolderPath;
    card.curation = { batchId: payload.batchId, sourceId: entry.sourceId, decision: entry.decision, reason: entry.reason, reviewedAt: payload.reviewedAt ?? now.slice(0, 10), originalFolderPath: originalPath, originalResearchFolderPath: entry.originalFolderPath };
    filming.cards[actualSlug] = card;
    changes.push({ sourceId: entry.sourceId, slug: actualSlug, title: article.title, decision: entry.decision, reason: entry.reason, folderPath: archived ? [] : entry.folderPath });
  }
  const candidates = [];
  // Only exact original paths absent before the completed import qualify.
  // Repeated leaf removal never deletes a directory with unrelated content.
  let removed;
  const simulated = structuredClone(library);
  do {
    removed = false;
    for (const folder of [...simulated.folders]) {
      const path = folderPath(simulated, folder.id);
      if (source.priorFolderIds.has(folder.id) || !source.generatedPaths.has(JSON.stringify(path)) || simulated.folders.some((item) => item.parentId === folder.id) || Object.values(simulated.assignmentsBySlug).includes(folder.id)) continue;
      candidates.push({ id: folder.id, path }); simulated.folders = simulated.folders.filter((item) => item.id !== folder.id); removed = true;
    }
  } while (removed);
  if (cleanupLegacyFolders) library.folders = simulated.folders;
  validateLibraryState(library); validateFilmingState(filming);
  const schedule = parse(source.before['.schedule.json'], null);
  let removedScheduleEntries = 0;
  if (schedule) {
    if (![1, 2].includes(schedule.version) || !Array.isArray(schedule.current?.entries) || !Array.isArray(schedule.queue) || !Array.isArray(schedule.history)) fail('排期数据无效');
    const available = (entry) => { const state = library.lifecycleBySlug[entry.slug]; return !state || (!state.archived && state.revision === entry.archiveRevision); };
    const oldCount = schedule.current.entries.length + schedule.queue.length;
    schedule.current.entries = schedule.current.entries.filter(available); schedule.queue = schedule.queue.filter(available);
    removedScheduleEntries = oldCount - schedule.current.entries.length - schedule.queue.length;
  }
  const after = { '.library.json': json(library), '.filming.json': json(filming), '.schedule.json': schedule ? json(schedule) : null };
  const summary = { revision, payloadHash, dryRun, kept: changes.filter((item) => item.decision === 'keep').length, archived: changes.filter((item) => item.decision === 'archive').length, missing, unchangedArticles: source.articles.length, removedScheduleEntries, candidateFolderRemovals: candidates, cleanupLegacyFolders, changes };
  if (dryRun) return summary;
  await directory(receiptsRoot, true);
  await syncDirectory(root);
  const lock = join(receiptsRoot, '.lock'); await exclusive(lock, json({ pid: process.pid }));
  try {
    const existingReceipt = await text(completePath);
    if (existingReceipt !== null) {
      const receipt = parse(existingReceipt);
      if (receipt.version !== 1 || receipt.payloadHash !== payloadHash || !record(receipt.summary)) fail('整理完成回执损坏');
      return { ...receipt.summary, dryRun, alreadyApplied: true };
    }
    if ((await snapshot(root, payload.batchId)).fingerprint !== source.fingerprint) fail('预检后出现写入，整理已停止', 409);
    const transaction = { version: 1, payloadHash, summary, before: source.before, afterHashes: Object.fromEntries(FILES.map((name) => [name, after[name] === null ? null : hash(after[name])])) };
    await publishReceipt(join(receiptsRoot, 'pending.json'), json(transaction), beforeReceiptCommit ? (temporary) => beforeReceiptCommit('pending', temporary) : undefined);
    for (const name of FILES) {
      if (beforeWrite) await beforeWrite(name);
      if (after[name] !== null) await atomic(join(root, name), after[name]);
    }
    await publishReceipt(completePath, json(transaction), beforeReceiptCommit ? (temporary) => beforeReceiptCommit('complete', temporary) : undefined);
    await unlink(join(receiptsRoot, 'pending.json'));
    await syncDirectory(receiptsRoot);
    return summary;
  } finally { await unlink(lock); }
}

/** Explicit recovery refuses to overwrite any changes made after interruption. */
export async function recoverEditorialCuration({ projectRoot }) {
  const root = resolve(projectRoot), receiptsRoot = join(root, '.editorial-curation');
  await directory(root); await directory(receiptsRoot);
  const lock = join(receiptsRoot, '.lock'); await exclusive(lock, json({ pid: process.pid }));
  try {
    const path = join(receiptsRoot, 'pending.json'), contents = await text(path);
    if (contents === null) return { recovered: false };
    const transaction = parse(contents);
    if (transaction.version !== 1 || !/^[a-f0-9]{64}$/.test(transaction.payloadHash ?? '') || !record(transaction.summary) || transaction.summary.payloadHash !== transaction.payloadHash || !/^[a-f0-9]{64}$/.test(transaction.summary.revision ?? '') || !record(transaction.before) || !record(transaction.afterHashes) || Object.keys(transaction.before).some((name) => !FILES.includes(name)) || Object.keys(transaction.afterHashes).some((name) => !FILES.includes(name)) ||
        FILES.some((name) => !Object.hasOwn(transaction.before, name) || (transaction.before[name] !== null && typeof transaction.before[name] !== 'string') || (transaction.afterHashes[name] !== null && !/^[a-f0-9]{64}$/.test(transaction.afterHashes[name] ?? '')))) fail('整理恢复记录无效');
    if (transaction.before['.library.json'] !== null) validateLibraryState(parse(transaction.before['.library.json']));
    if (transaction.before['.filming.json'] !== null) validateFilmingState(parse(transaction.before['.filming.json']));
    const completePath = join(receiptsRoot, `${transaction.payloadHash}.json`);
    const completed = await text(completePath);
    let committed = false;
    if (completed !== null) {
      try { committed = JSON.stringify(JSON.parse(completed)) === JSON.stringify(transaction); }
      catch { /* Explicit offline recovery can quarantine an invalid old receipt below. */ }
    }
    let quarantinedReceipt;
    if (!committed) {
      for (const name of FILES) {
        const current = await text(join(root, name));
        if (current !== transaction.before[name] && (current === null ? null : hash(current)) !== transaction.afterHashes[name]) fail(`恢复停止：${name} 已被其他操作修改`, 409);
      }
      if (completed !== null) {
        quarantinedReceipt = `corrupt-complete-${transaction.payloadHash}-${randomUUID()}.json`;
        await rename(completePath, join(receiptsRoot, quarantinedReceipt));
        await syncDirectory(receiptsRoot);
      }
      for (const name of FILES) {
        if (transaction.before[name] === null) await unlink(join(root, name)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
        else await atomic(join(root, name), transaction.before[name]);
      }
      await syncDirectory(root);
    }
    await publishReceipt(join(receiptsRoot, `recovered-${transaction.payloadHash}-${randomUUID()}.json`), contents);
    await unlink(path); await syncDirectory(receiptsRoot);
    return { recovered: true, payloadHash: transaction.payloadHash, committed, ...(quarantinedReceipt ? { quarantinedReceipt } : {}) };
  } finally { await unlink(lock); }
}

function isMain() { try { return Boolean(process.argv[1]) && realpathSync(resolve(process.argv[1])) === realpathSync(fileURLToPath(import.meta.url)); } catch { return false; } }
if (isMain()) {
  try {
    const args = process.argv.slice(2), values = new Map();
    for (let index = 0; index < args.length; index++) {
      const key = args[index];
      if (['--apply', '--offline', '--prepare', '--recover', '--cleanup-legacy-folders'].includes(key)) values.set(key, true);
      else if (['--project', '--payload', '--curation', '--output', '--revision'].includes(key) && args[index + 1] && !args[index + 1].startsWith('--')) values.set(key, args[++index]);
      else fail(`未知参数：${key}`);
    }
    if (values.has('--prepare')) {
      if (!values.has('--curation') || !values.has('--output')) fail('准备需要 --curation JSON --output PAYLOAD');
      const payload = await prepareEditorialCuration(JSON.parse(await readFile(values.get('--curation'), 'utf8')));
      await exclusive(resolve(values.get('--output')), json(payload)); console.log(JSON.stringify({ prepared: payload.entries.length, output: values.get('--output') }));
    } else {
      if (!values.has('--project')) fail('需要 --project PATH');
      if ((values.has('--apply') || values.has('--recover')) && !values.has('--offline')) fail('写入前必须停止写作服务，并显式传入 --offline');
      if (values.has('--recover')) console.log(JSON.stringify(await recoverEditorialCuration({ projectRoot: values.get('--project') })));
      else {
        if (!values.has('--payload')) fail('需要 --payload JSON');
        console.log(JSON.stringify(await curateEditorial({ projectRoot: values.get('--project'), payload: JSON.parse(await readFile(values.get('--payload'), 'utf8')), dryRun: !values.has('--apply'), expectedRevision: values.get('--revision'), cleanupLegacyFolders: values.has('--cleanup-legacy-folders') })));
      }
    }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
