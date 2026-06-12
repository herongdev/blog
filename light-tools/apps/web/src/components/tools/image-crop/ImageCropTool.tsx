"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Crop, Download } from "lucide-react";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface LoadedImage {
  file: File;
  url: string;
  width: number;
  height: number;
}

interface CropPreset {
  id: string;
  label: string;
  description: string;
  width: number;
  height: number;
}

interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GeneratedImage {
  url: string;
  filename: string;
  sizeBytes: number;
  width: number;
  height: number;
  format: OutputFormat;
}

interface ProgressState {
  percent: number;
  stage: string;
  detail: string;
}

const presets: CropPreset[] = [
  {
    id: "avatar",
    label: "头像方图",
    description: "512 x 512",
    width: 512,
    height: 512
  },
  {
    id: "form-square",
    label: "表单上传",
    description: "800 x 800",
    width: 800,
    height: 800
  },
  {
    id: "id-one-inch",
    label: "一寸证件照",
    description: "295 x 413",
    width: 295,
    height: 413
  },
  {
    id: "id-two-inch",
    label: "二寸证件照",
    description: "413 x 579",
    width: 413,
    height: 579
  },
  {
    id: "cover-wide",
    label: "横版封面",
    description: "1280 x 720",
    width: 1280,
    height: 720
  },
  {
    id: "document",
    label: "竖版材料",
    description: "900 x 1200",
    width: 900,
    height: 1200
  }
];

const customPreset: CropPreset = {
  id: "custom",
  label: "自定义尺寸",
  description: "按输入宽高",
  width: 800,
  height: 800
};

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

function fileExtension(format: OutputFormat): string {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/png") return "png";
  return "webp";
}

function outputFilename(name: string, format: OutputFormat): string {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}-cropped.${fileExtension(format)}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getOutputSize(preset: CropPreset, customWidth: string, customHeight: string) {
  if (preset.id !== "custom") {
    return {
      width: preset.width,
      height: preset.height
    };
  }

  const width = Number(customWidth);
  const height = Number(customHeight);

  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    throw new Error("自定义宽高必须是整数。");
  }

  if (width < 64 || height < 64 || width > 4096 || height > 4096) {
    throw new Error("自定义宽高请设置在 64 到 4096 像素之间。");
  }

  return { width, height };
}

function getCropRect(
  image: LoadedImage,
  aspectRatio: number,
  zoom: number,
  positionX: number,
  positionY: number
): CropRect {
  const imageAspectRatio = image.width / image.height;
  let baseWidth = image.width;
  let baseHeight = image.height;

  if (imageAspectRatio > aspectRatio) {
    baseHeight = image.height;
    baseWidth = image.height * aspectRatio;
  } else {
    baseWidth = image.width;
    baseHeight = image.width / aspectRatio;
  }

  const cropWidth = clamp(baseWidth / zoom, 1, image.width);
  const cropHeight = clamp(baseHeight / zoom, 1, image.height);
  const maxX = Math.max(0, image.width - cropWidth);
  const maxY = Math.max(0, image.height - cropHeight);

  return {
    x: Math.round(maxX * ((positionX + 100) / 200)),
    y: Math.round(maxY * ((positionY + 100) / 200)),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight)
  };
}

function encodeCanvas(canvas: HTMLCanvasElement, format: OutputFormat): Promise<Blob> {
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
      format === "image/png" ? undefined : 0.9
    );
  });
}

function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片绘制失败。"));
    image.src = url;
  });
}

async function readImage(file: File): Promise<LoadedImage> {
  if (!(await hasSupportedImageHeader(file))) {
    throw new Error(`${file.name} 不是有效的 JPG、PNG 或 WebP 图片。`);
  }

  const url = URL.createObjectURL(file);

  try {
    const image = await loadHtmlImage(url);

    return {
      file,
      url,
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "image-crop",
      toolSlug: "image-crop",
      path: "/tools/image-crop",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

export function ImageCropTool({ tool }: { tool: ToolDefinition }) {
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null);
  const [presetId, setPresetId] = useState("avatar");
  const [customWidth, setCustomWidth] = useState("800");
  const [customHeight, setCustomHeight] = useState("800");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [zoom, setZoom] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const imageRef = useRef<LoadedImage | null>(null);
  const resultRef = useRef<GeneratedImage | null>(null);

  const relatedTools = getRelatedTools(tool);
  const selectedPreset = presets.find((preset) => preset.id === presetId) ?? customPreset;

  const outputSize = useMemo(() => {
    try {
      return getOutputSize(selectedPreset, customWidth, customHeight);
    } catch {
      return {
        width: selectedPreset.width,
        height: selectedPreset.height
      };
    }
  }, [customHeight, customWidth, selectedPreset]);

  const cropRect = useMemo(() => {
    if (!loadedImage) return null;

    return getCropRect(
      loadedImage,
      outputSize.width / outputSize.height,
      zoom,
      positionX,
      positionY
    );
  }, [loadedImage, outputSize.height, outputSize.width, positionX, positionY, zoom]);

  const cropStyle = cropRect && loadedImage
    ? {
        left: `${(cropRect.x / loadedImage.width) * 100}%`,
        top: `${(cropRect.y / loadedImage.height) * 100}%`,
        width: `${(cropRect.width / loadedImage.width) * 100}%`,
        height: `${(cropRect.height / loadedImage.height) * 100}%`
      }
    : undefined;

  useEffect(() => {
    imageRef.current = loadedImage;
  }, [loadedImage]);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  useEffect(() => {
    return () => {
      if (imageRef.current?.url) URL.revokeObjectURL(imageRef.current.url);
      if (resultRef.current?.url) URL.revokeObjectURL(resultRef.current.url);
    };
  }, []);

  function clearResult() {
    if (resultRef.current?.url) URL.revokeObjectURL(resultRef.current.url);
    resultRef.current = null;
    setResult(null);
  }

  function clearOutputState() {
    clearResult();
    setProgress(null);
    setError("");
  }

  function resetCropControls() {
    setZoom(1);
    setPositionX(0);
    setPositionY(0);
  }

  async function addFile(fileList: FileList | File[]) {
    const file = Array.from(fileList)[0];
    if (!file) return;

    setError("");
    clearResult();

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    if (!isSupportedImage(file)) {
      setError("只支持 JPG、PNG 或 WebP 图片。");
      return;
    }

    if (file.size > maxBytes) {
      setError(`单张图片最大支持 ${tool.maxFileSizeMbFree} MB。`);
      return;
    }

    setIsLoading(true);
    setProgress({
      percent: 8,
      stage: "读取图片",
      detail: file.name
    });

    try {
      const image = await readImage(file);
      if (imageRef.current?.url) URL.revokeObjectURL(imageRef.current.url);
      setLoadedImage(image);
      resetCropControls();
      setProgress({
        percent: 100,
        stage: "读取完成",
        detail: `${image.width} x ${image.height}，可以开始裁剪。`
      });
    } catch (caught) {
      setLoadedImage(null);
      setProgress(null);
      setError(caught instanceof Error ? caught.message : "图片读取失败。");
    } finally {
      setIsLoading(false);
    }
  }

  async function exportImage() {
    if (!loadedImage || !cropRect) {
      setError("请先选择图片。");
      return;
    }

    setIsExporting(true);
    setError("");
    clearResult();
    setProgress({
      percent: 10,
      stage: "准备导出",
      detail: `${outputSize.width} x ${outputSize.height}，${formatLabels[format]}`
    });
    sendAnalytics(
      "tool_use_attempt",
      `preset=${selectedPreset.id};format=${formatLabels[format]};size=${outputSize.width}x${outputSize.height}`
    );

    try {
      const source = await loadHtmlImage(loadedImage.url);
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

      setProgress({
        percent: 58,
        stage: "裁剪图片",
        detail: `${cropRect.width} x ${cropRect.height} -> ${outputSize.width} x ${outputSize.height}`
      });

      context.drawImage(
        source,
        cropRect.x,
        cropRect.y,
        cropRect.width,
        cropRect.height,
        0,
        0,
        outputSize.width,
        outputSize.height
      );

      setProgress({
        percent: 86,
        stage: "生成文件",
        detail: `正在导出 ${formatLabels[format]}。`
      });

      const blob = await encodeCanvas(canvas, format);
      const nextResult = {
        url: URL.createObjectURL(blob),
        filename: outputFilename(loadedImage.file.name, format),
        sizeBytes: blob.size,
        width: outputSize.width,
        height: outputSize.height,
        format
      };

      resultRef.current = nextResult;
      setResult(nextResult);
      setProgress({
        percent: 100,
        stage: "裁剪完成",
        detail: "图片已生成，可以下载。"
      });
      sendAnalytics(
        "tool_use_success",
        `preset=${selectedPreset.id};format=${formatLabels[format]};size=${blob.size}`
      );
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "图片裁剪失败，请换一张图片试试。";
      setError(message);
      setProgress(null);
      sendAnalytics("tool_use_failure", message);
    } finally {
      setIsExporting(false);
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
            裁剪图片并导出头像、证件照、表单图或封面尺寸。
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
              void addFile(event.dataTransfer.files);
            }}
          >
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="image-crop-file">
              选择图片
            </label>
            <input
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              disabled={isLoading || isExporting}
              id="image-crop-file"
              onChange={(event) => {
                void addFile(event.target.files ?? []);
                event.target.value = "";
              }}
              type="file"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              支持 JPG、PNG、WebP。图片只在浏览器本地处理，不会上传服务器。
            </p>
          </div>

          {loadedImage ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="panel-title truncate">{loadedImage.file.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {loadedImage.width} x {loadedImage.height}，{formatBytes(loadedImage.file.size)}
                  </p>
                </div>
                <span className="text-sm text-muted">输出 {outputSize.width} x {outputSize.height}</span>
              </div>

              <div className="panel overflow-hidden bg-[var(--color-surface-subtle)] p-3 text-center">
                <div className="relative inline-block max-w-full overflow-hidden rounded-md bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="待裁剪图片预览"
                    className="block max-h-[440px] max-w-full object-contain"
                    src={loadedImage.url}
                  />
                  {cropStyle ? (
                    <div
                      className="pointer-events-none absolute border-2 border-[var(--color-accent)]"
                      style={{
                        ...cropStyle,
                        boxShadow: "0 0 0 9999px rgb(0 0 0 / 48%)"
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="muted-panel p-5 text-sm text-muted">还没有选择图片。</div>
          )}

          <div className="space-y-3">
            <h2 className="panel-title">常用尺寸</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[...presets, customPreset].map((preset) => (
                <button
                  className={`choice-card ${presetId === preset.id ? "choice-card-active" : ""}`}
                  disabled={isLoading || isExporting}
                  key={preset.id}
                  onClick={() => {
                    clearOutputState();
                    setPresetId(preset.id);
                    resetCropControls();
                  }}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-[var(--color-text)]">{preset.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          {presetId === "custom" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="image-crop-width">
                  宽度
                </label>
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm"
                  disabled={isLoading || isExporting}
                  id="image-crop-width"
                  min={64}
                  max={4096}
                  onChange={(event) => {
                    clearOutputState();
                    setCustomWidth(event.target.value);
                    resetCropControls();
                  }}
                  step={1}
                  type="number"
                  value={customWidth}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="image-crop-height">
                  高度
                </label>
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm"
                  disabled={isLoading || isExporting}
                  id="image-crop-height"
                  min={64}
                  max={4096}
                  onChange={(event) => {
                    clearOutputState();
                    setCustomHeight(event.target.value);
                    resetCropControls();
                  }}
                  step={1}
                  type="number"
                  value={customHeight}
                />
              </div>
            </div>
          ) : null}

          <div className="space-y-3">
            <h2 className="panel-title">裁剪位置</h2>
            <div className="grid gap-3 lg:grid-cols-3">
              <label className="panel p-3 text-sm">
                <span className="font-semibold text-[var(--color-text)]">放大</span>
                <input
                  className="mt-3 w-full accent-[var(--color-accent)]"
                  disabled={!loadedImage || isLoading || isExporting}
                  max={3}
                  min={1}
                  onChange={(event) => {
                    clearOutputState();
                    setZoom(Number(event.target.value));
                  }}
                  step={0.05}
                  type="range"
                  value={zoom}
                />
                <span className="mt-1 block text-xs text-muted">{zoom.toFixed(2)}x</span>
              </label>
              <label className="panel p-3 text-sm">
                <span className="font-semibold text-[var(--color-text)]">左右</span>
                <input
                  className="mt-3 w-full accent-[var(--color-accent)]"
                  disabled={!loadedImage || isLoading || isExporting}
                  max={100}
                  min={-100}
                  onChange={(event) => {
                    clearOutputState();
                    setPositionX(Number(event.target.value));
                  }}
                  step={1}
                  type="range"
                  value={positionX}
                />
                <span className="mt-1 block text-xs text-muted">{positionX}</span>
              </label>
              <label className="panel p-3 text-sm">
                <span className="font-semibold text-[var(--color-text)]">上下</span>
                <input
                  className="mt-3 w-full accent-[var(--color-accent)]"
                  disabled={!loadedImage || isLoading || isExporting}
                  max={100}
                  min={-100}
                  onChange={(event) => {
                    clearOutputState();
                    setPositionY(Number(event.target.value));
                  }}
                  step={1}
                  type="range"
                  value={positionY}
                />
                <span className="mt-1 block text-xs text-muted">{positionY}</span>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="panel-title">输出格式</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(formatLabels) as OutputFormat[]).map((item) => (
                <button
                  className={`choice-card ${format === item ? "choice-card-active" : ""}`}
                  disabled={isLoading || isExporting}
                  key={item}
                  onClick={() => {
                    clearOutputState();
                    setFormat(item);
                  }}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-[var(--color-text)]">{formatLabels[item]}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {item === "image/jpeg"
                      ? "文件较小，白底"
                      : item === "image/png"
                        ? "保留透明"
                        : "体积更轻"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {loadedImage
                ? `将导出 ${outputSize.width} x ${outputSize.height} ${formatLabels[format]}`
                : "先上传 1 张图片"}
            </p>
            <button
              className="button-accent"
              disabled={isLoading || isExporting || !loadedImage}
              onClick={exportImage}
              type="button"
            >
              <Crop aria-hidden="true" className="h-4 w-4" />
              {isExporting ? "导出中..." : "导出图片"}
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

        <aside className="space-y-5">
          <div className="panel panel-padded">
            <h2 className="section-title text-lg">结果</h2>
            {result ? (
              <div className="mt-4 space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="裁剪结果预览"
                  className="max-h-80 w-full rounded-md border border-[var(--color-border)] bg-white object-contain"
                  src={result.url}
                />
                <div className="space-y-2 text-sm text-muted">
                  <div>
                    尺寸：{result.width} x {result.height}
                  </div>
                  <div>文件体积：{formatBytes(result.sizeBytes)}</div>
                  <div>格式：{formatLabels[result.format]}</div>
                </div>
                <a className="button-primary w-full" download={result.filename} href={result.url}>
                  <Download aria-hidden="true" className="h-4 w-4" />
                  下载图片
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">导出完成后会在这里下载图片。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单张图片最大 {tool.maxFileSizeMbFree} MB。</p>
              <p>支持 JPG、PNG、WebP 输入和输出。</p>
              <p>全程在浏览器本地生成图片。</p>
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
