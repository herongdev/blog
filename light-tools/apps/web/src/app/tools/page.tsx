import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/site/ToolCard";
import { CategoryIcon } from "@/components/site/ToolIcon";
import { ToolSearchForm } from "@/components/site/ToolSearchForm";
import { StructuredData } from "@/components/site/StructuredData";
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

export default function ToolsPage() {
  const groupedTools = toolCategories
    .map((category) => ({
      ...category,
      tools: tools.filter((tool) => tool.category === category.id)
    }))
    .filter((category) => category.tools.length > 0);
  const searchTargets = [
    ...groupedTools.map((category) => ({
      id: `group-${category.id}`,
      label: category.name,
      type: "category" as const,
      terms: [category.id, category.name, category.description]
    })),
    ...tools.map((tool) => ({
      id: `tool-${tool.slug}`,
      label: tool.name,
      type: "tool" as const,
      terms: [
        tool.name,
        ...tool.seo.keywords,
        tool.shortDescription,
        tool.longDescription,
        tool.id,
        tool.slug
      ]
    }))
  ];

  return (
    <div className="app-container">
      <StructuredData data={buildToolsJsonLd(tools)} />
      <header className="space-y-4">
        <div>
          <h1 className="page-title">工具</h1>
          <p className="mt-2 text-sm text-muted">{tools.length} 个可用入口</p>
        </div>
        <ToolSearchForm targets={searchTargets} />
      </header>

      <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="工具分组">
        {groupedTools.map((item) => (
          <Link
            className="chip chip-idle"
            data-category={item.id}
            href={`#group-${item.id}`}
            key={item.id}
          >
            <CategoryIcon category={item.id} className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="space-y-6">
        {groupedTools.map((group) => (
          <section
            className="tool-group scroll-mt-24 space-y-3"
            id={`group-${group.id}`}
            key={group.id}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="tool-group-icon" data-category={group.id}>
                  <CategoryIcon category={group.id} className="h-4 w-4" />
                </span>
                <h2 className="section-title text-lg">{group.name}</h2>
              </div>
              <span className="text-sm text-muted">{group.tools.length} 个</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {group.tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
