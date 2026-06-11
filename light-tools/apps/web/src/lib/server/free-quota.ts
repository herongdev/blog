import { getOrCreateVisitor } from "@/lib/server/visitor";

const defaultFreeLimit = 5;
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

function getRecord(key: string, now: number, windowMs: number): QuotaRecord {
  const existing = quotaStore.get(key);
  if (existing && existing.resetAt > now) return existing;

  return {
    count: 0,
    resetAt: now + windowMs
  };
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

export function consumeFreeQuota(request: Request, toolId: string): FreeQuotaResult {
  const limit = getLimit();
  const windowMs = getWindowMs();
  const visitor = getOrCreateVisitor(request);
  const now = Date.now();
  const visitorKey = `${toolId}:visitor:${visitor.visitorHash}`;
  const networkKey = `${toolId}:network:${visitor.networkHash}`;
  const visitorRecord = getRecord(visitorKey, now, windowMs);
  const networkRecord = getRecord(networkKey, now, windowMs);

  const allowed = visitorRecord.count < limit && networkRecord.count < limit;
  if (allowed) {
    visitorRecord.count += 1;
    networkRecord.count += 1;
    quotaStore.set(visitorKey, visitorRecord);
    quotaStore.set(networkKey, networkRecord);
  }

  const remaining = Math.max(0, Math.min(limit - visitorRecord.count, limit - networkRecord.count));
  const resetAt = new Date(Math.max(visitorRecord.resetAt, networkRecord.resetAt)).toISOString();
  const headers: Record<string, string> = {
    "X-Free-Limit": String(limit),
    "X-Free-Remaining": String(remaining),
    "X-Free-Reset-At": resetAt
  };

  if (visitor.setCookie) {
    headers["Set-Cookie"] = visitor.setCookie;
  }

  return {
    allowed,
    limit,
    remaining,
    resetAt,
    headers
  };
}
