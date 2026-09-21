import { createHash, randomUUID } from "node:crypto";

export const visitorCookieName = "lt_anon_id";
const visitorCookieMaxAgeSeconds = 365 * 24 * 60 * 60;

export interface VisitorIdentity {
  visitorId: string;
  visitorHash: string;
  clientIp: string;
  ipHash: string;
  networkHash: string;
  setCookie?: string;
}

export function parseCookies(cookieHeader: string): Record<string, string> {
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

function hashValue(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

export function hashRequestFingerprint(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";

  return hashValue(`${forwardedFor}|${realIp}|${userAgent}`);
}

export function hashRequestNetwork(request: Request): string {
  return hashValue(getRequestClientIp(request) || "unknown");
}

export function getRequestClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const forwardedIp = forwardedFor.split(",")[0]?.trim() ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  const cfConnectingIp = request.headers.get("cf-connecting-ip") ?? "";
  const trueClientIp = request.headers.get("true-client-ip") ?? "";
  const clientIp = request.headers.get("x-client-ip") ?? "";

  return realIp || cfConnectingIp || trueClientIp || clientIp || forwardedIp || "";
}

export function buildVisitorCookie(visitorId: string): string {
  const parts = [
    `${visitorCookieName}=${encodeURIComponent(visitorId)}`,
    "Path=/",
    `Max-Age=${visitorCookieMaxAgeSeconds}`,
    "HttpOnly",
    "SameSite=Lax"
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function getOrCreateVisitor(request: Request): VisitorIdentity {
  const cookies = parseCookies(request.headers.get("cookie") ?? "");
  const visitorId = cookies[visitorCookieName] || randomUUID();
  const clientIp = getRequestClientIp(request);
  const ipHash = hashRequestFingerprint(request);
  const networkHash = hashRequestNetwork(request);

  return {
    visitorId,
    visitorHash: hashValue(visitorId),
    clientIp,
    ipHash,
    networkHash,
    setCookie: cookies[visitorCookieName] ? undefined : buildVisitorCookie(visitorId)
  };
}
