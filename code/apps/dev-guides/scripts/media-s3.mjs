import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function required(env, key) {
  const value = env[key]?.trim();
  if (!value) throw new Error(`缺少 ${key}。上传密钥应保存在写作服务的私有环境配置中。`);
  return value;
}

/** Private credentials are read by Node only, never serialized into site assets. */
export function createS3Storage(env = process.env) {
  const endpoint = required(env, 'MEDIA_S3_ENDPOINT');
  const region = required(env, 'MEDIA_S3_REGION');
  const bucket = required(env, 'MEDIA_S3_BUCKET');
  const accessKeyId = required(env, 'MEDIA_S3_ACCESS_KEY_ID');
  const secretAccessKey = required(env, 'MEDIA_S3_SECRET_ACCESS_KEY');
  const endpointUrl = new URL(endpoint);
  if (endpointUrl.protocol !== 'https:' || endpointUrl.username || endpointUrl.password || endpointUrl.search || endpointUrl.hash) {
    throw new Error('MEDIA_S3_ENDPOINT 必须是无账号、查询参数及锚点的 HTTPS 服务地址。');
  }
  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) {
    throw new Error('MEDIA_S3_BUCKET 名称不合法。');
  }
  const client = new S3Client({
    endpoint: endpointUrl.toString(),
    region,
    forcePathStyle: env.MEDIA_S3_FORCE_PATH_STYLE === 'true',
    // New AWS SDK releases add optional CRC32 headers; some S3-compatible stores do not accept them.
    requestChecksumCalculation: 'WHEN_REQUIRED',
    credentials: { accessKeyId, secretAccessKey, sessionToken: env.MEDIA_S3_SESSION_TOKEN || undefined },
  });
  return {
    async headObject(key) {
      try {
        const result = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
        return { contentLength: result.ContentLength, contentType: result.ContentType };
      } catch (error) {
        if (error?.$metadata?.httpStatusCode === 404 || error?.name === 'NotFound' || error?.name === 'NoSuchKey') {
          return null;
        }
        throw error;
      }
    },
    async putObject(key, bytes, contentType) {
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: bytes,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));
    },
    async close() {
      client.destroy();
    },
  };
}
