import { DatabaseSync } from 'node:sqlite';
import { createHash, randomUUID } from 'node:crypto';
import { safeAuthObservation } from './auth-observation.mjs';

export const fail = (status, message) => Object.assign(new Error(message), { status });
export const now = () => new Date().toISOString();
export const platforms = [
  { id: 'douyin', name: '抖音', login_method: 'qrcode', fields: ['title', 'description', 'tags', 'cover', 'ai_declaration'], cover_hint: '3:4 竖版封面' },
  { id: 'xiaohongshu', name: '小红书', login_method: 'qrcode', fields: ['title', 'description', 'tags', 'cover', 'content_origin'] },
  { id: 'tencent', name: '视频号', login_method: 'qrcode', fields: ['title', 'description', 'tags', 'cover', 'ai_declaration'], cover_hint: '3:4 竖版封面' },
  { id: 'bilibili', name: 'B站', login_method: 'local_terminal', fields: ['title', 'description', 'tags', 'cover', 'content_origin', 'tid'] },
].map((item) => ({ ...item, enabled: true, verified: false }));
const activeStates = new Set(['queued', 'running', 'waiting_user']);
const errorMessages = {
  ACCOUNT_LOGIN_REQUIRED: '账号会话已失效，请重新登录后重试', LOCAL_LOGIN_REQUIRED: '请先在执行节点完成该账号的本地登录',
  VIDEO_MISSING: '视频文件不存在，请重新上传', COVER_MISSING: '封面文件不存在，请重新上传',
  INVALID_TITLE: '标题不符合该平台要求，请修改后新建发布', INVALID_TAGS: '话题不符合该平台要求，请修改后新建发布',
  UNSUPPORTED_DECLARATION: '所选声明尚未接入该平台，请修改后新建发布', SOURCE_REQUIRED: '转载内容需要填写来源',
  CATEGORY_REQUIRED: 'B站需要选择投稿分区', ORIGIN_REQUIRED: 'B站需要选择原创或转载',
  OPERATION_STOPPED: '操作超时或已停止，请检查后重试', QR_UNAVAILABLE: '未取得登录二维码，请重试',
  LOGIN_PAGE_UNAVAILABLE: '抖音登录页暂时无法打开，请稍后重试', LOGIN_TIMEOUT: '扫码登录超时，请重新扫码',
  LOGIN_NOT_COMPLETED: '登录尚未完成，请重新扫码', AUTH_CHECK_FAILED: '暂时无法检查账号会话，请稍后重试',
  LOGIN_VERIFICATION_REQUIRED: '抖音要求额外身份验证，当前验证方式尚未完成，请检查平台验证要求',
  LOGIN_VERIFICATION_FAILED: '抖音身份验证未通过，请核对验证码后重新登录',
  BROWSER_NOT_INSTALLED: '发布服务尚未准备好，请联系维护者', BILIUP_NOT_INSTALLED: 'B站发布服务尚未准备好，请联系维护者',
  FORK_PATCH_MISMATCH: '发布服务版本不一致，请联系维护者', BILIUP_VERSION_MISMATCH: 'B站发布服务版本不一致，请联系维护者',
  COVER_NOT_APPLIED: '指定封面未确认保存，已在提交前停止，请检查封面要求',
  DECLARATION_NOT_APPLIED: '指定声明设置失败，已在提交前停止，请检查平台选项',
  TAGS_NOT_APPLIED: '指定话题设置失败，已在提交前停止，请检查话题内容',
};
const parse = (row) => row ? JSON.parse(row.payload) : null;
const stable = (value) => JSON.stringify(value, (_, item) => item && typeof item === 'object' && !Array.isArray(item) ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
const digest = (value) => createHash('sha256').update(stable(value)).digest('hex');
const text = (value, limit, label, required = false) => {
  if (typeof value !== 'string' || value.length > limit || value.includes('\0') || (required && !value.trim())) throw fail(422, `${label}不符合要求`);
  return value.trim();
};

export function createPublishingStore(path) {
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS schema_version(version INTEGER PRIMARY KEY);
    INSERT OR IGNORE INTO schema_version VALUES(1);
    CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS assets(id TEXT PRIMARY KEY, digest TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY, committed INTEGER NOT NULL DEFAULT 0, idempotency_key TEXT UNIQUE, request_hash TEXT NOT NULL, created_at TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS targets(id TEXT PRIMARY KEY, job_id TEXT NOT NULL REFERENCES jobs(id), account_id TEXT NOT NULL REFERENCES accounts(id), status TEXT NOT NULL, created_at TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(job_id,account_id));
    CREATE TABLE IF NOT EXISTS attempts(id TEXT PRIMARY KEY, target_id TEXT NOT NULL REFERENCES targets(id), attempt_no INTEGER NOT NULL, payload TEXT NOT NULL, UNIQUE(target_id,attempt_no));
    CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES accounts(id), status TEXT NOT NULL, created_at TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS executor(id INTEGER PRIMARY KEY CHECK(id=1), owner TEXT, expires INTEGER NOT NULL DEFAULT 0);
    INSERT OR IGNORE INTO executor(id,expires) VALUES(1,0);
    CREATE INDEX IF NOT EXISTS targets_queue ON targets(status,created_at);
    CREATE INDEX IF NOT EXISTS assets_digest ON assets(digest);
    CREATE INDEX IF NOT EXISTS jobs_date ON jobs(created_at);
    CREATE INDEX IF NOT EXISTS sessions_queue ON sessions(status,created_at);`);
  const get = (table, id) => parse(db.prepare(`SELECT payload FROM ${table} WHERE id=?`).get(id));
  const all = (table) => db.prepare(`SELECT payload FROM ${table} ORDER BY rowid DESC`).all().map(parse);
  function put(table, value) {
    if (table === 'targets' || table === 'sessions') db.prepare(`UPDATE ${table} SET status=?,payload=? WHERE id=?`).run(value.status, JSON.stringify(value), value.id);
    else db.prepare(`UPDATE ${table} SET payload=? WHERE id=?`).run(JSON.stringify(value), value.id);
    return value;
  }
  function transaction(fn) {
    db.exec('BEGIN IMMEDIATE');
    try { const result = fn(); db.exec('COMMIT'); return result; } catch (error) { db.exec('ROLLBACK'); throw error; }
  }
  const account = (id) => { const value = get('accounts', id); if (!value || value.disconnected_at) throw fail(404, '账号不存在或已断开'); return value; };
  const asset = (id) => { const value = get('assets', id); if (!value) throw fail(404, '素材不存在'); return value; };
  const target = (id) => { const value = get('targets', id); if (!value) throw fail(404, '发布目标不存在'); return value; };
  function job(id) {
    const value = get('jobs', id); if (!value) throw fail(404, '发布记录不存在');
    value.targets = db.prepare('SELECT payload FROM targets WHERE job_id=? ORDER BY rowid').all(id).map(parse).map((item) => ({ ...item, attempts: db.prepare('SELECT payload FROM attempts WHERE target_id=? ORDER BY attempt_no').all(item.id).map(parse) }));
    return value;
  }
  function createAccount(input) {
    if (!platforms.some((item) => item.id === input.platform)) throw fail(422, '平台不支持');
    const value = { id: randomUUID(), platform: input.platform, alias: text(input.alias, 80, '账号名称', true), auth_status: 'unknown', checked_at: null, platform_uid: null, display_name: null, disconnected_at: null, created_at: now() };
    db.prepare('INSERT INTO accounts VALUES(?,?)').run(value.id, JSON.stringify(value)); return value;
  }
  function addAsset(value) { db.prepare('INSERT INTO assets VALUES(?,?,?)').run(value.id, value.sha256, JSON.stringify(value)); return value; }
  const findAssetByDigest = (sha, type) => db.prepare('SELECT payload FROM assets WHERE digest=?').all(sha).map(parse).find((value) => value.type === type) ?? null;
  function normalizeContent(input, platform) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw fail(422, '发布内容格式错误');
    const limits = { douyin: 30, xiaohongshu: 20, tencent: 100, bilibili: 80 };
    const tags = input.tags ?? [];
    if (!Array.isArray(tags) || tags.length > 10) throw fail(422, '话题最多 10 个');
    const coverId = input.cover_asset_id ?? null;
    if (coverId !== null && asset(coverId).type !== 'cover') throw fail(422, '请选择封面图片');
    return { title: text(input.title ?? '', limits[platform], '标题', true), description: text(input.description ?? '', 4000, '简介'), tags: [...new Set(tags.map((tag) => text(tag, 40, '话题', true)))], cover_asset_id: coverId };
  }
  function normalizeOptions(input, platform) {
    const options = input ?? {};
    if (typeof options !== 'object' || Array.isArray(options)) throw fail(422, '平台设置格式错误');
    const aiSupported = ['douyin', 'tencent'].includes(platform);
    const allowed = ['content_origin', 'source', ...(aiSupported ? ['ai_declaration'] : []), ...(platform === 'bilibili' ? ['tid'] : [])];
    if (Object.keys(options).some((key) => !allowed.includes(key))) throw fail(422, '当前平台不支持这个设置');
    const origin = options.content_origin ?? 'unspecified';
    if (!['unspecified', 'original', 'repost'].includes(origin)) throw fail(422, '请选择内容来源');
    if (aiSupported && origin !== 'unspecified') throw fail(422, '该平台暂不支持设置原创或转载声明');
    if (options.ai_declaration != null && !['none', 'ai_generated'].includes(options.ai_declaration)) throw fail(422, '请选择有效的 AI 声明');
    const source = text(options.source ?? '', 500, '转载来源');
    if (origin === 'repost' && !source) throw fail(422, '转载内容需填写来源');
    if (platform === 'bilibili' && (!Number.isInteger(options.tid) || options.tid <= 0)) throw fail(422, 'B站需要有效的投稿分区 ID');
    return { content_origin: origin, source, ...(aiSupported ? { ai_declaration: options.ai_declaration ?? null } : {}), ...(platform === 'bilibili' ? { tid: options.tid } : {}) };
  }
  function createJob(input) {
    return transaction(() => {
      const contentRef = input.content_ref == null ? null : {
        id: text(input.content_ref.id, 100, '内容标识', true),
        slug: text(input.content_ref.slug, 160, '内容地址', true),
      };
      if (contentRef && (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(contentRef.slug) || !/^[a-z0-9-]+$/.test(contentRef.id))) throw fail(422, '内容关联无效');
      if (asset(input.video_asset_id).type !== 'video') throw fail(422, '请选择视频');
      if (!Array.isArray(input.targets) || !input.targets.length || input.targets.length > 20) throw fail(422, '请选择 1 至 20 个目标账号');
      const ids = new Set();
      const targets = input.targets.map((selection) => {
        const acc = account(selection.account_id);
        if (ids.has(acc.id)) throw fail(422, '同一批次不能重复选择账号'); ids.add(acc.id);
        const overrides = selection.overrides ?? {};
        if (Object.keys(overrides).some((key) => !['title', 'description', 'tags', 'cover_asset_id'].includes(key))) throw fail(422, '覆盖字段不支持');
        return { id: randomUUID(), account_id: acc.id, platform: acc.platform, overrides, account_snapshot: { alias: acc.alias, platform: acc.platform, display_name: acc.display_name, platform_uid: acc.platform_uid }, snapshot: { ...normalizeContent({ ...input.defaults, ...overrides }, acc.platform), platform_options: normalizeOptions(selection.platform_options, acc.platform), video_asset_id: input.video_asset_id, video_sha256: asset(input.video_asset_id).sha256 }, status: 'draft', stage: 'draft', platform_status: 'unknown', current_attempt_id: null, submission_intent_at: null, post_id: null, post_url: null, evidence: null, error_code: null, message: null, created_at: now() };
      });
      const value = { id: randomUUID(), ...(contentRef ? { content_ref: contentRef } : {}), video_asset_id: input.video_asset_id, video: publicAsset(asset(input.video_asset_id)), defaults: input.defaults, status: 'draft', created_at: now(), committed_at: null };
      db.prepare('INSERT INTO jobs(id,request_hash,created_at,payload) VALUES(?,?,?,?)').run(value.id, digest(input), value.created_at, JSON.stringify(value));
      for (const item of targets) { item.job_id = value.id; db.prepare('INSERT INTO targets VALUES(?,?,?,?,?,?)').run(item.id, value.id, item.account_id, item.status, item.created_at, JSON.stringify(item)); }
      return job(value.id);
    });
  }
  function submit(id, key) {
    text(key, 160, '提交标识', true);
    return transaction(() => {
      const value = job(id);
      const row = db.prepare('SELECT * FROM jobs WHERE id=?').get(id);
      const existing = db.prepare('SELECT * FROM jobs WHERE idempotency_key=?').get(key);
      if (existing) {
        if (existing.request_hash !== row.request_hash) throw fail(409, '相同提交标识已用于不同内容');
        return job(existing.id);
      }
      if (row.committed) return value;
      for (const item of value.targets) {
        const acc = account(item.account_id); if (acc.auth_status !== 'valid') throw fail(409, `请先登录并检查账号：${acc.alias}`);
        item.status = 'queued'; item.stage = 'queued'; put('targets', item);
      }
      value.status = 'committed'; value.committed_at = now(); delete value.targets;
      db.prepare('UPDATE jobs SET committed=1,idempotency_key=?,payload=? WHERE id=?').run(key, JSON.stringify(value), id);
      return job(id);
    });
  }
  function newSession(accountId, operation) {
    return transaction(() => {
      const acc = account(accountId);
      if (operation === 'login' && acc.platform === 'bilibili') throw fail(422, 'B站需先在执行节点本地登录，再检查会话');
      if (all('sessions').some((item) => item.account_id === accountId && activeStates.has(item.status)) || all('targets').some((item) => item.account_id === accountId && ['running', 'waiting_user'].includes(item.status))) throw fail(409, '账号正在使用中');
      const value = { id: randomUUID(), account_id: accountId, platform: acc.platform, operation, status: 'queued', stage: 'queued', qr_version: 0, created_at: now(), expires_at: new Date(Date.now() + 10 * 60_000).toISOString(), challenge: null };
      db.prepare('INSERT INTO sessions VALUES(?,?,?,?,?)').run(value.id, value.account_id, value.status, value.created_at, JSON.stringify(value)); return value;
    });
  }
  function claim(owner, leaseMs = 30_000) {
    return transaction(() => {
      const lease = db.prepare('SELECT * FROM executor WHERE id=1').get();
      if (lease.expires > Date.now()) return null;
      // The service must stop a stale process group before the slot can be reused.
      if (all('targets').some((item) => ['running', 'waiting_user'].includes(item.status)) || all('sessions').some((item) => ['running', 'waiting_user'].includes(item.status))) return null;
      const session = parse(db.prepare("SELECT payload FROM sessions WHERE status='queued' ORDER BY created_at LIMIT 1").get());
      const selected = session ? null : parse(db.prepare("SELECT payload FROM targets WHERE status='queued' ORDER BY created_at LIMIT 1").get());
      if (!session && !selected) return null;
      const until = Date.now() + leaseMs;
      db.prepare('UPDATE executor SET owner=?,expires=? WHERE id=1').run(owner, until);
      if (session) { session.status = 'running'; session.owner = owner; session.expires_at = new Date(Date.now() + 10 * 60_000).toISOString(); put('sessions', session); return { kind: 'session', value: session }; }
      const number = Number(db.prepare('SELECT COALESCE(MAX(attempt_no),0)+1 AS number FROM attempts WHERE target_id=?').get(selected.id).number);
      const attempt = { id: randomUUID(), target_id: selected.id, attempt_no: number, owner, status: 'running', started_at: now(), heartbeat_at: now(), submission_intent_at: null, process_stopped: false };
      db.prepare('INSERT INTO attempts VALUES(?,?,?,?)').run(attempt.id, selected.id, number, JSON.stringify(attempt));
      selected.current_attempt_id = attempt.id; selected.status = 'running'; selected.stage = 'checking'; selected.error_code = null; selected.message = null; put('targets', selected);
      return { kind: 'target', value: selected, attempt };
    });
  }
  const owns = (owner) => { const lease = db.prepare('SELECT * FROM executor WHERE id=1').get(); return lease.owner === owner && lease.expires > Date.now(); };
  function heartbeat(owner) { const result = db.prepare('UPDATE executor SET expires=? WHERE id=1 AND owner=? AND expires>?').run(Date.now() + 30_000, owner, Date.now()); return Number(result.changes) === 1; }
  function beforeSubmit(targetId, attemptId, owner) {
    return transaction(() => {
      const value = target(targetId); const attempt = get('attempts', attemptId);
      if (!owns(owner) || value.current_attempt_id !== attemptId || !attempt || attempt.owner !== owner || value.cancel_requested || !['running', 'waiting_user'].includes(value.status) || attempt.submission_intent_at) return false;
      value.submission_intent_at = now(); value.stage = 'submitting'; value.status = 'running'; attempt.submission_intent_at = value.submission_intent_at;
      put('targets', value); put('attempts', attempt); return true;
    });
  }
  function updateOperation(operation, update, owner) {
    if (!owns(owner)) return false;
    const table = operation.kind === 'target' ? 'targets' : 'sessions';
    const value = get(table, operation.value.id);
    if (!value || !['running', 'waiting_user'].includes(value.status)) return false;
    if (operation.kind === 'target' && value.current_attempt_id !== operation.attempt.id) return false;
    if (Object.hasOwn(update, 'auth_observation')) {
      const observation = operation.kind === 'session' && value.platform === 'douyin' && value.operation === 'login' ? safeAuthObservation(update.auth_observation) : null;
      update = { ...update }; delete update.auth_observation;
      if (observation) update.auth_observation = observation;
    }
    put(table, { ...value, ...update }); return true;
  }
  function finish(operation, result, owner) {
    return transaction(() => {
      if (!owns(owner)) return;
      if (result?.process_stopped === false) {
        const table = operation.kind === 'session' ? 'sessions' : 'targets';
        const value = get(table, operation.value.id);
        put(table, { ...value, stage: 'stopping', message: '正在确认执行进程已停止，请稍候', cancel_requested: true });
        db.prepare('UPDATE executor SET owner=NULL,expires=0 WHERE id=1 AND owner=?').run(owner);
        return;
      }
      if (operation.kind === 'session') {
        const session = get('sessions', operation.value.id);
        if (session && ['running', 'waiting_user'].includes(session.status)) {
          const knownError = typeof result?.error_code === 'string' && Object.hasOwn(errorMessages, result.error_code) ? result.error_code : null;
          const valid = result?.auth_status === 'valid' && !result?.error_code && result?.status !== 'failed';
          // A failed login preparation does not prove that an account expired.
          // Only a completed check with an explicit invalid result establishes that.
          const invalidCheck = session.operation === 'check' && result?.auth_status === 'invalid' && !result?.error_code && result?.status !== 'failed';
          const completed = valid || invalidCheck;
          const authStatus = valid ? 'valid' : invalidCheck ? 'invalid' : 'unknown';
          const errorCode = session.cancel_requested || completed ? null : knownError || (session.operation === 'check' ? 'AUTH_CHECK_FAILED' : session.qr_version > 0 ? 'LOGIN_NOT_COMPLETED' : 'QR_UNAVAILABLE');
          const message = session.cancel_requested ? '已取消本次操作' : errorCode ? errorMessages[errorCode] : valid ? '账号已连接' : '账号尚未登录或会话已失效，请重新登录';
          put('sessions', { ...session, status: session.cancel_requested ? 'canceled' : completed ? 'completed' : 'failed', auth_status: authStatus, challenge: null, qr_path: null, error_code: errorCode, message, finished_at: now() });
          const acc = account(session.account_id); put('accounts', { ...acc, auth_status: authStatus, checked_at: now() });
        }
      } else {
        const value = target(operation.value.id); const attempt = get('attempts', operation.attempt.id);
        if (value.current_attempt_id === attempt.id && ['running', 'waiting_user'].includes(value.status)) {
          let status = value.submission_intent_at || result?.process_stopped === false ? 'submission_unknown' : value.cancel_requested ? 'canceled' : 'failed';
          if (value.submission_intent_at && result?.status === 'submitted' && result.evidence?.kind && result.evidence?.summary) status = 'submitted';
          const postUrl = safePostUrl(result?.post_url, value.platform);
          const evidence = status === 'submitted' ? { kind: String(result.evidence.kind).slice(0, 80), summary: String(result.evidence.summary).replace(/[\r\n]/g, ' ').slice(0, 500) } : null;
          Object.assign(value, { status, stage: 'done', platform_status: 'unknown', evidence, post_id: status === 'submitted' && typeof result?.post_id === 'string' ? result.post_id.slice(0, 100) : null, post_url: status === 'submitted' ? postUrl : null, message: { submitted: '已提交平台，审核状态未确认', submission_unknown: '提交结果待核实，请先查看平台作品', canceled: '已停止发布', failed: '提交前执行未完成，请检查账号、素材和平台要求后重试' }[status], error_code: status === 'failed' ? 'EXECUTION_FAILED' : null, challenge: null });
          if (status === 'failed' && errorMessages[result?.error_code]) { value.error_code = result.error_code; value.message = errorMessages[result.error_code]; }
          if (result?.error_code === 'ACCOUNT_LOGIN_REQUIRED') { const acc = account(value.account_id); put('accounts', { ...acc, auth_status: 'invalid', checked_at: now() }); }
          put('targets', value); put('attempts', { ...attempt, status, process_stopped: result?.process_stopped !== false, finished_at: now(), result: { status, evidence, post_url: value.post_url } });
        }
      }
      db.prepare('UPDATE executor SET owner=NULL,expires=0 WHERE id=1 AND owner=?').run(owner);
    });
  }
  function cancel(id) {
    return transaction(() => {
      const value = target(id);
      if (['draft', 'queued'].includes(value.status)) { value.status = 'canceled'; value.stage = 'done'; }
      else if (['running', 'waiting_user'].includes(value.status)) value.cancel_requested = true;
      else throw fail(409, '当前状态不能取消');
      return put('targets', value);
    });
  }
  function retry(id) {
    return transaction(() => {
      const value = target(id); const attempt = get('attempts', value.current_attempt_id);
      if (get('jobs', value.job_id).status !== 'committed') throw fail(409, '草稿必须先确认发布');
      if (!['failed', 'canceled'].includes(value.status) || value.submission_intent_at || (attempt && !attempt.process_stopped && !attempt.resolution)) throw fail(409, '只有确认未提交且已停止的目标可以重试');
      if (account(value.account_id).auth_status !== 'valid') throw fail(409, '请先检查账号登录状态');
      value.status = 'queued'; value.stage = 'queued'; value.cancel_requested = false; value.challenge = null; return put('targets', value);
    });
  }
  function resolveTarget(id, input) {
    return transaction(() => {
      const value = target(id);
      if (value.status !== 'submission_unknown') throw fail(409, '只有待核实的结果可以核对');
      if (!['found', 'not_published'].includes(input.outcome)) throw fail(422, '请选择核对结果');
      const basis = text(input.basis, 1000, '核对依据', true);
      const resolution = { outcome: input.outcome, basis, operator: 'owner', at: now() };
      const attempt = get('attempts', value.current_attempt_id);
      if (attempt && !attempt.process_stopped) throw fail(409, '原执行进程停止状态未确认；请先由维护者确认执行节点已停止，再处理记录');
      if (input.outcome === 'found') { value.status = 'submitted'; value.post_url = safePostUrl(input.post_url, value.platform); if (input.post_url && !value.post_url) throw fail(422, '作品链接不属于目标平台'); value.evidence = { kind: 'manual_confirmation', summary: basis }; }
      else { value.status = 'failed'; value.submission_intent_at = null; value.post_url = null; value.evidence = null; }
      value.resolution = resolution; value.message = input.outcome === 'found' ? '已人工确认平台作品' : '已人工确认未发布，可重试';
      put('targets', value); if (attempt) put('attempts', { ...attempt, resolution }); return value;
    });
  }
  function disconnect(id) {
    return transaction(() => {
      const acc = account(id);
      if (all('targets').some((item) => item.account_id === id && activeStates.has(item.status)) || all('sessions').some((item) => item.account_id === id && activeStates.has(item.status))) throw fail(409, '账号仍有等待或执行中的任务');
      put('accounts', { ...acc, auth_status: 'disconnected', disconnected_at: now() });
    });
  }
  function acquireRecovery(owner) {
    return Number(db.prepare('UPDATE executor SET owner=?,expires=? WHERE id=1 AND expires<=?').run(owner, Date.now() + 30_000, Date.now()).changes) === 1;
  }
  function recoverOperation(operation, owner, stopped) {
    if (!owns(owner) || !stopped) return false;
    if (operation.kind === 'session') put('sessions', { ...operation.value, status: 'expired', qr_path: null, challenge: null, message: '执行中断，请重新登录或检查' });
    else {
      const value = target(operation.value.id); const attempt = get('attempts', value.current_attempt_id);
      const status = value.submission_intent_at ? 'submission_unknown' : value.cancel_requested ? 'canceled' : 'failed';
      put('targets', { ...value, status, stage: 'interrupted', challenge: null, message: status === 'submission_unknown' ? '执行中断，请核对平台作品' : '执行已停止，可重新尝试' });
      if (attempt) put('attempts', { ...attempt, status, finished_at: now(), process_stopped: true });
    }
    return true;
  }
  const release = (owner) => db.prepare('UPDATE executor SET owner=NULL,expires=0 WHERE id=1 AND owner=?').run(owner);
  return { db, all, get, put, account, asset, target, job, transaction, createAccount, addAsset, findAssetByDigest, createJob, submit, newSession, claim, owns, heartbeat, beforeSubmit, updateOperation, finish, cancel, retry, resolveTarget, disconnect, acquireRecovery, recoverOperation, release, close: () => db.close() };
}

export function publicAsset(value) { const { path, ...rest } = value; return { ...rest, content_url: `/api/publishing/assets/${value.id}/content` }; }
export function safePostUrl(value, platform) {
  if (!value) return null;
  const domains = { douyin: ['douyin.com'], xiaohongshu: ['xiaohongshu.com', 'xhslink.com'], tencent: ['channels.weixin.qq.com', 'weixin.qq.com'], bilibili: ['bilibili.com', 'b23.tv'] };
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && domains[platform]?.some((domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`)) ? url.toString() : null; } catch { return null; }
}
