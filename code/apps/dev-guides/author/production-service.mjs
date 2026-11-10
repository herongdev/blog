import { realpath, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { createProductionStore } from './production/store.mjs';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HASH = /^[a-f0-9]{64}$/;
const fail = (status, message) => Object.assign(new Error(message), { status });
const record = value => value && typeof value === 'object' && !Array.isArray(value);
function artifactIdentity(value) {
  const hex = createHash('sha256').update(value).digest('hex').slice(0, 32);
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}
const kinds = { video: 'video', recording: 'other', image: 'image', audio: 'audio', project: 'project', subtitle: 'subtitle', other: 'other' };
const allowedFields = {
  start: ['learningGoal'],
  save_stage_revision: ['stageId', 'content', 'inputRevisionIds', 'changeSummary'],
  register_artifact: ['source', 'artifactId', 'stageId', 'kind', 'variant', 'inputRevisionIds'],
  submit_for_review: ['stageRevisionId'],
  record_decision: ['targetRevisionId', 'decision', 'note', 'sourceInstruction', 'sourceRef'],
  record_check: ['targetRevisionId', 'checkId', 'method', 'result', 'evidenceRef', 'limitations'],
  set_execution_grant: ['allowedStageIds', 'allowedActions', 'stopConditions', 'sourceInstruction', 'revoke'],
  set_pause: ['paused', 'reason', 'nextAction'],
  set_current_stage: ['stageId'],
  set_blocker: ['stageId', 'reason', 'nextAction'],
  clear_blocker: ['stageId'],
  complete: [],
};

/** One business service serves the authenticated web UI and the scoped MCP adapter. */
export async function createProductionService({ projectRoot, workspace, revisions, store: providedStore }) {
  projectRoot = await realpath(projectRoot);
  const store = providedStore ?? createProductionStore({ path: join(projectRoot, '.production-workflow', 'production.sqlite') });

  async function articleIdentity(slug) {
    if (typeof slug !== 'string' || slug.length > 180 || !SLUG.test(slug)) throw fail(400, '内容地址无效');
    // Use the existing working title and identity, including after draft promotion.
    for (const kind of ['content', 'draft']) {
      const path = join(projectRoot, kind === 'draft' ? 'drafts' : 'src/content/tutorials', slug + '.md');
      const info = await lstat(path).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
      if (!info) continue;
      if (!info.isFile() || info.isSymbolicLink() || info.nlink !== 1) throw fail(422, '内容文件不安全');
      const article = await revisions.read({ kind, slug });
      return { kind, slug, title: article.title, article };
    }
    throw fail(404, '内容不存在');
  }

  async function identity(slug) {
    const article = await articleIdentity(slug);
    const content = await workspace.read(slug);
    return { ...article, content };
  }

  function present(context, current) {
    // The title belongs to the content library; no second editable title is introduced.
    return { ...context, ...(context.episode ? { episode: { ...context.episode, title: current.title } } : {}), content: { id: current.content.id, slug: current.slug, title: current.title, kind: current.kind } };
  }

  async function getContext(slug) {
    const current = await identity(slug);
    const context = present(store.context(current.content.id, { displayTitle: current.title }), current);
    const availableArtifacts = current.content.assets.map(asset => ({
      type: 'workspace_asset', assetId: asset.id, filename: asset.filename, category: asset.category,
      kind: kinds[asset.category] ?? 'other', sizeBytes: asset.size, contentHash: asset.sha256,
      version: asset.version, previewUrl: asset.previewUrl,
    }));
    // Snapshot metadata comes from the immutable revision service, never client-supplied hashes.
    const snapshot = await revisions.snapshot({ kind: current.kind, slug }, current.article.workingRevision);
    availableArtifacts.push({ type: 'article_revision', kind: current.kind, revision: snapshot.revision, title: current.title, filename: slug + '.md', sizeBytes: snapshot.sizeBytes, contentHash: snapshot.contentHash });
    return { ...context, availableArtifacts };
  }

  async function list() {
    const items = [];
    for (const episode of store.list()) {
      try {
        const current = await identity(episode.slug);
        if (current.content.id !== episode.contentId) continue;
        const context = present(store.context(episode.contentId, { displayTitle: current.title }), current);
        items.push({ ...context.episode, kind: current.kind, stateCard: context.stateCard, stage: context.stages.find(stage => stage.id === context.episode.currentStageId) });
      } catch (error) { if (error.status !== 404) throw error; }
    }
    return { items };
  }

  function validateInput(input) {
    if (!record(input) || !Object.hasOwn(allowedFields, input.operation)) throw fail(422, '制作操作无效');
    const fields = new Set(['operation', 'expectedVersion', 'idempotencyKey', ...allowedFields[input.operation]]);
    if (Object.keys(input).some(key => !fields.has(key))) throw fail(422, '制作请求包含不支持的字段');
  }

  async function verifiedArtifact(slug, source, requestedKind, current, variant = 'default') {
    if (!record(source)) throw fail(422, '请选择当前内容已有的素材或文章版本');
    if (source.type === 'workspace_asset') {
      if (Object.keys(source).some(key => !['type', 'assetId'].includes(key))) throw fail(422, '素材来源信息无效');
      const selected = current.content.assets.find(asset => asset.id === source.assetId);
      if (!selected) throw fail(404, '素材不属于当前内容');
      const inferred = kinds[selected.category] ?? 'other';
      const kind = requestedKind ?? inferred;
      if (kind !== inferred && !(selected.category === 'image' && kind === 'cover')) throw fail(422, '产物类型与原始素材不符');
      // resolveAsset verifies actual size/hash and cloud availability before a revision is registered.
      try {
        const { asset } = await workspace.resolveAsset(slug, selected.id);
        return { kind, artifactId: artifactIdentity(current.content.id + ':' + asset.groupId + ':' + kind + ':' + variant), filename: asset.filename, storageRef: { type: 'workspace_asset', slug, assetId: asset.id }, contentHash: asset.sha256, sizeBytes: asset.size };
      } finally { await workspace.releaseAsset?.(slug, selected.id); }
    }
    if (source.type === 'article_revision') {
      if (Object.keys(source).some(key => !['type', 'kind', 'revision'].includes(key)) || !['draft', 'content'].includes(source.kind) || !HASH.test(source.revision)) throw fail(422, '文章修订来源无效');
      if (requestedKind && requestedKind !== 'article') throw fail(422, '文章修订只能归档为文章产物');
      const snapshot = await revisions.snapshot({ kind: source.kind, slug }, source.revision);
      return { kind: 'article', artifactId: artifactIdentity(current.content.id + ':article:' + variant), filename: slug + '.md', storageRef: { type: 'article_revision', slug, kind: source.kind, revision: source.revision }, contentHash: snapshot.contentHash, sizeBytes: snapshot.sizeBytes };
    }
    throw fail(422, '不接受任意文件地址，请先上传素材或保存文章');
  }

  async function apply(slug, input, actor) {
    validateInput(input);
    if (!actor || !['user', 'agent'].includes(actor.kind) || !['web', 'mcp'].includes(actor.source)) throw fail(401, '制作操作身份无效');
    if (typeof slug !== 'string' || !SLUG.test(slug)) throw fail(400, '内容地址无效');
    const existing = store.list().find(episode => episode.slug === slug);
    if (existing) {
      const committed = store.replay(existing.contentId, input, actor);
      if (committed) {
        // Recover an already committed result even when a working file is
        // temporarily unavailable. A new mutation still requires live identity.
        try { return present(committed, await identity(slug)); }
        catch { return { ...committed, content: { id: existing.contentId, slug, title: committed.episode.title } }; }
      }
    }
    const current = await identity(slug);
    // A timed-out committed request can be recovered even if its source is now temporarily unavailable.
    const replay = store.replay(current.content.id, input, actor);
    if (replay) return present(replay, current);
    const currentEpisode = store.get(current.content.id);
    if (input.expectedVersion !== (currentEpisode?.rowVersion ?? 0)) throw Object.assign(fail(409, '制作档案已在其他会话更新，请保留当前稿件并重新读取'), { code: 'VERSION_CONFLICT' });
    // Prior approval is evidence about an exact file, not proof that its bytes
    // are still available. Verify again at the actions that claim readiness.
    if (input.operation === 'complete' || (input.operation === 'record_decision' && input.decision === 'approved') || (input.operation === 'record_check' && input.result !== 'failed')) {
      const snapshot = store.context(current.content.id, { displayTitle: current.title });
      const target = [...snapshot.stageRevisions, ...snapshot.artifacts].find(item => item.id === input.targetRevisionId);
      const candidates = snapshot.artifacts.filter(item => item.current && (
        input.operation === 'complete' || item.id === input.targetRevisionId || item.id === input.evidenceRef ||
        (input.operation === 'record_decision' && target?.stageId === item.stageId)
      ));
      for (const artifact of candidates) {
        const { slug: ignoredSlug, ...source } = artifact.storageRef;
        const verified = await verifiedArtifact(slug, source, artifact.kind, current, artifact.variant);
        if (verified.contentHash !== artifact.contentHash || verified.sizeBytes !== artifact.sizeBytes) throw fail(422, '产物字节与登记版本不一致，请重新归档并核对');
      }
    }
    let normalized = { ...input };
    if (input.operation === 'start') normalized = { ...normalized, slug, title: current.title };
    if (input.operation === 'register_artifact') {
      const { source, ...rest } = normalized;
      const artifact = await verifiedArtifact(slug, source, input.kind, current, input.variant);
      if (input.artifactId && input.artifactId !== artifact.artifactId) throw fail(422, '产物版本组与来源不匹配');
      normalized = { ...rest, ...artifact };
    }
    return present(store.apply(current.content.id, normalized, actor, { request: input, displayTitle: current.title }), current);
  }

  async function exportHandoff(slug) {
    const current = await identity(slug);
    const exported = store.exportHandoff(current.content.id, { displayTitle: current.title });
    return { ...exported, markdown: exported.markdown.replace(/^# [^\n]*/, '# ' + current.title + '：制作交接'), snapshot: present(exported.snapshot, current), content: { id: current.content.id, slug, title: current.title } };
  }

  async function handle(request, response, context) {
    if (context.url.pathname === '/api/productions') {
      if (request.method !== 'GET') throw fail(405, '请求方式不支持');
      context.sendJson(response, 200, await list()); return true;
    }
    const match = /^\/api\/workspaces\/([a-z0-9]+(?:-[a-z0-9]+)*)\/production(?:\/(actions|handoff))?$/.exec(context.url.pathname);
    if (!match) return false;
    const [, slug, action] = match;
    if (!action && request.method === 'GET') context.sendJson(response, 200, await getContext(slug));
    else if (action === 'handoff' && request.method === 'GET') context.sendJson(response, 200, await exportHandoff(slug));
    else if (action === 'actions' && request.method === 'POST') {
      const input = await context.readJson(request, 512 * 1024);
      const actor = { id: context.session ? 'administrator' : 'local-author', kind: 'user', source: 'web' };
      context.sendJson(response, 200, await apply(slug, input, actor));
    } else throw fail(405, '请求方式不支持');
    return true;
  }
  return { store, list, getContext, apply, exportHandoff, handle, close: () => store.close() };
}
