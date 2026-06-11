import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { getOrCreateVisitor } from "@/lib/server/visitor";

export type AnalyticsEventType =
  | "page_view"
  | "tool_view"
  | "tool_use_attempt"
  | "tool_use_success"
  | "tool_use_failure"
  | "quota_blocked";

export interface AnalyticsEventInput {
  eventType: AnalyticsEventType;
  path?: string;
  toolId?: string;
  toolSlug?: string;
  status?: "ok" | "error" | "blocked";
  detail?: string;
}

export interface AnalyticsEventRecord extends AnalyticsEventInput {
  id: string;
  createdAt: string;
  visitorHash: string;
  ipHash: string;
  userAgent: string;
  referer: string;
}

export interface AnalyticsSummary {
  totalEvents: number;
  uniqueVisitors: number;
  pageViews: number;
  toolViews: number;
  toolUseAttempts: number;
  toolUseSuccesses: number;
  toolUseFailures: number;
  quotaBlocked: number;
  byTool: Array<{
    toolId: string;
    toolSlug: string;
    views: number;
    attempts: number;
    successes: number;
    failures: number;
    blocked: number;
  }>;
  recentEvents: AnalyticsEventRecord[];
}

const maxFieldLength = 240;

function getDataDir(): string {
  return process.env.LIGHT_TOOLS_DATA_DIR || path.join("/tmp", "light-tools-data");
}

function getEventsFile(): string {
  return path.join(getDataDir(), "analytics-events.jsonl");
}

function sanitize(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.replace(/[\n\r\t]/g, " ").slice(0, maxFieldLength);
}

export async function recordAnalyticsEvent(
  request: Request,
  input: AnalyticsEventInput
): Promise<{ setCookie?: string }> {
  const visitor = getOrCreateVisitor(request);
  const record: AnalyticsEventRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    eventType: input.eventType,
    path: sanitize(input.path),
    toolId: sanitize(input.toolId),
    toolSlug: sanitize(input.toolSlug),
    status: input.status,
    detail: sanitize(input.detail),
    visitorHash: visitor.visitorHash,
    ipHash: visitor.ipHash,
    userAgent: sanitize(request.headers.get("user-agent") ?? "") ?? "",
    referer: sanitize(request.headers.get("referer") ?? "") ?? ""
  };

  try {
    await mkdir(getDataDir(), { recursive: true });
    await appendFile(getEventsFile(), `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.error("Failed to write analytics event", error);
  }

  return { setCookie: visitor.setCookie };
}

async function readEvents(): Promise<AnalyticsEventRecord[]> {
  try {
    const raw = await readFile(getEventsFile(), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as AnalyticsEventRecord);
  } catch {
    return [];
  }
}

function emptyToolStats(toolId: string, toolSlug = "") {
  return {
    toolId,
    toolSlug,
    views: 0,
    attempts: 0,
    successes: 0,
    failures: 0,
    blocked: 0
  };
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const events = (await readEvents()).filter((event) => Date.parse(event.createdAt) >= since);
  const visitors = new Set(events.map((event) => event.visitorHash));
  const byToolMap = new Map<string, ReturnType<typeof emptyToolStats>>();

  for (const event of events) {
    const toolKey = event.toolId || event.toolSlug;
    if (!toolKey) continue;

    const stats = byToolMap.get(toolKey) ?? emptyToolStats(event.toolId ?? toolKey, event.toolSlug ?? "");
    stats.toolSlug ||= event.toolSlug ?? "";

    if (event.eventType === "tool_view") stats.views += 1;
    if (event.eventType === "tool_use_attempt") stats.attempts += 1;
    if (event.eventType === "tool_use_success") stats.successes += 1;
    if (event.eventType === "tool_use_failure") stats.failures += 1;
    if (event.eventType === "quota_blocked") stats.blocked += 1;

    byToolMap.set(toolKey, stats);
  }

  return {
    totalEvents: events.length,
    uniqueVisitors: visitors.size,
    pageViews: events.filter((event) => event.eventType === "page_view").length,
    toolViews: events.filter((event) => event.eventType === "tool_view").length,
    toolUseAttempts: events.filter((event) => event.eventType === "tool_use_attempt").length,
    toolUseSuccesses: events.filter((event) => event.eventType === "tool_use_success").length,
    toolUseFailures: events.filter((event) => event.eventType === "tool_use_failure").length,
    quotaBlocked: events.filter((event) => event.eventType === "quota_blocked").length,
    byTool: Array.from(byToolMap.values()).sort((a, b) => b.attempts + b.views - (a.attempts + a.views)),
    recentEvents: events.slice(-50).reverse()
  };
}
