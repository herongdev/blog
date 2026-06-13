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
  client?: ClientAnalyticsContext;
}

export interface ClientHardwareInfo {
  platform?: string;
  vendor?: string;
  language?: string;
  languages?: string;
  timezone?: string;
  screen?: string;
  viewport?: string;
  colorDepth?: number;
  devicePixelRatio?: number;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  maxTouchPoints?: number;
  cookiesEnabled?: boolean;
}

export interface ClientNetworkInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export interface ClientAnalyticsContext {
  hardware?: ClientHardwareInfo;
  network?: ClientNetworkInfo;
}

export interface RequestGeoInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  latitude?: string;
  longitude?: string;
}

export interface AnalyticsEventRecord extends AnalyticsEventInput {
  id: string;
  createdAt: string;
  visitorHash: string;
  clientIp?: string;
  ipHash: string;
  networkHash?: string;
  userAgent: string;
  referer: string;
  geo?: RequestGeoInfo;
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

export interface VisitorAnalyticsRow {
  visitorHash: string;
  visitorLabel: string;
  firstSeenAt: string;
  lastSeenAt: string;
  daysSinceLastVisit: number;
  activeDays: number;
  visitSpanDays: number;
  totalEvents: number;
  totalPageViews: number;
  totalToolViews: number;
  totalToolUseAttempts: number;
  totalToolUseSuccesses: number;
  totalToolUseFailures: number;
  totalQuotaBlocked: number;
  recentEvents: number;
  recentPageViews: number;
  latestPath: string;
  topPath: string;
  topTool: string;
  referer: string;
  clientIp: string;
  ipHash: string;
  networkHash: string;
  userAgent: string;
  browser: string;
  operatingSystem: string;
  deviceType: string;
  hardware: ClientHardwareInfo;
  network: ClientNetworkInfo;
  geo: RequestGeoInfo;
}

export interface VisitorAnalytics {
  days: number;
  generatedAt: string;
  uniqueVisitors: number;
  totalPageViews: number;
  visitors: VisitorAnalyticsRow[];
}

type MutableVisitorAnalyticsRow = Omit<
  VisitorAnalyticsRow,
  | "topPath"
  | "topTool"
  | "daysSinceLastVisit"
  | "visitSpanDays"
  | "browser"
  | "operatingSystem"
  | "deviceType"
> & {
  firstSeenMs: number;
  lastSeenMs: number;
  activeDayKeys: Set<string>;
  pathCounts: Map<string, number>;
  toolCounts: Map<string, number>;
};

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

function sanitizeNumber(value: number | undefined, max = 100000): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.max(0, Math.min(max, Math.round(value * 100) / 100));
}

function sanitizeBoolean(value: boolean | undefined): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function compactObject<T extends object>(value: T): Partial<T> | undefined {
  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([, entryValue]) => entryValue !== undefined && entryValue !== ""
  );
  return entries.length > 0 ? Object.fromEntries(entries) as Partial<T> : undefined;
}

function sanitizeClientContext(client: ClientAnalyticsContext | undefined): ClientAnalyticsContext | undefined {
  if (!client) return undefined;

  const hardware = compactObject<ClientHardwareInfo>({
    platform: sanitize(client.hardware?.platform),
    vendor: sanitize(client.hardware?.vendor),
    language: sanitize(client.hardware?.language),
    languages: sanitize(client.hardware?.languages),
    timezone: sanitize(client.hardware?.timezone),
    screen: sanitize(client.hardware?.screen),
    viewport: sanitize(client.hardware?.viewport),
    colorDepth: sanitizeNumber(client.hardware?.colorDepth, 128),
    devicePixelRatio: sanitizeNumber(client.hardware?.devicePixelRatio, 16),
    hardwareConcurrency: sanitizeNumber(client.hardware?.hardwareConcurrency, 256),
    deviceMemory: sanitizeNumber(client.hardware?.deviceMemory, 1024),
    maxTouchPoints: sanitizeNumber(client.hardware?.maxTouchPoints, 32),
    cookiesEnabled: sanitizeBoolean(client.hardware?.cookiesEnabled)
  });

  const network = compactObject<ClientNetworkInfo>({
    effectiveType: sanitize(client.network?.effectiveType),
    downlink: sanitizeNumber(client.network?.downlink, 10000),
    rtt: sanitizeNumber(client.network?.rtt, 60000),
    saveData: sanitizeBoolean(client.network?.saveData)
  });

  return compactObject<ClientAnalyticsContext>({ hardware, network }) as ClientAnalyticsContext | undefined;
}

function readHeader(headers: Headers, names: string[]): string | undefined {
  for (const name of names) {
    const value = sanitize(headers.get(name) ?? undefined);
    if (!value || value.toLowerCase() === "unknown") continue;

    try {
      return sanitize(decodeURIComponent(value));
    } catch {
      return value;
    }
  }

  return undefined;
}

function getRequestGeo(headers: Headers): RequestGeoInfo | undefined {
  return compactObject<RequestGeoInfo>({
    country: readHeader(headers, [
      "x-vercel-ip-country",
      "cf-ipcountry",
      "cloudfront-viewer-country",
      "x-appengine-country",
      "x-country-code"
    ]),
    region: readHeader(headers, [
      "x-vercel-ip-country-region",
      "x-vercel-ip-region",
      "x-region",
      "x-appengine-region"
    ]),
    city: readHeader(headers, ["x-vercel-ip-city", "x-city", "x-appengine-city"]),
    timezone: readHeader(headers, ["x-vercel-ip-timezone", "x-timezone"]),
    latitude: readHeader(headers, ["x-vercel-ip-latitude", "x-latitude"]),
    longitude: readHeader(headers, ["x-vercel-ip-longitude", "x-longitude"])
  }) as RequestGeoInfo | undefined;
}

function incrementMap(map: Map<string, number>, key: string | undefined): void {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + 1);
}

function getMostCommonValue(map: Map<string, number>): string {
  let bestValue = "";
  let bestCount = 0;

  for (const [value, count] of map) {
    if (count > bestCount) {
      bestValue = value;
      bestCount = count;
    }
  }

  return bestValue;
}

function hasObjectValues(value: object | undefined): boolean {
  return Boolean(value && Object.values(value).some((entryValue) => entryValue !== undefined && entryValue !== ""));
}

function parseUserAgent(userAgent: string): Pick<VisitorAnalyticsRow, "browser" | "operatingSystem" | "deviceType"> {
  const ua = userAgent.toLowerCase();

  let browser = "未知浏览器";
  if (ua.includes("edg/")) browser = "Microsoft Edge";
  else if (ua.includes("opr/") || ua.includes("opera")) browser = "Opera";
  else if (ua.includes("firefox/")) browser = "Firefox";
  else if (ua.includes("chrome/") || ua.includes("crios/")) browser = "Chrome";
  else if (ua.includes("safari/")) browser = "Safari";

  let operatingSystem = "未知系统";
  if (ua.includes("windows nt")) operatingSystem = "Windows";
  else if (ua.includes("android")) operatingSystem = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) operatingSystem = "iOS";
  else if (ua.includes("mac os x") || ua.includes("macintosh")) operatingSystem = "macOS";
  else if (ua.includes("linux")) operatingSystem = "Linux";

  let deviceType = "桌面端";
  if (ua.includes("ipad") || ua.includes("tablet")) deviceType = "平板";
  else if (ua.includes("mobi") || ua.includes("iphone") || ua.includes("android")) deviceType = "移动端";

  return { browser, operatingSystem, deviceType };
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
    clientIp: sanitize(visitor.clientIp),
    ipHash: visitor.ipHash,
    networkHash: visitor.networkHash,
    userAgent: sanitize(request.headers.get("user-agent") ?? "") ?? "",
    referer: sanitize(request.headers.get("referer") ?? "") ?? "",
    client: sanitizeClientContext(input.client),
    geo: getRequestGeo(request.headers)
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
    return raw.split("\n").flatMap((line) => {
      if (!line) return [];

      try {
        return [JSON.parse(line) as AnalyticsEventRecord];
      } catch {
        return [];
      }
    });
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

function createVisitorStats(event: AnalyticsEventRecord, eventTime: number): MutableVisitorAnalyticsRow {
  return {
    visitorHash: event.visitorHash,
    visitorLabel: event.visitorHash.slice(0, 10),
    firstSeenAt: event.createdAt,
    lastSeenAt: event.createdAt,
    firstSeenMs: eventTime,
    lastSeenMs: eventTime,
    activeDays: 0,
    activeDayKeys: new Set<string>(),
    totalEvents: 0,
    totalPageViews: 0,
    totalToolViews: 0,
    totalToolUseAttempts: 0,
    totalToolUseSuccesses: 0,
    totalToolUseFailures: 0,
    totalQuotaBlocked: 0,
    recentEvents: 0,
    recentPageViews: 0,
    latestPath: "",
    pathCounts: new Map<string, number>(),
    toolCounts: new Map<string, number>(),
    referer: "",
    clientIp: event.clientIp ?? "",
    ipHash: event.ipHash,
    networkHash: event.networkHash || event.ipHash,
    userAgent: event.userAgent,
    hardware: {},
    network: {},
    geo: {}
  };
}

export async function getVisitorAnalytics(days = 30): Promise<VisitorAnalytics> {
  const allEvents = await readEvents();
  const now = Date.now();
  const since = now - days * 24 * 60 * 60 * 1000;
  const recentEvents = allEvents.filter((event) => Date.parse(event.createdAt) >= since);
  const recentVisitorHashes = new Set(recentEvents.map((event) => event.visitorHash));
  const byVisitor = new Map<string, MutableVisitorAnalyticsRow>();

  for (const event of allEvents) {
    if (!recentVisitorHashes.has(event.visitorHash)) continue;

    const eventTime = Date.parse(event.createdAt);
    if (!Number.isFinite(eventTime)) continue;

    const stats = byVisitor.get(event.visitorHash) ?? createVisitorStats(event, eventTime);
    const isRecent = eventTime >= since;

    stats.totalEvents += 1;
    if (isRecent) stats.recentEvents += 1;
    if (event.eventType === "page_view") {
      stats.totalPageViews += 1;
      if (isRecent) stats.recentPageViews += 1;
    }
    if (event.eventType === "tool_view") stats.totalToolViews += 1;
    if (event.eventType === "tool_use_attempt") stats.totalToolUseAttempts += 1;
    if (event.eventType === "tool_use_success") stats.totalToolUseSuccesses += 1;
    if (event.eventType === "tool_use_failure") stats.totalToolUseFailures += 1;
    if (event.eventType === "quota_blocked") stats.totalQuotaBlocked += 1;

    stats.activeDayKeys.add(new Date(eventTime).toISOString().slice(0, 10));
    incrementMap(stats.pathCounts, event.path);
    incrementMap(stats.toolCounts, event.toolSlug || event.toolId);

    if (eventTime < stats.firstSeenMs) {
      stats.firstSeenAt = event.createdAt;
      stats.firstSeenMs = eventTime;
    }

    if (eventTime >= stats.lastSeenMs) {
      stats.lastSeenAt = event.createdAt;
      stats.lastSeenMs = eventTime;
      stats.latestPath = event.path || event.toolSlug || event.toolId || stats.latestPath;
      stats.referer = event.referer || stats.referer;
      stats.clientIp = event.clientIp || stats.clientIp;
      stats.ipHash = event.ipHash || stats.ipHash;
      stats.networkHash = event.networkHash || event.ipHash || stats.networkHash;
      stats.userAgent = event.userAgent || stats.userAgent;
    }

    if (hasObjectValues(event.client?.hardware)) stats.hardware = event.client?.hardware ?? {};
    if (hasObjectValues(event.client?.network)) stats.network = event.client?.network ?? {};
    if (hasObjectValues(event.geo)) stats.geo = event.geo ?? {};

    byVisitor.set(event.visitorHash, stats);
  }

  const visitors: VisitorAnalyticsRow[] = Array.from(byVisitor.values())
    .map((stats) => {
      const { activeDayKeys, pathCounts, toolCounts, firstSeenMs, lastSeenMs, ...row } = stats;
      const parsedUserAgent = parseUserAgent(row.userAgent);
      const dayMs = 24 * 60 * 60 * 1000;

      return {
        ...row,
        ...parsedUserAgent,
        activeDays: activeDayKeys.size,
        topPath: getMostCommonValue(pathCounts),
        topTool: getMostCommonValue(toolCounts),
        daysSinceLastVisit: Math.max(0, Math.floor((now - lastSeenMs) / dayMs)),
        visitSpanDays: Math.max(1, Math.floor((lastSeenMs - firstSeenMs) / dayMs) + 1)
      };
    })
    .sort((a, b) => Date.parse(b.lastSeenAt) - Date.parse(a.lastSeenAt));

  return {
    days,
    generatedAt: new Date(now).toISOString(),
    uniqueVisitors: visitors.length,
    totalPageViews: visitors.reduce((sum, visitor) => sum + visitor.recentPageViews, 0),
    visitors
  };
}
