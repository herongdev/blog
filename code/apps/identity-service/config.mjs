import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { closeSync, constants, fstatSync, openSync, readFileSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';

export const TOKEN = /^[A-Za-z0-9_-]{43}$/;
export const SUBJECT = /^[A-Za-z0-9_-]{16,128}$/;
export const PKCE_VERIFIER = /^[A-Za-z0-9._~-]{43,128}$/;
export const CANONICAL_ISSUER = 'https://auth.herong.info';
export const LEGACY_ISSUER = 'https://dev.herong.info/auth';
export const digest = (value) => createHash('sha256').update(value).digest('hex');
export const randomToken = () => randomBytes(32).toString('base64url');
export const equal = (left, right) => typeof left === 'string' && typeof right === 'string'
  && timingSafeEqual(Buffer.from(digest(left), 'hex'), Buffer.from(digest(right), 'hex'));
export const fail = (status, code, description) => Object.assign(new Error(description), { status, code, publicMessage: description });

export function privateJson(path, maxBytes = 65536) {
  if (!isAbsolute(path)) throw new Error('Private configuration requires an absolute path');
  const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile() || stat.size > maxBytes || (stat.mode & 0o077) !== 0) throw new Error('Private configuration must be a bounded regular file with mode 0600');
    const contents = readFileSync(fd);
    if (contents.byteLength > maxBytes) throw new Error('Private configuration exceeds size limit');
    return JSON.parse(contents.toString('utf8'));
  } finally { closeSync(fd); }
}

export function loadConfig(env = process.env) {
  const issuer = env.IDENTITY_ISSUER || CANONICAL_ISSUER;
  const url = new URL(issuer);
  if (issuer !== CANONICAL_ISSUER || url.username || url.password || url.search || url.hash) throw new Error('IDENTITY_ISSUER must be the approved canonical identity origin');
  const dataDirectory = env.IDENTITY_DATA_DIR;
  const clientsFile = env.IDENTITY_CLIENTS_FILE;
  if (!dataDirectory || !isAbsolute(dataDirectory) || !clientsFile || !isAbsolute(clientsFile)) throw new Error('Identity data directory and client registry paths must be absolute');
  const appId = env.IDENTITY_WECHAT_APP_ID;
  const appSecret = env.IDENTITY_WECHAT_APP_SECRET;
  if (!/^wx[a-f0-9]{16}$/.test(appId || '') || !/^[A-Za-z0-9_-]{16,256}$/.test(appSecret || '')) throw new Error('WeChat website credentials are required');
  const port = Number(env.IDENTITY_PORT || '24321');
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Identity port is invalid');
  return { issuer, canonicalIssuer: CANONICAL_ISSUER, legacyIssuer: LEGACY_ISSUER, origin: url.origin, host: url.host, basePath: '', isLegacy: false, callback: `${LEGACY_ISSUER}/wechat/callback`, dataDirectory: resolve(dataDirectory), clientsFile, appId, appSecret, port };
}

export function identityContexts(config) {
  const legacy = new URL(LEGACY_ISSUER);
  return [config, { ...config, issuer: LEGACY_ISSUER, origin: legacy.origin, host: legacy.host, basePath: legacy.pathname, isLegacy: true }];
}

// Read on each back-channel request so removal or role changes take effect immediately.
export function loadClients(path) {
  const entries = privateJson(path);
  if (!Array.isArray(entries) || entries.length === 0 || entries.length > 32) throw new Error('Client registry must contain between 1 and 32 clients');
  const clients = new Map();
  for (const entry of entries) {
    if (!entry || !/^[a-z][a-z0-9_-]{1,63}$/.test(entry.clientId || '') || clients.has(entry.clientId)) throw new Error('Client identifier is invalid or duplicated');
    if (typeof entry.name !== 'string' || !entry.name.trim() || entry.name.length > 100) throw new Error('Client name is required');
    if (entry.secret !== undefined && entry.secretHash !== undefined) throw new Error('Configure one client credential format');
    let secretHash = entry.secretHash;
    if (entry.secret !== undefined) {
      if (typeof entry.secret !== 'string' || entry.secret.length < 32 || entry.secret.length > 512) throw new Error('Client secret requires at least 32 characters');
      secretHash = digest(entry.secret);
    }
    if (!/^[a-f0-9]{64}$/.test(secretHash || '')) throw new Error('Client secret hash must be SHA256 hex');
    if (!Array.isArray(entry.redirectUris) || !entry.redirectUris.length || entry.redirectUris.length > 8) throw new Error('Client callback allowlist is required');
    const redirects = entry.redirectUris.map((value) => {
      if (typeof value !== 'string' || value.length > 2048) throw new Error('Client callback is invalid');
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.toString() !== value) throw new Error('Client callback requires a canonical HTTPS URL without query or fragment');
      return value;
    });
    if (!['owner', 'admin'].includes(entry.ownerRole)) throw new Error('Explicit ownerRole is required');
    if (entry.ownerSubject !== undefined && (typeof entry.ownerSubject !== 'string' || !SUBJECT.test(entry.ownerSubject))) throw new Error('Owner subject is invalid');
    if (entry.enabled !== undefined && typeof entry.enabled !== 'boolean') throw new Error('Client enabled flag must be boolean');
    clients.set(entry.clientId, { clientId: entry.clientId, name: entry.name, secretHash, redirectUris: redirects, ownerRole: entry.ownerRole, ownerSubject: entry.ownerSubject, enabled: entry.enabled !== false });
  }
  return clients;
}

export function membership(client, owner) {
  return Boolean(client?.enabled && owner?.active === 1 && (!client.ownerSubject || client.ownerSubject === owner.subject));
}
