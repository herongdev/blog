import test from 'node:test';
import assert from 'node:assert/strict';
import { draftFromProductionReference, legacyPreparationDraft } from '../src/production-reference.ts';

const reference = Object.freeze({ slug: 'same-topic', sourceSlug: 'same-topic', stageId: 'S02', reference: '  原拍摄目标\n保留完整原文。', label: '旧拍摄目标', hasSavedRevision: false, blocked: false });

test('legacy reference cannot replace a saved revision or any unsaved local input', () => {
  assert.equal(draftFromProductionReference({ ...reference, hasSavedRevision: true }), null);
  for (const draft of [
    { content: '本窗口的新稿', baseRevisionId: null, changeSummary: '' },
    { content: ' ', baseRevisionId: null, changeSummary: '' },
    { content: '', baseRevisionId: null, changeSummary: '尚未保存的修改说明' },
    { content: '', baseRevisionId: 'an-existing-base', changeSummary: '' },
  ]) {
    const before = structuredClone(draft);
    assert.equal(draftFromProductionReference({ ...reference, draft }), null);
    assert.deepEqual(draft, before);
  }
  assert.deepEqual(draftFromProductionReference(reference), { content: reference.reference, baseRevisionId: null, changeSummary: '引用旧拍摄目标作为参考草稿，待核对' });
});

test('reference stays within its content and validated window preparation remains read-only data', () => {
  assert.equal(draftFromProductionReference({ ...reference, sourceSlug: 'previous-topic' }), null);
  assert.equal(draftFromProductionReference({ ...reference, stageId: 'S08' }), null);
  assert.equal(draftFromProductionReference({ ...reference, blocked: true }), null);
  assert.equal(draftFromProductionReference({ ...reference, reference: '  ' }), null);
  const cached = { revision: 'old-preparation-revision', preparation: { goal: '本窗口未保存的目标', outline: '完整旧提纲', checklist: '准备账号', notes: '待验证' } };
  const before = structuredClone(cached);
  const parsed = legacyPreparationDraft(cached);
  assert.deepEqual(parsed, cached.preparation);
  assert.notEqual(parsed, cached.preparation);
  assert.deepEqual(cached, before);
  assert.equal(legacyPreparationDraft({ preparation: { ...cached.preparation, outline: 12 } }), null);
  assert.equal(legacyPreparationDraft({ preparation: { ...cached.preparation, notes: 'x'.repeat(20001) } }), null);
});
