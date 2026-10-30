import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { chmod, lstat, mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { createWechatAuthorAuth } from './wechat-auth.mjs';

const scrypt = promisify(scryptCallback);
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_ATTEMPTS = 10;
const COOKIE_NAME = '__Secure-herong_author';
const TOKEN = /^[A-Za-z0-9_-]{32,256}$/;

function error(status, message) {
  return Object.assign(new Error(message), { status });
}

function digest(value) {
  return createHash('sha256').update(value).digest('hex');
}

function equal(value, expected) {
  if (typeof value !== 'string' || typeof expected !== 'string') return false;
  return timingSafeEqual(Buffer.from(digest(value), 'hex'), Buffer.from(digest(expected), 'hex'));
}

async function privateDirectory(path) {
  await mkdir(path, { recursive: true, mode: 0o700 });
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('Authentication directory must be a regular directory');
  await chmod(path, 0o700);
}

async function privateJson(path) {
  try {
    const stat = await lstat(path);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 16 * 1024) throw new Error('Invalid authentication file');
    await chmod(path, 0o600);
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (failure) {
    if (failure.code === 'ENOENT') return null;
    throw failure;
  }
}

async function atomicJson(path, value) {
  const temp = `${path}.${randomUUID()}.tmp`;
  try {
    await writeFile(temp, `${JSON.stringify(value)}\n`, { mode: 0o600, flag: 'wx' });
    await rename(temp, path);
  } finally {
    await unlink(temp).catch((failure) => { if (failure.code !== 'ENOENT') throw failure; });
  }
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 12 || password.length > 256 || password.includes('\0')) {
    throw error(422, '密码需为 12–256 个字符');
  }
}

async function passwordHash(password, salt) {
  return (await scrypt(password, Buffer.from(salt, 'hex'), 32, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 })).toString('hex');
}

function cookieToken(request) {
  const cookies = (request.headers.cookie ?? '').split(';').map((part) => part.trim());
  const matching = cookies.filter((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (matching.length !== 1) return null;
  const value = matching[0].slice(COOKIE_NAME.length + 1);
  return TOKEN.test(value) ? value : null;
}

/** Single-author HTTPS authentication; all state lives outside the web root. */
export function createAuthorAuth(options) {
  if (options.provider === 'wechat') return createWechatAuthorAuth(options);
  if (options.provider && options.provider !== 'password') throw new Error('Unknown author authentication provider');
  const { origin, basePath = '/', stateDirectory, bootstrapTokenFile } = options;
  const configured = new URL(origin);
  if (configured.protocol !== 'https:' || configured.origin !== origin || configured.username || configured.password) {
    throw new Error('Online author origin must be an HTTPS origin without a path');
  }
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(basePath)) throw new Error('Invalid author cookie base path');
  if (!stateDirectory || !bootstrapTokenFile) throw new Error('Online author requires private authentication paths');
  const stateRoot = resolve(stateDirectory);
  const sessionsRoot = join(stateRoot, 'sessions');
  const accountPath = join(stateRoot, 'account.json');
  const bootstrapPath = resolve(bootstrapTokenFile);
  const ready = (async () => {
    await privateDirectory(stateRoot);
    await privateDirectory(sessionsRoot);
    const account = await privateJson(accountPath);
    if (account && (account.version !== 1 || !/^[a-f0-9]{32}$/.test(account.salt) || !/^[a-f0-9]{64}$/.test(account.hash))) {
      throw new Error('Invalid author authentication state');
    }
  })();
  // Keep the rejection observed even if the HTTP server has not received its first request yet.
  ready.catch(() => {});
  let mutationQueue = Promise.resolve();
  let failedAttempts = [];
  let lastCleanup = 0;

  async function locked(action) {
    const previous = mutationQueue;
    let release;
    mutationQueue = new Promise((done) => { release = done; });
    await previous;
    try { return await action(); } finally { release(); }
  }

  function setCookie(response, token) {
    response.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=${basePath}; Max-Age=${SESSION_TTL_MS / 1000}; HttpOnly; Secure; SameSite=Strict`);
  }

  function clearCookie(response) {
    response.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=${basePath}; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);
  }

  async function removeSession(token) {
    if (!token) return;
    await unlink(join(sessionsRoot, `${digest(token)}.json`)).catch((failure) => { if (failure.code !== 'ENOENT') throw failure; });
  }

  async function cleanup() {
    if (Date.now() - lastCleanup < 60 * 60 * 1000) return;
    lastCleanup = Date.now();
    for (const name of await readdir(sessionsRoot)) {
      if (!/^[a-f0-9]{64}\.json$/.test(name)) continue;
      const path = join(sessionsRoot, name);
      const session = await privateJson(path);
      if (!session || !Number.isFinite(session.expiresAt) || session.expiresAt <= Date.now()) {
        await unlink(path).catch((failure) => { if (failure.code !== 'ENOENT') throw failure; });
      }
    }
  }

  async function createSession(request, response) {
    await removeSession(cookieToken(request));
    await cleanup();
    const token = randomBytes(32).toString('base64url');
    const csrfToken = randomBytes(32).toString('base64url');
    const expiresAt = Date.now() + SESSION_TTL_MS;
    await atomicJson(join(sessionsRoot, `${digest(token)}.json`), { version: 1, csrfToken, expiresAt });
    setCookie(response, token);
    return { authenticated: true, setupRequired: false, csrfToken };
  }

  function checkOrigin(request, mutation = false) {
    // The reverse proxy must set Host to this configured host. Forwarded headers are never trusted.
    if (request.headers.host !== configured.host) throw error(403, '访问地址不允许');
    if (request.headers.origin && request.headers.origin !== origin) throw error(403, '请求来源不允许');
    if (request.headers['sec-fetch-site'] === 'cross-site') throw error(403, '请求来源不允许');
    if (mutation && request.headers.origin !== origin) throw error(403, '请求来源不允许');
  }

  async function session(request) {
    await ready;
    const token = cookieToken(request);
    if (!token) return null;
    const path = join(sessionsRoot, `${digest(token)}.json`);
    const value = await privateJson(path);
    if (!value || value.version !== 1 || !Number.isFinite(value.expiresAt) || value.expiresAt <= Date.now() || !TOKEN.test(value.csrfToken)) {
      if (value) await removeSession(token);
      return null;
    }
    return { token, csrfToken: value.csrfToken, expiresAt: value.expiresAt };
  }

  function checkCsrf(request, current) {
    if (!current || !equal(request.headers['x-author-token'], current.csrfToken)) {
      throw error(403, '页面验证已失效，请重新登录');
    }
  }

  function attempt() {
    const now = Date.now();
    failedAttempts = failedAttempts.filter((at) => now - at < LOGIN_WINDOW_MS);
    if (failedAttempts.length >= LOGIN_ATTEMPTS) throw error(429, '尝试次数过多，请 15 分钟后重试');
    // Count before the expensive password hash, including requests concurrent with this one.
    failedAttempts.push(now);
  }

  async function handle(request, response, pathname, { readJson, sendJson }) {
    if (!pathname.startsWith('/api/auth/')) return false;
    await ready;
    checkOrigin(request, !['GET', 'HEAD'].includes(request.method));
    if ((pathname === '/api/auth/session' || pathname === '/api/auth/me') && request.method === 'GET') {
      const current = await session(request);
      const account = await privateJson(accountPath);
      sendJson(response, 200, { mode: 'online', authenticated: Boolean(current), setupRequired: !account, ...(current ? { csrfToken: current.csrfToken } : {}) });
      return true;
    }
    if (pathname === '/api/auth/setup' && request.method === 'POST') {
      attempt();
      const input = await readJson(request, 8 * 1024);
      const result = await locked(async () => {
        if (await privateJson(accountPath)) throw error(409, '写作台已初始化，请登录');
        let token;
        try {
          const stat = await lstat(bootstrapPath);
          if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 512 || (stat.mode & 0o077)) throw new Error('Invalid bootstrap token file');
          token = (await readFile(bootstrapPath, 'utf8')).trim();
        } catch (failure) {
          if (failure.code === 'ENOENT') throw error(503, '初始化入口未准备好，请联系站点维护者');
          throw failure;
        }
        if (!TOKEN.test(token) || !equal(input?.token, token)) throw error(403, '初始化链接无效或已使用');
        validatePassword(input?.password);
        const salt = randomBytes(16).toString('hex');
        const hash = await passwordHash(input.password, salt);
        await atomicJson(accountPath, { version: 1, salt, hash, createdAt: new Date().toISOString() });
        await unlink(bootstrapPath);
        failedAttempts = [];
        return createSession(request, response);
      });
      sendJson(response, 201, result);
      return true;
    }
    if (pathname === '/api/auth/login' && request.method === 'POST') {
      attempt();
      const input = await readJson(request, 8 * 1024);
      const result = await locked(async () => {
        const account = await privateJson(accountPath);
        if (!account) throw error(409, '请先完成写作台初始化');
        // The limit is checked before hashing to avoid unbounded scrypt work.
        if (typeof input?.password !== 'string' || input.password.length > 256 || input.password.includes('\0')) {
          throw error(401, '密码不正确');
        }
        const candidate = await passwordHash(input.password, account.salt);
        if (!equal(candidate, account.hash)) throw error(401, '密码不正确');
        failedAttempts = [];
        return createSession(request, response);
      });
      sendJson(response, 200, result);
      return true;
    }
    if (pathname === '/api/auth/logout' && request.method === 'POST') {
      const current = await session(request);
      if (!current) throw error(401, '请先登录');
      checkCsrf(request, current);
      await removeSession(current.token);
      clearCookie(response);
      sendJson(response, 200, { authenticated: false });
      return true;
    }
    throw error(404, '接口不存在');
  }

  return { ready, origin, checkOrigin, checkCsrf, session, handle };
}
