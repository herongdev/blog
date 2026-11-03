import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createIndex, buildSearchIndex, isPublicArticle, markdownText } from './build-search-index.mjs';
import { normalize, compact, addDocumentToPostings, rankDocuments } from '../src/search/core.mjs';
import { SearchRuntime, publicTutorials } from '../src/search/runtime.mjs';
const article = (id, title, body = '', extra = {}) => ({ id: 'article:' + id, title, summary: '公开技术文章摘要', type: 'article', url: 'https://herong.info/posts/' + id, body, ...extra });
function rank(docs, query) {
  const postings = new Map(); docs.forEach((doc, i) => addDocumentToPostings(postings, doc, i, doc.body));
  return rankDocuments(docs, postings, query).map((entry) => entry.document.id);
}
test('Chinese punctuation, width, case and spaces normalize consistently', () => {
  assert.equal(normalize('  ＣＯＤＥＸ  '), 'codex');
  assert.equal(compact('ＣＯＤＥＸ，扳 手！'), compact('Codex 扳手'));
  const docs = [article('vue', 'Vue 路由与导航守卫'), article('pdf', 'PDF 文件压缩')];
  assert.deepEqual(rank(docs, ' ＶＵＥ，路由 '), ['article:vue']);
  assert.deepEqual(rank(docs, '怎么压缩 PDF？'), ['article:pdf']);
  const english = [article('compose', 'Docker Compose 部署'), article('next', 'Next.js 路由')];
  for (const query of ['Docker Compose', 'Docker，Compose']) assert.deepEqual(rank(english, query), ['article:compose']);
  for (const query of ['Next.js', 'next js']) assert.deepEqual(rank(english, query), ['article:next']);
});
test('maintainable query aliases retrieve existing documents, never fabricate documents', () => {
  const docs = [article('context', '上下文压缩'), article('agents', '子智能体的工具权限'), article('loaded', '加载了工具')];
  assert.deepEqual(rank(docs, '自动压缩'), ['article:context']);
  assert.deepEqual(rank(docs, '子代理'), ['article:agents']);
  assert.deepEqual(rank(docs, 'Codex 扳手'), ['article:loaded']);
  assert.deepEqual(rank(docs, '不存在的量子面包功能'), []);
  const unrelated = [article('event', '子节点的事件代理'), article('loader', '加载模块和使用工具'), article('zip', '自动执行打包和压缩')];
  assert.deepEqual(rank(unrelated, '子代理'), []);
  assert.deepEqual(rank(unrelated, 'Codex 扳手'), []);
  assert.deepEqual(rank(unrelated, '自动压缩'), []);
});
test('relevance precedes source preference and all meaningful words must match', () => {
  const docs = [article('title', 'Redis 持久化'), { ...article('guide', '其他教程', 'Redis 的持久化说明'), type: 'tutorial' }, article('half', 'Redis 连接')];
  assert.equal(rank(docs, 'Redis 持久化')[0], 'article:title');
  assert.equal(rank(docs, 'Redis 持久化').includes('article:half'), false);
  assert.deepEqual(rank(docs, 'Redis 火星'), []);
});
test('source allowlist rejects private, draft, unlisted, lead, noindex and directory metadata', () => {
  const disallowed = [{ draft: true }, { private: true }, { unlisted: true }, { public: false }, { published: false }, { search: false }, { searchable: false }, { visibility: 'private' }, { visibility: 'unlisted' }, { status: 'draft' }, { status: 'lead' }, { noindex: true }, { robots: 'noindex,follow' }, { password: 'protected' }, { head: [['meta', { name: 'robots', content: 'noindex' }]] }];
  for (const data of disallowed) assert.equal(isPublicArticle(data, 'posts/example.md'), false);
  for (const name of ['posts/index.md', 'posts/a/README.md', 'posts/_templates/example.md', 'posts/private/a.md', 'posts/.hidden.md']) assert.equal(isPublicArticle({}, name), false);
  for (const name of ['posts/__proto__属性.md', 'posts/_.template方法.md', 'posts/_render方法.md']) assert.equal(isPublicArticle({}, name), true);
  assert.equal(isPublicArticle({ date: '2024-02-29' }, 'posts/公开技术文章.md'), true);
});
test('non-rendered comments and scripts never become indexed or summarized content', () => {
  assert.equal(markdownText('公开 <!-- SECRET_COMMENT --> 内容<script>SECRET_SCRIPT</script>'), '公开 内容');
  assert.equal(markdownText('`__proto__` 属性、`_.template` 与 `_render` 方法'), '__proto__ 属性、 _.template 与 _render 方法');
});
test('index metadata never includes full body or internal search fields', () => {
  const value = createIndex([article('body', '正文检索', 'BODY_ONLY_PHRASE 只有正文里有的词', { keywords: ['测试'], aliases: ['检索'] })]);
  assert.equal('body' in value.documents[0], false);
  assert.equal('keywords' in value.documents[0], false);
  assert.equal(JSON.stringify(value.documents).includes('BODY_ONLY_PHRASE'), false);
  assert.ok(Object.values(value.buckets).some((bucket) => bucket.body));
});
test('public tutorial adaptation accepts only canonical published records; never leads or admin links', () => {
  const base = { id: 'tutorial:fixture', type: 'tutorial', status: 'published', title: '已公开的测试教程', summary: '这是测试专用公开摘要', url: 'https://dev.herong.info/topics/fixture/', bodyTerms: ['公开'], updatedAt: '2025-02-28' };
  const payload = { schema: 1, source: 'https://dev.herong.info', enabled: true, items: [base, { ...base, status: 'lead' }, { ...base, url: 'https://dev.herong.info/admin/private' }, { ...base, url: 'https://test-dev.herong.info/topics/test/' }, { ...base, url: 'javascript:alert(1)' }, { ...base, url: 'https://dev.herong.info/topics/private-flag/', private: true }, { ...base, url: 'https://dev.herong.info/topics/unlisted-flag/', unlisted: true }, { ...base, url: 'https://dev.herong.info/topics/search-disabled/', searchable: false }, { ...base, url: 'https://dev.herong.info/topics/private/', visibility: 'private' }, { ...base, url: 'https://dev.herong.info/topics/noindex/', robots: 'noindex' }] };
  const docs = publicTutorials(payload); assert.equal(docs.length, 1); assert.equal(docs[0].updatedAt, '2025-02-28');
  assert.deepEqual(publicTutorials({ ...payload, enabled: false }), []);
  assert.throws(() => publicTutorials({ ...payload, source: 'https://test-dev.herong.info' }));
});
test('runtime refuses tutorial admin/test endpoints before making any request', () => {
  for (const tutorialsUrl of ['https://dev.herong.info/admin/api/articles', 'https://test-dev.herong.info/search/published.json', 'https://evil.example/search/published.json']) assert.throws(() => new SearchRuntime({ baseUrl: 'https://preview.example/search-index/', tutorialsUrl }));
});
test('build output source filters omit private markers, loads shards on demand and retries fetch failures', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'herong-search-test-')); t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const docsDir = path.join(dir, 'docs'); const outputDir = path.join(dir, 'output');
  await fs.mkdir(path.join(docsDir, 'posts'), { recursive: true });
  await fs.writeFile(path.join(docsDir, 'posts', 'visible.md'), '---\ntitle: Redis 持久化\ndate: 2025-02-28\n---\n这是可公开的持久化介绍。<!-- SECRET_COMMENT -->');
  await fs.writeFile(path.join(docsDir, 'posts', 'draft.md'), '---\ntitle: SECRET_DRAFT_TITLE\ndraft: true\n---\nSECRET_DRAFT_BODY');
  await fs.writeFile(path.join(docsDir, 'posts', 'index.md'), 'SECRET_DIRECTORY');
  const statistics = await buildSearchIndex({ docsDir, outputDir });
  assert.equal(statistics.counts.article, 1); assert.equal(statistics.counts.tool, 9); assert.equal(statistics.excludedArticles, 2);
  const files = async (root) => (await fs.readdir(root, { withFileTypes: true })).flatMap((entry) => entry.isDirectory() ? [] : [path.join(root, entry.name)]);
  const output = [path.join(outputDir, 'manifest.json'), ...await files(path.join(outputDir, statistics.version)), ...await files(path.join(outputDir, statistics.version, 'postings'))];
  for (const filename of output) assert.equal((await fs.readFile(filename, 'utf8')).toLowerCase().includes('secret'), false);
  const requests = []; let fail = true;
  const runtime = new SearchRuntime({ baseUrl: 'https://preview.example/base/search-index/', tutorialsUrl: 'https://preview.example/base/search-index/tutorials.json', fetcher: async (url) => {
    requests.push(url);
    if (url.endsWith('/tutorials.json')) return { ok: false };
    if (fail) { fail = false; throw new Error('network'); }
    const filename = path.join(outputDir, new URL(url).pathname.replace('/base/search-index/', ''));
    return { ok: true, json: async () => JSON.parse(await fs.readFile(filename, 'utf8')) };
  } });
  assert.equal(requests.length, 0);
  assert.equal((await runtime.search('')).results.length, 0); assert.equal(requests.length, 0);
  await assert.rejects(runtime.search('Redis 持久化'));
  const response = await runtime.search('Redis 持久化');
  assert.equal(response.total, 1); assert.equal(response.results[0].url, 'https://herong.info/posts/visible');
  assert.equal(response.results[0].publishedAt, '2025-02-28'); assert.equal(response.results[0].updatedAt, undefined);
  assert.equal(response.warnings.length, 1);
  assert.ok(requests.filter((url) => url.includes('/postings/')).length < 64);
  const before = requests.length; await runtime.search('Redis 持久化'); assert.equal(requests.length, before);
});

test('native-style fetch retains the WorkerGlobalScope receiver', async () => {
  const runtime = new SearchRuntime({ baseUrl: 'https://preview.example/search-index/', fetcher: async function () {
    assert.equal(this, globalThis);
    return { ok: true, json: async () => ({ ok: true }) };
  } });
  assert.deepEqual(await runtime.json('https://preview.example/search-index/manifest.json'), { ok: true });
});

test('a public-to-private rebuild removes the previous downloadable digest', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'herong-search-revocation-')); t.after(() => fs.rm(root, { recursive: true, force: true }));
  const docsDir = path.join(root, 'docs'); const outputDir = path.join(root, 'output');
  await fs.mkdir(path.join(docsDir, 'posts'), { recursive: true });
  const file = path.join(docsDir, 'posts', 'changing.md');
  await fs.writeFile(file, '---\ntitle: zzprivacyrevocation\n---\nA formerly public article.');
  const first = await buildSearchIndex({ docsDir, outputDir });
  const runtime = new SearchRuntime({ baseUrl: 'https://preview.example/search-index/', tutorialsUrl: 'https://preview.example/search-index/tutorials.json', fetcher: async (url) => {
    if (url.endsWith('/tutorials.json')) return { ok: true, json: async () => ({ schema: 1, source: 'https://dev.herong.info', enabled: true, items: [] }) };
    try { const text = await fs.readFile(path.join(outputDir, new URL(url).pathname.replace('/search-index/', '')), 'utf8'); return { ok: true, json: async () => JSON.parse(text) }; }
    catch { return { ok: false }; }
  } });
  await runtime.local(); // Simulate a worker holding the previous manifest.
  await fs.writeFile(file, '---\ntitle: zzprivacyrevocation\nprivate: true\n---\nA formerly public article.');
  const second = await buildSearchIndex({ docsDir, outputDir });
  assert.notEqual(first.version, second.version);
  await assert.rejects(fs.stat(path.join(outputDir, first.version)), { code: 'ENOENT' });
  assert.equal(second.counts.article, 0);
  assert.equal((await fs.readFile(path.join(outputDir, second.version, 'documents.json'), 'utf8')).includes('zzprivacyrevocation'), false);
  assert.deepEqual(second.retainedVersions, [second.version]);
  assert.equal((await runtime.search('zzprivacyrevocation')).total, 0);
});
test('code-only and image-only public posts still have truthful nonempty summaries', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'herong-search-summary-')); t.after(() => fs.rm(root, { recursive: true, force: true }));
  const docsDir = path.join(root, 'docs'); const outputDir = path.join(root, 'output'); await fs.mkdir(path.join(docsDir, 'posts'), { recursive: true });
  await fs.writeFile(path.join(docsDir, 'posts', 'code.md'), '---\ntitle: A code-only page\n---\n```js\nconst actualSource = 1;\n```');
  await fs.writeFile(path.join(docsDir, 'posts', 'image.md'), '---\ntitle: A public image page\n---\n![image](https://example.com/image.png)');
  const result = await buildSearchIndex({ docsDir, outputDir }); const docs = JSON.parse(await fs.readFile(path.join(outputDir, result.version, 'documents.json'), 'utf8'));
  assert.ok(docs.every((document) => document.summary.trim()));
  assert.match(docs.find((document) => document.title === 'A code-only page').summary, /actualSource/);
  assert.equal(docs.find((document) => document.title === 'A public image page').summary, '原文未提供文字摘要。');
});

test('published tutorial feed refreshes without rebuilding the main index and removes withdrawn tutorials', async () => {
  const index = createIndex([article('public', '公开的本地主站文章')]);
  const manifest = { schema: 1, version: '0123456789abcdef', buckets: 64 };
  let items = []; let manifestRequests = 0; let tutorialRequests = 0;
  const runtime = new SearchRuntime({ baseUrl: 'https://preview.example/search-index/', tutorialsUrl: 'https://preview.example/search-index/tutorials.json', fetcher: async (url) => {
    if (url.endsWith('/tutorials.json')) {
      tutorialRequests++;
      return { ok: true, json: async () => ({ schema: 1, source: 'https://dev.herong.info', enabled: true, items }) };
    }
    if (url.endsWith('/manifest.json')) { manifestRequests++; return { ok: true, json: async () => manifest }; }
    if (url.endsWith('/documents.json')) return { ok: true, json: async () => index.documents };
    const id = new URL(url).pathname.match(/\/postings\/([a-f0-9]{2})\.json$/)?.[1];
    return { ok: Boolean(id), json: async () => index.buckets[id] };
  } });
  assert.equal((await runtime.search('多光标')).total, 0);
  items = [{ id: 'tutorial:runtime-fixture', type: 'tutorial', status: 'published', title: '测试编辑器的多光标操作', summary: '本项只存在于测试内存，用于验证公开教程发布后可搜索。', url: 'https://dev.herong.info/topics/runtime-fixture/', updatedAt: '2025-03-01', bodyTerms: ['多光标'], toolName: '测试编辑器' }];
  runtime.tutorialExpires = 0; // Simulate the public feed's TTL elapsing.
  const published = await runtime.search('多光标', { source: 'tutorial' });
  assert.equal(published.total, 1);
  assert.equal(published.results[0].url, 'https://dev.herong.info/topics/runtime-fixture/');
  items = []; // Source-side publishing removes a tutorial made private.
  runtime.tutorialExpires = 0;
  assert.equal((await runtime.search('多光标')).total, 0);
  assert.equal(tutorialRequests, 3);
  assert.equal(manifestRequests, 1);
});
