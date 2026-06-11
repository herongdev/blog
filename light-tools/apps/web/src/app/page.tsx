import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { CategoryIcon } from "@/components/site/ToolIcon";
import { toolCategories, tools } from "@/lib/tool-registry";

export const metadata: Metadata = {
  title: "轻量文件工具箱",
  description: "不用安装大型软件，打开网页就能处理 PDF、图片和视频。"
};

const featuredTools = tools.slice(0, 5);
const primaryCategories = toolCategories.filter((category) =>
  ["pdf", "image", "video"].includes(category.id)
);

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <section className="space-y-5 py-4">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            文件工具
          </h1>
          <p className="text-base leading-7 text-slate-600">
            选择一个工具开始处理 PDF、图片或视频。
          </p>
        </div>

        <form action="/tools" className="flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="tool-search">
            搜索工具
          </label>
          <input
            className="min-h-11 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            id="tool-search"
            name="q"
            placeholder="搜索：PDF 合并、图片转 PDF、MP4 转 GIF"
            type="search"
          />
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            搜索
          </button>
        </form>

        <nav className="flex flex-wrap gap-2" aria-label="常用分类">
          <Link
            className="inline-flex items-center gap-2 rounded-md border border-teal-700 bg-teal-700 px-3 py-2 text-sm font-semibold text-white"
            href="/tools"
          >
            全部工具
          </Link>
          {primaryCategories.map((category) => (
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-600 hover:text-teal-800"
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
          <h2 className="text-xl font-semibold text-slate-950">常用工具</h2>
          <Link className="text-sm font-semibold text-teal-800 hover:text-teal-950" href="/tools">
            查看全部
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <p className="text-sm leading-6 text-slate-500">
        入口页只展示工具。文件限制、隐私和处理方式会在具体工具页说明。
      </p>
    </div>
  );
}
