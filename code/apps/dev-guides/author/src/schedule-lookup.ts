import { matchesArticleQuery } from './article-search.ts';

type Entry = { slug: string; title: string; kind: 'draft' | 'content'; status: string; done?: boolean; missing?: boolean; archived?: boolean };
type Week = { start: string; end: string; entries: Entry[] };
type Schedule = { thisWeek: Week; queue: Entry[]; history: Week[] };
export type ScheduleResult = { entry: Entry; title: string; location: string; week?: string; done?: boolean; archived: boolean };

export function scheduleLookup(schedule: Schedule, articles: Entry[], archived: Entry[], query: string, historyOnly = false): ScheduleResult[] {
  const live = new Map([...archived, ...articles].map((entry) => [entry.slug, entry]));
  const archivedSlugs = new Set(archived.map((entry) => entry.slug));
  const results: ScheduleResult[] = [];
  const add = (snapshot: Entry, location: string, week?: string) => {
    const current = live.get(snapshot.slug);
    // Promotion only goes draft -> content. A fresh schedule response and an
    // older library response must never send a published article back to draft.
    const entry: Entry = current ? { ...current,
      kind: current.kind === 'content' || snapshot.kind === 'content' ? 'content' : 'draft',
      missing: Boolean(snapshot.missing) && !archivedSlugs.has(snapshot.slug),
    } : snapshot;
    if (!matchesArticleQuery(entry, query, `${snapshot.title} ${location}`)) return;
    results.push({ entry, title: historyOnly ? snapshot.title : entry.title, location, week, done: snapshot.done, archived: archivedSlugs.has(entry.slug) });
  };
  if (!historyOnly) {
    schedule.thisWeek.entries.forEach((entry) => add(entry, '本周'));
    schedule.queue.forEach((entry) => add(entry, '候选选题'));
  }
  [...schedule.history].sort((a, b) => b.start.localeCompare(a.start)).forEach((week) => {
    week.entries.forEach((entry) => add(entry, `${week.start} 至 ${week.end}`, week.start));
  });
  if (historyOnly) return results;
  articles.forEach((entry) => add(entry, '内容库'));
  archived.forEach((entry) => add(entry, '已归档'));
  // One article can appear in multiple weeks and in the current queue. Search
  // returns one navigation target; history keeps each actual weekly record.
  const seen = new Set<string>();
  return results.filter(({ entry }) => { if (seen.has(entry.slug)) return false; seen.add(entry.slug); return true; });
}
