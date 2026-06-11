import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ProcessModeBadge } from "@/components/tools/ProcessModeBadge";
import { getRelatedTools } from "@/lib/tool-registry";

export function ToolShell({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getRelatedTools(tool);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Link className="text-sm font-semibold text-teal-800 hover:text-teal-950" href="/tools">
          返回工具
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">{tool.name}</h1>
            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">
              {tool.shortDescription}
            </p>
          </div>
          <ProcessModeBadge mode={tool.processMode} />
        </div>
      </header>

      <section className="rounded-md border border-slate-200 bg-white p-5">
        <FileDropzone tool={tool} />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">功能开发中，入口和页面结构已就绪。</p>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600"
            disabled
            type="button"
          >
            即将支持
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-950">限制</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            免费最多 {tool.maxFilesFree} 个文件，单文件 {tool.maxFileSizeMbFree} MB。
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-950">处理方式</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            本地工具优先在浏览器内处理；服务器工具会说明上传与清理规则。
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-950">相关工具</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {relatedTools.length > 0 ? (
              relatedTools.map((relatedTool) => (
                <Link
                  className="rounded-md border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:border-teal-500 hover:text-teal-900"
                  href={`/tools/${relatedTool.slug}`}
                  key={relatedTool.id}
                >
                  {relatedTool.name}
                </Link>
              ))
            ) : (
              <span className="text-slate-500">更多工具整理中。</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
