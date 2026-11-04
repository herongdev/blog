import { useToast } from './AuthorToast';
import IconButton from './IconButton';
import AuthorDialogContent from './AuthorDialogContent';
import AuthorSelect from './AuthorSelect';
import { lazy, Suspense, useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import type { BytemdPlugin } from 'bytemd';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Clapperboard, ArrowLeft, AudioLines, Check, CheckCheck, CircleAlert, Download, ExternalLink, FileArchive, FileText, Film, FolderOpen, History, Image, LoaderCircle, LockKeyhole, Package, Pause, Play, RefreshCw, RotateCcw, Save, Search, Send, Upload, X } from 'lucide-react';
import { parseDocument } from 'yaml';
import HelpTip from './HelpTip';
import FilmingPanel from './FilmingPanel';
import './workspace.css';

type Request = <T>(path: string, options?: RequestInit) => Promise<T>;
export type WorkspaceArticle = { kind: 'draft' | 'content'; slug: string; frontmatter: string; body: string; revision: string; images?: Record<string, string> };
export type WorkspaceTab = 'filming' | 'article' | 'video' | 'assets' | 'publish';
export type WorkspacePublishingContext = { slug: string; title: string; contentId?: string; videoAssetId?: string };
type Category = 'video' | 'recording' | 'image' | 'audio' | 'project' | 'subtitle' | 'other';
type Asset = { id: string; filename: string; relativePath: string; category: Category; groupId: string; version: number; size: number; mime: string; sha256: string; createdAt: string; width?: number; height?: number; duration?: number };
type UploadIntent = { id: string; filename: string; category: Category; size: number; relativePath?: string; chunkSize: number; totalParts: number; receivedParts: number[] };
type Workspace = { id: string; slug: string; revision: string; notes: string; software: string; softwareVersion: string; selectedVideoId: string | null; currentVideo: Asset | null; assets: Asset[]; uploads: UploadIntent[]; storage: { provider: string; label: string; cloudConfigured: boolean }; usage: { bytes: number; maxBytes: number }; updatedAt: string };
type RevisionEntry = { revision: string; createdAt: string; title: string; current: boolean; published: boolean };
type RevisionState = { kind: 'draft' | 'content'; slug: string; title: string; workingRevision: string; publishedRevision: string | null; publishedAt: string | null; status: 'draft' | 'published' | 'modified' | 'unpublished'; hasChanges: boolean; history: RevisionEntry[] };
type PublishJob = { id: string; environment: string; status: string; previewId?: string; url?: string; error?: string; warning?: string; createdAt?: string; finishedAt?: string; selection?: { slug: string; action: string } };
type PublishRelease = { url: string; release?: string; previewId?: string; selection?: { slug: string; action: string }; atUtc?: string };
type PublishState = { enabled: boolean; localOnly?: boolean; active: PublishJob | null; lastJob: PublishJob | null; environments: { staging: PublishRelease | null; production: PublishRelease | null } };
type PlatformTarget = { id: string; status: string; post_url?: string; message?: string; account_snapshot?: { alias?: string; platform?: string }; snapshot?: { title?: string } };
type PlatformJob = { id: string; content_ref?: { id?: string; slug?: string }; created_at?: string; targets: PlatformTarget[] };
type Props = { slug: string; title: string; savedTitle?: string; kind: 'draft' | 'content'; request: Request; onBack: () => void; children: ReactNode; articleToolbar?: ReactNode; dirty: boolean; onSave: () => Promise<WorkspaceArticle | null>; onRestore?: (article: WorkspaceArticle) => void; onOpenPublishing?: (context: WorkspacePublishingContext) => void; onPendingChange?: (pending: boolean) => void; articleRevision?: string; initialTab?: WorkspaceTab; active?: boolean };
const Viewer = lazy(() => import('@bytemd/react').then((module) => ({ default: module.Viewer })));
const categories: Record<Category, string> = { video: '成片', recording: '原始录屏', image: '图片与封面', audio: '音频', project: '剪辑工程', subtitle: '字幕与文稿', other: '其它文件' };
const articleStatus: Record<string, string> = { draft: '文章草稿', published: '文章已发布', modified: '有未发布修改', unpublished: '文章已下架' };
const jobStatus: Record<string, string> = { queued: '等待发布', checking: '检查中', building: '生成页面中', verifying: '核对页面中', activating: '更新网站中', succeeded: '发布完成', failed: '发布失败', draft: '发布草稿', running: '处理中', waiting_user: '需要确认', submitted: '已提交平台', succeeded_submission: '已提交平台', unknown: '结果待核实', failed_submission: '提交失败', cancelled: '已取消', canceled: '已停止发布', submission_unknown: '结果待核实', published: '已公开', accepted: '已提交平台', uncertain: '结果待核实' };
const platformNames: Record<string, string> = { douyin: '抖音', xiaohongshu: '小红书', tencent: '视频号', bilibili: 'B站' };
const apiUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const json = (body: unknown, method = 'POST'): RequestInit => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const bytes = (size: number) => size < 1024 ? `${size} B` : size < 1024 ** 2 ? `${(size / 1024).toFixed(1)} KB` : size < 1024 ** 3 ? `${(size / 1024 ** 2).toFixed(1)} MB` : `${(size / 1024 ** 3).toFixed(2)} GB`;
const date = (value?: string | null) => value && Number.isFinite(new Date(value).getTime()) ? new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value)) : '';
const isRunning = (job?: PublishJob | null) => Boolean(job && !['succeeded', 'failed'].includes(job.status));
const safeUrl = (value?: string) => { if (!value) return undefined; try { const url = new URL(value); const local = ['127.0.0.1', 'localhost', '[::1]'].includes(window.location.hostname) && url.hostname === window.location.hostname; return url.protocol === 'https:' || (url.protocol === 'http:' && local) ? url.href : undefined; } catch { return undefined; } };
function articleTitle(article: WorkspaceArticle) { try { return String(parseDocument(article.frontmatter).get('title') || article.slug); } catch { return article.slug; } }
function inferCategory(file: File): Category { if (file.type.startsWith('video/')) return 'recording'; if (file.type.startsWith('image/')) return 'image'; if (file.type.startsWith('audio/')) return 'audio'; if (/\.(srt|vtt|txt|md)$/i.test(file.name)) return 'subtitle'; if (/\.(zip|prproj|drp|dra|aep|fcpxml|mlt)$/i.test(file.name)) return 'project'; return 'other'; }
function AssetIcon({ category }: { category: Category }) { const Icon = category === 'video' || category === 'recording' ? Film : category === 'image' ? Image : category === 'audio' ? AudioLines : category === 'project' ? FileArchive : FileText; return <Icon size={18} aria-hidden="true" />; }
function revisionImagePreview(article: WorkspaceArticle | null): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      if (!article?.images) return;
      const prefix = `/api/article-revisions/${article.kind}/${article.slug}/history/${article.revision}/assets/`;
      markdownBody.querySelectorAll<HTMLImageElement>('img[src]').forEach((image) => {
        const source = image.getAttribute('src') || '';
        if (!source.startsWith(`./${article.slug}/`) && !source.startsWith(`${article.slug}/`)) return;
        const mapped = article.images?.[source];
        if (typeof mapped !== 'string' || !mapped.startsWith(prefix)) return;
        let filename;
        try { filename = decodeURIComponent(mapped.slice(prefix.length)); } catch { return; }
        if (!/^[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(filename) || filename.split('/').some((part) => !part || part === '.' || part === '..')) return;
        image.src = apiUrl(mapped);
      });
    },
  };
}

export default function ContentWorkspace({ slug, title, savedTitle, kind, request, onBack, children, articleToolbar, dirty, onSave, onRestore, onOpenPublishing, onPendingChange, articleRevision, initialTab = 'article', active = true }: Props) {
  const [filmingPending, setFilmingPending] = useState(false);
  const [tab, setTab] = useState<WorkspaceTab>(initialTab);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [revision, setRevision] = useState<RevisionState | null>(null);
  const [publish, setPublish] = useState<PublishState | null>(null);
  const [platformJobs, setPlatformJobs] = useState<PlatformJob[]>([]);
  const [error, setError] = useState('');
  const notify = useToast();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [articleMode, setArticleMode] = useState<'working' | 'published' | 'history'>('working');
  const [readArticle, setReadArticle] = useState<WorkspaceArticle | null>(null);
  const [reading, setReading] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [uploadCategory, setUploadCategory] = useState<Category | 'auto'>('auto');
  const [notes, setNotes] = useState('');
  const [software, setSoftware] = useState('');
  const [softwareVersion, setSoftwareVersion] = useState('');
  const [metadataDirty, setMetadataDirty] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ filename: string; done: number; total: number; fileIndex: number; fileCount: number } | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [confirm, setConfirm] = useState<'publish' | 'restore' | null>(null);
  const [preparedAction, setPreparedAction] = useState<'publish' | 'unpublish'>('publish');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewReady, setPreviewReady] = useState(false);
  const [selectedVideoPreview, setSelectedVideoPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dialogReturnRef = useRef<HTMLElement | null>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const workspaceRef = useRef<Workspace | null>(null);
  const metadataDirtyRef = useRef(false);
  const announcedJobs = useRef(new Set<string>());
  const generation = useRef(0);
  const readSequence = useRef(0);
  const videoGroupRef = useRef<string | undefined>(undefined);
  const uploadRef = useRef(false);
  const pendingUploadOptions = useRef<{ forcedCategory?: Category; selectedCategory: Category | 'auto' }>({ selectedCategory: 'auto' });
  const id = useId();
  const endpoint = `/api/workspaces/${encodeURIComponent(slug)}`;
  const revisionEndpoint = `/api/article-revisions/${kind}/${encodeURIComponent(slug)}`;
  workspaceRef.current = workspace;
  metadataDirtyRef.current = metadataDirty;
  const acceptWorkspace = useCallback((value: Workspace) => {
    setWorkspace(value); workspaceRef.current = value;
    if (!metadataDirtyRef.current) { setNotes(value.notes || ''); setSoftware(value.software || ''); setSoftwareVersion(value.softwareVersion || ''); }
  }, []);
  const refresh = useCallback(async () => {
    const sequence = generation.current;
    const results = await Promise.allSettled([request<Workspace>(endpoint), request<RevisionState>(revisionEndpoint)]);
    if (generation.current !== sequence) return;
    if (results[0].status === 'fulfilled') acceptWorkspace(results[0].value); else throw results[0].reason;
    if (results[1].status === 'fulfilled') setRevision(results[1].value); else throw results[1].reason;
  }, [request, endpoint, revisionEndpoint, acceptWorkspace]);
  const refreshPublishing = useCallback(async () => {
    const sequence = generation.current;
    const results = await Promise.allSettled([request<PublishState>('/api/publish'), request<{ jobs: PlatformJob[] }>('/api/publishing/jobs')]);
    if (generation.current !== sequence) return;
    if (results[0].status === 'fulfilled') {
      const value = results[0].value; setPublish(value);
      if (previewId && value.environments?.staging?.previewId === previewId && !value.active) { setPreviewReady(true); if (value.lastJob?.environment === 'staging' && value.lastJob.status === 'succeeded' && value.lastJob.previewId === previewId && !announcedJobs.current.has(value.lastJob.id)) { announcedJobs.current.add(value.lastJob.id); notify('发布预览已生成'); } }
      if (value.lastJob?.previewId === previewId && value.lastJob?.status === 'failed') { setPreviewReady(false); setError(value.lastJob.error || '网站预览失败，请检查文章信息'); }
      if (previewId && value.lastJob?.environment === 'production' && value.lastJob.status === 'succeeded' && value.lastJob.previewId === previewId) { setPreviewReady(false); setPreviewId(null); if (!announcedJobs.current.has(value.lastJob.id)) { announcedJobs.current.add(value.lastJob.id); notify(value.localOnly ? '本地发布版本已更新' : '网站版本已更新'); } void refresh(); }
    }
    if (results[1].status === 'fulfilled') setPlatformJobs(results[1].value.jobs);
  }, [request, previewId, refresh, notify]);

  useEffect(() => {
    generation.current += 1; announcedJobs.current.clear(); readSequence.current += 1; controller.current?.abort(); setTab(initialTab); setArticleMode('working'); setSelectedHistory(null); setReadArticle(null); setWorkspace(null); setRevision(null); setLoading(true); setError(''); setMetadataDirty(false); metadataDirtyRef.current = false; setProgress(null); setPendingFiles([]); setUploading(false); setPreviewId(null); setPreviewReady(false); setSelectedVideoPreview(null);
    void refresh().catch((problem) => setError((problem as Error).message)).finally(() => setLoading(false));
    return () => { generation.current += 1; controller.current?.abort(); };
  }, [slug, kind, refresh]);
  useEffect(() => { setTab(initialTab); }, [initialTab]);
  useEffect(() => { folderRef.current?.setAttribute('webkitdirectory', ''); }, []);
  useEffect(() => { if (!loading && articleRevision) void request<RevisionState>(revisionEndpoint).then(setRevision).catch((problem) => setError((problem as Error).message)); }, [articleRevision, loading, revisionEndpoint, request]);
  useEffect(() => { if (tab !== 'publish') return; void refreshPublishing(); const timer = window.setInterval(() => void refreshPublishing(), isRunning(publish?.active) ? 1500 : 10000); return () => window.clearInterval(timer); }, [tab, refreshPublishing, Boolean(publish?.active)]);
  useEffect(() => { const listener = (event: BeforeUnloadEvent) => { if (!metadataDirty && !uploadRef.current) return; event.preventDefault(); event.returnValue = ''; }; window.addEventListener('beforeunload', listener); return () => window.removeEventListener('beforeunload', listener); }, [metadataDirty]);
  useEffect(() => { onPendingChange?.(metadataDirty || uploading || filmingPending); }, [metadataDirty, uploading, filmingPending, onPendingChange]);
  useEffect(() => () => { onPendingChange?.(false); }, [onPendingChange]);

  const openConfirm = (value: 'publish' | 'restore') => { dialogReturnRef.current = document.activeElement as HTMLElement; setConfirm(value); };
  const openFile = (value: Asset) => { dialogReturnRef.current = document.activeElement as HTMLElement; setPreviewAsset(value); };
  const restoreDialogFocus = (event: Event) => { event.preventDefault(); const target = dialogReturnRef.current; if (target?.isConnected) target.focus(); else if (headingRef.current?.classList.contains('sr-only')) headingRef.current.closest('.content-workspace')?.querySelector<HTMLButtonElement>('.cw-back')?.focus(); else headingRef.current?.focus(); };
  const run = async (action: () => Promise<void>) => { if (busy) return; setBusy(true); setError(''); try { await action(); } catch (problem) { setError((problem as Error).message); } finally { setBusy(false); } };
  const patch = async (value: Record<string, unknown>) => {
    const current = workspaceRef.current; if (!current) throw new Error('内容尚未加载，请刷新后再试');
    const result = await request<Workspace>(endpoint, json({ revision: current.revision, ...value }, 'PATCH'));
    acceptWorkspace(result); return result;
  };
  const saveMetadata = () => void run(async () => { await patch({ notes, software, softwareVersion }); setMetadataDirty(false); metadataDirtyRef.current = false; notify('制作说明已保存'); });
  const selectVideo = (asset: Asset) => void run(async () => { await patch({ selectedVideoId: asset.id }); setSelectedVideoPreview(asset.id); notify(`已选用 ${asset.filename}，已有发布记录保持原版本`); });
  const uploadFiles = async (files: File[], forcedCategory?: Category, selectedCategory = uploadCategory) => {
    if (!files.length || uploadRef.current) return;
    uploadRef.current = true; setUploading(true); setError(''); setPendingFiles(files); pendingUploadOptions.current = { forcedCategory, selectedCategory };
    const activeController = new AbortController(); controller.current = activeController;
    const sequence = generation.current;
    let processed = 0;
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index]; const category = forcedCategory || (selectedCategory === 'auto' ? inferCategory(file) : selectedCategory);
        const relativePath = file.webkitRelativePath || file.name;
        const current = workspaceRef.current;
        let intent = current?.uploads.find((upload) => upload.filename === file.name && upload.size === file.size && upload.category === category && (!upload.relativePath || upload.relativePath === relativePath));
        if (!intent) intent = await request<UploadIntent>(`${endpoint}/uploads`, { ...json({ filename: file.name, size: file.size, mime: file.type, category, relativePath, groupId: category === 'video' ? videoGroupRef.current : undefined }), signal: activeController.signal });
        let completed = 0;
        for (let part = 1; part <= intent.totalParts; part++) {
          const from = (part - 1) * intent.chunkSize; const to = Math.min(file.size, part * intent.chunkSize);
          if (!intent.receivedParts.includes(part)) await request(`${endpoint}/uploads/${intent.id}/parts/${part}`, { method: 'PUT', headers: { 'Content-Type': 'application/octet-stream' }, body: file.slice(from, to), signal: activeController.signal });
          completed += to - from; if (generation.current === sequence) setProgress({ filename: file.name, done: completed, total: file.size, fileIndex: index + 1, fileCount: files.length });
        }
        const result = await request<{ asset: Asset; workspace: Workspace }>(`${endpoint}/uploads/${intent.id}/complete`, { ...json({}), signal: activeController.signal });
        if (generation.current !== sequence) return;
        acceptWorkspace(result.workspace); processed += 1;
        if (category === 'video') { videoGroupRef.current = result.asset.groupId; await patch({ selectedVideoId: result.asset.id }); setSelectedVideoPreview(result.asset.id); }
      }
      setPendingFiles([]); setProgress(null); notify(`${files.length} 个文件已保存，可在其他设备继续使用`);
    } catch (problem) {
      if (generation.current === sequence) { setPendingFiles(files.slice(processed)); setError(activeController.signal.aborted ? '上传已暂停，已传分片保留；可继续上传。' : (problem as Error).message); await refresh().catch(() => undefined); }
    } finally { uploadRef.current = false; if (generation.current === sequence) setUploading(false); }
  };
  const readVersion = async (mode: 'published' | 'history', digest?: string) => {
    setArticleMode(mode); setReadArticle(null); setSelectedHistory(digest || null); setError('');
    const readingSequence = ++readSequence.current;
    if (mode === 'history' && !digest) return;
    setReading(true); const sequence = generation.current;
    try { const result = await request<WorkspaceArticle>(mode === 'published' ? `${revisionEndpoint}/published` : `${revisionEndpoint}/history/${digest}`); if (sequence === generation.current && readingSequence === readSequence.current) setReadArticle(result); }
    catch (problem) { if (sequence === generation.current && readingSequence === readSequence.current) setError((problem as Error).message); }
    finally { if (sequence === generation.current && readingSequence === readSequence.current) setReading(false); }
  };
  const restore = () => void run(async () => {
    if (!selectedHistory || !revision) return;
    let targetRevision = revision.workingRevision;
    if (dirty) { const saved = await onSave(); if (!saved) throw new Error('未能保存当前工作稿，请关闭弹窗检查后重试'); targetRevision = saved.revision; }
    const result = await request<WorkspaceArticle>(`${revisionEndpoint}/restore`, json({ revision: selectedHistory, targetRevision }));
    onRestore?.(result); setConfirm(null); setArticleMode('working'); await refresh(); notify('历史版本已恢复为工作稿，线上文章尚未变更');
  });
  const prepareWebsite = (action: 'publish' | 'unpublish') => void run(async () => {
    const saved = await onSave(); if (!saved) return;
    const result = await request<{ job: PublishJob }>('/api/publish', json({ environment: 'staging', selection: { kind: saved.kind, slug, revision: saved.revision, action } }));
    setPreparedAction(action); setPreviewId(result.job.previewId || null); setPreviewReady(false); notify(action === 'publish' ? '正在生成本篇文章的发布预览' : '正在生成下架预览', 'info'); await refreshPublishing();
  });
  const publishWebsite = () => void run(async () => {
    if (!previewId || !previewReady) return;
    await request('/api/publish', json({ environment: 'production', previewId })); setConfirm(null); setPreviewReady(false); notify(publish?.localOnly ? '正在更新本地发布版本' : '正在发布已确认的版本', 'info'); await refreshPublishing();
  });
  const leave = () => { if ((metadataDirty || uploading || filmingPending) && !window.confirm(uploading ? '离开会暂停当前上传，已传分片会保留。确定离开吗？' : '拍摄准备或制作说明有未保存的修改，确定离开吗？')) return; controller.current?.abort(); onBack(); };
  const videos = useMemo(() => (workspace?.assets || []).filter((asset) => asset.category === 'video').slice().reverse(), [workspace]);
  const video = workspace?.assets.find((asset) => asset.id === selectedVideoPreview) || workspace?.currentVideo || null;
  const materialAssets = useMemo(() => (workspace?.assets || []).filter((asset) => (filter === 'all' || asset.category === filter) && `${asset.filename} ${asset.relativePath}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())).slice().reverse(), [workspace, filter, search]);
  const linkedJobs = platformJobs.filter((job) => (workspace && job.content_ref?.id === workspace.id) || job.content_ref?.slug === slug);
  const lastJob = publish?.active || publish?.lastJob;
  const canPublish = Boolean(publish?.enabled && !busy && !isRunning(publish.active));
  const readonlyPlugins = useMemo(() => [gfm(), highlight(), revisionImagePreview(readArticle)], [readArticle]);
  const privateUrl = (asset: Asset, download = false) => apiUrl(`${endpoint}/assets/${asset.id}${download ? '?download=1' : ''}`);
  const changeTab = (value: WorkspaceTab) => { setTab(value); setError(''); if (value === 'video') videoGroupRef.current = workspace?.currentVideo?.groupId; };
  const readonlyArticle = reading ? <div className="cw-loading"><LoaderCircle className="spin" size={20} aria-hidden="true" />正在加载版本…</div> : readArticle ? <article className="cw-readonly bytemd-preview"><h2>{articleTitle(readArticle)}</h2><Suspense fallback={<p>正在显示正文…</p>}><Viewer value={readArticle.body} plugins={readonlyPlugins} /></Suspense></article> : null;

  return <section className="content-workspace" aria-label="内容工作区">
    <header className="cw-header"><button className="cw-button cw-back" type="button" aria-label="返回" onClick={leave}><ArrowLeft size={17} aria-hidden="true" /><span>返回</span></button><nav className="cw-tabs" aria-label="当前内容"><button type="button" aria-current={tab === 'filming' ? 'page' : undefined} onClick={() => changeTab('filming')}><Clapperboard size={18} aria-hidden="true" />选题与拍摄</button><button type="button" aria-current={tab === 'article' ? 'page' : undefined} onClick={() => changeTab('article')}><FileText size={18} aria-hidden="true" />文章</button><button type="button" aria-current={tab === 'video' ? 'page' : undefined} onClick={() => changeTab('video')}><Film size={18} aria-hidden="true" />视频{videos.length > 0 && <span className="cw-count">{videos.length}</span>}</button><button type="button" aria-current={tab === 'assets' ? 'page' : undefined} onClick={() => changeTab('assets')}><FolderOpen size={18} aria-hidden="true" />制作素材{Boolean(workspace?.assets.length) && <span className="cw-count">{workspace?.assets.length}</span>}</button><button type="button" aria-current={tab === 'publish' ? 'page' : undefined} onClick={() => changeTab('publish')}><Send size={18} aria-hidden="true" />发布</button></nav><div className="cw-statusline"><span>{dirty ? '工作稿未保存' : revision ? articleStatus[revision.status] : '加载文章状态…'}</span><span>{workspace?.currentVideo ? '成片已就绪' : '暂无成片'}</span></div><IconButton className="cw-button cw-icon cw-refresh" type="button" aria-label="刷新内容状态" disabled={loading || busy || uploading} onClick={() => void run(refresh)}><RefreshCw size={17} aria-hidden="true" /></IconButton></header>
    <div className="cw-content-heading"><h1 ref={headingRef} tabIndex={-1} className={tab === 'article' && articleMode === 'working' ? 'sr-only' : 'cw-content-title'}>{tab === 'filming' ? savedTitle || title : title}</h1>{tab === 'filming' && <HelpTip label="选题标题说明">选题与文章共用这个已保存标题。在“文章”页修改标题并保存后，内容库和拍摄排期会一起更新。</HelpTip>}</div>
    {error && <div className="cw-message cw-message-error" role="alert"><CircleAlert size={17} aria-hidden="true" /><span>{error}</span><IconButton type="button" className="cw-button cw-icon" aria-label="关闭提示" onClick={() => setError('')}><X size={16} aria-hidden="true" /></IconButton></div>}
    {progress && <div className="cw-upload-progress" role="status"><div><span>{uploading ? '上传中' : '已暂停'} · {progress.filename}</span><span>{progress.fileIndex}/{progress.fileCount} · {bytes(progress.done)} / {bytes(progress.total)}</span></div><progress max={progress.total || 1} value={progress.done} aria-label={`${progress.filename} 上传进度`} /><button type="button" className="cw-button" onClick={() => uploading ? controller.current?.abort() : void uploadFiles(pendingFiles, pendingUploadOptions.current.forcedCategory, pendingUploadOptions.current.selectedCategory)}>{uploading ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{uploading ? '暂停' : '继续上传'}</button></div>}
    {!uploading && pendingFiles.length > 0 && !progress && <button type="button" className="cw-button" onClick={() => void uploadFiles(pendingFiles, pendingUploadOptions.current.forcedCategory, pendingUploadOptions.current.selectedCategory)}><RefreshCw size={16} aria-hidden="true" />重试剩余 {pendingFiles.length} 个文件</button>}
    <div hidden={tab !== 'filming'}><FilmingPanel slug={slug} active={active && tab === 'filming'} request={request} onPendingChange={setFilmingPending} /></div>
    <div hidden={tab !== 'article'} className="cw-article-tab">
      <div className="cw-article-toolbar"><nav className="cw-subnav" aria-label="文章版本"><button type="button" aria-current={articleMode === 'working' ? 'page' : undefined} onClick={() => setArticleMode('working')}>工作稿</button><button type="button" disabled={!revision?.publishedRevision} aria-current={articleMode === 'published' ? 'page' : undefined} onClick={() => void readVersion('published')}>线上版</button><button type="button" aria-current={articleMode === 'history' ? 'page' : undefined} onClick={() => void readVersion('history')}><History size={15} aria-hidden="true" />历史版本{revision && <span>{revision.history.length}</span>}</button><HelpTip label="文章版本说明">保存后，标题同步到内容库和拍摄排期；保存工作稿不会发布。{revision?.publishedAt ? `最近发布于 ${date(revision.publishedAt)}；线上版显示已公开的内容。` : '发布后可在“线上版”查看已公开的内容。'}</HelpTip></nav>{articleMode === 'working' && articleToolbar}</div>
      <div hidden={articleMode !== 'working'}>{children}</div>
      {articleMode === 'published' && readonlyArticle}
      {articleMode === 'history' && <div className="cw-history"><div className="cw-history-list"><h2>保存记录</h2>{!revision?.history.length ? <p className="cw-muted">保存文章后，这里会保留历史版本。</p> : revision.history.map((entry) => <button key={entry.revision} type="button" className={`cw-history-item ${selectedHistory === entry.revision ? 'is-selected' : ''}`} onClick={() => void readVersion('history', entry.revision)}><span>{entry.title || title}</span><small>{date(entry.createdAt)}{entry.current ? ' · 当前工作稿' : ''}{entry.published ? ' · 线上版' : ''}</small></button>)}</div><div className="cw-history-preview">{readArticle ? <><div className="cw-section-heading"><h2>版本预览</h2>{onRestore && <button className="cw-button" type="button" disabled={busy || selectedHistory === revision?.workingRevision} onClick={() => openConfirm('restore')}><RotateCcw size={16} aria-hidden="true" />恢复为工作稿</button>}</div>{readonlyArticle}</> : <p className="cw-muted">选择一条保存记录，查看正文。</p>}</div></div>}
    </div>
    {tab === 'video' && <div className="cw-panel"><div className="cw-section-heading"><h2>成片</h2><div className="cw-actions"><span className="cw-private"><LockKeyhole size={14} aria-hidden="true" />私有保存</span><button type="button" className="cw-button cw-primary" disabled={loading || uploading || !workspace} onClick={() => { videoGroupRef.current = workspace?.currentVideo?.groupId; videoInputRef.current?.click(); }}><Upload size={17} aria-hidden="true" />{videos.length ? '上传新版本' : '上传成片'}</button></div></div>
      {video ? <div className="cw-video-layout"><div className="cw-video-preview"><video key={video.id} src={privateUrl(video)} controls preload="metadata" playsInline /><div className="cw-video-caption"><strong>{video.filename}</strong><span>{bytes(video.size)}{video.duration ? ` · ${Math.round(video.duration)} 秒` : ''}{video.width && video.height ? ` · ${video.width} × ${video.height}` : ''}</span></div></div><div className="cw-video-versions"><h3>文件版本</h3>{videos.map((asset) => <div key={asset.id} className={`cw-version-row ${asset.id === video.id ? 'is-selected' : ''}`}><button type="button" className="cw-version-label" onClick={() => setSelectedVideoPreview(asset.id)}><span>{asset.filename}</span><small>v{asset.version} · {date(asset.createdAt)} · {bytes(asset.size)}</small></button>{workspace?.selectedVideoId === asset.id ? <span className="cw-selected-label"><CheckCheck size={15} aria-hidden="true" />已选用</span> : <button className="cw-button" type="button" disabled={busy || uploading} onClick={() => selectVideo(asset)}>选用</button>}<a className="cw-button cw-icon" href={privateUrl(asset, true)} aria-label={`下载 ${asset.filename}`}><Download size={16} aria-hidden="true" /></a></div>)}<button className="cw-button cw-primary" type="button" disabled={!workspace?.currentVideo || !onOpenPublishing || busy || uploading} onClick={() => { changeTab('publish'); }}><Send size={16} aria-hidden="true" />准备发布</button></div></div> : <div className="cw-empty"><Film size={32} aria-hidden="true" /><h3>把剪好的视频放到这里</h3><p>成片和历史版本会跟着这条内容保存。</p><button type="button" className="cw-button" disabled={loading || uploading} onClick={() => videoInputRef.current?.click()}><Upload size={17} aria-hidden="true" />选择视频</button></div>}
      <div className="cw-footnote"><LockKeyhole size={14} aria-hidden="true" /><span>{workspace?.storage.label || '正在读取存储状态'}{workspace && ` · 已用 ${bytes(workspace.usage.bytes)} / ${bytes(workspace.usage.maxBytes)}`}</span><button className="cw-text-button" type="button" onClick={() => changeTab('assets')}>保存原片与剪辑工程</button></div>
    </div>}
    {tab === 'assets' && <div className="cw-panel"><div className="cw-section-heading"><div className="cw-title-inline"><h2>制作素材</h2><span className="cw-private"><LockKeyhole size={14} aria-hidden="true" />仅自己可见</span></div><div className="cw-actions"><a className={`cw-button ${!workspace?.assets.length ? 'is-disabled' : ''}`} aria-disabled={!workspace?.assets.length} href={workspace?.assets.length ? apiUrl(`${endpoint}/package.zip`) : undefined}><Package size={17} aria-hidden="true" />下载素材包</a><button type="button" className="cw-button cw-primary" disabled={loading || uploading || !workspace} onClick={() => inputRef.current?.click()}><Upload size={17} aria-hidden="true" />上传文件</button></div></div>
      <div className="cw-asset-toolbar"><label className="cw-search"><Search size={17} aria-hidden="true" /><input aria-label="搜索制作素材" placeholder="搜索文件名或目录" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="cw-control"><span className="sr-only">筛选素材类型</span><AuthorSelect value={filter} onValueChange={(value) => setFilter(value as Category | 'all')} label="筛选素材类型" options={[{ value: 'all', label: '全部类型' }, ...Object.entries(categories).map(([value, label]) => ({ value, label }))]} /></label><label className="cw-control"><span>上传为</span><AuthorSelect value={uploadCategory} onValueChange={(value) => setUploadCategory(value as Category | 'auto')} disabled={uploading} label="上传分类" options={[{ value: 'auto', label: '自动识别' }, ...Object.entries(categories).map(([value, label]) => ({ value, label }))]} /></label><button type="button" className="cw-button" disabled={loading || uploading || !workspace} onClick={() => folderRef.current?.click()}><FolderOpen size={16} aria-hidden="true" />上传文件夹</button></div>
      {loading ? <div className="cw-loading"><LoaderCircle size={20} className="spin" aria-hidden="true" />正在加载素材…</div> : materialAssets.length ? <div className="cw-asset-list">{materialAssets.map((asset) => <div className="cw-asset-row" key={asset.id}><span className="cw-file-icon"><AssetIcon category={asset.category} /></span><button type="button" className="cw-asset-name" onClick={() => openFile(asset)}><span>{asset.relativePath || asset.filename}</span><small>{categories[asset.category]} · {bytes(asset.size)} · v{asset.version}</small></button><time dateTime={asset.createdAt}>{date(asset.createdAt)}</time><a className="cw-button cw-icon" href={privateUrl(asset, true)} aria-label={`下载 ${asset.filename}`}><Download size={17} aria-hidden="true" /></a></div>)}</div> : <div className="cw-empty"><FolderOpen size={32} aria-hidden="true" /><h3>{search || filter !== 'all' ? '没有匹配的文件' : '留好材料，下次接着改'}</h3><p>{search || filter !== 'all' ? '换个文件名或类型试试。' : '原始录屏、图片、配音和剪辑工程都可以保存。'}</p></div>}
      <div className="cw-footnote"><LockKeyhole size={14} aria-hidden="true" /><span>{workspace?.storage.label || '正在读取存储状态'}{workspace && ` · ${workspace.assets.length} 个文件 · ${bytes(workspace.usage.bytes)}`}</span></div>
      <form className="cw-package-notes" onSubmit={(event) => { event.preventDefault(); saveMetadata(); }}><div className="cw-section-heading"><h2>工程说明</h2><button type="submit" className="cw-button" disabled={!metadataDirty || busy || uploading || !workspace}><Save size={16} aria-hidden="true" />保存说明</button></div><div className="cw-fields-row"><label>剪辑软件<input value={software} placeholder="例如：剪映、Premiere" maxLength={100} onChange={(event) => { setSoftware(event.target.value); setMetadataDirty(true); }} /></label><label>软件版本<input value={softwareVersion} placeholder="实际使用的版本" maxLength={100} onChange={(event) => { setSoftwareVersion(event.target.value); setMetadataDirty(true); }} /></label></div><label>备注<textarea rows={3} value={notes} maxLength={10000} placeholder="记录字体、插件、素材来源，或下次需要修改的位置" onChange={(event) => { setNotes(event.target.value); setMetadataDirty(true); }} /></label></form>
    </div>}
    {tab === 'publish' && <div className="cw-panel cw-publish"><div className="cw-section-heading"><h2>发布这条内容</h2><IconButton className="cw-button cw-icon" type="button" aria-label="刷新发布状态" onClick={() => void run(refreshPublishing)} disabled={busy}><RefreshCw size={17} aria-hidden="true" /></IconButton></div><section className="cw-publish-section"><div className="cw-section-heading"><div className="cw-title-inline"><FileText size={19} aria-hidden="true" /><h3>网站文章</h3><span className="cw-tag">{revision ? articleStatus[revision.status] : '读取状态中'}</span></div>{revision?.publishedAt && <span className="cw-muted">{date(revision.publishedAt)}</span>}</div><p className="cw-publish-copy">{publish?.localOnly ? '在本地生成本篇预览并验证发布流程，正式网站不会变更。' : '先预览本篇文章，再确认上线。其它文章的未发布修改不会带入。'}</p><div className="cw-actions"><button type="button" className="cw-button" disabled={!canPublish} onClick={() => prepareWebsite('publish')}><Play size={16} aria-hidden="true" />{dirty ? '保存并生成预览' : '生成发布预览'}</button>{previewReady && previewId && <><a className="cw-button" href={safeUrl(publish?.environments.staging?.url)} target="_blank" rel="noreferrer"><ExternalLink size={16} aria-hidden="true" />查看预览</a><button type="button" className="cw-button cw-primary" disabled={!canPublish} onClick={() => openConfirm('publish')}><Send size={16} aria-hidden="true" />{publish?.localOnly ? '更新本地发布版本' : preparedAction === 'unpublish' ? '确认下架' : '确认发布'}</button></>}{revision?.publishedRevision && <button type="button" className="cw-button cw-danger" disabled={!canPublish} onClick={() => prepareWebsite('unpublish')}>准备下架</button>}</div>{publish && !publish.enabled && <p className="cw-muted">当前环境未启用网站发布，文章可以继续保存。</p>}{!publish && <p className="cw-muted">正在读取网站发布服务…</p>}{lastJob && <div className={`cw-publish-result ${lastJob.status === 'failed' ? 'is-error' : ''}`} role="status">{isRunning(lastJob) ? <LoaderCircle size={16} className="spin" aria-hidden="true" /> : lastJob.status === 'failed' ? <CircleAlert size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}<span>{lastJob.environment === 'production' ? (publish?.localOnly ? '本地发布版本' : '正式网站') : '发布预览'}：{jobStatus[lastJob.status] || lastJob.status}{lastJob.error ? ` · ${lastJob.error}` : ''}</span></div>}{previewReady && <p className="cw-muted">预览已固定文章版本；之后的工作稿修改需要重新生成预览。</p>}</section>
      <section className="cw-publish-section"><div className="cw-section-heading"><div className="cw-title-inline"><Film size={19} aria-hidden="true" /><h3>平台视频</h3><HelpTip label="平台视频发布说明">各平台分别确认文案与发布结果；修改、下架可从对应平台的管理页面处理。</HelpTip></div>{onOpenPublishing && <button type="button" className="cw-button cw-primary" disabled={!workspace?.currentVideo || busy || uploading} onClick={() => onOpenPublishing({ slug, title, contentId: workspace?.id, videoAssetId: workspace?.currentVideo?.id })}><Send size={16} aria-hidden="true" />选择账号与发布</button>}</div>{workspace?.currentVideo ? <div className="cw-selected-video"><Check size={17} aria-hidden="true" /><span>选用：{workspace.currentVideo.filename}</span><small>v{workspace.currentVideo.version} · {bytes(workspace.currentVideo.size)}</small><button type="button" className="cw-text-button" onClick={() => changeTab('video')}>更换版本</button></div> : <div className="cw-inline-empty"><span>还没有可发布的成片</span><button type="button" className="cw-button" onClick={() => changeTab('video')}><Upload size={16} aria-hidden="true" />上传成片</button></div>}{linkedJobs.length ? <div className="cw-platform-records">{linkedJobs.flatMap((job) => job.targets.map((target) => <div className="cw-record-row" key={target.id}><div><strong>{target.account_snapshot?.alias || platformNames[target.account_snapshot?.platform || ''] || '平台账号'}</strong><small>{platformNames[target.account_snapshot?.platform || ''] || ''} · {date(job.created_at)}</small></div><span className="cw-tag">{jobStatus[target.status] || target.status}</span>{safeUrl(target.post_url) && <a className="cw-button" href={safeUrl(target.post_url)} target="_blank" rel="noreferrer">查看作品<ExternalLink size={15} aria-hidden="true" /></a>}</div>))}</div> : <p className="cw-muted cw-records-empty">这条内容还没有关联的投稿记录。</p>}</section>
    </div>}
    <input ref={videoInputRef} type="file" className="cw-file-input" accept="video/*,.mp4,.mov,.mkv,.webm" aria-label="选择成片视频" onChange={(event) => { const files = Array.from(event.target.files || []); event.target.value = ''; void uploadFiles(files, 'video'); }} />
    <input ref={inputRef} type="file" multiple className="cw-file-input" aria-label="选择制作素材" onChange={(event) => { const files = Array.from(event.target.files || []); event.target.value = ''; void uploadFiles(files); }} />
    <input ref={folderRef} type="file" multiple className="cw-file-input" aria-label="选择素材文件夹" onChange={(event) => { const files = Array.from(event.target.files || []); event.target.value = ''; void uploadFiles(files); }} />
    <Dialog.Root open={Boolean(previewAsset)} onOpenChange={(open) => { if (!open) setPreviewAsset(null); }}><AuthorDialogContent onCloseAutoFocus={restoreDialogFocus} aria-describedby={`${id}-file-description`} surface="workspace" className="cw-file-dialog" title={previewAsset?.filename} description={previewAsset && `${categories[previewAsset.category]} · ${bytes(previewAsset.size)} · v${previewAsset.version}`} descriptionId={`${id}-file-description`} descriptionClassName="cw-muted" closeLabel="关闭文件预览">{previewAsset && <>{previewAsset.mime.startsWith('image/') ? <img className="cw-image-preview" src={privateUrl(previewAsset)} alt={previewAsset.filename} /> : previewAsset.mime.startsWith('audio/') ? <audio controls src={privateUrl(previewAsset)} /> : previewAsset.mime.startsWith('video/') ? <video controls playsInline src={privateUrl(previewAsset)} /> : <div className="cw-empty"><AssetIcon category={previewAsset.category} /><p>下载原文件后，用相应软件打开。</p></div>}<a className="cw-button" href={privateUrl(previewAsset, true)}><Download size={17} aria-hidden="true" />下载原文件</a></>}</AuthorDialogContent></Dialog.Root>
    <Dialog.Root open={confirm !== null} onOpenChange={(open) => { if (!open && !busy) setConfirm(null); }}><AuthorDialogContent onCloseAutoFocus={restoreDialogFocus} surface="workspace" title={confirm === 'restore' ? '恢复这个历史版本？' : publish?.localOnly ? '更新本地发布版本？' : preparedAction === 'unpublish' ? '确认下架网站文章？' : '确认发布网站文章？'} description={confirm === 'restore' ? '恢复后的内容会成为新的工作稿，线上文章不会立即改变。' : publish?.localOnly ? '本次仅更新本机的发布版本，用于检查文章发布流程。正式网站不会变更。' : preparedAction === 'unpublish' ? '文章将从网站公开内容中移除，工作稿、视频和制作素材会保留。平台视频不会随之下架。' : `将“${title}”的预览版本发布到正式网站。之后编辑的工作稿不会包含在本次发布中。`}>{error && <p className="cw-dialog-error" role="alert">{error}</p>}<div className="cw-dialog-actions"><Dialog.Close asChild><button type="button" className="cw-button" disabled={busy}>取消</button></Dialog.Close><button type="button" className="cw-button cw-primary" disabled={busy} onClick={confirm === 'restore' ? restore : publishWebsite}>{busy && <LoaderCircle size={16} className="spin" aria-hidden="true" />}{confirm === 'restore' ? '恢复为工作稿' : publish?.localOnly ? '更新本地发布版本' : preparedAction === 'unpublish' ? '确认下架' : '确认发布'}</button></div></AuthorDialogContent></Dialog.Root>
  </section>;
}
