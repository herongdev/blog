import { createReadStream } from 'node:fs';
import { lstat, realpath } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAuthorServer } from './server-core.mjs';
import { createPublishManager } from './publish-manager.mjs';
import { createPublishProfiles } from './publish-profiles.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const frontendRoot = resolve(appRoot, 'author/dist');
const dataRoot = process.env.AUTHOR_DATA_ROOT;
const origin = process.env.AUTHOR_PUBLIC_ORIGIN;
const basePath = process.env.AUTHOR_BASE_PATH || '/dev-admin/';
const port = Number(process.env.AUTHOR_PORT || 24320);
if (!dataRoot || !origin || new URL(origin).origin !== origin || !origin.startsWith('https://')) {
  throw new Error('AUTHOR_DATA_ROOT and an HTTPS AUTHOR_PUBLIC_ORIGIN are required');
}
if (!/^\/(?:[a-z0-9-]+\/)*$/.test(basePath) || !Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('Invalid author base path or port');
}

const manager = await createPublishManager({
  projectRoot: appRoot,
  contentRoot: resolve(dataRoot, 'project/src/content/tutorials'),
  stateRoot: resolve(dataRoot, 'publish'),
  profiles: createPublishProfiles({ target: process.env.AUTHOR_PUBLISH_TARGET, authorOrigin: origin }),
  pnpmCommand: process.env.AUTHOR_PNPM_COMMAND || 'pnpm',
  buildEnv: { MEDIA_PUBLIC_BASE_URL: process.env.MEDIA_PUBLIC_BASE_URL },
});

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = createAuthorServer({
  projectRoot: resolve(dataRoot, 'project'),
  auth: {
    provider: process.env.AUTHOR_AUTH_PROVIDER || 'password',
    wechat: {
      appId: process.env.AUTHOR_WECHAT_APP_ID,
      appSecret: process.env.AUTHOR_WECHAT_APP_SECRET,
    },
    origin,
    basePath,
    stateDirectory: resolve(dataRoot, 'auth'),
    bootstrapTokenFile: resolve(dataRoot, 'auth/bootstrap-token'),
  },
  apiHandler: async (request, response, context) => {
    if (context.url.pathname !== '/api/publish') return false;
    if (request.method === 'GET') {
      context.sendJson(response, 200, manager.getStatus());
    } else if (request.method === 'POST') {
      const { environment } = await context.readJson(request, 4096);
      const job = await manager.start(environment);
      context.sendJson(response, 202, { job });
    } else {
      throw context.httpError(405, '请求方式不支持');
    }
    return true;
  },
  frontend: async (request, response) => {
    try {
      const url = new URL(request.url, origin);
      const pathname = decodeURIComponent(url.pathname);
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
      if (pathname.includes('\0') || pathname.split('/').some((part) => part.startsWith('.'))) throw new Error('Invalid path');
      const file = resolve(frontendRoot, pathname === '/' ? 'index.html' : `.${pathname}`);
      if (!file.startsWith(frontendRoot + sep) || !MIME[extname(file)]) throw new Error('Invalid path');
      const info = await lstat(file);
      if (!info.isFile() || !(await realpath(file)).startsWith(frontendRoot + sep)) throw new Error('Invalid file');
      response.writeHead(200, {
        'Content-Type': MIME[extname(file)],
        'Content-Length': info.size,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://media.herong.info data: blob:; connect-src 'self'; font-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
        'Referrer-Policy': 'no-referrer',
      });
      if (request.method === 'HEAD') response.end();
      else createReadStream(file).on('error', () => response.destroy()).pipe(response);
    } catch {
      response.writeHead(404, { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      response.end('页面不存在');
    }
  },
});
server.requestTimeout = 60_000;
server.headersTimeout = 20_000;
server.listen(port, '127.0.0.1', () => console.log('Online tutorial author service ready'));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 25_000).unref();
});
