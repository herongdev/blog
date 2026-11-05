import test from 'node:test';
import assert from 'node:assert/strict';
import { safeAuthObservation } from '../publishing/auth-observation.mjs';

const page = { route: 'creator_root', hasSessionCookie: false, any_visible_login_marker: true, scan_confirmation_visible: false, visible_code_input: false, captcha_visible: false, creator_publish_control: false };
const observation = { checkerResult: false, pageCount: 1, pages: [page], observationUnavailable: false };

test('auth observation copies only bounded metadata and never retains unknown fields', () => {
  const saved = safeAuthObservation(observation);
  assert.deepEqual(saved, observation);
  assert.notEqual(saved.pages[0], page);
  for (const value of [
    { ...observation, url: 'PRIVATE_URL' },
    { ...observation, checkerResult: 'false' },
    { ...observation, pageCount: 4, pages: [page, page, page, page] },
    { ...observation, pageCount: 0 },
    { ...observation, pages: [{ ...page, cookie: 'PRIVATE_COOKIE' }] },
    { ...observation, pages: [{ ...page, route: 'https://private.invalid/' }] },
    { ...observation, pages: [{ ...page, hasSessionCookie: 'PRIVATE_COOKIE' }] },
    { ...observation, observationUnavailable: true },
  ]) assert.equal(safeAuthObservation(value), null);
  assert.deepEqual(safeAuthObservation({ checkerResult: false, pageCount: 0, pages: [], observationUnavailable: true }), { checkerResult: false, pageCount: 0, pages: [], observationUnavailable: true });
});
