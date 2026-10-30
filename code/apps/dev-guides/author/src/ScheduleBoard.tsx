import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Menu from '@radix-ui/react-dropdown-menu';
import * as Select from '@radix-ui/react-select';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowDown, ArrowUp, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, CirclePlus, FilePlus2, GripVertical, History, ListOrdered, LoaderCircle, MoreHorizontal, MoveUp, RefreshCw, Search, Settings2, Undo2, X } from 'lucide-react';
import './schedule.css';

export type ScheduleEntry = { slug: string; title: string; kind: 'draft' | 'content'; status: string; done?: boolean; missing?: boolean };
export type ScheduleWeek = { start: string; end: string; entries: ScheduleEntry[] };
export type ScheduleState = { revision: string; cadence: number; timezone: string; thisWeek: ScheduleWeek; nextWeek: ScheduleWeek; queue: ScheduleEntry[]; history: ScheduleWeek[] };
type Scope = 'queue' | 'current';
type Action = { action: 'cadence'; value: number } | { action: 'move'; slug: string; scope: Scope; position: number } | { action: 'enqueue' | 'defer' | 'pull'; slug: string; position?: number } | { action: 'complete'; slug: string; done: boolean } | { action: 'remove'; slug: string };
type Operation = { type: 'create' } | { type: 'existing' } | { type: 'help' } | { type: 'move'; entry: ScheduleEntry; scope: Scope; maximum: number } | { type: 'remove'; entry: ScheduleEntry };
type Props = { request: <T>(path: string, options?: RequestInit) => Promise<T>; onOpen: (entry: ScheduleEntry) => void; onCreate: (title: string, placement: 'front' | 'end') => Promise<{ slug: string }>; articles: ScheduleEntry[] };
const PAGE_SIZE = 20;
const range = (week: ScheduleWeek) => `${week.start.slice(5).replace('-', '/')} – ${week.end.slice(5).replace('-', '/')}`;

function SortableRow({ entry, disabled, children }: { entry: ScheduleEntry; disabled: boolean; children: ReactNode }) {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: entry.slug, disabled });
  const style: CSSProperties = { transform: CSS.Transform.toString(transform), transition };
  return <li ref={setNodeRef} style={style} className={`schedule-row ${isDragging ? 'is-dragging' : ''} ${entry.done ? 'is-done' : ''}`}>
    <button ref={setActivatorNodeRef} type="button" className="schedule-icon-button schedule-grip" {...attributes} {...listeners} aria-label={`拖动排序：${entry.title}`} title="拖动调整顺序；也可用右侧按钮" disabled={disabled}><GripVertical aria-hidden="true" /></button>{children}
  </li>;
}
function SortableList({ entries, disabled, onMove, render }: { entries: ScheduleEntry[]; disabled: boolean; onMove: (slug: string, target: string) => void; render: (entry: ScheduleEntry) => ReactNode }) {
  const [dragging, setDragging] = useState<ScheduleEntry | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const end = ({ active, over }: DragEndEvent) => { setDragging(null); if (!disabled && over && active.id !== over.id) onMove(String(active.id), String(over.id)); };
  return <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={({ active }) => setDragging(entries.find((entry) => entry.slug === active.id) ?? null)} onDragEnd={end} onDragCancel={() => setDragging(null)} accessibility={{ screenReaderInstructions: { draggable: '按空格开始拖动，方向键调整位置，再按空格放下；Escape 取消。也可以使用上移、下移按钮。' }, announcements: { onDragStart: () => '开始调整顺序。', onDragOver: ({ over }) => over ? `移动到${entries.find((entry) => entry.slug === over.id)?.title ?? '目标文章'}的位置。` : '移出排序区域。', onDragEnd: () => '已结束拖动，正在确认顺序。', onDragCancel: () => '已取消拖动。' } }}>
    <SortableContext items={entries.map((entry) => entry.slug)} strategy={verticalListSortingStrategy}><ol className="schedule-list">{entries.map((entry) => <SortableRow key={entry.slug} entry={entry} disabled={disabled}>{render(entry)}</SortableRow>)}</ol></SortableContext>
    <DragOverlay>{dragging ? <div className="schedule-drag-preview"><GripVertical aria-hidden="true" /><span>{dragging.title}</span></div> : null}</DragOverlay>
  </DndContext>;
}

export default function ScheduleBoard({ request, onOpen, onCreate, articles }: Props) {
  const [data, setData] = useState<ScheduleState | null>(null);
  const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(false);
  const lock = useRef(false); const sequence = useRef(0);
  const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const [cadence, setCadence] = useState('3'); const [query, setQuery] = useState(''); const [page, setPage] = useState(1);
  const [operation, setOperation] = useState<Operation | null>(null); const [dialogError, setDialogError] = useState('');
  const [title, setTitle] = useState(''); const [placement, setPlacement] = useState<'front' | 'end'>('front');
  const [position, setPosition] = useState('1'); const [existingQuery, setExistingQuery] = useState('');
  const [createdSlug, setCreatedSlug] = useState<string | null>(null); const [submitting, setSubmitting] = useState(false);
  const dialogLock = useRef(false); const dialogOpening = useRef(false); const returnFocus = useRef<HTMLElement | null>(null);
  const dialogInput = useRef<HTMLInputElement>(null);
  const menuButtons = useRef(new Map<string, HTMLButtonElement>()); const newButton = useRef<HTMLButtonElement>(null); const queueHeading = useRef<HTMLHeadingElement>(null);
  const refresh = useCallback(async (quiet = false) => {
    if (lock.current) return undefined;
    const id = ++sequence.current;
    try { const result = await request<ScheduleState>('/api/schedule'); if (id === sequence.current) { setData(result); if (!quiet) setError(''); } return result; }
    catch (problem) { if (!quiet && id === sequence.current) setError((problem as Error).message); return undefined; }
    finally { if (id === sequence.current) setLoading(false); }
  }, [request]);
  useEffect(() => { void refresh(); const focus = () => { void refresh(true); }; const timer = window.setInterval(focus, 60_000); window.addEventListener('focus', focus); return () => { ++sequence.current; clearInterval(timer); window.removeEventListener('focus', focus); }; }, [refresh]);
  useEffect(() => { if (data) setCadence(String(data.cadence)); }, [data?.cadence]);
  const act = async (action: Action, revision = data?.revision): Promise<ScheduleState> => {
    if (!revision || lock.current) throw new Error('排期正在更新，请稍后重试');
    lock.current = true; setBusy(true); ++sequence.current; setError(''); setNotice('');
    try {
      const result = await request<ScheduleState>('/api/schedule/actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...action, revision }) });
      setData(result); return result;
    } catch (problem) {
      if ((problem as Error & { status?: number }).status === 409) {
        try { setData(await request<ScheduleState>('/api/schedule')); } catch { /* Keep the last visible state until an explicit refresh succeeds. */ }
        throw new Error('排期已在其他窗口或跨周时更新。本次调整未提交，请按最新列表重试。');
      }
      throw problem;
    } finally { lock.current = false; setBusy(false); }
  };
  const run = async (action: Action, message: string) => { try { await act(action); setNotice(message); } catch (problem) { setError((problem as Error).message); } };
  const queue = data?.queue ?? []; const current = data?.thisWeek.entries ?? [];
  const search = query.trim().toLocaleLowerCase();
  const filtered = useMemo(() => queue.filter((entry) => !search || `${entry.title} ${entry.slug}`.toLocaleLowerCase().includes(search)), [queue, search]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const queuedSlugs = new Set([...queue, ...current].map((entry) => entry.slug));
  const existing = articles.filter((entry) => !entry.missing && !queuedSlugs.has(entry.slug) && `${entry.title} ${entry.slug}`.toLocaleLowerCase().includes(existingQuery.trim().toLocaleLowerCase()));
  const nextSlugs = new Set(data?.nextWeek.entries.map((entry) => entry.slug));
  const start = (next: Operation, source?: HTMLElement | null) => {
    returnFocus.current = source ?? document.activeElement as HTMLElement; dialogOpening.current = true;
    setOperation(next); setDialogError(''); setTitle(''); setPlacement('front'); setCreatedSlug(null); setExistingQuery('');
    if (next.type === 'move') setPosition(String((next.scope === 'current' ? current : queue).findIndex((entry) => entry.slug === next.entry.slug) + 1));
  };
  const close = () => { if (dialogLock.current) return; dialogOpening.current = false; setOperation(null); };
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!operation || dialogLock.current || busy) return;
    dialogLock.current = true; setSubmitting(true); setDialogError('');
    try {
      if (operation.type === 'create') {
        let slug = createdSlug;
        if (!slug) { const created = await onCreate(title.trim(), placement); slug = created.slug; setCreatedSlug(slug); }
        const fresh = await refresh(); if (!fresh) throw new Error('草稿已创建，但无法刷新排期；请重试加入队列。');
        const alreadyCurrent = fresh.thisWeek.entries.some((entry) => entry.slug === slug);
        const alreadyQueued = fresh.queue.findIndex((entry) => entry.slug === slug);
        // A response may be lost after the server saved the enqueue. Read before retrying.
        const result = alreadyCurrent || alreadyQueued >= 0 ? fresh : await act({ action: 'enqueue', slug, ...(placement === 'front' ? { position: 1 } : {}) }, fresh.revision);
        const savedIndex = result.queue.findIndex((entry) => entry.slug === slug);
        setQuery(''); setPage(savedIndex >= 0 ? Math.floor(savedIndex / PAGE_SIZE) + 1 : 1);
        setNotice(alreadyCurrent ? '素材已在本周安排中' : alreadyQueued >= 0 ? '素材已在待拍队列中' : placement === 'front' ? '新素材已加入队首' : '新素材已加入队尾');
      } else if (operation.type === 'move') {
        const target = Number(position); if (!Number.isInteger(target) || target < 1 || target > operation.maximum) throw new Error(`位置应为 1 至 ${operation.maximum}`);
        await act({ action: 'move', scope: operation.scope, slug: operation.entry.slug, position: target });
        if (operation.scope === 'queue') { setQuery(''); setPage(Math.ceil(target / PAGE_SIZE)); }
        setNotice('顺序已更新');
      } else if (operation.type === 'remove') { await act({ action: 'remove', slug: operation.entry.slug }); setNotice('已移出待拍队列，文章仍保留'); }
      dialogOpening.current = false; setOperation(null);
    } catch (problem) { setDialogError((problem as Error).message); }
    finally { dialogLock.current = false; setSubmitting(false); }
  };
  const enqueueExisting = async (entry: ScheduleEntry) => {
    if (dialogLock.current || busy) return; dialogLock.current = true; setSubmitting(true); setDialogError('');
    try { const result = await act({ action: 'enqueue', slug: entry.slug, ...(placement === 'front' ? { position: 1 } : {}) }); setQuery(''); setPage(placement === 'front' ? 1 : Math.max(1, Math.ceil(result.queue.length / PAGE_SIZE))); setNotice('文章已加入待拍队列'); dialogOpening.current = false; setOperation(null); }
    catch (problem) { setDialogError((problem as Error).message); } finally { dialogLock.current = false; setSubmitting(false); }
  };
  const menu = (entry: ScheduleEntry, scope: Scope) => {
    const key = `${scope}/${entry.slug}`; const list = scope === 'current' ? current : queue; const index = list.findIndex((item) => item.slug === entry.slug);
    return <Menu.Root><Menu.Trigger asChild><button ref={(node) => { if (node) menuButtons.current.set(key, node); else menuButtons.current.delete(key); }} type="button" className="schedule-icon-button" aria-label={`更多操作：${entry.title}`} disabled={busy || submitting}><MoreHorizontal aria-hidden="true" /></button></Menu.Trigger><Menu.Portal><Menu.Content className="library-menu" sideOffset={4} align="end" collisionPadding={12} onCloseAutoFocus={(event) => { if (dialogOpening.current) event.preventDefault(); }}>
      <Menu.Item className="library-menu-item" disabled={index === 0} onSelect={() => void run({ action: 'move', slug: entry.slug, scope, position: 1 }, '已移到最前')}><MoveUp size={16} aria-hidden="true" />移到最前</Menu.Item>
      <Menu.Item className="library-menu-item" onSelect={() => start({ type: 'move', entry, scope, maximum: list.length }, menuButtons.current.get(key))}><ListOrdered size={16} aria-hidden="true" />移到指定位置</Menu.Item>
      <Menu.Separator className="library-menu-separator" />
      {scope === 'queue' ? <><Menu.Item className="library-menu-item" disabled={entry.missing} onSelect={() => void run({ action: 'pull', slug: entry.slug, position: 1 }, '已插入本周最前，其他本周内容保留')}><CalendarDays size={16} aria-hidden="true" />插入本周最前</Menu.Item><Menu.Item className="library-menu-item" onSelect={() => start({ type: 'remove', entry }, menuButtons.current.get(key))}><X size={16} aria-hidden="true" />移出待拍队列</Menu.Item></> : !entry.done && <Menu.Item className="library-menu-item" onSelect={() => void run({ action: 'defer', slug: entry.slug }, '已退回队尾，本周其余安排保留')}><Undo2 size={16} aria-hidden="true" />退回队尾</Menu.Item>}
    </Menu.Content></Menu.Portal></Menu.Root>;
  };
  const articleTitle = (entry: ScheduleEntry) => <button type="button" className="schedule-title" title={entry.title} onClick={() => onOpen(entry)} disabled={Boolean(entry.missing)}>{entry.title}{entry.missing && <span className="schedule-missing">文章已不存在</span>}</button>;
  const row = (entry: ScheduleEntry, scope: Scope) => {
    const list = scope === 'current' ? current : queue; const index = list.findIndex((item) => item.slug === entry.slug);
    return <><span className="schedule-position">{index + 1}</span><div className="schedule-row-content">{articleTitle(entry)}<span className={`schedule-row-state ${entry.done ? 'is-complete' : ''}`}>{scope === 'current' ? entry.done ? '已拍' : '本周待拍' : nextSlugs.has(entry.slug) ? '下周' : '未安排'}</span></div><div className="schedule-row-actions">
      {scope === 'current' && <button type="button" className={`schedule-icon-button schedule-done ${entry.done ? 'is-checked' : ''}`} aria-label={`${entry.done ? '撤销已拍' : '标记已拍'}：${entry.title}`} title={entry.done ? '撤销已拍' : '标记已拍'} aria-pressed={Boolean(entry.done)} disabled={busy || entry.missing} onClick={() => void run({ action: 'complete', slug: entry.slug, done: !entry.done }, entry.done ? '已恢复为本周待拍' : '已标记已拍')}><Check aria-hidden="true" /></button>}
      <button type="button" className="schedule-icon-button" aria-label={`上移：${entry.title}`} title="上移" disabled={busy || index <= 0} onClick={() => void run({ action: 'move', slug: entry.slug, scope, position: index }, '顺序已更新')}><ArrowUp aria-hidden="true" /></button>
      <button type="button" className="schedule-icon-button" aria-label={`下移：${entry.title}`} title="下移" disabled={busy || index === list.length - 1} onClick={() => void run({ action: 'move', slug: entry.slug, scope, position: index + 2 }, '顺序已更新')}><ArrowDown aria-hidden="true" /></button>{menu(entry, scope)}</div></>;
  };
  const dragMove = (scope: Scope) => (slug: string, target: string) => { const list = scope === 'current' ? current : queue; const index = list.findIndex((entry) => entry.slug === target); if (index >= 0) void run({ action: 'move', slug, scope, position: index + 1 }, '顺序已更新'); };
  const placementField = <label className="schedule-field"><span>加入位置</span><Select.Root value={placement} onValueChange={(value) => setPlacement(value as 'front' | 'end')} disabled={submitting}><Select.Trigger className="folder-select" aria-label="加入队列的位置"><Select.Value /><Select.Icon><ChevronDown size={16} aria-hidden="true" /></Select.Icon></Select.Trigger><Select.Portal><Select.Content className="library-select-content" position="popper" sideOffset={4} collisionPadding={12}><Select.Viewport>{[{ value: 'front', label: '队首，优先拍' }, { value: 'end', label: '队尾，稍后拍' }].map((option) => <Select.Item className="library-select-item" key={option.value} value={option.value}><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator><Check size={16} aria-hidden="true" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal></Select.Root></label>;
  const dialogTitle = operation?.type === 'create' ? '新建临时素材' : operation?.type === 'existing' ? '添加已有文章' : operation?.type === 'move' ? '调整位置' : operation?.type === 'remove' ? '移出待拍队列' : '排期规则';
  return <main className="schedule-board" aria-label="拍摄排期">
    <div className="schedule-heading"><div><h1>拍摄排期</h1><p>近期两周，后面的按队列顺序准备。</p></div><div className="schedule-heading-actions"><button type="button" className="schedule-icon-button" aria-label="查看排期规则" title="排期规则" onClick={(event) => start({ type: 'help' }, event.currentTarget)}><CircleHelp aria-hidden="true" /></button><button type="button" className="schedule-icon-button" aria-label="刷新排期" title="刷新排期" disabled={busy || loading} onClick={() => void refresh()}><RefreshCw aria-hidden="true" /></button><button ref={newButton} type="button" className="save-button" disabled={!data || busy} onClick={(event) => start({ type: 'create' }, event.currentTarget)}><FilePlus2 size={18} aria-hidden="true" />新建素材</button></div></div>
    {error && <div className="message message-error" role="alert"><span>{error}</span><button type="button" onClick={() => void refresh()}>重试</button></div>}{notice && !error && <p className="schedule-notice" role="status"><Check size={16} aria-hidden="true" />{notice}</p>}
    {loading && !data ? <div className="schedule-empty" role="status"><LoaderCircle className="spin" aria-hidden="true" />正在读取排期…</div> : !data ? <div className="schedule-empty"><p>暂时无法读取排期。</p><button type="button" className="secondary-button" onClick={() => void refresh()}>重新加载</button></div> : <>
      <div className="schedule-weeks"><section className="schedule-week schedule-current" aria-labelledby="schedule-current-title"><header className="schedule-section-heading"><div><h2 id="schedule-current-title">本周</h2><p>{range(data.thisWeek)}</p></div><span className="schedule-count">已拍 {current.filter((entry) => entry.done).length} / {current.length}</span></header>
        {current.length ? <SortableList entries={current} disabled={busy || submitting} onMove={dragMove('current')} render={(entry) => row(entry, 'current')} /> : <p className="schedule-empty">本周暂无安排。可以从队列中插入一条。</p>}
      </section><section className="schedule-week schedule-next" aria-labelledby="schedule-next-title"><header className="schedule-section-heading"><div><h2 id="schedule-next-title">下周</h2><p>{range(data.nextWeek)}</p></div><span className="schedule-count">{data.nextWeek.entries.length} 条</span></header>
        <form className="schedule-cadence" onSubmit={(event) => { event.preventDefault(); const value = Number(cadence); if (!Number.isInteger(value) || value < 1 || value > 21) { setError('每周条数应为 1 至 21'); return; } void run({ action: 'cadence', value }, '每周条数已更新，从下周生效'); }}><label htmlFor="schedule-cadence"><Settings2 size={16} aria-hidden="true" />每周几条</label><input id="schedule-cadence" type="number" min={1} max={21} required value={cadence} onChange={(event) => setCadence(event.target.value)} disabled={busy} /><button type="submit" className="secondary-button" disabled={busy || Number(cadence) === data.cadence}>应用</button><span>下周起生效</span></form>
        {data.nextWeek.entries.length ? <ol className="schedule-next-list">{data.nextWeek.entries.map((entry, index) => <li key={entry.slug}><span className="schedule-position">{index + 1}</span>{articleTitle(entry)}</li>)}</ol> : <p className="schedule-empty">队列为空，添加素材后自动安排。</p>}<button type="button" className="schedule-inline-button" onClick={() => { setQuery(''); setPage(1); queueHeading.current?.scrollIntoView({ block: 'start' }); queueHeading.current?.focus({ preventScroll: true }); }}>调整队列顺序<ChevronDown size={16} aria-hidden="true" /></button>
      </section></div>
      <section className="schedule-queue" aria-labelledby="schedule-queue-title"><header className="schedule-section-heading"><div><h2 id="schedule-queue-title" ref={queueHeading} tabIndex={-1}>待拍队列 <span>{queue.length}</span></h2><p>前 {data.cadence} 条安排下周，其余暂不安排。</p></div><button type="button" className="secondary-button" disabled={busy} onClick={(event) => start({ type: 'existing' }, event.currentTarget)}><CirclePlus size={17} aria-hidden="true" />添加已有文章</button></header>
        <div className="schedule-search"><Search aria-hidden="true" /><input aria-label="搜索待拍队列" placeholder="搜索标题或文章地址" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />{query && <button type="button" className="schedule-icon-button" aria-label="清空搜索" onClick={() => setQuery('')}><X aria-hidden="true" /></button>}</div>
        {search && <p className="schedule-search-note">搜索时可用按钮调整全局顺序；清空搜索后可拖动排序。</p>}
        {visible.length ? <SortableList entries={visible} disabled={busy || submitting || Boolean(search)} onMove={dragMove('queue')} render={(entry) => row(entry, 'queue')} /> : <p className="schedule-empty">{search ? '没有找到匹配的素材。' : '队列为空，可以新建素材或添加已有文章。'}</p>}
        <nav className="schedule-pagination" aria-label="待拍队列分页"><span>{filtered.length ? `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} / ${filtered.length} 条` : '0 条'}</span><div><button type="button" className="schedule-icon-button" aria-label="上一页" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft aria-hidden="true" /></button><span>第 {currentPage} / {pages} 页</span><button type="button" className="schedule-icon-button" aria-label="下一页" disabled={currentPage >= pages} onClick={() => setPage(currentPage + 1)}><ChevronRight aria-hidden="true" /></button></div></nav>
      </section>
      <details className="schedule-history"><summary><History size={18} aria-hidden="true" /><span>过去的周</span><span className="schedule-count">{data.history.length}</span><ChevronDown size={16} aria-hidden="true" /></summary>{data.history.length ? data.history.map((week) => <section key={week.start}><h3>{week.start} 至 {week.end}</h3><ul>{week.entries.map((entry) => <li key={entry.slug}>{articleTitle(entry)}<span className={entry.done ? 'is-complete' : ''}>{entry.done ? '已拍' : '未拍完'}</span></li>)}</ul></section>) : <p className="schedule-empty">跨周后会在这里保留实际安排和拍摄记录。</p>}</details>
    </>}
    <Dialog.Root open={operation !== null} onOpenChange={(open) => { if (!open) close(); }}><Dialog.Portal><Dialog.Overlay className="library-dialog-overlay" /><Dialog.Content className="library-dialog schedule-dialog" onOpenAutoFocus={(event) => { if (operation && ['create', 'move', 'existing'].includes(operation.type)) { event.preventDefault(); dialogInput.current?.focus(); if (operation.type === 'move') dialogInput.current?.select(); } }} onEscapeKeyDown={(event) => { if (submitting) event.preventDefault(); }} onPointerDownOutside={(event) => { if (submitting) event.preventDefault(); }} onCloseAutoFocus={(event) => { event.preventDefault(); (returnFocus.current?.isConnected ? returnFocus.current : newButton.current)?.focus(); }}><Dialog.Title>{dialogTitle}</Dialog.Title><Dialog.Description className="library-dialog-description">{operation?.type === 'create' ? '填好标题即可入队，随时点开继续写。' : operation?.type === 'existing' ? '把尚未进入本周或队列的文章加入排期。' : operation?.type === 'move' ? `在${operation.scope === 'current' ? '本周' : '整个待拍队列'}内移动，范围 1 至 ${operation.maximum}。` : operation?.type === 'remove' ? '只移出拍摄队列，文章及正文仍保留。' : '每周从周一开始，日期按北京时间计算。'}</Dialog.Description><Dialog.Close asChild><button type="button" className="library-dialog-close" aria-label="关闭排期操作" disabled={submitting}><X size={19} aria-hidden="true" /></button></Dialog.Close>
      {operation?.type === 'help' ? <><ul className="schedule-help"><li>只安排本周和下周，其余内容保留在队列，不预分周次。</li><li>文章目录只用于分类，不决定拍摄周次；以这里的本周、下周日期为准。</li><li>本周可单独换序、插入临时内容或退回队尾；修改每周条数只影响下周。</li><li>下周由队列最前面的内容自动补齐，拖动当前页，或用按钮、指定位置跨页调整。</li><li>跨周时，下周成为本周；上一周未拍完的内容回到剩余队列最前，已拍记录保留。</li><li>“已拍”只记录拍摄进度，不会发布文章或视频。</li></ul><div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="save-button">知道了</button></Dialog.Close></div></> : operation?.type === 'existing' ? <>{placementField}<label className="schedule-field"><span>查找文章</span><input ref={dialogInput} autoFocus value={existingQuery} onChange={(event) => setExistingQuery(event.target.value)} placeholder="输入标题或文章地址" /></label><ul className="schedule-existing-list">{existing.map((entry) => <li key={entry.slug}><span>{entry.title}</span><button type="button" className="secondary-button" disabled={submitting || busy} onClick={() => void enqueueExisting(entry)}>加入</button></li>)}</ul>{!existing.length && <p className="schedule-empty">没有可添加的文章，可以先新建素材。</p>}{dialogError && <p className="field-error" role="alert">{dialogError}</p>}</> : <form onSubmit={(event) => void submit(event)}>
        {operation?.type === 'create' && <><label className="schedule-field"><span>素材标题</span><input ref={dialogInput} autoFocus value={title} onChange={(event) => setTitle(event.target.value)} minLength={2} maxLength={160} required disabled={submitting || Boolean(createdSlug)} placeholder="例如：临时发现的一个实用功能" /></label>{placementField}{createdSlug && <p className="schedule-created" role="status">草稿已创建。重试只会加入队列，不会再建一份。</p>}</>}
        {operation?.type === 'move' && <><p className="schedule-dialog-entry">{operation.entry.title}</p><label className="schedule-field"><span>移动到第几条</span><input ref={dialogInput} autoFocus type="number" min={1} max={operation.maximum} value={position} onChange={(event) => setPosition(event.target.value)} required disabled={submitting} /></label></>}
        {operation?.type === 'remove' && <p className="schedule-dialog-entry">{operation.entry.title}</p>}
        {dialogError && <p className="field-error" role="alert">{dialogError}</p>}<div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="secondary-button" disabled={submitting}>取消</button></Dialog.Close><button type="submit" className="save-button" disabled={submitting || busy}>{submitting && <LoaderCircle className="spin" size={16} aria-hidden="true" />}{submitting ? '正在保存…' : operation?.type === 'create' ? createdSlug ? '重试加入队列' : '创建并加入队列' : operation?.type === 'remove' ? '移出队列' : '保存位置'}</button></div>
      </form>}
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </main>;
}
