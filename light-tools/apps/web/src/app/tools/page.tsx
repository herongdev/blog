import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { CategoryIcon } from "@/components/site/ToolIcon";
import { toolCategories, tools } from "@/lib/tool-registry";

export const metadata: Metadata = {
  title: "工具列表",
  description: "浏览 PDF、图片、视频等文件处理工具。"
};

export default async function ToolsPage({
  searchParams
}: {
  searchParams?: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category;
  const query = params?.q?.trim().toLowerCase() ?? "";
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = category ? tool.category === category : true;
    const searchableText = [
      tool.name,
      tool.shortDescription,
      tool.longDescription,
      tool.seo.keywords.join(" ")
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = query ? searchableText.includes(query) : true;

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">工具</h1>
            <p className="mt-2 text-sm text-slate-600">{filteredTools.length} 个可用入口</p>
          </div>
        </div>
        <form action="/tools" className="flex max-w-2xl flex-col gap-3 sm:flex-row">
          {category ? <input name="category" type="hidden" value={category} /> : null}
          <label className="sr-only" htmlFor="tools-search">
            搜索工具
          </label>
          <input
            className="min-h-11 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            defaultValue={query}
            id="tools-search"
            name="q"
            placeholder="搜索工具名称或场景"
            type="search"
          />
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            搜索工具
          </button>
        </form>
      </header>

      <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="工具分类">
        <Link
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium ${
            !category
              ? "border-teal-700 bg-teal-700 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-teal-500"
          }`}
          href="/tools"
        >
          全部
        </Link>
        {toolCategories.map((item) => (
          <Link
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium ${
              category === item.id
                ? "border-teal-700 bg-teal-700 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-teal-500"
            }`}
            href={`/tools?category=${item.id}`}
            key={item.id}
          >
            <CategoryIcon category={item.id} className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 sm:col-span-2 lg:col-span-3">
            没找到匹配工具，可以换个关键词试试。
          </div>
        )}
      </div>
    </div>
  );
}
