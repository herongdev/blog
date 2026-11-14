import type { IncomingMessage, ServerResponse } from 'node:http';

export interface IdentityClientOptions {
  /** Exact public application origin, without a trailing slash. */
  origin: string;
  /** Registered IAM client; may be empty while login is not configured. */
  clientId: string;
  /** Server-only credential. Empty means login is unavailable. */
  clientSecret?: string;
  /** Private server data directory, never a public/static directory. */
  dataDirectory: string;
  /** Application slug, also used to isolate cookies and the SQLite file. */
  appId: string;
  /** Explicit known permission codes. The default is an empty allowlist. */
  permissions?: readonly string[];
  /** HTTP is accepted only for explicitly enabled loopback previews. Real IAM callbacks require HTTPS. */
  allowHttp?: boolean;
}

export interface IdentitySession {
  authenticated: true;
  loginAvailable: boolean;
  sub: string;
  name: string;
  nickname: string;
  avatarUrl: string;
  profileUpdatedAt: number | null;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  permissions: string[];
  csrfToken: string;
  expiresAt: number;
}

export interface IdentityClient {
  /** Handles only /api/auth/login, /callback, /session and /logout. */
  handle(request: IncomingMessage, response: ServerResponse): Promise<boolean>;
  /** Introspects every call; null for anonymous/expired sessions, throws on failure. Use requirePermission for authorized writes and CSRF enforcement. */
  getSession(request: IncomingMessage, response: ServerResponse): Promise<IdentitySession | null>;
  /** Also validates Origin + CSRF for writes; sends an error response and returns null on failure. */
  requirePermission(request: IncomingMessage, response: ServerResponse, permission: string): Promise<IdentitySession | null>;
  /** Abort pending identity requests and close the SQLite connection. */
  close(): void;
}

export function createIdentityClient(options: IdentityClientOptions): IdentityClient;
