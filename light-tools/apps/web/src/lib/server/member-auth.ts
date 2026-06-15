import { createHmac, timingSafeEqual } from "node:crypto";

export const memberCookieName = "lt_member_session";
const sessionMaxAgeSeconds = 30 * 24 * 60 * 60;

function getSessionSecret(): string {
  return (
    process.env.LIGHT_TOOLS_MEMBER_SESSION_SECRET ||
    process.env.LIGHT_TOOLS_ADMIN_SESSION_SECRET ||
    "light-tools-dev-member-secret"
  );
}

function sign(value: string): string {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function buildMemberSessionCookie(userId: string): string {
  const issuedAt = String(Date.now());
  const payload = `${userId}.${issuedAt}`;
  const token = `${payload}.${sign(payload)}`;
  const parts = [
    `${memberCookieName}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${sessionMaxAgeSeconds}`,
    "HttpOnly",
    "SameSite=Lax"
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function clearMemberSessionCookie(): string {
  return `${memberCookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

export function readMemberSession(token: string | undefined): { userId: string } | undefined {
  if (!token) return undefined;

  const [userId, issuedAt, signature] = token.split(".");
  if (!userId || !issuedAt || !signature) return undefined;

  const payload = `${userId}.${issuedAt}`;
  if (!safeEqual(sign(payload), signature)) return undefined;

  const ageSeconds = (Date.now() - Number(issuedAt)) / 1000;
  if (!Number.isFinite(ageSeconds) || ageSeconds < 0 || ageSeconds > sessionMaxAgeSeconds) return undefined;

  return { userId };
}
