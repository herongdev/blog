import type { CollectionEntry } from 'astro:content';
import { withBase } from './urls';
import { weekStart, weekEnd, formatWeekRange } from './calendar';
export { formatWeekRange } from './calendar';

export type Tutorial = CollectionEntry<'tutorials'>;

export function tutorialUrl(entry: Tutorial): string {
  return withBase(`/topics/${entry.id}/`);
}

export function sortNewest(entries: Tutorial[]): Tutorial[] {
  return [...entries].sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime());
}

export function publishedForTool(entries: Tutorial[], tool: string): Tutorial[] {
  return sortNewest(entries.filter((entry) => entry.data.status === 'published' && entry.data.tool === tool));
}

export function publicationWeek(entry: Tutorial): string | null {
  return entry.data.status === 'published' && entry.data.publishedAt ? weekStart(entry.data.publishedAt) : null;
}

export function groupByPublicationWeek(entries: Tutorial[]) {
  const groups = new Map<string, Tutorial[]>();
  for (const entry of entries) {
    const start = publicationWeek(entry);
    if (start) groups.set(start, [...(groups.get(start) ?? []), entry]);
  }
  return [...groups].sort(([a], [b]) => b.localeCompare(a)).map(([start, items]) => ({
    start, end: weekEnd(start), label: formatWeekRange(start),
    entries: items.sort((a, b) => b.data.publishedAt!.getTime() - a.data.publishedAt!.getTime() || a.id.localeCompare(b.id)),
  }));
}
