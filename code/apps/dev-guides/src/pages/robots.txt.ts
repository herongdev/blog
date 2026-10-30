import type { APIRoute } from 'astro';
import { BLOCK_INDEXING } from '../config/site.mjs';
import { withBase } from '../lib/urls';

export const GET: APIRoute = ({ site }) => {
  if (BLOCK_INDEXING) {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const sitemap = new URL(withBase('/sitemap.xml'), site);
  return new Response(`User-agent: *\nAllow: ${withBase('/')}\n\nSitemap: ${sitemap.href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
