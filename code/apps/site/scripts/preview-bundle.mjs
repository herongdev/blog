// Local review of the merged Astro + historical blog output; never a production server.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist-bundle');
const manifest = JSON.parse(await fs.readFile(path.join(directory, 'route-manifest.json'), 'utf8'));
const port = Number(process.env.PREVIEW_PORT || 4371);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid PREVIEW_PORT');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2' };

http.createServer(async (request, response) => {
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
  try {
    const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (route.includes('\0') || route.includes('\\')) throw new Error('Invalid path');
    const redirect = manifest.redirects[route] || manifest.redirects[route.replace(/\.html$/, '')];
    if (redirect) { response.writeHead(308, { Location: redirect }).end(); return; }
    // Tools keep their own live deployment, just as the main navigation does.
    if (route === '/file-tools' || route.startsWith('/file-tools/')) {
      response.writeHead(307, { Location: `https://herong.info${route}` }).end(); return;
    }
    if (route === '/robots.txt') { response.setHeader('Content-Type', 'text/plain'); response.end('User-agent: *\nDisallow: /\n'); return; }
    const filename = path.resolve(directory, '.' + route);
    if (!filename.startsWith(directory + path.sep) && filename !== directory) throw new Error('Invalid path');
    const candidates = route.endsWith('/') ? [path.join(filename, 'index.html')] : [filename, filename + '.html', path.join(filename, 'index.html')];
    let found;
    for (const candidate of candidates) if (await fs.stat(candidate).then((stat) => stat.isFile()).catch(() => false)) { found = candidate; break; }
    const status = found ? 200 : 404;
    found ||= path.join(directory, '404.html');
    let body = await fs.readFile(found);
    const extension = path.extname(found);
    response.setHeader('Content-Type', types[extension] || 'application/octet-stream');
    if (/\bgzip\b/.test(request.headers['accept-encoding'] || '') && ['.html', '.css', '.js', '.mjs', '.json', '.xml', '.svg'].includes(extension)) {
      body = gzipSync(body); response.setHeader('Content-Encoding', 'gzip'); response.setHeader('Vary', 'Accept-Encoding');
    }
    response.writeHead(status, { 'Content-Length': body.length });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(400).end('Invalid request'); }
}).listen(port, '127.0.0.1', () => console.log(`Merged preview: http://127.0.0.1:${port}/ (local only, noindex)`));
