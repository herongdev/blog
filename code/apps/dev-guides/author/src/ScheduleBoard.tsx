import { useToast } from './AuthorToast';
import IconButton from './IconButton';
import AuthorDialogContent from './AuthorDialogContent';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Menu from '@radix-ui/react-dropdown-menu';
import AuthorSelect from './AuthorSelect';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCenter, pointerWithin, useDroppable, useSensor, useSensors, type CollisionDetection, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Archive, ArchiveRestore, Clapperboard, FolderInput, ArrowDown, ArrowUp, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, CirclePlus, BookOpenText, Film, FolderOpen, Send, FilePlus2, GripVertical, History, ListOrdered, LoaderCircle, MoreHorizontal, MoveUp, RefreshCw, Search, Undo2, X } from 'lucide-react';
import ArticleLibrary, { FolderPicker, descendants, folderPath, type LibraryAction, type LibraryArticle, type LibrarySelection, type LibraryState } from './ArticleLibrary';
import { directoryKeyboardCoordinates, libraryDropAction } from './library-dnd';
import HelpTip from './HelpTip';
import './schedule.css';

export type ScheduleEntry = { slug: string; title: string; kind: 'draft' | 'content'; status: string; done?: boolean; missing?: boolean };
export type ScheduleWeek = { start: string; end: string; entries: ScheduleEntry[] };
export type ScheduleState = { revision: string; timezone: string; thisWeek: ScheduleWeek; queue: ScheduleEntry[]; history: ScheduleWeek[] };
type Scope = 'queue' | 'current';
type Action = { action: 'move' | 'transfer'; slug: string; scope: Scope; position: number } | { action: 'enqueue'; slug: string; position?: number } | { action: 'complete'; slug: string; done: boolean } | { action: 'remove'; slug: string };
type Operation = { type: 'create' } | { type: 'existing' } | { type: 'help' } | { type: 'move'; entry: ScheduleEntry; scope: Scope; minimum: number; maximum: number } | { type: 'remove' | 'assign' | 'archive'; entry: ScheduleEntry };
type Props = { request: <T>(path: string, options?: RequestInit) => Promise<T>; onOpen: (entry: ScheduleEntry, tab?: 'filming'|'article'|'video'|'assets'|'publish') => void; onCreate: (title: string, placement: 'front' | 'end') => Promise<{ slug: string }>; articles: ScheduleEntry[]; active?: boolean; library: LibraryState | null; librarySelection: LibrarySelection; onLibrarySelect: (selection: LibrarySelection) => void; libraryBusy: boolean; onLibraryAction: (action: LibraryAction, revision?: string) => Promise<LibraryState>; onLibraryRefresh: () => Promise<void>; archivedItems: LibraryArticle[]; archiveLoading: boolean };
const PAGE_SIZE = 20;
const range = (week: ScheduleWeek) => `${week.start.slice(5).replace('-', '/')} – ${week.end.slice(5).replace('-', '/')}`;

function SortableRow({ entry, scope, disabled, children }: { entry: ScheduleEntry; scope: Scope; disabled: boolean; children: ReactNode }) {
  const fixed = scope === 'current' && Boolean(entry.done);
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: entry.slug, disabled: { draggable: disabled || fixed, droppable: disabled }, data: { scope, entry } });
  const style: CSSProperties = { transform: fixed ? undefined : CSS.Transform.toString(transform), transition };
  return <li ref={setNodeRef} style={style} className={`schedule-row ${isDragging ? 'is-dragging' : ''} ${entry.done ? 'is-done' : ''}`}>
    <IconButton ref={setActivatorNodeRef} type="button" className="schedule-icon-button schedule-grip" data-schedule-slug={entry.slug} {...attributes} {...listeners} aria-label={fixed ? `已拍条目固定在顶部：${entry.title}` : `拖动排序：${entry.title}`} title={fixed ? '已拍固定在顶部；撤销已拍后可调整' : '拖动排序或移到另一组；也可用右侧按钮'} disabled={disabled || fixed}><GripVertical aria-hidden="true" /></IconButton>{children}
  </li>;
}
function SortableList({ entries, scope, disabled, empty, render }: { entries: ScheduleEntry[]; scope: Scope; disabled: boolean; empty: string; render: (entry: ScheduleEntry) => ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: `schedule-zone-${scope}`, disabled: disabled || entries.length > 0, data: { scope, zone: true, empty: entries.length === 0 } });
  return <div ref={setNodeRef} className={`schedule-drop-zone ${isOver ? 'is-over' : ''}`}>
    <SortableContext id={scope} items={entries.map((entry) => entry.slug)} strategy={verticalListSortingStrategy}>
      {entries.length ? <ol className="schedule-list">{entries.map((entry) => <SortableRow key={entry.slug} entry={entry} scope={scope} disabled={disabled}>{render(entry)}</SortableRow>)}</ol> : <p className="schedule-empty">{empty}</p>}
    </SortableContext>
  </div>;
}

// Nested list containers only compete with rows when empty. This makes empty
// sections reachable by pointer, touch and sortableKeyboardCoordinates alike.
const scheduleCollision: CollisionDetection = (args) => {
  const candidates = args.droppableContainers.filter((container) => !container.data.current?.zone || container.data.current.empty);
  const scoped = { ...args, droppableContainers: candidates };
  return args.pointerCoordinates ? pointerWithin(scoped) : closestCenter(scoped);
};

export default function ScheduleBoard({ request, onOpen, onCreate, articles, active = true, library, librarySelection, onLibrarySelect, libraryBusy, onLibraryAction, onLibraryRefresh, archivedItems, archiveLoading }: Props) {
  const [data, setData] = useState<ScheduleState | null>(null);
  const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(false);
  const lock = useRef(false); const sequence = useRef(0);
  const previousArticles = useRef(new Map(articles.map((entry) => [`${entry.kind}/${entry.slug}`, entry])));
  const pendingArticleUpdates = useRef(new Map<string, ScheduleEntry>());
  const refreshPending = useRef(false);
  const refreshing = useRef(false); const refreshRequest = useRef(0); const revisionStale = useRef(false);
  const [refreshingState, setRefreshing] = useState(false); const [staleState, setStale] = useState(false);
  const controlsBusy = busy || refreshingState || staleState || libraryBusy;
  const [directoriesOpen, setDirectoriesOpen] = useState(() => window.matchMedia('(min-width: 901px)').matches);
  const [folderDrag, setFolderDrag] = useState(''); const folderDragging = useRef(false); const directorySnapshot = useRef<LibraryState | null>(null); const [destination, setDestination] = useState<string | null>(null); const [archiveReason, setArchiveReason] = useState('');
  const [error, setError] = useState(''); const notify = useToast();
  const [query, setQuery] = useState(''); const [page, setPage] = useState(1);
  const [dragging, setDragging] = useState<ScheduleEntry | null>(null);
  const dragSnapshot = useRef<{ revision: string; current: ScheduleEntry[]; queue: ScheduleEntry[]; entry: ScheduleEntry; scope: Scope } | null>(null);
  const focusAfterDrop = useRef<{ slug: string; scope: Scope } | null>(null);
  const currentSection = useRef<HTMLElement>(null); const queueSection = useRef<HTMLElement>(null);
  const currentHeading = useRef<HTMLHeadingElement>(null); const queueHeading = useRef<HTMLHeadingElement>(null);
  const pointerY = useRef<number | undefined>(undefined);
  const hitCompleted = useRef(false);
  const detectCollision = useCallback<CollisionDetection>((args) => {
    if (args.active.data.current?.libraryKind === 'folder') { const targets = { ...args, droppableContainers: args.droppableContainers.filter((container) => container.data.current?.libraryKind === 'target') }; return args.pointerCoordinates ? pointerWithin(targets) : closestCenter(targets); }
    pointerY.current = args.pointerCoordinates?.y;
    const collisions = scheduleCollision(args);
    const hit = args.droppableContainers.find((container) => container.id === collisions[0]?.id);
    hitCompleted.current = hit?.data.current?.scope === 'current' && Boolean(hit.data.current.entry?.done);
    if (hitCompleted.current) {
      // Keep the sortable preview at the pending boundary, never between fixed
      // completed rows. When every item is done, its rows remain valid targets.
      const firstPending = args.droppableContainers.filter((container) => container.data.current?.scope === 'current' && container.data.current.entry && !container.data.current.entry.done).sort((a, b) => a.data.current?.sortable.index - b.data.current?.sortable.index)[0];
      if (firstPending) return [{ id: firstPending.id, data: { ...collisions[0]?.data, droppableContainer: firstPending } }];
    }
    return collisions;
  }, []);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: (event, args) => args.context.active?.data.current?.libraryKind === 'folder' ? directoryKeyboardCoordinates(event, args) : sortableKeyboardCoordinates(event, args) }));
  const [operation, setOperation] = useState<Operation | null>(null); const [dialogError, setDialogError] = useState('');
  const [title, setTitle] = useState(''); const [placement, setPlacement] = useState<'front' | 'end'>('front');
  const [position, setPosition] = useState('1'); const [existingQuery, setExistingQuery] = useState('');
  const [createdSlug, setCreatedSlug] = useState<string | null>(null); const [submitting, setSubmitting] = useState(false);
  const dialogLock = useRef(false); const dialogOpening = useRef(false); const returnFocus = useRef<HTMLElement | null>(null);
  const dialogInput = useRef<HTMLInputElement>(null);
  const menuButtons = useRef(new Map<string, HTMLButtonElement>()); const newButton = useRef<HTMLButtonElement>(null);
  const refresh = useCallback(async (quiet = false) => {
    if (lock.current || dragSnapshot.current || folderDragging.current) { refreshPending.current = true; return undefined; }
    refreshPending.current = false;
    const id = ++sequence.current; const readId = ++refreshRequest.current;
    refreshing.current = true; setRefreshing(true);
    try {
      const result = await request<ScheduleState>('/api/schedule');
      if (id !== sequence.current) return undefined;
      setData(result); revisionStale.current = false; setStale(false); setError(''); return result;
    } catch (problem) {
      if (id === sequence.current && (!quiet || revisionStale.current)) setError((problem as Error).message);
      return undefined;
    } finally {
      if (id === sequence.current) setLoading(false);
      if (readId === refreshRequest.current) { refreshing.current = false; setRefreshing(false); }
    }
  }, [request]);
  useEffect(() => {
    if (!active) return;
    const focus = () => {
      if (document.visibilityState === 'hidden') return;
      refreshPending.current = true;
      if (!dialogLock.current) void refresh(true);
    };
    // Entering the board must load even when the browser window is obscured.
    // Background polling still waits for visibility in focus() above.
    void refresh();
    const timer = window.setInterval(focus, 60_000);
    window.addEventListener('focus', focus); document.addEventListener('visibilitychange', focus);
    return () => { ++sequence.current; clearInterval(timer); window.removeEventListener('focus', focus); document.removeEventListener('visibilitychange', focus); };
  }, [active, refresh]);
  useEffect(() => {
    let changed = false;
    const scheduledSlugs = new Set([...(data?.thisWeek.entries ?? []), ...(data?.queue ?? [])].map((entry) => entry.slug));
    for (const entry of articles) {
      const previous = previousArticles.current.get(`${entry.kind}/${entry.slug}`);
      if ((!data || scheduledSlugs.has(entry.slug)) && (!previous || previous.title !== entry.title || previous.kind !== entry.kind || previous.status !== entry.status)) {
        pendingArticleUpdates.current.set(entry.slug, entry); changed = true;
      }
    }
    for (const previous of previousArticles.current.values()) if (scheduledSlugs.has(previous.slug) && !articles.some((entry) => entry.slug === previous.slug)) changed = true;
    previousArticles.current = new Map(articles.map((entry) => [`${entry.kind}/${entry.slug}`, entry]));
    if (changed) { ++sequence.current; refreshPending.current = true; revisionStale.current = true; if (!folderDragging.current && !dragSnapshot.current) setStale(true); }
    if (busy || submitting || dragging || lock.current || dragSnapshot.current || folderDragging.current) return;
    if (revisionStale.current) setStale(true);
    if (pendingArticleUpdates.current.size) {
      const updates = new Map(pendingArticleUpdates.current); pendingArticleUpdates.current.clear();
      // Only apply newly saved metadata once. A later server response may contain
      // newer edits from another device; the parent list must not mask those.
      setData((previous) => {
        if (!previous) return previous;
        const update = (entry: ScheduleEntry) => {
          const saved = updates.get(entry.slug);
          return saved ? { ...entry, title: saved.title, kind: saved.kind, status: saved.status, missing: false } : entry;
        };
        return { ...previous, thisWeek: { ...previous.thisWeek, entries: previous.thisWeek.entries.map(update) }, queue: previous.queue.map(update) };
      });
    }
    if (active && refreshPending.current) void refresh(true);
  }, [articles, active, busy, submitting, dragging, folderDrag, refresh]);
  useEffect(() => {
    const target = focusAfterDrop.current;
    if (!target || busy || dragging || lock.current) return;
    const section = target.scope === 'current' ? currentSection.current : queueSection.current;
    const heading = target.scope === 'current' ? currentHeading.current : queueHeading.current;
    const handle = Array.from(section?.querySelectorAll<HTMLButtonElement>('.schedule-grip') ?? []).find((button) => button.dataset.scheduleSlug === target.slug);
    // Cross-section updates remount the active row. Preserve the user's filter
    // and page; if the new row is hidden, return keyboard focus to its heading.
    (handle ?? heading)?.focus(); focusAfterDrop.current = null;
  }, [data, busy, dragging]);
  const act = async (action: Action, revision = data?.revision): Promise<ScheduleState> => {
    if (!revision || lock.current || refreshing.current || revisionStale.current) throw new Error('排期正在更新，请稍后重试');
    lock.current = true; setBusy(true); ++sequence.current; setError('');
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
  const run = async (action: Action, message: string, revision?: string) => { try { await act(action, revision); notify(message); } catch (problem) { setError((problem as Error).message); } };
  const queue = data?.queue ?? []; const current = data?.thisWeek.entries ?? [];
  const operationEntry = operation && 'entry' in operation ? [...current, ...queue].find((entry) => entry.slug === operation.entry.slug) ?? operation.entry : null;
  const search = query.trim().toLocaleLowerCase();
  const archivedView = librarySelection === 'archived';
  const filtered = useMemo(() => { const scope = !['all', 'unfiled', 'archived'].includes(librarySelection) ? descendants(library?.folders ?? [], librarySelection) : null; return queue.filter((entry) => { const folder = library?.assignments[`${entry.kind}/${entry.slug}`]; return (!scope || scope.has(folder ?? '')) && (librarySelection !== 'unfiled' || !folder) && (!search || `${entry.title} ${entry.slug}`.toLocaleLowerCase().includes(search)); }); }, [queue, search, library, librarySelection]);
  useEffect(() => { setPage(1); }, [librarySelection]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const queuedSlugs = new Set([...queue, ...current].map((entry) => entry.slug));
  const existing = articles.filter((entry) => !entry.missing && !queuedSlugs.has(entry.slug) && `${entry.title} ${entry.slug}`.toLocaleLowerCase().includes(existingQuery.trim().toLocaleLowerCase()));
  const dragStart = ({ active, activatorEvent }: DragStartEvent) => {
    if (!data || busy || submitting || libraryBusy || refreshing.current || revisionStale.current) return;
    directorySnapshot.current = library;
    if (active.data.current?.libraryKind === 'folder') { folderDragging.current = true; setFolderDrag(active.data.current.folder.name); return; }
    const entry = [...current, ...queue].find((item) => item.slug === active.id);
    if (!entry || entry.done) return;
    // Keep position and revision from the same snapshot even if a refresh was
    // already in flight or another author window saves while this drag is active.
    ++sequence.current;
    const startY = 'clientY' in activatorEvent ? Number(activatorEvent.clientY) : undefined;
    dragSnapshot.current = { revision: data.revision, current, queue, entry, scope: current.some((item) => item.slug === entry.slug) ? 'current' : 'queue' };
    // Retain an inline error until drop: removing it now would shift every
    // measured droppable vertically just as a pointer/keyboard drag starts.
    pointerY.current = startY; setDragging(entry);
  };
  const dragEnd = ({ active, over }: DragEndEvent) => {
    folderDragging.current = false; setFolderDrag('');
    const directory = directorySnapshot.current; directorySnapshot.current = null;
    if (directory && over?.data.current?.libraryKind === 'target') {
      dragSnapshot.current = null; setDragging(null); const action = libraryDropAction({ active, over }, directory);
      if (action) void onLibraryAction(action, directory.revision).catch((problem) => setError((problem as Error).message));
      return;
    }
    if (active.data.current?.libraryKind === 'folder') return;
    const snapshot = dragSnapshot.current;
    dragSnapshot.current = null; setDragging(null);
    if (!snapshot || !over || active.id === over.id) return;
    const scope = over.data.current?.scope as Scope | undefined;
    if (scope !== 'current' && scope !== 'queue') return;
    if (snapshot.entry.done && scope === 'queue') { setError('已拍条目请先撤销已拍，再移回其它。'); return; }
    if (snapshot.entry.missing && scope === 'current' && snapshot.scope !== 'current') { setError('文章已不存在，无法移入本周。'); return; }
    const target = snapshot[scope].filter((entry) => entry.slug !== snapshot.entry.slug);
    let position = target.length + 1;
    if (!over.data.current?.zone) {
      // Resolve a visible target by slug in the complete snapshot, never by its
      // filtered/page-local index. Hidden rows retain their relative order.
      const index = target.findIndex((entry) => entry.slug === over.id);
      if (index < 0) return;
      if (pointerY.current === undefined && scope === snapshot.scope) {
        // Keyboard coordinates refer to the target row's original position.
        // Resolve arrayMove's final position, independent of the path taken
        // (e.g. Down, Down, Up must not undo the first move).
        position = snapshot[scope].findIndex((entry) => entry.slug === over.id) + 1;
      } else {
        const after = pointerY.current === undefined
          ? snapshot.scope === 'queue'
          : pointerY.current > over.rect.top + over.rect.height / 2;
        position = index + 1 + Number(after);
      }
    }
    if (scope === 'current') position = Math.max(position, snapshot.current.filter((entry) => entry.done).length + 1);
    if (scope === 'current' && hitCompleted.current) position = snapshot.current.filter((entry) => entry.done).length + 1;
    const previousPosition = snapshot[snapshot.scope].findIndex((entry) => entry.slug === snapshot.entry.slug) + 1;
    if (scope === snapshot.scope && position === previousPosition) return;
    if (pointerY.current === undefined) focusAfterDrop.current = { slug: snapshot.entry.slug, scope };
    void run({ action: scope === snapshot.scope ? 'move' : 'transfer', slug: snapshot.entry.slug, scope, position }, scope === snapshot.scope ? '顺序已更新' : scope === 'current' ? '已移入本周' : '已移回其它', snapshot.revision);
  };
  const start = (next: Operation, source?: HTMLElement | null) => {
    returnFocus.current = source ?? document.activeElement as HTMLElement; dialogOpening.current = true;
    setOperation(next); setDialogError(''); setArchiveReason(''); if ('entry' in next) setDestination(library?.assignments[`${next.entry.kind}/${next.entry.slug}`] ?? null); setTitle(''); setPlacement('front'); setCreatedSlug(null); setExistingQuery('');
    if (next.type === 'move') setPosition(String((next.scope === 'current' ? current : queue).findIndex((entry) => entry.slug === next.entry.slug) + 1));
  };
  const close = () => { if (dialogLock.current) return; dialogOpening.current = false; setOperation(null); };
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!operation || dialogLock.current || controlsBusy) return;
    dialogLock.current = true; setSubmitting(true); setDialogError('');
    try {
      if (operation.type === 'create') {
        let slug = createdSlug;
        if (!slug) { const created = await onCreate(title.trim(), placement); slug = created.slug; setCreatedSlug(slug); }
        const fresh = await refresh(); if (!fresh) throw new Error('草稿已创建，但无法刷新排期；请重试加入候选选题。');
        const alreadyCurrent = fresh.thisWeek.entries.some((entry) => entry.slug === slug);
        const alreadyQueued = fresh.queue.findIndex((entry) => entry.slug === slug);
        // A response may be lost after the server saved the enqueue. Read before retrying.
        const result = alreadyCurrent || alreadyQueued >= 0 ? fresh : await act({ action: 'enqueue', slug, ...(placement === 'front' ? { position: 1 } : {}) }, fresh.revision);
        const savedIndex = result.queue.findIndex((entry) => entry.slug === slug);
        setQuery(''); setPage(savedIndex >= 0 ? Math.floor(savedIndex / PAGE_SIZE) + 1 : 1);
        notify(alreadyCurrent ? '素材已在本周安排中' : alreadyQueued >= 0 ? '素材已在候选选题中' : placement === 'front' ? '新选题已加入其它最前' : '新选题已加入其它末尾');
      } else if (operation.type === 'move') {
        const target = Number(position); if (!Number.isInteger(target) || target < operation.minimum || target > operation.maximum) throw new Error(`位置应为 ${operation.minimum} 至 ${operation.maximum}`);
        await act({ action: 'move', scope: operation.scope, slug: operation.entry.slug, position: target });
        if (operation.scope === 'queue') { setQuery(''); setPage(Math.ceil(target / PAGE_SIZE)); }
        notify('顺序已更新');
      } else if (operation.type === 'assign') { await onLibraryAction({ action: 'assign', articleKey: `${operation.entry.kind}/${operation.entry.slug}`, folderId: destination });
      } else if (operation.type === 'archive') { await onLibraryAction({ action: 'archive', articleKey: `${operation.entry.kind}/${operation.entry.slug}`, reason: archiveReason }); await refresh(true);
      } else if (operation.type === 'remove') { await act({ action: 'remove', slug: operation.entry.slug }); notify('已移出候选选题，文章仍保留'); }
      dialogOpening.current = false; setOperation(null);
    } catch (problem) { setDialogError((problem as Error).message); }
    finally { dialogLock.current = false; setSubmitting(false); }
  };
  const enqueueExisting = async (entry: ScheduleEntry) => {
    if (dialogLock.current || controlsBusy) return; dialogLock.current = true; setSubmitting(true); setDialogError('');
    try { const result = await act({ action: 'enqueue', slug: entry.slug, ...(placement === 'front' ? { position: 1 } : {}) }); setQuery(''); setPage(placement === 'front' ? 1 : Math.max(1, Math.ceil(result.queue.length / PAGE_SIZE))); notify('文章已加入候选选题'); dialogOpening.current = false; setOperation(null); }
    catch (problem) { setDialogError((problem as Error).message); } finally { dialogLock.current = false; setSubmitting(false); }
  };
  const menu = (entry: ScheduleEntry, scope: Scope) => {
    const key = `${scope}/${entry.slug}`; const list = scope === 'current' ? current : queue; const index = list.findIndex((item) => item.slug === entry.slug);
    const minimum = scope === 'current' ? current.filter((item) => item.done).length + 1 : 1;
    return <Menu.Root><Menu.Trigger asChild><IconButton ref={(node) => { if (node) menuButtons.current.set(key, node); else menuButtons.current.delete(key); }} type="button" className="schedule-icon-button" aria-label={`更多操作：${entry.title}`} disabled={controlsBusy || submitting}><MoreHorizontal aria-hidden="true" /></IconButton></Menu.Trigger><Menu.Portal><Menu.Content className="library-menu" sideOffset={4} align="end" collisionPadding={12} onCloseAutoFocus={(event) => { if (dialogOpening.current) event.preventDefault(); }}>
      {([{tab:'filming',label:'选题与拍摄',Icon:Clapperboard},{tab:'article',label:'写文章',Icon:BookOpenText},{tab:'video',label:'添加视频',Icon:Film},{tab:'assets',label:'添加资源',Icon:FolderOpen},{tab:'publish',label:'发布与记录',Icon:Send}] as const).map(({tab,label,Icon}) => <Menu.Item key={tab} className="library-menu-item" disabled={entry.missing} onSelect={() => onOpen(entry,tab)}><Icon size={16} aria-hidden="true" />{label}</Menu.Item>)}<Menu.Separator className="library-menu-separator" />
      <Menu.Item className="library-menu-item" disabled={entry.missing} onSelect={() => start({ type: 'assign', entry }, menuButtons.current.get(key))}><FolderInput size={16} aria-hidden="true" />移动到目录</Menu.Item><Menu.Item className="library-menu-item" disabled={entry.missing} onSelect={() => start({ type: 'archive', entry }, menuButtons.current.get(key))}><Archive size={16} aria-hidden="true" />归档选题</Menu.Item><Menu.Separator className="library-menu-separator" />
      {!(scope === 'current' && entry.done) && <><Menu.Item className="library-menu-item" disabled={index + 1 <= minimum} onSelect={() => void run({ action: 'move', slug: entry.slug, scope, position: minimum }, scope === 'current' ? '已移到待拍最前' : '已移到最前')}><MoveUp size={16} aria-hidden="true" />{scope === 'current' ? '移到待拍最前' : '移到最前'}</Menu.Item>
      <Menu.Item className="library-menu-item" disabled={index + 1 <= minimum} onSelect={() => void run({ action: 'move', slug: entry.slug, scope, position: index }, '顺序已更新')}><ArrowUp size={16} aria-hidden="true" />上移一条</Menu.Item>
      <Menu.Item className="library-menu-item" disabled={index === list.length - 1} onSelect={() => void run({ action: 'move', slug: entry.slug, scope, position: index + 2 }, '顺序已更新')}><ArrowDown size={16} aria-hidden="true" />下移一条</Menu.Item>
      <Menu.Item className="library-menu-item" onSelect={() => start({ type: 'move', entry, scope, minimum, maximum: list.length }, menuButtons.current.get(key))}><ListOrdered size={16} aria-hidden="true" />移到指定位置</Menu.Item>
      <Menu.Separator className="library-menu-separator" /></>}
      {scope === 'queue' ? <><Menu.Item className="library-menu-item" disabled={entry.missing} onSelect={() => void run({ action: 'transfer', slug: entry.slug, scope: 'current', position: current.length + 1 }, '已移入本周')}><ArrowUp size={16} aria-hidden="true" />移入本周</Menu.Item><Menu.Item className="library-menu-item" disabled={entry.missing} onSelect={() => void run({ action: 'transfer', slug: entry.slug, scope: 'current', position: current.filter((item) => item.done).length + 1 }, '已移入本周待拍最前')}><MoveUp size={16} aria-hidden="true" />移入本周待拍最前</Menu.Item><Menu.Item className="library-menu-item" onSelect={() => start({ type: 'remove', entry }, menuButtons.current.get(key))}><X size={16} aria-hidden="true" />移出拍摄排期</Menu.Item></> : <><Menu.Item className="library-menu-item" disabled={entry.missing} onSelect={() => void run({ action: 'complete', slug: entry.slug, done: !entry.done }, entry.done ? '已撤销已拍，回到待拍最前' : '已标记已拍，固定在顶部')}>{entry.done ? <Undo2 size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}{entry.done ? '撤销已拍' : '标记已拍'}</Menu.Item>{!entry.done && <Menu.Item className="library-menu-item" onSelect={() => void run({ action: 'transfer', slug: entry.slug, scope: 'queue', position: 1 }, '已移回其它最前')}><ArrowDown size={16} aria-hidden="true" />移回其它最前</Menu.Item>}</>}
    </Menu.Content></Menu.Portal></Menu.Root>;
  };
  const articleTitle = (entry: ScheduleEntry) => <button type="button" className="schedule-title" title={entry.title} onClick={() => onOpen(entry, 'filming')} disabled={Boolean(entry.missing)}>{entry.title}{entry.missing && <span className="schedule-missing">文章已不存在</span>}</button>;
  const row = (entry: ScheduleEntry, scope: Scope) => {
    const list = scope === 'current' ? current : queue; const index = list.findIndex((item) => item.slug === entry.slug);
    return <><span className="schedule-position">{index + 1}</span><div className="schedule-row-content">{articleTitle(entry)}</div>{entry.done && <span className="schedule-complete-label is-complete">已拍</span>}<div className="schedule-row-actions"><IconButton type="button" className="schedule-icon-button" aria-label={`选题与拍摄：${entry.title}`} title="选题与拍摄" disabled={entry.missing} onClick={() => onOpen(entry, 'filming')}><Clapperboard aria-hidden="true" /></IconButton>
      {scope === 'current' && <IconButton type="button" className={`schedule-icon-button schedule-done ${entry.done ? 'is-checked' : ''}`} aria-label={`${entry.done ? '撤销已拍' : '标记已拍'}：${entry.title}`} title={entry.done ? '撤销已拍' : '标记已拍'} aria-pressed={Boolean(entry.done)} disabled={controlsBusy || entry.missing} onClick={() => void run({ action: 'complete', slug: entry.slug, done: !entry.done }, entry.done ? '已撤销已拍，回到待拍最前' : '已标记已拍，固定在顶部')}><Check aria-hidden="true" /></IconButton>}
      <IconButton type="button" className="schedule-icon-button schedule-transfer" aria-label={`${scope === 'current' ? '移回其它' : '移入本周'}：${entry.title}`} title={entry.done ? '先撤销已拍，再移回其它' : scope === 'current' ? '移回其它最前' : '移入本周末尾'} disabled={controlsBusy || submitting || (scope === 'current' ? entry.done : entry.missing)} onClick={() => void run({ action: 'transfer', slug: entry.slug, scope: scope === 'current' ? 'queue' : 'current', position: scope === 'current' ? 1 : current.length + 1 }, scope === 'current' ? '已移回其它最前' : '已移入本周')}>{scope === 'current' ? <ArrowDown aria-hidden="true" /> : <ArrowUp aria-hidden="true" />}</IconButton>{menu(entry, scope)}</div></>;
  };
  const placementField = <label className="schedule-field"><span>加入位置</span><AuthorSelect value={placement} onValueChange={(value) => setPlacement(value as 'front' | 'end')} disabled={submitting} label="加入候选选题的位置" options={[{ value: 'front', label: '候选最前' }, { value: 'end', label: '候选末尾' }]} /></label>;
  const dialogTitle = operation?.type === 'assign' ? '移动到目录' : operation?.type === 'archive' ? '归档选题' : operation?.type === 'create' ? '新建选题' : operation?.type === 'existing' ? '添加已有内容' : operation?.type === 'move' ? '调整位置' : operation?.type === 'remove' ? '移出拍摄排期' : '排期规则';
  return <main className="schedule-board" aria-label="拍摄排期">
    <div className="schedule-heading"><h1>拍摄排期</h1><div className="schedule-heading-actions"><IconButton type="button" className="schedule-icon-button" aria-label="查看排期规则" title="排期规则" onClick={(event) => start({ type: 'help' }, event.currentTarget)}><CircleHelp aria-hidden="true" /></IconButton><IconButton type="button" className="schedule-icon-button" aria-label="刷新排期" title="刷新排期" disabled={busy || refreshingState || loading || Boolean(dragging)} onClick={() => void refresh()}><RefreshCw className={refreshingState ? 'spin' : undefined} aria-hidden="true" /></IconButton><button ref={newButton} type="button" className="save-button" disabled={!data || controlsBusy} onClick={(event) => start({ type: 'create' }, event.currentTarget)}><FilePlus2 size={18} aria-hidden="true" />新建选题</button></div></div>
    {error && <div className="message message-error" role="alert"><span>{error}</span><button type="button" onClick={() => void refresh()}>重试</button></div>}
    {loading && !data ? <div className="schedule-empty" role="status"><LoaderCircle className="spin" aria-hidden="true" />正在读取排期…</div> : !data ? <div className="schedule-empty"><p>暂时无法读取排期。</p><button type="button" className="secondary-button" onClick={() => void refresh()}>重新加载</button></div> : <>
      <DndContext sensors={sensors} collisionDetection={detectCollision} onDragStart={dragStart} onDragEnd={dragEnd} onDragCancel={() => { dragSnapshot.current = null; setDragging(null); folderDragging.current = false; directorySnapshot.current = null; setFolderDrag(''); }} accessibility={{ restoreFocus: false, screenReaderInstructions: { draggable: '按空格开始拖动，上下方向键调整位置或移到另一组，再按空格放下；Escape 取消。也可使用右侧按钮或更多操作中的移入本周、移回其它、上移、下移。' }, announcements: { onDragStart: ({ active }) => `开始拖动${String(active.data.current?.folder?.name ?? active.data.current?.entry?.title ?? '条目')}。`, onDragOver: ({ over }) => over?.data.current?.libraryKind === 'target' ? `移到${over.data.current.folderId ? folderPath(library?.folders ?? [], over.data.current.folderId) : '未分类或顶层目录'}${over.data.current.placement === 'before' ? '之前' : over.data.current.placement === 'after' ? '之后' : '内'}。` : over ? `移到${over.data.current?.scope === 'current' ? '本周' : '其它'}${over.data.current?.entry ? `，${over.data.current.entry.title}的位置` : '空区域'}。` : '当前不在放置区域。', onDragEnd: () => '拖动结束，正在确认安排。', onDragCancel: () => '已取消拖动。' } }}>
        <div className="schedule-layout"><aside className="schedule-directories" aria-label="共享内容目录"><button type="button" className="schedule-directory-toggle secondary-button" aria-expanded={directoriesOpen} onClick={() => setDirectoriesOpen((value) => !value)}><FolderOpen size={16} aria-hidden="true" />{['all', 'archived', 'unfiled'].includes(librarySelection) ? '共享目录' : folderPath(library?.folders ?? [], librarySelection)}<ChevronDown size={16} aria-hidden="true" /></button><div className={`schedule-directory-content ${directoriesOpen ? 'is-open' : ''}`}><ArticleLibrary library={library} items={articles} archivedItems={archivedItems} archiveLoading={archiveLoading} selection={librarySelection} onSelect={onLibrarySelect} busy={controlsBusy || submitting} onAction={onLibraryAction} onRefresh={onLibraryRefresh} onOpen={(item, tab) => onOpen(item, tab ?? 'filming')} foldersOnly externalDnd /></div></aside><div className="schedule-main">
        <section ref={currentSection} className="schedule-week schedule-current" aria-labelledby="schedule-current-title"><header className="schedule-section-heading"><div className="schedule-section-label"><h2 ref={currentHeading} tabIndex={-1} id="schedule-current-title">本周</h2><span className="schedule-date">{range(data.thisWeek)}</span><span className="schedule-count">{current.length} 条 · 已拍 {current.filter((entry) => entry.done).length} 条</span></div></header>
          <SortableList entries={current} scope="current" disabled={controlsBusy || submitting} empty="从下方拖入本周，想拍几条就安排几条。" render={(entry) => row(entry, 'current')} />
        </section>
        <section ref={queueSection} className="schedule-queue" aria-labelledby="schedule-queue-title"><header className="schedule-section-heading schedule-queue-toolbar"><div className="schedule-section-label"><h2 ref={queueHeading} tabIndex={-1} id="schedule-queue-title">{archivedView ? '已归档' : ['all', 'unfiled'].includes(librarySelection) ? librarySelection === 'unfiled' ? '未分类选题' : '候选选题' : folderPath(library?.folders ?? [], librarySelection)}</h2><span className="schedule-count">{archivedView ? archivedItems.length : filtered.length} 条</span><HelpTip label="候选选题与目录说明">目录筛选包含子目录，只影响候选列表；本周仍显示全部已安排选题。拖到目录只归类，不改变拍摄顺序。</HelpTip></div>
          <div className="schedule-search"><Search aria-hidden="true" /><input aria-label="搜索候选选题" placeholder="搜索标题或文章地址" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />{query && <IconButton type="button" className="schedule-icon-button" aria-label="清空搜索" onClick={() => setQuery('')}><X aria-hidden="true" /></IconButton>}</div><button type="button" className="secondary-button" disabled={controlsBusy || archivedView} onClick={(event) => start({ type: 'existing' }, event.currentTarget)}><CirclePlus size={17} aria-hidden="true" />添加已有内容</button></header>
          {archivedView ? archiveLoading ? <p className="schedule-empty" role="status">正在读取归档…</p> : <ul className="schedule-list">{archivedItems.filter((entry) => !search || `${entry.title} ${entry.slug}`.toLocaleLowerCase().includes(search)).map((entry) => <li className="schedule-row" key={entry.slug}><div className="schedule-row-content">{articleTitle(entry)}{entry.archiveReason && <span className="schedule-archive-reason">{entry.archiveReason}</span>}</div><button type="button" className="secondary-button" disabled={controlsBusy} onClick={() => void onLibraryAction({ action: 'restore', articleKey: `${entry.kind}/${entry.slug}` }).catch((problem) => setError((problem as Error).message))}><ArchiveRestore size={16} aria-hidden="true" />恢复</button></li>)}</ul> : <SortableList entries={visible} scope="queue" disabled={controlsBusy || submitting} empty={search ? '没有匹配的选题。拖到这里会放在候选选题末尾。' : '暂时没有候选选题，可以从本周拖回，或添加文章。'} render={(entry) => row(entry, 'queue')} />}
          {!archivedView && (filtered.length > PAGE_SIZE || Boolean(search)) && <nav className="schedule-pagination" aria-label="候选选题分页"><span>{filtered.length ? `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} / ${filtered.length} 条` : '0 条'}{search ? `（共 ${queue.length} 条）` : ''}</span><div><IconButton type="button" className="schedule-icon-button" aria-label="上一页" disabled={currentPage <= 1 || Boolean(dragging)} onClick={() => setPage(currentPage - 1)}><ChevronLeft aria-hidden="true" /></IconButton><span>第 {currentPage} / {pages} 页</span><IconButton type="button" className="schedule-icon-button" aria-label="下一页" disabled={currentPage >= pages || Boolean(dragging)} onClick={() => setPage(currentPage + 1)}><ChevronRight aria-hidden="true" /></IconButton></div></nav>}
        </section>
        <DragOverlay dropAnimation={null}>{folderDrag ? <div className="library-drag-preview">{folderDrag}</div> : dragging ? <div className="schedule-drag-preview"><GripVertical aria-hidden="true" /><span>{dragging.title}</span></div> : null}</DragOverlay>
      <details className="schedule-history"><summary><History size={18} aria-hidden="true" /><span>过去的周</span><span className="schedule-count">{data.history.length}</span><ChevronDown size={16} aria-hidden="true" /></summary>{data.history.length ? data.history.map((week) => <section key={week.start}><h3>{week.start} 至 {week.end}</h3><ul>{week.entries.map((entry) => <li key={entry.slug}>{articleTitle(entry)}<span className={entry.done ? 'is-complete' : ''}>{entry.done ? '已拍' : '未拍完'}</span></li>)}</ul></section>) : <p className="schedule-empty">跨周后会在这里保留实际安排和拍摄记录。</p>}</details></div></div>
      </DndContext>
    </>}
    <Dialog.Root open={operation !== null} onOpenChange={(open) => { if (!open) close(); }}><AuthorDialogContent onOpenAutoFocus={(event) => { if (operation && ['create', 'move', 'existing'].includes(operation.type)) { event.preventDefault(); dialogInput.current?.focus(); if (operation.type === 'move') dialogInput.current?.select(); } }} onEscapeKeyDown={(event) => { if (submitting) event.preventDefault(); }} onPointerDownOutside={(event) => { if (submitting) event.preventDefault(); }} onCloseAutoFocus={(event) => { event.preventDefault(); (returnFocus.current?.isConnected ? returnFocus.current : newButton.current)?.focus(); }} className="schedule-dialog" title={dialogTitle} description={operation?.type === 'assign' ? '目录归属会同步到内容库，本周拍摄顺序保持不变。' : operation?.type === 'archive' ? '归档后从活动内容和拍摄排期隐藏；可随时恢复，恢复不会自动加入旧排期。' : operation?.type === 'create' ? '填好标题即可加入候选选题，随时点开继续写。' : operation?.type === 'existing' ? '把尚未进入本周或候选选题的文章加入排期。' : operation?.type === 'move' ? `在${operation.scope === 'current' ? '本周' : '全部候选选题'}内移动，范围 ${operation.minimum} 至 ${operation.maximum}。` : operation?.type === 'remove' ? '只移出拍摄排期，文章及正文仍保留。' : '每周从周一开始，日期按北京时间计算。'}  closeLabel="关闭排期操作" closeDisabled={submitting}>
      {operation?.type === 'help' ? <><ul className="schedule-help"><li>上面是本周要拍的内容，下面是候选选题。本周条数由你决定，可以暂时不安排。</li><li>拖动左侧手柄可在两组之间移动，也可调整组内顺序；右侧按钮或更多操作中的移入本周、移回其它提供相同操作。</li><li>搜索或翻页后，拖动仍按选题在完整列表中的位置保存；更多操作可上移、下移或指定跨页位置。</li><li>已拍条目固定在本周顶部，待拍只能排在后面。撤销已拍后回到待拍最前，才能调整或移回其它。</li><li>跨周后，未拍完的条目按原顺序回到其它最前，本周留空，由你重新安排；拍摄历史保留。</li><li>“已拍”只记录拍摄进度，不会发布文章或视频。</li></ul><div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="save-button">知道了</button></Dialog.Close></div></> : operation?.type === 'existing' ? <>{placementField}<label className="schedule-field"><span>查找文章</span><input ref={dialogInput} autoFocus value={existingQuery} onChange={(event) => setExistingQuery(event.target.value)} placeholder="输入标题或文章地址" /></label><ul className="schedule-existing-list">{existing.map((entry) => <li key={entry.slug}><span>{entry.title}</span><button type="button" className="secondary-button" disabled={submitting || controlsBusy} onClick={() => void enqueueExisting(entry)}>加入</button></li>)}</ul>{!existing.length && <p className="schedule-empty">没有可添加的文章，可以先新建选题。</p>}{dialogError && <p className="field-error" role="alert">{dialogError}</p>}</> : <form onSubmit={(event) => void submit(event)}>
        {operation?.type === 'create' && <><label className="schedule-field"><span>选题标题</span><input ref={dialogInput} autoFocus value={title} onChange={(event) => setTitle(event.target.value)} minLength={2} maxLength={160} required disabled={submitting || Boolean(createdSlug)} placeholder="例如：临时发现的一个实用功能" /></label>{placementField}{createdSlug && <p className="schedule-created" role="status">草稿已创建。重试只会加入候选选题，不会再建一份。</p>}</>}
        {operation?.type === 'move' && <><p className="schedule-dialog-entry">{operationEntry?.title}</p><label className="schedule-field"><span>移动到第几条</span><input ref={dialogInput} autoFocus type="number" min={operation.minimum} max={operation.maximum} value={position} onChange={(event) => setPosition(event.target.value)} required disabled={submitting} /></label></>}
        {operation?.type === 'assign' && <div className="schedule-field"><span>目标目录</span><FolderPicker folders={library?.folders ?? []} value={destination} onChange={setDestination} label="目标目录" disabled={submitting} /></div>}
        {operation?.type === 'archive' && <label className="schedule-field"><span>归档原因（选填）</span><input value={archiveReason} maxLength={500} onChange={(event) => setArchiveReason(event.target.value)} disabled={submitting} /></label>}
        {operation?.type === 'remove' && <p className="schedule-dialog-entry">{operationEntry?.title}</p>}
        {dialogError && <p className="field-error" role="alert">{dialogError}</p>}<div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="secondary-button" disabled={submitting}>取消</button></Dialog.Close><button type="submit" className="save-button" disabled={submitting || controlsBusy}>{submitting && <LoaderCircle className="spin" size={16} aria-hidden="true" />}{submitting ? '正在保存…' : operation?.type === 'create' ? createdSlug ? '重试加入候选选题' : '创建并加入候选选题' : operation?.type === 'remove' ? '移出排期' : operation?.type === 'archive' ? '归档' : operation?.type === 'assign' ? '保存目录' : '保存位置'}</button></div>
      </form>}
    </AuthorDialogContent></Dialog.Root>
  </main>;
}
