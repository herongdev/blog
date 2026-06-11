import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/site/ToolCard";
import { toolCategories, tools } from "@/lib/tool-registry";

export const metadata: Metadata = {
  title: "工具列表",
  description: "浏览 PDF、图片、视频等文件处理工具。"
};

export default async function ToolsPage({
  searchParams
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category;
  const filteredTools = category ? tools.filter((tool) => tool.category === category) : tools;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-950">工具列表</h1>
        <p className="max-w-2xl text-base leading-7 text-slate-700">
          按文件类型快速找到工具。当前为第一轮骨架，页面入口和工具注册表已经打通。
        </p>
      </header>

      <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="工具分类">
        <Link
          className={`whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium ${
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
            className={`whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium ${
              category === item.id
                ? "border-teal-700 bg-teal-700 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-teal-500"
            }`}
            href={`/tools?category=${item.id}`}
            key={item.id}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
