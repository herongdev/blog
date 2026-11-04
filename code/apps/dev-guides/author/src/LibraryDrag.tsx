import IconButton from './IconButton';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import type { LibraryArticle, LibraryFolder } from './ArticleLibrary';

function DropTarget({ folderId, placement, disabled }: { folderId: string | null; placement: 'before' | 'inside' | 'after'; disabled?: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: `directory-target:${folderId ?? 'root'}:${placement}`, disabled, data: { libraryKind: 'target', folderId, placement } });
  return <span ref={setNodeRef} className={`library-drop-target is-${placement} ${isOver ? 'is-over' : ''}`} aria-hidden="true" />;
}
export function FolderDragRow({ folder, selected, disabled, children }: { folder: LibraryFolder; selected: boolean; disabled: boolean; children: ReactNode }) {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, isDragging } = useDraggable({ id: `directory:${folder.id}`, disabled, data: { libraryKind: 'folder', folder } });
  return <div ref={setNodeRef} className={`library-folder-row ${selected ? 'is-selected' : ''} ${isDragging ? 'is-dragging' : ''}`}>
    <IconButton ref={setActivatorNodeRef} type="button" className="library-drag-handle" {...attributes} {...listeners} disabled={disabled} aria-label={`拖动目录 ${folder.name}`}><GripVertical size={14} aria-hidden="true" /></IconButton>
    {children}<DropTarget folderId={folder.id} placement="before" disabled={disabled} /><DropTarget folderId={folder.id} placement="inside" disabled={disabled} /><DropTarget folderId={folder.id} placement="after" disabled={disabled} />
  </div>;
}
export function ArticleDragRow({ item, disabled, children, style }: { item: LibraryArticle; disabled: boolean; children: ReactNode; style?: CSSProperties }) {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, isDragging } = useDraggable({ id: `directory-article:${item.kind}/${item.slug}`, disabled, data: { libraryKind: 'article', articleKey: `${item.kind}/${item.slug}`, title: item.title } });
  return <li ref={setNodeRef} className={`library-article-row ${isDragging ? 'is-dragging' : ''}`} style={style}><IconButton ref={setActivatorNodeRef} type="button" className="library-drag-handle" {...attributes} {...listeners} disabled={disabled} aria-label={`拖动归类 ${item.title}`}><GripVertical size={14} aria-hidden="true" /></IconButton>{children}</li>;
}
export function RootDropTarget({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return <div className="library-root-drop">{children}<DropTarget folderId={null} placement="inside" disabled={disabled} /></div>;
}
