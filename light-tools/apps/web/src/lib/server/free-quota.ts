import { createHash, randomUUID } from "node:crypto";

const visitorCookieName = "lt_anon_id";
const defaultFreeLimit = 3;
const defaultWindowMs = 30 * 24 * 60 * 60 * 1000;

interface QuotaRecord {
  count: number;
  resetAt: number;
}

interface FreeQuotaResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: string;
  headers: Record<string, string>;
}

declare global {
  var lightToolsQuotaStore: Map<string, QuotaRecord> | undefined;
}

const quotaStore = globalThis.lightToolsQuotaStore ?? new Map<string, QuotaRecord>();
globalThis.lightToolsQuotaStore = quotaStore;

function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [key, ...valueParts] = item.split("=");
        return [key, decodeURIComponent(valueParts.join("="))];
      })
  );
}

function hashFallbackIdentity(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";

  return createHash("sha256")
    .update(`${forwardedFor}|${userAgent}`)
    .digest("hex")
    .slice(0, 32);
}

function getLimit(): number {
  const value = Number(process.env.LIGHT_TOOLS_FREE_CONVERSIONS ?? defaultFreeLimit);
  if (!Number.isFinite(value) || value <= 0) return defaultFreeLimit;
  return Math.floor(value);
}

function getWindowMs(): number {
  const days = Number(process.env.LIGHT_TOOLS_FREE_WINDOW_DAYS ?? 30);
  if (!Number.isFinite(days) || days <= 0) return defaultWindowMs;
  return Math.floor(days * 24 * 60 * 60 * 1000);
}

function buildCookie(visitorId: string, maxAgeSeconds: number): string {
  const parts = [
    `${visitorCookieName}=${encodeURIComponent(visitorId)}`,
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    "HttpOnly",
    "SameSite=Lax"
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function consumeFreeQuota(request: Request, toolId: string): FreeQuotaResult {
  const limit = getLimit();
  const windowMs = getWindowMs();
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = parseCookies(cookieHeader);
  const visitorId = cookies[visitorCookieName] || randomUUID();
  const fallbackId = hashFallbackIdentity(request);
  const quotaKey = `${toolId}:${visitorId || fallbackId}`;
  const now = Date.now();
  const existing = quotaStore.get(quotaKey);
  const record =
    existing && existing.resetAt > now
      ? existing
      : {
          count: 0,
          resetAt: now + windowMs
        };

  const allowed = record.count < limit;
  if (allowed) {
    record.count += 1;
    quotaStore.set(quotaKey, record);
  }

  const remaining = Math.max(0, limit - record.count);
  const resetAt = new Date(record.resetAt).toISOString();
  const headers: Record<string, string> = {
    "X-Free-Limit": String(limit),
    "X-Free-Remaining": String(remaining),
    "X-Free-Reset-At": resetAt
  };

  if (!cookies[visitorCookieName]) {
    headers["Set-Cookie"] = buildCookie(visitorId, Math.ceil(windowMs / 1000));
  }

  return {
    allowed,
    limit,
    remaining,
    resetAt,
    headers
  };
}
