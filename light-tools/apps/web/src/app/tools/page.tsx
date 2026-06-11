import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { CategoryIcon } from "@/components/site/ToolIcon";
import { StructuredData } from "@/components/site/StructuredData";
import { withBasePath } from "@/lib/base-path";
import { buildToolsJsonLd, getCanonicalUrl } from "@/lib/seo";
import { toolCategories, tools } from "@/lib/tool-registry";

export const metadata: Metadata = {
  title: "工具列表",
  description: "浏览 PDF、图片、视频等文件处理工具。",
  alternates: {
    canonical: getCanonicalUrl("/tools")
  },
  openGraph: {
    title: "工具列表",
    description: "浏览 PDF、图片、视频等文件处理工具。",
    url: getCanonicalUrl("/tools")
  }
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
    <div className="app-container">
      <StructuredData data={buildToolsJsonLd(filteredTools)} />
      <header className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="page-title">工具</h1>
            <p className="mt-2 text-sm text-muted">{filteredTools.length} 个可用入口</p>
          </div>
        </div>
        <form action={withBasePath("/tools")} className="flex max-w-2xl flex-col gap-3 sm:flex-row">
          {category ? <input name="category" type="hidden" value={category} /> : null}
          <label className="sr-only" htmlFor="tools-search">
            搜索工具
          </label>
          <input
            className="input-control flex-1 px-4 text-sm"
            defaultValue={query}
            id="tools-search"
            name="q"
            placeholder="搜索工具名称或场景"
            type="search"
          />
          <button
            className="button-primary"
            type="submit"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            搜索工具
          </button>
        </form>
      </header>

      <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="工具分类">
        <Link
          className={`chip ${!category ? "chip-active" : "chip-idle"}`}
          href="/tools"
        >
          全部
        </Link>
        {toolCategories.map((item) => (
          <Link
            className={`chip ${category === item.id ? "chip-active" : "chip-idle"}`}
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
          <div className="muted-panel p-6 text-sm text-muted sm:col-span-2 lg:col-span-3">
            没找到匹配工具，可以换个关键词试试。
          </div>
        )}
      </div>
    </div>
  );
}
