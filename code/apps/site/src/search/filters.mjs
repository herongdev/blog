/** Shortcuts share one public vocabulary between the page, builder and Worker. */
export const TOPICS = [
  { id: 'all', label: '全部' },
  { id: 'ai', label: 'AI 编程' },
  { id: 'frontend', label: '前端开发' },
  { id: 'backend', label: '后端开发' },
  { id: 'ops', label: '部署运维' },
  { id: 'files', label: '文件处理' },
];
export const PERIODS = [
  { id: 'all', label: '不限' },
  { id: 'week', label: '本周' },
  { id: 'month', label: '本月' },
  { id: '6months', label: '近半年' },
  { id: 'year', label: '近一年' },
];
export const normalizeTopic = (value) => TOPICS.some(({ id }) => id === value) ? value : 'all';
export const normalizePeriod = (value) => PERIODS.some(({ id }) => id === value) ? value : 'all';
export const hasSearchFilters = ({ source = 'all', topic = 'all', period = 'all' } = {}) => ['article', 'tutorial', 'tool'].includes(source) || normalizeTopic(topic) !== 'all' || normalizePeriod(period) !== 'all';

const strings = (value) => Array.isArray(value) ? value.flatMap(strings) : typeof value === 'string' ? [value] : [];
const latinTerm = (words) => new RegExp(`(?:^|[^a-z0-9])(?:${words})(?=$|[^a-z0-9])`, 'i');

/** A lightweight editorial mapping from existing public metadata, never body guesses.
 * Topics may overlap: a Vue deployment article can be frontend and operations.
 * Content outside these shortcuts stays available under 全部.
 */
export function classifyTopics(document, sourcePath = '') {
  const topics = new Set(strings(document.topics).filter((id) => id !== 'all' && normalizeTopic(id) === id));
  const title = String(document.title ?? '').normalize('NFKC');
  const metadata = [title, document.software, document.toolName, document.toolSlug, ...strings(document.keywords), ...strings(document.aliases), ...strings(document.categories)].filter(Boolean).join(' ').normalize('NFKC');
  const source = String(sourcePath).replaceAll('\\', '/').normalize('NFKC');
  if (/\/(?:ai-agent-coding-career|AI-协作与边界)(?:\/|$)/i.test(source)
    || latinTerm('ai|agent|agents|codex|cursor|trae|chatgpt|mcp|copilot').test(metadata)
    || /智能体|人工智能|提示词|AI编程/i.test(metadata)) topics.add('ai');
  if (/\/(?:前端|前端面试与实战|JavaScript系统教程|React系统教程|Vue系统教程|Web-API-与推送|web应用开发|Electron|小程序)(?:\/|$)/i.test(source)
    || latinTerm('vue|vue3|react|javascript|typescript|next[. ]?js|css|html').test(metadata)) topics.add('frontend');
  if (/\/(?:java快速入门|后端)(?:\/|$)/i.test(source)
    || latinTerm('java|spring|springboot|mysql|postgresql|redis|node[. ]?js').test(metadata)
    || /后端开发|服务端开发/.test(metadata)) topics.add('backend');
  if (/\/(?:运维|服务器部署|云开发|开发环境|打包部署)(?:\/|$)|构建与运维|Linux 环境/i.test(source)
    || latinTerm('docker|nginx|linux|ssh|ssl|certbot|kubernetes|devops').test(metadata)
    || /部署|运维|持续集成|证书续期|打包发布|GitHub Actions|CI\s*\/\s*CD/i.test(metadata)) topics.add('ops');
  if (document.type === 'tool'
    || latinTerm('pdf|ffmpeg').test(metadata)
    || /(?:图片|图像|视频|文件).{0,8}(?:压缩|裁剪|转换|转码|合并|拆分|上传|下载|处理)|(?:上传|下载|压缩|裁剪|转换).{0,8}(?:图片|图像|视频|文件)/.test(title)) topics.add('files');
  return TOPICS.filter(({ id }) => topics.has(id)).map(({ id }) => id);
}

const shanghaiDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' });
const isoDay = (date) => date.toISOString().slice(0, 10);
export function publicationDate(document) {
  const value = document.publishedAt;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = new Date(value + 'T00:00:00Z');
  return Number.isFinite(parsed.getTime()) && isoDay(parsed) === value ? value : undefined;
}
function monthsBefore(day, months) {
  const date = new Date(day + 'T00:00:00Z');
  const originalDay = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() - months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(originalDay, lastDay));
  return isoDay(date);
}
/** Calendar boundaries in Asia/Shanghai; inclusive day ranges, no inferred dates. */
export function periodWindow(period, now = new Date()) {
  period = normalizePeriod(period);
  if (period === 'all') return undefined;
  const parts = Object.fromEntries(shanghaiDate.formatToParts(now).map(({ type, value }) => [type, value]));
  const to = `${parts.year}-${parts.month}-${parts.day}`;
  if (period === 'month') return { from: to.slice(0, 8) + '01', to };
  if (period === 'week') {
    const start = new Date(to + 'T00:00:00Z');
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    return { from: isoDay(start), to };
  }
  return { from: monthsBefore(to, period === '6months' ? 6 : 12), to };
}
export function matchesFilters(document, { topic = 'all', period = 'all' } = {}, now = new Date()) {
  return createFilterMatcher({ topic, period }, now)(document);
}
/** Precompute the date window once per query, rather than once per result. */
export function createFilterMatcher({ topic = 'all', period = 'all' } = {}, now = new Date()) {
  topic = normalizeTopic(topic);
  const window = periodWindow(period, now);
  return (document) => {
    const topics = Array.isArray(document.topics) ? document.topics : classifyTopics(document, document.id);
    if (topic !== 'all' && !topics.includes(topic)) return false;
    if (!window) return true;
    const date = publicationDate(document);
    return Boolean(date && date >= window.from && date <= window.to);
  };
}
export function newestFirst(left, right) {
  return (publicationDate(right) ?? '').localeCompare(publicationDate(left) ?? '')
    || String(left.title).localeCompare(String(right.title), 'zh-CN')
    || String(left.id).localeCompare(String(right.id));
}
