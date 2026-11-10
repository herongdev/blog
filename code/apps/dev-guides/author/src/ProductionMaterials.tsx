import { AuthorButton } from './AuthorUI';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gfm from '@bytemd/plugin-gfm';
import { BookOpen, ChevronDown, Copy, ExternalLink, FileText, LoaderCircle, RefreshCw } from 'lucide-react';
import HelpTip from './HelpTip';
import IconButton from './IconButton';
import { useToast } from './AuthorToast';
import type { ProductionRequest } from './production-types';
import { legacyPreparationDraft, type LegacyPreparation as Preparation } from './production-reference';

type ResearchSource = { id: string; title: string; label?: string; body: string; urls: string[]; payload: Record<string, unknown> };
type FilmingMaterials = { slug: string; revision: string; preparation: Preparation; sources: ResearchSource[] };
type Props = { slug: string; active: boolean; stageId: string; request: ProductionRequest; canUseReference: boolean; referenceDisabledReason: string; onUseReference: (text: string, label: string, sourceSlug: string) => void };
const Viewer = lazy(() => import('@bytemd/react').then((module) => ({ default: module.Viewer })));
const fieldLabels: Record<keyof Preparation, string> = { goal: '旧拍摄目标', outline: '旧拍摄提纲', checklist: '准备清单', notes: '拍摄备注' };
function sourceUrl(value: string) {
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}

/** Read-only legacy material: using a reference changes only an empty local draft. */
export default function ProductionMaterials({ slug, active, stageId, request, canUseReference, referenceDisabledReason, onUseReference }: Props) {
  const [loaded, setLoaded] = useState<FilmingMaterials | null>(null);
  const [cached, setCached] = useState<{ slug: string; preparation: Preparation } | null>(null);
  const [error, setError] = useState<{ slug: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); const [expanded, setExpanded] = useState(stageId === 'S03');
  const [researchExpanded, setResearchExpanded] = useState(stageId === 'S03');
  const [copyError, setCopyError] = useState(''); const sequence = useRef(0); const notify = useToast();
  const plugins = useMemo(() => [gfm()], []);
  const data = loaded?.slug === slug ? loaded : null;
  const loadError = error?.slug === slug ? error.message : '';
  const referenceField = stageId === 'S02' ? 'goal' : ['S04', 'S05', 'S06'].includes(stageId) ? 'outline' : null;
  const cachedFields = cached?.slug === slug ? (Object.keys(fieldLabels) as (keyof Preparation)[]).filter((key) => !data || cached.preparation[key] !== data.preparation[key]) : [];
  const load = useCallback(async () => {
    const ticket = ++sequence.current; setLoading(true); setError(null); setCopyError('');
    // The former editor used a window-local key. Keep that copy intact for recovery.
    try {
      const preparation = legacyPreparationDraft(JSON.parse(sessionStorage.getItem(`author-filming:${slug}`) || 'null'));
      setCached(preparation ? { slug, preparation } : null);
    } catch { setCached(null); }
    try {
      const value = await request<FilmingMaterials>(`/api/filming/${encodeURIComponent(slug)}`);
      if (ticket !== sequence.current) return;
      if (value.slug !== slug || !value.preparation || !['goal', 'outline', 'checklist', 'notes'].every((key) => typeof value.preparation[key as keyof Preparation] === 'string') || !Array.isArray(value.sources)) throw new Error('制作资料格式不完整，请重新读取。');
      setLoaded(value);
    } catch (problem) { if (ticket === sequence.current) setError({ slug, message: (problem as Error).message }); }
    finally { if (ticket === sequence.current) setLoading(false); }
  }, [request, slug]);
  useEffect(() => { if (active) void load(); return () => { ++sequence.current; }; }, [active, load]);
  useEffect(() => { setExpanded(stageId === 'S03'); setResearchExpanded(stageId === 'S03'); setCopyError(''); }, [slug, stageId]);
  async function copy(text: string) {
    setCopyError('');
    try { await navigator.clipboard.writeText(text); notify('已复制参考原文'); }
    catch { setCopyError('暂时无法复制。可在下方原文中选择需要的内容。'); }
  }
  function originalField(key: keyof Preparation, primary = false, preparation = data?.preparation, fromCache = false) {
    const text = preparation?.[key] || '';
    const usable = key === referenceField;
    const label = fromCache ? `本窗口未保存的${fieldLabels[key]}` : fieldLabels[key];
    const body = <><pre className="production-material-original">{text || '未填写'}</pre>{Boolean(text) && <div className="production-material-actions"><AuthorButton type="button" variant="secondary" onClick={() => void copy(text)}><Copy size={14} aria-hidden="true" />复制原文</AuthorButton>{usable && <><AuthorButton type="button" variant="secondary" disabled={!canUseReference} onClick={() => onUseReference(text, label, slug)}><FileText size={14} aria-hidden="true" />用作本阶段草稿</AuthorButton><HelpTip label="使用旧资料说明">只填入空白的本地工作稿，之后可以调整。不会自动保存、记录检查或确认。旧拍摄目标需要提炼成观众的学习目标，提纲也需要按本阶段重新整理。</HelpTip>{!canUseReference && <span className="cw-muted">{referenceDisabledReason}</span>}</>}</div>}</>;
    return primary ? <section key={key} className="production-material-primary" aria-label={fieldLabels[key]}><h4>{fieldLabels[key]}</h4>{body}</section> : <details key={`${slug}-${stageId}-${key}`} className="production-material-field"><summary><ChevronDown size={14} aria-hidden="true" />{fieldLabels[key]}{!text && <span className="cw-muted">未填写</span>}</summary>{body}</details>;
  }
  const summary = stageId === 'S03' ? '调研与拍摄资料' : referenceField === 'goal' ? '参考旧拍摄目标与资料' : referenceField === 'outline' ? '参考旧提纲与资料' : '调研、清单与拍摄备注';
  return <details className="production-materials" open={expanded} onToggle={(event) => setExpanded(event.currentTarget.open)}>
    <summary><BookOpen size={16} aria-hidden="true" /><span>{summary}</span>{loading ? <LoaderCircle size={14} className="spin" aria-label="正在读取制作资料" /> : loadError ? <span className="production-material-error-label">读取失败</span> : data && <span className="cw-muted">{data.sources.length} 条调研</span>}<ChevronDown size={14} aria-hidden="true" /></summary>
    <div className="production-materials-body"><div className="production-materials-heading"><span className="cw-muted">原资料只读保留</span><IconButton variant="secondary" aria-label="重新读取调研与拍摄资料" disabled={loading} onClick={() => void load()}><RefreshCw size={15} aria-hidden="true" /></IconButton></div>
      {loadError && <div className="production-material-error" role="alert"><span>制作资料读取失败：{loadError}</span><AuthorButton type="button" variant="secondary" disabled={loading} onClick={() => void load()}>重新读取</AuthorButton></div>}
      {cachedFields.length > 0 && cached && <details className="production-local-preparation"><summary><ChevronDown size={14} aria-hidden="true" />本窗口未保存的准备<span className="cw-muted">{data ? `${cachedFields.length} 项与${loadError ? '上次读取' : '已保存'}资料不同` : '本窗口副本'}</span></summary>{!data && <p className="cw-muted">尚未取得已保存资料，以下为本窗口副本。</p>}{cachedFields.map((key) => originalField(key, key === referenceField, cached.preparation, true))}</details>}
      {!loadError && (loading && !data ? <p className="cw-muted" role="status">正在读取调研与拍摄资料…</p> : data && <>
        {referenceField && originalField(referenceField, true)}
        <details className="production-research" aria-label="原始调研资料" open={researchExpanded} onToggle={(event) => setResearchExpanded(event.currentTarget.open)}><summary><span>调研来源</span><span className="cw-muted">{data.sources.length} 条</span><ChevronDown size={14} aria-hidden="true" /></summary>{data.sources.length ? data.sources.map((source) => <details key={source.id} className="production-research-source"><summary><ChevronDown size={14} aria-hidden="true" /><FileText size={15} aria-hidden="true" /><span>{source.title || source.label || '调研资料'}</span></summary><div className="production-research-body bytemd-preview"><Suspense fallback={<p className="cw-muted">正在显示调研原文…</p>}><Viewer value={source.body} plugins={plugins} /></Suspense>{source.urls.filter(sourceUrl).length > 0 && <ul className="production-research-links">{source.urls.filter(sourceUrl).map((url, index) => <li key={`${url}-${index}`}><a href={sourceUrl(url)} target="_blank" rel="noreferrer">{url}<ExternalLink size={12} aria-hidden="true" /></a></li>)}</ul>}<details className="production-research-json"><summary>查看原始 JSON</summary><pre>{JSON.stringify(source.payload, null, 2)}</pre></details></div></details>) : <p className="cw-muted">这条内容尚未关联调研资料。</p>}</details>
        {(Object.keys(fieldLabels) as (keyof Preparation)[]).filter((key) => key !== referenceField).map((key) => originalField(key))}
      </>)}
      {copyError && <p className="field-error" role="alert">{copyError}</p>}
    </div>
  </details>;
}
