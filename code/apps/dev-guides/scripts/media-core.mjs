import { createHash, randomUUID } from 'node:crypto';
import { lstat, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const markdownParser = unified().use(remarkParse);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SOURCE_BYTES = 15 * 1024 * 1024;
const MAX_INPUT_PIXELS = 40_000_000;
const MAX_OUTPUT_SIDE = 4_000;
const CONTENT_TYPES = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

function visit(node, callback) {
  callback(node);
  for (const child of node.children ?? []) visit(child, callback);
}

function lineOf(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function imageDestinationRange(source, node) {
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new Error('无法定位 Markdown 图片，请改用行内图片语法。');
  }
  const raw = source.slice(start, end);
  if (!raw.startsWith('![')) {
    throw new Error(`第 ${lineOf(source, start)} 行图片不是行内图片语法，请使用 ![说明](./文章名/图片.png)。`);
  }

  let index = 2;
  let bracketDepth = 1;
  while (index < raw.length && bracketDepth > 0) {
    if (raw[index] === '\\') {
      index += 2;
      continue;
    }
    if (raw[index] === '[') bracketDepth += 1;
    if (raw[index] === ']') bracketDepth -= 1;
    index += 1;
  }
  if (bracketDepth !== 0 || raw[index] !== '(') {
    throw new Error(`第 ${lineOf(source, start)} 行引用式图片暂不支持自动发布，请改用 ![说明](./文章名/图片.png)。`);
  }
  index += 1;
  while (/\s/.test(raw[index] ?? '') && index < raw.length) index += 1;

  const destinationStart = index;
  if (raw[index] === '<') {
    index += 1;
    while (index < raw.length && raw[index] !== '>') {
      if (raw[index] === '\\') index += 1;
      index += 1;
    }
    if (raw[index] !== '>') throw new Error('Markdown 图片地址没有闭合的 >。');
    return { start: start + destinationStart, end: start + index + 1 };
  }

  let parentheses = 0;
  while (index < raw.length) {
    const character = raw[index];
    if (character === '\\') {
      index += 2;
      continue;
    }
    if (character === '(') parentheses += 1;
    if (character === ')') {
      if (parentheses === 0) break;
      parentheses -= 1;
    }
    if (/\s/.test(character) && parentheses === 0) break;
    index += 1;
  }
  if (index === destinationStart) throw new Error('Markdown 图片地址为空。');
  return { start: start + destinationStart, end: start + index };
}

function imageKind(url) {
  if (/^https?:\/\//i.test(url)) return 'remote';
  if (/^(?:data|blob|file):/i.test(url) || /^\/\//.test(url)) return 'unsafe';
  if (/^[a-z][a-z\d+.-]*:/i.test(url)) return 'unsafe';
  return 'local';
}

/** Return actual image nodes, leaving examples in code fences untouched. */
export function findMarkdownImages(source) {
  const found = [];
  visit(markdownParser.parse(source), (node) => {
    if (node.type === 'html' && /<img(?:\s|>|\/)/i.test(node.value)) {
      const line = node.position?.start.line ?? '?';
      throw new Error(`第 ${line} 行含 HTML <img>。请改用 Markdown 图片，发布器才能校验和管理素材。`);
    }
    if (node.type === 'imageReference') {
      const line = node.position?.start.line ?? '?';
      throw new Error(`第 ${line} 行使用引用式图片。请改用 ![说明](./文章名/图片.png)，才能检查图片来源。`);
    }
    if (node.type !== 'image') return;
    const offset = node.position?.start.offset ?? 0;
    found.push({
      url: node.url,
      alt: node.alt ?? '',
      kind: imageKind(node.url),
      line: node.position?.start.line ?? lineOf(source, offset),
      destination: imageKind(node.url) === 'local' ? imageDestinationRange(source, node) : null,
    });
  });
  return found;
}

export function validateMediaBaseUrl(raw) {
  if (!raw) throw new Error('缺少 MEDIA_PUBLIC_BASE_URL（例如 https://media.example.com）。');
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('MEDIA_PUBLIC_BASE_URL 不是有效 URL。');
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('MEDIA_PUBLIC_BASE_URL 必须是无账号、查询参数及锚点的 HTTPS 地址。');
  }
  return url.toString().replace(/\/$/, '');
}

export function isOwnedMediaUrl(raw, baseUrl) {
  const base = validateMediaBaseUrl(baseUrl);
  let url;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  const expectedPrefix = `${base}/dev-guides/tutorials/`;
  return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash
    && url.toString().startsWith(expectedPrefix)
    && /^dev-guides\/tutorials\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-f0-9]{64}\.(?:png|jpg|webp)$/.test(
      url.toString().slice(`${base}/`.length),
    );
}

function expectedFormat(filename) {
  const extension = path.extname(filename).toLowerCase();
  if (extension === '.jpg' || extension === '.jpeg') return 'jpeg';
  if (extension === '.png') return 'png';
  if (extension === '.webp') return 'webp';
  throw new Error(`不支持 ${extension || '无扩展名'} 图片；请使用 PNG、JPEG 或 WebP。`);
}

/** Shared by CLI and a future editor: deterministic bytes, key, and public URL. */
export async function prepareImageAsset({ bytes, filename, slug, baseUrl }) {
  if (!SLUG.test(slug)) throw new Error(`文章 slug 不合法：${slug}`);
  if (!Buffer.isBuffer(bytes)) throw new TypeError('bytes 必须是 Buffer。');
  if (!bytes.length || bytes.length > MAX_SOURCE_BYTES) {
    throw new Error(`图片必须大于 0 且不超过 ${MAX_SOURCE_BYTES / 1024 / 1024} MiB。`);
  }
  const format = expectedFormat(filename);
  const base = validateMediaBaseUrl(baseUrl);
  let metadata;
  try {
    metadata = await sharp(bytes, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
  } catch (error) {
    throw new Error(`无法读取图片 ${filename}：${error.message}`);
  }
  if (metadata.format !== format || !metadata.width || !metadata.height || metadata.pages > 1) {
    throw new Error(`图片 ${filename} 的实际格式、扩展名或页数不符。仅接受单帧 PNG、JPEG、WebP。`);
  }

  // Keep screenshot text crisp: PNG stays lossless. All formats lose EXIF/metadata.
  let pipeline = sharp(bytes, { limitInputPixels: MAX_INPUT_PIXELS })
    .rotate()
    .resize({ width: MAX_OUTPUT_SIDE, height: MAX_OUTPUT_SIDE, fit: 'inside', withoutEnlargement: true });
  if (format === 'png') pipeline = pipeline.png({ compressionLevel: 9, palette: false });
  if (format === 'jpeg') pipeline = pipeline.jpeg({ quality: 88, mozjpeg: true });
  if (format === 'webp') pipeline = pipeline.webp({ quality: 90, effort: 6, smartSubsample: true });
  const output = await pipeline.toBuffer();
  const digest = createHash('sha256').update(output).digest('hex');
  const extension = format === 'jpeg' ? 'jpg' : format;
  const key = `dev-guides/tutorials/${slug}/${digest}.${extension}`;
  return {
    key,
    bytes: output,
    contentType: CONTENT_TYPES[format],
    url: `${base}/${key}`,
  };
}

/** Head first to avoid duplicate uploads. A failed upload stops before Markdown changes. */
export async function uploadPreparedAssets(assets, storage) {
  const unique = new Map(assets.map((asset) => [asset.key, asset]));
  let uploaded = 0;
  let existing = 0;
  for (const asset of unique.values()) {
    let head;
    try {
      head = await storage.headObject(asset.key);
    } catch (error) {
      // A key that does not exist can return 403 when the uploader has no
      // ListBucket permission. The SHA-256 key makes retrying PutObject safe.
      if (error?.$metadata?.httpStatusCode !== 403) throw error;
      head = null;
    }
    if (head) {
      if (head.contentLength !== undefined && head.contentLength !== asset.bytes.length) {
        throw new Error(`远端已有同名但长度不同的对象：${asset.key}`);
      }
      existing += 1;
      continue;
    }
    await storage.putObject(asset.key, asset.bytes, asset.contentType);
    uploaded += 1;
  }
  return { uploaded, existing, unique: [...unique.values()] };
}

/** The public URL must work before article references are rewritten. */
export async function verifyPublicAsset(asset, { fetchImpl = fetch, attempts = 3, delayMs = 400 } = {}) {
  let failure;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetchImpl(asset.url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(6_000),
        redirect: 'follow',
      });
      const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
      const sizeHeader = response.headers.get('content-length');
      const size = sizeHeader === null ? null : Number(sizeHeader);
      const targetIsOwned = !response.url || response.url === asset.url;
      if (response.ok && type === asset.contentType && targetIsOwned
        && (size === null || size === asset.bytes.length)) return;
      failure = new Error(`HTTP ${response.status}，Content-Type: ${type || '缺失'}，Content-Length: ${sizeHeader ?? '缺失'}，目标: ${response.url ?? asset.url}`);
    } catch (error) {
      failure = error;
    }
    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
  }
  throw new Error(`图片公开地址不可访问：${asset.url}（${failure?.message ?? '未知错误'}）。Markdown 未改写。`);
}

/** Shared publishing step for the CLI and editor; never returns an unverified URL. */
export async function publishPreparedAssets(assets, storage, verifyPublic = verifyPublicAsset) {
  const result = await uploadPreparedAssets(assets, storage);
  for (const asset of result.unique) await verifyPublic(asset);
  return result;
}

async function listTutorialFiles(directory) {
  const names = await readdir(directory);
  return names.filter((name) => name.endsWith('.md')).sort().map((name) => path.join(directory, name));
}

function slugFromPath(file) {
  const slug = path.basename(file, '.md');
  if (!SLUG.test(slug)) throw new Error(`教程文件名不是合法 slug：${file}`);
  return slug;
}

function resolveImagePath(directory, slug, url) {
  if (url.includes('?') || url.includes('#')) throw new Error(`本地图片地址不能带查询参数或锚点：${url}`);
  let decoded;
  try {
    decoded = decodeURIComponent(url);
  } catch {
    throw new Error(`本地图片地址编码错误：${url}`);
  }
  const prefix = `./${slug}/`;
  if (!decoded.startsWith(prefix)) {
    throw new Error(`图片必须位于文章同名目录 ${prefix}：${url}`);
  }
  const filename = decoded.slice(prefix.length);
  if (!filename || filename.startsWith('.') || /[\\/\x00-\x1f\x7f]/.test(filename) || filename === '..' || filename.length > 160) {
    throw new Error(`图片文件名不安全：${url}`);
  }
  expectedFormat(filename);
  return { filename, filePath: path.join(directory, slug, filename) };
}

async function readSafeImage(directory, slug, url) {
  const { filename, filePath } = resolveImagePath(directory, slug, url);
  const folder = path.join(directory, slug);
  const folderStat = await lstat(folder);
  const fileStat = await lstat(filePath);
  if (folderStat.isSymbolicLink() || !folderStat.isDirectory() || fileStat.isSymbolicLink() || !fileStat.isFile()) {
    throw new Error(`图片目录或文件必须是普通文件，不能使用软链接：${url}`);
  }
  if (fileStat.size > MAX_SOURCE_BYTES) throw new Error(`图片超过 15 MiB：${url}`);
  return { filename, bytes: await readFile(filePath) };
}

export function rewriteMarkdownImages(source, replacements) {
  let output = source;
  for (const replacement of [...replacements].sort((a, b) => b.start - a.start)) {
    output = output.slice(0, replacement.start) + replacement.url + output.slice(replacement.end);
  }
  return output;
}

/** Read-only build gate; no credentials or network required. */
export async function checkMedia({ directory, baseUrl = process.env.MEDIA_PUBLIC_BASE_URL }) {
  const issues = [];
  for (const file of await listTutorialFiles(directory)) {
    const source = await readFile(file, 'utf8');
    try {
      slugFromPath(file);
      for (const image of findMarkdownImages(source)) {
        if (!image.alt.trim()) issues.push(`${file}:${image.line}: 图片缺少替代文字 alt，请描述图中关键操作。`);
        if (image.kind !== 'remote') {
          issues.push(`${file}:${image.line}: 图片尚未发布或地址不安全：${image.url}`);
        } else if (!baseUrl || !isOwnedMediaUrl(image.url, baseUrl)) {
          issues.push(`${file}:${image.line}: 图片不是本站媒体地址，或缺少 MEDIA_PUBLIC_BASE_URL：${image.url}`);
        }
      }
    } catch (error) {
      issues.push(`${file}: ${error.message}`);
    }
  }
  return issues;
}

/** Publish every local tutorial image; uploaded originals remain in the article folder. */
export async function publishMedia({
  directory,
  baseUrl,
  storage,
  storageFactory,
  verifyPublic = verifyPublicAsset,
  dryRun = false,
}) {
  const articles = [];
  const assets = [];
  const preparedByPath = new Map();
  for (const file of await listTutorialFiles(directory)) {
    const slug = slugFromPath(file);
    const source = await readFile(file, 'utf8');
    const replacements = [];
    for (const image of findMarkdownImages(source)) {
      if (!image.alt.trim()) throw new Error(`${file}:${image.line}: 图片缺少替代文字 alt，请描述图中关键操作。`);
      if (image.kind === 'unsafe') throw new Error(`${file}:${image.line}: 不安全的图片地址：${image.url}`);
      if (image.kind === 'remote') {
        if (!isOwnedMediaUrl(image.url, baseUrl)) throw new Error(`${file}:${image.line}: 图片不是本站媒体地址：${image.url}`);
        continue;
      }
      try {
        const local = await readSafeImage(directory, slug, image.url);
        const absolutePath = path.join(directory, slug, local.filename);
        let asset = preparedByPath.get(absolutePath);
        if (!asset) {
          asset = await prepareImageAsset({ ...local, slug, baseUrl });
          preparedByPath.set(absolutePath, asset);
          assets.push(asset);
        }
        replacements.push({ ...image.destination, url: asset.url });
      } catch (error) {
        throw new Error(`${file}:${image.line}: ${error.message}`);
      }
    }
    if (replacements.length) {
      articles.push({ file, source, output: rewriteMarkdownImages(source, replacements), replacements: replacements.length });
    }
  }

  if (!assets.length) return { assets: 0, articles: 0, uploaded: 0, existing: 0, dryRun };
  if (dryRun) return { assets: assets.length, articles: articles.length, uploaded: 0, existing: 0, dryRun, urls: assets.map((asset) => asset.url) };

  const ownsDestination = !storage;
  const destination = storage ?? (await storageFactory?.());
  if (!destination) throw new Error('缺少 S3 存储连接。');
  try {
    const uploaded = await publishPreparedAssets(assets, destination, verifyPublic);

    // Prepare all output files and check for concurrent editor changes before replacing any article.
    const staged = [];
    try {
      for (const article of articles) {
        const latest = await readFile(article.file, 'utf8');
        if (latest !== article.source) throw new Error(`${article.file} 在上传期间被修改，请重新运行。`);
        const temp = `${article.file}.${randomUUID()}.media-tmp`;
        await writeFile(temp, article.output, { flag: 'wx' });
        staged.push({ file: article.file, temp, source: article.source });
      }
      const committed = [];
      try {
        for (const article of staged) {
          await rename(article.temp, article.file);
          committed.push(article);
        }
      } catch (error) {
        const rollbackErrors = [];
        for (const article of committed.reverse()) {
          const rollbackTemp = `${article.file}.${randomUUID()}.media-rollback`;
          try {
            await writeFile(rollbackTemp, article.source, { flag: 'wx' });
            await rename(rollbackTemp, article.file);
          } catch (rollbackError) {
            rollbackErrors.push(new Error(`${article.file}: ${rollbackError.message}`));
            await unlink(rollbackTemp).catch(() => {});
          }
        }
        if (rollbackErrors.length) {
          throw new AggregateError([error, ...rollbackErrors], '部分 Markdown 回写失败且自动恢复不完整，请检查报错文件。');
        }
        throw error;
      }
    } finally {
      await Promise.all(staged.map((article) => unlink(article.temp).catch(() => {})));
    }
    return {
      assets: uploaded.unique.length,
      articles: articles.length,
      uploaded: uploaded.uploaded,
      existing: uploaded.existing,
      dryRun: false,
    };
  } finally {
    if (ownsDestination) await destination.close?.();
  }
}
