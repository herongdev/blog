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
