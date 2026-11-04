import type { DragEndEvent, KeyboardCoordinateGetter } from '@dnd-kit/core';
import type { LibraryAction, LibraryState } from './ArticleLibrary';

export type LibraryDrop = { libraryKind: 'target'; folderId: string | null; placement: 'before' | 'inside' | 'after' };
export function libraryDropAction(event: Pick<DragEndEvent, 'active' | 'over'>, library: LibraryState): LibraryAction | null {
  const target = event.over?.data.current as LibraryDrop | undefined;
  if (target?.libraryKind !== 'target') return null;
  const source = event.active.data.current;
  if (source?.libraryKind !== 'folder') {
    const articleKey = source?.articleKey || (source?.entry && `${source.entry.kind}/${source.entry.slug}`);
    return articleKey ? { action: 'assign', articleKey, folderId: target.folderId } : null;
  }
  const id = source.folder.id as string;
  const destination = library.folders.find((folder) => folder.id === target.folderId);
  const parentId = target.placement === 'inside' ? target.folderId : destination?.parentId ?? null;
  let ancestor = parentId;
  const visited = new Set<string>();
  while (ancestor && !visited.has(ancestor)) {
    if (ancestor === id) return null;
    visited.add(ancestor); ancestor = library.folders.find((folder) => folder.id === ancestor)?.parentId ?? null;
  }
  if (target.folderId === id) return null;
  if (target.placement === 'inside') return { action: 'move', id, parentId };
  const siblings = library.folders.filter((folder) => folder.parentId === parentId && folder.id !== id);
  const index = siblings.findIndex((folder) => folder.id === target.folderId);
  return index < 0 ? null : { action: 'move', id, parentId, position: index + (target.placement === 'after' ? 2 : 1) };
}

/** Directory drag targets also have a keyboard path; menus offer exact moves. */
export const directoryKeyboardCoordinates: KeyboardCoordinateGetter = (event, { context, currentCoordinates }) => {
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) return;
  event.preventDefault();
  const candidates = context.droppableContainers.getEnabled().filter((container) => container.data.current?.libraryKind === 'target').map((container) => ({ container, rect: context.droppableRects.get(container.id) })).filter((item) => item.rect).sort((a, b) => a.rect!.top - b.rect!.top || a.rect!.left - b.rect!.left);
  if (!candidates.length) return;
  const current = candidates.findIndex(({ container }) => container.id === context.over?.id);
  const next = candidates[Math.max(0, Math.min(candidates.length - 1, current + (event.code === 'ArrowUp' || event.code === 'ArrowLeft' ? -1 : 1)))];
  if (!context.collisionRect || !next.rect) return;
  return { x: currentCoordinates.x + next.rect.left + next.rect.width / 2 - (context.collisionRect.left + context.collisionRect.width / 2), y: currentCoordinates.y + next.rect.top + next.rect.height / 2 - (context.collisionRect.top + context.collisionRect.height / 2) };
};
