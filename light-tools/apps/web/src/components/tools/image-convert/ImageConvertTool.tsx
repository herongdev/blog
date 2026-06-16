"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, RefreshCw } from "lucide-react";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type OutputFormat = "png" | "jpeg" | "webp" | "ico";
type FitMode = "cover" | "contain";

interface SourceImage {
  file: File;
  url: string;
  width: number;
  height: number;
  sourceKind: string;
}

interface ScenePreset {
  id: string;
  label: string;
  description: string;
  width: number;
  height: number;
  format: OutputFormat;
  fitMode: FitMode;
  icoSizes?: number[];
}

interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GeneratedResult {
  downloadUrl: string;
  previewUrl: string;
  filename: string;
  sizeBytes: number;
  detail: string;
  format: OutputFormat;
}

interface ProgressState {
  percent: number;
  stage: string;
  detail: string;
}

interface IcoEntry {
  size: number;
  blob: Blob;
}

const scenePresets: ScenePreset[] = [
  {
    id: "original",
    label: "保持原尺寸",
    description: "只转换格式",
    width: 0,
    height: 0,
    format: "png",
    fitMode: "contain"
  },
  {
    id: "favicon",
    label: "网站 favicon",
    description: "ICO 多尺寸",
    width: 256,
    height: 256,
    format: "ico",
    fitMode: "cover",
    icoSizes: [16, 32, 48, 64, 128, 256]
  },
  {
    id: "avatar",
    label: "头像方图",
    description: "512 x 512",
    width: 512,
    height: 512,
    format: "png",
    fitMode: "cover"
  },
  {
    id: "app-icon",
    label: "App 图标",
    description: "1024 x 1024",
    width: 1024,
    height: 1024,
    format: "png",
    fitMode: "cover"
  },
  {
    id: "logo",
    label: "网站 Logo",
    description: "512 x 512 留边",
    width: 512,
    height: 512,
    format: "png",
    fitMode: "contain"
  },
  {
    id: "social",
    label: "社交分享图",
    description: "1200 x 630",
    width: 1200,
    height: 630,
    format: "jpeg",
    fitMode: "cover"
  },
  {
    id: "cover",
    label: "文章封面",
    description: "1280 x 720",
    width: 1280,
    height: 720,
    format: "jpeg",
    fitMode: "cover"
  },
  {
    id: "product",
    label: "商品主图",
    description: "800 x 800 留边",
    width: 800,
    height: 800,
    format: "jpeg",
    fitMode: "contain"
  },
  {
    id: "form",
    label: "表单上传",
    description: "800 x 800",
    width: 800,
    height: 800,
    format: "jpeg",
    fitMode: "contain"
  },
  {
    id: "custom",
    label: "自定义尺寸",
    description: "手动输入宽高",
    width: 512,
    height: 512,
    format: "png",
    fitMode: "cover"
  }
];

const formatLabels: Record<OutputFormat, string> = {
  png: "PNG",
  jpeg: "JPG",
  webp: "WebP",
  ico: "ICO"
};

const formatMimeTypes: Record<Exclude<OutputFormat, "ico">, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp"
};

const supportedExtensions = [
  ".heic",
  ".heif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp"
];

const selectableIcoSizes = [16, 24, 32, 48, 64, 128, 256];

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "-";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function basename(name: string): string {
  return name.replace(/\.[^.]+$/, "") || "image";
}

function isSupportedInput(file: File): boolean {
  const name = file.name.toLowerCase();
  const hasSupportedExtension = supportedExtensions.some((extension) => name.endsWith(extension));
  const hasSupportedMime =
    file.type === "" ||
    file.type === "application/octet-stream" ||
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "image/gif" ||
    file.type === "image/bmp";

  return hasSupportedExtension && hasSupportedMime;
}

async function detectSourceKind(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  const header = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "JPG";
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "PNG";
  }
  if (header.startsWith("RIFF") && header.slice(8, 12) === "WEBP") return "WebP";
  if (header.startsWith("GIF87a") || header.startsWith("GIF89a")) return "GIF";
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) return "BMP";
  if (
    header.slice(4, 8) === "ftyp" &&
    ["heic", "heix", "hevc", "hevx", "mif1", "msf1", "heim", "heis", "hevm", "hevs"].some(
      (brand) => header.includes(brand)
    )
  ) {
    return "HEIC";
  }

  throw new Error("文件内容不是支持的图片格式。");
}

function isHeicKind(kind: string): boolean {
  return kind === "HEIC";
}

function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片解码失败，当前浏览器可能不支持这个文件。"));
    image.src = url;
  });
}

async function decodeSourceImage(file: File): Promise<SourceImage> {
  const sourceKind = await detectSourceKind(file);
  let url = "";

  if (isHeicKind(sourceKind)) {
    const { default: heic2any } = await import("heic2any");
    const converted = await heic2any({
      blob: file,
      toType: "image/png",
      quality: 0.92
    });
    const convertedBlob = Array.isArray(converted) ? converted[0] : converted;

    if (!convertedBlob) {
      throw new Error("HEIC 解码失败，请换一张图片试试。");
    }

    url = URL.createObjectURL(convertedBlob);
  } else {
    url = URL.createObjectURL(file);
  }

  try {
    const image = await loadHtmlImage(url);

    return {
      file,
      url,
      width: image.naturalWidth,
      height: image.naturalHeight,
      sourceKind
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

function getOutputSize(source: SourceImage | null, preset: ScenePreset, width: string, height: string) {
  if (preset.id === "original" && source) {
    return {
      width: source.width,
      height: source.height
    };
  }

  if (preset.id !== "custom") {
    return {
      width: preset.width,
      height: preset.height
    };
  }

  const parsedWidth = Number(width);
  const parsedHeight = Number(height);

  if (!Number.isInteger(parsedWidth) || !Number.isInteger(parsedHeight)) {
    throw new Error("自定义宽高必须是整数。");
  }

  if (parsedWidth < 16 || parsedHeight < 16 || parsedWidth > 4096 || parsedHeight > 4096) {
    throw new Error("自定义宽高请设置在 16 到 4096 像素之间。");
  }

  return {
    width: parsedWidth,
    height: parsedHeight
  };
}

function getCoverCropRect(
  sourceWidth: number,
  sourceHeight: number,
  outputWidth: number,
  outputHeight: number,
  zoom: number,
  positionX: number,
  positionY: number
): CropRect {
  const sourceRatio = sourceWidth / sourceHeight;
  const outputRatio = outputWidth / outputHeight;
  let baseWidth = sourceWidth;
  let baseHeight = sourceHeight;

  if (sourceRatio > outputRatio) {
    baseHeight = sourceHeight;
    baseWidth = sourceHeight * outputRatio;
  } else {
    baseWidth = sourceWidth;
    baseHeight = sourceWidth / outputRatio;
  }

  const cropWidth = clamp(baseWidth / zoom, 1, sourceWidth);
  const cropHeight = clamp(baseHeight / zoom, 1, sourceHeight);
  const maxX = Math.max(0, sourceWidth - cropWidth);
  const maxY = Math.max(0, sourceHeight - cropHeight);

  return {
    x: Math.round(maxX * ((positionX + 100) / 200)),
    y: Math.round(maxY * ((positionY + 100) / 200)),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight)
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("图片导出失败，当前浏览器可能不支持这个输出格式。"));
          return;
        }

        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

function renderCanvas(
  image: HTMLImageElement,
  outputWidth: number,
  outputHeight: number,
  fitMode: FitMode,
  fillWhite: boolean,
  zoom: number,
  positionX: number,
  positionY: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器无法创建图片画布。");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.clearRect(0, 0, outputWidth, outputHeight);

  if (fillWhite) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, outputWidth, outputHeight);
  }

  if (fitMode === "cover") {
    const cropRect = getCoverCropRect(
      image.naturalWidth,
      image.naturalHeight,
      outputWidth,
      outputHeight,
      zoom,
      positionX,
      positionY
    );

    context.drawImage(
      image,
      cropRect.x,
      cropRect.y,
      cropRect.width,
      cropRect.height,
      0,
      0,
      outputWidth,
      outputHeight
    );
    return canvas;
  }

  const scale = Math.min(outputWidth / image.naturalWidth, outputHeight / image.naturalHeight);
  const drawWidth = Math.round(image.naturalWidth * scale);
  const drawHeight = Math.round(image.naturalHeight * scale);
  const drawX = Math.round((outputWidth - drawWidth) / 2);
  const drawY = Math.round((outputHeight - drawHeight) / 2);
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  return canvas;
}

async function createIcoBlob(items: IcoEntry[]): Promise<Blob> {
  const pngBytes = await Promise.all(
    items.map(async (item) => ({
      size: item.size,
      bytes: new Uint8Array(await item.blob.arrayBuffer())
    }))
  );
  const headerSize = 6;
  const entrySize = 16;
  const totalSize =
    headerSize +
    entrySize * pngBytes.length +
    pngBytes.reduce((sum, item) => sum + item.bytes.byteLength, 0);
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, pngBytes.length, true);

  let imageOffset = headerSize + entrySize * pngBytes.length;
  for (const [index, item] of pngBytes.entries()) {
    const offset = headerSize + entrySize * index;
    const size = item.size;
    view.setUint8(offset, size >= 256 ? 0 : size);
    view.setUint8(offset + 1, size >= 256 ? 0 : size);
    view.setUint8(offset + 2, 0);
    view.setUint8(offset + 3, 0);
    view.setUint16(offset + 4, 1, true);
    view.setUint16(offset + 6, 32, true);
    view.setUint32(offset + 8, item.bytes.byteLength, true);
    view.setUint32(offset + 12, imageOffset, true);
    bytes.set(item.bytes, imageOffset);
    imageOffset += item.bytes.byteLength;
  }

  return new Blob([buffer], { type: "image/x-icon" });
}

function replaceExtension(name: string, format: OutputFormat): string {
  if (format === "jpeg") return `${basename(name)}.jpg`;
  return `${basename(name)}.${format}`;
}

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "image-convert",
      toolSlug: "image-convert",
      path: "/tools/image-convert",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

export function ImageConvertTool({ tool }: { tool: ToolDefinition }) {
  const [source, setSource] = useState<SourceImage | null>(null);
  const [presetId, setPresetId] = useState("favicon");
  const [format, setFormat] = useState<OutputFormat>("ico");
  const [fitMode, setFitMode] = useState<FitMode>("cover");
  const [customWidth, setCustomWidth] = useState("512");
  const [customHeight, setCustomHeight] = useState("512");
  const [quality, setQuality] = useState(0.9);
  const [zoom, setZoom] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [icoSizes, setIcoSizes] = useState([16, 32, 48, 64, 128, 256]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const sourceRef = useRef<SourceImage | null>(null);
  const resultRef = useRef<GeneratedResult | null>(null);

  const selectedPreset = scenePresets.find((preset) => preset.id === presetId) ?? scenePresets[0]!;
  const relatedTools = getRelatedTools(tool);

  const outputSize = useMemo(() => {
    try {
      return getOutputSize(source, selectedPreset, customWidth, customHeight);
    } catch {
      return {
        width: selectedPreset.width || 512,
        height: selectedPreset.height || 512
      };
    }
  }, [customHeight, customWidth, selectedPreset, source]);

  const cropStyle =
    source && fitMode === "cover"
      ? (() => {
          const cropRect = getCoverCropRect(
            source.width,
            source.height,
            outputSize.width,
            outputSize.height,
            zoom,
            positionX,
            positionY
          );

          return {
            left: `${(cropRect.x / source.width) * 100}%`,
            top: `${(cropRect.y / source.height) * 100}%`,
            width: `${(cropRect.width / source.width) * 100}%`,
            height: `${(cropRect.height / source.height) * 100}%`
          };
        })()
      : undefined;

  useEffect(() => {
    sourceRef.current = source;
  }, [source]);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  useEffect(() => {
    return () => {
      if (sourceRef.current?.url) URL.revokeObjectURL(sourceRef.current.url);
      if (resultRef.current?.downloadUrl) URL.revokeObjectURL(resultRef.current.downloadUrl);
      if (
        resultRef.current?.previewUrl &&
        resultRef.current.previewUrl !== resultRef.current.downloadUrl
      ) {
        URL.revokeObjectURL(resultRef.current.previewUrl);
      }
    };
  }, []);

  function clearResult() {
    if (resultRef.current?.downloadUrl) URL.revokeObjectURL(resultRef.current.downloadUrl);
    if (
      resultRef.current?.previewUrl &&
      resultRef.current.previewUrl !== resultRef.current.downloadUrl
    ) {
      URL.revokeObjectURL(resultRef.current.previewUrl);
    }
    resultRef.current = null;
    setResult(null);
  }

  function clearOutputState() {
    clearResult();
    setProgress(null);
    setError("");
  }

  function applyPreset(preset: ScenePreset) {
    clearOutputState();
    setPresetId(preset.id);
    setFormat(preset.format);
    setFitMode(preset.fitMode);
    setCustomWidth(String(preset.width || 512));
    setCustomHeight(String(preset.height || 512));
    setZoom(1);
    setPositionX(0);
    setPositionY(0);
    if (preset.icoSizes) setIcoSizes(preset.icoSizes);
  }

  async function addFile(fileList: FileList | File[]) {
    const file = Array.from(fileList)[0];
    if (!file) return;

    setError("");
    clearResult();
    setProgress(null);

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    if (!isSupportedInput(file)) {
      setError("支持 HEIC、HEIF、JPG、PNG、WebP、GIF、BMP 图片。");
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
      const decoded = await decodeSourceImage(file);
      if (sourceRef.current?.url) URL.revokeObjectURL(sourceRef.current.url);
      setSource(decoded);
      setZoom(1);
      setPositionX(0);
      setPositionY(0);
      setProgress({
        percent: 100,
        stage: "读取完成",
        detail: `${decoded.sourceKind}，${decoded.width} x ${decoded.height}`
      });
    } catch (caught) {
      setSource(null);
      setProgress(null);
      setError(caught instanceof Error ? caught.message : "图片读取失败。");
    } finally {
      setIsLoading(false);
    }
  }

  function toggleIcoSize(size: number) {
    clearOutputState();
    setIcoSizes((current) => {
      if (current.includes(size)) {
        return current.filter((item) => item !== size);
      }

      return [...current, size].sort((a, b) => a - b);
    });
  }

  async function exportImage() {
    if (!source) {
      setError("请先选择图片。");
      return;
    }

    if (format === "ico" && icoSizes.length === 0) {
      setError("请至少选择一个 ICO 尺寸。");
      return;
    }

    setIsExporting(true);
    setError("");
    clearResult();
    setProgress({
      percent: 10,
      stage: "准备导出",
      detail: `${formatLabels[format]}，${fitMode === "cover" ? "裁剪填满" : "完整留边"}`
    });
    sendAnalytics(
      "tool_use_attempt",
      `format=${format};preset=${presetId};size=${outputSize.width}x${outputSize.height}`
    );

    try {
      const image = await loadHtmlImage(source.url);
      const fillWhite = format === "jpeg";

      if (format === "ico") {
        const sizes = [...icoSizes].sort((a, b) => a - b);
        const icoEntries: IcoEntry[] = [];
        let previewUrl = "";

        for (const [index, size] of sizes.entries()) {
          setProgress({
            percent: Math.round(20 + (index / sizes.length) * 55),
            stage: "生成图标尺寸",
            detail: `${size} x ${size}`
          });
          const canvas = renderCanvas(image, size, size, fitMode, false, zoom, positionX, positionY);
          const blob = await canvasToBlob(canvas, "image/png");
          icoEntries.push({ size, blob });
          if (index === sizes.length - 1) {
            previewUrl = URL.createObjectURL(blob);
          }
        }

        setProgress({
          percent: 88,
          stage: "打包 ICO",
          detail: sizes.join(" / ")
        });

        const icoBlob = await createIcoBlob(icoEntries);
        const nextResult = {
          downloadUrl: URL.createObjectURL(icoBlob),
          previewUrl,
          filename: replaceExtension(source.file.name, "ico"),
          sizeBytes: icoBlob.size,
          detail: `包含 ${sizes.map((size) => `${size}x${size}`).join("、")}`,
          format
        };

        resultRef.current = nextResult;
        setResult(nextResult);
        setProgress({
          percent: 100,
          stage: "转换完成",
          detail: "ICO 文件已生成，可以下载。"
        });
        sendAnalytics("tool_use_success", `format=ico;size=${icoBlob.size}`);
        return;
      }

      const canvas = renderCanvas(
        image,
        outputSize.width,
        outputSize.height,
        fitMode,
        fillWhite,
        zoom,
        positionX,
        positionY
      );

      setProgress({
        percent: 78,
        stage: "生成文件",
        detail: `${outputSize.width} x ${outputSize.height}`
      });

      const mimeType = formatMimeTypes[format];
      const blob = await canvasToBlob(canvas, mimeType, format === "png" ? undefined : quality);
      const url = URL.createObjectURL(blob);
      const nextResult = {
        downloadUrl: url,
        previewUrl: url,
        filename: replaceExtension(source.file.name, format),
        sizeBytes: blob.size,
        detail: `${outputSize.width} x ${outputSize.height}`,
        format
      };

      resultRef.current = nextResult;
      setResult(nextResult);
      setProgress({
        percent: 100,
        stage: "转换完成",
        detail: "图片已生成，可以下载。"
      });
      sendAnalytics("tool_use_success", `format=${format};size=${blob.size}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "图片转换失败，请换一张图片试试。";
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
            转换 HEIC、HEIF、JPG、PNG、WebP、GIF、BMP，可按常见图标和图片场景调整尺寸。
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
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="image-convert-file">
              选择图片
            </label>
            <input
              accept="image/heic,image/heif,image/jpeg,image/png,image/webp,image/gif,image/bmp,.heic,.heif,.jpg,.jpeg,.png,.webp,.gif,.bmp"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              disabled={isLoading || isExporting}
              id="image-convert-file"
              onChange={(event) => {
                void addFile(event.target.files ?? []);
                event.target.value = "";
              }}
              type="file"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              图片只在浏览器本地处理。HEIC/HEIF 会先解码，再按你的配置导出。
            </p>
          </div>

          {source ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="panel-title truncate">{source.file.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {source.sourceKind}，{source.width} x {source.height}，{formatBytes(source.file.size)}
                  </p>
                </div>
                <span className="text-sm text-muted">
                  输出 {format === "ico" ? "ICO 多尺寸" : `${outputSize.width} x ${outputSize.height}`}
                </span>
              </div>

              <div className="panel overflow-hidden bg-[var(--color-surface-subtle)] p-3 text-center">
                <div className="relative inline-block max-w-full overflow-hidden rounded-md bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="待转换图片预览"
                    className="block max-h-[420px] max-w-full object-contain"
                    src={source.url}
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
            <h2 className="panel-title text-base">场景预设</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {scenePresets.map((preset) => (
                <button
                  className={`choice-card ${presetId === preset.id ? "choice-card-active" : ""}`}
                  disabled={isLoading || isExporting}
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-[var(--color-text)]">{preset.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="panel-title text-base">转换配置</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <div className="text-sm font-semibold text-[var(--color-text)]">输出格式</div>
                <div className="grid gap-2 sm:grid-cols-4">
                  {(Object.keys(formatLabels) as OutputFormat[]).map((item) => (
                    <button
                      className={`choice-card ${format === item ? "choice-card-active" : ""}`}
                      disabled={isLoading || isExporting}
                      key={item}
                      onClick={() => {
                        clearOutputState();
                        setPresetId("custom");
                        setFormat(item);
                      }}
                      type="button"
                    >
                      <span className="text-sm font-semibold">{formatLabels[item]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="text-sm font-semibold text-[var(--color-text)]">尺寸方式</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {([
                    ["cover", "裁剪填满"],
                    ["contain", "完整留边"]
                  ] as const).map(([value, label]) => (
                    <button
                      className={`choice-card ${fitMode === value ? "choice-card-active" : ""}`}
                      disabled={isLoading || isExporting}
                      key={value}
                      onClick={() => {
                        clearOutputState();
                        setPresetId("custom");
                        setFitMode(value);
                      }}
                      type="button"
                    >
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <label className="text-sm font-semibold text-[var(--color-text)]">
                宽度
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  disabled={selectedPreset.id === "original" || isLoading || isExporting}
                  max={4096}
                  min={16}
                  onChange={(event) => {
                    clearOutputState();
                    setPresetId("custom");
                    setCustomWidth(event.target.value);
                  }}
                  type="number"
                  value={selectedPreset.id === "original" && source ? String(source.width) : customWidth}
                />
              </label>
              <label className="text-sm font-semibold text-[var(--color-text)]">
                高度
                <input
                  className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                  disabled={selectedPreset.id === "original" || isLoading || isExporting}
                  max={4096}
                  min={16}
                  onChange={(event) => {
                    clearOutputState();
                    setPresetId("custom");
                    setCustomHeight(event.target.value);
                  }}
                  type="number"
                  value={selectedPreset.id === "original" && source ? String(source.height) : customHeight}
                />
              </label>

              {format !== "png" && format !== "ico" ? (
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  输出质量 {Math.round(quality * 100)}%
                  <input
                    className="mt-4 w-full accent-[var(--color-accent)]"
                    disabled={isLoading || isExporting}
                    max={0.95}
                    min={0.35}
                    onChange={(event) => {
                      clearOutputState();
                      setQuality(Number(event.target.value));
                    }}
                    step={0.01}
                    type="range"
                    value={quality}
                  />
                </label>
              ) : null}

              {format === "ico" ? (
                <div className="space-y-2 sm:col-span-2">
                  <div className="text-sm font-semibold text-[var(--color-text)]">ICO 包含尺寸</div>
                  <div className="flex flex-wrap gap-2">
                    {selectableIcoSizes.map((size) => (
                      <button
                        className={`chip ${icoSizes.includes(size) ? "chip-active" : "chip-idle"}`}
                        disabled={isLoading || isExporting}
                        key={size}
                        onClick={() => toggleIcoSize(size)}
                        type="button"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {fitMode === "cover" ? (
            <div className="space-y-3">
              <h2 className="panel-title">裁剪位置</h2>
              <div className="grid gap-3 lg:grid-cols-3">
                <label className="panel p-3 text-sm">
                  <span className="font-semibold text-[var(--color-text)]">放大</span>
                  <input
                    className="mt-3 w-full accent-[var(--color-accent)]"
                    disabled={!source || isLoading || isExporting}
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
                    disabled={!source || isLoading || isExporting}
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
                    disabled={!source || isLoading || isExporting}
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
          ) : null}

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              输出：{formatLabels[format]}，
              {format === "ico" ? icoSizes.map((size) => `${size}x${size}`).join(" / ") : `${outputSize.width} x ${outputSize.height}`}
            </p>
            <button
              className="button-accent"
              disabled={isLoading || isExporting || !source}
              onClick={exportImage}
              type="button"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              {isExporting ? "转换中..." : "开始转换"}
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
            <h2 className="section-title text-lg">结果</h2>
            {result ? (
              <div className="mt-4 space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="转换结果预览"
                  className="max-h-80 w-full rounded-md border border-[var(--color-border)] bg-white object-contain"
                  src={result.previewUrl}
                />
                <div className="space-y-2 text-sm text-muted">
                  <div>格式：{formatLabels[result.format]}</div>
                  <div>参数：{result.detail}</div>
                  <div>文件体积：{formatBytes(result.sizeBytes)}</div>
                </div>
                <a className="button-primary w-full" download={result.filename} href={result.downloadUrl}>
                  <Download aria-hidden="true" className="h-4 w-4" />
                  下载文件
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">转换完成后会在这里预览和下载。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单张图片最大 {tool.maxFileSizeMbFree} MB。</p>
              <p>支持 HEIC、HEIF、JPG、PNG、WebP、GIF、BMP 输入。</p>
              <p>可导出 PNG、JPG、WebP 和 favicon.ico。</p>
              <p>全程在浏览器本地处理，不上传服务器。</p>
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
