import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { CategoryIcon } from "@/components/site/ToolIcon";
import { StructuredData } from "@/components/site/StructuredData";
import { buildHomeJsonLd, getCanonicalUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";
import { toolCategories, tools } from "@/lib/tool-registry";

export const metadata: Metadata = {
  title: "轻量文件工具箱",
  description: "不用安装大型软件，打开网页就能处理 PDF、图片和视频。",
  alternates: {
    canonical: getCanonicalUrl()
  },
  openGraph: {
    title: "轻量文件工具箱",
    description: "不用安装大型软件，打开网页就能处理 PDF、图片和视频。",
    url: getCanonicalUrl()
  }
};

const featuredTools = tools.slice(0, 5);
const primaryCategories = toolCategories.filter((category) =>
  ["pdf", "image", "video"].includes(category.id)
);

export default function HomePage() {
  return (
    <div className="app-container gap-7">
      <StructuredData data={buildHomeJsonLd()} />
      <section className="space-y-4 py-2">
        <h1 className="sr-only">轻量文件工具箱</h1>
        <form action={withBasePath("/tools")} className="flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="tool-search">
            搜索工具
          </label>
          <input
            className="input-control flex-1 px-4 text-sm"
            id="tool-search"
            name="q"
            placeholder="搜索：PDF 合并、图片转 PDF、MP4 转 GIF"
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

        <nav className="flex flex-wrap gap-2" aria-label="常用分类">
          <Link
            className="chip chip-active"
            href="/tools"
          >
            全部工具
          </Link>
          {primaryCategories.map((category) => (
            <Link
              className="chip chip-idle"
              data-category={category.id}
              href={`/tools?category=${category.id}`}
              key={category.id}
            >
              <CategoryIcon category={category.id} className="h-4 w-4" />
              {category.name}
            </Link>
          ))}
        </nav>
      </section>

      <section className="space-y-4" id="featured-tools">
        <div className="flex items-center justify-between gap-3">
          <h2 className="section-title">常用工具</h2>
          <Link className="link-accent text-sm" href="/tools">
            查看全部
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
