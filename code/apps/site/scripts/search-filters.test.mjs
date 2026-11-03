import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyTopics, periodWindow, matchesFilters, newestFirst, normalizePeriod, normalizeTopic } from '../src/search/filters.mjs';
import { SearchRuntime } from '../src/search/runtime.mjs';
import { createSearchClient } from '../src/search/client.mjs';
import { createIndex } from './build-search-index.mjs';

const now = new Date('2026-11-02T02:00:00Z'); // Monday, 10:00 in Shanghai.
const article = (slug, title, publishedAt, extra = {}) => ({
  id: `article:posts/${slug}.md`, title, summary: '真实来源结构的临时测试摘要',
  type: 'article', url: `https://herong.info/posts/${slug}`, ...(publishedAt ? { publishedAt } : {}), ...extra,
});
const tutorial = (slug, title, publishedAt, extra = {}) => ({
  id: `tutorial:${slug}`, title, summary: '仅存在内存中的发布状态测试教程', type: 'tutorial', status: 'published',
  url: `https://dev.herong.info/topics/${slug}/`, ...(publishedAt ? { publishedAt } : {}), ...extra,
});
function fixtureRuntime(documents, tutorials = [], options = {}) {
  const index = createIndex(documents);
  const requests = [];
  const runtime = new SearchRuntime({ baseUrl: 'https://preview.example/search-index/', tutorialsUrl: '/search-index/tutorials.json', now: () => now,
    fetcher: async (url) => {
      requests.push(url);
      if (url.endsWith('/tutorials.json')) return { ok: true, json: async () => ({ schema: 1, source: 'https://dev.herong.info', enabled: true, items: tutorials }) };
      if (url.endsWith('/manifest.json')) return { ok: true, json: async () => ({ schema: 1, version: '0123456789abcdef', buckets: 64 }) };
      if (url.endsWith('/documents.json')) return { ok: true, json: async () => index.documents };
      const id = new URL(url).pathname.match(/\/postings\/([a-f0-9]{2})\.json$/)?.[1];
      return { ok: Boolean(id), json: async () => index.buckets[id] };
    }, ...options,
  });
  return { runtime, requests };
}

test('time shortcuts use Shanghai Mondays and month boundaries, not the machine timezone', () => {
  assert.deepEqual(periodWindow('week', new Date('2026-11-01T15:59:59Z')), { from: '2026-10-26', to: '2026-11-01' });
  assert.deepEqual(periodWindow('week', new Date('2026-11-01T16:00:00Z')), { from: '2026-11-02', to: '2026-11-02' });
  assert.deepEqual(periodWindow('month', new Date('2026-10-31T15:59:59Z')), { from: '2026-10-01', to: '2026-10-31' });
  assert.deepEqual(periodWindow('month', new Date('2026-10-31T16:00:00Z')), { from: '2026-11-01', to: '2026-11-01' });
  assert.deepEqual(periodWindow('week', new Date('2026-01-01T04:00:00Z')), { from: '2025-12-29', to: '2026-01-01' });
});
test('rolling half-year and year clamp calendar days across leap years and month ends', () => {
  assert.deepEqual(periodWindow('6months', new Date('2025-08-31T04:00:00Z')), { from: '2025-02-28', to: '2025-08-31' });
  assert.deepEqual(periodWindow('6months', new Date('2024-08-31T04:00:00Z')), { from: '2024-02-29', to: '2024-08-31' });
  assert.deepEqual(periodWindow('6months', new Date('2026-03-31T04:00:00Z')), { from: '2025-09-30', to: '2026-03-31' });
  assert.deepEqual(periodWindow('year', new Date('2024-02-29T04:00:00Z')), { from: '2023-02-28', to: '2024-02-29' });
  assert.deepEqual(periodWindow('6months', now), { from: '2026-05-02', to: '2026-11-02' });
  assert.equal(periodWindow('all', now), undefined);
});
test('publication windows exclude undated, invalid and future records without using modification dates', () => {
  const filter = { period: 'week' };
  assert.equal(matchesFilters(article('start', '边界当天', '2026-11-02'), filter, now), true);
  for (const date of [undefined, '2026-02-30', '2026-11-03', '2026-11-01', '2026-11-02T12:00:00Z']) {
    assert.equal(matchesFilters(article('outside', '时间窗外', date, { updatedAt: '2026-11-02' }), filter, now), false);
  }
  assert.equal(matchesFilters(article('legacy', '未知首发日期', undefined, { updatedAt: '2026-11-02' }), { period: 'all' }, now), true);
  assert.deepEqual([article('undated', '无日期'), article('older', '较旧', '2025-01-01'), article('new', '较新', '2026-11-01')].sort(newestFirst).map(({ id }) => id), ['article:posts/new.md', 'article:posts/older.md', 'article:posts/undated.md']);
});
test('topics use public paths and metadata, allowing overlaps without Latin substring false positives', () => {
  assert.deepEqual(classifyTopics({ title: 'async await 的顺序' }, 'article:posts/JavaScript系统教程/异步.md'), ['frontend']);
  assert.deepEqual(classifyTopics({ title: 'Vue 项目用 Docker 部署' }), ['frontend', 'ops']);
  assert.deepEqual(classifyTopics({ title: 'JavaScript 对象基础' }), ['frontend']);
  assert.deepEqual(classifyTopics({ title: 'Redis 持久化' }), ['backend']);
  assert.deepEqual(classifyTopics({ title: 'Codex 上下文压缩' }), ['ai']);
  assert.deepEqual(classifyTopics({ title: '图片上传与裁剪实践' }, 'posts/前端/文件.md'), ['frontend', 'files']);
  assert.deepEqual(classifyTopics({ title: 'PDF 合并', type: 'tool' }), ['files']);
  assert.deepEqual(classifyTopics({ title: 'C 语言指针' }, 'posts/c教程/指针.md'), []);
  assert.equal(normalizeTopic('private'), 'all');
  assert.equal(normalizePeriod('century'), 'all');
});
test('empty default searches stay idle, but active source/topic/time filters fetch no lexical shards', async () => {
  const { runtime, requests } = fixtureRuntime([
    article('new', 'Vue 新版记录', '2026-11-02'), article('old', 'Vue 旧版记录', '2025-01-01'), article('undated', 'Vue 未知日期'), article('java', 'Java 记录', '2026-11-01'),
  ]);
  assert.equal((await runtime.search('')).total, 0); assert.equal(requests.length, 0);
  assert.equal((await runtime.search('', { source: 'private', topic: 'unknown', period: 'invalid' })).total, 0); assert.equal(requests.length, 0);
  const topic = await runtime.search('', { topic: 'frontend' });
  assert.deepEqual(topic.results.map(({ id }) => id), ['article:posts/new.md', 'article:posts/old.md', 'article:posts/undated.md']);
  assert.equal(requests.some((url) => url.includes('/postings/')), false);
  const recent = await runtime.search('', { period: 'week' });
  assert.equal(recent.total, 1); assert.equal(recent.results[0].publishedAt, '2026-11-02');
  const articles = await runtime.search('', { source: 'article', limit: 2, offset: 1 });
  assert.equal(articles.total, 4); assert.deepEqual(articles.results.map(({ title }) => title), ['Java 记录', 'Vue 旧版记录']);
  assert.equal(requests.filter((url) => url.includes('/postings/')).length, 0);
});
test('source-only filtering covers articles, tutorials and tools without downloading lexical shards', async () => {
  const tool = { id: 'tool:image-compress', title: '图片压缩', summary: '公开工具说明', type: 'tool', url: 'https://herong.info/file-tools/tools/image-compress' };
  const guide = tutorial('public', 'Codex 功能说明', '2026-11-02');
  const post = article('vue', 'Vue 记录', '2026-11-01');
  const { runtime, requests } = fixtureRuntime([post, tool], [guide]);
  for (const [source, id] of [['article', post.id], ['tutorial', guide.id], ['tool', tool.id]]) {
    const response = await runtime.search('', { source });
    assert.equal(response.total, 1);
    assert.equal(response.results[0].id, id);
    assert.deepEqual(response.sources, { article: 1, tutorial: 1, tool: 1 });
  }
  assert.equal(requests.some((url) => url.includes('/postings/')), false);
});
test('keyword relevance survives topic/time filters, and source counts/pagination reflect those filters', async () => {
  const { runtime } = fixtureRuntime([
    article('best', 'Vue 组件', '2026-11-02'),
    article('body', '组件目录', '2026-11-02', { body: 'Vue 组件', topics: ['frontend'] }),
    article('old', 'Vue 组件历史', '2025-01-01'),
    article('wrong-topic', 'Java 资料', '2026-11-02', { body: 'Vue 组件', topics: ['backend'] }),
  ], [tutorial('guide', 'Vue 组件正式教程', '2026-11-02')]);
  const response = await runtime.search('Vue 组件', { topic: 'frontend', period: 'week', source: 'article', limit: 1, offset: 0 });
  assert.equal(response.total, 2);
  assert.deepEqual(response.sources, { article: 2, tutorial: 1, tool: 0 });
  assert.equal(response.results[0].title, 'Vue 组件');
  const next = await runtime.search('Vue 组件', { topic: 'frontend', period: 'week', source: 'article', limit: 1, offset: 1 });
  assert.equal(next.results[0].title, '组件目录');
});
test('tutorial browsing uses the same public gate and excludes leads or private feed rows before facets', async () => {
  const row = tutorial('public', 'Codex 工具使用', '2026-11-02', { toolName: 'Codex' });
  const { runtime, requests } = fixtureRuntime([], [row, { ...row, url: 'https://dev.herong.info/topics/lead/', status: 'lead' }, { ...row, url: 'https://dev.herong.info/topics/private/', visibility: 'private' }, { ...row, url: 'https://dev.herong.info/topics/test/', noindex: true }]);
  const response = await runtime.search('', { topic: 'ai', period: 'week', source: 'tutorial' });
  assert.equal(response.total, 1); assert.equal(response.results[0].title, row.title);
  assert.deepEqual(response.sources, { article: 0, tutorial: 1, tool: 0 });
  assert.equal(requests.some((url) => url.includes('/postings/')), false);
});
test('client creates no Worker for empty default state but forwards active source/topic/time filters', async (t) => {
  const originalWorker = globalThis.Worker; const originalWindow = globalThis.window;
  t.after(() => { if (originalWorker === undefined) delete globalThis.Worker; else globalThis.Worker = originalWorker; if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow; });
  const messages = []; let created = 0;
  globalThis.window = { location: { href: 'https://preview.example/' } };
  globalThis.Worker = class {
    constructor() { created++; }
    postMessage(message) { messages.push(message); queueMicrotask(() => this.onmessage({ data: { id: message.id, result: { total: 0, results: [] } } })); }
    terminate() {}
  };
  const client = createSearchClient({ tutorialsUrl: '/search-index/tutorials.json' });
  assert.equal((await client.search('')).total, 0); assert.equal(created, 0);
  assert.equal((await client.search('', { source: 'private', topic: 'unknown', period: 'invalid' })).total, 0); assert.equal(created, 0);
  await client.search('', { topic: 'files', period: 'month' });
  assert.equal(created, 1); assert.equal(messages[0].options.topic, 'files'); assert.equal(messages[0].options.period, 'month');
  for (const source of ['article', 'tutorial', 'tool']) {
    await client.search('', { source });
    assert.equal(messages.at(-1).options.source, source);
  }
  assert.equal(created, 1);
  client.close();
});
