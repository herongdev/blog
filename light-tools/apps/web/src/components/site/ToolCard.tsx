import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { ToolIcon } from "@/components/site/ToolIcon";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      className="tool-card group flex items-center scroll-mt-24"
      href={`/tools/${tool.slug}`}
      id={`tool-${tool.slug}`}
    >
      <div className="flex w-full min-w-0 items-center gap-2.5">
        <span className="tool-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
          <ToolIcon className="h-4 w-4" tool={tool} />
        </span>
        <div className="flex min-h-9 min-w-0 flex-col justify-center">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">{tool.name}</h3>
          <p className="mt-0.5 text-xs leading-5 text-muted">{tool.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}
