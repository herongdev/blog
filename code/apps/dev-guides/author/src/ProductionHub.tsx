import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ListChecks } from 'lucide-react';
import { AuthorButton } from './AuthorUI';
export { AuthorToolbar as ProductionToolbar, AuthorSearchField as ProductionSearch } from './AuthorUI';
import './production-hub.css';

export type ProductionView = 'schedule' | 'productions';
export type ProductionOverviewItem = {
  id: string; kind: 'draft' | 'content'; slug: string; title: string; status: string;
  currentStageId: string; updatedAt: string; nextAction: string; blockers: { reason: string }[];
  stage?: { name: string; status: string };
};
type Request = <T>(path: string, options?: RequestInit) => Promise<T>;
export type ProductionOverviewState = {
  items: ProductionOverviewItem[]; bySlug: Map<string, ProductionOverviewItem>;
  loading: boolean; loaded: boolean; error: string; refresh: () => Promise<void>;
};
const stageLabels: Record<string, string> = { not_started: '未开始', in_progress: '制作中', in_review: '待审阅', approved: '已确认', needs_review: '需复核', blocked: '受阻' };

export function ProductionViewSwitch({ value, onChange }: { value: ProductionView; onChange: (value: ProductionView) => void }) {
  return <nav className="production-view-switch" aria-label="制作视图">
    <AuthorButton variant="ghost" type="button" aria-pressed={value === 'schedule'} onClick={() => onChange('schedule')}><CalendarDays size={16} aria-hidden="true" />本周排期</AuthorButton>
    <AuthorButton variant="ghost" type="button" aria-pressed={value === 'productions'} onClick={() => onChange('productions')}><ListChecks size={16} aria-hidden="true" />全部进度</AuthorButton>
  </nav>;
}

/** A single shared read serves the schedule and progress views; rows never fetch independently. */
export function useProductionOverview(request: Request, active: boolean): ProductionOverviewState {
  const [items, setItems] = useState<ProductionOverviewItem[]>([]);
  const [loading, setLoading] = useState(false), [loaded, setLoaded] = useState(false), [error, setError] = useState('');
  const sequence = useRef(0), controller = useRef<AbortController | null>(null), activeRef = useRef(active);
  activeRef.current = active;
  const refresh = useCallback(async () => {
    if (!activeRef.current) return;
    const generation = ++sequence.current;
    controller.current?.abort();
    const pending = new AbortController(); controller.current = pending;
    setLoading(true); setError('');
    try {
      const result = await request<{ items: ProductionOverviewItem[] }>('/api/productions', { signal: pending.signal, cache: 'no-store' });
      if (pending.signal.aborted || generation !== sequence.current) return;
      if (!Array.isArray(result.items)) throw new Error('制作进度返回不完整，请重新读取');
      setItems(result.items); setLoaded(true);
    } catch (problem) {
      if (!pending.signal.aborted && generation === sequence.current) setError((problem as Error).message);
    } finally {
      if (generation === sequence.current) { setLoading(false); controller.current = null; }
    }
  }, [request]);
  useEffect(() => {
    if (!active) { ++sequence.current; controller.current?.abort(); controller.current = null; setLoading(false); return; }
    void refresh();
    const focus = () => { if (document.visibilityState !== 'hidden') void refresh(); };
    const timer = window.setInterval(focus, 60_000);
    window.addEventListener('focus', focus); document.addEventListener('visibilitychange', focus);
    return () => { ++sequence.current; controller.current?.abort(); controller.current = null; clearInterval(timer); window.removeEventListener('focus', focus); document.removeEventListener('visibilitychange', focus); };
  }, [active, refresh]);
  const bySlug = useMemo(() => new Map(items.map(item => [item.slug, item])), [items]);
  return { items, bySlug, loading, loaded, error, refresh };
}

export function productionOverviewLabel(item: ProductionOverviewItem): { label: string; tone: string } {
  if (item.status === 'paused') return { label: '已暂停', tone: 'paused' };
  if (item.blockers?.length || item.stage?.status === 'blocked') return { label: '受阻', tone: 'warning' };
  if (item.stage?.status === 'needs_review') return { label: '需复核', tone: 'warning' };
  if (item.status === 'completed') return { label: '制作完成', tone: 'complete' };
  return { label: stageLabels[item.stage?.status ?? ''] ?? '制作中', tone: 'active' };
}

export function ScheduleProductionSummary({ slug, updateTaskId, missing, overview }: { slug: string; updateTaskId?: string; missing?: boolean; overview?: ProductionOverviewState }) {
  // Update tasks have their own identity. The original episode cannot prove this update finished.
  if (missing || updateTaskId || !overview?.loaded) return null;
  const item = overview.bySlug.get(slug);
  const stale = overview.loading || Boolean(overview.error);
  if (!item) return stale ? null : <span className="schedule-production-summary">未开始制作</span>;
  const status = productionOverviewLabel(item);
  const text = [stale ? '上次读取' : '', status.label, item.stage?.name].filter(Boolean).join(' · ');
  return <span className={`schedule-production-summary tone-${status.tone}${stale ? ' is-stale' : ''}`} aria-label={text} title={[text, item.blockers?.[0]?.reason || item.nextAction].filter(Boolean).join('；')}>{text}</span>;
}
