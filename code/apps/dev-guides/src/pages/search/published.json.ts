import type { APIRoute } from 'astro';
import { getPublicTutorials } from '../../lib/public-content';
import { buildPublishedFeed } from '../../lib/published-search.mjs';
import { BASE_PATH, DEPLOY_ENV } from '../../config/site.mjs';
import { tools } from '../../data/tools';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const feed = buildPublishedFeed(await getPublicTutorials(), {
    origin: site?.href,
    environment: DEPLOY_ENV,
    base: BASE_PATH,
    toolCatalog: tools,
  });
  return new Response(JSON.stringify(feed), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': 'https://herong.info',
      'Cache-Control': 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
