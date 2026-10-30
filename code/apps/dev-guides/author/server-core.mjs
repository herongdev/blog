import { createServer } from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { chmod, lstat, mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { parseDocument } from 'yaml';
import { createAuthorAuth } from './auth.mjs';
import { createLibraryStore } from './library-store.mjs';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_NAME = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:png|jpg|webp)$/i;
const MAX_MARKDOWN_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function sendJson(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Cross-Origin-Resource-Policy': 'same-origin',
  });
  response.end(JSON.stringify(data));
}

async function readLimited(request, limit) {
  const announced = Number(request.headers['content-length']);
  if (Number.isFinite(announced) && announced > limit) throw httpError(413, '文件超过大小限制');
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) throw httpError(413, '文件超过大小限制');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function readJson(request, limit = MAX_MARKDOWN_BYTES) {
  if (!request.headers['content-type']?.startsWith('application/json')) {
    throw httpError(415, '需要 JSON 请求');
  }
  try {
    return JSON.parse((await readLimited(request, limit)).toString('utf8'));
  } catch (error) {
    if (error.status) throw error;
    throw httpError(400, 'JSON 格式错误');
  }
}

function digest(content) {
  return createHash('sha256').update(content).digest('hex');
}

function splitMarkdown(content) {
  const normalized = content.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(normalized);
  if (!match) throw httpError(422, '文章缺少 frontmatter');
  return {
    frontmatter: match[1],
    body: normalized.slice(match[0].length).replace(/^\n/, ''),
  };
}

function composeMarkdown(frontmatter, body) {
  if (typeof frontmatter !== 'string' || typeof body !== 'string') {
    throw httpError(400, '文章格式错误');
  }
  const metadata = frontmatter.replace(/\r\n/g, '\n').trim();
  if (!metadata || /^---\s*$/m.test(metadata) || metadata.includes('\0')) {
    throw httpError(400, 'frontmatter 格式错误');
  }
  const markdown = `---\n${metadata}\n---\n\n${body.replace(/\r\n/g, '\n').replace(/^\n+/, '')}`;
  if (Buffer.byteLength(markdown) > MAX_MARKDOWN_BYTES) throw httpError(413, '文章超过 2 MB');
  return markdown;
}

function titleFromFrontmatter(frontmatter, fallback) {
  const match = /^title:\s*(.*)$/m.exec(frontmatter);
  if (!match) return fallback;
  const value = match[1].trim();
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'");
  if (value.startsWith('"') && value.endsWith('"')) {
    try { return JSON.parse(value); } catch { return fallback; }
  }
  return value || fallback;
}

function statusFromFrontmatter(frontmatter) {
  return /^status:\s*(\S+)/m.exec(frontmatter)?.[1] ?? 'draft';
}

function detectImage(buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { ext: 'png', mime: 'image/png' };
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: 'jpg', mime: 'image/jpeg' };
  }
  if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return { ext: 'webp', mime: 'image/webp' };
  }
  return null;
}

async function regularFile(path) {
  try {
    const info = await lstat(path);
    return info.isFile() ? info : null;
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function safeDirectory(path, create = false) {
  let info = await lstat(path).catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (!info && create) {
    await mkdir(path, { recursive: true });
    info = await lstat(path);
  }
  if (!info) return false;
  if (!info.isDirectory()) throw httpError(400, '图片目录不是普通文件夹');
  return true;
}

async function writeAtomic(path, content) {
  const temp = `${path}.${randomUUID()}.tmp`;
  try {
    await writeFile(temp, content, { flag: 'wx', mode: 0o600 });
    await rename(temp, path);
  } finally {
    await unlink(temp).catch((error) => {
      if (error.code !== 'ENOENT') throw error;
    });
  }
}

const MEDIA_KEYS = [
  'MEDIA_PUBLIC_BASE_URL',
  'MEDIA_S3_ENDPOINT',
  'MEDIA_S3_REGION',
  'MEDIA_S3_BUCKET',
  'MEDIA_S3_ACCESS_KEY_ID',
  'MEDIA_S3_SECRET_ACCESS_KEY',
];

function mediaMode(env) {
  const configured = MEDIA_KEYS.filter((key) => Boolean(env[key]?.trim()));
  if (configured.length === 0) return 'staging';
  return configured.length === MEDIA_KEYS.length ? 'direct' : 'incomplete';
}

async function publishImage({ asset, env }) {
  const [{ publishPreparedAssets }, { createS3Storage }] = await Promise.all([
    import('../scripts/media-core.mjs'),
    import('../scripts/media-s3.mjs'),
  ]);
  const storage = createS3Storage(env);
  try {
    await publishPreparedAssets([asset], storage);
  } finally {
    await storage.close();
  }
  return asset.url;
}

export function createAuthorServer({ projectRoot, frontend, mediaEnv = process.env, publishImageAsset = publishImage, auth, apiHandler }) {
  const roots = {
    draft: resolve(projectRoot, 'drafts'),
    content: resolve(projectRoot, 'src/content/tutorials'),
  };
  const templatePath = resolve(projectRoot, 'templates/tutorial.md');
  const sessionToken = randomUUID();
  const onlineAuth = auth ? createAuthorAuth(auth) : null;
  const locks = new Map();
  const library = createLibraryStore({
    projectRoot,
    listArticleKeys: async () => (await listArticles()).map(({ kind, slug }) => `${kind}/${slug}`),
  });

  function articlePath(kind, slug) {
    if (!Object.hasOwn(roots, kind) || !SLUG.test(slug)) throw httpError(400, '文章地址只能使用英文小写、数字和连字符');
    return join(roots[kind], `${slug}.md`);
  }

  async function withLock(path, action) {
    const previous = locks.get(path) ?? Promise.resolve();
    let release;
    const current = new Promise((done) => { release = done; });
    locks.set(path, current);
    await previous;
    try { return await action(); } finally {
      release();
      if (locks.get(path) === current) locks.delete(path);
    }
  }

  async function saveRevision(kind, slug, content) {
    let directory = resolve(projectRoot, '.history');
    for (const segment of ['', kind, slug]) {
      if (segment) directory = join(directory, segment);
      await safeDirectory(directory, true);
      await chmod(directory, 0o700);
    }
    const path = join(directory, `${digest(content)}.md`);
    try { await writeFile(path, content, { flag: 'wx', mode: 0o600 }); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (!await regularFile(path) || digest(await readFile(path, 'utf8')) !== digest(content)) {
        throw httpError(500, '文章历史记录无效');
      }
      await chmod(path, 0o600);
    }
  }

  async function listArticles() {
    const items = [];
    for (const [kind, root] of Object.entries(roots)) {
      if (!await safeDirectory(root)) continue;
      for (const entry of await readdir(root, { withFileTypes: true })) {
        if (!entry.isFile() || !/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(entry.name)) continue;
        const slug = entry.name.slice(0, -3);
        const path = articlePath(kind, slug);
        const info = await regularFile(path);
        if (!info || info.size > MAX_MARKDOWN_BYTES) continue;
        try {
          const { frontmatter } = splitMarkdown(await readFile(path, 'utf8'));
          items.push({ kind, slug, title: titleFromFrontmatter(frontmatter, slug), status: statusFromFrontmatter(frontmatter) });
        } catch { /* A malformed Markdown file is not an article. */ }
      }
    }
    items.sort((a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title, 'zh-CN'));
    return items;
  }

  const server = createServer(async (request, response) => {
    try {
      const address = server.address();
      const expectedOrigin = onlineAuth?.origin ?? `http://127.0.0.1:${address.port}`;
      const url = new URL(request.url, expectedOrigin);
      const method = request.method;
      if (onlineAuth) {
        // Authentication handlers validate their own origin. Only the exact OAuth
        // callback may accept a cross-site navigation, with one-use state proof.
        if (await onlineAuth.handle(request, response, url.pathname, { readJson, sendJson })) return;
        onlineAuth.checkOrigin(request, !['GET', 'HEAD'].includes(method));
      } else {
        if (request.headers.host !== `127.0.0.1:${address.port}`) throw httpError(403, '请使用 127.0.0.1 打开本地编辑器');
        if (request.headers.origin && request.headers.origin !== expectedOrigin) throw httpError(403, '请求来源不允许');
      }
      let currentSession;
      if (onlineAuth) {
        currentSession = await onlineAuth.session(request);
        if (url.pathname.startsWith('/api/') && !currentSession) throw httpError(401, '请先登录');
        if (method !== 'GET' && method !== 'HEAD') {
          if (!currentSession) throw httpError(401, '请先登录');
          onlineAuth.checkCsrf(request, currentSession);
        }
      } else if (method !== 'GET' && method !== 'HEAD' &&
                 (request.headers.origin !== expectedOrigin || request.headers['x-author-token'] !== sessionToken)) {
        throw httpError(403, '本地编辑器验证失败');
      }

      if (url.pathname === '/api/session' && method === 'GET') {
        return sendJson(response, 200, { token: currentSession?.csrfToken ?? sessionToken, mediaMode: mediaMode(mediaEnv) });
      }

      if (url.pathname === '/api/articles' && method === 'GET') {
        return sendJson(response, 200, { items: await library.withArticlesMutation(listArticles) });
      }

      if (url.pathname === '/api/library' && method === 'GET') {
        return sendJson(response, 200, await library.read());
      }

      if (url.pathname === '/api/library/actions' && method === 'POST') {
        const input = await readJson(request, 8 * 1024);
        return sendJson(response, 200, await library.apply(input));
      }

      if (url.pathname === '/api/drafts' && method === 'POST') {
        const { slug, title } = await readJson(request, 8 * 1024);
        if (typeof slug !== 'string' || !SLUG.test(slug)) throw httpError(400, '文章地址只能使用英文小写、数字和连字符');
        if (typeof title !== 'string' || title.trim().length < 2 || title.trim().length > 160 || /[\r\n\0]/.test(title)) {
          throw httpError(400, '请输入 2–160 字的标题');
        }
        return await library.withArticlesMutation(() => withLock(slug, async () => {
          if (await regularFile(articlePath('content', slug)) || await regularFile(articlePath('draft', slug))) {
            throw httpError(409, '文章地址已存在');
          }
          const template = await readFile(templatePath, 'utf8');
          const { frontmatter, body } = splitMarkdown(template);
          const quotedTitle = title.trim().replace(/'/g, "''");
          const nextFrontmatter = frontmatter.replace(/^title:.*$/m, `title: '${quotedTitle}'`);
          await safeDirectory(roots.draft, true);
          await writeFile(articlePath('draft', slug), composeMarkdown(nextFrontmatter, body), { flag: 'wx', mode: 0o600 });
          return sendJson(response, 201, { kind: 'draft', slug });
        }));
      }

      const promoteMatch = /^\/api\/articles\/draft\/([a-z0-9]+(?:-[a-z0-9]+)*)\/promote$/.exec(url.pathname);
      if (promoteMatch && method === 'POST') {
        const slug = promoteMatch[1];
        const input = await readJson(request, 8 * 1024);
        return await library.withArticlesMutation(() => withLock(slug, async () => {
          if (!await safeDirectory(roots.draft)) throw httpError(404, '草稿不存在');
          const source = articlePath('draft', slug);
          const info = await regularFile(source);
          if (!info) throw httpError(404, '草稿不存在');
          if (info.size > MAX_MARKDOWN_BYTES) throw httpError(413, '文章超过 2 MB');
          const content = await readFile(source, 'utf8');
          if (input?.revision !== digest(content)) throw httpError(409, '草稿已修改，请刷新后再操作');
          const { frontmatter, body } = splitMarkdown(content);
          const document = parseDocument(frontmatter, { uniqueKeys: true });
          if (document.errors.length) throw httpError(422, '发布信息的 YAML 格式错误');
          let metadata;
          try { metadata = document.toJS({ maxAliasCount: 100 }); } catch { throw httpError(422, '发布信息的 YAML 格式错误'); }
          if (!metadata || typeof metadata !== 'object' || !['lead', 'published'].includes(metadata.status)) {
            throw httpError(422, '请先把文章状态设为 lead 或 published，再加入网站内容');
          }
          if (typeof metadata.title !== 'string' || metadata.title.trim().length < 8 ||
              typeof metadata.summary !== 'string' || metadata.summary.trim().length < 20) {
            throw httpError(422, '请填写至少 8 字的标题和 20 字的摘要');
          }
          await safeDirectory(roots.content, true);
          const target = articlePath('content', slug);
          if (await lstat(target).catch((error) => { if (error.code === 'ENOENT') return null; throw error; })) {
            throw httpError(409, '同名网站内容已存在，不能覆盖');
          }
          const sourceAssets = join(roots.draft, slug);
          const targetAssets = join(roots.content, slug);
          const hasAssets = await safeDirectory(sourceAssets);
          if (hasAssets && await safeDirectory(targetAssets)) throw httpError(409, '同名图片目录已存在，不能覆盖');
          await saveRevision('draft', slug, content);
          let created = false;
          let movedAssets = false;
          try {
            await writeFile(target, content, { flag: 'wx', mode: 0o600 });
            created = true;
            if (hasAssets) { await rename(sourceAssets, targetAssets); movedAssets = true; }
            await unlink(source);
          } catch (error) {
            if (movedAssets) await rename(targetAssets, sourceAssets);
            if (created) await unlink(target);
            if (error.code === 'EEXIST') throw httpError(409, '同名网站内容已存在，不能覆盖');
            throw error;
          }
          return sendJson(response, 200, { kind: 'content', slug, frontmatter, body, revision: digest(content) });
        }));
      }

      const articleMatch = /^\/api\/articles\/(draft|content)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(url.pathname);
      if (articleMatch && (method === 'GET' || method === 'PUT')) {
        const [, kind, slug] = articleMatch;
        if (!await safeDirectory(roots[kind])) throw httpError(404, '文章不存在');
        const path = articlePath(kind, slug);
        const info = await regularFile(path);
        if (!info) throw httpError(404, '文章不存在');
        if (info.size > MAX_MARKDOWN_BYTES) throw httpError(413, '文章超过 2 MB');
        if (method === 'GET') {
          const content = await readFile(path, 'utf8');
          return sendJson(response, 200, { kind, slug, ...splitMarkdown(content), revision: digest(content) });
        }
        const input = await readJson(request);
        return await withLock(slug, async () => {
          const current = await readFile(path, 'utf8');
          if (input.revision !== digest(current)) throw httpError(409, '文章已在其他窗口修改，请刷新后再保存');
          const next = composeMarkdown(input.frontmatter, input.body);
          await saveRevision(kind, slug, current);
          await writeAtomic(path, next);
          return sendJson(response, 200, { revision: digest(next) });
        });
      }

      const uploadMatch = /^\/api\/articles\/(draft|content)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/images$/.exec(url.pathname);
      if (uploadMatch && method === 'POST') {
        const [, kind, slug] = uploadMatch;
        return await withLock(slug, async () => {
          if (!await safeDirectory(roots[kind])) throw httpError(404, '文章不存在');
          if (!await regularFile(articlePath(kind, slug))) throw httpError(404, '请先保存文章再上传图片');
          const buffer = await readLimited(request, MAX_IMAGE_BYTES);
          const type = detectImage(buffer);
          if (!type || request.headers['content-type'] !== type.mime) throw httpError(415, '只支持 PNG、JPEG 或 WebP 图片');
          const mode = mediaMode(mediaEnv);
          if (mode === 'incomplete') throw httpError(503, '媒体存储配置不完整，图片未保存');
          let asset;
          try {
            const { prepareImageAsset } = await import('../scripts/media-core.mjs');
            asset = await prepareImageAsset({
              bytes: buffer,
              filename: `image.${type.ext}`,
              slug,
              baseUrl: mode === 'direct' ? mediaEnv.MEDIA_PUBLIC_BASE_URL : 'https://media.invalid',
            });
          } catch (error) {
            throw httpError(415, `图片不能处理：${error.message}`);
          }
          if (mode === 'direct') {
            try {
              const publicUrl = await publishImageAsset({ asset, env: mediaEnv });
              return sendJson(response, 201, { url: publicUrl, storage: 'remote' });
            } catch (error) {
              console.error('Image publish:', error);
              throw httpError(502, '图片上传或公开地址校验失败，正文未插入图片');
            }
          }
          const directory = join(roots[kind], slug);
          await safeDirectory(directory, true);
          const filename = `image-${randomUUID()}.${type.ext}`;
          await writeFile(join(directory, filename), asset.bytes, { flag: 'wx', mode: 0o600 });
          return sendJson(response, 201, { url: `./${slug}/${filename}`, filename, storage: 'staging' });
        });
      }

      const assetMatch = /^\/api\/assets\/(draft|content)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([^/]+)$/.exec(url.pathname);
      if (assetMatch && (method === 'GET' || method === 'HEAD')) {
        const [, kind, slug, filename] = assetMatch;
        if (!await safeDirectory(roots[kind])) throw httpError(404, '文章不存在');
        if (!SLUG.test(slug) || !IMAGE_NAME.test(filename) || filename.includes('..')) throw httpError(400, '图片名称无效');
        if (!await regularFile(articlePath(kind, slug))) throw httpError(404, '文章不存在');
        const directory = join(roots[kind], slug);
        if (!await safeDirectory(directory)) throw httpError(404, '图片不存在');
        const path = join(directory, filename);
        const info = await regularFile(path);
        if (!info || info.size > MAX_IMAGE_BYTES) throw httpError(404, '图片不存在');
        const buffer = await readFile(path);
        const type = detectImage(buffer);
        if (!type) throw httpError(415, '图片格式无效');
        response.writeHead(200, {
          'Content-Type': type.mime,
          'Content-Length': buffer.length,
          'Cache-Control': 'private, max-age=60',
          'X-Content-Type-Options': 'nosniff',
          'Cross-Origin-Resource-Policy': 'same-origin',
        });
        return response.end(method === 'HEAD' ? undefined : buffer);
      }

      if (url.pathname.startsWith('/api/') && apiHandler && await apiHandler(request, response, {
        url, projectRoot, roots, templatePath, session: currentSession,
        readJson, sendJson, httpError, digest, splitMarkdown, composeMarkdown,
        articlePath, withLock, regularFile, safeDirectory, writeAtomic, saveRevision,
      })) return;
      if (url.pathname.startsWith('/api/')) throw httpError(404, '接口不存在');
      if (frontend) return frontend(request, response);
      throw httpError(404, '页面不存在');
    } catch (error) {
      if (response.headersSent) return response.end();
      const status = Number.isInteger(error.status) ? error.status : error.code === 'ENOENT' ? 404 : 500;
      if (status === 500) console.error('Author server:', error);
      sendJson(response, status, { error: status === 500 ? '写作台发生错误，请稍后重试' : error.message });
    }
  });
  return server;
}
