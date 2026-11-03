import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { gzipSync } from 'node:zlib';
import ts from 'typescript';
import { addDocumentToPostings, bucketFor, BUCKETS } from '../src/search/core.mjs';
import { classifyTopics } from '../src/search/filters.mjs';
import { articlePath } from '../../blog/scripts/site-urls.mjs';
import { isPublicSearchMetadata } from '../../blog/scripts/search-visibility.mjs';
const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const codeDir = path.resolve(appDir, '../..');
const blogRequire = createRequire(path.join(codeDir, 'apps/blog/package.json'));
const matter = blogRequire('gray-matter');
const formalOrigin = 'https://herong.info';
export function isPublicArticle(data, relativePath) {
  const segments = relativePath.replaceAll('\\', '/').split('/');
  if (segments.some((part) => /^\./.test(part) || /^(?:_templates|drafts?|private|author|admin)$/i.test(part))) return false;
  if (/^(?:index|readme)\.md$/i.test(segments.at(-1) ?? '')) return false;
  return isPublicSearchMetadata(data);
}
export function markdownText(markdown, { summary = false } = {}) {
  let text = String(markdown).replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  if (summary) text = text.replace(/```[\s\S]*?```/g, ' ').replace(/~~~[\s\S]*?~~~/g, ' ');
  return text.replace(/^\s*:::[^\n]*$/gm, ' ').replace(/^\s*(?:title|date|description|categories|tags|keywords):[^\n]*$/gmi, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]*>/g, ' ').replace(/^\s*(?:#{1,6}|>|\*|\d+[.)]|[-+])\s*/gm, '').replace(/[`*~|]/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/\s+/g, ' ').trim();
}
export function articleSummary(value, title) {
  const narrative = String(value).replace(/<!--[\s\S]*?-->/g, ' ').replace(/```[\s\S]*?```/g, ' ').replace(/~~~[\s\S]*?~~~/g, ' ').split(/\n+/).map((line) => line.trim()).filter((line) => line && !/^(?:#{1,6}\s|:::|---|(?:title|date|description|categories|tags|keywords):)/i.test(line)).filter((line) => !/(?:分类专栏|文章标签|订阅专栏|社区收录|\d+\s*收藏|已于\s*\d{4})/.test(line));
  const paragraphs = narrative.map((line) => markdownText(line, { summary: true })).filter((line) => line !== title && [...line].length >= 25);
  return paragraphs.join(' ') || markdownText(value, { summary: true });
}
function dateValue(value) {
  if (value instanceof Date) return Number.isFinite(value.getTime()) ? value.toISOString().slice(0, 10) : undefined;
  if (typeof value !== 'string') return undefined;
  const date = value.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (!date) return undefined;
  const parsed = new Date(date + 'T00:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date ? date : undefined;
}
function words(value) {
  return (Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[,，]/) : []).filter((word) => typeof word === 'string').map((word) => word.trim()).filter(Boolean).slice(0, 50);
}
async function filesUnder(directory) {
  const result = [];
  for (const entry of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (entry.isSymbolicLink()) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await filesUnder(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) result.push(full);
  }
  return result;
}
export async function loadPublicArticles({ docsDir = path.join(codeDir, 'apps/blog/docs') } = {}) {
  // The allowlist is deliberate: never glob the repository, tutorials, author or private project tree.
  const files = await filesUnder(path.join(docsDir, 'posts'));
  const extra = path.join(docsDir, 'vue-progress-scroll-tutorial.md');
  if (await fs.stat(extra).then((stat) => stat.isFile()).catch(() => false)) files.push(extra);
  const documents = []; let excluded = 0;
  for (const filename of files) {
    const relative = path.relative(docsDir, filename).split(path.sep).join('/');
    let parsed;
    try { parsed = matter(await fs.readFile(filename, 'utf8')); }
    catch { excluded++; continue; } // Invalid metadata fails closed; no text reaches an index.
    const { data, content } = parsed;
    if (!isPublicArticle(data, relative)) { excluded++; continue; }
    const title = (typeof data.title === 'string' && data.title.trim()) || content.match(/^#\s+(.+)$/m)?.[1]?.trim() || path.basename(filename, '.md');
    const rawDescription = typeof data.description === 'string' ? data.description : typeof data.summary === 'string' ? data.summary : content;
    let summary = articleSummary(rawDescription, title);
    if (summary.startsWith(title)) summary = summary.slice(title.length).trim();
    if (!summary) summary = markdownText(content) || '原文未提供文字摘要。';
    summary = [...summary].slice(0, 140).join('');
    const publishedAt = dateValue(data.publishedAt ?? data.date);
    const updatedAt = dateValue(data.updatedAt ?? data.updated ?? data.lastUpdated);
    documents.push({ id: 'article:' + relative, title: markdownText(title).slice(0, 240), summary, type: 'article', url: new URL(articlePath(relative), formalOrigin).href,
      ...(publishedAt ? { publishedAt } : {}), ...(updatedAt ? { updatedAt } : {}),
      ...(typeof data.software === 'string' ? { software: data.software.slice(0, 80) } : {}), ...(typeof data.version === 'string' ? { version: data.version.slice(0, 80) } : {}),
      keywords: [...words(data.keywords), ...words(data.tags)], aliases: words(data.aliases), body: markdownText(content).slice(0, 200000) });
  }
  return { documents, scanned: files.length, excluded };
}
export async function loadTools({ toolsPath = path.join(codeDir, 'packages/light-tools/shared/src/tools.ts') } = {}) {
  const source = await fs.readFile(toolsPath, 'utf8');
  // This is the existing trusted registry, not user-authored Markdown or uploaded code.
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { tools } = await import('data:text/javascript,' + encodeURIComponent(js));
  return tools.map((tool) => ({ id: 'tool:' + tool.slug, title: tool.name, summary: tool.shortDescription, type: 'tool', url: formalOrigin + '/file-tools/tools/' + tool.slug, keywords: tool.seo.keywords, aliases: [], body: tool.longDescription }));
}
export function createIndex(sourceDocuments) {
  const postings = new Map();
  const documents = sourceDocuments.map((doc, id) => {
    addDocumentToPostings(postings, doc, id, doc.body ?? '');
    const { body, keywords, aliases, searchClues, bodyTerms, ...metadata } = doc;
    return { ...metadata, topics: classifyTopics(doc, doc.id) };
  });
  const buckets = Object.fromEntries(Array.from({ length: BUCKETS }, (_, i) => [i.toString(16).padStart(2, '0'), {}]));
  for (const [term, rows] of [...postings.entries()].sort(([a], [b]) => a.localeCompare(b, 'en'))) buckets[bucketFor(term)][term] = rows;
  return { documents, buckets, terms: postings.size };
}
export async function buildSearchIndex({ docsDir, toolsPath, outputDir = path.join(appDir, 'public/search-index') } = {}) {
  const articles = await loadPublicArticles({ docsDir });
  const tools = await loadTools({ toolsPath });
  const index = createIndex([...articles.documents, ...tools]);
  const serial = JSON.stringify(index.documents);
  const hash = crypto.createHash('sha256').update(serial);
  const bucketStrings = Object.entries(index.buckets).map(([id, data]) => [id, JSON.stringify(data)]);
  for (const [, data] of bucketStrings) hash.update(data);
  const version = hash.digest('hex').slice(0, 16);
  const versionDir = path.join(outputDir, version);
  await fs.mkdir(path.join(versionDir, 'postings'), { recursive: true });
  await fs.writeFile(path.join(versionDir, 'documents.json'), serial);
  for (const [id, data] of bucketStrings) await fs.writeFile(path.join(versionDir, 'postings', id + '.json'), data);
  const counts = { article: articles.documents.length, tool: tools.length };
  const manifest = { schema: 1, version, buckets: BUCKETS, counts, terms: index.terms };
  // Versioned immutable files are complete before replacing the small manifest.
  await fs.mkdir(outputDir, { recursive: true });
  const temporary = path.join(outputDir, '.manifest-' + process.pid + '.json');
  await fs.writeFile(temporary, JSON.stringify(manifest));
  await fs.rename(temporary, path.join(outputDir, 'manifest.json'));
  // Remove obsolete generated digests: a previously public article may now
  // be private. Retaining its old metadata/postings would defeat source gating.
  const versionDirectories = (await fs.readdir(outputDir, { withFileTypes: true })).filter((entry) => entry.isDirectory() && /^[a-f0-9]{16}$/.test(entry.name));
  const retainedVersions = [version];
  for (const entry of versionDirectories) if (entry.name !== version) await fs.rm(path.join(outputDir, entry.name), { recursive: true });
  const allStrings = [serial, ...bucketStrings.map(([, data]) => data)];
  const statistics = { ...manifest, scannedArticles: articles.scanned, excludedArticles: articles.excluded, metadataBytes: Buffer.byteLength(serial), metadataGzipBytes: gzipSync(serial).length, indexBytes: allStrings.reduce((sum, data) => sum + Buffer.byteLength(data), 0), indexGzipBytes: allStrings.reduce((sum, data) => sum + gzipSync(data).length, 0), largestShardBytes: Math.max(...bucketStrings.map(([, data]) => Buffer.byteLength(data))), retainedVersions, outputDir };
  return statistics;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const flag = (name) => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : undefined; };
  const result = await buildSearchIndex({ outputDir: flag('--out'), docsDir: flag('--docs'), toolsPath: flag('--tools') });
  console.log(JSON.stringify(result, null, 2));
}
