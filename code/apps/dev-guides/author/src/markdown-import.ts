import { isMap, parseDocument, stringify } from 'yaml';

export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
type Target = { frontmatter: string; slug: string };
type Options = { tools: readonly string[]; themes: readonly string[] };
export type MarkdownImport = { frontmatter: string; body: string; hasFrontmatter: boolean; warnings: string[] };
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const normalize = (value: string) => value.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
const own = (value: Record<string, unknown>, key: string) => Object.hasOwn(value, key);

/** A full document, rather than a fenced example or ordinary pasted paragraph. */
export function looksLikeMarkdownDocument(value: string): boolean {
  const source = normalize(value);
  return /^---[\t ]*\n(?:[\t ]*(?:#[^\n]*)?\n)*(?:[\w-]+|'[^'\n]+'|"[^"\n]+")\s*:/.test(source);
}

function parseMapping(value: string, label: string) {
  const document = parseDocument(value, { uniqueKeys: true });
  if (document.errors.length) throw new Error(`${label}格式有误：${document.errors[0].message}`);
  if (!isMap(document.contents)) throw new Error(`${label}必须是字段与值组成的 YAML 对象`);
  let fields: unknown;
  try { fields = document.toJS({ maxAliasCount: 50 }); }
  catch { throw new Error(`${label}包含过多别名或无法读取的引用`); }
  if (!record(fields)) throw new Error(`${label}必须是 YAML 对象`);
  return { document, fields };
}

function validDate(value: unknown, label: string) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`${label}请使用 YYYY-MM-DD 日期`);
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error(`${label}不是有效日期`);
}

/** Pure conversion: it never saves, publishes, or changes the target identity. */
export function parseMarkdownImport(input: string, target: Target, options: Options): MarkdownImport {
  if (new TextEncoder().encode(input).length > MAX_IMPORT_BYTES) throw new Error('Markdown 超过 2 MiB，请缩小文件后再导入');
  if (input.includes('\0')) throw new Error('Markdown 包含无法读取的空字符');
  let source = normalize(input);
  // Explicit import may receive an AI response's single outer Markdown fence.
  const fence = /^```(?:markdown|md)[\t ]*\n([\s\S]*?)\n```[\t ]*\n?$/.exec(source.trim());
  if (fence) source = fence[1];
  if (!source.trim()) throw new Error('请选择 Markdown 文件或粘贴文章内容');
  if (!/^---[\t ]*\n/.test(source)) return { frontmatter: target.frontmatter, body: source, hasFrontmatter: false, warnings: ['未发现文章信息头，只替换正文；现有发布信息保留。'] };
  const header = /^---[\t ]*\n([\s\S]*?)\n---[\t ]*(?:\n|$)/.exec(source);
  if (!header) throw new Error('文章信息头没有结束，请在 YAML 信息后补上单独一行 ---');
  const { fields } = parseMapping(header[1], '文章信息');
  const warnings: string[] = [];
  for (const [canonical, aliases] of [['summary', ['description']], ['updatedAt', ['updated', 'date']], ['keywords', ['tags']]] as const) {
    if (!own(fields, canonical)) {
      const alias = aliases.find((key) => own(fields, key));
      if (alias) fields[canonical] = fields[alias];
    }
    for (const alias of aliases) delete fields[alias];
  }
  if (!own(fields, 'tool')) {
    const current = parseMapping(target.frontmatter, '当前文章信息').fields;
    if (typeof current.tool === 'string' && options.tools.includes(current.tool)) fields.tool = current.tool;
  }
  if (typeof fields.tool !== 'string' || !options.tools.includes(fields.tool)) throw new Error('文章信息中的 tool 不在支持的工具列表内，请先修正原稿');
  if (!own(fields, 'status')) fields.status = 'draft';
  if (typeof fields.status !== 'string' || !['draft', 'lead', 'published'].includes(fields.status)) throw new Error('status 只支持 draft、lead 或 published');
  for (const key of ['title', 'summary', 'version', 'platform', 'videoUrl']) if (own(fields, key) && typeof fields[key] !== 'string') throw new Error(`${key} 必须是文字`);
  for (const key of ['updatedAt', 'publishedAt']) if (own(fields, key)) validDate(fields[key], key);
  for (const key of ['keywords', 'searchClues', 'themes']) if (own(fields, key) && (!Array.isArray(fields[key]) || !fields[key].every((item) => typeof item === 'string'))) throw new Error(`${key} 必须是文字列表`);
  if (Array.isArray(fields.themes) && fields.themes.some((item) => !options.themes.includes(item))) throw new Error('themes 包含尚未支持的主题，请使用后台主题标识');
  for (const key of ['officialSources', 'discoverySources']) {
    if (own(fields, key) && (!Array.isArray(fields[key]) || fields[key].some((item) => !record(item) || typeof item.title !== 'string' || typeof item.url !== 'string'))) throw new Error(`${key} 必须包含 title 和 url 的来源列表`);
  }
  if (own(fields, 'verification')) {
    if (!record(fields.verification)) throw new Error('verification 必须是实测记录对象；没有证据时请从原稿省略');
    if (own(fields.verification, 'testedAt')) validDate(fields.verification.testedAt, '实测日期');
    for (const key of ['environment', 'result']) if (own(fields.verification, key) && typeof fields.verification[key] !== 'string') throw new Error(`verification.${key} 必须是文字`);
  }
  // The URL and revision belong to the opened content, never to an imported file.
  if (own(fields, 'slug')) { if (fields.slug !== target.slug) warnings.push('原稿中的 slug 已忽略，继续使用当前内容的文章地址。'); fields.slug = target.slug; }
  if (!fields.title || !fields.summary || !fields.updatedAt || !Array.isArray(fields.officialSources) || fields.officialSources.length === 0) warnings.push('文章信息尚有缺项；应用后仍需通过现有发布检查。');
  if (fields.status === 'published' && (!record(fields.verification) || !fields.verification.testedAt || !fields.verification.environment || !fields.verification.result)) warnings.push('原稿标为实测教程，但实测记录不完整；请让 AI 根据真实证据补齐后再发布。');
  // Rebuild from resolved values: compatibility fields may have owned anchors,
  // and the metadata form reads scalar values directly.
  let frontmatter: string;
  try { frontmatter = stringify(fields, { aliasDuplicateObjects: false }).trimEnd(); }
  catch { throw new Error('文章信息包含循环引用或无法展开的别名，请在原稿中改为明确的字段值'); }
  if (/(?:TODO[:：]|REPLACE_WITH_)/i.test(frontmatter)) warnings.push('文章信息仍含模板占位值，请在原稿中补齐。');
  if (/(?:!\[[^\]]*\]\(|\]\()(?:\.\/|\.\.\/|assets\/|videos\/)/.test(source.slice(header[0].length))) warnings.push('正文包含本地资源链接；导入文字不会上传这些文件，请另行上传并核对。');
  const body = source.slice(header[0].length).replace(/^\n/, '');
  if (new TextEncoder().encode(`---\n${frontmatter}\n---\n\n${body}`).length > MAX_IMPORT_BYTES) throw new Error('展开文章信息后 Markdown 超过 2 MiB，请缩小文件后再导入');
  return { frontmatter, body, hasFrontmatter: true, warnings };
}
