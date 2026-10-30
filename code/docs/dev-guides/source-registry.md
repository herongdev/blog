# 开发者工具内容来源库

核对日期：2026-10-20。本文用于寻找选题，并为未来的视频脚本、网页教程和示例代码保留可追溯来源。来源页面会继续变化；制作每条内容时须重新核对具体条目。

## 第一阶段选题范围（2026-10-20 修订）

目标观众是**用 AI 工具维护、开发和交付真实项目的中文开发者**，包括普通程序员与独立开发者。监测范围可以较广，但每条视频只回答一个可复现的问题。

- **AI 编程主线**：Codex、Cursor、TRAE；同时监测 Qoder CN（原“通义灵码”）和腾讯 CodeBuddy。
- **日常开发工作流**：VS Code、Git/GitHub，作为上述工具的演示环境，也可独立成题；API 调试与测试工具 Apifox 作为下一批国内专题。
- **低频开发辅助专题**：豆包桌面版等通用 AI 助手。只选择读代码、排查报错、查文档等与开发任务直接相关的功能；首月 8 条中最多 1 条，没有足够好的实测题目可以为 0 条。
- **选题决定因素**：目标观众是否会遇到这个问题、能否在一分钟内展示结果、当前版本能否亲测、能否找到可靠的一手依据。用户规模可以提示关注哪些产品，但不直接证明某个功能适合拍。

## 使用规则

- **发现来源**：创作者、周刊、社区提出的问题或展示的用法。记录具体视频或文章链接，频道主页只用于订阅。
- **事实来源**：产品官方更新日志、文档、版本发布页、源码或提交。记录具体条目、版本、发布日期和核对日期；不要只保存更新日志首页。
- **实测证据**：自己的操作环境、命令、录屏、测试仓库和结果。发布结论前完成实测；无法复现时标记“待验证”。
- **代码来源**：示例代码若来自外部项目，记录仓库、固定版本或提交链接及许可证；自行编写的示例保存项目和提交号。
- **状态**：`线索` → `官方已核` → `已实测` → `已发布` → `需复核/已过期`；不适用或无法复现的题标记`放弃`并记录原因。更新日志或旧教程不能自动证明当前版本仍可用。

## 报告中提到的 9 位创作者

来源：[报告 7](./research/report-7.md)、[报告 8](./research/report-8.md)（原始研究报告归档）。报告里的 `citeturn…` 是当次研究的临时引用，不能放进正式脚本作为稳定来源。

| 优先级 | 创作者与订阅入口 | 适合借鉴的部分 | 使用边界 |
| --- | --- | --- | --- |
| P0 | [Coding with Lewis](https://www.youtube.com/@CodingWithLewis) | 开发者新闻、短视频选题与开头 | 视频属于线索；功能事实回查产品方 |
| P0 | [Matt Pocock](https://www.youtube.com/@mattpocockuk) | AI coding、Agent Skills、单点工作流实验 | 观点和测试条件要独立复核 |
| P0 | [Fireship](https://www.youtube.com/@Fireship) | 新工具发现、信息密度与标题结构 | 多为合集或快评，需缩成一个可验证问题 |
| P0 | [程序员鱼皮](https://space.bilibili.com/12890453) | 中文开发者关心的工具问题、表达方式 | 只取问题线索，使用自己的案例和录屏 |
| P1 | [Theo – t3.gg](https://www.youtube.com/@t3dotgg) | 工具使用评价、争议与失败案例 | 长视频观点较多，先找原始依据 |
| P1 | [NetworkChuck](https://www.youtube.com/@NetworkChuck) | CLI、Linux、网络工具实验演示 | 与首期 AI coding 范围有距离，按专题看 |
| P2 | [ByteByteGo](https://www.youtube.com/@ByteByteGo) | 结构化图解、视频转网站的形式 | 偏系统设计，不适合作为每日新功能雷达 |
| P2 | [Hyperplexed](https://www.youtube.com/@hyperplexed) | 视觉 Demo 与结果先行的呈现 | 偏网页视觉效果，不是功能事实源 |
| P2 | [The PrimeTime](https://www.youtube.com/@ThePrimeTimeagen) | 开发者热点与反应 | 评论密度高，须回溯被评论的原资料 |

P0 是每周优先扫描；P1 是按相关性筛选；P2 主要供形式参考。优先级只针对本项目的“一分钟实测教程”，不评价创作者水平。

## 新补充的创作者与中文筛选源

| 优先级 | 来源与入口 | 用途 | 可核对的具体内容/备注 |
| --- | --- | --- | --- |
| P0 | [Simon Willison：Agentic Engineering 标签](https://simonwillison.net/tags/agentic-engineering/) | Coding Agent 实验、问题与原始链接 | 文章常给出操作过程；仍需核对对应产品版本 |
| P0 | [Cole Medin](https://www.youtube.com/@ColeMedin) | AI coding 长实操，拆出单一问题 | [对应的教程资料仓库](https://github.com/coleam00/cole-medin-ai-coding)可辅助定位原视频和资源 |
| P0 | [宝玉的分享](https://baoyu.io/blog) | 中文语境、Codex/Claude 使用场景与本人实测 | 区分原创实测与转述；技术结论追溯官方 |
| P1 | [阮一峰《科技爱好者周刊》](https://www.ruanyifeng.com/blog/weekly/index.html) | 每周发现开发工具、小项目和上游链接 | 筛选范围宽；采用前回到项目官网或仓库 |
| P1 | [HelloGitHub 月刊](https://hellogithub.com/periodical) | 发现可亲手试用的开源工具 | 功能、安装与许可回查项目仓库及 release |
| P1 | [张司机在路上](https://space.bilibili.com/7429895/) | 中文 Claude Code/CLI 冷门机制与反例 | B 站页面可能限流；逐条内容需单独核验 |
| P2 | [IndyDevDan](https://www.youtube.com/@indydevdan) | Claude Code hooks/agents 进阶流程 | 内容较深，选择能在一分钟内演示的点 |
| P2 | [Brian Casel](https://www.youtube.com/@briancasel) | 真实应用开发流程与案例结构 | 长教程，作为按专题查阅的来源 |
| P2 | [Kevin Powell](https://www.kevinpowell.co/youtube/) | 若扩展到前端，可找 CSS 新特性与实用技巧 | 当前项目首期不必高频追踪 |

## 官方一手事实源：首期重点追踪

| 产品 | 主要入口 | 备用或逐版入口 | 制作时注意 |
| --- | --- | --- | --- |
| Codex | [ChatGPT 与 Codex 更新日志](https://learn.chatgpt.com/docs/changelog) | [Codex CLI Releases](https://github.com/openai/codex/releases)、[Atom](https://github.com/openai/codex/releases.atom) | 区分桌面版、CLI、平台、套餐；CLI 过滤 alpha 等预发布 |
| VS Code | [当前 Release Notes](https://code.visualstudio.com/updates) | [版本归档](https://code.visualstudio.com/updates/archive)、[官方信息流](https://code.visualstudio.com/feed.xml) | 区分正式版与 Insiders；记录具体版本号 |
| GitHub / Copilot | [GitHub Changelog](https://github.blog/changelog/) | [Copilot 分类](https://github.blog/changelog/label/copilot/)、[RSS](https://github.blog/changelog/feed/) | 记录 rollout、预览/正式版、组织设置与套餐前提 |
| Claude Code | [每周新功能摘要](https://code.claude.com/docs/en/whats-new) | [完整 Changelog](https://code.claude.com/docs/en/changelog)、[Releases](https://github.com/anthropics/claude-code/releases)、[Atom](https://github.com/anthropics/claude-code/releases.atom) | 从具体版本发布页提取功能，核对系统与配置前提 |
| Cursor | [Changelog](https://cursor.com/changelog) | [产品 Release Notes](https://prod.cursor.com/docs/release-notes)、[使用文档](https://cursor.com/docs) | 首期主线；核对功能所需版本、套餐与启用状态 |
| TRAE | [TRAE 中文更新日志](https://docs.trae.cn/ide_changelog) | [对话与上下文文档](https://docs.trae.cn/ide_chat)、[TRAE 官网](https://www.trae.cn/) | 首期主线；区分个人/企业、IDE/Agent 模式和灰度功能 |
| Qoder CN（原通义灵码） | [Qoder CN 逐版更新](https://docs.qoder.cn/product-overview/qoder-update-log) | [IDE 逐版更新](https://docs.qoder.cn/product-overview/qoder-cn-ide-update-log)、[更新索引](https://docs.qoder.cn/product-overview/qoder-cn-update-log)、[产品说明](https://docs.qoder.cn/user-guide/what-is-qoder-cn) | 新教程用当前名称和版本；“通义灵码”保留为网站搜索别名，注意旧插件和旧界面 |
| 腾讯 CodeBuddy | [IDE Release Notes](https://www.codebuddy.cn/docs/ide/release-notes/release-notes) | [Agent 模式文档](https://www.codebuddy.cn/docs/ide/User-guide/Agent-Mode/Overview) | 核对 IDE 版本、个人/企业版与套餐条件 |

以上覆盖首期 AI 编程、IDE 和 Git/GitHub 主线。官方信息流是发现入口；正式脚本要保存具体发布条目链接。

## 官方一手事实源：按专题扩展

| 产品 | 入口 | 用途 |
| --- | --- | --- |
| JetBrains AI / IntelliJ | [AI 新功能](https://lp.jetbrains.com/ai-assistant-whatsnew/)、[IntelliJ What's New](https://www.jetbrains.com/idea/whatsnew/)、[发布博客](https://blog.jetbrains.com/idea/category/releases/) | 面向 Java/Kotlin/JetBrains 用户时启用 |
| Chrome DevTools | [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/) | 浏览器调试工具专题，从具体 What's New 条目取证 |
| Apifox | [官方更新日志](https://docs.apifox.com/changelog)、[产品动态](https://apifox.com/blog/product-news/) | 国内 API 调试、测试与文档专题；注意区分 alpha 和正式版 |
| 豆包桌面版 | [官方桌面版功能页](https://www.doubao.com/download/desktop)、[App Store 官方上架页](https://apps.apple.com/cn/app/豆包-生活工作-ai-助手/id6459478672) | 低频开发辅助专题；未查到稳定公开的逐功能日志，应用商店的笼统版本描述不足以单独证明新功能，须核对官方具体说明和当前界面并亲测 |

## 每条视频或教程的来源记录模板

```text
内容编号 / 标题：
观众的具体问题：
发现来源：作者、具体视频/文章 URL、发布日期、在何处提到该问题
官方依据：具体 Release Notes/Changelog/Docs URL、版本、发布日期
适用条件：操作系统、工具版本、套餐/权限、是否预览功能
亲测证据：测试日期、仓库/提交、操作步骤、录屏或截图、成功/失败结果
示例代码来源：自写仓库提交；或外部固定提交 URL 与许可证
脚本中的关键陈述 → 对应证据链接：
网站教程 URL：
下次复核日期 / 当前状态：
```

### 示例：尚未完成验证的候选题

- 题目：“Codex 并行改两个需求时，怎样避免互相干扰？”
- 发现来源：[鱼皮的 Codex 多玩法视频](https://www.bilibili.com/video/BV1eNGR6rETx/)；这里只用于发现“并行任务”这个观众问题。
- 官方依据：[Codex Worktrees 文档](https://learn.chatgpt.com/docs/environments/git-worktrees)。
- 亲测证据：**待做**。因此状态是`官方已核`，还不是`已实测`，不能直接写成自己验证过的教程。

## 维护节奏

- 每周扫描 P0 来源，保存具体内容链接与一句候选问题；P1/P2 只在主题相关时查阅。
- 每次发布前核对官方具体条目与当前安装版本，完成一次实际操作。
- 每月检查已发布教程中变化快的配置、套餐、命令和界面；更新页面的“最后验证日期”。
- 如果以后写自动采集程序，优先接入上表已核对的官方 RSS/Atom/XML；每条记录保留来源 URL 与抓取时间。抓取失败或页面结构变化时记录错误并人工复核，不能把缺失数据补成确定事实。
