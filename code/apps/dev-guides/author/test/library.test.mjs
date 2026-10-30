import assert from 'node:assert/strict';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createAuthorServer } from '../server-core.mjs';

const TEMPLATE = `---\ntitle: '测试目录中的完整文章标题'\nsummary: '这是目录管理与文章发布验证所使用的完整文章摘要内容。'\ntool: codex\nstatus: lead\n---\n\n## 开始\n\n正文保持原样。\n`;

async function fixture({ online = false } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'dev-guides-library-'));
  await mkdir(join(root, 'templates'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'templates/tutorial.md'), TEMPLATE);
  await writeFile(join(root, 'src/content/tutorials/existing.md'), TEMPLATE);
  let server, endpoint, origin, token;
  async function api(path, { method = 'GET', data, headers = {} } = {}) {
    return new Promise((resolve, reject) => {
      const request = httpRequest(`${endpoint}${path}`, { method, headers: {
        Host: new URL(origin).host,
        ...(!['GET', 'HEAD'].includes(method) ? { Origin: origin, 'x-author-token': token ?? '' } : {}),
        ...(data !== undefined ? { 'Content-Type': 'application/json' } : {}), ...headers,
      } }, (response) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve({ status: response.statusCode, data: JSON.parse(Buffer.concat(chunks).toString('utf8')) }));
      });
      request.on('error', reject);
      request.end(data === undefined ? undefined : JSON.stringify(data));
    });
  }
  async function start() {
    server = createAuthorServer({ projectRoot: root,
      ...(online ? { auth: { provider: 'wechat', origin: 'https://author.example.test', basePath: '/admin/', stateDirectory: join(root, 'auth'), bootstrapTokenFile: join(root, 'bootstrap-token') } } : {}),
    });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    endpoint = `http://127.0.0.1:${server.address().port}`;
    origin = online ? 'https://author.example.test' : endpoint;
    token = (await api('/api/session')).data.token;
  }
  async function stop() { server.close(); server.closeIdleConnections(); await once(server, 'close'); }
  await start();
  return {
    root, api,
    async state() { const result = await api('/api/library'); assert.equal(result.status, 200); return result.data; },
    async action(input) { const state = await this.state(); return api('/api/library/actions', { method: 'POST', data: { revision: state.revision, ...input } }); },
    async restart() { await stop(); await start(); },
    async close() { await stop(); await rm(root, { recursive: true, force: true }); },
  };
}

test('old articles remain unclassified without a migration; directory CRUD persists across restart', async () => {
  const app = await fixture();
  try {
    const articlePath = join(app.root, 'src/content/tutorials/existing.md');
    const original = await readFile(articlePath, 'utf8');
    const initial = await app.state();
    assert.deepEqual(initial.folders, []);
    assert.deepEqual(initial.assignments, {});
    assert.equal((await app.state()).revision, initial.revision);
    await assert.rejects(readFile(join(app.root, '.library.json')), { code: 'ENOENT' });
    const parent = await app.action({ action: 'create', name: 'AI 编程' });
    assert.equal(parent.status, 200);
    const child = await app.action({ action: 'create', name: 'Codex', parentId: parent.data.createdId });
    assert.equal(child.status, 200);
    const folder = child.data.createdId;
    assert.equal((await app.action({ action: 'rename', id: folder, name: 'Codex 实践' })).status, 200);
    assert.equal((await app.action({ action: 'assign', articleKey: 'content/existing', folderId: folder })).status, 200);
    assert.equal((await app.action({ action: 'move', id: folder, parentId: null })).status, 200);
    assert.equal((await app.action({ action: 'delete', id: parent.data.createdId })).status, 200);
    const before = await app.state();
    await app.restart();
    assert.deepEqual(await app.state(), before);
    assert.deepEqual(before.folders, [{ id: folder, name: 'Codex 实践', parentId: null }]);
    assert.equal(before.assignments['content/existing'], folder);
    assert.equal((await stat(join(app.root, '.library.json'))).mode & 0o777, 0o600);
    assert.equal(await readFile(articlePath, 'utf8'), original);
    assert.equal((await app.action({ action: 'assign', articleKey: 'content/existing', folderId: null })).status, 200);
    assert.equal((await app.action({ action: 'delete', id: folder })).status, 200);
    assert.deepEqual((await app.state()).folders, []);
    assert.deepEqual(await readdir(join(app.root, 'src/content/tutorials')), ['existing.md']);
  } finally { await app.close(); }
});

test('nonempty folders cannot be deleted, and failed operations preserve the tree', async () => {
  const app = await fixture();
  try {
    const parent = (await app.action({ action: 'create', name: '开发工具' })).data.createdId;
    const child = (await app.action({ action: 'create', name: '实战', parentId: parent })).data.createdId;
    const before = await app.state();
    const blocked = await app.action({ action: 'delete', id: parent });
    assert.equal(blocked.status, 409);
    assert.deepEqual(await app.state(), before);
    await app.action({ action: 'assign', articleKey: 'content/existing', folderId: child });
    assert.equal((await app.action({ action: 'delete', id: child })).status, 409);
    assert.equal((await app.api('/api/articles/content/existing')).status, 200);
  } finally { await app.close(); }
});

test('tree validation rejects cycles, duplicate siblings, traversal and excessive depth', async () => {
  const app = await fixture();
  try {
    const root = (await app.action({ action: 'create', name: '根目录' })).data.createdId;
    let parent = root;
    for (let depth = 2; depth <= 6; depth++) parent = (await app.action({ action: 'create', name: `第 ${depth} 层`, parentId: parent })).data.createdId;
    const before = await app.state();
    for (const action of [
      { action: 'create', name: '第七层', parentId: parent },
      { action: 'move', id: root, parentId: parent },
      { action: 'move', id: root, parentId: root },
      { action: 'rename', id: root, name: '../escape' },
      { action: 'create', name: '' },
      { action: 'create', name: '字'.repeat(61) },
      { action: 'create', name: 'no\nnewline' },
      { action: 'create', name: '不存在的父级', parentId: '../missing' },
    ]) assert.equal((await app.action(action)).status, 400, JSON.stringify(action));
    assert.equal((await app.action({ action: 'create', name: '根目录' })).status, 409);
    assert.equal((await app.action({ action: 'assign', articleKey: 'content/missing', folderId: root })).status, 404);
    assert.equal((await app.action({ action: 'assign', articleKey: 'content/../existing', folderId: root })).status, 400);
    assert.deepEqual(await app.state(), before);
    const second = (await app.action({ action: 'create', name: '另一个目录' })).data.createdId;
    assert.equal((await app.action({ action: 'create', name: '根目录', parentId: second })).status, 200, 'same name allowed in a different parent');
  } finally { await app.close(); }
});

test('concurrent updates reject stale revisions instead of losing another device changes', async () => {
  const app = await fixture();
  try {
    const { revision } = await app.state();
    const results = await Promise.all(['第一个', '第二个'].map((name) => app.api('/api/library/actions', { method: 'POST', data: { revision, action: 'create', name } })));
    assert.deepEqual(results.map((result) => result.status).sort(), [200, 409]);
    assert.equal((await app.state()).folders.length, 1);
    assert.equal((await app.api('/api/library/actions', { method: 'POST', data: { revision, action: 'create', name: '旧窗口' } })).status, 409);
  } finally { await app.close(); }
});

test('promotion retains folder ownership without rewriting metadata or changing article URLs', async () => {
  const app = await fixture();
  try {
    assert.equal((await app.api('/api/drafts', { method: 'POST', data: { slug: 'new-tutorial', title: '一个新教程的完整标题' } })).status, 201);
    const id = (await app.action({ action: 'create', name: '教程合集' })).data.createdId;
    await app.action({ action: 'assign', articleKey: 'draft/new-tutorial', folderId: id });
    const before = await app.state();
    const metadataBefore = await readFile(join(app.root, '.library.json'), 'utf8');
    const article = (await app.api('/api/articles/draft/new-tutorial')).data;
    const promotion = await app.api('/api/articles/draft/new-tutorial/promote', { method: 'POST', data: { revision: article.revision } });
    assert.equal(promotion.status, 200);
    assert.equal(promotion.data.slug, 'new-tutorial');
    const after = await app.state();
    assert.equal(after.assignments['content/new-tutorial'], id);
    assert.equal(after.assignments['draft/new-tutorial'], undefined);
    assert.notEqual(after.revision, before.revision);
    assert.equal(await readFile(join(app.root, '.library.json'), 'utf8'), metadataBefore);
    assert.equal((await app.api('/api/articles/content/new-tutorial')).data.body, article.body);
    assert.equal((await app.api('/api/articles/draft/new-tutorial')).status, 404);
    await app.restart();
    assert.deepEqual(await app.state(), after);
    assert.equal((await app.action({ action: 'assign', articleKey: 'draft/new-tutorial', folderId: null })).status, 404);
  } finally { await app.close(); }
});

test('failed promotion leaves article and folder assignment intact', async () => {
  const app = await fixture();
  try {
    await app.api('/api/drafts', { method: 'POST', data: { slug: 'unfinished', title: '一个尚未完成的教程标题' } });
    const id = (await app.action({ action: 'create', name: '进行中' })).data.createdId;
    await app.action({ action: 'assign', articleKey: 'draft/unfinished', folderId: id });
    const before = await app.state();
    assert.equal((await app.api('/api/articles/draft/unfinished/promote', { method: 'POST', data: { revision: 'stale' } })).status, 409);
    assert.deepEqual(await app.state(), before);
    assert.equal((await app.api('/api/articles/draft/unfinished')).status, 200);
    assert.equal((await app.api('/api/articles/content/unfinished')).status, 404);
  } finally { await app.close(); }
});

test('library cannot follow symlink metadata or classify symlink articles', async () => {
  const app = await fixture();
  const outside = await mkdtemp(join(tmpdir(), 'dev-guides-library-outside-'));
  try {
    const folder = (await app.action({ action: 'create', name: '文章' })).data.createdId;
    await writeFile(join(outside, 'foreign.md'), TEMPLATE);
    await symlink(join(outside, 'foreign.md'), join(app.root, 'src/content/tutorials/foreign.md'));
    assert.equal((await app.action({ action: 'assign', articleKey: 'content/foreign', folderId: folder })).status, 404);
    const data = await readFile(join(app.root, '.library.json'), 'utf8');
    await writeFile(join(outside, 'foreign.json'), data);
    await rm(join(app.root, '.library.json'));
    await symlink(join(outside, 'foreign.json'), join(app.root, '.library.json'));
    assert.equal((await app.api('/api/library')).status, 400);
    assert.equal((await app.api('/api/library/actions', { method: 'POST', data: { revision: 'ignored', action: 'create', name: '不能写入' } })).status, 400);
    assert.equal(await readFile(join(outside, 'foreign.json'), 'utf8'), data);
  } finally { await app.close(); await rm(outside, { recursive: true, force: true }); }
});

test('library APIs require login online and enforce Host, Origin and mutation token locally', async () => {
  const online = await fixture({ online: true });
  try {
    assert.equal((await online.api('/api/library')).status, 401);
    assert.equal((await online.api('/api/library/actions', { method: 'POST', data: { action: 'create', name: '不能创建' } })).status, 401);
    assert.equal((await online.api('/api/library', { headers: { Host: 'attacker.example' } })).status, 403);
    await assert.rejects(readFile(join(online.root, '.library.json')), { code: 'ENOENT' });
  } finally { await online.close(); }
  const app = await fixture();
  try {
    const { revision } = await app.state();
    const data = { revision, action: 'create', name: '不能创建' };
    for (const headers of [{ Origin: 'https://attacker.example' }, { 'x-author-token': '' }, { Host: 'attacker.example' }]) {
      assert.equal((await app.api('/api/library/actions', { method: 'POST', data, headers })).status, 403);
    }
    assert.equal((await app.api('/.library.json')).status, 404);
    assert.deepEqual((await app.state()).folders, []);
  } finally { await app.close(); }
});
