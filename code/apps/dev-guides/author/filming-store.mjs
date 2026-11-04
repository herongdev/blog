import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, rename, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BYTES = 16 * 1024 * 1024;
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const hash = (value) => createHash('sha256').update(value).digest('hex');
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
export const emptyPreparation = () => ({ goal: '', outline: '', checklist: '', notes: '' });

export function validatePreparation(value) {
  if (!record(value) || Object.keys(value).some((key) => !Object.hasOwn(emptyPreparation(), key))) fail(400, '拍摄准备字段无效');
  for (const text of Object.values(value)) if (typeof text !== 'string' || text.length > 20000 || text.includes('\0')) fail(400, '拍摄准备每项最多 20000 字');
}

export function validateFilmingState(state) {
  if (!record(state) || state.version !== 1 || !record(state.cards)) fail(500, '拍摄资料格式错误');
  for (const [slug, card] of Object.entries(state.cards)) {
    if (!SLUG.test(slug) || !record(card) || !Array.isArray(card.sources) || card.sources.length > 100) fail(500, '拍摄资料格式错误');
    validatePreparation(card.preparation);
    const ids = new Set();
    for (const source of card.sources) {
      if (!record(source) || typeof source.id !== 'string' || ids.has(source.id) || source.kind !== 'research' || typeof source.title !== 'string' ||
          typeof source.body !== 'string' || !record(source.payload) || !/^[a-f0-9]{64}$/.test(source.sha256 ?? '') || hash(JSON.stringify(source.payload)) !== source.sha256 ||
          !Array.isArray(source.urls) || source.urls.some((url) => typeof url !== 'string' || !/^https?:\/\//.test(url))) fail(500, '调研来源记录无效');
      ids.add(source.id);
    }
  }
}

/** Private preparation is independent of article Markdown and its publication. */
export function createFilmingStore({ projectRoot, listArticleKeys }) {
  const root = resolve(projectRoot), path = join(root, '.filming.json');
  let pending = Promise.resolve();
  function serialize(action) { const result = pending.then(action, action); pending = result.catch(() => {}); return result; }
  async function inspect() {
    const directory = await lstat(root);
    if (!directory.isDirectory() || directory.isSymbolicLink()) fail(400, '内容目录无效');
    const info = await lstat(path).catch((error) => { if (error.code === 'ENOENT') return null; throw error; });
    if (info && (!info.isFile() || info.nlink !== 1 || info.size > MAX_BYTES)) fail(400, '拍摄资料文件无效');
    return info;
  }
  async function load() {
    if (!await inspect()) return { version: 1, cards: {} };
    const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
    try {
      const info = await handle.stat();
      if (!info.isFile() || info.nlink !== 1 || info.size > MAX_BYTES) fail(400, '拍摄资料文件无效');
      const text = await handle.readFile('utf8');
      if (Buffer.byteLength(text) > MAX_BYTES) fail(413, '拍摄资料超过容量限制');
      let state; try { state = JSON.parse(text); } catch { fail(500, '拍摄资料损坏，请从私有备份恢复'); }
      validateFilmingState(state); return state;
    } finally { await handle.close(); }
  }
  async function requireArticle(slug) {
    if (typeof slug !== 'string' || !SLUG.test(slug)) fail(400, '内容地址无效');
    if (!(await listArticleKeys()).some((key) => key === `draft/${slug}` || key === `content/${slug}`)) fail(404, '内容不存在');
  }
  function present(slug, state) {
    const card = state.cards[slug] ?? { preparation: emptyPreparation(), sources: [] };
    return { slug, revision: hash(JSON.stringify(card)), ...card };
  }
  async function save(state) {
    validateFilmingState(state);
    const text = `${JSON.stringify(state, null, 2)}\n`;
    if (Buffer.byteLength(text) > MAX_BYTES) fail(413, '拍摄资料超过容量限制');
    await inspect();
    const temporary = `${path}.${randomUUID()}.tmp`;
    let handle;
    try {
      handle = await open(temporary, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
      await handle.writeFile(text); await handle.sync(); await handle.close(); handle = undefined;
      await inspect(); await rename(temporary, path);
    } finally {
      if (handle) await handle.close();
      await unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error; });
    }
  }
  return {
    read: (slug) => serialize(async () => { await requireArticle(slug); return present(slug, await load()); }),
    patch: (slug, input) => serialize(async () => {
      await requireArticle(slug);
      if (!record(input) || Object.keys(input).some((key) => !['revision', 'preparation'].includes(key))) fail(400, '只能编辑拍摄准备，调研来源不可修改');
      validatePreparation(input.preparation);
      const state = await load(), current = present(slug, state);
      if (input.revision !== current.revision) fail(409, '拍摄准备已在其他窗口修改，请保留当前内容并重新读取');
      const { revision, ...card } = current;
      state.cards[slug] = { ...card, preparation: { ...emptyPreparation(), ...card.preparation, ...input.preparation }, updatedAt: new Date().toISOString() };
      await save(state); return present(slug, state);
    }),
  };
}
