// SITE_URL accepts an origin or an origin with BASE already appended (old CI).
// Resolve them once so canonical, RSS and sitemap never repeat /blog/blog/.
export function normalizeBase(value = '/') {
  const base = `/${String(value).replace(/^\/+|\/+$/g, '')}/`
  return base === '//' ? '/' : base
}

export function siteRoot(siteUrl = 'https://herong.info', base = '/') {
  const url = new URL(siteUrl)
  if (!['https:', 'http:'].includes(url.protocol) || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTP(S) origin or site root')
  }
  const suffix = normalizeBase(base)
  const existing = normalizeBase(url.pathname)
  if (existing !== '/' && suffix !== '/' && existing !== suffix) {
    throw new Error(`SITE_URL path ${existing} conflicts with BASE ${suffix}`)
  }
  url.pathname = existing !== '/' ? existing : suffix
  return url.href
}

export function articlePath(relativePath) {
  const pathname = `/${relativePath.replace(/^\/+/, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
  return pathname.split('/').map((part) => encodeURIComponent(part)).join('/')
}

export function pageUrl(relativePath, siteUrl, base) {
  return new URL(articlePath(relativePath).replace(/^\//, ''), siteRoot(siteUrl, base)).href
}

export function pathUrl(pathname, siteUrl, base) {
  return new URL(pathname.replace(/^\//, ''), siteRoot(siteUrl, base)).href
}
