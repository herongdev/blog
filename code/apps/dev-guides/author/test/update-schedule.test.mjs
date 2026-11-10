import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createScheduleStore } from '../schedule-store.mjs';
import { createAuthorServer } from '../server-core.mjs';

const id = 'e63b8c74-7e26-4be8-9b27-74dbd94913ef';
const nextId = '260013b2-e1ba-4b82-9ec4-8e31d7dd7ca4';
const original = { slug: 'codex-icons', title: 'Codex 图标说明', kind: 'draft', status: 'draft' };
const task = { id, slug: original.slug, title: original.title, reason: 'adapt', scope: 'both' };
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'update-schedule-'));
  let time = '2026-11-03T04:00:00Z';
  let articles = [original, { ...original, slug: 'second-topic', title: '另一个主题' }];
  const store = createScheduleStore({ projectRoot: root, listArticles: async () => articles, now: () => time });
  await store.read();
  const act = async (input) => store.apply({ revision: (await store.read()).revision, ...input });
  return { root, store, act, setTime: (value) => { time = value; }, setArticles: (value) => { articles = value; }, disk: () => readFile(join(root, '.schedule.json'), 'utf8'), close: () => rm(root, { recursive: true, force: true }) };
}

test('update task coexists with original completed content and does not rewrite its history', async () => {
  const f = await fixture();
  try {
    await f.act({ action: 'pull', slug: original.slug });
    await f.act({ action: 'complete', slug: original.slug, done: true });
    const before = await f.store.read();
    let current = await f.store.enqueueUpdate(task);
    assert.deepEqual(current.thisWeek, before.thisWeek);
    assert.equal(current.queue[0].slug, original.slug);
    assert.equal(current.queue[0].updateTaskId, id);
    assert.equal(current.queue[0].updateReason, 'adapt');
    assert.equal(current.queue[0].updateScope, 'both');
    assert.equal(JSON.parse(await f.disk()).version, 3);
    current = await f.act({ action: 'pull', slug: original.slug, updateTaskId: id });
    assert.deepEqual(current.thisWeek.entries.map((entry) => [entry.updateTaskId, entry.done]), [[undefined, true], [id, false]]);
    const done = await f.store.finishUpdate(id, { done: true });
    assert.equal(done.thisWeek.entries[1].done, true);
    assert.deepEqual(done.thisWeek.entries[0], before.thisWeek.entries[0]);
    f.setTime('2026-11-10T04:00:00Z');
    const rolled = await f.store.read();
    assert.equal(rolled.history[0].entries.length, 2);
    assert.deepEqual(rolled.history[0].entries.map((entry) => entry.done), [true, true]);
    const history = structuredClone(rolled.history);
    await f.store.enqueueUpdate({ ...task, id: nextId, scope: 'article' });
    assert.deepEqual((await f.store.read()).history, history);
  } finally { await f.close(); }
});

test('durable enqueue replay is idempotent and cannot change an existing task association', async () => {
  const f = await fixture();
  try {
    await f.store.enqueueUpdate(task);
    await f.act({ action: 'move', slug: original.slug, updateTaskId: id, scope: 'queue', position: 3 });
    const before = await f.disk();
    await f.store.enqueueUpdate(task);
    assert.equal(await f.disk(), before, 'journal replay does not reset ordering');
    for (const change of [{ slug: 'second-topic' }, { scope: 'article' }, { reason: 'correction' }, { title: '改写绑定标题' }]) await assert.rejects(f.store.enqueueUpdate({ ...task, ...change }), { status: 409 });
    await assert.rejects(f.store.enqueueUpdate({ ...task, id: nextId }), { status: 409 });
    assert.equal(await f.disk(), before);
  } finally { await f.close(); }
});

test('legacy slug-only operations cannot select an update task and task actions cannot bypass snapshots', async () => {
  const f = await fixture();
  try {
    await f.act({ action: 'remove', slug: original.slug });
    await f.store.enqueueUpdate(task);
    const before = await f.disk();
    for (const input of [
      { action: 'move', slug: original.slug, scope: 'queue', position: 2 },
      { action: 'remove', slug: original.slug },
      { action: 'pull', slug: original.slug },
      { action: 'remove', slug: original.slug, updateTaskId: id },
      { action: 'enqueue', slug: original.slug, updateTaskId: id },
      { action: 'complete', slug: original.slug, updateTaskId: id, done: true },
      { action: 'move', slug: 'second-topic', updateTaskId: id, scope: 'queue', position: 1 },
    ]) await assert.rejects(f.act(input));
    assert.equal(await f.disk(), before);
    let state = await f.act({ action: 'transfer', slug: original.slug, updateTaskId: id, scope: 'current', position: 1 });
    assert.equal(state.thisWeek.entries[0].updateTaskId, id);
    state = await f.act({ action: 'defer', slug: original.slug, updateTaskId: id });
    assert.equal(state.queue.at(-1).updateTaskId, id);
  } finally { await f.close(); }
});

test('completion from pending queue records this week without resetting old weeks and retries are safe', async () => {
  const f = await fixture();
  try {
    await f.act({ action: 'pull', slug: original.slug });
    await f.act({ action: 'complete', slug: original.slug, done: true });
    f.setTime('2026-11-10T04:00:00Z');
    const history = (await f.store.read()).history;
    await f.store.enqueueUpdate(task);
    const done = await f.store.finishUpdate(id, { done: true });
    assert.equal(done.thisWeek.entries[0].done, true);
    assert.equal(done.thisWeek.entries[0].updateTaskId, id);
    assert.deepEqual(done.history, history);
    const before = await f.disk();
    await f.store.finishUpdate(id, { done: true });
    await f.store.enqueueUpdate(task);
    assert.equal(await f.disk(), before);
    await assert.rejects(f.store.finishUpdate(id, { canceled: true }), { status: 409 });
    f.setTime('2026-11-17T04:00:00Z');
    await f.store.read();
    const later = await f.disk();
    await f.store.finishUpdate(id, { done: true });
    await f.store.enqueueUpdate(task);
    assert.equal(await f.disk(), later, 'completed history does not reappear as a new queue item');
  } finally { await f.close(); }
});

test('pending update carries across weeks with identity and historical title intact', async () => {
  const f = await fixture();
  try {
    await f.store.enqueueUpdate(task);
    await f.act({ action: 'pull', slug: original.slug, updateTaskId: id });
    f.setTime('2026-11-10T04:00:00Z');
    const state = await f.store.read();
    const history = state.history[0].entries[0];
    assert.equal(history.updateTaskId, id);
    assert.equal(history.done, false);
    assert.equal(state.queue[0].updateTaskId, id);
    f.setArticles([{ ...original, title: '新版标题', kind: 'content', status: 'published' }]);
    const refreshed = await f.store.read();
    assert.equal(refreshed.queue[0].title, '新版标题');
    assert.equal(refreshed.queue[0].taskTitle, original.title);
    assert.equal(refreshed.history[0].entries[0].title, original.title);
    assert.equal(refreshed.history[0].entries[0].kind, 'content');
    await f.store.finishUpdate(id, { canceled: true });
    assert.deepEqual((await f.store.read()).history, refreshed.history);
    const canceled = await f.disk();
    await f.store.finishUpdate(id, { canceled: true });
    await f.store.enqueueUpdate(task);
    assert.equal(await f.disk(), canceled);
  } finally { await f.close(); }
});

test('content archive and restore never resurrect an update from old lifecycle generation', async () => {
  const f = await fixture();
  try {
    await f.store.enqueueUpdate(task);
    f.setArticles([{ ...original, archived: true, archiveRevision: 'new-lifecycle' }]);
    assert.equal((await f.store.read()).queue.length, 1); // missing second topic remains visible
    await f.store.finishUpdate(id, { canceled: true });
    f.setArticles([{ ...original, archiveRevision: 'new-lifecycle' }]);
    await f.store.enqueueUpdate(task);
    assert.ok(!(await f.store.read()).queue.some((entry) => entry.updateTaskId === id));
    await f.store.enqueueUpdate({ ...task, id: nextId });
    assert.equal((await f.store.read()).queue[0].updateTaskId, nextId);
  } finally { await f.close(); }
});

test('invalid update metadata is rejected without changing the existing plan', async () => {
  const f = await fixture();
  try {
    const before = await f.disk();
    for (const change of [{ id: '../bad' }, { id: null }, { scope: 'unknown' }, { reason: 'unknown' }, { title: '' }, { slug: '../bad' }]) await assert.rejects(f.store.enqueueUpdate({ ...task, ...change }), { status: 400 });
    for (const outcome of [{}, { done: true, canceled: true }, { done: false }]) await assert.rejects(f.store.finishUpdate(id, outcome), { status: 400 });
    await assert.rejects(f.act({ action: 'remove', slug: original.slug, updateTaskId: null }), { status: 400 });
    assert.equal(await f.disk(), before);
  } finally { await f.close(); }
});

test('host supplies the same schedule service only after existing write protection', async () => {
  const f = await fixture();
  await mkdir(join(f.root, 'drafts'));
  await writeFile(join(f.root, 'drafts', `${original.slug}.md`), '---\ntitle: Codex 图标说明\nstatus: draft\n---\n原正文。');
  let calls = 0;
  const server = createAuthorServer({ projectRoot: f.root, mediaEnv: {}, apiHandler: async (request, response, context) => {
    if (context.url.pathname !== '/api/update-context-test') return false;
    calls++;
    assert.equal(typeof context.withArticleLock, 'function');
    context.sendJson(response, 201, await context.schedule.enqueueUpdate(task));
    return true;
  } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    let result = await fetch(origin + '/api/update-context-test', { method: 'POST' });
    assert.equal(result.status, 403); assert.equal(calls, 0);
    const { token } = await (await fetch(origin + '/api/session')).json();
    result = await fetch(origin + '/api/update-context-test', { method: 'POST', headers: { Origin: origin, 'x-author-token': token } });
    assert.equal(result.status, 201); assert.equal(calls, 1);
    assert.equal((await result.json()).queue[0].updateTaskId, id);
  } finally { server.close(); await once(server, 'close'); await f.close(); }
});

test('cancellation before first week rollover cannot be resurrected by enqueue replay', async () => {
  const f = await fixture();
  try {
    await f.store.enqueueUpdate(task);
    await f.store.finishUpdate(id, { canceled: true });
    const before = await f.disk();
    await f.store.enqueueUpdate(task);
    await f.store.finishUpdate(id, { canceled: true });
    assert.equal(await f.disk(), before);
    assert.ok(!(await f.store.read()).queue.some((entry) => entry.updateTaskId === id));
    await assert.rejects(f.store.finishUpdate(id, { done: true }), { status: 409 });
  } finally { await f.close(); }
});

test('enqueue preflight rejects archived or missing content without initializing a task entry', async () => {
  const f = await fixture();
  try {
    const before = await f.disk();
    f.setArticles([{ ...original, archived: true }]);
    await assert.rejects(f.store.assertCanEnqueueUpdate(task), { status: 409 });
    assert.ok(!JSON.parse(await f.disk()).queue.some((entry) => entry.updateTaskId));
    f.setArticles([]);
    await assert.rejects(f.store.assertCanEnqueueUpdate(task), { status: 404 });
    f.setArticles([original]);
    await f.store.assertCanEnqueueUpdate(task);
    assert.ok(!JSON.parse(await f.disk()).queue.some((entry) => entry.updateTaskId));
  } finally { await f.close(); }
});
