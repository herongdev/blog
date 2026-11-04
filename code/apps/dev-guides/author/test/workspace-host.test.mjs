import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request as httpRequest } from 'node:http';
import { createAuthorServer } from '../server-core.mjs';
import { createArticleRevisions } from '../article-revisions.mjs';
import { createContentWorkspace } from '../content-workspace.mjs';
import { createPublishingService } from '../publishing/service.mjs';
import { createWorkspaceHandler } from '../workspace-api.mjs';

async function fixture(t, online = false) {
  const root = await mkdtemp(join(tmpdir(), 'workspace-host-'));
  await mkdir(join(root, 'drafts'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'drafts/topic.md'), '---\ntitle: 一条实际工作稿\nstatus: draft\n---\n\n第一版正文');
  const revisions = await createArticleRevisions({ projectRoot: root });
  const workspace = await createContentWorkspace({ projectRoot: root, env: {} });
  const publishing = await createPublishingService({ dataRoot: join(root, 'private'), env: {} });
  const server = createAuthorServer({ projectRoot: root, articleRevisions: revisions,
    ...(online ? { auth: { origin: 'https://author.example.test', basePath: '/admin/', stateDirectory: join(root, 'auth'), bootstrapTokenFile: join(root, 'bootstrap') } } : {}),
    apiHandler: createWorkspaceHandler({ workspace, revisions, publishing }) });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(async () => { await publishing.close(); await workspace.close(); server.close(); server.closeIdleConnections(); await once(server, 'close'); await rm(root, { recursive: true, force: true }); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  return { origin, server, publishing, workspace };
}

test('workspace originals, packages, manifests and revision data inherit online authentication', async t => {
  const app = await fixture(t, true);
  for (const path of ['/api/workspaces/topic', '/api/workspaces/topic/package.zip', '/api/workspaces/topic/manifest.json', '/api/article-revisions/draft/topic/history']) {
    const status = await new Promise((resolve, reject) => { const request = httpRequest(`${app.origin}${path}`, { headers: { Host: 'author.example.test' } }, response => { response.resume(); response.once('end', () => resolve(response.statusCode)); }); request.once('error', reject); request.end(); });
    assert.equal(status, 401, path);
  }
});

test('workspace mutations require CSRF; article history restore shares host save boundary', async t => {
  const app = await fixture(t);
  const { token } = await (await fetch(`${app.origin}/api/session`)).json();
  const state = await (await fetch(`${app.origin}/api/workspaces/topic`)).json();
  assert.equal((await fetch(`${app.origin}/api/workspaces/topic`, { method: 'PATCH', headers: { Origin: app.origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ revision: state.revision, notes: '拒绝无凭证写入' }) })).status, 403);
  const headers = { Origin: app.origin, 'x-author-token': token, 'Content-Type': 'application/json' };
  const article = await (await fetch(`${app.origin}/api/articles/draft/topic`)).json();
  const saved = await fetch(`${app.origin}/api/articles/draft/topic`, { method: 'PUT', headers, body: JSON.stringify({ ...article, body: '第二版正文' }) });
  assert.equal(saved.status, 200);
  const next = await saved.json();
  const history = await (await fetch(`${app.origin}/api/article-revisions/draft/topic/history`)).json();
  assert.ok(history.items.some(item => item.revision === article.revision));
  assert.equal((await fetch(`${app.origin}/api/article-revisions/draft/topic/restore`, { method: 'POST', headers, body: JSON.stringify({ revision: article.revision, targetRevision: next.revision }) })).status, 200);
  const current = await (await fetch(`${app.origin}/api/articles/draft/topic`)).json();
  assert.equal(current.body, article.body);
  for (const path of ['/.content-workspace/state.json', '/.article-revisions/state.json']) assert.equal((await fetch(`${app.origin}${path}`)).status, 404);
});

test('video publishing drafts persist validated content identity and reject forged association', async t => {
  const app = await fixture(t);
  const content = await app.workspace.read('topic');
  const account = app.publishing.store.createAccount({ platform: 'douyin', alias: '隔离测试账号' });
  app.publishing.store.addAsset({ id: 'video-fixture', type: 'video', filename: 'fixture.mp4', sha256: 'a'.repeat(64), size: 1, mime: 'video/mp4', extension: '.mp4' });
  const { token } = await (await fetch(`${app.origin}/api/session`)).json();
  const headers = { Origin: app.origin, 'x-author-token': token, 'Content-Type': 'application/json' };
  const payload = { content_ref: { id: content.id, slug: 'topic' }, video_asset_id: 'video-fixture', defaults: { title: '隔离测试', description: '', tags: [] }, targets: [{ account_id: account.id, overrides: {}, platform_options: { content_origin: 'unspecified' } }] };
  const created = await fetch(`${app.origin}/api/publishing/jobs`, { method: 'POST', headers, body: JSON.stringify(payload) });
  assert.equal(created.status, 201);
  const { job } = await created.json();
  assert.deepEqual(job.content_ref, payload.content_ref);
  assert.equal(job.status, 'draft');
  assert.equal((await fetch(`${app.origin}/api/publishing/jobs`, { method: 'POST', headers, body: JSON.stringify({ ...payload, content_ref: { id: 'forged-id', slug: 'topic' } }) })).status, 422);
});

test('legacy MKV finish is rejected by the publishing bridge before any cloud download or import', async () => {
  let resolved = false, imported = false;
  const asset = { id: 'ac3a5d0c-bc9c-4dfd-9a0e-592b61bc0a30', filename: 'legacy.mkv', category: 'video', storage: 's3' };
  const handler = createWorkspaceHandler({
    revisions: { async handle() { return false; } },
    workspace: {
      async read() { return { id: 'content-id', assets: [asset] }; },
      async resolveAsset() { resolved = true; throw new Error('Cloud bytes should not be requested'); },
    },
    publishing: { async importWorkspaceVideo() { imported = true; } },
  });
  const context = {
    url: new URL('http://local.test/api/workspaces/topic/publishing-video'),
    async readJson() { return { assetId: asset.id }; },
    httpError(status, message) { return Object.assign(new Error(message), { status }); },
  };
  await assert.rejects(() => handler({ method: 'POST' }, {}, context), (error) => error.status === 422 && /MKV.*原始录屏/.test(error.message));
  assert.equal(resolved, false);
  assert.equal(imported, false);
});

test('publishable M4V finish passes the bridge with the original content identity and releases its cache', async () => {
  const asset = { id: '4bda0891-1266-4ad7-bf3a-31c5057a46c7', filename: 'finished.M4V', category: 'video', storage: 's3' };
  let released = false, result;
  const handler = createWorkspaceHandler({
    revisions: { async handle() { return false; } },
    workspace: {
      async read() { return { id: 'content-id', assets: [asset] }; },
      async resolveAsset(slug, assetId) { assert.equal(slug, 'topic'); assert.equal(assetId, asset.id); return { path: '/private/cache', asset }; },
      async releaseAsset(slug, assetId) { assert.equal(slug, 'topic'); assert.equal(assetId, asset.id); released = true; },
    },
    publishing: { async importWorkspaceVideo(value) { assert.deepEqual(value, { path: '/private/cache', filename: asset.filename }); return { id: 'publishing-video' }; } },
  });
  const context = {
    url: new URL('http://local.test/api/workspaces/topic/publishing-video'),
    async readJson() { return { assetId: asset.id }; },
    sendJson(_response, status, body) { result = { status, body }; },
  };
  assert.equal(await handler({ method: 'POST' }, {}, context), true);
  assert.equal(released, true);
  assert.deepEqual(result, { status: 201, body: { video_asset_id: 'publishing-video', content_id: 'content-id' } });
});
