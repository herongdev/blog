import { createReadStream } from 'node:fs';
import { access, chmod, lstat, mkdir, open, readFile, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createHash, randomUUID } from 'node:crypto';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPublishingStore, fail, now, platforms, publicAsset } from './store.mjs';

const exec = promisify(execFile);
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const PREFIX = '/api/publishing';
const RUNNER = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../integrations/social-publisher/runner.py');
const ACTIVE = new Set(['running', 'waiting_user']);
const bytesLimit = (value, fallback) => Number.isSafeInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback;

async function processStart(pid) {
  try { return (await exec('ps', ['-p', String(pid), '-o', 'lstart='], { timeout: 3000 })).stdout.trim() || null; }
  catch (error) { if (error.code === 1) return null; throw error; }
}
function groupAlive(pid) {
  try { process.kill(-pid, 0); return true; } catch (error) { return error.code !== 'ESRCH'; }
}
async function stopGroup(pid, signature) {
  if (!pid) return true;
  let current;
  try { current = await processStart(pid); } catch { return false; }
  // A reused PID belongs to a different process; the original group has ended.
  if (current && signature && current !== signature) return true;
  if (current && !signature) return false;
  if (!groupAlive(pid)) return true;
  try { process.kill(-pid, 'SIGKILL'); } catch (error) { if (error.code !== 'ESRCH') return false; }
  for (let i = 0; i < 30 && groupAlive(pid); i += 1) await sleep(100);
  return !groupAlive(pid);
}
async function digestFile(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}
async function checkRuntime(python, runnerPath, cwd, env) {
  return new Promise((done) => {
    const child = spawn(python, ['-u', runnerPath], { cwd, env, stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '', settled = false;
    const finish = (value) => { if (settled) return; settled = true; clearTimeout(timer); done(value); };
    const timer = setTimeout(() => { child.kill('SIGKILL'); finish(null); }, 15_000);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => { output += chunk; if (output.length > 64 * 1024) { child.kill('SIGKILL'); finish(null); } });
    child.stderr.resume(); child.stdin.on('error', () => {});
    child.once('error', () => finish(null));
    child.once('close', () => {
      try {
        const result = output.trim().split('\n').map((line) => JSON.parse(line)).find((item) => item.type === 'result' && item.status === 'ready' && item.protocol_version === 1);
        finish(Array.isArray(result?.platforms) ? result.platforms : null);
      } catch { finish(null); }
    });
    child.stdin.end(`${JSON.stringify({ operation: 'health' })}\n`);
  });
}
function publicSession(value) {
  if (!value) throw fail(404, '登录会话不存在');
  const { qr_path, owner, pid, process_start, challenge_image_path, ...rest } = value;
  return { ...rest, qrcode_url: qr_path && ACTIVE.has(value.status) ? `${PREFIX}/login-sessions/${value.id}/qrcode?v=${value.qr_version}` : null };
}
function publicRecord(value) {
  return JSON.parse(JSON.stringify(value, (key, item) => ['owner', 'pid', 'process_start', 'challenge_image_path', 'qr_path'].includes(key) ? undefined : item));
}

export async function createPublishingService({ dataRoot, env = process.env, runnerPath = env.PUBLISHER_RUNNER || RUNNER, startWorker = true }) {
  if (!dataRoot) throw new Error('Publishing data root is required');
  let root = resolve(dataRoot);
  for (const directory of [root, join(root, 'assets'), join(root, 'accounts'), join(root, 'runtime')]) {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    if (!(await lstat(directory)).isDirectory()) throw new Error('Publishing directories must not be symlinks');
    await chmod(directory, 0o700);
  }
  root = await realpath(root);
  const store = createPublishingStore(join(root, 'publishing.sqlite'));
  await chmod(join(root, 'publishing.sqlite'), 0o600);
  const owner = randomUUID();
  let active = null, ticking = false, closed = false, uploadBusy = false;
  const python = env.PUBLISHER_PYTHON;
  const sauRoot = resolve(env.PUBLISHER_SAU_ROOT || join(dirname(runnerPath), '.vendor/social-auto-upload'));
  const childEnv = {};
  for (const key of ['PATH', 'HOME', 'TMPDIR', 'LANG', 'LC_ALL', 'PLAYWRIGHT_BROWSERS_PATH']) if (env[key]) childEnv[key] = env[key];
  if (sauRoot) Object.assign(childEnv, { PUBLISHER_SAU_ROOT: sauRoot, PUBLISHER_DATA_DIR: root, PYTHONUNBUFFERED: '1' });
  let executorReady = false;
  let readyPlatforms = [];
  if (python && sauRoot) {
    try {
      await access(python, constants.X_OK); await access(runnerPath); await access(join(sauRoot, 'uploader'));
      readyPlatforms = await checkRuntime(python, runnerPath, sauRoot, childEnv) || [];
      executorReady = readyPlatforms.length > 0;
    } catch { /* Setup status is exposed without private paths. */ }
  }
  const accountPath = (id) => join(root, 'accounts', `${id}.json`);
  const requireExecutor = () => { if (!executorReady) throw fail(503, '发布服务尚未准备好，请联系维护者完成配置；素材和草稿可正常保存'); };
  const maxVideo = bytesLimit(env.PUBLISHER_MAX_VIDEO_BYTES, 2 * 1024 ** 3);
  const maxStorage = bytesLimit(env.PUBLISHER_MAX_STORAGE_BYTES, 20 * 1024 ** 3);
  const maxDuration = bytesLimit(env.PUBLISHER_TASK_TIMEOUT_MS, 30 * 60_000);
  const presentAccount = (value) => ({ ...value, login_method: platforms.find((item) => item.id === value.platform)?.login_method, ...(value.platform === 'bilibili' ? { local_login_command: `python local_login.py --account-id ${value.id}`, login_hint: '在已配置的执行节点运行登录命令后，点击检查会话。' } : {}) });

  async function verifyAsset(value) {
    const path = join(root, 'assets', value.id + value.extension);
    const info = await lstat(path).catch(() => null);
    if (!info?.isFile() || info.size !== value.size || await digestFile(path) !== value.sha256) throw fail(422, '素材文件已缺失或内容发生变化，请重新上传');
    return path;
  }
  async function precheck(job) {
    const issues = [];
    if (!executorReady) issues.push('发布服务尚未准备好，请联系维护者完成配置');
    try { await verifyAsset(store.asset(job.video_asset_id)); } catch (error) { issues.push(error.message); }
    for (const target of job.targets) {
      try {
        const acc = store.account(target.account_id);
        if (executorReady && !readyPlatforms.includes(acc.platform)) issues.push(`${acc.alias}：该平台执行组件尚未就绪`);
        if (acc.auth_status !== 'valid') issues.push(`${acc.alias}：请先登录并检查账号`);
        if (acc.platform === 'bilibili' && !['original', 'repost'].includes(target.snapshot.platform_options.content_origin)) issues.push(`${acc.alias}：请选择原创或转载`);
        if (target.snapshot.cover_asset_id) {
          const cover = store.asset(target.snapshot.cover_asset_id); await verifyAsset(cover);
          if (['douyin', 'tencent'].includes(target.platform) && Math.abs(cover.width / cover.height - 0.75) > 0.03) issues.push(`${acc.alias}：请使用 3:4 竖版封面`);
        }
      } catch (error) { issues.push(error.status ? error.message : '目标账号或素材不可用'); }
    }
    return { ok: issues.length === 0, issues: [...new Set(issues)], checked_at: now(), account_check: 'cached' };
  }

  async function saveAsset(request, url) {
    if (uploadBusy) throw fail(409, '已有素材正在上传，请等待完成');
    uploadBusy = true;
    const id = randomUUID(); const temp = join(root, 'assets', `${id}.upload`); let finalPath;
    try {
      const type = url.searchParams.get('type');
      if (!['video', 'cover'].includes(type)) throw fail(422, '请选择视频或封面');
      const filename = (url.searchParams.get('filename') || '').replace(/[\\/\u0000-\u001f]/g, '_').slice(0, 240);
      const extension = extname(filename).toLowerCase();
      if (type === 'video' && !['.mp4', '.mov', '.m4v', '.webm'].includes(extension)) throw fail(422, '视频支持 MP4、MOV、M4V 和 WebM');
      if (type === 'cover' && !['.png', '.jpg', '.jpeg', '.webp'].includes(extension)) throw fail(422, '封面支持 PNG、JPEG 和 WebP');
      const limit = type === 'video' ? maxVideo : 15 * 1024 ** 2;
      if (Number(request.headers['content-length']) > limit) throw fail(413, '素材超过大小限制');
      let size = 0;
      const file = await open(temp, 'wx', 0o600);
      try {
        for await (const chunk of request) {
          size += chunk.length;
          if (size > limit) throw fail(413, '素材超过大小限制');
          await file.write(chunk);
        }
      } finally { await file.close(); }
      if (!size) throw fail(422, '素材不能为空');
      let mime, width, height, duration = null, outputExtension = extension;
      if (type === 'cover') {
        const { prepareImageAsset } = await import('../../scripts/media-core.mjs');
        let prepared;
        try { prepared = await prepareImageAsset({ bytes: await readFile(temp), filename, slug: 'publishing', baseUrl: 'https://private.invalid' }); }
        catch { throw fail(422, '封面无法解码或格式不符，请使用单帧 PNG、JPEG、WebP'); }
        await writeFile(temp, prepared.bytes, { mode: 0o600 }); size = prepared.bytes.length; mime = prepared.contentType;
        outputExtension = mime === 'image/jpeg' ? '.jpg' : mime === 'image/png' ? '.png' : '.webp';
        const { default: sharp } = await import('sharp');
        const metadata = await sharp(prepared.bytes).metadata(); width = metadata.width; height = metadata.height;
      } else {
        let probe;
        try { probe = JSON.parse((await exec(env.PUBLISHER_FFPROBE || 'ffprobe', ['-v', 'error', '-protocol_whitelist', 'file,pipe', '-show_entries', 'stream=codec_type,width,height:format=duration,format_name', '-of', 'json', temp], { timeout: 30_000, maxBuffer: 128 * 1024 })).stdout); }
        catch { throw fail(422, '无法验证视频，请检查视频文件及执行节点的视频检查组件'); }
        const stream = probe.streams?.find((item) => item.codec_type === 'video' && item.width > 0 && item.height > 0);
        duration = Number(probe.format?.duration);
        if (!stream || !Number.isFinite(duration) || duration <= 0 || !/(?:mov|mp4|matroska|webm)/.test(probe.format?.format_name || '')) throw fail(422, '视频没有可读取的画面或时长');
        if (extension === '.webm' ? !/(?:matroska|webm)/.test(probe.format.format_name) : !/(?:mov|mp4)/.test(probe.format.format_name)) throw fail(422, '视频实际格式与文件扩展名不一致');
        width = stream.width; height = stream.height; mime = extension === '.webm' ? 'video/webm' : extension === '.mov' ? 'video/quicktime' : 'video/mp4';
      }
      const value = { id, type, filename, size, mime, extension: outputExtension, width, height, duration, sha256: await digestFile(temp), created_at: now() };
      finalPath = join(root, 'assets', id + outputExtension);
      await rename(temp, finalPath);
      const stored = store.transaction(() => {
        const existing = store.findAssetByDigest(value.sha256, value.type);
        if (existing) return existing;
        const used = store.all('assets').reduce((sum, item) => sum + item.size, 0);
        if (used + size > maxStorage) throw fail(413, '素材存储空间已达到当前限额');
        return store.addAsset(value);
      });
      if (stored.id !== value.id) await rm(finalPath, { force: true });
      return publicAsset(stored);
    } catch (error) {
      await rm(temp, { force: true }); if (finalPath) await rm(finalPath, { force: true }); throw error;
    } finally { uploadBusy = false; }
  }

  async function streamFile(request, response, path, mime, size) {
    let start = 0, end = size - 1, status = 200;
    if (request.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
      if (!range || (!range[1] && !range[2])) throw fail(416, '读取范围无效');
      if (!range[1]) start = Math.max(0, size - Number(range[2]));
      else { start = Number(range[1]); if (range[2]) end = Math.min(Number(range[2]), end); }
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) { response.writeHead(416, { 'Content-Range': `bytes */${size}` }); response.end(); return; }
      status = 206;
    }
    response.writeHead(status, { 'Content-Type': mime, 'Content-Length': end - start + 1, 'Accept-Ranges': 'bytes', ...(status === 206 ? { 'Content-Range': `bytes ${start}-${end}/${size}` } : {}), 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin' });
    if (request.method === 'HEAD') response.end();
    else { const stream = createReadStream(path, { start, end }); stream.on('error', () => response.destroy()); response.on('close', () => stream.destroy()); stream.pipe(response); }
  }

  async function recovery() {
    const operations = [
      ...store.all('targets').filter((item) => ACTIVE.has(item.status)).map((value) => ({ kind: 'target', value, attempt: store.get('attempts', value.current_attempt_id) })),
      ...store.all('sessions').filter((item) => ACTIVE.has(item.status)).map((value) => ({ kind: 'session', value })),
    ];
    if (!operations.length || !store.acquireRecovery(owner)) return;
    const timer = setInterval(() => store.heartbeat(owner), 5000);
    try {
      for (const operation of operations) {
        const record = operation.attempt ?? operation.value;
        const stopped = await stopGroup(record.pid, record.process_start);
        store.recoverOperation(operation, owner, stopped);
      }
    } finally { clearInterval(timer); store.release(owner); }
  }

  async function execute(operation) {
    const value = operation.value; const operationId = operation.attempt?.id ?? value.id;
    const workDirectory = join(root, 'runtime', operationId);
    await mkdir(workDirectory, { recursive: true, mode: 0o700 });
    const account = store.account(value.account_id);
    const input = { operation: operation.kind === 'session' ? value.operation : 'publish', platform: account.platform, account_id: account.id, account_file: accountPath(account.id), data_dir: workDirectory, ...(operation.kind === 'session' ? { session_id: value.id } : { target_id: value.id, attempt_id: operation.attempt.id }) };
    if (operation.kind === 'target') {
      const snapshot = value.snapshot;
      input.video_file = await verifyAsset(store.asset(snapshot.video_asset_id));
      input.cover_file = snapshot.cover_asset_id ? await verifyAsset(store.asset(snapshot.cover_asset_id)) : null;
      Object.assign(input, { title: snapshot.title, description: snapshot.description, tags: snapshot.tags, platform_options: { ...snapshot.platform_options, ai_declaration: snapshot.platform_options.ai_declaration === 'ai_generated' ? true : snapshot.platform_options.ai_declaration === 'none' ? false : null } });
    }
    if (closed || !store.owns(owner) || store.get(operation.kind === 'target' ? 'targets' : 'sessions', value.id)?.cancel_requested) throw fail(409, '执行已取消或租约已失效');
    const child = spawn(python, ['-u', runnerPath], { cwd: sauRoot, env: childEnv, detached: true, stdio: ['pipe', 'pipe', 'pipe'] });
    let result = null, buffer = '', lastSequence = 0, finished = false, abortTimer;
    const completion = new Promise((done) => {
      const finalize = async () => {
        if (finished) return; finished = true;
        clearTimeout(timeout); clearTimeout(abortTimer); clearInterval(heartbeat);
        try {
          const record = operation.kind === 'target' ? store.get('attempts', operation.attempt.id) : store.get('sessions', value.id);
          const stopped = await stopGroup(child.pid, record?.process_start);
          store.finish(operation, { ...result, process_stopped: stopped }, owner);
          await rm(workDirectory, { recursive: true, force: true });
        } catch { /* Persisted active operations are reconciled after lease expiry. */ }
        finally { if (active?.operationId === operationId) active = null; done(); }
      };
      child.once('error', finalize); child.once('close', finalize);
    });
    const send = (message) => { if (!child.stdin.destroyed && child.stdin.writable) child.stdin.write(`${JSON.stringify(message)}\n`); };
    const stop = () => {
      send({ type: 'cancel' });
      try { process.kill(-child.pid, 'SIGTERM'); } catch { /* Already stopped. */ }
      abortTimer ??= setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch { /* Already stopped. */ } }, 1500);
    };
    const heartbeat = setInterval(() => {
      if (!store.heartbeat(owner)) { stop(); return; }
      const current = store.get(operation.kind === 'target' ? 'targets' : 'sessions', value.id);
      if (current?.cancel_requested || (current?.challenge && Date.parse(current.challenge.expires_at) < Date.now())) stop();
    }, 2000);
    const timeout = setTimeout(stop, operation.kind === 'session' ? 10 * 60_000 : maxDuration);
    active = { operationId, operation, child, send, stop, completion, workDirectory };
    child.stdin.on('error', () => {});
    // Platform logs may contain account data; they are never copied into task records or HTTP errors.
    child.stderr.resume();
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      if (buffer.length > 512 * 1024) { stop(); return; }
      let split;
      while ((split = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, split); buffer = buffer.slice(split + 1);
        try {
          const event = JSON.parse(line);
          if (!Number.isInteger(event.seq) || event.seq <= lastSequence || !store.owns(owner)) { stop(); break; }
          lastSequence = event.seq;
          if (event.attempt_id && event.attempt_id !== operation.attempt?.id || event.session_id && event.session_id !== value.id || event.target_id && event.target_id !== value.id || event.account_id && event.account_id !== account.id) { stop(); break; }
          if (event.type === 'before_submit') {
            const authorized = operation.kind === 'target' && typeof event.request_id === 'string' && store.beforeSubmit(value.id, operation.attempt.id, owner);
            send({ type: 'submit_authorized', request_id: event.request_id, authorized: Boolean(authorized) });
          } else if (event.type === 'stage') {
            const known = new Set(['checking', 'uploading', 'filling', 'preparing', 'submitting', 'verifying', 'waiting_scan', 'waiting_confirmation', 'login', 'done']);
            store.updateOperation(operation, { stage: known.has(event.stage) ? event.stage : 'working' }, owner);
          } else if (event.type === 'qrcode' && operation.kind === 'session') {
            const qr = event.image_path ?? event.qrcode?.image_path;
            if (typeof qr !== 'string' || !resolve(qr).startsWith(workDirectory + sep)) { stop(); break; }
            const current = store.get('sessions', value.id);
            const qrExpires = Math.min(Date.parse(current.expires_at), Date.parse(event.expires_at) || Date.now() + 5 * 60_000);
            store.updateOperation(operation, { status: 'waiting_user', stage: 'waiting_scan', qr_path: qr, qr_version: current.qr_version + 1, qr_expires_at: new Date(qrExpires).toISOString() }, owner);
          } else if (event.type === 'challenge') {
            if (typeof event.challenge_id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(event.challenge_id)) { stop(); break; }
            const expires = Math.min(Date.now() + 5 * 60_000, Date.parse(event.expires_at) || Date.now() + 5 * 60_000);
            const kind = ['sms', 'qrcode', 'manual', 'verification'].includes(event.kind) ? event.kind : 'manual';
            const challenge = { id: event.challenge_id, type: kind, message: kind === 'sms' ? '请输入本次验证的短信验证码' : '平台要求额外验证，请按执行节点提示完成', expires_at: new Date(expires).toISOString() };
            if (typeof event.image_path === 'string' && resolve(event.image_path).startsWith(workDirectory + sep)) challenge.image_url = `${PREFIX}/challenges/${challenge.id}/image`;
            store.updateOperation(operation, { status: 'waiting_user', challenge, challenge_image_path: event.image_path && resolve(event.image_path).startsWith(workDirectory + sep) ? event.image_path : null }, owner);
          } else if (event.type === 'result') result = event;
          else if (event.type === 'error') result = { status: 'failed' };
        } catch { stop(); break; }
      }
    });
    if (child.pid) {
      let signature = null;
      try { signature = await processStart(child.pid); } catch { stop(); }
      const table = operation.kind === 'target' ? 'attempts' : 'sessions';
      const record = store.get(table, operation.attempt?.id ?? value.id);
      if (record && !finished) store.put(table, { ...record, pid: child.pid, process_start: signature });
      if (signature && !finished) send(input); else stop();
    }
    await completion;
  }

  async function tick() {
    if (closed || active || ticking || !executorReady) return;
    ticking = true;
    try {
      await recovery();
      const operation = store.claim(owner);
      if (!operation) return;
      const leaseTimer = setInterval(() => { if (!store.heartbeat(owner)) active?.stop(); }, 5000);
      try { await execute(operation); }
      catch {
        if (active) { const current = active; current.stop(); await current.completion; }
        else store.finish(operation, { status: 'failed', process_stopped: true }, owner);
      }
      finally { clearInterval(leaseTimer); }
    } finally { ticking = false; }
  }
  const timer = startWorker ? setInterval(() => { void tick().catch(() => {}); }, 1000) : null;
  timer?.unref();
  const kick = () => { if (startWorker) void tick().catch(() => {}); };
  function findChallenge(id) {
    for (const table of ['sessions', 'targets']) {
      const value = store.all(table).find((item) => item.challenge?.id === id && item.status === 'waiting_user');
      if (value && Date.parse(value.challenge.expires_at) > Date.now()) return { table, value };
    }
    throw fail(410, '验证已过期或不存在');
  }
  async function privateImage(response, path, parent) {
    if (!path) throw fail(404, '二维码尚未生成或已失效');
    const actual = await realpath(path).catch(() => null);
    if (!actual || !actual.startsWith(parent + sep)) throw fail(404, '二维码已失效');
    const info = await lstat(actual);
    if (!info.isFile() || info.size > 5 * 1024 ** 2) throw fail(404, '二维码已失效');
    response.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin' });
    const stream = createReadStream(actual); stream.on('error', () => response.destroy()); response.on('close', () => stream.destroy()); stream.pipe(response);
  }

  async function handle(request, response, context) {
    const url = context.url;
    if (url.pathname !== PREFIX && !url.pathname.startsWith(PREFIX + '/')) return false;
    const path = url.pathname.slice(PREFIX.length), method = request.method;
      const json = (status, value) => { context.sendJson(response, status, publicRecord(value)); return true; };
    const body = () => context.readJson(request, 128 * 1024);
    if (path === '/capabilities' && method === 'GET') return json(200, { platforms: platforms.map((item) => ({ ...item, enabled: !executorReady || readyPlatforms.includes(item.id) })), executor_ready: executorReady, max_video_bytes: maxVideo, max_cover_bytes: 15 * 1024 ** 2, verification: '未进行真实账号投稿验收' });
    if (path === '/accounts' && method === 'GET') return json(200, { accounts: store.all('accounts').filter((value) => !value.disconnected_at).map(presentAccount) });
    if (path === '/accounts' && method === 'POST') return json(201, { account: presentAccount(store.createAccount(await body())) });
    if (path === '/assets' && method === 'GET') return json(200, { assets: store.all('assets').map(publicAsset) });
    if (path === '/assets' && method === 'POST') return json(201, { asset: await saveAsset(request, url) });
    let match = /^\/assets\/([a-f0-9-]{36})\/content$/.exec(path);
    if (match && ['GET', 'HEAD'].includes(method)) {
      const value = store.asset(match[1]); const file = join(root, 'assets', value.id + value.extension);
      const info = await lstat(file).catch(() => null); if (!info?.isFile()) throw fail(404, '素材文件不存在');
      await streamFile(request, response, file, value.mime, info.size); return true;
    }
    if (path === '/jobs' && method === 'POST') return json(201, { job: store.createJob(await body()) });
    if (path === '/jobs' && method === 'GET') return json(200, { jobs: store.all('jobs').slice(0, 100).map((value) => store.job(value.id)) });
    match = /^\/jobs\/([a-f0-9-]{36})(?:\/(precheck|submit))?$/.exec(path);
    if (match) {
      if (!match[2] && method === 'GET') return json(200, { job: store.job(match[1]) });
      if (match[2] === 'precheck' && method === 'POST') return json(200, await precheck(store.job(match[1])));
      if (match[2] === 'submit' && method === 'POST') {
        const input = await body(); const value = store.job(match[1]);
        if (value.status !== 'committed') { const check = await precheck(value); if (!check.ok) throw fail(422, check.issues.join('；')); }
        const job = store.submit(match[1], input.idempotency_key); kick(); return json(202, { job });
      }
    }
    match = /^\/accounts\/([a-f0-9-]{36})\/(login-sessions|check|session)$/.exec(path);
    if (match) {
      if (match[2] === 'session' && method === 'DELETE') { store.disconnect(match[1]); await rm(accountPath(match[1]), { force: true }); return json(200, { disconnected: true }); }
      if (method === 'POST' && ['login-sessions', 'check'].includes(match[2])) {
        requireExecutor(); if (!readyPlatforms.includes(store.account(match[1]).platform)) throw fail(503, '该平台执行组件尚未就绪');
        const session = store.newSession(match[1], match[2] === 'check' ? 'check' : 'login'); kick(); return json(202, { session: publicSession(session) });
      }
    }
    match = /^\/login-sessions\/([a-f0-9-]{36})(?:\/(qrcode|cancel))?$/.exec(path);
    if (match) {
      const value = store.get('sessions', match[1]); if (!value) throw fail(404, '登录会话不存在');
      if (!match[2] && method === 'GET') return json(200, { session: publicSession(value) });
      if (match[2] === 'qrcode' && method === 'GET') {
        if (!ACTIVE.has(value.status) || Date.parse(value.qr_expires_at ?? value.expires_at) <= Date.now() || Number(url.searchParams.get('v')) !== value.qr_version) throw fail(410, '二维码已更新或失效');
        await privateImage(response, value.qr_path, join(root, 'runtime', value.id)); return true;
      }
      if (match[2] === 'cancel' && method === 'POST') {
        if (value.status === 'queued') store.put('sessions', { ...value, status: 'canceled', challenge: null, qr_path: null });
        else if (ACTIVE.has(value.status)) { store.put('sessions', { ...value, cancel_requested: true }); if (active?.operation.value.id === value.id) active.stop(); }
        return json(200, { session: publicSession(store.get('sessions', value.id)) });
      }
    }
    match = /^\/challenges\/([a-zA-Z0-9_-]{1,100})\/(respond|image)$/.exec(path);
    if (match) {
      const { table, value } = findChallenge(match[1]);
      if (match[2] === 'image' && method === 'GET') { await privateImage(response, value.challenge_image_path, join(root, 'runtime', value.current_attempt_id ?? value.id)); return true; }
      if (match[2] === 'respond' && method === 'POST') {
        const input = await body();
        if (typeof input.value !== 'string' || input.value.length > 200 || input.value.includes('\0')) throw fail(422, '验证输入不符合要求');
        if (!active || active.operation.value.id !== value.id || !store.owns(owner)) throw fail(409, '本次验证执行器不可用，请等待超时后重新操作');
        active.send({ type: 'challenge_response', challenge_id: value.challenge.id, value: input.value });
        store.put(table, { ...value, challenge: null, challenge_image_path: null, status: 'running' }); return json(200, { accepted: true });
      }
    }
    match = /^\/targets\/([a-f0-9-]{36})\/(retry|cancel|resolve)$/.exec(path);
    if (match && method === 'POST') {
      let target;
      if (match[2] === 'retry') { requireExecutor(); target = store.retry(match[1]); kick(); }
      if (match[2] === 'cancel') { target = store.cancel(match[1]); if (active?.operation.value.id === target.id) active.stop(); }
      if (match[2] === 'resolve') target = store.resolveTarget(match[1], await body());
      return json(200, { target, job: store.job(target.job_id) });
    }
    throw fail(404, '发布接口不存在');
  }

  return {
    handle, store, tick, executorReady,
    // Only the authenticated workspace bridge supplies this server-resolved path.
    async importWorkspaceVideo({ path, filename }) {
      const request = createReadStream(path);
      request.headers = { 'content-length': String((await lstat(path)).size) };
      const url = new URL('http://private.invalid/assets');
      url.searchParams.set('type', 'video');
      url.searchParams.set('filename', filename);
      return saveAsset(request, url);
    },
    async close() {
      closed = true; clearInterval(timer);
      if (active) { const current = active; current.stop(); await current.completion; }
      while (ticking) await sleep(20);
      store.close();
    },
  };
}
