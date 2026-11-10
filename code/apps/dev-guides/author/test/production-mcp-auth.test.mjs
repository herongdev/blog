import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createProductionMcpAuth } from '../production-mcp-auth.mjs';

const issuer = 'http://127.0.0.1:4300/admin/production-oauth';
const resource = 'http://127.0.0.1:4300/admin/api/production-mcp';
const client = { clientId: 'test-public-client', name: '隔离测试连接', redirectUris: ['https://chatgpt.com/connector_platform_oauth_redirect'] };
const verifier = 'v'.repeat(64);
const challenge = createHash('sha256').update(verifier).digest('base64url');
const csrf = 'c'.repeat(43);
const parameters = (extra = {}) => ({ client_id: client.clientId, redirect_uri: client.redirectUris[0], response_type: 'code', scope: 'production:read production:draft', resource, code_challenge_method: 'S256', code_challenge: challenge, state: 'state-from-the-real-client', ...extra });
async function fixture(t, config = {}) {
  const root = await mkdtemp(join(tmpdir(), 'production-mcp-auth-'));
  let now = Date.now();
  const options = { path: join(root, 'auth.sqlite'), issuer, resource, clients: [client], allowLoopback: true, clock: () => now, ...config };
  let auth = createProductionMcpAuth(options);
  t.after(async () => { auth.close(); await rm(root, { recursive: true, force: true }); });
  return { root, options, get auth() { return auth; }, advance(ms) { now += ms; }, restart() { auth.close(); auth = createProductionMcpAuth(options); } };
}
function codeFor(auth, extra = {}) {
  const consent = auth.beginConsent(parameters(extra), csrf);
  return new URL(auth.finishConsent(consent.id, csrf, true)).searchParams.get('code');
}
const exchange = (auth, code, extra = {}) => auth.exchange({ grant_type: 'authorization_code', code, client_id: client.clientId, redirect_uri: client.redirectUris[0], resource, code_verifier: verifier, ...extra });

test('MCP is disabled without an explicitly registered client and creates no credential file', async t => {
  const app = await fixture(t, { clients: [] });
  assert.equal(app.auth.status().enabled, false);
  assert.throws(() => app.auth.beginConsent(parameters(), csrf), error => error.status === 503);
  await assert.rejects(stat(app.options.path), { code: 'ENOENT' });
  assert.throws(() => createProductionMcpAuth({ ...app.options, issuer: 'http://example.com/oauth' }), /HTTPS/);
});

test('OAuth binds exact redirect/resource/scopes and requires PKCE S256', async t => {
  const { auth } = await fixture(t);
  for (const extra of [{ redirect_uri: 'https://evil.example/callback' }, { resource: 'https://other.example/mcp' }, { scope: 'production:read admin' }, { scope: 'production:draft' }, { code_challenge_method: 'plain' }, { response_type: 'token' }, { state: '' }]) assert.throws(() => auth.beginConsent(parameters(extra), csrf));
  assert.throws(() => auth.beginConsent(parameters(), 'short'), error => error.status === 401);
  const consent = auth.beginConsent(parameters(), csrf);
  assert.throws(() => auth.finishConsent(consent.id, 'wrong-session-csrf', true));
  const redirect = new URL(auth.finishConsent(consent.id, csrf, false));
  assert.equal(redirect.origin, 'https://chatgpt.com');
  assert.equal(redirect.searchParams.get('iss'), issuer);
  assert.equal(redirect.searchParams.get('state'), parameters().state);
  assert.equal(redirect.searchParams.get('error'), 'access_denied');
  assert.equal(redirect.searchParams.has('code'), false);
  assert.throws(() => auth.finishConsent(consent.id, csrf, true));
});

test('authorization code is short lived, single use and bound to client, verifier, resource and redirect', async t => {
  const app = await fixture(t);
  const code = codeFor(app.auth);
  for (const extra of [{ code_verifier: 'wrong'.repeat(16) }, { redirect_uri: 'https://evil.example' }, { resource: 'https://other.example' }, { client_id: 'other' }]) assert.throws(() => exchange(app.auth, code, extra));
  const tokens = exchange(app.auth, code);
  assert.equal(tokens.resource, resource);
  assert.deepEqual(app.auth.authenticate(tokens.access_token), { id: 'administrator', kind: 'agent', source: 'mcp', scopes: ['production:read', 'production:draft'] });
  assert.throws(() => exchange(app.auth, code), error => error.oauthError === 'invalid_grant');
  const expiredCode = codeFor(app.auth);
  app.advance(60_001);
  assert.throws(() => exchange(app.auth, expiredCode), error => error.oauthError === 'invalid_grant');
});

test('tokens survive process restart, are hashed on disk and expire independently from the browser session', async t => {
  const app = await fixture(t);
  const tokens = exchange(app.auth, codeFor(app.auth));
  const disk = Buffer.concat(await Promise.all(['', '-wal', '-shm'].map(suffix => readFile(`${app.options.path}${suffix}`).catch(() => Buffer.alloc(0)))));
  assert.equal(disk.includes(Buffer.from(tokens.access_token)), false);
  assert.equal(disk.includes(Buffer.from(tokens.refresh_token)), false);
  assert.equal((await stat(app.options.path)).mode & 0o777, 0o600);
  app.restart();
  assert.equal(app.auth.authenticate(tokens.access_token).id, 'administrator');
  app.advance(3_600_001);
  assert.throws(() => app.auth.authenticate(tokens.access_token), error => error.status === 401);
});

test('read-only tokens cannot write; rotating refresh cannot expand scope and replay revokes the connection', async t => {
  const { auth } = await fixture(t);
  const tokens = exchange(auth, codeFor(auth, { scope: 'production:read' }));
  assert.throws(() => auth.authenticate(tokens.access_token, ['production:read', 'production:draft']), error => error.oauthError === 'insufficient_scope');
  const input = { grant_type: 'refresh_token', client_id: client.clientId, resource, refresh_token: tokens.refresh_token };
  assert.throws(() => auth.exchange({ ...input, scope: 'production:read production:draft' }), error => error.oauthError === 'invalid_scope');
  const next = auth.exchange(input);
  assert.equal(next.scope, 'production:read');
  assert.notEqual(next.access_token, tokens.access_token);
  assert.equal(auth.authenticate(next.access_token).id, 'administrator');
  assert.throws(() => auth.exchange(input), error => error.oauthError === 'invalid_grant');
  assert.throws(() => auth.authenticate(next.access_token), error => error.oauthError === 'invalid_token');
  assert.throws(() => auth.authenticate(tokens.access_token), error => error.oauthError === 'invalid_token');
});

test('revocation does not disclose token existence and revokes only matching client grants', async t => {
  const other = { clientId: 'other-client', redirectUris: ['https://example.test/callback'] };
  const { auth } = await fixture(t, { clients: [client, other] });
  const tokens = exchange(auth, codeFor(auth));
  auth.revoke(tokens.access_token, other.clientId);
  assert.equal(auth.authenticate(tokens.access_token).id, 'administrator');
  auth.revoke('nonexistent-token', client.clientId);
  auth.revoke(tokens.refresh_token, client.clientId);
  assert.throws(() => auth.authenticate(tokens.access_token), error => error.status === 401);
});

test('credential symlinks and sidecar symlinks are rejected before opening SQLite', async t => {
  const root = await mkdtemp(join(tmpdir(), 'production-mcp-symlink-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const target = join(root, 'unrelated'); await writeFile(target, 'keep');
  const path = join(root, 'auth.sqlite'); await symlink(target, path);
  const options = { path, issuer, resource, clients: [client], allowLoopback: true };
  assert.throws(() => createProductionMcpAuth(options), /regular/);
  assert.equal(await readFile(target, 'utf8'), 'keep');
  await rm(path); await symlink(target, `${path}-wal`);
  assert.throws(() => createProductionMcpAuth(options), /regular/);
  assert.equal(await readFile(target, 'utf8'), 'keep');
});
