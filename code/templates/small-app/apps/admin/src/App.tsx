import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, LogIn, RefreshCw, ShieldCheck } from 'lucide-react';
import product from '@app/config/product.json';
import { accountName, ApiError, loginTarget, request, roleName, type Overview, type Session } from './api';
import { Header } from './Header';

type Page = 'loading' | 'login' | 'overview' | 'denied' | 'error';
const initialSession: Session = { authenticated: false, loginAvailable: false };
const loginErrors: Record<string, string> = {
  invalid_flow: '登录请求已过期，请重新登录。',
  access_denied: '微信授权未完成，或当前账号没有访问权限。',
  login_failed: '登录未完成，请稍后重试。',
};
const failureMessage = (error: unknown) => error instanceof ApiError ? error.message : '暂时无法连接服务，请稍后重试。';

export function App() {
  const [session, setSession] = useState(initialSession);
  const current = useRef(initialSession);
  const [page, setPage] = useState<Page>('loading');
  const [overview, setOverview] = useState<Overview | null>(null);
  const [notice, setNotice] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const operation = useRef<'load' | 'login' | 'logout' | null>(null);
  const version = useRef(0);
  const pending = useRef<AbortController | null>(null);

  const updateSession = useCallback((next: Session) => {
    current.current = next;
    setSession(next);
  }, []);

  const load = useCallback(async () => {
    if (operation.current) return;
    operation.current = 'load';
    const activeVersion = ++version.current;
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setRefreshing(true);
    setNotice('');
    try {
      const next = await request<Session>('/api/auth/session', { signal: controller.signal });
      if (activeVersion !== version.current) return;
      if (typeof next.authenticated !== 'boolean' || typeof next.loginAvailable !== 'boolean') throw new Error('Invalid session response.');
      updateSession(next);
      const query = new URLSearchParams(location.search);
      const loginError = query.get('error');
      if (loginError) {
        query.delete('error');
        const rest = query.toString();
        history.replaceState(null, '', `${location.pathname}${rest ? `?${rest}` : ''}`);
        setNotice(loginErrors[loginError] || '登录未完成，请重试。');
      }
      if (!next.authenticated) { setOverview(null); setPage('login'); return; }
      if (!next.permissions?.includes(product.auth.permission)) { setOverview(null); setPage('denied'); return; }
      const data = await request<Overview>('/api/admin/overview', { signal: controller.signal }, next.csrfToken);
      if (activeVersion !== version.current) return;
      if (!data.user || !data.app || !Array.isArray(data.user.permissions)) throw new Error('Invalid account response.');
      setOverview(data);
      setPage('overview');
    } catch (error) {
      if (activeVersion !== version.current || controller.signal.aborted) return;
      setOverview(null);
      if (error instanceof ApiError && error.status === 401) {
        updateSession({ authenticated: false, loginAvailable: current.current.loginAvailable });
        setPage('login');
      } else if (error instanceof ApiError && error.status === 403 && current.current.authenticated) {
        setPage('denied');
      } else { setPage('error'); }
      setNotice(failureMessage(error));
    } finally {
      if (operation.current === 'load' && pending.current === controller) operation.current = null;
      if (activeVersion === version.current) setRefreshing(false);
    }
  }, [updateSession]);

  useEffect(() => {
    void load();
    return () => {
      version.current++;
      pending.current?.abort();
      if (operation.current === 'load') operation.current = null;
    };
  }, [load]);

  async function login() {
    if (operation.current || !current.current.loginAvailable) return;
    operation.current = 'login';
    const activeVersion = ++version.current;
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setLoggingIn(true);
    setNotice('');
    try {
      const result = await request<{ url: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ loginVersion: 2 }), signal: controller.signal }, current.current.csrfToken);
      if (activeVersion !== version.current || controller.signal.aborted) return;
      location.assign(loginTarget(result.url));
    } catch (error) {
      if (activeVersion !== version.current || controller.signal.aborted) return;
      setNotice(failureMessage(error));
      operation.current = null;
      setLoggingIn(false);
    }
  }

  async function logout() {
    if (operation.current === 'logout' || operation.current === 'login') return;
    operation.current = 'logout';
    const activeVersion = ++version.current;
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setLoggingOut(true);
    setRefreshing(false);
    setNotice('');
    try {
      await request('/api/auth/logout', { method: 'POST', body: '{}', signal: controller.signal }, current.current.csrfToken);
      if (activeVersion !== version.current || controller.signal.aborted) return;
      updateSession({ authenticated: false, loginAvailable: current.current.loginAvailable });
      setOverview(null);
      setPage('login');
    } catch (error) {
      if (activeVersion !== version.current || controller.signal.aborted) return;
      if (error instanceof ApiError && error.status === 401) {
        updateSession({ authenticated: false, loginAvailable: current.current.loginAvailable });
        setOverview(null);
        setPage('login');
      }
      setNotice(failureMessage(error));
    } finally {
      if (operation.current === 'logout' && pending.current === controller) operation.current = null;
      if (activeVersion === version.current) setLoggingOut(false);
    }
  }

  return <>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <Header session={session} loggingOut={loggingOut} onLogout={() => void logout()} />
    {page === 'loading' && <main id="main" className="shell status-page" role="status">正在连接管理后台…</main>}
    {page === 'login' && <main id="main" className="shell login-layout">
      <div className="login-copy"><p className="eyebrow">管理后台</p><h1>{product.name}</h1><p>登录后查看你的账号与访问权限。</p><a className="back-link" href="/"><ArrowLeft aria-hidden="true" />返回官网</a></div>
      <section className="login-panel" aria-labelledby="login-title"><ShieldCheck className="login-symbol" aria-hidden="true" /><h2 id="login-title">{session.loginAvailable ? '登录管理后台' : '登录暂未开放'}</h2><p>{session.loginAvailable ? '使用微信账号登录。已获授权的成员可以进入此应用。' : '此应用暂时无法登录，请稍后再来。'}</p>
        {session.loginAvailable && <button className="button button-primary login-button" type="button" disabled={loggingIn} onClick={() => void login()}><LogIn aria-hidden="true" />{loggingIn ? '正在打开登录…' : '微信登录'}</button>}
        {notice && <p className="notice" role="alert">{notice}</p>}
      </section>
    </main>}
    {page === 'overview' && overview && <main id="main" className="shell overview">
      <div className="page-heading"><div><h1>账号概览</h1><p>查看当前应用中的身份与访问权限。</p></div><button className="button" type="button" disabled={refreshing || loggingOut} onClick={() => void load()}><RefreshCw aria-hidden="true" />{refreshing ? '正在刷新…' : '刷新'}</button></div>
      {notice && <p className="notice" role="alert">{notice}</p>}
      <section className="detail-section" aria-labelledby="account-heading"><h2 id="account-heading">当前账号</h2><dl className="account-details"><div><dt>显示名称</dt><dd>{accountName(overview.user)}</dd></div><div><dt>应用</dt><dd>{overview.app.name}</dd></div><div><dt>角色</dt><dd>{roleName(overview.user.role)}</dd></div></dl></section>
      <section className="detail-section" aria-labelledby="permissions-heading"><h2 id="permissions-heading">已授权权限</h2><p className="section-description">这些权限决定你在当前应用中可以执行的操作。</p>{overview.user.permissions?.length ? <ul className="permission-list">{overview.user.permissions.map((permission) => <li key={permission}><Check aria-hidden="true" /><code>{permission}</code></li>)}</ul> : <p className="empty-permissions">当前账号尚未分配权限。</p>}</section>
    </main>}
    {page === 'denied' && <main id="main" className="shell status-page"><ShieldCheck className="status-symbol" aria-hidden="true" /><h1>当前账号没有访问权限</h1><p>请联系应用管理员为你分配访问权限。</p><div className="status-actions"><button className="button" type="button" disabled={refreshing || loggingOut} onClick={() => void load()}><RefreshCw aria-hidden="true" />{refreshing ? '正在刷新…' : '刷新权限'}</button><a className="button button-quiet" href="/">返回官网</a></div>{notice && <p className="notice" role="alert">{notice}</p>}</main>}
    {page === 'error' && <main id="main" className="shell status-page"><h1>暂时无法连接</h1><p>{notice || '请稍后重试。'}</p><div className="status-actions"><button className="button button-primary" type="button" disabled={refreshing || loggingOut} onClick={() => void load()}><RefreshCw aria-hidden="true" />{refreshing ? '正在连接…' : '重新连接'}</button><a className="button button-quiet" href="/">返回官网</a></div></main>}
    <footer className="admin-footer shell">{product.name}</footer>
  </>;
}
