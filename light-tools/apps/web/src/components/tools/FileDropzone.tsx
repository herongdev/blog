import type { ToolDefinition } from "@light-tools/shared";

export function FileDropzone({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="muted-panel p-5">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <div>
          <p className="font-semibold text-[var(--color-text)]">选择文件</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            {tool.name} 的真实处理流程会在下一阶段接入。
          </p>
        </div>
        <input
          className="input-control file-control w-full max-w-sm px-3 py-2 text-sm"
          type="file"
          multiple={tool.maxFilesFree > 1}
          accept={tool.acceptedMimeTypes.join(",")}
          disabled
        />
      </div>
    </div>
  );
}
