import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toolBySlug } from '../data/tools';
import { themes } from '../data/themes';
import { tutorialUrl, publicationWeek } from '../lib/catalog';
import { shanghaiDate } from '../lib/calendar';

export const GET: APIRoute = async () => {
  const entries = await getCollection('tutorials');
  const items = entries.map((entry) => {
      const tool = toolBySlug[entry.data.tool];
      return {
        title: entry.data.title,
        summary: entry.data.summary,
        toolName: tool.name,
        toolSlug: tool.slug,
        url: tutorialUrl(entry),
        status: entry.data.status,
        aliases: [...tool.aliases],
        keywords: entry.data.keywords,
        searchClues: entry.data.searchClues,
        themeNames: themes.filter((theme) => entry.data.themes.includes(theme.slug)).map((theme) => theme.name),
        themeSlugs: entry.data.themes,
        week: publicationWeek(entry) ?? undefined,
        publishedAt: entry.data.status === 'published' && entry.data.publishedAt ? shanghaiDate(entry.data.publishedAt) : undefined,
        bodyText: (entry.body ?? '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
        videoUrl: entry.data.videoUrl,
      };
    });
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
