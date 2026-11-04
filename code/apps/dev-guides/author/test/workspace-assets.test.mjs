import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { Readable } from 'node:stream';
import { execFileSync } from 'node:child_process';
import { createContentWorkspace } from '../content-workspace.mjs';

async function fixture(t, options = {}) {
  const root = await mkdtemp(join(tmpdir(), 'workspace-assets-'));
  await mkdir(join(root, 'drafts'));
  await writeFile(join(root, 'drafts/first.md'), '---\ntitle: first\n---\nbody');
  await writeFile(join(root, 'drafts/second.md'), '---\ntitle: second\n---\nbody');
  let workspace = await createContentWorkspace({ projectRoot: root, chunkSize: 4, ...options });
  const server = createServer(async (request, response) => {
    try { if (!await workspace.handle(request, response, { url: new URL(request.url, 'http://localhost') })) { response.writeHead(404); response.end(); } }
    catch (error) { response.writeHead(error.status || 500, { 'Content-Type': 'application/json' }); response.end(JSON.stringify({ error: error.message })); }
  });
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const url = `http://127.0.0.1:${server.address().port}/api/workspaces`;
  const request = async (path, options) => { const response = await fetch(url + path, options); const bytes = Buffer.from(await response.arrayBuffer()); let data; try { data = JSON.parse(bytes); } catch { data = null; } return { status: response.status, headers: response.headers, data, bytes }; };
  const json = (body, method = 'POST') => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  t.after(async () => { await new Promise((done) => server.close(done)); await workspace.close(); await rm(root, { recursive: true, force: true }); });
  async function upload(bytes, meta = {}) {
    const started = await request('/first/uploads', json({ filename: 'clip.txt', category: 'other', size: bytes.length, ...meta }));
    assert.equal(started.status, 201, JSON.stringify(started.data));
    const upload = started.data;
    for (let part = 1; part <= upload.totalParts; part++) assert.equal((await request(`/first/uploads/${upload.id}/parts/${part}`, { method: 'PUT', body: bytes.subarray((part - 1) * upload.chunkSize, part * upload.chunkSize) })).status, 200);
    const result = await request(`/first/uploads/${upload.id}/complete`, { method: 'POST' }); return { ...result, upload };
  }
  return { root, get workspace() { return workspace; }, request, json, upload, async restart() { await workspace.close(); workspace = await createContentWorkspace({ projectRoot: root, chunkSize: 4, ...options }); } };
}

test('content identity survives draft promotion and process restart; unknown content rejected', async (t) => {
  const f = await fixture(t), first = await f.workspace.read('first');
  await mkdir(join(f.root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(f.root, 'src/content/tutorials/first.md'), 'published');
  await rm(join(f.root, 'drafts/first.md'));
  const reopened = await createContentWorkspace({ projectRoot: f.root });
  assert.equal((await reopened.read('first')).id, first.id);
  assert.equal((await f.request('/missing')).status, 404);
  await assert.rejects(() => f.workspace.read('../first'), { status: 400 });
});

test('notes and software metadata use revision conflict protection', async (t) => {
  const f = await fixture(t), first = await f.workspace.read('first');
  const updated = await f.request('/first', f.json({ revision: first.revision, notes: '字幕需重录', software: 'DaVinci Resolve', softwareVersion: '19' }, 'PATCH'));
  assert.equal(updated.status, 200); assert.equal(updated.data.notes, '字幕需重录');
  assert.equal((await f.request('/first', f.json({ revision: first.revision, notes: 'stale' }, 'PATCH'))).status, 409);
  assert.equal((await f.workspace.read('first')).notes, '字幕需重录');
});

test('Markdown production notes use the document category without needing an article body', async (t) => {
  const f = await fixture(t);
  await writeFile(join(f.root, 'drafts/first.md'), '---\ntitle: video-only topic\nstatus: draft\n---\n\n');
  const bytes = Buffer.from('# 剪辑说明\n\n保留原始文件，不需要先写文章。\n');
  const result = await f.upload(bytes, { filename: 'notes.md', category: 'subtitle' });
  assert.equal(result.status, 201);
  assert.equal(result.data.asset.category, 'subtitle');
  assert.deepEqual((await f.request(`/first/assets/${result.data.asset.id}`)).bytes, bytes);
});

test('resumable parts, idempotent part replay, final hash and repeat completion', async (t) => {
  const f = await fixture(t), bytes = Buffer.from('a-b-c-d-e');
  const started = await f.request('/first/uploads', f.json({ filename: 'note.txt', category: 'other', relativePath: 'project/docs/note.txt', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }));
  const id = started.data.id;
  assert.equal((await f.request(`/first/uploads/${id}/parts/1`, { method: 'PUT', body: bytes.subarray(0, 4) })).status, 200);
  await f.restart();
  assert.deepEqual((await f.request(`/first/uploads/${id}`)).data.uploadedParts, [1]);
  assert.equal((await f.request(`/first/uploads/${id}/parts/1`, { method: 'PUT', body: bytes.subarray(0, 4) })).status, 200);
  assert.equal((await f.request(`/first/uploads/${id}/parts/1`, { method: 'PUT', body: Buffer.from('xxxx') })).status, 409);
  assert.equal((await f.request(`/first/uploads/${id}/complete`, { method: 'POST' })).status, 409);
  for (let part = 2; part <= started.data.totalParts; part++) await f.request(`/first/uploads/${id}/parts/${part}`, { method: 'PUT', body: bytes.subarray((part - 1) * 4, part * 4) });
  const complete = await f.request(`/first/uploads/${id}/complete`, { method: 'POST' }); assert.equal(complete.status, 201);
  const repeat = await f.request(`/first/uploads/${id}/complete`, { method: 'POST' }); assert.equal(repeat.data.asset.id, complete.data.asset.id);
  assert.deepEqual((await f.request(`/first/assets/${complete.data.asset.id}`)).bytes, bytes);
  assert.equal((await f.request(`/second/assets/${complete.data.asset.id}`)).status, 404);
});

test('failed part verification removes only the partial merge and can retry with preserved parts', async (t) => {
  const f = await fixture(t), bytes = Buffer.from('original-notes');
  const started = await f.request('/first/uploads', f.json({ filename: 'notes.txt', category: 'other', size: bytes.length }));
  const upload = started.data, directory = join(f.root, '.content-workspace/uploads', upload.id);
  for (let part = 1; part <= upload.totalParts; part++) await f.request(`/first/uploads/${upload.id}/parts/${part}`, { method: 'PUT', body: bytes.subarray((part - 1) * 4, part * 4) });
  await writeFile(join(directory, '2.part'), 'xxxx');
  await writeFile(join(directory, 'combined.upload'), 'discarded previous interrupted merge');
  const failed = await f.request(`/first/uploads/${upload.id}/complete`, { method: 'POST' });
  assert.equal(failed.status, 422);
  await assert.rejects(readFile(join(directory, 'combined.upload')), { code: 'ENOENT' });
  assert.deepEqual(await readFile(join(directory, '1.part')), bytes.subarray(0, 4));
  assert.equal((await f.workspace.read('first')).assets.length, 0);
  await writeFile(join(directory, '2.part'), bytes.subarray(4, 8));
  const retried = await f.request(`/first/uploads/${upload.id}/complete`, { method: 'POST' });
  assert.equal(retried.status, 201);
  assert.deepEqual((await f.request(`/first/assets/${retried.data.asset.id}`)).bytes, bytes);
});

test('immutable original bytes, physical dedup, version grouping and private Range', async (t) => {
  const f = await fixture(t), bytes = Buffer.from('original bytes'), a = await f.upload(bytes), b = await f.upload(bytes);
  assert.equal(a.status, 201); assert.equal(b.status, 201); assert.notEqual(a.data.asset.id, b.data.asset.id);
  assert.equal(a.data.asset.groupId, b.data.asset.groupId); assert.equal(b.data.asset.version, 2);
  assert.equal((await f.workspace.read('first')).usage.bytes, bytes.length);
  assert.equal((await readdir(join(f.root, '.content-workspace/objects'))).length, 1);
  const range = await f.request(`/first/assets/${a.data.asset.id}`, { headers: { Range: 'bytes=1-4' } });
  assert.equal(range.status, 206); assert.equal(range.bytes.toString(), 'rigi'); assert.equal(range.headers.get('cache-control'), 'no-store');
  assert.match(range.headers.get('content-disposition'), /^attachment/);
  assert.equal((await f.request(`/first/assets/${a.data.asset.id}`, { headers: { Range: 'bytes=999-' } })).status, 416);
});

test('package ZIP is readable, preserves latest relative directories and all prior versions', async (t) => {
  const f = await fixture(t), older = await f.upload(Buffer.from('older bytes'), { filename: '工程.json', relativePath: 'edit/工程.json', category: 'project' });
  const newer = await f.upload(Buffer.from('newer bytes'), { filename: '工程.json', relativePath: 'edit/工程.json', category: 'project' });
  assert.equal(newer.status, 201);
  const archive = await f.request('/first/package.zip'); assert.equal(archive.status, 200);
  const path = join(f.root, 'package.zip'); await writeFile(path, archive.bytes);
  execFileSync('unzip', ['-t', path]);
  const metadata = JSON.parse(execFileSync('unzip', ['-p', path, 'manifest.json'], { encoding: 'utf8' }));
  assert.equal(metadata.files.length, 2); assert.equal(metadata.files[1].packagePath, 'materials/edit/工程.json');
  const contents = JSON.parse(execFileSync('python3', ['-c', 'import zipfile,json,sys; z=zipfile.ZipFile(sys.argv[1]); print(json.dumps({n:z.read(n).decode() for n in z.namelist() if n != "manifest.json"}))', path], { encoding: 'utf8' }));
  assert.equal(contents[metadata.files[0].packagePath], 'older bytes');
  assert.equal(contents[metadata.files[1].packagePath], 'newer bytes');
  assert.equal(metadata.files[0].id, older.data.asset.id);
});

test('unsafe paths, invalid types, limits and canceled upload do not enter asset manifest', async (t) => {
  const f = await fixture(t, { maxFileBytes: 20, maxStorageBytes: 30 });
  for (const relativePath of ['../note.txt', '/note.txt', 'foo/../note.txt', 'C:\\note.txt']) assert.equal((await f.request('/first/uploads', f.json({ filename: 'note.txt', relativePath, category: 'other', size: 4 }))).status, 422);
  assert.equal((await f.request('/first/uploads', f.json({ filename: 'note.txt', category: 'other', size: 21 }))).status, 413);
  const pending = await f.request('/first/uploads', f.json({ filename: 'note.txt', category: 'other', size: 20 }));
  assert.equal((await f.request('/first/uploads', f.json({ filename: 'more.txt', category: 'other', size: 20 }))).status, 413);
  assert.equal((await f.request(`/first/uploads/${pending.data.id}`, { method: 'DELETE' })).status, 200);
  const invalid = await f.upload(Buffer.from('fake video'), { filename: 'fake.mp4', category: 'video' });
  assert.equal(invalid.status, 422); assert.equal((await f.workspace.read('first')).assets.length, 0);
});

test('raw upload works, original project ZIP remains opaque and digest tampering fails closed', async (t) => {
  const f = await fixture(t), bytes = Buffer.from('opaque source');
  const result = await f.request('/first/assets', { method: 'POST', headers: { 'x-file-name': encodeURIComponent('工程.zip'), 'x-asset-category': 'project' }, body: bytes });
  assert.equal(result.status, 201);
  const trusted = await f.workspace.resolveAsset('first', result.data.asset.id); assert.deepEqual(await readFile(trusted.path), bytes);
  await writeFile(trusted.path, Buffer.alloc(bytes.length));
  await assert.rejects(() => f.workspace.resolveAsset('first', result.data.asset.id), { status: 422 });
});

test('symlink private root is rejected rather than following into another directory', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'workspace-symlink-')), outside = await mkdtemp(join(tmpdir(), 'workspace-outside-'));
  t.after(async () => { await rm(root, { recursive: true, force: true }); await rm(outside, { recursive: true, force: true }); });
  await symlink(outside, join(root, '.content-workspace'));
  await assert.rejects(() => createContentWorkspace({ projectRoot: root }), { status: 500 });
});

test('real video probe, selected version switching and cross-content selection rejected', async (t) => {
  const f = await fixture(t, { chunkSize: 64 * 1024 }), path = join(f.root, 'source.mp4');
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'color=c=blue:s=160x90:d=0.2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', path]);
  const bytes = await readFile(path), first = await f.upload(bytes, { filename: 'video.mp4', category: 'video' }), second = await f.upload(bytes, { filename: 'video.mp4', category: 'video' });
  assert.equal(first.status, 201); assert.equal(first.data.asset.width, 160); assert.equal(first.data.asset.height, 90);
  assert.equal(second.data.workspace.currentVideo.id, second.data.asset.id);
  const selected = await f.request('/first', f.json({ revision: second.data.workspace.revision, selectedVideoId: first.data.asset.id }, 'PATCH'));
  assert.equal(selected.status, 200); assert.equal(selected.data.currentVideo.id, first.data.asset.id);
  const other = await f.workspace.read('second');
  assert.equal((await f.request('/second', f.json({ revision: other.revision, selectedVideoId: first.data.asset.id }, 'PATCH'))).status, 422);
  const wrong = await f.upload(bytes, { filename: 'video.webm', category: 'video' }); assert.equal(wrong.status, 422);
});

test('real image is decoded without recompressing original bytes', async (t) => {
  const f = await fixture(t, { chunkSize: 64 * 1024 });
  const { default: sharp } = await import('sharp'); const bytes = await sharp({ create: { width: 2, height: 3, channels: 4, background: '#ff000080' } }).png().toBuffer();
  const result = await f.upload(bytes, { filename: 'image.png', category: 'image' });
  assert.equal(result.status, 201); assert.equal(result.data.asset.width, 2); assert.equal(result.data.asset.height, 3);
  assert.deepEqual((await f.request(`/first/assets/${result.data.asset.id}`)).bytes, bytes);
  const wrong = await f.upload(bytes, { filename: 'image.jpg', category: 'image' }); assert.equal(wrong.status, 422);
});

test('configured private object storage streams Range/ZIP without public URLs and publisher cache is released', async (t) => {
  const objects = new Map();
  const storage = { provider: 's3', label: '私有对象存储', async putFile(path, asset) { objects.set(asset.sha256, await readFile(path)); }, async verify(asset) { assert.equal(objects.get(asset.sha256).length, asset.size); return { size: asset.size }; }, async openRead(asset, range) { const bytes = objects.get(asset.sha256); return Readable.from([range ? bytes.subarray(range.start, range.end + 1) : bytes]); } };
  const f = await fixture(t, { storage }), bytes = Buffer.from('original in private cloud'), result = await f.upload(bytes);
  assert.equal(result.status, 201); assert.equal(result.data.asset.storage, 's3'); assert.equal(result.data.workspace.storage.cloudConfigured, true);
  assert.equal((await readdir(join(f.root, '.content-workspace/objects'))).length, 0);
  assert.equal((await readdir(join(f.root, '.content-workspace/cache'))).length, 0);
  assert.equal((await f.request(`/first/assets/${result.data.asset.id}`, { headers: { Range: 'bytes=0-7' } })).bytes.toString(), 'original');
  assert.equal((await readdir(join(f.root, '.content-workspace/cache'))).length, 0);
  const archive = await f.request('/first/package.zip'); assert.equal(archive.status, 200); assert.equal((await readdir(join(f.root, '.content-workspace/cache'))).length, 0);
  const local = await f.workspace.resolveAsset('first', result.data.asset.id); assert.deepEqual(await readFile(local.path), bytes);
  await f.workspace.releaseAsset('first', result.data.asset.id); assert.equal((await readdir(join(f.root, '.content-workspace/cache'))).length, 0);
  assert.ok(!JSON.stringify(result.data).includes('http'));
});
