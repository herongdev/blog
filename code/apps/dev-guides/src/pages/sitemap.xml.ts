import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { tools } from '../data/tools';
import { themes } from '../data/themes';
import { groupByPublicationWeek } from '../lib/catalog';
import { BLOCK_INDEXING } from '../config/site.mjs';
import { withBase } from '../lib/urls';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character] ?? character);

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site URL is required for sitemap generation');
  const published = BLOCK_INDEXING ? [] : (await getCollection('tutorials')).filter((entry) => entry.data.status === 'published');
  const publishedToolSlugs = new Set(published.map((entry) => entry.data.tool));
  const publishedThemeSlugs = new Set(published.flatMap((entry) => entry.data.themes));
  const weeks = groupByPublicationWeek(published);
  const urls = published.length === 0 ? [] : [
    { path: '/', updatedAt: undefined },
    { path: '/tools/', updatedAt: undefined },
    ...(publishedThemeSlugs.size ? [{ path: '/themes/', updatedAt: undefined }] : []),
    ...(weeks.length ? [{ path: '/weeks/', updatedAt: undefined }] : []),
    ...weeks.map((week) => ({ path: `/weeks/${week.start}/`, updatedAt: undefined })),
    ...themes.filter((theme) => publishedThemeSlugs.has(theme.slug)).map((theme) => ({ path: `/themes/${theme.slug}/`, updatedAt: undefined })),
    ...tools.filter((tool) => publishedToolSlugs.has(tool.slug)).map((tool) => ({ path: `/tools/${tool.slug}/`, updatedAt: undefined })),
    ...published.map((entry) => ({ path: `/topics/${entry.id}/`, updatedAt: entry.data.updatedAt.toISOString().slice(0, 10) })),
  ];
  const items = urls.map(({ path, updatedAt }) => `<url><loc>${escapeXml(new URL(withBase(path), site).href)}</loc>${updatedAt ? `<lastmod>${updatedAt}</lastmod>` : ''}</url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
