import { join } from 'node:path';
import { realpath } from 'node:fs/promises';
import { createProductionService } from './production-service.mjs';
import { createProductionMcpAuth } from './production-mcp-auth.mjs';
import { createProductionMcp } from './production-mcp.mjs';

/** Keep all connection credentials server-side and disabled until clients are explicitly configured. */
export async function createProductionRuntime({ projectRoot, workspace, revisions, origin, basePath = '/', env = process.env, localOnly = false }) {
  projectRoot = await realpath(projectRoot);
  let clients = [];
  if (env.AUTHOR_PRODUCTION_MCP_CLIENTS_JSON) {
    try { clients = JSON.parse(env.AUTHOR_PRODUCTION_MCP_CLIENTS_JSON); }
    catch { throw new Error('AUTHOR_PRODUCTION_MCP_CLIENTS_JSON 必须为合法 JSON'); }
    if (!Array.isArray(clients)) throw new Error('MCP 客户端配置必须为数组');
  }
  const service = await createProductionService({ projectRoot, workspace, revisions });
  let auth;
  try {
    auth = createProductionMcpAuth({
      path: join(projectRoot, '.production-workflow', 'oauth.sqlite'),
      issuer: origin + basePath + 'production-oauth', resource: origin + basePath + 'api/production-mcp',
      clients, actorId: localOnly ? 'local-author' : 'administrator', allowLoopback: localOnly,
    });
    const mcp = createProductionMcp({ service, auth, basePath });
    return {
      service, mcp,
      async handle(request, response, context) {
        if (context.url.pathname === '/api/production-mcp/status') {
          if (request.method !== 'GET') throw Object.assign(new Error('请求方式不支持'), { status: 405 });
          context.sendJson(response, 200, mcp.status()); return true;
        }
        return service.handle(request, response, context);
      },
      close() { auth.close(); service.close(); },
    };
  } catch (error) { auth?.close(); service.close(); throw error; }
}
