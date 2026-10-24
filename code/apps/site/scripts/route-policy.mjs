export const fields = ['ai-agent', 'enterprise', 'finance', 'fullstack', 'video-live']
export const projects = {
  'ai-chat': 'ai-agent',
  minicodex: 'ai-agent',
  'enterprise-platform': 'enterprise',
  aurumchart: 'finance',
  'trading-system': 'finance',
  shopthrive: 'fullstack',
}

// Route ownership is explicit. A newly added Astro HTML route must be reviewed here.
export const siteRoutes = new Set([
  '/', '/404', '/about/', '/products/', '/projects/',
  ...fields.map((field) => `/projects/${field}/`),
  ...Object.entries(projects).map(([id, field]) => `/projects/${field}/${id}/`),
])

export const legacyRedirects = Object.fromEntries([
  ...Object.entries(projects).map(([id, field]) => [`/projects/${id}`, `/projects/${field}/${id}/`]),
  ...fields.map((field) => [`/projects/fields/${field}/`, `/projects/${field}/`]),
])

// These same-origin URLs are served by independent applications at the edge.
// They must be verified over HTTP during deployment, not looked up in this image.
export const independentAppRoutes = ['/file-tools', '/projects/enterprise/sampling-station']

export function fileRoute(filename) {
  if (filename === 'index.html') return '/'
  if (filename.endsWith('/index.html')) return `/${filename.slice(0, -10)}`
  if (filename.endsWith('.html')) return `/${filename.slice(0, -5)}`
  return null
}

export function legacyHtmlOwner(filename) {
  const route = fileRoute(filename)
  if (siteRoutes.has(route)) return 'site'
  if (legacyRedirects[route]) return 'redirect'
  if (route?.startsWith('/projects/')) throw new Error(`Unassigned legacy project route: ${route}`)
  return 'legacy'
}
