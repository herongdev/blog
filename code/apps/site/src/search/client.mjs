/** Lazy worker transport. Importing this module never downloads a search index. */
import { hasSearchFilters } from './filters.mjs';
export function createSearchClient({ baseUrl = '/search-index/', tutorialsUrl = 'https://dev.herong.info/search/published.json' } = {}) {
  let worker;
  let nextId = 0;
  let closed = false;
  const pending = new Map();
  function start() {
    if (closed) throw new Error('搜索已关闭');
    if (worker) return worker;
    worker = new Worker(new URL('./worker.mjs', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data }) => {
      const request = pending.get(data.id);
      if (!request) return;
      pending.delete(data.id);
      if (data.error) request.reject(new Error(data.error));
      else request.resolve(data.result);
    };
    worker.onerror = () => {
      for (const request of pending.values()) request.reject(new Error('搜索暂时无法加载，请重试。'));
      pending.clear();
      worker?.terminate();
      worker = undefined;
    };
    return worker;
  }
  return {
    search(query, { source = 'all', topic = 'all', period = 'all', limit = 12, offset = 0 } = {}) {
      const trimmed = String(query ?? '').trim();
      if (!trimmed && !hasSearchFilters({ source, topic, period })) return Promise.resolve({ query: '', total: 0, results: [], sources: { article: 0, tutorial: 0, tool: 0 }, warnings: [] });
      return new Promise((resolve, reject) => {
        try {
          const current = start();
          const id = ++nextId;
          pending.set(id, { resolve, reject });
          current.postMessage({ id, query: trimmed, options: { source, topic, period, limit, offset }, config: { baseUrl: new URL(baseUrl, window.location.href).href, tutorialsUrl: new URL(tutorialsUrl, window.location.href).href } });
        } catch (error) { reject(error); }
      });
    },
    close() {
      closed = true;
      worker?.terminate();
      worker = undefined;
      for (const request of pending.values()) request.reject(new Error('搜索已关闭'));
      pending.clear();
    },
  };
}
