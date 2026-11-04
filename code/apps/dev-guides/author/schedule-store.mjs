import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, rename, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_ITEMS = 10000;
const ZONE = 'Asia/Shanghai';
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const hash = (value) => createHash('sha256').update(value).digest('hex');
const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: ZONE, year: 'numeric', month: '2-digit', day: '2-digit' });

export function weekStartShanghai(value = new Date()) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) fail(500, '排期时间无效');
  const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value }) => [type, value]));
  const local = new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00Z`);
  local.setUTCDate(local.getUTCDate() - (local.getUTCDay() + 6) % 7);
  return local.toISOString().slice(0, 10);
}

function addDays(date, count) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + count);
  return value.toISOString().slice(0, 10);
}

function validMonday(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value && date.getUTCDay() === 1;
}

function validEntry(entry, withDone = false) {
  return record(entry) && typeof entry.slug === 'string' && SLUG.test(entry.slug) && entry.slug.length <= 250 &&
    typeof entry.title === 'string' && entry.title.length > 0 && entry.title.length <= 1000 &&
    ['draft', 'content'].includes(entry.kind) && typeof entry.status === 'string' && entry.status.length <= 80 &&
    (!withDone || typeof entry.done === 'boolean');
}

function validate(state) {
  if (!record(state) || ![1, 2].includes(state.version) ||
      (state.version === 1 && (!Number.isInteger(state.cadence) || state.cadence < 1 || state.cadence > 21)) ||
      !record(state.current) || !validMonday(state.current.start) || !Array.isArray(state.current.entries) ||
      !Array.isArray(state.queue) || !Array.isArray(state.history) || state.history.length > 2000 ||
      state.queue.length + state.current.entries.length > MAX_ITEMS) fail(500, '排期数据格式错误，请从私有备份恢复');
  const active = [...state.current.entries, ...state.queue];
  if (!state.current.entries.every((entry) => validEntry(entry, true)) || !state.queue.every((entry) => validEntry(entry)) ||
      new Set(active.map((entry) => entry.slug)).size !== active.length) fail(500, '排期中有无效或重复文章');
  let previous;
  for (const week of state.history) {
    if (!record(week) || !validMonday(week.start) || week.start >= state.current.start || (previous && week.start <= previous) ||
        !Array.isArray(week.entries) || week.entries.length > MAX_ITEMS || !week.entries.every((entry) => validEntry(entry, true)) ||
        new Set(week.entries.map((entry) => entry.slug)).size !== week.entries.length) fail(500, '历史排期数据无效');
    previous = week.start;
  }
}

const snapshot = (entry) => ({ slug: entry.slug, title: entry.title, kind: entry.kind, status: entry.status });
const doneCount = (entries) => entries.filter((entry) => entry.done).length;
// Three imported topics reuse older manuscripts without changing their frontmatter.
const importedSourceIds = { 'codex-worktrees': 'DG004', 'apifox-actual-request': 'DG006', 'cursor-remote-control': 'DG125' };
function initialRank(entry) {
  const sourceId = entry.editorial?.sourceId ?? importedSourceIds[entry.slug];
  const number = /^DG(\d{3})$/.exec(sourceId ?? '');
  if (number) return [Number(number[1]) <= 78 ? 0 : 1, Number(number[1]), 0];
  const recent = /^CM\d{6}-(\d+)$/.exec(sourceId ?? '');
  if (recent) return [2, Number(recent[1]), 0];
  if (entry.editorial?.queue === '主计划') return [0, Number(entry.editorial.week) || 1000, Number(entry.editorial.slot) || 1000];
  if (entry.editorial?.queue === '备选') return [1, 1000, 0];
  if (entry.editorial?.queue === '近期候选') return [2, 1000, 0];
  return [3, 0, 0];
}
function sortInitial(articles) {
  return [...articles].sort((a, b) => {
    const left = initialRank(a); const right = initialRank(b);
    for (let index = 0; index < left.length; index++) if (left[index] !== right[index]) return left[index] - right[index];
    return a.title.localeCompare(b.title, 'zh-CN') || a.slug.localeCompare(b.slug);
  });
}

/** Private filming plans only. Never changes article text, folders or publication state. */
export function createScheduleStore({ projectRoot, listArticles, now = () => new Date() }) {
  const root = resolve(projectRoot); const path = join(root, '.schedule.json');
  let pending = Promise.resolve();
  function serialize(action) {
    const result = pending.then(action, action); pending = result.catch(() => {}); return result;
  }
  async function inspect() {
    const directory = await lstat(root);
    if (!directory.isDirectory() || directory.isSymbolicLink()) fail(400, '文章目录不是普通文件夹');
    const info = await lstat(path).catch((error) => { if (error.code === 'ENOENT') return null; throw error; });
    if (info && (!info.isFile() || info.nlink !== 1)) fail(400, '排期数据不是独立普通文件');
    if (info && info.size > MAX_BYTES) fail(413, '排期数据超过大小限制');
    return info;
  }
  async function readDisk() {
    if (!await inspect()) return null;
    const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
    try {
      const info = await handle.stat();
      if (!info.isFile() || info.nlink !== 1 || info.size > MAX_BYTES) fail(400, '排期数据文件无效');
      const text = await handle.readFile('utf8');
      if (Buffer.byteLength(text) > MAX_BYTES) fail(413, '排期数据超过大小限制');
      let state;
      try { state = JSON.parse(text); } catch { fail(500, '排期数据损坏，请从私有备份恢复'); }
      validate(state); return state;
    } finally { await handle.close(); }
  }
  async function write(state) {
    validate(state);
    const text = `${JSON.stringify(state, null, 2)}\n`;
    if (Buffer.byteLength(text) > MAX_BYTES) fail(413, '排期数据超过大小限制');
    await inspect();
    const temporary = `${path}.${randomUUID()}.tmp`; let handle;
    try {
      handle = await open(temporary, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
      await handle.writeFile(text); await handle.sync(); await handle.close(); handle = undefined;
      await inspect(); await rename(temporary, path);
    } finally {
      if (handle) await handle.close();
      await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; });
    }
  }
  function live(entry, articles, withDone = false) {
    const current = articles.find((article) => article.slug === entry.slug);
    return { ...snapshot(current ?? entry), ...(withDone ? { done: entry.done } : {}), ...(!current ? { missing: true } : {}) };
  }
  async function load() {
    const articles = await listArticles();
    if (!Array.isArray(articles) || articles.length > MAX_ITEMS || !articles.every((entry) => validEntry(entry)) || new Set(articles.map((entry) => entry.slug)).size !== articles.length) fail(409, '文章列表含重复地址或无效信息，请先检查文章');
    const thisMonday = weekStartShanghai(now());
    let state = await readDisk();
    let changed = false;
    if (!state) {
      const ordered = sortInitial(articles).map(snapshot);
      state = { version: 2, current: { start: thisMonday, entries: [] }, queue: ordered, history: [] };
      changed = true;
    } else if (state.version === 1) {
      // Upgrade in place without reselecting this week's entries, changing
      // completion records, or treating the old quota as a new assignment.
      state = { ...state, version: 2 };
      delete state.cadence;
      changed = true;
    }
    if (thisMonday > state.current.start) {
      const archived = { start: state.current.start, entries: state.current.entries.map((entry) => ({ ...snapshot(live(entry, articles)), done: entry.done })) };
      // A new week starts empty. Unfinished entries remain available at the
      // front of the other topics, and only actual past plans enter history.
      const unfinished = archived.entries.filter((entry) => !entry.done).map(snapshot);
      if (archived.entries.length) state.history.push(archived);
      state.current = { start: thisMonday, entries: [] };
      state.queue = [...unfinished, ...state.queue];
      changed = true;
    }
    // Completed entries stay in a fixed prefix. Keep each group's old relative
    // order when adopting existing v1/v2 plans; queue and history stay intact.
    const grouped = [...state.current.entries.filter((entry) => entry.done), ...state.current.entries.filter((entry) => !entry.done)];
    if (grouped.some((entry, index) => entry !== state.current.entries[index])) {
      state.current = { ...state.current, entries: grouped };
      changed = true;
    }
    if (changed) await write(state);
    return { state, articles };
  }
  function present(state, articles) {
    const currentEntries = state.current.entries.map((entry) => live(entry, articles, true));
    const queue = state.queue.map((entry) => live(entry, articles));
    return {
      revision: hash(JSON.stringify([state, articles.map(snapshot).sort((a, b) => a.slug.localeCompare(b.slug))])),
      timezone: ZONE,
      thisWeek: { start: state.current.start, end: addDays(state.current.start, 6), entries: currentEntries },
      queue,
      history: [...state.history].reverse().map((week) => ({ ...week, end: addDays(week.start, 6), entries: week.entries.map((entry) => {
        const article = articles.find((item) => item.slug === entry.slug);
        // The snapshot stays frozen; only the navigation target follows promotion.
        return { ...entry, ...(article ? { kind: article.kind } : { missing: true }) };
      }) })),
    };
  }
  function position(value, maximum, fallback) {
    if (value === undefined && fallback !== undefined) return fallback;
    if (!Number.isInteger(value) || value < 1 || value > maximum) fail(400, `位置应为 1 至 ${maximum} 的整数`);
    return value - 1;
  }
  function take(list, slug, message) {
    const index = list.findIndex((entry) => entry.slug === slug);
    if (index === -1) fail(404, message);
    return list.splice(index, 1)[0];
  }
  return {
    read: () => serialize(async () => { const { state, articles } = await load(); return present(state, articles); }),
    apply: (input) => serialize(async () => {
      if (!record(input)) fail(400, '排期操作格式错误');
      const { state, articles } = await load();
      if (typeof input.revision !== 'string' || input.revision !== present(state, articles).revision) fail(409, '排期已在其他窗口或新一周更新，请刷新后重试');
      if (input.action !== 'cadence' && (typeof input.slug !== 'string' || !SLUG.test(input.slug))) fail(400, '文章地址无效');
      switch (input.action) {
        case 'cadence':
          fail(410, '排期已改为手动安排，请将条目移入本周');
        case 'transfer': {
          if (!['queue', 'current'].includes(input.scope)) fail(400, '只可移到本周或其它');
          const source = state.current.entries.some((entry) => entry.slug === input.slug) ? state.current.entries : state.queue;
          const sourceIndex = source.findIndex((entry) => entry.slug === input.slug);
          if (sourceIndex === -1) fail(404, '这篇文章不在排期中，请刷新后重试');
          const target = input.scope === 'current' ? state.current.entries : state.queue;
          const entry = source[sourceIndex];
          if (source !== target && source === state.current.entries && entry.done) fail(409, '已拍条目请先撤销已拍，再移回其它');
          if (source === target && source === state.current.entries && entry.done) fail(400, '已拍条目固定在顶部，请先撤销已拍再调整位置');
          if (source !== target && target === state.current.entries && !articles.some((article) => article.slug === entry.slug)) fail(404, '文章已不存在，请先移出其它');
          const maximum = target.length + (source === target ? 0 : 1);
          const requested = position(input.position, maximum, maximum - 1);
          const destination = target === state.current.entries ? Math.max(requested, doneCount(target)) : requested;
          source.splice(sourceIndex, 1);
          target.splice(destination, 0, source === target ? entry : target === state.current.entries
            ? { ...snapshot(live(entry, articles)), done: false }
            : snapshot(live(entry, articles)));
          break;
        }
        case 'move': {
          if (!['queue', 'current'].includes(input.scope)) fail(400, '只可调整本周或待拍队列');
          const list = input.scope === 'queue' ? state.queue : state.current.entries;
          const requested = position(input.position, list.length);
          if (input.scope === 'current' && list.some((entry) => entry.slug === input.slug && entry.done)) fail(400, '已拍条目固定在顶部，请先撤销已拍再调整位置');
          const destination = input.scope === 'current' ? Math.max(requested, doneCount(list)) : requested;
          const entry = take(list, input.slug, '这篇文章不在所选队列，请刷新后重试');
          list.splice(destination, 0, entry); break;
        }
        case 'enqueue': {
          if (state.queue.some((entry) => entry.slug === input.slug) || state.current.entries.some((entry) => entry.slug === input.slug)) fail(409, '这篇文章已在排期中');
          const article = articles.find((entry) => entry.slug === input.slug);
          if (!article) fail(404, '文章不存在，请刷新后重试');
          const destination = position(input.position, state.queue.length + 1, state.queue.length);
          state.queue.splice(destination, 0, snapshot(article)); break;
        }
        case 'pull': {
          const destination = Math.max(position(input.position, state.current.entries.length + 1, state.current.entries.length), doneCount(state.current.entries));
          const entry = take(state.queue, input.slug, '文章不在待拍队列');
          if (!articles.some((article) => article.slug === entry.slug)) fail(404, '文章已不存在，请先移出队列');
          state.current.entries.splice(destination, 0, { ...snapshot(live(entry, articles)), done: false }); break;
        }
        case 'defer': {
          const destination = position(input.position, state.queue.length + 1, state.queue.length);
          const entry = take(state.current.entries, input.slug, '文章不在本周排期');
          if (entry.done) fail(409, '已拍条目请先撤销已拍，再移回其它');
          state.queue.splice(destination, 0, snapshot(live(entry, articles))); break;
        }
        case 'complete': {
          if (typeof input.done !== 'boolean') fail(400, '完成状态无效');
          const entry = state.current.entries.find((item) => item.slug === input.slug);
          if (!entry) fail(404, '只可修改本周文章的完成状态');
          if (!articles.some((article) => article.slug === entry.slug)) fail(404, '文章不存在，不能标记已拍');
          if (entry.done !== input.done) {
            state.current.entries.splice(state.current.entries.indexOf(entry), 1);
            entry.done = input.done;
            // Completing appends to the completed prefix; undoing inserts at
            // the front of pending work without disturbing either group.
            state.current.entries.splice(doneCount(state.current.entries), 0, entry);
          }
          break;
        }
        case 'remove': take(state.queue, input.slug, '文章不在待拍队列'); break;
        default: fail(400, '不支持的排期操作');
      }
      await write(state);
      return present(state, articles);
    }),
  };
}
