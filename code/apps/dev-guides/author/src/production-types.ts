export type ProductionRequest = <T>(path: string, options?: RequestInit) => Promise<T>;
export type ProductionStageStatus = 'not_started' | 'in_progress' | 'in_review' | 'approved' | 'needs_review' | 'blocked';
export type ProductionCheckDefinition = { id: string; label: string; methods: string[] };
export type ProductionStage = { id: string; name: string; description: string; requiredChecks: ProductionCheckDefinition[]; status: ProductionStageStatus; currentRevisionId: string | null; canProceed: boolean; missingChecks: string[]; dependencyIssues: string[] };
export type ProductionRevision = { id: string; episodeId: string; stageId: string; revisionNumber: number; content: string; contentHash: string; inputRevisionIds: string[]; changeSummary: string; createdBy: string; createdAt: string; valid: boolean };
export type ProductionArtifact = { id: string; artifactId: string; episodeId: string; stageId: string; kind: string; variant: string; filename: string; revisionNumber: number; storageRef: Record<string, unknown>; contentHash: string; sizeBytes: number; inputRevisionIds: string[]; createdAt: string; valid: boolean; current?: boolean; requiredChecks?: ProductionCheckDefinition[] };
export type ProductionCheck = { id: string; targetRevisionId: string; checkId: string; method: string; result: 'passed' | 'failed' | 'not_applicable'; evidenceRef: string; limitations: string; checkedBy: string; checkedAt: string; valid: boolean };
export type ProductionDecision = { id: string; targetRevisionId: string; decision: 'approved' | 'changes_requested' | 'reported_decision'; note: string; actorId: string; createdAt: string; valid: boolean };
export type ProductionGrant = { id: string; allowedStageIds: string[]; allowedActions: string[]; stopConditions: string; sourceInstruction: string; createdAt: string; revokedAt: string | null };
export type AvailableProductionArtifact = { type: 'workspace_asset'; assetId: string; filename: string; category: string; kind: string; sizeBytes: number; contentHash: string; version: number; previewUrl?: string } | { type: 'article_revision'; kind: 'draft' | 'content'; revision: string; title: string; filename: string; sizeBytes: number; contentHash: string };
export type ProductionContext = {
  saved?: boolean;
  replayed?: boolean;
  episode: { id: string; contentId: string; slug: string; title: string; learningGoal: string; workflowVersion: string; rulesRef: string; currentStageId: string; status: 'active' | 'paused' | 'completed'; rowVersion: number; nextAction: string; blockers: { stageId: string; reason: string; createdAt: string }[]; createdAt: string; updatedAt: string } | null;
  stages: ProductionStage[];
  stageRevisions: ProductionRevision[];
  artifacts: ProductionArtifact[];
  checks: ProductionCheck[];
  decisions: ProductionDecision[];
  grants: ProductionGrant[];
  events: { id: string; type: string; targetId: string; createdAt: string }[];
  stateCard: { current: string; confirmed: string[]; changes: string[]; reviewables: string[]; gaps: string[]; pendingDecisions: string[]; nextAction: string };
  availableArtifacts?: AvailableProductionArtifact[];
};

export const productionStatus: Record<string, string> = { not_started: '未开始', in_progress: '制作中', in_review: '待审阅', approved: '已确认', needs_review: '需复核', blocked: '受阻', active: '进行中', paused: '已暂停', completed: '制作完成' };
export const productionMethods: Record<string, string> = { document_review: '审阅文稿', source_review: '核对来源', file_review: '检查文件', comparison: '对照版本', playback: '实际播放音画', mobile_preview: '手机尺寸预览', automated: '自动检查' };
export const productionKinds: Record<string, string> = { video: '成片', audio: '配音', subtitle: '字幕', image: '图片与封面', cover: '封面', project: '制作工程', article: '配套文章', recording: '原始录屏', other: '其它文件' };
