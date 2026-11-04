import test from 'node:test';
import assert from 'node:assert/strict';
import { tmpdir } from 'node:os';
import { requirePrivateStorageSpace } from '../private-storage.mjs';

test('physical capacity leaves the reserve available after the proposed temporary copy', async () => {
  const inspect = async () => ({ bavail: 10, bsize: 1024 });
  await requirePrivateStorageSpace('/private', 4096, { reserveBytes: 6144, inspect });
  await assert.rejects(requirePrivateStorageSpace('/private', 4097, { reserveBytes: 6144, inspect }), { status: 507 });
});

test('capacity check uses blocks available to an unprivileged service and accepts bigint statfs', async () => {
  const inspect = async () => ({ bavail: 0n, bfree: 100000n, bsize: 4096n });
  await assert.rejects(requirePrivateStorageSpace('/private', 1, { reserveBytes: 0, inspect }), { status: 507 });
});

test('capacity check runs against the actual filesystem and does not expose its path on refusal', async () => {
  await assert.rejects(requirePrivateStorageSpace(tmpdir(), Number.MAX_SAFE_INTEGER), error => error.status === 507 && !error.message.includes(tmpdir()));
});
