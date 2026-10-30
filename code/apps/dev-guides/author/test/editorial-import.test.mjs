import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, symlink, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { importEditorial } from '../editorial-import.mjs';
import { createLibraryStore } from '../library-store.mjs';

const markdown = (id, title = '完整的草稿标题', text = '待实测：操作步骤。') => `---\ntitle: ${JSON.stringify(title)}\nstatus: draft\ntool: codex\neditorial:\n  sourceId: ${id}\n---\n\n${text}\n`;
const draft = (id = 'DG001', slug = 'dg001') => ({ sourceId: id, slug, kind: 'draft', title: '完整的草稿标题', folderPath: ['半年主计划', '第01周'], markdown: markdown(id) });
const payload = (entries) => ({ version: 1, batchId: '2026-10-plan', entries });
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'editorial-import-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  return root;
}

test('preflight is read-only; import creates private drafts and reuses existing text', async (t) => {
  const projectRoot = await fixture(t);
  const old = markdown('OLD001', '原来的文章标题', '保留这篇文章的正文。').replace('status: draft', 'status: lead');
  await writeFile(join(projectRoot, 'src/content/tutorials/old.md'), old);
  const data = payload([draft(), { sourceId: 'DG002', slug: 'old', kind: 'content', title: '计划中的旧标题', folderPath: ['半年主计划', '第01周'] }]);
  assert.equal((await importEditorial({ projectRoot, payload: data })).created, 1);
  assert.deepEqual(await readdir(projectRoot), ['src']);
  const result = await importEditorial({ projectRoot, payload: data, dryRun: false });
  assert.equal(result.created, 1); assert.equal(result.reused, 1);
  assert.equal(await readFile(join(projectRoot, 'src/content/tutorials/old.md'), 'utf8'), old);
  assert.equal((await stat(join(projectRoot, 'drafts/dg001.md'))).mode & 0o777, 0o600);
  const lib = JSON.parse(await readFile(join(projectRoot, '.library.json'), 'utf8'));
  assert.equal(lib.folders.length, 2);
  assert.equal(lib.assignmentsBySlug.dg001, lib.assignmentsBySlug.old);
});

test('rerun preserves edited text, moved and unfiled articles, promoted articles, and deletions', async (t) => {
  const projectRoot = await fixture(t); const data = payload([draft(), draft('DG002', 'dg002'), draft('DG003', 'dg003')]);
  await importEditorial({ projectRoot, payload: data, dryRun: false });
  const edited = markdown('DG001', '作者修改后的标题', '作者写的完整正文。');
  await writeFile(join(projectRoot, 'drafts/dg001.md'), edited);
  const lib = createLibraryStore({ projectRoot, listArticleKeys: async () => ['draft/dg001', 'draft/dg002', 'draft/dg003'] });
  let state = await lib.read();
  state = await lib.apply({ revision: state.revision, action: 'create', parentId: null, name: '作者自己的分类' });
  state = await lib.apply({ revision: state.revision, action: 'assign', articleKey: 'draft/dg001', folderId: state.createdId });
  state = await lib.apply({ revision: state.revision, action: 'assign', articleKey: 'draft/dg002', folderId: null });
  const libraryBefore = await readFile(join(projectRoot, '.library.json'), 'utf8');
  await writeFile(join(projectRoot, 'src/content/tutorials/dg002.md'), markdown('DG002').replace('status: draft', 'status: lead'));
  await unlink(join(projectRoot, 'drafts/dg002.md'));
  await unlink(join(projectRoot, 'drafts/dg003.md'));
  const result = await importEditorial({ projectRoot, payload: data, dryRun: false });
  assert.equal(result.created, 0); assert.equal(result.preserved, 3);
  assert.equal(await readFile(join(projectRoot, 'drafts/dg001.md'), 'utf8'), edited);
  assert.equal(await readFile(join(projectRoot, '.library.json'), 'utf8'), libraryBefore);
  assert.deepEqual(await readdir(join(projectRoot, 'drafts')), ['dg001.md']);
});

test('collision anywhere in batch aborts before creating files or folders', async (t) => {
  const projectRoot = await fixture(t);
  await mkdir(join(projectRoot, 'drafts'));
  const original = markdown('USER001');
  await writeFile(join(projectRoot, 'drafts/occupied.md'), original);
  const data = payload([draft(), draft('DG002', 'occupied')]);
  await assert.rejects(importEditorial({ projectRoot, payload: data, dryRun: false }), /文章地址冲突/);
  assert.deepEqual(await readdir(projectRoot), ['drafts', 'src']);
  assert.deepEqual(await readdir(join(projectRoot, 'drafts')), ['occupied.md']);
  assert.equal(await readFile(join(projectRoot, 'drafts/occupied.md'), 'utf8'), original);
});

test('rejects bad YAML, duplicate IDs, wrong status, invalid folder paths, and symlink articles', async (t) => {
  const projectRoot = await fixture(t);
  for (const data of [payload([draft(), draft()]), payload([{ ...draft(), markdown: markdown('DG001').replace('status: draft', 'status: published') }]), payload([{ ...draft(), markdown: '---\ntitle: [\n---\n' }]), payload([{ ...draft(), folderPath: ['../escape'] }])]) {
    await assert.rejects(importEditorial({ projectRoot, payload: data, dryRun: false }));
  }
  await mkdir(join(projectRoot, 'drafts'));
  await writeFile(join(projectRoot, 'external.md'), markdown('DG001'));
  await symlink(join(projectRoot, 'external.md'), join(projectRoot, 'drafts/dg001.md'));
  await assert.rejects(importEditorial({ projectRoot, payload: payload([draft()]), dryRun: false }), /普通文件/);
  assert.equal(await readFile(join(projectRoot, 'external.md'), 'utf8'), markdown('DG001'));
});

test('invalid existing library aborts before mutation', async (t) => {
  const projectRoot = await fixture(t);
  // A deliberately invalid library assignment is caught before any mutation.
  await writeFile(join(projectRoot, '.library.json'), '{broken');
  await assert.rejects(importEditorial({ projectRoot, payload: payload([draft()]), dryRun: false }), /目录数据损坏/);
  assert.equal(await readFile(join(projectRoot, '.library.json'), 'utf8'), '{broken');
  assert.deepEqual(await readdir(projectRoot), ['.library.json', 'src']);
});

test('library write failure after draft creation restores metadata and removes only new drafts', async (t) => {
  const projectRoot = await fixture(t);
  const id = '920b9d6b-a9af-45c9-95f1-4535aef76861';
  const library = { version: 1, folders: [{ id, name: '保留目录', parentId: null }], assignmentsBySlug: {} };
  let index = 0;
  while (Buffer.byteLength(JSON.stringify(library, null, 2)) <= 1024 * 1024) {
    library.assignmentsBySlug[`archived-${index++}-${'x'.repeat(150)}`] = id;
  }
  const original = JSON.stringify(library);
  assert.ok(Buffer.byteLength(original) < 1024 * 1024);
  await writeFile(join(projectRoot, '.library.json'), original);
  await assert.rejects(importEditorial({ projectRoot, payload: payload([draft()]), dryRun: false }), /目录数据超过大小限制/);
  assert.equal(await readFile(join(projectRoot, '.library.json'), 'utf8'), original);
  assert.deepEqual(await readdir(join(projectRoot, 'drafts')), []);
  assert.ok(!(await readdir(join(projectRoot, '.editorial-imports'))).includes('.import.lock'));
});
