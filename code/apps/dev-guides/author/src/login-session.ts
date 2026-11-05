export type LoginSessionSnapshot = {
  id: string;
  account_id?: string;
  operation?: string;
  auth_status?: string;
  status: string;
  error_code?: string | null;
  qr_version?: number;
  qr_expires_at?: string;
  qrcode_url?: string | null;
};

export const isClosedLoginSession = (status: string) => ['success', 'succeeded', 'completed', 'failed', 'canceled', 'expired', 'timeout', 'valid', 'invalid'].includes(status);
export const loginQrKey = (session: LoginSessionSnapshot) => `${session.id}-${session.qr_version ?? 0}`;

// The runner's deadline is only a conservative display limit, not the platform's promised QR lifetime.
export function loginQrState(session: LoginSessionSnapshot, now: number, failedImageKey = '', readFailedId = ''): 'none' | 'ready' | 'expired' | 'image_error' | 'state_error' {
  if (session.status === 'expired' || session.status === 'timeout' || session.error_code === 'LOGIN_TIMEOUT') return 'expired';
  if (isClosedLoginSession(session.status)) return 'none';
  const hasQr = (session.qr_version ?? 0) > 0 || !!session.qrcode_url;
  const deadline = Date.parse(session.qr_expires_at ?? '');
  if (hasQr && (!Number.isFinite(deadline) || deadline <= now)) return 'expired';
  if (readFailedId === session.id) return 'state_error';
  if (!hasQr) return 'none';
  if (failedImageKey === loginQrKey(session)) return 'image_error';
  return session.qrcode_url?.startsWith('/api/publishing/login-sessions/') ? 'ready' : 'none';
}

// A response from an older selection or QR version must never replace the current dialog.
export function applyLoginSessionUpdate<T extends LoginSessionSnapshot>(current: T | null, next: T, expectedId: string): T | null {
  if (current?.id !== expectedId || next.id !== expectedId) return current;
  if (isClosedLoginSession(current.status) && !isClosedLoginSession(next.status)) return current;
  if ((next.qr_version ?? 0) < (current.qr_version ?? 0)) return current;
  return next;
}

type SessionTransport<T> = {
  get: (id: string) => Promise<T>;
  cancel: (id: string) => Promise<T>;
  create: (accountId: string) => Promise<T>;
};

export async function renewLoginSession<T extends LoginSessionSnapshot>(previous: T, transport: SessionTransport<T>, options: {
  onCurrent?: (session: T) => void;
  now?: () => number;
  wait?: (ms: number) => Promise<void>;
  timeoutMs?: number;
} = {}): Promise<T> {
  if (!previous.account_id || previous.operation !== 'login') throw new Error('请从账号列表重新发起扫码登录。');
  const now = options.now ?? Date.now;
  const wait = options.wait ?? (ms => new Promise(resolve => setTimeout(resolve, ms)));
  const deadline = now() + (options.timeoutMs ?? 20_000);
  const accept = (next: T) => {
    if (next.id !== previous.id || (next.account_id && next.account_id !== previous.account_id)) throw new Error('登录会话已变化，请重新打开账号。');
    options.onCurrent?.(next);
    return next;
  };
  let current = accept(await transport.get(previous.id));
  if (!isClosedLoginSession(current.status)) current = accept(await transport.cancel(previous.id));
  while (!isClosedLoginSession(current.status)) {
    if (now() >= deadline) throw new Error('正在确认上次登录已停止，请稍后重新获取二维码。');
    await wait(400);
    current = accept(await transport.get(previous.id));
  }
  // The user may have finished scanning while cancellation was in flight. Keep that successful login.
  if (current.auth_status === 'valid' || ['success', 'succeeded', 'completed', 'valid'].includes(current.status)) return current;
  // Only the server's terminal state releases the account and proves the old process has stopped.
  return transport.create(previous.account_id);
}
