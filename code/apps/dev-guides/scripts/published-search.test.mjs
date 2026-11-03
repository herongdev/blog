import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import {
  buildPublishedFeed, isPublicTutorial, isSearchVisibleTutorial,
  isPublishedSearchTutorial, publishedBodyTerms,
} from '../src/lib/published-search.mjs';

const formal = { origin: 'https://dev.herong.info/', environment: 'production', base: '/',
  toolCatalog: [{ slug: 'codex', name: 'Codex', aliases: ['OpenAI Codex'] }] };
const tutorial = (data = {}, other = {}) => ({ id: 'verified-fixture', data: {
  title: '已实测的公开操作说明', summary: '这是只用于测试的公开内容摘要，说明真实操作步骤与适用范围。',
  tool: 'codex', status: 'published', updatedAt: new Date('2026-10-30'),
  publishedAt: new Date('2026-10-29T16:30:00Z'), version: '测试版本',
  keywords: ['上下文压缩'], searchClues: ['自动压缩', '找回操作'],
  verification: { testedAt: new Date('2026-10-30'), environment: '测试环境为隔离的命令行', result: '操作结果已在隔离测试中确认' },
  ...data,
}, body: '## 操作步骤\n\nＣＯＤＥＸ 上下文，自动压缩。\n\n## 实测结果\n\n能够找回操作步骤。', ...other });

test('legacy public feature visibility is separate from the formal tutorial feed', () => {
  const lead = tutorial({ status: 'lead', verification: undefined }, { id: 'feature-fixture' });
  assert.equal(isPublicTutorial(lead), true);
  assert.equal(isSearchVisibleTutorial(lead), true);
  assert.equal(isPublishedSearchTutorial(lead), false);
  assert.deepEqual(buildPublishedFeed([lead], formal).items, []);
});

test('private, draft, unlisted and explicit noindex markers are rejected before projection', () => {
  const markers = [{ visibility: 'private' }, { visibility: 'unlisted' }, { visibility: 'unknown' },
    { draft: true }, { private: true }, { unlisted: true }, { status: 'draft' },
    { noindex: true }, { searchable: false }, { robots: 'NOINDEX, follow' }, { robots: ['follow', 'none'] }];
  const entries = markers.map((marker, index) => tutorial({ ...marker, title: `SECRET_PLAN_${index}` }, { id: `secret-${index}` }));
  const output = JSON.stringify(buildPublishedFeed(entries, formal));
  assert.deepEqual(JSON.parse(output).items, []);
  assert.doesNotMatch(output, /SECRET_PLAN|secret-\d|自动压缩/);
  assert.equal(isPublicTutorial(tutorial({ noindex: true })), true, 'noindex alone is not a private-content declaration');
  assert.equal(isSearchVisibleTutorial(tutorial({ noindex: true })), false);
});

test('only formal production origin and root base can export searchable tutorials', () => {
  for (const options of [undefined, {}, { ...formal, environment: 'staging' },
    { ...formal, origin: 'https://test-dev.herong.info' }, { ...formal, origin: 'https://101.96.210.172' },
    { ...formal, origin: 'http://dev.herong.info' }, { ...formal, origin: 'https://dev.herong.info.evil.test' },
    { ...formal, origin: 'https://dev.herong.info/admin/' }, { ...formal, base: '/dev/' }]) {
    const result = buildPublishedFeed([tutorial()], options);
    assert.equal(result.enabled, false);
    assert.deepEqual(result.items, []);
  }
});

test('published-only projection is a metadata allowlist with canonical URL and reliable dates', () => {
  const entry = tutorial({ authorNotes: 'DO_NOT_EXPORT_PRIVATE_NOTES', credentials: 'DO_NOT_EXPORT_SECRET', publishedAt: undefined });
  const feed = buildPublishedFeed([entry], formal);
  assert.equal(feed.enabled, true);
  assert.equal(feed.schema, 1);
  assert.equal(feed.source, 'https://dev.herong.info');
  assert.equal(feed.items.length, 1);
  const item = feed.items[0];
  assert.equal(item.url, 'https://dev.herong.info/topics/verified-fixture/');
  assert.equal(item.toolName, 'Codex');
  assert.equal(item.softwareVersion, '测试版本');
  assert.equal(item.updatedAt, '2026-10-30');
  assert.equal(item.publishedAt, undefined, 'no inferred first-publication date');
  assert.equal(buildPublishedFeed([tutorial()], formal).items[0].publishedAt, '2026-10-30', 'dates follow Shanghai calendar');
  assert.ok(item.bodyTerms.includes('codex'));
  assert.ok(item.bodyTerms.includes('压缩'));
  assert.equal(item.bodyText, undefined);
  assert.equal(item.body, undefined);
  assert.doesNotMatch(JSON.stringify(item), /DO_NOT_EXPORT|## 操作步骤|ＣＯＤＥＸ 上下文/);
});

test('published gate reuses verification, search clues and complete-body requirements', () => {
  for (const entry of [tutorial({ verification: undefined }), tutorial({ verification: { testedAt: 'bad date', environment: '12345678', result: '12345678' } }),
    tutorial({ searchClues: ['只有一个'] }), tutorial({ version: 'TODO: replace' }),
    tutorial({}, { id: '../admin/private' }), tutorial({}, { body: '准备验证的问题' }), tutorial({}, { body: '## 操作步骤\n\n没有结果章节。' })]) {
    assert.deepEqual(buildPublishedFeed([entry], formal).items, []);
  }
  const setext = tutorial({}, { body: '操作步骤\n========\n\n按照文档测试。\n\n实测结果\n========\n\n已验证结果。' });
  assert.equal(buildPublishedFeed([setext], formal).items.length, 1);
});

test('body term serialization normalizes CJK, width, case and punctuation without ordered prose', () => {
  const terms = publishedBodyTerms('ＣＯＤＥＸ　上下文，压缩！上下文压缩 codex');
  assert.equal(terms.filter((term) => term === 'codex').length, 1);
  for (const term of ['上', '上下', '下文', '压缩']) assert.ok(terms.includes(term));
  assert.deepEqual(terms, [...terms].sort());
  assert.equal(terms.some((term) => /[，！\s]/.test(term)), false);
});

test('static build keeps private fixtures out of every public asset and both search indexes', { timeout: 120_000 }, async () => {
  const app = fileURLToPath(new URL('../', import.meta.url));
  const temporary = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'herong-published-feed-')));
  try {
    for (const name of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json']) {
      await fs.cp(path.join(app, name), path.join(temporary, name), { recursive: true });
    }
    await fs.symlink(path.join(app, 'node_modules'), path.join(temporary, 'node_modules'));
    const markdown = (title, flags = '') => `---\ntitle: '${title}'\nsummary: '这是只存在于隔离临时构建目录的测试内容摘要，不会发布到实际网站。'\ntool: codex\nstatus: published\nupdatedAt: 2026-10-30\nsearchClues: ['测试线索一', '测试线索二']\nverification:\n  testedAt: 2026-10-30\n  environment: '完全隔离的测试构建环境'\n  result: '只用于验证公开边界和输出安全'\nofficialSources:\n  - title: '测试来源'\n    url: 'https://example.com/'\n${flags}---\n\n## 操作步骤\n\n测试正文。\n\n## 实测结果\n\n测试输出。\n`;
    const directory = path.join(temporary, 'src/content/tutorials');
    await fs.writeFile(path.join(directory, 'public-fixture.md'), markdown('公开测试内容仅存在临时目录'));
    for (const [name, flag] of [['private', 'visibility: private'], ['unlisted', 'visibility: unlisted'], ['draft', 'draft: true'], ['private-flag', 'private: true']]) {
      await fs.writeFile(path.join(directory, `${name}-fixture.md`), markdown(`PRIVATE_SENTINEL_${name}`, `${flag}\n`));
    }
    await fs.writeFile(path.join(directory, 'noindex-fixture.md'), markdown('NOINDEX_SENTINEL_公开但不检索', 'noindex: true\n'));
    await fs.mkdir(path.join(temporary, 'author/drafts'), { recursive: true });
    await fs.writeFile(path.join(temporary, 'author/drafts/plan.md'), 'PRIVATE_DRAFT_DIRECTORY_SENTINEL');
    const astroPackage = JSON.parse(await fs.readFile(path.join(app, 'node_modules/astro/package.json'), 'utf8'));
    const astroCli = path.resolve(app, 'node_modules/astro', astroPackage.bin.astro);
    const run = spawnSync(process.execPath, [astroCli, 'build', '--root', temporary], {
      cwd: temporary, encoding: 'utf8', env: { ...process.env, PUBLIC_SITE_URL: formal.origin,
        PUBLIC_DEPLOY_ENV: 'production', PUBLIC_BASE_PATH: '/', PUBLIC_UMAMI_SRC: '', PUBLIC_UMAMI_WEBSITE_ID: '' },
      maxBuffer: 4 * 1024 * 1024,
    });
    assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
    const dist = path.join(temporary, 'dist');
    const feed = JSON.parse(await fs.readFile(path.join(dist, 'search/published.json'), 'utf8'));
    assert.deepEqual(feed.items.map((item) => item.id), ['tutorial:public-fixture']);
    const existing = JSON.parse(await fs.readFile(path.join(dist, 'search-index.json'), 'utf8'));
    assert.equal(existing.filter((item) => item.status === 'lead').length, 4, 'current public feature search is preserved');
    assert.equal(existing.some((item) => item.title.includes('NOINDEX_SENTINEL')), false);
    assert.equal(existing.some((item) => item.title.includes('公开测试内容')), true);
    const sitemap = await fs.readFile(path.join(dist, 'sitemap.xml'), 'utf8');
    assert.match(sitemap, /topics\/public-fixture\//);
    assert.doesNotMatch(sitemap, /private-fixture|unlisted-fixture|draft-fixture|noindex-fixture/);
    const noindexPage = await fs.readFile(path.join(dist, 'topics/noindex-fixture/index.html'), 'utf8');
    assert.match(noindexPage, /noindex/);
    async function inspect(directory) {
      for (const item of await fs.readdir(directory, { withFileTypes: true })) {
        const location = path.join(directory, item.name);
        if (item.isDirectory()) await inspect(location);
        else if (/\.(?:html|json|js|xml)$/.test(item.name)) {
          assert.doesNotMatch(await fs.readFile(location, 'utf8'), /PRIVATE_SENTINEL|PRIVATE_DRAFT_DIRECTORY_SENTINEL/, location);
        }
      }
    }
    await inspect(dist);
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
});
