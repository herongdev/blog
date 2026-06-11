"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, Trash2 } from "lucide-react";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";
type ResizeMode = "max" | "exact";

interface ImageItem {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
}

interface ProcessedImage {
  id: string;
  sourceName: string;
  url: string;
  filename: string;
  originalSize: number;
  outputSize: number;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
  format: OutputFormat;
  warning: string;
}

interface Preset {
  id: string;
  label: string;
  description: string;
  format: OutputFormat;
  resizeMode: ResizeMode;
  width: number;
  height: number;
  targetSizeMb: string;
  quality: number;
}

interface ProgressState {
  percent: number;
  stage: string;
  detail: string;
}

const presets: Preset[] = [
  {
    id: "form-2mb",
    label: "表单上传",
    description: "JPG / 2 MB / 长边 1600",
    format: "image/jpeg",
    resizeMode: "max",
    width: 1600,
    height: 1600,
    targetSizeMb: "2",
    quality: 0.86
  },
  {
    id: "article-webp",
    label: "文章配图",
    description: "WebP / 800 KB / 长边 1280",
    format: "image/webp",
    resizeMode: "max",
    width: 1280,
    height: 1280,
    targetSizeMb: "0.8",
    quality: 0.84
  },
  {
    id: "chat-small",
    label: "聊天发送",
    description: "JPG / 500 KB / 长边 1080",
    format: "image/jpeg",
    resizeMode: "max",
    width: 1080,
    height: 1080,
    targetSizeMb: "0.5",
    quality: 0.82
  },
  {
    id: "avatar",
    label: "头像方图",
    description: "JPG / 512 x 512 / 300 KB",
    format: "image/jpeg",
    resizeMode: "exact",
    width: 512,
    height: 512,
    targetSizeMb: "0.3",
    quality: 0.86
  },
  {
    id: "webp-keep",
    label: "只转 WebP",
    description: "保留尺寸 / 质量 85%",
    format: "image/webp",
    resizeMode: "max",
    width: 0,
    height: 0,
    targetSizeMb: "",
    quality: 0.85
  }
];

const formatLabels: Record<OutputFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP"
};

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "-";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatSavings(originalSize: number, outputSize: number): string {
  if (originalSize <= 0 || outputSize <= 0) return "";
  const saved = Math.max(0, 1 - outputSize / originalSize);
  return `减少 ${(saved * 100).toFixed(0)}%`;
}

function fileExtension(format: OutputFormat): string {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/png") return "png";
  return "webp";
}

function outputFilename(name: string, format: OutputFormat): string {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}-optimized.${fileExtension(format)}`;
}

function isSupportedImage(file: File): boolean {
  const name = file.name.toLowerCase();
  const hasSupportedExtension =
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".webp");

  return (
    hasSupportedExtension &&
    (file.type === "" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp")
  );
}

async function hasSupportedImageHeader(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng =
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;
  const header = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join("");
  const isWebp = header.startsWith("RIFF") && header.slice(8, 12) === "WEBP";

  return isJpeg || isPng || isWebp;
}

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "image-compress",
      toolSlug: "image-compress",
      path: "/tools/image-compress",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

async function readImage(file: File): Promise<{ url: string; width: number; height: number }> {
  if (!(await hasSupportedImageHeader(file))) {
    throw new Error(`${file.name} 不是有效的 JPG、PNG 或 WebP 图片。`);
  }

  const url = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error(`${file.name} 图片读取失败。`));
      element.src = url;
    });

    return {
      url,
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片绘制失败。"));
    image.src = url;
  });
}

function getOutputSize(item: ImageItem, mode: ResizeMode, width: number, height: number) {
  const requestedWidth = Math.max(0, Math.round(width));
  const requestedHeight = Math.max(0, Math.round(height));

  if (mode === "exact") {
    return {
      width: requestedWidth || item.width,
      height: requestedHeight || item.height
    };
  }

  const widthScale = requestedWidth > 0 ? requestedWidth / item.width : 1;
  const heightScale = requestedHeight > 0 ? requestedHeight / item.height : 1;
  const scale = Math.min(1, widthScale, heightScale);

  return {
    width: Math.max(1, Math.round(item.width * scale)),
    height: Math.max(1, Math.round(item.height * scale))
  };
}

async function drawImageToCanvas(
  item: ImageItem,
  mode: ResizeMode,
  width: number,
  height: number,
  format: OutputFormat
): Promise<HTMLCanvasElement> {
  const source = await loadHtmlImage(item.url);
  const outputSize = getOutputSize(item, mode, width, height);
  const canvas = document.createElement("canvas");
  canvas.width = outputSize.width;
  canvas.height = outputSize.height;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器无法创建图片画布。");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  if (format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (mode === "exact") {
    const scale = Math.max(canvas.width / source.naturalWidth, canvas.height / source.naturalHeight);
    const drawWidth = source.naturalWidth * scale;
    const drawHeight = source.naturalHeight * scale;
    context.drawImage(
      source,
      (canvas.width - drawWidth) / 2,
      (canvas.height - drawHeight) / 2,
      drawWidth,
      drawHeight
    );
  } else {
    context.drawImage(source, 0, 0, canvas.width, canvas.height);
  }

  return canvas;
}

function encodeCanvas(canvas: HTMLCanvasElement, format: OutputFormat, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(`${formatLabels[format]} 导出失败，当前浏览器可能不支持该格式。`));
          return;
        }

        resolve(blob);
      },
      format,
      quality
    );
  });
}

async function encodeWithTargetSize(
  canvas: HTMLCanvasElement,
  format: OutputFormat,
  quality: number,
  targetBytes: number | null
): Promise<{ blob: Blob; warning: string }> {
  if (!targetBytes || format === "image/png") {
    const blob = await encodeCanvas(canvas, format, quality);
    const warning =
      targetBytes && format === "image/png"
        ? "PNG 不支持精确按体积压缩，建议改用 JPG 或 WebP。"
        : "";
    return { blob, warning };
  }

  let low = 0.35;
  let high = Math.max(low, Math.min(0.95, quality));
  let bestUnderTarget: Blob | null = null;
  let smallestBlob: Blob | null = null;

  for (let index = 0; index < 8; index += 1) {
    const currentQuality = (low + high) / 2;
    const blob = await encodeCanvas(canvas, format, currentQuality);

    if (!smallestBlob || blob.size < smallestBlob.size) {
      smallestBlob = blob;
    }

    if (blob.size <= targetBytes) {
      bestUnderTarget = blob;
      low = currentQuality;
    } else {
      high = currentQuality;
    }
  }

  const blob = bestUnderTarget ?? smallestBlob ?? (await encodeCanvas(canvas, format, low));
  const warning = bestUnderTarget ? "" : "已压到较低质量，仍高于目标体积，建议把尺寸调小。";

  return { blob, warning };
}

export function ImageCompressTool({ tool }: { tool: ToolDefinition }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [presetId, setPresetId] = useState("form-2mb");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [resizeMode, setResizeMode] = useState<ResizeMode>("max");
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(1600);
  const [targetSizeMb, setTargetSizeMb] = useState("2");
  const [quality, setQuality] = useState(0.86);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const imagesRef = useRef<ImageItem[]>([]);
  const resultsRef = useRef<ProcessedImage[]>([]);

  const relatedTools = getRelatedTools(tool);
  const totalSize = useMemo(
    () => images.reduce((sum, image) => sum + image.file.size, 0),
    [images]
  );
  const resultSize = useMemo(
    () => results.reduce((sum, result) => sum + result.outputSize, 0),
    [results]
  );

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url));
      resultsRef.current.forEach((result) => URL.revokeObjectURL(result.url));
    };
  }, []);

  function clearResults() {
    resultsRef.current.forEach((result) => URL.revokeObjectURL(result.url));
    resultsRef.current = [];
    setResults([]);
    setProgress(null);
  }

  function applyPreset(preset: Preset) {
    clearResults();
    setPresetId(preset.id);
    setFormat(preset.format);
    setResizeMode(preset.resizeMode);
    setWidth(preset.width);
    setHeight(preset.height);
    setTargetSizeMb(preset.targetSizeMb);
    setQuality(preset.quality);
    setError("");
  }

  async function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setError("");

    const availableSlots = Math.max(0, tool.maxFilesFree - images.length);
    if (files.length > availableSlots) {
      setError(`最多支持 ${tool.maxFilesFree} 张图片。`);
      return;
    }

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    const nextImages: ImageItem[] = [];

    try {
      for (const file of files) {
        if (!isSupportedImage(file)) {
          throw new Error("只支持 JPG、PNG、WebP 图片。");
        }

        if (file.size > maxBytes) {
          throw new Error(`单张图片最大支持 ${tool.maxFileSizeMbFree} MB。`);
        }

        const image = await readImage(file);
        nextImages.push({
          id: crypto.randomUUID(),
          file,
          url: image.url,
          width: image.width,
          height: image.height
        });
      }

      clearResults();
      setImages((current) => [...current, ...nextImages]);
    } catch (caught) {
      nextImages.forEach((image) => URL.revokeObjectURL(image.url));
      setError(caught instanceof Error ? caught.message : "图片读取失败。");
    }
  }

  function removeImage(id: string) {
    setImages((current) => {
      const removed = current.find((image) => image.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return current.filter((image) => image.id !== id);
    });
    clearResults();
  }

  async function processImages() {
    if (images.length === 0) {
      setError("请先选择图片。");
      return;
    }

    const targetBytes = targetSizeMb.trim() ? Number(targetSizeMb) * 1024 * 1024 : null;
    if (targetBytes !== null && (!Number.isFinite(targetBytes) || targetBytes <= 0)) {
      setError("目标体积需要大于 0。");
      return;
    }

    setIsProcessing(true);
    setError("");
    clearResults();
    setProgress({
      percent: 4,
      stage: "准备处理",
      detail: `共 ${images.length} 张图片。`
    });
    sendAnalytics("tool_use_attempt", `count=${images.length};format=${fileExtension(format)}`);

    try {
      const nextResults: ProcessedImage[] = [];

      for (const [index, image] of images.entries()) {
        setProgress({
          percent: Math.max(8, Math.round((index / images.length) * 84)),
          stage: "处理图片",
          detail: `${index + 1} / ${images.length}：${image.file.name}`
        });

        const canvas = await drawImageToCanvas(image, resizeMode, width, height, format);
        const encoded = await encodeWithTargetSize(canvas, format, quality, targetBytes);
        const url = URL.createObjectURL(encoded.blob);

        nextResults.push({
          id: crypto.randomUUID(),
          sourceName: image.file.name,
          url,
          filename: outputFilename(image.file.name, format),
          originalSize: image.file.size,
          outputSize: encoded.blob.size,
          originalWidth: image.width,
          originalHeight: image.height,
          outputWidth: canvas.width,
          outputHeight: canvas.height,
          format,
          warning: encoded.warning
        });
      }

      setResults(nextResults);
      setProgress({
        percent: 100,
        stage: "处理完成",
        detail: "图片已生成，可以下载。"
      });
      sendAnalytics("tool_use_success", `count=${nextResults.length};format=${fileExtension(format)}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "图片处理失败，请换一组图片试试。";
      setError(message);
      setProgress(null);
      sendAnalytics("tool_use_failure", message);
    } finally {
      setIsProcessing(false);
    }
  }

  function downloadAll() {
    results.forEach((result, index) => {
      window.setTimeout(() => {
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.filename;
        link.click();
      }, index * 180);
    });
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
            压缩体积、调整尺寸，或转换 JPG、PNG、WebP。
          </p>
        </div>
      </header>

      <section className="grid min-w-0 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="panel panel-padded min-w-0 space-y-5">
          <div
            className="muted-panel p-5"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              void addFiles(event.dataTransfer.files);
            }}
          >
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="image-files">
              选择图片
            </label>
            <input
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              id="image-files"
              multiple
              onChange={(event) => {
                void addFiles(event.target.files ?? []);
                event.target.value = "";
              }}
              type="file"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              支持拖拽上传。图片只在浏览器本地处理，不会上传服务器。
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="panel-title text-base">快捷配置</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {presets.map((preset) => (
                <button
                  className={`choice-card ${presetId === preset.id ? "choice-card-active" : ""}`}
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
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
              <div className="space-y-2 sm:col-span-2">
                <div className="text-sm font-semibold text-[var(--color-text)]">输出格式</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {([
                    ["image/jpeg", "JPG"],
                    ["image/png", "PNG"],
                    ["image/webp", "WebP"]
                  ] as const).map(([value, label]) => (
                    <button
                      className={`choice-card ${format === value ? "choice-card-active" : ""}`}
                      key={value}
                      onClick={() => {
                        clearResults();
                        setPresetId("custom");
                        setFormat(value);
                      }}
                      type="button"
                    >
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="text-sm font-semibold text-[var(--color-text)]">尺寸方式</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {([
                    ["max", "等比缩小到最大宽高"],
                    ["exact", "裁剪为固定宽高"]
                  ] as const).map(([value, label]) => (
                    <button
                      className={`choice-card ${resizeMode === value ? "choice-card-active" : ""}`}
                      key={value}
                      onClick={() => {
                        clearResults();
                        setPresetId("custom");
                        setResizeMode(value);
                      }}
                      type="button"
                    >
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <label className="text-sm font-semibold text-[var(--color-text)]">
                {resizeMode === "max" ? "最大宽度" : "目标宽度"}
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  max={6000}
                  min={0}
                  onChange={(event) => {
                    clearResults();
                    setPresetId("custom");
                    setWidth(Number(event.target.value));
                  }}
                  type="number"
                  value={width}
                />
              </label>
              <label className="text-sm font-semibold text-[var(--color-text)]">
                {resizeMode === "max" ? "最大高度" : "目标高度"}
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  max={6000}
                  min={0}
                  onChange={(event) => {
                    clearResults();
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
                  min={0.05}
                  onChange={(event) => {
                    clearResults();
                    setPresetId("custom");
                    setTargetSizeMb(event.target.value);
                  }}
                  placeholder="不填则按质量导出"
                  step={0.05}
                  type="number"
                  value={targetSizeMb}
                />
              </label>
              <label className="text-sm font-semibold text-[var(--color-text)]">
                基础质量 {Math.round(quality * 100)}%
                <input
                  className="mt-4 w-full accent-[var(--color-accent)]"
                  max={0.95}
                  min={0.35}
                  onChange={(event) => {
                    clearResults();
                    setPresetId("custom");
                    setQuality(Number(event.target.value));
                  }}
                  step={0.01}
                  type="range"
                  value={quality}
                />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="panel-title">待处理图片</h2>
              <span className="text-sm text-muted">
                {images.length} 张，{formatBytes(totalSize)}
              </span>
            </div>
            {images.length > 0 ? (
              <div className="grid gap-3">
                {images.map((image, index) => (
                  <div
                    className="panel flex w-full min-w-0 flex-col gap-3 overflow-hidden p-3 sm:flex-row sm:items-center"
                    key={image.id}
                  >
                    <div className="flex w-full min-w-0 items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-md border border-[var(--color-border)] object-cover"
                        src={image.url}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-[var(--color-text)]">
                          {index + 1}. {image.file.name}
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          {image.width} x {image.height}，{formatBytes(image.file.size)}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full min-w-0 shrink-0 items-center justify-end sm:w-auto">
                      <button
                        aria-label="删除"
                        className="icon-button"
                        onClick={() => removeImage(image.id)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="muted-panel p-5 text-sm text-muted">还没有选择图片。</div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              输出：{formatLabels[format]}，{resizeMode === "max" ? "等比缩小" : "固定尺寸裁剪"}
            </p>
            <button
              className="button-accent"
              disabled={isProcessing || images.length === 0}
              onClick={processImages}
              type="button"
            >
              {isProcessing ? "处理中..." : "开始处理"}
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

          {error ? <div className="status-error">{error}</div> : null}
        </div>

        <aside className="min-w-0 space-y-5">
          <div className="panel panel-padded">
            <div className="flex items-center justify-between gap-3">
              <h2 className="section-title text-lg">结果</h2>
              {results.length > 1 ? (
                <button className="button-muted min-h-9 px-3 py-1 text-xs" onClick={downloadAll} type="button">
                  全部下载
                </button>
              ) : null}
            </div>
            {results.length > 0 ? (
              <div className="mt-4 space-y-3">
                <div className="text-sm text-muted">
                  {formatBytes(totalSize)} 到 {formatBytes(resultSize)}
                  {resultSize > 0 ? `，${formatSavings(totalSize, resultSize)}` : ""}
                </div>
                {results.map((result) => (
                  <div className="panel p-3" key={result.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="h-28 w-full rounded-md border border-[var(--color-border)] object-contain"
                      src={result.url}
                    />
                    <div className="mt-3 space-y-1 text-sm text-muted">
                      <div className="truncate font-semibold text-[var(--color-text)]">{result.filename}</div>
                      <div>
                        {formatBytes(result.originalSize)} 到 {formatBytes(result.outputSize)}
                      </div>
                      <div>
                        {result.originalWidth} x {result.originalHeight} 到 {result.outputWidth} x {result.outputHeight}
                      </div>
                      {result.warning ? <div className="text-[var(--color-warning)]">{result.warning}</div> : null}
                    </div>
                    <a className="button-primary mt-3 w-full" download={result.filename} href={result.url}>
                      <Download aria-hidden="true" className="h-4 w-4" />
                      下载
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">处理完成后会在这里预览和下载。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>最多 {tool.maxFilesFree} 张图片，单张 {tool.maxFileSizeMbFree} MB。</p>
              <p>支持 JPG、PNG、WebP。</p>
              <p>全程在浏览器本地处理。</p>
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
                <span className="text-soft">更多图片工具整理中。</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
