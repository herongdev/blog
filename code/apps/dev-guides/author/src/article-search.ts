type SearchArticle = { title: string; slug: string };
type LibrarySearchArticle = SearchArticle & { kind: string };

const normalize = (text: string) => text.normalize('NFKC').toLocaleLowerCase();

/** A few remembered words can appear anywhere in the title, address or context. */
export function matchesArticleQuery(article: SearchArticle, query: string, extraText = ''): boolean {
  const words = normalize(query).trim().split(/\s+/u).filter(Boolean);
  const text = normalize(`${article.title} ${article.slug} ${extraText}`);
  return words.every((word) => text.includes(word));
}

/** Search ignores the current directory/archive view; active copies win during a refresh. */
export function searchLibraryArticles<T extends LibrarySearchArticle>(
  items: readonly T[], archivedItems: readonly T[], query: string,
  extraText: (article: T) => string = () => '',
): T[] {
  const unique = new Map<string, T>();
  for (const article of [...items, ...archivedItems]) {
    const key = `${article.kind}/${article.slug}`;
    if (!unique.has(key)) unique.set(key, article);
  }
  return [...unique.values()].filter((article) => matchesArticleQuery(article, query, extraText(article)));
}
