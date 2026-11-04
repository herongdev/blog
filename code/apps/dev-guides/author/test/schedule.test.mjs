import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, lstat, rm, symlink } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { once } from 'node:events';
import { createScheduleStore, weekStartShanghai } from '../schedule-store.mjs';
import { createAuthorServer } from '../server-core.mjs';

const entries = (count = 15) => Array.from({ length: count }, (_, index) => ({
  slug: `topic-${index + 1}`, title: `选题 ${index + 1}`, kind: 'draft', status: 'draft',
  editorial: { sourceId: `DG${String(index + 1).padStart(3, '0')}`, queue: '主计划', week: Math.floor(index / 3) + 1, slot: index % 3 + 1 },
}));
async function fixture(items = entries()) {
  const root = await mkdtemp(join(tmpdir(), 'schedule-test-'));
  let clock = '2026-10-30T06:00:00Z'; let articles = items;
  const options = { projectRoot: root, listArticles: async () => articles, now: () => clock };
  const store = createScheduleStore(options);
  return { root, store, options, setClock: (value) => { clock = value; }, setArticles: (value) => { articles = value; }, close: () => rm(root, { recursive: true, force: true }) };
}
const slugs = (items) => items.map((item) => item.slug);
async function act(store, action) {
  const state = await store.read(); return store.apply({ revision: state.revision, ...action });
}
async function plan(store, names) {
  let state;
  for (const slug of names) state = await act(store, { action: 'transfer', slug, scope: 'current' });
  return state;
}
const stored = ({ slug, title, kind, status }, done) => ({ slug, title, kind, status, ...(done === undefined ? {} : { done }) });
function legacyState(items) {
  return {
    version: 1, cadence: 1,
    privateExtensions: { source: 'legacy-fixture', nested: { retained: true } },
    current: { start: '2026-10-26', entries: [stored(items[2], true), stored(items[0], false)] },
    queue: [stored(items[4]), stored(items[1]), stored(items[3])],
    history: [{ start: '2026-10-19', entries: [stored(items[3], false), stored(items[1], true)] }],
  };
}

test('Shanghai Monday boundary, new year and leap dates are independent of host timezone', () => {
  assert.equal(weekStartShanghai('2026-11-01T15:59:59.999Z'), '2026-10-26');
  assert.equal(weekStartShanghai('2026-11-01T16:00:00.000Z'), '2026-11-02');
  assert.equal(weekStartShanghai('2026-12-31T20:00:00Z'), '2026-12-28');
  assert.equal(weekStartShanghai('2028-02-29T02:00:00Z'), '2028-02-28');
});

test('initializes an empty manual week, original editorial queue order and private persistent metadata', async () => {
  const input = [...entries(8).reverse(), { slug: 'reserve', title: '备选', kind: 'draft', status: 'draft', editorial: { sourceId: 'DG079' } }, { slug: 'recent', title: '近期', kind: 'draft', status: 'draft', editorial: { sourceId: 'CM202610-01' } }, { slug: 'extra', title: '其他', kind: 'content', status: 'lead' }];
  const f = await fixture(input);
  try {
    const first = await f.store.read();
    assert.equal(first.timezone, 'Asia/Shanghai');
    assert.equal(Object.hasOwn(first, 'cadence'), false);
    assert.equal(Object.hasOwn(first, 'nextWeek'), false);
    assert.deepEqual([first.thisWeek.start, first.thisWeek.end], ['2026-10-26', '2026-11-01']);
    assert.deepEqual(first.thisWeek.entries, []);
    assert.deepEqual(slugs(first.queue).slice(0, 6), ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5', 'topic-6']);
    assert.deepEqual(slugs(first.queue).slice(-3), ['reserve', 'recent', 'extra']);
    assert.deepEqual(first.history, []);
    assert.ok(first.queue.every((entry) => !Object.hasOwn(entry, 'week') && !Object.hasOwn(entry, 'date')));
    assert.equal((await lstat(join(f.root, '.schedule.json'))).mode & 0o777, 0o600);
    assert.deepEqual(await createScheduleStore(f.options).read(), first);
  } finally { await f.close(); }
});

test('known reused manuscripts retain DG004 DG006 DG125 seed position without editing frontmatter', async () => {
  const input = entries(7).filter((entry) => !['topic-4', 'topic-6'].includes(entry.slug));
  for (const slug of ['codex-worktrees', 'apifox-actual-request', 'cursor-remote-control']) input.push({ slug, title: slug, kind: 'content', status: 'lead' });
  const f = await fixture(input);
  try {
    const state = await f.store.read();
    assert.deepEqual(slugs(state.queue).slice(3, 6), ['codex-worktrees', 'topic-5', 'apifox-actual-request']);
    assert.equal(state.queue.at(-1).slug, 'cursor-remote-control');
    assert.ok(input.filter((entry) => entry.kind === 'content').every((entry) => !entry.editorial));
  } finally { await f.close(); }
});

test('v1 migration preserves the exact current selection, completed flags, queue and history', async () => {
  const items = entries(5); const f = await fixture(items);
  try {
    const old = legacyState(items);
    await writeFile(join(f.root, '.schedule.json'), JSON.stringify(old), { mode: 0o600 });
    const state = await f.store.read();
    const upgraded = JSON.parse(await readFile(join(f.root, '.schedule.json'), 'utf8'));
    const expected = { ...old, version: 2 }; delete expected.cadence;
    assert.deepEqual(upgraded, expected);
    assert.deepEqual(state.thisWeek.entries, old.current.entries);
    assert.deepEqual(state.queue, old.queue);
    assert.deepEqual(state.history[0].entries, old.history[0].entries);
    assert.equal(Object.hasOwn(state, 'cadence'), false);
    assert.equal(Object.hasOwn(state, 'nextWeek'), false);
    const bytes = await readFile(join(f.root, '.schedule.json'), 'utf8');
    assert.deepEqual(await createScheduleStore(f.options).read(), state);
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), bytes);
    assert.deepEqual(items, entries(5));
  } finally { await f.close(); }
});

test('v1 migration across weeks archives completion and returns only unfinished entries without quota assignment', async () => {
  const items = entries(5); const f = await fixture(items);
  try {
    const old = legacyState(items);
    await writeFile(join(f.root, '.schedule.json'), JSON.stringify(old), { mode: 0o600 });
    f.setClock('2026-11-16T02:00:00Z');
    const state = await f.store.read();
    assert.equal(state.thisWeek.start, '2026-11-16');
    assert.deepEqual(state.thisWeek.entries, []);
    assert.deepEqual(slugs(state.queue), ['topic-1', 'topic-5', 'topic-2', 'topic-4']);
    assert.deepEqual(state.history.map((week) => week.start), ['2026-10-26', '2026-10-19']);
    assert.deepEqual(state.history[0].entries, old.current.entries);
    assert.deepEqual(state.history[1].entries, old.history[0].entries);
    assert.deepEqual(await createScheduleStore(f.options).read(), state);
  } finally { await f.close(); }
});

for (const version of [1, 2]) test(`v${version} existing current entries adopt a stable completed prefix without changing queue, history or extensions`, async () => {
  const items = entries(5); const f = await fixture(items);
  try {
    const old = legacyState(items); old.version = version;
    if (version === 2) delete old.cadence;
    old.current.entries = [stored(items[2], false), stored(items[1], true), stored(items[0], false), stored(items[3], true)];
    old.current.privateLabel = 'preserve-current-extension';
    old.current.entries[1].completionNote = 'preserve-entry-extension';
    old.queue = [stored(items[4])];
    await writeFile(join(f.root, '.schedule.json'), JSON.stringify(old), { mode: 0o600 });
    const state = await f.store.read();
    const disk = JSON.parse(await readFile(join(f.root, '.schedule.json'), 'utf8'));
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-2', 'topic-4', 'topic-3', 'topic-1']);
    assert.deepEqual(state.thisWeek.entries.map((entry) => entry.done), [true, true, false, false]);
    assert.deepEqual(disk.current.entries, [old.current.entries[1], old.current.entries[3], old.current.entries[0], old.current.entries[2]]);
    assert.equal(disk.current.privateLabel, old.current.privateLabel);
    assert.deepEqual(disk.privateExtensions, old.privateExtensions);
    assert.deepEqual(disk.queue, old.queue);
    assert.deepEqual(disk.history, old.history);
    const bytes = await readFile(join(f.root, '.schedule.json'), 'utf8');
    assert.deepEqual(await createScheduleStore(f.options).read(), state);
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), bytes);
  } finally { await f.close(); }
});

test('transfers persist exact cross-section positions and keep completed entries fixed', async () => {
  const f = await fixture(entries(5));
  try {
    await plan(f.store, ['topic-1', 'topic-2']);
    let state = await act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'current', position: 2 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-1', 'topic-4', 'topic-2']);
    assert.deepEqual(slugs(state.queue), ['topic-3', 'topic-5']);
    state = await act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'queue', position: 1 });
    assert.deepEqual(slugs(state.queue), ['topic-4', 'topic-3', 'topic-5']);
    state = await act(f.store, { action: 'transfer', slug: 'topic-1', scope: 'queue', position: 4 });
    assert.deepEqual(slugs(state.queue), ['topic-4', 'topic-3', 'topic-5', 'topic-1']);
    state = await act(f.store, { action: 'transfer', slug: 'topic-1', scope: 'queue', position: 2 });
    assert.deepEqual(slugs(state.queue), ['topic-4', 'topic-1', 'topic-3', 'topic-5']);
    await act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'current', position: 2 });
    state = await act(f.store, { action: 'complete', slug: 'topic-4', done: true });
    await assert.rejects(act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'current', position: 1 }), { status: 400 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-2']);
    assert.equal(state.thisWeek.entries[0].done, true);
    const bytes = await readFile(join(f.root, '.schedule.json'), 'utf8');
    await assert.rejects(act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'queue', position: 1 }), { status: 409 });
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), bytes);
    await act(f.store, { action: 'complete', slug: 'topic-4', done: false });
    state = await act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'queue', position: 2 });
    assert.deepEqual(slugs(state.queue), ['topic-1', 'topic-4', 'topic-3', 'topic-5']);
    assert.ok(state.queue.every((entry) => !Object.hasOwn(entry, 'done')));
    assert.deepEqual(await createScheduleStore(f.options).read(), state);
    assert.equal(new Set([...slugs(state.thisWeek.entries), ...slugs(state.queue)]).size, 5);
  } finally { await f.close(); }
});

test('completion and undo keep a fixed prefix and every pending placement API clamps below it', async () => {
  const f = await fixture(entries(7));
  try {
    await plan(f.store, ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5']);
    let state = await act(f.store, { action: 'complete', slug: 'topic-4', done: true });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-1', 'topic-2', 'topic-3', 'topic-5']);
    state = await act(f.store, { action: 'complete', slug: 'topic-2', done: true });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-2', 'topic-1', 'topic-3', 'topic-5']);
    const completed = state;
    state = await act(f.store, { action: 'complete', slug: 'topic-4', done: true });
    assert.deepEqual(state, completed);
    state = await act(f.store, { action: 'transfer', slug: 'topic-5', scope: 'current', position: 1 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-2', 'topic-5', 'topic-1', 'topic-3']);
    state = await act(f.store, { action: 'move', slug: 'topic-3', scope: 'current', position: 1 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-2', 'topic-3', 'topic-5', 'topic-1']);
    state = await act(f.store, { action: 'pull', slug: 'topic-6', position: 1 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-2', 'topic-6', 'topic-3', 'topic-5', 'topic-1']);
    state = await act(f.store, { action: 'transfer', slug: 'topic-7', scope: 'current', position: 1 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-4', 'topic-2', 'topic-7', 'topic-6', 'topic-3', 'topic-5', 'topic-1']);
    const bytes = await readFile(join(f.root, '.schedule.json'), 'utf8');
    for (const action of [
      { action: 'move', slug: 'topic-4', scope: 'current', position: 7 },
      { action: 'transfer', slug: 'topic-4', scope: 'current', position: 7 },
    ]) await assert.rejects(act(f.store, action), { status: 400 });
    await assert.rejects(act(f.store, { action: 'defer', slug: 'topic-4' }), { status: 409 });
    await assert.rejects(act(f.store, { action: 'transfer', slug: 'topic-4', scope: 'queue', position: 1 }), { status: 409 });
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), bytes);
    state = await act(f.store, { action: 'complete', slug: 'topic-4', done: false });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-2', 'topic-4', 'topic-7', 'topic-6', 'topic-3', 'topic-5', 'topic-1']);
    assert.deepEqual(state.thisWeek.entries.map((entry) => entry.done), [true, false, false, false, false, false, false]);
    state = await act(f.store, { action: 'complete', slug: 'topic-2', done: false });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-2', 'topic-4', 'topic-7', 'topic-6', 'topic-3', 'topic-5', 'topic-1']);
    assert.ok(state.thisWeek.entries.every((entry) => !entry.done));
    state = await act(f.store, { action: 'complete', slug: 'topic-1', done: true });
    assert.equal(state.thisWeek.entries[0].slug, 'topic-1');
    assert.equal(state.thisWeek.entries[0].done, true);
    assert.deepEqual(await createScheduleStore(f.options).read(), state);
  } finally { await f.close(); }
});

test('manual selection supports zero, one and more than the former quota without filling or displacing entries', async () => {
  const f = await fixture(entries(30));
  try {
    let state = await f.store.read();
    assert.equal(state.thisWeek.entries.length, 0);
    state = await act(f.store, { action: 'transfer', slug: 'topic-30', scope: 'current', position: 1 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-30']);
    state = await plan(f.store, entries(25).map((entry) => entry.slug));
    assert.equal(state.thisWeek.entries.length, 26);
    assert.equal(state.thisWeek.entries[0].slug, 'topic-30');
    assert.deepEqual(slugs(state.queue), ['topic-26', 'topic-27', 'topic-28', 'topic-29']);
    assert.deepEqual(state.history, []);
    assert.deepEqual(await createScheduleStore(f.options).read(), state);
    for (const entry of [...state.thisWeek.entries]) state = await act(f.store, { action: 'transfer', slug: entry.slug, scope: 'queue' });
    assert.equal(state.thisWeek.entries.length, 0);
    assert.equal(state.queue.length, 30);
    assert.equal(new Set(state.queue.map((entry) => entry.slug)).size, 30);
  } finally { await f.close(); }
});

test('queue absolute positions and insertions reorder across pages without assigning a week', async () => {
  const f = await fixture(entries(45));
  try {
    let state = await act(f.store, { action: 'move', scope: 'queue', slug: 'topic-40', position: 1 });
    assert.equal(state.queue[0].slug, 'topic-40');
    state = await act(f.store, { action: 'move', scope: 'queue', slug: 'topic-40', position: 45 });
    assert.equal(state.queue.at(-1).slug, 'topic-40');
    const newTopic = { slug: 'temporary', title: '临时题', kind: 'draft', status: 'draft' };
    f.setArticles([...entries(45), newTopic]);
    state = await act(f.store, { action: 'enqueue', slug: 'temporary', position: 1 });
    assert.equal(state.queue[0].slug, 'temporary');
    assert.deepEqual(state.thisWeek.entries, []);
  } finally { await f.close(); }
});

test('manual current insert, move, complete, undo and defer do not change publication status', async () => {
  const items = entries(); const f = await fixture(items);
  try {
    await plan(f.store, ['topic-1', 'topic-2', 'topic-3']);
    let state = await act(f.store, { action: 'pull', slug: 'topic-7', position: 2 });
    assert.deepEqual(slugs(state.thisWeek.entries), ['topic-1', 'topic-7', 'topic-2', 'topic-3']);
    state = await act(f.store, { action: 'move', scope: 'current', slug: 'topic-7', position: 1 });
    assert.equal(state.thisWeek.entries[0].slug, 'topic-7');
    state = await act(f.store, { action: 'complete', slug: 'topic-7', done: true });
    assert.equal(state.thisWeek.entries[0].done, true);
    await assert.rejects(act(f.store, { action: 'defer', slug: 'topic-7' }), { status: 409 });
    await act(f.store, { action: 'complete', slug: 'topic-7', done: false });
    state = await act(f.store, { action: 'defer', slug: 'topic-7' });
    assert.equal(state.queue.at(-1).slug, 'topic-7');
    state = await act(f.store, { action: 'remove', slug: 'topic-7' });
    assert.ok(!state.queue.some((entry) => entry.slug === 'topic-7'));
    assert.equal(items.find((entry) => entry.slug === 'topic-7').status, 'draft');
    assert.equal(items.length, 15);
  } finally { await f.close(); }
});

test('week rollover leaves a new empty week, archives actual outcomes and carries unfinished once', async () => {
  const f = await fixture();
  try {
    await plan(f.store, ['topic-1', 'topic-2', 'topic-3']);
    await act(f.store, { action: 'complete', slug: 'topic-2', done: true });
    const previous = await f.store.read();
    f.setClock('2026-11-01T16:00:00Z');
    const next = await f.store.read();
    assert.equal(next.thisWeek.start, '2026-11-02');
    assert.deepEqual(next.thisWeek.entries, []);
    assert.deepEqual(slugs(next.queue).slice(0, 3), ['topic-1', 'topic-3', 'topic-4']);
    assert.deepEqual(slugs(next.history[0].entries), ['topic-2', 'topic-1', 'topic-3']);
    assert.deepEqual(next.history[0].entries.map(({ done }) => done), [true, false, false]);
    assert.deepEqual(await f.store.read(), next);
    await assert.rejects(f.store.apply({ revision: previous.revision, action: 'transfer', slug: 'topic-4', scope: 'current' }), { status: 409 });
    const changed = await act(f.store, { action: 'move', slug: 'topic-4', scope: 'queue', position: 1 });
    assert.deepEqual(changed.thisWeek, next.thisWeek);
    assert.deepEqual(changed.history, next.history);
  } finally { await f.close(); }
});

test('skipped weeks do not fabricate history and historical titles are frozen', async () => {
  const items = entries(); const f = await fixture(items);
  try {
    await plan(f.store, ['topic-1', 'topic-2', 'topic-3']);
    f.setClock('2026-12-01T02:00:00Z');
    let state = await f.store.read();
    assert.equal(state.thisWeek.start, '2026-11-30');
    assert.deepEqual(state.history.map((week) => week.start), ['2026-10-26']);
    f.setArticles(items.map((entry) => entry.slug === 'topic-1' ? { ...entry, title: '重新命名' } : entry));
    state = await f.store.read();
    assert.equal(state.queue[0].title, '重新命名');
    assert.equal(state.history[0].entries[0].title, '选题 1');
    f.setClock('2026-10-30T06:00:00Z');
    assert.equal((await f.store.read()).thisWeek.start, '2026-11-30');
  } finally { await f.close(); }
});

test('an empty unscheduled week rolls forward without creating a history record', async () => {
  const f = await fixture();
  try {
    const initial = await f.store.read();
    f.setClock('2026-12-01T02:00:00Z');
    const next = await f.store.read();
    assert.equal(next.thisWeek.start, '2026-11-30');
    assert.deepEqual(next.thisWeek.entries, []);
    assert.deepEqual(next.queue, initial.queue);
    assert.deepEqual(next.history, []);
  } finally { await f.close(); }
});

test('promotion and missing files preserve stable slugs and history, new articles require enqueue', async () => {
  const items = entries(); const f = await fixture(items);
  try {
    await plan(f.store, ['topic-1', 'topic-2', 'topic-3']);
    const before = await f.store.read();
    f.setArticles(items.filter((entry) => entry.slug !== 'topic-2').map((entry) => entry.slug === 'topic-1' ? { ...entry, kind: 'content', status: 'published', title: '改成正式文章' } : entry).concat({ slug: 'new-topic', title: '新文章', kind: 'draft', status: 'draft' }));
    const after = await f.store.read();
    assert.deepEqual(slugs(after.thisWeek.entries), slugs(before.thisWeek.entries));
    assert.equal(after.thisWeek.entries[0].kind, 'content');
    assert.equal(after.thisWeek.entries[1].missing, true);
    assert.ok(!after.queue.some((entry) => entry.slug === 'new-topic'));
    await assert.rejects(act(f.store, { action: 'complete', slug: 'topic-2', done: true }), { status: 404 });
    f.setClock('2026-11-02T06:00:00Z');
    let state = await f.store.read();
    assert.equal(state.history[0].entries[1].missing, true);
    f.setArticles(items);
    state = await f.store.read();
    assert.equal(state.history[0].entries[1].missing, undefined);
  } finally { await f.close(); }
});

test('historical draft promotion updates navigation without rewriting stored history', async () => {
  const items = entries(); const f = await fixture(items);
  try {
    await plan(f.store, ['topic-1']);
    await act(f.store, { action: 'complete', slug: 'topic-1', done: true });
    f.setClock('2026-11-02T06:00:00Z');
    await f.store.read();
    const before = await readFile(join(f.root, '.schedule.json'), 'utf8');
    f.setArticles(items.map((entry) => entry.slug === 'topic-1' ? { ...entry, kind: 'content', title: '正式文章新标题', status: 'published' } : entry));
    const history = (await f.store.read()).history[0].entries[0];
    assert.equal(history.kind, 'content');
    assert.equal(history.title, '选题 1');
    assert.equal(history.status, 'draft');
    assert.equal(history.done, true);
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), before);
  } finally { await f.close(); }
});

test('concurrent stale updates, invalid fields and history edits reject without overwriting state', async () => {
  const f = await fixture();
  try {
    const state = await f.store.read();
    const updates = await Promise.allSettled([f.store.apply({ revision: state.revision, action: 'move', scope: 'queue', slug: 'topic-4', position: 1 }), f.store.apply({ revision: state.revision, action: 'move', scope: 'queue', slug: 'topic-7', position: 1 })]);
    assert.equal(updates.filter((result) => result.status === 'fulfilled').length, 1);
    assert.equal(updates.find((result) => result.status === 'rejected').reason.status, 409);
    const before = await readFile(join(f.root, '.schedule.json'), 'utf8');
    for (const action of [{ action: 'cadence', value: 0 }, { action: 'cadence', value: 22 }, { action: 'move', slug: 'topic-4', scope: 'history', position: 1 }, { action: 'move', slug: 'topic-4', scope: 'queue', position: 999 }, { action: 'enqueue', slug: 'topic-4' }, { action: 'remove', slug: '../outside' }, { action: 'complete', slug: 'topic-4', done: true }]) await assert.rejects(act(f.store, action));
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), before);
  } finally { await f.close(); }
});

test('transfers reject invalid targets, stale revisions and deleted articles without losing entries', async () => {
  const items = entries(5); const f = await fixture(items);
  try {
    const initial = await f.store.read();
    const updates = await Promise.allSettled([
      f.store.apply({ revision: initial.revision, action: 'transfer', slug: 'topic-4', scope: 'current', position: 1 }),
      f.store.apply({ revision: initial.revision, action: 'transfer', slug: 'topic-5', scope: 'current', position: 1 }),
    ]);
    assert.equal(updates.filter((result) => result.status === 'fulfilled').length, 1);
    assert.equal(updates.find((result) => result.status === 'rejected').reason.status, 409);
    const before = await readFile(join(f.root, '.schedule.json'), 'utf8');
    for (const action of [
      { action: 'transfer', slug: 'topic-1', scope: 'history', position: 1 },
      { action: 'transfer', slug: 'topic-1', scope: 'current', position: 0 },
      { action: 'transfer', slug: 'topic-1', scope: 'current', position: 3 },
      { action: 'transfer', slug: 'topic-1', scope: 'queue', position: 5 },
      { action: 'transfer', slug: 'not-in-plan', scope: 'current', position: 1 },
    ]) await assert.rejects(act(f.store, action));
    await assert.rejects(act(f.store, { action: 'cadence', value: 3 }), { status: 410 });
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), before);

    const state = await f.store.read();
    f.setArticles(items.filter((entry) => entry.slug !== 'topic-1'));
    await assert.rejects(f.store.apply({ revision: state.revision, action: 'transfer', slug: 'topic-1', scope: 'current', position: 1 }), { status: 409 });
    await assert.rejects(act(f.store, { action: 'transfer', slug: 'topic-1', scope: 'current', position: 1 }), { status: 404 });
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), before);
    const reloaded = await createScheduleStore(f.options).read();
    assert.equal(new Set([...slugs(reloaded.thisWeek.entries), ...slugs(reloaded.queue)]).size, 5);
    assert.equal(reloaded.queue.find((entry) => entry.slug === 'topic-1').missing, true);
    assert.equal(reloaded.thisWeek.entries.length, 1);
    assert.equal(reloaded.queue.length, 4);
  } finally { await f.close(); }
});

test('rejects symlink, malformed file and duplicate slug inputs without reset', async () => {
  const f = await fixture();
  try {
    const outside = join(f.root, 'outside'); await writeFile(outside, 'private');
    await symlink(outside, join(f.root, '.schedule.json'));
    await assert.rejects(f.store.read(), { status: 400 });
    assert.equal(await readFile(outside, 'utf8'), 'private');
    await rm(join(f.root, '.schedule.json')); await writeFile(join(f.root, '.schedule.json'), '{bad json');
    await assert.rejects(f.store.read(), { status: 500 });
    assert.equal(await readFile(join(f.root, '.schedule.json'), 'utf8'), '{bad json');
    await rm(join(f.root, '.schedule.json')); f.setArticles([entries()[0], entries()[0]]);
    await assert.rejects(f.store.read(), { status: 409 });
  } finally { await f.close(); }
});

test('schedule endpoints preserve local origin/token protection and private storage', async () => {
  const f = await fixture([]);
  await mkdir(join(f.root, 'drafts'));
  await writeFile(join(f.root, 'drafts', 'topic-one.md'), '---\ntitle: 选题\ntool: codex\nstatus: draft\n---\n正文保留。');
  const server = createAuthorServer({ projectRoot: f.root, mediaEnv: {} });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    const session = await (await fetch(origin + '/api/session')).json();
    const state = await (await fetch(origin + '/api/schedule')).json();
    const action = { revision: state.revision, action: 'transfer', slug: 'topic-one', scope: 'current', position: 1 };
    let response = await fetch(origin + '/api/schedule/actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(action) });
    assert.equal(response.status, 403);
    response = await fetch(origin + '/api/schedule/actions', { method: 'POST', headers: { Origin: 'https://outside.example', 'x-author-token': session.token, 'Content-Type': 'application/json' }, body: JSON.stringify(action) });
    assert.equal(response.status, 403);
    response = await fetch(origin + '/api/schedule/actions', { method: 'POST', headers: { Origin: origin, 'x-author-token': session.token, 'Content-Type': 'application/json' }, body: JSON.stringify(action) });
    assert.equal(response.status, 200); assert.deepEqual(slugs((await response.json()).thisWeek.entries), ['topic-one']);
    assert.equal((await fetch(origin + '/.schedule.json')).status, 404);
  } finally { server.close(); await once(server, 'close'); await f.close(); }
});

test('schedule API reads editorial seed metadata without changing ordinary article responses', async () => {
  const f = await fixture([]);
  await mkdir(join(f.root, 'drafts'));
  for (const [slug, id] of [['aaa', 'DG005'], ['bbb', 'DG001'], ['ccc', 'DG003'], ['ddd', 'DG002']]) {
    await writeFile(join(f.root, 'drafts', `${slug}.md`), `---\ntitle: ${slug}\ntool: codex\nstatus: draft\neditorial:\n  sourceId: ${id}\n---\n正文保留。`);
  }
  const server = createAuthorServer({ projectRoot: f.root, mediaEnv: {} });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    const ordinary = await (await fetch(origin + '/api/articles')).json();
    assert.ok(ordinary.items.every((item) => !Object.hasOwn(item, 'editorial')));
    const schedule = await (await fetch(origin + '/api/schedule')).json();
    assert.deepEqual(schedule.thisWeek.entries, []);
    assert.deepEqual(slugs(schedule.queue), ['bbb', 'ddd', 'ccc', 'aaa']);
    assert.match(await readFile(join(f.root, 'drafts', 'aaa.md'), 'utf8'), /正文保留。/);
  } finally { server.close(); await once(server, 'close'); await f.close(); }
});

test('unauthenticated online reads and writes cannot initialize or change the schedule', async () => {
  const f = await fixture([]);
  const server = createAuthorServer({ projectRoot: f.root, mediaEnv: {}, auth: { provider: 'wechat', origin: 'https://dev.herong.info', basePath: '/admin/', stateDirectory: join(f.root, 'auth'), bootstrapTokenFile: join(f.root, 'bootstrap') } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  try {
    for (const [path, method] of [['/api/schedule', 'GET'], ['/api/schedule/actions', 'POST']]) {
      const status = await new Promise((resolve, reject) => {
        const request = httpRequest(`http://127.0.0.1:${server.address().port}${path}`, { method, headers: { Host: 'dev.herong.info', Origin: 'https://dev.herong.info' } }, (response) => { response.resume(); response.on('end', () => resolve(response.statusCode)); });
        request.on('error', reject); request.end();
      });
      assert.equal(status, 401);
    }
    await assert.rejects(lstat(join(f.root, '.schedule.json')), { code: 'ENOENT' });
  } finally { server.close(); await once(server, 'close'); await f.close(); }
});
