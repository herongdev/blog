import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesArticleQuery, searchLibraryArticles } from '../src/article-search.ts';

const historyDraft = { kind: 'draft', slug: 'idea-2baf5c07-d882-4761-9775-9c367515cab9', title: 'Codex 这些图标天天见，到底什么意思？', status: 'draft' };
const archived = { kind: 'content', slug: 'cursor-rules', title: 'Cursor 项目规则怎么用', status: 'published', archived: true };

test('remembered words find the historical draft regardless of word order, spacing and letter case', () => {
  for (const query of ['图标', '图标 codex', '  CODEX\t图标  ', 'Ｃｏｄｅｘ　图标']) assert.equal(matchesArticleQuery(historyDraft, query), true, query);
  assert.equal(matchesArticleQuery(historyDraft, '图标 cursor'), false);
});

test('library search includes active and archived articles without needing the current view', () => {
  assert.deepEqual(searchLibraryArticles([historyDraft], [archived], '图标'), [historyDraft]);
  assert.deepEqual(searchLibraryArticles([historyDraft], [archived], '规则 cursor'), [archived]);
});

test('addresses and directory paths remain searchable', () => {
  assert.equal(matchesArticleQuery(historyDraft, '2baf5c07'), true);
  assert.deepEqual(searchLibraryArticles([historyDraft], [], 'AI 开发', () => '工具 / AI 开发'), [historyDraft]);
  assert.equal(matchesArticleQuery(historyDraft, '旧题', 'Codex 旧题'), true);
});

test('refresh overlap does not duplicate restored content or replace its latest active title', () => {
  const restored = { ...archived, title: 'Cursor 最新规则', archived: false };
  const result = searchLibraryArticles([historyDraft, restored], [archived], 'cursor');
  assert.deepEqual(result, [restored]);
  assert.equal(searchLibraryArticles([historyDraft, restored], [archived], '').length, 2);
});
