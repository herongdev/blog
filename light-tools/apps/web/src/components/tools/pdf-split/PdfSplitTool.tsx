"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, Scissors } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import type { ToolDefinition } from "@light-tools/shared";
import { withBasePath } from "@/lib/base-path";
import { getRelatedTools } from "@/lib/tool-registry";

type SplitMode = "range" | "single" | "chunk";

interface LoadedPdf {
  file: File;
  bytes: Uint8Array;
  pageCount: number;
}

interface SplitGroup {
  indices: number[];
  label: string;
  filename: string;
}

interface GeneratedPdf {
  id: string;
  url: string;
  filename: string;
  sizeBytes: number;
  pageCount: number;
  label: string;
}

interface ProgressState {
  percent: number;
  stage: string;
  detail: string;
}

const splitModes: Array<{ id: SplitMode; title: string; description: string }> = [
  {
    id: "range",
    title: "指定页码",
    description: "导出 1-3,5 这类页码范围"
  },
  {
    id: "single",
    title: "每页一个",
    description: "把每一页拆成单独 PDF"
  },
  {
    id: "chunk",
    title: "按份拆分",
    description: "每 N 页导出一份 PDF"
  }
];

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

function getBaseName(name: string) {
  return name.replace(/\.[^.]+$/, "") || "document";
}

function getPageLabel(startIndex: number, endIndex: number) {
  return startIndex === endIndex ? `${startIndex + 1}` : `${startIndex + 1}-${endIndex + 1}`;
}

function parsePageRange(input: string, pageCount: number): { indices: number[]; label: string } {
  const normalized = input.replace(/[，、；;]/g, ",").replace(/\s+/g, "");

  if (!normalized) {
    throw new Error("请输入页码范围，例如 1-3,5,8-10。");
  }

  const parts = normalized.split(",").filter(Boolean);
  const indices: number[] = [];
  const seen = new Set<number>();
  const labels: string[] = [];

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

    labels.push(start === end ? `${start}` : `${start}-${end}`);

    for (let page = start; page <= end; page += 1) {
      const index = page - 1;
      if (!seen.has(index)) {
        seen.add(index);
        indices.push(index);
      }
    }
  }

  if (indices.length === 0) {
    throw new Error("至少选择 1 页。");
  }

  return {
    indices,
    label: labels.join(",")
  };
}

function buildSplitGroups(
  loadedPdf: LoadedPdf,
  mode: SplitMode,
  rangeText: string,
  chunkSizeText: string
): SplitGroup[] {
  const baseName = getBaseName(loadedPdf.file.name);

  if (mode === "range") {
    const range = parsePageRange(rangeText, loadedPdf.pageCount);
    return [
      {
        indices: range.indices,
        label: `第 ${range.label} 页`,
        filename: `${baseName}-pages-${range.label.replaceAll(",", "_")}.pdf`
      }
    ];
  }

  if (mode === "single") {
    return Array.from({ length: loadedPdf.pageCount }, (_, index) => ({
      indices: [index],
      label: `第 ${index + 1} 页`,
      filename: `${baseName}-page-${String(index + 1).padStart(3, "0")}.pdf`
    }));
  }

  const chunkSize = Number(chunkSizeText);
  if (!Number.isInteger(chunkSize) || chunkSize < 1) {
    throw new Error("每份页数必须是大于 0 的整数。");
  }

  if (chunkSize > loadedPdf.pageCount) {
    throw new Error(`当前 PDF 只有 ${loadedPdf.pageCount} 页，每份页数不能超过总页数。`);
  }

  const groups: SplitGroup[] = [];
  for (let start = 0; start < loadedPdf.pageCount; start += chunkSize) {
    const end = Math.min(loadedPdf.pageCount, start + chunkSize);
    groups.push({
      indices: Array.from({ length: end - start }, (_, index) => start + index),
      label: `第 ${getPageLabel(start, end - 1)} 页`,
      filename: `${baseName}-part-${String(groups.length + 1).padStart(2, "0")}.pdf`
    });
  }

  return groups;
}

function sendAnalytics(eventType: string, detail?: string) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventType,
      toolId: "pdf-split",
      toolSlug: "pdf-split",
      path: "/tools/pdf-split",
      detail
    }),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

export function PdfSplitTool({ tool }: { tool: ToolDefinition }) {
  const [loadedPdf, setLoadedPdf] = useState<LoadedPdf | null>(null);
  const [mode, setMode] = useState<SplitMode>("range");
  const [rangeText, setRangeText] = useState("1");
  const [chunkSize, setChunkSize] = useState("5");
  const [isLoading, setIsLoading] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState<GeneratedPdf[]>([]);
  const resultsRef = useRef<GeneratedPdf[]>([]);

  const relatedTools = getRelatedTools(tool);
  const splitSummary = useMemo(() => {
    if (!loadedPdf) return "先上传 1 个 PDF";

    if (mode === "range") return `将导出 ${rangeText || "指定"} 页`;
    if (mode === "single") return `将导出 ${loadedPdf.pageCount} 个 PDF`;
    return `将按每 ${chunkSize || "N"} 页导出一份 PDF`;
  }, [chunkSize, loadedPdf, mode, rangeText]);

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
      percent: 6,
      stage: "读取 PDF",
      detail: file.name
    });

    try {
      if (!(await hasPdfHeader(file))) {
        throw new Error(`${file.name} 不是有效的 PDF 文件。`);
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pageCount = pdf.getPageCount();

      if (pageCount < 1) {
        throw new Error("这个 PDF 没有可导出的页面。");
      }

      setLoadedPdf({
        file,
        bytes,
        pageCount
      });
      setRangeText(pageCount >= 3 ? "1-3" : "1");
      setChunkSize(String(Math.min(5, pageCount)));
      setProgress({
        percent: 100,
        stage: "读取完成",
        detail: `共 ${pageCount} 页，可以开始拆分。`
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 读取失败，可能已损坏或受密码保护。";
      setError(message);
      setProgress(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function splitPdf() {
    if (!loadedPdf) {
      setError("请先选择 PDF。");
      return;
    }

    setIsSplitting(true);
    setError("");
    clearResults();
    setProgress({
      percent: 5,
      stage: "准备拆分",
      detail: splitSummary
    });

    try {
      const groups = buildSplitGroups(loadedPdf, mode, rangeText, chunkSize);
      const totalPages = groups.reduce((sum, group) => sum + group.indices.length, 0);

      sendAnalytics("tool_use_attempt", `mode=${mode};groups=${groups.length};pages=${totalPages}`);

      const sourcePdf = await PDFDocument.load(loadedPdf.bytes, { ignoreEncryption: true });
      const nextResults: GeneratedPdf[] = [];

      for (const [index, group] of groups.entries()) {
        setProgress({
          percent: Math.max(8, Math.round((index / groups.length) * 82)),
          stage: "复制页面",
          detail: `${index + 1} / ${groups.length}：${group.label}`
        });

        const outputPdf = await PDFDocument.create();
        const copiedPages = await outputPdf.copyPages(sourcePdf, group.indices);
        copiedPages.forEach((page) => outputPdf.addPage(page));

        const bytes = await outputPdf.save();
        const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
        nextResults.push({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(blob),
          filename: group.filename,
          sizeBytes: blob.size,
          pageCount: group.indices.length,
          label: group.label
        });
      }

      setResults(nextResults);
      resultsRef.current = nextResults;
      setProgress({
        percent: 100,
        stage: "拆分完成",
        detail: `已生成 ${nextResults.length} 个 PDF。`
      });
      sendAnalytics("tool_use_success", `mode=${mode};groups=${nextResults.length};pages=${totalPages}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "PDF 拆分失败，请换一个文件试试。";
      setError(message);
      setProgress(null);
      sendAnalytics("tool_use_failure", message);
    } finally {
      setIsSplitting(false);
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
            输入页码范围或选择拆分方式，在浏览器本地导出 PDF。
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
            <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-split-file">
              选择 PDF
            </label>
            <input
              accept="application/pdf,.pdf"
              className="input-control file-control mt-3 w-full px-3 py-2 text-sm"
              disabled={isLoading || isSplitting}
              id="pdf-split-file"
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
            <h2 className="panel-title">拆分方式</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {splitModes.map((item) => (
                <button
                  className={`choice-card ${mode === item.id ? "choice-card-active" : ""}`}
                  disabled={isLoading || isSplitting}
                  key={item.id}
                  onClick={() => {
                    if (mode !== item.id) {
                      clearOutputState();
                    }
                    setMode(item.id);
                  }}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-[var(--color-text)]">{item.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{item.description}</span>
                </button>
              ))}
            </div>
          </div>

          {mode === "range" ? (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-split-range">
                页码范围
              </label>
              <input
                className="input-control w-full px-3 py-2 text-sm"
                disabled={isLoading || isSplitting || !loadedPdf}
                id="pdf-split-range"
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
                  disabled={!loadedPdf || isLoading || isSplitting}
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
                  disabled={!loadedPdf || loadedPdf.pageCount < 3 || isLoading || isSplitting}
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
                  disabled={!loadedPdf || isLoading || isSplitting}
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
          ) : null}

          {mode === "single" ? (
            <div className="muted-panel p-4 text-sm leading-6 text-muted">
              {loadedPdf
                ? `会生成 ${loadedPdf.pageCount} 个 PDF。点击“下载全部”时，浏览器可能会询问是否允许多文件下载。`
                : "上传 PDF 后会按每一页生成独立文件。"}
            </div>
          ) : null}

          {mode === "chunk" ? (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[var(--color-text)]" htmlFor="pdf-split-chunk">
                每份页数
              </label>
              <input
                className="input-control w-full px-3 py-2 text-sm sm:w-48"
                disabled={isLoading || isSplitting || !loadedPdf}
                id="pdf-split-chunk"
                min={1}
                onChange={(event) => {
                  clearOutputState();
                  setChunkSize(event.target.value);
                }}
                step={1}
                type="number"
                value={chunkSize}
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">{splitSummary}</p>
            <button
              className="button-accent"
              disabled={isLoading || isSplitting || !loadedPdf}
              onClick={splitPdf}
              type="button"
            >
              <Scissors aria-hidden="true" className="h-4 w-4" />
              {isSplitting ? "拆分中..." : "拆分 PDF"}
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
                  <div>文件数：{results.length} 个</div>
                  <div>总页数：{results.reduce((sum, result) => sum + result.pageCount, 0)} 页</div>
                </div>
                {results.length > 1 ? (
                  <button className="button-primary w-full" onClick={downloadAll} type="button">
                    <Download aria-hidden="true" className="h-4 w-4" />
                    下载全部
                  </button>
                ) : null}
                <div className="grid gap-2">
                  {results.map((result) => (
                    <a
                      className="panel px-3 py-2 text-sm hover:border-[var(--color-accent)]"
                      download={result.filename}
                      href={result.url}
                      key={result.id}
                    >
                      <span className="block truncate font-semibold text-[var(--color-text)]">
                        {result.filename}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {result.label}，{result.pageCount} 页，{formatBytes(result.sizeBytes)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">拆分完成后会在这里下载 PDF。</p>
            )}
          </div>

          <div className="panel p-4">
            <h2 className="panel-title">规则</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <p>单个 PDF 最大 {tool.maxFileSizeMbFree} MB。</p>
              <p>页码范围支持 1-3,5,8-10 这类写法。</p>
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
