import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDocument } from 'yaml';
import { looksLikeMarkdownDocument, MAX_IMPORT_BYTES, parseMarkdownImport } from '../src/markdown-import.ts';

const target = Object.freeze({
  slug: 'opened-article',
  frontmatter: "title: Current title\nsummary: Current summary\ntool: codex\nstatus: published\nupdatedAt: 2026-11-01\nversion: 'TODO：old version'\nverification:\n  result: 'TODO：old result'\n",
});
const options = { tools: ['codex', 'cursor'], themes: ['parallel-tasks', 'context'] };
const full = (header, body = '# Imported body\n\nAn article.') => `---\n${header}\n---\n\n${body}`;
const read = (result) => parseDocument(result.frontmatter, { uniqueKeys: true }).toJS();

test('BOM and CRLF full document imports aliases as string metadata and separates the body', () => {
  const result = parseMarkdownImport(`\uFEFF${full([
    "title: Imported title",
    "description: Imported summary",
    "tool: cursor",
    "date: 2026-10-30",
    "updated: 2026-11-04",
    "tags: [Codex, 工作效率]",
    "officialSources:",
    "  - title: Official guide",
    "    url: https://example.com/guide",
  ].join('\n')).replaceAll('\n', '\r\n')}`, target, options);
  assert.equal(result.hasFrontmatter, true);
  assert.equal(result.body, '# Imported body\n\nAn article.');
  const fields = read(result);
  assert.equal(fields.title, 'Imported title');
  assert.equal(fields.summary, 'Imported summary');
  assert.equal(fields.tool, 'cursor');
  assert.equal(fields.updatedAt, '2026-11-04');
  assert.equal(typeof fields.updatedAt, 'string');
  assert.deepEqual(fields.keywords, ['Codex', '工作效率']);
  assert.equal(fields.status, 'draft');
  for (const alias of ['description', 'date', 'updated', 'tags']) assert.equal(Object.hasOwn(fields, alias), false);
});

test('canonical imported fields take precedence over compatibility aliases, including empty values', () => {
  const result = parseMarkdownImport(full([
    'title: Canonical title',
    "summary: ''",
    'description: Alias summary',
    'updatedAt: 2026-11-03',
    'updated: 2026-11-04',
    'date: 2026-11-01',
    'keywords: []',
    'tags: [alias-tag]',
    'themes: [parallel-tasks]',
    'featured: false',
    'customField: Retained',
  ].join('\n')), target, options);
  const fields = read(result);
  assert.equal(fields.summary, '');
  assert.equal(fields.updatedAt, '2026-11-03');
  assert.deepEqual(fields.keywords, []);
  assert.deepEqual(fields.themes, ['parallel-tasks']);
  assert.equal(fields.featured, false);
  assert.equal(fields.customField, 'Retained');
});

test('YAML aliases become readable scalar and nested metadata values without shared-object aliases', () => {
  const result = parseMarkdownImport(full([
    'title: &text A complete article title',
    'summary: *text',
    'tool: codex',
    'source: &source',
    '  title: Official documentation',
    '  url: https://example.com/guide',
    'officialSources: [*source]',
    'discoverySources: [*source]',
    'verification:',
    '  testedAt: 2026-11-04',
    '  environment: &environment macOS, local test account',
    '  result: *environment',
  ].join('\n')), target, options);
  const document = parseDocument(result.frontmatter, { uniqueKeys: true });
  assert.equal(document.errors.length, 0);
  // These are the same direct lookups used by the metadata form.
  assert.equal(document.getIn(['summary']), 'A complete article title');
  assert.equal(document.getIn(['verification', 'result']), 'macOS, local test account');
  assert.equal(document.getIn(['officialSources', 0, 'title']), 'Official documentation');
  assert.equal(document.getIn(['discoverySources', 0, 'title']), 'Official documentation');
});

test('compatibility fields may own anchors referenced by retained fields without losing their values', () => {
  const result = parseMarkdownImport(full([
    'description: &text A complete imported summary',
    'title: *text',
    'summary: *text',
    'date: &date 2026-11-04',
    'publishedAt: *date',
    'tags: &tags [Codex, 工作效率]',
    'searchClues: *tags',
  ].join('\n')), target, options);
  const fields = read(result);
  assert.equal(fields.title, 'A complete imported summary');
  assert.equal(fields.summary, 'A complete imported summary');
  assert.equal(fields.updatedAt, '2026-11-04');
  assert.equal(fields.publishedAt, '2026-11-04');
  assert.deepEqual(fields.keywords, ['Codex', '工作效率']);
  assert.deepEqual(fields.searchClues, ['Codex', '工作效率']);
  for (const alias of ['description', 'date', 'tags']) assert.equal(Object.hasOwn(fields, alias), false);
});

test('cyclic aliases and documents exceeding the byte limit after alias expansion are rejected', () => {
  assert.throws(() => parseMarkdownImport(full('title: Article\ncustom: &cycle\n  self: *cycle'), target, options), /循环引用|别名/);
  const header = `title: Article\ncustom: &text ${'a'.repeat(MAX_IMPORT_BYTES / 2)}\ncopy1: *text\ncopy2: *text`;
  assert.throws(() => parseMarkdownImport(full(header), target, options), /超过 2 MiB/);
});

test('complete metadata is authoritative, inheriting only the current tool and defaulting status to draft', () => {
  const fields = read(parseMarkdownImport(full('title: New article'), target, options));
  assert.equal(fields.title, 'New article');
  assert.equal(fields.tool, 'codex');
  assert.equal(fields.status, 'draft');
  for (const old of ['summary', 'updatedAt', 'version', 'verification']) assert.equal(Object.hasOwn(fields, old), false);
  assert.equal(target.frontmatter.includes('TODO：old version'), true);
});

test('body-only import preserves current metadata verbatim and does not guess title or status', () => {
  const body = '# Completely different title\n\nAn ordinary article without YAML.\n';
  const result = parseMarkdownImport(body, target, options);
  assert.equal(result.hasFrontmatter, false);
  assert.equal(result.frontmatter, target.frontmatter);
  assert.equal(result.body, body);
  assert.match(result.warnings.join('\n'), /只替换正文/);
});

test('imported slug cannot change the opened content identity', () => {
  const result = parseMarkdownImport(full('title: Other title\nslug: another-article\ntool: cursor'), target, options);
  assert.equal(read(result).slug, target.slug);
  assert.equal(target.slug, 'opened-article');
  assert.match(result.warnings.join('\n'), /slug 已忽略/);
});

test('import keeps supplied evidence and never manufactures verification for published status', () => {
  const withoutEvidence = parseMarkdownImport(full('title: Tutorial\nstatus: published'), target, options);
  const fields = read(withoutEvidence);
  assert.equal(fields.status, 'published');
  assert.equal(Object.hasOwn(fields, 'verification'), false);
  assert.match(withoutEvidence.warnings.join('\n'), /实测记录不完整/);

  const withEvidence = parseMarkdownImport(full([
    'title: Tutorial',
    'status: published',
    'verification:',
    '  testedAt: 2024-02-29',
    '  environment: macOS 15, test account',
    '  result: Observed the expected output',
  ].join('\n')), target, options);
  assert.deepEqual(read(withEvidence).verification, {
    testedAt: '2024-02-29',
    environment: 'macOS 15, test account',
    result: 'Observed the expected output',
  });
  assert.doesNotMatch(withEvidence.warnings.join('\n'), /实测记录不完整/);
});

test('explicit import accepts one outer Markdown fence while paste detection avoids ordinary snippets', () => {
  const document = full('title: Article');
  const result = parseMarkdownImport(`\`\`\`markdown\n${document}\n\`\`\``, target, options);
  assert.equal(result.hasFrontmatter, true);
  assert.equal(read(result).title, 'Article');
  assert.equal(looksLikeMarkdownDocument(document), true);
  assert.equal(looksLikeMarkdownDocument(`\uFEFF${document.replaceAll('\n', '\r\n')}`), true);
  assert.equal(looksLikeMarkdownDocument('---\n# A YAML comment\n\ntitle: Article\n---\nBody'), true);
  assert.equal(looksLikeMarkdownDocument(`\`\`\`markdown\n${document}\n\`\`\``), false);
  assert.equal(looksLikeMarkdownDocument('Plain paragraph\n\n---\ntitle: Code example\n---'), false);
  assert.equal(looksLikeMarkdownDocument('```yaml\ntitle: Example\n```'), false);
  assert.equal(looksLikeMarkdownDocument('---\n\nA section after a horizontal rule.'), false);
});

test('invalid YAML, duplicate keys, nonmapping metadata, and incomplete headers are rejected', () => {
  for (const [input, message] of [
    [full('title: [unfinished'), /格式有误/],
    [full('title: First\ntitle: Second'), /格式有误/],
    [full('- title\n- summary'), /YAML 对象/],
    [full('plain string'), /YAML 对象/],
    ['---\ntitle: Missing end\nBody', /没有结束/],
  ]) assert.throws(() => parseMarkdownImport(input, target, options), message);
});

test('unknown tools, invalid status, invalid field types, and unsupported themes fail before application', () => {
  for (const [header, message] of [
    ['title: Article\ntool: unsupported', /tool/],
    ['title: Article\ntool: [codex]', /tool/],
    ['title: Article\nstatus: invalid', /status/],
    ['title: Article\nstatus: [published]', /status/],
    ['title: 123', /title/],
    ['title: Article\nsummary: [summary]', /summary/],
    ['title: Article\nkeywords: tags', /keywords/],
    ['title: Article\nsearchClues: [123]', /searchClues/],
    ['title: Article\nthemes: [unknown]', /themes/],
    ['title: Article\nofficialSources: [https://example.com]', /officialSources/],
    ['title: Article\nverification: tested', /verification/],
  ]) assert.throws(() => parseMarkdownImport(full(header), target, options), message);
});

test('date validation rejects rollover and malformed dates, including aliased dates and verification dates', () => {
  for (const [header, message] of [
    ['title: Article\nupdatedAt: 2025-02-29', /不是有效日期/],
    ['title: Article\nupdatedAt: 2026-13-01', /不是有效日期/],
    ['title: Article\nupdatedAt: 2026-04-31', /不是有效日期/],
    ['title: Article\ndate: 2026/11/04', /YYYY-MM-DD/],
    ['title: Article\npublishedAt: 2026-11-04T00:00:00Z', /YYYY-MM-DD/],
    ['title: Article\nverification:\n  testedAt: 2026-02-30', /不是有效日期/],
  ]) assert.throws(() => parseMarkdownImport(full(header), target, options), message);
});

test('oversized, empty, and binary input are rejected without modifying caller data', () => {
  const original = { ...target };
  assert.throws(() => parseMarkdownImport('a'.repeat(MAX_IMPORT_BYTES + 1), target, options), /超过 2 MiB/);
  assert.throws(() => parseMarkdownImport('汉'.repeat(Math.ceil(MAX_IMPORT_BYTES / 3) + 1), target, options), /超过 2 MiB/);
  assert.throws(() => parseMarkdownImport(' \n\t', target, options), /请选择/);
  assert.throws(() => parseMarkdownImport('Body\0binary', target, options), /空字符/);
  assert.deepEqual(target, original);
});

test('local resource links produce an upload reminder without rewriting the article', () => {
  const body = '![Screen](./topic/screen.png)\n\n[Clip](videos/clip.mp4)';
  const result = parseMarkdownImport(full('title: Article\nstatus: lead', body), target, options);
  assert.equal(result.body, body);
  assert.equal(read(result).status, 'lead');
  assert.match(result.warnings.join('\n'), /不会上传这些文件/);
});
