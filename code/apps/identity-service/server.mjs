import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { digest, equal, fail, identityContexts, loadClients, loadConfig, PKCE_VERIFIER, randomToken, TOKEN } from './config.mjs';
import { IdentityStore } from './store.mjs';
import { createManagement } from './management.mjs';

process.umask(0o077);
const SESSION_TTL = 7 * 24 * 3600 * 1000;
const FLOW_TTL = 10 * 60 * 1000;
const CODE_TTL = 60 * 1000;
const ACCESS_TTL = 3600 * 1000;
const BRIDGE_COOKIE = '__Host-herong_identity_bridge';
const BRIDGE_CHECKED_COOKIE = '__Host-herong_identity_bridge_checked';
const MAX_BODY = 65536;

function securityHeaders(response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Content-Security-Policy', "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
}

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function redirect(response, url) {
  response.writeHead(303, { Location: url });
  response.end();
}

function readCookie(request, name) {
  const values = (request.headers.cookie || '').split(';').map((value) => value.trim()).filter((value) => value.startsWith(`${name}=`));
  if (values.length !== 1) return null;
  const value = values[0].slice(name.length + 1);
  return TOKEN.test(value) ? value : null;
}

function setCookie(response, name, value, path, maxAge) {
  const existing = response.getHeader('Set-Cookie') || [];
  response.setHeader('Set-Cookie', [...(Array.isArray(existing) ? existing : [existing]), `${name}=${value}; Path=${path || '/'}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`]);
}

function single(params, name, required = true) {
  const values = params.getAll(name);
  if (values.length > 1 || (required && values.length !== 1)) throw fail(400, 'invalid_request', 'Missing or repeated authorization parameter');
  return values[0];
}

async function body(request) {
  const contentType = (request.headers['content-type'] || '').split(';', 1)[0].trim().toLowerCase();
  if (!['application/json', 'application/x-www-form-urlencoded'].includes(contentType)) throw fail(415, 'invalid_request', 'A JSON or form body is required');
  if (request.headers['content-encoding'] && request.headers['content-encoding'] !== 'identity') throw fail(415, 'invalid_request', 'Encoded request bodies are not supported');
  if (Number(request.headers['content-length']) > MAX_BODY) throw fail(413, 'invalid_request', 'Request is too large');
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY) throw fail(413, 'invalid_request', 'Request is too large');
    chunks.push(chunk);
  }
  const value = Buffer.concat(chunks).toString('utf8');
  if (contentType === 'application/x-www-form-urlencoded') {
    const parameters = new URLSearchParams(value);
    const output = Object.create(null);
    for (const [key, entry] of parameters) {
      if (Object.hasOwn(output, key)) throw fail(400, 'invalid_request', 'Repeated request parameter');
      output[key] = entry;
    }
    return output;
  }
  let input;
  try { input = JSON.parse(value); } catch { throw fail(400, 'invalid_request', 'Invalid JSON body'); }
  if (!input || Array.isArray(input) || typeof input !== 'object') throw fail(400, 'invalid_request', 'An object body is required');
  return input;
}

async function providerJson(response) {
  if (!response.ok || !response.body || Number(response.headers.get('content-length')) > MAX_BODY) throw new Error('Provider response failed');
  const reader = response.body.getReader();
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) throw new Error('Provider response exceeded limit');
      chunks.push(Buffer.from(value));
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } finally { await reader.cancel().catch(() => {}); }
}

function initialize() {
  const config = loadConfig();
  const store = new IdentityStore(config.dataDirectory);
  if (store.needsLegacyImport()) store.importLegacyClients(loadClients(config.clientsFile));
  const rateBuckets = new Map();
  let providerRequests = 0;

  async function fetchWechatProfile(identity) {
    if (providerRequests >= 4) return null;
    providerRequests++;
    try {
      const endpoint = new URL('https://api.weixin.qq.com/sns/userinfo');
      endpoint.search = new URLSearchParams({ access_token: identity.access_token, openid: identity.openid, lang: 'zh_CN' }).toString();
      const profile = await providerJson(await fetch(endpoint, { redirect: 'error', signal: AbortSignal.timeout(4000) }));
      return profile && !profile.errcode && profile.openid === identity.openid ? profile : null;
    } catch {
      // A transient profile failure must not turn a verified login into a failure.
      return null;
    } finally { providerRequests--; }
  }

  function rateLimit(category, max) {
    const now = Date.now();
    let bucket = rateBuckets.get(category);
    if (!bucket || now - bucket.started >= 60000) {
      bucket = { started: now, count: 0 };
      rateBuckets.set(category, bucket);
    }
    if (++bucket.count > max) throw fail(429, 'temporarily_unavailable', 'Too many requests; try again shortly');
  }

  function contextHandler(config) {
  const SESSION_COOKIE = config.isLegacy ? '__Secure-herong_identity' : '__Host-herong_identity';
  const FLOW_COOKIE = config.isLegacy ? '__Secure-herong_identity_wechat' : '__Host-herong_identity_wechat';

  function browserSession(request) {
    const token = readCookie(request, SESSION_COOKIE);
    if (!token) return null;
    const session = store.row('browser_sessions', digest(token));
    const user = session && store.getUser(session.subject);
    return session && user && user.status !== 'disabled' && (session.issuer || config.legacyIssuer) === config.issuer ? { ...session, hash: digest(token), user } : null;
  }

  function authorization(params) {
    const clientId = single(params, 'client_id');
    const redirectUri = single(params, 'redirect_uri');
    const client = store.getClient(clientId);
    if (!client?.enabled || !client.redirectUris.includes(redirectUri)) throw fail(400, 'invalid_client', 'Client or callback is not registered');
    const state = single(params, 'state');
    const challenge = single(params, 'code_challenge');
    const prompt = single(params, 'prompt', false);
    if (prompt !== undefined && prompt !== 'login') throw fail(400, 'invalid_request', 'Unsupported authorization prompt');
    if (single(params, 'response_type') !== 'code' || single(params, 'code_challenge_method') !== 'S256' || !TOKEN.test(challenge || '') || !/^[A-Za-z0-9_-]{32,256}$/.test(state || '')) throw fail(400, 'invalid_request', 'Authorization requires code, a random state and PKCE S256');
    return { clientId, redirectUri, state, challenge, ...(prompt ? { prompt } : {}) };
  }

  function registeredFlow(flow) {
    const client = store.getClient(flow.clientId);
    if (!client?.enabled || !client.redirectUris.includes(flow.redirectUri)) throw fail(400, 'invalid_client', 'Client or callback is no longer registered');
    return client;
  }

  function authorizationRedirect(response, flow, user, error) {
    const client = registeredFlow(flow);
    const url = new URL(flow.redirectUri);
    url.searchParams.set('state', flow.state);
    url.searchParams.set('iss', config.issuer);
    const access = user && store.accessForClient(client.clientId, user.id || user.subject);
    if (error || !access) {
      url.searchParams.set('error', error || 'access_denied');
    } else {
      const code = randomToken();
      store.put('authorization_codes', digest(code), Date.now() + CODE_TTL, { clientId: client.clientId, redirectUri: flow.redirectUri, challenge: flow.challenge, subject: user.id || user.subject, issuer: config.issuer }, 200);
      url.searchParams.set('code', code);
    }
    redirect(response, url.toString());
  }

  function backChannel(request) {
    // The credential-bearing endpoints are exclusively server-to-server, never CORS browser APIs.
    if (request.headers.origin || request.headers['sec-fetch-site'] || request.headers.cookie) throw fail(403, 'access_denied', 'A server-side request is required');
  }

  function authenticateClient(input) {
    const client = typeof input.client_id === 'string' ? store.getClient(input.client_id) : null;
    const secret = input.client_secret;
    const validFormat = typeof secret === 'string' && secret.length >= 32 && secret.length <= 512;
    const valid = validFormat && client && (equal(client.secretHash, digest(secret)) || (client.previousSecretUntil > Date.now() && equal(client.previousSecretHash, digest(secret))));
    if (!valid) { rateLimit('invalid-client', 120); throw fail(401, 'invalid_client', 'Client authentication failed'); }
    rateLimit(`back-channel:${client.clientId}`, 1200);
    return client;
  }

  function sameOrigin(request) {
    if (request.headers.origin !== config.origin || (request.headers['sec-fetch-site'] && request.headers['sec-fetch-site'] !== 'same-origin')) throw fail(403, 'access_denied', 'A same-origin request is required');
  }

  function clearSession(request, response) {
    const previous = readCookie(request, SESSION_COOKIE);
    if (previous) store.remove('browser_sessions', digest(previous));
    setCookie(response, SESSION_COOKIE, '', config.basePath, 0);
    if (!config.isLegacy) {
      setCookie(response, BRIDGE_COOKIE, '', '/', 0);
      setCookie(response, BRIDGE_CHECKED_COOKIE, randomToken(), '/', SESSION_TTL / 1000);
    }
  }

  function establishSession(request, response, user, sourceExpires = Date.now() + SESSION_TTL) {
    const previous = readCookie(request, SESSION_COOKIE);
    const value = randomToken();
    const expires = Math.min(sourceExpires, Date.now() + SESSION_TTL);
    if (expires <= Date.now()) return;
    store.transaction(() => {
      if (previous) store.remove('browser_sessions', digest(previous));
      store.put('browser_sessions', digest(value), expires, { subject: user.id || user.subject, csrfToken: randomToken(), issuer: config.issuer }, 1000);
    });
    setCookie(response, SESSION_COOKIE, value, config.basePath, Math.max(0, Math.floor((expires - Date.now()) / 1000)));
  }

  function startLogin(_request, response, flow) {
    const state = randomToken(), verifier = randomToken();
    store.put('wechat_flows', digest(state), Date.now() + FLOW_TTL, { ...flow, issuer: config.issuer, verifierHash: digest(verifier) }, 100);
    setCookie(response, FLOW_COOKIE, verifier, config.basePath, FLOW_TTL / 1000);
    const provider = new URL('https://open.weixin.qq.com/connect/qrconnect');
    provider.search = new URLSearchParams({ appid: config.appId, redirect_uri: config.callback, response_type: 'code', scope: 'snsapi_login', state }).toString();
    provider.hash = 'wechat_redirect';
    return provider.toString();
  }

  function finishLogin(response, flow, user, error) {
    if (flow.kind === 'console') {
      const allowed = user?.status === 'active' && ['platform_owner', 'platform_admin'].includes(user.platformRole);
      return redirect(response, `${config.basePath}/admin/${error || !allowed ? '?error=' + encodeURIComponent(error || 'access_denied') : ''}`);
    }
    if (flow.kind === 'invite') return redirect(response, `${config.basePath}/invite/?${error ? 'error=' + encodeURIComponent(error) : 'status=pending&invitation=' + encodeURIComponent(flow.claimedInviteId || '')}`);
    return authorizationRedirect(response, flow, user, error);
  }

  async function callback(request, response, parameters) {
    const state = single(parameters, 'state');
    if (!TOKEN.test(state || '')) throw fail(400, 'invalid_request', 'The login attempt expired; restart login from your application');
    const pending = store.row('wechat_flows', digest(state));
    const pendingIssuer = pending?.issuer || config.legacyIssuer;
    if (!pending) throw fail(400, 'invalid_request', 'The login attempt expired; restart login from your application');
    if (config.isLegacy && pendingIssuer === config.canonicalIssuer) {
      // The provider still returns to the approved dev callback domain. This step
      // grants nothing and consumes nothing: the canonical host must verify its cookie.
      const code = single(parameters, 'code', false);
      if (code !== undefined && !/^[A-Za-z0-9_-]{8,256}$/.test(code)) throw fail(400, 'invalid_request', 'Invalid provider callback');
      const target = new URL(`${config.canonicalIssuer}/wechat/callback`);
      target.searchParams.set('state', state);
      if (code !== undefined) target.searchParams.set('code', code);
      return redirect(response, target.toString());
    }
    if (pendingIssuer !== config.issuer) throw fail(400, 'invalid_request', 'Login callback host does not match the initiating host');
    const verifier = readCookie(request, FLOW_COOKIE);
    if (!TOKEN.test(state || '') || !verifier) throw fail(400, 'invalid_request', 'The login attempt expired; restart login from your application');
    const flow = store.transaction(() => {
      const saved = store.row('wechat_flows', digest(state));
      if (!saved || (saved.issuer || config.legacyIssuer) !== config.issuer || !equal(saved.verifierHash, digest(verifier))) throw fail(400, 'invalid_request', 'The login attempt expired; restart login from your application');
      // Consume even when the provider subsequently rejects a code or the user cancels.
      store.remove('wechat_flows', digest(state));
      return saved;
    });
    setCookie(response, FLOW_COOKIE, '', config.basePath, 0);
    rateLimit(`wechat-callback:${flow.clientId || flow.kind || 'oauth'}`, 60);
    if (!flow.kind || flow.kind === 'oauth') registeredFlow(flow);
    else if (!['console', 'invite'].includes(flow.kind)) throw fail(400, 'invalid_request', 'Invalid login flow');
    const code = single(parameters, 'code', false);
    if (!code || !/^[A-Za-z0-9_-]{8,256}$/.test(code)) return finishLogin(response, flow, null, 'access_denied');
    if (providerRequests >= 4) return finishLogin(response, flow, null, 'temporarily_unavailable');
    let identity;
    providerRequests++;
    try {
      const endpoint = new URL('https://api.weixin.qq.com/sns/oauth2/access_token');
      endpoint.search = new URLSearchParams({ appid: config.appId, secret: config.appSecret, code, grant_type: 'authorization_code' }).toString();
      identity = await providerJson(await fetch(endpoint, { redirect: 'error', signal: AbortSignal.timeout(10000) }));
      if (identity?.errcode || typeof identity?.access_token !== 'string' || !identity.access_token || identity.access_token.length > 4096 || !/^[A-Za-z0-9_-]{16,128}$/.test(identity?.openid || '')) throw new Error('Provider identity is invalid');
    } catch {
      return finishLogin(response, flow, null, 'temporarily_unavailable');
    } finally { providerRequests--; }
    let user;
    if (flow.kind === 'invite') {
      try {
        const claimed = store.claimInvite({ tokenHash: flow.tokenHash, wechatAppId: config.appId, openid: identity.openid, name: flow.name });
        flow.claimedInviteId = claimed.inviteId;
        user = store.getUser(claimed.sub);
      } catch { return finishLogin(response, flow, null, 'invite_unavailable'); }
    } else user = store.findWechatUser(config.appId, identity.openid);
    if (!user || user.status === 'disabled') { identity = null; return finishLogin(response, flow, null, 'access_denied'); }
    try {
      const profile = await fetchWechatProfile(identity);
      if (profile) store.updateWechatProfile(config.appId, identity.openid, profile);
    } catch {
      // Invalid optional fields or a failed profile write preserve existing account data.
    } finally {
      // Never put provider access/refresh tokens into a database, session, or log.
      identity = null;
    }
    // Permissions or status may have changed while the optional network call was pending.
    user = store.getUser(user.id || user.subject);
    if (!user || user.status === 'disabled') return finishLogin(response, flow, null, 'access_denied');
    if ((!flow.kind || flow.kind === 'oauth') && !store.accessForClient(flow.clientId, user.id || user.subject)) return finishLogin(response, flow, null, 'access_denied');
    establishSession(request, response, user);
    return finishLogin(response, flow, user);
  }

  function beginSessionBridge(request, response, target = { kind: 'console' }) {
    if (config.isLegacy || browserSession(request) || readCookie(request, BRIDGE_CHECKED_COOKIE)) return false;
    rateLimit('session-bridge-start', 120);
    const state = randomToken(), verifier = randomToken();
    store.put('session_bridges', digest(state), Date.now() + 90000, {
      issuer: config.canonicalIssuer, verifierHash: digest(verifier), target, phase: 'new',
    }, 500);
    setCookie(response, BRIDGE_COOKIE, verifier, '/', 90);
    const destination = new URL(`${config.legacyIssuer}/session/bridge`);
    destination.searchParams.set('state', state);
    redirect(response, destination.toString());
    return true;
  }

  function issueSessionHandoff(request, response, parameters) {
    const state = single(parameters, 'state');
    if (!TOKEN.test(state || '')) throw fail(400, 'invalid_request', 'Invalid session bridge');
    const session = browserSession(request);
    const ticket = randomToken();
    store.transaction(() => {
      const bridge = store.row('session_bridges', digest(state));
      if (!bridge || bridge.issuer !== config.canonicalIssuer || bridge.phase !== 'new' || !['console', 'oauth', 'invite'].includes(bridge.target?.kind)) throw fail(400, 'invalid_request', 'Session bridge expired; return to the new login page');
      store.put('session_handoffs', digest(ticket), Math.min(bridge.expires, Date.now() + 60000), {
        issuer: config.canonicalIssuer, bridgeHash: digest(state),
        subject: session?.user.subject || null, legacySessionHash: session?.hash || null,
      }, 500);
      store.remove('session_bridges', digest(state));
      store.put('session_bridges', digest(state), bridge.expires, { ...bridge, phase: 'issued' }, 500);
    });
    const destination = new URL(`${config.canonicalIssuer}/session/bridge/finish`);
    destination.searchParams.set('ticket', ticket);
    redirect(response, destination.toString());
  }

  function finishSessionBridge(request, response, parameters) {
    const ticket = single(parameters, 'ticket');
    const verifier = readCookie(request, BRIDGE_COOKIE);
    if (!TOKEN.test(ticket || '') || !verifier) throw fail(400, 'invalid_request', 'Session bridge expired; return to the new login page');
    const result = store.transaction(() => {
      const handoff = store.row('session_handoffs', digest(ticket));
      const bridge = handoff && store.row('session_bridges', handoff.bridgeHash);
      if (!handoff || handoff.issuer !== config.canonicalIssuer || !bridge || bridge.phase !== 'issued' || bridge.issuer !== config.canonicalIssuer || !equal(bridge.verifierHash, digest(verifier))) throw fail(400, 'invalid_request', 'Session bridge expired; return to the new login page');
      store.remove('session_handoffs', digest(ticket));
      store.remove('session_bridges', handoff.bridgeHash);
      // Session revocation between departure and arrival must invalidate the transfer.
      const original = handoff.legacySessionHash && store.row('browser_sessions', handoff.legacySessionHash);
      const user = original && original.subject === handoff.subject && (original.issuer || config.legacyIssuer) === config.legacyIssuer ? store.getUser(handoff.subject) : null;
      return { target: bridge.target, user: user?.status !== 'disabled' ? user : null, sourceExpires: original?.expires };
    });
    setCookie(response, BRIDGE_COOKIE, '', '/', 0);
    setCookie(response, BRIDGE_CHECKED_COOKIE, randomToken(), '/', 300);
    const existing = browserSession(request);
    if (!existing && result.user) establishSession(request, response, result.user, result.sourceExpires);
    const user = existing?.user || result.user;
    if (result.target.kind === 'oauth') {
      const flow = result.target.flow;
      registeredFlow(flow);
      if (user && user.profileUpdatedAt != null) return authorizationRedirect(response, flow, user);
      return redirect(response, startLogin(request, response, { ...flow, kind: 'oauth' }));
    }
    if (result.target.kind === 'invite' && /^[A-Za-z0-9_-]{16,128}$/.test(result.target.invitationId || '')) {
      const destination = new URL(`${config.canonicalIssuer}/invite/`);
      destination.searchParams.set('status', 'pending');
      destination.searchParams.set('invitation', result.target.invitationId);
      return redirect(response, destination.toString());
    }
    // No old session means the canonical login page, never an automatic WeChat redirect.
    return redirect(response, `${config.canonicalIssuer}/admin/`);
  }

  const management = createManagement({ config, store, browserSession, startLogin, clearSession, sameOrigin, body, json, redirect, rateLimit });

  async function handle(request, response) {
    securityHeaders(response);
    if (request.headers.host !== config.host || !request.url?.startsWith('/') || request.url.startsWith('//') || request.url.length > 8192) throw fail(400, 'invalid_request', 'Invalid request address');
    const url = new URL(request.url, config.origin);
    if (url.origin !== config.origin) throw fail(400, 'invalid_request', 'Invalid request address');
    const path = url.pathname;
    if (config.isLegacy && path === `${config.basePath}/session/bridge` && request.method === 'GET') return issueSessionHandoff(request, response, url.searchParams);
    if (!config.isLegacy && path === '/session/bridge/finish' && request.method === 'GET') return finishSessionBridge(request, response, url.searchParams);
    if (!config.isLegacy && path === '/session/bridge/start' && request.method === 'GET') {
      if (url.search) throw fail(400, 'invalid_request', 'Session bridge does not accept a return URL');
      if (beginSessionBridge(request, response)) return;
      return redirect(response, '/admin/');
    }
    if (!config.isLegacy && request.method === 'GET' && ['/', '/admin', '/admin/'].includes(path)) {
      if (beginSessionBridge(request, response)) return;
      if (path !== '/admin/') return redirect(response, '/admin/');
    }
    if (!config.isLegacy && request.method === 'GET' && path === '/invite/' && !browserSession(request)) {
      const invitationId = single(url.searchParams, 'invitation', false);
      if (/^[A-Za-z0-9_-]{16,128}$/.test(invitationId || '') && beginSessionBridge(request, response, { kind: 'invite', invitationId })) return;
    }
    if (await management(request, response, url)) return;
    if (path === `${config.basePath}/health` && request.method === 'GET') {
      const ready = store.hasActivePlatformOwner();
      return json(response, ready ? 200 : 503, { service: 'herong-identity', ready });
    }
    if (path === `${config.basePath}/authorize` && request.method === 'GET') {
      const flow = authorization(url.searchParams);
      rateLimit(`authorize:${flow.clientId}`, 60);
      if (!store.hasActivePlatformOwner()) throw fail(503, 'temporarily_unavailable', 'Identity owner is not available');
      const session = flow.prompt === 'login' ? null : browserSession(request);
      if (session) {
        if (session.user.profileUpdatedAt != null) return authorizationRedirect(response, flow, session.user);
        // Re-authorize legacy accounts once to obtain their optional display profile.
        return redirect(response, startLogin(request, response, { ...flow, kind: 'oauth' }));
      }
      if (flow.prompt !== 'login' && beginSessionBridge(request, response, { kind: 'oauth', flow })) return;
      return redirect(response, startLogin(request, response, { ...flow, kind: 'oauth' }));
    }
    if (path === `${config.basePath}/wechat/callback` && request.method === 'GET') return callback(request, response, url.searchParams);
    if (path === `${config.basePath}/session` && request.method === 'GET') {
      if ((request.headers.origin && request.headers.origin !== config.origin) || (request.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(request.headers['sec-fetch-site']))) throw fail(403, 'access_denied', 'A same-origin request is required');
      const session = browserSession(request);
      return json(response, 200, session ? { authenticated: true, sub: session.user.id || session.user.subject, name: session.user.name, nickname: session.user.nickname, avatarUrl: session.user.avatarUrl, profileUpdatedAt: session.user.profileUpdatedAt, csrfToken: session.csrfToken } : { authenticated: false });
    }
    if (path === `${config.basePath}/logout` && request.method === 'POST') {
      sameOrigin(request);
      const session = browserSession(request);
      if (!session || !equal(session.csrfToken, request.headers['x-identity-csrf'])) throw fail(403, 'access_denied', 'A valid session and CSRF token are required');
      clearSession(request, response);
      return json(response, 200, { ok: true });
    }
    if ([`${config.basePath}/token`, `${config.basePath}/introspect`, `${config.basePath}/revoke`].includes(path) && request.method === 'POST') {
      if (url.search) throw fail(400, 'invalid_request', 'Credentials must be sent in the request body');
      backChannel(request);
      const input = await body(request);
      const client = authenticateClient(input);
      if (path.endsWith('/token')) {
        if (input.grant_type !== undefined && input.grant_type !== 'authorization_code') throw fail(400, 'unsupported_grant_type', 'Only authorization_code is supported');
        if (typeof input.code !== 'string' || !TOKEN.test(input.code) || typeof input.code_verifier !== 'string' || !PKCE_VERIFIER.test(input.code_verifier) || typeof input.redirect_uri !== 'string') throw fail(400, 'invalid_grant', 'Authorization code is invalid or expired');
        const challenge = createHash('sha256').update(input.code_verifier).digest('base64url');
        const result = store.transaction(() => {
          const grant = store.row('authorization_codes', digest(input.code));
          const access = grant && store.accessForClient(client.clientId, grant.subject);
          if (!grant || (grant.issuer || config.legacyIssuer) !== config.issuer || grant.clientId !== client.clientId || grant.redirectUri !== input.redirect_uri || !client.redirectUris.includes(input.redirect_uri) || !equal(grant.challenge, challenge) || !access) throw fail(400, 'invalid_grant', 'Authorization code is invalid or expired');
          store.remove('authorization_codes', digest(input.code));
          const accessToken = randomToken();
          store.put('access_tokens', digest(accessToken), Date.now() + ACCESS_TTL, { clientId: client.clientId, subject: grant.subject }, 1000);
          return { issuer: config.issuer, sub: grant.subject, name: access.user.name, nickname: access.user.nickname, avatarUrl: access.user.avatarUrl, profileUpdatedAt: access.user.profileUpdatedAt, role: access.role, permissions: access.permissions, client_id: client.clientId, access_token: accessToken, token_type: 'Bearer', expires_in: ACCESS_TTL / 1000 };
        });
        return json(response, 200, result);
      }
      const token = typeof input.token === 'string' && TOKEN.test(input.token) ? input.token : null;
      const access = token ? store.row('access_tokens', digest(token)) : null;
      if (path.endsWith('/revoke')) {
        if (access?.clientId === client.clientId) store.remove('access_tokens', digest(token));
        return json(response, 200, {});
      }
      const authorized = access && access.clientId === client.clientId && store.accessForClient(client.clientId, access.subject);
      return json(response, 200, authorized ? { active: true, issuer: config.issuer, sub: access.subject, name: authorized.user.name, nickname: authorized.user.nickname, avatarUrl: authorized.user.avatarUrl, profileUpdatedAt: authorized.user.profileUpdatedAt, role: authorized.role, permissions: authorized.permissions, client_id: client.clientId, exp: Math.floor(access.expires / 1000), expires_in: Math.max(0, Math.floor((access.expires - Date.now()) / 1000)) } : { active: false });
    }
    throw fail(404, 'not_found', 'Unknown identity endpoint');
  }
  return handle;
  }

  const handlers = new Map(identityContexts(config).map((context) => [context.host, contextHandler(context)]));

  const server = createServer({ maxHeaderSize: 16384 }, (request, response) => {
    const handle = handlers.get(request.headers.host);
    if (!handle) { securityHeaders(response); return json(response, 400, { error: 'invalid_request', error_description: 'Invalid request host' }); }
    handle(request, response).catch((error) => {
      if (response.headersSent || response.destroyed) return response.destroy();
      const expected = Number.isInteger(error.status) && error.publicMessage;
      const status = expected ? error.status : 503;
      if (status === 429) response.setHeader('Retry-After', '60');
      if (!expected) process.stderr.write('Identity request failed; no request parameters or provider response were logged.\n');
      json(response, status, { error: expected ? error.code : 'temporarily_unavailable', error_description: expected ? error.publicMessage : 'Identity service is temporarily unavailable' });
    });
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.keepAliveTimeout = 5000;
  server.timeout = 20000;
  server.maxConnections = 128;
  server.maxRequestsPerSocket = 100;
  server.on('clientError', (_error, socket) => { if (!socket.destroyed) socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n'); });
  server.on('error', () => { process.stderr.write('Identity listener failed.\n'); process.exitCode = 1; });
  const cleanup = setInterval(() => {
    try { store.cleanup(); } catch { process.stderr.write('Identity expiration cleanup failed.\n'); }
  }, 60000);
  cleanup.unref();
  server.listen(config.port, '127.0.0.1', () => process.stdout.write('Herong identity service listening on the configured loopback port.\n'));
  let stopping = false;
  function stop() {
    if (stopping) return;
    stopping = true;
    clearInterval(cleanup);
    server.close(() => { store.close(); });
    setTimeout(() => process.exit(0), 12000).unref();
  }
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

try { initialize(); } catch {
  process.stderr.write('Identity service configuration or database initialization failed. No configuration values were logged.\n');
  process.exitCode = 1;
}
