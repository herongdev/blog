import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash, randomUUID } from 'node:crypto';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { curateEditorial, recoverEditorialCuration, prepareEditorialCuration } from '../editorial-curation.mjs';
import { createLibraryStore } from '../library-store.mjs';
import { createFilmingStore } from '../filming-store.mjs';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const json = (value) => JSON.stringify(value, null, 2);
const markdown = (title, id) => `---\ntitle: ${JSON.stringify(title)}\nstatus: ${id ? 'draft' : 'lead'}\n${id ? `editorial:\n  sourceId: ${id}\n` : ''}---\n\n当前工作正文，不是原始调研卡。\n`;
function entry(sourceId, slug, decision) {
  const payload = { id: sourceId, title: `原调研标题 ${sourceId}`, hook: '原始问题', demo: '完整原始步骤', proof: '尚未亲测', sourceUrls: ['https://example.test/docs'] };
  const sha256 = hash(JSON.stringify(payload));
  return { sourceId, slug, decision, reason: decision === 'keep' ? '可演示实际定位过程' : '收益不足，退出拍摄工作池', folderPath: decision === 'keep' ? ['排错定位'] : [], originalFolderPath: ['旧主计划', '第1周'], filming: { goal: '准备目标', notes: '待亲测' }, source: { id: `research-${sourceId}-${sha256.slice(0, 16)}`, kind: 'research', label: '调研资料', sourceId, title: payload.title, body: '完整原始调研卡', urls: payload.sourceUrls, payload, sha256 } };
}
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'editorial-curation-'));
  for (const relative of ['drafts', 'src/content/tutorials', '.article-revisions', '.editorial-imports/import-batch-1']) await mkdir(join(root, relative), { recursive: true });
  const files = { 'drafts/mine-renamed.md': markdown('用户改过的标题', 'DG001'), 'src/content/tutorials/cursor-remote-control.md': markdown('当前公开文章标题'), 'drafts/my-idea.md': markdown('用户自己添加的选题') };
  for (const [name, value] of Object.entries(files)) await writeFile(join(root, name), value);
  const parent = randomUUID(), child = randomUUID(), user = randomUUID();
  const userFolder = { id: user, name: '用户自己的目录', parentId: null };
  const library = { version: 1, folders: [{ id: parent, name: '旧主计划', parentId: null }, { id: child, name: '第1周', parentId: parent }, userFolder], assignmentsBySlug: { 'mine-renamed': child, 'cursor-remote-control': child, 'my-idea': user } };
  await writeFile(join(root, '.library.json'), json(library));
  const stored = (slug) => ({ slug, title: slug, kind: slug === 'cursor-remote-control' ? 'content' : 'draft', status: 'draft' });
  const schedule = { version: 2, current: { start: '2026-11-02', entries: [{ ...stored('cursor-remote-control'), done: true }] }, queue: [stored('mine-renamed'), stored('my-idea')], history: [{ start: '2026-10-26', entries: [{ ...stored('cursor-remote-control'), title: '历史标题', done: true }] }] };
  await writeFile(join(root, '.schedule.json'), json(schedule));
  const publication = json({ version: 1, published: { 'cursor-remote-control': { revision: 'a'.repeat(64) } } });
  await writeFile(join(root, '.article-revisions/state.json'), publication);
  await writeFile(join(root, '.editorial-imports/import-batch.json'), json({ entries: { DG001: { slug: 'codex-dg001' }, DG125: { slug: 'cursor-remote-control' } } }));
  await writeFile(join(root, '.editorial-imports/import-batch-1/before.json'), json({ library: json({ version: 1, folders: [userFolder], assignmentsBySlug: {} }) }));
  await writeFile(join(root, '.editorial-imports/import-batch-1/plan.json'), json([{ sourceId: 'DG001', folderPath: ['旧主计划', '第1周'] }]));
  await writeFile(join(root, '.editorial-imports/import-batch-1/complete.json'), json({ batchId: 'import-batch' }));
  const payload = { version: 1, batchId: 'import-batch', reviewedAt: '2026-11-04', entries: [entry('DG001', 'codex-dg001', 'keep'), entry('DG125', 'cursor-remote-control', 'archive')] };
  return { root, payload, files, library, schedule, publication, close: () => rm(root, { recursive: true, force: true }) };
}

test('curation dry-run and revision-guarded apply preserve articles/publication, attach complete research and remove only approved legacy directories', async () => {
  const f = await fixture();
  try {
    const options = { projectRoot: f.root, payload: f.payload, cleanupLegacyFolders: true };
    const preview = await curateEditorial(options);
    assert.equal(preview.kept, 1); assert.equal(preview.archived, 1); assert.equal(preview.removedScheduleEntries, 1);
    assert.equal(preview.candidateFolderRemovals.length, 2); assert.equal(preview.changes[0].slug, 'mine-renamed');
    assert.ok(!(await readdir(f.root)).includes('.editorial-curation'));
    assert.equal(await readFile(join(f.root, '.library.json'), 'utf8'), json(f.library));
    const changed = `${f.files['drafts/mine-renamed.md']}\n用户刚添加的正文\n`;
    await writeFile(join(f.root, 'drafts/mine-renamed.md'), changed);
    await assert.rejects(curateEditorial({ ...options, dryRun: false, expectedRevision: preview.revision }), { status: 409 });
    const current = await curateEditorial(options);
    await curateEditorial({ ...options, dryRun: false, expectedRevision: current.revision });
    const library = JSON.parse(await readFile(join(f.root, '.library.json'), 'utf8'));
    assert.deepEqual(library.folders.map((item) => item.name), ['用户自己的目录', '排错定位']);
    assert.equal(library.lifecycleBySlug['cursor-remote-control'].archived, true);
    assert.equal(library.assignmentsBySlug['my-idea'], f.library.assignmentsBySlug['my-idea']);
    const schedule = JSON.parse(await readFile(join(f.root, '.schedule.json'), 'utf8'));
    assert.deepEqual(schedule.history, f.schedule.history); assert.deepEqual(schedule.current.entries, []);
    assert.deepEqual(schedule.queue.map((item) => item.slug), ['mine-renamed', 'my-idea']);
    assert.equal(await readFile(join(f.root, '.article-revisions/state.json'), 'utf8'), f.publication);
    assert.equal(await readFile(join(f.root, 'drafts/mine-renamed.md'), 'utf8'), changed);
    for (const [path, bytes] of Object.entries(f.files).filter(([path]) => path !== 'drafts/mine-renamed.md')) assert.equal(await readFile(join(f.root, path), 'utf8'), bytes);
    const filming = createFilmingStore({ projectRoot: f.root, listArticleKeys: async () => ['draft/mine-renamed', 'content/cursor-remote-control'] });
    const card = await filming.read('cursor-remote-control');
    assert.deepEqual(card.sources[0].payload, f.payload.entries[1].source.payload);
    assert.deepEqual(card.curation.originalFolderPath, ['旧主计划', '第1周']);
    await filming.patch('cursor-remote-control', { revision: card.revision, preparation: { notes: '后续人工编辑' } });
    const store = createLibraryStore({ projectRoot: f.root, listArticleKeys: async () => ['draft/mine-renamed', 'content/cursor-remote-control'] });
    await store.apply({ revision: (await store.read()).revision, action: 'restore', articleKey: 'content/cursor-remote-control' });
    assert.equal((await curateEditorial({ ...options, dryRun: false, expectedRevision: current.revision })).alreadyApplied, true);
    assert.equal((await store.read()).lifecycleBySlug['cursor-remote-control'].archived, false);
    assert.equal((await filming.read('cursor-remote-control')).preparation.notes, '后续人工编辑');
  } finally { await f.close(); }
});

test('interrupted metadata migration blocks further apply and recovery preserves later user writes', async () => {
  const f = await fixture();
  try {
    const options = { projectRoot: f.root, payload: f.payload };
    const preview = await curateEditorial(options);
    await assert.rejects(curateEditorial({ ...options, dryRun: false, expectedRevision: preview.revision, beforeWrite: (name) => { if (name === '.filming.json') throw new Error('simulated interruption'); } }), /simulated interruption/);
    await assert.rejects(curateEditorial(options), { status: 409 });
    const applied = await readFile(join(f.root, '.library.json'), 'utf8');
    await writeFile(join(f.root, '.library.json'), `${applied}\n`);
    await assert.rejects(recoverEditorialCuration({ projectRoot: f.root }), { status: 409 });
    await writeFile(join(f.root, '.library.json'), applied);
    assert.equal((await recoverEditorialCuration({ projectRoot: f.root })).recovered, true);
    assert.equal(await readFile(join(f.root, '.library.json'), 'utf8'), json(f.library));
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), json(f.schedule));
    await assert.rejects(readFile(join(f.root, '.filming.json')), { code: 'ENOENT' });
    const retry = await curateEditorial(options);
    assert.equal(retry.revision, preview.revision);
    await curateEditorial({ ...options, dryRun: false, expectedRevision: retry.revision });
    // A crash after the commit receipt but before journal cleanup must only
    // finalize the receipt, even if editing resumed after the successful commit.
    const receipt = await readFile(join(f.root, '.editorial-curation', `${retry.payloadHash}.json`), 'utf8');
    await writeFile(join(f.root, '.editorial-curation/pending.json'), receipt);
    const edited = `${await readFile(join(f.root, '.filming.json'), 'utf8')}\n`;
    await writeFile(join(f.root, '.filming.json'), edited);
    assert.equal((await recoverEditorialCuration({ projectRoot: f.root })).recovered, true);
    assert.equal(await readFile(join(f.root, '.filming.json'), 'utf8'), edited);
  } finally { await f.close(); }
});

test('self-contained payload includes all three reused research cards without borrowing article Markdown', async () => {
  const topics = JSON.parse(await readFile(new URL('../../../../docs/dev-guides/editorial/2026-10-27/topics.json', import.meta.url), 'utf8'));
  const recent = JSON.parse(await readFile(new URL('../../../../docs/dev-guides/editorial/2026-10-27/creator-month-scan.json', import.meta.url), 'utf8'));
  const ids = [...topics.topics.map((item) => item.id), ...recent.selectedIds];
  const payload = await prepareEditorialCuration({ version: 1, batchId: 'editorial-2026-10-27', entries: ids.map((sourceId) => ({ sourceId, slug: `test-${sourceId.toLowerCase()}`, decision: 'archive', reason: '测试归档', folderPath: [] })) });
  assert.equal(payload.entries.length, 138);
  for (const id of ['DG004', 'DG006', 'DG125']) {
    const item = payload.entries.find((entry) => entry.sourceId === id);
    assert.deepEqual(item.source.payload, topics.topics.find((entry) => entry.id === id));
    assert.match(item.source.label, /非用户原笔记/); assert.ok(item.source.body.includes(item.source.payload.demo));
    assert.match(item.source.body, /## 演示提纲/); assert.ok(!item.source.body.includes('### researchId'));
  }
});

test('interrupted pending and complete receipt publication never exposes partial final JSON and remains retryable', async () => {
  for (const phase of ['pending', 'complete']) {
    const f = await fixture();
    try {
      const options = { projectRoot: f.root, payload: f.payload };
      const preview = await curateEditorial(options);
      await assert.rejects(curateEditorial({ ...options, dryRun: false, expectedRevision: preview.revision, beforeReceiptCommit: async (stage, temporary) => {
        if (stage === phase) {
          await writeFile(temporary, '{"version":');
          throw new Error(`interrupted ${phase} receipt`);
        }
      } }), new RegExp(`interrupted ${phase} receipt`));
      await assert.rejects(readFile(join(f.root, '.editorial-curation', `${preview.payloadHash}.json`)), { code: 'ENOENT' });
      if (phase === 'pending') {
        await assert.rejects(readFile(join(f.root, '.editorial-curation/pending.json')), { code: 'ENOENT' });
        assert.equal(await readFile(join(f.root, '.library.json'), 'utf8'), json(f.library));
        assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), json(f.schedule));
        await assert.rejects(readFile(join(f.root, '.filming.json')), { code: 'ENOENT' });
      } else {
        assert.equal(JSON.parse(await readFile(join(f.root, '.editorial-curation/pending.json'), 'utf8')).payloadHash, preview.payloadHash);
        assert.equal((await recoverEditorialCuration({ projectRoot: f.root })).committed, false);
      }
      const retry = await curateEditorial(options); assert.equal(retry.revision, preview.revision);
      await curateEditorial({ ...options, dryRun: false, expectedRevision: retry.revision });
      assert.equal((await curateEditorial(options)).alreadyApplied, true);
    } finally { await f.close(); }
  }
});

test('explicit recovery quarantines legacy empty or truncated complete receipts only after all data hashes match', async () => {
  for (const broken of ['', '{"version":1,"payloadHash":']) {
    const f = await fixture();
    try {
      const options = { projectRoot: f.root, payload: f.payload };
      const preview = await curateEditorial(options);
      await assert.rejects(curateEditorial({ ...options, dryRun: false, expectedRevision: preview.revision, beforeReceiptCommit: (stage) => {
        if (stage === 'complete') throw new Error('before completion commit');
      } }), /before completion commit/);
      const completePath = join(f.root, '.editorial-curation', `${preview.payloadHash}.json`);
      await writeFile(completePath, broken, { flag: 'wx' });
      const applied = await readFile(join(f.root, '.library.json'), 'utf8');
      await writeFile(join(f.root, '.library.json'), `${applied}\n`);
      await assert.rejects(recoverEditorialCuration({ projectRoot: f.root }), { status: 409 });
      assert.equal(await readFile(completePath, 'utf8'), broken);
      assert.ok(!(await readdir(join(f.root, '.editorial-curation'))).some((name) => name.startsWith('corrupt-complete-')));
      await writeFile(join(f.root, '.library.json'), applied);
      // Simulate a previous recovery stopping halfway: before/after mixtures
      // are both known, so a second recovery can safely finish the rollback.
      await writeFile(join(f.root, '.schedule.json'), json(f.schedule));
      const result = await recoverEditorialCuration({ projectRoot: f.root });
      assert.equal(result.committed, false); assert.ok(result.quarantinedReceipt);
      assert.equal(await readFile(join(f.root, '.editorial-curation', result.quarantinedReceipt), 'utf8'), broken);
      await assert.rejects(readFile(completePath), { code: 'ENOENT' });
      assert.equal(await readFile(join(f.root, '.library.json'), 'utf8'), json(f.library));
      assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), json(f.schedule));
      await assert.rejects(readFile(join(f.root, '.filming.json')), { code: 'ENOENT' });
      const retry = await curateEditorial(options); assert.equal(retry.revision, preview.revision);
      await curateEditorial({ ...options, dryRun: false, expectedRevision: retry.revision });
    } finally { await f.close(); }
  }
});
