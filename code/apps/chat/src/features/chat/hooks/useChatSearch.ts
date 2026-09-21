import { useEffect, useState } from "react";
import {
  searchResultLimit,
  type ChatSearchResults,
  type SearchChats,
} from "../lib/searchConversations";

export function useChatSearch(onSearch: SearchChats) {
  const [{ query, offset }, setRequest] = useState({ query: "", offset: 0 });
  const [response, setResponse] = useState<{
    query: string;
    offset: number;
    results: ChatSearchResults;
    error: boolean;
  }>();
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(
      () => {
        void onSearch(query, offset, controller.signal)
          .then((results) => {
            if (!controller.signal.aborted)
              setResponse({ query, offset, results, error: false });
          })
          .catch(() => {
            if (!controller.signal.aborted)
              setResponse({
                query,
                offset,
                results: { items: [], total: 0 },
                error: true,
              });
          });
      },
      query ? 120 : 0,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, offset, onSearch]);
  return {
    query,
    offset,
    setQuery: (value: string) => setRequest({ query: value, offset: 0 }),
    results: response?.results ?? { items: [], total: 0 },
    pending:
      !response || response.query !== query || response.offset !== offset,
    error: !!response?.error,
    matchedQuery: response?.query ?? "",
    next: () => setRequest({ query, offset: offset + searchResultLimit }),
    previous: () =>
      setRequest({ query, offset: Math.max(0, offset - searchResultLimit) }),
  };
}
