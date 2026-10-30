import { randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isMap, parseDocument } from 'yaml';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LIMIT = 8 * 1024 * 1024;
const fail = (message, status = 422) => { throw Object.assign(new Error(message), { status }); };
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const empty = () => ({ version: 1, firstPublishedAtBySlug: {}, legacyUndatedSlugs: [] });
const day = (value) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value));

async function safeRead(path, optional = false) {
  const stat = await lstat(path).catch((error) => { if (optional && error.code === 'ENOENT') return null; throw error; });
  if (!stat) return null;
  if (!stat.isFile() || stat.nlink !== 1 || stat.size > LIMIT) fail('发布日期记录文件不安全，请联系维护者');
  const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const current = await handle.stat();
    if (!current.isFile() || current.nlink !== 1 || current.size > LIMIT) fail('发布日期记录文件不安全，请联系维护者');
    const content = await handle.readFile('utf8');
    if (Buffer.byteLength(content) > LIMIT) fail('发布日期记录超过容量限制');
    return content;
  } finally { await handle.close(); }
}
function json(text) {
  try { return JSON.parse(text); } catch { fail('发布日期记录损坏，请从私有备份恢复'); }
}
function validate(value) {
  if (!record(value) || value.version !== 1 || !record(value.firstPublishedAtBySlug) || !Array.isArray(value.legacyUndatedSlugs) ||
      Object.keys(value.firstPublishedAtBySlug).length + value.legacyUndatedSlugs.length > 10000) fail('发布日期记录格式错误');
  for (const [slug, timestamp] of Object.entries(value.firstPublishedAtBySlug)) {
    if (!SLUG.test(slug) || typeof timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(timestamp) ||
        !Number.isFinite(Date.parse(timestamp)) || new Date(timestamp).toISOString() !== timestamp) fail('发布日期记录包含无效条目');
  }
  if (value.legacyUndatedSlugs.some((slug) => typeof slug !== 'string' || !SLUG.test(slug))) fail('早期教程记录格式错误');
  return value;
}
function merge(left, right) {
  const dates = { ...left.firstPublishedAtBySlug };
  for (const [slug, timestamp] of Object.entries(right.firstPublishedAtBySlug)) {
    if (!Object.hasOwn(dates, slug) || timestamp < dates[slug]) dates[slug] = timestamp;
  }
  return {
    version: 1,
    firstPublishedAtBySlug: Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b))),
    legacyUndatedSlugs: [...new Set([...left.legacyUndatedSlugs, ...right.legacyUndatedSlugs])].filter((slug) => !Object.hasOwn(dates, slug)).sort(),
  };
}

/** Reads only confirmed production metadata; staging candidates never enter history. */
export function createPublicationDates({ stateRoot, getProductionRelease, clock = () => new Date() }) {
  const historyPath = join(stateRoot, 'publication-history.json');
  async function writeHistory(value) {
    validate(value);
    await safeRead(historyPath, true);
    const temp = `${historyPath}.${randomUUID()}.tmp`;
    try {
      await writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600, flag: 'wx' });
      await rename(temp, historyPath);
    } finally { await unlink(temp).catch((error) => { if (error.code !== 'ENOENT') throw error; }); }
  }
  async function confirmedRelease() {
    const release = await getProductionRelease();
    if (!release) return empty();
    const metadata = json(await safeRead(join(release, 'release.json')));
    if (metadata.environment !== 'production') fail('正式发布记录与环境不一致');
    if (metadata.publicationHistoryVersion !== undefined) {
      return validate({ version: metadata.publicationHistoryVersion, firstPublishedAtBySlug: metadata.firstPublishedAtBySlug, legacyUndatedSlugs: metadata.legacyUndatedSlugs });
    }
    // Old releases did not record first publication. Preserve uncertainty rather
    // than assigning today's date or treating updatedAt as the first release.
    const index = json(await safeRead(join(release, 'web/search-index.json')));
    if (!Array.isArray(index)) fail('旧版公开内容索引无法用于核对发布日期');
    const legacy = [];
    for (const entry of index) {
      if (entry?.status !== 'published') continue;
      const slug = typeof entry.url === 'string' ? /\/topics\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(entry.url)?.[1] : null;
      if (!slug) fail('旧版教程地址无法核对，请维护者补充首次发布记录');
      legacy.push(slug);
    }
    return validate({ ...empty(), legacyUndatedSlugs: [...new Set(legacy)] });
  }
  async function recover() {
    const text = await safeRead(historyPath, true);
    const saved = text === null ? empty() : validate(json(text));
    const confirmed = merge(saved, await confirmedRelease());
    if (JSON.stringify(confirmed) !== JSON.stringify(saved)) await writeHistory(confirmed);
    return confirmed;
  }
  async function prepare(snapshotRoot) {
    const confirmed = await recover();
    const candidate = new Date(clock()).toISOString();
    const proposed = structuredClone(confirmed);
    const newSlugs = [];
    async function walk(root, prefix = '') {
      const directory = await lstat(root);
      if (!directory.isDirectory() || directory.isSymbolicLink()) fail('发布快照内容目录不安全');
      for (const entry of await readdir(root, { withFileTypes: true })) {
        const path = join(root, entry.name);
        const relative = prefix + entry.name;
        if (entry.isDirectory()) { await walk(path, `${relative}/`); continue; }
        if (!entry.name.endsWith('.md')) continue;
        const content = await safeRead(path);
        const match = /^(?:\uFEFF)?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(content);
        // The normal Astro content gate reports malformed documents; do not
        // introduce a second parser with different publication requirements.
        if (!match) continue;
        const doc = parseDocument(match[1], { uniqueKeys: true });
        if (doc.errors.length || !isMap(doc.contents)) fail('文章信息无法解析，请先检查后重新发布');
        const slug = relative.slice(0, -3);
        const published = doc.get('status') === 'published';
        doc.delete('publishedAt'); // Never trust editable dates or expose lead dates.
        if (published) {
          if (!SLUG.test(slug)) fail('教程地址不符合发布日期记录规则');
          let timestamp = Object.hasOwn(confirmed.firstPublishedAtBySlug, slug) ? confirmed.firstPublishedAtBySlug[slug] : undefined;
          if (!timestamp && !confirmed.legacyUndatedSlugs.includes(slug)) {
            timestamp = candidate; newSlugs.push(slug); proposed.firstPublishedAtBySlug[slug] = timestamp;
          }
          if (timestamp) doc.set('publishedAt', timestamp);
        }
        // Only the isolated build copy changes. Source files and their optimistic
        // fingerprint remain untouched, including body bytes and private drafts.
        await writeFile(path, `---\n${doc.toString()}---\n${content.slice(match[0].length)}`, { mode: 0o600 });
      }
    }
    await walk(join(snapshotRoot, 'src/content/tutorials'));
    return { confirmed, proposed: merge(empty(), proposed), candidate, newSlugs };
  }
  function assertActivationDate(plan) {
    if (plan.newSlugs.length && day(clock()) !== day(plan.candidate)) fail('发布过程跨越了日期，请重新发布以确保周归档准确', 409);
  }
  return {
    recover,
    prepare,
    assertActivationDate,
    metadata(plan, environment) {
      const dates = environment === 'production' ? plan.proposed : plan.confirmed;
      return { publicationHistoryVersion: 1, firstPublishedAtBySlug: dates.firstPublishedAtBySlug, legacyUndatedSlugs: dates.legacyUndatedSlugs };
    },
    // Called only after production current has atomically switched. If this
    // private backup fails, recover() can reconstruct it from the active release.
    async commit(plan) { await writeHistory(merge(await recover(), plan.proposed)); },
  };
}
