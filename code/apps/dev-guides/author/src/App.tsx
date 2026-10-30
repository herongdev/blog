import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpenText, CalendarDays, Check, ChevronDown, CircleAlert, ExternalLink, FilePlus2, ImagePlus, List, LoaderCircle, LogOut, Moon, Plus, QrCode, Save, Sun, Trash2, Upload } from 'lucide-react';
import { parseDocument } from 'yaml';
import { tools } from '../../src/data/tools';
import { themes } from '../../src/data/themes';
import { useWechatLogin, wechatErrorMessage, type AuthorSession } from './useWechatLogin';
import ArticleLibrary, { FolderPicker, folderPath, type LibraryAction, type LibrarySelection, type LibraryState } from './ArticleLibrary';

type ArticleKind = 'draft' | 'content';
type MediaMode = 'direct' | 'staging' | 'incomplete';
type ArticleItem = { kind: ArticleKind; slug: string; title: string; status: string };
type Article = { kind: ArticleKind; slug: string; frontmatter: string; body: string; revision: string };
type ApiFailure = { error?: string };
type AuthState = 'connecting' | 'login' | 'setup' | 'ready';
type Source = { title: string; url: string };
type PublishJob = { id: string; environment: 'staging' | 'production'; status: string; url?: string; error?: string; warning?: string; createdAt: string; finishedAt?: string };
type EnvironmentRelease = { release: string; atUtc: string; url: string; sourceFingerprint: string };
type PublishState = { enabled: boolean; active: PublishJob | null; lastJob: PublishJob | null; environments: { staging: EnvironmentRelease | null; production: EnvironmentRelease | null } };
const RichEditor = lazy(() => import('./RichEditor'));
const ScheduleBoard = lazy(() => import('./ScheduleBoard'));
const BASE = import.meta.env.BASE_URL;
const apiUrl = (path: string) => `${BASE}${path.replace(/^\//, '')}`;
const setupFragment = new URLSearchParams(window.location.hash.slice(1));
const initialSetupToken = setupFragment.get('setup') ?? '';
const initialAuthError = wechatErrorMessage(new URLSearchParams(window.location.search).get('authError'));
if (setupFragment.has('setup')) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
const statusLabels: Record<string, string> = { queued: '等待发布', checking: '正在检查内容', building: '正在生成页面', verifying: '正在核对页面', activating: '正在更新网站', succeeded: '发布成功', failed: '发布失败' };
const runningJob = (job: PublishJob | null | undefined) => Boolean(job && !['succeeded', 'failed'].includes(job.status));
const dateInputValue = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
const articleKey = (article: Pick<ArticleItem, 'kind' | 'slug'>) => `${article.kind}/${article.slug}`;
const snapshot = (article: Article) => `${article.frontmatter}\u0000${article.body}`;

function metadataOf(frontmatter: string) {
  const document = parseDocument(frontmatter);
  let conversionError = '';
  let values: Record<string, unknown> | null = null;
  // A half-edited YAML alias must not unmount the editor or discard unsaved text.
  try { values = document.toJS() as Record<string, unknown> | null; }
  catch { conversionError = '文章信息无法解析，请在高级文章信息中检查别名或引用'; }
  const text = (path: string | string[]) => {
    try { const value = document.getIn(Array.isArray(path) ? path : [path]); return typeof value === 'string' ? value : ''; }
    catch { return ''; }
  };
  const list = (key: string) => { const value = values?.[key]; return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []; };
  const sources = (key: string): Source[] => { const value = values?.[key]; return Array.isArray(value) ? value.map((item) => ({ title: typeof item?.title === 'string' ? item.title : '', url: typeof item?.url === 'string' ? item.url : '' })) : []; };
  return { document, error: document.errors[0]?.message || conversionError, text, list, sources, title: text('title'), summary: text('summary'), tool: text('tool'), status: text('status') };
}


function useCompactEditor() {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 1100px)').matches);
  useEffect(() => { const query = window.matchMedia('(max-width: 1100px)'); const update = () => setCompact(query.matches); query.addEventListener('change', update); update(); return () => query.removeEventListener('change', update); }, []);
  return compact;
}

function useAutoHeight(value: string, visible: boolean) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const resize = () => { const element = ref.current; if (!element || !element.offsetWidth) return; element.style.height = 'auto'; element.style.height = `${element.scrollHeight}px`; };
    resize(); window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [value, visible]);
  return ref;
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => { const stored = window.localStorage.getItem('dev-guides-author-theme'); if (stored === 'light' || stored === 'dark') return stored; return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; });
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem('dev-guides-author-theme', theme); }, [theme]);
  return [theme, setTheme] as const;
}

export default function App() {
  const csrf = useRef('');
  const articleRef = useRef<Article | null>(null);
  const [auth, setAuth] = useState<AuthState>('connecting');
  const [connectionAttempt, setConnectionAttempt] = useState(0);
  const [online, setOnline] = useState(false);
  const [loginAvailable, setLoginAvailable] = useState(false);
  const [setupToken, setSetupToken] = useState(initialSetupToken);
  const [mediaMode, setMediaMode] = useState<MediaMode>('staging');
  const [items, setItems] = useState<ArticleItem[]>([]);
  const [library, setLibrary] = useState<LibraryState | null>(null);
  const [librarySelection, setLibrarySelection] = useState<LibrarySelection>('all');
  const [libraryBusy, setLibraryBusy] = useState(false);
  const libraryLock = useRef(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [savedSnapshots, setSavedSnapshots] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const [promoting, setPromoting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [workspaceView, setWorkspaceView] = useState<'writing' | 'schedule'>(() => {
    try { return window.localStorage.getItem('author-workspace-view') === 'writing' ? 'writing' : 'schedule'; }
    catch { return 'schedule'; }
  });
  const [mobileView, setMobileView] = useState<'list' | 'editor'>('list');
  const [error, setError] = useState(initialAuthError);
  const [notice, setNotice] = useState('');
  const [publish, setPublish] = useState<PublishState | null>(null);
  const [publishBusy, setPublishBusy] = useState(false);
  const [theme, setTheme] = useTheme();
  const compact = useCompactEditor();
  const loadSequence = useRef(0);
  const pendingScheduledDraft = useRef<{ title: string; slug: string } | null>(null);
  const dirty = article !== null && snapshot(article) !== savedSnapshots[articleKey(article)];
  const metadata = useMemo(() => metadataOf(article?.frontmatter ?? ''), [article?.frontmatter]);
  const titleInput = useAutoHeight(metadata.title, auth === 'ready' && mobileView === 'editor');
  const summaryInput = useAutoHeight(metadata.summary, auth === 'ready' && mobileView === 'editor');
  articleRef.current = article;
  useEffect(() => { try { window.localStorage.setItem('author-workspace-view', workspaceView); } catch { /* Storage is optional. */ } }, [workspaceView]);

  const request = useCallback(async <T,>(path: string, options: RequestInit = {}): Promise<T> => {
    const headers = new Headers(options.headers);
    if (options.method && options.method !== 'GET') { if (!csrf.current) throw new Error('请先登录写作台'); headers.set('x-author-token', csrf.current); }
    const response = await fetch(apiUrl(path), { ...options, headers, credentials: 'same-origin' });
    const data = await response.json().catch(() => { throw new Error('写作台暂时无法连接，请稍后重试'); }) as T & ApiFailure;
    if (response.status === 401) { csrf.current = ''; setAuth('login'); setError('登录已过期，请重新登录。未保存的编辑仍保留在当前页面。'); throw new Error('请重新登录后继续'); }
    if (!response.ok) throw Object.assign(new Error(data.error ?? `请求失败（${response.status}）`), { status: response.status });
    return data;
  }, []);

  const loadItems = useCallback(async () => { const result = await request<{ items: ArticleItem[] }>('/api/articles'); setItems(result.items); return result.items; }, [request]);
  useEffect(() => {
    if (library && !['all', 'unfiled'].includes(librarySelection) && !library.folders.some((folder) => folder.id === librarySelection)) setLibrarySelection('all');
  }, [library, librarySelection]);
  const loadLibrary = useCallback(async () => { const result = await request<LibraryState>('/api/library'); setLibrary(result); return result; }, [request]);
  const changeLibrary = useCallback(async (action: LibraryAction, revision = library?.revision): Promise<LibraryState> => {
    if (!library || libraryLock.current) throw new Error('目录正在更新，请稍后重试');
    libraryLock.current = true; setLibraryBusy(true);
    try {
      const result = await request<LibraryState>('/api/library/actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...action, revision }) });
      setLibrary(result); setNotice(action.action === 'assign' ? '文章目录已更新' : '目录已更新'); return result;
    } catch (problem) {
      if ((problem as Error & { status?: number }).status === 409) { await loadLibrary().catch(() => undefined); }
      throw problem;
    } finally { libraryLock.current = false; setLibraryBusy(false); }
  }, [library, request, loadLibrary]);
  const refreshLibrary = useCallback(async () => { try { await Promise.all([loadItems(), loadLibrary()]); } catch (problem) { setError((problem as Error).message); } }, [loadItems, loadLibrary]);
  const refreshPublish = useCallback(async () => { try { const result = await request<PublishState>('/api/publish'); setPublish(result); } catch (problem) { if ((problem as Error).message === '请重新登录后继续') return; /* Local writing does not require publishing service. */ } }, [request]);

  const openArticle = useCallback(async (item: ArticleItem, skipConfirm = false) => {
    if (articleRef.current && articleKey(articleRef.current) === articleKey(item)) { ++loadSequence.current; setLoading(false); setWorkspaceView('writing'); setMobileView('editor'); return; }
    if (!skipConfirm && dirty && !window.confirm('当前文章有未保存的更改，确定离开吗？')) return;
    setWorkspaceView('writing');
    const sequence = ++loadSequence.current;
    setMobileView('editor'); setLoading(true); setError(''); setNotice('');
    try { const data = await request<Article>(`/api/articles/${item.kind}/${item.slug}`); if (sequence !== loadSequence.current) return; setArticle(data); setSavedSnapshots((previous) => ({ ...previous, [articleKey(data)]: snapshot(data) })); }
    catch (problem) { if (sequence === loadSequence.current) setError((problem as Error).message); }
    finally { if (sequence === loadSequence.current) setLoading(false); }
  }, [dirty, request]);

  const connectWorkspace = useCallback(async (loadPublishing = false) => {
    const session = await request<{ token: string; mediaMode: MediaMode }>('/api/session');
    csrf.current = session.token; setMediaMode(session.mediaMode); setAuth('ready');
    const [result, tree] = await Promise.all([request<{ items: ArticleItem[] }>('/api/articles'), request<LibraryState>('/api/library')]); setItems(result.items); setLibrary(tree);
    // Reauthentication must not replace an article that still has unsaved edits.
    if (!articleRef.current && result.items.length > 0) { const item = result.items[0]; const data = await request<Article>(`/api/articles/${item.kind}/${item.slug}`); if (!articleRef.current) { setArticle(data); setSavedSnapshots((previous) => ({ ...previous, [articleKey(data)]: snapshot(data) })); } }
    setLoading(false); if (loadPublishing) void refreshPublish();
  }, [request, refreshPublish]);

  const finishWechatLogin = useCallback(async () => {
    setSetupToken(''); setError(''); setNotice('');
    await connectWorkspace(true);
  }, [connectWorkspace]);
  const wechatLogin = useWechatLogin({ apiUrl, setupToken, hasUnsavedChanges: dirty, onAuthenticated: finishWechatLogin, onError: setError });
  const authBusy = wechatLogin.phase !== 'idle';

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(apiUrl('/api/auth/session'), { credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]) });
        if (!active) return;
        if (response.status === 404) { setOnline(false); await connectWorkspace(); return; }
        if (!response.ok) throw new Error('无法连接写作台，请稍后重试');
        const session = await response.json() as AuthorSession;
        if (!active) return;
        if (session.mode === 'local' || session.online === false) { setOnline(false); await connectWorkspace(); return; }
        setOnline(true);
        setLoginAvailable(session.provider === 'wechat' && session.loginAvailable === true);
        if (session.authenticated) await connectWorkspace(true);
        else { setAuth(session.setupRequired ? 'setup' : 'login'); setLoading(false); }
      } catch { if (active) { setError('无法连接写作台，请重试。'); setAuth('login'); setLoading(false); } }
    })();
    return () => { active = false; controller.abort(); };
  }, [connectWorkspace, connectionAttempt]);

  useEffect(() => { if (auth !== 'ready' || !publish?.enabled) return; const interval = window.setInterval(() => void refreshPublish(), publish.active ? 1800 : 15000); return () => window.clearInterval(interval); }, [auth, publish?.enabled, Boolean(publish?.active), refreshPublish]);
  useEffect(() => { const beforeUnload = (event: BeforeUnloadEvent) => { if (!dirty) return; event.preventDefault(); event.returnValue = ''; }; window.addEventListener('beforeunload', beforeUnload); return () => window.removeEventListener('beforeunload', beforeUnload); }, [dirty]);

  const logout = async () => {
    if (dirty && !window.confirm('当前文章有未保存的更改，退出会丢弃这些更改。确定退出吗？')) return;
    try { await request('/api/auth/logout', { method: 'POST' }); csrf.current = ''; setArticle(null); articleRef.current = null; setItems([]); setLibrary(null); setLibrarySelection('all'); setSavedSnapshots({}); setPublish(null); setAuth('login'); setError(''); setNotice(''); } catch (problem) { setError((problem as Error).message); }
  };

  const updateField = (path: string | string[], value: unknown) => {
    if (!article || metadata.error) return;
    const document = parseDocument(article.frontmatter); const keys = (Array.isArray(path) ? path : [path]).map((key) => /^\d+$/.test(key) ? Number(key) : key);
    if (value === undefined) document.deleteIn(keys); else document.setIn(keys, value);
    if (path === 'status' && value === 'lead') {
      const verification = document.getIn(['verification', 'testedAt']);
      if (typeof verification === 'string' && verification.includes('REPLACE_WITH_')) document.delete('verification');
      document.delete('videoUrl'); document.set('featured', false);
    }
    setArticle({ ...article, frontmatter: document.toString().trimEnd() }); setNotice('');
  };

  const save = useCallback(async (): Promise<Article | null> => {
    if (!article || saving) return null;
    if (!dirty) return article;
    if (metadata.error) { setError('文章信息格式有误，请在高级信息中修正'); return null; }
    setSaving(true); setError(''); setNotice(''); const target = { ...article };
    try {
      const result = await request<{ revision: string }>(`/api/articles/${target.kind}/${target.slug}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ frontmatter: target.frontmatter, body: target.body, revision: target.revision }) });
      const updated = { ...target, revision: result.revision };
      setSavedSnapshots((previous) => ({ ...previous, [articleKey(target)]: snapshot(target) }));
      setArticle((current) => current && articleKey(current) === articleKey(target) ? { ...current, revision: result.revision } : current);
      setItems((previous) => previous.map((item) => articleKey(item) === articleKey(target) ? { ...item, title: metadataOf(target.frontmatter).title || item.slug, status: metadataOf(target.frontmatter).status || item.status } : item));
      setNotice(online ? '已保存，可在其他设备继续编辑' : '已保存到本地文件');
      return updated;
    } catch (problem) { setError((problem as Error).message); return null; }
    finally { setSaving(false); }
  }, [article, dirty, saving, metadata.error, request, online]);

  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); if (auth === 'ready') void save(); } }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown); }, [save, auth]);

  const createDraft = async (event: React.FormEvent) => {
    event.preventDefault(); if (dirty && !window.confirm('当前文章有未保存的更改，确定新建吗？')) return;
    setCreating(true); setError('');
    try {
      const folderId = ['all', 'unfiled'].includes(librarySelection) ? null : librarySelection;
      const result = await request<{ kind: ArticleKind; slug: string }>('/api/drafts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: newTitle.trim(), slug: newSlug.trim() }) });
      const [, freshLibrary] = await Promise.all([loadItems(), loadLibrary()]);
      await openArticle({ ...result, title: newTitle.trim(), status: 'draft' }, true); setNewTitle(''); setNewSlug(''); setShowCreate(false);
      if (folderId) { try { await changeLibrary({ action: 'assign', articleKey: articleKey(result), folderId }, freshLibrary.revision); } catch (problem) { setError(`草稿已创建在“未分类”，移动目录失败：${(problem as Error).message}`); } }
    }
    catch (problem) { setError((problem as Error).message); }
    finally { setCreating(false); }
  };

  const createScheduledDraft = async (title: string, _placement: 'front' | 'end'): Promise<{ slug: string }> => {
    const normalizedTitle = title.trim();
    if (pendingScheduledDraft.current?.title !== normalizedTitle) pendingScheduledDraft.current = { title: normalizedTitle, slug: `idea-${crypto.randomUUID()}` };
    const { slug } = pendingScheduledDraft.current;
    let result: { kind: ArticleKind; slug: string };
    try { result = await request<typeof result>('/api/drafts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: normalizedTitle, slug }) }); }
    catch (problem) {
      // The creation may have succeeded before its response was lost. Reuse its ID on retry.
      const existing = await request<Article>(`/api/articles/draft/${slug}`).catch(() => null);
      if (!existing || metadataOf(existing.frontmatter).title !== normalizedTitle) throw problem;
      result = { kind: existing.kind, slug: existing.slug };
    }
    pendingScheduledDraft.current = null;
    // Keep the draft visible even if the subsequent refresh loses connectivity.
    setItems((previous) => [...previous.filter((item) => articleKey(item) !== articleKey(result)), { ...result, title: normalizedTitle, status: 'draft' }]);
    await Promise.all([loadItems(), loadLibrary()]).catch(() => undefined);
    return result;
  };

  const promote = async () => {
    if (!article || !['lead', 'published'].includes(metadata.status)) { setError('先在发布信息中选择“功能线索”或“实测教程”'); return; }
    if (!window.confirm('将这篇文章加入网站发布内容？网站更新后，读者可以看到它。')) return;
    const saved = await save(); if (!saved) return; setPromoting(true); setError('');
    try { const result = await request<Article>(`/api/articles/draft/${saved.slug}/promote`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ revision: saved.revision }) }); setArticle(result); setSavedSnapshots((previous) => ({ ...previous, [articleKey(result)]: snapshot(result) })); await Promise.all([loadItems(), loadLibrary()]); setNotice('已加入发布内容，请先更新测试环境查看效果'); }
    catch (problem) { setError((problem as Error).message); }
    finally { setPromoting(false); }
  };

  const beginPublish = async (environment: 'staging' | 'production') => {
    if (dirty) { setError('请先保存当前文章，再发布网站'); return; }
    if (environment === 'production' && !window.confirm('将更新正式网站的全部发布内容，读者将看到本次版本。请确认已检查测试环境。继续发布吗？')) return;
    setPublishBusy(true); setError('');
    try { await request('/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ environment }) }); await refreshPublish(); setNotice(environment === 'staging' ? '正在更新测试环境，可继续写作' : '正在发布正式网站，可继续写作'); }
    catch (problem) { setError((problem as Error).message); }
    finally { setPublishBusy(false); }
  };

  const uploadImages = useCallback(async (files: File[]) => {
    if (!article) throw new Error('请先打开文章'); setError(''); const results = [];
    for (const file of files) {
      const imageType = file.type || ({ png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' } as Record<string, string>)[file.name.split('.').pop()?.toLowerCase() ?? ''];
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(imageType)) throw new Error('只支持 PNG、JPEG 或 WebP 图片');
      if (file.size > 15 * 1024 * 1024) throw new Error('单张图片不能超过 15 MiB');
      try { const data = await request<{ url: string; storage: 'remote' | 'staging' }>(`/api/articles/${article.kind}/${article.slug}/images`, { method: 'POST', headers: { 'Content-Type': imageType }, body: file }); results.push({ url: data.url, alt: file.name.replace(/\.[^.]+$/, '') }); setNotice(data.storage === 'staging' ? '图片已暂存；发布前需上传图片存储' : '图片已上传并验证可访问'); }
      catch (problem) { setError((problem as Error).message); throw problem; }
    }
    return results;
  }, [article, request]);

  const busy = publishBusy || saving || promoting || imageBusy || runningJob(publish?.active);
  const lastJob = publish?.active ?? publish?.lastJob;
  const themeButton = <button className="theme-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}>{theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}</button>;
  const messages = <>{error && <div className="message message-error" role="alert"><CircleAlert size={17} aria-hidden="true" /><span>{error}</span><button type="button" onClick={() => setError('')} aria-label="关闭错误提示">关闭</button></div>}{notice && !error && <div className="message message-success" role="status"><Check size={17} aria-hidden="true" /><span>{notice}</span><button type="button" onClick={() => setNotice('')} aria-label="关闭状态提示">关闭</button></div>}</>;

  if (auth !== 'ready') return <div className="auth-shell"><div className="auth-theme">{themeButton}</div><main className="auth-card">
    <BookOpenText size={28} aria-hidden="true" />
    <h1>登录教程写作台</h1>
    <p>{auth === 'setup' && setupToken ? '首次登录将把此微信绑定为管理员，请使用你自己的微信。' : '使用管理员微信，继续写作与发布。'}</p>
    {messages}
    {dirty && <p className="auth-preserved">未保存的编辑仍保留在本页，微信登录后可继续保存。请勿刷新或关闭本页。</p>}
    {auth === 'connecting' ? <div className="auth-loading" role="status"><LoaderCircle className="spin" size={22} aria-hidden="true" />正在连接…</div> : <div className="auth-actions">
      {!loginAvailable ? <p className="auth-help" role="status">微信登录暂不可用，请稍后重试。</p> : auth === 'setup' && !setupToken ? <p className="auth-help" role="status">写作台尚未绑定管理员。请从你的管理员专用入口完成首次微信登录。</p> : <>
        <button className="save-button auth-submit" type="button" onClick={() => void wechatLogin.start()} disabled={authBusy}>
          {authBusy ? <LoaderCircle className="spin" size={18} aria-hidden="true" /> : <QrCode size={18} aria-hidden="true" />}
          {wechatLogin.phase === 'opening' ? '正在打开微信…' : wechatLogin.phase === 'waiting' ? '等待微信确认…' : '微信登录'}
        </button>
        {authBusy ? <><p className="auth-help" role="status">在微信登录页扫码并确认，完成后会自动进入写作台。</p><button className="secondary-button auth-cancel" type="button" onClick={wechatLogin.cancel}>取消等待</button></> : <p className="auth-help">{compact ? '如无法在手机上完成扫码，请在电脑上打开写作台登录。' : '将在新窗口打开微信扫码登录。'}</p>}
      </>}
      {!loginAvailable && <button className="secondary-button" type="button" onClick={() => { setError(''); setAuth('connecting'); setConnectionAttempt((value) => value + 1); }}>重新连接</button>}
      <a className="inline-link auth-return" href="../" onClick={(event) => { if (dirty && !window.confirm('当前文章有未保存的更改，离开会丢失这些更改。确定离开吗？')) event.preventDefault(); }}>浏览公开教程</a>
    </div>}
  </main></div>;

  return <div className={`app-shell mobile-${mobileView}`}>
    <header className="topbar"><div className="brand"><BookOpenText size={22} aria-hidden="true" /><span>教程写作</span><span className="brand-sub">何荣开发工具库</span></div><div className="topbar-actions"><span className={`media-state media-state-${mediaMode}`}>{mediaMode === 'direct' ? '图片直传' : mediaMode === 'incomplete' ? '图片配置未完成' : '图片暂存'}</span>{themeButton}{online && <button className="icon-text-button" type="button" onClick={() => void logout()}><LogOut size={17} aria-hidden="true" /><span>退出</span></button>}</div></header>
    <nav className="workspace-tabs" aria-label="工作区"><button type="button" aria-current={workspaceView === 'schedule' ? 'page' : undefined} onClick={() => setWorkspaceView('schedule')}><CalendarDays size={18} aria-hidden="true" />拍摄排期</button><button type="button" aria-current={workspaceView === 'writing' ? 'page' : undefined} onClick={() => setWorkspaceView('writing')}><BookOpenText size={18} aria-hidden="true" />文章写作{dirty && <span className="workspace-dirty">未保存</span>}</button></nav>
    {workspaceView === 'schedule' ? <><div className="workspace-messages">{messages}</div><Suspense fallback={<div className="welcome"><LoaderCircle className="spin" size={24} aria-hidden="true" /><p>正在打开拍摄排期…</p></div>}><ScheduleBoard request={request} articles={items} onOpen={(item) => void openArticle(item)} onCreate={createScheduledDraft} /></Suspense></> : <>
    <nav className="mobile-navigation" aria-label="写作导航"><button type="button" aria-current={mobileView === 'list' ? 'page' : undefined} onClick={() => setMobileView('list')}><List size={18} aria-hidden="true" />文章</button><button type="button" aria-current={mobileView === 'editor' ? 'page' : undefined} onClick={() => setMobileView('editor')} disabled={!article}><BookOpenText size={18} aria-hidden="true" />编辑</button></nav>
    <div className="workspace-messages">{messages}</div>
    <div className="workspace"><aside className="sidebar" aria-label="文章列表"><div className="sidebar-heading"><h2>我的教程</h2><button type="button" className="new-button" onClick={() => setShowCreate((value) => !value)} aria-expanded={showCreate}><FilePlus2 size={17} aria-hidden="true" />新建</button></div>
      {showCreate && <form className="new-form" onSubmit={createDraft}><label htmlFor="new-title">教程标题</label><input id="new-title" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="例如：Codex 怎么并行改代码？" minLength={2} maxLength={160} required autoFocus /><label htmlFor="new-slug">文章地址</label><input id="new-slug" value={newSlug} onChange={(event) => setNewSlug(event.target.value.toLowerCase())} placeholder="codex-worktrees" pattern="[a-z0-9]+(-[a-z0-9]+)*" required /><p>保存到：{library && !['all', 'unfiled'].includes(librarySelection) ? folderPath(library.folders, librarySelection) : '未分类'}。文章地址使用英文小写、数字和连字符。</p><button className="create-submit" type="submit" disabled={creating || libraryBusy}>{creating ? '正在创建…' : '创建草稿'}</button></form>}
      <ArticleLibrary library={library} items={items} activeKey={article ? articleKey(article) : undefined} selection={librarySelection} busy={libraryBusy || creating} onSelect={setLibrarySelection} onOpen={(item) => void openArticle(item)} onAction={changeLibrary} onRefresh={refreshLibrary} />
      {publish?.enabled && <section className="publish-panel" aria-label="网站发布"><h2>网站发布</h2><p className="field-help">更新“发布内容”中的全部文章，草稿不会公开。</p>{lastJob && <div className={`publish-progress ${lastJob.status === 'failed' ? 'is-error' : ''}`} role="status">{runningJob(lastJob) && <LoaderCircle className="spin" size={16} aria-hidden="true" />}<span>{lastJob.environment === 'staging' ? '测试环境' : '正式网站'}：{statusLabels[lastJob.status] ?? lastJob.status}</span></div>}{lastJob?.error && <p className="field-error" role="alert">{lastJob.error}</p>}{lastJob?.warning && <p className="field-help" role="status">{lastJob.warning}</p>}<div className="publish-actions"><button type="button" className="secondary-button" disabled={busy || dirty} onClick={() => void beginPublish('staging')}><Upload size={16} aria-hidden="true" />更新测试环境</button>{publish.environments.staging && <a className="inline-link" href={publish.environments.staging.url} target="_blank" rel="noreferrer">查看测试网站<ExternalLink size={14} aria-hidden="true" /></a>}<button type="button" className="save-button" disabled={busy || dirty || !publish.environments.staging} onClick={() => void beginPublish('production')}><Upload size={16} aria-hidden="true" />发布正式网站</button>{publish.environments.production && <a className="inline-link" href={publish.environments.production.url} target="_blank" rel="noreferrer">查看正式网站<ExternalLink size={14} aria-hidden="true" /></a>}</div>{dirty && <p className="field-help">先保存当前更改，再发布网站。</p>}</section>}
    </aside><main className="main-content">{loading ? <div className="welcome"><LoaderCircle className="spin" size={26} aria-hidden="true" /><p>正在打开教程…</p></div> : article ? <><div className="article-topline"><span className="article-location">{library ? folderPath(library.folders, library.assignments[articleKey(article)]) : '我的教程'} / {article.kind === 'draft' ? '草稿' : '发布内容'}</span><div className="save-actions"><span className={`save-status ${dirty ? 'is-dirty' : ''}`}>{saving ? '保存中…' : dirty ? '有未保存的更改' : '已保存'}</span><button type="button" className="save-button" onClick={() => void save()} disabled={!dirty || saving || imageBusy || Boolean(metadata.error)}>{saving ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <Save size={17} aria-hidden="true" />}保存</button></div></div>
      <div className="article-fields"><label className="sr-only" htmlFor="article-title">教程标题</label><textarea ref={titleInput} id="article-title" className="title-input" value={metadata.title} onChange={(event) => updateField('title', event.target.value.replace(/[\r\n]+/g, ' '))} placeholder="用读者会搜索的问题写标题" rows={1} disabled={Boolean(metadata.error)} /><label className="sr-only" htmlFor="article-summary">一句话摘要</label><textarea ref={summaryInput} id="article-summary" className="summary-input" value={metadata.summary} onChange={(event) => updateField('summary', event.target.value)} placeholder="一句话说明能解决什么问题" rows={2} disabled={Boolean(metadata.error)} /><div className="field-row"><label htmlFor="article-tool">工具</label><span className="select-wrap"><select id="article-tool" value={metadata.tool} onChange={(event) => updateField('tool', event.target.value)} disabled={Boolean(metadata.error)}><option value="">选择工具</option>{tools.map((tool) => <option value={tool.slug} key={tool.slug}>{tool.name}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></span><span className="article-folder-field"><span id="article-folder-label">目录</span><FolderPicker folders={library?.folders ?? []} value={library?.assignments[articleKey(article)] ?? null} label="文章所在目录" disabled={!library || libraryBusy || promoting} onChange={(folderId) => { void changeLibrary({ action: 'assign', articleKey: articleKey(article), folderId }).catch((problem) => setError((problem as Error).message)); }} /></span><span className="format-hint">Markdown 正文 · 可粘贴或拖入截图</span></div></div>
      <div className="editor-tools"><button className="secondary-button" type="button" disabled={imageBusy} onClick={() => imageInput.current?.click()}>{imageBusy ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <ImagePlus size={17} aria-hidden="true" />}{imageBusy ? '正在上传截图…' : '添加截图'}</button><input ref={imageInput} className="file-input" type="file" accept="image/png,image/jpeg,image/webp" multiple aria-label="选择教程截图" onChange={async (event) => { const files = Array.from(event.target.files ?? []); event.target.value = ''; if (!files.length) return; const targetKey = articleKey(article); setImageBusy(true); try { const images = await uploadImages(files); setArticle((current) => current && articleKey(current) === targetKey ? { ...current, body: `${current.body.trimEnd()}\n\n${images.map((image) => `![${image.alt.replace(/[\[\]\r\n]/g, '')}](${image.url})`).join('\n\n')}\n` } : current); } catch { /* uploadImages already reports an actionable error. */ } finally { setImageBusy(false); } }} /><span className="field-help">插入到正文末尾，可继续编辑位置和说明。</span></div>
      <div className="editor-wrap" aria-label="Markdown 正文编辑区"><Suspense fallback={<div className="welcome"><LoaderCircle className="spin" size={22} aria-hidden="true" /><p>正在打开编辑器…</p></div>}><RichEditor key={articleKey(article)} kind={article.kind} slug={article.slug} value={article.body} onChange={(body) => setArticle((current) => current ? { ...current, body } : current)} compact={compact} uploadImages={uploadImages} /></Suspense></div>
      <details className="metadata-panel" open={article.kind === 'draft' || undefined}><summary><ChevronDown size={17} aria-hidden="true" /><span>发布信息</span><span className="metadata-subtitle">搜索线索、来源、实测和视频</span></summary><div className="metadata-body"><div className="metadata-grid"><label>内容类型<select value={metadata.status} onChange={(event) => updateField('status', event.target.value)} disabled={Boolean(metadata.error)}>{article.kind === 'draft' && <option value="draft">草稿，暂不发布</option>}<option value="lead">功能线索，尚未实测</option><option value="published">实测教程</option></select></label><label>更新日期<input type="date" value={dateInputValue(metadata.text('updatedAt'))} onChange={(event) => updateField('updatedAt', event.target.value)} /></label><label>软件版本<input value={metadata.text('version')} onChange={(event) => updateField('version', event.target.value)} placeholder="实际使用的版本" /></label><label>平台与前置条件<input value={metadata.text('platform')} onChange={(event) => updateField('platform', event.target.value)} placeholder="系统、套餐或权限" /></label></div><label htmlFor="search-clues">搜索线索，一行一个</label><textarea id="search-clues" rows={3} value={metadata.list('searchClues').join('\n')} onChange={(event) => updateField('searchClues', event.target.value.split('\n'))} placeholder="读者可能记住的按钮名、口播词或问题" /><p className="field-help">实测教程至少填写两条，帮助读者凭零碎印象找到文章。</p>
        <div className="sources-heading"><h3>官方来源</h3><button className="icon-text-button" type="button" onClick={() => updateField('officialSources', [...metadata.sources('officialSources'), { title: '', url: '' }])}><Plus size={16} aria-hidden="true" />添加</button></div>{metadata.sources('officialSources').map((source, index) => <div className="source-row" key={index}><label><span className="sr-only">官方来源 {index + 1} 标题</span><input value={source.title} placeholder="文档标题" onChange={(event) => updateField(['officialSources', String(index), 'title'], event.target.value)} /></label><label><span className="sr-only">官方来源 {index + 1} 链接</span><input type="url" value={source.url} placeholder="https://…" onChange={(event) => updateField(['officialSources', String(index), 'url'], event.target.value)} /></label><button className="theme-button" type="button" aria-label={`删除官方来源 ${index + 1}`} onClick={() => updateField('officialSources', metadata.sources('officialSources').filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={17} aria-hidden="true" /></button></div>)}
        <fieldset className="verification-fields"><legend>亲测记录</legend><div className="metadata-grid"><label>实测日期<input type="date" value={dateInputValue(metadata.text(['verification', 'testedAt']))} onChange={(event) => updateField(['verification', 'testedAt'], event.target.value)} /></label><label>实测环境<input value={metadata.text(['verification', 'environment'])} onChange={(event) => updateField(['verification', 'environment'], event.target.value)} placeholder="系统、版本和账号条件" /></label></div><label>实际结果<textarea rows={3} value={metadata.text(['verification', 'result'])} onChange={(event) => updateField(['verification', 'result'], event.target.value)} placeholder="操作后观察到的结果和限制" /></label></fieldset>
        <label htmlFor="video-url">原视频链接（选填）</label><input id="video-url" type="url" value={metadata.text('videoUrl')} onChange={(event) => updateField('videoUrl', event.target.value || undefined)} placeholder="https://…" /><fieldset className="theme-fields"><legend>主题（选填）</legend>{themes.map((item) => <label key={item.slug}><input type="checkbox" checked={metadata.list('themes').includes(item.slug)} onChange={(event) => updateField('themes', event.target.checked ? [...metadata.list('themes'), item.slug] : metadata.list('themes').filter((value) => value !== item.slug))} />{item.name}</label>)}</fieldset>
        <details className="advanced-metadata"><summary>高级文章信息</summary><label htmlFor="frontmatter">全部字段（YAML）</label><textarea id="frontmatter" className="frontmatter-input" spellCheck={false} value={article.frontmatter} onChange={(event) => { setArticle({ ...article, frontmatter: event.target.value }); setNotice(''); }} /></details>{metadata.error && <p className="field-error" role="alert">文章信息格式有误：{metadata.error}</p>}{article.kind === 'draft' && <div className="promote-actions"><button className="secondary-button" type="button" disabled={promoting || saving || imageBusy || !['lead', 'published'].includes(metadata.status) || Boolean(metadata.error)} onClick={() => void promote()}>{promoting ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <Upload size={17} aria-hidden="true" />}加入发布内容</button><p className="field-help">先选择内容类型并补全信息，再更新测试环境查看效果。</p></div>}</div></details>
      <div className="editor-bottom-actions"><button className="icon-text-button" type="button" onClick={() => setMobileView('list')}><ArrowLeft size={17} aria-hidden="true" />返回文章与发布</button><button className="save-button" type="button" disabled={!dirty || saving || imageBusy || Boolean(metadata.error)} onClick={() => void save()}><Save size={17} aria-hidden="true" />保存</button></div>
    </> : <div className="welcome"><ImagePlus size={30} aria-hidden="true" /><h1>开始写第一篇教程</h1><p>选择“新建”，填标题与文章地址即可开始。</p></div>}</main></div></>}
  </div>;
}
