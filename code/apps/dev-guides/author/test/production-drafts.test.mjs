import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcileProductionDrafts, staleProductionDraftStages } from '../src/production-drafts.ts';

const draft = (content, baseRevisionId, changeSummary = '') => ({ content, baseRevisionId, changeSummary });
const context = (...rows) => ({
  stages: rows.map(([id, currentRevisionId]) => ({ id, currentRevisionId })),
  stageRevisions: rows.filter(([, revision]) => revision).map(([, id, content]) => ({ id, content })),
});
const original = draft('submitted', 's1-old', '原修改说明');
const submission = { stageId: 'S01', draft: original };
const latest = context(['S01', 's1-saved', 'submitted'], ['S02', 's2-new', '另一窗口的新稿']);

test('a confirmed save clears exactly its original draft and retains other stage drafts for comparison', () => {
  const other = draft('本窗口尚未保存', 's2-old');
  const remaining = reconcileProductionDrafts({ S01: { ...original }, S02: other }, latest, submission, 's1-saved');
  assert.deepEqual(remaining, { S02: other });
  assert.deepEqual(staleProductionDraftStages(remaining, latest), ['S02']);
});

test('recovery preserves changes to content, change summary, or base made after the original request', () => {
  for (const pending of [draft('new input', 's1-old', original.changeSummary), draft(original.content, 's1-old', '超时后新写的说明'), draft(original.content, 'different-base', original.changeSummary)]) {
    const drafts = { S01: pending };
    assert.equal(reconcileProductionDrafts(drafts, latest, submission, 's1-saved'), drafts);
    assert.deepEqual(staleProductionDraftStages(drafts, latest), ['S01']);
  }
});

test('typing during an ordinary successful save continues from that save without a false conflict', () => {
  const pending = draft('continued typing', 's1-old', original.changeSummary);
  const next = reconcileProductionDrafts({ S01: pending }, latest, submission, 's1-saved', true);
  assert.deepEqual(next.S01, { ...pending, baseRevisionId: 's1-saved' });
  assert.deepEqual(staleProductionDraftStages(next, latest), []);
});

test('an original save receipt cannot rebase a modified local draft over a newer server revision', () => {
  const newer = context(['S01', 's1-external', '第三个版本']);
  const drafts = { S01: draft('local input', 's1-old') };
  assert.equal(reconcileProductionDrafts(drafts, newer, submission, 's1-saved', true), drafts);
  assert.deepEqual(staleProductionDraftStages(drafts, newer), ['S01']);
});

test('refresh continues to expose an old base even after latest server state has already been adopted', () => {
  const remaining = { S02: draft('local work', 's2-old') };
  assert.deepEqual(staleProductionDraftStages(remaining, latest), ['S02']);
  assert.deepEqual(staleProductionDraftStages(remaining, structuredClone(latest)), ['S02']);
  assert.deepEqual(staleProductionDraftStages({ S02: { ...remaining.S02, baseRevisionId: 's2-new' } }, latest), []);
});

test('unrelated server changes do not conflict with a draft whose own base is still current', () => {
  const current = context(['S01', 's1-old', 'old input'], ['S02', 's2-new', 'another update']);
  assert.deepEqual(staleProductionDraftStages({ S01: original }, current), []);
  assert.deepEqual(staleProductionDraftStages({ S02: draft('another update', 's2-old') }, current), []);
});
