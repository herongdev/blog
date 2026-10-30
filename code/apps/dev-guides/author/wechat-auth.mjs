import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { chmod, lstat, mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;
const STATE_TTL = 10 * 60 * 1000;
const SESSION_COOKIE = '__Secure-herong_author';
const STATE_COOKIE = '__Secure-herong_author_wechat';
const TOKEN = /^[A-Za-z0-9_-]{32,256}$/;
const IDENTIFIER = /^[A-Za-z0-9_-]{16,128}$/;
const isIdentifier = (value) => typeof value === 'string' && IDENTIFIER.test(value);
const HASH = /^[a-f0-9]{64}$/;
const CALLBACK = '/api/auth/wechat/callback';
const digest = (value) => createHash('sha256').update(value).digest('hex');
const randomToken = () => randomBytes(32).toString('base64url');
const failure = (status, message) => Object.assign(new Error(message), { status });
const equal = (a, b) => typeof a === 'string' && typeof b === 'string' && timingSafeEqual(Buffer.from(digest(a), 'hex'), Buffer.from(digest(b), 'hex'));

async function privateDirectory(path) {
  await mkdir(path, { recursive: true, mode: 0o700 });
  const info = await lstat(path);
  if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('Invalid private authentication directory');
  await chmod(path, 0o700);
}

async function privateJson(path) {
  try {
    const info = await lstat(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 16 * 1024) throw new Error('Invalid authentication state');
    await chmod(path, 0o600);
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function atomicJson(path, value) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, `${JSON.stringify(value)}\n`, { flag: 'wx', mode: 0o600 });
    await rename(temporary, path);
  } finally {
    await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; });
  }
}

function readCookie(request, name) {
  const values = (request.headers.cookie ?? '').split(';').map((item) => item.trim()).filter((item) => item.startsWith(`${name}=`));
  if (values.length !== 1) return null;
  const value = values[0].slice(name.length + 1);
  return TOKEN.test(value) ? value : null;
}

function appendCookie(response, value) {
  const current = response.getHeader('Set-Cookie');
  response.setHeader('Set-Cookie', [...(Array.isArray(current) ? current : current ? [current] : []), value]);
}

async function boundedJson(response) {
  if (!response.ok || Number(response.headers.get('content-length')) > 16 * 1024 || !response.body) throw new Error('Invalid provider response');
  const reader = response.body.getReader();
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16 * 1024) throw new Error('Provider response too large');
      chunks.push(Buffer.from(value));
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } finally { await reader.cancel().catch(() => {}); }
}

/** Website WeChat OAuth: the private setup proof authorizes one owner binding only. */
export function createWechatAuthorAuth({ origin, basePath = '/', stateDirectory, bootstrapTokenFile, wechat = {} }) {
  const configured = new URL(origin);
  if (configured.protocol !== 'https:' || configured.origin !== origin || configured.username || configured.password) throw new Error('Author requires an HTTPS origin');
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(basePath) || !stateDirectory || !bootstrapTokenFile) throw new Error('Invalid author authentication configuration');
  const { appId, appSecret, fetchImpl = globalThis.fetch, now = Date.now } = wechat;
  if (appId && (typeof appId !== 'string' || !/^wx[a-f0-9]{16}$/.test(appId))) throw new Error('Invalid WeChat website AppID');
  if (appSecret && (typeof appSecret !== 'string' || !/^[A-Za-z0-9_-]{16,256}$/.test(appSecret))) throw new Error('Invalid WeChat website secret');
  const loginAvailable = Boolean(appId && appSecret);
  const stateRoot = resolve(stateDirectory);
  const accountPath = join(stateRoot, 'wechat-account.json');
  const sessionsRoot = join(stateRoot, 'wechat-sessions');
  const flowsRoot = join(stateRoot, 'wechat-states');
  const bootstrapPath = resolve(bootstrapTokenFile);
  const callbackUrl = new URL(`${basePath}${CALLBACK.slice(1)}`, origin).toString();
  const ready = Promise.all([privateDirectory(stateRoot), privateDirectory(sessionsRoot), privateDirectory(flowsRoot)]).then(() => account());
  ready.catch(() => {});
  let queue = Promise.resolve();
  let attempts = [];

  async function locked(action) {
    const previous = queue;
    let release;
    queue = new Promise((done) => { release = done; });
    await previous;
    try { return await action(); } finally { release(); }
  }

  async function account() {
    const value = await privateJson(accountPath);
    if (value && (value.version !== 1 || value.provider !== 'wechat' || typeof value.appId !== 'string' || !/^wx[a-f0-9]{16}$/.test(value.appId) || !isIdentifier(value.openid) || typeof value.id !== 'string' || !TOKEN.test(value.id))) throw new Error('Invalid WeChat owner state');
    return value;
  }

  function checkHost(request) {
    if (request.headers.host !== configured.host) throw failure(403, '访问地址不允许');
  }

  function checkOrigin(request, mutation = false) {
    checkHost(request);
    if (request.headers.origin && request.headers.origin !== origin) throw failure(403, '请求来源不允许');
    // Static HTML/assets may be reached by a top-level OAuth redirect. Sensitive
    // APIs retain the strict cross-site and mutation origin checks.
    const pathname = new URL(request.url, origin).pathname;
    if (request.headers['sec-fetch-site'] === 'cross-site' && (mutation || pathname.startsWith('/api/'))) throw failure(403, '请求来源不允许');
    if (mutation && request.headers.origin !== origin) throw failure(403, '请求来源不允许');
  }

  function sessionCookie(response, token, expires = SESSION_TTL / 1000) {
    appendCookie(response, `${SESSION_COOKIE}=${token}; Path=${basePath}; Max-Age=${expires}; HttpOnly; Secure; SameSite=Strict`);
  }

  function flowCookie(response, verifier, expires = STATE_TTL / 1000) {
    appendCookie(response, `${STATE_COOKIE}=${verifier}; Path=${basePath}; Max-Age=${expires}; HttpOnly; Secure; SameSite=Lax`);
  }

  async function removeSession(token) {
    if (token) await unlink(join(sessionsRoot, `${digest(token)}.json`)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
  }

  async function session(request) {
    await ready;
    const token = readCookie(request, SESSION_COOKIE);
    if (!token) return null;
    const value = await privateJson(join(sessionsRoot, `${digest(token)}.json`));
    const owner = await account();
    if (!value || value.version !== 2 || value.provider !== 'wechat' || !owner || owner.appId !== appId || value.ownerId !== owner.id || !Number.isFinite(value.expiresAt) || value.expiresAt <= now() || !TOKEN.test(value.csrfToken)) {
      await removeSession(token);
      return null;
    }
    return { token, csrfToken: value.csrfToken, expiresAt: value.expiresAt, role: 'admin' };
  }

  function checkCsrf(request, current) {
    if (!current || !equal(request.headers['x-author-token'], current.csrfToken)) throw failure(403, '页面验证已失效，请重新登录');
  }

  async function cleanup(directory) {
    let count = 0;
    for (const name of await readdir(directory)) {
      if (!/^[a-f0-9]{64}\.json$/.test(name)) continue;
      const path = join(directory, name);
      const value = await privateJson(path);
      if (!value || !Number.isFinite(value.expiresAt) || value.expiresAt <= now()) await unlink(path).catch((error) => { if (error.code !== 'ENOENT') throw error; });
      else count++;
    }
    return count;
  }

  async function bootstrapProof() {
    try {
      const info = await lstat(bootstrapPath);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 512 || (info.mode & 0o077)) throw new Error('Invalid setup proof');
      const token = (await readFile(bootstrapPath, 'utf8')).trim();
      if (!TOKEN.test(token)) throw new Error('Invalid setup proof');
      return digest(token);
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw error;
    }
  }

  async function start(request, response, input) {
    if (!loginAvailable) throw failure(503, '微信登录暂不可用，请稍后重试');
    const result = await locked(async () => {
      attempts = attempts.filter((at) => at > now() - 60_000);
      if (attempts.length >= 30) throw failure(429, '操作较频繁，请稍后重试');
      attempts.push(now());
      if (await cleanup(flowsRoot) >= 100) throw failure(429, '登录请求较多，请稍后重试');
      const owner = await account();
      let setupProof;
      if (input?.setupToken !== undefined && input.setupToken !== '' && !owner) {
        const expected = await bootstrapProof();
        if (typeof input.setupToken !== 'string' || !TOKEN.test(input.setupToken) || !expected || !equal(digest(input.setupToken), expected)) throw failure(403, '管理员绑定链接无效或已使用');
        setupProof = expected;
      }
      const state = randomToken();
      const verifier = randomToken();
      // The Strict session cookie is absent on the cross-site callback. Retain
      // only its verified file hash in this browser-bound flow for rotation.
      const previousSession = await session(request);
      await atomicJson(join(flowsRoot, `${digest(state)}.json`), {
        version: 1, appId, verifierHash: digest(verifier), expiresAt: now() + STATE_TTL,
        ...(setupProof ? { setupProof } : {}),
        ...(previousSession ? { previousSessionHash: digest(previousSession.token) } : {}),
      });
      return { state, verifier };
    });
    flowCookie(response, result.verifier);
    const url = new URL('https://open.weixin.qq.com/connect/qrconnect');
    url.search = new URLSearchParams({ appid: appId, redirect_uri: callbackUrl, response_type: 'code', scope: 'snsapi_login', state: result.state }).toString();
    url.hash = 'wechat_redirect';
    return { url: url.toString() };
  }

  function redirect(response, error) {
    const target = new URL(basePath, origin);
    if (error) target.searchParams.set('authError', error);
    response.writeHead(303, { Location: target.toString(), 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'X-Content-Type-Options': 'nosniff' });
    response.end();
  }

  async function callback(request, response) {
    checkHost(request);
    const params = new URL(request.url, origin).searchParams;
    const state = params.get('state');
    const verifier = readCookie(request, STATE_COOKIE);
    let flow;
    try {
      if (!loginAvailable || params.getAll('state').length !== 1 || !TOKEN.test(state ?? '') || !verifier) throw new Error('Invalid state');
      flow = await locked(async () => {
        const path = join(flowsRoot, `${digest(state)}.json`);
        const value = await privateJson(path);
        if (!value || value.version !== 1 || value.appId !== appId || !HASH.test(value.verifierHash) || !equal(digest(verifier), value.verifierHash) || !Number.isFinite(value.expiresAt) || value.expiresAt <= now()) throw new Error('Invalid state');
        await unlink(path); // Consume before calling the provider, including failures/cancellation.
        return value;
      });
    } catch { redirect(response, 'wechat_state_invalid'); return; }
    flowCookie(response, '', 0);
    const code = params.get('code');
    if (!code || params.has('error')) { redirect(response, 'wechat_cancelled'); return; }
    if (params.getAll('code').length !== 1 || !/^[A-Za-z0-9_-]{1,256}$/.test(code)) { redirect(response, 'wechat_callback_failed'); return; }
    let identity;
    try {
      const url = new URL('https://api.weixin.qq.com/sns/oauth2/access_token');
      url.search = new URLSearchParams({ appid: appId, secret: appSecret, code, grant_type: 'authorization_code' }).toString();
      const reply = await boundedJson(await fetchImpl(url, { redirect: 'error', signal: AbortSignal.timeout(10_000), headers: { Accept: 'application/json' } }));
      if (reply.errcode || !isIdentifier(reply.openid) || typeof reply.access_token !== 'string' || !reply.access_token || reply.access_token.length > 2048 || (reply.unionid !== undefined && !isIdentifier(reply.unionid))) throw new Error('Invalid provider identity');
      identity = { openid: reply.openid, ...(reply.unionid ? { unionid: reply.unionid } : {}) };
    } catch { redirect(response, 'wechat_callback_failed'); return; }
    try {
      await locked(async () => {
        let owner = await account();
        if (!owner) {
          const proof = await bootstrapProof();
          if (!flow.setupProof || !proof || !equal(flow.setupProof, proof)) throw failure(403, 'No administrator access');
          owner = { version: 1, provider: 'wechat', id: randomToken(), appId, ...identity, createdAt: new Date(now()).toISOString() };
          await atomicJson(accountPath, owner);
          await unlink(bootstrapPath);
        }
        if (owner.appId !== appId || !equal(owner.openid, identity.openid)) throw failure(403, 'No administrator access');
        if (typeof flow.previousSessionHash === 'string' && HASH.test(flow.previousSessionHash)) {
          await unlink(join(sessionsRoot, `${flow.previousSessionHash}.json`)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
        }
        await removeSession(readCookie(request, SESSION_COOKIE));
        await cleanup(sessionsRoot);
        const token = randomToken();
        await atomicJson(join(sessionsRoot, `${digest(token)}.json`), { version: 2, provider: 'wechat', ownerId: owner.id, csrfToken: randomToken(), expiresAt: now() + SESSION_TTL });
        sessionCookie(response, token);
      });
    } catch (error) { redirect(response, error.status === 403 ? 'wechat_access_denied' : 'wechat_callback_failed'); return; }
    redirect(response);
  }

  async function handle(request, response, pathname, { readJson, sendJson }) {
    if (!pathname.startsWith('/api/auth/')) return false;
    await ready;
    if (pathname === CALLBACK && request.method === 'GET') {
      await callback(request, response);
      return true;
    }
    checkOrigin(request, !['GET', 'HEAD'].includes(request.method));
    if (['/api/auth/session', '/api/auth/me'].includes(pathname) && request.method === 'GET') {
      const current = await session(request);
      sendJson(response, 200, { mode: 'online', provider: 'wechat', authenticated: Boolean(current), setupRequired: !await account(), loginAvailable, ...(current ? { role: 'admin', csrfToken: current.csrfToken } : {}) });
      return true;
    }
    if (pathname === '/api/auth/wechat/start' && request.method === 'POST') {
      sendJson(response, 200, await start(request, response, await readJson(request, 4096)));
      return true;
    }
    if (pathname === '/api/auth/logout' && request.method === 'POST') {
      const current = await session(request);
      if (!current) throw failure(401, '请先登录');
      checkCsrf(request, current);
      await removeSession(current.token);
      sessionCookie(response, '', 0);
      sendJson(response, 200, { authenticated: false });
      return true;
    }
    throw failure(404, '接口不存在');
  }

  return { ready, origin, checkOrigin, checkCsrf, session, handle };
}
