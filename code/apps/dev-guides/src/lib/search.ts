export type SearchItem = {
  title: string;
  summary: string;
  toolName: string;
  toolSlug: string;
  url: string;
  status: 'lead' | 'published';
  aliases: string[];
  keywords: string[];
  searchClues: string[];
  themeNames: string[];
  themeSlugs?: string[];
  week?: string;
  publishedAt?: string;
  bodyText?: string;
  videoUrl?: string;
};

const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase('zh-CN').trim();
const compact = (value: string) => normalize(value).replace(/[^\p{L}\p{N}@]+/gu, '');

function queryTerms(query: string): string[] {
  const normalized = normalize(query);
  const chunks = normalized.match(/[\p{Script=Han}]+|[a-z0-9@._/-]+/gu) ?? [];
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh-CN', { granularity: 'word' }) : null;
  const terms = chunks.flatMap((chunk) => {
    if (!/[\p{Script=Han}]/u.test(chunk) || !segmenter) return [chunk];
    return [...segmenter.segment(chunk)].filter((segment) => segment.isWordLike).map((segment) => segment.segment);
  });
  return [...new Set(terms.filter((term) => term.length > 1 || term === '@'))];
}

function relevance(item: SearchItem, query: string): number {
  if (!query.trim()) return item.status === 'published' ? 20 : 10;
  const fields: Array<[string, number]> = [
    [item.title, 110],
    [item.toolName, 100],
    ...item.searchClues.map((value): [string, number] => [value, 105]),
    ...item.aliases.map((value): [string, number] => [value, 92]),
    ...item.keywords.map((value): [string, number] => [value, 80]),
    ...item.themeNames.map((value): [string, number] => [value, 65]),
    [item.publishedAt ?? '', 45],
    [item.summary, 28],
    [item.bodyText ?? '', 12],
  ];
  const full = compact(query);
  let score = 0;
  if (full) {
    for (const [field, weight] of fields) {
      const value = compact(field);
      if (value && value.includes(full)) score = Math.max(score, weight + (value === full ? 35 : 20));
    }
  }

  const terms = queryTerms(query);
  if (terms.length > 1) {
    const termScores = terms.map((term) => {
      let best = 0;
      for (const [field, weight] of fields) {
        if (compact(field).includes(compact(term))) best = Math.max(best, weight);
      }
      return best;
    });
    if (termScores.every(Boolean)) score = Math.max(score, termScores.reduce((sum, value) => sum + value, 0) / terms.length + 12);
  }
  if (score === 0) return 0;
  return score + (item.status === 'published' ? 14 : 0);
}

export function rankResults(items: SearchItem[], query: string, toolSlug = '', filters: { theme?: string; week?: string } = {}): SearchItem[] {
  return items
    .filter((item) => !toolSlug || item.toolSlug === toolSlug)
    .filter((item) => !filters.theme || item.themeSlugs?.includes(filters.theme))
    .filter((item) => !filters.week || item.week === filters.week)
    .map((item) => ({ item, score: relevance(item, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'zh-CN'))
    .map(({ item }) => item);
}
