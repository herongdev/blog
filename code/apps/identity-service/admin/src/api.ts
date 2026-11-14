import type { Session } from './types';
export let session: Session = { authenticated: false };
export function setSession(value: Session) { session = value; }
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }
export async function api<T>(path: string, options: { method?: string; body?: unknown; signal?: AbortSignal; public?: boolean } = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (options.body !== undefined) headers['Content-Type'] = 'application/json';
  if (options.method && options.method !== 'GET' && session.csrfToken) headers['x-identity-csrf'] = session.csrfToken;
  const response = await fetch(options.public ? path : `/admin/api${path}`, { method: options.method || 'GET', headers, credentials: 'same-origin', body: options.body === undefined ? undefined : JSON.stringify(options.body), signal: options.signal });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(typeof result.error_description === 'string' ? result.error_description : response.status === 401 ? '登录已过期，请重新登录。' : response.status === 403 ? '当前账号没有执行此操作的权限。' : '请求未完成，请稍后重试。', response.status);
  return result as T;
}
export function redirectTo(value: string) { const url = new URL(value, location.origin); if (url.protocol !== 'https:' && url.origin !== location.origin) throw new Error('登录地址无效，请联系管理员。'); location.assign(url.href); }
export const text = (data: FormData, name: string) => String(data.get(name) ?? '').trim();
