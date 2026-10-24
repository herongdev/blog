import { capabilities, projects } from './portfolio';
import { canonicalUrl, NOINDEX } from './site.mjs';
export const siteRoutes = ['/', '/projects/', ...capabilities.map((field) => `/projects/${field.id}/`), ...projects.map((project) => project.detail), '/products/', '/about/'];
const escapeXml = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${NOINDEX ? '' : siteRoutes.map((route) => `\n  <url><loc>${escapeXml(canonicalUrl(route))}</loc></url>`).join('')}\n</urlset>\n`;
