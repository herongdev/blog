import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { mkdtemp, mkdir, readFile, writeFile, rename, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request as httpRequest } from 'node:http';
import { createArticleRevisions } from '../article-revisions.mjs';
import { createUpdateTasks } from '../update-tasks.mjs';
import { createAuthorServer } from '../server-core.mjs';
import { createContentWorkspace } from '../content-workspace.mjs';
import { createPublishingService } from '../publishing/service.mjs';
import { createWorkspaceHandler } from '../workspace-api.mjs';
import { createPublishingStore } from '../publishing/store.mjs';

const markdown = body => `---\ntitle: 历史教程\nstatus: published\n---\n\n${body}\n`;
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'content-updates-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'drafts'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  const path = join(root, 'src/content/tutorials/topic.md');
  await writeFile(path, markdown('原始正文'));
  const revisions = await createArticleRevisions({ projectRoot: root, bootstrapPublished: true });
  const content = { id: randomUUID(), slug: 'topic', revision: 'd'.repeat(64), notes: '原剪辑说明', software: '剪映', softwareVersion: '1', selectedVideoId: 'video-v1', assets: [
    { id: 'video-v1', groupId: 'video-group', version: 1, category: 'video', sha256: 'a'.repeat(64), filename: 'old.mp4', relativePath: 'old.mp4', size: 20, storage: 's3', bucket: 'private-hidden', privateKey: 'must-not-copy' },
    { id: 'project-v1', groupId: 'project-group', version: 1, category: 'project', sha256: 'c'.repeat(64), filename: 'project.zip', relativePath: 'project.zip', size: 30 },
  ] };
  const workspace = { async handle() { return false; }, async read(slug) { if (slug !== 'topic') throw Object.assign(new Error('missing'), { status: 404 }); return structuredClone(content); } };
  const calls = [];
  const schedule = { async read() { return { history: [{ start: '2026-11-02', entries: [{ slug: 'topic', done: true }] }] }; }, async enqueueUpdate(task) { calls.push(['enqueue', task.id]); }, async finishUpdate(id, action) { calls.push(['finish', id, action]); } };
  const updates = await createUpdateTasks({ projectRoot: root, revisions, workspace });
  const state = await revisions.read({ kind: 'content', slug: 'topic' });
  const input = { slug: 'topic', kind: 'content', scope: 'both', reason: 'correction', note: '更正第二步', sourceWeek: '2026-11-02', expectedRevision: state.workingRevision, requestId: randomUUID() };
  return { root, path, revisions, content, workspace, schedule, updates, input, calls };
}

test('create reuses content identity and immutable media refs without changing article or publication', async t => {
  const f = await fixture(t), before = await readFile(f.path);
  const task = await f.updates.create(f.input, f.schedule);
  assert.equal(task.contentId, f.content.id);
  assert.equal(task.base.articleRevision, f.input.expectedRevision);
  assert.equal(task.base.publishedRevision, f.input.expectedRevision);
  assert.equal(task.base.selectedVideoId, 'video-v1');
  assert.equal(task.base.assets.length, 2);
  assert.equal(task.base.assets[0].bucket, undefined);
  assert.equal(task.base.assets[0].privateKey, undefined);
  assert.deepEqual(await readFile(f.path), before);
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'topic' })).publishedRevision, f.input.expectedRevision);
  f.content.assets[0].filename = 'new-current-name.mp4';
  assert.equal((await f.updates.readTask(task.id, f.schedule)).base.assets[0].filename, 'old.mp4');
  assert.equal((await stat(join(f.root, '.content-updates/state.json'))).mode & 0o777, 0o600);
});

test('duplicate creation is idempotent; request reuse and concurrent active rounds conflict', async t => {
  const f = await fixture(t);
  const [one, two] = await Promise.all([f.updates.create(f.input, f.schedule), f.updates.create(f.input, f.schedule)]);
  assert.equal(one.id, two.id); assert.equal(f.calls.length, 1);
  await assert.rejects(f.updates.create({ ...f.input, scope: 'article' }, f.schedule), { status: 409 });
  await assert.rejects(f.updates.create({ ...f.input, requestId: randomUUID() }, f.schedule), { status: 409 });
  assert.equal((await f.updates.list('topic', f.schedule)).tasks.length, 1);
});

test('stale source revision, false history week and invalid data never create a task', async t => {
  const f = await fixture(t);
  for (const input of [{ ...f.input, expectedRevision: '0'.repeat(64) }, { ...f.input, sourceWeek: '2026-10-26' }]) await assert.rejects(f.updates.create(input, f.schedule), { status: 409 });
  for (const input of [{ ...f.input, slug: '../topic' }, { ...f.input, requestId: 'bad' }, { ...f.input, reason: 'unknown' }, { ...f.input, sourceWeek: '2026-11-03' }]) await assert.rejects(f.updates.create(input, f.schedule), { status: 422 });
  assert.equal((await f.updates.list('topic', f.schedule)).tasks.length, 0);
});

test('schedule preflight rejects archived content without leaving an active task', async t => {
  const f = await fixture(t);
  f.schedule.assertCanEnqueueUpdate = async () => { throw Object.assign(new Error('archived'), { status: 409 }); };
  await assert.rejects(f.updates.create(f.input, f.schedule), { status: 409 });
  assert.equal((await f.updates.list('topic', f.schedule)).tasks.length, 0);
});

test('complete freezes the new version, old snapshots remain, a later round is independent', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  await writeFile(f.path, markdown('新版正文'));
  const article = await f.revisions.read({ kind: 'content', slug: 'topic' });
  f.content.assets.push({ ...f.content.assets[0], id: 'video-v2', version: 2, filename: 'new.mp4', sha256: 'b'.repeat(64) });
  f.content.selectedVideoId = 'video-v2';
  await assert.rejects(f.updates.change(task.id, { action: 'complete', revision: '0'.repeat(64), expectedRevision: article.workingRevision }, f.schedule), { status: 409 });
  const done = await f.updates.change(task.id, { action: 'complete', revision: task.revision, expectedRevision: article.workingRevision }, f.schedule);
  assert.equal(done.status, 'completed'); assert.equal(done.result.selectedVideoId, 'video-v2');
  assert.equal(done.base.selectedVideoId, 'video-v1'); assert.equal(done.events.length, 2);
  assert.equal((await f.revisions.published({ kind: 'content', slug: 'topic' })).revision, f.input.expectedRevision);
  assert.match((await f.revisions.version({ kind: 'content', slug: 'topic' }, f.input.expectedRevision)).body, /原始正文/);
  assert.equal((await f.updates.change(task.id, { action: 'complete', revision: task.revision, expectedRevision: article.workingRevision }, f.schedule)).revision, done.revision);
  const next = await f.updates.create({ ...f.input, expectedRevision: article.workingRevision, requestId: randomUUID() }, f.schedule);
  assert.notEqual(next.id, task.id); assert.equal(next.contentId, task.contentId);
  assert.deepEqual((await f.updates.readTask(task.id, f.schedule)).result, done.result);
});

test('video completion requires a selected finish while article-only completion does not', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  f.content.selectedVideoId = null;
  await assert.rejects(f.updates.change(task.id, { action: 'complete', revision: task.revision, expectedRevision: f.input.expectedRevision }, f.schedule), { status: 422 });
  await f.updates.change(task.id, { action: 'cancel', revision: task.revision }, f.schedule);
  const articleTask = await f.updates.create({ ...f.input, scope: 'article', requestId: randomUUID() }, f.schedule);
  assert.equal((await f.updates.change(articleTask.id, { action: 'complete', revision: articleTask.revision, expectedRevision: f.input.expectedRevision }, f.schedule)).status, 'completed');
});

test('completion refuses unseen article or material changes from another device', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  const input = { action: 'complete', revision: task.revision, expectedRevision: f.input.expectedRevision, expectedWorkspaceRevision: f.content.revision };
  f.content.revision = 'e'.repeat(64);
  await assert.rejects(f.updates.change(task.id, input, f.schedule), { status: 409 });
  assert.equal((await f.updates.readTask(task.id, f.schedule)).status, 'active');
  await writeFile(f.path, markdown('其他设备的新内容'));
  await assert.rejects(f.updates.change(task.id, { ...input, expectedWorkspaceRevision: f.content.revision }, f.schedule), { status: 409 });
});

test('durable pending enqueue survives restart and GET replays once; cancellation stays recoverable', async t => {
  const f = await fixture(t);
  let fail = true; const enqueued = new Set();
  f.schedule.enqueueUpdate = async task => { if (fail) throw new Error('simulated write failure'); enqueued.add(task.id); };
  await assert.rejects(f.updates.create(f.input, f.schedule));
  const restarted = await createUpdateTasks({ projectRoot: f.root, revisions: f.revisions, workspace: f.workspace });
  const pending = await restarted.list('topic', f.schedule);
  assert.equal(pending.tasks.length, 1); assert.equal(pending.tasks[0].pendingSync, 'enqueue'); assert.ok(pending.tasks[0].syncError);
  fail = false;
  const recovered = await restarted.list('topic', f.schedule);
  assert.equal(recovered.tasks[0].pendingSync, undefined); assert.equal(enqueued.size, 1);
  await restarted.list('topic', f.schedule); assert.equal(enqueued.size, 1);
  const done = await restarted.change(recovered.tasks[0].id, { action: 'cancel', revision: recovered.tasks[0].revision }, f.schedule);
  assert.equal(done.status, 'canceled'); assert.equal(done.base.articleRevision, f.input.expectedRevision);
  await assert.rejects(restarted.validatePublication(done.id, { slug: 'topic', scope: 'article', articleRevision: f.input.expectedRevision }), { status: 409 });
});

test('cancellation can supersede a failed enqueue without requiring it to succeed', async t => {
  const f = await fixture(t);
  f.schedule.enqueueUpdate = async () => { throw new Error('article archived after preflight'); };
  await assert.rejects(f.updates.create(f.input, f.schedule));
  const task = (await f.updates.list('topic', f.schedule)).activeTask;
  const canceled = await f.updates.change(task.id, { action: 'cancel', revision: task.revision }, f.schedule);
  assert.equal(canceled.status, 'canceled'); assert.equal(canceled.pendingSync, undefined);
});

test('task creation and completion follow draft promotion without changing the content identity', async t => {
  const f = await fixture(t);
  await rename(f.path, join(f.root, 'drafts/topic.md'));
  const task = await f.updates.create({ ...f.input, kind: 'draft' }, f.schedule);
  await rename(join(f.root, 'drafts/topic.md'), f.path);
  const done = await f.updates.change(task.id, { action: 'complete', revision: task.revision, expectedRevision: f.input.expectedRevision }, f.schedule);
  assert.equal(done.kind, 'content'); assert.equal(done.contentId, task.contentId);
});

test('publication ownership, scope and exact completed versions are enforced', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  await assert.rejects(f.updates.validatePublication(task.id, { slug: 'elsewhere', scope: 'article', articleRevision: f.input.expectedRevision }), { status: 409 });
  await assert.rejects(f.updates.validatePublication(task.id, { slug: 'topic', scope: 'video', videoSha256: 'b'.repeat(64) }), { status: 409 });
  await f.updates.validatePublication(task.id, { slug: 'topic', scope: 'video', videoSha256: 'a'.repeat(64) });
  const done = await f.updates.change(task.id, { action: 'complete', revision: task.revision, expectedRevision: f.input.expectedRevision }, f.schedule);
  await writeFile(f.path, markdown('下一轮内容'));
  const next = await f.revisions.read({ kind: 'content', slug: 'topic' });
  await assert.rejects(f.updates.validatePublication(done.id, { slug: 'topic', scope: 'article', articleRevision: next.workingRevision, frozen: true }), { status: 409 });
  await f.updates.validatePublication(done.id, { slug: 'topic', scope: 'article', articleRevision: done.result.articleRevision, frozen: true });
  const articleTask = await f.updates.create({ ...f.input, scope: 'article', expectedRevision: next.workingRevision, requestId: randomUUID() }, f.schedule);
  await assert.rejects(f.updates.validatePublication(articleTask.id, { slug: 'topic', scope: 'video', videoSha256: 'a'.repeat(64) }), { status: 409 });
});

test('only confirmed website activations become records; baseline and repeated updates remain', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  await writeFile(f.path, markdown('新版内容'));
  const article = await f.revisions.read({ kind: 'content', slug: 'topic' });
  const plan = await f.revisions.prepareSelection({ kind: 'content', slug: 'topic', revision: article.workingRevision, updateTaskId: task.id });
  assert.equal((await f.revisions.publications('topic')).length, 1);
  assert.equal((await f.revisions.publications('topic'))[0].legacy, true);
  assert.equal((await f.revisions.plan(plan.id)).selection.updateTaskId, task.id);
  await f.revisions.commit(plan, '2026-11-10T03:00:00.000Z');
  await f.revisions.commit(plan, '2026-11-10T03:00:00.000Z');
  const records = await f.revisions.publications('topic');
  assert.equal(records.length, 2); assert.equal(records[0].updateTaskId, task.id);
  assert.equal(records[1].revision, f.input.expectedRevision); assert.equal(records[1].publishedAt, null);
  const remove = await f.revisions.prepareSelection({ kind: 'content', slug: 'topic', action: 'unpublish' });
  await f.revisions.commit(remove);
  assert.deepEqual((await f.revisions.publications('topic')).map(record => record.action), ['unpublish', 'publish', 'publish']);
});

test('an in-place image replacement cannot rewrite the image map of an old body revision', async t => {
  const f = await fixture(t);
  await mkdir(join(f.root, 'src/content/tutorials/topic'));
  await writeFile(join(f.root, 'src/content/tutorials/topic/shot.png'), 'old-image');
  await writeFile(f.path, markdown('![截图](./topic/shot.png)'));
  const current = await f.revisions.read({ kind: 'content', slug: 'topic' });
  await writeFile(join(f.root, 'src/content/tutorials/topic/shot.png'), 'new-image');
  await assert.rejects(f.revisions.prepareSelection({ kind: 'content', slug: 'topic', revision: current.workingRevision }), { status: 409 });
  const state = JSON.parse(await readFile(join(f.root, '.article-revisions/state.json')));
  assert.equal(await readFile(join(f.root, '.article-revisions/objects', state.history.topic[current.workingRevision].assets[0].revision), 'utf8'), 'old-image');
});

test('channel jobs keep old payloads, persist task identity, and revalidate before submitting or retrying', async t => {
  const f = await fixture(t);
  const store = createPublishingStore(join(f.root, 'publishing.sqlite')); t.after(() => store.close());
  const account = store.createAccount({ platform: 'douyin', alias: '隔离账号' });
  store.addAsset({ id: 'published-video', type: 'video', filename: 'old.mp4', sha256: 'a'.repeat(64), size: 20, mime: 'video/mp4' });
  const payload = { content_ref: { id: f.content.id, slug: 'topic' }, video_asset_id: 'published-video', defaults: { title: '原始发布', description: '', tags: [] }, targets: [{ account_id: account.id }] };
  const original = store.createJob(payload), frozenOriginal = JSON.stringify(store.job(original.id));
  let handled = false, response;
  const publishing = { store, async handle() { handled = true; return true; } };
  const updates = await createUpdateTasks({ projectRoot: f.root, revisions: f.revisions, workspace: f.workspace, publishing });
  const task = await updates.create(f.input, f.schedule);
  const handler = createWorkspaceHandler({ workspace: f.workspace, revisions: f.revisions, publishing, updates });
  const context = { url: new URL('http://local.test/api/publishing/jobs'), async readJson() { return { ...payload, content_ref: { ...payload.content_ref, updateTaskId: task.id } }; }, sendJson(_r, status, data) { response = { status, data }; }, httpError(status, message) { return Object.assign(new Error(message), { status }); } };
  assert.equal(await handler({ method: 'POST' }, {}, context), true);
  assert.equal(response.status, 201);
  const job = response.data.job;
  assert.equal(job.content_ref.updateTaskId, task.id);
  assert.equal(JSON.stringify(store.job(original.id)), frozenOriginal);
  assert.deepEqual((await updates.list('topic', f.schedule)).publications.channels.map(value => value.updateTaskId), [task.id, null]);
  await updates.change(task.id, { action: 'cancel', revision: task.revision }, f.schedule);
  for (const path of [`/api/publishing/jobs/${job.id}/submit`, `/api/publishing/targets/${job.targets[0].id}/retry`]) {
    context.url = new URL('http://local.test' + path);
    await assert.rejects(handler({ method: 'POST' }, {}, context), { status: 409 });
    assert.equal(handled, false);
  }
  assert.equal(store.job(job.id).status, 'draft'); assert.equal(JSON.stringify(store.job(original.id)), frozenOriginal);
});

test('production confirmation revalidates the preview task before invoking the publisher', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  const plan = await f.revisions.prepareSelection({ slug: 'topic', kind: 'content', revision: f.input.expectedRevision, updateTaskId: task.id });
  await f.updates.change(task.id, { action: 'cancel', revision: task.revision }, f.schedule);
  let started = false;
  const handler = createWorkspaceHandler({ revisions: f.revisions, workspace: { async handle() { return false; } }, updates: f.updates, manager: { async start() { started = true; } } });
  const context = { url: new URL('http://local.test/api/publish'), async readJson() { return { environment: 'production', previewId: plan.id }; }, httpError(status, message) { return Object.assign(new Error(message), { status }); } };
  await assert.rejects(handler({ method: 'POST' }, {}, context), { status: 409 }); assert.equal(started, false);
});

test('invalid pending-sync state fails closed instead of being treated as cancellation', async t => {
  const f = await fixture(t), task = await f.updates.create(f.input, f.schedule);
  const path = join(f.root, '.content-updates/state.json');
  const state = JSON.parse(await readFile(path)); state.tasks[0].pendingSync = 'unknown'; await writeFile(path, JSON.stringify(state));
  await assert.rejects(f.updates.readTask(task.id, f.schedule), { status: 500 });
  assert.equal(f.calls.some(call => call[0] === 'finish'), false);
});

test('online update routes inherit authentication; local writes require CSRF and preserve original article', async t => {
  const root = await mkdtemp(join(tmpdir(), 'update-host-'));
  await mkdir(join(root, 'drafts'), { recursive: true }); await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'drafts/topic.md'), markdown('原始内容'));
  const revisions = await createArticleRevisions({ projectRoot: root });
  const workspace = await createContentWorkspace({ projectRoot: root, env: {} });
  const publishing = await createPublishingService({ dataRoot: join(root, 'private'), env: {}, startWorker: false });
  const updates = await createUpdateTasks({ projectRoot: root, revisions, workspace, publishing });
  const apiHandler = createWorkspaceHandler({ workspace, revisions, publishing, updates });
  const online = createAuthorServer({ projectRoot: root, articleRevisions: revisions, apiHandler,
    auth: { origin: 'https://author.example.test', basePath: '/admin/', stateDirectory: join(root, 'auth'), bootstrapTokenFile: join(root, 'bootstrap') } });
  const server = createAuthorServer({ projectRoot: root, articleRevisions: revisions, apiHandler });
  online.listen(0, '127.0.0.1'); server.listen(0, '127.0.0.1'); await Promise.all([once(online, 'listening'), once(server, 'listening')]);
  t.after(async () => { await publishing.close(); await workspace.close(); await Promise.all([server, online].map(s => new Promise(done => { s.close(done); s.closeIdleConnections(); }))); await rm(root, { recursive: true, force: true }); });
  const onlineUrl = `http://127.0.0.1:${online.address().port}`;
  for (const path of ['/api/content-updates?slug=topic', `/api/content-updates/${randomUUID()}`]) {
    const status = await new Promise((done, reject) => { const req = httpRequest(onlineUrl + path, { headers: { Host: 'author.example.test' } }, res => { res.resume(); res.once('end', () => done(res.statusCode)); }); req.on('error', reject); req.end(); });
    assert.equal(status, 401);
  }
  const origin = `http://127.0.0.1:${server.address().port}`;
  const revision = await revisions.read({ kind: 'draft', slug: 'topic' });
  const payload = { slug: 'topic', kind: 'draft', reason: 'adapt', scope: 'article', expectedRevision: revision.workingRevision, requestId: randomUUID() };
  assert.equal((await fetch(origin + '/api/content-updates', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).status, 403);
  const { token } = await (await fetch(origin + '/api/session')).json();
  const headers = { Origin: origin, 'Content-Type': 'application/json', 'x-author-token': token };
  const response = await fetch(origin + '/api/content-updates', { method: 'POST', headers, body: JSON.stringify(payload) });
  assert.equal(response.status, 201, await response.clone().text());
  const { task } = await response.json();
  assert.equal(task.status, 'active');
  assert.equal((await (await fetch(origin + '/api/content-updates?slug=topic')).json()).activeTask.id, task.id);
  assert.equal((await fetch(origin + '/.content-updates/state.json')).status, 404);
  assert.equal((await fetch(origin + `/api/content-updates/${task.id}`, { method: 'PATCH', headers, body: 'null' })).status, 422);
  assert.match(await readFile(join(root, 'drafts/topic.md'), 'utf8'), /原始内容/);
});
