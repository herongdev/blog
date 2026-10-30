import assert from 'node:assert/strict';
import { request as httpRequest } from 'node:http';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import test from 'node:test';
import { createAuthorServer } from '../server-core.mjs';

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jY3sAAAAASUVORK5CYII=', 'base64');
const TEMPLATE = `---\ntitle: 'TODO：标题'\nsummary: 'TODO：摘要'\ntool: codex\nstatus: draft\nsearchClues: []\n---\n\n## 操作步骤\n\n开始写。\n`;

async function fixture(options = {}) {
  const root = await mkdtemp(join(tmpdir(), 'dev-guides-author-'));
  await mkdir(join(root, 'templates'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'templates/tutorial.md'), TEMPLATE);
  await writeFile(join(root, 'src/content/tutorials/existing.md'), TEMPLATE.replace('TODO：标题', '现有文章').replace('status: draft', 'status: lead'));
  const server = createAuthorServer({ projectRoot: root, ...options });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const session = await (await fetch(`${origin}/api/session`)).json();
  return {
    root, origin, token: session.token, mediaMode: session.mediaMode,
    async close() {
      server.close();
      await once(server, 'close');
      await rm(root, { recursive: true, force: true });
    },
    async api(path, options = {}) {
      const headers = { ...(options.method && options.method !== 'GET' ? { Origin: origin, 'x-author-token': session.token } : {}), ...options.headers };
      const response = await fetch(`${origin}${path}`, { ...options, headers });
      const contentType = response.headers.get('content-type') ?? '';
      return { response, data: contentType.includes('application/json') ? await response.json() : await response.arrayBuffer() };
    },
  };
}

test('create, list and save a draft without losing frontmatter fields; reject stale revisions', async () => {
  const app = await fixture();
  try {
    const created = await app.api('/api/drafts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: 'codex-shortcuts', title: 'Codex 快捷操作' }),
    });
    assert.equal(created.response.status, 201);
    const list = await app.api('/api/articles');
    assert.deepEqual(list.data.items.map((item) => `${item.kind}/${item.slug}`), ['content/existing', 'draft/codex-shortcuts']);

    const loaded = await app.api('/api/articles/draft/codex-shortcuts');
    assert.equal(loaded.data.frontmatter.includes("title: 'Codex 快捷操作'"), true);
    const frontmatter = `${loaded.data.frontmatter}\nvideoUrl: 'https://example.com/watch'`;
    const saved = await app.api('/api/articles/draft/codex-shortcuts', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frontmatter, body: '## 操作步骤\n\n第一步。', revision: loaded.data.revision }),
    });
    assert.equal(saved.response.status, 200);
    const onDisk = await readFile(join(app.root, 'drafts/codex-shortcuts.md'), 'utf8');
    assert.match(onDisk, /videoUrl: 'https:\/\/example.com\/watch'/);
    assert.match(onDisk, /第一步。/);
    const stale = await app.api('/api/articles/draft/codex-shortcuts', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frontmatter, body: '覆盖正文', revision: loaded.data.revision }),
    });
    assert.equal(stale.response.status, 409);
    assert.match(await readFile(join(app.root, 'drafts/codex-shortcuts.md'), 'utf8'), /第一步。/);
  } finally { await app.close(); }
});

test('only same-origin requests with the start-up token may mutate files', async () => {
  const app = await fixture();
  try {
    const payload = JSON.stringify({ slug: 'bad-origin', title: '不能创建' });
    const crossOrigin = await app.api('/api/drafts', { method: 'POST', headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' }, body: payload });
    assert.equal(crossOrigin.response.status, 403);
    const noToken = await app.api('/api/drafts', { method: 'POST', headers: { 'x-author-token': '', 'Content-Type': 'application/json' }, body: payload });
    assert.equal(noToken.response.status, 403);
    const badHostStatus = await new Promise((resolve, reject) => {
      const target = new URL(app.origin);
      const request = httpRequest({ hostname: '127.0.0.1', port: target.port, path: '/api/articles', headers: { Host: 'attacker.example' } }, (response) => {
        response.resume();
        response.on('end', () => resolve(response.statusCode));
      });
      request.on('error', reject);
      request.end();
    });
    assert.equal(badHostStatus, 403);
    const traversal = await app.api('/api/articles/draft/%2e%2e%2fsecret');
    assert.equal(traversal.response.status, 404);
  } finally { await app.close(); }
});

test('local image staging verifies actual PNG bytes and serves only article assets', async () => {
  const app = await fixture();
  try {
    assert.equal(app.mediaMode, 'staging');
    const uploaded = await app.api('/api/articles/content/existing/images', { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: PNG });
    assert.equal(uploaded.response.status, 201);
    assert.equal(uploaded.data.storage, 'staging');
    assert.match(uploaded.data.url, /^\.\/existing\/image-[a-f0-9-]+\.png$/);
    const asset = await app.api(`/api/assets/content/existing/${uploaded.data.filename}`);
    assert.equal(asset.response.status, 200);
    assert.equal(asset.response.headers.get('content-type'), 'image/png');
    assert.equal(Buffer.from(asset.data).subarray(0, 8).equals(PNG.subarray(0, 8)), true);
    const disguised = await app.api('/api/articles/content/existing/images', { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: Buffer.from('<svg onload="alert(1)"></svg>') });
    assert.equal(disguised.response.status, 415);
    const unsupported = await app.api('/api/articles/content/existing/images', { method: 'POST', headers: { 'Content-Type': 'image/gif' }, body: Buffer.from('GIF89a') });
    assert.equal(unsupported.response.status, 415);
    const escaped = await app.api('/api/assets/content/existing/..%2Fsecret.png');
    assert.equal(escaped.response.status, 400);
  } finally { await app.close(); }
});

test('rejects a symlink image directory instead of writing outside the article folder', async () => {
  const app = await fixture();
  try {
    const outside = await mkdtemp(join(tmpdir(), 'dev-guides-escape-'));
    try {
      await symlink(outside, join(app.root, 'src/content/tutorials/existing'));
      const upload = await app.api('/api/articles/content/existing/images', { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: PNG });
      assert.equal(upload.response.status, 400);
    } finally { await rm(outside, { recursive: true, force: true }); }
  } finally { await app.close(); }
});

test('configured media uploads return the owned URL without creating a local image', async () => {
  let called = 0;
  const mediaEnv = Object.fromEntries([
    'MEDIA_PUBLIC_BASE_URL', 'MEDIA_S3_ENDPOINT', 'MEDIA_S3_REGION',
    'MEDIA_S3_BUCKET', 'MEDIA_S3_ACCESS_KEY_ID', 'MEDIA_S3_SECRET_ACCESS_KEY',
  ].map((key) => [key, 'configured']));
  mediaEnv.MEDIA_PUBLIC_BASE_URL = 'https://media.example.com';
  const app = await fixture({
    mediaEnv,
    async publishImageAsset({ asset }) {
      called += 1;
      assert.match(asset.key, /^dev-guides\/tutorials\/existing\/[a-f0-9]{64}\.png$/);
      assert.equal(asset.contentType, 'image/png');
      return 'https://media.example.com/dev-guides/tutorials/existing/abc.png';
    },
  });
  try {
    assert.equal(app.mediaMode, 'direct');
    const result = await app.api('/api/articles/content/existing/images', { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: PNG });
    assert.equal(result.response.status, 201);
    assert.equal(result.data.storage, 'remote');
    assert.equal(result.data.url, 'https://media.example.com/dev-guides/tutorials/existing/abc.png');
    assert.equal(called, 1);
  } finally { await app.close(); }
});

test('partial media configuration fails safely, without local fallback', async () => {
  const app = await fixture({ mediaEnv: { MEDIA_PUBLIC_BASE_URL: 'https://media.example.com' } });
  try {
    assert.equal(app.mediaMode, 'incomplete');
    const result = await app.api('/api/articles/content/existing/images', { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: PNG });
    assert.equal(result.response.status, 503);
  } finally { await app.close(); }
});
