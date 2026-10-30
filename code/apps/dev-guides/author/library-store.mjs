import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, rename, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ARTICLE_KEY = /^(draft|content)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const MAX_BYTES = 1024 * 1024;
const MAX_FOLDERS = 500;
const MAX_DEPTH = 6;
const hash = (value) => createHash('sha256').update(value).digest('hex');
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };

function folderName(value) {
  if (typeof value !== 'string') fail(400, '请输入目录名称');
  const name = value.trim().normalize('NFC');
  if (!name || Array.from(name).length > 60 || /[\x00-\x1f\x7f/\\]/.test(name) || /^\.+$/.test(name)) {
    fail(400, '目录名称需为 1–60 字，不能包含斜杠或控制字符');
  }
  return name;
}

function validate(state) {
  if (!record(state) || state.version !== 1 || !Array.isArray(state.folders) || state.folders.length > MAX_FOLDERS || !record(state.assignmentsBySlug)) {
    fail(400, '目录数据格式错误');
  }
  const ids = new Map();
  const siblings = new Set();
  for (const folder of state.folders) {
    if (!record(folder) || !UUID.test(folder.id) || ids.has(folder.id) || (folder.parentId !== null && !UUID.test(folder.parentId))) fail(400, '目录标识无效');
    if (folderName(folder.name) !== folder.name) fail(400, '目录名称无效');
    const sibling = JSON.stringify([folder.parentId, folder.name.toLocaleLowerCase('en-US')]);
    if (siblings.has(sibling)) fail(409, '此位置已有同名目录');
    siblings.add(sibling); ids.set(folder.id, folder);
  }
  for (const folder of state.folders) {
    const visited = new Set([folder.id]);
    let parent = folder.parentId;
    while (parent !== null) {
      if (!ids.has(parent)) fail(400, '上级目录不存在');
      if (visited.has(parent)) fail(400, '不能把目录移动到自己或自己的子目录中');
      visited.add(parent);
      if (visited.size > MAX_DEPTH) fail(400, '目录最多支持 6 层');
      parent = ids.get(parent).parentId;
    }
  }
  for (const [slug, folderId] of Object.entries(state.assignmentsBySlug)) {
    if (!SLUG.test(slug) || !ids.has(folderId)) fail(400, '文章所属目录无效');
  }
}

/** Private organization only. Slug ownership survives draft -> content promotion. */
export function createLibraryStore({ projectRoot, listArticleKeys }) {
  const root = resolve(projectRoot);
  const path = join(root, '.library.json');
  let pending = Promise.resolve();

  function serialize(action) {
    const result = pending.then(action, action);
    pending = result.catch(() => {});
    return result;
  }

  async function inspectFile() {
    const rootInfo = await lstat(root);
    if (!rootInfo.isDirectory()) fail(400, '文章目录不是普通文件夹');
    const info = await lstat(path).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (info && (!info.isFile() || info.nlink !== 1)) fail(400, '目录数据不是独立的普通文件');
    if (info && info.size > MAX_BYTES) fail(413, '目录数据超过大小限制');
    return info;
  }

  async function load() {
    if (!await inspectFile()) return { version: 1, folders: [], assignmentsBySlug: {} };
    const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
    try {
      const info = await handle.stat();
      if (!info.isFile() || info.nlink !== 1 || info.size > MAX_BYTES) fail(400, '目录数据文件无效');
      const text = await handle.readFile('utf8');
      if (Buffer.byteLength(text) > MAX_BYTES) fail(413, '目录数据超过大小限制');
      try {
        const state = JSON.parse(text);
        validate(state);
        return state;
      } catch {
        fail(500, '目录数据损坏，请从私有备份恢复');
      }
    } finally { await handle.close(); }
  }

  function present(state, articleKeys) {
    const assignments = {};
    for (const key of articleKeys) {
      const slug = ARTICLE_KEY.exec(key)?.[2];
      if (slug && Object.hasOwn(state.assignmentsBySlug, slug)) assignments[key] = state.assignmentsBySlug[slug];
    }
    // Include the current article keys so a tab cannot unknowingly act on a
    // classification view from before a draft was promoted or created.
    const revision = hash(JSON.stringify([state, [...articleKeys].sort()]));
    return { revision, folders: state.folders, assignments };
  }

  async function write(state) {
    const text = `${JSON.stringify(state, null, 2)}\n`;
    if (Buffer.byteLength(text) > MAX_BYTES) fail(413, '目录数据超过大小限制');
    await inspectFile();
    const temp = `${path}.${randomUUID()}.tmp`;
    let handle;
    try {
      handle = await open(temp, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
      await handle.writeFile(text);
      await handle.sync();
      await handle.close(); handle = undefined;
      // A symlink substituted during the write must not be followed or replaced.
      await inspectFile();
      await rename(temp, path);
    } finally {
      if (handle) await handle.close();
      await unlink(temp).catch((error) => { if (error.code !== 'ENOENT') throw error; });
    }
  }

  return {
    withArticlesMutation: serialize,
    read: () => serialize(async () => present(await load(), await listArticleKeys())),
    apply: (input) => serialize(async () => {
      if (!record(input)) fail(400, '目录操作格式错误');
      const state = await load();
      const keys = await listArticleKeys();
      if (typeof input.revision !== 'string' || input.revision !== present(state, keys).revision) fail(409, '目录已在其他窗口更新，请刷新目录后重试');
      const getFolder = (id) => {
        if (typeof id !== 'string' || !UUID.test(id)) fail(400, '目录标识无效');
        const found = state.folders.find((folder) => folder.id === id);
        if (!found) fail(404, '目录不存在');
        return found;
      };
      const parentId = (value) => {
        if (value === null || value === undefined) return null;
        return getFolder(value).id;
      };
      let createdId;
      switch (input.action) {
        case 'create': {
          if (state.folders.length >= MAX_FOLDERS) fail(400, '目录数量已达 500 个上限');
          createdId = randomUUID();
          state.folders.push({ id: createdId, name: folderName(input.name), parentId: parentId(input.parentId) });
          break;
        }
        case 'rename': getFolder(input.id).name = folderName(input.name); break;
        case 'move': getFolder(input.id).parentId = parentId(input.parentId); break;
        case 'delete': {
          const folder = getFolder(input.id);
          const activeSlugs = new Set(keys.map((key) => ARTICLE_KEY.exec(key)[2]));
          if (state.folders.some((item) => item.parentId === folder.id) || Object.entries(state.assignmentsBySlug).some(([slug, id]) => id === folder.id && activeSlugs.has(slug))) {
            fail(409, '目录中还有文章或子目录，请先移走内容');
          }
          state.folders = state.folders.filter((item) => item.id !== folder.id);
          for (const [slug, id] of Object.entries(state.assignmentsBySlug)) if (id === folder.id) delete state.assignmentsBySlug[slug];
          break;
        }
        case 'assign': {
          const match = typeof input.articleKey === 'string' && ARTICLE_KEY.exec(input.articleKey);
          if (!match) fail(400, '文章标识无效');
          if (!keys.includes(input.articleKey)) fail(404, '文章不存在，请刷新目录');
          if (input.folderId === null) delete state.assignmentsBySlug[match[2]];
          else {
            const folder = getFolder(input.folderId);
            Object.defineProperty(state.assignmentsBySlug, match[2], { value: folder.id, configurable: true, writable: true, enumerable: true });
          }
          break;
        }
        default: fail(400, '不支持的目录操作');
      }
      validate(state);
      await write(state);
      return { ...present(state, keys), ...(createdId ? { createdId } : {}) };
    }),
  };
}
