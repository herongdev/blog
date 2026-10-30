import type { CollectionEntry } from 'astro:content';
import { withBase } from './urls';

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
