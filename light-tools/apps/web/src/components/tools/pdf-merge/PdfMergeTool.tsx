"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Download, Trash2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

interface PdfItem {
  id: string;
  file: File;
  pageCount: number;
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

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "pdf-merge",
      toolSlug: "pdf-merge",
      path: "/tools/pdf-merge",
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

async function loadPdfDocument(file: File): Promise<PDFDocument> {
  if (!(await hasPdfHeader(file))) {
    throw new Error(`${file.name} 不是有效的 PDF 文件。`);
  }

  try {
    return await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  } catch {
    throw new Error(`${file.name} 读取失败，可能已损坏或受密码保护。`);
  }
}

function getDownloadFilename() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `merged-${stamp}.pdf`;
}

export function PdfMergeTool({ tool }: { tool: ToolDefinition }) {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedPdf | null>(null);

  const relatedTools = getRelatedTools(tool);
  const totalSize = useMemo(() => pdfs.reduce((sum, pdf) => sum + pdf.file.size, 0), [pdfs]);
  const totalPages = useMemo(() => pdfs.reduce((sum, pdf) => sum + pdf.pageCount, 0), [pdfs]);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  async function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setError("");

    const availableSlots = Math.max(0, tool.maxFilesFree - pdfs.length);
    if (files.length > availableSlots) {
      setError(`最多支持 ${tool.maxFilesFree} 个 PDF。`);
      return;
    }

    const maxBytes = tool.maxFileSizeMbFree * 1024 * 1024;
    const nextPdfs: PdfItem[] = [];

    try {
      for (const file of files) {
        if (!isSupportedPdf(file)) {
          throw new Error("只支持 .pdf 文件。");
        }

        if (file.size > maxBytes) {
          throw new Error(`单个 PDF 最大支持 ${tool.maxFileSizeMbFree} MB。`);
        }

        const pdf = await loadPdfDocument(file);
        nextPdfs.push({
          id: crypto.randomUUID(),
          file,
          pageCount: pdf.getPageCount()
        });
      }

      if (result?.url) {
        URL.revokeObjectURL(result.url);
        setResult(null);
      }

      setPdfs((current) => [...current, ...nextPdfs]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "PDF 读取失败。");
    }
  }

  function removePdf(id: string) {
    setPdfs((current) => current.filter((pdf) => pdf.id !== id));
  }

  function movePdf(id: string, direction: -1 | 1) {
    setPdfs((current) => {
      const index = current.findIndex((pdf) => pdf.id === id);
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

    setPdfs((current) => {
      const fromIndex = current.findIndex((pdf) => pdf.id === draggingId);
      const toIndex = current.findIndex((pdf) => pdf.id === targetId);
      if (fromIndex < 0 || toIndex < 0) return current;

      const next = [...current];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item!);
      return next;
    });
    setDraggingId(null);
  }

  async function mergePdfs() {
    if (pdfs.length < 2) {
      setError("请至少选择 2 个 PDF。");
      return;
    }

    setIsMerging(true);
    setError("");
    setProgress({
      percent: 5,
      stage: "准备合并",
      detail: `共 ${pdfs.length} 个 PDF，${totalPages} 页。`
    });
    sendAnalytics("tool_use_attempt", `count=${pdfs.length};pages=${totalPages}`);

    if (result?.url) {
      URL.revokeObjectURL(result.url);
      setResult(null);
    }

    try {
      const mergedPdf = await PDFDocument.create();
      let copiedPageCount = 0;

      for (const [index, item] of pdfs.entries()) {
        setProgress({
          percent: Math.max(8, Math.round((index / pdfs.length) * 78)),
          stage: "复制页面",
          detail: `${index + 1} / ${pdfs.length}：${item.file.name}`
        });

        const sourcePdf = await loadPdfDocument(item.file);
        const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
          copiedPageCount += 1;
        });
      }

      setProgress({
        percent: 92,
        stage: "导出 PDF",
        detail: "正在生成下载文件。"
      });

      const bytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        filename: getDownloadFilename(),
        sizeBytes: blob.size,
        pageCount: copiedPageCount
      });
      setProgress({
        percent: 100,
        stage: "合并完成",
        detail: "PDF 已合并，可以下载。"
      });
      sendAnalytics("tool_use_success", `count=${pdfs.length};pages=${copiedPageCount}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 合并失败，请换一组文件试试。";
      setError(message);
      setProgress(null);
      sendAnalytics("tool_use_failure", message);
    } finally {
      setIsMerging(false);
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
            选择多个 PDF，按顺序合并成一个文件。
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
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-files">
              选择 PDF
            </label>
            <input
              accept="application/pdf,.pdf"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              id="pdf-files"
              multiple
              onChange={(event) => {
                void addFiles(event.target.files ?? []);
                event.target.value = "";
              }}
              type="file"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              支持拖拽上传。PDF 只在浏览器本地处理，不会上传服务器。
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="panel-title">合并顺序</h2>
              <span className="text-sm text-muted">
                {pdfs.length} 个，{totalPages} 页，{formatBytes(totalSize)}
              </span>
            </div>
            {pdfs.length > 0 ? (
              <div className="grid gap-3">
                {pdfs.map((pdf, index) => (
                  <div
                    className="panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center"
                    draggable
                    key={pdf.id}
                    onDragEnd={() => setDraggingId(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDragStart={() => setDraggingId(pdf.id)}
                    onDrop={() => handleDrop(pdf.id)}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-sm font-semibold text-[var(--color-accent)]">
                        PDF
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-[var(--color-text)]">
                          {index + 1}. {pdf.file.name}
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          {pdf.pageCount} 页，{formatBytes(pdf.file.size)}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full shrink-0 items-center justify-end gap-1 sm:w-auto">
                      <button
                        aria-label="上移"
                        className="icon-button"
                        disabled={index === 0}
                        onClick={() => movePdf(pdf.id, -1)}
                        type="button"
                      >
                        <ArrowUp aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="下移"
                        className="icon-button"
                        disabled={index === pdfs.length - 1}
                        onClick={() => movePdf(pdf.id, 1)}
                        type="button"
                      >
                        <ArrowDown aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="删除"
                        className="icon-button"
                        onClick={() => removePdf(pdf.id)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="muted-panel p-5 text-sm text-muted">还没有选择 PDF。</div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {pdfs.length >= 2 ? `将合并为 ${totalPages} 页` : "至少选择 2 个 PDF"}
            </p>
            <button
              className="button-accent"
              disabled={isMerging || pdfs.length < 2}
              onClick={mergePdfs}
              type="button"
            >
              {isMerging ? "合并中..." : "合并 PDF"}
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
              <p className="mt-4 text-sm leading-6 text-muted">合并完成后会在这里下载 PDF。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>最多 {tool.maxFilesFree} 个 PDF，单个 {tool.maxFileSizeMbFree} MB。</p>
              <p>按列表顺序合并，可拖拽或用按钮调整。</p>
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
