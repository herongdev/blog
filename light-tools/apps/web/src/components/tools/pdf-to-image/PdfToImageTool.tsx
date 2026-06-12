"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, Images } from "lucide-react";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type PdfJsModule = typeof import("pdfjs-dist");
type PdfDocumentProxy = Awaited<ReturnType<PdfJsModule["getDocument"]>["promise"]>;
type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface LoadedPdf {
  file: File;
  bytes: Uint8Array;
  pageCount: number;
}

interface RenderedImage {
  id: string;
  url: string;
  filename: string;
  pageNumber: number;
  width: number;
  height: number;
  sizeBytes: number;
  format: OutputFormat;
}

interface ProgressState {
  percent: number;
  stage: string;
  detail: string;
}

interface QualityPreset {
  id: string;
  label: string;
  description: string;
  scale: number;
}

const formatLabels: Record<OutputFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP"
};

const qualityPresets: QualityPreset[] = [
  {
    id: "standard",
    label: "标准",
    description: "适合聊天和普通预览",
    scale: 1.25
  },
  {
    id: "clear",
    label: "清晰",
    description: "适合表单上传和打印预览",
    scale: 1.75
  },
  {
    id: "high",
    label: "高清",
    description: "适合保留更多细节",
    scale: 2.4
  }
];

let pdfJsPromise: Promise<PdfJsModule> | null = null;

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "-";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function isSupportedPdf(file: File): boolean {
  const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");

  return (
    hasPdfExtension &&
    (file.type === "" || file.type === "application/pdf" || file.type === "application/octet-stream")
  );
}

async function hasPdfHeader(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  const header = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return header === "%PDF-";
}

async function loadPdfJs(): Promise<PdfJsModule> {
  if (!pdfJsPromise) {
    pdfJsPromise = import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.mjs",
        import.meta.url
      ).toString();
      return pdfjs;
    });
  }

  return pdfJsPromise;
}

function fileExtension(format: OutputFormat): string {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/png") return "png";
  return "webp";
}

function getBaseName(name: string) {
  return name.replace(/\.[^.]+$/, "") || "document";
}

function outputFilename(name: string, pageNumber: number, format: OutputFormat): string {
  return `${getBaseName(name)}-page-${String(pageNumber).padStart(3, "0")}.${fileExtension(format)}`;
}

function parsePageRange(input: string, pageCount: number): number[] {
  const normalized = input.replace(/[，、；;]/g, ",").replace(/\s+/g, "");

  if (!normalized) {
    throw new Error("请输入页码范围，例如 1-3,5,8-10。");
  }

  const parts = normalized.split(",").filter(Boolean);
  const pages: number[] = [];
  const seen = new Set<number>();

  for (const part of parts) {
    const match = /^(\d+)(?:-(\d+))?$/.exec(part);
    if (!match) {
      throw new Error("页码格式不正确，请使用 1-3,5,8-10 这样的格式。");
    }

    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;

    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < 1) {
      throw new Error("页码必须是大于 0 的整数。");
    }

    if (end < start) {
      throw new Error(`页码范围 ${part} 的结束页不能小于开始页。`);
    }

    if (start > pageCount || end > pageCount) {
      throw new Error(`当前 PDF 只有 ${pageCount} 页，请检查页码范围。`);
    }

    for (let page = start; page <= end; page += 1) {
      if (!seen.has(page)) {
        seen.add(page);
        pages.push(page);
      }
    }
  }

  if (pages.length === 0) {
    throw new Error("至少选择 1 页。");
  }

  return pages;
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

async function renderPageToImage(
  pdfjs: PdfJsModule,
  pdfDocument: PdfDocumentProxy,
  pageNumber: number,
  scale: number,
  format: OutputFormat,
  sourceName: string
): Promise<RenderedImage> {
  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器无法创建图片画布。");
  }

  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));

  if (format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  await page.render({
    canvas,
    canvasContext: context,
    viewport,
    annotationMode: pdfjs.AnnotationMode.ENABLE
  }).promise;
  page.cleanup();

  const blob = await encodeCanvas(canvas, format);

  return {
    id: crypto.randomUUID(),
    url: URL.createObjectURL(blob),
    filename: outputFilename(sourceName, pageNumber, format),
    pageNumber,
    width: canvas.width,
    height: canvas.height,
    sizeBytes: blob.size,
    format
  };
}

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "pdf-to-image",
      toolSlug: "pdf-to-image",
      path: "/tools/pdf-to-image",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

export function PdfToImageTool({ tool }: { tool: ToolDefinition }) {
  const [loadedPdf, setLoadedPdf] = useState<LoadedPdf | null>(null);
  const [rangeText, setRangeText] = useState("1");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [qualityPresetId, setQualityPresetId] = useState("clear");
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState<RenderedImage[]>([]);
  const resultsRef = useRef<RenderedImage[]>([]);

  const relatedTools = getRelatedTools(tool);
  const selectedPreset = qualityPresets.find((preset) => preset.id === qualityPresetId) ?? qualityPresets[1]!;
  const resultTotalSize = useMemo(
    () => results.reduce((sum, result) => sum + result.sizeBytes, 0),
    [results]
  );

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    return () => {
      resultsRef.current.forEach((result) => URL.revokeObjectURL(result.url));
    };
  }, []);

  function clearResults() {
    resultsRef.current.forEach((result) => URL.revokeObjectURL(result.url));
    resultsRef.current = [];
    setResults([]);
  }

  function clearOutputState() {
    clearResults();
    setProgress(null);
    setError("");
  }

  async function addFile(fileList: FileList | File[]) {
    const file = Array.from(fileList)[0];
    if (!file) return;

    setError("");
    clearResults();

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    if (!isSupportedPdf(file)) {
      setError("只支持 .pdf 文件。");
      return;
    }

    if (file.size > maxBytes) {
      setError(`单个 PDF 最大支持 ${tool.maxFileSizeMbFree} MB。`);
      return;
    }

    setIsLoading(true);
    setLoadedPdf(null);
    setProgress({
      percent: 5,
      stage: "读取 PDF",
      detail: file.name
    });

    try {
      if (!(await hasPdfHeader(file))) {
        throw new Error(`${file.name} 不是有效的 PDF 文件。`);
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdfjs = await loadPdfJs();
      const loadingTask = pdfjs.getDocument({
        data: bytes.slice(),
        isOffscreenCanvasSupported: false,
        useWorkerFetch: false
      });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;

      await pdf.destroy();

      if (pageCount < 1) {
        throw new Error("这个 PDF 没有可导出的页面。");
      }

      setLoadedPdf({
        file,
        bytes,
        pageCount
      });
      setRangeText(pageCount >= 3 ? "1-3" : "1");
      setProgress({
        percent: 100,
        stage: "读取完成",
        detail: `共 ${pageCount} 页，可以开始转换。`
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 读取失败，可能已损坏或受密码保护。";
      setError(message);
      setProgress(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function convertToImages() {
    if (!loadedPdf) {
      setError("请先选择 PDF。");
      return;
    }

    setIsRendering(true);
    setError("");
    clearResults();

    try {
      const pages = parsePageRange(rangeText, loadedPdf.pageCount);
      setProgress({
        percent: 5,
        stage: "准备转换",
        detail: `${pages.length} 页，${formatLabels[format]}，${selectedPreset.label}`
      });
      sendAnalytics(
        "tool_use_attempt",
        `pages=${pages.length};format=${formatLabels[format]};scale=${selectedPreset.scale}`
      );

      const pdfjs = await loadPdfJs();
      const loadingTask = pdfjs.getDocument({
        data: loadedPdf.bytes.slice(),
        isOffscreenCanvasSupported: false,
        useWorkerFetch: false
      });
      const pdf = await loadingTask.promise;
      const nextResults: RenderedImage[] = [];

      for (const [index, pageNumber] of pages.entries()) {
        setProgress({
          percent: Math.max(8, Math.round((index / pages.length) * 84)),
          stage: "渲染页面",
          detail: `${index + 1} / ${pages.length}：第 ${pageNumber} 页`
        });

        const image = await renderPageToImage(
          pdfjs,
          pdf,
          pageNumber,
          selectedPreset.scale,
          format,
          loadedPdf.file.name
        );
        nextResults.push(image);
      }

      await pdf.destroy();
      setResults(nextResults);
      resultsRef.current = nextResults;
      setProgress({
        percent: 100,
        stage: "转换完成",
        detail: `已生成 ${nextResults.length} 张图片。`
      });
      sendAnalytics(
        "tool_use_success",
        `pages=${nextResults.length};format=${formatLabels[format]};size=${nextResults.reduce(
          (sum, result) => sum + result.sizeBytes,
          0
        )}`
      );
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 转图片失败，请换一个文件试试。";
      setError(message);
      setProgress(null);
      sendAnalytics("tool_use_failure", message);
    } finally {
      setIsRendering(false);
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
            把 PDF 页面转换成 JPG、PNG 或 WebP 图片。
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
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-to-image-file">
              选择 PDF
            </label>
            <input
              accept="application/pdf,.pdf"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              disabled={isLoading || isRendering}
              id="pdf-to-image-file"
              onChange={(event) => {
                void addFile(event.target.files ?? []);
                event.target.value = "";
              }}
              type="file"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              支持拖拽上传。PDF 只在浏览器本地处理，不会上传服务器。
            </p>
          </div>

          {loadedPdf ? (
            <div className="panel flex min-w-0 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[var(--color-text)]">
                  {loadedPdf.file.name}
                </div>
                <div className="mt-1 text-xs text-muted">
                  {loadedPdf.pageCount} 页，{formatBytes(loadedPdf.file.size)}
                </div>
              </div>
              <span className="text-sm text-muted">已读取</span>
            </div>
          ) : null}

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-to-image-range">
              页码范围
            </label>
            <input
              className="input-control w-full px-3 py-2 text-sm"
              disabled={isLoading || isRendering || !loadedPdf}
              id="pdf-to-image-range"
              onChange={(event) => {
                clearOutputState();
                setRangeText(event.target.value);
              }}
              placeholder="例如 1-3,5,8-10"
              type="text"
              value={rangeText}
            />
            <div className="flex flex-wrap gap-2">
              <button
                className="chip chip-idle"
                disabled={!loadedPdf || isLoading || isRendering}
                onClick={() => {
                  clearOutputState();
                  setRangeText("1");
                }}
                type="button"
              >
                首页
              </button>
              <button
                className="chip chip-idle"
                disabled={!loadedPdf || loadedPdf.pageCount < 3 || isLoading || isRendering}
                onClick={() => {
                  clearOutputState();
                  setRangeText("1-3");
                }}
                type="button"
              >
                前 3 页
              </button>
              <button
                className="chip chip-idle"
                disabled={!loadedPdf || isLoading || isRendering}
                onClick={() => {
                  clearOutputState();
                  setRangeText(loadedPdf ? `1-${loadedPdf.pageCount}` : "1");
                }}
                type="button"
              >
                全部
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="panel-title">图片格式</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {(Object.keys(formatLabels) as OutputFormat[]).map((item) => (
                <button
                  className={`choice-card ${format === item ? "choice-card-active" : ""}`}
                  disabled={isLoading || isRendering}
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
                      ? "文件较小，适合分享"
                      : item === "image/png"
                        ? "保留清晰边缘"
                        : "体积更轻"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="panel-title">清晰度</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {qualityPresets.map((preset) => (
                <button
                  className={`choice-card ${qualityPresetId === preset.id ? "choice-card-active" : ""}`}
                  disabled={isLoading || isRendering}
                  key={preset.id}
                  onClick={() => {
                    clearOutputState();
                    setQualityPresetId(preset.id);
                  }}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-[var(--color-text)]">{preset.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {loadedPdf
                ? `将转换为 ${formatLabels[format]} 图片`
                : "先上传 1 个 PDF"}
            </p>
            <button
              className="button-accent"
              disabled={isLoading || isRendering || !loadedPdf}
              onClick={convertToImages}
              type="button"
            >
              <Images aria-hidden="true" className="h-4 w-4" />
              {isRendering ? "转换中..." : "转换图片"}
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
            {results.length > 0 ? (
              <div className="mt-4 space-y-4">
                <div className="space-y-2 text-sm text-muted">
                  <div>图片数：{results.length} 张</div>
                  <div>总大小：{formatBytes(resultTotalSize)}</div>
                </div>
                {results.length > 1 ? (
                  <button className="button-primary w-full" onClick={downloadAll} type="button">
                    <Download aria-hidden="true" className="h-4 w-4" />
                    下载全部
                  </button>
                ) : null}
                <div className="grid gap-3">
                  {results.map((result) => (
                    <a
                      className="panel block overflow-hidden hover:border-[var(--color-accent)]"
                      download={result.filename}
                      href={result.url}
                      key={result.id}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={`第 ${result.pageNumber} 页图片预览`}
                        className="max-h-56 w-full border-b border-[var(--color-border)] bg-white object-contain"
                        src={result.url}
                      />
                      <span className="block px-3 py-2 text-sm">
                        <span className="block truncate font-semibold text-[var(--color-text)]">
                          {result.filename}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          第 {result.pageNumber} 页，{result.width} x {result.height}，{formatBytes(result.sizeBytes)}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">转换完成后会在这里下载图片。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单个 PDF 最大 {tool.maxFileSizeMbFree} MB。</p>
              <p>页码范围支持 1-3,5,8-10 这类写法。</p>
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
                <span className="text-soft">更多 PDF 工具整理中。</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
