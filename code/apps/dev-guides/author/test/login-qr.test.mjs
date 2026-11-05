import test from 'node:test';
import assert from 'node:assert/strict';
import { hasCurrentLoginQr, loginQrExpiresAt } from '../publishing/login-qr.mjs';

const at = Date.parse('2026-11-05T00:00:00Z');
const session = { platform: 'douyin', expires_at: new Date(at + 600_000).toISOString() };
const seconds = value => (Date.parse(loginQrExpiresAt(session, { refresh_after_seconds: value, expires_at: new Date(at + 300_000).toISOString() }, at)) - at) / 1000;

test('Douyin only accepts finite numeric refresh windows within 1..45 seconds and ignores a claimed platform expiry', () => {
  for (const value of [undefined, null, '5', 'NaN', NaN, Infinity, -Infinity, {}, true]) assert.equal(seconds(value), 45);
  assert.equal(seconds(5), 5); assert.equal(seconds(44.5), 44.5);
  assert.equal(seconds(0), 1); assert.equal(seconds(-10), 1); assert.equal(seconds(90), 45);
  const shortSession = { ...session, expires_at: new Date(at + 3_000).toISOString() };
  assert.equal(Date.parse(loginQrExpiresAt(shortSession, { refresh_after_seconds: 45 }, at)), at + 3_000);
});

test('other platforms keep their existing expiry strategy while missing session deadlines fail closed', () => {
  const other = { ...session, platform: 'xiaohongshu' };
  assert.equal(Date.parse(loginQrExpiresAt(other, {}, at)), at + 300_000);
  assert.equal(Date.parse(loginQrExpiresAt(other, { expires_at: new Date(at + 60_000).toISOString(), refresh_after_seconds: 1 }, at)), at + 60_000);
  assert.equal(Date.parse(loginQrExpiresAt({ ...session, expires_at: 'invalid' }, {}, at)), at);
});

test('QR projection fails closed at the display deadline and after cancellation', () => {
  const current = { status: 'waiting_user', qr_path: '/runtime/private.png', qr_expires_at: new Date(at + 45_000).toISOString() };
  assert.equal(hasCurrentLoginQr(current, at + 44_999), true);
  assert.equal(hasCurrentLoginQr(current, at + 45_000), false);
  assert.equal(hasCurrentLoginQr({ ...current, status: 'canceled' }, at), false);
  assert.equal(hasCurrentLoginQr({ ...current, qr_expires_at: 'invalid' }, at), false);
  assert.equal(hasCurrentLoginQr({ ...current, qr_expires_at: undefined }, at), false);
  assert.equal(hasCurrentLoginQr({ ...current, qr_path: null }, at), false);
});
