import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createHash, randomUUID } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { createPublishingService } from '../publishing/service.mjs';

const exec = promisify(execFile);
const pause = (ms) => new Promise((done) => setTimeout(done, ms));
const fake = `import json, sys, time, os
request=json.loads(sys.stdin.readline())
if request['operation']=='health':
 print(json.dumps(dict(type='result',seq=1,status='ready',protocol_version=1,platforms=['douyin','xiaohongshu','tencent','bilibili'])),flush=True)
 sys.exit(0)
seq=0
def event(event_type, **values):
 global seq
 seq += 1
 print(json.dumps(dict(type=event_type,seq=seq,at='2026-11-02T00:00:00Z',**values)),flush=True)
if request['operation'] in ['login','check']:
 event('result',auth_status='valid',status='completed')
 sys.exit(0)
title=request.get('title','')
if title == '提交前失败':
 event('result',status='failed')
 sys.exit(1)
if title == '等待验证码':
 event('challenge',challenge_id='test_challenge',kind='sms')
 reply=json.loads(sys.stdin.readline())
 if reply.get('value')!='123456': sys.exit(2)
if title == '等待超时':
 time.sleep(60)
 sys.exit(0)
event('before_submit',request_id='intent_1')
reply=json.loads(sys.stdin.readline())
if not reply.get('authorized'): sys.exit(3)
if title == '提交后失联': sys.exit(1)
event('result',status='submitted',evidence=dict(kind='platform_acceptance',summary='可控适配器返回受理证据'),post_url='https://www.xiaohongshu.com/explore/fixture')
`;

async function waitFor(check) {
  for (let i = 0; i < 150; i++) { const value = check(); if (value) return value; await pause(30); }
  throw new Error('Timed out waiting for test operation');
}

async function fixture(options = {}) {
  const root = await mkdtemp(join(tmpdir(), 'publishing-service-'));
  const sauRoot = join(root, 'sau'); await mkdir(join(sauRoot, 'uploader'), { recursive: true });
  const runnerPath = join(root, 'fake.py'); await writeFile(runnerPath, options.runnerSource || fake);
  const service = await createPublishingService({ dataRoot: join(root, 'data'), runnerPath, env: { ...process.env, PUBLISHER_PYTHON: '/usr/bin/python3', PUBLISHER_SAU_ROOT: sauRoot, ...options.env }, startWorker: false });
  const server = createServer(async (request, response) => {
    const context = {
      url: new URL(request.url, 'http://localhost'),
      sendJson: (res, code, data) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); },
      readJson: async (req) => { const chunks = []; for await (const chunk of req) chunks.push(chunk); return JSON.parse(Buffer.concat(chunks)); },
    };
    try { if (!await service.handle(request, response, context)) { response.writeHead(404); response.end(); } }
    catch (error) { context.sendJson(response, error.status || 500, { error: error.message }); }
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const api = async (path, body, method = body === undefined ? 'GET' : 'POST') => {
    const response = await fetch(`${origin}/api/publishing${path}`, { method, headers: body === undefined ? {} : { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
    return { status: response.status, data: await response.json() };
  };
  const account = service.store.createAccount({ platform: 'xiaohongshu', alias: '测试账号' });
  service.store.put('accounts', { ...account, auth_status: 'valid' });
  const video = { id: randomUUID(), type: 'video', filename: 'private.mp4', extension: '.mp4', mime: 'video/mp4', size: 5, sha256: createHash('sha256').update('video').digest('hex') };
  await writeFile(join(root, 'data/assets', `${video.id}.mp4`), 'video'); service.store.addAsset(video);
  const job = (title) => service.store.createJob({ video_asset_id: video.id, defaults: { title }, targets: [{ account_id: account.id, platform_options: { content_origin: 'original' } }] });
  return { service, origin, api, root, account, job, async close() { await service.close(); server.close(); await once(server, 'close'); await rm(root, { recursive: true, force: true }); } };
}

test('real login observation is private, strictly filtered and cannot declare authentication', async () => {
  const observation = { checkerResult: false, pageCount: 1, pages: [{ route: 'creator_root', hasSessionCookie: true, any_visible_login_marker: false, scan_confirmation_visible: true, visible_code_input: false, captcha_visible: false, creator_publish_control: false }], observationUnavailable: false };
  const source = fake.replace(" event('result',auth_status='valid',status='completed')", ` event('auth_observation',observation=json.loads(${JSON.stringify(JSON.stringify(observation))}))\n event('auth_observation',observation=dict(url='PRIVATE_URL',cookie='PRIVATE_COOKIE'))\n event('result',auth_status='unknown',status='failed',error_code='LOGIN_TIMEOUT')`);
  const f = await fixture({ runnerSource: source });
  try {
    const account = f.service.store.createAccount({ platform: 'douyin', alias: '观测账号' });
    const session = f.service.store.newSession(account.id, 'login');
    await f.service.tick();
    const stored = f.service.store.get('sessions', session.id);
    assert.deepEqual(stored.auth_observation, observation);
    assert.equal(stored.auth_status, 'unknown');
    assert.equal(stored.status, 'failed');
    assert.equal(JSON.stringify(stored).includes('PRIVATE_'), false);
    const response = await f.api(`/login-sessions/${session.id}`);
    assert.equal(response.status, 200);
    assert.equal('auth_observation' in response.data.session, false);
  } finally { await f.close(); }
});

test('real subprocess protocol distinguishes before-submit failure, acceptance, and lost result', async () => {
  const f = await fixture();
  try {
    for (const [title, expected] of [['提交前失败', 'failed'], ['明确受理', 'submitted'], ['提交后失联', 'submission_unknown']]) {
      const value = f.job(title); f.service.store.submit(value.id, title); await f.service.tick();
      const target = f.service.store.job(value.id).targets[0];
      assert.equal(target.status, expected); assert.equal(target.attempts[0].process_stopped, true);
      const result = await f.api(`/jobs/${value.id}`);
      assert.equal(result.status, 200); assert.equal(JSON.stringify(result.data).includes(f.root), false);
      assert.equal('pid' in result.data.job.targets[0].attempts[0], false);
    }
  } finally { await f.close(); }
});

test('challenge control bypasses execution slot; invalid/expired response rejected without storing code', async () => {
  const f = await fixture();
  try {
    const value = f.job('等待验证码'); f.service.store.submit(value.id, 'challenge');
    const running = f.service.tick();
    await waitFor(() => f.service.store.target(value.targets[0].id).challenge);
    assert.equal((await f.api('/challenges/unknown/respond', { value: '123456' })).status, 410);
    const reply = await f.api('/challenges/test_challenge/respond', { value: '123456' }); assert.equal(reply.status, 200);
    assert.equal((await f.api('/challenges/test_challenge/respond', { value: '123456' })).status, 410);
    await running;
    assert.equal(f.service.store.target(value.targets[0].id).status, 'submitted');
    assert.equal(JSON.stringify(f.service.store.job(value.id)).includes('123456'), false);
  } finally { await f.close(); }
});

test('timeout and cancel stop subprocess before allowing safe retry', async () => {
  const f = await fixture({ env: { PUBLISHER_TASK_TIMEOUT_MS: '200' } });
  try {
    const value = f.job('等待超时'); f.service.store.submit(value.id, 'timeout'); await f.service.tick();
    const stopped = f.service.store.target(value.targets[0].id);
    assert.equal(stopped.status, 'failed');
    assert.equal(f.service.store.get('attempts', stopped.current_attempt_id).process_stopped, true);
    assert.equal(f.service.store.retry(stopped.id).status, 'queued');
    const running = f.service.tick();
    await waitFor(() => f.service.store.target(stopped.id).status === 'running');
    assert.equal((await f.api(`/targets/${stopped.id}/cancel`, {})).status, 200);
    await running;
    assert.equal(f.service.store.target(stopped.id).status, 'canceled');
  } finally { await f.close(); }
});

test('unconfigured execution keeps drafts available and cannot submit', async () => {
  const f = await fixture({ env: { PUBLISHER_PYTHON: '' } });
  try {
    const value = f.job('本地草稿');
    assert.equal((await f.api('/capabilities')).data.executor_ready, false);
    assert.equal((await f.api(`/jobs/${value.id}/submit`, { idempotency_key: 'must-not-run' })).status, 422);
    assert.equal(f.service.store.job(value.id).status, 'draft');
  } finally { await f.close(); }
});

test('raw video upload validates actual media and authenticated preview implements Range', async () => {
  const f = await fixture();
  try {
    const videoPath = join(f.root, 'real.mp4');
    await exec('ffmpeg', ['-loglevel', 'error', '-f', 'lavfi', '-i', 'color=c=black:s=64x64:d=0.1', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', videoPath], { timeout: 20_000 });
    const bytes = await readFile(videoPath);
    const uploaded = await fetch(`${f.origin}/api/publishing/assets?type=video&filename=test.mp4`, { method: 'POST', body: bytes });
    assert.equal(uploaded.status, 201);
    const { asset } = await uploaded.json(); assert.ok(asset.duration > 0); assert.equal(asset.width, 64);
    const replay = await fetch(`${f.origin}/api/publishing/assets?type=video&filename=retry.mp4`, { method: 'POST', body: bytes });
    assert.equal(replay.status, 201); assert.equal((await replay.json()).asset.id, asset.id);
    assert.equal(f.service.store.all('assets').filter((value) => value.sha256 === asset.sha256).length, 1);
    const range = await fetch(`${f.origin}${asset.content_url}`, { headers: { Range: 'bytes=0-15' } });
    assert.equal(range.status, 206); assert.deepEqual(Buffer.from(await range.arrayBuffer()), bytes.subarray(0, 16));
    const bad = await fetch(`${f.origin}/api/publishing/assets?type=video&filename=bad.mp4`, { method: 'POST', body: Buffer.from('not a video') });
    assert.equal(bad.status, 422);
    const badCover = await fetch(`${f.origin}/api/publishing/assets?type=cover&filename=bad.png`, { method: 'POST', body: Buffer.from('not an image') });
    assert.equal(badCover.status, 422);
  } finally { await f.close(); }
});

test('restart recovery kills the recorded orphan process group before classifying the target', async () => {
  const f = await fixture(); let child;
  try {
    const value = f.job('重启前任务'); f.service.store.submit(value.id, 'restart');
    const operation = f.service.store.claim('dead-worker');
    f.service.store.beforeSubmit(operation.value.id, operation.attempt.id, 'dead-worker');
    child = spawn('/usr/bin/python3', ['-c', 'import time; time.sleep(60)'], { detached: true, stdio: 'ignore' });
    await once(child, 'spawn');
    const signature = (await exec('ps', ['-p', String(child.pid), '-o', 'lstart='])).stdout.trim();
    f.service.store.put('attempts', { ...f.service.store.get('attempts', operation.attempt.id), pid: child.pid, process_start: signature });
    f.service.store.db.prepare('UPDATE executor SET expires=0').run();
    await f.service.tick();
    assert.equal(f.service.store.target(operation.value.id).status, 'submission_unknown');
    assert.equal(f.service.store.get('attempts', operation.attempt.id).process_stopped, true);
    assert.throws(() => process.kill(child.pid, 0));
    assert.equal(f.service.store.resolveTarget(operation.value.id, { outcome: 'not_published', basis: '已在平台确认没有发布，恢复流程已停止原进程' }).status, 'failed');
  } finally { if (child) { try { process.kill(-child.pid, 'SIGKILL'); } catch {} } await f.close(); }
});

test('QR versions and per-code expiry are enforced, session API never exposes filesystem paths', async () => {
  const f = await fixture();
  try {
    const session = f.service.store.newSession(f.account.id, 'login');
    const operation = f.service.store.claim('qr-worker');
    const runtime = join(f.root, 'data/runtime', session.id); await mkdir(runtime, { recursive: true });
    const qr = join(runtime, 'qr.png');
    await writeFile(qr, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jY3sAAAAASUVORK5CYII=', 'base64'));
    f.service.store.updateOperation(operation, { status: 'waiting_user', qr_path: qr, qr_version: 2, qr_expires_at: new Date(Date.now() + 60_000).toISOString() }, 'qr-worker');
    const current = await f.api(`/login-sessions/${session.id}`);
    assert.equal(JSON.stringify(current.data).includes(f.root), false);
    assert.equal(current.data.session.qrcode_url, `/api/publishing/login-sessions/${session.id}/qrcode?v=2`);
    assert.equal((await fetch(`${f.origin}/api/publishing/login-sessions/${session.id}/qrcode?v=1`)).status, 410);
    const image = await fetch(`${f.origin}/api/publishing/login-sessions/${session.id}/qrcode?v=2`);
    assert.equal(image.status, 200); assert.equal(image.headers.get('cache-control'), 'no-store');
    f.service.store.updateOperation(operation, { qr_expires_at: new Date(Date.now() - 1).toISOString() }, 'qr-worker');
    assert.equal((await f.api(`/login-sessions/${session.id}`)).data.session.qrcode_url, null);
    assert.equal((await fetch(`${f.origin}/api/publishing/login-sessions/${session.id}/qrcode?v=2`)).status, 410);
    f.service.store.finish(operation, { auth_status: 'valid' }, 'qr-worker');
    assert.equal((await f.api(`/login-sessions/${session.id}`)).data.session.qrcode_url, null);
  } finally { await f.close(); }
});

test('Douyin QR events use the bounded refresh budget instead of an unverified platform expiry', async () => {
  const source = fake.replace("event('result',auth_status='valid',status='completed')", `qr=os.path.join(request['data_dir'],'qr.png')
 open(qr,'wb').write(b'private qr fixture')
 event('qrcode',image_path=qr,refresh_after_seconds=5,expires_at='2099-01-01T00:00:00Z')
 time.sleep(0.5)
 event('result',auth_status='valid',status='completed')`);
  const f = await fixture({ runnerSource: source });
  try {
    const account = f.service.store.createAccount({ platform: 'douyin', alias: '抖音测试' });
    const created = await f.api(`/accounts/${account.id}/login-sessions`, {});
    const running = f.service.tick();
    await waitFor(() => f.service.store.get('sessions', created.data.session.id)?.qr_version === 1);
    const current = (await f.api(`/login-sessions/${created.data.session.id}`)).data.session;
    const remaining = Date.parse(current.qr_expires_at) - Date.now();
    assert.ok(remaining > 0 && remaining <= 5_000);
    assert.equal(current.qrcode_url, `/api/publishing/login-sessions/${current.id}/qrcode?v=1`);
    await running;
  } finally { await f.close(); }
});

test('login/check routes preserve login stage and safe codes across both error and result events', async () => {
  const source = fake.replace("event('result',auth_status='valid',status='completed')", `event('stage',stage='logging_in' if request['operation']=='login' else 'checking')
 time.sleep(0.25)
 event('error' if request['operation']=='login' else 'result',status='failed',auth_status='invalid',error_code='LOGIN_PAGE_UNAVAILABLE' if request['operation']=='login' else 'AUTH_CHECK_FAILED',message='Cookie=do-not-persist https://private.invalid/account /private/account.json')`);
  const f = await fixture({ runnerSource: source });
  try {
    for (const [route, operation, stage, code, message] of [
      ['login-sessions', 'login', 'logging_in', 'LOGIN_PAGE_UNAVAILABLE', '抖音登录页暂时无法打开，请稍后重试'],
      ['check', 'check', 'checking', 'AUTH_CHECK_FAILED', '暂时无法检查账号会话，请稍后重试'],
    ]) {
      const created = await f.api(`/accounts/${f.account.id}/${route}`, {});
      assert.equal(created.status, 202); assert.equal(created.data.session.operation, operation);
      const sessionId = created.data.session.id;
      const running = f.service.tick();
      await waitFor(() => f.service.store.get('sessions', sessionId)?.stage === stage);
      const active = (await f.api(`/login-sessions/${sessionId}`)).data.session;
      assert.equal(active.stage, stage); assert.equal(active.status, 'running');
      await running;
      const completed = (await f.api(`/login-sessions/${sessionId}`)).data.session;
      assert.equal(completed.status, 'failed'); assert.equal(completed.auth_status, 'unknown');
      assert.equal(completed.error_code, code); assert.equal(completed.message, message);
      assert.equal(completed.qr_version, 0); assert.equal(completed.qrcode_url, null);
      assert.doesNotMatch(JSON.stringify(completed), /do-not-persist|private\.invalid|account\.json/);
      assert.doesNotMatch(JSON.stringify(f.service.store.all('sessions')), /do-not-persist|private\.invalid|account\.json/);
    }
  } finally { await f.close(); }
});
