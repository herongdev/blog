/** Build private, unverified writing drafts from the reviewed editorial source files. */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { stringify } from 'yaml';

const sourceDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../../../docs/dev-guides/editorial/2026-10-27');
const toolSlugs = {
  Codex: 'codex', Cursor: 'cursor', TRAE: 'trae', 'VS Code': 'vscode',
  GitHub: 'github', Git: 'git', Apifox: 'apifox', 'Qoder CN': 'qoder-cn',
  CodeBuddy: 'codebuddy', 'Chrome DevTools': 'chrome-devtools', 'Claude Code': 'claude-code',
};
// Reuse existing manuscripts; never create another copy or replace their text/status.
const existing = { DG004: 'codex-worktrees', DG006: 'apifox-actual-request', DG125: 'cursor-remote-control' };
const recentTools = ['codex', 'codex', 'zcode', 'ttok', 'codex', 'remotion', 'codex', 'claude-code'];
const text = (value) => typeof value === 'string' ? value : Array.isArray(value) ? value.map(text).join('\n') : value && typeof value === 'object' ? Object.values(value).map(text).join('\n') : '';
const lines = (values) => values.filter(Boolean).map((value) => `- ${value}`).join('\n');
const refs = (urls, label) => [...new Set(urls ?? [])].map((url, index) => ({ title: `${label} ${index + 1} · ${new URL(url).hostname}`, url }));
const sourceLinks = (sources) => lines(sources.map(({ title, url }) => `[${title}](${url})`));
const draft = (metadata, body) => `---\n${stringify(metadata, { lineWidth: 0 }).trimEnd()}\n---\n\n${body.trim()}\n`;
const sourceNotes = '这是写作与拍摄提纲，尚未亲测。资料核对日期为 2026-10-27，拍摄前重新确认当前版本、入口和账号条件。实测完成后将提纲改为正式教程，再移除这些准备说明。';
const recording = `## 实测与素材记录\n\n- 实测日期、版本、系统与账号条件：待填写\n- 实际操作步骤与截图：待补充\n- 实际结果、失败情况与限制：待记录\n- 视频平台链接：发布视频后填写，并补入“发布信息”的视频地址\n\n## 发布前检查\n\n- [ ] 自己完成最小案例，确认结果和限制\n- [ ] 将上面的演示计划改写为读者可复现的步骤，补齐截图\n- [ ] 更新摘要、版本和发布信息中的实测记录\n- [ ] 删除未完成占位文字和内部写作说明\n- [ ] 视频控制在一分钟内，网站保留完整过程与视频链接`;

export async function buildEditorialPlan() {
  const plan = JSON.parse(await readFile(resolve(sourceDirectory, 'topics.json'), 'utf8'));
  const scan = JSON.parse(await readFile(resolve(sourceDirectory, 'creator-month-scan.json'), 'utf8'));
  const entries = plan.topics.map((topic) => {
    const week = plan.weeks.find((item) => item.week === topic.week);
    const folderPath = topic.queue === '主计划'
      ? ['半年主计划（每周3篇）', `第${String(topic.week).padStart(2, '0')}周 · ${week.theme}`]
      : ['备选题库', topic.tool];
    const common = { sourceId: topic.id, title: topic.title, folderPath };
    if (existing[topic.id]) return { ...common, slug: existing[topic.id], kind: 'content' };
    if (!toolSlugs[topic.tool]) throw new Error(`Missing tool mapping: ${topic.tool}`);
    const officialSources = refs(topic.sourceUrls, '一手资料');
    const discoverySources = refs(topic.discoveryUrls, '选题线索');
    const metadata = {
      title: topic.title, summary: `${topic.hook} 本篇准备演示一个具体操作，并补充可复现的步骤与适用条件。`,
      tool: toolSlugs[topic.tool], status: 'draft', updatedAt: '2026-10-30',
      platform: topic.prerequisites, keywords: [...topic.searchTerms], searchClues: [...topic.searchTerms],
      themes: [], featured: false, officialSources, discoverySources,
      editorial: { sourceId: topic.id, batchId: 'editorial-2026-10-27', queue: topic.queue, ...(topic.week ? { week: topic.week, slot: topic.slot } : {}), productionState: '待实测', researchCheckedAt: topic.researchCheckedAt ?? '2026-10-27' },
    };
    const body = `> ${topic.id} · ${topic.queue === '主计划' ? `第 ${topic.week} 周第 ${topic.slot} 条` : '备选：可替换当周未通过实测的题目'} · 待实测\n>\n> ${sourceNotes}

## 这篇要解决的问题

${topic.hook}

## 演示前准备

${lines([topic.prerequisites, topic.demoFixture, `准备与验证预计 ${topic.effortMinutes} 分钟（选题估算，非实测工时）。`])}

## 一分钟演示提纲

${topic.demo}

建议先展示问题或结果，再演示关键操作，最后说明一个限制；等待过程可以剪辑并注明。

## 操作步骤

1. 待实测：准备上述最小案例，记录开始时的问题。
2. 待实测：按演示提纲操作，记录当前版本中的准确入口与命令，补入截图。
3. 待实测：检查结果；失败时记录真实原因，不把预期结果当成结论。

## 需要验证的结果

以下为验收目标，尚不是本人的实测结论：

${topic.proof}

## 网站完整教程补充

${topic.webSupplement}

## 可能的失败与限制

${topic.risks}
${topic.id === 'DG005' ? '\n已有《TRAE 的 @ 引用菜单能找到哪些项目上下文？》可作背景；本篇只聚焦历史会话引用，避免重复介绍整个菜单。\n' : ''}
## 资料与核对记录

${topic.evidenceStatus}。${topic.evidenceNote}

${sourceLinks([...officialSources, ...discoverySources])}

${recording}`;
    return { ...common, slug: `${toolSlugs[topic.tool]}-${topic.id.toLowerCase()}`, kind: 'draft', markdown: draft(metadata, body) };
  });
  for (const [index, id] of scan.selectedIds.entries()) {
    const topic = scan.items.find((item) => item.id === id && item.selected);
    if (!topic) throw new Error(`Missing selected topic ${id}`);
    const officialSources = refs(topic.officialUrls, '项目一手资料');
    const discoverySources = [{ title: `${topic.creator} · ${topic.originalTitle}`, url: topic.url }];
    const tool = recentTools[index];
    const metadata = {
      title: topic.proposedTitle, summary: `${topic.whyUseful} 本篇先用最小案例验证，再记录完整操作。`,
      tool, status: 'draft', updatedAt: '2026-10-30', keywords: [],
      searchClues: [topic.proposedTitle, topic.summary], themes: [], featured: false,
      officialSources, discoverySources,
      editorial: { sourceId: id, batchId: 'editorial-2026-10-27', queue: '近期候选', productionState: '待实测', researchCheckedAt: topic.checkedAt },
    };
    const body = `> ${id} · 近期候选 · 待实测\n>\n> ${sourceNotes}\n>\n> 每周最多用一条近期题替换主计划，仍保持每周三条，不额外叠加任务。

## 这篇要解决的问题

${topic.whyUseful}

## 原始案例提供了什么线索

${topic.summary}

参考作者：${topic.creator}。原文发布日期：${topic.publishedAt}。这是选题参考，不代表我们已经复现。

## 一分钟演示提纲

${text(topic.demo60s)}

## 操作步骤

1. 待实测：准备自己的最小示例与素材，检查工具的当前入口、依赖和账号条件。
2. 待实测：执行上面的演示流程，记录真实命令、操作路径与截图。
3. 待实测：检查输出，展示一个真实限制；保留完整准备过程供网站读者复现。

## 拍摄前需要核实

${text(topic.verification)}
${['CM202610-02', 'CM202610-05', 'CM202610-07'].includes(id) ? '\n拟选 Codex 作为演示客户端，需先验证兼容性。这里涉及第三方 Skill 或自行整理的流程，不是 Codex 的内置命令；若不兼容，换到适配客户端并更新工具字段。\n' : ''}
${id === 'CM202610-08' ? '\n拟用 Claude Code 验证作者仓库中的第三方技能；其来源并非 Anthropic 官方内置功能。\n' : ''}
## 与旧题的区别

${topic.novelty}
${topic.existingTopicIds?.length ? `\n相关选题编号：${topic.existingTopicIds.join('、')}（可在左侧按编号搜索）。\n` : ''}
## 网站完整教程补充

补齐环境准备、依赖安装、完整命令或模板、失败处理，以及剪辑中省略的等待过程。只使用自己的演示素材，并保留作者和项目来源。

## 资料与核对记录

${sourceLinks([...discoverySources, ...officialSources])}

${topic.commercialContext ? `来源背景：${topic.commercialContext}\n\n` : ''}${recording}`;
    entries.push({ sourceId: id, title: topic.proposedTitle, slug: `${tool}-${id.toLowerCase()}`, kind: 'draft', folderPath: ['近期候选（拍前复核）', index < 4 ? '先亲测' : '第二批与进阶'], markdown: draft(metadata, body) });
  }
  if (entries.length !== 138 || entries.filter((item) => item.kind === 'draft').length !== 135) throw new Error('Unexpected editorial counts');
  if (new Set(entries.map((item) => item.slug)).size !== entries.length) throw new Error('Duplicate slug');
  return { version: 1, batchId: 'editorial-2026-10-27', entries };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = process.argv[2];
  if (!output) throw new Error('Usage: node editorial-plan.mjs /absolute/path/payload.json');
  const payload = await buildEditorialPlan();
  await writeFile(output, `${JSON.stringify(payload, null, 2)}\n`, { mode: 0o600, flag: 'wx' });
  console.log(JSON.stringify({ output, newDrafts: 135, reusedArticles: 3, mainPlan: 78, reserves: 52, recent: 8 }));
}
