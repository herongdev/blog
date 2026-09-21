"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Download, Trash2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type PageMode = "a4" | "image";
type Orientation = "portrait" | "landscape";

interface ImageItem {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
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

const a4Portrait = { width: 595.28, height: 841.89 };
const mmToPt = 72 / 25.4;

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

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "image-to-pdf",
      toolSlug: "image-to-pdf",
      path: "/tools/image-to-pdf",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

async function readImageSize(file: File): Promise<{ width: number; height: number }> {
  const url = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("图片读取失败。"));
      element.src = url;
    });

    return {
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function webpToPngBytes(file: File): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("浏览器无法创建图片画布。");
  }

  context.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("WebP 转换失败。"));
    }, "image/png");
  });

  return new Uint8Array(await blob.arrayBuffer());
}

function getA4PageSize(orientation: Orientation) {
  return orientation === "landscape"
    ? { width: a4Portrait.height, height: a4Portrait.width }
    : a4Portrait;
}

function getDownloadFilename() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `images-${stamp}.pdf`;
}

export function ImageToPdfTool({ tool }: { tool: ToolDefinition }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageMode, setPageMode] = useState<PageMode>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [marginMm, setMarginMm] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedPdf | null>(null);
  const imagesRef = useRef<ImageItem[]>([]);

  const relatedTools = getRelatedTools(tool);
  const totalSize = useMemo(
    () => images.reduce((sum, image) => sum + image.file.size, 0),
    [images]
  );

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, []);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

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

        const size = await readImageSize(file);
        nextImages.push({
          id: crypto.randomUUID(),
          file,
          url: URL.createObjectURL(file),
          width: size.width,
          height: size.height
        });
      }

      if (result?.url) {
        URL.revokeObjectURL(result.url);
        setResult(null);
      }

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
  }

  function moveImage(id: string, direction: -1 | 1) {
    setImages((current) => {
      const index = current.findIndex((image) => image.id === id);
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

    setImages((current) => {
      const fromIndex = current.findIndex((image) => image.id === draggingId);
      const toIndex = current.findIndex((image) => image.id === targetId);
      if (fromIndex < 0 || toIndex < 0) return current;

      const next = [...current];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item!);
      return next;
    });
    setDraggingId(null);
  }

  async function embedImage(pdfDoc: PDFDocument, item: ImageItem) {
    const bytes = new Uint8Array(await item.file.arrayBuffer());
    const type = item.file.type || item.file.name.toLowerCase();

    if (type.includes("jpeg") || type.endsWith(".jpg") || type.endsWith(".jpeg")) {
      return pdfDoc.embedJpg(bytes);
    }

    if (type.includes("png") || type.endsWith(".png")) {
      return pdfDoc.embedPng(bytes);
    }

    return pdfDoc.embedPng(await webpToPngBytes(item.file));
  }

  async function generatePdf() {
    if (images.length === 0) {
      setError("请先选择图片。");
      return;
    }

    setIsGenerating(true);
    setError("");
    setProgress({
      percent: 6,
      stage: "准备生成",
      detail: `共 ${images.length} 张图片。`
    });
    sendAnalytics("tool_use_attempt", `count=${images.length}`);

    if (result?.url) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const margin = Math.max(0, Math.min(60, marginMm)) * mmToPt;

      for (const [index, item] of images.entries()) {
        setProgress({
          percent: Math.round(((index + 1) / images.length) * 82),
          stage: "写入图片",
          detail: `${index + 1} / ${images.length}：${item.file.name}`
        });

        const embeddedImage = await embedImage(pdfDoc, item);
        const pageSize =
          pageMode === "a4"
            ? getA4PageSize(orientation)
            : {
                width: embeddedImage.width + margin * 2,
                height: embeddedImage.height + margin * 2
              };
        const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
        const contentWidth = Math.max(1, pageSize.width - margin * 2);
        const contentHeight = Math.max(1, pageSize.height - margin * 2);
        const scale = Math.min(contentWidth / embeddedImage.width, contentHeight / embeddedImage.height);
        const drawWidth = embeddedImage.width * scale;
        const drawHeight = embeddedImage.height * scale;

        page.drawImage(embeddedImage, {
          x: (pageSize.width - drawWidth) / 2,
          y: (pageSize.height - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight
        });
      }

      setProgress({
        percent: 92,
        stage: "导出 PDF",
        detail: "正在生成下载文件。"
      });

      const bytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        filename: getDownloadFilename(),
        sizeBytes: blob.size,
        pageCount: images.length
      });
      setProgress({
        percent: 100,
        stage: "生成完成",
        detail: "PDF 已生成，可以下载。"
      });
      sendAnalytics("tool_use_success", `count=${images.length}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 生成失败，请换一组图片试试。";
      setError(message);
      setProgress(null);
      sendAnalytics("tool_use_failure", message);
    } finally {
      setIsGenerating(false);
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
            选择多张图片，按顺序生成 PDF。
          </p>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="panel panel-padded space-y-5">
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

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <h2 className="panel-title">页面尺寸</h2>
              <div className="grid gap-2">
                {[
                  ["a4", "A4 页面"],
                  ["image", "自适应图片"]
                ].map(([value, label]) => (
                  <button
                    className={`choice-card ${pageMode === value ? "choice-card-active" : ""}`}
                    key={value}
                    onClick={() => setPageMode(value as PageMode)}
                    type="button"
                  >
                    <span className="text-sm font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="panel-title">方向</h2>
              <div className="grid gap-2">
                {[
                  ["portrait", "纵向"],
                  ["landscape", "横向"]
                ].map(([value, label]) => (
                  <button
                    className={`choice-card ${orientation === value ? "choice-card-active" : ""}`}
                    disabled={pageMode === "image"}
                    key={value}
                    onClick={() => setOrientation(value as Orientation)}
                    type="button"
                  >
                    <span className="text-sm font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <label className="text-sm font-semibold text-[var(--color-text)]">
              边距 mm
              <input
                className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
                max={60}
                min={0}
                onChange={(event) => setMarginMm(Number(event.target.value))}
                type="number"
                value={marginMm}
              />
            </label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="panel-title">图片顺序</h2>
              <span className="text-sm text-muted">
                {images.length} 张，{formatBytes(totalSize)}
              </span>
            </div>
            {images.length > 0 ? (
              <div className="grid gap-3">
                {images.map((image, index) => (
                  <div
                    className="panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center"
                    draggable
                    key={image.id}
                    onDragEnd={() => setDraggingId(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDragStart={() => setDraggingId(image.id)}
                    onDrop={() => handleDrop(image.id)}
                  >
                    <div className="flex min-w-0 items-center gap-3">
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
                    <div className="flex w-full shrink-0 items-center justify-end gap-1 sm:w-auto">
                      <button
                        aria-label="上移"
                        className="icon-button"
                        disabled={index === 0}
                        onClick={() => moveImage(image.id, -1)}
                        type="button"
                      >
                        <ArrowUp aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="下移"
                        className="icon-button"
                        disabled={index === images.length - 1}
                        onClick={() => moveImage(image.id, 1)}
                        type="button"
                      >
                        <ArrowDown aria-hidden="true" className="h-4 w-4" />
                      </button>
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
              {pageMode === "a4" ? `A4 ${orientation === "portrait" ? "纵向" : "横向"}` : "页面跟随图片尺寸"}
            </p>
            <button
              className="button-accent"
              disabled={isGenerating || images.length === 0}
              onClick={generatePdf}
              type="button"
            >
              {isGenerating ? "生成中..." : "生成 PDF"}
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
              <p className="mt-4 text-sm leading-6 text-muted">生成完成后会在这里下载 PDF。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>最多 {tool.maxFilesFree} 张图片，单张 {tool.maxFileSizeMbFree} MB。</p>
              <p>支持 JPG、PNG、WebP。</p>
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
                <span className="text-soft">更多图片工具整理中。</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
