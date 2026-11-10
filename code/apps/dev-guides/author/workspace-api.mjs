import { requirePublishableVideo } from './content-workspace.mjs';

/** Composed after the host's existing session, Origin and CSRF checks. */
export function createWorkspaceHandler({ workspace, revisions, publishing, manager, updates, localOnly = false, previewOrigins = {} }) {
  function status() {
    if (!manager) return { enabled: false, active: null, lastJob: null, environments: { staging: null, production: null }, localOnly };
    const value = manager.getStatus();
    if (localOnly) for (const [environment, release] of Object.entries(value.environments)) if (release && previewOrigins[environment]) release.url = previewOrigins[environment];
    return { ...value, localOnly };
  }
  return async (request, response, context) => {
    if (updates && await updates.handle(request, response, context)) return true;
    if (await revisions.handle(request, response, context)) return true;
    const bridge = /^\/api\/workspaces\/([a-z0-9]+(?:-[a-z0-9]+)*)\/publishing-video$/.exec(context.url.pathname);
    if (bridge && request.method === 'POST') {
      const input = await context.readJson(request, 4096);
      const source = await workspace.read(bridge[1]);
      const selected = source.assets.find((asset) => asset.id === input.assetId);
      if (!selected) throw context.httpError(404, '素材不存在');
      if (selected.category !== 'video') throw context.httpError(422, '请选择此内容的成片视频');
      // Reject legacy unsupported finishes before downloading a cloud original.
      requirePublishableVideo(selected.filename);
      const { path, asset } = await workspace.resolveAsset(bridge[1], input.assetId);
      let imported;
      try { imported = await publishing.importWorkspaceVideo({ path, filename: asset.filename }); }
      finally { await workspace.releaseAsset?.(bridge[1], input.assetId); }
      const content = await workspace.read(bridge[1]);
      context.sendJson(response, 201, { video_asset_id: imported.id, content_id: content.id });
      return true;
    }
    if (await workspace.handle(request, response, context)) return true;
    if (context.url.pathname === '/api/publish') {
      if (request.method === 'GET') context.sendJson(response, 200, status());
      else if (request.method === 'POST') {
        if (!manager) throw context.httpError(503, '当前写作台未配置网站发布');
        const input = await context.readJson(request, 8192);
        // Require an explicit content selection or the exact preview being confirmed.
        if (input.environment === 'staging' && !input.selection?.slug) throw context.httpError(422, '请先选择要预览的内容');
        if (input.environment === 'production' && !input.previewId) throw context.httpError(422, '请先检查这篇内容的预览');
        const selection = input.environment === 'production' && updates ? (await revisions.plan(input.previewId)).selection : input.selection;
        if (selection?.updateTaskId) {
          if (!updates) throw context.httpError(503, '更新任务暂不可用');
          if (selection.action === 'unpublish') throw context.httpError(422, '更新任务不能作为下架操作');
          await updates.validatePublication(selection.updateTaskId, { slug: selection.slug, scope: 'article', articleRevision: selection.revision, frozen: input.environment === 'production' });
        }
        const job = await manager.start(input.environment, input.environment === 'staging' ? input.selection : { previewId: input.previewId });
        context.sendJson(response, 202, { job });
      } else throw context.httpError(405, '请求方式不支持');
      return true;
    }
    if (context.url.pathname === '/api/publishing/jobs' && request.method === 'POST') {
      const input = await context.readJson(request, 128 * 1024);
      if (input.content_ref) {
        const content = await workspace.read(input.content_ref.slug);
        if (content.id !== input.content_ref.id) throw context.httpError(422, '内容关联已变化，请重新打开内容');
        if (input.content_ref.updateTaskId) {
          if (!updates) throw context.httpError(503, '更新任务暂不可用');
          await updates.validatePublication(input.content_ref.updateTaskId, { slug: input.content_ref.slug, scope: 'video', videoSha256: publishing.store.asset(input.video_asset_id).sha256 });
        }
      }
      context.sendJson(response, 201, { job: publishing.store.createJob(input) });
      return true;
    }
    if (updates && request.method === 'POST') {
      const submit = /^\/api\/publishing\/jobs\/([a-f0-9-]{36})\/(?:precheck|submit)$/.exec(context.url.pathname);
      const retry = /^\/api\/publishing\/targets\/([a-f0-9-]{36})\/retry$/.exec(context.url.pathname);
      const job = submit ? publishing.store.job(submit[1]) : retry ? publishing.store.job(publishing.store.target(retry[1]).job_id) : null;
      // Already committed submission retries return their existing result. A new
      // attempt or a still-unsubmitted draft must recheck its frozen association.
      if (job?.content_ref?.updateTaskId && (retry || job.status !== 'committed')) {
        await updates.validatePublication(job.content_ref.updateTaskId, { slug: job.content_ref.slug, scope: 'video', videoSha256: job.video.sha256 });
      }
    }
    return publishing.handle(request, response, context);
  };
}
