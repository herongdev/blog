import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request as httpRequest } from 'node:http';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createProductionMcpAuth } from '../production-mcp-auth.mjs';
import { createProductionMcp, productionMcpTools } from '../production-mcp.mjs';

const verifier = 'v'.repeat(64), csrf = 'c'.repeat(43);
const client = { clientId: 'fixture-client', name: '隔离协议测试', redirectUris: ['https://chatgpt.com/connector_platform_oauth_redirect'] };
async function fixture(t, { scopes = 'production:read production:draft', disabled = false, registeredClient = client } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'production-mcp-http-'));
  const calls = [];
  let auth, mcp, origin;
  const service = {
    async list() { return [{ slug: 'test-course', rowVersion: 1 }]; },
    async getContext(slug) { return { episode: { slug, rowVersion: 1 }, stateCard: { nextAction: '继续修稿' } }; },
    async exportHandoff(slug) { return { markdown: `# ${slug}`, snapshot: { rowVersion: 1 } }; },
    async apply(slug, input, actor) {
      calls.push({ slug, input, actor });
      if (input.content === 'rules-migration-required') throw Object.assign(new Error('旧规则需要显式迁移'), { status: 409, code: 'RULES_MIGRATION_REQUIRED' });
      if (input.content === 'idempotency-conflict') throw Object.assign(new Error('重试标识不能用于不同内容'), { status: 409, code: 'IDEMPOTENCY_CONFLICT' });
      if (input.expectedVersion !== 1) throw Object.assign(new Error('制作稿已更新，请读取新版本后重试'), { status: 409, code: 'VERSION_CONFLICT' });
      return { saved: true, episode: { slug, rowVersion: 2 }, decisions: input.operation === 'record_decision' ? [{ type: 'reported_decision', valid: false }] : [] };
    },
  };
  const server = createServer(async (request, response) => {
    const url = new URL(request.url, origin);
    // Emulate the existing /admin/ reverse proxy stripping its public prefix.
    if (url.pathname.startsWith('/admin/')) url.pathname = url.pathname.slice('/admin'.length);
    if (await mcp.handlePublic(request, response, { url })) return;
    if (await mcp.handleAuthorize(request, response, { url, session: request.headers.cookie === 'fixture-session=valid' ? {} : null, csrfToken: csrf })) return;
    response.writeHead(404); response.end();
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
  auth = createProductionMcpAuth({ path: join(root, 'auth.sqlite'), issuer: `${origin}/admin/production-oauth`, resource: `${origin}/admin/api/production-mcp`, clients: disabled ? [] : [registeredClient], allowLoopback: true });
  mcp = createProductionMcp({ service, auth, basePath: '/admin/' });
  t.after(async () => { server.close(); server.closeIdleConnections(); await once(server, 'close'); auth.close(); await rm(root, { recursive: true, force: true }); });
  async function authorize({ consent = 'allow', cookie = 'fixture-session=valid', extra = {} } = {}) {
    const query = new URLSearchParams({ client_id: registeredClient.clientId, redirect_uri: registeredClient.redirectUris[0], response_type: 'code', scope: scopes, resource: auth.resource, code_challenge: createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256', state: 'fixture-state', ...extra });
    const response = await fetch(`${auth.issuer}/authorize?${query}`, { headers: { Cookie: cookie } });
    const body = await response.text();
    const ticket = /name="consent_id" value="([^"]+)"/.exec(body)?.[1];
    if (!ticket) return { response, body };
    const finished = await fetch(`${auth.issuer}/authorize`, { method: 'POST', redirect: 'manual', headers: { Cookie: cookie, Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ consent_id: ticket, csrf_token: csrf, decision: consent }) });
    return { response: finished, body, location: finished.headers.get('location'), pageHeaders: response.headers };
  }
  async function tokens() {
    const granted = await authorize();
    assert.equal(granted.response.status, 303);
    const code = new URL(granted.location).searchParams.get('code');
    const response = await fetch(`${auth.issuer}/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'authorization_code', client_id: registeredClient.clientId, redirect_uri: registeredClient.redirectUris[0], resource: auth.resource, code_verifier: verifier, code }) });
    assert.equal(response.status, 200); return response.json();
  }
  const rpc = (token, method, params, id = 1, headers = {}) => fetch(auth.resource, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers }, body: JSON.stringify({ jsonrpc: '2.0', ...(id === undefined ? {} : { id }), method, ...(params === undefined ? {} : { params }) }) });
  return { auth, mcp, calls, origin, authorize, tokens, rpc };
}

test('OAuth discovery uses canonical issuer/resource and metadata can be reached through both approved routes', async t => {
  const app = await fixture(t);
  const resource = await (await fetch(app.auth.metadataUrl)).json();
  assert.deepEqual(resource.authorization_servers, [app.auth.issuer]);
  assert.equal(resource.resource, app.auth.resource);
  const metadata = await (await fetch(app.auth.issuerMetadataUrl)).json();
  assert.deepEqual(metadata.code_challenge_methods_supported, ['S256']);
  assert.equal(metadata.authorization_response_iss_parameter_supported, true);
  assert.equal(metadata.token_endpoint_auth_methods_supported[0], 'none');
  assert.equal(metadata.registration_endpoint, undefined);
  assert.equal((await fetch(`${app.auth.issuer}/.well-known/oauth-authorization-server`)).status, 200);
  const unauthorized = await app.rpc(null, 'tools/list');
  assert.equal(unauthorized.status, 401);
  assert.ok(unauthorized.headers.get('www-authenticate').includes(app.auth.metadataUrl));
});

test('OAuth requires a real web session and explicit CSRF protected consent; deny carries issuer', async t => {
  const app = await fixture(t);
  const loggedOut = await app.authorize({ cookie: '' });
  assert.equal(loggedOut.response.status, 401);
  assert.ok(loggedOut.body.includes('请先登录'));
  const denied = await app.authorize({ consent: 'deny' });
  assert.equal(denied.response.status, 303);
  assert.equal(new URL(denied.location).searchParams.get('error'), 'access_denied');
  assert.equal(new URL(denied.location).searchParams.get('iss'), app.auth.issuer);
  const wrongOrigin = await fetch(`${app.auth.issuer}/authorize`, { method: 'POST', headers: { Cookie: 'fixture-session=valid', Origin: 'https://evil.example', 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ decision: 'allow', csrf_token: csrf, consent_id: 'invented' }) });
  assert.equal(wrongOrigin.status, 403);
  const wrongCsrf = await fetch(`${app.auth.issuer}/authorize`, { method: 'POST', headers: { Cookie: 'fixture-session=valid', Origin: app.origin, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ decision: 'allow', csrf_token: 'invented', consent_id: 'invented' }) });
  assert.equal(wrongCsrf.status, 403);
});

test('full OAuth + MCP initialization + private read + draft write round trip preserves identity and reports conflicts', async t => {
  const app = await fixture(t);
  const tokens = await app.tokens();
  const initialized = await (await app.rpc(tokens.access_token, 'initialize', { protocolVersion: '2025-11-25', clientInfo: { name: 'fixture', version: '1' }, capabilities: {} })).json();
  assert.equal(initialized.result.protocolVersion, '2025-11-25');
  assert.deepEqual(initialized.result.capabilities, { tools: { listChanged: false } });
  const tools = await (await app.rpc(tokens.access_token, 'tools/list')).json();
  assert.equal(tools.result.tools.length, 8);
  assert.equal(tools.result.tools.some(tool => /publish|delete|grant/.test(tool.name)), false);
  assert.ok(tools.result.tools.every(tool => tool.securitySchemes[0].type === 'oauth2'));
  const read = await (await app.rpc(tokens.access_token, 'tools/call', { name: 'get_episode_context', arguments: { slug: 'test-course' } })).json();
  assert.equal(read.result.structuredContent.episode.rowVersion, 1);
  const args = { slug: 'test-course', expectedVersion: 1, idempotencyKey: 'stable-retry-key', stageId: 'S06', content: '实际口播草稿', inputRevisionIds: [] };
  const saved = await (await app.rpc(tokens.access_token, 'tools/call', { name: 'save_stage_revision', arguments: args })).json();
  assert.equal(saved.result.structuredContent.saved, true);
  assert.deepEqual(app.calls[0].actor, { id: 'administrator', kind: 'agent', source: 'mcp' });
  assert.equal(app.calls[0].input.operation, 'save_stage_revision');
  const conflict = await (await app.rpc(tokens.access_token, 'tools/call', { name: 'save_stage_revision', arguments: { ...args, expectedVersion: 0 } })).json();
  assert.equal(conflict.result.isError, true);
  assert.equal(conflict.result.structuredContent.error.code, 'VERSION_CONFLICT');
  assert.ok(conflict.result.content[0].text.includes('新版本'));
  for (const [content, code] of [['rules-migration-required', 'RULES_MIGRATION_REQUIRED'], ['idempotency-conflict', 'IDEMPOTENCY_CONFLICT']]) {
    const rejected = await (await app.rpc(tokens.access_token, 'tools/call', { name: 'save_stage_revision', arguments: { ...args, content } })).json();
    assert.equal(rejected.result.structuredContent.error.code, code);
  }
});

test('machine tool cannot forge trusted approval, identity, grants or arbitrary file URLs', async t => {
  const app = await fixture(t);
  const { access_token: token } = await app.tokens();
  const args = { slug: 'test-course', expectedVersion: 1, idempotencyKey: 'decision-report', targetRevisionId: 'revision-r2', decision: 'approved', sourceInstruction: '用户表示这一版可以', sourceRef: 'chat-reference' };
  const reported = await (await app.rpc(token, 'tools/call', { name: 'report_decision', arguments: args })).json();
  assert.equal(reported.result.structuredContent.decisions[0].type, 'reported_decision');
  assert.equal(app.calls[0].input.operation, 'record_decision');
  for (const extra of [{ confirmed: true }, { ownerId: 'other' }, { actor: { kind: 'user' } }]) {
    const rejected = await (await app.rpc(token, 'tools/call', { name: 'report_decision', arguments: { ...args, ...extra } })).json();
    assert.equal(rejected.result.isError, true);
  }
  assert.equal(app.calls.length, 1);
  const unknown = await (await app.rpc(token, 'tools/call', { name: 'set_execution_grant', arguments: {} })).json();
  assert.equal(unknown.error.code, -32602);
  const rawFile = await (await app.rpc(token, 'tools/call', { name: 'register_artifact', arguments: { slug: 'test-course', expectedVersion: 1, idempotencyKey: 'asset-register-key', kind: 'video', inputRevisionIds: [], source: { type: 'workspace_asset', assetId: 'a', url: 'file:///etc/passwd' } } })).json();
  assert.equal(rawFile.result.isError, true);
  assert.equal(app.calls.length, 1);
});

test('read scope, host/origin, transport media type, method and protocol version are enforced', async t => {
  const app = await fixture(t, { scopes: 'production:read' });
  const { access_token: token } = await app.tokens();
  const args = { slug: 'test-course', expectedVersion: 1, idempotencyKey: 'stable-retry-key', stageId: 'S01', content: '草稿' };
  const denied = await (await app.rpc(token, 'tools/call', { name: 'save_stage_revision', arguments: args })).json();
  assert.equal(denied.result.isError, true);
  assert.ok(denied.result._meta['mcp/www_authenticate'][0].includes('insufficient_scope'));
  assert.equal(app.calls.length, 0);
  assert.equal((await app.rpc(token, 'tools/list', undefined, 1, { Origin: 'https://evil.example' })).status, 403);
  const wrongHostStatus = await new Promise((resolve, reject) => {
    const request = httpRequest(app.auth.resource, { method: 'POST', headers: { Host: 'evil.example', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' } }, response => { response.resume(); response.once('end', () => resolve(response.statusCode)); });
    request.once('error', reject); request.end(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }));
  });
  assert.equal(wrongHostStatus, 403);
  assert.equal((await app.rpc(token, 'tools/list', undefined, 1, { Accept: 'text/html' })).status, 406);
  assert.equal((await app.rpc(token, 'tools/list', undefined, 1, { 'MCP-Protocol-Version': 'unknown' })).status, 400);
  assert.equal((await fetch(app.auth.resource, { headers: { Authorization: `Bearer ${token}` } })).status, 405);
});

test('disabled connection returns explicit status without creating a public anonymous tool server', async t => {
  const app = await fixture(t, { disabled: true });
  assert.equal(app.mcp.status().enabled, false);
  assert.equal((await app.rpc(null, 'tools/list')).status, 503);
  assert.equal((await fetch(app.auth.metadataUrl)).status, 503);
  assert.equal(productionMcpTools.length, 8);
});

test('public token endpoint rejects duplicate fields and bounds unauthenticated request bursts', async t => {
  const app = await fixture(t);
  const duplicated = await fetch(`${app.auth.issuer}/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'client_id=one&client_id=two' });
  assert.equal(duplicated.status, 400);
  const responses = await Promise.all(Array.from({ length: 61 }, () => fetch(`${app.auth.issuer}/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: client.clientId, grant_type: 'client_credentials' }) })));
  assert.ok(responses.some(response => response.status === 429));
  for (const response of responses) await response.arrayBuffer();
  const limited = responses.find(response => response.status === 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  assert.equal(app.calls.length, 0);
});

test('administrator can view and revoke a connection without seeing or resubmitting its bearer token', async t => {
  const app = await fixture(t);
  const tokens = await app.tokens();
  const managementUrl = `${app.auth.issuer}/connections`;
  assert.equal((await fetch(managementUrl)).status, 401);
  const response = await fetch(managementUrl, { headers: { Cookie: 'fixture-session=valid' } });
  assert.equal(response.status, 200);
  const page = await response.text();
  assert.equal(page.includes(tokens.access_token), false);
  assert.equal(page.includes(tokens.refresh_token), false);
  const connectionId = /name="connection_id" value="([^"]+)"/.exec(page)[1];
  const forged = await fetch(managementUrl, { method: 'POST', headers: { Cookie: 'fixture-session=valid', Origin: app.origin, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ connection_id: connectionId, csrf_token: 'forged' }) });
  assert.equal(forged.status, 403);
  assert.equal(app.auth.authenticate(tokens.access_token).id, 'administrator');
  const revoked = await fetch(managementUrl, { method: 'POST', redirect: 'manual', headers: { Cookie: 'fixture-session=valid', Origin: app.origin, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ connection_id: connectionId, csrf_token: csrf }) });
  assert.equal(revoked.status, 303);
  assert.throws(() => app.auth.authenticate(tokens.access_token), error => error.status === 401);
  assert.equal(app.auth.connections()[0].revoked, true);
});

test('OAuth consent uses shared theme tokens, nonce protected theme restoration and the exact escaped callback', async t => {
  const app = await fixture(t, { registeredClient: { ...client, name: 'Demo <img src=x onerror="alert(1)"> & "Quoted"', redirectUris: ['https://chatgpt.com/connector_platform_oauth_redirect?hint=one&next=%22%3Cscript%3E'] } });
  const consent = await app.authorize();
  assert.equal(consent.response.status, 303);
  assert.ok(consent.body.includes('--hr-brand-primary: light-dark('));
  assert.ok(consent.body.includes('background:var(--color-action)'));
  assert.ok(consent.body.includes("localStorage.getItem('dev-guides-author-theme')"));
  assert.ok(consent.body.includes('Demo &lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &quot;Quoted&quot;'));
  assert.equal(consent.body.includes('<img'), false);
  assert.ok(consent.body.includes('授权后返回<strong>https://chatgpt.com</strong>'));
  assert.ok(consent.body.includes('<code>https://chatgpt.com/connector_platform_oauth_redirect?hint=one&amp;next=%22%3Cscript%3E</code>'));
  assert.ok(consent.body.indexOf('value="deny"') < consent.body.indexOf('value="allow"'));
  assert.ok(consent.body.includes('class="primary" name="decision" value="allow"'));
  assert.equal(consent.body.includes('production:read'), false);
  assert.equal(consent.body.includes('production:draft'), false);
  assert.equal(consent.body.includes("@import '@herong"), false);
  const policy = consent.pageHeaders.get('content-security-policy');
  assert.equal(policy.includes('unsafe-inline'), false);
  const nonce = /script-src 'nonce-([^']+)'/.exec(policy)[1];
  assert.ok(consent.body.includes(`<script nonce="${nonce}">`));
  assert.ok(consent.body.includes(`<style nonce="${nonce}">`));
  assert.ok(policy.includes("form-action 'self' https://chatgpt.com"));
  const second = await app.authorize({ consent: 'deny' });
  assert.notEqual(second.pageHeaders.get('content-security-policy'), policy);
});

test('read-only consent omits draft permission and connection management escapes stored client labels', async t => {
  const app = await fixture(t, { scopes: 'production:read', registeredClient: { ...client, name: '</h2><script>alert(1)</script>' } });
  const consent = await app.authorize();
  assert.ok(consent.body.includes('读取制作资料'));
  assert.equal(consent.body.includes('<strong>保存草稿与制作记录</strong>'), false);
  assert.ok(consent.body.includes('value="allow" type="submit">允许读取</button>'));
  await app.tokens();
  const response = await fetch(`${app.auth.issuer}/connections`, { headers: { Cookie: 'fixture-session=valid' } });
  const page = await response.text();
  assert.ok(page.includes('&lt;/h2&gt;&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.equal(page.includes('<script>alert(1)</script>'), false);
  assert.ok(page.includes('class="connection-state active">有效'));
  assert.ok(page.includes('var(--color-text-primary)'));
});

test('the advertised draft limit accepts a long Chinese manuscript within the bounded transport', async t => {
  const app = await fixture(t);
  const tokens = await app.tokens();
  const content = '稿'.repeat(90_000);
  const response = await app.rpc(tokens.access_token, 'tools/call', { name: 'save_stage_revision', arguments: { slug: 'test-course', stageId: 'S09', expectedVersion: 1, idempotencyKey: 'long-chinese-manuscript', content } });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).result.isError, false);
  assert.equal(app.calls.at(-1).input.content.length, 90_000);
});
