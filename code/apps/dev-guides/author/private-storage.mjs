import { statfs } from 'node:fs/promises';

// Quotas count registered assets; physical space also includes upload parts,
// temporary copies, backups and other applications on this filesystem.
export async function requirePrivateStorageSpace(path, bytes = 0, { reserveBytes = 512 * 1024 ** 2, inspect = statfs } = {}) {
  const disk = await inspect(path);
  const available = Number(disk.bavail) * Number(disk.bsize);
  if (!Number.isSafeInteger(bytes) || bytes < 0 || !Number.isSafeInteger(reserveBytes) || reserveBytes < 0 || !Number.isFinite(available)) throw new Error('Invalid private storage capacity check');
  if (available < bytes + reserveBytes) throw Object.assign(new Error('服务器可用存储空间不足，请联系维护者扩容后继续上传'), { status: 507 });
}
