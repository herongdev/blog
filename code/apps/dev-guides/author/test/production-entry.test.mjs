import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { request } from 'node:http';
import { createServer } from 'node:net';
import { mkdtemp, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProductionMcpAuth } from '../production-mcp-auth.mjs';

const origin = 'https://author.example.test';
const resource = origin + '/admin/api/production-mcp';
const issuer = origin + '/admin/production-oauth';
const client = { clientId: 'isolated-entry-smoke', name: '隔离入口测试', redirectUris: ['https://chatgpt.com/connector_platform_oauth_redirect'] };

async function freePort() {
  const listener = createServer();
  await new Promise((resolve, reject) => { listener.once('error', reject); listener.listen(0, '127.0.0.1', resolve); });
  const port = listener.address().port;
  await new Promise((resolve, reject) => listener.close(error => error ? reject(error) : resolve()));
  assert.ok(port > 1024); return port;
}
function call(port, path, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path, method, agent: false, headers: { Host: 'author.example.test', Connection: 'close', ...headers } }, response => {
      let content = '';
      response.setEncoding('utf8'); response.on('data', chunk => { content += chunk; });
      response.once('end', () => {
        try { resolve({ status: response.statusCode, headers: response.headers, value: JSON.parse(content) }); }
        catch (error) { reject(new Error(`Unexpected response at ${path}: ${content.slice(0, 500)}`, { cause: error })); }
      });
      response.once('error', reject);
    });
    req.setTimeout(5000, () => req.destroy(new Error('Isolated author request timed out')));
    req.once('error', reject); req.end(body);
  });
}

test('real production entry exposes canonical MCP discovery without weakening author API authentication', { timeout: 40_000 }, async t => {
  const root = await mkdtemp(join(await realpath(tmpdir()), 'author-production-entry-'));
  const project = join(root, 'project'), draft = join(project, 'drafts/topic.md');
  await mkdir(join(project, 'drafts'), { recursive: true });
  await mkdir(join(project, 'src/content/tutorials'), { recursive: true });
  const source = "---\ntitle: '隔离入口测试：合成稿件，不是实际课程'\nstatus: draft\n---\n\n仅用于验证生产入口鉴权，不会发布。\n";
  await writeFile(draft, source, { mode: 0o600 });
  const port = await freePort();
  const env = {};
  // Do not inherit real media credentials, executor configuration or deployment paths.
  for (const key of ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL']) if (process.env[key]) env[key] = process.env[key];
  Object.assign(env, {
    AUTHOR_DATA_ROOT: root, AUTHOR_PUBLIC_ORIGIN: origin, AUTHOR_BASE_PATH: '/admin/',
    AUTHOR_PUBLISH_TARGET: 'domains', AUTHOR_AUTH_PROVIDER: 'password', AUTHOR_PORT: String(port),
    PUBLISHER_DATA_DIR: join(root, 'private-publishing'), AUTHOR_PRODUCTION_MCP_CLIENTS_JSON: JSON.stringify([client]),
  });
  // Startup only reads the public release pointers; every writable state path is inside root.
  // This test never calls publish/start, builds a site, or creates a website release.
  const child = spawn(process.execPath, [fileURLToPath(new URL('../server-production.mjs', import.meta.url))], { env, stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '', ready = false;
  child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8');
  child.stdout.on('data', chunk => { output = (output + chunk).slice(-16_000); });
  child.stderr.on('data', chunk => { output = (output + chunk).slice(-16_000); });
  t.after(async () => {
    try {
      if (child.exitCode === null && child.signalCode === null) {
        const exited = new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('Isolated author did not stop after SIGTERM')), 28_000);
          child.once('exit', (code, signal) => { clearTimeout(timer); resolve({ code, signal }); });
        });
        child.kill('SIGTERM');
        const result = await exited;
        if (ready) { assert.equal(result.signal, null); assert.equal(result.code, 0, output); }
      }
    } finally { await rm(root, { recursive: true, force: true }); }
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => finish(new Error('Isolated production entry did not start: ' + output)), 10_000);
    const finish = error => { clearTimeout(timer); child.stdout.off('data', onData); child.off('exit', onExit); child.off('error', onError); if (error) reject(error); else { ready = true; resolve(); } };
    const onData = () => { if (output.includes('Online tutorial author service ready')) finish(); };
    const onExit = (code, signal) => finish(new Error(`Isolated production entry exited (${code}, ${signal}): ${output}`));
    const onError = error => finish(error);
    child.stdout.on('data', onData); child.once('exit', onExit); child.once('error', onError);
  });

  // This assertion fails if productionMcp is accidentally passed only to the publish manager.
  const metadata = await call(port, '/.well-known/oauth-protected-resource/admin/api/production-mcp');
  assert.equal(metadata.status, 200); assert.equal(metadata.value.resource, resource);
  assert.deepEqual(metadata.value.authorization_servers, [issuer]);
  const authorization = await call(port, '/.well-known/oauth-authorization-server/admin/production-oauth');
  assert.equal(authorization.status, 200); assert.equal(authorization.value.issuer, issuer);
  assert.equal(authorization.value.authorization_endpoint, issuer + '/authorize');

  const anonymous = await call(port, '/api/workspaces/topic/production');
  assert.equal(anonymous.status, 401);
  // Mint a genuine isolated grant through the same on-disk OAuth service, rather than
  // accepting a meaningless fake bearer as proof that ordinary API auth is preserved.
  const auth = createProductionMcpAuth({ path: join(project, '.production-workflow/oauth.sqlite'), issuer, resource, clients: [client] });
  let token;
  try {
    const verifier = 'v'.repeat(64), csrf = 'c'.repeat(43);
    const consent = auth.beginConsent({ client_id: client.clientId, redirect_uri: client.redirectUris[0], response_type: 'code', resource, scope: 'production:read production:draft', code_challenge_method: 'S256', code_challenge: createHash('sha256').update(verifier).digest('base64url'), state: 'isolated-state' }, csrf);
    const code = new URL(auth.finishConsent(consent.id, csrf, true)).searchParams.get('code');
    token = auth.exchange({ grant_type: 'authorization_code', client_id: client.clientId, redirect_uri: client.redirectUris[0], resource, code_verifier: verifier, code }).access_token;
  } finally { auth.close(); }
  const bearer = { Authorization: 'Bearer ' + token };
  const tools = await call(port, '/api/production-mcp', { method: 'POST', headers: { ...bearer, 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) });
  assert.equal(tools.status, 200); assert.ok(tools.value.result.tools.some(tool => tool.name === 'get_episode_context'));
  assert.equal((await call(port, '/api/articles', { headers: bearer })).status, 401);
  assert.equal((await call(port, '/api/workspaces/topic/production', { headers: bearer })).status, 401);
  const forgedWebWrite = await call(port, '/api/workspaces/topic/production/actions', { method: 'POST', headers: { ...bearer, Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ operation: 'start', expectedVersion: 0, idempotencyKey: 'isolated-web-attempt' }) });
  assert.equal(forgedWebWrite.status, 401);
  assert.equal(await readFile(draft, 'utf8'), source);
});
