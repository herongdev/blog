import { root } from 'astro:config/server';
import { newestFirst } from './filters.mjs';
import { publicTutorials } from './runtime.mjs';

async function loadPublishedTutorials(logger) {
  try {
    const response = await fetch('https://dev.herong.info/search/published.json', {
      redirect: 'error',
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return publicTutorials(await response.json());
  } catch (error) {
    logger.warn(`近期更新暂时无法读取公开教程，将展示已知的公开文章：${error.message}`);
    return [];
  }
}

export async function loadRecentUpdates({ includeTutorials, logger }) {
  // The index script resolves the sibling blog and its dependencies from its source location.
  const { loadPublicArticles } = await import(/* @vite-ignore */ new URL('scripts/build-search-index.mjs', root).href);
  const [{ documents: articles }, tutorials] = await Promise.all([
    loadPublicArticles({ metadataOnly: true }),
    includeTutorials ? loadPublishedTutorials(logger) : [],
  ]);
  const now = Date.now();
  return [...articles, ...tutorials]
    .filter(({ title, publishedAt }) => title && publishedAt && Date.parse(`${publishedAt}T00:00:00+08:00`) <= now)
    .sort(newestFirst)
    .slice(0, 5);
}
