import { useToast } from './AuthorToast';
import AuthorDialogContent from './AuthorDialogContent';
import AuthorSelect from './AuthorSelect';
import { applyLoginSessionUpdate, isClosedLoginSession as closedSession, isSuccessfulLoginSession, loginQrKey, loginQrState, loginSuccessNotice, renewLoginSession, type LoginSessionSnapshot } from './login-session';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { BookOpenText, Check, ChevronDown, CircleAlert, ExternalLink, Film, History, ImagePlus, LoaderCircle, Plus, QrCode, RefreshCw, Send, Unplug, Upload, Users, X } from 'lucide-react';
import './publishing.css';

type Request = <T>(path: string, options?: RequestInit) => Promise<T>;
type Platform = { id: string; name: string; login_method: string; fields: string[]; enabled: boolean; verified: boolean; note?: string; cover_types?: string[] };
type Account = { id: string; platform: string; alias: string; auth_status: string; checked_at?: string; platform_uid?: string; display_name?: string; local_login_command?: string };
type Asset = { id: string; type: string; filename?: string; name?: string; size?: number; duration?: number; width?: number; height?: number };
type Content = { title: string; description: string; tags: string[]; cover_asset_id?: string | null };
type Options = { content_origin: string; source?: string; ai_declaration?: string; tid?: number };
type Choice = { edited: boolean; overrides: Content; platform_options: Options };
type Challenge = { id?: string; challenge_id?: string; type: string; message?: string; expires_at?: string; image_url?: string };
type Session = LoginSessionSnapshot & { message?: string; stage?: string; expires_at?: string; challenge?: Challenge | null; local_login_command?: string };
type Target = { id: string; status: string; stage?: string; submission_intent_at?: string | null; platform_status?: string; post_url?: string; message?: string; error?: string; error_code?: string; overrides?: Partial<Content>; snapshot: Content & { video_asset_id?: string; platform_options?: Options }; account_snapshot: { alias?: string; platform?: string }; account_id?: string; challenge?: Challenge; evidence?: { summary?: string }; attempts?: { id: string; status?: string; result?: { message?: string; evidence?: { summary?: string } }; submission_intent_at?: string; started_at?: string; finished_at?: string }[] };
type Job = { id: string; content_ref?: {id:string;slug:string}; state?: string; status?: string; created_at?: string; video_asset_id?: string; defaults?: Content; targets: Target[] };
type Precheck = { ok: boolean; issues: (string | { message: string; account_id?: string })[]; checked_at?: string };
const API = '/api/publishing';
const DRAFT_KEY = 'author-publishing-draft-v1';
const DRAFT_JOB_KEY = 'author-publishing-draft-job-v1';
const emptyContent = (): Content => ({ title: '', description: '', tags: [] });
function readLocal<T>(key: string): T | null { try { return JSON.parse(sessionStorage.getItem(key) || 'null') as T | null; } catch { return null; } }
function saveLocal(key: string, value: unknown) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* A disabled browser store must not prevent server-side drafts. */ } }
function readDraft(key = DRAFT_KEY): { videoId: string; defaults: Content; choices: Record<string, Choice> } {
  const value = readLocal<{ videoId: string; defaults: Content; choices: Record<string, Choice> }>(key);
  if (!value || typeof value.videoId !== 'string' || typeof value.defaults?.title !== 'string' || typeof value.defaults?.description !== 'string' || !Array.isArray(value.defaults?.tags) || !value.defaults.tags.every(tag => typeof tag === 'string') || !value.choices || typeof value.choices !== 'object') return { videoId: '', defaults: emptyContent(), choices: {} };
  const choices = Object.fromEntries(Object.entries(value.choices).filter(([, choice]) => choice && typeof choice.edited === 'boolean' && typeof choice.overrides?.title === 'string' && typeof choice.overrides?.description === 'string' && Array.isArray(choice.overrides?.tags) && choice.overrides.tags.every(tag => typeof tag === 'string') && typeof choice.platform_options?.content_origin === 'string'));
  return { videoId: value.videoId, defaults: value.defaults, choices };
}
const aiLabel = (value?: string) => value === 'ai_generated' ? '含 AI 生成内容' : '未设置 AI 声明';
const creatorUrls: Record<string, string> = { douyin: 'https://creator.douyin.com/', xiaohongshu: 'https://creator.xiaohongshu.com/', tencent: 'https://channels.weixin.qq.com/', bilibili: 'https://member.bilibili.com/' };
const mediaUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const assetUrl = (id: string) => mediaUrl(`${API}/assets/${encodeURIComponent(id)}/content`);
const json = (value: unknown): RequestInit => ({ method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) });
const labels: Record<string, string> = { invalid: '未登录或已失效', logging_in: '正在登录', working: '正在执行', stopping: '正在停止', waiting_confirmation: '等待扫码后确认', waiting_challenge: '等待人工验证', validating: '校验素材与参数', checking_result: '核对提交结果', uploading_cover: '设置封面', canceled_before_submit: '已取消', unavailable: '暂不可用', queued: '等待执行', running: '正在处理', waiting_user: '等待你处理', submitted: '已提交平台', submission_unknown: '结果待核实', failed: '执行失败', canceled: '已取消', draft: '草稿', committed: '已确认发布', valid: '会话可用', authenticated: '已登录', logged_in: '已登录', expired: '登录已过期', disconnected: '已断开', unknown: '尚未检查', missing: '尚未登录', pending: '等待执行', waiting_scan: '等待扫码', waiting_qr: '等待二维码', waiting_confirm: '请在手机确认', success: '已完成', succeeded: '已完成', completed: '已完成', timeout: '已超时', checking: '正在检查', uploading: '上传中', preparing: '准备中', filling: '填写内容', submitting: '正在提交', verifying: '核对结果', pending_review: '待平台审核', published: '已公开', rejected: '平台未通过', done: '已结束', ready: '准备就绪' };
const label = (value?: string) => value ? labels[value] ?? '正在处理' : '尚未确认';
const date = (value?: string) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }) : '尚无记录';
const fileName = (asset?: Asset) => asset?.filename ?? asset?.name ?? '未选择视频';
const size = (bytes?: number) => bytes === undefined ? '' : bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
const tags = (value: string) => value.split(/[,，\n]/).map(item => item.trim().replace(/^#/, '')).filter(Boolean);
const originLabel = (value?: string) => ({ original: '原创', repost: '转载', unspecified: '未声明' })[value ?? 'unspecified'] ?? '未声明';
const jobSummary = (job: Job) => Object.entries(job.targets.reduce<Record<string, number>>((counts, target) => ({ ...counts, [target.status]: (counts[target.status] ?? 0) + 1 }), {})).map(([status, count]) => `${count} 个${label(status)}`).join(' · ');
const externalUrl = (url?: string) => url && /^https:\/\//i.test(url) ? url : undefined;

function Status({ value }: { value?: string }) { return <span className={`publishing-status state-${value ?? 'unknown'}`}>{label(value)}</span>; }
function ChallengeForm({ challenge, request, onDone }: { challenge: Challenge; request: Request; onDone: () => void }) {
  const [value, setValue] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const id = challenge.challenge_id ?? challenge.id;
  const textInput = ['sms', 'sms_code', 'verification_code', 'code', 'text'].includes(challenge.type);
  return <div className="publishing-challenge"><p>{challenge.message || (textInput ? '请输入本次验证收到的验证码。' : '请按平台要求完成验证。')}</p>{challenge.expires_at && <p className="publishing-muted">有效至 {date(challenge.expires_at)}</p>}{challenge.image_url && challenge.image_url.startsWith(API) && <img className="publishing-qr" src={mediaUrl(challenge.image_url)} alt="本次平台验证二维码" />}{textInput && id && <form onSubmit={async event => { event.preventDefault(); if (busy || !value.trim()) return; setBusy(true); setError(''); try { await request(`${API}/challenges/${encodeURIComponent(id)}/respond`, json({ value })); setValue(''); onDone(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } }}><label className="publishing-field"><span>验证码</span><input autoComplete="one-time-code" inputMode="numeric" value={value} onChange={event => setValue(event.target.value)} /></label><button className="secondary-button" disabled={busy || !value.trim()}>提交验证码</button></form>}{!textInput && id && <button className="secondary-button" disabled={busy} onClick={async () => { if (busy) return; setBusy(true); setError(''); try { await request(`${API}/challenges/${encodeURIComponent(id)}/respond`, json({ value: 'confirmed' })); onDone(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } }}>已完成验证，继续核对</button>}{error && <p role="alert" className="field-error">{error}</p>}</div>;
}

type ContentContext = { slug: string; title: string; contentId?: string; videoAssetId?: string };
export default function PublishingCenter({ request, contentContext, onBack }: { request: Request; contentContext?: ContentContext; onBack?: () => void }) {
  const draftKey = contentContext ? `${DRAFT_KEY}:${contentContext.slug}` : DRAFT_KEY;
  const jobKey = contentContext ? `${DRAFT_JOB_KEY}:${contentContext.slug}` : DRAFT_JOB_KEY;
  const [tab, setTab] = useState<'new' | 'accounts' | 'records'>('new');
  const [platforms, setPlatforms] = useState<Platform[]>([]); const [executorReady, setExecutorReady] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]); const [assets, setAssets] = useState<Asset[]>([]); const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const notify = useToast(); const [busy, setBusy] = useState('');
  const [initialDraft] = useState(() => { const draft = readDraft(draftKey); return { ...draft, videoId: contentContext?.videoAssetId || draft.videoId, defaults: { ...draft.defaults, title: draft.defaults.title || contentContext?.title || '' } }; });
  const lock = useRef(false); const [videoId, setVideoId] = useState(initialDraft.videoId);
  const [defaults, setDefaults] = useState<Content>(initialDraft.defaults); const [tagText, setTagText] = useState(initialDraft.defaults.tags.join(', '));
  const [choices, setChoices] = useState<Record<string, Choice>>(initialDraft.choices);
  const persistedJob = useRef(readLocal<{ id: string; fingerprint: string; key: string }>(jobKey));
  // Preserve text and asset references across an expired login; never persist challenges or codes.
  useEffect(() => { saveLocal(draftKey, { videoId, defaults, choices }); }, [videoId, defaults, choices]);
  const [review, setReview] = useState<{ job: Job; check: Precheck; key: string } | null>(null);
  const reviewElement = useRef<HTMLElement>(null);
  useEffect(() => { if (review) reviewElement.current?.scrollIntoView({ block: 'start', behavior: 'instant' }); }, [review]);
  const savedDraft = useRef<{ fingerprint: string; job: Job } | null>(null); const submitKeys = useRef(new Map<string, string>());
  const [alias, setAlias] = useState(''); const [platformId, setPlatformId] = useState('');
  const [session, setSession] = useState<Session | null>(null); const [sessionOpen, setSessionOpen] = useState(false);
  const sessionRef = useRef<Session | null>(null); const sessionEpoch = useRef(0);
  const notifiedLogins = useRef(new Set<string>());
  const [sessionClock, setSessionClock] = useState(Date.now); const [failedQrKey, setFailedQrKey] = useState(''); const [sessionReadFailedId, setSessionReadFailedId] = useState('');
  const refreshAccounts = useCallback(async () => { const result = await request<{ accounts: Account[] }>(`${API}/accounts`, { signal: AbortSignal.timeout(10_000) }); setAccounts(result.accounts); }, [request]);
  const completeLogin = useCallback((next: Session, expectedId: string, epoch: number) => {
    const notice = loginSuccessNotice(sessionRef.current, next, expectedId, epoch === sessionEpoch.current, notifiedLogins.current);
    if (notice === 'ignore') return false;
    setSessionOpen(false); setError(''); setSessionReadFailedId('');
    if (notice === 'first') {
      notify('账号已连接。');
      setAccounts(current => current.map(account => account.id === next.account_id ? { ...account, auth_status: 'valid' } : account));
      void refreshAccounts().catch(() => { if (epoch === sessionEpoch.current && sessionRef.current?.id === expectedId) setError('账号已连接，账号列表暂时无法刷新，请稍后刷新。'); });
    }
    return true;
  }, [notify, refreshAccounts]);
  const selectSession = (next: Session) => { sessionRef.current = next; setSession(next); setFailedQrKey(''); setSessionReadFailedId(''); setSessionClock(Date.now()); };
  const updateSession = useCallback((next: Session, expectedId: string, epoch: number) => {
    if (sessionEpoch.current !== epoch) return;
    const current = applyLoginSessionUpdate(sessionRef.current, next, expectedId);
    if (current !== sessionRef.current) { sessionRef.current = current; setSession(current); }
    if (current === next) completeLogin(next, expectedId, epoch);
  }, [completeLogin]);
  // Expire an already-loaded image even when the network fails or polling is paused in a hidden tab.
  useEffect(() => {
    if (!sessionOpen || !session || closedSession(session.status)) return;
    const tick = () => setSessionClock(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    const untilExpiry = Date.parse(session.qr_expires_at ?? '') - Date.now();
    const expiryTimer = Number.isFinite(untilExpiry) && untilExpiry > 0 ? window.setTimeout(tick, Math.min(untilExpiry + 1, 2_147_483_647)) : undefined;
    window.addEventListener('focus', tick); document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(timer); clearTimeout(expiryTimer); window.removeEventListener('focus', tick); document.removeEventListener('visibilitychange', tick); };
  }, [sessionOpen, session?.id, session?.status, session?.qr_expires_at]);
  const qrState = session?.operation === 'login' ? loginQrState(session, sessionClock, failedQrKey, sessionReadFailedId) : 'none';
  const canRenewQr = session?.operation === 'login' && !session.local_login_command && (qrState !== 'none' || ['failed', 'canceled', 'expired', 'timeout', 'invalid'].includes(session.status));
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); const [resolution, setResolution] = useState<Target | null>(null);
  const [resolutionKind, setResolutionKind] = useState('found'); const [resolutionNote, setResolutionNote] = useState(''); const [resolutionUrl, setResolutionUrl] = useState('');
  const fileInput = useRef<HTMLInputElement>(null); const coverInput = useRef<HTMLInputElement>(null);
  const platform = (id: string) => platforms.find(item => item.id === id);
  const video = assets.find(item => item.id === videoId);
  const refresh = useCallback(async () => {
    const [capabilities, accountData, assetData, jobData] = await Promise.all([
      request<{ platforms: Platform[]; executor_ready: boolean }>(`${API}/capabilities`), request<{ accounts: Account[] }>(`${API}/accounts`), request<{ assets: Asset[] }>(`${API}/assets`), request<{ jobs: Job[] }>(`${API}/jobs`),
    ]);
    setPlatforms(capabilities.platforms); setExecutorReady(capabilities.executor_ready); setAccounts(accountData.accounts); setAssets(assetData.assets); setJobs(contentContext ? jobData.jobs.filter(job => job.content_ref?.id === contentContext.contentId || job.content_ref?.slug === contentContext.slug) : jobData.jobs);
    setPlatformId(current => current || capabilities.platforms.find(item => item.enabled)?.id || capabilities.platforms[0]?.id || '');
  }, [request]);
  useEffect(() => { let active = true; refresh().catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [refresh]);
  useEffect(() => {
    let active = true; let inFlight = false;
    const poll = async () => {
      if (inFlight || document.hidden) return;
      const current = sessionRef.current;
      if (!current || closedSession(current.status) || lock.current) return;
      const epoch = sessionEpoch.current; inFlight = true;
      try {
        const result = await request<{ session: Session }>(`${API}/login-sessions/${current.id}`, { signal: AbortSignal.timeout(10_000) });
        if (active && epoch === sessionEpoch.current && sessionRef.current?.id === current.id) {
          updateSession(result.session, current.id, epoch); setSessionReadFailedId('');
          if (closedSession(result.session.status) && !isSuccessfulLoginSession(result.session)) await refreshAccounts();
        }
      } catch (e) {
        if (active && epoch === sessionEpoch.current && sessionRef.current?.id === current.id) { setSessionReadFailedId(current.id); setError((e as Error).message); }
      } finally { inFlight = false; }
    };
    const resume = () => { if (!document.hidden) void poll(); };
    const timer = window.setInterval(() => void poll(), 3500);
    window.addEventListener('focus', resume); document.addEventListener('visibilitychange', resume);
    void poll();
    return () => { active = false; clearInterval(timer); window.removeEventListener('focus', resume); document.removeEventListener('visibilitychange', resume); };
  }, [request, refreshAccounts, updateSession, session?.id, session?.status]);
  useEffect(() => {
    let active = true; let inFlight = false;
    const timer = window.setInterval(async () => {
      if (inFlight || document.hidden) return;
      inFlight = true;
      try {
        if (selectedJob) { const result = await request<{ job: Job }>(`${API}/jobs/${selectedJob.id}`); if (active) setSelectedJob(result.job); }
        if (tab === 'records') { const result = await request<{ jobs: Job[] }>(`${API}/jobs`); if (active) setJobs(contentContext ? result.jobs.filter(job => job.content_ref?.id === contentContext.contentId || job.content_ref?.slug === contentContext.slug) : result.jobs); }
      } catch (e) { if (active) setError((e as Error).message); } finally { inFlight = false; }
    }, 3500);
    return () => { active = false; clearInterval(timer); };
  }, [request, selectedJob?.id, tab]);
  const act = async (name: string, fn: () => Promise<void>) => {
    if (lock.current) return; lock.current = true; setBusy(name); setError('');
    try { await fn(); } catch (e) { setError((e as Error).message); } finally { lock.current = false; setBusy(''); }
  };
  const changed = () => { setReview(null); };
  const setDefault = (patch: Partial<Content>) => { changed(); setDefaults(current => ({ ...current, ...patch })); };
  const patchChoice = (id: string, patch: Partial<Choice>) => { changed(); setChoices(current => ({ ...current, [id]: { ...current[id], ...patch } })); };
  const patchOptions = (id: string, patch: Partial<Options>) => patchChoice(id, { platform_options: { ...choices[id].platform_options, ...patch } });
  const upload = async (file: File, type: 'video' | 'cover', onAsset: (asset: Asset) => void) => act('upload', async () => {
    const result = await request<{ asset: Asset }>(`${API}/assets?filename=${encodeURIComponent(file.name)}&type=${type}`, { method: 'POST', headers: { 'content-type': file.type || 'application/octet-stream' }, body: file });
    setAssets(current => [result.asset, ...current.filter(item => item.id !== result.asset.id)]); changed(); onAsset(result.asset); notify(type === 'video' ? '视频已保存，可以继续填写发布内容。' : '封面已保存。');
  });
  const payload = () => ({ ...(contentContext?.contentId ? { content_ref: { id: contentContext.contentId, slug: contentContext.slug } } : {}), video_asset_id: videoId, defaults, targets: Object.entries(choices).map(([account_id, choice]) => ({ account_id, overrides: choice.edited ? choice.overrides : {}, platform_options: choice.platform_options })) });
  const saveDraft = async () => {
    if (!videoId) throw new Error('请先选择一个视频。');
    if (!Object.keys(choices).length) throw new Error('请至少选择一个目标账号。');
    const body = payload(); const fingerprint = JSON.stringify(body);
    if (persistedJob.current?.fingerprint === fingerprint) {
      const { job } = await request<{ job: Job }>(`${API}/jobs/${persistedJob.current.id}`);
      if ((job.status ?? job.state) === 'committed') { setSelectedJob(job); setTab('records'); throw new Error('这份内容已确认发布，请在记录中查看结果。'); }
      submitKeys.current.set(job.id, persistedJob.current.key);
      savedDraft.current = { fingerprint, job }; return job;
    }
    const { job } = await request<{ job: Job }>(`${API}/jobs`, json(body));
    const key = crypto.randomUUID(); submitKeys.current.set(job.id, key);
    persistedJob.current = { id: job.id, fingerprint, key }; saveLocal(jobKey, persistedJob.current);
    savedDraft.current = { fingerprint, job }; await refresh(); return job;
  };
  const checkDraft = () => act('check', async () => { const job = await saveDraft(); const check = await request<Precheck>(`${API}/jobs/${job.id}/precheck`, json({})); const key = submitKeys.current.get(job.id) ?? crypto.randomUUID(); submitKeys.current.set(job.id, key); setReview({ job, check, key }); });
  const submit = () => act('submit', async () => {
    if (!review?.check.ok) return;
    const { job } = await request<{ job: Job }>(`${API}/jobs/${review.job.id}/submit`, json({ idempotency_key: review.key })); setSelectedJob(job); setReview(null); savedDraft.current = null; persistedJob.current = null; saveLocal(jobKey, null); setVideoId(''); setDefaults(emptyContent()); setTagText(''); setChoices({}); setTab('records'); notify('任务已保存，正在依次处理各目标。'); await refresh();
  });
  const accountAction = (account: Account, action: 'login-sessions' | 'check') => act(account.id, async () => {
    const epoch = ++sessionEpoch.current;
    const previous = sessionRef.current;
    if (previous?.account_id === account.id) {
      const result = await request<{ session: Session }>(`${API}/login-sessions/${previous.id}`, { signal: AbortSignal.timeout(10_000) });
      if (epoch !== sessionEpoch.current) return;
      selectSession({ ...result.session, account_id: account.id });
      if (!closedSession(previous.status) && completeLogin(result.session, previous.id, epoch)) return;
      if (!closedSession(result.session.status)) { setSessionOpen(true); return; }
    }
    const result = await request<{ session: Session }>(`${API}/accounts/${account.id}/${action}`, json({}));
    if (epoch !== sessionEpoch.current) return;
    selectSession({ ...result.session, account_id: account.id }); setSessionOpen(true); await refreshAccounts();
  });
  const renewQr = () => act('refresh-login', async () => {
    const previous = sessionRef.current;
    if (!previous) return;
    const epoch = ++sessionEpoch.current;
    const next = await renewLoginSession(previous, {
      get: async id => (await request<{ session: Session }>(`${API}/login-sessions/${id}`, { signal: AbortSignal.timeout(10_000) })).session,
      cancel: async id => (await request<{ session: Session }>(`${API}/login-sessions/${id}/cancel`, { ...json({}), signal: AbortSignal.timeout(10_000) })).session,
      create: async accountId => (await request<{ session: Session }>(`${API}/accounts/${accountId}/login-sessions`, { ...json({}), signal: AbortSignal.timeout(10_000) })).session,
    }, { onCurrent: current => { updateSession(current, previous.id, epoch); if (epoch === sessionEpoch.current) setSessionReadFailedId(''); } });
    if (epoch !== sessionEpoch.current) return;
    selectSession(next); if (!completeLogin(next, next.id, epoch)) await refreshAccounts();
  });
  const cancelLogin = () => act('cancel-login', async () => {
    const current = sessionRef.current;
    if (!current) return;
    const epoch = ++sessionEpoch.current;
    const result = await request<{ session: Session }>(`${API}/login-sessions/${current.id}/cancel`, json({}));
    updateSession(result.session, current.id, epoch); await refreshAccounts();
  });
  const targetAction = (target: Target, action: 'retry' | 'cancel') => act(target.id, async () => { await request(`${API}/targets/${target.id}/${action}`, json({})); if (selectedJob) { const { job } = await request<{ job: Job }>(`${API}/jobs/${selectedJob.id}`); setSelectedJob(job); } await refresh(); });
  const coverSelector = (value: string | null | undefined, onChange: (value: string | null) => void) => <AuthorSelect value={value ?? ''} onValueChange={value => onChange(value || null)} label="选择封面" disabled={!!busy} options={[{ value: '', label: '使用平台默认封面' }, ...assets.filter(item => item.type === 'cover').map(item => ({ value: item.id, label: fileName(item) }))]} />;

  return <section className="publishing-center" aria-label="发布中心">
    {contentContext && <div className="publishing-inline"><button type="button" className="secondary-button" onClick={onBack}><BookOpenText size={16} />返回内容</button><strong>{contentContext.title}</strong></div>}
    <header className="publishing-heading"><div><h1>发布中心</h1><p>一个视频，分别发布到你的平台账号。</p></div><button className="secondary-button" disabled={!!busy || loading} onClick={() => void act('refresh', refresh)}><RefreshCw size={16} aria-hidden="true" />刷新</button></header>
    <nav className="publishing-tabs" aria-label="发布中心页面">{([{ id: 'new', name: '新建发布', Icon: Send }, { id: 'accounts', name: '账号', Icon: Users }, { id: 'records', name: '发布记录', Icon: History }] as const).map(({ id, name, Icon }) => <button type="button" key={id} aria-current={tab === id ? 'page' : undefined} onClick={() => { setTab(id); setError(''); }}><Icon size={17} aria-hidden="true" />{name}</button>)}</nav>
    {error && <div className="publishing-message is-error" role="alert"><CircleAlert size={18} aria-hidden="true" /><span>{error}</span><button aria-label="关闭错误提示" onClick={() => setError('')}><X size={16} /></button></div>}
    {loading ? <div className="publishing-empty"><LoaderCircle className="spin" size={24} /><p>正在读取发布中心…</p></div> : <>
      {!executorReady && <p className="publishing-availability"><CircleAlert size={17} aria-hidden="true" />发布服务尚未就绪，可以先准备视频和草稿，暂时无法登录或投稿。</p>}
      <div hidden={tab !== 'new'}>
        <div className="publishing-compose">
          <fieldset className="publishing-editor" disabled={!!busy}>
            <section className="publishing-section"><h2>视频素材</h2><p className="publishing-muted">选择已上传的视频，或添加一个新视频。</p>
              <div className="publishing-inline"><label className="publishing-field publishing-grow"><span className="sr-only">选择视频</span><AuthorSelect value={videoId} disabled={!!busy} onValueChange={value => { changed(); setVideoId(value); }} label="选择视频" options={[{ value: '', label: '选择已有视频' }, ...assets.filter(item => item.type === 'video').map(item => ({ value: item.id, label: fileName(item) }))]} /></label><button className="secondary-button" disabled={!!busy} onClick={() => fileInput.current?.click()}>{busy === 'upload' ? <LoaderCircle size={16} className="spin" /> : <Upload size={16} />}上传视频</button></div>
              <input className="file-input" ref={fileInput} type="file" accept="video/mp4,video/quicktime,video/webm" aria-label="上传视频文件" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void upload(file, 'video', asset => setVideoId(asset.id)); }} />
            </section>
            <section className="publishing-section"><h2>通用内容</h2><p className="publishing-muted">目标账号默认使用这些内容，也可以单独调整。</p>
              <label className="publishing-field"><span>标题</span><input maxLength={300} value={defaults.title} onChange={event => setDefault({ title: event.target.value })} placeholder="输入视频标题" /></label>
              <label className="publishing-field"><span>简介</span><textarea rows={5} maxLength={10000} value={defaults.description} onChange={event => setDefault({ description: event.target.value })} placeholder="介绍这条视频的内容" /></label>
              <label className="publishing-field"><span>话题 <small>用逗号分隔</small></span><input value={tagText} onChange={event => { setTagText(event.target.value); setDefault({ tags: tags(event.target.value) }); }} placeholder="例如：开发工具，编程教程" /></label>
              <div className="publishing-inline"><label className="publishing-field publishing-grow"><span>封面 <small>选填</small></span>{coverSelector(defaults.cover_asset_id, value => setDefault({ cover_asset_id: value }))}</label><button className="secondary-button" disabled={!!busy} onClick={() => coverInput.current?.click()}><ImagePlus size={16} />上传封面</button></div>
              <input className="file-input" ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp" aria-label="上传封面文件" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void upload(file, 'cover', asset => setDefault({ cover_asset_id: asset.id })); }} />
              {defaults.cover_asset_id && <img className="publishing-cover" src={assetUrl(defaults.cover_asset_id)} alt="已选通用封面" />}
            </section>
            <section className="publishing-section"><div className="publishing-section-heading"><h2>目标账号 <span>{Object.keys(choices).length ? `已选 ${Object.keys(choices).length} 个` : ''}</span></h2><button className="publishing-text-button" onClick={() => setTab('accounts')}><Plus size={15} />管理账号</button></div>
              {!accounts.length ? <p className="publishing-muted">还没有平台账号。先到“账号”添加并登录，再回来选择发布目标。</p> : <div className="publishing-targets">{accounts.map(account => {
                const choice = choices[account.id]; const capability = platform(account.platform); const supportsAI = capability?.fields.includes('ai_declaration');
                return <div key={account.id} className={`publishing-target ${choice ? 'is-selected' : ''}`}>
                  <label className="publishing-account-choice"><input type="checkbox" checked={!!choice} onChange={event => { changed(); setChoices(current => { const next = { ...current }; if (event.target.checked) next[account.id] = { edited: false, overrides: { ...defaults }, platform_options: { content_origin: 'unspecified' } }; else delete next[account.id]; return next; }); }} /><span className="publishing-grow"><strong>{account.alias}</strong><small>{capability?.name ?? account.platform}{account.display_name ? ` · ${account.display_name}` : ''}</small></span><Status value={account.auth_status} /></label>
                  {choice && <div className="publishing-target-body"><p className="publishing-muted">最后检查：{date(account.checked_at)}{account.auth_status !== 'valid' && <button disabled={!!busy || !executorReady} className="publishing-text-button" onClick={() => capability?.login_method === 'local_terminal' ? setTab('accounts') : accountAction(account, 'login-sessions')}>登录账号</button>}</p>
                    <details><summary><ChevronDown size={16} /><span>{choice.edited ? '已单独编辑' : '继承通用内容'}</span><span className="publishing-muted">文案与封面</span></summary><label className="publishing-checkbox"><input type="checkbox" checked={choice.edited} onChange={event => patchChoice(account.id, { edited: event.target.checked, overrides: { ...defaults } })} />为这个账号单独编辑</label>{choice.edited && <><label className="publishing-field"><span>标题</span><input value={choice.overrides.title} onChange={event => patchChoice(account.id, { overrides: { ...choice.overrides, title: event.target.value } })} /></label><label className="publishing-field"><span>简介</span><textarea rows={3} value={choice.overrides.description} onChange={event => patchChoice(account.id, { overrides: { ...choice.overrides, description: event.target.value } })} /></label><label className="publishing-field"><span>话题（逗号分隔）</span><input defaultValue={choice.overrides.tags.join(', ')} onChange={event => patchChoice(account.id, { overrides: { ...choice.overrides, tags: tags(event.target.value) } })} /></label><label className="publishing-field"><span>封面</span>{coverSelector(choice.overrides.cover_asset_id, value => patchChoice(account.id, { overrides: { ...choice.overrides, cover_asset_id: value } }))}</label></>}</details>
                    <div className="publishing-field-grid">{capability?.fields.includes('content_origin') && <label className="publishing-field"><span>内容来源</span><AuthorSelect value={choice.platform_options.content_origin ?? 'unspecified'} onValueChange={value => patchOptions(account.id, { content_origin: value })} label={`${account.alias}：内容来源`} disabled={!!busy} options={[{ value: 'unspecified', label: '未声明' }, { value: 'original', label: '原创' }, { value: 'repost', label: '转载' }]} /></label>}{account.platform === 'bilibili' && <label className="publishing-field"><span>B站分区编号</span><input type="number" min={1} value={choice.platform_options.tid ?? ''} placeholder="填写本视频分区" onChange={event => patchOptions(account.id, { tid: event.target.value ? Number(event.target.value) : undefined })} /></label>}{supportsAI && <label className="publishing-field"><span>AI 内容声明</span><AuthorSelect value={choice.platform_options.ai_declaration ?? 'none'} onValueChange={value => patchOptions(account.id, { ai_declaration: value })} label={`${account.alias}：AI 内容声明`} disabled={!!busy} options={[{ value: 'none', label: '不设置 AI 声明' }, { value: 'ai_generated', label: '含 AI 生成内容' }]} /></label>}</div>
                    {choice.platform_options.content_origin === 'repost' && <label className="publishing-field"><span>转载来源</span><input value={choice.platform_options.source ?? ''} onChange={event => patchOptions(account.id, { source: event.target.value })} placeholder="填写真实来源" /></label>}
                    {capability?.cover_types?.length ? <p className="publishing-muted">封面要求：{capability.cover_types.join('、')}</p> : null}
                  </div>}
                </div>;
              })}</div>}
            </section>
          </fieldset>
          <aside className="publishing-preview" aria-label="视频预览">{video ? <><video controls preload="metadata" src={assetUrl(video.id)} /><div className="publishing-preview-info"><strong>{fileName(video)}</strong><p>{[size(video.size), video.duration ? `${Math.round(video.duration)} 秒` : '', video.width && video.height ? `${video.width} × ${video.height}` : ''].filter(Boolean).join(' · ')}</p><span>仅保存素材，确认发布后才提交平台。</span></div></> : <div className="publishing-video-empty"><Film size={36} aria-hidden="true" /><span>视频预览</span><p>选择视频后显示预览和文件信息</p></div>}</aside>
        </div>
        {review && <section ref={reviewElement} className="publishing-review" aria-label="发布前确认"><h2>发布前确认</h2><p className="publishing-muted">视频：{fileName(video)} · {review.job.targets.length} 个目标</p>{!review.check.ok && <div role="alert" className="publishing-message is-error"><CircleAlert size={18} /><div><strong>请先处理以下问题</strong><ul>{review.check.issues.map((issue, index) => <li key={index}>{typeof issue === 'string' ? issue : issue.message}</li>)}</ul></div></div>}{review.job.targets.map(target => <div className="publishing-review-target" key={target.id}><h3>{target.account_snapshot?.alias || accounts.find(account => account.id === target.account_id)?.alias} <small>{platform(target.account_snapshot?.platform ?? '')?.name}</small></h3><strong>{target.snapshot.title}</strong><p className="publishing-content-copy">{target.snapshot.description || '未填写简介'}</p><p className="publishing-muted">{target.snapshot.tags?.map(item => `#${item}`).join(' ') || '未填写话题'}</p><p className="publishing-muted">内容来源：{originLabel(target.snapshot.platform_options?.content_origin)}{target.snapshot.platform_options?.source ? ` · ${target.snapshot.platform_options.source}` : ''}{target.snapshot.platform_options?.ai_declaration ? ` · ${aiLabel(target.snapshot.platform_options.ai_declaration)}` : ''}{target.snapshot.platform_options?.tid ? ` · B站分区 ${target.snapshot.platform_options.tid}` : ''}</p>{target.snapshot.cover_asset_id ? <img className="publishing-cover" src={assetUrl(target.snapshot.cover_asset_id)} alt={`${target.account_snapshot?.alias ?? '目标'}最终封面`} /> : <p className="publishing-muted">使用平台默认封面</p>}</div>)}<p className="publishing-muted">“已提交平台”表示平台已受理，审核与公开状态以平台结果为准。</p></section>}
        <footer className="publishing-footer"><span className="publishing-muted">{review?.check.ok ? '已完成预检查，请核对以上最终内容。' : '保存草稿和预检查均不会发布作品。'}</span><div><button className="secondary-button" disabled={!!busy} onClick={() => void act('save', async () => { await saveDraft(); notify('发布草稿已保存，可在发布记录中查看。'); })}>保存草稿</button>{review?.check.ok ? <button className="save-button" disabled={!!busy || !executorReady} onClick={() => void submit()}><Send size={17} />{busy === 'submit' ? '正在提交…' : '确认并发布'}</button> : <button className="save-button" disabled={!!busy} onClick={() => void checkDraft()}>{busy === 'check' ? <LoaderCircle className="spin" size={17} /> : <Check size={17} />}预检查与预览</button>}</div></footer>
      </div>
      <div hidden={tab !== 'accounts'}>
        <div className="publishing-section-heading"><div><h2>平台账号</h2><p className="publishing-muted">管理本系统的登录会话。断开后，平台账号和已有作品仍保留。</p></div></div>
        <form className="publishing-account-form" onSubmit={event => { event.preventDefault(); void act('account', async () => { if (!alias.trim()) throw new Error('请填写账号别名。'); await request(`${API}/accounts`, json({ platform: platformId, alias: alias.trim() })); setAlias(''); await refresh(); notify('账号已添加，请完成登录。'); }); }}><label className="publishing-field"><span>平台</span><AuthorSelect value={platformId} onValueChange={setPlatformId} label="平台" disabled={!!busy} placeholder="选择平台" options={platforms.map(item => ({ value: item.id, label: item.name }))} /></label><label className="publishing-field publishing-grow"><span>账号别名</span><input maxLength={80} value={alias} onChange={event => setAlias(event.target.value)} placeholder="方便你识别的名称" /></label><button className="save-button" disabled={!!busy || !platformId || !alias.trim()}><Plus size={17} />添加账号</button></form>
        {!accounts.length ? <div className="publishing-empty"><Users size={30} /><h3>添加你的第一个平台账号</h3><p>创建账号记录后，按照平台要求完成登录。</p></div> : <ul className="publishing-accounts">{accounts.map(account => { const capability = platform(account.platform); return <li key={account.id}><div className="publishing-account-row"><div className="publishing-grow"><h3>{account.alias} <small>{capability?.name ?? account.platform}</small></h3><p>{account.display_name || '尚未读取平台昵称'}{account.platform_uid ? ` · ${account.platform_uid}` : ''}</p><p>最后检查：{date(account.checked_at)}</p></div><Status value={account.auth_status} /><div className="publishing-row-actions">{capability?.login_method !== 'local_terminal' && <button className="secondary-button" disabled={!!busy || !executorReady || !capability?.enabled} onClick={() => void accountAction(account, 'login-sessions')}><QrCode size={16} />{account.auth_status === 'valid' ? '重新登录' : '扫码登录'}</button>}<button className="secondary-button" disabled={!!busy || !executorReady || !capability?.enabled} onClick={() => void accountAction(account, 'check')}><RefreshCw size={15} />检查</button><button className="publishing-text-button" disabled={!!busy || account.auth_status === 'disconnected'} onClick={() => void act(account.id, async () => { await request(`${API}/accounts/${account.id}/session`, { method: 'DELETE' }); await refresh(); notify('已断开本系统保存的会话。'); })}><Unplug size={15} />断开</button></div></div>{capability?.login_method === 'local_terminal' && <details className="publishing-local-login"><summary>完成执行节点本地登录后可从后台投稿</summary><p>请在运行发布服务的电脑或服务器终端完成登录，再回到这里点击“检查”。</p>{account.local_login_command ? <code>{account.local_login_command}</code> : <p>本地登录说明尚未就绪，请联系维护者。</p>}</details>}{capability?.note && <p className="publishing-muted">{capability.note}</p>}</li>; })}</ul>}
      </div>
      <div hidden={tab !== 'records'}>
        <div className="publishing-section-heading"><div><h2>发布记录</h2><p className="publishing-muted">每个目标独立记录。结果待核实的目标需要先人工核对。</p></div></div>
        {!jobs.length ? <div className="publishing-empty"><History size={30} /><h3>还没有发布记录</h3><p>保存草稿或确认发布后，记录会保留在这里。</p><button className="secondary-button" onClick={() => setTab('new')}>新建发布</button></div> : <div className="publishing-record-layout"><ul className="publishing-jobs">{jobs.map(job => <li key={job.id}><button className={selectedJob?.id === job.id ? 'is-selected' : ''} onClick={() => void act('job', async () => { const result = await request<{ job: Job }>(`${API}/jobs/${job.id}`); setSelectedJob(result.job); })}><strong>{job.defaults?.title || job.targets?.[0]?.snapshot?.title || '未命名发布'}</strong><span>{date(job.created_at)}</span><div><Status value={job.status ?? job.state} /><span>{job.targets?.length ?? 0} 个目标</span></div><span>{jobSummary(job)}</span></button></li>)}</ul><div className="publishing-job-detail">{selectedJob ? <><header><h3>{selectedJob.defaults?.title || selectedJob.targets[0]?.snapshot?.title || '发布详情'}</h3><p className="publishing-muted">{date(selectedJob.created_at)}</p>{(selectedJob.status ?? selectedJob.state) === 'draft' && <button className="secondary-button" disabled={!!busy} onClick={() => { const job = selectedJob; const content = job.defaults ?? job.targets[0]?.snapshot ?? { title: '', description: '', tags: [] }; setVideoId(job.video_asset_id ?? job.targets[0]?.snapshot.video_asset_id ?? ''); setDefaults(content); setTagText(content.tags.join(', ')); const next: Record<string, Choice> = {}; for (const target of job.targets) if (target.account_id && accounts.some(account => account.id === target.account_id)) next[target.account_id] = { edited: target.overrides ? Object.keys(target.overrides).length > 0 : true, overrides: { title: target.snapshot.title, description: target.snapshot.description, tags: target.snapshot.tags, cover_asset_id: target.snapshot.cover_asset_id }, platform_options: target.snapshot.platform_options ?? { content_origin: 'unspecified' } }; setChoices(next); savedDraft.current = null; setReview(null); setTab('new'); notify('已载入草稿内容，可调整后重新预检查。'); }}>继续编辑</button>}</header>{selectedJob.targets.map(target => <article className="publishing-record-target" key={target.id}><div className="publishing-section-heading"><h4>{target.account_snapshot?.alias ?? '目标账号'} <small>{platform(target.account_snapshot?.platform ?? '')?.name}</small></h4><Status value={target.status} /></div><p className="publishing-muted">阶段：{label(target.stage)} · {target.submission_intent_at ? '已进入可能提交阶段' : '尚未进入提交阶段'}</p><p className="publishing-muted">平台状态：{target.platform_status === 'unknown' ? '尚未确认' : label(target.platform_status)}</p>{(target.message || target.error || target.evidence?.summary) && <p className="publishing-content-copy">{target.message || target.error || target.evidence?.summary}</p>}{target.challenge && <ChallengeForm challenge={target.challenge} request={request} onDone={() => notify('验证响应已发送。')} />}<details><summary><ChevronDown size={16} />最终内容与执行记录</summary><h4>{target.snapshot.title}</h4><p className="publishing-content-copy">{target.snapshot.description || '未填写简介'}</p><p className="publishing-muted">{target.snapshot.tags?.map(item => `#${item}`).join(' ') || '未填写话题'}</p><p className="publishing-muted">内容来源：{originLabel(target.snapshot.platform_options?.content_origin)}{target.snapshot.platform_options?.source ? ` · ${target.snapshot.platform_options.source}` : ''}{target.snapshot.platform_options?.ai_declaration === 'ai_generated' ? ' · 含 AI 生成内容' : ''}</p>{target.snapshot.cover_asset_id ? <img className="publishing-cover" src={assetUrl(target.snapshot.cover_asset_id)} alt="本目标最终封面" /> : <p className="publishing-muted">使用平台默认封面</p>}{target.attempts?.map((attempt, index) => <p className="publishing-muted" key={attempt.id}>第 {index + 1} 次尝试 · {date(attempt.started_at)} · {label(attempt.status)}{attempt.submission_intent_at ? ' · 曾进入可能提交阶段' : ' · 未记录提交意图'}{attempt.result?.message ? ` · ${attempt.result.message}` : ''}{attempt.result?.evidence?.summary ? ` · ${attempt.result.evidence.summary}` : ''}</p>)}</details><div className="publishing-row-actions">{externalUrl(target.post_url) ? <a className="publishing-text-button" href={externalUrl(target.post_url)} target="_blank" rel="noreferrer">查看作品<ExternalLink size={15} /></a> : target.status === 'submitted' || target.status === 'submission_unknown' ? <span className="publishing-muted">未获取作品链接</span> : null}{target.status === 'failed' && !target.submission_intent_at && <button className="secondary-button" disabled={!!busy || !executorReady} onClick={() => void targetAction(target, 'retry')}><RefreshCw size={15} />重试此目标</button>}{['queued', 'running', 'waiting_user'].includes(target.status) && <button className="secondary-button" disabled={!!busy} onClick={() => void targetAction(target, 'cancel')}>{target.submission_intent_at ? '请求停止并核对' : '取消此目标'}</button>}{target.status === 'submission_unknown' && <button className="secondary-button" onClick={() => { setResolution(target); setResolutionKind('found'); setResolutionNote(''); setResolutionUrl(''); }}>人工核对</button>}</div></article>)}</> : <div className="publishing-empty"><p>选择一条记录，查看各目标的内容和结果。</p></div>}</div></div>}
      </div>
    </>}
    <Dialog.Root open={sessionOpen} onOpenChange={setSessionOpen}>
      <AuthorDialogContent surface="publishing" title="账号登录与检查" description={<>{accounts.find(account => account.id === session?.account_id)?.alias || '当前账号'} · 关闭窗口不会取消正在进行的操作。</>} closeLabel="关闭登录窗口">
        {error && <p role="alert" className="field-error">{error}</p>}
        {session && <>
          <Status value={session.status} />
          {session.message && <p>{session.message}</p>}
          {session.challenge ? <ChallengeForm key={session.challenge.id ?? session.challenge.challenge_id} challenge={session.challenge} request={request} onDone={() => notify('验证响应已发送。')} />
            : busy === 'refresh-login' ? <div className="publishing-empty"><LoaderCircle className="spin" size={24} /><p>正在停止上次登录并重新获取二维码…</p></div>
            : !closedSession(session.status) && session.stage === 'waiting_challenge' ? <div className="publishing-empty"><LoaderCircle className="spin" size={24} /><p>正在完成抖音身份验证…</p></div>
            : qrState === 'ready' && session.qrcode_url ? <><img key={loginQrKey(session)} className="publishing-qr" src={mediaUrl(session.qrcode_url)} alt="当前平台账号登录二维码，请用平台手机应用扫码" onError={() => setFailedQrKey(loginQrKey(session))} /><p className="publishing-muted">请尽快扫码，平台提示失效时请重新获取。</p></>
            : qrState === 'expired' ? <div className="publishing-empty"><QrCode size={28} /><strong>{session.error_code === 'LOGIN_TIMEOUT' || session.status === 'timeout' ? '本次扫码登录已超时' : '二维码需要更新，请重新获取'}</strong></div>
            : qrState === 'image_error' || qrState === 'state_error' ? <div className="publishing-empty"><CircleAlert size={26} /><strong>{qrState === 'image_error' ? '二维码加载失败' : '暂时无法读取登录状态'}</strong><p>请重新获取二维码后扫码。</p></div>
            : !closedSession(session.status) && <div className="publishing-empty"><LoaderCircle className="spin" size={24} /><p>{session.status === 'queued' ? '正在排队，稍后开始。' : session.stage === 'waiting_confirmation' || session.stage === 'waiting_confirm' ? '请在手机上确认登录。' : '正在等待平台响应…'}</p></div>}
          {session.local_login_command && <code className="publishing-local-command">{session.local_login_command}</code>}
          <div className="publishing-row-actions">
            {canRenewQr && !session.challenge && (closedSession(session.status) || session.stage !== 'waiting_challenge') && <button className="secondary-button" disabled={!!busy} onClick={() => void renewQr()}><RefreshCw size={16} />重新获取二维码</button>}
            {!closedSession(session.status) && <button className="secondary-button" disabled={!!busy} onClick={() => void cancelLogin()}>取消本次操作</button>}
          </div>
        </>}
      </AuthorDialogContent>
    </Dialog.Root>
    <Dialog.Root open={!!resolution} onOpenChange={open => { if (!open) setResolution(null); }}><AuthorDialogContent surface="publishing" title="核对发布结果" description="先到平台创作者后台检查本次作品，再记录你的核对结果。"  closeLabel="关闭结果核对">{resolution && creatorUrls[resolution.account_snapshot.platform ?? ''] && <a className="publishing-text-button" href={creatorUrls[resolution.account_snapshot.platform ?? '']} target="_blank" rel="noreferrer">打开平台创作者后台<ExternalLink size={15} /></a>}{error && <p role="alert" className="field-error">{error}</p>}{resolution && <form onSubmit={event => { event.preventDefault(); void act('resolve', async () => { await request(`${API}/targets/${resolution.id}/resolve`, json({ outcome: resolutionKind === 'found' ? 'found' : 'not_published', basis: resolutionNote.trim(), post_url: resolutionUrl.trim() || undefined })); if (selectedJob) { const result = await request<{ job: Job }>(`${API}/jobs/${selectedJob.id}`); setSelectedJob(result.job); } setResolution(null); await refresh(); notify('核对结果已记录。确认未发布的目标可另行点击重试。'); }); }}><label className="publishing-field"><span>核对结果</span><AuthorSelect value={resolutionKind} onValueChange={setResolutionKind} label="人工核对结果" disabled={!!busy} options={[{ value: 'found', label: '已找到本次作品' }, { value: 'missing', label: '确认本次未发布' }]} /></label>{resolutionKind === 'found' && <label className="publishing-field"><span>作品链接 <small>选填</small></span><input type="url" value={resolutionUrl} onChange={event => setResolutionUrl(event.target.value)} placeholder="https://…" /></label>}<label className="publishing-field"><span>核对依据</span><textarea required rows={3} value={resolutionNote} onChange={event => setResolutionNote(event.target.value)} placeholder="说明检查了哪个账号、作品列表和时间" /></label><button className="save-button" disabled={!!busy || !resolutionNote.trim()}>保存核对结果</button></form>}</AuthorDialogContent></Dialog.Root>
  </section>;
}
