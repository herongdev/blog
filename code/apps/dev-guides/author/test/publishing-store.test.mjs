import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createPublishingStore } from '../publishing/store.mjs';

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'publishing-store-'));
  const store = createPublishingStore(join(root, 'store.sqlite'));
  const account = store.createAccount({ platform: 'xiaohongshu', alias: '我的账号' });
  store.put('accounts', { ...account, auth_status: 'valid' });
  store.addAsset({ id: 'video', type: 'video', sha256: 'fixed-version', filename: 'video.mp4', size: 12 });
  const create = (title = '原创教程') => store.createJob({ video_asset_id: 'video', defaults: { title, description: '说明', tags: ['工具'] }, targets: [{ account_id: account.id, platform_options: { content_origin: 'original' } }] });
  return { root, store, account, create, async close() { store.close(); await rm(root, { recursive: true, force: true }); } };
}

test('submit is idempotent, conflicting payload rejected, target snapshot survives later input changes', async () => {
  const f = await fixture();
  try {
    const job = f.create(); const first = f.store.submit(job.id, 'same-key');
    assert.equal(first.status, 'committed');
    assert.equal(f.store.submit(job.id, 'same-key').id, first.id);
    assert.equal(f.store.submit(f.create().id, 'same-key').id, first.id);
    assert.throws(() => f.store.submit(f.create('不同内容').id, 'same-key'), /不同内容/);
    assert.equal(first.targets[0].snapshot.platform_options.content_origin, 'original');
    assert.equal(first.targets[0].snapshot.video_sha256, 'fixed-version');
    const claimed = f.store.claim('worker-1');
    assert.equal(claimed.kind, 'target'); assert.equal(f.store.claim('worker-2'), null);
    assert.equal(f.store.job(first.id).targets[0].attempts.length, 1);
  } finally { await f.close(); }
});

test('submission authorization is atomic, single-use, attempt and lease fenced', async () => {
  const f = await fixture();
  try {
    const job = f.create(); f.store.submit(job.id, 'one'); const op = f.store.claim('worker');
    assert.equal(f.store.beforeSubmit(op.value.id, 'wrong-attempt', 'worker'), false);
    assert.equal(f.store.beforeSubmit(op.value.id, op.attempt.id, 'wrong-worker'), false);
    assert.equal(f.store.beforeSubmit(op.value.id, op.attempt.id, 'worker'), true);
    assert.equal(f.store.beforeSubmit(op.value.id, op.attempt.id, 'worker'), false);
    f.store.finish(op, { status: 'failed' }, 'worker');
    const target = f.store.job(job.id).targets[0];
    assert.equal(target.status, 'submission_unknown');
    assert.throws(() => f.store.retry(target.id), /确认未提交/);
    f.store.resolveTarget(target.id, { outcome: 'not_published', basis: '本人在平台作品管理逐项核对，未找到该视频' });
    assert.equal(f.store.retry(target.id).status, 'queued');
    const retry = f.store.claim('worker');
    assert.equal(retry.attempt.attempt_no, 2);
    f.store.db.prepare('UPDATE executor SET expires=0').run();
    assert.equal(f.store.beforeSubmit(retry.value.id, retry.attempt.id, 'worker'), false);
  } finally { await f.close(); }
});

test('only evidence-backed results become submitted; partial batches do not roll back', async () => {
  const f = await fixture();
  try {
    const other = f.store.createAccount({ platform: 'xiaohongshu', alias: '第二个账号' });
    f.store.put('accounts', { ...other, auth_status: 'valid' });
    const job = f.store.createJob({ video_asset_id: 'video', defaults: { title: '一个视频' }, targets: [{ account_id: f.account.id }, { account_id: other.id }] });
    f.store.submit(job.id, 'two');
    const one = f.store.claim('worker'); f.store.beforeSubmit(one.value.id, one.attempt.id, 'worker');
    f.store.finish(one, { status: 'submitted', evidence: { kind: 'platform_acceptance', summary: '平台返回受理记录' }, post_url: 'https://www.xiaohongshu.com/explore/123' }, 'worker');
    const two = f.store.claim('worker'); f.store.finish(two, { status: 'submitted' }, 'worker');
    const [a, b] = f.store.job(job.id).targets;
    assert.equal(a.status, 'submitted'); assert.equal(b.status, 'failed');
    assert.throws(() => f.store.retry(a.id), /确认未提交/);
    assert.equal(f.store.retry(b.id).status, 'queued');
    assert.equal(f.store.job(job.id).targets[0].status, 'submitted');
  } finally { await f.close(); }
});

test('cancel cannot bypass draft confirmation or create another active attempt', async () => {
  const f = await fixture();
  try {
    const draft = f.create(); f.store.cancel(draft.targets[0].id);
    assert.throws(() => f.store.retry(draft.targets[0].id), /草稿必须先确认发布/);
    const job = f.create(); f.store.submit(job.id, 'cancel-key'); const op = f.store.claim('worker');
    f.store.cancel(op.value.id);
    assert.equal(f.store.beforeSubmit(op.value.id, op.attempt.id, 'worker'), false);
    assert.throws(() => f.store.retry(op.value.id), /确认未提交/);
    f.store.finish(op, {}, 'worker');
    assert.equal(f.store.target(op.value.id).status, 'canceled');
    assert.equal(f.store.submit(job.id, 'cancel-key').targets[0].status, 'canceled');
  } finally { await f.close(); }
});

test('recovery waits for stopped process, preserves submitted intent, and fences old worker', async () => {
  const f = await fixture();
  try {
    const job = f.create(); f.store.submit(job.id, 'recovery'); const op = f.store.claim('old');
    f.store.beforeSubmit(op.value.id, op.attempt.id, 'old');
    f.store.db.prepare('UPDATE executor SET expires=0').run();
    assert.equal(f.store.claim('new'), null);
    assert.equal(f.store.acquireRecovery('new'), true);
    assert.equal(f.store.recoverOperation(op, 'new', false), false);
    assert.equal(f.store.target(op.value.id).status, 'running');
    assert.equal(f.store.beforeSubmit(op.value.id, op.attempt.id, 'old'), false);
    assert.equal(f.store.recoverOperation(op, 'new', true), true);
    assert.equal(f.store.target(op.value.id).status, 'submission_unknown');
    assert.equal(f.store.get('attempts', op.attempt.id).process_stopped, true);
    f.store.release('new');
    f.store.resolveTarget(op.value.id, { outcome: 'found', basis: '账号作品管理已找到对应作品', post_url: 'https://www.xiaohongshu.com/explore/123' });
    assert.equal(f.store.target(op.value.id).status, 'submitted');
  } finally { await f.close(); }
});

test('login operations isolate accounts and prohibit disconnect during active work', async () => {
  const f = await fixture();
  try {
    const other = f.store.createAccount({ platform: 'xiaohongshu', alias: '同名显示也不串号' });
    const one = f.store.newSession(f.account.id, 'login');
    assert.throws(() => f.store.newSession(f.account.id, 'check'), /正在使用/);
    const two = f.store.newSession(other.id, 'login');
    assert.notEqual(one.id, two.id);
    assert.throws(() => f.store.disconnect(f.account.id), /任务/);
    const op = f.store.claim('worker');
    f.store.finish(op, { auth_status: 'valid' }, 'worker');
    assert.equal(f.store.account(f.account.id).auth_status, 'valid');
    assert.equal(f.store.account(other.id).auth_status, 'unknown');
    assert.equal(f.store.claim('worker').value.account_id, other.id);
  } finally { await f.close(); }
});

test('session failures retain only controlled error codes and never publish raw runner diagnostics', async () => {
  const f = await fixture();
  try {
    for (const [code, message] of [
      ['LOGIN_PAGE_UNAVAILABLE', '抖音登录页暂时无法打开，请稍后重试'],
      ['QR_UNAVAILABLE', '未取得登录二维码，请重试'],
      ['LOGIN_TIMEOUT', '扫码登录超时，请重新扫码'],
      ['LOGIN_NOT_COMPLETED', '登录尚未完成，请重新扫码'],
      ['LOGIN_VERIFICATION_REQUIRED', '抖音要求额外身份验证，当前验证方式尚未完成，请检查平台验证要求'],
      ['LOGIN_VERIFICATION_FAILED', '抖音身份验证未通过，请核对验证码后重新登录'],
      ['AUTH_CHECK_FAILED', '暂时无法检查账号会话，请稍后重试'],
    ]) {
      const session = f.store.newSession(f.account.id, 'login'); const operation = f.store.claim('login-worker');
      f.store.finish(operation, { status: 'failed', auth_status: 'invalid', error_code: code, message: 'Cookie=private-token https://private.invalid/path /private/account.json', stderr: 'private traceback', url: 'https://private.invalid/path' }, 'login-worker');
      const saved = f.store.get('sessions', session.id);
      assert.equal(saved.status, 'failed');
      assert.equal(saved.auth_status, 'unknown');
      assert.equal(saved.error_code, code);
      assert.equal(saved.message, message);
      assert.equal(f.store.account(f.account.id).auth_status, 'unknown');
      assert.doesNotMatch(JSON.stringify(saved), /private-token|private\.invalid|account\.json|traceback/);
    }
  } finally { await f.close(); }
});

test('failed login preparation and incomplete QR confirmation cannot be mistaken for an expired session', async () => {
  const f = await fixture();
  try {
    for (const [qrVersion, code, message] of [[0, 'QR_UNAVAILABLE', '未取得登录二维码，请重试'], [1, 'LOGIN_NOT_COMPLETED', '登录尚未完成，请重新扫码']]) {
      const session = f.store.newSession(f.account.id, 'login'); const operation = f.store.claim('login-worker');
      f.store.updateOperation(operation, { qr_version: qrVersion }, 'login-worker');
      f.store.finish(operation, { status: 'failed', auth_status: 'invalid', error_code: 'https://secret.invalid/cookie', message: '/private/account.json' }, 'login-worker');
      const saved = f.store.get('sessions', session.id);
      assert.equal(saved.status, 'failed'); assert.equal(saved.auth_status, 'unknown');
      assert.equal(saved.error_code, code); assert.equal(saved.message, message);
      assert.doesNotMatch(JSON.stringify(saved), /secret\.invalid|account\.json|失效/);
    }
  } finally { await f.close(); }
});

test('session checks distinguish invalid credentials from check errors and preserve success and cancellation', async () => {
  const f = await fixture();
  try {
    const invalid = f.store.newSession(f.account.id, 'check'); let operation = f.store.claim('check-worker');
    f.store.finish(operation, { status: 'completed', auth_status: 'invalid' }, 'check-worker');
    const invalidResult = f.store.get('sessions', invalid.id);
    assert.equal(invalidResult.status, 'completed'); assert.equal(invalidResult.auth_status, 'invalid'); assert.equal(invalidResult.error_code, null);
    assert.match(invalidResult.message, /未登录或会话已失效/);

    const failed = f.store.newSession(f.account.id, 'check'); operation = f.store.claim('check-worker');
    f.store.finish(operation, { status: 'failed', auth_status: 'invalid', message: 'sensitive unknown error' }, 'check-worker');
    const failedResult = f.store.get('sessions', failed.id);
    assert.equal(failedResult.status, 'failed'); assert.equal(failedResult.auth_status, 'unknown'); assert.equal(failedResult.error_code, 'AUTH_CHECK_FAILED');
    assert.equal(failedResult.message, '暂时无法检查账号会话，请稍后重试');

    const valid = f.store.newSession(f.account.id, 'login'); operation = f.store.claim('check-worker');
    f.store.finish(operation, { auth_status: 'valid', status: 'completed' }, 'check-worker');
    assert.equal(f.store.get('sessions', valid.id).status, 'completed'); assert.equal(f.store.account(f.account.id).auth_status, 'valid');
    assert.equal(f.store.get('sessions', valid.id).message, '账号已连接'); assert.equal(f.store.get('sessions', valid.id).error_code, null);

    const canceled = f.store.newSession(f.account.id, 'login'); operation = f.store.claim('check-worker');
    f.store.updateOperation(operation, { cancel_requested: true }, 'check-worker');
    f.store.finish(operation, { status: 'failed', auth_status: 'unknown', error_code: 'LOGIN_TIMEOUT' }, 'check-worker');
    const canceledResult = f.store.get('sessions', canceled.id);
    assert.equal(canceledResult.status, 'canceled'); assert.equal(canceledResult.message, '已取消本次操作'); assert.equal(canceledResult.error_code, null);
  } finally { await f.close(); }
});

test('explicit unsupported declarations and duplicate target selection are rejected', async () => {
  const f = await fixture();
  try {
    const douyin = f.store.createAccount({ platform: 'douyin', alias: '抖音' });
    assert.throws(() => f.store.createJob({ video_asset_id: 'video', defaults: { title: '测试' }, targets: [{ account_id: douyin.id, platform_options: { content_origin: 'original' } }] }), /不支持设置原创/);
    assert.throws(() => f.store.createJob({ video_asset_id: 'video', defaults: { title: '测试' }, targets: [{ account_id: f.account.id }, { account_id: f.account.id }] }), /重复选择/);
    assert.throws(() => f.store.createJob({ video_asset_id: 'video', defaults: { title: '测试' }, targets: [{ account_id: f.account.id, platform_options: { content_origin: 'repost' } }] }), /填写来源/);
  } finally { await f.close(); }
});
