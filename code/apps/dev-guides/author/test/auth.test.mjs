import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import { request as httpRequest } from 'node:http';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createAuthorServer } from '../server-core.mjs';

const PUBLIC_ORIGIN = 'https://author.example.test';
const BOOTSTRAP = 'test-bootstrap-token-is-at-least-thirty-two-characters';
const PASSWORD = 'test-owner-password-12345';
const TEMPLATE = `---\ntitle: '测试教程的完整标题'\nsummary: '这是一篇用于验证线上写作流程的完整测试摘要内容。'\ntool: codex\nstatus: draft\n---\n\n## 操作步骤\n\n开始写。\n`;
const digest = (value) => createHash('sha256').update(value).digest('hex');

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'dev-guides-online-auth-'));
  const stateDirectory = join(root, 'private-auth');
  const bootstrapTokenFile = join(root, 'bootstrap-token');
  await mkdir(join(root, 'templates'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'templates/tutorial.md'), TEMPLATE);
  await writeFile(join(root, 'src/content/tutorials/existing.md'), TEMPLATE.replace('status: draft', 'status: lead'));
  await writeFile(bootstrapTokenFile, `${BOOTSTRAP}\n`, { mode: 0o600 });
  let server;
  let origin;
  let cookie;
  let csrfToken;
  async function start() {
    server = createAuthorServer({
      projectRoot: root,
      auth: { origin: PUBLIC_ORIGIN, basePath: '/dev-admin/', stateDirectory, bootstrapTokenFile },
      frontend(_request, response) { response.end('login shell'); },
      apiHandler(_request, response, { url, sendJson }) {
        if (url.pathname !== '/api/extension') return false;
        sendJson(response, 200, { private: true });
        return true;
      },
    });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    origin = `http://127.0.0.1:${server.address().port}`;
  }
  async function stop() {
    server.close();
    server.closeIdleConnections();
    await once(server, 'close');
  }
  await start();
  return {
    root, stateDirectory, bootstrapTokenFile,
    get cookie() { return cookie; },
    get csrfToken() { return csrfToken; },
    async restart() { await stop(); await start(); },
    async close() { await stop(); await rm(root, { recursive: true, force: true }); },
    async api(path, { method = 'GET', data, headers = {}, authenticated = true, acceptCookie = true } = {}) {
      const reply = await new Promise((resolve, reject) => {
        const request = httpRequest(`${origin}${path}`, { method, headers: {
          Host: 'author.example.test',
          ...(authenticated && cookie ? { Cookie: cookie } : {}),
          ...(!['GET', 'HEAD'].includes(method) ? { Origin: PUBLIC_ORIGIN, 'x-author-token': csrfToken ?? '' } : {}),
          ...(data !== undefined ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        } }, (response) => {
          const chunks = [];
          response.on('data', (chunk) => chunks.push(chunk));
          response.on('end', () => resolve({
            status: response.statusCode,
            headers: new Headers(Object.fromEntries(Object.entries(response.headers).map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value]))),
            body: Buffer.concat(chunks).toString('utf8'),
          }));
        });
        request.on('error', reject);
        request.end(data === undefined ? undefined : JSON.stringify(data));
      });
      const response = { status: reply.status, headers: reply.headers };
      const setCookie = response.headers.get('set-cookie');
      if (acceptCookie && setCookie) cookie = setCookie.split(';')[0];
      const contentType = response.headers.get('content-type') ?? '';
      const result = contentType.includes('application/json') ? JSON.parse(reply.body) : reply.body;
      if (acceptCookie && result.csrfToken) csrfToken = result.csrfToken;
      return { response, data: result };
    },
    async setup() {
      const result = await this.api('/api/auth/setup', { method: 'POST', data: { token: BOOTSTRAP, password: PASSWORD } });
      assert.equal(result.response.status, 201);
      return result;
    },
  };
}

test('online mode hides article, image, extension and old session APIs before login', async () => {
  const app = await fixture();
  try {
    const session = await app.api('/api/auth/session');
    assert.deepEqual(session.data, { mode: 'online', authenticated: false, setupRequired: true });
    for (const path of ['/api/articles', '/api/session', '/api/extension', '/api/assets/content/existing/image.png']) {
      assert.equal((await app.api(path)).response.status, 401, path);
    }
    assert.equal((await app.api('/')).data, 'login shell');
    const wrongHost = await app.api('/api/auth/session', { headers: { Host: 'attacker.example' } });
    assert.equal(wrongHost.response.status, 403);
    const forgedForwarded = await app.api('/api/auth/session', { headers: { Host: 'attacker.example', 'X-Forwarded-Host': 'author.example.test' } });
    assert.equal(forgedForwarded.response.status, 403);
  } finally { await app.close(); }
});

test('one-time setup enforces bootstrap proof, origin and password policy; writes only hashes and private state', async () => {
  const app = await fixture();
  try {
    assert.equal((await app.api('/api/auth/setup', { method: 'POST', data: { token: 'wrong', password: PASSWORD } })).response.status, 403);
    assert.equal((await app.api('/api/auth/setup', { method: 'POST', headers: { Origin: 'https://attacker.example' }, data: { token: BOOTSTRAP, password: PASSWORD } })).response.status, 403);
    assert.equal((await app.api('/api/auth/setup', { method: 'POST', data: { token: BOOTSTRAP, password: 'short' } })).response.status, 422);
    const result = await app.setup();
    const cookie = result.response.headers.get('set-cookie');
    assert.match(cookie, /^__Secure-herong_author=/);
    assert.match(cookie, /Path=\/dev-admin\//);
    assert.match(cookie, /HttpOnly; Secure; SameSite=Strict/);
    assert.match(cookie, /Max-Age=604800/);
    await assert.rejects(readFile(app.bootstrapTokenFile), { code: 'ENOENT' });
    assert.equal((await stat(app.stateDirectory)).mode & 0o777, 0o700);
    const accountPath = join(app.stateDirectory, 'account.json');
    assert.equal((await stat(accountPath)).mode & 0o777, 0o600);
    const stored = await readFile(accountPath, 'utf8');
    assert.equal(stored.includes(PASSWORD), false);
    assert.equal(stored.includes(BOOTSTRAP), false);
    assert.equal(stored.includes(app.cookie.split('=')[1]), false);
    assert.match(JSON.parse(stored).hash, /^[a-f0-9]{64}$/);
    const session = await app.api('/api/session');
    assert.equal(session.response.status, 200);
    assert.equal(session.data.token, app.csrfToken);
    assert.equal((await app.api('/api/auth/setup', { method: 'POST', data: { token: BOOTSTRAP, password: PASSWORD } })).response.status, 409);
  } finally { await app.close(); }
});

test('authenticated sessions survive process restart, rotate on login and are revoked on logout', async () => {
  const app = await fixture();
  try {
    await app.setup();
    const initialCookie = app.cookie;
    await app.restart();
    assert.equal((await app.api('/api/articles')).response.status, 200);
    const bad = await app.api('/api/auth/login', { method: 'POST', data: { password: 'incorrect password' }, authenticated: false });
    assert.equal(bad.response.status, 401);
    const loggedIn = await app.api('/api/auth/login', { method: 'POST', data: { password: PASSWORD } });
    assert.equal(loggedIn.response.status, 200);
    assert.notEqual(app.cookie, initialCookie);
    const oldSession = await app.api('/api/articles', { headers: { Cookie: initialCookie } });
    assert.equal(oldSession.response.status, 401);
    const currentCookie = app.cookie;
    const logout = await app.api('/api/auth/logout', { method: 'POST' });
    assert.equal(logout.response.status, 200);
    assert.match(logout.response.headers.get('set-cookie'), /Max-Age=0/);
    assert.equal((await app.api('/api/articles', { headers: { Cookie: currentCookie } })).response.status, 401);
  } finally { await app.close(); }
});

test('same-origin and session-specific CSRF proofs are both required for writes and extensions', async () => {
  const app = await fixture();
  try {
    await app.setup();
    const payload = { slug: 'new-draft', title: '新的测试草稿标题' };
    assert.equal((await app.api('/api/drafts', { method: 'POST', headers: { 'x-author-token': '' }, data: payload })).response.status, 403);
    assert.equal((await app.api('/api/drafts', { method: 'POST', headers: { Origin: 'https://attacker.example' }, data: payload })).response.status, 403);
    assert.equal((await app.api('/api/drafts', { method: 'POST', headers: { Origin: '' }, data: payload })).response.status, 403);
    assert.equal((await app.api('/api/extension', { headers: { 'Sec-Fetch-Site': 'cross-site' } })).response.status, 403);
    assert.equal((await app.api('/api/extension')).response.status, 200);
    assert.equal((await app.api('/api/drafts', { method: 'POST', data: payload })).response.status, 201);
  } finally { await app.close(); }
});

test('password attempts are bounded before password hashing and cannot be bypassed by forwarded headers', async () => {
  const app = await fixture();
  try {
    await app.setup();
    for (let i = 0; i < 10; i++) {
      const result = await app.api('/api/auth/login', { method: 'POST', data: { password: 'incorrect password' }, headers: { 'X-Forwarded-For': `192.0.2.${i}` }, authenticated: false });
      assert.equal(result.response.status, 401);
    }
    const blocked = await app.api('/api/auth/login', { method: 'POST', data: { password: PASSWORD }, authenticated: false });
    assert.equal(blocked.response.status, 429);
  } finally { await app.close(); }
});

test('expired session files cannot authorize reads or writes', async () => {
  const app = await fixture();
  try {
    await app.setup();
    const sessionsRoot = join(app.stateDirectory, 'sessions');
    const [file] = await readdir(sessionsRoot);
    const path = join(sessionsRoot, file);
    const session = JSON.parse(await readFile(path, 'utf8'));
    session.expiresAt = Date.now() - 1;
    await writeFile(path, JSON.stringify(session));
    assert.equal((await app.api('/api/articles')).response.status, 401);
    assert.equal((await app.api('/api/drafts', { method: 'POST', data: { slug: 'expired-write', title: '过期会话不能写入' } })).response.status, 401);
    await assert.rejects(readFile(path), { code: 'ENOENT' });
  } finally { await app.close(); }
});

test('save history preserves the previous revision and promote preserves a draft backup without overwriting content', async () => {
  const app = await fixture();
  try {
    await app.setup();
    assert.equal((await app.api('/api/drafts', { method: 'POST', data: { slug: 'to-publish', title: '可以加入网站的测试教程' } })).response.status, 201);
    const initial = (await app.api('/api/articles/draft/to-publish')).data;
    const frontmatter = initial.frontmatter.replace('status: draft', 'status: lead');
    const saved = await app.api('/api/articles/draft/to-publish', { method: 'PUT', data: { ...initial, frontmatter, body: '## 操作步骤\n\n已保存的正文。' } });
    assert.equal(saved.response.status, 200);
    const historyPath = join(app.root, '.history/draft/to-publish', `${initial.revision}.md`);
    const history = await readFile(historyPath, 'utf8');
    assert.equal(digest(history), initial.revision);
    assert.equal((await stat(historyPath)).mode & 0o777, 0o600);
    assert.equal((await stat(join(app.root, '.history/draft/to-publish'))).mode & 0o777, 0o700);
    const stale = await app.api('/api/articles/draft/to-publish/promote', { method: 'POST', data: { revision: initial.revision } });
    assert.equal(stale.response.status, 409);
    const promoted = await app.api('/api/articles/draft/to-publish/promote', { method: 'POST', data: { revision: saved.data.revision } });
    assert.equal(promoted.response.status, 200);
    assert.equal(promoted.data.kind, 'content');
    assert.equal(promoted.data.revision, saved.data.revision);
    assert.equal(promoted.data.frontmatter, frontmatter);
    await assert.rejects(readFile(join(app.root, 'drafts/to-publish.md')), { code: 'ENOENT' });
    assert.equal(digest(await readFile(join(app.root, '.history/draft/to-publish', `${saved.data.revision}.md`), 'utf8')), saved.data.revision);
    assert.equal((await app.api('/api/articles/content/to-publish')).response.status, 200);
    assert.equal((await app.api('/.history/draft/to-publish')).data, 'login shell');
    // Existing content and the draft remain untouched when the destination already exists.
    await mkdir(join(app.root, 'drafts'), { recursive: true });
    const duplicate = TEMPLATE.replace('status: draft', 'status: lead');
    await writeFile(join(app.root, 'drafts/existing.md'), duplicate);
    const refused = await app.api('/api/articles/draft/existing/promote', { method: 'POST', data: { revision: digest(duplicate) } });
    assert.equal(refused.response.status, 409);
    assert.equal(await readFile(join(app.root, 'drafts/existing.md'), 'utf8'), duplicate);
  } finally { await app.close(); }
});

test('promote rejects draft status and malformed or incomplete metadata', async () => {
  const app = await fixture();
  try {
    await app.setup();
    await app.api('/api/drafts', { method: 'POST', data: { slug: 'invalid-metadata', title: '待验证的教程标题文本' } });
    const article = (await app.api('/api/articles/draft/invalid-metadata')).data;
    assert.equal((await app.api('/api/articles/draft/invalid-metadata/promote', { method: 'POST', data: { revision: article.revision } })).response.status, 422);
    for (const frontmatter of ['status: lead\ntitle: [broken', 'status: lead\ntitle: x\nsummary: short']) {
      const current = (await app.api('/api/articles/draft/invalid-metadata')).data;
      const saved = await app.api('/api/articles/draft/invalid-metadata', { method: 'PUT', data: { ...current, frontmatter } });
      assert.equal(saved.response.status, 200);
      assert.equal((await app.api('/api/articles/draft/invalid-metadata/promote', { method: 'POST', data: { revision: saved.data.revision } })).response.status, 422);
    }
  } finally { await app.close(); }
});
