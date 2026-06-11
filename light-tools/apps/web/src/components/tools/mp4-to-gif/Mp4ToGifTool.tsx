"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
import { ProcessModeBadge } from "@/components/tools/ProcessModeBadge";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

interface SizePreset {
  id: string;
  label: string;
  description: string;
  width: number;
  height: number;
}

const sizePresets: SizePreset[] = [
  { id: "chat-square", label: "表情包", description: "240 x 240", width: 240, height: 240 },
  { id: "small-wide", label: "小宽屏", description: "320 x 180", width: 320, height: 180 },
  { id: "medium-wide", label: "常用宽屏", description: "480 x 270", width: 480, height: 270 },
  { id: "large-wide", label: "清晰宽屏", description: "640 x 360", width: 640, height: 360 },
  { id: "small-square", label: "方形动态", description: "360 x 360", width: 360, height: 360 },
  { id: "large-square", label: "高清方形", description: "480 x 480", width: 480, height: 480 }
];

interface ConversionResult {
  url: string;
  filename: string;
  outputSizeBytes: number;
  targetSizeBytes: number;
  width: string;
  height: string;
  fps: string;
  warning: string;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "-";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getDownloadName(response: Response): string {
  const disposition = response.headers.get("Content-Disposition") ?? "";
  const match = disposition.match(/filename="([^"]+)"/);
  return match?.[1] ?? "converted.gif";
}

export function Mp4ToGifTool({ tool }: { tool: ToolDefinition }) {
  const [file, setFile] = useState<File | null>(null);
  const [presetId, setPresetId] = useState("medium-wide");
  const [width, setWidth] = useState(480);
  const [height, setHeight] = useState(270);
  const [targetSizeMb, setTargetSizeMb] = useState(5);
  const [fps, setFps] = useState(12);
  const [startSeconds, setStartSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(6);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);

  const relatedTools = getRelatedTools(tool);
  const selectedPreset = useMemo(
    () => sizePresets.find((preset) => preset.id === presetId),
    [presetId]
  );

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  function choosePreset(preset: SizePreset) {
    setPresetId(preset.id);
    setWidth(preset.width);
    setHeight(preset.height);
  }

  function chooseFile(selectedFile: File | null) {
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    if (selectedFile.size > maxBytes) {
      setFile(null);
      setError(`单个 MP4 最大支持 ${tool.maxFileSizeMbFree} MB。`);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".mp4")) {
      setFile(null);
      setError("当前只支持 .mp4 文件。");
      return;
    }

    setError("");
    setFile(selectedFile);
  }

  async function convert() {
    if (!file) {
      setError("请先选择一个 MP4 文件。");
      return;
    }

    setIsConverting(true);
    setError("");

    if (result?.url) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("width", String(width));
      formData.append("height", String(height));
      formData.append("targetSizeMb", String(targetSizeMb));
      formData.append("fps", String(fps));
      formData.append("startSeconds", String(startSeconds));
      formData.append("durationSeconds", String(durationSeconds));

      const response = await fetch(withBasePath("/api/tools/mp4-to-gif"), {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { message?: string; detail?: string }
          | null;
        throw new Error(payload?.message ?? "转换失败，请稍后再试。");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        filename: getDownloadName(response),
        outputSizeBytes: Number(response.headers.get("X-Output-Size-Bytes") ?? blob.size),
        targetSizeBytes: Number(response.headers.get("X-Target-Size-Bytes") ?? targetSizeMb * 1024 * 1024),
        width: response.headers.get("X-Output-Width") ?? String(width),
        height: response.headers.get("X-Output-Height") ?? String(height),
        fps: response.headers.get("X-Output-Fps") ?? String(fps),
        warning: decodeURIComponent(response.headers.get("X-Compression-Warning") ?? "")
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "转换失败，请稍后再试。");
    } finally {
      setIsConverting(false);
    }
  }

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
              上传 MP4，设置尺寸和体积，生成 GIF。
            </p>
          </div>
          <ProcessModeBadge mode={tool.processMode} />
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5 rounded-md border border-slate-200 bg-white p-5">
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
            <label className="block text-sm font-semibold text-slate-950" htmlFor="mp4-file">
              选择 MP4 文件
            </label>
            <input
              accept="video/mp4,.mp4"
              className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-teal-700 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              id="mp4-file"
              onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
              type="file"
            />
            {file ? (
              <p className="mt-3 text-sm text-slate-600">
                已选择：{file.name}，{formatBytes(file.size)}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-slate-950">尺寸</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sizePresets.map((preset) => (
                <button
                  className={`rounded-md border p-3 text-left transition ${
                    presetId === preset.id
                      ? "border-teal-700 bg-teal-50 text-teal-950"
                      : "border-slate-200 bg-white text-slate-700 hover:border-teal-500"
                  }`}
                  key={preset.id}
                  onClick={() => choosePreset(preset)}
                  type="button"
                >
                  <span className="block text-sm font-semibold">{preset.label}</span>
                  <span className="mt-1 block text-sm">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-slate-950">输出设置</h2>
            <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-950">
              最大宽度
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                max={1280}
                min={120}
                onChange={(event) => {
                  setPresetId("custom");
                  setWidth(Number(event.target.value));
                }}
                type="number"
                value={width}
              />
            </label>
            <label className="text-sm font-semibold text-slate-950">
              最大高度
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                max={1280}
                min={120}
                onChange={(event) => {
                  setPresetId("custom");
                  setHeight(Number(event.target.value));
                }}
                type="number"
                value={height}
              />
            </label>
            <label className="text-sm font-semibold text-slate-950">
              目标最大体积 MB
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                max={20}
                min={0.5}
                onChange={(event) => setTargetSizeMb(Number(event.target.value))}
                step={0.5}
                type="number"
                value={targetSizeMb}
              />
            </label>
            <label className="text-sm font-semibold text-slate-950">
              帧率 FPS
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                max={24}
                min={5}
                onChange={(event) => setFps(Number(event.target.value))}
                type="number"
                value={fps}
              />
            </label>
            <label className="text-sm font-semibold text-slate-950">
              开始秒数
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                max={600}
                min={0}
                onChange={(event) => setStartSeconds(Number(event.target.value))}
                type="number"
                value={startSeconds}
              />
            </label>
            <label className="text-sm font-semibold text-slate-950">
              转换时长秒
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal"
                max={30}
                min={1}
                onChange={(event) => setDurationSeconds(Number(event.target.value))}
                type="number"
                value={durationSeconds}
              />
            </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              当前预设：{selectedPreset ? `${selectedPreset.label} ${selectedPreset.description}` : "自定义尺寸"}
            </p>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
              disabled={isConverting || !file}
              onClick={convert}
              type="button"
            >
              {isConverting ? "转换中..." : "生成 GIF"}
            </button>
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <aside className="space-y-5">
          <div className="rounded-md border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-950">结果</h2>
            {result ? (
              <div className="mt-4 space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="转换后的 GIF 预览"
                  className="max-h-72 w-full rounded-md border border-slate-200 object-contain"
                  src={result.url}
                />
                <div className="space-y-2 text-sm text-slate-700">
                  <div>实际体积：{formatBytes(result.outputSizeBytes)}</div>
                  <div>目标体积：{formatBytes(result.targetSizeBytes)}</div>
                  <div>
                    输出参数：{result.width} x {result.height}，{result.fps} FPS
                  </div>
                </div>
                {result.warning ? (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    {result.warning}
                  </div>
                ) : null}
                <a
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  download={result.filename}
                  href={result.url}
                >
                  下载 GIF
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                转换完成后会在这里预览和下载 GIF。
              </p>
            )}
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-950">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <p>单个 MP4 最多 {tool.maxFileSizeMbFree} MB。</p>
              <p>目标体积 0.5 MB - 20 MB，最长转换 30 秒。</p>
              <p>文件只用于本次转换，完成后清理临时文件。</p>
            </div>
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
                <span className="text-slate-500">更多视频工具整理中。</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
