import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { getRelatedTools } from "@/lib/tool-registry";

export function ToolShell({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getRelatedTools(tool);

  return (
    <div className="app-container">
      <header className="space-y-3">
        <Link className="link-accent text-sm" href="/tools">
          返回工具
        </Link>
        <div>
          <h1 className="page-title">{tool.name}</h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">
            {tool.shortDescription}
          </p>
        </div>
      </header>

      <section className="panel panel-padded">
        <FileDropzone tool={tool} />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">功能开发中，入口和页面结构已就绪。</p>
          <button
            className="button-muted"
            disabled
            type="button"
          >
            即将支持
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="panel p-4">
          <h2 className="panel-title">限制</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            免费最多 {tool.maxFilesFree} 个文件，单文件 {tool.maxFileSizeMbFree} MB。
          </p>
        </div>
        <div className="panel p-4">
          <h2 className="panel-title">隐私与清理</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            文件只用于当前任务。涉及上传的工具会在任务完成后清理临时文件。
          </p>
        </div>
        <div className="panel p-4">
          <h2 className="panel-title">相关工具</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {relatedTools.length > 0 ? (
              relatedTools.map((relatedTool) => (
                <Link
                  className="panel px-3 py-2 font-medium text-muted hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  href={`/tools/${relatedTool.slug}`}
                  key={relatedTool.id}
                >
                  {relatedTool.name}
                </Link>
              ))
            ) : (
              <span className="text-soft">更多工具整理中。</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
