import { useCallback, useEffect, useRef, useState } from 'react';

export type AuthorSession = {
  mode?: 'local' | 'online';
  online?: boolean;
  provider?: string;
  authenticated: boolean;
  setupRequired: boolean;
  loginAvailable?: boolean;
};

const LOGIN_TIMEOUT_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 1500;
const errors: Record<string, string> = {
  wechat_state_invalid: '本次登录已过期或已使用，请重新微信登录。',
  wechat_cancelled: '已取消微信授权，可以重新登录。',
  wechat_callback_failed: '微信登录暂未完成，请重试。',
  wechat_access_denied: '此微信没有写作台访问权限，请使用管理员微信登录。',
};

export function wechatErrorMessage(code: string | null) {
  return code ? Object.hasOwn(errors, code) ? errors[code] : '微信登录未完成，请重试。' : '';
}

function officialLoginUrl(value: unknown) {
  try {
    if (typeof value !== 'string') throw new Error();
    const url = new URL(value);
    if (url.origin !== 'https://open.weixin.qq.com' || url.pathname !== '/connect/qrconnect' || url.username || url.password) throw new Error();
    return url.href;
  } catch {
    throw new Error('无法打开微信登录，请重试。');
  }
}

type LoginAttempt = { controller: AbortController; popup: Window | null; timer?: number; deadline: number };

export function useWechatLogin({
  apiUrl, setupToken, hasUnsavedChanges, onAuthenticated, onError,
}: {
  apiUrl: (path: string) => string;
  setupToken: string;
  hasUnsavedChanges: boolean;
  onAuthenticated: () => Promise<void>;
  onError: (message: string) => void;
}) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'waiting'>('idle');
  const current = useRef<LoginAttempt | null>(null);
  const finish = useCallback((attempt: LoginAttempt) => {
    if (current.current !== attempt) return;
    current.current = null;
    attempt.controller.abort();
    if (attempt.timer !== undefined) window.clearTimeout(attempt.timer);
    try { attempt.popup?.close(); } catch { /* A provider may detach the window with COOP. */ }
  }, []);

  useEffect(() => () => { if (current.current) finish(current.current); }, [finish]);

  const cancel = useCallback(() => {
    if (current.current) finish(current.current);
    setPhase('idle');
    onError('已停止等待登录。需要继续时，请重新微信登录。');
  }, [finish, onError]);

  const start = useCallback(async () => {
    if (current.current) return;
    onError('');
    // Open during the click, before awaiting the network. Disconnect the opener
    // before navigating to WeChat; the original tab only polls its own session.
    let popup: Window | null = null;
    try {
      popup = window.open('about:blank', '_blank', 'popup,width=520,height=720');
      if (popup) {
        popup.opener = null;
        popup.document.title = '微信登录';
        popup.document.body.textContent = '正在打开微信登录…';
      }
    } catch {
      try { popup?.close(); } catch { /* Nothing else to clean up. */ }
      popup = null;
    }
    if (!popup && hasUnsavedChanges) {
      onError('浏览器拦截了登录窗口。请允许此网站打开弹窗后重试，未保存的编辑仍保留在本页。');
      return;
    }
    const attempt: LoginAttempt = { controller: new AbortController(), popup, deadline: Date.now() + LOGIN_TIMEOUT_MS };
    current.current = attempt;
    setPhase('opening');
    const fail = (message: string) => {
      if (current.current !== attempt) return;
      finish(attempt); setPhase('idle'); onError(message);
    };
    const poll = async () => {
      if (current.current !== attempt) return;
      if (Date.now() >= attempt.deadline) { fail('等待微信登录已超时，请重新登录。'); return; }
      try {
        const response = await fetch(apiUrl('/api/auth/session'), {
          credentials: 'same-origin', cache: 'no-store',
          signal: AbortSignal.any([attempt.controller.signal, AbortSignal.timeout(10_000)]),
        });
        if (current.current !== attempt) return;
        if (!response.ok) throw new Error('暂时无法确认登录结果，请稍后重试。');
        const session = await response.json() as AuthorSession;
        if (current.current !== attempt) return;
        if (session.authenticated && session.provider === 'wechat') {
          finish(attempt); setPhase('idle');
          try { await onAuthenticated(); }
          catch (problem) { onError((problem as Error).message || '登录成功，但写作台未能打开，请重试。'); }
          return;
        }
        // Read only after the provider returns to this origin. Never trust a
        // postMessage or regard a COOP-detached window as cancelled consent.
        try {
          const returned = new URL(attempt.popup?.location.href ?? 'about:blank');
          if (returned.origin === window.location.origin && returned.pathname === new URL(apiUrl('/'), window.location.origin).pathname && returned.searchParams.has('authError')) {
            fail(wechatErrorMessage(returned.searchParams.get('authError'))); return;
          }
        } catch { /* Cross-origin/COOP window access is expected during OAuth. */ }
      } catch (problem) {
        if (current.current !== attempt) return;
        // Transient disconnects can resolve while the user finishes scanning.
        if (!(problem instanceof TypeError) && !(problem instanceof DOMException && problem.name === 'TimeoutError')) {
          fail((problem as Error).message); return;
        }
      }
      if (current.current === attempt) attempt.timer = window.setTimeout(() => void poll(), POLL_INTERVAL_MS);
    };
    try {
      const response = await fetch(apiUrl('/api/auth/wechat/start'), {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setupToken ? { setupToken } : {}),
        signal: AbortSignal.any([attempt.controller.signal, AbortSignal.timeout(15_000)]),
      });
      const result = await response.json() as { url?: string; error?: string };
      if (current.current !== attempt) return;
      if (!response.ok) throw new Error(result.error ?? '微信登录暂不可用，请稍后重试。');
      const url = officialLoginUrl(result.url);
      if (!popup) {
        // A full navigation is safe only when there is no unsaved article.
        window.location.assign(url);
        return;
      }
      popup.location.replace(url);
      setPhase('waiting');
      attempt.timer = window.setTimeout(() => void poll(), POLL_INTERVAL_MS);
    } catch (problem) {
      fail(problem instanceof DOMException && problem.name === 'TimeoutError' ? '打开微信登录超时，请重试。' : (problem as Error).message);
    }
  }, [apiUrl, setupToken, hasUnsavedChanges, onAuthenticated, onError, finish]);

  return { phase, start, cancel };
}
