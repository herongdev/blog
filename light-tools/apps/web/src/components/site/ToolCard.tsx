import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { ToolIcon } from "@/components/site/ToolIcon";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      className="group flex min-h-[112px] items-center rounded-md border border-slate-200 bg-white px-5 py-4 transition hover:border-teal-500 hover:bg-teal-50/40"
      href={`/tools/${tool.slug}`}
    >
      <div className="flex w-full min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition group-hover:bg-teal-100 group-hover:text-teal-800">
          <ToolIcon className="h-5 w-5" tool={tool} />
        </span>
        <div className="flex min-h-10 min-w-0 flex-col justify-center">
          <h3 className="text-base font-semibold text-slate-950 group-hover:text-teal-900">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{tool.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}
