import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import {
  checkMedia,
  findMarkdownImages,
  isOwnedMediaUrl,
  prepareImageAsset,
  publishMedia,
  rewriteMarkdownImages,
  verifyPublicAsset,
} from './media-core.mjs';

const BASE_URL = 'https://media.example.test';

async function png() {
  return sharp({ create: { width: 12, height: 8, channels: 4, background: '#1177cc' } }).png().toBuffer();
}

async function fixture(markdown, imageName = 'step-01.png', imageBytes) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'dev-guides-media-'));
  const slug = 'codex-worktrees';
  const article = path.join(directory, `${slug}.md`);
  const imageDirectory = path.join(directory, slug);
  await mkdir(imageDirectory);
  await writeFile(article, markdown);
  await writeFile(path.join(imageDirectory, imageName), imageBytes ?? await png());
  return { directory, article, imageDirectory, async cleanup() { await rm(directory, { recursive: true, force: true }); } };
}

function fakeStorage({ failUpload = false } = {}) {
  const objects = new Map();
  return {
    objects,
    async headObject(key) {
      const bytes = objects.get(key);
      return bytes ? { contentLength: bytes.length } : null;
    },
    async putObject(key, bytes) {
      if (failUpload) throw new Error('存储不可用');
      objects.set(key, bytes);
    },
  };
}

test('only actual Markdown images are found, and replacement preserves surrounding source', () => {
  const source = '---\ntitle: 测试\n---\n\n`![示例](./codex-worktrees/ignored.png)`\n\n![点击按钮](./codex-worktrees/step-01.png "说明")\n';
  const images = findMarkdownImages(source);
  assert.equal(images.length, 1);
  const result = rewriteMarkdownImages(source, [{ ...images[0].destination, url: `${BASE_URL}/image.png` }]);
  assert.match(result, /`!\[示例\]\(\.\/codex-worktrees\/ignored\.png\)`/);
  assert.match(result, /!\[点击按钮\]\(https:\/\/media\.example\.test\/image\.png "说明"\)/);
  assert.match(result, /^---\ntitle: 测试\n---/);
});

test('publishes hashed image once and rewrites article only after public verification', async () => {
  const original = '---\ntitle: 测试\n---\n\n![按钮](./codex-worktrees/step-01.png)\n![再看](./codex-worktrees/step-01.png)\n';
  const site = await fixture(original);
  try {
    const storage = fakeStorage();
    const verified = [];
    assert.equal((await checkMedia({ directory: site.directory, baseUrl: BASE_URL })).length, 2);
    const result = await publishMedia({
      directory: site.directory,
      baseUrl: BASE_URL,
      storage,
      verifyPublic: async (asset) => verified.push(asset.url),
    });
    assert.deepEqual({ assets: result.assets, uploaded: result.uploaded, articles: result.articles }, { assets: 1, uploaded: 1, articles: 1 });
    assert.equal(storage.objects.size, 1);
    assert.equal(verified.length, 1);
    assert.match([...storage.objects.keys()][0], /^dev-guides\/tutorials\/codex-worktrees\/[a-f0-9]{64}\.png$/);
    const published = await readFile(site.article, 'utf8');
    assert.equal(published.match(/https:\/\/media\.example\.test\/dev-guides\/tutorials\//g)?.length, 2);
    assert.deepEqual(await checkMedia({ directory: site.directory, baseUrl: BASE_URL }), []);
    assert.equal((await readFile(path.join(site.imageDirectory, 'step-01.png'))).length > 0, true);
  } finally {
    await site.cleanup();
  }
});

test('dry run does not upload or rewrite', async () => {
  const original = '![按钮](./codex-worktrees/step-01.png)\n';
  const site = await fixture(original);
  try {
    const result = await publishMedia({ directory: site.directory, baseUrl: BASE_URL, dryRun: true });
    assert.equal(result.assets, 1);
    assert.equal(await readFile(site.article, 'utf8'), original);
  } finally {
    await site.cleanup();
  }
});

test('failed upload never rewrites Markdown', async () => {
  const original = '![按钮](./codex-worktrees/step-01.png)\n';
  const site = await fixture(original);
  try {
    await assert.rejects(
      publishMedia({ directory: site.directory, baseUrl: BASE_URL, storage: fakeStorage({ failUpload: true }), verifyPublic: async () => {} }),
      /存储不可用/,
    );
    assert.equal(await readFile(site.article, 'utf8'), original);
  } finally {
    await site.cleanup();
  }
});

test('an absent key can be uploaded when restricted HEAD returns 403 without ListBucket', async () => {
  const site = await fixture('![按钮](./codex-worktrees/step-01.png)\n');
  try {
    const objects = new Map();
    const storage = {
      async headObject() { throw { $metadata: { httpStatusCode: 403 } }; },
      async putObject(key, bytes) { objects.set(key, bytes); },
    };
    const result = await publishMedia({
      directory: site.directory,
      baseUrl: BASE_URL,
      storage,
      verifyPublic: async () => {},
    });
    assert.equal(result.uploaded, 1);
    assert.equal(objects.size, 1);
    assert.match(await readFile(site.article, 'utf8'), /https:\/\/media\.example\.test\/dev-guides\/tutorials\//);
  } finally {
    await site.cleanup();
  }
});

test('an upload failure in a later article leaves every article unchanged', async () => {
  const first = '![按钮](./codex-worktrees/step-01.png)\n';
  const site = await fixture(first);
  const second = '![菜单](./cursor-panel/menu.png)\n';
  const secondArticle = path.join(site.directory, 'cursor-panel.md');
  try {
    await mkdir(path.join(site.directory, 'cursor-panel'));
    await writeFile(secondArticle, second);
    await writeFile(path.join(site.directory, 'cursor-panel/menu.png'), await png());
    let puts = 0;
    const storage = {
      async headObject() { return null; },
      async putObject() {
        puts += 1;
        if (puts === 2) throw new Error('第二张上传失败');
      },
    };
    await assert.rejects(
      publishMedia({ directory: site.directory, baseUrl: BASE_URL, storage, verifyPublic: async () => {} }),
      /第二张上传失败/,
    );
    assert.equal(await readFile(site.article, 'utf8'), first);
    assert.equal(await readFile(secondArticle, 'utf8'), second);
  } finally {
    await site.cleanup();
  }
});

test('inaccessible public URL never rewrites Markdown', async () => {
  const original = '![按钮](./codex-worktrees/step-01.png)\n';
  const site = await fixture(original);
  try {
    await assert.rejects(
      publishMedia({ directory: site.directory, baseUrl: BASE_URL, storage: fakeStorage(), verifyPublic: async () => { throw new Error('404'); } }),
      /404/,
    );
    assert.equal(await readFile(site.article, 'utf8'), original);
  } finally {
    await site.cleanup();
  }
});

test('path traversal and mismatched article folder are rejected before upload', async () => {
  for (const url of ['./codex-worktrees/%2e%2e%2fsecret.png', './other-topic/step-01.png', '/private/step-01.png']) {
    const site = await fixture(`![按钮](${url})\n`);
    try {
      await assert.rejects(
        publishMedia({ directory: site.directory, baseUrl: BASE_URL, storage: fakeStorage(), verifyPublic: async () => {} }),
        /图片必须位于文章同名目录|图片文件名不安全|不安全的图片地址/,
      );
    } finally {
      await site.cleanup();
    }
  }
});

test('reference images and outside image hosts fail the build gate', async () => {
  const article = '![操作截图][step]\n\n[step]: ./codex-worktrees/step-01.png\n';
  const site = await fixture(article);
  try {
    assert.match((await checkMedia({ directory: site.directory, baseUrl: BASE_URL }))[0], /引用式图片/);
    await writeFile(site.article, '![外站](https://other.example/image.png)\n');
    assert.match((await checkMedia({ directory: site.directory, baseUrl: BASE_URL }))[0], /不是本站媒体地址/);
    assert.match((await checkMedia({ directory: site.directory }))[0], /缺少 MEDIA_PUBLIC_BASE_URL/);
  } finally {
    await site.cleanup();
  }
});

test('empty alt text blocks both publishing and building', async () => {
  const site = await fixture('![](./codex-worktrees/step-01.png)\n');
  try {
    assert.match((await checkMedia({ directory: site.directory, baseUrl: BASE_URL }))[0], /缺少替代文字 alt/);
    await assert.rejects(
      publishMedia({ directory: site.directory, baseUrl: BASE_URL, storage: fakeStorage(), verifyPublic: async () => {} }),
      /缺少替代文字 alt/,
    );
  } finally {
    await site.cleanup();
  }
});

test('only immutable URLs under the owned media namespace pass', () => {
  const hash = 'a'.repeat(64);
  assert.equal(isOwnedMediaUrl(`${BASE_URL}/dev-guides/tutorials/codex-worktrees/${hash}.png`, BASE_URL), true);
  assert.equal(isOwnedMediaUrl(`https://media.example.test.evil/dev-guides/tutorials/codex-worktrees/${hash}.png`, BASE_URL), false);
  assert.equal(isOwnedMediaUrl(`${BASE_URL}/dev-guides/tutorials/codex-worktrees/photo.png`, BASE_URL), false);
});

test('symlinked input images are rejected', async () => {
  const source = '![按钮](./codex-worktrees/linked.png)\n';
  const site = await fixture(source);
  try {
    await symlink(path.join(site.imageDirectory, 'step-01.png'), path.join(site.imageDirectory, 'linked.png'));
    await assert.rejects(
      publishMedia({ directory: site.directory, baseUrl: BASE_URL, storage: fakeStorage(), verifyPublic: async () => {} }),
      /不能使用软链接/,
    );
    assert.equal(await readFile(site.article, 'utf8'), source);
  } finally {
    await site.cleanup();
  }
});

test('format spoofing fails, while PNG optimization retains lossless format', async () => {
  const jpeg = await sharp({ create: { width: 12, height: 8, channels: 3, background: '#1177cc' } }).jpeg().toBuffer();
  await assert.rejects(
    prepareImageAsset({ bytes: jpeg, filename: 'step-01.png', slug: 'codex-worktrees', baseUrl: BASE_URL }),
    /实际格式/,
  );
  const asset = await prepareImageAsset({ bytes: await png(), filename: 'step-01.png', slug: 'codex-worktrees', baseUrl: BASE_URL });
  assert.equal(asset.contentType, 'image/png');
  assert.equal((await sharp(asset.bytes).metadata()).format, 'png');
});

test('public verification retries then accepts correct image content type', async () => {
  let calls = 0;
  await verifyPublicAsset(
    { url: `${BASE_URL}/image.png`, contentType: 'image/png' },
    {
      delayMs: 0,
      fetchImpl: async () => {
        calls += 1;
        if (calls === 1) return { ok: false, status: 404, headers: new Headers() };
        return { ok: true, status: 200, headers: new Headers({ 'content-type': 'image/png' }) };
      },
    },
  );
  assert.equal(calls, 2);
});

test('public verification rejects a wrong-sized or redirected object', async () => {
  const asset = { url: `${BASE_URL}/image.png`, contentType: 'image/png', bytes: Buffer.alloc(4) };
  await assert.rejects(
    verifyPublicAsset(asset, {
      attempts: 1,
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        url: asset.url,
        headers: new Headers({ 'content-type': 'image/png', 'content-length': '5' }),
      }),
    }),
    /Content-Length: 5/,
  );
  await assert.rejects(
    verifyPublicAsset(asset, {
      attempts: 1,
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        url: 'https://outside.example/image.png',
        headers: new Headers({ 'content-type': 'image/png', 'content-length': '4' }),
      }),
    }),
    /outside\.example/,
  );
});
