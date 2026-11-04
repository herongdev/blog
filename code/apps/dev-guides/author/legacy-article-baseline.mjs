import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, readdir } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { parseDocument } from 'yaml';
import { fingerprintPublishSource } from './publish-manager.mjs';
import { isPublicTutorial } from '../src/lib/published-search.mjs';

const HASH = /^[a-f0-9]{64}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const fail = (message) => { throw Object.assign(new Error(message), { status: 409 }); };

async function read(root, name, limit = 32 * 1024 ** 2) {
  if (typeof name !== 'string' || name.split('/').some((part) => !part || part === '.' || part === '..' || part.includes('\\'))) fail('迁移来源路径无效');
  if (!(await lstat(root)).isDirectory()) fail('迁移来源目录不安全');
  let current = root;
  for (const part of name.split('/').slice(0, -1)) {
    current = join(current, part);
    if (!(await lstat(current)).isDirectory()) fail('迁移来源目录不安全');
  }
  const path = join(root, name), info = await lstat(path);
  if (!info.isFile() || info.nlink !== 1 || info.size > limit) fail('迁移来源文件不安全或过大');
  const file = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const info = await file.stat();
    if (!info.isFile() || info.nlink !== 1 || info.size > limit) fail('迁移来源文件不安全或过大');
    return await file.readFile();
  } finally { await file.close(); }
}

/** No writes. Use the exact historical source tree and an archived content copy.
 * The returned bytes are private and must never be logged or exposed over HTTP. */
export async function verifyLegacyArticleBaseline({ sourceProjectRoot, contentRoot, releasePath }) {
  if (![sourceProjectRoot, contentRoot, releasePath].every((value) => typeof value === 'string' && value)) fail('请指定历史源码、内容副本和正式版本目录');
  sourceProjectRoot = resolve(sourceProjectRoot); contentRoot = resolve(contentRoot); releasePath = resolve(releasePath);
  for (const path of [sourceProjectRoot, contentRoot, releasePath]) if (!(await lstat(path)).isDirectory()) fail('请使用实际目录，不要使用 current 软链接');
  const releaseBytes = await read(releasePath, 'release.json');
  const release = JSON.parse(releaseBytes);
  if (release.environment !== 'production' || release.site !== 'https://dev.herong.info' || release.base_path !== '/' || release.articleRevisionPlan || release.release !== basename(releasePath) || !HASH.test(release.source_fingerprint) || !HASH.test(release.manifest_sha256)) fail('正式版本信息不符合旧版基线迁移要求');
  const manifestBytes = await read(releasePath, 'manifest.json');
  if (hash(manifestBytes) !== release.manifest_sha256) fail('正式版本清单摘要不一致');
  const manifest = JSON.parse(manifestBytes);
  if (manifest.version !== 1 || !Array.isArray(manifest.files) || manifest.files.length > 10000) fail('正式版本清单格式无效');
  const publicSlugs = [], seen = new Set();
  for (const item of manifest.files) {
    if (seen.has(item.path) || !HASH.test(item.sha256) || !Number.isSafeInteger(item.size) || item.size < 0) fail('正式版本文件清单无效');
    seen.add(item.path);
    const bytes = await read(join(releasePath, 'web'), item.path, 512 * 1024 ** 2);
    if (bytes.length !== item.size || hash(bytes) !== item.sha256) fail('正式版本文件与已发布清单不一致');
    const topic = /^topics\/([a-z0-9]+(?:-[a-z0-9]+)*)\/index\.html$/.exec(item.path);
    if (topic) publicSlugs.push(topic[1]);
    else if (item.path.startsWith('topics/') && item.path.endsWith('.html')) fail('旧版文章地址结构无法安全迁移');
  }
  if (!seen.has('index.html') || !seen.has('search-index.json')) fail('正式版本缺少必要静态信息');
  const fingerprint = () => fingerprintPublishSource({ projectRoot: sourceProjectRoot, contentRoot });
  if (await fingerprint() !== release.source_fingerprint) fail('历史源码与内容副本不匹配正式发布指纹，不能推断线上正文');
  const articles = [];
  for (const name of (await readdir(contentRoot)).sort()) {
    if (!name.endsWith('.md') || !SLUG.test(name.slice(0, -3))) continue;
    const slug = name.slice(0, -3), bytes = await read(contentRoot, name, 2 * 1024 ** 2);
    const text = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text);
    if (!match) fail('历史文章缺少发布信息');
    const document = parseDocument(match[1], { uniqueKeys: true });
    if (document.errors.length) fail('历史文章发布信息无效');
    const data = document.toJS({ maxAliasCount: 100 });
    if (!isPublicTutorial({ data })) continue;
    const paths = new Set();
    for (const match of text.matchAll(/(?:!\[[^\]]*\]\(\s*|\bsrc=["'])([^\s)"'<>]+)/g)) {
      const path = match[1].replace(/^\.\//, '');
      if (/^(?:[a-z]+:|\/|#)/i.test(path)) continue;
      if (!path.startsWith(`${slug}/`) || !/^[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(path) || path.split('/').some((part) => !part || part === '.' || part === '..')) fail('历史文章本地图片路径无效');
      paths.add(path);
    }
    const assets = [];
    for (const path of [...paths].sort()) { const bytes = await read(contentRoot, path); assets.push({ path, revision: hash(bytes), bytes }); }
    articles.push({ slug, revision: hash(bytes), bytes, assets });
  }
  if (JSON.stringify(articles.map(({ slug }) => slug).sort()) !== JSON.stringify(publicSlugs.sort())) fail('历史内容与正式文章页面集合不一致，不能省略或补入文章');
  if (await fingerprint() !== release.source_fingerprint || hash(await read(releasePath, 'release.json')) !== hash(releaseBytes)) fail('迁移核对期间来源发生变化，请停写后重试');
  return {
    evidence: { version: 1, release: release.release, releaseMetadataSha256: hash(releaseBytes), manifestSha256: release.manifest_sha256, sourceFingerprint: release.source_fingerprint, slugs: publicSlugs },
    articles,
  };
}
