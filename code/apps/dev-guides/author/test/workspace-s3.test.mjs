import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { Readable } from 'node:stream';
import { createWorkspaceS3Storage } from '../workspace-s3.mjs';
const env = { WORKSPACE_STORAGE: 's3', WORKSPACE_S3_ENDPOINT: 'https://s3.private.invalid', WORKSPACE_S3_BUCKET: 'private-assets', WORKSPACE_S3_REGION: 'test', WORKSPACE_S3_ACCESS_KEY_ID: 'private-key', WORKSPACE_S3_SECRET_ACCESS_KEY: 'private-secret', MEDIA_S3_ACCESS_KEY_ID: 'public-wrong', MEDIA_S3_SECRET_ACCESS_KEY: 'public-wrong' };
async function source(t, size) { const root = await mkdtemp(join(tmpdir(), 'workspace-s3-')); t.after(() => rm(root, { recursive: true, force: true })); const bytes = Buffer.alloc(size, 65), path = join(root, 'file.bin'); await writeFile(path, bytes); return { path, bytes, asset: { size, sha256: createHash('sha256').update(bytes).digest('hex'), mime: 'application/octet-stream' } }; }

test('private adapter has explicit isolated configuration and refuses incomplete config', () => {
  assert.equal(createWorkspaceS3Storage({ MEDIA_S3_ENDPOINT: 'https://public.invalid' }), null);
  assert.throws(() => createWorkspaceS3Storage({ WORKSPACE_STORAGE: 's3', ...Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith('MEDIA_'))) }), /配置不完整/);
  assert.throws(() => createWorkspaceS3Storage({ ...env, WORKSPACE_S3_ENDPOINT: 'http://plain.invalid' }), /HTTPS/);
  assert.throws(() => createWorkspaceS3Storage({ ...env, WORKSPACE_S3_PREFIX: '../public' }), /目录无效/);
});

test('private PutObject and GetObject carry checksum metadata, never a public ACL or URL', async (t) => {
  const f = await source(t, 123); const calls = []; let stored;
  const client = { async send(command) {
    calls.push(command); const name = command.constructor.name, input = command.input;
    if (name === 'PutObjectCommand') { const chunks = []; for await (const bytes of input.Body) chunks.push(bytes); stored = Buffer.concat(chunks); return {}; }
    if (name === 'HeadObjectCommand') return { ContentLength: stored.length, Metadata: { sha256: f.asset.sha256 } };
    if (name === 'GetObjectCommand') { const range = /bytes=(\d+)-(\d+)/.exec(input.Range || ''); const bytes = range ? stored.subarray(Number(range[1]), Number(range[2]) + 1) : stored; return { ContentLength: bytes.length, Metadata: { sha256: f.asset.sha256 }, Body: Readable.from([bytes]) }; }
  }, destroy() {} };
  const storage = createWorkspaceS3Storage(env, client); await storage.putFile(f.path, f.asset);
  assert.deepEqual(stored, f.bytes); assert.equal(calls[0].input.CacheControl, 'private, no-store'); assert.equal(calls[0].input.ACL, undefined); assert.equal(calls[0].input.Bucket, 'private-assets'); assert.ok(calls[0].input.Key.startsWith('content-workspace/originals/'));
  const range = await storage.openRead(f.asset, { start: 1, end: 3 }); const chunks = []; for await (const bytes of range) chunks.push(bytes); assert.equal(Buffer.concat(chunks).length, 3);
  assert.deepEqual(Object.keys(storage).sort(), ['close', 'label', 'openRead', 'provider', 'putFile', 'verify']);
});

test('large objects use ordered bounded multipart; failure aborts rather than pretending success', async (t) => {
  const f = await source(t, 9 * 1024 ** 2), names = []; let received = 0;
  const client = { async send(command) {
    const name = command.constructor.name; names.push(name);
    if (name === 'CreateMultipartUploadCommand') return { UploadId: 'private-upload' };
    if (name === 'UploadPartCommand') { let size = 0; for await (const bytes of command.input.Body) size += bytes.length; assert.equal(size, command.input.ContentLength); received += size; return { ETag: `part-${command.input.PartNumber}` }; }
    if (name === 'CompleteMultipartUploadCommand') { assert.deepEqual(command.input.MultipartUpload.Parts.map((part) => part.PartNumber), [1, 2]); return {}; }
    if (name === 'HeadObjectCommand') return { ContentLength: f.asset.size, Metadata: { sha256: f.asset.sha256 } };
  }, destroy() {} };
  await createWorkspaceS3Storage(env, client).putFile(f.path, f.asset); assert.equal(received, f.bytes.length); assert.equal(names.filter((name) => name === 'UploadPartCommand').length, 2);
  const failed = [];
  const broken = { async send(command) { const name = command.constructor.name; failed.push(name); if (name === 'CreateMultipartUploadCommand') return { UploadId: 'stop-me' }; if (name === 'UploadPartCommand') { command.input.Body.destroy(); throw new Error('private endpoint detail'); } return {}; }, destroy() {} };
  await assert.rejects(() => createWorkspaceS3Storage(env, broken).putFile(f.path, f.asset), (error) => error.status === 503 && !error.message.includes('endpoint detail'));
  assert.ok(failed.includes('AbortMultipartUploadCommand')); assert.ok(!failed.includes('CompleteMultipartUploadCommand'));
});
