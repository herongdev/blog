import test from 'node:test';
import assert from 'node:assert/strict';
import { createPublishProfiles } from '../publish-profiles.mjs';

test('the default keeps the existing IP subpaths separate', () => {
  const profiles = createPublishProfiles({ authorOrigin: 'https://101.96.210.172' });
  assert.equal(profiles.staging.site + profiles.staging.basePath, 'https://101.96.210.172/test-dev/');
  assert.equal(profiles.production.site + profiles.production.basePath, 'https://101.96.210.172/dev/');
  assert.notEqual(profiles.staging.root, profiles.production.root);
});

test('domain publishing is independent of the unchanged author login origin', () => {
  const profiles = createPublishProfiles({ target: 'domains', authorOrigin: 'https://101.96.210.172' });
  assert.equal(profiles.staging.site + profiles.staging.basePath, 'https://test-dev.herong.info/');
  assert.equal(profiles.production.site + profiles.production.basePath, 'https://dev.herong.info/');
  assert.equal(profiles.staging.root, '/var/www/herong-dev-guides-staging');
  assert.equal(profiles.production.root, '/var/www/herong-dev-guides');
});

test('invalid deployment modes and non-IP origins cannot silently change publication destinations', () => {
  for (const target of ['', 'domain', 'production', 'https://other.example', null]) {
    assert.throws(() => createPublishProfiles({ target, authorOrigin: 'https://101.96.210.172' }), /AUTHOR_PUBLISH_TARGET/);
  }
  for (const authorOrigin of ['http://101.96.210.172', 'https://101.96.210.172/dev/', 'https://101.96.210.172:8443', 'https://other.example', 'https://user@101.96.210.172']) {
    assert.throws(() => createPublishProfiles({ authorOrigin }), /IP publishing/);
  }
});
