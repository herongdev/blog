import { createReadStream } from 'node:fs';
import { lstat } from 'node:fs/promises';
import { S3Client, HeadObjectCommand, PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand, GetObjectCommand } from '@aws-sdk/client-s3';
const fail = (message) => Object.assign(new Error(message), { status: 503 });
const PART_SIZE = 8 * 1024 ** 2;

/** Dedicated private asset storage. Public MEDIA_* credentials are intentionally never read. */
export function createWorkspaceS3Storage(env = process.env, providedClient) {
  if (env.WORKSPACE_STORAGE && !['local', 's3'].includes(env.WORKSPACE_STORAGE)) throw fail('请选择本地或私有对象存储');
  if (env.WORKSPACE_STORAGE !== 's3') return null;
  const required = (name) => { const value = env[name]?.trim(); if (!value) throw fail('私有素材云存储配置不完整'); return value; };
  const endpointValue = required('WORKSPACE_S3_ENDPOINT'); let endpoint;
  try { endpoint = new URL(endpointValue); } catch { throw fail('私有素材云存储地址无效'); }
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.search || endpoint.hash || (endpoint.pathname && endpoint.pathname !== '/')) throw fail('私有素材云存储地址必须为 HTTPS 服务地址');
  const bucket = required('WORKSPACE_S3_BUCKET'), region = required('WORKSPACE_S3_REGION');
  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) throw fail('私有素材桶名称无效');
  const prefix = (env.WORKSPACE_S3_PREFIX || 'content-workspace/originals').replace(/\/$/, '');
  if (!/^[a-zA-Z0-9][a-zA-Z0-9/_-]{0,180}$/.test(prefix) || prefix.split('/').some((part) => !part || part === '..')) throw fail('私有素材云存储目录无效');
  const client = providedClient || new S3Client({ endpoint: endpoint.toString(), region, forcePathStyle: env.WORKSPACE_S3_FORCE_PATH_STYLE === 'true', requestChecksumCalculation: 'WHEN_REQUIRED', credentials: { accessKeyId: required('WORKSPACE_S3_ACCESS_KEY_ID'), secretAccessKey: required('WORKSPACE_S3_SECRET_ACCESS_KEY'), ...(env.WORKSPACE_S3_SESSION_TOKEN ? { sessionToken: env.WORKSPACE_S3_SESSION_TOKEN } : {}) } });
  const key = (sha256) => { if (!/^[a-f0-9]{64}$/.test(sha256)) throw fail('私有素材对象记录无效'); return `${prefix}/${sha256}`; };
  async function verify(asset) {
    let result;
    try { result = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key(asset.sha256) })); }
    catch { throw fail('私有素材云端文件暂时无法读取'); }
    if (Number(result.ContentLength) !== asset.size || result.Metadata?.sha256 !== asset.sha256) throw fail('私有素材云端文件校验失败');
    return { size: Number(result.ContentLength) };
  }
  return {
    provider: 's3', label: '私有对象存储',
    async putFile(path, asset) {
      const info = await lstat(path); if (!info.isFile() || info.size !== asset.size) throw fail('私有素材上传源文件无效');
      const base = { Bucket: bucket, Key: key(asset.sha256), ContentType: asset.mime, CacheControl: 'private, no-store', Metadata: { sha256: asset.sha256 } };
      let uploadId;
      try {
        // Do not specify any public ACL, website URL, or public bucket policy.
        if (asset.size <= PART_SIZE) await client.send(new PutObjectCommand({ ...base, Body: createReadStream(path), ContentLength: asset.size }));
        else {
          uploadId = (await client.send(new CreateMultipartUploadCommand(base))).UploadId;
          if (!uploadId) throw fail('私有素材分片上传未建立');
          const parts = [];
          for (let start = 0, number = 1; start < asset.size; start += PART_SIZE, number++) {
            const end = Math.min(start + PART_SIZE, asset.size) - 1;
            const result = await client.send(new UploadPartCommand({ Bucket: bucket, Key: base.Key, UploadId: uploadId, PartNumber: number, Body: createReadStream(path, { start, end }), ContentLength: end - start + 1 }));
            if (!result.ETag) throw fail('私有素材分片上传未确认'); parts.push({ PartNumber: number, ETag: result.ETag });
          }
          await client.send(new CompleteMultipartUploadCommand({ Bucket: bucket, Key: base.Key, UploadId: uploadId, MultipartUpload: { Parts: parts } })); uploadId = null;
        }
        await verify(asset);
      } catch {
        if (uploadId) await client.send(new AbortMultipartUploadCommand({ Bucket: bucket, Key: base.Key, UploadId: uploadId })).catch(() => {});
        throw fail('私有素材云端保存失败，原始上传仍保留，可重试');
      }
    },
    verify,
    async openRead(asset, range) {
      try {
        const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key(asset.sha256), ...(range ? { Range: `bytes=${range.start}-${range.end}` } : {}) }));
        const expected = range ? range.end - range.start + 1 : asset.size;
        if (!result.Body || Number(result.ContentLength) !== expected || result.Metadata?.sha256 !== asset.sha256) { result.Body?.destroy?.(); throw fail('私有素材云端响应校验失败'); }
        return result.Body;
      } catch { throw fail('私有素材云端文件暂时无法下载'); }
    },
    close() { client.destroy(); },
  };
}
