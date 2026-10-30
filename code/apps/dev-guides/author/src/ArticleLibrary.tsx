import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type Ref } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Menu from '@radix-ui/react-dropdown-menu';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronRight, FileText, Folder, FolderOpen, FolderPlus, Folders, Inbox, LoaderCircle, MoreHorizontal, MoveRight, Pencil, RefreshCw, Search, Trash2, X } from 'lucide-react';

export type LibraryFolder = { id: string; name: string; parentId: string | null };
export type LibraryState = { revision: string; folders: LibraryFolder[]; assignments: Record<string, string>; createdId?: string };
export type LibraryArticle = { kind: 'draft' | 'content'; slug: string; title: string; status: string };
export type LibraryAction = { action: 'create' | 'rename' | 'move' | 'delete' | 'assign'; id?: string; name?: string; parentId?: string | null; articleKey?: string; folderId?: string | null };
export type LibrarySelection = 'all' | 'unfiled' | string;
const keyOf = (article: LibraryArticle) => `${article.kind}/${article.slug}`;
const statusOf = (article: LibraryArticle) => article.kind === 'draft' ? '草稿' : article.status === 'published' ? '实测教程' : '功能线索';
export function folderPath(folders: LibraryFolder[], id: string | null | undefined): string {
  const names: string[] = []; const visited = new Set<string>(); let current = id;
  while (current && !visited.has(current)) { visited.add(current); const folder = folders.find((item) => item.id === current); if (!folder) break; names.unshift(folder.name); current = folder.parentId; }
  return names.join(' / ') || '未分类';
}
function descendants(folders: LibraryFolder[], id: string): Set<string> {
  const result = new Set([id]); let changed = true;
  while (changed) { changed = false; for (const folder of folders) if (folder.parentId && result.has(folder.parentId) && !result.has(folder.id)) { result.add(folder.id); changed = true; } }
  return result;
}

export function FolderPicker({ folders, value, onChange, disabled, label, rootLabel = '未分类', exclude = new Set<string>(), triggerRef }: { folders: LibraryFolder[]; value: string | null; onChange: (value: string | null) => void; disabled?: boolean; label: string; rootLabel?: string; exclude?: Set<string>; triggerRef?: Ref<HTMLButtonElement> }) {
  const options = folders.filter((folder) => !exclude.has(folder.id)).map((folder) => ({ ...folder, path: folderPath(folders, folder.id) })).sort((a, b) => a.path.localeCompare(b.path, 'zh-CN'));
  return <Select.Root value={value ?? '__root'} onValueChange={(next) => onChange(next === '__root' ? null : next)} disabled={disabled}>
    <Select.Trigger ref={triggerRef} className="folder-select" aria-label={label}><Folder size={16} aria-hidden="true" /><span className="folder-select-value"><Select.Value /></span><Select.Icon><ChevronDown size={16} aria-hidden="true" /></Select.Icon></Select.Trigger>
    <Select.Portal><Select.Content className="library-select-content" position="popper" sideOffset={5} collisionPadding={12}><Select.ScrollUpButton className="library-select-scroll"><ChevronDown className="rotate-up" size={16} aria-hidden="true" /></Select.ScrollUpButton><Select.Viewport><Select.Item className="library-select-item" value="__root"><Select.ItemText>{rootLabel}</Select.ItemText><Select.ItemIndicator><Check size={16} aria-hidden="true" /></Select.ItemIndicator></Select.Item>{options.map((folder) => <Select.Item className="library-select-item" key={folder.id} value={folder.id}><Select.ItemText>{folder.path}</Select.ItemText><Select.ItemIndicator><Check size={16} aria-hidden="true" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport><Select.ScrollDownButton className="library-select-scroll"><ChevronDown size={16} aria-hidden="true" /></Select.ScrollDownButton></Select.Content></Select.Portal>
  </Select.Root>;
}

type Operation = { type: 'create'; parentId: string | null } | { type: 'rename'; folder: LibraryFolder } | { type: 'move'; folder: LibraryFolder } | { type: 'delete'; folder: LibraryFolder } | { type: 'assign'; article: LibraryArticle };
type Props = { library: LibraryState | null; items: LibraryArticle[]; activeKey?: string; selection: LibrarySelection; busy: boolean; onSelect: (id: LibrarySelection) => void; onOpen: (article: LibraryArticle) => void; onAction: (action: LibraryAction) => Promise<LibraryState>; onRefresh: () => Promise<void> };
export default function ArticleLibrary({ library, items, activeKey, selection, busy, onSelect, onOpen, onAction, onRefresh }: Props) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(() => { try { const stored = JSON.parse(localStorage.getItem('author-expanded-folders') ?? '[]'); return new Set(Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : []); } catch { return new Set(); } });
  const [operation, setOperation] = useState<Operation | null>(null);
  const [name, setName] = useState(''); const [destination, setDestination] = useState<string | null>(null);
  const [formError, setFormError] = useState(''); const [submitting, setSubmitting] = useState(false); const [refreshing, setRefreshing] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const destinationTrigger = useRef<HTMLButtonElement>(null);
  const dialogOpening = useRef(false);
  const createFolderButton = useRef<HTMLButtonElement>(null);
  const folderMenuButtons = useRef(new Map<string, HTMLButtonElement>());
  const folders = library?.folders ?? []; const assignments = library?.assignments ?? {};
  const search = query.trim().toLocaleLowerCase();
  useEffect(() => { try { localStorage.setItem('author-expanded-folders', JSON.stringify([...expanded])); } catch { /* Storage is optional. */ } }, [expanded]);
  useEffect(() => { if (!activeKey || !library) return; let id = library.assignments[activeKey]; const parents = new Set<string>(); while (id && !parents.has(id)) { parents.add(id); id = library.folders.find((folder) => folder.id === id)?.parentId ?? ''; } if (parents.size) setExpanded((previous) => new Set([...previous, ...parents])); }, [activeKey, library]);
  const filtered = useMemo(() => {
    if (!search) return { folders: new Set(folders.map((folder) => folder.id)), articles: new Set(items.map(keyOf)) };
    const matchingFolders = new Set<string>(); const matchingArticles = new Set<string>();
    const addAncestors = (id: string | undefined) => { const seen = new Set<string>(); while (id && !seen.has(id)) { seen.add(id); matchingFolders.add(id); id = folders.find((folder) => folder.id === id)?.parentId ?? undefined; } };
    for (const folder of folders) if (folder.name.toLocaleLowerCase().includes(search)) { for (const id of descendants(folders, folder.id)) matchingFolders.add(id); addAncestors(folder.id); }
    for (const item of items) if (`${item.title} ${item.slug}`.toLocaleLowerCase().includes(search) || (assignments[keyOf(item)] && folderPath(folders, assignments[keyOf(item)]).toLocaleLowerCase().includes(search))) { matchingArticles.add(keyOf(item)); addAncestors(assignments[keyOf(item)]); }
    return { folders: matchingFolders, articles: matchingArticles };
  }, [search, folders, items, assignments]);
  const start = (next: Operation) => {
    dialogOpening.current = true;
    returnFocus.current = 'folder' in next ? folderMenuButtons.current.get(next.folder.id) ?? createFolderButton.current : next.type === 'create' && next.parentId ? folderMenuButtons.current.get(next.parentId) ?? createFolderButton.current : document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOperation(next); setFormError(''); setName(next.type === 'rename' ? next.folder.name : '');
    setDestination(next.type === 'create' ? next.parentId : next.type === 'move' ? next.folder.parentId : next.type === 'assign' ? assignments[keyOf(next.article)] ?? null : null);
  };
  const selectFolder = (id: string) => { onSelect(id); setExpanded((previous) => new Set([...previous, id])); };
  const toggle = (id: string) => setExpanded((previous) => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const targetFolder = operation && 'folder' in operation ? operation.folder : null;
  const nonEmpty = operation?.type === 'delete' && (folders.some((folder) => folder.parentId === operation.folder.id) || items.some((item) => assignments[keyOf(item)] === operation.folder.id));
  const excluded = operation?.type === 'move' ? descendants(folders, operation.folder.id) : new Set<string>();
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!operation || submitting || busy) return; setSubmitting(true); setFormError('');
    let action: LibraryAction;
    if (operation.type === 'create') action = { action: 'create', name: name.trim(), parentId: destination };
    else if (operation.type === 'rename') action = { action: 'rename', id: operation.folder.id, name: name.trim() };
    else if (operation.type === 'move') action = { action: 'move', id: operation.folder.id, parentId: destination };
    else if (operation.type === 'delete') action = { action: 'delete', id: operation.folder.id };
    else action = { action: 'assign', articleKey: keyOf(operation.article), folderId: destination };
    try { const next = await onAction(action); if (next.createdId) selectFolder(next.createdId); if (operation.type === 'delete' && selection === operation.folder.id) onSelect('all'); dialogOpening.current = false; setOperation(null); }
    catch (problem) { setFormError((problem as Error).message); }
    finally { setSubmitting(false); }
  };
  const menu = (folder: LibraryFolder) => <Menu.Root><Menu.Trigger asChild><button type="button" className="library-more" ref={(node) => { if (node) folderMenuButtons.current.set(folder.id, node); else folderMenuButtons.current.delete(folder.id); }} aria-label={`管理目录 ${folder.name}`} disabled={busy}><MoreHorizontal size={17} aria-hidden="true" /></button></Menu.Trigger><Menu.Portal><Menu.Content className="library-menu" onCloseAutoFocus={(event) => { if (dialogOpening.current) event.preventDefault(); }} sideOffset={4} align="start" collisionPadding={12}>
    <Menu.Label className="library-menu-label">{folder.name}</Menu.Label>
    <Menu.Item className="library-menu-item" onSelect={() => start({ type: 'create', parentId: folder.id })}><FolderPlus size={16} aria-hidden="true" />新建子目录</Menu.Item>
    <Menu.Item className="library-menu-item" onSelect={() => start({ type: 'rename', folder })}><Pencil size={16} aria-hidden="true" />重命名</Menu.Item>
    <Menu.Item className="library-menu-item" onSelect={() => start({ type: 'move', folder })}><MoveRight size={16} aria-hidden="true" />移动目录</Menu.Item>
    <Menu.Separator className="library-menu-separator" /><Menu.Item className="library-menu-item library-danger" onSelect={() => start({ type: 'delete', folder })}><Trash2 size={16} aria-hidden="true" />删除目录</Menu.Item>
  </Menu.Content></Menu.Portal></Menu.Root>;
  const articleRow = (item: LibraryArticle) => <li className="library-article-row" key={keyOf(item)}><button type="button" title={item.title} className={`library-article ${activeKey === keyOf(item) ? 'is-active' : ''}`} aria-current={activeKey === keyOf(item) ? 'page' : undefined} onClick={() => onOpen(item)}><FileText size={16} aria-hidden="true" /><span><span className="library-article-title">{item.title}</span><span className="library-article-status">{statusOf(item)}</span></span></button><button type="button" className="library-more" aria-label={`移动文章 ${item.title}`} onClick={() => start({ type: 'assign', article: item })} disabled={busy}><MoveRight size={16} aria-hidden="true" /></button></li>;
  const branch = (parentId: string | null, depth = 0): React.ReactNode => <ul className="library-branches">{folders.filter((folder) => folder.parentId === parentId && filtered.folders.has(folder.id)).map((folder) => {
    const opened = Boolean(search) || expanded.has(folder.id); const articles = items.filter((item) => assignments[keyOf(item)] === folder.id && filtered.articles.has(keyOf(item)));
    const count = items.filter((item) => descendants(folders, folder.id).has(assignments[keyOf(item)])).length;
    return <li key={folder.id} style={{ '--folder-depth': depth } as CSSProperties}><div className={`library-folder-row ${selection === folder.id ? 'is-selected' : ''}`}><button className="library-disclosure" type="button" aria-label={`${opened ? '收起' : '展开'}目录 ${folder.name}`} aria-expanded={opened} onClick={() => toggle(folder.id)} disabled={Boolean(search)}>{opened ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}</button><button type="button" className="library-folder" title={folderPath(folders, folder.id)} aria-pressed={selection === folder.id} onClick={() => selectFolder(folder.id)}>{opened ? <FolderOpen size={17} aria-hidden="true" /> : <Folder size={17} aria-hidden="true" />}<span>{folder.name}</span><span className="library-count">{count}</span></button>{menu(folder)}</div>{opened && <div className="library-children">{branch(folder.id, depth + 1)}{articles.length > 0 && <ul className="library-articles">{articles.map(articleRow)}</ul>}{!folders.some((child) => child.parentId === folder.id && filtered.folders.has(child.id)) && articles.length === 0 && <p className="library-empty">{search ? '没有匹配文章' : '空目录'}</p>}</div>}</li>;
  })}</ul>;
  const unfiled = items.filter((item) => !assignments[keyOf(item)] && filtered.articles.has(keyOf(item)));
  const heading = operation?.type === 'create' ? '新建目录' : operation?.type === 'rename' ? '重命名目录' : operation?.type === 'move' ? '移动目录' : operation?.type === 'delete' ? '删除目录' : '移动文章';
  return <div className="article-library">
    <div className="library-search"><Search size={17} aria-hidden="true" /><input aria-label="搜索目录或文章" placeholder="搜索目录、标题或文章地址" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="清空搜索" onClick={() => setQuery('')}><X size={16} aria-hidden="true" /></button>}</div>
    <div className="library-toolbar"><span>文章目录</span><button className="library-more" type="button" aria-label="刷新目录和文章" disabled={busy || refreshing} onClick={async () => { setRefreshing(true); try { await onRefresh(); } finally { setRefreshing(false); } }}><RefreshCw className={refreshing ? 'spin' : undefined} size={16} aria-hidden="true" /></button><button className="icon-text-button" ref={createFolderButton} type="button" disabled={!library || busy} onClick={() => start({ type: 'create', parentId: ['all', 'unfiled'].includes(selection) ? null : selection })}><FolderPlus size={16} aria-hidden="true" />新建目录</button></div>
    {!library ? <p className="library-empty" role="status">正在加载目录…</p> : <nav aria-label="文章目录"><button type="button" className={`library-root ${selection === 'all' ? 'is-selected' : ''}`} aria-pressed={selection === 'all'} onClick={() => onSelect('all')}><Folders size={18} aria-hidden="true" /><span>全部文章</span><span className="library-count">{items.length}</span></button>
      {(search || selection !== 'unfiled') && branch(null)}
      <button type="button" className={`library-root ${selection === 'unfiled' ? 'is-selected' : ''}`} aria-pressed={selection === 'unfiled'} onClick={() => onSelect(selection === 'unfiled' ? 'all' : 'unfiled')}><Inbox size={18} aria-hidden="true" /><span>未分类</span><span className="library-count">{items.filter((item) => !assignments[keyOf(item)]).length}</span></button><ul className="library-articles">{unfiled.map(articleRow)}</ul>
      {search && filtered.articles.size === 0 && filtered.folders.size === 0 && <p className="library-empty" role="status">没有找到匹配的目录或文章</p>}
      {!search && items.length === 0 && folders.length === 0 && <p className="library-empty">先写一篇教程，也可以先建目录。</p>}
    </nav>}
    <Dialog.Root open={operation !== null} onOpenChange={(open) => { if (!open && !submitting) { dialogOpening.current = false; setOperation(null); } }}><Dialog.Portal><Dialog.Overlay className="library-dialog-overlay" /><Dialog.Content className="library-dialog" onOpenAutoFocus={(event) => {
      if (operation?.type === 'create' || operation?.type === 'rename') {
        event.preventDefault(); nameInput.current?.focus();
        if (operation.type === 'rename') nameInput.current?.select();
      } else if (operation?.type === 'move' || operation?.type === 'assign') {
        event.preventDefault(); destinationTrigger.current?.focus();
      }
    }} onCloseAutoFocus={(event) => { event.preventDefault(); (returnFocus.current?.isConnected ? returnFocus.current : createFolderButton.current)?.focus(); }} onEscapeKeyDown={(event) => { if (submitting) event.preventDefault(); }} onPointerDownOutside={(event) => { if (submitting) event.preventDefault(); }}><Dialog.Title>{heading}</Dialog.Title><Dialog.Description className="library-dialog-description">{operation?.type === 'delete' ? nonEmpty ? '目录中还有子目录或文章，请先将它们移走。删除目录不会删除文章。' : `确认删除空目录“${targetFolder?.name}”？` : operation?.type === 'assign' ? `为“${operation.article.title}”选择目录，文章地址保持不变。` : operation?.type === 'move' ? `为“${targetFolder?.name}”选择上级目录，子目录和文章会一起移动。` : '按工具、主题或系列组织教程；名称最多 60 字，最多 6 层。'}</Dialog.Description><Dialog.Close asChild><button type="button" className="library-dialog-close" aria-label="关闭目录操作" disabled={submitting}><X size={19} aria-hidden="true" /></button></Dialog.Close><form onSubmit={(event) => void submit(event)}>
      {(operation?.type === 'create' || operation?.type === 'rename') && <label className="library-form-field">目录名称<input ref={nameInput} value={name} onChange={(event) => setName(event.target.value)} autoFocus maxLength={60} required disabled={submitting} placeholder="例如：工作流技巧" /></label>}
      {(operation?.type === 'create' || operation?.type === 'move' || operation?.type === 'assign') && <div className="library-form-field"><span>{operation.type === 'assign' ? '目标目录' : '上级目录'}</span><FolderPicker folders={folders} value={destination} onChange={setDestination} label={operation.type === 'assign' ? '目标目录' : '上级目录'} rootLabel={operation.type === 'assign' ? '未分类' : '顶层目录'} exclude={excluded} triggerRef={destinationTrigger} disabled={submitting} /></div>}
      {formError && <p className="field-error" role="alert">{formError}</p>}<div className="library-dialog-actions"><Dialog.Close asChild><button type="button" className="secondary-button" disabled={submitting}>取消</button></Dialog.Close><button type="submit" className={`save-button ${operation?.type === 'delete' ? 'library-delete-button' : ''}`} disabled={submitting || busy || Boolean(nonEmpty)}>{submitting && <LoaderCircle className="spin" size={16} aria-hidden="true" />}{submitting ? '正在保存…' : operation?.type === 'delete' ? '删除空目录' : '保存'}</button></div>
    </form></Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}
