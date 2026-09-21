import { createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "lt_admin_session";
const sessionMaxAgeSeconds = 7 * 24 * 60 * 60;

function getAdminPassword(): string {
  if (process.env.LIGHT_TOOLS_ADMIN_PASSWORD) return process.env.LIGHT_TOOLS_ADMIN_PASSWORD;
  return process.env.NODE_ENV === "production" ? "" : "admin";
}

function getSessionSecret(): string {
  return (
    process.env.LIGHT_TOOLS_ADMIN_SESSION_SECRET ||
    process.env.LIGHT_TOOLS_ADMIN_PASSWORD ||
    "light-tools-dev-session-secret"
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

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}

export function buildAdminSessionCookie(): string {
  const issuedAt = String(Date.now());
  const token = `${issuedAt}.${sign(issuedAt)}`;
  const parts = [
    `${adminCookieName}=${encodeURIComponent(token)}`,
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

export function clearAdminSessionCookie(): string {
  return `${adminCookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

export function isValidAdminSession(token: string | undefined): boolean {
  if (!token) return false;

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature || sign(issuedAt) !== signature) return false;

  const ageSeconds = (Date.now() - Number(issuedAt)) / 1000;
  return Number.isFinite(ageSeconds) && ageSeconds >= 0 && ageSeconds <= sessionMaxAgeSeconds;
}
