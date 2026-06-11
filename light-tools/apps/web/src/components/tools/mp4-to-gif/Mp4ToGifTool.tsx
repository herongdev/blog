"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ToolDefinition } from "@light-tools/shared";
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

interface ConversionProgress {
  percent: number;
  stage: string;
  detail: string;
}

interface QuotaInfo {
  limit: number;
  remaining: number;
  resetAt: string;
}

interface ConversionResponse {
  blob: Blob;
  getHeader: (name: string) => string | null;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "-";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getDownloadName(disposition: string | null): string {
  const match = disposition?.match(/filename="([^"]+)"/);
  return match?.[1] ?? "converted.gif";
}

async function readErrorMessage(blob: Blob): Promise<string> {
  const text = await blob.text().catch(() => "");
  if (!text) return "转换失败，请稍后再试。";

  try {
    const payload = JSON.parse(text) as { message?: string };
    return payload.message ?? "转换失败，请稍后再试。";
  } catch {
    return "转换失败，请稍后再试。";
  }
}

function readQuota(getHeader: ConversionResponse["getHeader"]): QuotaInfo | null {
  const limit = Number(getHeader("X-Free-Limit"));
  const remaining = Number(getHeader("X-Free-Remaining"));
  const resetAt = getHeader("X-Free-Reset-At") ?? "";

  if (!Number.isFinite(limit) || !Number.isFinite(remaining) || !resetAt) return null;

  return { limit, remaining, resetAt };
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
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);

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

  function submitConversion(formData: FormData): Promise<ConversionResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let processingTimer: number | undefined;

      function stopProcessingTimer() {
        if (processingTimer) {
          window.clearInterval(processingTimer);
          processingTimer = undefined;
        }
      }

      function startProcessingTimer() {
        const startedAt = Date.now();
        setProgress({
          percent: 42,
          stage: "转换 GIF",
          detail: "服务器正在生成调色板并压缩体积。"
        });

        processingTimer = window.setInterval(() => {
          const elapsed = Date.now() - startedAt;
          const estimated = 42 + Math.round((1 - Math.exp(-elapsed / 9000)) * 50);
          setProgress({
            percent: Math.min(92, estimated),
            stage: "转换 GIF",
            detail: "正在处理视频，较大文件可能需要几十秒。"
          });
        }, 500);
      }

      xhr.open("POST", withBasePath("/api/tools/mp4-to-gif"));
      xhr.responseType = "blob";

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          setProgress({
            percent: 18,
            stage: "上传文件",
            detail: "正在上传 MP4 文件。"
          });
          return;
        }

        const uploadPercent = Math.round((event.loaded / event.total) * 34);
        setProgress({
          percent: Math.max(8, Math.min(36, uploadPercent)),
          stage: "上传文件",
          detail: `${formatBytes(event.loaded)} / ${formatBytes(event.total)}`
        });
      };

      xhr.upload.onload = () => {
        startProcessingTimer();
      };

      xhr.onload = async () => {
        stopProcessingTimer();

        const blob = xhr.response instanceof Blob ? xhr.response : new Blob();
        const getHeader = (name: string) => xhr.getResponseHeader(name);

        if (xhr.status >= 200 && xhr.status < 300) {
          setProgress({
            percent: 100,
            stage: "转换完成",
            detail: "GIF 已生成，可以预览和下载。"
          });
          resolve({ blob, getHeader });
          return;
        }

        reject(new Error(await readErrorMessage(blob)));
      };

      xhr.onerror = () => {
        stopProcessingTimer();
        reject(new Error("网络异常，转换失败，请稍后再试。"));
      };

      xhr.onabort = () => {
        stopProcessingTimer();
        reject(new Error("转换已取消。"));
      };

      xhr.send(formData);
    });
  }

  async function convert() {
    if (!file) {
      setError("请先选择一个 MP4 文件。");
      return;
    }

    setIsConverting(true);
    setError("");
    setProgress({
      percent: 4,
      stage: "准备上传",
      detail: "正在检查参数。"
    });

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

      const response = await submitConversion(formData);
      const { blob, getHeader } = response;
      const url = URL.createObjectURL(blob);
      setQuota(readQuota(getHeader));

      setResult({
        url,
        filename: getDownloadName(getHeader("Content-Disposition")),
        outputSizeBytes: Number(getHeader("X-Output-Size-Bytes") ?? blob.size),
        targetSizeBytes: Number(getHeader("X-Target-Size-Bytes") ?? targetSizeMb * 1024 * 1024),
        width: getHeader("X-Output-Width") ?? String(width),
        height: getHeader("X-Output-Height") ?? String(height),
        fps: getHeader("X-Output-Fps") ?? String(fps),
        warning: decodeURIComponent(getHeader("X-Compression-Warning") ?? "")
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "转换失败，请稍后再试。");
      setProgress(null);
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <div className="app-container">
      <header className="space-y-3">
        <Link className="link-accent text-sm" href="/tools">
          返回工具
        </Link>
        <div>
          <h1 className="page-title">{tool.name}</h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">
            上传 MP4，设置尺寸和体积，生成 GIF。
          </p>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="panel panel-padded space-y-5">
          <div className="muted-panel p-5">
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="mp4-file">
              选择 MP4 文件
            </label>
            <input
              accept="video/mp4,.mp4"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              id="mp4-file"
              onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
              type="file"
            />
            {file ? (
              <p className="mt-3 text-sm text-muted">
                已选择：{file.name}，{formatBytes(file.size)}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="panel-title text-base">尺寸</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sizePresets.map((preset) => (
                <button
                  className={`choice-card ${presetId === preset.id ? "choice-card-active" : ""}`}
                  key={preset.id}
                  onClick={() => choosePreset(preset)}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-[var(--color-text)]">
                    {preset.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="panel-title text-base">输出设置</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                最大宽度
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
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
              <label className="text-sm font-semibold text-[var(--color-text)]">
                最大高度
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
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
              <label className="text-sm font-semibold text-[var(--color-text)]">
                目标最大体积 MB
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  max={20}
                  min={0.5}
                  onChange={(event) => setTargetSizeMb(Number(event.target.value))}
                  step={0.5}
                  type="number"
                  value={targetSizeMb}
                />
              </label>
              <label className="text-sm font-semibold text-[var(--color-text)]">
                帧率 FPS
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  max={24}
                  min={5}
                  onChange={(event) => setFps(Number(event.target.value))}
                  type="number"
                  value={fps}
                />
              </label>
              <label className="text-sm font-semibold text-[var(--color-text)]">
                开始秒数
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  max={600}
                  min={0}
                  onChange={(event) => setStartSeconds(Number(event.target.value))}
                  type="number"
                  value={startSeconds}
                />
              </label>
              <label className="text-sm font-semibold text-[var(--color-text)]">
                转换时长秒
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  max={30}
                  min={1}
                  onChange={(event) => setDurationSeconds(Number(event.target.value))}
                  type="number"
                  value={durationSeconds}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              当前预设：{selectedPreset ? `${selectedPreset.label} ${selectedPreset.description}` : "自定义尺寸"}
            </p>
            <button
              className="button-accent"
              disabled={isConverting || !file}
              onClick={convert}
              type="button"
            >
              {isConverting ? "转换中..." : "生成 GIF"}
            </button>
          </div>

          {progress ? (
            <div className="panel p-4" aria-live="polite">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-[var(--color-text)]">{progress.stage}</span>
                <span className="text-muted">{progress.percent}%</span>
              </div>
              <div className="progress-rail mt-3">
                <div className="progress-bar" style={{ width: `${progress.percent}%` }} />
              </div>
              <p className="mt-2 text-sm text-muted">{progress.detail}</p>
            </div>
          ) : null}

          {error ? (
            <div className="status-error">{error}</div>
          ) : null}
        </div>

        <aside className="space-y-5">
          <div className="panel panel-padded">
            <h2 className="section-title text-lg">结果</h2>
            {result ? (
              <div className="mt-4 space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="转换后的 GIF 预览"
                  className="max-h-72 w-full rounded-md border border-[var(--color-border)] object-contain"
                  src={result.url}
                />
                <div className="space-y-2 text-sm text-muted">
                  <div>实际体积：{formatBytes(result.outputSizeBytes)}</div>
                  <div>目标体积：{formatBytes(result.targetSizeBytes)}</div>
                  <div>
                    输出参数：{result.width} x {result.height}，{result.fps} FPS
                  </div>
                </div>
                {result.warning ? (
                  <div className="status-warning">{result.warning}</div>
                ) : null}
                {quota ? (
                  <p className="text-sm text-muted">
                    免费次数：剩余 {quota.remaining} / {quota.limit}
                  </p>
                ) : null}
                <a
                  className="button-primary w-full"
                  download={result.filename}
                  href={result.url}
                >
                  下载 GIF
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">
                转换完成后会在这里预览和下载 GIF。
              </p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单个 MP4 最多 {tool.maxFileSizeMbFree} MB。</p>
              <p>目标体积 0.5 MB - 20 MB，最长转换 30 秒。</p>
              <p>文件只用于本次转换，完成后清理临时文件。</p>
            </div>
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
                <span className="text-soft">更多视频工具整理中。</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
