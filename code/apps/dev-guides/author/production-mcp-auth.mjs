import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { chmodSync, lstatSync, mkdirSync, realpathSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const scopes = ['production:read', 'production:draft'];
const hash = (value) => createHash('sha256').update(value).digest('hex');
const secret = () => randomBytes(32).toString('base64url');
const fail = (code, description, status = 400) => Object.assign(new Error(description), { oauthError: code, status });
const equal = (a, b) => typeof a === 'string' && typeof b === 'string' && a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const isLoopback = (url) => url.protocol === 'http:' && ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);

function canonicalUrl(value, allowLoopback) {
  const url = new URL(value);
  if (url.username || url.password || url.hash || url.search || (url.protocol !== 'https:' && !(allowLoopback && isLoopback(url)))) throw new Error('MCP requires canonical HTTPS issuer and resource URLs');
  return url.href.replace(/\/$/, '');
}

/** Single-administrator, pre-registered public clients. No browser cookie is an MCP credential. */
export function createProductionMcpAuth({ path, issuer, resource, clients = [], clock = Date.now, allowLoopback = false, actorId = 'administrator' }) {
  issuer = canonicalUrl(issuer, allowLoopback);
  resource = canonicalUrl(resource, allowLoopback);
  const origin = new URL(issuer).origin;
  if (new URL(resource).origin !== origin) throw new Error('MCP issuer and resource must share the configured origin');
  const registry = new Map();
  for (const client of clients) {
    if (typeof client?.clientId !== 'string' || !client.clientId || client.clientId.length > 256 || registry.has(client.clientId) || !Array.isArray(client.redirectUris) || !client.redirectUris.length) throw new Error('Invalid static MCP client configuration');
    const redirects = client.redirectUris.map((value) => {
      const url = new URL(value);
      if (url.username || url.password || url.hash || (url.protocol !== 'https:' && !(allowLoopback && isLoopback(url)))) throw new Error('Invalid MCP redirect URI');
      return url.href;
    });
    registry.set(client.clientId, { clientId: client.clientId, name: String(client.name || client.clientId).slice(0, 120), redirectUris: redirects });
  }
  const enabled = registry.size > 0;
  let db;
  if (enabled) {
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    if (lstatSync(dirname(path)).isSymbolicLink()) throw new Error('MCP credential directory must not be a symlink');
    path = join(realpathSync(dirname(path)), resolve(path).split('/').at(-1));
    for (const candidate of [path, `${path}-wal`, `${path}-shm`]) {
      try { if (!lstatSync(candidate).isFile()) throw new Error('MCP credential file must be regular'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    db = new DatabaseSync(path);
    db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS mcp_consents(id TEXT PRIMARY KEY, expires INTEGER NOT NULL, csrf_hash TEXT NOT NULL, payload TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS mcp_codes(digest TEXT PRIMARY KEY, expires INTEGER NOT NULL, payload TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS mcp_grants(id TEXT PRIMARY KEY, revoked INTEGER NOT NULL DEFAULT 0, payload TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS mcp_tokens(digest TEXT PRIMARY KEY, grant_id TEXT NOT NULL, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS mcp_refresh(digest TEXT PRIMARY KEY, grant_id TEXT NOT NULL, expires INTEGER NOT NULL, used INTEGER NOT NULL DEFAULT 0);
      CREATE INDEX IF NOT EXISTS mcp_token_grants ON mcp_tokens(grant_id);`);
    for (const candidate of [path, `${path}-wal`, `${path}-shm`]) { try { chmodSync(candidate, 0o600); } catch (error) { if (error.code !== 'ENOENT') throw error; } }
  }
  const timestamp = () => Number(clock());
  function requireEnabled() { if (!enabled) throw fail('temporarily_unavailable', 'MCP connection is not configured', 503); }
  function transaction(fn) {
    db.exec('BEGIN IMMEDIATE');
    try { const result = fn(); db.exec('COMMIT'); return result; } catch (error) { db.exec('ROLLBACK'); throw error; }
  }
  function clientFor(id, redirect) {
    const client = registry.get(id);
    if (!client || (redirect !== undefined && !client.redirectUris.includes(redirect))) throw fail('invalid_client', 'Client or redirect URI is not registered');
    return client;
  }
  function scopeList(value) {
    if (typeof value !== 'string' || value.length > 100) throw fail('invalid_scope', 'Invalid scope');
    const selected = [...new Set(value.split(' ').filter(Boolean))];
    if (!selected.length || selected.some((item) => !scopes.includes(item)) || !selected.includes('production:read')) throw fail('invalid_scope', 'Only production:read and production:draft are available');
    return selected;
  }
  function authorizationRequest(params) {
    requireEnabled();
    if (typeof params.redirect_uri !== 'string') throw fail('invalid_request', 'An exact registered redirect URI is required');
    const client = clientFor(params.client_id, params.redirect_uri);
    if (params.response_type !== 'code' || params.resource !== resource || params.code_challenge_method !== 'S256' || !/^[A-Za-z0-9_-]{43}$/.test(params.code_challenge || '') || typeof params.state !== 'string' || !params.state || params.state.length > 1024) throw fail('invalid_request', 'Authorization requires code, exact resource, state and PKCE S256');
    return { clientId: client.clientId, redirectUri: params.redirect_uri, scope: scopeList(params.scope || 'production:read'), resource, challenge: params.code_challenge, state: params.state, actorId };
  }
  function cleanup() {
    const at = timestamp();
    db.prepare('DELETE FROM mcp_consents WHERE expires<?').run(at);
    db.prepare('DELETE FROM mcp_codes WHERE expires<?').run(at);
    db.prepare('DELETE FROM mcp_tokens WHERE expires<?').run(at);
    db.prepare('DELETE FROM mcp_refresh WHERE expires<?').run(at);
  }
  function beginConsent(params, csrfToken) {
    const request = authorizationRequest(params);
    if (typeof csrfToken !== 'string' || csrfToken.length < 20) throw fail('invalid_request', 'Authenticated browser session is required', 401);
    cleanup();
    const id = secret();
    db.prepare('INSERT INTO mcp_consents VALUES(?,?,?,?)').run(hash(id), timestamp() + 5 * 60_000, hash(csrfToken), JSON.stringify(request));
    return { id, clientName: registry.get(request.clientId).name, scope: request.scope, redirectUri: request.redirectUri };
  }
  function finishConsent(id, csrfToken, approved) {
    requireEnabled();
    return transaction(() => {
      const row = db.prepare('SELECT * FROM mcp_consents WHERE id=?').get(hash(String(id)));
      if (!row || row.expires <= timestamp() || !equal(row.csrf_hash, hash(String(csrfToken)))) throw fail('invalid_request', 'Consent expired or session changed');
      const request = JSON.parse(row.payload);
      clientFor(request.clientId, request.redirectUri);
      db.prepare('DELETE FROM mcp_consents WHERE id=?').run(hash(String(id)));
      const redirect = new URL(request.redirectUri);
      redirect.searchParams.set('state', request.state); redirect.searchParams.set('iss', issuer);
      if (!approved) redirect.searchParams.set('error', 'access_denied');
      else {
        const code = secret();
        db.prepare('INSERT INTO mcp_codes VALUES(?,?,?)').run(hash(code), timestamp() + 60_000, JSON.stringify(request));
        redirect.searchParams.set('code', code);
      }
      return redirect.href;
    });
  }
  function issueTokens(grantId, grant) {
    const access = secret(), refresh = secret();
    db.prepare('INSERT INTO mcp_tokens VALUES(?,?,?)').run(hash(access), grantId, timestamp() + 60 * 60_000);
    db.prepare('INSERT INTO mcp_refresh VALUES(?,?,?,0)').run(hash(refresh), grantId, timestamp() + 30 * 24 * 60 * 60_000);
    return { access_token: access, token_type: 'Bearer', expires_in: 3600, refresh_token: refresh, scope: grant.scope.join(' '), resource };
  }
  function exchange(params) {
    requireEnabled(); clientFor(params.client_id);
    if (params.client_secret || params.client_assertion || params.resource !== resource) throw fail('invalid_request', 'Exact resource and public-client PKCE are required');
    if (params.grant_type === 'authorization_code') return transaction(() => {
      const row = db.prepare('SELECT * FROM mcp_codes WHERE digest=?').get(hash(String(params.code)));
      const request = row && JSON.parse(row.payload);
      const verifier = params.code_verifier;
      const challenge = typeof verifier === 'string' && /^[A-Za-z0-9._~-]{43,128}$/.test(verifier) ? createHash('sha256').update(verifier).digest('base64url') : '';
      if (!row || row.expires <= timestamp() || request.clientId !== params.client_id || request.redirectUri !== params.redirect_uri || request.resource !== params.resource || !equal(request.challenge, challenge)) throw fail('invalid_grant', 'Authorization code is invalid or expired');
      clientFor(request.clientId, request.redirectUri);
      db.prepare('DELETE FROM mcp_codes WHERE digest=?').run(hash(params.code));
      const id = secret();
      db.prepare('INSERT INTO mcp_grants VALUES(?,0,?)').run(id, JSON.stringify({ actorId: request.actorId, clientId: request.clientId, resource, scope: request.scope, createdAt: timestamp() }));
      return issueTokens(id, request);
    });
    if (params.grant_type === 'refresh_token') {
      // A replayed rotated refresh token revokes the complete connection family.
      const result = transaction(() => {
        const refreshRow = db.prepare('SELECT * FROM mcp_refresh WHERE digest=?').get(hash(String(params.refresh_token)));
        const grantRow = refreshRow && db.prepare('SELECT * FROM mcp_grants WHERE id=?').get(refreshRow.grant_id);
        const grant = grantRow && JSON.parse(grantRow.payload);
        if (!refreshRow || !grantRow || grantRow.revoked || refreshRow.expires <= timestamp() || grant.clientId !== params.client_id || grant.resource !== resource) throw fail('invalid_grant', 'Refresh token is invalid or expired');
        if (refreshRow.used) { db.prepare('UPDATE mcp_grants SET revoked=1 WHERE id=?').run(refreshRow.grant_id); return null; }
        if (params.scope && params.scope !== grant.scope.join(' ')) throw fail('invalid_scope', 'Refresh cannot expand or change granted scopes');
        db.prepare('UPDATE mcp_refresh SET used=1 WHERE digest=?').run(hash(params.refresh_token));
        return issueTokens(refreshRow.grant_id, grant);
      });
      if (!result) throw fail('invalid_grant', 'Refresh token was already used; connection revoked');
      return result;
    }
    throw fail('unsupported_grant_type', 'Only authorization_code and refresh_token are supported');
  }
  function authenticate(token, required = ['production:read']) {
    requireEnabled();
    if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) throw fail('invalid_token', 'A valid OAuth access token is required', 401);
    const row = db.prepare('SELECT t.expires,g.revoked,g.payload FROM mcp_tokens t JOIN mcp_grants g ON g.id=t.grant_id WHERE t.digest=?').get(hash(token));
    const grant = row && JSON.parse(row.payload);
    if (!row || row.revoked || row.expires <= timestamp() || grant.resource !== resource || !registry.has(grant.clientId) || grant.actorId !== actorId) throw fail('invalid_token', 'Access token expired or connection was revoked', 401);
    if (required.some((scope) => !grant.scope.includes(scope))) throw fail('insufficient_scope', 'Connection does not grant this operation', 403);
    return { id: grant.actorId, kind: 'agent', source: 'mcp', scopes: grant.scope };
  }
  function revoke(token, clientId) {
    requireEnabled(); clientFor(clientId);
    const row = db.prepare('SELECT grant_id FROM mcp_tokens WHERE digest=? UNION SELECT grant_id FROM mcp_refresh WHERE digest=?').get(hash(String(token)), hash(String(token)));
    if (row) {
      const grant = JSON.parse(db.prepare('SELECT payload FROM mcp_grants WHERE id=?').get(row.grant_id).payload);
      if (grant.clientId === clientId) db.prepare('UPDATE mcp_grants SET revoked=1 WHERE id=?').run(row.grant_id);
    }
  }
  const issuerUrl = new URL(issuer), resourceUrl = new URL(resource);
  const metadataUrl = `${origin}/.well-known/oauth-protected-resource${resourceUrl.pathname}`;
  const issuerMetadataUrl = `${origin}/.well-known/oauth-authorization-server${issuerUrl.pathname}`;
  const status = () => ({ enabled, issuer, resource, scopes: [...scopes], metadataUrl, issuerMetadataUrl });
  function connections() {
    if (!enabled) return [];
    return db.prepare('SELECT id,revoked,payload FROM mcp_grants ORDER BY rowid DESC LIMIT 100').all().map((row) => {
      const grant = JSON.parse(row.payload);
      const accessExpiry = db.prepare('SELECT MAX(expires) AS expires FROM mcp_tokens WHERE grant_id=?').get(row.id).expires || 0;
      const refreshExpiry = db.prepare('SELECT MAX(expires) AS expires FROM mcp_refresh WHERE grant_id=? AND used=0').get(row.id).expires || 0;
      return { id: row.id, clientName: registry.get(grant.clientId)?.name || grant.clientId, scopes: grant.scope, createdAt: new Date(grant.createdAt).toISOString(), revoked: Boolean(row.revoked), expired: Math.max(accessExpiry, refreshExpiry) <= timestamp() };
    });
  }
  function revokeConnection(id) {
    requireEnabled();
    if (typeof id !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(id)) throw fail('invalid_request', 'Invalid connection');
    db.prepare('UPDATE mcp_grants SET revoked=1 WHERE id=?').run(id);
  }
  return {
    enabled, issuer, resource, origin, metadataUrl, issuerMetadataUrl, status, beginConsent, finishConsent, exchange, authenticate, revoke, connections, revokeConnection,
    resourceMetadata: () => ({ resource, authorization_servers: [issuer], scopes_supported: [...scopes], bearer_methods_supported: ['header'] }),
    authorizationMetadata: () => ({ issuer, authorization_endpoint: `${issuer}/authorize`, token_endpoint: `${issuer}/token`, revocation_endpoint: `${issuer}/revoke`, response_types_supported: ['code'], grant_types_supported: ['authorization_code', 'refresh_token'], token_endpoint_auth_methods_supported: ['none'], code_challenge_methods_supported: ['S256'], authorization_response_iss_parameter_supported: true, scopes_supported: [...scopes] }),
    close() { db?.close(); },
  };
}
