const truthy = (value) => value === true || typeof value === 'string' && /^(true|yes|1)$/i.test(value);
const falsey = (value) => value === false || typeof value === 'string' && /^(false|no|0)$/i.test(value);

function noindexInHead(value) {
  if (!value || typeof value !== 'object') return false;
  if (String(value.name ?? '').toLowerCase() === 'robots' && /(?:noindex|none)/i.test(String(value.content ?? ''))) return true;
  return Object.values(value).some((child) => typeof child === 'object' && noindexInHead(child));
}

/** Shared source-side metadata gate for both public blog search indexes.
 * Paths have different owners: the main article builder applies its own allowlist;
 * the existing VitePress search can also index public directory and about pages.
 */
export function isPublicSearchMetadata(data = {}) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  if (truthy(data.draft) || truthy(data.private) || truthy(data.unlisted) || truthy(data.noindex)
    || falsey(data.public) || falsey(data.published) || falsey(data.publish)
    || falsey(data.search) || falsey(data.searchable)) return false;
  if (data.visibility != null && String(data.visibility).toLowerCase() !== 'public') return false;
  if (data.status != null && !['published', 'public'].includes(String(data.status).toLowerCase())) return false;
  if (typeof data.password === 'string' && data.password.trim()) return false;
  return !/(?:noindex|none)/i.test(String(data.robots ?? '')) && !noindexInHead(data.head);
}

/** VitePress 1.6's _render receives the processed Markdown, render env and renderer.
 * Render first to populate env.frontmatter, then omit disallowed text completely
 * before MiniSearch sees a section or serializes any public browser asset.
 */
export function renderPublicSearchDocument(source, env, markdown) {
  const html = markdown.render(source, env);
  return isPublicSearchMetadata(env.frontmatter ?? {}) ? html : '';
}
