import product from '@app/config/product.json';

export type Account = {
  name?: string;
  nickname?: string;
  avatarUrl?: string;
  role?: string;
  permissions?: string[];
};
export type Session = Account & {
  authenticated: boolean;
  loginAvailable: boolean;
  csrfToken?: string;
  expiresAt?: number;
};
export type Overview = { user: Account; app: { name: string } };

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

export async function request<T>(path: string, options: RequestInit = {}, csrfToken?: string): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');
  if (csrfToken) headers.set('X-CSRF-Token', csrfToken);
  const response = await fetch(path, { ...options, credentials: 'same-origin', headers });
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const publicError = value && typeof value === 'object' && 'error' in value ? value.error : null;
    const message = response.status === 401 ? '登录已失效，请重新登录。'
      : response.status === 403 && publicError === '页面验证已失效，请刷新后重试。' ? publicError
      : response.status === 403 ? '当前账号没有执行此操作的权限。'
      : response.status === 429 ? '操作较频繁，请稍后再试。'
      : '暂时无法完成请求，请稍后重试。';
    throw new ApiError(response.status, message);
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('暂时无法读取服务返回的内容，请稍后重试。');
  }
  return value as T;
}

export function loginTarget(value: string) {
  const issuer = new URL(product.auth.issuer);
  const target = new URL(value);
  const expectedPath = `${issuer.pathname.replace(/\/$/, '')}/authorize`;
  if (target.protocol !== 'https:' || target.origin !== issuer.origin || target.pathname !== expectedPath
    || target.username || target.password || target.hash) {
    throw new Error('暂时无法打开登录页面，请稍后重试。');
  }
  return target.href;
}

export function safeAvatarUrl(value?: string) {
  if (!value || value.length > 2048) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['wx.qlogo.cn', 'thirdwx.qlogo.cn'].includes(url.hostname)
      && !url.username && !url.password && !url.port && !url.search && !url.hash ? url.href : '';
  } catch { return ''; }
}

export function accountName(account: Account) {
  return account.nickname?.trim() || account.name?.trim() || '已登录账号';
}

export function roleName(role?: string) {
  return ({ owner: '应用所有者', admin: '管理员', editor: '编辑者', viewer: '只读成员' } as Record<string, string>)[role || ''] || role || '成员';
}
