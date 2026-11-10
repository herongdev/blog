import { AuthorButton, AuthorField as Field, AuthorInput, AuthorTextarea } from './AuthorUI';
import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Check, CheckCheck, ChevronDown, Circle, CircleAlert, ClipboardList, Download, Film, FolderOpen, FileCheck2, FileText, GitCompareArrows, History, Link2, LoaderCircle, Pause, Play, Plus, RefreshCw, Save, ShieldCheck } from 'lucide-react';
import AuthorDialogContent from './AuthorDialogContent';
import AuthorSelect from './AuthorSelect';
import HelpTip from './HelpTip';
import IconButton from './IconButton';
import { useToast } from './AuthorToast';
import { productionKinds, productionMethods, productionStatus, type AvailableProductionArtifact, type ProductionArtifact, type ProductionCheckDefinition, type ProductionContext, type ProductionRequest, type ProductionRevision } from './production-types';
import { reconcileProductionDrafts, staleProductionDraftStages, type ProductionDraft as Draft, type ProductionDraftSubmission } from './production-drafts';
import ProductionMaterials from './ProductionMaterials';
import { draftFromProductionReference } from './production-reference';
import './production.css';

type Props = { slug: string; title: string; active: boolean; request: ProductionRequest; onPendingChange: (value: boolean) => void; onPreviewArtifact?: (artifact: ProductionArtifact) => void; onOpenSection?: (tab: 'article' | 'video' | 'assets') => void };
type Mutation = { operation: string; expectedVersion: number; idempotencyKey: string; [key: string]: unknown };
type CheckTarget = { id: string; label: string; stageId: string; checks: ProductionCheckDefinition[] };
const json = (input: unknown): RequestInit => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
const stamp = (value: string) => new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));
const revisionLabel = (value: ProductionRevision) => `第 ${value.revisionNumber} 版${value.valid ? '' : ' · 需复核'}`;
const sourceKey = (value: AvailableProductionArtifact) => value.type === 'workspace_asset' ? `asset:${value.assetId}` : `article:${value.kind}:${value.revision}`;
const kindLabel = (kind: string) => productionKinds[kind] || '文件';
const archiveStage = (kind: string, current: string) => ['video', 'audio', 'subtitle', 'cover'].includes(kind) ? 'S08' : kind === 'article' ? 'S09' : current;
const readableStatus = (value: string) => value.replace(/\b(not_started|in_progress|in_review|approved|needs_review|blocked|active|paused|completed)\b/g, (match) => productionStatus[match] || match);
const statusIcon = (status: string) => status === 'approved' ? CheckCheck : status === 'needs_review' || status === 'blocked' ? CircleAlert : status === 'in_review' ? FileCheck2 : status === 'in_progress' ? Play : Circle;
const stagePlaceholders: Record<string, string> = {
  S01: '写下本期标题、观众的真实痛点，以及封面准备如何表达。', S02: '用一句话说明：看完后，哪类观众能独立做什么或判断什么。补充必要前提与本期不涉及的范围。',
  S03: '整理关键事实、官方来源、核对日期和适用范围。将实际观察、推断与未知项分别写清。', S04: '围绕一个例子组织：遇到的问题、直接答案、具体演示、下一步以及检查结果的方法。',
  S05: '比较可用的视觉方向，记录选定分镜。每一拍写清当前焦点、突出方式、退场、观察停顿和下一焦点。', S06: '写完整口播、术语解释、语义停顿及指定音色。变更后，相关配音、字幕和视频需要重新检查。',
  S07: '写下片尾文案、一个主要行动，以及各平台实际需要的结尾版本。', S08: '记录当前试看片、音轨、字幕与封面的版本及需要检查的问题。实际文件在“关联产物”中登记。',
  S09: '正文在文章页编辑，这里记录与成片对照后的修改说明、待核对项和检查范围。先关联已保存的文章修订，无需再复制正文。',
};
function SourceOptions({ values, selected, onChange, label }: { values: { id: string; label: string }[]; selected: string[]; onChange: (ids: string[]) => void; label: string }) {
  return <fieldset className="production-inputs"><legend>{label}</legend>{values.length ? values.map((value) => <label key={value.id}><input type="checkbox" checked={selected.includes(value.id)} onChange={(event) => onChange(event.target.checked ? [...selected, value.id] : selected.filter((id) => id !== value.id))} /><span>{value.label}</span></label>) : <span className="cw-muted">暂无可关联的制作修订。</span>}</fieldset>;
}
function download(text: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([text], { type: mime })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ProductionPanel({ slug, title, active, request, onPendingChange, onPreviewArtifact, onOpenSection }: Props) {
  const [data, setData] = useState<ProductionContext | null>(null);
  const dataRef = useRef<ProductionContext | null>(data); dataRef.current = data;
  const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [stageId, setStageId] = useState('S01'); const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [viewRevisionId, setViewRevisionId] = useState('working'); const [compareId, setCompareId] = useState('');
  const [conflict, setConflict] = useState<ProductionContext | null>(null); const [retry, setRetry] = useState<Mutation | null>(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [modal, setModal] = useState<'decision' | 'check' | 'artifact' | 'grant' | 'pause' | 'blocker' | null>(null);
  const [decision, setDecision] = useState<'approved' | 'changes_requested'>('approved'); const [decisionNote, setDecisionNote] = useState(''); const [decisionTarget, setDecisionTarget] = useState<ProductionRevision | null>(null);
  const [checkTarget, setCheckTarget] = useState<CheckTarget | null>(null); const [checkId, setCheckId] = useState(''); const [checkMethod, setCheckMethod] = useState(''); const [checkResult, setCheckResult] = useState<'passed' | 'failed' | 'not_applicable'>('passed'); const [checkEvidence, setCheckEvidence] = useState(''); const [checkNotes, setCheckNotes] = useState('');
  const [artifactFilter, setArtifactFilter] = useState<'all' | 'article'>('all');
  const [assetSource, setAssetSource] = useState(''); const [artifactKind, setArtifactKind] = useState('video'); const [variant, setVariant] = useState('通用'); const [artifactInputs, setArtifactInputs] = useState<string[]>([]);
  const [grantStages, setGrantStages] = useState<string[]>([]); const [grantActions, setGrantActions] = useState<string[]>(['draft', 'review']); const [grantInstruction, setGrantInstruction] = useState(''); const [grantStop, setGrantStop] = useState('制作方向发生实质改变、事实依据缺失或需要对外发布时停止。');
  const [pauseReason, setPauseReason] = useState(''); const [nextAction, setNextAction] = useState('');
  const notify = useToast(); const id = useId(); const sequence = useRef(0); const lock = useRef(false); const draftsRef = useRef(drafts); draftsRef.current = drafts;
  const attempted = useRef(new Map<string, string>()); const recovered = useRef(false); const dialogTrigger = useRef<HTMLElement | null>(null);
  const draftSubmissions = useRef(new Map<string, ProductionDraftSubmission>());
  const endpoint = `/api/workspaces/${encodeURIComponent(slug)}/production`; const cacheKey = `author-production:${slug}`;
  const stage = data?.stages.find((value) => value.id === stageId);
  const revisions = useMemo(() => data?.stageRevisions.filter((value) => value.stageId === stageId).sort((a, b) => b.revisionNumber - a.revisionNumber) || [], [data, stageId]);
  const current = revisions.find((value) => value.id === stage?.currentRevisionId) || null;
  const viewed = viewRevisionId === 'working' ? current : revisions.find((value) => value.id === viewRevisionId) || null;
  const draft = drafts[stageId]; const content = draft?.content ?? current?.content ?? '';
  const needsRebase = Boolean(current && !current.valid);
  const stageDirty = Boolean(draft && (draft.content !== (current?.content || '') || draft.changeSummary));
  const dirty = Object.entries(drafts).some(([key, value]) => value.content !== (data?.stageRevisions.find((revision) => revision.id === data.stages.find((item) => item.id === key)?.currentRevisionId)?.content || '') || Boolean(value.changeSummary));
  const modalDirty = Boolean(modal && (decisionNote || checkNotes || grantInstruction || pauseReason));
  const readOnly = data?.episode?.status !== 'active';
  const checkDefinition = checkTarget?.checks.find((value) => value.id === checkId);
  const stageArtifacts = data?.artifacts.filter((value) => value.stageId === stageId) || [];
  const validVideos = data?.artifacts.filter((value) => value.valid && value.current !== false && value.kind === 'video') || [];
  const checkedVideo = data?.artifacts.find((value) => value.id === checkTarget?.id && value.kind === 'video');
  const evidenceOptions = checkedVideo ? [{ value: checkedVideo.id, label: `${checkedVideo.filename} · ${checkedVideo.variant} · 第 ${checkedVideo.revisionNumber} 版` }]
    : (checkTarget?.stageId === 'S08' && ['media_playback', 'media_sync', 'mobile_readability', 'learning_loop'].includes(checkId))
    ? validVideos.map((value) => ({ value: value.id, label: `${value.filename} · 第 ${value.revisionNumber} 版` }))
    : [...(checkTarget ? [{ value: checkTarget.id, label: '当前受检修订' }] : []), ...(data?.artifacts.filter((value) => value.valid && value.current !== false && value.id !== checkTarget?.id).map((value) => ({ value: value.id, label: `${value.filename} · 第 ${value.revisionNumber} 版` })) || [])];
  const artifactOptions = (data?.availableArtifacts || []).filter((value) => artifactFilter !== 'article' || value.type === 'article_revision');
  const artifactStageId = archiveStage(artifactKind, stageId);
  const dependencyOptions = data?.stages.flatMap((value) => value.id < artifactStageId && value.currentRevisionId && data.stageRevisions.find((item) => item.id === value.currentRevisionId)?.valid ? [{ id: value.currentRevisionId, label: `${value.id} ${value.name}` }] : []) || [];

  const load = useCallback(async (restore = false) => {
    const ticket = ++sequence.current; setLoading(true); setError('');
    try {
      const value = await request<ProductionContext>(endpoint); if (ticket !== sequence.current) return;
      setData(value); setNeedsRefresh(false); setConflict(!restore && staleProductionDraftStages(draftsRef.current, value).length ? value : null);
      if (restore) {
        setStageId(value.episode?.currentStageId || 'S01');
        try {
          const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
          if (cached && cached.drafts && typeof cached.drafts === 'object' && !Array.isArray(cached.drafts)) {
            const safe = Object.fromEntries(Object.entries(cached.drafts).filter(([key, value]) => /^S0[1-9]$/.test(key) && value && typeof value === 'object' && typeof (value as Draft).content === 'string' && (value as Draft).content.length <= 150000 && typeof (value as Draft).changeSummary === 'string' && (value as Draft).changeSummary.length <= 2000));
            if (Object.keys(safe).length) { setDrafts(safe as Record<string, Draft>); recovered.current = true; if (cached.rowVersion !== value.episode?.rowVersion || Object.entries(safe).some(([key, item]) => (item as Draft).baseRevisionId !== (value.stages.find((stage) => stage.id === key)?.currentRevisionId || null))) setConflict(value); }
          }
        } catch { /* A recovery copy never replaces the server's saved record. */ }
      }
    } catch (problem) { if (ticket === sequence.current) setError((problem as Error).message); }
    finally { if (ticket === sequence.current) setLoading(false); }
  }, [request, endpoint, cacheKey]);
  useEffect(() => { if (active && !lock.current) void load(!dataRef.current); }, [active, load]);
  useEffect(() => () => { ++sequence.current; }, []);
  useEffect(() => { if (active && recovered.current) { recovered.current = false; notify('已恢复本窗口未保存的制作稿', 'info'); } }, [active, data, notify]);
  useEffect(() => { onPendingChange(dirty || busy || modalDirty); }, [dirty, busy, modalDirty, onPendingChange]);
  useEffect(() => () => onPendingChange(false), [onPendingChange]);
  useEffect(() => {
    if (!data || loading) return;
    try { if (dirty) sessionStorage.setItem(cacheKey, JSON.stringify({ rowVersion: data.episode?.rowVersion, drafts })); else sessionStorage.removeItem(cacheKey); } catch { /* Navigation and before-unload guards still protect edits. */ }
  }, [data, drafts, dirty, cacheKey, loading]);
  useEffect(() => { const listener = (event: BeforeUnloadEvent) => { if (dirty || busy || modalDirty) { event.preventDefault(); event.returnValue = ''; } }; window.addEventListener('beforeunload', listener); return () => window.removeEventListener('beforeunload', listener); }, [dirty, busy, modalDirty]);

  async function sendMutation(body: Mutation, message: string, recovering = false): Promise<ProductionContext | null> {
    if (lock.current) return null; lock.current = true; setBusy(true); setError('');
    const ticket = sequence.current;
    try {
      const value = await request<ProductionContext>(`${endpoint}/actions`, json(body)); if (ticket !== sequence.current) return null;
      const submission = draftSubmissions.current.get(body.idempotencyKey);
      const savedRevisionId = submission ? value.stages.find((stage) => stage.id === submission.stageId)?.currentRevisionId : null;
      const reconcile = (latest: ProductionContext) => {
        const next = reconcileProductionDrafts(draftsRef.current, latest, submission, savedRevisionId, !recovering && !value.replayed);
        draftsRef.current = next; setDrafts(next); draftSubmissions.current.delete(body.idempotencyKey);
        return staleProductionDraftStages(next, latest).length > 0;
      };
      let latest = value;
      // An idempotent receipt proves the original write, but may predate other edits.
      if (value.replayed) {
        try {
          latest = await request<ProductionContext>(endpoint); if (ticket !== sequence.current) return null;
        } catch {
          if (ticket !== sequence.current) return null;
          reconcile(value); setData((previous) => ({ ...value, availableArtifacts: value.availableArtifacts || previous?.availableArtifacts }));
          setRetry(null); setConflict(null); setNeedsRefresh(true);
          setError('原操作已保存，暂未取得最新制作档案。请重新读取后再继续操作；本窗口其它未保存的稿件仍保留。');
          notify('原操作已保存，最新进度待重新读取', 'info');
          return value;
        }
      }
      const staleDrafts = reconcile(latest);
      setData((previous) => ({ ...latest, availableArtifacts: latest.availableArtifacts || previous?.availableArtifacts })); setNeedsRefresh(false); setRetry(null); setConflict(staleDrafts ? latest : null); notify(message); return latest;
    } catch (problem) {
      if (ticket !== sequence.current) return null;
      const failure = problem as Error & { status?: number }; setError(failure.message);
      if (failure.status === 409) { setRetry(null); try { setConflict(await request<ProductionContext>(endpoint)); } catch { /* Keep the current draft if the latest record is temporarily unavailable. */ } }
      else if (!failure.status || failure.status >= 500) setRetry(body);
      return null;
    } finally { lock.current = false; setBusy(false); }
  }
  async function mutate(operation: string, fields: Record<string, unknown>, message: string, submission?: ProductionDraftSubmission) {
    if (conflict || retry || needsRefresh) return null;
    const payload = { operation, expectedVersion: data?.episode?.rowVersion || 0, ...fields };
    const fingerprint = JSON.stringify(payload); let key = attempted.current.get(fingerprint); if (!key) { key = crypto.randomUUID(); attempted.current.set(fingerprint, key); }
    if (submission && !draftSubmissions.current.has(key)) draftSubmissions.current.set(key, { stageId: submission.stageId, draft: { ...submission.draft } });
    return sendMutation({ ...payload, idempotencyKey: key }, message);
  }
  async function saveDraft() {
    if ((!stageDirty && !needsRebase) || !stage || busy || readOnly || viewRevisionId !== 'working') return;
    const submitted = draft || { content: current?.content || '', baseRevisionId: current?.id || null, changeSummary: '核对更新后的输入版本' };
    await mutate('save_stage_revision', { stageId, content: submitted.content, changeSummary: submitted.changeSummary }, '制作稿已保存', { stageId, draft: submitted });
  }
  useEffect(() => { const keydown = (event: KeyboardEvent) => { if (active && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); event.stopImmediatePropagation(); void saveDraft(); } }; window.addEventListener('keydown', keydown, true); return () => window.removeEventListener('keydown', keydown, true); });
  function edit(value: Partial<Draft>) { setDrafts((previous) => ({ ...previous, [stageId]: { ...(previous[stageId] || { content: current?.content || '', baseRevisionId: current?.id || null, changeSummary: '' }), ...value } })); }
  function selectStage(value: string) { setStageId(value); setViewRevisionId('working'); setCompareId(''); setError(''); }
  function openModal(value: typeof modal) { dialogTrigger.current = document.activeElement as HTMLElement; setError(''); setModal(value); }
  function closeModal() { setModal(null); setDecisionNote(''); setCheckNotes(''); setGrantInstruction(''); setPauseReason(''); }
  function evidenceFor(target: CheckTarget, definitionId: string) {
    // A platform video's own checks cannot borrow playback evidence from another version.
    if (data?.artifacts.some((value) => value.id === target.id && value.kind === 'video')) return target.id;
    return target.stageId === 'S08' && ['media_playback', 'media_sync', 'mobile_readability', 'learning_loop'].includes(definitionId) ? validVideos[0]?.id || '' : target.id;
  }
  function openCheck(target: CheckTarget, definition: ProductionCheckDefinition) {
    setCheckTarget(target); setCheckId(definition.id); setCheckMethod(definition.methods[0] || 'document_review'); setCheckResult('passed'); setCheckNotes('');
    setCheckEvidence(evidenceFor(target, definition.id)); openModal('check');
  }
  async function exportHandoff(format: 'md' | 'json') {
    if (lock.current) return; setError('');
    try { const value = await request<{ markdown: string; snapshot: unknown }>(`${endpoint}/handoff`); download(format === 'md' ? value.markdown : JSON.stringify(value.snapshot, null, 2), `${slug}-handoff.${format}`, format === 'md' ? 'text/markdown;charset=utf-8' : 'application/json;charset=utf-8'); }
    catch (problem) { setError((problem as Error).message); }
  }
  async function submitDialog(event: FormEvent) {
    event.preventDefault(); let result: ProductionContext | null = null;
    if (modal === 'decision' && decisionTarget) result = await mutate('record_decision', { targetRevisionId: decisionTarget.id, decision, note: decisionNote }, decision === 'approved' ? '已确认这个版本' : '已记录修改意见');
    if (modal === 'check' && checkTarget) result = await mutate('record_check', { targetRevisionId: checkTarget.id, checkId, method: checkMethod, result: checkResult, evidenceRef: checkEvidence, limitations: checkNotes }, '检查结果已记录');
    if (modal === 'artifact') {
      const source = data?.availableArtifacts?.find((value) => sourceKey(value) === assetSource);
      if (source) result = await mutate('register_artifact', { source: source.type === 'workspace_asset' ? { type: source.type, assetId: source.assetId } : { type: source.type, kind: source.kind, revision: source.revision }, kind: artifactKind, variant, stageId: artifactStageId, inputRevisionIds: artifactInputs }, '产物版本已关联');
    }
    if (modal === 'grant') result = await mutate('set_execution_grant', { allowedStageIds: grantStages, allowedActions: grantActions, stopConditions: grantStop, sourceInstruction: grantInstruction }, '连续制作范围已保存');
    if (modal === 'blocker') result = await mutate('set_blocker', { stageId, reason: pauseReason, nextAction }, '已记录本阶段的阻塞与下一动作');
    if (modal === 'pause') result = await mutate('set_pause', { paused: true, reason: pauseReason, nextAction }, '本期制作已暂停');
    if (result) { if (modal === 'artifact') selectStage(artifactStageId); closeModal(); }
  }
  function chooseArtifactKind(value: string) {
    setArtifactKind(value);
    const destination = archiveStage(value, stageId);
    setArtifactInputs(data?.stages.filter((item) => item.id < destination && item.currentRevisionId && data.stageRevisions.find((revision) => revision.id === item.currentRevisionId)?.valid).map((item) => item.currentRevisionId!) || []);
  }
  function chooseArtifactSource(value: string) { setAssetSource(value); const source = data?.availableArtifacts?.find((item) => sourceKey(item) === value); if (source) chooseArtifactKind(source.type === 'article_revision' ? 'article' : source.kind); }
  function openArtifactChooser(articleOnly = false) {
    setArtifactFilter(articleOnly ? 'article' : 'all');
    const options = (data?.availableArtifacts || []).filter((value) => !articleOnly || value.type === 'article_revision');
    const first = options.find((value) => stageId === 'S08' ? value.type === 'workspace_asset' && value.kind === 'video' : stageId === 'S09' ? value.type === 'article_revision' : false) || options[0];
    chooseArtifactSource(first ? sourceKey(first) : ''); setVariant('通用'); openModal('artifact');
  }
  function useReference(text: string, label: string, sourceSlug: string) {
    const next = draftFromProductionReference({ slug, sourceSlug, stageId, reference: text, label, hasSavedRevision: Boolean(dataRef.current?.stages.find((value) => value.id === stageId)?.currentRevisionId), draft: draftsRef.current[stageId], blocked: readOnly || disabled || viewRevisionId !== 'working' });
    if (!next) { notify(sourceSlug !== slug ? '资料所属内容已变化，请重新读取本期资料' : '已保留现有稿件或输入，可复制原文作为参考', 'info'); return; }
    const updated = { ...draftsRef.current, [stageId]: next }; draftsRef.current = updated; setDrafts(updated);
    notify('参考原文已放入本地工作稿，尚未保存', 'info');
    document.getElementById(`${id}-draft`)?.focus();
  }
  function artifactTarget(value: ProductionArtifact): CheckTarget { return { id: value.id, label: `${value.filename} · ${value.variant} · 第 ${value.revisionNumber} 版`, stageId: value.stageId, checks: value.requiredChecks || [] }; }
  const disabled = busy || needsRefresh || Boolean(conflict) || Boolean(retry);
  const canUseReference = !current && !draft?.content.length && !draft?.changeSummary.length && !readOnly && !disabled && viewRevisionId === 'working';
  const referenceDisabledReason = current || draft?.content.length || draft?.changeSummary.length ? '已有稿件或输入，可复制原文作为参考。' : readOnly ? '开始或恢复制作后，可填入空白工作稿。' : viewRevisionId !== 'working' ? '先返回工作稿，再使用参考。' : '先处理当前档案状态，再使用参考。';
  const materialsPanel = <ProductionMaterials key={slug} slug={slug} active={active} stageId={stageId} request={request} canUseReference={canUseReference} referenceDisabledReason={referenceDisabledReason} onUseReference={useReference} />;
  // A pending write survives navigation and ordinary error dismissal until its exact request is recovered.
  const operationFeedback = error || (needsRefresh ? '原操作已保存，暂未取得最新制作档案。请重新读取后再继续操作。' : retry ? '上次操作的保存结果尚未确认。请重试原操作后继续；本窗口未保存的稿件仍保留。' : '');
  const modalLabel = modal === 'decision' ? decision === 'approved' ? '确认这个版本' : '记录修改意见' : modal === 'check' ? '记录实际检查' : modal === 'artifact' ? '关联现有产物' : modal === 'grant' ? '允许连续制作' : modal === 'blocker' ? '记录制作阻塞' : '暂停本期制作';

  return <section className="production-panel" aria-label="本期制作流程" aria-busy={busy || loading}>
    <div className="production-topbar"><div className="cw-title-inline"><ClipboardList size={18} aria-hidden="true" /><h2>制作</h2>{data?.episode && <span className={`production-status is-${data.episode.status}`}>{productionStatus[data.episode.status]}</span>}<HelpTip label="制作说明">阶段、稿件确认、实际验收和发布分别保存。允许连续制作时可以按范围推进，不会把它记成所有版本都已确认。</HelpTip></div><div className="cw-actions">{data?.episode && <><AuthorButton type="button" variant="secondary" disabled={disabled} onClick={() => void exportHandoff('md')}><Download size={15} aria-hidden="true" />交接 Markdown</AuthorButton><AuthorButton type="button" variant="secondary" disabled={disabled} onClick={() => void exportHandoff('json')}>JSON</AuthorButton>{data.episode.status !== 'active' ? <AuthorButton type="button" variant="secondary" disabled={disabled} onClick={() => void mutate('set_pause', { paused: false }, '已恢复本期制作')}><Play size={15} aria-hidden="true" />{data.episode.status === 'completed' ? '继续修改' : '恢复制作'}</AuthorButton> : data.episode.status === 'active' && <AuthorButton type="button" variant="secondary" disabled={disabled} onClick={() => { setNextAction(data.stateCard.nextAction || ''); openModal('pause'); }}><Pause size={15} aria-hidden="true" />暂停</AuthorButton>}</>}<IconButton variant="secondary" aria-label="重新读取制作档案" disabled={busy || loading} onClick={() => void load(false)}><RefreshCw size={16} aria-hidden="true" /></IconButton></div></div>
    {operationFeedback && <div className="production-error" role="alert"><CircleAlert size={16} aria-hidden="true" /><span>{operationFeedback}</span>{needsRefresh && <AuthorButton type="button" variant="secondary" disabled={busy || loading} onClick={() => void load(false)}>重新读取最新状态</AuthorButton>}{retry && <AuthorButton type="button" variant="secondary" disabled={busy} onClick={() => void sendMutation(retry, '操作已保存', true).then((value) => { if (value) closeModal(); })}>重试原操作</AuthorButton>}</div>}
    {conflict && <div className="production-conflict"><strong>已保留你的输入，另一窗口更新了制作档案。</strong><details><summary>核对最新状态与稿件</summary><p>{readableStatus(conflict.stateCard.current)}</p>{conflict.stageRevisions.filter((value) => value.id === conflict.stages.find((item) => item.id === stageId)?.currentRevisionId).map((value) => <pre key={value.id}>{value.content}</pre>)}</details><AuthorButton type="button" variant="secondary" disabled={busy} onClick={() => { setData(conflict); setDrafts((previous) => Object.fromEntries(Object.entries(previous).map(([key, value]) => [key, { ...value, baseRevisionId: conflict.stages.find((item) => item.id === key)?.currentRevisionId || null }]))); setConflict(null); setError(''); }}>已核对，保留我的输入继续编辑</AuthorButton></div>}
    {loading && !data ? <div className="cw-loading" role="status"><LoaderCircle className="spin" size={18} aria-hidden="true" />正在读取制作档案…</div> : !data?.episode ? <div className="production-start"><h3>开始制作这期内容</h3><p>目标、脚本、成片检查与文章集中在这里，下次从当前进度继续。</p>{materialsPanel}<AuthorButton type="button" variant="primary" disabled={!data || disabled} onClick={() => void mutate('start', {}, '已建立本期制作档案')}><Plus size={16} aria-hidden="true" />开始制作</AuthorButton></div> : <>
      <div className="production-next"><div><span className="production-eyebrow">当前</span><strong>{readableStatus(data.stateCard.current)}</strong></div><div><span className="production-eyebrow">下一步</span><span>{data.stateCard.nextAction || '选择一个阶段继续制作'}</span></div><details className="production-state-card"><summary>制作摘要<ChevronDown size={14} aria-hidden="true" /></summary><dl>{([{ label: '有效确认', values: data.stateCard.confirmed }, { label: '本轮变化', values: data.stateCard.changes }, { label: '可审产物', values: data.stateCard.reviewables }, { label: '检查缺口', values: data.stateCard.gaps }, { label: '待决定', values: data.stateCard.pendingDecisions }] as const).map(({ label, values }) => <div key={label}><dt>{label}</dt><dd>{values.length ? <ul>{values.map((value, index) => <li key={index}>{value}</li>)}</ul> : '无'}</dd></div>)}</dl></details></div>
      <div className="production-layout"><nav className="production-stages" aria-label="九步制作阶段">{data.stages.map((value, index) => { const Icon = statusIcon(value.status); return <Fragment key={value.id}>{[0, 3, 7].includes(index) && <div className="production-stage-group">{index === 0 ? '策划' : index === 3 ? '脚本与画面' : '交付'}</div>}<button type="button" aria-current={stageId === value.id ? 'step' : undefined} className={`production-stage is-${value.status}`} onClick={() => selectStage(value.id)}><span className="production-stage-number">{index + 1}</span><span className="production-stage-text"><span>{value.name}</span><small>{productionStatus[value.status]}{drafts[value.id] && drafts[value.id].content !== (data.stageRevisions.find((revision) => revision.id === value.currentRevisionId)?.content || '') ? ' · 未保存' : ''}</small></span><Icon size={15} aria-hidden="true" /></button></Fragment>; })}<div className="production-sidebar-footer"><AuthorButton type="button" variant="ghost" disabled={readOnly || disabled} onClick={() => { setGrantStages(data.stages.filter((value) => value.id >= stageId).map((value) => value.id)); openModal('grant'); }}><ShieldCheck size={15} aria-hidden="true" />允许连续制作</AuthorButton>{data.grants.some((value) => !value.revokedAt) && <AuthorButton type="button" variant="ghost" disabled={readOnly || disabled} onClick={() => void mutate('set_execution_grant', { revoke: true }, '已撤回连续制作范围')}>撤回连续制作</AuthorButton>}</div></nav>
        <div className="production-stage-mobile"><AuthorSelect label="选择制作阶段" value={stageId} options={data.stages.map((value, index) => ({ value: value.id, label: `${index + 1}. ${value.name} · ${productionStatus[value.status]}` }))} onValueChange={selectStage} /><AuthorButton type="button" variant="secondary" disabled={readOnly || disabled} onClick={() => { setGrantStages(data.stages.filter((value) => value.id >= stageId).map((value) => value.id)); openModal('grant'); }}><ShieldCheck size={15} aria-hidden="true" />连续制作</AuthorButton></div>
        <div className="production-main">{stage && <><header className="production-stage-heading"><div className="cw-title-inline"><h3>{stage.name}</h3><span className={`production-status is-${stage.status}`}>{productionStatus[stage.status]}</span><HelpTip label={`${stage.name}要求`}>{stage.description}</HelpTip></div><div className="cw-actions">{stage.status === 'blocked' ? <AuthorButton type="button" variant="secondary" disabled={readOnly || disabled} onClick={() => void mutate('clear_blocker', { stageId }, '已解除阻塞，原检查结果仍保留')}><Check size={14} aria-hidden="true" />解除阻塞</AuthorButton> : <AuthorButton type="button" variant="ghost" disabled={readOnly || disabled} onClick={() => { setPauseReason(''); setNextAction(''); openModal('blocker'); }}><CircleAlert size={14} aria-hidden="true" />记录阻塞</AuthorButton>}{stage.id !== data.episode.currentStageId && <AuthorButton type="button" variant="secondary" disabled={readOnly || disabled} onClick={() => void mutate('set_current_stage', { stageId }, '已更新继续制作的位置')}><Play size={14} aria-hidden="true" />从这里继续</AuthorButton>}</div></header>
          {(stage.dependencyIssues.length > 0 || stage.status === 'needs_review') && <div className="production-warning"><CircleAlert size={16} aria-hidden="true" /><span>{stage.dependencyIssues.join('；') || '输入版本已变化，请核对本阶段稿件和相关产物，再记录本次检查。'}</span></div>}
          {(stageId === 'S08' || stageId === 'S09') && <div className="production-stage-resources">{stageId === 'S08' ? <>{onOpenSection && <><AuthorButton type="button" variant="secondary" onClick={() => onOpenSection('video')}><Film size={15} aria-hidden="true" />打开成片</AuthorButton><AuthorButton type="button" variant="secondary" onClick={() => onOpenSection('assets')}><FolderOpen size={15} aria-hidden="true" />打开制作素材</AuthorButton></>}<HelpTip label="成片与素材说明">成片、音轨、字幕和封面沿用已有文件管理。在下方关联具体文件版本后，分别记录本次检查。</HelpTip></> : <>{onOpenSection && <AuthorButton type="button" variant="secondary" onClick={() => onOpenSection('article')}><FileText size={15} aria-hidden="true" />打开文章</AuthorButton>}<AuthorButton type="button" variant="secondary" disabled={readOnly || disabled || !data.availableArtifacts?.some((value) => value.type === 'article_revision')} onClick={() => openArtifactChooser(true)}><Link2 size={15} aria-hidden="true" />关联文章修订</AuthorButton><span className="cw-muted">{stageArtifacts.filter((value) => value.kind === 'article' && value.current !== false).length ? '已关联文章版本，核对说明保存在下方。' : '关联已保存的文章版本，正文仍在文章页编辑。'}</span><HelpTip label="文章对照说明">本阶段保存与成片对照的说明和检查记录，无需复制整篇文章。已有本阶段稿件和历史版本完整保留。</HelpTip></>}</div>}
          {materialsPanel}
          <div className="production-editor-layout"><div className="production-writing"><div className="production-revision-bar"><AuthorSelect label={stageId === 'S09' ? '选择对照记录版本' : '选择制作稿版本'} value={viewRevisionId} onValueChange={setViewRevisionId} options={[{ value: 'working', label: current ? `工作稿 · 第 ${current.revisionNumber} 版` : '工作稿 · 尚未保存' }, ...revisions.map((value) => ({ value: value.id, label: `${revisionLabel(value)} · ${stamp(value.createdAt)}` }))]} /><AuthorSelect label="对照另一版本" icon={<GitCompareArrows size={15} aria-hidden="true" />} value={compareId} onValueChange={setCompareId} options={[{ value: '', label: '不对照' }, ...revisions.filter((value) => value.id !== viewed?.id || viewRevisionId === 'working').map((value) => ({ value: value.id, label: `对照第 ${value.revisionNumber} 版` }))]} />{viewRevisionId !== 'working' && viewed && <AuthorButton type="button" variant="secondary" disabled={readOnly || disabled} onClick={() => { edit({ content: viewed.content, changeSummary: `基于第 ${viewed.revisionNumber} 版重新起草` }); setViewRevisionId('working'); }}>以此版本起草</AuthorButton>}</div>
            <div className={`production-editors ${compareId ? 'has-comparison' : ''}`}>{compareId && <div className="production-compare"><span>{revisionLabel(revisions.find((value) => value.id === compareId) || current!)}</span><pre>{revisions.find((value) => value.id === compareId)?.content}</pre></div>}<div className={`production-editor ${stageId === 'S09' ? 'is-review-note' : ''}`}><label htmlFor={`${id}-draft`} className="sr-only">{stageId === 'S09' ? '文章对照记录' : `${stage.name}制作稿`}</label><textarea id={`${id}-draft`} aria-label={stageId === 'S09' ? '文章对照记录' : `${stage.name}制作稿`} readOnly={readOnly || viewRevisionId !== 'working'} value={viewRevisionId === 'working' ? content : viewed?.content || ''} onChange={(event) => edit({ content: event.target.value })} maxLength={150000} spellCheck={false} placeholder={stagePlaceholders[stage.id]} /></div></div>
            {viewRevisionId === 'working' && <div className="production-savebar"><AuthorInput aria-label="本次修改说明" placeholder="本次修改说明（选填）" value={draft?.changeSummary || ''} onChange={(event) => edit({ changeSummary: event.target.value })} maxLength={2000} disabled={readOnly} /><span className={`save-status ${stageDirty ? 'is-dirty' : ''}`}>{stageDirty ? '未保存' : current ? '已保存' : ''}</span><AuthorButton type="button" variant="primary" disabled={(!stageDirty && !needsRebase) || readOnly || disabled} onClick={() => void saveDraft()}>{busy ? <LoaderCircle className="spin" size={15} aria-hidden="true" /> : <Save size={15} aria-hidden="true" />}保存稿件</AuthorButton></div>}
            <div className="production-review-actions"><AuthorButton type="button" variant="secondary" disabled={!current || stageDirty || viewRevisionId !== 'working' || readOnly || disabled || !current.valid} onClick={() => current && void mutate('submit_for_review', { stageRevisionId: current.id }, '已提交这个版本供审阅')}><FileCheck2 size={15} aria-hidden="true" />提交审阅</AuthorButton><AuthorButton type="button" variant="secondary" disabled={!current || stageDirty || viewRevisionId !== 'working' || readOnly || disabled} onClick={() => { setDecisionTarget(current); setDecision('approved'); openModal('decision'); }}><CheckCheck size={15} aria-hidden="true" />确认这个版本</AuthorButton><AuthorButton type="button" variant="ghost" disabled={!current || stageDirty || viewRevisionId !== 'working' || readOnly || disabled} onClick={() => { setDecisionTarget(current); setDecision('changes_requested'); openModal('decision'); }}>需要修改</AuthorButton><HelpTip label="版本确认说明">确认绑定当前已保存的具体版本。必过检查或依赖未满足时，后台会列出缺口；保存草稿不受这些门槛影响。</HelpTip></div>
          </div><aside className="production-inspector" aria-label="当前版本的检查与反馈"><div className="production-inspector-heading"><h4>本版检查</h4><span className="cw-muted">{current ? `第 ${current.revisionNumber} 版` : '先保存稿件'}</span></div>{stage.requiredChecks.map((definition) => {
            const checked = data.checks.filter((value) => value.targetRevisionId === current?.id && value.checkId === definition.id).at(-1);
            return <div key={definition.id} className="production-check-row"><div><span>{definition.label}</span><small className={checked?.valid && checked.result === 'passed' ? 'production-passed' : ''}>{!checked ? '未检查' : !checked.valid ? '需复验' : checked.result === 'passed' ? '已检查通过' : checked.result === 'failed' ? '未通过' : '不适用'}{checked && ` · ${productionMethods[checked.method] || checked.method}`}</small>{checked?.limitations && <p>{checked.limitations}</p>}</div><AuthorButton type="button" variant="ghost" size="compact" disabled={!current || stageDirty || viewRevisionId !== 'working' || readOnly || disabled} onClick={() => current && openCheck({ id: current.id, label: `${stage.name} · 第 ${current.revisionNumber} 版`, stageId, checks: stage.requiredChecks }, definition)}>记录</AuthorButton></div>;
          })}{stage.missingChecks.length > 0 && <p className="production-gap">待检查：{stage.missingChecks.map((value) => stage.requiredChecks.find((check) => check.id === value)?.label || value).join('、')}</p>}
            {current && <details className="production-feedback" open={data.decisions.some((value) => value.targetRevisionId === current.id && value.decision !== 'approved')}><summary>确认与反馈<ChevronDown size={14} aria-hidden="true" /></summary>{data.decisions.filter((value) => value.targetRevisionId === current.id).map((value) => <div key={value.id}><span>{value.decision === 'approved' ? '已确认' : value.decision === 'reported_decision' ? '聊天报告，待核对' : '需要修改'}{!value.valid ? ' · 历史记录' : ''}</span><time>{stamp(value.createdAt)}</time>{value.note && <p>{value.note}</p>}</div>)}{!data.decisions.some((value) => value.targetRevisionId === current.id) && <p className="cw-muted">本版尚无确认记录。</p>}</details>}
          </aside></div>
          <section className="production-artifacts" aria-label="本阶段产物"><div className="production-inspector-heading"><div className="cw-title-inline"><h4>{stageId === 'S09' ? '文章版本与检查' : '关联产物'}</h4><HelpTip label="关联产物说明">从已有媒体和文章版本中登记真实产物，并记录它使用的口播、分镜等版本。仅关联文件不会自动通过验收。</HelpTip></div>{stageId !== 'S09' && <AuthorButton type="button" variant="secondary" disabled={readOnly || disabled || !data.availableArtifacts?.length} onClick={() => openArtifactChooser()}><Link2 size={15} aria-hidden="true" />关联现有产物</AuthorButton>}</div>{stageArtifacts.length ? <div className="production-artifact-list">{stageArtifacts.map((value) => <div className="production-artifact" key={value.id}><FileText size={17} aria-hidden="true" /><div><strong>{value.filename}</strong><small>{kindLabel(value.kind)} · {value.variant} · 第 {value.revisionNumber} 版 · {value.current === false ? '历史版本' : value.valid ? '输入版本有效' : '需复验'}</small>{value.requiredChecks?.length ? <div className="production-artifact-checks">{value.requiredChecks.map((definition) => { const checked = data.checks.filter((check) => check.targetRevisionId === value.id && check.checkId === definition.id).at(-1); return <AuthorButton type="button" variant="ghost" size="compact" key={definition.id} disabled={readOnly || disabled || !value.valid || value.current === false} onClick={() => openCheck(artifactTarget(value), definition)}>{checked?.valid && checked.result === 'passed' ? <Check size={13} aria-hidden="true" /> : <Circle size={13} aria-hidden="true" />}{definition.label}</AuthorButton>; })}</div> : null}</div>{onPreviewArtifact && <AuthorButton type="button" variant="secondary" onClick={() => onPreviewArtifact(value)}><Play size={14} aria-hidden="true" />查看本版</AuthorButton>}<span className={`production-status ${value.valid ? '' : 'is-needs_review'}`}>{value.current === false ? '历史版本' : value.valid ? '已归档' : '需复核'}</span></div>)}</div> : <p className="cw-muted">{stageId === 'S09' ? '尚未关联文章修订。先在文章页保存，再选择要对照的具体版本。' : '尚未关联本阶段产物。成片、音轨和字幕可在成片与制作素材中管理。'}</p>}</section>
          <details className="production-history"><summary><History size={15} aria-hidden="true" />制作记录与连续范围<ChevronDown size={14} aria-hidden="true" /></summary>{data.grants.map((value) => <div key={value.id} className="production-grant"><strong>{value.revokedAt ? '已撤销的范围' : '允许连续制作'}</strong><p>{value.sourceInstruction}</p><span>{value.allowedStageIds.map((key) => data.stages.find((item) => item.id === key)?.name || key).join('、')}</span><p>停止条件：{value.stopConditions}</p></div>)}<ol>{data.events.slice(-12).reverse().map((value) => <li key={value.id}><time>{stamp(value.createdAt)}</time><span>{({ start: '建立制作档案', save_stage_revision: '保存阶段稿件', register_artifact: '关联产物版本', submit_for_review: '提交审阅', record_check: '记录检查', record_decision: '记录确认或反馈', set_execution_grant: '更新连续制作范围', set_pause: '更新暂停状态', set_current_stage: '更新继续位置', complete: '完成本期制作' } as Record<string, string>)[value.type] || '更新制作记录'}</span></li>)}</ol><span className="cw-muted">制作规则：{data.episode.workflowVersion === 'microcourse-v1' ? '微课流程第一版' : data.episode.workflowVersion} · 档案版本 {data.episode.rowVersion}</span></details>
          <div className="production-footer"><span className="cw-muted">制作完成与对外发布分别记录</span>{stageId === 'S09' && <AuthorButton type="button" variant="secondary" disabled={readOnly || disabled || dirty} onClick={() => void mutate('complete', {}, '本期制作已完成')}><CheckCheck size={15} aria-hidden="true" />检查并完成本期</AuthorButton>}{data.stages.findIndex((value) => value.id === stageId) < data.stages.length - 1 && <AuthorButton type="button" variant="secondary" disabled={readOnly || disabled || stageDirty || !stage.canProceed} onClick={() => { const next = data.stages[data.stages.findIndex((value) => value.id === stageId) + 1]; void mutate('set_current_stage', { stageId: next.id }, '已更新下一步').then((value) => { if (value) selectStage(next.id); }); }}>继续下一步<ArrowRight size={15} aria-hidden="true" /></AuthorButton>}</div>
        </>}</div></div>
    </>}
    <Dialog.Root open={Boolean(modal)} onOpenChange={(open) => { if (!open && !busy) closeModal(); }}><AuthorDialogContent surface="workspace" className="production-dialog" title={modalLabel} description={modal === 'decision' && decisionTarget ? `${stage?.name} · 第 ${decisionTarget.revisionNumber} 版。决定只作用于这个修订。` : modal === 'check' ? checkTarget?.label || '检查必须对应实际版本。' : modal === 'artifact' ? '复用已经保存的文件或文章修订。' : modal === 'grant' ? '选择允许继续的阶段、工作及停止条件。' : modal === 'blocker' ? `${stage?.name}：写清无法继续的原因与解决后的下一动作。` : '保留现有阶段与版本，记录恢复时的下一动作。'} closeLabel="关闭制作操作" closeDisabled={busy} onEscapeKeyDown={(event) => { if (busy) event.preventDefault(); }} onInteractOutside={(event) => { if (busy) event.preventDefault(); }} onCloseAutoFocus={(event) => { event.preventDefault(); dialogTrigger.current?.isConnected && dialogTrigger.current.focus(); }}><form className="production-form" onSubmit={(event) => void submitDialog(event)}>
      {modal === 'decision' && <><pre className="production-review-preview">{decisionTarget?.content}</pre><Field label={decision === 'approved' ? '确认备注（选填）' : '需要修改的地方'}><AuthorTextarea aria-label="确认或修改意见" value={decisionNote} onChange={(event) => setDecisionNote(event.target.value)} rows={3} maxLength={2000} required={decision === 'changes_requested'} /></Field></>}
      {modal === 'check' && <><Field label="检查项目"><AuthorSelect label="检查项目" value={checkId} options={checkTarget?.checks.map((value) => ({ value: value.id, label: value.label })) || []} onValueChange={(value) => { setCheckId(value); setCheckMethod(checkTarget?.checks.find((item) => item.id === value)?.methods[0] || 'document_review'); setCheckResult('passed'); setCheckEvidence(checkTarget ? evidenceFor(checkTarget, value) : ''); }} /></Field><div className="production-form-row"><Field label="实际检查方式"><AuthorSelect label="实际检查方式" value={checkMethod} options={(checkDefinition?.methods || []).map((value) => ({ value, label: productionMethods[value] || value }))} onValueChange={setCheckMethod} /></Field><Field label="结果"><AuthorSelect label="检查结果" value={checkResult} options={[{ value: 'passed', label: '检查通过' }, { value: 'failed', label: '未通过' }, ...(['media_playback', 'media_sync', 'mobile_readability', 'learning_loop'].includes(checkId) ? [] : [{ value: 'not_applicable', label: '不适用（说明原因）' }])]} onValueChange={(value) => setCheckResult(value as typeof checkResult)} /></Field></div><Field label="检查依据" help="选择实际检查的本期产物。静态图片或自动校验不能代替实际成片的音画验收。"><AuthorSelect label="检查依据" value={checkEvidence} options={evidenceOptions} onValueChange={setCheckEvidence} /></Field><Field label="检查说明与限制"><AuthorTextarea aria-label="检查说明与限制" value={checkNotes} onChange={(event) => setCheckNotes(event.target.value)} required rows={3} maxLength={4000} placeholder={checkResult === 'not_applicable' ? '说明本期为何不适用，不能用不适用跳过尚未完成的检查。' : '写清实际看了、听了或核对了什么，观察到的结果，以及未覆盖的范围。'} /></Field></>}
      {modal === 'artifact' && <><Field label="已有文件或文章"><AuthorSelect label="选择已有文件或文章" value={assetSource} options={artifactOptions.map((value) => ({ value: sourceKey(value), label: `${value.filename} · ${value.type === 'article_revision' ? '文章修订' : `第 ${value.version} 版`}` }))} onValueChange={chooseArtifactSource} /></Field><div className="production-form-row"><Field label="用途"><AuthorSelect label="产物用途" value={artifactKind} options={Object.entries(productionKinds).filter(([value]) => { const selected = data?.availableArtifacts?.find((item) => sourceKey(item) === assetSource); const inferred = selected?.type === 'article_revision' ? 'article' : selected?.kind; return value === inferred || inferred === 'image' && value === 'cover'; }).map(([value, label]) => ({ value, label }))} onValueChange={chooseArtifactKind} /></Field><Field label="版本用途"><AuthorInput aria-label="版本用途" value={variant} onChange={(event) => setVariant(event.target.value)} required maxLength={80} placeholder="例如：抖音版、完整网址版" /></Field></div><p className="cw-muted production-archive-location">归档到：{data?.stages.find((value) => value.id === artifactStageId)?.name}</p><SourceOptions values={dependencyOptions} selected={artifactInputs} onChange={setArtifactInputs} label="使用的制作稿版本" /></>}
      {modal === 'grant' && <><SourceOptions values={data?.stages.map((value) => ({ id: value.id, label: value.name })) || []} selected={grantStages} onChange={setGrantStages} label="允许继续的阶段" /><SourceOptions values={[{ id: 'draft', label: '制作与修改草稿' }, { id: 'review', label: '准备审阅与执行检查' }, { id: 'finalize', label: '满足检查后完成最终交付' }]} selected={grantActions} onChange={setGrantActions} label="允许的工作" /><Field label="本次指令"><AuthorTextarea aria-label="连续制作指令" value={grantInstruction} onChange={(event) => setGrantInstruction(event.target.value)} required rows={2} maxLength={2000} placeholder="例如：按已选方向继续做完有声试看片，保留当前音色。" /></Field><Field label="停止条件"><AuthorTextarea aria-label="连续制作停止条件" value={grantStop} onChange={(event) => setGrantStop(event.target.value)} required rows={2} maxLength={2000} /></Field></>}
      {(modal === 'pause' || modal === 'blocker') && <><Field label={modal === 'blocker' ? '阻塞原因' : '暂停原因'}><AuthorTextarea aria-label="暂停原因" value={pauseReason} onChange={(event) => setPauseReason(event.target.value)} required maxLength={2000} rows={2} /></Field><Field label="下一动作"><AuthorTextarea aria-label="下一动作" value={nextAction} onChange={(event) => setNextAction(event.target.value)} required maxLength={2000} rows={2} /></Field></>}
      {error && <p className="field-error" role="alert">{error}</p>}<div className="production-form-actions"><AuthorButton type="button" variant="secondary" disabled={busy} onClick={closeModal}>取消</AuthorButton><AuthorButton type="submit" variant="primary" disabled={disabled || modal === 'check' && !checkEvidence || modal === 'grant' && (!grantStages.length || !grantActions.length) || modal === 'artifact' && !assetSource}>{busy && <LoaderCircle className="spin" size={15} aria-hidden="true" />}{modalLabel}</AuthorButton></div>
    </form></AuthorDialogContent></Dialog.Root>
  </section>;
}
