import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gfm from '@bytemd/plugin-gfm';
import { Check, ChevronDown, ExternalLink, FileText, LoaderCircle, LockKeyhole, RefreshCw, Save } from 'lucide-react';
import HelpTip from './HelpTip';

type Preparation = { goal: string; outline: string; checklist: string; notes: string };
type Source = { id: string; kind: 'research'; title: string; label?: string; body: string; urls: string[]; importedAt?: string; payload: Record<string, unknown> };
type Filming = { slug: string; revision: string; preparation: Preparation; sources: Source[]; updatedAt?: string; curation?: { reason?: string; originalFolderPath?: string[]; originalResearchFolderPath?: string[] } };
const empty: Preparation = { goal: '', outline: '', checklist: '', notes: '' };
const Viewer = lazy(() => import('@bytemd/react').then((module) => ({ default: module.Viewer })));
const safeUrl = (value: string) => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; } };

export default function FilmingPanel({ slug, active, request, onPendingChange }: { slug: string; active: boolean; request: <T>(path: string, options?: RequestInit) => Promise<T>; onPendingChange: (pending: boolean) => void }) {
  const [data, setData] = useState<Filming | null>(null); const [draft, setDraft] = useState<Preparation>(empty);
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const [conflict, setConflict] = useState<Filming | null>(null);
  const sourcePlugins = useMemo(() => [gfm()], []);
  const sequence = useRef(0); const lock = useRef(false); const draftRef = useRef(draft); draftRef.current = draft;
  const dirty = Boolean(data && JSON.stringify(draft) !== JSON.stringify(data.preparation));
  const endpoint = `/api/filming/${encodeURIComponent(slug)}`;
  const cacheKey = `author-filming:${slug}`;
  const load = useCallback(async (recover = true) => {
    const id = ++sequence.current; setLoading(true); setError('');
    try {
      const value = await request<Filming>(endpoint); if (id !== sequence.current) return;
      setData(value); setDraft(value.preparation); setConflict(null);
      if (recover) {
        try {
          const saved = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
          if (saved && Object.keys(empty).every((key) => typeof saved.preparation?.[key] === 'string' && saved.preparation[key].length <= 20000)) {
            setDraft(saved.preparation);
            if (saved.revision !== value.revision) setConflict(value);
            setNotice('已恢复本窗口未保存的拍摄准备');
          }
        } catch { /* Recovery is optional; never replace the server record. */ }
      }
    }
    catch (problem) { if (id === sequence.current) setError((problem as Error).message); }
    finally { if (id === sequence.current) setLoading(false); }
  }, [endpoint, request, cacheKey]);
  useEffect(() => { void load(); return () => { ++sequence.current; }; }, [load]);
  useEffect(() => { onPendingChange(dirty || saving); }, [dirty, saving, onPendingChange]);
  useEffect(() => () => onPendingChange(false), [onPendingChange]);
  useEffect(() => { if (!data || loading) return; try { if (dirty) sessionStorage.setItem(cacheKey, JSON.stringify({ revision: data.revision, preparation: draft })); else sessionStorage.removeItem(cacheKey); } catch { /* Before-unload and navigation guards still protect edits. */ } }, [cacheKey, data, draft, dirty, loading]);
  useEffect(() => { const before = (event: BeforeUnloadEvent) => { if (dirty || saving) { event.preventDefault(); event.returnValue = ''; } }; window.addEventListener('beforeunload', before); return () => window.removeEventListener('beforeunload', before); }, [dirty, saving]);
  const save = useCallback(async () => {
    if (!data || !dirty || lock.current || conflict) return;
    lock.current = true; setSaving(true); setError(''); setNotice(''); const submitted = draftRef.current;
    try { const value = await request<Filming>(endpoint, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ revision: data.revision, preparation: submitted }) }); setData(value); if (draftRef.current === submitted) setDraft(value.preparation); setNotice('拍摄准备已保存'); }
    catch (problem) { setError((problem as Error).message); if ((problem as Error & { status?: number }).status === 409) { try { setConflict(await request<Filming>(endpoint)); } catch { /* Keep the local draft and error. */ } } }
    finally { lock.current = false; setSaving(false); }
  }, [data, dirty, conflict, endpoint, request]);
  useEffect(() => { const keydown = (event: KeyboardEvent) => { if (active && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); event.stopImmediatePropagation(); void save(); } }; window.addEventListener('keydown', keydown, true); return () => window.removeEventListener('keydown', keydown, true); }, [active, save]);
  return <div className="filming-panel">
    <div className="cw-section-heading"><div className="cw-title-inline"><h2>拍摄准备</h2><HelpTip label="拍摄准备说明">目标、提纲与准备清单独立保存，不会替换文章正文或发布内容。</HelpTip><span className="cw-private"><LockKeyhole size={14} aria-hidden="true" />私有</span></div><div className="cw-actions"><span className={`save-status ${dirty ? 'is-dirty' : ''}`}>{saving ? '保存中…' : dirty ? '未保存' : data ? '已保存' : ''}</span><button type="button" className="cw-button cw-icon" aria-label="重新读取拍摄准备" disabled={loading || saving} onClick={() => { if (!dirty || window.confirm('重新读取会丢弃未保存的拍摄准备，确定继续吗？')) void load(false); }}><RefreshCw size={16} aria-hidden="true" /></button><button type="button" className="save-button" disabled={!dirty || saving || Boolean(conflict)} onClick={() => void save()}>{saving ? <LoaderCircle className="spin" size={16} aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}保存准备</button></div></div>
    {error && <p className="field-error" role="alert">{error}</p>}{notice && <p className="filming-notice" role="status"><Check size={15} aria-hidden="true" />{notice}</p>}
    {conflict && <div className="filming-conflict"><p>已保留你的输入。核对另一窗口的版本后，再选择后续操作。</p><details><summary>查看另一窗口的准备</summary><pre>{Object.entries(conflict.preparation).map(([key, text]) => `${({ goal: '拍摄目标', outline: '拍摄提纲', checklist: '准备清单', notes: '补充备注' })[key]}\n${text}`).join('\n\n')}</pre></details><div className="cw-actions"><button type="button" className="cw-button" onClick={() => { setData(conflict); setConflict(null); setError(''); }}>保留我的输入，继续编辑</button><button type="button" className="cw-button" onClick={() => { setData(conflict); setDraft(conflict.preparation); setConflict(null); setError(''); }}>使用另一窗口的版本</button></div></div>}
    {loading && !data ? <p className="cw-muted" role="status">正在读取拍摄准备…</p> : data && <div className="filming-fields">{([{ key: 'goal', label: '拍摄目标', placeholder: '这次要验证、解决或展示什么', rows: 2 }, { key: 'outline', label: '拍摄提纲', placeholder: '操作步骤、镜头顺序与要讲清的要点', rows: 6 }, { key: 'checklist', label: '准备清单', placeholder: '账号、环境、素材与需要先完成的检查', rows: 4 }, { key: 'notes', label: '补充备注', placeholder: '暂未解决的问题、限制或下次继续的位置', rows: 3 }] as const).map(({ key, label, placeholder, rows }) => <label key={key} className={`filming-field filming-${key}`}><span>{label}</span><textarea value={draft[key]} disabled={loading} rows={rows} maxLength={20000} placeholder={placeholder} onChange={(event) => { setDraft((previous) => ({ ...previous, [key]: event.target.value })); setNotice(''); }} /></label>)}</div>}
    {data?.curation?.reason && <details className="filming-curation"><summary>选题审阅备注</summary><p>{data.curation.reason}</p>{Boolean(data.curation.originalFolderPath?.length) && <p>原内容目录：{data.curation.originalFolderPath?.join(' / ')}</p>}{Boolean(data.curation.originalResearchFolderPath?.length) && <p>原调研目录：{data.curation.originalResearchFolderPath?.join(' / ')}</p>}</details>}
    <section className="filming-sources" aria-label="调研资料"><div className="cw-title-inline"><h2>调研资料</h2><HelpTip label="调研资料说明">来源记录只读保留，用于核对选题依据。拍摄时补充的内容写在上方准备区。</HelpTip><span className="cw-muted">{data?.sources.length ?? 0} 条 · 只读</span></div>{data?.sources.length ? data.sources.map((source) => <details key={source.id} className="filming-source"><summary><ChevronDown size={16} aria-hidden="true" /><FileText size={16} aria-hidden="true" /><span>{source.title || source.label || '调研资料'}</span></summary><div className="filming-source-body"><div className="filming-source-markdown bytemd-preview"><Suspense fallback={<p>正在显示调研资料…</p>}><Viewer value={source.body} plugins={sourcePlugins} /></Suspense></div>{source.urls.filter(safeUrl).length > 0 && <ul>{source.urls.filter(safeUrl).map((url) => <li key={url}><a href={safeUrl(url)} target="_blank" rel="noreferrer">{url}<ExternalLink size={13} aria-hidden="true" /></a></li>)}</ul>}<details><summary>查看完整调研记录</summary><pre>{JSON.stringify(source.payload, null, 2)}</pre></details></div></details>) : <p className="cw-muted">暂无关联的调研资料。</p>}</section>
  </div>;
}
