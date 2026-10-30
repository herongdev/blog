import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createHash, randomBytes } from 'node:crypto';
import { request as httpRequest } from 'node:http';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createAuthorServer } from '../server-core.mjs';

const ORIGIN = 'https://dev.herong.info';
const BOOTSTRAP = 'test-private-setup-proof-at-least-32-characters';
const APP_ID = 'wx0123456789abcdef';
const SECRET = 'test-provider-secret-not-a-real-secret';
const OWNER = 'test-owner-openid-123456789';
const OTHER = 'test-other-openid-123456789';
const UNION = 'test-union-id-1234567890123';
const SESSION_COOKIE = '__Secure-herong_author';
const STATE_COOKIE = '__Secure-herong_author_wechat';
const digest = (value) => createHash('sha256').update(value).digest('hex');

async function fixture(options = {}) {
  const root = await mkdtemp(join(tmpdir(), 'dev-guides-wechat-auth-'));
  const stateDirectory = join(root, 'private-auth');
  const bootstrapTokenFile = join(root, 'bootstrap-token');
  await mkdir(join(root, 'templates'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'templates/tutorial.md'), '---\ntitle: 测试教程\nstatus: draft\n---\n正文');
  await writeFile(bootstrapTokenFile, BOOTSTRAP, { mode: 0o600 });
  let server;
  let endpoint;
  let time = Date.now();
  let csrfToken;
  let fetchCount = 0;
  let mockResponse;
  let mockFailure;
  let pauseExchange;
  const cookies = new Map();
  const fetchImpl = async (url, config) => {
    fetchCount++;
    assert.equal(url.origin, 'https://api.weixin.qq.com');
    assert.equal(url.pathname, '/sns/oauth2/access_token');
    assert.equal(url.searchParams.get('secret'), SECRET);
    assert.equal(url.searchParams.get('appid'), APP_ID);
    assert.equal(url.searchParams.get('grant_type'), 'authorization_code');
    assert.equal(config.redirect, 'error');
    assert.ok(config.signal instanceof AbortSignal);
    if (pauseExchange) await pauseExchange;
    if (mockFailure) throw mockFailure;
    if (mockResponse) return mockResponse;
    return Response.json({ openid: url.searchParams.get('code') === 'other-code' ? OTHER : OWNER, unionid: UNION, access_token: 'test-access-token-do-not-persist' });
  };
  async function start() {
    server = createAuthorServer({
      projectRoot: root,
      auth: { provider: 'wechat', origin: ORIGIN, basePath: '/admin/', stateDirectory, bootstrapTokenFile,
        wechat: { appId: options.disabled ? undefined : APP_ID, appSecret: options.disabled ? undefined : SECRET, fetchImpl, now: () => time } },
      frontend(_request, response) { response.end('login shell'); },
      apiHandler(_request, response, { url, sendJson }) {
        if (url.pathname !== '/api/extension') return false;
        sendJson(response, 200, { private: true }); return true;
      },
    });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    endpoint = `http://127.0.0.1:${server.address().port}`;
  }
  async function stop() {
    server.close(); server.closeIdleConnections(); await once(server, 'close');
  }
  await start();
  const app = {
    root, stateDirectory, bootstrapTokenFile, cookies,
    get fetchCount() { return fetchCount; },
    advance(ms) { time += ms; },
    respond(value) { mockResponse = value; },
    fail(error) { mockFailure = error; },
    pause(promise) { pauseExchange = promise; },
    async restart() { await stop(); await start(); },
    async close() { await stop(); await rm(root, { recursive: true, force: true }); },
    async api(path, { method = 'GET', data, headers = {}, jar = cookies, acceptCookie = true } = {}) {
      const reply = await new Promise((resolve, reject) => {
        const request = httpRequest(`${endpoint}${path}`, { method, headers: {
          Host: 'dev.herong.info',
          ...(jar.size ? { Cookie: [...jar].map(([name, value]) => `${name}=${value}`).join('; ') } : {}),
          ...(!['GET', 'HEAD'].includes(method) ? { Origin: ORIGIN, 'x-author-token': csrfToken ?? '' } : {}),
          ...(data !== undefined ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        } }, (response) => {
          const chunks = [];
          response.on('data', (chunk) => chunks.push(chunk));
          response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks).toString('utf8') }));
        });
        request.on('error', reject);
        request.end(data === undefined ? undefined : JSON.stringify(data));
      });
      if (acceptCookie) for (const cookie of reply.headers['set-cookie'] ?? []) {
        const first = cookie.split(';')[0]; const index = first.indexOf('=');
        const name = first.slice(0, index); const value = first.slice(index + 1);
        if (/Max-Age=0(?:;|$)/.test(cookie)) jar.delete(name); else jar.set(name, value);
      }
      const dataOut = method !== 'HEAD' && reply.headers['content-type']?.includes('application/json') ? JSON.parse(reply.body) : reply.body;
      if (dataOut?.csrfToken) csrfToken = dataOut.csrfToken;
      return { ...reply, data: dataOut };
    },
    async begin({ setup = false, jar = cookies } = {}) {
      const response = await this.api('/api/auth/wechat/start', { method: 'POST', data: setup ? { setupToken: BOOTSTRAP } : {}, jar });
      assert.equal(response.status, 200);
      const target = new URL(response.data.url);
      assert.equal(target.origin, 'https://open.weixin.qq.com');
      assert.equal(target.pathname, '/connect/qrconnect');
      assert.equal(target.searchParams.get('redirect_uri'), `${ORIGIN}/admin/api/auth/wechat/callback`);
      assert.equal(target.searchParams.get('scope'), 'snsapi_login');
      assert.equal(target.searchParams.get('appid'), APP_ID);
      assert.equal(target.hash, '#wechat_redirect');
      assert.equal(response.body.includes(SECRET), false);
      const state = target.searchParams.get('state');
      assert.match(state, /^[A-Za-z0-9_-]{43}$/);
      return { state, cookie: jar.get(STATE_COOKIE), response };
    },
    async callback(flow, { code = 'owner-code', jar = cookies, extra = '', headers = {}, acceptCookie = true } = {}) {
      return this.api(`/api/auth/wechat/callback?state=${flow.state}${code === null ? '' : `&code=${code}`}${extra}`, { jar, acceptCookie, headers: { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Mode': 'navigate', ...headers } });
    },
    async enroll() {
      const flow = await this.begin({ setup: true });
      const result = await this.callback(flow);
      assert.equal(result.status, 303);
      assert.equal(result.headers.location, `${ORIGIN}/admin/`);
      await this.api('/api/auth/session');
      return result;
    },
  };
  return app;
}

function errorRedirect(reply, name) {
  assert.equal(reply.status, 303);
  assert.equal(reply.headers.location, `${ORIGIN}/admin/?authError=${name}`);
  assert.equal(reply.headers['cache-control'], 'no-store');
  assert.equal(reply.headers['referrer-policy'], 'no-referrer');
}

test('WeChat mode denies password endpoints and all private APIs; unavailable configuration is explicit', async () => {
  const app = await fixture();
  const disabled = await fixture({ disabled: true });
  try {
    assert.deepEqual((await app.api('/api/auth/session')).data, { mode: 'online', provider: 'wechat', authenticated: false, setupRequired: true, loginAvailable: true });
    for (const path of ['/api/auth/setup', '/api/auth/login']) assert.equal((await app.api(path, { method: 'POST', data: { token: BOOTSTRAP, password: 'not-supported-password' } })).status, 404);
    for (const path of ['/api/articles', '/api/session', '/api/publish', '/api/extension', '/api/assets/content/test/image.png']) assert.equal((await app.api(path)).status, 401);
    assert.equal((await disabled.api('/api/auth/session')).data.loginAvailable, false);
    assert.equal((await disabled.api('/api/auth/wechat/start', { method: 'POST', data: {} })).status, 503);
  } finally { await app.close(); await disabled.close(); }
});

test('Host and Origin are enforced except for the exact GET OAuth callback and public navigation', async () => {
  const app = await fixture();
  try {
    for (const headers of [{ Host: 'wrong.test' }, { Origin: 'https://wrong.test' }, { Origin: '' }, { 'Sec-Fetch-Site': 'cross-site' }]) {
      assert.equal((await app.api('/api/auth/wechat/start', { method: 'POST', data: {}, headers })).status, 403);
    }
    assert.equal((await app.api('/api/auth/session', { headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 403);
    assert.equal((await app.api('/', { headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 200);
    const flow = await app.begin();
    assert.equal((await app.callback(flow, { headers: { Host: 'wrong.test' } })).status, 403);
    assert.equal((await app.api('/api/auth/wechat/callback', { method: 'POST', headers: { Origin: 'https://open.weixin.qq.com' } })).status, 403);
    assert.equal((await app.api('/api/auth/wechat/callback', { method: 'HEAD', headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 403);
    assert.equal((await app.api('/api/auth/wechat/callback/', { headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 403);
    assert.equal(app.fetchCount, 0);
  } finally { await app.close(); }
});

test('valid one-time private enrollment binds only the WeChat identity and stores no provider secrets', async () => {
  const app = await fixture();
  try {
    const flow = await app.begin({ setup: true });
    assert.match(flow.response.headers['set-cookie'][0], /Path=\/admin\/; Max-Age=600; HttpOnly; Secure; SameSite=Lax/);
    const path = join(app.stateDirectory, 'wechat-states', `${digest(flow.state)}.json`);
    assert.equal((await stat(path)).mode & 0o777, 0o600);
    const flowText = await readFile(path, 'utf8');
    for (const sensitive of [flow.state, flow.cookie, BOOTSTRAP, SECRET]) assert.equal(flowText.includes(sensitive), false);
    const result = await app.callback(flow);
    assert.equal(result.headers.location, `${ORIGIN}/admin/`);
    const sessionCookie = result.headers['set-cookie'].find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`));
    assert.match(sessionCookie, /Path=\/admin\/; Max-Age=604800; HttpOnly; Secure; SameSite=Strict/);
    const ownerText = await readFile(join(app.stateDirectory, 'wechat-account.json'), 'utf8');
    assert.equal(JSON.parse(ownerText).openid, OWNER);
    assert.equal(JSON.parse(ownerText).appId, APP_ID);
    assert.equal((await stat(join(app.stateDirectory, 'wechat-account.json'))).mode & 0o777, 0o600);
    for (const sensitive of [BOOTSTRAP, SECRET, 'test-access-token-do-not-persist']) assert.equal(ownerText.includes(sensitive), false);
    await assert.rejects(readFile(app.bootstrapTokenFile), { code: 'ENOENT' });
    await assert.rejects(readFile(path), { code: 'ENOENT' });
    const session = (await app.api('/api/auth/session')).data;
    assert.equal(session.authenticated, true); assert.equal(session.setupRequired, false); assert.equal(session.role, 'admin');
    assert.equal((await app.api('/api/articles')).status, 200);
    assert.equal((await app.api('/api/extension')).status, 200);
  } finally { await app.close(); }
});

test('missing or incorrect setup proof never makes the first WeChat visitor an admin', async () => {
  const app = await fixture();
  try {
    assert.equal((await app.api('/api/auth/wechat/start', { method: 'POST', data: { setupToken: 'wrong-setup-token-long-enough-123456' } })).status, 403);
    assert.equal((await app.api('/api/auth/wechat/start', { method: 'POST', data: { setupToken: [BOOTSTRAP] } })).status, 403);
    const flow = await app.begin();
    errorRedirect(await app.callback(flow), 'wechat_access_denied');
    assert.equal(app.cookies.has(SESSION_COOKIE), false);
    assert.equal((await app.api('/api/articles')).status, 401);
    await assert.rejects(readFile(join(app.stateDirectory, 'wechat-account.json')), { code: 'ENOENT' });
    assert.equal(await readFile(app.bootstrapTokenFile, 'utf8'), BOOTSTRAP);
  } finally { await app.close(); }
});

test('expired, duplicated, mismatched and replayed state is rejected before token exchange', async () => {
  const app = await fixture();
  try {
    const flow = await app.begin({ setup: true });
    errorRedirect(await app.callback(flow, { jar: new Map() }), 'wechat_state_invalid');
    errorRedirect(await app.callback(flow, { jar: new Map([[STATE_COOKIE, 'wrong-verifier-with-sufficient-length-123456']]) }), 'wechat_state_invalid');
    errorRedirect(await app.callback({ state: 'wrong-state-with-sufficient-length-123456' }), 'wechat_state_invalid');
    errorRedirect(await app.callback(flow, { extra: `&state=${flow.state}` }), 'wechat_state_invalid');
    const cookie = `${STATE_COOKIE}=${flow.cookie}`;
    errorRedirect(await app.callback(flow, { headers: { Cookie: `${cookie}; ${cookie}` } }), 'wechat_state_invalid');
    assert.equal(app.fetchCount, 0);
    app.advance(10 * 60 * 1000 + 1);
    errorRedirect(await app.callback(flow), 'wechat_state_invalid');
    assert.equal(app.fetchCount, 0);
    const fresh = await app.begin({ setup: true });
    const saved = new Map(app.cookies);
    assert.equal((await app.callback(fresh)).headers.location, `${ORIGIN}/admin/`);
    errorRedirect(await app.callback(fresh, { jar: saved }), 'wechat_state_invalid');
    assert.equal(app.fetchCount, 1);
  } finally { await app.close(); }
});

test('cancellation and provider errors consume state without leaking code or creating an owner', async () => {
  const app = await fixture();
  try {
    let flow = await app.begin({ setup: true });
    errorRedirect(await app.callback(flow, { code: null }), 'wechat_cancelled');
    assert.equal(app.fetchCount, 0);
    for (const response of [Response.json({ errcode: 40029, errmsg: 'sensitive-provider-debug' }), Response.json({ openid: 'short', access_token: 'x' }), Response.json({ openid: [OWNER], access_token: 'x' }), Response.json({ openid: OWNER, unionid: [UNION], access_token: 'x' }), new Response('invalid-json'), new Response('x'.repeat(16 * 1024 + 1)), Response.json({ openid: OWNER }, { status: 500 })]) {
      app.respond(response); flow = await app.begin({ setup: true });
      const result = await app.callback(flow);
      errorRedirect(result, 'wechat_callback_failed');
      assert.equal(JSON.stringify(result).includes('sensitive-provider-debug'), false);
      assert.equal(app.cookies.has(SESSION_COOKIE), false);
      await assert.rejects(readFile(join(app.stateDirectory, 'wechat-account.json')), { code: 'ENOENT' });
      await assert.rejects(readFile(join(app.stateDirectory, 'wechat-states', `${digest(flow.state)}.json`)), { code: 'ENOENT' });
    }
    app.fail(new DOMException('Network operation timeout', 'TimeoutError'));
    flow = await app.begin({ setup: true });
    errorRedirect(await app.callback(flow), 'wechat_callback_failed');
    assert.equal(await readFile(app.bootstrapTokenFile, 'utf8'), BOOTSTRAP);
  } finally { await app.close(); }
});

test('only one concurrent callback consumes each flow and owner binding is unique across flows', { timeout: 5000 }, async () => {
  const app = await fixture();
  try {
    const firstJar = new Map(); const secondJar = new Map();
    const first = await app.begin({ setup: true, jar: firstJar });
    const second = await app.begin({ setup: true, jar: secondJar });
    let resume; app.pause(new Promise((resolve) => { resume = resolve; }));
    const initial = app.callback(first, { jar: firstJar, acceptCookie: false });
    while (!app.fetchCount) await new Promise((resolve) => setTimeout(resolve, 5));
    const replay = await app.callback(first, { jar: new Map(firstJar) });
    errorRedirect(replay, 'wechat_state_invalid');
    resume();
    assert.equal((await initial).headers.location, `${ORIGIN}/admin/`);
    errorRedirect(await app.callback(second, { code: 'other-code', jar: secondJar }), 'wechat_access_denied');
    assert.equal(JSON.parse(await readFile(join(app.stateDirectory, 'wechat-account.json'), 'utf8')).openid, OWNER);
    assert.equal(secondJar.has(SESSION_COOKIE), false);
  } finally { await app.close(); }
});

test('login rotates the initiating browser session when the cross-site callback omits its Strict cookie', async () => {
  const app = await fixture();
  try {
    await app.enroll();
    const oldJar = new Map(app.cookies);
    const flow = await app.begin();
    const stored = JSON.parse(await readFile(join(app.stateDirectory, 'wechat-states', `${digest(flow.state)}.json`), 'utf8'));
    assert.equal(stored.previousSessionHash, digest(oldJar.get(SESSION_COOKIE)));
    const callbackJar = new Map([[STATE_COOKIE, flow.cookie]]);
    assert.equal((await app.callback(flow, { jar: callbackJar })).headers.location, `${ORIGIN}/admin/`);
    assert.equal((await app.api('/api/articles', { jar: oldJar })).status, 401);
    assert.equal((await app.api('/api/articles', { jar: callbackJar })).status, 200);
  } finally { await app.close(); }
});

test('revoked setup proof cannot bind an in-flight authorization and a different WeChat identity stays denied', async () => {
  const app = await fixture();
  try {
    const flow = await app.begin({ setup: true });
    await writeFile(app.bootstrapTokenFile, 'replacement-private-setup-token-at-least-32-characters', { mode: 0o600 });
    errorRedirect(await app.callback(flow), 'wechat_access_denied');
    await writeFile(app.bootstrapTokenFile, BOOTSTRAP, { mode: 0o600 });
    await app.enroll();
    const strangerJar = new Map();
    const stranger = await app.begin({ jar: strangerJar });
    errorRedirect(await app.callback(stranger, { code: 'other-code', jar: strangerJar }), 'wechat_access_denied');
    assert.equal((await app.api('/api/articles', { jar: strangerJar })).status, 401);
    assert.equal(strangerJar.has(SESSION_COOKIE), false);
  } finally { await app.close(); }
});

test('admin sessions survive restart, require CSRF, rotate on login and are revoked on logout', async () => {
  const app = await fixture();
  try {
    await app.enroll();
    const oldJar = new Map(app.cookies);
    await app.restart();
    assert.equal((await app.api('/api/articles')).status, 200);
    assert.equal((await app.api('/api/auth/logout', { method: 'POST', headers: { 'x-author-token': '' } })).status, 403);
    assert.equal((await app.api('/api/auth/logout', { method: 'POST', headers: { Origin: 'https://wrong.test' } })).status, 403);
    assert.equal((await app.api('/api/extension', { method: 'POST', data: {} })).status, 200);
    const fresh = await app.begin();
    assert.equal((await app.callback(fresh)).headers.location, `${ORIGIN}/admin/`);
    assert.notEqual(app.cookies.get(SESSION_COOKIE), oldJar.get(SESSION_COOKIE));
    assert.equal((await app.api('/api/articles', { jar: oldJar })).status, 401);
    await app.api('/api/auth/session');
    const currentJar = new Map(app.cookies);
    assert.equal((await app.api('/api/auth/logout', { method: 'POST' })).status, 200);
    assert.equal((await app.api('/api/articles', { jar: currentJar })).status, 401);
  } finally { await app.close(); }
});

test('password sessions, expired sessions and changed owner identities cannot authorize reads', async () => {
  const app = await fixture();
  try {
    const oldToken = randomBytes(32).toString('base64url');
    const legacy = join(app.stateDirectory, 'sessions'); await mkdir(legacy, { recursive: true });
    await writeFile(join(legacy, `${digest(oldToken)}.json`), JSON.stringify({ version: 1, csrfToken: randomBytes(32).toString('base64url'), expiresAt: Date.now() + 100000 }));
    assert.equal((await app.api('/api/articles', { jar: new Map([[SESSION_COOKIE, oldToken]]) })).status, 401);
    await app.enroll();
    app.advance(7 * 24 * 60 * 60 * 1000 + 1);
    assert.equal((await app.api('/api/articles')).status, 401);
    await app.callback(await app.begin());
    const path = join(app.stateDirectory, 'wechat-account.json');
    const owner = JSON.parse(await readFile(path, 'utf8'));
    await writeFile(path, JSON.stringify({ ...owner, id: randomBytes(32).toString('base64url') }));
    assert.equal((await app.api('/api/articles')).status, 401);
  } finally { await app.close(); }
});

test('new authorizations invalidate the old browser flow cookie; starts are bounded', async () => {
  const app = await fixture();
  try {
    const first = await app.begin();
    await app.begin();
    errorRedirect(await app.callback(first), 'wechat_state_invalid');
    for (let i = 0; i < 28; i++) await app.begin();
    assert.equal((await app.api('/api/auth/wechat/start', { method: 'POST', data: {}, headers: { 'X-Forwarded-For': '192.0.2.1' } })).status, 429);
    app.advance(60_001);
    await app.begin();
  } finally { await app.close(); }
});
