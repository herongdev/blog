import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { chmodSync, closeSync, constants, lstatSync, mkdirSync, openSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const ISSUER = 'https://auth.herong.info';
const FLOW_TTL = 600_000;
const MAX_TOKEN_AGE = 28_800;
const COOKIE_TOKEN = /^[A-Za-z0-9_-]{43}$/;
const PROVIDER_TOKEN = /^[A-Za-z0-9_-]{43,256}$/;
const PERMISSION = /^[a-z][a-z0-9_-]*(?:\.[a-z][a-z0-9_-]*){1,5}$/;
const ROLES = new Set(['owner', 'admin', 'editor', 'viewer']);
const AUTH_ROUTES = new Map([
  ['/api/auth/login', 'POST'], ['/api/auth/callback', 'GET'],
  ['/api/auth/session', 'GET'], ['/api/auth/logout', 'POST'],
]);
const hash = (value) => createHash('sha256').update(value).digest('hex');
const randomToken = () => randomBytes(32).toString('base64url');
const same = (left, right) => typeof left === 'string' && typeof right === 'string'
  && timingSafeEqual(Buffer.from(hash(left), 'hex'), Buffer.from(hash(right), 'hex'));
const fail = (status, message) => Object.assign(new Error(message), { status });
const plainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

function singleHeader(request, name) {
  let count = 0;
  for (let index = 0; index < request.rawHeaders.length; index += 2) {
    if (request.rawHeaders[index].toLowerCase() === name) count += 1;
  }
  return count === 1 && typeof request.headers[name] === 'string' ? request.headers[name] : undefined;
}

function privateResponse(response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('X-Frame-Options', 'DENY');
}

function json(response, status, data) {
  if (response.writableEnded || response.destroyed) return;
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(data));
}

function redirect(response, location) {
  if (response.writableEnded || response.destroyed) return;
  response.writeHead(303, { Location: location });
  response.end();
}

function errorResponse(response, error) {
  if (response.headersSent) { if (!response.writableEnded) response.end(); return; }
  const status = [400, 401, 403, 405, 408, 413, 415, 429, 503].includes(error?.status) ? error.status : 500;
  if ([408, 413].includes(status)) response.setHeader('Connection', 'close');
  json(response, status, { error: status === 500 ? '服务暂时不可用，请稍后再试。' : error.message });
}

function cookie(request, name) {
  const header = singleHeader(request, 'cookie');
  if (!header || header.length > 16_384) return null;
  const matches = header.split(';').map((part) => part.trim()).filter((part) => part.startsWith(`${name}=`));
  const value = matches.length === 1 ? matches[0].slice(name.length + 1) : '';
  return COOKIE_TOKEN.test(value) ? value : null;
}

function readBody(request) {
  if (!/^application\/json(?:\s*;|$)/i.test(singleHeader(request, 'content-type') || '')) throw fail(415, '请使用 JSON 请求。');
  const length = singleHeader(request, 'content-length');
  if (length !== undefined && (!/^\d+$/.test(length) || Number(length) > 8192)) throw fail(413, '提交内容过长。');
  return new Promise((resolveBody, rejectBody) => {
    let size = 0;
    const chunks = [];
    const timer = setTimeout(() => finish(fail(408, '请求超时，请重试。')), 5000);
    timer.unref();
    function cleanup() {
      clearTimeout(timer);
      request.removeListener('data', onData);
      request.removeListener('end', onEnd);
      request.removeListener('error', onError);
      request.removeListener('aborted', onAborted);
    }
    function finish(error, value) {
      cleanup();
      if (error) { request.pause(); rejectBody(error); }
      else resolveBody(value);
    }
    function onData(chunk) {
      const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += bytes.length;
      if (size > 8192) return finish(fail(413, '提交内容过长。'));
      chunks.push(bytes);
    }
    function onEnd() {
      try { finish(null, JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { finish(fail(400, '提交内容格式有误。')); }
    }
    function onError() { finish(fail(400, '请求未完成，请重试。')); }
    function onAborted() { finish(fail(400, '请求已取消。')); }
    request.on('data', onData);
    request.once('end', onEnd);
    request.once('error', onError);
    request.once('aborted', onAborted);
    if (request.aborted || request.destroyed) onAborted();
  });
}

function publicProfile(value) {
  const cleanText = (text, limit) => typeof text === 'string'
    ? [...text.replace(/[\u0000-\u001f\u007f]/g, '').trim()].slice(0, limit).join('') : '';
  let avatarUrl = '';
  if (typeof value.avatarUrl === 'string' && value.avatarUrl.length <= 2048
      && /^https:\/\/(?:wx|thirdwx)\.qlogo\.cn\//.test(value.avatarUrl)
      && !/[\s\u0000-\u001f\u007f]/.test(value.avatarUrl)) {
    try {
      const url = new URL(value.avatarUrl);
      if (url.protocol === 'https:' && ['wx.qlogo.cn', 'thirdwx.qlogo.cn'].includes(url.hostname)
          && !url.username && !url.password && !url.port && !url.search && !url.hash
          && url.pathname !== '/' && url.href === value.avatarUrl) avatarUrl = url.href;
    } catch { /* Invalid profile images use the application's fallback avatar. */ }
  }
  return {
    name: cleanText(value.name, 80), nickname: cleanText(value.nickname, 80), avatarUrl,
    profileUpdatedAt: Number.isSafeInteger(value.profileUpdatedAt) && value.profileUpdatedAt > 0 ? value.profileUpdatedAt : null,
  };
}

export function createIdentityClient(options) {
  if (!plainObject(options)) throw new TypeError('Identity client options are required.');
  const { origin, clientId, dataDirectory, appId, permissions = [], clientSecret = '', allowHttp = false } = options;
  if (typeof origin !== 'string' || origin.length > 2048) throw new TypeError('Invalid application origin.');
  const publicUrl = new URL(origin);
  const preview = allowHttp === true && publicUrl.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(publicUrl.hostname);
  if (typeof allowHttp !== 'boolean' || publicUrl.origin !== origin || publicUrl.username || publicUrl.password || (!preview && publicUrl.protocol !== 'https:')) throw new TypeError('Application origin must be HTTPS; HTTP previews require explicit loopback configuration.');
  if (typeof appId !== 'string' || !/^[a-z][a-z0-9_-]{1,63}$/.test(appId)) throw new TypeError('Invalid application slug.');
  if (typeof clientId !== 'string' || (clientId !== '' && !/^[a-z][a-z0-9_-]{1,63}$/.test(clientId))) throw new TypeError('Invalid identity client ID.');
  if (typeof clientSecret !== 'string' || (clientSecret !== '' && !/^[A-Za-z0-9_-]{32,256}$/.test(clientSecret)) || (clientSecret && !clientId)) throw new TypeError('Invalid server identity credential configuration.');
  if (!Array.isArray(permissions) || permissions.length > 64 || new Set(permissions).size !== permissions.length
      || permissions.some((value) => typeof value !== 'string' || value.length > 128 || !PERMISSION.test(value) || !value.startsWith(`${appId}.`))) throw new TypeError('Invalid application permission allowlist.');
  if (typeof dataDirectory !== 'string' || !dataDirectory || dataDirectory.length > 4096) throw new TypeError('A private data directory is required.');
  const knownPermissions = new Set(permissions);
  // The canonical IAM registry accepts HTTPS callbacks only. Loopback HTTP is
  // a UI preview, even if server credentials happen to be present locally.
  const loginAvailable = !preview && Boolean(clientId && clientSecret);
  const callback = `${origin}/api/auth/callback`;
  const cookieName = preview ? `herong_preview_${appId}_session` : `__Host-herong_${appId}_session`;
  const flowName = preview ? `herong_preview_${appId}_flow` : `__Host-herong_${appId}_flow`;
  const dataDir = resolve(dataDirectory);
  mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  const directoryStat = lstatSync(dataDir);
  if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()) throw new Error('Invalid private identity data directory.');
  chmodSync(dataDir, 0o700);
  const dbPath = join(dataDir, `identity-${appId}.sqlite`);
  for (const suffix of ['', '-wal', '-shm', '-journal']) {
    try {
      const stat = lstatSync(`${dbPath}${suffix}`);
      if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1) throw new Error('Invalid private identity database file.');
      chmodSync(`${dbPath}${suffix}`, 0o600);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  try { closeSync(openSync(dbPath, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY, 0o600)); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
  const db = new DatabaseSync(dbPath);
  let closed = false;
  try {
    db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS identity_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS identity_sessions (
        hash TEXT PRIMARY KEY, provider_token TEXT NOT NULL, sub TEXT NOT NULL,
        csrf TEXT NOT NULL, expires INTEGER NOT NULL, browser_hash TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE IF NOT EXISTS identity_flows (
        hash TEXT PRIMARY KEY, browser_hash TEXT NOT NULL, verifier TEXT NOT NULL,
        expires INTEGER NOT NULL, exchanging INTEGER NOT NULL DEFAULT 0
      );
      CREATE INDEX IF NOT EXISTS identity_flow_browser ON identity_flows(browser_hash);`);
    if (!db.prepare('PRAGMA table_info(identity_sessions)').all().some((column) => column.name === 'browser_hash')) {
      db.exec("ALTER TABLE identity_sessions ADD COLUMN browser_hash TEXT NOT NULL DEFAULT ''");
    }
    db.exec('CREATE INDEX IF NOT EXISTS identity_session_browser ON identity_sessions(browser_hash)');
    db.exec('BEGIN IMMEDIATE');
    try {
      const settings = { issuer: ISSUER, origin, app_id: appId, ...(clientId ? { client_id: clientId } : {}) };
      for (const [key, value] of Object.entries(settings)) {
        const previous = db.prepare('SELECT value FROM identity_meta WHERE key=?').get(key);
        if (previous && previous.value !== value) throw new Error('Identity database belongs to another application configuration; use its own private data directory.');
        db.prepare('INSERT OR IGNORE INTO identity_meta VALUES(?,?)').run(key, value);
      }
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); throw error; }
    db.prepare('DELETE FROM identity_sessions WHERE expires<=?').run(Date.now());
    db.prepare('DELETE FROM identity_flows WHERE expires<=?').run(Date.now());
  } catch (error) { db.close(); throw error; }
  const requests = new Set();
  let loginAttempts = [];

  function assertOpen() { if (closed) throw fail(503, '登录服务正在关闭，请稍后重试。'); }
  function checkRequest(request, response) {
    assertOpen();
    privateResponse(response);
    if (singleHeader(request, 'host') !== publicUrl.host) throw fail(403, '访问地址不允许。');
    if (typeof request.url !== 'string' || !request.url.startsWith('/') || request.url.startsWith('//')
        || request.url.length > 8192 || /[\\\u0000-\u0020\u007f]/.test(request.url)) throw fail(400, '请求地址有误。');
    const url = new URL(request.url, origin);
    if (url.origin !== origin) throw fail(400, '请求地址有误。');
    return url;
  }
  function checkOrigin(request) {
    if (singleHeader(request, 'origin') !== origin || request.headers['sec-fetch-site'] === 'cross-site') throw fail(403, '请求来源不允许，请刷新页面后重试。');
  }
  function csrf(request, session) {
    if (!same(singleHeader(request, 'x-csrf-token'), session.csrf)) throw fail(403, '页面验证已失效，请刷新后重试。');
  }
  function setCookie(response, name, value, seconds) {
    const previous = response.getHeader('Set-Cookie') || [];
    response.setHeader('Set-Cookie', [...(Array.isArray(previous) ? previous : [previous]), `${name}=${value}; Path=/; Max-Age=${seconds}; HttpOnly; ${preview ? '' : 'Secure; '}SameSite=Lax`]);
  }
  function localSession(request) {
    const value = cookie(request, cookieName);
    return value ? db.prepare('SELECT * FROM identity_sessions WHERE hash=?').get(hash(value)) : undefined;
  }
  function clearBrowserFlow(request) {
    const browser = cookie(request, flowName);
    if (browser) db.prepare('DELETE FROM identity_flows WHERE browser_hash=?').run(hash(browser));
  }
  function discardFlow(flow) {
    if (!closed && flow) db.prepare('DELETE FROM identity_flows WHERE hash=? AND browser_hash=?').run(flow.hash, flow.browser_hash);
  }
  function transaction(callback) {
    assertOpen();
    db.exec('BEGIN IMMEDIATE');
    try { const result = callback(); db.exec('COMMIT'); return result; }
    catch (error) { db.exec('ROLLBACK'); throw error; }
  }
  function loginLimit() {
    const now = Date.now();
    loginAttempts = loginAttempts.filter((time) => now - time < 60_000);
    if (loginAttempts.length >= 30) throw fail(429, '登录请求较多，请一分钟后再试。');
    loginAttempts.push(now);
  }
  async function identity(path, input, timeoutMs = 8000) {
    assertOpen();
    if (!loginAvailable) throw fail(503, '登录暂未开放。');
    if (requests.size >= 24) throw fail(503, '登录服务繁忙，请稍后再试。');
    const controller = new AbortController();
    requests.add(controller);
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    timer.unref();
    try {
      const response = await fetch(`${ISSUER}${path}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, redirect: 'error',
        body: JSON.stringify({ ...input, client_id: clientId, client_secret: clientSecret }), signal: controller.signal,
      });
      if (Number(response.headers.get('content-length')) > 16_384 || !response.body) throw new Error('Invalid identity response.');
      const reader = response.body.getReader();
      const chunks = [];
      let size = 0;
      try {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          size += part.value.length;
          if (size > 16_384) throw new Error('Identity response exceeded limit.');
          chunks.push(Buffer.from(part.value));
        }
      } finally { await reader.cancel().catch(() => {}); }
      const result = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (!response.ok) throw fail([400, 401, 403].includes(response.status) ? 401 : 503, '登录服务暂不可用，请稍后重试。');
      if (!plainObject(result)) throw new Error('Invalid identity result.');
      assertOpen();
      return result;
    } catch (error) {
      if (error.status) throw error;
      throw fail(503, '登录服务暂时无法连接，请稍后再试。');
    } finally { clearTimeout(timer); controller.abort(); requests.delete(controller); }
  }
  function validIdentity(value, expectedSub) {
    return plainObject(value) && value.issuer === ISSUER && value.client_id === clientId
      && typeof value.sub === 'string' && /^[^\s\u0000-\u001f\u007f]{1,128}$/.test(value.sub)
      && (expectedSub === undefined || value.sub === expectedSub) && ROLES.has(value.role)
      && Array.isArray(value.permissions) && value.permissions.length <= 64
      && value.permissions.every((permission) => typeof permission === 'string' && permission.length <= 128
        && PERMISSION.test(permission) && permission.startsWith(`${appId}.`));
  }
  function publicSession(current, checked, expiresAt) {
    return {
      authenticated: true, loginAvailable, sub: current.sub, ...publicProfile(checked), role: checked.role,
      permissions: [...new Set(checked.permissions.filter((permission) => knownPermissions.has(permission)))],
      csrfToken: current.csrf, expiresAt,
    };
  }
  async function getSession(request, response) {
    checkRequest(request, response);
    if (!loginAvailable) return null;
    const current = localSession(request);
    if (!current) return null;
    if (current.expires <= Date.now()) { db.prepare('DELETE FROM identity_sessions WHERE hash=?').run(current.hash); return null; }
    let checked;
    try { checked = await identity('/introspect', { token: current.provider_token }); }
    catch (error) { if (error.status === 401) throw fail(503, '登录状态暂时无法验证，请稍后重试。'); throw error; }
    assertOpen();
    const expiresAt = Number.isSafeInteger(checked.exp) ? Math.min(current.expires, checked.exp * 1000) : 0;
    if (checked.active !== true || !validIdentity(checked, current.sub) || expiresAt <= Date.now()
        || checked.exp > Math.floor(Date.now() / 1000) + MAX_TOKEN_AGE + 60) {
      db.prepare('DELETE FROM identity_sessions WHERE hash=?').run(current.hash);
      // Do not let a delayed GET response erase a newer login's browser cookie.
      return null;
    }
    // Logout can cancel the session while introspection is in flight.
    const live = db.prepare('SELECT * FROM identity_sessions WHERE hash=? AND expires>?').get(current.hash, Date.now());
    if (!live || live.provider_token !== current.provider_token || live.sub !== current.sub) return null;
    db.prepare('UPDATE identity_sessions SET expires=MIN(expires,?) WHERE hash=?').run(expiresAt, current.hash);
    return publicSession(current, checked, expiresAt);
  }
  async function requirePermission(request, response, permission) {
    try {
      checkRequest(request, response);
      const writing = !['GET', 'HEAD'].includes(request.method);
      if (writing) checkOrigin(request);
      const current = await getSession(request, response);
      if (!current) throw fail(401, '请先使用已授权的微信账号登录。');
      if (writing) {
        if (!same(singleHeader(request, 'x-csrf-token'), current.csrfToken)) throw fail(403, '页面验证已失效，请刷新后重试。');
      }
      if (!knownPermissions.has(permission) || !current.permissions.includes(permission)) throw fail(403, '当前账号没有执行此操作的权限。');
      return current;
    } catch (error) { errorResponse(response, error); return null; }
  }
  async function login(request, response) {
    checkOrigin(request);
    loginLimit();
    if (!loginAvailable) throw fail(503, '登录暂未开放。');
    const input = await readBody(request);
    assertOpen();
    if (!plainObject(input) || Object.keys(input).some((key) => key !== 'loginVersion')
        || (input.loginVersion !== undefined && input.loginVersion !== 2)) throw fail(400, '登录请求无效，请刷新页面后重试。');
    const now = Date.now();
    const state = randomToken();
    // Keep a browser's flow identifier stable while it is live. Another tab can
    // replace the state, but logout must still cancel a session created by an
    // earlier callback whose response has not reached the browser yet.
    const browser = cookie(request, flowName) || randomToken();
    const verifier = randomToken();
    transaction(() => {
      db.prepare('DELETE FROM identity_flows WHERE expires<=?').run(now);
      db.prepare('DELETE FROM identity_sessions WHERE expires<=?').run(now);
      clearBrowserFlow(request);
      if (db.prepare('SELECT COUNT(*) AS count FROM identity_flows').get().count >= 2000) throw fail(429, '登录请求较多，请稍后再试。');
      db.prepare('INSERT INTO identity_flows(hash,browser_hash,verifier,expires) VALUES(?,?,?,?)').run(hash(state), hash(browser), verifier, now + FLOW_TTL);
    });
    setCookie(response, flowName, browser, FLOW_TTL / 1000);
    const target = new URL(`${ISSUER}/authorize`);
    target.search = new URLSearchParams({ response_type: 'code', client_id: clientId, redirect_uri: callback,
      state, code_challenge: createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256' }).toString();
    json(response, 200, { url: target.toString() });
  }
  async function completeLogin(request, response, url) {
    const state = url.searchParams.get('state');
    const browser = cookie(request, flowName);
    let flow;
    if (COOKIE_TOKEN.test(state || '') && browser && url.searchParams.getAll('state').length === 1) {
      flow = db.prepare('SELECT * FROM identity_flows WHERE hash=? AND browser_hash=? AND expires>?').get(hash(state), hash(browser), Date.now());
    }
    // A repeated callback must not cancel an exchange already using this flow.
    if (flow?.exchanging) return redirect(response, '/admin/?error=invalid_flow');
    if (!flow || url.searchParams.getAll('iss').length !== 1 || url.searchParams.get('iss') !== ISSUER) {
      discardFlow(flow); return redirect(response, '/admin/?error=invalid_flow');
    }
    const code = url.searchParams.get('code');
    if (url.searchParams.has('error') || !PROVIDER_TOKEN.test(code || '') || url.searchParams.getAll('code').length !== 1) {
      discardFlow(flow); return redirect(response, '/admin/?error=access_denied');
    }
    const claimed = db.prepare('UPDATE identity_flows SET exchanging=1 WHERE hash=? AND browser_hash=? AND exchanging=0 AND expires>? RETURNING hash').get(flow.hash, flow.browser_hash, Date.now());
    if (!claimed) return redirect(response, '/admin/?error=invalid_flow');
    let issuedToken;
    try {
      const result = await identity('/token', { grant_type: 'authorization_code', code, redirect_uri: callback, code_verifier: flow.verifier });
      if (PROVIDER_TOKEN.test(result.access_token || '')) issuedToken = result.access_token;
      if (!validIdentity(result) || !issuedToken || result.token_type !== 'Bearer'
          || !Number.isSafeInteger(result.expires_in) || result.expires_in < 1 || result.expires_in > MAX_TOKEN_AGE) throw fail(403, '应用登录授权无效。');
      if (request.aborted || response.destroyed) throw fail(400, '登录请求已取消。');
      const value = randomToken();
      const previous = localSession(request);
      transaction(() => {
        // Keep the flow cancellable during network I/O, then consume and create
        // the session atomically. Logout deleting the flow wins the race.
        const consumed = db.prepare('DELETE FROM identity_flows WHERE hash=? AND browser_hash=? AND exchanging=1 AND expires>? RETURNING hash').get(flow.hash, flow.browser_hash, Date.now());
        if (!consumed) throw fail(400, '登录请求已取消或过期。');
        if (previous) db.prepare('DELETE FROM identity_sessions WHERE hash=?').run(previous.hash);
        if (db.prepare('SELECT COUNT(*) AS count FROM identity_sessions').get().count >= 5000) throw fail(429, '登录服务繁忙，请稍后再试。');
        db.prepare('INSERT INTO identity_sessions(hash,provider_token,sub,csrf,expires,browser_hash) VALUES(?,?,?,?,?,?)').run(hash(value), issuedToken, result.sub, randomToken(), Date.now() + result.expires_in * 1000, flow.browser_hash);
      });
      issuedToken = undefined;
      setCookie(response, cookieName, value, result.expires_in);
      // Leave the consumed flow cookie to expire: a delayed response must not
      // erase a newer flow cookie from another tab. Logout clears it explicitly.
      redirect(response, '/admin/');
      if (previous) await identity('/revoke', { token: previous.provider_token }, 2000).catch(() => {});
    } catch (error) {
      discardFlow(flow);
      if (issuedToken) await identity('/revoke', { token: issuedToken }, 2000).catch(() => {});
      redirect(response, error.status === 400 ? '/admin/?error=invalid_flow' : '/admin/?error=login_failed');
    }
  }
  async function logout(request, response) {
    checkOrigin(request);
    const current = localSession(request);
    if (current && current.expires > Date.now()) csrf(request, current);
    const browser = cookie(request, flowName);
    const browserHash = browser ? hash(browser) : '';
    const revoke = new Set(current ? [current.provider_token] : []);
    transaction(() => {
      if (current) db.prepare('DELETE FROM identity_sessions WHERE hash=?').run(current.hash);
      // A callback may have committed just before this logout reached the server,
      // while the request still carries the previous session cookie. Cancel any
      // session produced by this browser flow as well; a late callback response
      // can then set only an already-invalid session cookie.
      if (browserHash) {
        for (const session of db.prepare('DELETE FROM identity_sessions WHERE browser_hash=? RETURNING provider_token').all(browserHash)) revoke.add(session.provider_token);
      }
      clearBrowserFlow(request);
    });
    setCookie(response, cookieName, '', 0);
    setCookie(response, flowName, '', 0);
    // Commit the local logout response before waiting on remote revocation;
    // a late revocation response cannot clear a subsequent login's cookie.
    json(response, 200, { ok: true });
    await Promise.allSettled([...revoke].map((token) => identity('/revoke', { token }, 2000)));
  }
  async function handle(request, response) {
    // Do not claim another application's routes or alter their response headers.
    const rawPath = typeof request.url === 'string' ? request.url.split('?')[0] : '';
    if (!AUTH_ROUTES.has(rawPath)) return false;
    try {
      const url = checkRequest(request, response);
      const method = AUTH_ROUTES.get(url.pathname);
      if (request.method !== method) { response.setHeader('Allow', method); throw fail(405, '请求方式不允许。'); }
      if (url.pathname !== '/api/auth/callback' && url.search) throw fail(400, '请求地址不能包含查询参数。');
      if (url.pathname === '/api/auth/login') await login(request, response);
      else if (url.pathname === '/api/auth/callback') await completeLogin(request, response, url);
      else if (url.pathname === '/api/auth/logout') await logout(request, response);
      else {
        const current = await getSession(request, response);
        json(response, 200, current || { authenticated: false, loginAvailable });
      }
    } catch (error) { errorResponse(response, error); }
    return true;
  }
  function close() {
    if (closed) return;
    closed = true;
    for (const controller of requests) controller.abort();
    db.close();
  }
  return { handle, getSession, requirePermission, close };
}
