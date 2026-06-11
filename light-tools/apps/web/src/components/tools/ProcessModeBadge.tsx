import type { ToolProcessMode } from "@light-tools/shared";

const modeText: Record<ToolProcessMode, string> = {
  browser: "本地处理",
  server: "服务器处理",
  hybrid: "混合处理"
};

export function ProcessModeBadge({ mode }: { mode: ToolProcessMode }) {
  const className =
    mode === "server"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : mode === "hybrid"
        ? "border-sky-200 bg-sky-50 text-sky-800"
        : "border-teal-200 bg-teal-50 text-teal-800";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {modeText[mode]}
    </span>
  );
}
