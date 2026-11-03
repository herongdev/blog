import { unified } from 'unified';
import remarkParse from 'remark-parse';

export const PUBLISHED_SEARCH_ORIGIN = 'https://dev.herong.info';
const parser = unified().use(remarkParse);
const segmenter = typeof Intl.Segmenter === 'function'
  ? new Intl.Segmenter('zh-CN', { granularity: 'word' }) : null;
const localDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
});

const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const marked = (value) => value === true || value === 'true';
const strings = (value) => Array.isArray(value)
  ? [...new Set(value.filter(nonempty).map((item) => item.trim()))] : [];

/** The content collection is already separate from the private draft library.
 * These explicit frontmatter markers also fail closed before any public projection.
 */
export function isPublicTutorial(entry) {
  const data = entry?.data;
  return !!data && ['lead', 'published'].includes(data.status)
    && (data.visibility === undefined || data.visibility === 'public')
    && !marked(data.draft) && !marked(data.private) && !marked(data.unlisted);
}

/** A lead remains visible in the existing tutorial site's labelled feature search.
 * Explicit noindex/searchable markers never enter either downloadable search feed.
 */
export function isSearchVisibleTutorial(entry) {
  if (!isPublicTutorial(entry)) return false;
  const data = entry.data;
  const robots = Array.isArray(data.robots) ? data.robots.join(',') : data.robots;
  return !marked(data.noindex) && data.searchable !== false
    && !(typeof robots === 'string' && /(?:^|[\s,;])(?:noindex|none)(?:$|[\s,;])/i.test(robots));
}

function dateValue(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return undefined;
  const parts = Object.fromEntries(localDate.formatToParts(date).map(({ type, value: part }) => [type, part]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function documentText(markdown) {
  const tree = parser.parse(markdown);
  const text = [];
  const headings = [];
  const content = (node) => {
    if (['text', 'inlineCode', 'code'].includes(node.type)) return node.value ?? '';
    return (node.children ?? []).map(content).join(' ');
  };
  const visit = (node) => {
    if (node.type === 'heading') headings.push(content(node));
    if (['text', 'inlineCode', 'code'].includes(node.type)) text.push(node.value ?? '');
    else for (const child of node.children ?? []) visit(child);
  };
  visit(tree);
  return { text: text.join(' '), headings };
}

/** Normalized terms only, not article paragraphs or an ordered body excerpt.
 * Full CJK words and bigrams let consumers match independently of ICU word splits.
 */
export function publishedBodyTerms(value) {
  const normalized = String(value ?? '').normalize('NFKC').toLocaleLowerCase('zh-CN');
  const tokens = new Set();
  for (const chunk of normalized.match(/[\p{Script=Han}]+|[\p{Script=Latin}\p{N}]+/gu) ?? []) {
    if (/\p{Script=Han}/u.test(chunk)) {
      const characters = [...chunk];
      for (const character of characters) tokens.add(character);
      for (let i = 0; i + 1 < characters.length; i++) tokens.add(characters[i] + characters[i + 1]);
      if (segmenter) {
        for (const item of segmenter.segment(chunk)) {
          if (item.isWordLike && [...item.segment].length <= 32) tokens.add(item.segment);
        }
      } else if (characters.length <= 32) tokens.add(chunk);
    } else if (chunk.length <= 64) tokens.add(chunk);
  }
  return [...tokens].sort();
}

/** Reuse the published tutorial's existing verification and body gates. */
export function isPublishedSearchTutorial(entry) {
  if (!isSearchVisibleTutorial(entry) || entry.data.status !== 'published') return false;
  const verification = entry.data.verification;
  if (!verification || !dateValue(verification.testedAt)
    || typeof verification.environment !== 'string' || verification.environment.trim().length < 8
    || typeof verification.result !== 'string' || verification.result.trim().length < 8) return false;
  const fields = [entry.data.title, entry.data.summary, entry.data.version, entry.data.platform,
    ...strings(entry.data.keywords), ...strings(entry.data.searchClues), verification.environment, verification.result];
  if (fields.some((value) => typeof value === 'string' && /(?:TODO[:：]|REPLACE_WITH_)/i.test(value))) return false;
  if (strings(entry.data.searchClues).length < 2 || !nonempty(entry.data.title) || !nonempty(entry.data.summary)) return false;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id ?? '')) return false;
  const body = String(entry.body ?? '');
  if (/这是一条\*\*待实测的功能线索\*\*|本站尚未|准备验证的问题|TODO[:：]|REPLACE_WITH_/i.test(body)) return false;
  const { headings } = documentText(body);
  return headings.some((heading) => heading.includes('操作步骤'))
    && headings.some((heading) => heading.includes('实测结果'));
}

function formalProduction({ origin, environment, base }) {
  if (environment !== 'production' || base !== '/') return false;
  try {
    const url = new URL(origin);
    return url.origin === PUBLISHED_SEARCH_ORIGIN && url.pathname === '/'
      && !url.search && !url.hash && !url.username && !url.password;
  } catch { return false; }
}

/** Build-time public projection. Never pass author-library or admin API data here.
 * toolCatalog is the existing public software registry, supplied by the endpoint.
 */
export function buildPublishedFeed(entries, options = {}) {
  const enabled = formalProduction(options);
  const feed = { schema: 1, source: PUBLISHED_SEARCH_ORIGIN, enabled, items: [] };
  if (!enabled) return feed;
  const catalog = new Map((options.toolCatalog ?? []).map((tool) => [tool.slug, tool]));
  feed.items = entries.filter(isPublishedSearchTutorial).map((entry) => {
    const data = entry.data;
    const tool = catalog.get(data.tool);
    const { text } = documentText(String(entry.body ?? ''));
    return {
      id: `tutorial:${entry.id}`,
      type: 'tutorial',
      status: 'published',
      title: data.title.trim(),
      summary: data.summary.trim(),
      url: `${PUBLISHED_SEARCH_ORIGIN}/topics/${entry.id}/`,
      updatedAt: dateValue(data.updatedAt),
      publishedAt: dateValue(data.publishedAt),
      toolName: tool?.name ?? data.tool,
      toolSlug: data.tool,
      softwareVersion: nonempty(data.version) ? data.version.trim() : undefined,
      keywords: strings(data.keywords),
      aliases: strings(tool?.aliases),
      searchClues: strings(data.searchClues),
      bodyTerms: publishedBodyTerms(text),
    };
  }).sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '') || a.id.localeCompare(b.id));
  return feed;
}
