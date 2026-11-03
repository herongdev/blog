import { addDocumentToPostings, bucketFor, BUCKETS, normalize, rankDocuments, requiredTokens } from './core.mjs';
import { classifyTopics, hasSearchFilters, createFilterMatcher, newestFirst } from './filters.mjs';
const tutorialOrigin = 'https://dev.herong.info';
const formalOrigin = 'https://herong.info';
const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const strings = (value) => Array.isArray(value) ? value.filter((item) => typeof item === 'string').slice(0, 20000) : [];
function reliableDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = new Date(value + 'T00:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value ? value : undefined;
}
function validURL(value, type) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.search) return false;
    if (type === 'tutorial') return url.origin === tutorialOrigin && /^\/topics\/[a-z0-9][a-z0-9-]*\/$/.test(url.pathname) && !url.hash;
    if (url.origin !== formalOrigin) return false;
    return type === 'tool' ? /^\/file-tools\/tools\/[a-z0-9-]+$/.test(url.pathname) : /^\/posts\/.+/.test(url.pathname) || /^\/vue-progress-scroll-tutorial(?:\.html)?$/.test(url.pathname);
  } catch { return false; }
}
export function publicTutorials(payload) {
  if (!payload || payload.schema !== 1 || payload.source !== tutorialOrigin || !Array.isArray(payload.items)) throw new Error('教程公开索引格式不正确');
  if (payload.enabled !== true) return [];
  const result = [];
  const seen = new Set();
  for (const item of payload.items) {
    if (!item || item.status !== 'published' || item.type !== 'tutorial' || (item.visibility && item.visibility !== 'public') || item.draft === true || item.private === true || item.unlisted === true || item.search === false || item.searchable === false || item.published === false || item.public === false || item.noindex === true || /noindex|none/i.test(String(item.robots ?? '')) || !validURL(item.url, 'tutorial')) continue;
    const title = clean(item.title, 240); const summary = clean(item.summary, 240);
    if (!title || !summary || seen.has(item.url)) continue;
    seen.add(item.url);
    result.push({
      id: `tutorial:${new URL(item.url).pathname.split('/')[2]}`, title, summary, type: 'tutorial', url: item.url,
      ...(reliableDate(item.updatedAt) ? { updatedAt: item.updatedAt } : {}),
      ...(reliableDate(item.publishedAt) ? { publishedAt: item.publishedAt } : {}),
      ...(clean(item.toolName, 80) ? { software: clean(item.toolName, 80) } : {}),
      ...(clean(item.softwareVersion, 80) ? { version: clean(item.softwareVersion, 80) } : {}),
      keywords: strings(item.keywords).slice(0, 50), aliases: strings(item.aliases).slice(0, 50), searchClues: strings(item.searchClues).slice(0, 50),
      bodyTerms: strings(item.bodyTerms).filter((term) => term.length <= 64),
      topics: classifyTopics({ title, toolName: item.toolName, toolSlug: item.toolSlug, keywords: strings(item.keywords), aliases: strings(item.aliases) }),
    });
  }
  return result;
}
function publicResult(document) {
  const { id, title, summary, type, url, updatedAt, publishedAt, software, version } = document;
  return { id, title, summary, type, url, ...(updatedAt ? { updatedAt } : {}), ...(publishedAt ? { publishedAt } : {}), ...(software ? { software } : {}), ...(version ? { version } : {}) };
}
export class SearchRuntime {
  constructor({ baseUrl = '/search-index/', tutorialsUrl = 'https://dev.herong.info/search/published.json', fetcher = globalThis.fetch, now = () => new Date() } = {}) {
    const absoluteBase = new URL(baseUrl, globalThis.location?.href ?? formalOrigin + '/').href;
    this.baseUrl = absoluteBase.endsWith('/') ? absoluteBase : absoluteBase + '/';
    const tutorialEndpoint = new URL(tutorialsUrl, this.baseUrl);
    const localOrigin = new URL(this.baseUrl).origin;
    const isFormalEndpoint = tutorialEndpoint.origin === tutorialOrigin && tutorialEndpoint.pathname === '/search/published.json';
    const isPreviewSnapshot = tutorialEndpoint.origin === localOrigin && /\/search-index\/[a-z0-9-]+\.json$/.test(tutorialEndpoint.pathname);
    if ((!isFormalEndpoint && !isPreviewSnapshot) || tutorialEndpoint.search || tutorialEndpoint.hash || tutorialEndpoint.username || tutorialEndpoint.password) throw new Error('只允许正式公开教程索引或同源预览快照');
    this.tutorialsUrl = tutorialEndpoint.href;
    // WorkerGlobalScope.fetch requires its native receiver, unlike test mocks.
    this.fetcher = fetcher.bind(globalThis);
    this.now = now;
    this.buckets = new Map();
    this.tutorials = [];
    this.tutorialPostings = new Map();
    this.tutorialExpires = 0;
    this.warning = '';
  }
  async json(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await this.fetcher(url, { credentials: 'omit', signal: controller.signal });
      if (!response.ok) throw new Error('索引请求失败');
      return await response.json();
    } finally { clearTimeout(timeout); }
  }
  async local() {
    if (!this.localPromise) {
      this.localPromise = (async () => {
        const manifest = await this.json(new URL('manifest.json', this.baseUrl).href);
        if (manifest.schema !== 1 || manifest.buckets !== BUCKETS || !/^[a-f0-9]{16}$/.test(manifest.version)) throw new Error('索引版本不正确');
        const versionRoot = new URL(manifest.version + '/', this.baseUrl);
        const documents = await this.json(new URL('documents.json', versionRoot).href);
        if (!Array.isArray(documents) || documents.some((doc) => !doc || !['article', 'tool'].includes(doc.type) || !validURL(doc.url, doc.type))) throw new Error('索引内容不正确');
        return { manifest, documents, versionRoot };
      })().catch((error) => { this.localPromise = undefined; throw error; });
    }
    return this.localPromise;
  }
  async tutorialsNow() {
    if (Date.now() < this.tutorialExpires) return this.tutorials;
    if (!this.tutorialPromise) {
      this.tutorialPromise = (async () => {
        try {
          this.tutorials = publicTutorials(await this.json(this.tutorialsUrl));
          this.tutorialPostings = new Map();
          this.tutorials.forEach((document, i) => addDocumentToPostings(this.tutorialPostings, document, i));
          this.warning = '';
          this.tutorialExpires = Date.now() + 60000;
        } catch {
          this.tutorials = [];
          this.tutorialPostings = new Map();
          this.warning = '教程搜索暂时无法加载，技术文章与工具仍可搜索。';
          this.tutorialExpires = Date.now() + 10000;
        } finally { this.tutorialPromise = undefined; }
        return this.tutorials;
      })();
    }
    return this.tutorialPromise;
  }
  async bucket(id, versionRoot) {
    if (!this.buckets.has(id)) {
      const promise = this.json(new URL('postings/' + id + '.json', versionRoot).href).then((data) => {
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('索引分片格式不正确');
        return data;
      }).catch((error) => { this.buckets.delete(id); throw error; });
      this.buckets.set(id, promise);
    }
    return this.buckets.get(id);
  }
  async search(query, options = {}, canRefresh = true) {
    const { source = 'all', limit = 12, offset = 0 } = options;
    const value = normalize(query).slice(0, 160);
    const tokens = requiredTokens(value);
    if (!tokens.length && !hasSearchFilters(options)) return { query: value, total: 0, results: [], sources: { article: 0, tutorial: 0, tool: 0 }, warnings: [] };
    const [{ manifest, documents, versionRoot }, tutorials] = await Promise.all([this.local(), this.tutorialsNow()]);
    const mergedDocuments = [...documents, ...tutorials];
    let ranked;
    if (tokens.length) {
      const ids = [...new Set(tokens.map(bucketFor))];
      let shards;
      try { shards = await Promise.all(ids.map((id) => this.bucket(id, versionRoot))); }
      catch (error) {
        // A new deployment intentionally removes revoked/obsolete digests. Refresh
        // the mutable manifest once rather than retrying a removed version forever.
        if (!canRefresh) throw error;
        this.localPromise = undefined;
        this.buckets.clear();
        return this.search(query, options, false);
      }
      const postings = new Map();
      for (const token of tokens) {
        const shard = shards[ids.indexOf(bucketFor(token))];
        const rows = shard[token];
        const publicRows = Array.isArray(rows) ? rows : [];
        const tutorialRows = (this.tutorialPostings.get(token) ?? []).map(([id, weight]) => [id + documents.length, weight]);
        postings.set(token, [...publicRows, ...tutorialRows]);
      }
      ranked = rankDocuments(mergedDocuments, postings, value);
    } else {
      // Source, topic and time filters need only metadata and the public feed.
      ranked = mergedDocuments.sort(newestFirst).map((document) => ({ document }));
    }
    const matches = createFilterMatcher(options, this.now());
    const available = ranked.filter(({ document }) => matches(document));
    const sources = { article: 0, tutorial: 0, tool: 0 };
    for (const { document } of available) sources[document.type]++;
    const filtered = source === 'all' ? available : available.filter(({ document }) => document.type === source);
    const pageSize = Math.min(50, Math.max(1, Number(limit) || 12));
    const start = Math.max(0, Number(offset) || 0);
    return { query: value, total: filtered.length, results: filtered.slice(start, start + pageSize).map(({ document }) => publicResult(document)), sources, warnings: this.warning ? [this.warning] : [], indexVersion: manifest.version };
  }
}
