import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { createAuthorServer } from './server-core.mjs';

const authorRoot = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(authorRoot, '..');
const mediaEnvPath = resolve(projectRoot, '.env.media.local');
if (existsSync(mediaEnvPath)) process.loadEnvFile(mediaEnvPath);
const port = Number(process.env.DEV_GUIDES_AUTHOR_PORT ?? 4331);

if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('DEV_GUIDES_AUTHOR_PORT 必须是 1024–65535 的端口');
}

let vite;
const server = createAuthorServer({
  projectRoot,
  frontend: (request, response) => vite.middlewares(request, response, () => {
    if (!response.headersSent) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('页面不存在');
    }
  }),
});

vite = await createViteServer({
  root: authorRoot,
  appType: 'spa',
  server: { middlewareMode: { server } },
});

server.listen(port, '127.0.0.1', () => {
  console.log(`教程写作： http://127.0.0.1:${port}/`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    await vite.close();
    server.close();
  });
}
