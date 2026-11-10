export type ProductionDraft = { content: string; baseRevisionId: string | null; changeSummary: string };
export type ProductionDraftSubmission = { stageId: string; draft: ProductionDraft };
type Drafts = Record<string, ProductionDraft>;
type DraftContext = { stages: { id: string; currentRevisionId: string | null }[]; stageRevisions: { id: string; content: string }[] };

export function staleProductionDraftStages(drafts: Drafts, context: DraftContext): string[] {
  return Object.entries(drafts).filter(([stageId, draft]) => {
    const currentId = context.stages.find((stage) => stage.id === stageId)?.currentRevisionId || null;
    const content = context.stageRevisions.find((revision) => revision.id === currentId)?.content || '';
    return draft.baseRevisionId !== currentId && (draft.content !== content || Boolean(draft.changeSummary));
  }).map(([stageId]) => stageId);
}

// A saved receipt may clear only the exact local draft that produced that request.
export function reconcileProductionDrafts(drafts: Drafts, context: DraftContext, submission?: ProductionDraftSubmission, savedRevisionId?: string | null, allowRebase = false): Drafts {
  if (!submission || !drafts[submission.stageId]) return drafts;
  const pending = drafts[submission.stageId]; const original = submission.draft;
  if (pending.content === original.content && pending.changeSummary === original.changeSummary && pending.baseRevisionId === original.baseRevisionId) {
    const next = { ...drafts }; delete next[submission.stageId]; return next;
  }
  // Typing during a normal successful save continues from our own new revision.
  // Recovery after an uncertain write requires a fresh comparison instead.
  if (allowRebase && savedRevisionId && pending.baseRevisionId === original.baseRevisionId && context.stages.find((stage) => stage.id === submission.stageId)?.currentRevisionId === savedRevisionId) {
    return { ...drafts, [submission.stageId]: { ...pending, baseRevisionId: savedRevisionId } };
  }
  return drafts;
}
