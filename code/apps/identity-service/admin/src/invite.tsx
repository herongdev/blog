import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Check, CircleAlert, LoaderCircle, Mail, RefreshCw, UserRound } from 'lucide-react';
import { api, redirectTo, text } from './api';
import { Brand, ThemeControls, Field, Badge, date, roles } from './ui';
import type { Role } from './types';

interface InviteInfo {
  appName: string;
  role: Role;
  inviterName?: string;
  expiresAt: string | number;
  status: string;
}

interface InviteStatus extends InviteInfo {
  inviteId: string;
  appId: string;
  homepageUrl?: string;
  canEnter: boolean;
}

type Result<T> = { state: 'loading' } | { state: 'ready'; value: T } | { state: 'error'; message: string };

function captureInvitation() {
  if (!location.pathname.startsWith('/invite')) return { token: '', invitation: '', statusPage: false, error: '' };
  const parameters = new URLSearchParams(location.search);
  const token = new URLSearchParams(location.hash.slice(1)).get('token') || '';
  if (location.hash) history.replaceState(null, '', `${location.pathname}${location.search}`);
  return {
    token,
    invitation: parameters.get('invitation') || '',
    statusPage: parameters.get('status') === 'pending' || parameters.has('invitation'),
    error: parameters.get('error') || '',
  };
}

// Capture once before React renders, including development StrictMode remounts.
// The invitation credential remains in memory and is never persisted or rendered.
const invitationEntry = captureInvitation();

function InviteFrame({ children }: { children: ReactNode }) {
  return <><header className="topbar"><Brand /><ThemeControls /></header><main id="main" className="auth-main"><section className="auth-panel invite-panel" aria-live="polite">{children}</section></main></>;
}

function StatusPage({ invitation }: { invitation: string }) {
  const [result, setResult] = useState<Result<InviteStatus>>({ state: 'loading' });
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!invitation) return;
    const controller = new AbortController();
    setResult({ state: 'loading' });
    void api<InviteStatus>(`/invite/status?${new URLSearchParams({ invitation })}`, { public: true, signal: controller.signal })
      .then((value) => {
        if (!['claimed', 'approved', 'revoked', 'expired'].includes(value.status)) throw new Error('当前邀请状态无法继续处理，请联系管理者。');
        if (!controller.signal.aborted) setResult({ state: 'ready', value });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setResult({ state: 'error', message: error instanceof Error ? error.message : '读取邀请状态失败。' });
      });
    return () => controller.abort();
  }, [invitation, revision]);

  if (!invitation) return <><CircleAlert aria-hidden="true" /><h1>无法确定邀请状态</h1><p>此页面缺少邀请标识。请从管理者发送的原始邀请链接开始，或联系管理者确认。</p></>;
  if (result.state === 'loading') return <><LoaderCircle aria-hidden="true" /><h1>正在读取邀请状态</h1><p>正在核对当前领取人的申请记录…</p></>;

  let content: ReactNode;
  if (result.state === 'error') {
    content = <><CircleAlert aria-hidden="true" /><h1>暂时无法确认状态</h1><p role="alert">{result.message}</p><p className="context-note">需要使用领取此邀请时的登录会话。如已退出或无法找到记录，请从原始邀请链接开始，或联系管理者。</p></>;
  } else {
    const info = result.value;
    const approved = info.status === 'approved';
    const canEnter = approved && info.canEnter === true;
    const title = canEnter ? `已加入 ${info.appName}` : approved ? '邀请已获批准' : info.status === 'claimed' ? '等待管理者确认' : info.status === 'expired' ? '邀请已过期' : '邀请已撤销';
    const description = canEnter ? '管理者已确认你的身份并批准加入。你可以前往应用，使用已分配的角色权限。' : approved ? '当前应用授权已停用，请联系管理者。' : info.status === 'claimed' ? '身份验证已完成。管理者核对领取人并批准后，你才会获得约定的应用权限。' : '此邀请不能继续用于加入应用。请联系管理者确认，或申请新的邀请。';
    let homepageUrl = '';
    if (canEnter && info.homepageUrl) {
      try {
        const url = new URL(info.homepageUrl);
        if (url.protocol === 'https:' && !url.username && !url.password) homepageUrl = url.href;
      } catch { /* An invalid destination must not become an application link. */ }
    }
    content = <>{approved ? <Check aria-hidden="true" /> : <UserRound aria-hidden="true" />}<p className="breadcrumb">应用邀请</p><h1>{title}</h1><p>{description}</p><dl className="confirmation-facts"><div><dt>应用</dt><dd>{info.appName}</dd></div><div><dt>角色</dt><dd>{roles[info.role] || info.role}</dd></div><div><dt>当前状态</dt><dd><Badge value={info.status} /></dd></div></dl>{homepageUrl && <a className="button primary full-width" href={homepageUrl}>前往应用 <ArrowRight aria-hidden="true" /></a>}{canEnter && !homepageUrl && <p className="context-note">此应用尚未提供有效的主页地址，请联系管理者获取入口。</p>}</>;
  }

  return <>{content}<button type="button" className="button full-width" onClick={() => setRevision((value) => value + 1)}><RefreshCw aria-hidden="true" />刷新状态</button></>;
}

function ClaimPage({ token }: { token: string }) {
  const [result, setResult] = useState<Result<InviteInfo>>({ state: 'loading' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setResult({ state: 'loading' });
    void api<InviteInfo>('/invite/info', { method: 'POST', body: { token }, public: true, signal: controller.signal })
      .then((value) => { if (!controller.signal.aborted) setResult({ state: 'ready', value }); })
      .catch((cause: unknown) => { if (!controller.signal.aborted) setResult({ state: 'error', message: cause instanceof Error ? cause.message : '读取邀请失败，请稍后重试。' }); });
    return () => controller.abort();
  }, [token]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (busy.current || !form.reportValidity()) return;
    const name = text(new FormData(form), 'name');
    if (!name || name.length > 80) { setError('请填写 1 到 80 个字符的姓名或称呼。'); return; }
    busy.current = true;
    setSubmitting(true);
    setError('');
    try {
      const response = await api<{ url: string }>('/invite/start', { method: 'POST', body: { token, name }, public: true });
      redirectTo(response.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '无法开始身份验证，请重试。');
      busy.current = false;
      setSubmitting(false);
    }
  }

  if (!token) return <><CircleAlert aria-hidden="true" /><h1>邀请链接不完整</h1><p>请使用管理者发送的完整邀请链接。没有有效邀请时，不能通过此页面加入应用。</p></>;
  if (result.state === 'loading') return <><LoaderCircle aria-hidden="true" /><h1>正在核对邀请</h1><p>请稍候…</p></>;
  if (result.state === 'error') return <><CircleAlert aria-hidden="true" /><h1>无法使用此邀请</h1><p role="alert">{result.message}</p><p className="context-note">如链接已过期或撤销，请联系管理者重新邀请。</p></>;
  const info = result.value;
  return <><Mail aria-hidden="true" /><p className="breadcrumb">应用邀请</p><h1>加入 {info.appName}</h1><dl className="confirmation-facts"><div><dt>邀请人</dt><dd>{info.inviterName || '未提供'}</dd></div><div><dt>加入后的角色</dt><dd>{roles[info.role] || info.role}</dd></div><div><dt>有效期至</dt><dd>{date(info.expiresAt)}</dd></div><div><dt>当前状态</dt><dd><Badge value={info.status} /></dd></div></dl>{info.status === 'open' ? <><form id="invite-form" onSubmit={submit} aria-busy={submitting}><Field label="你的姓名或便于辨认的称呼" name="name" required maxLength={80} help="管理者会核对此名称与内部用户标识，请填写真实可辨认的信息。" />{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="button primary full-width" disabled={submitting}>{submitting ? '正在前往微信验证…' : '验证微信身份并申请加入'} <ArrowRight aria-hidden="true" /></button></form><p className="auth-hint">验证身份后仍需管理者确认，不会立即获得应用权限。</p></> : <p className="context-note">此邀请当前不能继续领取。请联系邀请你的管理者。</p>}</>;
}

export function InvitePage() {
  const entry = invitationEntry;
  if (entry.statusPage) return <InviteFrame><StatusPage invitation={entry.invitation} /></InviteFrame>;
  if (entry.error) {
    const messages: Record<string, string> = {
      access_denied: '微信身份验证未完成，或当前账号无法继续领取此邀请。',
      invite_unavailable: '邀请已失效、已领取或无法继续申请，请联系管理者确认。',
      temporarily_unavailable: '微信登录暂时不可用，请从原始邀请链接重试。',
    };
    return <InviteFrame><CircleAlert aria-hidden="true" /><h1>邀请申请未完成</h1><p role="alert">{messages[entry.error] || '邀请验证未完成，请从原始邀请链接重试，或联系管理者。'}</p></InviteFrame>;
  }
  return <InviteFrame><ClaimPage token={entry.token} /></InviteFrame>;
}
