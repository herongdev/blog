import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { ProcessModeBadge } from "@/components/tools/ProcessModeBadge";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      className="group flex min-h-52 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-500 hover:shadow-md"
      href={`/tools/${tool.slug}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-950 group-hover:text-teal-900">
              {tool.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tool.shortDescription}</p>
          </div>
          <ProcessModeBadge mode={tool.processMode} />
        </div>
        <p className="text-sm leading-6 text-slate-700">{tool.longDescription}</p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">免费 {tool.maxFilesFree} 个文件</span>
        <span className="font-semibold text-teal-800">打开</span>
      </div>
    </Link>
  );
}
