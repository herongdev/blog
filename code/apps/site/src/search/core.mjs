/** Same normalization and Chinese segmentation strategy as dev-guides search.ts. */
export const SEARCH_SCHEMA = 1;
export const BUCKETS = 64;
export const aliasGroups = [
  ['Codex 扳手', '加载了工具'],
  ['自动压缩', '上下文压缩'],
  ['子代理', '子智能体'],
];
const stopWords = new Set(['的', '了', '和', '与', '是', '在', '把', '将', '一个', '一下', '怎么', '怎样', '如何', '什么', '为什么', '请问', '有没有', '可以', '这个', '那个', '我', '你']);
const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh-CN', { granularity: 'word' }) : null;
export const normalize = (value) => String(value ?? '').normalize('NFKC').toLocaleLowerCase('zh-CN').replace(/[\u200b-\u200d\ufeff]/g, '').trim();
export const compact = (value) => normalize(value).replace(/[^\p{L}\p{N}@]+/gu, '');
const chunks = (value) => normalize(value).match(/[\p{Script=Han}]+|[a-z0-9@]+/gu) ?? [];
function grams(value) {
  const chars = [...value];
  return chars.length < 2 ? chars : chars.slice(0, -1).map((char, i) => char + chars[i + 1]);
}
export function termsForIndex(value) {
  const result = new Set();
  for (const chunk of chunks(value)) {
    if (/\p{Script=Han}/u.test(chunk)) {
      for (const term of [...chunk, ...grams(chunk)]) result.add(term);
      const words = segmenter ? [...segmenter.segment(chunk)].filter((word) => word.isWordLike).map((word) => word.segment) : grams(chunk);
      for (const term of words) if (term.length <= 48) result.add(term);
    } else if (chunk.length <= 64 && !/^[a-f0-9]{33,}$/i.test(chunk)) result.add(chunk);
  }
  return [...result];
}
function queryGroups(value) {
  const words = chunks(value).flatMap((chunk) => {
    if (!/\p{Script=Han}/u.test(chunk)) return [chunk];
    return segmenter ? [...segmenter.segment(chunk)].filter((part) => part.isWordLike).map((part) => part.segment) : grams(chunk);
  });
  return [...new Set(words.filter((word) => !stopWords.has(word) && word.length <= 64))].slice(0, 12).map((word) => ({ term: word, fallback: /\p{Script=Han}/u.test(word) && [...word].length > 2 ? [...new Set(grams(word))] : [] }));
}
export function queryPlan(query) {
  const original = normalize(query).slice(0, 160);
  const variants = new Set([original]);
  const phrasePattern = (phrase) => new RegExp([...compact(phrase)].join('[^\\p{L}\\p{N}@]*'), 'u');
  for (const group of aliasGroups) {
    for (const phrase of group) {
      const key = compact(phrase);
      const pattern = phrasePattern(key);
      if (pattern.test(original)) for (const replacement of group) variants.add(original.replace(pattern, normalize(replacement)));
    }
  }
  return [...variants].slice(0, 8).map((value) => {
    let remaining = value;
    const phrases = [];
    for (const group of aliasGroups) {
      const phrase = group.map(compact).sort((a, b) => b.length - a.length).find((key) => phrasePattern(key).test(remaining));
      if (!phrase) continue;
      remaining = remaining.replace(phrasePattern(phrase), ' ');
      // Known aliases are phrases, not a loose bag of words. In particular,
      // 子节点 + 事件代理 must not masquerade as a subagent article.
      const parts = chunks(phrase).flatMap((chunk) => /\p{Script=Han}/u.test(chunk) ? grams(chunk) : [chunk]);
      phrases.push({ term: phrase, fallback: [...new Set(parts)] });
    }
    return { value, groups: [...queryGroups(remaining), ...phrases.flatMap((phrase) => [...queryGroups(phrase.term), phrase])] };
  }).filter((plan) => plan.groups.length);
}
export function bucketFor(term) {
  let hash = 2166136261;
  for (const char of term) { hash ^= char.codePointAt(0); hash = Math.imul(hash, 16777619); }
  return ((hash >>> 0) % BUCKETS).toString(16).padStart(2, '0');
}
export function addDocumentToPostings(postings, doc, id, body = '') {
  const best = new Map();
  const fields = [[doc.title, 6], [doc.software ?? doc.toolName ?? '', 6], [(doc.aliases ?? []).join(' '), 5], [(doc.keywords ?? []).join(' '), 5], [(doc.searchClues ?? []).join(' '), 5], [doc.summary, 3], [body, 1]];
  for (const [text, weight] of fields) for (const term of termsForIndex(text)) best.set(term, Math.max(best.get(term) ?? 0, weight));
  // A tutorial's public feed contains lexical terms only, never full article text.
  for (const term of doc.bodyTerms ?? []) {
    const normalized = normalize(term);
    if (normalized && normalized.length <= 64) best.set(normalized, Math.max(best.get(normalized) ?? 0, 1));
  }
  for (const [term, weight] of best) {
    if (!postings.has(term)) postings.set(term, []);
    postings.get(term).push([id, weight]);
  }
}
function groupMatches(group, postings) {
  const direct = new Map(postings.get(group.term) ?? []);
  if (group.fallback.length) {
    const parts = group.fallback.map((term) => new Map(postings.get(term) ?? []));
    const first = parts.sort((a, b) => a.size - b.size)[0];
    for (const [id, weight] of first ?? []) {
      if (parts.every((part) => part.has(id))) direct.set(id, Math.max(direct.get(id) ?? 0, Math.min(weight, ...parts.map((part) => part.get(id)))));
    }
  }
  return direct;
}
export function rankDocuments(documents, postings, query) {
  const scores = new Map();
  for (const variant of queryPlan(query)) {
    const matches = variant.groups.map((group) => groupMatches(group, postings));
    if (matches.some((part) => !part.size)) continue;
    const smallest = [...matches].sort((a, b) => a.size - b.size)[0];
    for (const [id] of smallest) {
      if (!matches.every((part) => part.has(id))) continue;
      const doc = documents[id];
      if (!doc) continue;
      let score = matches.reduce((sum, part) => sum + part.get(id) * (1 + Math.log((documents.length + 1) / (part.size + 1))), 0) / matches.length;
      const phrase = compact(variant.value);
      const title = compact(doc.title);
      if (phrase && title.includes(phrase)) score += title === phrase ? 18 : 10;
      // A tiny tie-break only: source preference cannot lift irrelevant tutorials.
      if (doc.type === 'tutorial') score += 0.05;
      scores.set(id, Math.max(scores.get(id) ?? 0, score));
    }
  }
  return [...scores].sort((a, b) => b[1] - a[1] || documents[a[0]].title.localeCompare(documents[b[0]].title, 'zh-CN')).map(([id, score]) => ({ document: documents[id], score }));
}
export function requiredTokens(query) {
  return [...new Set(queryPlan(query).flatMap((variant) => variant.groups.flatMap((group) => [group.term, ...group.fallback])))];
}
