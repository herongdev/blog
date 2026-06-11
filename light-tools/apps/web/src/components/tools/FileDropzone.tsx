import type { ToolDefinition } from "@light-tools/shared";

export function FileDropzone({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <div>
          <p className="font-semibold text-slate-950">选择文件</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {tool.name} 的真实处理流程会在下一阶段接入。
          </p>
        </div>
        <input
          className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-teal-700 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
          type="file"
          multiple={tool.maxFilesFree > 1}
          accept={tool.acceptedMimeTypes.join(",")}
          disabled
        />
      </div>
    </div>
  );
}
