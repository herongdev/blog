import test from 'node:test';
import assert from 'node:assert/strict';
import { weekStart, weekEnd, formatWeekRange, shanghaiDate } from '../src/lib/calendar.ts';
import { rankResults } from '../src/lib/search.ts';

const entry = (overrides = {}) => ({ title: '两个任务怎样一起运行', summary: '在隔离目录里同时完成工作', toolName: 'Codex', toolSlug: 'codex', url: '/topics/parallel/', status: 'published', aliases: ['OpenAI Codex'], keywords: ['worktree'], searchClues: ['工作树', '互不覆盖'], themeNames: ['并行任务'], themeSlugs: ['parallel-work'], week: '2026-10-26', publishedAt: '2026-10-27', bodyText: '右侧工作区切换后，可以继续查看历史记录。', ...overrides });

test('weeks follow Shanghai midnight and preserve dates across years', () => {
  assert.equal(weekStart('2026-11-01T15:59:59Z'), '2026-10-26');
  assert.equal(weekStart('2026-11-01T16:00:00Z'), '2026-11-02');
  assert.equal(shanghaiDate('2026-12-31T20:00:00Z'), '2027-01-01');
  assert.equal(weekStart('2027-01-01T00:00:00Z'), '2026-12-28');
  assert.equal(weekEnd('2026-12-28'), '2027-01-03');
  assert.match(formatWeekRange('2026-12-28'), /2026.*12.*28.*2027.*1.*3/);
});

test('fragment searches match aliases, remembered terms, and article body', () => {
  const item = entry();
  for (const query of ['ＣＯＤＥＸ', '工作树', '互不覆盖', '历史记录', '并行任务', '2026-10']) assert.deepEqual(rankResults([item], query), [item]);
  assert.deepEqual(rankResults([item], '不存在的操作'), []);
});

test('tool, theme and week intersect without hiding other matching results', () => {
  const original = entry();
  const otherWeek = entry({ url: '/topics/older/', week: '2026-10-19' });
  const otherTheme = entry({ url: '/topics/context/', themeSlugs: ['context'] });
  const otherTool = entry({ toolSlug: 'cursor', toolName: 'Cursor' });
  const lead = entry({ status: 'lead', week: undefined, publishedAt: undefined });
  const all = [original, otherWeek, otherTheme, otherTool, lead];
  assert.deepEqual(rankResults(all, '', 'codex', { theme: 'parallel-work', week: '2026-10-26' }), [original]);
  assert.equal(rankResults(all, '', '', { theme: 'no-such-theme' }).length, 0);
  assert.equal(rankResults(all, '', '', { week: 'not-a-week' }).length, 0);
  assert.ok(rankResults(all, 'Codex').includes(lead));
});

test('search exposes all matches for progressive loading and ranks title over body', () => {
  const all = Array.from({ length: 37 }, (_, i) => entry({ title: `并行任务教程 ${i}`, url: `/topics/topic-${i}/` }));
  assert.equal(rankResults(all, '并行任务').length, 37);
  const body = entry({ title: '工作目录介绍', bodyText: '历史版本可以用来找回误改代码。' });
  const title = entry({ title: '找回误改代码的历史版本' });
  assert.equal(rankResults([body, title], '历史版本')[0], title);
});
