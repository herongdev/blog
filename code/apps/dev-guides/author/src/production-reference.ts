import type { ProductionDraft } from './production-drafts';

type Input = { slug: string; sourceSlug: string; stageId: string; reference: string; label: string; hasSavedRevision: boolean; draft?: ProductionDraft; blocked: boolean };
export type LegacyPreparation = { goal: string; outline: string; checklist: string; notes: string };

export function legacyPreparationDraft(value: unknown): LegacyPreparation | null {
  if (!value || typeof value !== 'object' || !('preparation' in value) || !value.preparation || typeof value.preparation !== 'object' || Array.isArray(value.preparation)) return null;
  const keys = ['goal', 'outline', 'checklist', 'notes'] as const;
  const input = value.preparation as Record<string, unknown>;
  if (!keys.every((key) => typeof input[key] === 'string' && input[key].length <= 20000 && !input[key].includes('\0'))) return null;
  return Object.fromEntries(keys.map((key) => [key, input[key]])) as LegacyPreparation;
}

// The caller must explicitly choose a visible original; existing work is never replaced.
export function draftFromProductionReference(input: Input): ProductionDraft | null {
  if (input.slug !== input.sourceSlug || !['S02', 'S04', 'S05', 'S06'].includes(input.stageId) || input.blocked || input.hasSavedRevision || !input.reference.trim()) return null;
  if (input.draft && (input.draft.content.length > 0 || input.draft.changeSummary.length > 0 || input.draft.baseRevisionId !== null)) return null;
  return { content: input.reference, baseRevisionId: null, changeSummary: `引用${input.label}作为参考草稿，待核对` };
}
