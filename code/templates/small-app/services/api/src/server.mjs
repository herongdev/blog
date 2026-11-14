import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, readFile, realpath } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const repository = fileURLToPath(new URL('../../../', import.meta.url));
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.pdf': 'application/pdf',
  '.zip': 'application/zip', '.wasm': 'application/wasm',
};
const fail = (status, message) => Object.assign(new Error(message), { status });

function headers(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader('Cache-Control', 'no-store');
}

function json(request, response, status, value) {
  const body = JSON.stringify(value);
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
  response.end(request.method === 'HEAD' ? undefined : body);
}

function pageError(request, response, status) {
  const title = status === 404 ? '页面不存在' : status === 405 ? '请求方式不允许' : '暂时无法打开此页面';
  const body = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><main><h1>${title}</h1><p>请检查地址，或稍后再试。</p><a href="/">返回首页</a></main></html>`;
  response.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
  response.end(request.method === 'HEAD' ? undefined : body);
}

function requestUrl(request, origin, expectedHost) {
  let hosts = 0;
  for (let index = 0; index < request.rawHeaders.length; index += 2) if (request.rawHeaders[index].toLowerCase() === 'host') hosts += 1;
  if (hosts !== 1 || request.headers.host !== expectedHost) throw fail(403, '访问地址不允许。');
  if (typeof request.url !== 'string' || !request.url.startsWith('/') || request.url.startsWith('//')
      || request.url.length > 8192 || /[\\#\u0000-\u0020\u007f]/.test(request.url)) throw fail(400, '请求地址有误。');
  const rawPath = request.url.split('?')[0];
  let path;
  try { path = decodeURIComponent(rawPath); } catch { throw fail(400, '请求地址有误。'); }
  // Check the raw decoded segments before URL normalization can hide traversal.
  if (/[\\\u0000-\u001f\u007f]/.test(path) || path.split('/').some((segment) => segment === '.' || segment === '..')) throw fail(400, '请求地址有误。');
  const url = new URL(request.url, origin);
  if (url.origin !== origin) throw fail(400, '请求地址有误。');
  return { url, path };
}

async function buildRoot(path) {
  const root = resolve(path);
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink() || await realpath(root) !== root) throw new Error('Invalid static build directory.');
  return root;
}

async function safeFile(root, parts) {
  let file = root;
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (!part || part.startsWith('.') || part.includes(sep) || part.includes('\\')) throw fail(404, '页面不存在。');
    file = join(file, part);
    const stat = await lstat(file);
    if (stat.isSymbolicLink() || (index < parts.length - 1 && !stat.isDirectory())) throw fail(404, '页面不存在。');
  }
  const stat = await lstat(file);
  if (!stat.isFile() || !(await realpath(file)).startsWith(`${root}${sep}`)) throw fail(404, '页面不存在。');
  return file;
}

function inlineHashes(html, tag) {
  const hashes = new Set();
  const pattern = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}\\s*>`, 'gi');
  for (const match of html.matchAll(pattern)) {
    if (tag === 'script' && /(?:^|\s)src\s*=/i.test(match[1])) continue;
    const text = match[2].replace(/\r\n?/g, '\n');
    if (text.trim()) hashes.add(`'sha256-${createHash('sha256').update(text).digest('base64')}'`);
    if (hashes.size > 64) throw new Error('Too many inline build blocks.');
  }
  return [...hashes];
}

function styleAttributeHashes(html) {
  const hashes = new Set();
  const entities = { amp: '&', AMP: '&', quot: '"', QUOT: '"', apos: "'", lt: '<', LT: '<', gt: '>', GT: '>', nbsp: '\u00a0' };
  const entityPattern = /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi;
  // These are the HTML parser's legacy numeric-reference replacements.
  const legacy = { 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
  const markup = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  for (const tag of markup.matchAll(/<[a-z][a-z0-9:-]*((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)) {
    const attributes = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    for (const attribute of tag[1].matchAll(attributes)) {
      if (attribute[1].toLowerCase() !== 'style') continue;
      const raw = (attribute[2] ?? attribute[3] ?? attribute[4] ?? '').replace(/\r\n?/g, '\n');
      // React/Astro emit terminated basic/numeric references. Fail closed for
      // unsupported named or ambiguous unterminated references instead of
      // granting a hash for text that differs from the browser's parsed value.
      if (/&(?:#|[a-z])/i.test(raw.replace(entityPattern, ''))) continue;
      let supported = true;
      const value = raw.replace(entityPattern, (_, entity) => {
        if (entity[0] !== '#') { if (!(entity in entities)) supported = false; return entities[entity] ?? ''; }
        let code = /^#x/i.test(entity) ? Number.parseInt(entity.slice(2), 16) : Number.parseInt(entity.slice(1), 10);
        if (!code || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) code = 0xfffd;
        return String.fromCodePoint(legacy[code] ?? code);
      });
      if (supported && value.trim()) hashes.add(`'sha256-${createHash('sha256').update(value).digest('base64')}'`);
      if (hashes.size > 64) throw new Error('Too many inline build attributes.');
    }
  }
  return [...hashes];
}

function csp(scripts = [], styles = [], attributes = []) {
  return [
    "default-src 'self'", `script-src 'self' ${scripts.join(' ')}`.trim(), "script-src-attr 'none'",
    `style-src 'self' ${styles.join(' ')}`.trim(), attributes.length ? `style-src-attr 'unsafe-hashes' ${attributes.join(' ')}` : "style-src-attr 'none'",
    "img-src 'self' data: https://wx.qlogo.cn https://thirdwx.qlogo.cn", "font-src 'self'",
    "connect-src 'self'", "object-src 'none'", "base-uri 'none'", "form-action 'self'", "frame-ancestors 'none'",
  ].join('; ');
}

async function websitePolicy(root) {
  // Trust only this build's own root document. No request body, uploaded HTML,
  // arbitrary path, or remote content can add scripts to the allowlist.
  const file = await safeFile(root, ['index.html']);
  const stat = await lstat(file);
  if (stat.size > 4 * 1024 * 1024) throw new Error('Static index is too large.');
  const html = await readFile(file, 'utf8');
  // Astro's island stylesheet and Base UI's SSR hidden-input style both need
  // exact trusted build hashes. All other inline attributes remain blocked.
  return csp(inlineHashes(html, 'script'), inlineHashes(html, 'style'), styleAttributeHashes(html));
}

async function serveStatic(request, response, path, url, website, admin) {
  if (!['GET', 'HEAD'].includes(request.method)) { response.setHeader('Allow', 'GET, HEAD'); throw fail(405, '请求方式不允许。'); }
  if (path === '/admin') {
    response.writeHead(308, { Location: `/admin/${url.search}` }); response.end(); return;
  }
  const administration = path.startsWith('/admin/');
  const root = administration ? admin : website;
  let relative = administration ? path.slice('/admin/'.length) : path.slice(1);
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  const file = await safeFile(root, relative.split('/'));
  const handle = await open(file, constants.O_RDONLY | (constants.O_NOFOLLOW || 0));
  try {
    const stat = await handle.stat();
    if (!stat.isFile()) throw fail(404, '页面不存在。');
    const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
    const hashedAsset = /^\/(?:_astro|admin\/assets)\//.test(path) && /[.-][A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/.test(path);
    response.setHeader('Cache-Control', hashedAsset ? 'public, max-age=31536000, immutable' : 'no-cache');
    response.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size });
    if (request.method === 'HEAD') response.end();
    else await pipeline(handle.createReadStream({ autoClose: false }), response);
  } finally { await handle.close(); }
}

async function start() {
  const [{ default: product }, { createIdentityClient }] = await Promise.all([
    import('@app/config/product.json', { with: { type: 'json' } }), import('@herongxhr/identity-client'),
  ]);
  if (!product || product.auth?.issuer !== 'https://auth.herong.info' || typeof product.name !== 'string' || !product.name.trim()) throw new Error('Invalid application configuration.');
  const origin = process.env.APP_ORIGIN || product.origin;
  const publicUrl = new URL(origin);
  const portValue = String(process.env.APP_PORT || product.dev.port);
  if (!/^\d{1,5}$/.test(portValue) || Number(portValue) < 1 || Number(portValue) > 65535) throw new Error('Invalid application port.');
  const port = Number(portValue);
  const [website, admin] = await Promise.all([
    buildRoot(join(repository, 'apps/website/dist')), buildRoot(join(repository, 'apps/admin/dist')),
  ]);
  await safeFile(admin, ['index.html']);
  const siteCsp = await websitePolicy(website);
  const adminCsp = csp();
  const secret = process.env.AUTH_CLIENT_SECRET || '';
  const identity = createIdentityClient({
    origin, appId: product.id, clientId: product.auth.clientId, clientSecret: secret,
    dataDirectory: resolve(repository, process.env.APP_DATA_DIR || (publicUrl.protocol === 'http:' ? '.local/data-preview' : '.local/data')),
    permissions: [product.auth.permission], allowHttp: process.env.APP_ALLOW_HTTP === '1',
  });
  const loginAvailable = publicUrl.protocol === 'https:' && Boolean(product.auth.clientId && secret);
  const server = createServer(async (request, response) => {
    headers(response);
    response.setHeader('Content-Security-Policy', adminCsp);
    let api = typeof request.url === 'string' && /^\/api(?:\/|\?|$)/.test(request.url);
    try {
      const { url, path } = requestUrl(request, origin, publicUrl.host);
      api = path === '/api' || path.startsWith('/api/');
      response.setHeader('Content-Security-Policy', path === '/admin' || path.startsWith('/admin/') || api ? adminCsp : siteCsp);
      if (await identity.handle(request, response)) return;
      if (url.pathname === '/api/health') {
        if (!['GET', 'HEAD'].includes(request.method)) { response.setHeader('Allow', 'GET, HEAD'); throw fail(405, '请求方式不允许。'); }
        return json(request, response, 200, { status: 'ok', service: product.id, loginAvailable });
      }
      if (url.pathname === '/api/admin/overview') {
        if (request.method !== 'GET') { response.setHeader('Allow', 'GET'); throw fail(405, '请求方式不允许。'); }
        const current = await identity.requirePermission(request, response, product.auth.permission);
        if (!current) return;
        return json(request, response, 200, {
          user: { name: current.name, nickname: current.nickname, avatarUrl: current.avatarUrl, role: current.role, permissions: current.permissions },
          app: { name: product.name },
        });
      }
      if (api) return json(request, response, 404, { error: '接口不存在。' });
      await serveStatic(request, response, path, url, website, admin);
    } catch (error) {
      if (response.destroyed || response.writableEnded) return;
      if (response.headersSent) { response.destroy(); return; }
      const status = ['ENOENT', 'ENOTDIR', 'ELOOP'].includes(error.code) ? 404
        : [400, 401, 403, 404, 405, 413, 429, 503].includes(error.status) ? error.status : 500;
      if (status === 500) console.error('请求处理失败。');
      if (api) json(request, response, status, { error: status === 404 ? '接口不存在。' : '暂时无法完成请求，请稍后重试。' });
      else pageError(request, response, status);
    }
  });
  server.requestTimeout = 15_000;
  server.headersTimeout = 10_000;
  server.keepAliveTimeout = 5000;
  server.maxRequestsPerSocket = 100;
  let stopping = false;
  function shutdown() {
    if (stopping) return;
    stopping = true;
    const deadline = setTimeout(() => { server.closeAllConnections(); identity.close(); }, 10_000);
    deadline.unref();
    server.close(() => { clearTimeout(deadline); identity.close(); });
    server.closeIdleConnections();
  }
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
  try {
    await new Promise((resolveListen, rejectListen) => {
      server.once('error', rejectListen);
      server.listen(port, '127.0.0.1', () => { server.removeListener('error', rejectListen); resolveListen(); });
    });
    server.on('error', () => { console.error('服务暂时不可用。'); shutdown(); });
    console.log(`服务已启动：http://127.0.0.1:${port}`);
  } catch (error) { identity.close(); throw error; }
}

start().catch(() => { console.error('服务未能启动，请检查配置和构建结果。'); process.exitCode = 1; });
