import { randomBytes } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { digest, equal, fail, TOKEN } from './config.mjs';

const PUBLIC = resolve(process.env.IDENTITY_PUBLIC_DIR || resolve(dirname(fileURLToPath(import.meta.url)), 'public'));
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const roles = [
  { key: 'owner', label: '应用所有者' }, { key: 'admin', label: '管理员' },
  { key: 'editor', label: '编辑' }, { key: 'viewer', label: '只读' },
];
const publicUser = (user) => ({ id: user.id || user.subject, name: user.name, nickname: user.nickname, avatarUrl: user.avatarUrl, profileUpdatedAt: user.profileUpdatedAt, status: user.status, platformRole: user.platformRole, version: user.version, createdAt: user.createdAt });
const publicClient = (client) => {
  if (!client) return null;
  const { secretHash, previousSecretHash, ...rest } = client;
  return rest;
};
function pageOptions(url) {
  const page = Number(url.searchParams.get('page') || 1);
  const pageSize = Number(url.searchParams.get('pageSize') || 20);
  if (!Number.isSafeInteger(page) || page < 1 || page > 10000 || !Number.isSafeInteger(pageSize) || pageSize < 1 || pageSize > 100) throw fail(400, 'invalid_request', '分页参数有误。');
  const q = url.searchParams.get('q') || '';
  if (q.length > 100) throw fail(400, 'invalid_request', '搜索内容过长。');
  return { page, pageSize, q, status: url.searchParams.get('status') || undefined, appId: url.searchParams.get('appId') || undefined };
}
async function serveStatic(response, path, prefix) {
  let file = 'index.html';
  if (path.startsWith(`${prefix}/admin/assets/`)) {
    const relative = path.slice(`${prefix}/admin/`.length);
    if (!/^assets\/[A-Za-z0-9._/-]+$/.test(relative) || relative.split('/').some((part) => part.startsWith('.'))) throw fail(404, 'not_found', '文件不存在。');
    file = relative;
  } else if (![`${prefix}/admin/`, `${prefix}/invite/`].includes(path)) {
    throw fail(404, 'not_found', '页面不存在。');
  }
  const target = resolve(PUBLIC, file);
  if (!target.startsWith(PUBLIC + sep)) throw fail(404, 'not_found', '文件不存在。');
  let content;
  try { const info = await stat(target); if (!info.isFile() || info.size > 2 * 1024 * 1024) throw new Error('Invalid asset'); content = await readFile(target); }
  catch { throw fail(404, 'not_found', '页面尚不可用，请稍后重试。'); }
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https://wx.qlogo.cn https://thirdwx.qlogo.cn; font-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; object-src 'none'");
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.writeHead(200, { 'Content-Type': MIME[extname(target)] || 'application/octet-stream' });
  response.end(content);
}

export function createManagement({ config, store, browserSession, startLogin, clearSession, sameOrigin, body, json, redirect, rateLimit }) {
  const prefix = config.basePath;
  const api = `${prefix}/admin/api`;
  async function versionedBody(request, allowNew = false) {
    const input = await body(request);
    if (!Number.isSafeInteger(input.version) || input.version < (allowNew ? 0 : 1)) throw fail(400, 'version_required', '请刷新页面后重新提交，当前记录缺少有效版本号。');
    return input;
  }
  const configuration = (client) => ({
    issuer: config.issuer, clientId: client.clientId, redirectUris: client.redirectUris,
    authorizationEndpoint: `${config.issuer}/authorize`, tokenEndpoint: `${config.issuer}/token`,
    introspectionEndpoint: `${config.issuer}/introspect`, revocationEndpoint: `${config.issuer}/revoke`,
    responseType: 'code', codeChallengeMethod: 'S256', clientAuthentication: 'client_secret_post',
  });
  function administrator(request, mutation) {
    const current = browserSession(request);
    if (!current) throw fail(401, 'login_required', '请先使用微信登录。');
    if (current.user.status !== 'active' || !['platform_owner', 'platform_admin'].includes(current.user.platformRole)) throw fail(403, 'access_denied', '当前账号没有管理中心权限。');
    if (mutation) {
      sameOrigin(request);
      if (!equal(current.csrfToken, request.headers['x-identity-csrf'])) throw fail(403, 'csrf_invalid', '页面验证已失效，请刷新后重试。');
    }
    return current;
  }
  return async function handleManagement(request, response, url) {
    const path = url.pathname;
    if (config.isLegacy && ['GET', 'HEAD'].includes(request.method)
        && ([`${prefix}/admin`, `${prefix}/admin/`, `${prefix}/invite`, `${prefix}/invite/`].includes(path) || path.startsWith(`${prefix}/admin/assets/`))) {
      let destinationPath = path.slice(prefix.length);
      if (['/admin', '/invite'].includes(destinationPath)) destinationPath += '/';
      const destination = new URL(destinationPath, config.canonicalIssuer);
      destination.search = url.search;
      // Do not set an empty fragment: browsers preserve the invitation fragment on redirect.
      redirect(response, destination.toString());
      return true;
    }
    if ([`${prefix}/admin`, `${prefix}/invite`].includes(path) && request.method === 'GET') { redirect(response, `${path}/`); return true; }
    if ((path === `${prefix}/admin/` || path === `${prefix}/invite/` || path.startsWith(`${prefix}/admin/assets/`)) && ['GET', 'HEAD'].includes(request.method)) {
      await serveStatic(response, path, prefix); return true;
    }
    if (path === `${prefix}/invite/info` && request.method === 'POST') {
      sameOrigin(request); rateLimit('invite-info', 60);
      const input = await body(request);
      const invite = typeof input.token === 'string' && TOKEN.test(input.token) ? store.publicInvite(digest(input.token)) : null;
      if (!invite) throw fail(404, 'invite_unavailable', '邀请链接已失效、已使用或已被撤销，请联系邀请人。');
      json(response, 200, invite); return true;
    }
    if (path === `${prefix}/invite/start` && request.method === 'POST') {
      sameOrigin(request); rateLimit('invite-start', 30);
      const input = await body(request);
      if (typeof input.token !== 'string' || !TOKEN.test(input.token) || typeof input.name !== 'string' || !input.name.trim() || input.name.trim().length > 80 || /[\u0000-\u001f\u007f]/.test(input.name)) throw fail(400, 'invalid_request', '请使用有效的邀请链接并填写姓名。');
      const tokenHash = digest(input.token);
      if (!store.publicInvite(tokenHash)) throw fail(404, 'invite_unavailable', '邀请链接已失效，请联系邀请人。');
      json(response, 200, { url: startLogin(request, response, { kind: 'invite', tokenHash, name: input.name.trim() }) }); return true;
    }
    if (path === `${prefix}/invite/status` && request.method === 'GET') {
      if ((request.headers.origin && request.headers.origin !== config.origin) || (request.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(request.headers['sec-fetch-site']))) throw fail(403, 'access_denied', '请求来源不允许。');
      const current = browserSession(request);
      if (!current) throw fail(401, 'login_required', '登录已过期，请联系邀请人。');
      const inviteId = url.searchParams.get('invitation') || '';
      const item = /^[A-Za-z0-9_-]{16,128}$/.test(inviteId) && store.getInviteForSubject(inviteId, current.user.id || current.user.subject);
      if (!item) throw fail(404, 'not_found', '未找到属于当前账号的邀请。');
      json(response, 200, item); return true;
    }
    if (!path.startsWith(api + '/')) return false;
    if (path === `${api}/session` && request.method === 'GET') {
      if ((request.headers.origin && request.headers.origin !== config.origin) || (request.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(request.headers['sec-fetch-site']))) throw fail(403, 'access_denied', '请求来源不允许。');
      const current = browserSession(request);
      const authorized = current?.user.status === 'active' && ['platform_owner', 'platform_admin'].includes(current.user.platformRole);
      json(response, 200, { authenticated: Boolean(authorized), ...(current ? { user: publicUser(current.user), csrfToken: current.csrfToken } : {}), issuer: config.issuer, roles }); return true;
    }
    if (path === `${api}/login` && request.method === 'POST') {
      sameOrigin(request); rateLimit('console-login', 30);
      const current = browserSession(request);
      const target = current?.user.status === 'active' && ['platform_owner', 'platform_admin'].includes(current.user.platformRole) && current.user.profileUpdatedAt != null
        ? `${prefix}/admin/` : startLogin(request, response, { kind: 'console' });
      json(response, 200, { url: new URL(target, config.origin).href }); return true;
    }
    if (path === `${api}/logout` && request.method === 'POST') {
      sameOrigin(request);
      const current = browserSession(request);
      if (current && !equal(current.csrfToken, request.headers['x-identity-csrf'])) throw fail(403, 'csrf_invalid', '页面验证已失效，请刷新后重试。');
      clearSession(request, response); json(response, 200, { ok: true }); return true;
    }
    if (path === `${api}/profile/refresh` && request.method === 'POST') {
      sameOrigin(request);
      const current = browserSession(request);
      if (!current) throw fail(401, 'login_required', '请先使用微信登录。');
      if (!equal(current.csrfToken, request.headers['x-identity-csrf'])) throw fail(403, 'csrf_invalid', '页面验证已失效，请刷新后重试。');
      rateLimit('console-profile-refresh', 30);
      json(response, 200, { url: startLogin(request, response, { kind: 'console' }) }); return true;
    }
    const current = administrator(request, !['GET', 'HEAD'].includes(request.method));
    const actor = current.user.id || current.user.subject;
    rateLimit('console-requests', 600);
    if (path === `${api}/apps` && request.method === 'GET') { json(response, 200, store.listApps(actor, pageOptions(url))); return true; }
    if (path === `${api}/users` && request.method === 'GET') { json(response, 200, store.listUsers(actor, pageOptions(url))); return true; }
    if (path === `${api}/invites` && request.method === 'GET') { json(response, 200, store.listInvites(actor, pageOptions(url))); return true; }
    if (path === `${api}/audit` && request.method === 'GET') { json(response, 200, store.listAudit(actor, pageOptions(url))); return true; }
    if (path === `${api}/apps` && request.method === 'POST') { const input = await body(request); json(response, 201, { item: store.createApp(actor, { ...input, slug: input.slug ?? input.id }) }); return true; }
    if (path === `${api}/invites` && request.method === 'POST') {
      const input = await body(request); const rawToken = randomBytes(32).toString('base64url');
      const item = store.createInvite(actor, { ...input, tokenHash: digest(rawToken) });
      const target = new URL('/invite/', config.canonicalIssuer); target.hash = new URLSearchParams({ token: rawToken }).toString();
      json(response, 201, { item, url: target.href }); return true;
    }
    let match;
    if ((match = path.match(new RegExp(`^${api}/apps/([a-z][a-z0-9_-]{1,63})$`))) && request.method === 'PATCH') { json(response, 200, { item: store.updateApp(actor, match[1], await versionedBody(request)) }); return true; }
    if ((match = path.match(new RegExp(`^${api}/apps/([a-z][a-z0-9_-]{1,63})/clients$`)))) {
      if (request.method === 'GET') { const result = store.listClients(actor, { ...pageOptions(url), appId: match[1] }); json(response, 200, { ...result, items: result.items.map((item) => ({ ...publicClient(item), configuration: configuration(item) })) }); return true; }
      if (request.method === 'POST') {
        const input = await body(request); const secret = randomBytes(48).toString('base64url');
        const client = store.createClient(actor, { ...input, appId: match[1], secretHash: digest(secret) });
        json(response, 201, { item: publicClient(client), secret, configuration: configuration(client) }); return true;
      }
    }
    if ((match = path.match(new RegExp(`^${api}/clients/([a-z][a-z0-9_-]{1,63})$`))) && request.method === 'PATCH') { const client = store.updateClient(actor, match[1], await versionedBody(request)); json(response, 200, { item: publicClient(client), configuration: configuration(client) }); return true; }
    if ((match = path.match(new RegExp(`^${api}/clients/([a-z][a-z0-9_-]{1,63})/rotate-secret$`))) && request.method === 'POST') {
      const input = await versionedBody(request); const secret = randomBytes(48).toString('base64url');
      const client = store.rotateClientSecret(actor, match[1], digest(secret), input);
      json(response, 200, { item: publicClient(client), secret, previousSecretUntil: client.previousSecretUntil, configuration: configuration(client) }); return true;
    }
    if ((match = path.match(new RegExp(`^${api}/apps/([a-z][a-z0-9_-]{1,63})/members$`))) && request.method === 'GET') { json(response, 200, store.listMemberships(actor, { ...pageOptions(url), appId: match[1] })); return true; }
    if ((match = path.match(new RegExp(`^${api}/apps/([a-z][a-z0-9_-]{1,63})/members/([A-Za-z0-9_-]{16,128})$`))) && request.method === 'PUT') { json(response, 200, { item: store.setMembership(actor, { ...await versionedBody(request, true), appId: match[1], userId: match[2] }) }); return true; }
    if ((match = path.match(new RegExp(`^${api}/users/([A-Za-z0-9_-]{16,128})$`))) && request.method === 'PATCH') { json(response, 200, { item: store.updateUser(actor, match[1], await versionedBody(request)) }); return true; }
    if ((match = path.match(new RegExp(`^${api}/users/([A-Za-z0-9_-]{16,128})/revoke-sessions$`))) && request.method === 'POST') { store.revokeUserSessions(actor, match[1], await versionedBody(request)); json(response, 200, { ok: true }); return true; }
    if ((match = path.match(new RegExp(`^${api}/invites/([A-Za-z0-9_-]{16,128})/(approve|revoke)$`))) && request.method === 'POST') {
      const input = await versionedBody(request);
      const item = match[2] === 'approve' ? store.approveInvite(actor, match[1], input) : store.revokeInvite(actor, match[1], input);
      json(response, 200, { item }); return true;
    }
    throw fail(404, 'not_found', '接口不存在。');
  };
}
