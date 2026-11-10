import test from 'node:test';
import assert from 'node:assert/strict';
import { scheduleLookup } from '../src/schedule-lookup.ts';

const icon = { slug: 'codex-icons', title: 'Codex 这些图标天天见，到底什么意思？', kind: 'draft', status: 'draft' };
const pending = { slug: 'slow', title: 'Codex 卡顿', kind: 'draft', status: 'draft' };
const schedule = {
  thisWeek: { start: '2026-11-09', end: '2026-11-15', entries: [] }, queue: [pending],
  history: [
    { start: '2026-10-26', end: '2026-11-01', entries: [{ ...pending, done: false }] },
    { start: '2026-11-02', end: '2026-11-08', entries: [{ ...icon, done: true }, { ...pending, done: false }] },
  ],
};
test('completed historical draft can be found by a fragment, full title and separated keywords', () => {
  for (const query of ['图标', icon.title, '  ＣＯＤＥＸ   图标  ', '2026-11-02']) {
    const hit = scheduleLookup(schedule, [icon, pending], [], query).find((item) => item.entry.slug === icon.slug);
    assert.ok(hit, query); assert.equal(hit.done, true); assert.equal(hit.week, '2026-11-02'); assert.equal(hit.entry.kind, 'draft');
  }
});
test('history is newest first, preserves snapshots and resolves renamed/promoted articles', () => {
  const promoted = { ...icon, title: '新版 Codex 图标说明', kind: 'content', status: 'published' };
  const rows = scheduleLookup(schedule, [promoted, pending], [], '', true);
  assert.equal(rows[0].week, '2026-11-02'); assert.equal(rows[0].title, icon.title);
  assert.equal(rows[0].entry.title, promoted.title); assert.equal(rows[0].entry.kind, 'content');
  assert.equal(rows.filter((row) => row.entry.slug === pending.slug).length, 2);
  assert.equal(scheduleLookup(schedule, [promoted], [], icon.title)[0].entry.kind, 'content');
});
test('search ignores queue/folder scope, finds archived content and deduplicates articles', () => {
  const rows = scheduleLookup(schedule, [pending], [{ ...icon, archived: true }], 'codex');
  assert.equal(rows.length, 2); assert.equal(rows.find((row) => row.entry.slug === icon.slug).archived, true);
  const archivedMissing = structuredClone(schedule); archivedMissing.history[1].entries[0].missing = true;
  assert.equal(scheduleLookup(archivedMissing, [], [icon], '图标')[0].entry.missing, false);
});
test('missing articles retain a non-navigable history record; unmatched searches stay empty', () => {
  const missing = structuredClone(schedule); missing.history[1].entries[0].missing = true;
  assert.equal(scheduleLookup(missing, [], [], '图标')[0].entry.missing, true);
  assert.deepEqual(scheduleLookup(schedule, [icon], [], '不存在的教程'), []);
});
test('a stale draft list cannot override the promoted target returned by the schedule', () => {
  const promoted = structuredClone(schedule);
  promoted.history[1].entries[0].kind = 'content';
  assert.equal(scheduleLookup(promoted, [icon], [], '图标')[0].entry.kind, 'content');
  promoted.history[1].entries[0].missing = true;
  assert.equal(scheduleLookup(promoted, [icon], [], '图标')[0].entry.missing, true);
});


test('separate update rounds keep identity through live article promotion and search', () => {
  const first = { ...icon, updateTaskId: 'first-update', updateReason: 'correction', updateScope: 'article', done: true };
  const next = { ...icon, updateTaskId: 'next-update', updateReason: 'adapt', updateScope: 'both' };
  const value = structuredClone(schedule);
  value.history[1].entries.push(first);
  value.queue.unshift(next);
  const promoted = { ...icon, kind: 'content', status: 'published', title: '新版图标教程' };
  const rows = scheduleLookup(value, [promoted, pending], [], '图标');
  const hits = rows.filter((row) => row.entry.slug === icon.slug);
  assert.equal(hits.length, 3);
  assert.deepEqual(hits.map((row) => row.entry.updateTaskId), ['next-update', undefined, 'first-update']);
  assert.ok(hits.every((row) => row.entry.kind === 'content'));
  const history = scheduleLookup(value, [promoted], [], '', true).filter((row) => row.entry.slug === icon.slug);
  assert.equal(history.length, 2);
  assert.equal(history[1].entry.updateTaskId, 'first-update');
  assert.equal(history[1].done, true);
  assert.equal(history[1].title, icon.title);
  assert.equal(scheduleLookup(value, [promoted], [], '适配新版 文章')[0].entry.updateTaskId, 'next-update');
  assert.equal(scheduleLookup(value, [promoted], [], '纠错')[0].entry.updateTaskId, 'first-update');
});
