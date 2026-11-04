import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { request as httpRequest } from 'node:http';
import { createAuthorServer } from '../server-core.mjs';
import { createPublishingService } from '../publishing/service.mjs';

async function fixture(online = false) {
  const root = await mkdtemp(join(tmpdir(), 'publishing-host-boundary-'));
  await mkdir(join(root, 'templates'), { recursive: true });
  await mkdir(join(root, 'src/content/tutorials'), { recursive: true });
  await writeFile(join(root, 'templates/tutorial.md'), '---\ntitle: 测试\nstatus: draft\n---\n');
  const publishing = await createPublishingService({ dataRoot: join(root, 'private'), env: {} });
  const server = createAuthorServer({
    projectRoot: root,
    ...(online ? { auth: { origin: 'https://author.example.test', basePath: '/admin/', stateDirectory: join(root, 'auth'), bootstrapTokenFile: join(root, 'bootstrap') } } : {}),
    apiHandler: publishing.handle,
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  return { origin, async close() { await publishing.close(); server.close(); server.closeIdleConnections(); await once(server, 'close'); await rm(root, { recursive: true, force: true }); } };
}

test('publishing APIs, assets, QR and challenges inherit the online author session boundary', async () => {
  const app = await fixture(true);
  const getStatus = (path, options = {}) => new Promise((resolve, reject) => {
    const request = httpRequest(`${app.origin}${path}`, { ...options, headers: { Host: 'author.example.test', ...options.headers } }, response => { response.resume(); response.once('end', () => resolve(response.statusCode)); });
    request.once('error', reject); request.end();
  });
  try {
    for (const path of ['capabilities', 'accounts', 'assets', 'jobs', 'login-sessions/missing/qrcode', 'assets/missing/content']) {
      assert.equal(await getStatus(`/api/publishing/${path}`), 401, path);
    }
    assert.equal(await getStatus('/api/publishing/challenges/missing/respond', { method: 'POST', headers: { Origin: 'https://attacker.example' } }), 403);
  } finally { await app.close(); }
});

test('local publishing refuses missing CSRF and retains private files outside HTTP assets', async () => {
  const app = await fixture();
  try {
    const { token } = await (await fetch(`${app.origin}/api/session`)).json();
    const payload = JSON.stringify({ platform: 'douyin', alias: '边界测试账号' });
    for (const headers of [{ Origin: app.origin }, { Origin: 'https://attacker.example', 'x-author-token': token }]) {
      const response = await fetch(`${app.origin}/api/publishing/accounts`, { method: 'POST', headers, body: payload });
      assert.equal(response.status, 403);
    }
    const created = await fetch(`${app.origin}/api/publishing/accounts`, { method: 'POST', headers: { Origin: app.origin, 'x-author-token': token, 'Content-Type': 'application/json' }, body: payload });
    assert.equal(created.status, 201);
    const accounts = await (await fetch(`${app.origin}/api/publishing/accounts`)).json();
    assert.equal(accounts.accounts.length, 1);
    assert.equal(accounts.accounts[0].platform_uid, null);
    assert.doesNotMatch(JSON.stringify(accounts), /account_file|session_ref|\/private\//);
    for (const path of ['/private/publishing.sqlite', '/.publishing-private/publishing.sqlite', '/api/publishing/assets/..%2Faccounts/content']) {
      const response = await fetch(`${app.origin}${path}`);
      assert.ok([400, 404].includes(response.status), path);
    }
  } finally { await app.close(); }
});
