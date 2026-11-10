import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createHash, randomUUID } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, readFile, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request as httpRequest } from 'node:http';
import { createAuthorServer } from '../server-core.mjs';
import { createArticleRevisions } from '../article-revisions.mjs';
import { createContentWorkspace } from '../content-workspace.mjs';
import { createWorkspaceHandler } from '../workspace-api.mjs';
import { createProductionRuntime } from '../production-runtime.mjs';

const original = '---\ntitle: 隔离验收的真实工作问题\nstatus: draft\n---\n\n待审工作稿。';
const client = { clientId: 'host-integration-client', name: '隔离验收连接', redirectUris: ['https://chatgpt.com/connector_platform_oauth_redirect'] };
async function fixture(t, { online = false, mcp = false, onPreparationCheck } = {}) {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'production-host-')));
  await mkdir(join(root, 'drafts')); await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'drafts/topic.md'), original);
  await writeFile(join(root, 'drafts/other.md'), original.replace('真实工作问题', '另一条内容'));
  const revisions = await createArticleRevisions({ projectRoot: root });
  const workspace = await createContentWorkspace({ projectRoot: root, env: {} });
  let production;
  const server = createAuthorServer({ projectRoot: root, articleRevisions: revisions,
    ...(online ? { auth: { origin: 'https://author.example.test', basePath: '/admin/', stateDirectory: join(root, 'auth'), bootstrapTokenFile: join(root, 'bootstrap') } } : {}),
    productionMcp: {
      handlePublic: (...args) => production?.mcp.handlePublic(...args) ?? false,
      handleAuthorize: (...args) => production?.mcp.handleAuthorize(...args) ?? false,
    },
    hasProductionEpisode: slug => {
      const exists = production?.service.store.list().some(episode => episode.slug === slug) ?? false;
      onPreparationCheck?.({ slug, exists }); return exists;
    },
    apiHandler: (request, response, context) => createWorkspaceHandler({ workspace, revisions, production })(request, response, context),
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = 'http://127.0.0.1:' + server.address().port;
  production = await createProductionRuntime({ projectRoot: root, workspace, revisions, origin, localOnly: true, env: mcp ? { AUTHOR_PRODUCTION_MCP_CLIENTS_JSON: JSON.stringify([client]) } : {} });
  const token = online ? null : (await (await fetch(origin + '/api/session')).json()).token;
  const headers = { Origin: origin, 'Content-Type': 'application/json', 'x-author-token': token };
  const request = async (path, options) => { const response = await fetch(origin + path, options); return { status: response.status, data: await response.json() }; };
  const mutate = (input, slug = 'topic') => request('/api/workspaces/' + slug + '/production/actions', { method: 'POST', headers, body: JSON.stringify({ idempotencyKey: randomUUID(), ...input }) });
  t.after(async () => { server.close(); server.closeIdleConnections(); await once(server, 'close'); production.close(); await workspace.close(); await rm(root, { recursive: true, force: true }); });
  return { root, origin, production, workspace, request, mutate, headers, token };
}

test('production APIs inherit author authentication and local CSRF without exposing private SQLite', async t => {
  const app = await fixture(t);
  const context = await app.request('/api/workspaces/topic/production');
  assert.equal(context.status, 200); assert.equal(context.data.episode, null); assert.equal(context.data.stages.length, 9);
  assert.equal(context.data.content.title, '隔离验收的真实工作问题');
  assert.equal((await fetch(app.origin + '/api/workspaces/topic/production/actions', { method: 'POST', headers: { Origin: app.origin, 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
  assert.equal((await fetch(app.origin + '/.production-workflow/production.sqlite')).status, 404);
  assert.equal((await app.request('/api/production-mcp/status')).data.enabled, false);
  const online = await fixture(t, { online: true });
  for (const path of ['/api/productions', '/api/workspaces/topic/production', '/api/workspaces/topic/production/handoff', '/api/production-mcp/status']) {
    const status = await new Promise((resolve, reject) => { const req = httpRequest(online.origin + path, { headers: { Host: 'author.example.test' } }, res => { res.resume(); res.on('end', () => resolve(res.statusCode)); }); req.on('error', reject); req.end(); });
    assert.equal(status, 401, path);
  }
});

test('legacy filming saves remain compatible until production starts, then reject without changing private preparation or sources', async t => {
  const app = await fixture(t);
  const payload = { source: '隔离研究资料', observation: '未经实测的原始线索' };
  const source = { id: 'isolated-research', kind: 'research', title: '隔离调研来源', body: '保留完整调研内容，不作为已确认稿件。', payload, sha256: createHash('sha256').update(JSON.stringify(payload)).digest('hex'), urls: ['https://example.test/research'] };
  const preparation = { goal: '旧拍摄目标', outline: '旧提纲', checklist: '旧准备清单', notes: '旧补充说明' };
  await writeFile(join(app.root, '.filming.json'), JSON.stringify({ version: 1, cards: { topic: { preparation, sources: [source] } } }), { mode: 0o600 });
  const read = () => app.request('/api/filming/topic');
  const initial = await read();
  assert.equal(initial.status, 200); assert.deepEqual(initial.data.preparation, preparation); assert.deepEqual(initial.data.sources, [source]);
  const legacySave = await app.request('/api/filming/topic', { method: 'PATCH', headers: app.headers, body: JSON.stringify({ revision: initial.data.revision, preparation: { notes: '建档前仍支持原接口的修改' } }) });
  assert.equal(legacySave.status, 200);
  const started = await app.mutate({ operation: 'start', expectedVersion: 0 });
  assert.equal(started.status, 200);
  const before = await readFile(join(app.root, '.filming.json'));
  const staleSave = await app.request('/api/filming/topic', { method: 'PATCH', headers: app.headers, body: JSON.stringify({ revision: legacySave.data.revision, preparation: { goal: '旧浏览器未提交的新输入，必须先复制' } }) });
  assert.equal(staleSave.status, 409);
  assert.equal(staleSave.data.error, '拍摄准备已合并到制作，请刷新后继续；原有输入请先复制保留');
  assert.deepEqual(await readFile(join(app.root, '.filming.json')), before);
  const stillReadable = await read();
  assert.equal(stillReadable.status, 200); assert.deepEqual(stillReadable.data, legacySave.data);
  const production = (await app.request('/api/workspaces/topic/production')).data;
  assert.equal(production.stageRevisions.length, 0); assert.equal(production.checks.length, 0); assert.equal(production.decisions.length, 0);
  assert.deepEqual(await readFile(join(app.root, '.filming.json')), before);
});

test('filming merge conflict never bypasses authentication, Origin or CSRF checks', async t => {
  const app = await fixture(t);
  await app.mutate({ operation: 'start', expectedVersion: 0 });
  for (const headers of [{ ...app.headers, Origin: 'https://wrong.example' }, { ...app.headers, 'x-author-token': '' }]) {
    const rejected = await app.request('/api/filming/topic', { method: 'PATCH', headers, body: JSON.stringify({ revision: 'stale', preparation: { notes: '不应写入' } }) });
    assert.equal(rejected.status, 403);
  }
  await assert.rejects(readFile(join(app.root, '.filming.json')), { code: 'ENOENT' });
  const online = await fixture(t, { online: true });
  await online.production.service.apply('topic', { operation: 'start', expectedVersion: 0, idempotencyKey: randomUUID() }, { id: 'administrator', kind: 'user', source: 'web' });
  const status = (method, extraHeaders = {}) => new Promise((resolve, reject) => {
    const req = httpRequest(online.origin + '/api/filming/topic', { method, headers: { Host: 'author.example.test', ...(method === 'PATCH' ? { Origin: 'https://author.example.test', 'Content-Type': 'application/json' } : {}), ...extraHeaders } }, response => { response.resume(); response.on('end', () => resolve(response.statusCode)); });
    req.on('error', reject); req.end(method === 'PATCH' ? '{}' : undefined);
  });
  assert.equal(await status('GET'), 401); assert.equal(await status('PATCH'), 401);
  assert.equal(await status('PATCH', { Origin: 'https://wrong.example' }), 403);
  await assert.rejects(readFile(join(online.root, '.filming.json')), { code: 'ENOENT' });
});

test('a production started while a legacy PATCH body is arriving prevents the late preparation write', async t => {
  let observeGuard;
  const observed = new Promise(resolve => { observeGuard = resolve; });
  const app = await fixture(t, { onPreparationCheck: result => { if (!result.exists) observeGuard(); } });
  const initial = (await app.request('/api/filming/topic')).data;
  const body = JSON.stringify({ revision: initial.revision, preparation: { notes: '建档前开始发送的旧表单' } });
  let req;
  const pending = new Promise((resolve, reject) => {
    req = httpRequest(app.origin + '/api/filming/topic', { method: 'PATCH', headers: { ...app.headers, 'Content-Length': Buffer.byteLength(body) } }, response => {
      response.resume(); response.on('end', () => resolve(response.statusCode));
    });
    req.on('error', reject); req.flushHeaders();
  });
  try {
    await observed;
    assert.equal((await app.mutate({ operation: 'start', expectedVersion: 0 })).status, 200);
    req.end(body);
    assert.equal(await pending, 409);
    await assert.rejects(readFile(join(app.root, '.filming.json')), { code: 'ENOENT' });
  } finally { req.destroy(); }
});

test('existing identity and working title survive rename, promotion, retries and handoff', async t => {
  const app = await fixture(t);
  const before = (await app.request('/api/workspaces/topic/production')).data;
  const body = { operation: 'start', expectedVersion: 0, idempotencyKey: randomUUID() };
  const started = await app.mutate(body); assert.equal(started.status, 200);
  assert.equal(started.data.episode.contentId, before.content.id);
  await writeFile(join(app.root, 'src/content/tutorials/topic.md'), original.replace('隔离验收的真实工作问题', '已经修改且保持两边同步的标题'));
  await rm(join(app.root, 'drafts/topic.md'));
  const replay = await app.mutate(body); assert.equal(replay.status, 200); assert.equal(replay.data.replayed, true); assert.equal(replay.data.episode.rowVersion, 1);
  assert.equal(replay.data.episode.title, '已经修改且保持两边同步的标题');
  const list = (await app.request('/api/productions')).data.items;
  assert.equal(list.length, 1); assert.equal(list[0].id, before.content.id); assert.equal(list[0].kind, 'content');
  const handoff = (await app.request('/api/workspaces/topic/production/handoff')).data;
  assert.ok(handoff.markdown.startsWith('# 已经修改且保持两边同步的标题'));
  assert.equal(handoff.snapshot.episode.title, list[0].title);
});

test('source metadata cannot be forged and article artifacts refer to exact archived bytes', async t => {
  const app = await fixture(t);
  await app.mutate({ operation: 'start', expectedVersion: 0 });
  const context = (await app.request('/api/workspaces/topic/production')).data;
  const article = context.availableArtifacts.find(item => item.type === 'article_revision');
  const source = { type: article.type, kind: article.kind, revision: article.revision };
  const first = await app.mutate({ operation: 'register_artifact', expectedVersion: 1, source, kind: 'article', variant: '网站', inputRevisionIds: [] });
  assert.equal(first.status, 200, JSON.stringify(first.data));
  assert.equal(first.data.artifacts[0].contentHash, createHash('sha256').update(original).digest('hex'));
  assert.equal(first.data.artifacts[0].sizeBytes, Buffer.byteLength(original));
  for (const input of [
    { operation: 'register_artifact', source: { type: 'url', url: 'https://example.test/video.mp4' }, kind: 'video' },
    { operation: 'register_artifact', source, kind: 'article', contentHash: 'a'.repeat(64) },
    { operation: 'save_stage_revision', stageId: 'S01', content: '草稿', ownerId: 'forged', confirmed: true },
  ]) assert.equal((await app.mutate({ ...input, expectedVersion: 2 })).status, 422);
  const foreign = (await app.request('/api/workspaces/other/production')).data;
  const foreignSource = foreign.availableArtifacts[0];
  assert.equal((await app.mutate({ operation: 'register_artifact', expectedVersion: 2, kind: 'article', source: { type: foreignSource.type, kind: foreignSource.kind, revision: foreignSource.revision } })).status, 404);
});

test('saving a new article title requires review and rebinding without a second content identity', async t => {
  const app = await fixture(t);
  await app.mutate({ operation: 'start', expectedVersion: 0 });
  const saved = await app.mutate({ operation: 'save_stage_revision', expectedVersion: 1, stageId: 'S01', content: '本期标题与封面承诺，保持一个明确的工作收益。' });
  const revisionId = saved.data.stageRevisions[0].id;
  await app.mutate({ operation: 'record_check', expectedVersion: 2, targetRevisionId: revisionId, checkId: 'title_promise', method: 'document_review', result: 'passed' });
  const approved = await app.mutate({ operation: 'record_decision', expectedVersion: 3, targetRevisionId: revisionId, decision: 'approved' });
  assert.equal(approved.data.stages[0].status, 'approved');
  const article = (await app.request('/api/articles/draft/topic')).data;
  const changed = await app.request('/api/articles/draft/topic', { method: 'PUT', headers: app.headers, body: JSON.stringify({ ...article, frontmatter: article.frontmatter.replace('隔离验收的真实工作问题', '已保存的另一项标题承诺') }) });
  assert.equal(changed.status, 200);
  const observed = (await app.request('/api/workspaces/topic/production')).data;
  assert.equal(observed.episode.id, approved.data.episode.id);
  assert.equal(observed.episode.title, '已保存的另一项标题承诺');
  assert.equal(observed.stages[0].status, 'needs_review');
  assert.equal(observed.stageRevisions[0].valid, false);
  assert.equal(observed.checks[0].valid, false);
  assert.equal(observed.episode.rowVersion, 4, 'a read-only observation must not mutate workflow state');
  assert.notEqual((await app.mutate({ operation: 'record_decision', expectedVersion: 4, targetRevisionId: revisionId, decision: 'approved' })).status, 200);
  const rebound = await app.mutate({ operation: 'save_stage_revision', expectedVersion: 4, stageId: 'S01', content: saved.data.stageRevisions[0].content, changeSummary: '核对新的内容标题' });
  assert.equal(rebound.status, 200, JSON.stringify(rebound.data));
  assert.equal(rebound.data.episode.rowVersion, 5);
  assert.equal(rebound.data.stages[0].status, 'in_progress');
  assert.equal(rebound.data.stageRevisions.at(-1).titleSnapshot, '已保存的另一项标题承诺');
});

test('workspace registration verifies bytes, keeps media variants separate and recovers committed retry', async t => {
  const app = await fixture(t);
  await app.mutate({ operation: 'start', expectedVersion: 0 });
  const bytes = Buffer.from('本次真实归档的字幕和制作说明');
  const uploaded = await app.request('/api/workspaces/topic/assets', { method: 'POST', headers: { ...app.headers, 'Content-Type': 'application/octet-stream', 'x-file-name': 'captions.txt', 'x-asset-category': 'subtitle' }, body: bytes });
  assert.equal(uploaded.status, 201, JSON.stringify(uploaded.data));
  const asset = uploaded.data.asset;
  const source = { type: 'workspace_asset', assetId: asset.id };
  const input = { operation: 'register_artifact', expectedVersion: 1, idempotencyKey: randomUUID(), source, kind: 'subtitle', variant: '通用', inputRevisionIds: [] };
  const registered = await app.mutate(input); assert.equal(registered.status, 200);
  const second = await app.mutate({ operation: 'register_artifact', expectedVersion: 2, source, kind: 'subtitle', variant: '平台', inputRevisionIds: [] });
  assert.equal(second.status, 200); assert.notEqual(second.data.artifacts[0].artifactId, second.data.artifacts[1].artifactId);
  const path = join(app.root, '.content-workspace/objects', asset.sha256);
  await writeFile(path, Buffer.from('tampered'));
  const replay = await app.mutate(input); assert.equal(replay.status, 200); assert.equal(replay.data.replayed, true);
  const rejected = await app.mutate({ operation: 'register_artifact', expectedVersion: 3, source, kind: 'subtitle', variant: '再验', inputRevisionIds: [] });
  assert.equal(rejected.status, 422);
  const checked = await app.mutate({ operation: 'record_check', expectedVersion: 3, targetRevisionId: registered.data.artifacts[0].id, checkId: 'subtitle_alignment', method: 'playback', result: 'passed' });
  assert.equal(checked.status, 422, 'cannot attest passed checks about a damaged source');
  assert.equal((await app.mutate({ operation: 'complete', expectedVersion: 3 })).status, 422);
  const current = (await app.request('/api/workspaces/topic/production')).data;
  assert.equal(current.episode.rowVersion, 3); assert.equal(current.artifacts.length, 2);
});

test('committed request remains recoverable when the current working file is unavailable', async t => {
  const app = await fixture(t);
  const body = { operation: 'start', expectedVersion: 0, idempotencyKey: randomUUID() };
  const saved = await app.mutate(body); assert.equal(saved.status, 200);
  await rm(join(app.root, 'drafts/topic.md'));
  const replay = await app.mutate(body); assert.equal(replay.status, 200); assert.equal(replay.data.replayed, true);
  assert.equal(replay.data.episode.id, saved.data.episode.id);
  assert.equal((await app.mutate({ operation: 'save_stage_revision', stageId: 'S01', content: 'fresh', expectedVersion: 1 })).status, 404);
});

test('real author host completes OAuth to MCP draft write while bearer cannot authorize other APIs', async t => {
  const app = await fixture(t, { mcp: true });
  await app.mutate({ operation: 'start', expectedVersion: 0 });
  const issuer = app.origin + '/production-oauth', resource = app.origin + '/api/production-mcp';
  const verifier = 'v'.repeat(64);
  const query = new URLSearchParams({ client_id: client.clientId, redirect_uri: client.redirectUris[0], response_type: 'code', scope: 'production:read production:draft', resource, state: 'actual-host-fixture', code_challenge_method: 'S256', code_challenge: createHash('sha256').update(verifier).digest('base64url') });
  const consent = await fetch(issuer + '/authorize?' + query);
  assert.equal(consent.status, 200);
  const page = await consent.text(); const ticket = /name="consent_id" value="([^"]+)"/.exec(page)[1];
  const accepted = await fetch(issuer + '/authorize', { method: 'POST', redirect: 'manual', headers: { Origin: app.origin, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ consent_id: ticket, csrf_token: app.token, decision: 'allow' }) });
  assert.equal(accepted.status, 303);
  const code = new URL(accepted.headers.get('location')).searchParams.get('code');
  const tokenResponse = await fetch(issuer + '/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'authorization_code', client_id: client.clientId, redirect_uri: client.redirectUris[0], resource, code, code_verifier: verifier }) });
  assert.equal(tokenResponse.status, 200); const { access_token } = await tokenResponse.json();
  const rpc = async (name, args) => (await (await fetch(resource, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', Authorization: 'Bearer ' + access_token }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }) })).json()).result;
  const before = await rpc('get_episode_context', { slug: 'topic' }); assert.equal(before.isError, false);
  const saved = await rpc('save_stage_revision', { slug: 'topic', stageId: 'S06', content: '经过实际讨论的口播工作稿。', expectedVersion: 1, idempotencyKey: randomUUID(), inputRevisionIds: [] });
  assert.equal(saved.isError, false); assert.equal(saved.structuredContent.episode.rowVersion, 2);
  const web = (await app.request('/api/workspaces/topic/production')).data;
  assert.equal(web.stageRevisions[0].content, '经过实际讨论的口播工作稿。'); assert.equal(web.stages.find(item => item.id === 'S06').status, 'in_progress');
  const forged = await rpc('report_decision', { slug: 'topic', targetRevisionId: web.stageRevisions[0].id, decision: 'approved', sourceInstruction: '模型转述的确认', expectedVersion: 2, idempotencyKey: randomUUID() });
  assert.equal(forged.isError, false); assert.equal(forged.structuredContent.decisions[0].decision, 'reported_decision');
  assert.equal((await fetch(app.origin + '/api/workspaces/topic/production/actions', { method: 'POST', headers: { Origin: app.origin, 'Content-Type': 'application/json', Authorization: 'Bearer ' + access_token }, body: JSON.stringify({ operation: 'complete', expectedVersion: 3, idempotencyKey: randomUUID() }) })).status, 403);
  const contents = await readFile(join(app.root, 'drafts/topic.md'), 'utf8'); assert.equal(contents, original);
});
