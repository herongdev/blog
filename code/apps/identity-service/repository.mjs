import { randomUUID } from 'node:crypto';
import { fail, randomToken } from './config.mjs';

const ROLES = new Set(['owner', 'admin', 'editor', 'viewer']);
const PLATFORM_ROLES = new Set(['platform_owner', 'platform_admin']);
const HASH = /^[a-f0-9]{64}$/;
const INVITE_TTL = 7 * 24 * 3600 * 1000;
const SECRET_GRACE = 3600 * 1000;
const WECHAT_AVATAR_HOSTS = new Set(['wx.qlogo.cn', 'thirdwx.qlogo.cn']);
const DISKTRACE_CATALOG = [
  { key: 'disktrace.overview.read', label: '查看版本与下载情况', roles: ['owner', 'admin', 'editor', 'viewer'] },
  { key: 'disktrace.release.write', label: '修改版本说明', roles: ['owner', 'admin', 'editor'] },
];

function invalid(message) { return fail(400, 'invalid_request', message); }
function identifier(value, label = '标识') {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{2,128}$/.test(value)) throw invalid(`${label}无效`);
  return value;
}
function label(value, maximum = 100, allowEmpty = false) {
  if (typeof value !== 'string' || value.length > maximum || /[\u0000-\u001f\u007f]/.test(value) || (!allowEmpty && !value.trim())) throw invalid('名称或说明格式无效');
  return value.trim();
}
function wechatAvatar(value) {
  if (value === '') return '';
  if (typeof value !== 'string' || value.length > 2048 || /[\s\u0000-\u001f\u007f]/.test(value)) return null;
  let url;
  try { url = new URL(value); } catch { return null; }
  // Check the literal authority too: URL normalizes explicit default ports away.
  if (!/^https?:\/\/(?:wx|thirdwx)\.qlogo\.cn\//.test(value) || !['http:', 'https:'].includes(url.protocol) || !WECHAT_AVATAR_HOSTS.has(url.hostname)
      || url.username || url.password || url.port || url.search || url.hash || url.pathname === '/' || url.href !== value) return null;
  // Older provider responses can use HTTP; never persist or expose that scheme.
  url.protocol = 'https:';
  return url.href;
}
function role(value) { if (!ROLES.has(value)) throw invalid('应用角色无效'); return value; }
function hash(value) { if (typeof value !== 'string' || !HASH.test(value)) throw invalid('凭据摘要无效'); return value; }
function homepage(value = '') {
  if (value === '') return '';
  if (typeof value !== 'string' || value.length > 2048) throw invalid('应用主页地址无效');
  let url;
  try { url = new URL(value); } catch { throw invalid('应用主页地址无效'); }
  if (url.protocol !== 'https:' || url.username || url.password) throw invalid('应用主页需使用 HTTPS');
  return url.toString();
}
function redirects(value) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 8) throw invalid('请设置 1 到 8 个回调地址');
  return [...new Set(value.map((entry) => {
    if (typeof entry !== 'string' || entry.length > 2048) throw invalid('回调地址无效');
    let url;
    try { url = new URL(entry); } catch { throw invalid('回调地址无效'); }
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.toString() !== entry) throw invalid('回调必须为完整 HTTPS 地址，不能含查询参数或片段');
    return entry;
  }))];
}
function catalog(value, slug) {
  if (!Array.isArray(value) || value.length > 64) throw invalid('权限目录最多包含 64 项');
  const seen = new Set();
  return value.map((entry) => {
    if (!entry || typeof entry.key !== 'string' || !entry.key.startsWith(`${slug}.`) || !/^[a-z][a-z0-9_-]*(?:\.[a-z][a-z0-9_-]*){1,5}$/.test(entry.key) || entry.key.length > 128 || seen.has(entry.key)) throw invalid('权限码必须唯一，并以应用标识加点号开头');
    if (!Array.isArray(entry.roles) || !entry.roles.length || entry.roles.some((item) => !ROLES.has(item)) || !entry.roles.includes('owner')) throw invalid('权限需指定角色，并包含应用所有者');
    seen.add(entry.key);
    return { key: entry.key, label: label(entry.label), roles: [...new Set(entry.roles)] };
  });
}
function pagination(options = {}) {
  const page = options.page === undefined ? 1 : Number(options.page);
  const pageSize = options.pageSize === undefined ? 25 : Number(options.pageSize);
  if (!Number.isInteger(page) || page < 1 || page > 10000 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) throw invalid('分页参数无效');
  return { page, pageSize, offset: (page - 1) * pageSize };
}
function queryFilter(options, columns, clauses, parameters) {
  if (options.q === undefined || options.q === '') return;
  if (typeof options.q !== 'string' || options.q.length > 100) throw invalid('搜索内容最多 100 字');
  const query = options.q.trim();
  if (!query) return;
  clauses.push(`(${columns.map((column) => `instr(lower(COALESCE(${column},'')),lower(?))>0`).join(' OR ')})`);
  parameters.push(...columns.map(() => query));
}
function statusFilter(options, allowed, column, clauses, parameters) {
  if (options.status === undefined || options.status === '') return;
  if (!allowed.includes(options.status)) throw invalid('筛选状态无效');
  clauses.push(`${column}=?`);
  parameters.push(options.status);
}
function enabledFilter(options, column, clauses, parameters) {
  if (options.status === undefined || options.status === '') return;
  if (!['active', 'disabled'].includes(options.status)) throw invalid('筛选状态无效');
  clauses.push(`${column}=?`);
  parameters.push(options.status === 'active' ? 1 : 0);
}

export class RegistryRepository {
  constructor(db) { this.db = db; }

  initializeRegistrySchema() {
    this.transaction(() => {
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS identity_meta (key TEXT PRIMARY KEY,value TEXT NOT NULL) STRICT;
        CREATE TABLE IF NOT EXISTS users (
          subject TEXT PRIMARY KEY,name TEXT NOT NULL,status TEXT NOT NULL CHECK(status IN ('active','pending','disabled')),
          platform_role TEXT CHECK(platform_role IS NULL OR platform_role IN ('platform_owner','platform_admin')),
          created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,version INTEGER NOT NULL DEFAULT 1,
          nickname TEXT NOT NULL DEFAULT '',avatar_url TEXT NOT NULL DEFAULT '',profile_updated_at INTEGER
        ) STRICT;
        CREATE TABLE IF NOT EXISTS wechat_identities (
          app_id TEXT NOT NULL,openid TEXT NOT NULL,user_subject TEXT NOT NULL REFERENCES users(subject),
          created_at INTEGER NOT NULL,PRIMARY KEY(app_id,openid)
        ) STRICT;
        CREATE INDEX IF NOT EXISTS wechat_identities_subject ON wechat_identities(user_subject);
        CREATE TABLE IF NOT EXISTS apps (
          id TEXT PRIMARY KEY,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,description TEXT NOT NULL,
          enabled INTEGER NOT NULL CHECK(enabled IN (0,1)),permission_catalog TEXT NOT NULL,
          created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,homepage_url TEXT NOT NULL DEFAULT '',version INTEGER NOT NULL DEFAULT 1
        ) STRICT;
        CREATE TABLE IF NOT EXISTS clients (
          client_id TEXT PRIMARY KEY,app_id TEXT NOT NULL REFERENCES apps(id),name TEXT NOT NULL,
          secret_hash TEXT NOT NULL,previous_secret_hash TEXT,previous_secret_until INTEGER,
          redirect_uris TEXT NOT NULL,enabled INTEGER NOT NULL CHECK(enabled IN (0,1)),
          created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,version INTEGER NOT NULL DEFAULT 1
        ) STRICT;
        CREATE INDEX IF NOT EXISTS clients_app ON clients(app_id);
        CREATE TABLE IF NOT EXISTS memberships (
          app_id TEXT NOT NULL REFERENCES apps(id),user_subject TEXT NOT NULL REFERENCES users(subject),
          role TEXT NOT NULL CHECK(role IN ('owner','admin','editor','viewer')),
          status TEXT NOT NULL CHECK(status IN ('active','disabled')),created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,
          version INTEGER NOT NULL DEFAULT 1,PRIMARY KEY(app_id,user_subject)
        ) STRICT;
        CREATE INDEX IF NOT EXISTS memberships_user ON memberships(user_subject);
        CREATE TABLE IF NOT EXISTS invites (
          id TEXT PRIMARY KEY,token_hash TEXT NOT NULL UNIQUE,app_id TEXT NOT NULL REFERENCES apps(id),
          role TEXT NOT NULL CHECK(role IN ('owner','admin','editor','viewer')),
          status TEXT NOT NULL CHECK(status IN ('open','claimed','approved','revoked')),
          created_by TEXT NOT NULL REFERENCES users(subject),created_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,
          claimed_by TEXT REFERENCES users(subject),claimed_at INTEGER,approved_by TEXT REFERENCES users(subject),
          approved_at INTEGER,revoked_at INTEGER,label TEXT NOT NULL DEFAULT '',claim_name TEXT,version INTEGER NOT NULL DEFAULT 1
        ) STRICT;
        CREATE INDEX IF NOT EXISTS invites_app_status ON invites(app_id,status,expires_at);
        CREATE TABLE IF NOT EXISTS audit_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,actor_subject TEXT REFERENCES users(subject),action TEXT NOT NULL,
          resource_type TEXT NOT NULL,resource_id TEXT NOT NULL,app_id TEXT,details TEXT NOT NULL,created_at INTEGER NOT NULL
        ) STRICT;
        CREATE INDEX IF NOT EXISTS audit_log_created ON audit_log(created_at);
        INSERT OR IGNORE INTO identity_meta VALUES('registry_schema_version','1');
      `);
      // Idempotent additive migration also supports an interrupted pre-release installation.
      for (const [table, columns] of Object.entries({ users: { version: 'INTEGER NOT NULL DEFAULT 1', nickname: "TEXT NOT NULL DEFAULT ''", avatar_url: "TEXT NOT NULL DEFAULT ''", profile_updated_at: 'INTEGER' }, apps: { homepage_url: "TEXT NOT NULL DEFAULT ''", version: 'INTEGER NOT NULL DEFAULT 1' }, clients: { version: 'INTEGER NOT NULL DEFAULT 1' }, memberships: { version: 'INTEGER NOT NULL DEFAULT 1' }, invites: { label: "TEXT NOT NULL DEFAULT ''", claim_name: 'TEXT', version: 'INTEGER NOT NULL DEFAULT 1' } })) {
        const existing = new Set(this.db.prepare(`PRAGMA table_info(${table})`).all().map((row) => row.name));
        for (const [column, definition] of Object.entries(columns)) if (!existing.has(column)) this.db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
      }
      this._migrateLegacyOwner();
    });
  }

  _migrateLegacyOwner() {
    if (this.db.prepare("SELECT 1 FROM identity_meta WHERE key='legacy_owner_imported'").get()) return;
    const owner = this.db.prepare('SELECT * FROM owner WHERE singleton=1').get();
    if (!owner) return;
    const now = Date.now();
    this.db.prepare('INSERT INTO users(subject,name,status,platform_role,created_at,updated_at) VALUES(?,?,?,?,?,?)').run(owner.subject, owner.name, owner.active ? 'active' : 'disabled', 'platform_owner', owner.created_at, now);
    this.db.prepare('INSERT INTO wechat_identities VALUES(?,?,?,?)').run(owner.app_id, owner.openid, owner.subject, now);
    this.db.prepare("INSERT INTO identity_meta VALUES('legacy_owner_imported','1')").run();
    this._audit(owner.subject, 'migration.owner', 'user', owner.subject, null, { preservedSubject: true });
  }

  importLegacyClients(input) {
    return this.transaction(() => {
      if (this.db.prepare("SELECT 1 FROM identity_meta WHERE key='legacy_clients_imported'").get()) return false;
      const entries = input instanceof Map ? [...input.values()] : input;
      if (!Array.isArray(entries) || entries.length > 32) throw invalid('旧应用配置无效');
      const owner = this.db.prepare('SELECT * FROM owner WHERE singleton=1').get();
      if (!owner || !this.getUser(owner.subject)) throw fail(503, 'temporarily_unavailable', '请先导入已验证的平台所有者');
      for (const entry of entries) {
        const clientId = identifier(entry.clientId, '客户端标识');
        if (!/^[a-z][a-z0-9_-]{1,63}$/.test(clientId)) throw invalid('客户端标识无效');
        const name = label(entry.name), secretHash = hash(entry.secretHash), callbackUris = redirects(entry.redirectUris);
        const ownerRole = role(entry.ownerRole);
        const slug = clientId === 'disktrace-admin' ? 'disktrace' : clientId;
        const appId = `app_${randomUUID().replaceAll('-', '')}`;
        const now = Date.now();
        this.db.prepare('INSERT INTO apps(id,slug,name,description,enabled,permission_catalog,created_at,updated_at,homepage_url) VALUES(?,?,?,?,?,?,?,?,?)').run(appId, slug, clientId === 'disktrace-admin' ? 'DiskTrace' : name, '', 1, JSON.stringify(slug === 'disktrace' ? DISKTRACE_CATALOG : []), now, now, slug === 'disktrace' ? 'https://disktrace.herong.info/' : '');
        this.db.prepare('INSERT INTO clients(client_id,app_id,name,secret_hash,previous_secret_hash,previous_secret_until,redirect_uris,enabled,created_at,updated_at) VALUES(?,?,?,?,NULL,NULL,?,?,?,?)').run(clientId, appId, name, secretHash, JSON.stringify(callbackUris), entry.enabled === false ? 0 : 1, now, now);
        // Convert an existing legacy grant once. Newly created apps get no implicit membership.
        if (!entry.ownerSubject || entry.ownerSubject === owner.subject) this.db.prepare('INSERT INTO memberships(app_id,user_subject,role,status,created_at,updated_at) VALUES(?,?,?,?,?,?)').run(appId, owner.subject, ownerRole, 'active', now, now);
        this._audit(owner.subject, 'migration.client', 'client', clientId, appId, { preservedClientId: true, preservedCredential: true });
      }
      this.db.prepare("INSERT INTO identity_meta VALUES('legacy_clients_imported','1')").run();
      return true;
    });
  }

  registryImported() { return Boolean(this.db.prepare("SELECT 1 FROM identity_meta WHERE key='legacy_clients_imported'").get()); }
  needsLegacyImport() { return !this.registryImported(); }
  hasActivePlatformOwner() { return Boolean(this.db.prepare("SELECT 1 FROM users WHERE status='active' AND platform_role='platform_owner' LIMIT 1").get()); }

  _user(row) {
    return row ? { id: row.subject, subject: row.subject, name: row.name, nickname: row.nickname || '', avatarUrl: wechatAvatar(row.avatar_url) || '', profileUpdatedAt: row.profile_updated_at ?? null, status: row.status, active: row.status === 'active' ? 1 : 0, platformRole: row.platform_role || 'none', version: row.version, createdAt: row.created_at, updatedAt: row.updated_at } : null;
  }
  getUser(subject) { return this._user(this.db.prepare('SELECT * FROM users WHERE subject=?').get(subject)); }
  findWechatUser(appId, openid) {
    return this._user(this.db.prepare('SELECT u.* FROM wechat_identities i JOIN users u ON u.subject=i.user_subject WHERE i.app_id=? AND i.openid=?').get(appId, openid));
  }
  updateWechatProfile(appId, openid, profile) {
    // Provider profile fields are presentation only; identity remains this verified binding.
    if (!profile || typeof profile !== 'object' || Array.isArray(profile) || profile.errcode || profile.openid !== openid) throw invalid('微信资料格式无效');
    const nickname = typeof profile.nickname === 'string' && [...profile.nickname].length <= 80 && !/[\u0000-\u001f\u007f-\u009f]/.test(profile.nickname)
      ? profile.nickname.trim() : null;
    const avatarUrl = wechatAvatar(profile.headimgurl);
    // Each optional field updates independently. Empty strings intentionally clear it.
    if (nickname === null && avatarUrl === null) return null;
    return this.transaction(() => {
      const user = this.findWechatUser(appId, openid);
      if (!user || user.status === 'disabled') return null;
      const now = Date.now();
      this.db.prepare('UPDATE users SET nickname=COALESCE(?,nickname),avatar_url=COALESCE(?,avatar_url),profile_updated_at=?,updated_at=?,version=version+1 WHERE subject=?').run(nickname, avatarUrl, now, now, user.subject);
      return this.getUser(user.subject);
    });
  }
  _app(row) {
    return row ? { id: row.id, appId: row.id, slug: row.slug, name: row.name, description: row.description, homepageUrl: row.homepage_url, enabled: row.enabled === 1, status: row.enabled === 1 ? 'active' : 'disabled', permissionCatalog: JSON.parse(row.permission_catalog), version: row.version, memberCount: this.db.prepare("SELECT COUNT(*) AS count FROM memberships WHERE app_id=? AND status='active'").get(row.id).count, clientCount: this.db.prepare('SELECT COUNT(*) AS count FROM clients WHERE app_id=?').get(row.id).count, createdAt: row.created_at, updatedAt: row.updated_at } : null;
  }
  getApp(id) { return this._app(this.db.prepare('SELECT * FROM apps WHERE id=?').get(id)); }
  getClient(clientId) {
    const row = this.db.prepare('SELECT c.*,a.enabled AS app_enabled FROM clients c JOIN apps a ON a.id=c.app_id WHERE c.client_id=?').get(clientId);
    return row ? { id: row.client_id, clientId: row.client_id, appId: row.app_id, name: row.name, secretHash: row.secret_hash, previousSecretHash: row.previous_secret_hash, previousSecretUntil: row.previous_secret_until, redirectUris: JSON.parse(row.redirect_uris), enabled: row.enabled === 1 && row.app_enabled === 1, clientEnabled: row.enabled === 1, appEnabled: row.app_enabled === 1, version: row.version, createdAt: row.created_at, updatedAt: row.updated_at } : null;
  }
  getMembership(appId, subject) {
    const row = this.db.prepare('SELECT * FROM memberships WHERE app_id=? AND user_subject=?').get(appId, subject);
    return row ? { appId, userId: subject, subject, role: row.role, status: row.status, version: row.version, createdAt: row.created_at, updatedAt: row.updated_at } : null;
  }
  accessForClient(clientId, subject) {
    const client = this.getClient(clientId), user = this.getUser(subject);
    if (!client?.enabled || user?.status !== 'active') return null;
    const member = this.getMembership(client.appId, subject);
    if (member?.status !== 'active') return null;
    const app = this.getApp(client.appId);
    return { client, user, role: member.role, permissions: app.permissionCatalog.filter((entry) => entry.roles.includes(member.role)).map((entry) => entry.key) };
  }

  _platform(actor, ownerOnly = false) {
    const user = typeof actor === 'string' ? this.getUser(actor) : null;
    if (user?.status !== 'active' || !PLATFORM_ROLES.has(user.platformRole) || (ownerOnly && user.platformRole !== 'platform_owner')) throw fail(403, 'access_denied', ownerOnly ? '只有平台所有者可以执行此操作' : '需要平台管理权限');
    return user;
  }
  _audit(actor, action, type, id, appId, details = {}) {
    this.db.prepare('INSERT INTO audit_log(actor_subject,action,resource_type,resource_id,app_id,details,created_at) VALUES(?,?,?,?,?,?,?)').run(actor, action, type, id, appId, JSON.stringify(details), Date.now());
    this.db.exec('DELETE FROM audit_log WHERE id <= COALESCE((SELECT id FROM audit_log ORDER BY id DESC LIMIT 1 OFFSET 20000),0)');
  }
  _version(row, input = {}) {
    if (input.version === undefined) return;
    if (!Number.isSafeInteger(input.version) || input.version < 0) throw invalid('版本号无效');
    if (input.version !== (row?.version ?? 0)) throw fail(409, 'version_conflict', '记录已被更新，请刷新后再操作');
  }
  _paged(actor, options, from, where, parameters, columns, order, map) {
    this._platform(actor);
    const { page, pageSize, offset } = pagination(options);
    const total = this.db.prepare(`SELECT COUNT(*) AS total FROM ${from} ${where}`).get(...parameters).total;
    const items = this.db.prepare(`SELECT ${columns} FROM ${from} ${where} ORDER BY ${order} LIMIT ? OFFSET ?`).all(...parameters, pageSize, offset).map(map);
    return { items, page, pageSize, total };
  }
  listApps(actor, options = {}) {
    const clauses = [], parameters = [];
    queryFilter(options, ['name', 'slug', 'description'], clauses, parameters);
    enabledFilter(options, 'enabled', clauses, parameters);
    return this._paged(actor, options, 'apps', clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', parameters, '*', 'created_at DESC,id', (row) => this._app(row));
  }
  listUsers(actor, options = {}) {
    const clauses = [], parameters = [];
    queryFilter(options, ['name', 'nickname', 'subject'], clauses, parameters);
    statusFilter(options, ['active', 'pending', 'disabled'], 'status', clauses, parameters);
    return this._paged(actor, options, 'users', clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', parameters, '*', 'created_at DESC,subject', (row) => this._user(row));
  }
  listClients(actor, options = {}) {
    const clauses = [], parameters = [];
    if (options.appId) { clauses.push('c.app_id=?'); parameters.push(identifier(options.appId)); }
    queryFilter(options, ['c.name', 'c.client_id', 'a.name'], clauses, parameters);
    enabledFilter(options, 'c.enabled', clauses, parameters);
    return this._paged(actor, options, 'clients c JOIN apps a ON a.id=c.app_id', clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', parameters, 'c.client_id,c.app_id,c.name,c.redirect_uris,c.enabled,c.previous_secret_until,c.version,c.created_at,c.updated_at,a.name AS app_name', 'c.created_at DESC,c.client_id', (row) => ({ id: row.client_id, clientId: row.client_id, appId: row.app_id, appName: row.app_name, name: row.name, redirectUris: JSON.parse(row.redirect_uris), enabled: row.enabled === 1, previousSecretUntil: row.previous_secret_until, secretConfigured: true, version: row.version, createdAt: row.created_at, updatedAt: row.updated_at }));
  }
  listMemberships(actor, options = {}) {
    const clauses = [], parameters = [];
    if (options.appId) { clauses.push('m.app_id=?'); parameters.push(identifier(options.appId)); }
    if (options.subject || options.userId) { clauses.push('m.user_subject=?'); parameters.push(identifier(options.subject || options.userId)); }
    queryFilter(options, ['u.name', 'm.user_subject', 'a.name'], clauses, parameters);
    statusFilter(options, ['active', 'disabled'], 'm.status', clauses, parameters);
    return this._paged(actor, options, 'memberships m JOIN users u ON u.subject=m.user_subject JOIN apps a ON a.id=m.app_id', clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', parameters, 'm.*,u.name AS user_name,u.status AS user_status,a.name AS app_name', 'm.updated_at DESC,m.app_id,m.user_subject', (row) => ({ appId: row.app_id, appName: row.app_name, userId: row.user_subject, subject: row.user_subject, name: row.user_name, userStatus: row.user_status, role: row.role, status: row.status, version: row.version, createdAt: row.created_at, updatedAt: row.updated_at }));
  }
  listInvites(actor, options = {}) {
    const clauses = [], parameters = [];
    if (options.appId) { clauses.push('i.app_id=?'); parameters.push(identifier(options.appId)); }
    queryFilter(options, ['i.label', 'i.claim_name', 'a.name', 'inviter.name', 'claimant.name'], clauses, parameters);
    const now = Date.now();
    if (options.status) {
      if (!['open', 'claimed', 'approved', 'revoked', 'expired'].includes(options.status)) throw invalid('筛选状态无效');
      if (options.status === 'expired') { clauses.push("i.status IN ('open','claimed') AND i.expires_at<=?"); parameters.push(now); }
      else {
        clauses.push('i.status=?'); parameters.push(options.status);
        if (['open', 'claimed'].includes(options.status)) { clauses.push('i.expires_at>?'); parameters.push(now); }
      }
    }
    return this._paged(actor, options, 'invites i JOIN apps a ON a.id=i.app_id JOIN users inviter ON inviter.subject=i.created_by LEFT JOIN users claimant ON claimant.subject=i.claimed_by', clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', parameters, 'i.id,i.app_id,i.role,i.status,i.label,i.claim_name,i.version,i.created_at,i.expires_at,i.claimed_by,i.claimed_at,i.approved_at,a.name AS app_name,inviter.name AS inviter_name,claimant.name AS claimant_name', 'i.created_at DESC,i.id', (row) => ({ id: row.id, appId: row.app_id, appName: row.app_name, role: row.role, label: row.label, status: ['open', 'claimed'].includes(row.status) && row.expires_at <= now ? 'expired' : row.status, inviterName: row.inviter_name, claimedBy: row.claimed_by, claimantName: row.claim_name || row.claimant_name, version: row.version, createdAt: row.created_at, expiresAt: row.expires_at, claimedAt: row.claimed_at, approvedAt: row.approved_at }));
  }
  listAudit(actor, options = {}) {
    const clauses = [], parameters = [];
    if (options.appId) { clauses.push('a.app_id=?'); parameters.push(identifier(options.appId)); }
    queryFilter(options, ['a.action', 'a.resource_type', 'a.resource_id', 'u.name'], clauses, parameters);
    if (options.status) throw invalid('审计记录不支持状态筛选');
    return this._paged(actor, options, 'audit_log a LEFT JOIN users u ON u.subject=a.actor_subject', clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', parameters, 'a.*,u.name AS actor_name', 'a.id DESC', (row) => ({ id: row.id, actorSubject: row.actor_subject, actorName: row.actor_name, action: row.action, resourceType: row.resource_type, resourceId: row.resource_id, appId: row.app_id, details: JSON.parse(row.details), createdAt: row.created_at }));
  }
  adminOverview(actor) {
    const user = this._platform(actor);
    const count = (table) => this.db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count;
    return { user, counts: { apps: count('apps'), clients: count('clients'), users: count('users'), memberships: count('memberships'), pendingInvites: this.db.prepare("SELECT COUNT(*) AS count FROM invites WHERE status='claimed' AND expires_at>?").get(Date.now()).count } };
  }

  createApp(actor, input) {
    return this.transaction(() => {
      this._platform(actor);
      if (this.db.prepare('SELECT COUNT(*) AS count FROM apps').get().count >= 128) throw fail(409, 'capacity_reached', '应用数量已达到当前容量上限');
      if (typeof input.slug !== 'string' || !/^[a-z][a-z0-9_-]{1,63}$/.test(input.slug)) throw invalid('应用标识需为 2 到 64 位小写字母、数字或连接符');
      if (this.db.prepare('SELECT 1 FROM apps WHERE slug=?').get(input.slug)) throw fail(409, 'conflict', '应用标识已存在');
      const name = label(input.name), description = label(input.description ?? '', 1000, true), permissions = catalog(input.permissionCatalog ?? [], input.slug);
      const id = `app_${randomUUID().replaceAll('-', '')}`, now = Date.now();
      const homepageUrl = homepage(input.homepageUrl);
      this.db.prepare('INSERT INTO apps(id,slug,name,description,enabled,permission_catalog,created_at,updated_at,homepage_url) VALUES(?,?,?,?,?,?,?,?,?)').run(id, input.slug, name, description, 1, JSON.stringify(permissions), now, now, homepageUrl);
      this._audit(actor, 'app.create', 'app', id, id, { slug: input.slug });
      return this.getApp(id);
    });
  }
  updateApp(actor, appId, input) {
    return this.transaction(() => {
      this._platform(actor);
      const app = this.getApp(identifier(appId));
      if (!app) throw fail(404, 'not_found', '应用不存在');
      this._version(app, input);
      if (input.slug !== undefined && input.slug !== app.slug) throw invalid('应用标识创建后不可修改');
      if (input.enabled !== undefined && typeof input.enabled !== 'boolean') throw invalid('应用状态无效');
      if (input.status !== undefined && !['active', 'disabled'].includes(input.status)) throw invalid('应用状态无效');
      if (input.status !== undefined && input.enabled !== undefined && input.enabled !== (input.status === 'active')) throw invalid('应用状态参数不一致');
      const name = input.name === undefined ? app.name : label(input.name);
      const description = input.description === undefined ? app.description : label(input.description, 1000, true);
      const permissions = input.permissionCatalog === undefined ? app.permissionCatalog : catalog(input.permissionCatalog, app.slug);
      const enabled = input.status === undefined ? (input.enabled ?? app.enabled) : input.status === 'active';
      const homepageUrl = input.homepageUrl === undefined ? app.homepageUrl : homepage(input.homepageUrl);
      this.db.prepare('UPDATE apps SET name=?,description=?,enabled=?,permission_catalog=?,homepage_url=?,updated_at=?,version=version+1 WHERE id=?').run(name, description, enabled ? 1 : 0, JSON.stringify(permissions), homepageUrl, Date.now(), appId);
      if (!enabled) {
        this._purgeAppCredentials(appId);
        this.db.prepare("UPDATE invites SET status='revoked',revoked_at=?,version=version+1 WHERE app_id=? AND status IN ('open','claimed')").run(Date.now(), appId);
      }
      this._audit(actor, 'app.update', 'app', appId, appId, { enabled, permissionKeys: permissions.map((entry) => entry.key) });
      return this.getApp(appId);
    });
  }

  createClient(actor, input) {
    return this.transaction(() => {
      this._platform(actor);
      const app = this.getApp(identifier(input.appId));
      if (!app) throw fail(404, 'not_found', '应用不存在');
      if (this.db.prepare('SELECT COUNT(*) AS count FROM clients').get().count >= 256) throw fail(409, 'capacity_reached', '客户端数量已达到当前容量上限');
      if (typeof input.clientId !== 'string' || !/^[a-z][a-z0-9_-]{1,63}$/.test(input.clientId)) throw invalid('客户端标识无效');
      if (this.getClient(input.clientId)) throw fail(409, 'conflict', '客户端标识已存在');
      const now = Date.now();
      this.db.prepare('INSERT INTO clients(client_id,app_id,name,secret_hash,previous_secret_hash,previous_secret_until,redirect_uris,enabled,created_at,updated_at) VALUES(?,?,?,?,NULL,NULL,?,1,?,?)').run(input.clientId, app.id, label(input.name), hash(input.secretHash), JSON.stringify(redirects(input.redirectUris)), now, now);
      this._audit(actor, 'client.create', 'client', input.clientId, app.id);
      return this._safeClient(input.clientId);
    });
  }
  _safeClient(clientId) {
    const { secretHash, previousSecretHash, ...safe } = this.getClient(clientId);
    return { ...safe, secretConfigured: true };
  }
  updateClient(actor, clientId, input) {
    return this.transaction(() => {
      this._platform(actor);
      const client = this.getClient(identifier(clientId));
      if (!client) throw fail(404, 'not_found', '客户端不存在');
      this._version(client, input);
      if ((input.clientId !== undefined && input.clientId !== clientId) || (input.appId !== undefined && input.appId !== client.appId) || input.secret !== undefined || input.secretHash !== undefined) throw invalid('客户端归属与标识不可修改，密钥请使用轮换操作');
      if (input.enabled !== undefined && typeof input.enabled !== 'boolean') throw invalid('客户端状态无效');
      const enabled = input.enabled ?? client.clientEnabled;
      const callbackUris = input.redirectUris === undefined ? client.redirectUris : redirects(input.redirectUris);
      this.db.prepare('UPDATE clients SET name=?,redirect_uris=?,enabled=?,updated_at=?,version=version+1 WHERE client_id=?').run(input.name === undefined ? client.name : label(input.name), JSON.stringify(callbackUris), enabled ? 1 : 0, Date.now(), clientId);
      if (!enabled) this._purgeClientCredentials(clientId);
      this._audit(actor, 'client.update', 'client', clientId, client.appId, { enabled, redirectUris: callbackUris });
      return this._safeClient(clientId);
    });
  }
  rotateClientSecret(actor, clientId, secretHash, options = {}) {
    return this.transaction(() => {
      this._platform(actor);
      const client = this.getClient(identifier(clientId));
      if (!client) throw fail(404, 'not_found', '客户端不存在');
      this._version(client, options);
      hash(secretHash);
      if (secretHash === client.secretHash || (client.previousSecretUntil ?? 0) > Date.now()) throw fail(409, 'conflict', '请在上一轮密钥过渡期结束后再轮换');
      const until = Date.now() + SECRET_GRACE;
      this.db.prepare('UPDATE clients SET previous_secret_hash=secret_hash,previous_secret_until=?,secret_hash=?,updated_at=?,version=version+1 WHERE client_id=?').run(until, secretHash, Date.now(), clientId);
      this._audit(actor, 'client.rotate_secret', 'client', clientId, client.appId, { previousSecretUntil: until });
      return this._safeClient(clientId);
    });
  }

  updateUser(actor, subject, input) {
    return this.transaction(() => {
      this._platform(actor, true);
      const user = this.getUser(identifier(subject));
      if (!user) throw fail(404, 'not_found', '用户不存在');
      this._version(user, input);
      const status = input.status ?? user.status;
      const selectedRole = input.platformRole === undefined ? user.platformRole : input.platformRole;
      const platformRole = selectedRole === 'none' ? null : selectedRole;
      if (!['active', 'pending', 'disabled'].includes(status) || (platformRole !== null && !PLATFORM_ROLES.has(platformRole))) throw invalid('用户状态或平台角色无效');
      if (user.status === 'active' && user.platformRole === 'platform_owner' && (status !== 'active' || platformRole !== 'platform_owner') && this.db.prepare("SELECT COUNT(*) AS count FROM users WHERE status='active' AND platform_role='platform_owner'").get().count <= 1) throw fail(409, 'last_owner', '不能停用或降级最后一位平台所有者');
      this.db.prepare('UPDATE users SET name=?,status=?,platform_role=?,updated_at=?,version=version+1 WHERE subject=?').run(input.name === undefined ? user.name : label(input.name, 80), status, platformRole, Date.now(), subject);
      if (status !== 'active') this._purgeUserCredentials(subject);
      // This legacy row remains only for the offline import command, never as the platform authority.
      this.db.prepare('UPDATE owner SET active=? WHERE subject=?').run(status === 'active' ? 1 : 0, subject);
      this._audit(actor, 'user.update', 'user', subject, null, { status, platformRole });
      return this.getUser(subject);
    });
  }
  setMembership(actor, input) {
    return this.transaction(() => {
      this._platform(actor);
      const app = this.getApp(identifier(input.appId)), user = this.getUser(identifier(input.subject ?? input.userId));
      if (!app || !user) throw fail(404, 'not_found', '应用或用户不存在');
      this._version(this.getMembership(app.id, user.subject), input);
      const memberRole = role(input.role), status = input.status ?? 'active';
      if (!['active', 'disabled'].includes(status)) throw invalid('成员状态无效');
      if (status === 'active' && (!app.enabled || user.status !== 'active')) throw fail(409, 'conflict', '应用和用户均需启用，待确认用户请通过邀请审批');
      const now = Date.now();
      this.db.prepare('INSERT INTO memberships(app_id,user_subject,role,status,created_at,updated_at) VALUES(?,?,?,?,?,?) ON CONFLICT(app_id,user_subject) DO UPDATE SET role=excluded.role,status=excluded.status,updated_at=excluded.updated_at,version=memberships.version+1').run(app.id, user.subject, memberRole, status, now, now);
      if (status !== 'active') this._purgeAppCredentials(app.id, user.subject);
      this._audit(actor, 'membership.update', 'membership', user.subject, app.id, { role: memberRole, status });
      return this.getMembership(app.id, user.subject);
    });
  }

  createInvite(actor, input) {
    return this.transaction(() => {
      this._platform(actor);
      const app = this.getApp(identifier(input.appId));
      if (!app?.enabled) throw fail(409, 'conflict', '应用不存在或已停用');
      if (this.db.prepare("SELECT COUNT(*) AS count FROM invites WHERE status IN ('open','claimed') AND expires_at>?").get(Date.now()).count >= 500) throw fail(409, 'capacity_reached', '待处理邀请已达到当前容量上限');
      const inviteRole = role(input.role), tokenHash = hash(input.tokenHash), id = `inv_${randomUUID().replaceAll('-', '')}`, now = Date.now();
      const recipientLabel = label(input.label ?? input.recipientLabel ?? '', 100, true);
      this.db.prepare("INSERT INTO invites(id,token_hash,app_id,role,status,created_by,created_at,expires_at,label) VALUES(?,?,?,?,'open',?,?,?,?)").run(id, tokenHash, app.id, inviteRole, actor, now, now + INVITE_TTL, recipientLabel);
      this._audit(actor, 'invite.create', 'invite', id, app.id, { role: inviteRole, recipientLabel });
      return { id, appId: app.id, appName: app.name, role: inviteRole, label: recipientLabel, status: 'open', version: 1, createdAt: now, expiresAt: now + INVITE_TTL };
    });
  }
  _inviteByHash(tokenHash) {
    if (typeof tokenHash !== 'string' || !HASH.test(tokenHash)) return null;
    return this.db.prepare('SELECT i.*,a.name AS app_name,a.enabled AS app_enabled,u.name AS inviter_name,u.status AS inviter_status,u.platform_role AS inviter_role FROM invites i JOIN apps a ON a.id=i.app_id JOIN users u ON u.subject=i.created_by WHERE i.token_hash=?').get(tokenHash) || null;
  }
  _openInvite(invite) {
    return Boolean(invite && invite.status === 'open' && invite.expires_at > Date.now() && invite.app_enabled === 1 && invite.inviter_status === 'active' && PLATFORM_ROLES.has(invite.inviter_role));
  }
  publicInvite(tokenHash) {
    const invite = this._inviteByHash(tokenHash);
    return this._openInvite(invite) ? { appName: invite.app_name, role: invite.role, expiresAt: invite.expires_at, inviterName: invite.inviter_name, status: 'open' } : null;
  }
  claimInvite({ tokenHash, wechatAppId, openid, name }) {
    return this.transaction(() => {
      const invite = this._inviteByHash(tokenHash);
      if (!this._openInvite(invite)) throw fail(410, 'invite_unavailable', '邀请已使用、已过期或已撤销');
      if (typeof wechatAppId !== 'string' || !/^wx[a-f0-9]{16}$/.test(wechatAppId) || typeof openid !== 'string' || !/^[A-Za-z0-9_-]{16,128}$/.test(openid)) throw invalid('已验证的微信身份无效');
      const displayName = label(name, 80);
      let user = this.findWechatUser(wechatAppId, openid);
      if (user?.status === 'disabled') throw fail(403, 'access_denied', '该账号已停用');
      if (user && this.getMembership(invite.app_id, user.subject)?.status === 'active') throw fail(409, 'already_member', '该账号已经是应用成员，请联系管理员调整权限');
      const now = Date.now();
      if (!user) {
        if (this.db.prepare('SELECT COUNT(*) AS count FROM users').get().count >= 10000) throw fail(409, 'capacity_reached', '用户数量已达到当前容量上限');
        const subject = randomToken();
        this.db.prepare("INSERT INTO users(subject,name,status,platform_role,created_at,updated_at) VALUES(?,?,'pending',NULL,?,?)").run(subject, displayName, now, now);
        this.db.prepare('INSERT INTO wechat_identities VALUES(?,?,?,?)').run(wechatAppId, openid, subject, now);
        user = this.getUser(subject);
      }
      this.db.prepare("UPDATE invites SET status='claimed',claimed_by=?,claimed_at=?,claim_name=?,version=version+1 WHERE id=? AND status='open'").run(user.subject, now, displayName, invite.id);
      this._audit(user.subject, 'invite.claim', 'invite', invite.id, invite.app_id, { claimName: displayName, pendingApproval: true });
      return { inviteId: invite.id, sub: user.subject, status: 'pending_approval' };
    });
  }
  getInviteForSubject(inviteId, subject) {
    const row = this.db.prepare('SELECT i.id,i.role,i.status,i.expires_at,a.name AS app_name FROM invites i JOIN apps a ON a.id=i.app_id WHERE i.id=? AND i.claimed_by=?').get(inviteId, subject);
    return row ? { inviteId: row.id, appName: row.app_name, role: row.role, status: ['open', 'claimed'].includes(row.status) && row.expires_at <= Date.now() ? 'expired' : row.status, expiresAt: row.expires_at } : null;
  }
  approveInvite(actor, inviteId, options = {}) {
    return this.transaction(() => {
      this._platform(actor);
      const invite = this.db.prepare('SELECT * FROM invites WHERE id=?').get(identifier(inviteId));
      if (!invite || invite.status !== 'claimed' || invite.expires_at <= Date.now()) throw fail(409, 'invite_unavailable', '邀请未待确认或已过期');
      this._version(invite, options);
      const app = this.getApp(invite.app_id), user = this.getUser(invite.claimed_by);
      if (!app?.enabled || !user || user.status === 'disabled') throw fail(409, 'conflict', '应用或用户已停用，无法批准');
      if (this.getMembership(app.id, user.subject)?.status === 'active') throw fail(409, 'already_member', '该账号已经是应用成员，请直接管理其权限');
      const now = Date.now();
      this.db.prepare("UPDATE users SET status='active',updated_at=?,version=version+1 WHERE subject=? AND status='pending'").run(now, user.subject);
      this.db.prepare("INSERT INTO memberships(app_id,user_subject,role,status,created_at,updated_at) VALUES(?,?,?,'active',?,?) ON CONFLICT(app_id,user_subject) DO UPDATE SET role=excluded.role,status='active',updated_at=excluded.updated_at,version=memberships.version+1").run(app.id, user.subject, invite.role, now, now);
      this.db.prepare("UPDATE invites SET status='approved',approved_by=?,approved_at=?,version=version+1 WHERE id=?").run(actor, now, inviteId);
      this._audit(actor, 'invite.approve', 'invite', inviteId, app.id, { subject: user.subject, role: invite.role });
      return { inviteId, id: inviteId, subject: user.subject, userId: user.subject, appId: app.id, role: invite.role, status: 'approved', version: invite.version + 1 };
    });
  }
  revokeInvite(actor, inviteId, options = {}) {
    return this.transaction(() => {
      this._platform(actor);
      const invite = this.db.prepare('SELECT * FROM invites WHERE id=?').get(identifier(inviteId));
      if (!invite) throw fail(404, 'not_found', '邀请不存在');
      this._version(invite, options);
      if (invite.status === 'approved') throw fail(409, 'conflict', '邀请已生效，请在成员管理中撤销权限');
      this.db.prepare("UPDATE invites SET status='revoked',revoked_at=?,version=version+1 WHERE id=?").run(Date.now(), inviteId);
      this._audit(actor, 'invite.revoke', 'invite', inviteId, invite.app_id);
      return { inviteId, id: inviteId, status: 'revoked', version: invite.version + 1 };
    });
  }

  _purgeClientCredentials(clientId, subject) {
    for (const table of ['authorization_codes', 'access_tokens', 'wechat_flows']) {
      this.db.prepare(`DELETE FROM ${table} WHERE json_extract(payload,'$.clientId')=?${subject ? " AND json_extract(payload,'$.subject')=?" : ''}`).run(...(subject ? [clientId, subject] : [clientId]));
    }
  }
  _purgeAppCredentials(appId, subject) {
    for (const client of this.db.prepare('SELECT client_id FROM clients WHERE app_id=?').all(appId)) this._purgeClientCredentials(client.client_id, subject);
  }
  _purgeUserCredentials(subject) {
    let removed = 0;
    for (const table of ['browser_sessions', 'authorization_codes', 'access_tokens', 'wechat_flows']) removed += Number(this.db.prepare(`DELETE FROM ${table} WHERE json_extract(payload,'$.subject')=?`).run(subject).changes);
    return removed;
  }
  revokeUserSessions(actor, subject, options = {}) {
    return this.transaction(() => {
      this._platform(actor, true);
      const user = this.getUser(identifier(subject));
      if (!user) throw fail(404, 'not_found', '用户不存在');
      this._version(user, options);
      const revoked = this._purgeUserCredentials(subject);
      this._audit(actor, 'user.revoke_sessions', 'user', subject, null, { revoked });
      return { subject, revoked };
    });
  }
}
