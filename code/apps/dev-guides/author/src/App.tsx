import { useToast } from './AuthorToast';
import IconButton from './IconButton';
import AuthorDialogContent from './AuthorDialogContent';
import AuthorSelect from './AuthorSelect';
import HelpTip from './HelpTip';
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Menu from '@radix-ui/react-dropdown-menu';
import { ArrowLeft, BookOpenText, CalendarDays, ChevronDown, CircleAlert, ExternalLink, FileInput, FilePlus2, Film, FolderOpen, ImagePlus, List, LoaderCircle, LogOut, Moon, Plus, QrCode, Save, Send, Sun, Trash2, Upload } from 'lucide-react';
import { parseDocument } from 'yaml';
import { MAX_IMPORT_BYTES, parseMarkdownImport, type MarkdownImport } from './markdown-import';
import { tools } from '../../src/data/tools';
import { themes } from '../../src/data/themes';
import { useWechatLogin, wechatErrorMessage, type AuthorSession } from './useWechatLogin';
import ArticleLibrary, { FolderPicker, folderPath, type LibraryAction, type LibrarySelection, type LibraryState } from './ArticleLibrary';

type ArticleKind = 'draft' | 'content';
type MediaMode = 'direct' | 'staging' | 'incomplete';
type ArticleItem = { kind: ArticleKind; slug: string; title: string; status: string; archived?: boolean; archivedAt?: string; archiveReason?: string };
type Article = { kind: ArticleKind; slug: string; frontmatter: string; body: string; revision: string };
type ContentTab = 'filming' | 'article' | 'video' | 'assets' | 'publish';
type CreateTab = 'article' | 'video' | 'assets';
type PendingContentDraft = { title: string; customSlug: string; slug: string; folderId: string | null; uncertain: boolean; assigned: boolean; result?: { kind: ArticleKind; slug: string } };
type ApiFailure = { error?: string };
type AuthState = 'connecting' | 'login' | 'setup' | 'ready';
type Source = { title: string; url: string };
type PublishJob = { id: string; environment: 'staging' | 'production'; status: string; url?: string; error?: string; warning?: string; createdAt: string; finishedAt?: string };
type EnvironmentRelease = { release: string; atUtc: string; url: string; sourceFingerprint: string };
type PublishState = { enabled: boolean; active: PublishJob | null; lastJob: PublishJob | null; environments: { staging: EnvironmentRelease | null; production: EnvironmentRelease | null } };
const RichEditor = lazy(() => import('./RichEditor'));
const ScheduleBoard = lazy(() => import('./ScheduleBoard'));
const PublishingCenter = lazy(() => import('./PublishingCenter'));
const ContentWorkspace = lazy(() => import('./ContentWorkspace'));
const BASE = import.meta.env.BASE_URL;
const apiUrl = (path: string) => `${BASE}${path.replace(/^\//, '')}`;

function AuthorBrand({ large = false }: { large?: boolean }) {
  return <span className={`author-brand-mark${large ? ' author-brand-mark--large' : ''}`} role="img" aria-label="何荣 HR">
    <img className="author-brand-mark__light" src={`${BASE}logo-hr-light.svg`} width="52" height="36" alt="" aria-hidden="true" />
    <img className="author-brand-mark__dark" src={`${BASE}logo-hr-dark.svg`} width="52" height="36" alt="" aria-hidden="true" />
  </span>;
}

const setupFragment = new URLSearchParams(window.location.hash.slice(1));
const initialSetupToken = setupFragment.get('setup') ?? '';
const initialAuthError = wechatErrorMessage(new URLSearchParams(window.location.search).get('authError'));
if (setupFragment.has('setup')) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
const statusLabels: Record<string, string> = { queued: '等待发布', checking: '正在检查内容', building: '正在生成页面', verifying: '正在核对页面', activating: '正在更新网站', succeeded: '发布成功', failed: '发布失败' };
const contentStatusLabels: Record<string, string> = { draft: '草稿', lead: '功能线索，尚未实测', published: '实测教程' };
const runningJob = (job: PublishJob | null | undefined) => Boolean(job && !['succeeded', 'failed'].includes(job.status));
const dateInputValue = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
const articleKey = (article: Pick<ArticleItem, 'kind' | 'slug'>) => `${article.kind}/${article.slug}`;
const snapshot = (article: Article) => `${article.frontmatter}\u0000${article.body}`;
const createOptions = [
  { tab: 'article', label: '添加文章', action: '创建并写文章', help: '先保存为工作稿，准备好后再发布。', Icon: FilePlus2 },
  { tab: 'video', label: '添加视频', action: '创建并添加视频', help: '创建后可上传成片，无需先写文章。上传不会发布。', Icon: Film },
  { tab: 'assets', label: '添加资源', action: '创建并添加资源', help: '创建后可保存原片、图片、音频或剪辑工程，仅自己可见。', Icon: FolderOpen },
] as const;

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
  const itemsSequence = useRef(0);
  const [archivedItems, setArchivedItems] = useState<ArticleItem[]>([]); const [archiveLoading, setArchiveLoading] = useState(false); const archiveSequence = useRef(0);
  const [library, setLibrary] = useState<LibraryState | null>(null);
  const [librarySelection, setLibrarySelection] = useState<LibrarySelection>('all');
  const [libraryBusy, setLibraryBusy] = useState(false);
  const libraryLock = useRef(false); const librarySequence = useRef(0);
  const [article, setArticle] = useState<Article | null>(null);
  const [savedSnapshots, setSavedSnapshots] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const [importTarget, setImportTarget] = useState<Article | null>(null);
  const [importText, setImportText] = useState('');
  const [importResult, setImportResult] = useState<MarkdownImport | null>(null);
  const [importError, setImportError] = useState('');
  const [importReading, setImportReading] = useState(false);
  const importReadSequence = useRef(0);
  const importButton = useRef<HTMLButtonElement>(null);
  const importInput = useRef<HTMLTextAreaElement>(null);
  const importFileInput = useRef<HTMLInputElement>(null);
  const [promoting, setPromoting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [createTab, setCreateTab] = useState<CreateTab | null>(null);
  const [createError, setCreateError] = useState('');
  const createLock = useRef(false);
  const pendingContentDraft = useRef<PendingContentDraft | null>(null);
  const createMenuOpening = useRef(false);
  const createNavigating = useRef(false);
  const createButton = useRef<HTMLButtonElement>(null);
  const createTitleInput = useRef<HTMLInputElement>(null);
  const [workspaceView, setWorkspaceView] = useState<'writing' | 'schedule' | 'publishing'>(() => {
    try { const saved = window.localStorage.getItem('author-workspace-view'); return saved === 'writing' || saved === 'publishing' ? saved : 'schedule'; }
    catch { return 'schedule'; }
  });
  const [workspacePending, setWorkspacePending] = useState(false);
  const [contentTab, setContentTab] = useState<ContentTab>('article');
  const [publishingContext, setPublishingContext] = useState<{slug:string;title:string;contentId?:string;videoAssetId?:string}|null>(null);
  const articleOrigin = useRef<'schedule'|'writing'>('schedule');
  const [mobileView, setMobileView] = useState<'list' | 'editor'>('list');
  const [error, setError] = useState(initialAuthError);
  const notify = useToast();
  const [publish, setPublish] = useState<PublishState | null>(null);
  const [publishBusy, setPublishBusy] = useState(false);
  const [theme, setTheme] = useTheme();
  const compact = useCompactEditor();
  const loadSequence = useRef(0);
  const pendingScheduledDraft = useRef<{ title: string; slug: string } | null>(null);
  const dirty = article !== null && snapshot(article) !== savedSnapshots[articleKey(article)];
  const savedContentTitle = useMemo(() => { if (!article) return ''; const saved = savedSnapshots[articleKey(article)]; return saved ? metadataOf(saved.split('\u0000', 1)[0]).title || article.slug : article.slug; }, [article, savedSnapshots]);
  const metadata = useMemo(() => metadataOf(article?.frontmatter ?? ''), [article?.frontmatter]);
  const importMetadata = useMemo(() => metadataOf(importResult?.frontmatter ?? ''), [importResult?.frontmatter]);
  const creation = createOptions.find((option) => option.tab === createTab);
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

  const loadItems = useCallback(async () => { const sequence = ++itemsSequence.current; const result = await request<{ items: ArticleItem[] }>('/api/articles'); if (sequence === itemsSequence.current) setItems(result.items); return result.items; }, [request]);
  useEffect(() => {
    if (library && !['all', 'unfiled', 'archived'].includes(librarySelection) && !library.folders.some((folder) => folder.id === librarySelection)) setLibrarySelection('all');
  }, [library, librarySelection]);
  const loadArchived = useCallback(async () => { const sequence = ++archiveSequence.current; setArchiveLoading(true); try { const result = await request<{ items: ArticleItem[] }>('/api/articles?scope=archived'); if (sequence === archiveSequence.current) setArchivedItems(result.items); } finally { if (sequence === archiveSequence.current) setArchiveLoading(false); } }, [request]);
  useEffect(() => { if (auth === 'ready' && librarySelection === 'archived') void loadArchived().catch((problem) => setError((problem as Error).message)); }, [auth, librarySelection, loadArchived]);
  const loadLibrary = useCallback(async () => { const sequence = ++librarySequence.current; const result = await request<LibraryState>('/api/library'); if (sequence === librarySequence.current) setLibrary(result); return result; }, [request]);
  const changeLibrary = useCallback(async (action: LibraryAction, revision = library?.revision, announce = true): Promise<LibraryState> => {
    if (!library || libraryLock.current) throw new Error('目录正在更新，请稍后重试');
    if (action.action === 'archive' && action.articleKey === (articleRef.current && articleKey(articleRef.current)) && (dirty || workspacePending) && !window.confirm('这条内容有未保存修改或正在上传，确定归档吗？')) throw new Error('已取消归档，当前修改仍保留');
    libraryLock.current = true; setLibraryBusy(true);
    try {
      const result = await request<LibraryState>('/api/library/actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...action, revision }) });
      ++librarySequence.current; setLibrary(result);
      if (action.action === 'archive' || action.action === 'restore') { await Promise.all([loadItems(), loadArchived()]); if (announce) notify(action.action === 'archive' ? '已归档，可从已归档入口恢复' : '已恢复到内容库，可按需重新加入排期'); }
      else if (announce) notify(action.action === 'assign' ? '内容目录已更新' : '目录已更新');
      return result;
    } catch (problem) {
      if ((problem as Error & { status?: number }).status === 409) { await loadLibrary().catch(() => undefined); }
      throw problem;
    } finally { libraryLock.current = false; setLibraryBusy(false); }
  }, [library, request, loadLibrary, loadItems, loadArchived, dirty, workspacePending, notify]);
  const refreshLibrary = useCallback(async () => { try { await Promise.all([loadItems(), loadLibrary(), ...(librarySelection === 'archived' ? [loadArchived()] : [])]); } catch (problem) { setError((problem as Error).message); } }, [loadItems, loadLibrary, loadArchived, librarySelection]);
  const refreshPublish = useCallback(async () => { try { const result = await request<PublishState>('/api/publish'); setPublish(result); } catch (problem) { if ((problem as Error).message === '请重新登录后继续') return; /* Local writing does not require publishing service. */ } }, [request]);

  const openArticle = useCallback(async (item: ArticleItem, skipConfirm = false, tab: ContentTab = 'article') => {
    if (articleRef.current && articleKey(articleRef.current) === articleKey(item)) { ++loadSequence.current; setContentTab(tab); setLoading(false); setWorkspaceView('writing'); setMobileView('editor'); return true; }
    if (!skipConfirm && (dirty || workspacePending) && !window.confirm('当前内容有未保存的修改或正在上传，确定切换吗？')) return false;
    setContentTab(tab);
    setWorkspaceView('writing');
    const sequence = ++loadSequence.current;
    setMobileView('editor'); setLoading(true); setError('');
    try { const data = await request<Article>(`/api/articles/${item.kind}/${item.slug}`); if (sequence !== loadSequence.current) return false; setArticle(data); setSavedSnapshots((previous) => ({ ...previous, [articleKey(data)]: snapshot(data) })); return true; }
    catch (problem) { if (sequence === loadSequence.current) setError((problem as Error).message); return false; }
    finally { if (sequence === loadSequence.current) setLoading(false); }
  }, [dirty, workspacePending, request]);

  const connectWorkspace = useCallback(async (loadPublishing = false) => {
    const session = await request<{ token: string; mediaMode: MediaMode }>('/api/session');
    csrf.current = session.token; setMediaMode(session.mediaMode); setAuth('ready');
    const [result] = await Promise.all([loadItems(), loadLibrary()]);
    // Reauthentication must not replace an article that still has unsaved edits.
    if (!articleRef.current && result.length > 0) { const item = result[0]; const data = await request<Article>(`/api/articles/${item.kind}/${item.slug}`); if (!articleRef.current) { setArticle(data); setSavedSnapshots((previous) => ({ ...previous, [articleKey(data)]: snapshot(data) })); } }
    setLoading(false); if (loadPublishing) void refreshPublish();
  }, [request, refreshPublish, loadItems, loadLibrary]);

  const finishWechatLogin = useCallback(async () => {
    setSetupToken(''); setError('');
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
    if ((dirty || workspacePending) && !window.confirm('当前内容有未保存的修改或正在上传，确定退出吗？')) return;
    try { await request('/api/auth/logout', { method: 'POST' }); csrf.current = ''; setArticle(null); articleRef.current = null; setItems([]); setLibrary(null); setLibrarySelection('all'); setSavedSnapshots({}); setPublish(null); setAuth('login'); setError(''); } catch (problem) { setError((problem as Error).message); }
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
    setArticle({ ...article, frontmatter: document.toString().trimEnd() });
  };

  const save = useCallback(async (): Promise<Article | null> => {
    if (!article || saving) return null;
    if (!dirty) return article;
    if (metadata.error) { setError('文章信息格式有误，请在高级信息中修正'); return null; }
    setSaving(true); setError(''); const target = { ...article };
    try {
      const result = await request<{ revision: string }>(`/api/articles/${target.kind}/${target.slug}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ frontmatter: target.frontmatter, body: target.body, revision: target.revision }) });
      const updated = { ...target, revision: result.revision };
      setSavedSnapshots((previous) => ({ ...previous, [articleKey(target)]: snapshot(target) }));
      setArticle((current) => current && articleKey(current) === articleKey(target) ? { ...current, revision: result.revision } : current);
      // A list request started before this save must not restore the old title.
      ++itemsSequence.current;
      setItems((previous) => previous.map((item) => articleKey(item) === articleKey(target) ? { ...item, title: metadataOf(target.frontmatter).title || item.slug, status: metadataOf(target.frontmatter).status || item.status } : item));
      notify(online ? '已保存，可在其他设备继续编辑' : '已保存到本地文件');
      return updated;
    } catch (problem) { setError((problem as Error).message); return null; }
    finally { setSaving(false); }
  }, [article, dirty, saving, metadata.error, request, online]);

  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); if (auth === 'ready' && !importTarget) void save(); } }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown); }, [save, auth, importTarget]);

  const createDraft = async (event: React.FormEvent) => {
    event.preventDefault();
    if (createLock.current || !createTab) return;
    if ((dirty || workspacePending) && !window.confirm('当前内容有未保存的修改或正在上传，创建后将切换到新内容。确定继续吗？')) return;
    createLock.current = true; setCreating(true); setCreateError('');
    try {
      const title = newTitle.trim(); const customSlug = newSlug.trim();
      if (title.length < 2) throw new Error('请填写至少两个字的内容标题');
      if (!pendingContentDraft.current || pendingContentDraft.current.title !== title || pendingContentDraft.current.customSlug !== customSlug) {
        pendingContentDraft.current = { title, customSlug, slug: customSlug || `content-${crypto.randomUUID()}`, folderId: ['all', 'unfiled', 'archived'].includes(librarySelection) ? null : librarySelection, uncertain: false, assigned: false };
      }
      const pending = pendingContentDraft.current;
      // A lost response must not create a second item. Resolve the same slug before retrying.
      if (!pending.result && pending.uncertain) {
        try {
          const existing = await request<Article>(`/api/articles/draft/${pending.slug}`);
          if (metadataOf(existing.frontmatter).title !== title) throw new Error('这个地址已有其它内容，请换一个地址');
          pending.result = { kind: existing.kind, slug: existing.slug };
        } catch (problem) { if ((problem as Error & { status?: number }).status !== 404) throw problem; }
      }
      if (!pending.result) {
        try { pending.result = await request<{ kind: ArticleKind; slug: string }>('/api/drafts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, slug: pending.slug }) }); }
        catch (problem) {
          const status = (problem as Error & { status?: number }).status;
          pending.uncertain = !status || status >= 500;
          throw problem;
        }
      }
      const result = pending.result;
      setItems((previous) => [...previous.filter((item) => articleKey(item) !== articleKey(result)), { ...result, title, status: 'draft' }]);
      let warning = '';
      const refreshed = await Promise.allSettled([loadItems(), loadLibrary()]);
      if (pending.folderId && !pending.assigned) {
        try {
          if (refreshed[1].status !== 'fulfilled') throw new Error('目录暂时无法刷新');
          await changeLibrary({ action: 'assign', articleKey: articleKey(result), folderId: pending.folderId }, refreshed[1].value.revision, false);
          pending.assigned = true;
        } catch (problem) { warning = `内容已保存在“未分类”，移动目录失败：${(problem as Error).message}`; }
      }
      articleOrigin.current = 'writing';
      if (!await openArticle({ ...result, title, status: 'draft' }, true, createTab)) { setCreateError('内容已创建，但暂时无法打开。再次点击将打开同一条内容，不会重复创建。'); return; }
      createNavigating.current = true;
      pendingContentDraft.current = null; setNewTitle(''); setNewSlug(''); setCreateTab(null);
      if (warning) setError(warning);
    }
    catch (problem) { setCreateError((problem as Error).message); }
    finally { createLock.current = false; setCreating(false); }
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
    // Keep the same draft identity if classification or enqueue needs a retry.
    setItems((previous) => [...previous.filter((item) => articleKey(item) !== articleKey(result)), { ...result, title: normalizedTitle, status: 'draft' }]);
    if (!['all', 'unfiled', 'archived'].includes(librarySelection)) {
      const latest = await loadLibrary();
      await changeLibrary({ action: 'assign', articleKey: articleKey(result), folderId: librarySelection }, latest.revision, false);
    }
    pendingScheduledDraft.current = null;
    await Promise.all([loadItems(), loadLibrary()]).catch(() => undefined);
    return result;
  };

  const promote = async () => {
    if (!article || !['lead', 'published'].includes(metadata.status)) { setError('先在发布信息中选择“功能线索”或“实测教程”'); return; }
    if (!window.confirm('将这篇文章加入网站发布内容？网站更新后，读者可以看到它。')) return;
    const saved = await save(); if (!saved) return; setPromoting(true); setError('');
    try { const result = await request<Article>(`/api/articles/draft/${saved.slug}/promote`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ revision: saved.revision }) }); setArticle(result); setSavedSnapshots((previous) => ({ ...previous, [articleKey(result)]: snapshot(result) })); await Promise.all([loadItems(), loadLibrary(), ...(librarySelection === 'archived' ? [loadArchived()] : [])]); notify('已加入发布内容，请先更新测试环境查看效果'); }
    catch (problem) { setError((problem as Error).message); }
    finally { setPromoting(false); }
  };

  const uploadImages = useCallback(async (files: File[]) => {
    if (!article) throw new Error('请先打开文章'); setError(''); const results = []; let staged = false;
    for (const file of files) {
      const imageType = file.type || ({ png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' } as Record<string, string>)[file.name.split('.').pop()?.toLowerCase() ?? ''];
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(imageType)) throw new Error('只支持 PNG、JPEG 或 WebP 图片');
      if (file.size > 15 * 1024 * 1024) throw new Error('单张图片不能超过 15 MiB');
      try { const data = await request<{ url: string; storage: 'remote' | 'staging' }>(`/api/articles/${article.kind}/${article.slug}/images`, { method: 'POST', headers: { 'Content-Type': imageType }, body: file }); results.push({ url: data.url, alt: file.name.replace(/\.[^.]+$/, '') }); staged ||= data.storage === 'staging'; }
      catch (problem) { setError((problem as Error).message); throw problem; }
    }
    notify(staged ? `${results.length} 张图片已暂存；发布前需上传图片存储` : `${results.length} 张图片已上传并验证可访问`, staged ? 'info' : 'success');
    return results;
  }, [article, request, notify]);

  const previewMarkdown = (source: string, target: Article) => {
    setImportResult(null); setImportError('');
    try { setImportResult(parseMarkdownImport(source, target, { tools: tools.map((tool) => tool.slug), themes: themes.map((theme) => theme.slug) })); }
    catch (problem) { setImportError((problem as Error).message); }
  };
  const openMarkdownImport = (source = '') => {
    const target = articleRef.current;
    if (!target) return;
    ++importReadSequence.current; setImportReading(false); setImportTarget(target); setImportText(source); setImportError(''); setImportResult(null);
    if (source) previewMarkdown(source, target);
  };
  const closeMarkdownImport = () => { ++importReadSequence.current; setImportReading(false); setImportTarget(null); };
  const readMarkdownFile = async (file: File) => {
    const target = importTarget;
    if (!target) return;
    const sequence = ++importReadSequence.current;
    setImportError(''); setImportResult(null);
    if (file.size > MAX_IMPORT_BYTES) { setImportError('Markdown 超过 2 MiB，请缩小文件后再导入'); return; }
    if (!/\.(?:md|markdown)$/i.test(file.name)) { setImportError('请选择 .md 或 .markdown 文件'); return; }
    setImportReading(true);
    try {
      const source = await file.text();
      if (sequence !== importReadSequence.current) return;
      setImportText(source); previewMarkdown(source, target);
    } catch { if (sequence === importReadSequence.current) setImportError('文件未能读取，请重新选择，或直接粘贴 Markdown'); }
    finally { if (sequence === importReadSequence.current) setImportReading(false); }
  };
  const applyMarkdownImport = () => {
    if (!importTarget || !importResult || importReading || saving || imageBusy || promoting) return;
    const current = articleRef.current;
    if (!current || articleKey(current) !== articleKey(importTarget) || snapshot(current) !== snapshot(importTarget)) { setImportError('当前工作稿已变化，请关闭导入窗口后重新导入，避免覆盖新的修改'); return; }
    setArticle({ ...current, frontmatter: importResult.frontmatter, body: importResult.body });
    closeMarkdownImport(); notify('Markdown 已应用到工作稿，请核对后保存');
  };

  const busy = publishBusy || saving || promoting || imageBusy || runningJob(publish?.active);
  const lastJob = publish?.active ?? publish?.lastJob;
  const themeButton = <IconButton className="theme-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}>{theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}</IconButton>;
  const messages = <>{error && <div className="message message-error" role="alert"><CircleAlert size={17} aria-hidden="true" /><span>{error}</span><button type="button" onClick={() => setError('')} aria-label="关闭错误提示">关闭</button></div>}</>;

  if (auth !== 'ready') return <div className="auth-shell"><div className="auth-theme">{themeButton}</div><main className="auth-card">
    <AuthorBrand large />
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
    <header className="topbar"><div className="brand"><AuthorBrand /><span>教程写作</span><span className="brand-sub">何荣开发工具库</span></div><div className="topbar-actions"><span className={`media-state media-state-${mediaMode}`}>{!online ? '本地预览' : mediaMode === 'direct' ? '图片直传' : mediaMode === 'incomplete' ? '图片配置未完成' : '图片暂存'}</span>{themeButton}{online && <button className="icon-text-button" type="button" onClick={() => void logout()}><LogOut size={17} aria-hidden="true" /><span>退出</span></button>}</div></header>
    <nav className="workspace-tabs" aria-label="工作区"><button type="button" aria-current={workspaceView === 'schedule' ? 'page' : undefined} onClick={() => setWorkspaceView('schedule')}><CalendarDays size={18} aria-hidden="true" />拍摄排期</button><button type="button" aria-current={workspaceView === 'writing' ? 'page' : undefined} onClick={() => setWorkspaceView('writing')}><BookOpenText size={18} aria-hidden="true" />内容库{dirty && <span className="workspace-dirty">未保存</span>}</button><button type="button" aria-current={workspaceView === 'publishing' ? 'page' : undefined} onClick={() => { setPublishingContext(null); setWorkspaceView('publishing'); }}><Send size={18} aria-hidden="true" />发布中心</button></nav>
    <div hidden={workspaceView !== 'publishing'}><Suspense fallback={<div className="welcome"><LoaderCircle className="spin" size={24} aria-hidden="true" /><p>正在打开发布中心…</p></div>}><PublishingCenter key={publishingContext ? `${publishingContext.contentId}:${publishingContext.videoAssetId ?? ''}` : 'all'} request={request} contentContext={publishingContext ?? undefined} onBack={publishingContext ? () => { setContentTab('publish'); setWorkspaceView('writing'); } : undefined} /></Suspense></div>
    <div hidden={workspaceView !== 'schedule'}><div className="workspace-messages">{messages}</div><Suspense fallback={<div className="welcome"><LoaderCircle className="spin" size={24} aria-hidden="true" /><p>正在打开拍摄排期…</p></div>}><ScheduleBoard request={request} articles={items} library={library} librarySelection={librarySelection} onLibrarySelect={setLibrarySelection} libraryBusy={libraryBusy} onLibraryAction={changeLibrary} onLibraryRefresh={refreshLibrary} archivedItems={archivedItems} archiveLoading={archiveLoading} active={workspaceView === 'schedule'} onOpen={(item, tab) => { articleOrigin.current = 'schedule'; void openArticle(item, false, tab ?? 'filming'); }} onCreate={createScheduledDraft} /></Suspense></div>
    <div hidden={workspaceView !== 'writing'}>
    <nav className="mobile-navigation" aria-label="内容导航"><button type="button" aria-current={mobileView === 'list' ? 'page' : undefined} onClick={() => setMobileView('list')}><List size={18} aria-hidden="true" />我的内容</button><button type="button" aria-current={mobileView === 'editor' ? 'page' : undefined} onClick={() => setMobileView('editor')} disabled={!article}><BookOpenText size={18} aria-hidden="true" />编辑</button></nav>
    <div className="workspace-messages">{messages}</div>
    <div className="workspace"><aside className="sidebar" aria-label="内容列表"><div className="sidebar-heading"><h2>我的内容</h2><Menu.Root><Menu.Trigger asChild><button ref={createButton} type="button" className="new-button" aria-label="添加内容" disabled={creating || libraryBusy}><Plus size={17} aria-hidden="true" />添加<ChevronDown size={15} aria-hidden="true" /></button></Menu.Trigger><Menu.Portal><Menu.Content className="library-menu" sideOffset={5} align="end" collisionPadding={12} onCloseAutoFocus={(event) => { if (createMenuOpening.current) { event.preventDefault(); createMenuOpening.current = false; } }}>{createOptions.map(({ tab, label, Icon }) => <Menu.Item className="library-menu-item" key={tab} onSelect={() => { createMenuOpening.current = true; createNavigating.current = false; setCreateError(''); setCreateTab(tab); }}><Icon size={17} aria-hidden="true" />{label}</Menu.Item>)}</Menu.Content></Menu.Portal></Menu.Root></div>
      <ArticleLibrary library={library} items={items} archivedItems={archivedItems} archiveLoading={archiveLoading} activeKey={article ? articleKey(article) : undefined} selection={librarySelection} busy={libraryBusy || creating} onSelect={setLibrarySelection} onOpen={(item, tab) => { articleOrigin.current = 'writing'; void openArticle(item, false, tab); }} onAction={changeLibrary} onRefresh={refreshLibrary} />

    </aside><main className="main-content">{loading ? <div className="welcome"><LoaderCircle className="spin" size={26} aria-hidden="true" /><p>正在打开内容…</p></div> : article ? <Suspense fallback={<p role="status">正在打开内容…</p>}><ContentWorkspace active={workspaceView === 'writing'} key={article.slug} slug={article.slug} title={metadata.title || article.slug} savedTitle={items.find((item) => articleKey(item) === articleKey(article))?.title || archivedItems.find((item) => articleKey(item) === articleKey(article))?.title || savedContentTitle} kind={article.kind} request={request} dirty={dirty} onPendingChange={setWorkspacePending} onSave={save} articleRevision={article.revision} initialTab={contentTab} onRestore={(restored) => { setArticle(restored); setSavedSnapshots((previous) => ({ ...previous, [articleKey(restored)]: snapshot(restored) })); void loadItems(); }} onBack={() => { setWorkspaceView(articleOrigin.current); setMobileView('list'); }} articleToolbar={<div className="article-topline"><span className="article-location">{library ? folderPath(library.folders, library.assignments[articleKey(article)]) : '我的内容'} / {article.kind === 'draft' ? '草稿' : '发布内容'}</span><div className="save-actions"><span className={`save-status ${dirty ? 'is-dirty' : ''}`}>{saving ? '保存中…' : dirty ? '有未保存的更改' : '已保存'}</span><button type="button" className="save-button" onClick={() => void save()} disabled={!dirty || saving || imageBusy || Boolean(metadata.error)}>{saving ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <Save size={17} aria-hidden="true" />}保存</button></div></div>} onOpenPublishing={async (context) => { if (!context.videoAssetId) return; notify('正在准备所选成片…', 'info'); const result = await request<{video_asset_id:string;content_id:string}>(`/api/workspaces/${context.slug}/publishing-video`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({assetId:context.videoAssetId})}); if (articleRef.current?.slug !== context.slug) return; setPublishingContext({...context,contentId:result.content_id,videoAssetId:result.video_asset_id}); setWorkspaceView('publishing'); }}>
      <div className="article-fields"><label className="sr-only" htmlFor="article-title">教程标题</label><textarea ref={titleInput} id="article-title" className="title-input" value={metadata.title} onChange={(event) => updateField('title', event.target.value.replace(/[\r\n]+/g, ' '))} placeholder="用读者会搜索的问题写标题" rows={1} disabled={Boolean(metadata.error)} /><label className="sr-only" htmlFor="article-summary">一句话摘要</label><textarea ref={summaryInput} id="article-summary" className="summary-input" value={metadata.summary} onChange={(event) => updateField('summary', event.target.value)} placeholder="一句话说明能解决什么问题" rows={1} disabled={Boolean(metadata.error)} /><div className="field-row"><span className="article-tool-field"><label htmlFor="article-tool">工具</label><AuthorSelect id="article-tool" value={metadata.tool} onValueChange={(value) => updateField('tool', value)} disabled={Boolean(metadata.error)} label="工具" className="article-tool-select" options={[{ value: '', label: '选择工具' }, ...tools.map((tool) => ({ value: tool.slug, label: tool.name }))]} /></span><span className="article-folder-field"><span id="article-folder-label">目录</span><FolderPicker folders={library?.folders ?? []} value={library?.assignments[articleKey(article)] ?? null} label="文章所在目录" disabled={!library || libraryBusy || promoting} onChange={(folderId) => { void changeLibrary({ action: 'assign', articleKey: articleKey(article), folderId }).catch((problem) => setError((problem as Error).message)); }} /></span><span className="editor-tools"><button ref={importButton} className="secondary-button" type="button" disabled={saving || imageBusy || promoting} onClick={() => openMarkdownImport()}><FileInput size={17} aria-hidden="true" />导入 Markdown</button><HelpTip label="Markdown 导入说明">可导入 AI 生成的完整文章，自动读取 YAML 文章信息；仅替换当前工作稿，核对后再保存。</HelpTip><button className="secondary-button" type="button" disabled={imageBusy} onClick={() => imageInput.current?.click()}>{imageBusy ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <ImagePlus size={17} aria-hidden="true" />}{imageBusy ? '正在上传截图…' : '添加截图'}</button><input ref={imageInput} className="file-input" type="file" accept="image/png,image/jpeg,image/webp" multiple aria-label="选择教程截图" onChange={async (event) => { const files = Array.from(event.target.files ?? []); event.target.value = ''; if (!files.length) return; const targetKey = articleKey(article); setImageBusy(true); try { const images = await uploadImages(files); setArticle((current) => current && articleKey(current) === targetKey ? { ...current, body: `${current.body.trimEnd()}\n\n${images.map((image) => `![${image.alt.replace(/[\[\]\r\n]/g, '')}](${image.url})`).join('\n\n')}\n` } : current); } catch { /* uploadImages already reports an actionable error. */ } finally { setImageBusy(false); } }} /><HelpTip label="截图使用说明">可直接粘贴或拖入截图。使用“添加截图”会插入正文末尾，随后可调整位置和说明。</HelpTip></span></div></div>
      <div className="editor-wrap" aria-label="Markdown 正文编辑区"><Suspense fallback={<div className="welcome"><LoaderCircle className="spin" size={22} aria-hidden="true" /><p>正在打开编辑器…</p></div>}><RichEditor key={articleKey(article)} kind={article.kind} slug={article.slug} value={article.body} onChange={(body) => setArticle((current) => current ? { ...current, body } : current)} compact={compact} uploadImages={uploadImages} onImportMarkdown={openMarkdownImport} /></Suspense></div>
      <details className="metadata-panel"><summary><ChevronDown size={17} aria-hidden="true" /><span>发布信息</span><span className="metadata-subtitle">搜索线索、来源、实测和视频</span></summary><div className="metadata-body"><div className="metadata-grid"><label>内容类型<AuthorSelect value={metadata.status} onValueChange={(value) => updateField('status', value)} disabled={Boolean(metadata.error)} label="内容类型" options={[...(article.kind === 'draft' ? [{ value: 'draft', label: '草稿，暂不发布' }] : []), { value: 'lead', label: '功能线索，尚未实测' }, { value: 'published', label: '实测教程' }]} /></label><label>更新日期<input type="date" value={dateInputValue(metadata.text('updatedAt'))} onChange={(event) => updateField('updatedAt', event.target.value)} /></label><label>软件版本<input value={metadata.text('version')} onChange={(event) => updateField('version', event.target.value)} placeholder="实际使用的版本" /></label><label>平台与前置条件<input value={metadata.text('platform')} onChange={(event) => updateField('platform', event.target.value)} placeholder="系统、套餐或权限" /></label></div><label htmlFor="search-clues">搜索线索，一行一个</label><textarea id="search-clues" rows={3} value={metadata.list('searchClues').join('\n')} onChange={(event) => updateField('searchClues', event.target.value.split('\n'))} placeholder="读者可能记住的按钮名、口播词或问题" /><p className="field-help">实测教程至少填写两条，帮助读者凭零碎印象找到文章。</p>
        <div className="sources-heading"><h3>官方来源</h3><button className="icon-text-button" type="button" onClick={() => updateField('officialSources', [...metadata.sources('officialSources'), { title: '', url: '' }])}><Plus size={16} aria-hidden="true" />添加</button></div>{metadata.sources('officialSources').map((source, index) => <div className="source-row" key={index}><label><span className="sr-only">官方来源 {index + 1} 标题</span><input value={source.title} placeholder="文档标题" onChange={(event) => updateField(['officialSources', String(index), 'title'], event.target.value)} /></label><label><span className="sr-only">官方来源 {index + 1} 链接</span><input type="url" value={source.url} placeholder="https://…" onChange={(event) => updateField(['officialSources', String(index), 'url'], event.target.value)} /></label><IconButton className="theme-button" type="button" aria-label={`删除官方来源 ${index + 1}`} onClick={() => updateField('officialSources', metadata.sources('officialSources').filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={17} aria-hidden="true" /></IconButton></div>)}
        <fieldset className="verification-fields"><legend>亲测记录</legend><div className="metadata-grid"><label>实测日期<input type="date" value={dateInputValue(metadata.text(['verification', 'testedAt']))} onChange={(event) => updateField(['verification', 'testedAt'], event.target.value)} /></label><label>实测环境<input value={metadata.text(['verification', 'environment'])} onChange={(event) => updateField(['verification', 'environment'], event.target.value)} placeholder="系统、版本和账号条件" /></label></div><label>实际结果<textarea rows={3} value={metadata.text(['verification', 'result'])} onChange={(event) => updateField(['verification', 'result'], event.target.value)} placeholder="操作后观察到的结果和限制" /></label></fieldset>
        <label htmlFor="video-url">原视频链接（选填）</label><input id="video-url" type="url" value={metadata.text('videoUrl')} onChange={(event) => updateField('videoUrl', event.target.value || undefined)} placeholder="https://…" /><fieldset className="theme-fields"><legend>主题（选填）</legend>{themes.map((item) => <label key={item.slug}><input type="checkbox" checked={metadata.list('themes').includes(item.slug)} onChange={(event) => updateField('themes', event.target.checked ? [...metadata.list('themes'), item.slug] : metadata.list('themes').filter((value) => value !== item.slug))} />{item.name}</label>)}</fieldset>
        <details className="advanced-metadata"><summary>高级文章信息</summary><label htmlFor="frontmatter">全部字段（YAML）</label><textarea id="frontmatter" className="frontmatter-input" spellCheck={false} value={article.frontmatter} onChange={(event) => { setArticle({ ...article, frontmatter: event.target.value }); }} /></details>{metadata.error && <p className="field-error" role="alert">文章信息格式有误：{metadata.error}</p>}{article.kind === 'draft' && <div className="promote-actions"><button className="secondary-button" type="button" disabled={promoting || saving || imageBusy || !['lead', 'published'].includes(metadata.status) || Boolean(metadata.error)} onClick={() => void promote()}>{promoting ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <Upload size={17} aria-hidden="true" />}加入发布内容</button><p className="field-help">先选择内容类型并补全信息，再更新测试环境查看效果。</p></div>}</div></details>
      <div className="editor-bottom-actions"><button className="icon-text-button" type="button" onClick={() => setMobileView('list')}><ArrowLeft size={17} aria-hidden="true" />返回文章与发布</button><button className="save-button" type="button" disabled={!dirty || saving || imageBusy || Boolean(metadata.error)} onClick={() => void save()}><Save size={17} aria-hidden="true" />保存</button></div>
    </ContentWorkspace></Suspense> : <div className="welcome"><ImagePlus size={30} aria-hidden="true" /><h1>开始创作第一条内容</h1><p>从“添加”选择文章、视频或资源，填写标题即可开始。</p></div>}</main></div></div>
    <Dialog.Root open={importTarget !== null} onOpenChange={(open) => { if (!open) closeMarkdownImport(); }}><AuthorDialogContent className="markdown-import-dialog" title="导入 Markdown" description="替换当前工作稿，核对后手动保存。导入不会直接发布。" closeLabel="取消导入 Markdown" onOpenAutoFocus={(event) => { event.preventDefault(); (importResult ? document.getElementById('markdown-import-apply') : importInput.current)?.focus(); }} onCloseAutoFocus={(event) => { event.preventDefault(); importButton.current?.focus(); }}>
      {importTarget && snapshot(importTarget) !== savedSnapshots[articleKey(importTarget)] && <p className="markdown-import-notice"><CircleAlert size={16} aria-hidden="true" /><span>当前有未保存的修改，应用后会替换{importResult?.hasFrontmatter === false ? '正文' : '正文和文章信息'}；取消会保留原稿。</span></p>}
      {!importResult ? <>
        <div className="markdown-import-source-heading"><label htmlFor="markdown-import-source">粘贴完整文章</label><button className="secondary-button" type="button" disabled={importReading} onClick={() => importFileInput.current?.click()}>{importReading ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <FileInput size={17} aria-hidden="true" />}{importReading ? '读取中…' : '选择 .md 文件'}</button><input ref={importFileInput} type="file" className="file-input" accept=".md,.markdown,text/markdown" aria-label="选择 Markdown 文件" onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void readMarkdownFile(file); }} /></div>
        <textarea ref={importInput} id="markdown-import-source" className="markdown-import-input" value={importText} spellCheck={false} placeholder={'---\ntitle: 文章标题\nsummary: 一句话摘要\ntool: codex\nstatus: draft\n---\n\n正文…'} disabled={importReading} onChange={(event) => { setImportText(event.target.value); setImportError(''); setImportResult(null); }} />
      </> : <div className="markdown-import-preview">
        <div className="markdown-import-source-heading"><h3>导入预览</h3><button type="button" className="icon-text-button" onClick={() => { setImportResult(null); setImportError(''); }}>返回修改</button></div>
        <dl className="markdown-import-metadata"><div><dt>标题</dt><dd>{importMetadata.title || '未提供'}</dd></div><div><dt>摘要</dt><dd>{importMetadata.summary || '未提供'}</dd></div><div><dt>工具 / 类型</dt><dd>{tools.find((tool) => tool.slug === importMetadata.tool)?.name || importMetadata.tool || '未提供'} / {contentStatusLabels[importMetadata.status] || '未提供'}</dd></div><div><dt>来源 / 更新</dt><dd>{importMetadata.sources('officialSources').length} 条官方来源 · {importMetadata.text('updatedAt') || '未提供更新日期'}</dd></div><div><dt>实测记录</dt><dd>{[importMetadata.text(['verification', 'testedAt']), importMetadata.text(['verification', 'environment']), importMetadata.text(['verification', 'result'])].filter(Boolean).join(' · ') || '未提供'}</dd></div><div><dt>应用范围</dt><dd>{importResult.hasFrontmatter ? '替换正文和文章信息' : '只替换正文，保留现有文章信息'} · 文章地址保持不变</dd></div></dl>
        {importResult.warnings.length > 0 && <ul className="markdown-import-warnings">{importResult.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>}
        <details className="markdown-import-body"><summary>查看正文（{importResult.body.length.toLocaleString()} 字符）</summary><pre>{importResult.body.slice(0, 1800)}{importResult.body.length > 1800 ? '\n…（仅预览前 1,800 字符，应用时保留全文）' : ''}</pre></details>
      </div>}
      {importError && <p className="field-error markdown-import-error" role="alert">{importError}</p>}
      <div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="secondary-button">取消</button></Dialog.Close>{importResult ? <button id="markdown-import-apply" className="save-button" type="button" disabled={saving || imageBusy || promoting} onClick={applyMarkdownImport}>应用到工作稿</button> : <button className="save-button" type="button" disabled={importReading || !importText.trim()} onClick={() => { if (importTarget) previewMarkdown(importText, importTarget); }}>解析预览</button>}</div>
    </AuthorDialogContent></Dialog.Root>
    <Dialog.Root open={createTab !== null} onOpenChange={(open) => { if (!open && !createLock.current) setCreateTab(null); }}><AuthorDialogContent onOpenAutoFocus={(event) => { event.preventDefault(); createTitleInput.current?.focus(); }} onCloseAutoFocus={(event) => { event.preventDefault(); if (!createNavigating.current) createButton.current?.focus(); }} onEscapeKeyDown={(event) => { if (createLock.current) event.preventDefault(); }} onPointerDownOutside={(event) => { if (createLock.current) event.preventDefault(); }} className="content-create-dialog" title={creation?.label} description={creation?.help}  closeLabel="关闭添加内容" closeDisabled={creating}><form onSubmit={(event) => void createDraft(event)}>
      <label className="library-form-field">内容标题<input ref={createTitleInput} value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="为这条内容取一个标题" minLength={2} maxLength={160} required disabled={creating} /></label>
      <details className="content-create-address"><summary><ChevronDown size={16} aria-hidden="true" />自定义文章地址（选填）</summary><label className="library-form-field">文章地址<input value={newSlug} onChange={(event) => setNewSlug(event.target.value.toLowerCase())} placeholder="留空自动生成" pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={120} disabled={creating} /></label><p>使用英文小写、数字和连字符。</p></details>
      <p className="content-create-location">保存到：{library && !['all', 'unfiled', 'archived'].includes(librarySelection) ? folderPath(library.folders, librarySelection) : '未分类'}</p>
      {createError && <p className="field-error" role="alert">{createError}</p>}<div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="secondary-button" disabled={creating}>取消</button></Dialog.Close><button className="save-button" type="submit" disabled={creating || libraryBusy}>{creating && <LoaderCircle className="spin" size={17} aria-hidden="true" />}{creating ? '正在创建…' : creation?.action}</button></div>
    </form></AuthorDialogContent></Dialog.Root>
  </div>;
}
