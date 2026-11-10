import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { chmod, lstat, mkdir, open, rename, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const HASH = /^[a-f0-9]{64}$/;
const MAX_BYTES = 32 * 1024 * 1024;
const reasons = new Set(['correction', 'adapt', 'supplement']);
const scopes = new Set(['article', 'video', 'both']);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const text = (value, max, label) => { if (typeof value !== 'string' || value.length > max || value.includes('\0')) fail(422, `${label}不符合要求`); return value.trim(); };
const validSlug = value => typeof value === 'string' && value.length <= 180 && SLUG.test(value);
function week(value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(422, '历史周次无效');
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value || date.getUTCDay() !== 1) fail(422, '历史周次无效');
  return value;
}

/** Update tasks are independent production rounds on the same content identity.
 * Their snapshots reference immutable article/media versions, never a mutable
 * "current video" pointer. No method publishes, edits an article, or deletes media.
 */
export async function createUpdateTasks({ projectRoot, revisions, workspace, publishing, clock = () => new Date() }) {
  const root = join(resolve(projectRoot), '.content-updates');
  await mkdir(root, { recursive: true, mode: 0o700 });
  const rootStat = await lstat(root);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) fail(500, '更新任务目录不安全');
  await chmod(root, 0o700);
  const path = join(root, 'state.json');
  let pending = Promise.resolve();
  const serial = action => { const next = pending.then(action, action); pending = next.catch(() => {}); return next; };
  async function readState() {
    let handle;
    try { handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW); }
    catch (error) { if (error.code === 'ENOENT') return { version: 1, tasks: [] }; throw error; }
    try {
      const info = await handle.stat();
      if (!info.isFile() || info.nlink !== 1 || info.size > MAX_BYTES) fail(500, '更新任务文件无效');
      const bytes = await handle.readFile();
      if (bytes.length > MAX_BYTES) fail(500, '更新任务文件过大');
      let state;
      try { state = JSON.parse(bytes); } catch { fail(500, '更新任务记录损坏，请从备份恢复'); }
      if (state.version !== 1 || !Array.isArray(state.tasks) || state.tasks.length > 10000 || state.tasks.some(task =>
        !object(task) || !ID.test(task.id) || !ID.test(task.requestId) || !HASH.test(task.requestHash) || !ID.test(task.contentId) || !validSlug(task.slug) ||
        !['draft', 'content'].includes(task.kind) || !reasons.has(task.reason) || !scopes.has(task.scope) || !['active', 'completed', 'canceled'].includes(task.status) ||
        !object(task.base) || !HASH.test(task.base.articleRevision) || !Array.isArray(task.base.assets) || !Array.isArray(task.events) ||
        (task.status === 'completed' && (!object(task.result) || !HASH.test(task.result.articleRevision) || !Array.isArray(task.result.assets))) ||
        (task.pendingSync !== undefined && task.pendingSync !== { active: 'enqueue', completed: 'complete', canceled: 'cancel' }[task.status])
      )) fail(500, '更新任务记录格式错误');
      if (new Set(state.tasks.map(task => task.id)).size !== state.tasks.length || new Set(state.tasks.map(task => task.requestId)).size !== state.tasks.length) fail(500, '更新任务记录重复');
      const active = state.tasks.filter(task => task.status === 'active');
      if (new Set(active.map(task => task.slug)).size !== active.length) fail(500, '同一内容存在重复的进行中更新');
      return state;
    } finally { await handle.close(); }
  }
  async function saveState(state) {
    const bytes = Buffer.from(`${JSON.stringify(state)}\n`);
    if (bytes.length > MAX_BYTES) fail(413, '更新任务记录达到容量限制');
    const temporary = `${path}.${randomUUID()}.tmp`;
    let handle;
    try {
      handle = await open(temporary, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | constants.O_NOFOLLOW, 0o600);
      await handle.writeFile(bytes); await handle.sync(); await handle.close(); handle = null;
      await rename(temporary, path);
    } finally {
      await handle?.close();
      await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; });
    }
  }
  const revision = task => hash(task);
  function present(task) {
    const { requestId, requestHash, ...value } = task;
    return { ...structuredClone(value), revision: revision(task) };
  }
  function find(state, id) {
    if (typeof id !== 'string' || !ID.test(id)) fail(400, '更新任务标识无效');
    const task = state.tasks.find(value => value.id === id);
    if (!task) fail(404, '更新任务不存在');
    return task;
  }
  async function article(slug, preferred) {
    if (!validSlug(slug) || !['draft', 'content'].includes(preferred)) fail(422, '内容地址无效');
    try { return await revisions.read({ slug, kind: preferred }); }
    catch (error) { if (error.status !== 404) throw error; return revisions.read({ slug, kind: preferred === 'draft' ? 'content' : 'draft' }); }
  }
  async function snapshot(slug, kind, expectedRevision, expectedWorkspaceRevision) {
    if (typeof expectedRevision !== 'string' || !HASH.test(expectedRevision)) fail(422, '请保存文章并读取当前版本后重试');
    const current = await article(slug, kind);
    if (current.workingRevision !== expectedRevision) fail(409, '文章已在其他窗口修改，请刷新后重试');
    const articleVersion = await revisions.version({ slug, kind: current.kind }, current.workingRevision);
    const content = await workspace.read(slug);
    if (expectedWorkspaceRevision !== undefined && (typeof expectedWorkspaceRevision !== 'string' || !HASH.test(expectedWorkspaceRevision))) fail(422, '素材版本无效，请重新打开内容');
    if (expectedWorkspaceRevision !== undefined && content.revision !== expectedWorkspaceRevision) fail(409, '素材或成片选择已在其他窗口修改，请刷新后重新确认');
    // Explicit allowlist: object-store paths, credentials, upload sessions and
    // mutable URLs do not belong in a historical content snapshot.
    const assets = content.assets.map(asset => Object.fromEntries(['id', 'groupId', 'version', 'sha256', 'category', 'filename', 'relativePath', 'size', 'mime', 'createdAt'].filter(key => asset[key] !== undefined).map(key => [key, asset[key]])));
    return { title: current.title, kind: current.kind, contentId: content.id, value: {
      articleRevision: current.workingRevision, publishedRevision: current.publishedRevision,
      workspaceRevision: content.revision,
      articleImages: articleVersion.images,
      capturedAt: clock().toISOString(), assets, selectedVideoId: content.selectedVideoId,
      notes: content.notes, software: content.software, softwareVersion: content.softwareVersion,
    } };
  }
  async function synchronize(state, task, schedule) {
    if (!task.pendingSync) return;
    if (!schedule?.enqueueUpdate || !schedule?.finishUpdate) fail(503, '更新任务排期暂不可用，请刷新后重试');
    if (task.pendingSync === 'enqueue') await schedule.enqueueUpdate(task);
    else await schedule.finishUpdate(task.id, task.pendingSync === 'complete' ? { done: true } : { canceled: true });
    delete task.pendingSync;
    await saveState(state);
  }
  async function recover(state, schedule) {
    const errors = new Map();
    for (const task of state.tasks.filter(task => task.pendingSync)) {
      try { await synchronize(state, task, schedule); }
      catch { errors.set(task.id, '排期尚未同步，请刷新重试；任务和原版本已保存'); }
    }
    return errors;
  }
  async function publications(slug) {
    const website = revisions.publications ? await revisions.publications(slug) : [];
    const channels = publishing?.store ? publishing.store.all('jobs').filter(job => job.content_ref?.slug === slug).map(value => {
      const job = publishing.store.job(value.id);
      return { id: job.id, status: job.status, createdAt: job.created_at, updateTaskId: job.content_ref.updateTaskId ?? null,
        video: { id: job.video_asset_id, sha256: job.video?.sha256 ?? null },
        targets: job.targets.map(target => ({ platform: target.platform, status: target.status, platformStatus: target.platform_status, postUrl: target.post_url ?? null })) };
    }) : [];
    return { website, channels };
  }
  async function list(slug, schedule) {
    if (slug !== undefined && !validSlug(slug)) fail(422, '内容地址无效');
    return serial(async () => {
      const state = await readState(); const errors = await recover(state, schedule);
      const tasks = state.tasks.filter(task => slug === undefined || task.slug === slug).map(task => ({ ...present(task), ...(errors.has(task.id) ? { syncError: errors.get(task.id) } : {}) })).reverse();
      return { tasks, activeTask: tasks.find(task => task.status === 'active') ?? null, publications: slug ? await publications(slug) : { website: [], channels: [] } };
    });
  }
  async function readTask(id, schedule) {
    return serial(async () => { const state = await readState(); const task = find(state, id); await synchronize(state, task, schedule); return present(task); });
  }
  async function create(input, schedule) {
    if (!object(input) || !validSlug(input.slug) || !['draft', 'content'].includes(input.kind) || !reasons.has(input.reason) || !scopes.has(input.scope) || typeof input.requestId !== 'string' || !ID.test(input.requestId) || typeof input.expectedRevision !== 'string' || !HASH.test(input.expectedRevision)) fail(422, '更新任务信息不完整或无效');
    const normalized = { slug: input.slug, kind: input.kind, reason: input.reason, scope: input.scope, note: text(input.note ?? '', 2000, '更新说明'), sourceWeek: week(input.sourceWeek), expectedRevision: input.expectedRevision, expectedWorkspaceRevision: input.expectedWorkspaceRevision };
    const requestHash = hash(normalized);
    return serial(async () => {
      const state = await readState();
      const previous = state.tasks.find(task => task.requestId === input.requestId);
      if (previous) {
        if (previous.requestHash !== requestHash) fail(409, '这次创建标识已用于其他更新，请重新操作');
        await synchronize(state, previous, schedule); return present(previous);
      }
      if (state.tasks.some(task => task.slug === input.slug && task.status === 'active')) fail(409, '这篇教程已有进行中的更新，请先打开原任务');
      if (state.tasks.length >= 10000) fail(413, '更新任务达到数量限制');
      if (!schedule?.read || !schedule.enqueueUpdate) fail(503, '更新任务排期暂不可用');
      const plan = await schedule.read();
      if (normalized.sourceWeek && !plan.history.some(value => value.start === normalized.sourceWeek && value.entries.some(entry => entry.slug === input.slug))) fail(409, '历史记录已变化，请从历史教程重新打开');
      const source = await snapshot(input.slug, input.kind, input.expectedRevision, input.expectedWorkspaceRevision);
      const at = clock().toISOString();
      const task = { id: randomUUID(), requestId: input.requestId, requestHash, slug: input.slug, kind: source.kind, contentId: source.contentId,
        title: source.title, reason: normalized.reason, scope: normalized.scope, note: normalized.note, sourceWeek: normalized.sourceWeek,
        status: 'active', createdAt: at, updatedAt: at, base: source.value, result: null, pendingSync: 'enqueue',
        events: [{ action: 'created', at }] };
      await schedule.assertCanEnqueueUpdate?.(task);
      state.tasks.push(task); await saveState(state);
      await synchronize(state, task, schedule);
      return present(task);
    });
  }
  async function change(id, input, schedule) {
    if (!object(input) || !['complete', 'cancel'].includes(input.action) || typeof input.revision !== 'string' || !HASH.test(input.revision)) fail(422, '更新任务操作无效');
    return serial(async () => {
      const state = await readState(); const task = find(state, id);
      const status = input.action === 'complete' ? 'completed' : 'canceled';
      if (task.status === status) { await synchronize(state, task, schedule); return present(task); }
      if (task.status !== 'active') fail(409, '这轮更新已结束，请新建下一轮更新');
      if (input.revision !== revision(task)) fail(409, '更新任务已在其他窗口变化，请刷新后重试');
      if (input.action === 'complete') {
        const current = await snapshot(task.slug, task.kind, input.expectedRevision, input.expectedWorkspaceRevision);
        if (current.contentId !== task.contentId) fail(409, '内容身份已变化，请重新核对');
        if (task.scope !== 'article' && !current.value.selectedVideoId) fail(422, '请先在视频页选择这轮更新的成片');
        task.result = current.value; task.kind = current.kind;
      }
      const at = clock().toISOString();
      task.status = status; task.updatedAt = at; task.finishedAt = at;
      task.pendingSync = input.action;
      task.events.push({ action: input.action === 'complete' ? 'completed' : 'canceled', at });
      await saveState(state); await synchronize(state, task, schedule);
      return present(task);
    });
  }
  async function validatePublication(id, { slug, scope, articleRevision, videoSha256, frozen = false }) {
    return serial(async () => {
      const state = await readState(); const task = find(state, id);
      if (task.slug !== slug || task.status === 'canceled' || ![scope, 'both'].includes(task.scope)) fail(409, '更新任务与本次发布内容不匹配');
      const content = await workspace.read(slug);
      if (content.id !== task.contentId) fail(409, '内容身份已变化，请重新核对');
      if (scope === 'article') {
        if (!HASH.test(articleRevision ?? '')) fail(422, '发布文章版本无效');
        if (task.status === 'completed' && task.result.articleRevision !== articleRevision) fail(409, '预览版本与这轮已完成的文章不一致，请重新预览');
        if (task.status === 'active' && !frozen && (await article(task.slug, task.kind)).workingRevision !== articleRevision) fail(409, '文章已变化，请重新确认更新版本');
        await revisions.version({ slug, kind: task.kind }, articleRevision);
      } else {
        if (!HASH.test(videoSha256 ?? '')) fail(422, '发布视频版本无效');
        const current = task.status === 'completed' ? task.result : content;
        if (!current.assets.some(asset => asset.id === current.selectedVideoId && asset.category === 'video' && asset.sha256 === videoSha256)) fail(409, '请选择这轮更新的成片版本');
      }
      return present(task);
    });
  }
  return {
    list, readTask, create, change, validatePublication,
    async handle(request, response, context) {
      if (!context.url.pathname.startsWith('/api/content-updates')) return false;
      const match = /^\/api\/content-updates(?:\/([a-f0-9-]{36}))?$/.exec(context.url.pathname);
      if (!match) fail(404, '更新任务接口不存在');
      const id = match[1];
      if (request.method === 'GET') {
        context.sendJson(response, 200, id ? { task: await readTask(id, context.schedule) } : await list(context.url.searchParams.get('slug') ?? undefined, context.schedule));
        return true;
      }
      const input = await context.readJson(request, 16 * 1024);
      if (request.method === 'POST' && !id) {
        const action = () => create(input, context.schedule);
        const task = context.withArticleLock && validSlug(input?.slug) ? await context.withArticleLock(input.slug, action) : await action();
        context.sendJson(response, 201, { task }); return true;
      }
      if (request.method === 'PATCH' && id) {
        // Do not synchronize a failed enqueue before cancellation: it must remain
        // possible to cancel a task whose article was subsequently archived.
        const state = await readState(); const task = find(state, id);
        const action = () => change(id, input, context.schedule);
        const changed = context.withArticleLock && input?.action === 'complete' ? await context.withArticleLock(task.slug, action) : await action();
        context.sendJson(response, 200, { task: changed }); return true;
      }
      fail(405, '请求方式不支持');
    },
  };
}
