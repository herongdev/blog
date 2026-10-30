import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toolBySlug } from '../data/tools';
import { themes } from '../data/themes';
import { tutorialUrl } from '../lib/catalog';

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
        videoUrl: entry.data.videoUrl,
      };
    });
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
