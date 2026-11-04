import test from 'node:test';
import assert from 'node:assert/strict';
import { libraryDropAction } from '../src/library-dnd.ts';

const library = { revision: 'revision', folders: [{ id: 'a', name: 'A', parentId: null }, { id: 'b', name: 'B', parentId: null }, { id: 'c', name: 'C', parentId: null }, { id: 'sub', name: 'Sub', parentId: 'a' }], assignments: {} };
const folder = (id) => ({ libraryKind: 'folder', folder: library.folders.find((entry) => entry.id === id) });
const drop = (source, folderId, placement = 'inside') => libraryDropAction({ active: { data: { current: source } }, over: { data: { current: { libraryKind: 'target', folderId, placement } } } }, library);

test('directory positions refer to final sibling order, excluding the dragged folder', () => {
  assert.deepEqual(drop(folder('a'), 'c', 'after'), { action: 'move', id: 'a', parentId: null, position: 3 });
  assert.deepEqual(drop(folder('c'), 'a', 'before'), { action: 'move', id: 'c', parentId: null, position: 1 });
});
test('directory nesting and returning to root preserve the same directory identity', () => {
  assert.deepEqual(drop(folder('b'), 'a'), { action: 'move', id: 'b', parentId: 'a' });
  assert.deepEqual(drop(folder('sub'), null), { action: 'move', id: 'sub', parentId: null });
});
test('self and descendant drops cannot form directory cycles', () => {
  assert.equal(drop(folder('a'), 'sub'), null);
  assert.equal(drop(folder('a'), 'a'), null);
});
test('schedule and library article drags only change classification on directory targets', () => {
  assert.deepEqual(drop({ entry: { kind: 'draft', slug: 'topic' } }, 'b', 'after'), { action: 'assign', articleKey: 'draft/topic', folderId: 'b' });
  assert.deepEqual(drop({ libraryKind: 'article', articleKey: 'content/topic' }, null), { action: 'assign', articleKey: 'content/topic', folderId: null });
  assert.equal(libraryDropAction({ active: { data: { current: folder('a') } }, over: { data: { current: { scope: 'queue' } } } }, library), null);
});
