"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Download,
  RotateCcw,
  RotateCw,
  Trash2,
  Undo2
} from "lucide-react";
import { degrees, PDFDocument } from "pdf-lib";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type PageRotation = 0 | 90 | 180 | 270;
type PdfJsModule = typeof import("pdfjs-dist");

interface PageItem {
  id: string;
  sourceIndex: number;
  pageNumber: number;
  width: number;
  height: number;
  rotation: PageRotation;
  thumbnailUrl: string;
}

interface LoadedPdf {
  file: File;
  pages: PageItem[];
}

interface GeneratedPdf {
  url: string;
  filename: string;
  sizeBytes: number;
  pageCount: number;
}

interface ProgressState {
  percent: number;
  stage: string;
  detail: string;
}

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

function getDownloadFilename(name: string) {
  const base = name.replace(/\.[^.]+$/, "") || "document";
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `${base}-organized-${stamp}.pdf`;
}

function normalizeRotation(value: number): PageRotation {
  const rotation = ((value % 360) + 360) % 360;
  return (rotation === 0 || rotation === 90 || rotation === 180 || rotation === 270
    ? rotation
    : 0) as PageRotation;
}

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "pdf-organize",
      toolSlug: "pdf-organize",
      path: "/tools/pdf-organize",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
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

async function renderPageThumbnail(
  pdfjs: PdfJsModule,
  pdfDocument: Awaited<ReturnType<PdfJsModule["getDocument"]>["promise"]>,
  pageNumber: number
): Promise<Omit<PageItem, "id" | "rotation">> {
  const page = await pdfDocument.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const cssScale = Math.min(220 / baseViewport.width, 300 / baseViewport.height, 1.2);
  const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
  const viewport = page.getViewport({ scale: cssScale * deviceScale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器无法创建 PDF 预览画布。");
  }

  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvas,
    canvasContext: context,
    viewport,
    annotationMode: pdfjs.AnnotationMode.DISABLE,
    background: "rgb(255,255,255)"
  }).promise;
  page.cleanup();

  return {
    sourceIndex: pageNumber - 1,
    pageNumber,
    width: Math.round(baseViewport.width),
    height: Math.round(baseViewport.height),
    thumbnailUrl: canvas.toDataURL("image/jpeg", 0.82)
  };
}

async function loadPdfPages(
  file: File,
  onProgress: (progress: ProgressState) => void
): Promise<PageItem[]> {
  if (!(await hasPdfHeader(file))) {
    throw new Error(`${file.name} 不是有效的 PDF 文件。`);
  }

  const pdfjs = await loadPdfJs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({
    data: bytes,
    isOffscreenCanvasSupported: false,
    useWorkerFetch: false
  });

  try {
    const pdf = await loadingTask.promise;
    const pages: PageItem[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      onProgress({
        percent: Math.max(8, Math.round((pageNumber / pdf.numPages) * 74)),
        stage: "生成预览",
        detail: `${pageNumber} / ${pdf.numPages} 页`
      });

      const page = await renderPageThumbnail(pdfjs, pdf, pageNumber);
      pages.push({
        ...page,
        id: crypto.randomUUID(),
        rotation: 0
      });
    }

    await pdf.destroy();
    return pages;
  } catch (caught) {
    loadingTask.destroy();
    if (caught instanceof Error && caught.name === "PasswordException") {
      throw new Error("暂不支持受密码保护的 PDF。");
    }

    throw new Error("PDF 预览生成失败，文件可能已损坏或受保护。");
  }
}

export function PdfOrganizeTool({ tool }: { tool: ToolDefinition }) {
  const [loadedPdf, setLoadedPdf] = useState<LoadedPdf | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedPdf | null>(null);
  const resultRef = useRef<GeneratedPdf | null>(null);

  const relatedTools = getRelatedTools(tool);
  const removedCount = Math.max(0, (loadedPdf?.pages.length ?? 0) - pages.length);
  const isChanged = useMemo(() => {
    if (!loadedPdf || loadedPdf.pages.length !== pages.length) return Boolean(loadedPdf);

    return pages.some((page, index) => {
      const original = loadedPdf.pages[index];
      return !original || original.sourceIndex !== page.sourceIndex || page.rotation !== 0;
    });
  }, [loadedPdf, pages]);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  useEffect(() => {
    return () => {
      if (resultRef.current?.url) URL.revokeObjectURL(resultRef.current.url);
    };
  }, []);

  function clearResult() {
    if (resultRef.current?.url) URL.revokeObjectURL(resultRef.current.url);
    resultRef.current = null;
    setResult(null);
  }

  async function addFile(fileList: FileList | File[]) {
    const file = Array.from(fileList)[0];
    if (!file) return;

    setError("");
    clearResult();

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
    setPages([]);
    setProgress({
      percent: 4,
      stage: "读取 PDF",
      detail: file.name
    });

    try {
      const loadedPages = await loadPdfPages(file, setProgress);
      setLoadedPdf({
        file,
        pages: loadedPages
      });
      setPages(loadedPages);
      setProgress({
        percent: 100,
        stage: "预览完成",
        detail: `共 ${loadedPages.length} 页，可以开始整理。`
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "PDF 读取失败。");
      setProgress(null);
    } finally {
      setIsLoading(false);
    }
  }

  function movePage(id: string, direction: -1 | 1) {
    clearResult();
    setPages((current) => {
      const index = current.findIndex((page) => page.id === id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) return current;

      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item!);
      return next;
    });
  }

  function handleDrop(targetId: string) {
    if (!draggingId || draggingId === targetId) return;

    clearResult();
    setPages((current) => {
      const fromIndex = current.findIndex((page) => page.id === draggingId);
      const toIndex = current.findIndex((page) => page.id === targetId);
      if (fromIndex < 0 || toIndex < 0) return current;

      const next = [...current];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item!);
      return next;
    });
    setDraggingId(null);
  }

  function rotatePage(id: string, delta: -90 | 90) {
    clearResult();
    setPages((current) =>
      current.map((page) =>
        page.id === id
          ? {
              ...page,
              rotation: normalizeRotation(page.rotation + delta)
            }
          : page
      )
    );
  }

  function removePage(id: string) {
    clearResult();
    setPages((current) => current.filter((page) => page.id !== id));
  }

  function resetPages() {
    if (!loadedPdf) return;

    clearResult();
    setPages(
      loadedPdf.pages.map((page) => ({
        ...page,
        id: crypto.randomUUID(),
        rotation: 0
      }))
    );
    setError("");
    setProgress(null);
  }

  async function exportPdf() {
    if (!loadedPdf) {
      setError("请先选择 PDF。");
      return;
    }

    if (pages.length === 0) {
      setError("至少保留 1 页。");
      return;
    }

    setIsExporting(true);
    setError("");
    clearResult();
    setProgress({
      percent: 5,
      stage: "准备导出",
      detail: `将导出 ${pages.length} 页。`
    });
    sendAnalytics(
      "tool_use_attempt",
      `pages=${pages.length};removed=${removedCount};changed=${isChanged ? "1" : "0"}`
    );

    try {
      const sourcePdf = await PDFDocument.load(await loadedPdf.file.arrayBuffer(), {
        ignoreEncryption: true
      });
      const outputPdf = await PDFDocument.create();

      for (const [index, page] of pages.entries()) {
        setProgress({
          percent: Math.max(10, Math.round((index / pages.length) * 82)),
          stage: "复制页面",
          detail: `${index + 1} / ${pages.length}：原第 ${page.pageNumber} 页`
        });

        const [copiedPage] = await outputPdf.copyPages(sourcePdf, [page.sourceIndex]);
        if (!copiedPage) {
          throw new Error(`第 ${page.pageNumber} 页复制失败。`);
        }

        if (page.rotation !== 0) {
          const currentRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation(degrees(normalizeRotation(currentRotation + page.rotation)));
        }

        outputPdf.addPage(copiedPage);
      }

      setProgress({
        percent: 92,
        stage: "生成文件",
        detail: "正在写入新的 PDF。"
      });

      const bytes = await outputPdf.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const nextResult = {
        url,
        filename: getDownloadFilename(loadedPdf.file.name),
        sizeBytes: blob.size,
        pageCount: pages.length
      };

      resultRef.current = nextResult;
      setResult(nextResult);
      setProgress({
        percent: 100,
        stage: "整理完成",
        detail: "PDF 已生成，可以下载。"
      });
      sendAnalytics("tool_use_success", `pages=${pages.length};size=${blob.size}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 导出失败，请换一个文件试试。";
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
            删除页面、调整顺序、旋转页面，导出新的 PDF。
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
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-organize-file">
              选择 PDF
            </label>
            <input
              accept="application/pdf,.pdf"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              disabled={isLoading || isExporting}
              id="pdf-organize-file"
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

          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="panel-title">页面</h2>
                <p className="mt-1 text-sm text-muted">
                  {loadedPdf
                    ? `${pages.length} / ${loadedPdf.pages.length} 页，${formatBytes(loadedPdf.file.size)}`
                    : "上传后会显示页面缩略图"}
                </p>
              </div>
              <button
                className="button-muted w-full sm:w-auto"
                disabled={!loadedPdf || !isChanged || isLoading || isExporting}
                onClick={resetPages}
                type="button"
              >
                <Undo2 aria-hidden="true" className="h-4 w-4" />
                重置
              </button>
            </div>

            {pages.length > 0 ? (
              <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {pages.map((page, index) => (
                  <div
                    className="panel min-w-0 overflow-hidden p-3"
                    draggable={!isLoading && !isExporting}
                    key={page.id}
                    onDragEnd={() => setDraggingId(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDragStart={() => setDraggingId(page.id)}
                    onDrop={() => handleDrop(page.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[var(--color-text)]">
                          {index + 1}. 原第 {page.pageNumber} 页
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          {page.width} x {page.height}
                          {page.rotation ? `，旋转 ${page.rotation}°` : ""}
                        </div>
                      </div>
                      <button
                        aria-label="删除页面"
                        className="icon-button shrink-0"
                        disabled={isLoading || isExporting}
                        onClick={() => removePage(page.id)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex h-48 items-center justify-center overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={`第 ${page.pageNumber} 页预览`}
                        className="max-h-full max-w-full object-contain shadow-sm"
                        src={page.thumbnailUrl}
                        style={{ transform: `rotate(${page.rotation}deg)` }}
                      />
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-1">
                      <button
                        aria-label="上移页面"
                        className="icon-button w-full"
                        disabled={index === 0 || isLoading || isExporting}
                        onClick={() => movePage(page.id, -1)}
                        type="button"
                      >
                        <ArrowUp aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="下移页面"
                        className="icon-button w-full"
                        disabled={index === pages.length - 1 || isLoading || isExporting}
                        onClick={() => movePage(page.id, 1)}
                        type="button"
                      >
                        <ArrowDown aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="左旋页面"
                        className="icon-button w-full"
                        disabled={isLoading || isExporting}
                        onClick={() => rotatePage(page.id, -90)}
                        type="button"
                      >
                        <RotateCcw aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="右旋页面"
                        className="icon-button w-full"
                        disabled={isLoading || isExporting}
                        onClick={() => rotatePage(page.id, 90)}
                        type="button"
                      >
                        <RotateCw aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="muted-panel p-5 text-sm text-muted">
                {isLoading ? "正在生成页面预览。" : "还没有选择 PDF。"}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {loadedPdf
                ? removedCount > 0
                  ? `已删除 ${removedCount} 页，将导出 ${pages.length} 页`
                  : `将导出 ${pages.length} 页`
                : "先上传 1 个 PDF"}
            </p>
            <button
              className="button-accent"
              disabled={isLoading || isExporting || !loadedPdf || pages.length === 0}
              onClick={exportPdf}
              type="button"
            >
              {isExporting ? "导出中..." : "导出 PDF"}
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
                <div className="space-y-2 text-sm text-muted">
                  <div>页数：{result.pageCount} 页</div>
                  <div>文件体积：{formatBytes(result.sizeBytes)}</div>
                </div>
                <a className="button-primary w-full" download={result.filename} href={result.url}>
                  <Download aria-hidden="true" className="h-4 w-4" />
                  下载 PDF
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">整理完成后会在这里下载 PDF。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单个 PDF 最大 {tool.maxFileSizeMbFree} MB。</p>
              <p>支持删除、排序和 90° 旋转。</p>
              <p>全程在浏览器本地生成 PDF。</p>
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
