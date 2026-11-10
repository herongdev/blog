import { DatabaseSync } from 'node:sqlite';
import { createHash, randomUUID } from 'node:crypto';
import { chmodSync, closeSync, constants, lstatSync, mkdirSync, openSync } from 'node:fs';
import { dirname, isAbsolute, join, parse, resolve } from 'node:path';
import { ARTIFACT_CHECKS, METHODS, PRODUCTION_STAGES, RULES_REF, WORKFLOW_VERSION } from './definitions.mjs';

const ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const HASH = /^[a-f0-9]{64}$/;
const MEDIA_CHECK_IDS = new Set(['media_playback', 'media_sync', 'mobile_readability', 'learning_loop']);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fail = (status, message, code) => Object.assign(new Error(message), { status, ...(code ? { code } : {}) });
const object = (value) => value && typeof value === 'object' && !Array.isArray(value);
const stable = (value) => JSON.stringify(value, (_, item) => object(item) ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
const digest = (value) => createHash('sha256').update(typeof value === 'string' ? value : stable(value)).digest('hex');
const clone = (value) => JSON.parse(JSON.stringify(value));
const text = (value, max, label, required = false) => {
  if (typeof value !== 'string' || value.length > max || value.includes('\0') || (required && !value.trim())) throw fail(422, `${label}不符合要求`);
  return value.trim();
};
const currentRules = () => ({ scope: 'workflow-definitions-and-checks', version: WORKFLOW_VERSION, documentRef: RULES_REF, stages: clone(PRODUCTION_STAGES), artifactChecks: clone(ARTIFACT_CHECKS), methods: [...METHODS] });
function rulesFor(episode) {
  if (!episode) return currentRules();
  const snapshot = episode.rulesSnapshot;
  if (!object(snapshot)) throw fail(409, '这份旧制作档案缺少规则快照，需要显式迁移后继续', 'RULES_MIGRATION_REQUIRED');
  if (snapshot.scope !== 'workflow-definitions-and-checks' || snapshot.version !== episode.workflowVersion || !Array.isArray(snapshot.stages) || !object(snapshot.artifactChecks) || !Array.isArray(snapshot.methods) || episode.rulesRef !== `sha256:${digest(snapshot)}`) throw fail(500, '制作规则快照校验失败，请恢复已核对的规则版本', 'RULES_SNAPSHOT_INVALID');
  return snapshot;
}
function definitionFor(rules, id) { const value = rules.stages.find((stage) => stage.id === id); if (!value) throw fail(422, '制作阶段不存在'); return value; }
function existing(path) { try { return lstatSync(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } }
function preparePath(path) {
  if (!isAbsolute(path)) throw fail(500, '制作档案需要绝对存储路径');
  const parent = dirname(path), root = parse(parent).root;
  let current = root;
  // Inspect every ancestor before SQLite can follow a symlink to a different project.
  for (const part of parent.slice(root.length).split('/').filter(Boolean)) {
    current = join(current, part);
    const info = existing(current);
    if (info && (!info.isDirectory() || info.isSymbolicLink())) throw fail(500, '制作档案目录不安全');
    if (!info) mkdirSync(current, { mode: 0o700 });
  }
  chmodSync(parent, 0o700);
  for (const candidate of [path, `${path}-wal`, `${path}-shm`]) {
    const info = existing(candidate);
    if (info && (!info.isFile() || info.isSymbolicLink() || info.nlink !== 1)) throw fail(500, '制作档案文件不安全');
    if (info) chmodSync(candidate, 0o600);
  }
  if (!existing(path)) closeSync(openSync(path, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | constants.O_NOFOLLOW, 0o600));
}
function validateStorageRef(ref, contentId, slug) {
  if (!object(ref) || !SLUG.test(ref.slug) || ref.slug !== slug) throw fail(422, '产物来源不属于当前内容');
  if (ref.type === 'workspace_asset' && ID.test(ref.assetId) && Object.keys(ref).every((key) => ['type', 'assetId', 'slug'].includes(key))) return clone(ref);
  if (ref.type === 'article_revision' && ['draft', 'content'].includes(ref.kind) && HASH.test(ref.revision) && Object.keys(ref).every((key) => ['type', 'kind', 'slug', 'revision'].includes(key))) return clone(ref);
  throw fail(422, '请选择已归档的素材或文章修订，不接受任意文件地址');
}
const operationFields = {
  start: ['slug', 'title', 'learningGoal'], save_stage_revision: ['stageId', 'content', 'inputRevisionIds', 'changeSummary'],
  register_artifact: ['artifactId', 'stageId', 'kind', 'variant', 'filename', 'storageRef', 'contentHash', 'sizeBytes', 'inputRevisionIds'],
  submit_for_review: ['stageRevisionId'], record_decision: ['targetRevisionId', 'decision', 'note', 'sourceInstruction', 'sourceRef'],
  record_check: ['targetRevisionId', 'checkId', 'method', 'result', 'evidenceRef', 'limitations'],
  set_execution_grant: ['allowedStageIds', 'allowedActions', 'stopConditions', 'sourceInstruction', 'revoke'],
  set_pause: ['paused', 'reason', 'nextAction'], set_blocker: ['stageId', 'reason', 'nextAction'], clear_blocker: ['stageId'], set_current_stage: ['stageId'], complete: [],
};

export function createProductionStore({ path, clock = () => new Date() }) {
  if (typeof path !== 'string' || !isAbsolute(path)) throw fail(500, '制作档案需要绝对存储路径');
  path = resolve(path); preparePath(path);
  const db = new DatabaseSync(path);
  const secureFiles = () => { for (const file of [path, `${path}-wal`, `${path}-shm`]) if (existing(file)) chmodSync(file, 0o600); };
  if (db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='production_schema'").get()) {
    const versions = db.prepare('SELECT version FROM production_schema').all();
    if (versions.length !== 1 || versions[0].version !== 1) { db.close(); throw fail(500, '制作档案版本不兼容'); }
  }
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS production_schema(version INTEGER PRIMARY KEY);
    INSERT OR IGNORE INTO production_schema VALUES(1);
    CREATE TABLE IF NOT EXISTS episodes(id TEXT PRIMARY KEY, content_id TEXT NOT NULL UNIQUE, owner_id TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS revisions(id TEXT PRIMARY KEY, episode_id TEXT NOT NULL REFERENCES episodes(id), kind TEXT NOT NULL, stage_id TEXT NOT NULL, artifact_id TEXT, payload TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS episode_revisions ON revisions(episode_id);
    CREATE TABLE IF NOT EXISTS records(id TEXT PRIMARY KEY, episode_id TEXT NOT NULL REFERENCES episodes(id), kind TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS episode_records ON records(episode_id,kind);
    CREATE TABLE IF NOT EXISTS invalidations(revision_id TEXT PRIMARY KEY REFERENCES revisions(id), episode_id TEXT NOT NULL REFERENCES episodes(id), payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS idempotency(actor_id TEXT NOT NULL, content_id TEXT NOT NULL, operation TEXT NOT NULL, request_key TEXT NOT NULL, request_hash TEXT NOT NULL, response TEXT NOT NULL, PRIMARY KEY(actor_id,content_id,operation,request_key));`);
  if (db.prepare('SELECT MAX(version) AS version FROM production_schema').get().version !== 1) { db.close(); throw fail(500, '制作档案版本不兼容'); }
  secureFiles();
  const timestamp = () => new Date(clock()).toISOString();
  const unpack = (row) => row ? JSON.parse(row.payload) : null;
  const get = (contentId) => unpack(db.prepare('SELECT payload FROM episodes WHERE content_id=?').get(contentId));
  const rows = (table, contentId) => db.prepare(`SELECT payload FROM ${table} WHERE episode_id=? ORDER BY rowid`).all(contentId).map(unpack);
  const record = (episodeId, kind, value) => { const result = { id: randomUUID(), episodeId, ...value }; db.prepare('INSERT INTO records VALUES(?,?,?,?)').run(result.id, episodeId, kind, JSON.stringify(result)); return result; };
  const revision = (id, episodeId) => { const value = unpack(db.prepare('SELECT payload FROM revisions WHERE id=? AND episode_id=?').get(id, episodeId)); if (!value) throw fail(422, '引用的修订不属于当前制作档案'); return value; };
  function context(contentId, { displayTitle } = {}) {
    const storedEpisode = get(contentId);
    const currentTitle = displayTitle === undefined ? storedEpisode?.title : text(displayTitle, 200, '当前内容标题', true);
    const episode = storedEpisode ? { ...storedEpisode, title: currentTitle } : null;
    const rules = rulesFor(episode);
    const all = episode ? rows('revisions', episode.id) : [];
    const invalid = new Map((episode ? rows('invalidations', episode.id) : []).map((item) => [item.revisionId, item.reason]));
    const latestStage = new Map(), latestArtifact = new Map();
    for (const value of all) (value.type === 'stage' ? latestStage : latestArtifact).set(value.type === 'stage' ? value.stageId : value.artifactId, value.id);
    const titleSnapshot = all.find((item) => item.id === latestStage.get('S01'))?.titleSnapshot ?? storedEpisode?.title ?? null;
    const titleMismatch = Boolean(storedEpisode && displayTitle !== undefined && currentTitle !== titleSnapshot);
    if (titleMismatch && episode.status === 'completed') episode.status = 'active';
    // Reads remain read-only. A changed library title conservatively suspends old
    // checks until a new S01 revision binds the actual title and persists invalidation.
    if (titleMismatch) for (const id of [...latestStage.values(), ...latestArtifact.values()]) invalid.set(id, '内容标题已变化，请核对本期承诺及相关稿件和产物');
    const enriched = all.map((item) => ({ ...item, valid: !invalid.has(item.id), current: (item.type === 'stage' ? latestStage.get(item.stageId) : latestArtifact.get(item.artifactId)) === item.id, invalidReason: invalid.get(item.id) ?? null, ...(item.type === 'artifact' ? { requiredChecks: clone(rules.artifactChecks[item.kind]) } : {}) }));
    const byId = new Map(enriched.map((item) => [item.id, item]));
    const currentValid = (id) => Boolean(byId.get(id)?.current && byId.get(id)?.valid);
    const rawRecords = episode ? db.prepare('SELECT kind,payload FROM records WHERE episode_id=? ORDER BY rowid').all(episode.id) : [];
    const ofKind = (kind) => rawRecords.filter((row) => row.kind === kind).map(unpack);
    const checks = ofKind('check').map((item) => {
      const target = byId.get(item.targetRevisionId);
      // Historical cross-video evidence cannot count toward an individual deliverable's readiness.
      const ownVideo = target?.type !== 'artifact' || target.kind !== 'video' || !MEDIA_CHECK_IDS.has(item.checkId) || item.evidenceRef === target.id;
      return { ...item, valid: currentValid(item.targetRevisionId) && currentValid(item.evidenceRef) && ownVideo };
    });
    const decisions = ofKind('decision').map((item) => ({ ...item, valid: currentValid(item.targetRevisionId) }));
    const revoked = new Set(ofKind('grant_revoked').map((item) => item.grantId));
    const grants = ofKind('grant').map((item) => ({ ...item, revokedAt: revoked.has(item.id) ? ofKind('grant_revoked').find((event) => event.grantId === item.id).createdAt : null }));
    const events = ofKind('event').slice(-200);
    const stageRevisions = enriched.filter((item) => item.type === 'stage'), artifacts = enriched.filter((item) => item.type === 'artifact');
    function artifactCoverage(target, definition) {
      const latest = checks.filter((item) => item.valid && item.checkId === definition.id && (item.targetRevisionId === target.id || (item.evidenceRef === target.id && byId.get(item.targetRevisionId)?.type === 'stage' && byId.get(item.targetRevisionId)?.stageId === target.stageId))).at(-1);
      return Boolean(latest?.valid && (latest.result === 'passed' || (latest.result === 'not_applicable' && latest.limitations.trim())));
    }
    function checkCoverage(target, definition) {
      const latest = checks.filter((item) => item.targetRevisionId === target.id && item.checkId === definition.id).at(-1);
      if (latest?.valid && (latest.result === 'passed' || (latest.result === 'not_applicable' && latest.limitations.trim()))) return null;
      const deliverables = artifacts.filter((item) => item.current && item.valid && (target.stageId === 'S08' ? item.kind === 'video' : target.stageId === 'S09' ? item.kind === 'article' : false));
      return deliverables.length && deliverables.every((item) => artifactCoverage(item, definition)) ? null : definition.label;
    }
    const stages = rules.stages.map((definition) => {
      const current = byId.get(latestStage.get(definition.id));
      const decision = current ? decisions.filter((item) => item.targetRevisionId === current.id && item.decision !== 'reported_decision').at(-1) : null;
      const missingChecks = current ? definition.requiredChecks.map((item) => checkCoverage(current, item)).filter(Boolean) : definition.requiredChecks.map((item) => item.label);
      const dependencyIssues = current ? [...new Set([...(current.valid ? [] : [current.invalidReason || '输入版本已变化']), ...current.inputRevisionIds.filter((id) => !currentValid(id)).map(() => '依赖的稿件或产物已有新版本')])] : [];
      // A checklist cannot approve a video that has never been archived or checked.
      if (definition.id === 'S08' && current && !artifacts.some((item) => item.kind === 'video' && item.current && item.valid)) missingChecks.push('请先归档本次实际导出的成片');
      if (definition.id === 'S09' && current && !artifacts.some((item) => item.kind === 'article' && item.current && item.valid)) missingChecks.push('请先关联本次配套文章修订');
      if (current && ['S08', 'S09'].includes(definition.id)) for (const artifact of artifacts.filter((item) => item.current && item.stageId === definition.id && ['video', 'audio', 'subtitle', 'cover', 'article'].includes(item.kind))) {
        if (!artifact.valid) missingChecks.push(`${artifact.filename}（${artifact.variant}）依赖已变化，请重新制作或关联当前版本`);
        else for (const check of rules.artifactChecks[artifact.kind]) if (!artifactCoverage(artifact, check)) missingChecks.push(`${artifact.filename}（${artifact.variant}）：${check.label}`);
      }
      let status = !current ? 'not_started' : dependencyIssues.length ? 'needs_review' : decision?.decision === 'changes_requested' ? 'in_progress' : decision?.decision === 'approved' && decision.valid && !missingChecks.length ? 'approved' : events.some((item) => item.type === 'submit_for_review' && item.targetId === current.id) ? 'in_review' : 'in_progress';
      const hasGrant = grants.some((grant) => !grant.revokedAt && grant.allowedStageIds.includes(definition.id) && grant.allowedActions.includes('draft'));
      const stageArtifacts = artifacts.filter((item) => item.current && item.stageId === definition.id);
      const relevantIds = new Set([current?.id, ...stageArtifacts.map((item) => item.id)]);
      const hasFailure = checks.some((item) => item.valid && relevantIds.has(item.targetRevisionId) && item.result === 'failed' && checks.filter((other) => other.valid && other.targetRevisionId === item.targetRevisionId && other.checkId === item.checkId && other.evidenceRef === item.evidenceRef).at(-1)?.id === item.id);
      const mediaReady = definition.id !== 'S08' || (stageArtifacts.some((item) => item.kind === 'video' && item.valid) && !missingChecks.length);
      const canProceed = Boolean(!titleMismatch && episode?.status === 'active' && current && !dependencyIssues.length && (status === 'approved' || hasGrant) && !hasFailure && !stageArtifacts.some((item) => !item.valid) && mediaReady);
      if (episode?.blockers?.some((blocker) => blocker.stageId === definition.id)) status = 'blocked';
      return { ...clone(definition), status, currentRevisionId: current?.id ?? null, canProceed: status === 'blocked' ? false : canProceed, missingChecks, dependencyIssues };
    });
    const active = stages.find((stage) => stage.id === episode?.currentStageId) ?? stages[0];
    const stateCard = {
      current: `${active.id} ${active.name} · ${active.status}`,
      confirmed: stages.filter((stage) => stage.status === 'approved').map((stage) => `${stage.name} r${byId.get(stage.currentRevisionId).revisionNumber}`),
      changes: events.slice(-3).map((event) => event.summary || event.type),
      reviewables: stages.filter((stage) => stage.status === 'in_review').map((stage) => `${stage.name} r${byId.get(stage.currentRevisionId).revisionNumber}`),
      gaps: [...(titleMismatch ? ['当前内容标题已变化，请先核对并保存标题与封面方向的新修订'] : []), ...(episode?.blockers ?? []).map((blocker) => blocker.reason), ...active.dependencyIssues, ...active.missingChecks],
      pendingDecisions: stages.filter((stage) => stage.status === 'in_review').map((stage) => `审阅${stage.name}的当前修订`),
      nextAction: episode?.nextAction || `填写${active.name}草稿`,
    };
    return { episode, titleMismatch, titleSnapshot, currentTitle: currentTitle ?? null, stages, stageRevisions, artifacts, checks, decisions, grants, events, stateCard };
  }
  function validateEnvelope(contentId, input, actor) {
    if (!ID.test(contentId) || !object(input) || !object(actor) || typeof actor.id !== 'string' || !actor.id || actor.id.length > 160 || !['user', 'agent'].includes(actor.kind) || !['web', 'mcp'].includes(actor.source)) throw fail(422, '制作档案请求无效');
    if (!operationFields[input.operation]) throw fail(422, '制作操作不存在');
    const key = text(input.idempotencyKey, 160, '重试标识', true);
    if (key.length < 8 || !Number.isSafeInteger(input.expectedVersion) || input.expectedVersion < 0) throw fail(422, '制作版本或重试标识无效');
    return { key, requestHash: digest({ input, actor: { id: actor.id, kind: actor.kind, source: actor.source } }) };
  }
  function replay(contentId, input, actor) {
    const { key, requestHash } = validateEnvelope(contentId, input, actor);
    const prior = db.prepare('SELECT request_hash,response FROM idempotency WHERE actor_id=? AND content_id=? AND operation=? AND request_key=?').get(actor.id, contentId, input.operation, key);
    if (!prior) return null;
    if (prior.request_hash !== requestHash) throw fail(409, '同一重试标识不能用于不同内容', 'IDEMPOTENCY_CONFLICT');
    return { ...JSON.parse(prior.response), replayed: true };
  }
  function apply(contentId, input, actor, { request = input, displayTitle } = {}) {
    validateEnvelope(contentId, input, actor);
    const fields = operationFields[input.operation];
    if (Object.keys(input).some((key) => !['operation', 'expectedVersion', 'idempotencyKey', ...fields].includes(key))) throw fail(422, '制作操作包含未知字段');
    if (request.operation !== input.operation || request.idempotencyKey !== input.idempotencyKey || request.expectedVersion !== input.expectedVersion) throw fail(422, '制作请求归一化不一致');
    const { key, requestHash } = validateEnvelope(contentId, request, actor);
    db.exec('BEGIN IMMEDIATE');
    try {
      // Resolve a committed retry before rejecting its now-stale expectedVersion.
      const prior = db.prepare('SELECT request_hash,response FROM idempotency WHERE actor_id=? AND content_id=? AND operation=? AND request_key=?').get(actor.id, contentId, input.operation, key);
      if (prior) {
        if (prior.request_hash !== requestHash) throw fail(409, '同一重试标识不能用于不同内容', 'IDEMPOTENCY_CONFLICT');
        const response = JSON.parse(prior.response); db.exec('COMMIT'); return { ...response, replayed: true };
      }
      let episode = get(contentId);
      if (episode && episode.ownerId !== actor.id) throw fail(403, '无权修改这份制作档案');
      if (input.expectedVersion !== (episode?.rowVersion ?? 0)) throw fail(409, '制作档案已在其他会话更新，请保留当前稿件并重新读取', 'VERSION_CONFLICT');
      if (input.operation !== 'start' && !episode) throw fail(404, '请先建立本期制作档案');
      let snapshot = context(contentId, { displayTitle }), targetId = null, summary = input.operation;
      if (snapshot.titleMismatch && ((input.operation === 'record_check' && input.result === 'passed') || (input.operation === 'record_decision' && input.decision === 'approved') || input.operation === 'complete')) throw fail(409, '当前内容标题已变化，请先保存标题与封面方向的新修订，再复核受影响部分', 'TITLE_REVIEW_REQUIRED');
      if (episode?.status === 'completed' && !['save_stage_revision', 'register_artifact', 'set_pause', 'record_check', 'record_decision'].includes(input.operation)) throw fail(409, '本期已完成，请创建新修订后继续');
      const rules = rulesFor(episode), stageDefinition = (id) => definitionFor(rules, id);
      const trustedUser = actor.kind === 'user' && actor.source === 'web';
      const requireUser = () => { if (!trustedUser) throw fail(403, '此操作需要已登录作者直接确认'); };
      const addRevision = (value) => { db.prepare('INSERT INTO revisions VALUES(?,?,?,?,?,?)').run(value.id, contentId, value.type, value.stageId, value.artifactId ?? null, JSON.stringify(value)); targetId = value.id; return value; };
      function inputs(value, defaults = []) {
        const ids = value ?? defaults;
        if (!Array.isArray(ids) || ids.length > 100 || ids.some((id) => typeof id !== 'string' || !ID.test(id)) || new Set(ids).size !== ids.length) throw fail(422, '依赖版本列表无效');
        for (const id of ids) {
          revision(id, contentId); const entry = [...snapshot.stageRevisions, ...snapshot.artifacts].find((item) => item.id === id);
          const titleReviewDraft = input.operation === 'save_stage_revision' && snapshot.titleMismatch && entry?.current && !db.prepare('SELECT revision_id FROM invalidations WHERE revision_id=?').get(id);
          if (!entry?.current || (!entry.valid && !titleReviewDraft)) throw fail(409, '依赖版本已变化，请重新选择当前版本');
        }
        return [...ids];
      }
      function invalidateFrom(ids, reason) {
        const affected = new Set(ids), all = rows('revisions', contentId);
        let changed = true;
        while (changed) { changed = false; for (const item of all) if (!affected.has(item.id) && item.inputRevisionIds.some((id) => affected.has(id))) { affected.add(item.id); changed = true; } }
        for (const id of affected) db.prepare('INSERT OR IGNORE INTO invalidations VALUES(?,?,?)').run(id, contentId, JSON.stringify({ revisionId: id, reason, createdAt: timestamp() }));
        return [...affected];
      }
      switch (input.operation) {
        case 'start': {
          if (episode) throw fail(409, '本期制作档案已存在');
          if (!SLUG.test(input.slug)) throw fail(422, '内容地址无效');
          const rulesSnapshot = clone(rules);
          episode = { id: contentId, contentId, ownerId: actor.id, slug: input.slug, title: text(input.title, 200, '标题', true), learningGoal: text(input.learningGoal ?? '', 2000, '学习目标'), workflowVersion: rulesSnapshot.version, rulesRef: `sha256:${digest(rulesSnapshot)}`, rulesSnapshot, currentStageId: 'S01', status: 'active', rowVersion: 0, nextAction: '填写标题与封面方向草稿', blockers: [], createdAt: timestamp(), updatedAt: timestamp() };
          db.prepare('INSERT INTO episodes VALUES(?,?,?,?)').run(contentId, contentId, actor.id, JSON.stringify(episode)); summary = '建立本期制作档案'; break;
        }
        case 'save_stage_revision': {
          const definition = stageDefinition(input.stageId), content = text(input.content, 150_000, '阶段稿件', true);
          const current = snapshot.stageRevisions.filter((item) => item.stageId === definition.id).at(-1);
          const defaults = snapshot.stageRevisions.filter((item) => item.current && item.valid && item.stageId < definition.id).map((item) => item.id);
          if (definition.id === 'S08') defaults.push(...snapshot.artifacts.filter((item) => item.current && item.valid && ['video', 'audio', 'subtitle', 'cover'].includes(item.kind)).map((item) => item.id));
          if (definition.id === 'S09') defaults.push(...snapshot.artifacts.filter((item) => item.current && item.valid && item.kind === 'article').map((item) => item.id));
          const deps = inputs(input.inputRevisionIds, defaults);
          if (deps.some((id) => revision(id, contentId).type === 'stage' && revision(id, contentId).stageId >= definition.id)) throw fail(422, '阶段不能依赖自身或后续阶段');
          const created = addRevision({ id: randomUUID(), episodeId: contentId, type: 'stage', stageId: definition.id, revisionNumber: (current?.revisionNumber ?? 0) + 1, content, contentHash: digest(content), inputRevisionIds: deps, changeSummary: text(input.changeSummary ?? '', 2000, '修改说明'), ...(definition.id === 'S01' ? { titleSnapshot: displayTitle === undefined ? episode.title : text(displayTitle, 200, '当前内容标题', true) } : {}), createdBy: actor.id, createdAt: timestamp() });
          if (definition.id === 'S02') episode.learningGoal = content.slice(0, 2000);
          if (current || (definition.id === 'S01' && snapshot.titleMismatch)) {
            const seeds = current ? [current.id] : [];
            if (definition.id === 'S01' && snapshot.titleMismatch) seeds.push(...snapshot.stageRevisions.filter((item) => item.current && item.stageId !== 'S01').map((item) => item.id), ...snapshot.artifacts.filter((item) => item.current).map((item) => item.id));
            if (definition.id === 'S06') seeds.push(...snapshot.artifacts.filter((item) => item.current && ['audio', 'subtitle', 'video'].includes(item.kind)).map((item) => item.id));
            invalidateFrom(seeds, `${definition.name}已有新修订，需核对相关产物`);
          }
          if (definition.id === 'S01') episode.title = created.titleSnapshot;
          episode.currentStageId = definition.id; if (episode.status === 'completed') episode.status = 'active'; episode.nextAction = `检查${definition.name} r${created.revisionNumber}，或在已有授权内继续制作`;
          summary = `${definition.name}保存为 r${created.revisionNumber}`; break;
        }
        case 'register_artifact': {
          const kind = input.kind;
          if (!Object.hasOwn(rules.artifactChecks, kind) || !HASH.test(input.contentHash) || !Number.isSafeInteger(input.sizeBytes) || input.sizeBytes <= 0 || input.sizeBytes > 100 * 1024 ** 3) throw fail(422, '产物类型、摘要或大小无效');
          const storageRef = validateStorageRef(input.storageRef, contentId, episode.slug);
          const artifactId = input.artifactId ?? randomUUID();
          if (!ID.test(artifactId)) throw fail(422, '产物身份无效');
          const priorArtifact = db.prepare('SELECT episode_id FROM revisions WHERE artifact_id=? LIMIT 1').get(artifactId);
          if (priorArtifact && priorArtifact.episode_id !== contentId) throw fail(422, '产物不属于当前内容');
          const current = snapshot.artifacts.filter((item) => item.artifactId === artifactId).at(-1);
          if (current && (current.kind !== kind || current.variant !== (input.variant ?? 'default'))) throw fail(422, '同一产物不能改变类型或平台版本');
          const deliveryStage = kind === 'article' ? 'S09' : ['video', 'audio', 'subtitle', 'cover'].includes(kind) ? 'S08' : null;
          const stageId = input.stageId ?? deliveryStage ?? 'S08'; stageDefinition(stageId);
          // A model must not move a delivery to an unrelated stage to evade variant-specific checks.
          if (deliveryStage && stageId !== deliveryStage) throw fail(422, '成片、音频、字幕和封面归入试看验收，配套文章归入文章阶段');
          const deps = inputs(input.inputRevisionIds, snapshot.stageRevisions.filter((item) => item.current && item.valid && item.stageId < stageId).map((item) => item.id));
          if (deps.some((id) => snapshot.artifacts.find((item) => item.id === id)?.artifactId === artifactId)) throw fail(422, '新产物不能依赖自己旧版本');
          addRevision({ id: randomUUID(), artifactId, episodeId: contentId, type: 'artifact', stageId, kind, variant: text(input.variant ?? 'default', 100, '发布版本', true), filename: text(input.filename ?? kind, 240, '文件名', true), revisionNumber: (current?.revisionNumber ?? 0) + 1, storageRef, contentHash: input.contentHash, sizeBytes: input.sizeBytes, inputRevisionIds: deps, createdBy: actor.id, createdAt: timestamp() });
          if (current) invalidateFrom([current.id], '产物已有新版本，旧版本的检查不能证明新文件通过');
          if (episode.status === 'completed') episode.status = 'active'; summary = `关联${input.filename || kind}的新产物版本`; break;
        }
        case 'submit_for_review': {
          const target = snapshot.stageRevisions.find((item) => item.id === input.stageRevisionId);
          if (!target?.current || !target.valid) throw fail(409, '请先保存当前有效修订再提交审阅');
          targetId = target.id; episode.currentStageId = target.stageId; episode.nextAction = `审阅${stageDefinition(target.stageId).name} r${target.revisionNumber}`; summary = '提交当前具体修订审阅'; break;
        }
        case 'record_check': {
          const target = [...snapshot.stageRevisions, ...snapshot.artifacts].find((item) => item.id === input.targetRevisionId);
          if (!target?.current || !target.valid) throw fail(409, '请检查当前有效修订');
          const definition = (target.type === 'stage' ? stageDefinition(target.stageId).requiredChecks : rules.artifactChecks[target.kind]).find((item) => item.id === input.checkId);
          if (!definition || !rules.methods.includes(input.method) || !definition.methods.includes(input.method) || !['passed', 'failed', 'not_applicable'].includes(input.result)) throw fail(422, '检查项、检查方式或结果不匹配');
          const limitations = text(input.limitations ?? '', 4000, '检查说明与限制');
          if (input.result === 'not_applicable' && !limitations.trim()) throw fail(422, '不适用的检查必须说明理由');
          const evidenceRef = input.evidenceRef || target.id;
          const evidence = [...snapshot.stageRevisions, ...snapshot.artifacts].find((item) => item.id === evidenceRef);
          if (!evidence?.current || !evidence.valid) throw fail(422, '检查依据必须是本期当前有效的稿件或产物版本');
          const media = MEDIA_CHECK_IDS.has(input.checkId);
          if (media && target.type === 'artifact' && target.kind === 'video' && evidence.id !== target.id) throw fail(422, '每个成片版本必须检查并引用本身，不能使用其他视频的验收依据');
          if (media && input.result !== 'failed' && (evidence.type !== 'artifact' || evidence.kind !== 'video')) throw fail(422, '成片验收必须指向本次实际归档的视频');
          if (media && input.result === 'not_applicable') throw fail(422, '本期成片的必过验收不能省略');
          record(contentId, 'check', { targetRevisionId: target.id, checkId: definition.id, method: input.method, result: input.result, evidenceRef, limitations, checkedBy: actor.id, actorKind: actor.kind, checkedAt: timestamp() });
          targetId = target.id; summary = `记录检查：${definition.label}`; break;
        }
        case 'record_decision': {
          const target = [...snapshot.stageRevisions, ...snapshot.artifacts].find((item) => item.id === input.targetRevisionId);
          if (!target?.current || !target.valid || !['approved', 'changes_requested'].includes(input.decision)) throw fail(409, '请审阅当前有效修订');
          const note = text(input.note ?? '', 4000, '审阅意见');
          if (trustedUser && input.decision === 'approved') {
            const gaps = target.type === 'stage' ? snapshot.stages.find((item) => item.id === target.stageId).missingChecks : rules.artifactChecks[target.kind].filter((definition) => {
              const value = snapshot.checks.filter((item) => item.targetRevisionId === target.id && item.checkId === definition.id).at(-1);
              return !value?.valid || !['passed', 'not_applicable'].includes(value.result);
            }).map((item) => item.label);
            if (gaps.length) throw fail(422, `仍有未通过的检查：${gaps.join('；')}`);
          }
          record(contentId, 'decision', { targetRevisionId: target.id, decision: trustedUser ? input.decision : 'reported_decision', reportedDecision: trustedUser ? null : input.decision, note, sourceInstruction: text(input.sourceInstruction ?? '', 4000, '确认原文'), sourceRef: text(input.sourceRef ?? '', 1000, '来源引用'), actorId: actor.id, actorKind: actor.kind, source: actor.source, createdAt: timestamp() });
          targetId = target.id; summary = trustedUser ? input.decision === 'approved' ? '作者确认了当前具体版本' : '作者要求修改当前版本' : '记录聊天转述，尚未作为作者确认';
          if (trustedUser && target.type === 'stage' && input.decision === 'approved') {
            const next = rules.stages[rules.stages.findIndex((item) => item.id === target.stageId) + 1];
            episode.nextAction = next ? `继续${next.name}` : '核对整期当前产物与验收，再标记制作完成';
          }
          break;
        }
        case 'set_execution_grant': {
          requireUser();
          if (input.revoke) {
            for (const grant of snapshot.grants.filter((item) => !item.revokedAt)) record(contentId, 'grant_revoked', { grantId: grant.id, actorId: actor.id, createdAt: timestamp() });
            summary = '撤回后续连续制作授权'; break;
          }
          const ids = input.allowedStageIds, actions = input.allowedActions;
          if (!Array.isArray(ids) || !ids.length || ids.length > rules.stages.length || new Set(ids).size !== ids.length || ids.some((id) => !rules.stages.some((stage) => stage.id === id)) || !Array.isArray(actions) || !actions.length || actions.length > 3 || actions.some((action) => !['draft', 'review', 'finalize'].includes(action))) throw fail(422, '连续制作范围无效');
          record(contentId, 'grant', { allowedStageIds: [...ids], allowedActions: [...new Set(actions)], stopConditions: text(input.stopConditions, 2000, '停止条件', true), sourceInstruction: text(input.sourceInstruction, 4000, '授权原文', true), actorId: actor.id, createdAt: timestamp(), revokedAt: null }); summary = '记录连续制作范围，未替代各版内容确认'; break;
        }
        case 'set_pause': {
          requireUser();
          if (typeof input.paused !== 'boolean') throw fail(422, '暂停状态无效');
          if (input.paused) { episode.status = 'paused'; episode.pauseReason = text(input.reason ?? '', 2000, '暂停原因'); }
          else { episode.status = 'active'; episode.pauseReason = null; }
          if (input.nextAction !== undefined) episode.nextAction = text(input.nextAction, 2000, '下一动作', true);
          summary = input.paused ? '暂停制作，保留恢复位置' : '恢复制作'; break;
        }
        case 'set_current_stage': {
          stageDefinition(input.stageId); episode.currentStageId = input.stageId; episode.nextAction = `继续${stageDefinition(input.stageId).name}`; summary = '更新下一制作阶段'; break;
        }
        case 'set_blocker': {
          stageDefinition(input.stageId);
          const reason = text(input.reason, 2000, '阻塞原因', true);
          episode.blockers = [...episode.blockers.filter((item) => item.stageId !== input.stageId), { stageId: input.stageId, reason, createdAt: timestamp(), reportedBy: actor.id }];
          episode.currentStageId = input.stageId;
          episode.nextAction = text(input.nextAction ?? `解决阻塞：${reason}`, 2000, '下一动作', true);
          summary = `记录${stageDefinition(input.stageId).name}的阻塞`; break;
        }
        case 'clear_blocker': {
          stageDefinition(input.stageId);
          episode.blockers = episode.blockers.filter((item) => item.stageId !== input.stageId);
          summary = `解除${stageDefinition(input.stageId).name}的阻塞，保留原检查状态`; break;
        }
        case 'complete': {
          requireUser();
          if (snapshot.stages.some((stage) => !stage.currentRevisionId || stage.dependencyIssues.length || stage.missingChecks.length) || episode.blockers.length) throw fail(422, '仍有缺少的稿件、产物或未通过的验收');
          const finalGrant = snapshot.grants.some((grant) => !grant.revokedAt && grant.allowedActions.includes('finalize') && rules.stages.every((stage) => grant.allowedStageIds.includes(stage.id)));
          if (!finalGrant && snapshot.stages.some((stage) => stage.status !== 'approved')) throw fail(422, '请确认各阶段当前版本，或明确授权本期最终交付');
          episode.status = 'completed'; episode.completedAt = timestamp(); episode.nextAction = '制作完成；实际发布另行确认和记录'; summary = '本期制作完成，尚未据此发布'; break;
        }
      }
      episode.rowVersion += 1; episode.updatedAt = timestamp();
      db.prepare('UPDATE episodes SET payload=? WHERE id=?').run(JSON.stringify(episode), contentId);
      record(contentId, 'event', { type: input.operation, actorId: actor.id, actorKind: actor.kind, targetId, beforeVersion: episode.rowVersion - 1, afterVersion: episode.rowVersion, summary, createdAt: timestamp() });
      const result = { ...context(contentId, { displayTitle }), saved: true, replayed: false };
      db.prepare('INSERT INTO idempotency VALUES(?,?,?,?,?,?)').run(actor.id, contentId, input.operation, key, requestHash, JSON.stringify(result));
      db.exec('COMMIT'); secureFiles(); return result;
    } catch (error) { try { db.exec('ROLLBACK'); } catch { /* Preserve the original error if commit already failed closed. */ } throw error; }
  }
  function exportHandoff(contentId, { displayTitle } = {}) {
    const snapshot = context(contentId, { displayTitle }), episode = snapshot.episode;
    if (!episode) throw fail(404, '制作档案尚未建立');
    const list = (values) => values.length ? values.map((value) => `- ${value}`).join('\n') : '- 无';
    const markdown = `# ${episode.title}：制作交接\n\n课程 ID：${episode.id}\n档案版本：${episode.rowVersion}\n规则：${episode.workflowVersion} / ${episode.rulesRef}\n状态：${episode.status}\n\n学习目标：${episode.learningGoal || '待明确，以 S02 当前稿为准'}\n\n## 当前\n${snapshot.stateCard.current}\n\n## 有效确认\n${list(snapshot.stateCard.confirmed)}\n\n## 当前稿件与产物\n${list([...snapshot.stageRevisions.filter((item) => item.current).map((item) => `${item.stageId} r${item.revisionNumber} / ${item.id} / ${item.valid ? '当前有效' : '需复核'}`), ...snapshot.artifacts.filter((item) => item.current).map((item) => `${item.filename} (${item.variant}) r${item.revisionNumber} / ${item.id} / ${item.valid ? '当前有效' : '需复核'}`)])}\n\n## 检查缺口\n${list(snapshot.stateCard.gaps)}\n\n## 连续制作授权\n${list(snapshot.grants.filter((item) => !item.revokedAt).map((item) => `${item.allowedStageIds.join(', ')}；${item.allowedActions.join(', ')}；停止条件：${item.stopConditions}`))}\n\n## 下一动作\n${episode.nextAction}\n\n恢复前读取后台最新档案版本，过期交接不能覆盖新稿。当前文件、检查证据、已退回方案和依赖见随附 JSON；聊天中的历史路径不等于文件已归档。制作完成与实际发布分别记录。\n`;
    return { markdown, snapshot };
  }
  return { get, list: () => db.prepare('SELECT payload FROM episodes ORDER BY rowid DESC').all().map(unpack), context, replay, apply, exportHandoff, close() { db.close(); secureFiles(); } };
}
