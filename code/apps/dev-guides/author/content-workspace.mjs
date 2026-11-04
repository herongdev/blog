import { createReadStream, constants } from 'node:fs';
import { chmod, lstat, mkdir, open, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { join, resolve, extname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createWorkspaceS3Storage } from './workspace-s3.mjs';
import { requirePrivateStorageSpace } from './private-storage.mjs';
const exec = promisify(execFile);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID = /^[a-f0-9-]{36}$/;
const CATEGORIES = new Set(['video', 'recording', 'image', 'audio', 'project', 'subtitle', 'other']);
const fail = (status, message) => Object.assign(new Error(message), { status });
const digest = (value) => createHash('sha256').update(value).digest('hex');
const now = () => new Date().toISOString();
const positive = (value, fallback) => Number.isSafeInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback;
async function exists(path) { try { return await lstat(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } }
async function safeDirectory(path) {
  await mkdir(path, { recursive: true, mode: 0o700 });
  if (!(await lstat(path)).isDirectory()) throw fail(500, '制作素材目录不安全');
  await chmod(path, 0o700);
}
async function safeFile(path) {
  const info = await exists(path); if (!info?.isFile()) throw fail(404, '素材文件不存在'); return info;
}
async function atomicJson(path, value) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  try { await writeFile(temporary, `${JSON.stringify(value)}\n`, { flag: 'wx', mode: 0o600 }); await rename(temporary, path); }
  finally { await rm(temporary, { force: true }); }
}
async function fileDigest(path) {
  await safeFile(path); const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk); return hash.digest('hex');
}
function filenameOf(value) {
  if (typeof value !== 'string' || !value.trim() || value.length > 240 || /[\\/\u0000-\u001f\u007f]/.test(value) || ['.', '..'].includes(value)) throw fail(422, '文件名不符合要求'); return value;
}
function relativePathOf(value, filename) {
  const path = value || filename;
  if (typeof path !== 'string' || path.length > 1000 || path.startsWith('/') || path.includes('\\') || /[\u0000-\u001f\u007f]/.test(path) || path.split('/').some((part) => !part || ['.', '..'].includes(part)) || path.split('/').at(-1) !== filename) throw fail(422, '素材目录不符合要求'); return path;
}
function text(value, maximum, name) {
  if (typeof value !== 'string' || value.length > maximum || value.includes('\0')) throw fail(422, `${name}不符合要求`); return value;
}
function decodeHeader(value, fallback = '') {
  try { return value ? decodeURIComponent(value) : fallback; } catch { throw fail(422, '文件名编码无效'); }
}
async function limitedBody(request, maximum) {
  const chunks = []; let size = 0;
  for await (const chunk of request) { size += chunk.length; if (size > maximum) throw fail(413, '请求超过大小限制'); chunks.push(chunk); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw fail(400, '请求格式无效'); }
}
async function writeAll(file, bytes) {
  let offset = 0; while (offset < bytes.length) { const result = await file.write(bytes, offset, bytes.length - offset); if (!result.bytesWritten) throw fail(500, '素材写入失败'); offset += result.bytesWritten; }
}
async function receive(request, destination, maximum, expected) {
  const length = Number(request.headers?.['content-length']);
  if (Number.isFinite(length) && length > maximum) throw fail(413, '文件超过大小限制');
  const file = await open(destination, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
  let size = 0; const hash = createHash('sha256');
  try {
    for await (const chunk of request) { size += chunk.length; if (size > maximum) throw fail(413, '文件超过大小限制'); hash.update(chunk); await writeAll(file, chunk); }
    if (!size || (expected !== undefined && size !== expected)) throw fail(422, '文件大小与上传记录不一致');
    await file.sync(); return { size, sha256: hash.digest('hex') };
  } finally { await file.close(); }
}
async function verifyMedia(path, category, filename, env) {
  const extension = extname(filename).toLowerCase();
  if (category === 'image') {
    if (!['.png', '.jpg', '.jpeg', '.webp', '.gif', '.tif', '.tiff', '.heic', '.avif'].includes(extension)) throw fail(422, '图片格式不受支持');
    const { default: sharp } = await import('sharp'); let metadata;
    try { metadata = await sharp(path, { limitInputPixels: 100_000_000 }).metadata(); await sharp(path, { limitInputPixels: 100_000_000 }).stats(); } catch { throw fail(422, '图片不能读取，请检查原始文件'); }
    if (!metadata.width || !metadata.height || metadata.width * metadata.height > 100_000_000) throw fail(422, '图片尺寸不符合要求');
    const expectedFormats = { '.png': ['png'], '.jpg': ['jpeg'], '.jpeg': ['jpeg'], '.webp': ['webp'], '.gif': ['gif'], '.tif': ['tiff'], '.tiff': ['tiff'], '.heic': ['heif'], '.avif': ['heif', 'avif'] };
    if (!expectedFormats[extension]?.includes(metadata.format)) throw fail(422, '图片实际格式与文件扩展名不一致');
    const types = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', tiff: 'image/tiff', heif: 'image/heic', avif: 'image/avif' };
    return { mime: types[metadata.format] || 'application/octet-stream', width: metadata.width, height: metadata.height };
  }
  if (['video', 'recording', 'audio'].includes(category)) {
    const video = ['.mp4', '.mov', '.m4v', '.webm', '.mkv'], audio = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac'];
    if (!(category === 'audio' ? audio : video).includes(extension)) throw fail(422, category === 'audio' ? '音频格式不受支持' : '视频格式不受支持');
    let probe;
    try { probe = JSON.parse((await exec(env.WORKSPACE_FFPROBE || env.PUBLISHER_FFPROBE || 'ffprobe', ['-v', 'error', '-protocol_whitelist', 'file,pipe', '-show_entries', 'stream=codec_type,width,height:format=duration,format_name', '-of', 'json', path], { timeout: 30_000, maxBuffer: 128 * 1024 })).stdout); }
    catch { throw fail(422, '媒体文件不能读取，请检查文件或媒体检查组件'); }
    const stream = probe.streams?.find((item) => item.codec_type === (category === 'audio' ? 'audio' : 'video')), duration = Number(probe.format?.duration);
    if (!stream || !Number.isFinite(duration) || duration <= 0 || (category !== 'audio' && !(stream.width > 0 && stream.height > 0))) throw fail(422, '媒体文件没有有效画面、音轨或时长');
    const formats = { '.mp4': /mov|mp4/, '.m4v': /mov|mp4/, '.mov': /mov|mp4/, '.webm': /matroska|webm/, '.mkv': /matroska|webm/, '.mp3': /mp3/, '.wav': /wav/, '.m4a': /mov|mp4/, '.aac': /aac/, '.ogg': /ogg/, '.flac': /flac/ };
    if (!formats[extension].test(probe.format?.format_name || '')) throw fail(422, '媒体实际格式与文件扩展名不一致');
    const types = { '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.mkv': 'video/x-matroska', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.ogg': 'audio/ogg', '.flac': 'audio/flac' };
    return { mime: types[extension], duration, ...(category === 'audio' ? {} : { width: stream.width, height: stream.height }) };
  }
  if (category === 'subtitle') {
    if (!['.srt', '.vtt', '.ass', '.ssa', '.txt', '.md'].includes(extension)) throw fail(422, '字幕与文稿支持 SRT、VTT、ASS、SSA、TXT 或 Markdown');
    if ((await safeFile(path)).size > 10 * 1024 ** 2) throw fail(413, '字幕超过大小限制');
    if ((await readFile(path)).includes(0)) throw fail(422, '字幕内容不是可读取文本'); return { mime: 'text/plain; charset=utf-8' };
  }
  // Project packages remain opaque: never extract or execute an uploaded source file.
  return { mime: 'application/octet-stream' };
}
async function streamFile(request, response, path, asset, attachment, remote) {
  const info = remote ? await remote.verify(asset) : await safeFile(path); if (info.size !== asset.size) throw fail(422, '素材文件大小发生变化');
  let start = 0, end = info.size - 1, status = 200;
  if (request.headers.range) {
    const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    if (!range || (!range[1] && !range[2])) throw fail(416, '读取范围无效');
    if (!range[1]) start = Math.max(0, info.size - Number(range[2])); else { start = Number(range[1]); if (range[2]) end = Math.min(end, Number(range[2])); }
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) { response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); response.end(); return; } status = 206;
  }
  const stream = request.method === 'HEAD' ? null : remote ? await remote.openRead(asset, { start, end }) : createReadStream(path, { start, end });
  response.writeHead(status, { 'Content-Type': asset.mime, 'Content-Length': end - start + 1, 'Accept-Ranges': 'bytes', 'Content-Disposition': `${attachment || !/^(?:image|video|audio)\//.test(asset.mime) ? 'attachment' : 'inline'}; filename*=UTF-8''${encodeURIComponent(asset.filename)}`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin', ...(status === 206 ? { 'Content-Range': `bytes ${start}-${end}/${info.size}` } : {}) });
  if (request.method === 'HEAD') return response.end();
  stream.on('error', () => response.destroy()); response.on('close', () => stream.destroy()); stream.pipe(response);
}
const crcTable = Array.from({ length: 256 }, (_, index) => { let crc = index; for (let bit = 0; bit < 8; bit++) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1; return crc >>> 0; });
function crcStep(crc, bytes) { for (const value of bytes) crc = crcTable[(crc ^ value) & 255] ^ (crc >>> 8); return crc >>> 0; }
async function zipStream(response, entries, filename) {
  response.writeHead(200, { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  let offset = 0; const central = [];
  const write = async (bytes) => { if (response.destroyed) throw fail(499, '下载已取消'); if (!response.write(bytes)) await new Promise((done, reject) => { const cleanup = () => { response.off('drain', drained); response.off('close', closed); response.off('error', rejected); }; const drained = () => { cleanup(); done(); }; const closed = () => { cleanup(); reject(fail(499, '下载已取消')); }; const rejected = (error) => { cleanup(); reject(error); }; response.once('drain', drained); response.once('close', closed); response.once('error', rejected); }); offset += bytes.length; };
  try {
    for (const entry of entries) {
      const name = Buffer.from(entry.name), start = offset, header = Buffer.alloc(30);
      header.writeUInt32LE(0x04034b50); header.writeUInt16LE(20, 4); header.writeUInt16LE(0x808, 6); header.writeUInt16LE(33, 12); header.writeUInt16LE(name.length, 26); await write(header); await write(name);
      let crc = 0xffffffff, size = 0; const stream = entry.bytes ? [entry.bytes] : entry.open ? await entry.open() : createReadStream(entry.path);
      for await (const chunk of stream) { crc = crcStep(crc, chunk); size += chunk.length; await write(chunk); } crc = (crc ^ 0xffffffff) >>> 0;
      const descriptor = Buffer.alloc(16); descriptor.writeUInt32LE(0x08074b50); descriptor.writeUInt32LE(crc, 4); descriptor.writeUInt32LE(size, 8); descriptor.writeUInt32LE(size, 12); await write(descriptor);
      const row = Buffer.alloc(46); row.writeUInt32LE(0x02014b50); row.writeUInt16LE(20, 4); row.writeUInt16LE(20, 6); row.writeUInt16LE(0x808, 8); row.writeUInt16LE(33, 14); row.writeUInt32LE(crc, 16); row.writeUInt32LE(size, 20); row.writeUInt32LE(size, 24); row.writeUInt16LE(name.length, 28); row.writeUInt32LE(start, 42); central.push(row, name);
    }
    const centralOffset = offset; for (const row of central) await write(row);
    const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10); end.writeUInt32LE(offset - centralOffset, 12); end.writeUInt32LE(centralOffset, 16); await write(end); response.end();
  } catch { response.destroy(); }
}

/** Host authenticates all requests and checks Origin/CSRF before mutations. */
export async function createContentWorkspace({ projectRoot, resolveArticle, env = process.env, maxFileBytes, maxStorageBytes, chunkSize = 4 * 1024 ** 2, storage } = {}) {
  if (!projectRoot) throw new Error('A project root is required');
  projectRoot = resolve(projectRoot); const root = join(projectRoot, '.content-workspace');
  for (const path of [root, join(root, 'objects'), join(root, 'uploads'), join(root, 'cache')]) await safeDirectory(path);
  const objectStorage = storage || createWorkspaceS3Storage(env);
  const cacheLimit = positive(env.WORKSPACE_CACHE_BYTES, 512 * 1024 ** 2);
  const cached = new Map(), cacheReferences = new Map();
  // Cache files are derived, private and disposable; a new single-process host has no readers.
  for (const name of await readdir(join(root, 'cache'))) {
    if (/^[a-f0-9]{64}(?:\.[a-f0-9-]{36}\.tmp)?$/.test(name)) { const path = join(root, 'cache', name); await safeFile(path); await rm(path); }
  }
  const statePath = join(root, 'state.json'); let state;
  if (await exists(statePath)) { if ((await safeFile(statePath)).size > 4 * 1024 ** 2) throw new Error('Workspace state too large'); state = JSON.parse(await readFile(statePath, 'utf8')); }
  else { state = { version: 1, contents: {}, uploads: {} }; await atomicJson(statePath, state); }
  if (state.version !== 1 || !state.contents || !state.uploads) throw new Error('Invalid workspace state');
  const fileLimit = Math.min(2 * 1024 ** 3, positive(maxFileBytes ?? env.WORKSPACE_MAX_FILE_BYTES, 512 * 1024 ** 2));
  const storageLimit = Math.min(3 * 1024 ** 3, positive(maxStorageBytes ?? env.WORKSPACE_MAX_STORAGE_BYTES, 2 * 1024 ** 3));
  chunkSize = Math.min(8 * 1024 ** 2, positive(chunkSize, 4 * 1024 ** 2));
  let work = Promise.resolve();
  const locked = (action) => { const next = work.then(action); work = next.catch(() => {}); return next; };
  const save = () => { if (Buffer.byteLength(JSON.stringify(state)) > 4 * 1024 ** 2) throw fail(413, '工作区记录已达到当前容量限制'); return atomicJson(statePath, state); };
  async function requireArticle(slug) {
    if (typeof slug !== 'string' || slug.length > 180 || !SLUG.test(slug)) throw fail(400, '内容地址无效');
    if (resolveArticle) { if (!await resolveArticle(slug)) throw fail(404, '内容不存在'); return; }
    const paths = [join(projectRoot, 'drafts', `${slug}.md`), join(projectRoot, 'src/content/tutorials', `${slug}.md`)];
    if (!(await Promise.all(paths.map(exists))).some((info) => info?.isFile())) throw fail(404, '内容不存在');
  }
  async function content(slug) {
    await requireArticle(slug);
    if (!Object.hasOwn(state.contents, slug)) { state.contents[slug] = { id: randomUUID(), slug, notes: '', software: '', softwareVersion: '', selectedVideoId: null, assets: [], createdAt: now(), updatedAt: now() }; await save(); } return state.contents[slug];
  }
  const revision = (value) => digest(JSON.stringify(value));
  const publicAsset = (slug, asset) => ({ ...asset, previewUrl: `/api/workspaces/${slug}/assets/${asset.id}`, downloadUrl: `/api/workspaces/${slug}/assets/${asset.id}?download=1` });
  function usage() { const values = new Map(Object.values(state.contents).flatMap((value) => value.assets).map((asset) => [asset.sha256, asset.size])); return [...values.values()].reduce((sum, size) => sum + size, 0); }
  function reserved(excluding = null) { return Object.values(state.uploads).filter((item) => item.status !== 'completed' && item.id !== excluding).reduce((sum, item) => sum + item.size, 0); }
  const publicUpload = (value) => { const { expectedSha256, partHashes, ...rest } = value; return { ...rest, uploadedParts: value.receivedParts }; };
  function present(value) {
    const assets = value.assets.map((asset) => publicAsset(value.slug, asset));
    return { ...value, revision: revision(value), assets, currentVideo: assets.find((asset) => asset.id === value.selectedVideoId) || null, uploads: Object.values(state.uploads).filter((upload) => upload.slug === value.slug && upload.status !== 'completed').map(publicUpload), storage: { provider: objectStorage?.provider || 'local', label: objectStorage?.label || '本机私有存储', cloudConfigured: Boolean(objectStorage) }, usage: { bytes: usage(), maxBytes: storageLimit, maxFileBytes: fileLimit } };
  }
  const objectPath = (sha) => { if (!/^[a-f0-9]{64}$/.test(sha)) throw fail(500, '素材记录无效'); return join(root, 'objects', sha); };
  const uploadPath = (id) => { if (!ID.test(id)) throw fail(400, '上传记录无效'); return join(root, 'uploads', id); };
  async function beginUpload(slug, input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw fail(422, '上传信息无效');
    const value = await content(slug), filename = filenameOf(input.filename), relativePath = relativePathOf(input.relativePath, filename), category = input.category || 'other';
    if (!CATEGORIES.has(category)) throw fail(422, '请选择素材类型');
    if (!Number.isSafeInteger(input.size) || input.size < 1 || input.size > fileLimit) throw fail(413, '文件超过大小限制或为空');
    if (usage() + reserved() + input.size > storageLimit) throw fail(413, '私有素材空间不足，请检查存储用量');
    await requirePrivateStorageSpace(root, input.size * 2);
    if (Object.keys(state.uploads).length >= 2000 || value.assets.length >= 3000) throw fail(413, '素材或上传记录数量已达到当前限制');
    if (input.sha256 !== undefined && !/^[a-f0-9]{64}$/.test(input.sha256)) throw fail(422, '文件校验和无效');
    const prior = input.groupId && value.assets.find((asset) => asset.groupId === input.groupId && asset.category === category);
    if (input.groupId && !prior) throw fail(422, '素材版本组不存在');
    const groupId = prior?.groupId || value.assets.find((asset) => asset.category === category && asset.relativePath === relativePath)?.groupId || randomUUID();
    const upload = { id: randomUUID(), slug, filename, relativePath, category, groupId, size: input.size, chunkSize, totalParts: Math.ceil(input.size / chunkSize), receivedParts: [], partHashes: {}, expectedSha256: input.sha256 || null, status: 'uploading', createdAt: now() };
    await safeDirectory(uploadPath(upload.id)); state.uploads[upload.id] = upload; await save(); return publicUpload(upload);
  }
  function getUpload(slug, id) { const upload = state.uploads[id]; if (!ID.test(id) || !upload || upload.slug !== slug) throw fail(404, '上传记录不存在'); return upload; }
  async function writePart(slug, id, number, request) {
    await content(slug); const upload = getUpload(slug, id);
    if (upload.status === 'completed') throw fail(409, '上传已经完成');
    if (!Number.isSafeInteger(number) || number < 1 || number > upload.totalParts) throw fail(422, '分片编号无效');
    const expected = number === upload.totalParts ? upload.size - (number - 1) * upload.chunkSize : upload.chunkSize;
    await requirePrivateStorageSpace(root, expected);
    const directory = uploadPath(id); await safeDirectory(directory);
    const path = join(directory, `${number}.part`), temp = join(directory, `${randomUUID()}.incoming`);
    try {
      const result = await receive(request, temp, expected, expected);
      if (upload.receivedParts.includes(number)) { if (upload.partHashes[number] !== result.sha256 || await fileDigest(path) !== result.sha256) throw fail(409, '该分片内容与已上传文件不同，请重新选择正确文件'); }
      else { await rename(temp, path); upload.receivedParts.push(number); upload.receivedParts.sort((a, b) => a - b); upload.partHashes[number] = result.sha256; await save(); } return publicUpload(upload);
    } finally { await rm(temp, { force: true }); }
  }
  async function completeUpload(slug, id) {
    const value = await content(slug), upload = getUpload(slug, id);
    if (upload.status === 'completed') return { asset: publicAsset(slug, value.assets.find((asset) => asset.id === upload.assetId)), workspace: present(value) };
    if (upload.receivedParts.length !== upload.totalParts) throw fail(409, '还有文件分片未上传完成');
    const directory = uploadPath(id), temporary = join(directory, 'combined.upload'); await rm(temporary, { force: true });
    try {
      // Remove only this upload's disposable copy before checking free space.
      // Every merge failure must leave the original parts available for retry.
      await requirePrivateStorageSpace(root, upload.size);
      const file = await open(temporary, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600), hash = createHash('sha256'); let size = 0;
      try {
        for (let part = 1; part <= upload.totalParts; part++) {
          const path = join(directory, `${part}.part`), info = await safeFile(path), expected = part === upload.totalParts ? upload.size - (part - 1) * upload.chunkSize : upload.chunkSize;
          if (info.size !== expected || await fileDigest(path) !== upload.partHashes[part]) throw fail(422, '已上传分片校验失败，请重新上传');
          for await (const bytes of createReadStream(path)) { hash.update(bytes); size += bytes.length; await writeAll(file, bytes); }
        } await file.sync();
      } finally { await file.close(); }
      const sha256 = hash.digest('hex');
      if (size !== upload.size || (upload.expectedSha256 && upload.expectedSha256 !== sha256)) throw fail(422, '完整文件校验失败，请重新选择原始文件');
      const media = await verifyMedia(temporary, upload.category, upload.filename, env);
      const known = Object.values(state.contents).some((item) => item.assets.some((asset) => asset.sha256 === sha256));
      if (usage() + (known ? 0 : size) + reserved(id) > storageLimit) throw fail(413, '私有素材空间不足');
      if (objectStorage) await objectStorage.putFile(temporary, { sha256, size, mime: media.mime });
      else {
        const destination = objectPath(sha256), prior = await exists(destination);
        if (prior) { if (!prior.isFile() || prior.size !== size || await fileDigest(destination) !== sha256) throw fail(422, '已存储素材校验失败'); } else await rename(temporary, destination);
      }
      const versions = value.assets.filter((asset) => asset.groupId === upload.groupId);
      const asset = { id: randomUUID(), filename: upload.filename, relativePath: upload.relativePath, category: upload.category, groupId: upload.groupId, version: versions.reduce((maximum, item) => Math.max(maximum, item.version), 0) + 1, size, sha256, storage: objectStorage?.provider || 'local', ...media, createdAt: now() };
      value.assets.push(asset); if (asset.category === 'video') value.selectedVideoId = asset.id; value.updatedAt = now(); upload.status = 'completed'; upload.assetId = asset.id; await save(); await rm(directory, { recursive: true, force: true });
      return { asset: publicAsset(slug, asset), workspace: present(value) };
    } finally { await rm(temporary, { force: true }); }
  }
  async function trustedAsset(slug, assetId) {
    const value = await content(slug), asset = value.assets.find((item) => item.id === assetId);
    if (!asset || !ID.test(assetId)) throw fail(404, '素材不存在'); return asset;
  }
  function remoteFor(asset) {
    if (asset.storage !== 's3') return null;
    if (!objectStorage) throw fail(503, '此素材位于私有云存储，请恢复对应配置后读取'); return objectStorage;
  }
  async function resolveAsset(slug, assetId) {
    const asset = await trustedAsset(slug, assetId), remote = remoteFor(asset);
    let path = objectPath(asset.sha256);
    if (remote) {
      await remote.verify(asset); path = join(root, 'cache', asset.sha256);
      const existing = await exists(path);
      if (!existing) {
        const total = [...cached.values()].reduce((sum, size) => sum + size, 0);
        if (total + asset.size > cacheLimit) throw fail(413, '平台投稿临时缓存空间不足，请稍后重试或调整缓存额度');
        await requirePrivateStorageSpace(root, asset.size);
        const incoming = `${path}.${randomUUID()}.tmp`;
        try {
          const source = await remote.openRead(asset); source.headers = { 'content-length': String(asset.size) };
          const result = await receive(source, incoming, asset.size, asset.size);
          if (result.sha256 !== asset.sha256) throw fail(422, '私有素材下载校验失败'); await rename(incoming, path); cached.set(asset.sha256, asset.size);
        } finally { await rm(incoming, { force: true }); }
      } else cached.set(asset.sha256, asset.size);
    }
    const info = await safeFile(path); if (info.size !== asset.size || await fileDigest(path) !== asset.sha256) throw fail(422, '素材校验失败，请重新上传');
    if (remote) cacheReferences.set(asset.sha256, (cacheReferences.get(asset.sha256) || 0) + 1);
    return { path, asset: structuredClone(asset) };
  }
  async function releaseAsset(slug, assetId) {
    const asset = await trustedAsset(slug, assetId); if (asset.storage !== 's3') return;
    const count = Math.max(0, (cacheReferences.get(asset.sha256) || 0) - 1);
    if (count) cacheReferences.set(asset.sha256, count); else { cacheReferences.delete(asset.sha256); await rm(join(root, 'cache', asset.sha256), { force: true }); cached.delete(asset.sha256); }
  }
  function manifest(value) {
    const latest = new Map(value.assets.map((asset) => [asset.relativePath, asset.id]));
    return { format: 'herong-content-package', version: 1, id: value.id, slug: value.slug, exportedAt: now(), notes: value.notes, software: value.software, softwareVersion: value.softwareVersion, selectedVideoId: value.selectedVideoId, restoreRoot: 'materials', files: value.assets.map((asset) => ({ ...asset, packagePath: latest.get(asset.relativePath) === asset.id ? `materials/${asset.relativePath}` : `versions/${asset.groupId}/v${asset.version}/${asset.relativePath}` })) };
  }
  async function handle(request, response, context) {
    const url = context?.url || (context instanceof URL ? context : new URL(request.url, 'http://private.invalid'));
    if (!url.pathname.startsWith('/api/workspaces/')) return false;
    const match = /^\/api\/workspaces\/([a-z0-9]+(?:-[a-z0-9]+)*)(.*)$/.exec(url.pathname);
    if (!match) throw fail(404, '内容工作区接口不存在');
    const [, slug, suffix] = match, method = request.method || 'GET';
    const json = (status, value) => { if (context?.sendJson) context.sendJson(response, status, value); else { response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); response.end(JSON.stringify(value)); } return true; };
    if (!suffix && method === 'GET') return json(200, await locked(async () => present(await content(slug))));
    if (!suffix && method === 'PATCH') {
      const input = await limitedBody(request, 64 * 1024);
      if (!input || typeof input !== 'object' || Array.isArray(input)) throw fail(422, '工作区信息无效');
      return json(200, await locked(async () => {
        const value = await content(slug); if (input.revision !== revision(value)) throw fail(409, '内容工作区已更新，请刷新后重试'); const next = { ...value };
        for (const [name, maximum, label] of [['notes', 20_000, '制作说明'], ['software', 120, '剪辑软件'], ['softwareVersion', 120, '软件版本']]) if (input[name] !== undefined) next[name] = text(input[name], maximum, label);
        if (input.selectedVideoId !== undefined) { if (input.selectedVideoId !== null && !value.assets.some((asset) => asset.id === input.selectedVideoId && asset.category === 'video')) throw fail(422, '请选择此内容的成片版本'); next.selectedVideoId = input.selectedVideoId; }
        next.updatedAt = now(); state.contents[slug] = next; await save(); return present(next);
      }));
    }
    if (suffix === '/uploads' && method === 'POST') { const input = await limitedBody(request, 16 * 1024); return json(201, await locked(() => beginUpload(slug, input))); }
    const uploadMatch = /^\/uploads\/([a-f0-9-]{36})(?:\/(complete|parts\/(\d+)))?$/.exec(suffix);
    if (uploadMatch) {
      const id = uploadMatch[1];
      if (!uploadMatch[2] && method === 'GET') return json(200, await locked(async () => { await content(slug); return publicUpload(getUpload(slug, id)); }));
      if (!uploadMatch[2] && method === 'DELETE') return json(200, await locked(async () => { await content(slug); const value = getUpload(slug, id); if (value.status === 'completed') throw fail(409, '已完成素材不能作为临时上传删除'); await rm(uploadPath(id), { recursive: true, force: true }); delete state.uploads[id]; await save(); return { canceled: true }; }));
      if (uploadMatch[3] && method === 'PUT') return json(200, await locked(() => writePart(slug, id, Number(uploadMatch[3]), request)));
      if (uploadMatch[2] === 'complete' && method === 'POST') return json(201, await locked(() => completeUpload(slug, id)));
    }
    if (suffix === '/assets' && method === 'POST') {
      const filename = filenameOf(decodeHeader(request.headers['x-file-name'])), category = request.headers['x-asset-category'] || 'other', declared = Number(request.headers['content-length']);
      if (!Number.isSafeInteger(declared) || declared < 1) throw fail(411, '请使用分片上传或提供准确文件大小');
      return json(201, await locked(async () => {
        const upload = await beginUpload(slug, { filename, category, relativePath: decodeHeader(request.headers['x-relative-path'], filename), size: declared }), entry = state.uploads[upload.id];
        entry.chunkSize = declared; entry.totalParts = 1; await save(); await writePart(slug, upload.id, 1, request); return completeUpload(slug, upload.id);
      }));
    }
    const assetMatch = /^\/assets\/([a-f0-9-]{36})$/.exec(suffix);
    if (assetMatch && ['GET', 'HEAD'].includes(method)) { const asset = await locked(() => trustedAsset(slug, assetMatch[1])), remote = remoteFor(asset); const path = remote ? null : (await locked(() => resolveAsset(slug, asset.id))).path; await streamFile(request, response, path, asset, url.searchParams.get('download') === '1', remote); return true; }
    if (suffix === '/manifest.json' && method === 'GET') return json(200, await locked(async () => manifest(await content(slug))));
    if (suffix === '/package.zip' && method === 'GET') {
      const entries = await locked(async () => { const value = await content(slug), details = manifest(value); if (details.files.reduce((sum, asset) => sum + asset.size, 0) > 3 * 1024 ** 3) throw fail(413, '素材包超过单次下载限制，请逐个下载原始文件'); const list = [{ name: 'manifest.json', bytes: Buffer.from(JSON.stringify(details, null, 2)) }]; for (const asset of details.files) { const remote = remoteFor(asset); if (remote) { await remote.verify(asset); list.push({ name: asset.packagePath, open: () => remote.openRead(asset) }); } else { const trusted = await resolveAsset(slug, asset.id); list.push({ name: asset.packagePath, path: trusted.path }); } } return list; });
      await zipStream(response, entries, `${slug}-materials.zip`); return true;
    }
    throw fail(404, '内容工作区接口不存在');
  }
  return { handle, read: (slug) => locked(async () => present(await content(slug))), resolveAsset: (slug, id) => locked(() => resolveAsset(slug, id)), releaseAsset: (slug, id) => locked(() => releaseAsset(slug, id)), close: async () => { await work; objectStorage?.close?.(); } };
}
