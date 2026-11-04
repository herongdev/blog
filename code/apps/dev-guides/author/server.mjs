import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { createAuthorServer } from './server-core.mjs';
import { createPublishingService } from './publishing/service.mjs';
import { createArticleRevisions } from './article-revisions.mjs';
import { createContentWorkspace } from './content-workspace.mjs';
import { createWorkspaceHandler } from './workspace-api.mjs';
import { createPublishManager } from './publish-manager.mjs';
import { createLocalSitePreview } from './local-site-preview.mjs';

const authorRoot = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(process.env.DEV_GUIDES_AUTHOR_PROJECT_ROOT || resolve(authorRoot, '..'));
const mediaEnvPath = resolve(projectRoot, '.env.media.local');
if (existsSync(mediaEnvPath)) process.loadEnvFile(mediaEnvPath);
const port = Number(process.env.DEV_GUIDES_AUTHOR_PORT ?? 4331);

if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('DEV_GUIDES_AUTHOR_PORT 必须是 1024–65535 的端口');
}

let vite;
const publishing = await createPublishingService({
  dataRoot: resolve(process.env.PUBLISHER_DATA_DIR || resolve(projectRoot, '.publishing-private')),
  env: process.env,
});
const revisions = await createArticleRevisions({ projectRoot });
const workspace = await createContentWorkspace({ projectRoot });
let manager, sitePreview;
if (process.env.DEV_GUIDES_AUTHOR_ENABLE_SITE_PREVIEW === 'true') {
  if (!process.env.DEV_GUIDES_AUTHOR_PROJECT_ROOT) throw new Error('网站预览必须使用独立的数据副本');
  const stateRoot = resolve(projectRoot, '.content-workspace/site-publish');
  const profiles = {
    staging: { root: resolve(stateRoot, 'staging'), site: 'https://test-dev.herong.info', basePath: '/' },
    production: { root: resolve(stateRoot, 'production'), site: 'https://dev.herong.info', basePath: '/' },
  };
  manager = await createPublishManager({ projectRoot: resolve(authorRoot, '..'), contentRoot: resolve(projectRoot, 'src/content/tutorials'), stateRoot, profiles, articleRevisions: revisions });
  sitePreview = await createLocalSitePreview({ profiles, ports: { staging: Number(process.env.AUTHOR_LOCAL_STAGING_PORT || port + 1), production: Number(process.env.AUTHOR_LOCAL_PRODUCTION_PORT || port + 2) } });
}
const server = createAuthorServer({
  projectRoot,
  articleRevisions: revisions,
  apiHandler: createWorkspaceHandler({ workspace, revisions, publishing, manager, localOnly: true, previewOrigins: sitePreview?.origins }),
  frontend: (request, response) => vite.middlewares(request, response, () => {
    if (!response.headersSent) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('页面不存在');
    }
  }),
});

server.requestTimeout = Number(process.env.PUBLISHER_UPLOAD_TIMEOUT_MS || 20 * 60_000);
vite = await createViteServer({
  root: authorRoot,
  appType: 'spa',
  server: { middlewareMode: { server } },
});

server.listen(port, '127.0.0.1', () => {
  console.log(`教程写作： http://127.0.0.1:${port}/`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    await publishing.close();
    await workspace.close();
    await sitePreview?.close();
    await vite.close();
    server.close();
  });
}
