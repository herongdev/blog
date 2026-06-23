"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Crop,
  Download,
  Minus,
  RotateCcw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Cropper,
  type Coordinates,
  type CropperRef,
} from "react-advanced-cropper";
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
  aspectRatio?: number;
  width?: number;
  height?: number;
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
    id: "free",
    label: "自由比例",
    description: "拖动边角，自由调整裁剪框",
  },
  {
    id: "avatar",
    label: "头像方图",
    description: "1:1，512 x 512",
    aspectRatio: 1,
    width: 512,
    height: 512,
  },
  {
    id: "form-square",
    label: "表单上传",
    description: "1:1，800 x 800",
    aspectRatio: 1,
    width: 800,
    height: 800,
  },
  {
    id: "id-one-inch",
    label: "一寸证件照",
    description: "295 x 413",
    aspectRatio: 295 / 413,
    width: 295,
    height: 413,
  },
  {
    id: "id-two-inch",
    label: "二寸证件照",
    description: "413 x 579",
    aspectRatio: 413 / 579,
    width: 413,
    height: 579,
  },
  {
    id: "cover-wide",
    label: "横版封面",
    description: "16:9，1280 x 720",
    aspectRatio: 16 / 9,
    width: 1280,
    height: 720,
  },
  {
    id: "social",
    label: "分享封面",
    description: "1200 x 630",
    aspectRatio: 1200 / 630,
    width: 1200,
    height: 630,
  },
  {
    id: "story",
    label: "竖版封面",
    description: "9:16，1080 x 1920",
    aspectRatio: 9 / 16,
    width: 1080,
    height: 1920,
  },
  {
    id: "document",
    label: "竖版材料",
    description: "3:4，900 x 1200",
    aspectRatio: 3 / 4,
    width: 900,
    height: 1200,
  },
];

const formatLabels: Record<OutputFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
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
      file.type === "application/octet-stream" ||
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

function encodeCanvas(
  canvas: HTMLCanvasElement,
  format: OutputFormat,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              `${formatLabels[format]} 导出失败，当前浏览器可能不支持该格式。`,
            ),
          );
          return;
        }

        resolve(blob);
      },
      format,
      format === "image/png" ? undefined : 0.9,
    );
  });
}

function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片读取失败。"));
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
      height: image.naturalHeight,
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventType,
      toolId: "image-crop",
      toolSlug: "image-crop",
      path: "/tools/image-crop",
      detail,
    }),
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => undefined);
}

export function ImageCropTool({ tool }: { tool: ToolDefinition }) {
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null);
  const [presetId, setPresetId] = useState("free");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [editorOpen, setEditorOpen] = useState(false);
  const [cropperVersion, setCropperVersion] = useState(0);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const imageRef = useRef<LoadedImage | null>(null);
  const resultRef = useRef<GeneratedImage | null>(null);
  const cropperRef = useRef<CropperRef>(null);

  const relatedTools = getRelatedTools(tool);
  const selectedPreset = useMemo(
    () => presets.find((preset) => preset.id === presetId) ?? presets[0]!,
    [presetId],
  );
  const outputSize =
    selectedPreset.width && selectedPreset.height
      ? `${selectedPreset.width} x ${selectedPreset.height}`
      : coordinates
        ? `${Math.round(coordinates.width)} x ${Math.round(coordinates.height)}`
        : "按裁剪框";

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

  function resetEditor() {
    setCoordinates(null);
    setCropperVersion((current) => current + 1);
  }

  async function addFile(fileList: FileList | File[]) {
    const file = Array.from(fileList)[0];
    if (!file) return;

    setError("");
    clearResult();

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    if (!isSupportedImage(file)) {
      setError("请选择 JPG、PNG 或 WebP 图片。");
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
      detail: file.name,
    });

    try {
      const image = await readImage(file);
      if (imageRef.current?.url) URL.revokeObjectURL(imageRef.current.url);
      setLoadedImage(image);
      setPresetId("free");
      resetEditor();
      setEditorOpen(true);
      setProgress({
        percent: 100,
        stage: "读取完成",
        detail: `${image.width} x ${image.height}，可以开始裁剪。`,
      });
    } catch (caught) {
      setLoadedImage(null);
      setProgress(null);
      setError(caught instanceof Error ? caught.message : "图片读取失败。");
    } finally {
      setIsLoading(false);
    }
  }

  function selectPreset(nextPresetId: string) {
    clearOutputState();
    setPresetId(nextPresetId);
    resetEditor();
  }

  function zoomImage(factor: number) {
    cropperRef.current?.zoomImage(factor, {
      immediately: true,
      normalize: true,
      transitions: true,
    });
  }

  function rotateImage(angle: number) {
    cropperRef.current?.rotateImage(angle, {
      immediately: true,
      normalize: true,
      transitions: true,
    });
  }

  function resetCropper() {
    clearOutputState();
    cropperRef.current?.reset();
    resetEditor();
  }

  async function exportImage() {
    if (!loadedImage) {
      setError("先选择一张图片。");
      return;
    }

    const cropper = cropperRef.current;
    if (!cropper) {
      setError("裁剪框还没有准备好，请稍等一下。");
      return;
    }

    setIsExporting(true);
    setError("");
    clearResult();
    setProgress({
      percent: 12,
      stage: "准备导出",
      detail: `${outputSize}，${formatLabels[format]}`,
    });
    sendAnalytics(
      "tool_use_attempt",
      `preset=${selectedPreset.id};format=${formatLabels[format]};size=${outputSize}`,
    );

    try {
      const canvas = cropper.getCanvas({
        width: selectedPreset.width,
        height: selectedPreset.height,
        fillColor: format === "image/jpeg" ? "#ffffff" : undefined,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      });

      if (!canvas) {
        throw new Error("裁剪区域还没有准备好。");
      }

      setProgress({
        percent: 76,
        stage: "生成文件",
        detail: `正在导出 ${formatLabels[format]}。`,
      });

      const blob = await encodeCanvas(canvas, format);
      const nextResult = {
        url: URL.createObjectURL(blob),
        filename: outputFilename(loadedImage.file.name, format),
        sizeBytes: blob.size,
        width: canvas.width,
        height: canvas.height,
        format,
      };

      resultRef.current = nextResult;
      setResult(nextResult);
      setProgress({
        percent: 100,
        stage: "裁剪完成",
        detail: "图片已生成，可以下载。",
      });
      sendAnalytics(
        "tool_use_success",
        `preset=${selectedPreset.id};format=${formatLabels[format]};size=${blob.size}`,
      );
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "图片裁剪失败，请换一张图片试试。";
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
            上传图片后，在裁剪窗口里拖动裁剪框，选择自由比例、头像、证件照或封面尺寸。
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
            <label
              className="block text-sm font-semibold text-[var(--color-text)]"
              htmlFor="image-crop-file"
            >
              上传或拖入图片
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
              支持 JPG、PNG、WebP。图片只在浏览器本地处理。
            </p>
          </div>

          {loadedImage ? (
            <div className="panel p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="panel-title truncate">
                    {loadedImage.file.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    原图 {loadedImage.width} x {loadedImage.height}，
                    {formatBytes(loadedImage.file.size)}
                  </p>
                </div>
                <button
                  className="button-accent shrink-0"
                  onClick={() => setEditorOpen(true)}
                  type="button"
                >
                  <Crop aria-hidden="true" className="h-4 w-4" />
                  打开裁剪
                </button>
              </div>
            </div>
          ) : (
            <div className="muted-panel p-5 text-sm text-muted">
              先选择一张图片，随后会自动打开裁剪窗口。
            </div>
          )}

          {progress ? (
            <div className="panel p-4" aria-live="polite">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-[var(--color-text)]">
                  {progress.stage}
                </span>
                <span className="text-muted">{progress.percent}%</span>
              </div>
              <div className="progress-rail mt-3">
                <div
                  className="progress-bar"
                  style={{ width: `${progress.percent}%` }}
                />
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
                <a
                  className="button-primary w-full"
                  download={result.filename}
                  href={result.url}
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  下载图片
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">
                导出完成后会在这里预览和下载。
              </p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">支持范围</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单张图片最大 {tool.maxFileSizeMbFree} MB。</p>
              <p>支持 JPG、PNG、WebP 输入和输出。</p>
              <p>图片只在浏览器本地生成。</p>
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

      {loadedImage && editorOpen ? (
        <div
          aria-labelledby="image-crop-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/60 p-0 sm:p-4"
          role="dialog"
        >
          <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden bg-[var(--color-surface)] shadow-2xl sm:h-[min(92vh,920px)] sm:rounded-md">
            <div className="flex min-h-16 items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 sm:px-5">
              <div className="min-w-0">
                <h2
                  className="truncate text-base font-semibold text-[var(--color-text)]"
                  id="image-crop-dialog-title"
                >
                  裁剪图片
                </h2>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {loadedImage.file.name}
                </p>
              </div>
              <button
                aria-label="关闭裁剪窗口"
                className="icon-button"
                onClick={() => setEditorOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <div className="grid min-h-0 min-w-0 flex-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-h-[420px] min-w-0 overflow-hidden bg-[#0b1112] lg:min-h-0">
                <Cropper
                  className="h-full min-h-[420px] w-full"
                  key={`${loadedImage.url}-${presetId}-${cropperVersion}`}
                  onChange={(cropper) =>
                    setCoordinates(cropper.getCoordinates({ round: true }))
                  }
                  ref={cropperRef}
                  src={loadedImage.url}
                  stencilProps={{
                    aspectRatio: selectedPreset.aspectRatio,
                    grid: true,
                  }}
                  transitions
                />
              </div>

              <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-y-auto border-t border-[var(--color-border)] p-4 lg:border-l lg:border-t-0">
                <label className="min-w-0 text-sm font-semibold text-[var(--color-text)]">
                  裁剪比例和尺寸
                  <select
                    className="input-control mt-2 w-full min-w-0 px-3 py-2 text-sm font-normal"
                    disabled={isExporting}
                    onChange={(event) => selectPreset(event.target.value)}
                    value={presetId}
                  >
                    {presets.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.label} · {preset.description}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid min-w-0 grid-cols-2 gap-2">
                  <button
                    className="button-muted min-w-0"
                    disabled={isExporting}
                    onClick={() => zoomImage(1.12)}
                    type="button"
                  >
                    <ZoomIn aria-hidden="true" className="h-4 w-4" />
                    放大
                  </button>
                  <button
                    className="button-muted min-w-0"
                    disabled={isExporting}
                    onClick={() => zoomImage(0.88)}
                    type="button"
                  >
                    <ZoomOut aria-hidden="true" className="h-4 w-4" />
                    缩小
                  </button>
                  <button
                    className="button-muted min-w-0"
                    disabled={isExporting}
                    onClick={() => rotateImage(-90)}
                    type="button"
                  >
                    <RotateCcw aria-hidden="true" className="h-4 w-4" />
                    左转
                  </button>
                  <button
                    className="button-muted min-w-0"
                    disabled={isExporting}
                    onClick={() => rotateImage(90)}
                    type="button"
                  >
                    <RotateCw aria-hidden="true" className="h-4 w-4" />
                    右转
                  </button>
                </div>

                <button
                  className="button-muted w-full"
                  disabled={isExporting}
                  onClick={resetCropper}
                  type="button"
                >
                  <Minus aria-hidden="true" className="h-4 w-4" />
                  重置裁剪
                </button>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-[var(--color-text)]">
                    输出格式
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(formatLabels) as OutputFormat[]).map(
                      (item) => (
                        <button
                          className={`chip ${format === item ? "chip-active" : "chip-idle"}`}
                          disabled={isExporting}
                          key={item}
                          onClick={() => {
                            clearOutputState();
                            setFormat(item);
                          }}
                          type="button"
                        >
                          {formatLabels[item]}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="muted-panel p-3 text-sm leading-6 text-muted">
                  <p>输出：{outputSize}</p>
                  <p>
                    {selectedPreset.id === "free"
                      ? "自由比例会按裁剪框实际大小导出。"
                      : selectedPreset.description}
                  </p>
                </div>

                {result ? (
                  <a
                    className="button-primary w-full"
                    download={result.filename}
                    href={result.url}
                  >
                    <Download aria-hidden="true" className="h-4 w-4" />
                    下载图片
                  </a>
                ) : null}

                <div className="mt-auto flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
                  <button
                    className="button-accent w-full"
                    disabled={isExporting}
                    onClick={exportImage}
                    type="button"
                  >
                    <Crop aria-hidden="true" className="h-4 w-4" />
                    {isExporting ? "导出中..." : "导出图片"}
                  </button>
                  <button
                    className="button-muted w-full"
                    onClick={() => setEditorOpen(false)}
                    type="button"
                  >
                    完成
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
