export type SearchSource = 'all' | 'tutorial' | 'article' | 'tool';
export type SearchTopic = 'all' | 'ai' | 'frontend' | 'backend' | 'ops' | 'files';
export type SearchPeriod = 'all' | 'week' | 'month' | '6months' | 'year';
export type SearchResult = {
  id: string;
  title: string;
  summary: string;
  type: 'tutorial' | 'article' | 'tool';
  url: string;
  updatedAt?: string;
  publishedAt?: string;
  software?: string;
  version?: string;
};
export type SearchResponse = {
  query: string;
  total: number;
  results: SearchResult[];
  sources: { article: number; tutorial: number; tool: number };
  warnings: string[];
};
export function createSearchClient(config?: { baseUrl?: string; tutorialsUrl?: string }): {
  search(query: string, options?: { source?: SearchSource; topic?: SearchTopic; period?: SearchPeriod; limit?: number; offset?: number }): Promise<SearchResponse>;
  close(): void;
};
