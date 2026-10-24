import type { APIRoute } from 'astro';
import { canonicalUrl, NOINDEX, BASE_PATH } from '../config/site.mjs';
export const GET: APIRoute = () => new Response(NOINDEX ? `User-agent: *\nDisallow: ${BASE_PATH}\n` : `User-agent: *\nAllow: /\nSitemap: ${canonicalUrl('/sitemap.xml')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
