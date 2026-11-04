import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { createArticleRevisions } from '../article-revisions.mjs';
import { fingerprintPublishSource } from '../publish-manager.mjs';
import { verifyLegacyArticleBaseline } from '../legacy-article-baseline.mjs';

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const article = (title, body, flags = '') => `---\ntitle: '${title}'\nstatus: lead\n${flags}---\n\n${body}\n`;
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'legacy-baseline-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const sourceProjectRoot = join(root, 'historical'), contentRoot = join(sourceProjectRoot, 'src/content/tutorials');
  const projectRoot = join(root, 'live'), liveContent = join(projectRoot, 'src/content/tutorials');
  const releasePath = join(root, 'releases/20261103T165200Z-10631a44');
  for (const path of [contentRoot, join(contentRoot, 'first'), liveContent, join(sourceProjectRoot, 'scripts'), join(sourceProjectRoot, 'templates'), join(releasePath, 'web/topics/first'), join(releasePath, 'web/topics/second')]) await mkdir(path, { recursive: true });
  for (const name of ['package.json', 'astro.config.mjs', 'tsconfig.json']) await writeFile(join(sourceProjectRoot, name), '{}');
  const first = article('Historical first', '![original](./first/image.png)'), second = article('Historical second', 'Historical body');
  const changed = article('Private changed draft', 'UNPUBLISHED_CHANGE');
  await writeFile(join(contentRoot, 'first.md'), first);
  await writeFile(join(contentRoot, 'first/image.png'), 'ORIGINAL_IMAGE');
  await writeFile(join(contentRoot, 'second.md'), second);
  await writeFile(join(contentRoot, 'private.md'), article('Private article', 'PRIVATE', 'private: true\n'));
  await writeFile(join(liveContent, 'first.md'), changed);
  await writeFile(join(liveContent, 'second.md'), changed);
  const files = [];
  for (const [path, bytes] of [['index.html', 'home'], ['search-index.json', '[]'], ['topics/first/index.html', 'Historical first'], ['topics/second/index.html', 'Historical second']]) {
    await writeFile(join(releasePath, 'web', path), bytes); files.push({ path, sha256: hash(bytes), size: Buffer.byteLength(bytes) });
  }
  const metadata = { release: '20261103T165200Z-10631a44', environment: 'production', site: 'https://dev.herong.info', base_path: '/', source_fingerprint: await fingerprintPublishSource({ projectRoot: sourceProjectRoot, contentRoot }) };
  const saveManifest = async (items = files) => {
    const bytes = JSON.stringify({ version: 1, files: items });
    await writeFile(join(releasePath, 'manifest.json'), bytes);
    await writeFile(join(releasePath, 'release.json'), JSON.stringify({ ...metadata, manifest_sha256: hash(bytes) }));
  };
  await saveManifest();
  const revisions = await createArticleRevisions({ projectRoot });
  return { root, sourceProjectRoot, contentRoot, releasePath, projectRoot, liveContent, first, second, changed, files, saveManifest, revisions, options: { sourceProjectRoot, contentRoot, releasePath } };
}

test('verified legacy import retains exact old articles and images without changing working files', async (t) => {
  const f = await fixture(t);
  const verified = await verifyLegacyArticleBaseline(f.options);
  assert.deepEqual(verified.evidence.slugs, ['first', 'second']);
  assert.equal(await f.revisions.baselineReady(), false, 'read-only verification does not import');
  const result = await f.revisions.importPublishedBaseline(f.options);
  assert.equal(result.imported, true);
  assert.equal(await f.revisions.baselineReady(), true);
  assert.equal((await f.revisions.published({ kind: 'content', slug: 'first' })).revision, hash(f.first));
  assert.equal((await f.revisions.published({ kind: 'content', slug: 'second' })).revision, hash(f.second));
  assert.equal(await readFile(join(f.liveContent, 'first.md'), 'utf8'), f.changed);
  const projection = await f.revisions.prepareSelection();
  assert.equal(await readFile(join(projection.contentRoot, 'first/image.png'), 'utf8'), 'ORIGINAL_IMAGE');
  assert.equal(await readFile(join(projection.contentRoot, 'second.md'), 'utf8'), f.second);
  await assert.rejects(readFile(join(projection.contentRoot, 'private.md')), { code: 'ENOENT' });
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'first' })).status, 'modified');
  assert.equal((await f.revisions.importPublishedBaseline(f.options)).imported, false, 'retry is idempotent');
  await f.revisions.commit(projection);
  await assert.rejects(f.revisions.importPublishedBaseline(f.options), /不能用旧版本覆盖/);
});

test('changed historical source, contents, or images cannot be labelled as published', async (t) => {
  for (const target of ['source', 'article', 'image']) await t.test(target, async (t) => {
    const f = await fixture(t);
    const path = target === 'source' ? join(f.sourceProjectRoot, 'package.json') : target === 'article' ? join(f.contentRoot, 'second.md') : join(f.contentRoot, 'first/image.png');
    await writeFile(path, target === 'source' ? '{"changed":true}' : 'changed');
    await assert.rejects(f.revisions.importPublishedBaseline(f.options), /不匹配正式发布指纹/);
    assert.equal(await f.revisions.baselineReady(), false);
    assert.equal(await readFile(join(f.liveContent, 'first.md'), 'utf8'), f.changed);
  });
});

test('missing public pages and altered release artifacts fail before baseline activation', async (t) => {
  const f = await fixture(t);
  await f.saveManifest(f.files.filter((item) => item.path !== 'topics/second/index.html'));
  await assert.rejects(f.revisions.importPublishedBaseline(f.options), /页面集合不一致/);
  assert.equal(await f.revisions.baselineReady(), false);
  await f.saveManifest();
  await writeFile(join(f.releasePath, 'web/topics/second/index.html'), 'altered');
  await assert.rejects(f.revisions.importPublishedBaseline(f.options), /文件与已发布清单不一致/);
  assert.equal(await f.revisions.baselineReady(), false);
});
