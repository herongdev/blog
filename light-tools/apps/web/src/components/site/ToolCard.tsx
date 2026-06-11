import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { ToolIcon } from "@/components/site/ToolIcon";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      className="tool-card group flex items-center"
      href={`/tools/${tool.slug}`}
    >
      <div className="flex w-full min-w-0 items-center gap-3">
        <span className="tool-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
          <ToolIcon className="h-5 w-5" tool={tool} />
        </span>
        <div className="flex min-h-10 min-w-0 flex-col justify-center">
          <h3 className="text-base font-semibold text-[var(--color-text)]">{tool.name}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{tool.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}
