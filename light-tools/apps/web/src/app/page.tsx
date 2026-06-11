import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/site/ToolCard";
import { toolCategories, tools } from "@/lib/tool-registry";

export const metadata: Metadata = {
  title: "轻量文件工具箱",
  description: "不用安装大型软件，打开网页就能处理 PDF、图片和视频。"
};

const featuredTools = tools.slice(0, 5);

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-full border border-teal-200 bg-white px-3 py-1 text-sm font-medium text-teal-800">
            本地处理优先，服务器处理补充
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              轻量文件工具箱
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              不用安装大型软件，打开网页就能处理 PDF、图片和视频。首批工具先搭好入口，后续逐步接入浏览器本地处理能力。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
              href="/tools"
            >
              查看全部工具
            </Link>
            <a
              className="inline-flex min-h-11 items-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-teal-600 hover:text-teal-800"
              href="#featured-tools"
            >
              热门工具
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {toolCategories.slice(0, 3).map((category) => (
              <Link
                className="rounded-md border border-slate-200 p-4 transition hover:border-teal-500 hover:bg-teal-50"
                href={`/tools?category=${category.id}`}
                key={category.id}
              >
                <div className="text-base font-semibold text-slate-950">{category.name}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            敏感文件优先规划为浏览器本地处理；视频和复杂任务后续通过服务器队列完成，并展示清理规则。
          </div>
        </div>
      </section>

      <section className="space-y-5" id="featured-tools">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">首批工具</h2>
            <p className="mt-2 text-sm text-slate-600">阶段 1 先提供稳定入口，真实处理能力在下一阶段接入。</p>
          </div>
          <Link className="text-sm font-semibold text-teal-800 hover:text-teal-950" href="/tools">
            全部工具
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
