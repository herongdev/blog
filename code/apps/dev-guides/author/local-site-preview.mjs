import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { lstat, realpath } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

/** Optional loopback-only delivery of actual local website builds. */
export async function createLocalSitePreview({ profiles, ports }) {
  const servers = [], origins = {};
  const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
  try {
    for (const environment of ['staging', 'production']) {
      const port = ports[environment];
      if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid local preview port');
      const server = createServer(async (request, response) => {
        try {
          if (request.headers.host !== `127.0.0.1:${port}` || !['GET', 'HEAD'].includes(request.method)) throw new Error('Invalid request');
          const url = new URL(request.url, `http://127.0.0.1:${port}`), pathname = decodeURIComponent(url.pathname);
          if (pathname.includes('\0') || pathname.split('/').some(part => part.startsWith('.'))) throw new Error('Invalid path');
          const root = await realpath(join(profiles[environment].root, 'current', 'web'));
          let path = resolve(root, `.${pathname}`);
          if (path !== root && !path.startsWith(root + sep)) throw new Error('Invalid path');
          if ((await lstat(path)).isDirectory()) path = join(path, 'index.html');
          const stat = await lstat(path);
          if (!stat.isFile() || stat.isSymbolicLink() || !(await realpath(path)).startsWith(root + sep)) throw new Error('Invalid file');
          response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'X-Content-Type-Options': 'nosniff' });
          if (request.method === 'HEAD') response.end();
          else createReadStream(path).on('error', () => response.destroy()).pipe(response);
        } catch { response.writeHead(404, { 'Cache-Control': 'no-store' }); response.end('预览尚未生成或页面不存在'); }
      });
      servers.push(server);
      await new Promise((done, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', done); });
      origins[environment] = `http://127.0.0.1:${port}/`;
    }
    return { origins, close: () => Promise.all(servers.map(server => new Promise(done => server.close(done)))) };
  } catch (error) { for (const server of servers) server.close(); throw error; }
}
