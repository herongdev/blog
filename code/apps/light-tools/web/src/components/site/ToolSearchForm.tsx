"use client";

import { FormEvent, useMemo, useState } from "react";
import { Search } from "lucide-react";

interface SearchTarget {
  id: string;
  label: string;
  type: "category" | "tool";
  terms: string[];
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s_\-，,、/]+/g, "");
}

function getMatch(query: string, targets: SearchTarget[]) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;

  const categories = targets.filter((target) => target.type === "category");
  const tools = targets.filter((target) => target.type === "tool");
  const getBestMatch = (items: SearchTarget[]) => {
    let bestMatch: SearchTarget | null = null;
    let bestScore = 0;

    for (const target of items) {
      for (const [index, term] of target.terms.entries()) {
        const normalizedTerm = normalize(term);
        let score = 0;

        if (normalizedTerm === normalizedQuery) {
          score = 300 - index;
        } else if (normalizedTerm.startsWith(normalizedQuery)) {
          score = 200 - index;
        } else if (normalizedTerm.includes(normalizedQuery)) {
          score = 100 - index;
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = target;
        }
      }
    }

    return bestMatch;
  };

  return (
    categories.find((target) =>
      target.terms.some((term) => normalize(term) === normalizedQuery)
    ) ??
    getBestMatch(tools) ??
    getBestMatch(categories)
  );
}

export function ToolSearchForm({ targets }: { targets: SearchTarget[] }) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const targetCount = useMemo(
    () => targets.filter((target) => target.type === "tool").length,
    [targets]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const match = getMatch(query, targets);
    if (!match) {
      setMessage(query.trim() ? "没有找到匹配工具，可以换个关键词。" : `共 ${targetCount} 个工具。`);
      return;
    }

    const element = document.getElementById(match.id);
    if (!element) return;

    window.history.replaceState(null, "", `${window.location.pathname}#${match.id}`);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    setMessage(`已定位到${match.type === "category" ? "分组" : "工具"}：${match.label}`);
  }

  return (
    <form className="flex max-w-2xl flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="tools-search">
          搜索工具
        </label>
        <input
          className="input-control flex-1 px-4 text-sm"
          id="tools-search"
          onChange={(event) => {
            setQuery(event.target.value);
            if (message) setMessage("");
          }}
          placeholder="搜索工具名称或场景"
          type="search"
          value={query}
        />
        <button className="button-primary" type="submit">
          <Search aria-hidden="true" className="h-4 w-4" />
          搜索工具
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm text-muted">
        {message}
      </p>
    </form>
  );
}
