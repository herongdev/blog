import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ProcessModeBadge } from "@/components/tools/ProcessModeBadge";
import { getRelatedTools } from "@/lib/tool-registry";

export function ToolShell({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getRelatedTools(tool);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <Link className="text-sm font-semibold text-teal-800 hover:text-teal-950" href="/tools">
          返回工具列表
        </Link>
        <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-slate-950">{tool.name}</h1>
              <p className="max-w-3xl text-base leading-7 text-slate-700">{tool.longDescription}</p>
            </div>
            <ProcessModeBadge mode={tool.processMode} />
          </div>
          <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-3">
              <div className="font-semibold text-slate-950">免费文件数</div>
              <div className="mt-1">最多 {tool.maxFilesFree} 个</div>
            </div>
            <div className="rounded-md bg-slate-50 p-3">
              <div className="font-semibold text-slate-950">单文件大小</div>
              <div className="mt-1">最多 {tool.maxFileSizeMbFree} MB</div>
            </div>
            <div className="rounded-md bg-slate-50 p-3">
              <div className="font-semibold text-slate-950">当前状态</div>
              <div className="mt-1">页面占位已完成</div>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <FileDropzone tool={tool} />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">真实处理按钮会在浏览器本地工具阶段启用。</p>
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
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">使用步骤</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li>1. 选择需要处理的文件。</li>
            <li>2. 设置排序、范围或输出参数。</li>
            <li>3. 处理完成后下载结果文件。</li>
          </ol>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">隐私说明</h2>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            本地处理工具会优先在浏览器内完成。服务器处理工具后续会展示上传、保存期限和自动清理规则。
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">相关工具</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
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
