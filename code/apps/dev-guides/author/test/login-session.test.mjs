import test from 'node:test';
import assert from 'node:assert/strict';
import { applyLoginSessionUpdate, loginQrKey, loginQrState, renewLoginSession } from '../src/login-session.ts';

const start = Date.parse('2026-11-05T00:00:00Z');
const qr = Object.freeze({ id: 'old', account_id: 'account', operation: 'login', status: 'waiting_user', qr_version: 1, qr_expires_at: new Date(start + 45_000).toISOString(), qrcode_url: '/api/publishing/login-sessions/old/qrcode?v=1' });

test('the display deadline hides an already-loaded QR without another network response', () => {
  assert.equal(loginQrState(qr, start + 44_999), 'ready');
  assert.equal(loginQrState(qr, start + 45_000), 'expired');
  assert.equal(loginQrState({ ...qr, qr_expires_at: undefined }, start), 'expired');
  assert.equal(loginQrState({ ...qr, status: 'completed' }, start), 'none');
  assert.equal(loginQrState({ ...qr, status: 'failed', error_code: 'LOGIN_TIMEOUT' }, start), 'expired');
});

test('image and current-session read failures hide the QR; a new version is independent', () => {
  assert.equal(loginQrState(qr, start, loginQrKey(qr)), 'image_error');
  assert.equal(loginQrState(qr, start, '', qr.id), 'state_error');
  assert.equal(loginQrState(qr, start + 45_000, '', qr.id), 'expired');
  assert.equal(loginQrState({ ...qr, qr_version: 2 }, start, loginQrKey(qr)), 'ready');
  assert.equal(loginQrState(qr, start, '', 'previous-account-session'), 'ready');
  assert.equal(loginQrState({ ...qr, qrcode_url: 'https://example.invalid/qr' }, start), 'none');
});

test('late polling cannot replace a new session, revive a terminal one, or roll back a QR version', () => {
  const next = { ...qr, id: 'new' };
  assert.equal(applyLoginSessionUpdate(next, qr, qr.id), next);
  const canceled = { ...qr, status: 'canceled' };
  assert.equal(applyLoginSessionUpdate(canceled, qr, qr.id), canceled);
  const updated = { ...qr, qr_version: 2 };
  assert.equal(applyLoginSessionUpdate(updated, qr, qr.id), updated);
  assert.equal(applyLoginSessionUpdate(qr, updated, qr.id), updated);
});

test('manual refresh cancels and confirms the old terminal state before creating a new login', async () => {
  const calls = []; const observed = [];
  let reads = 0; let time = start;
  const next = { ...qr, id: 'new', qr_version: 0, status: 'queued', qrcode_url: null };
  const result = await renewLoginSession(qr, {
    get: async id => { calls.push(`get:${id}`); return { ...qr, status: reads++ >= 2 ? 'canceled' : 'waiting_user' }; },
    cancel: async id => { calls.push(`cancel:${id}`); return { ...qr, status: 'running' }; },
    create: async accountId => { calls.push(`create:${accountId}`); assert.equal(observed.at(-1), 'canceled'); return next; },
  }, { now: () => time, wait: async ms => { time += ms; }, onCurrent: current => observed.push(current.status) });
  assert.equal(result, next);
  assert.deepEqual(calls, ['get:old', 'cancel:old', 'get:old', 'get:old', 'create:account']);
});

test('an unconfirmed stop times out without creating another account operation', async () => {
  let created = false; let time = start;
  await assert.rejects(renewLoginSession(qr, {
    get: async () => qr, cancel: async () => qr,
    create: async () => { created = true; return qr; },
  }, { now: () => time, wait: async ms => { time += ms; }, timeoutMs: 800 }), /确认上次登录已停止/);
  assert.equal(created, false);
});

test('a successful scan racing with refresh is preserved without creating another login', async () => {
  for (const alreadyCompleted of [true, false]) {
    let canceled = false; let created = false;
    const completed = { ...qr, status: 'completed', auth_status: 'valid' };
    const result = await renewLoginSession(qr, {
      get: async () => alreadyCompleted ? completed : qr,
      cancel: async () => { canceled = true; return completed; },
      create: async () => { created = true; return qr; },
    });
    assert.equal(result, completed); assert.equal(canceled, !alreadyCompleted); assert.equal(created, false);
  }
});

test('check operations never become QR logins, and mismatched responses never trigger cancellation', async () => {
  const calls = [];
  const transport = { get: async () => { calls.push('get'); return { ...qr, id: 'other' }; }, cancel: async () => { calls.push('cancel'); return qr; }, create: async () => { calls.push('create'); return qr; } };
  await assert.rejects(renewLoginSession({ ...qr, operation: 'check' }, transport), /账号列表/);
  assert.deepEqual(calls, []);
  await assert.rejects(renewLoginSession(qr, transport), /登录会话已变化/);
  assert.deepEqual(calls, ['get']);
});
