# 开发工具一分钟半年拍摄计划

以你确认的每周 3 条为节奏，安排 26 周、78 条主选题，另备 52 条替换题。周次从首条正式发布算起；前 4 周可以直接照顺序准备，第 5 周起按观众问题和产品变化调整。选题集中在一个能拍出操作和结果的小问题，不要求讲宏观趋势或深入技术原理。

整理日期：2026-10-27。功能资料与亲测是两道工序：本次核对官方资料并设计演示，所有题仍待你在实际账号和版本中跑通。标题是候选标题，录完再按真实结果定稿。

## 怎么使用

1. 每周从主计划取 3 题，先核对对应文档、入口和账号条件，再用自己的演示项目操作。无法复现的题从备选池替换，保留原因。
2. 先写出完整网页步骤和录屏分镜，再录 45 至 58 秒短视频。正文提供可复制命令、适用版本、失败处理和原视频链接；只看文字也应能完成。
3. 每条记录实测版本、日期、网页地址和视频地址。表格的“制作状态”用于跟进，资料状态用于判断依据，两者分开。
4. 先只录未来两周的库存，约 6 条。第 5 周以后不提前批量录界面和套餐敏感的题。

资料入口：[全部 130 张题卡](./topic-cards.md)、[配套 Excel](../../../../outputs/01a156f6-halfyear-20261027/开发工具一分钟_半年拍摄计划.xlsx)、[脚本可读题库](./topics.json)、[来源核对记录](./source-checks.json)。修改 Excel 不会自动同步 JSON、写作台或网站。

## 每周三条怎么搭配

主计划以 Codex、Cursor 和国产 AI 编程工具为主，穿插编辑、版本控制、接口和浏览器调试。相同功能换一个软件不自动算好选题：只有使用人群、入口或问题确实不同才保留，并尽量错开。

每周第 3 条可以换成当周真正有用的新功能，但它本身已有具体备选题，不是空着等新闻。半年内尚未发布的更新无法提前确定。只有“当前有明确官方说明、自己的账号可用、60 秒能看到结果”三项都满足才插播；被替换的题回到备选池，不增加周产量。

豆包本轮不占固定名额。今后若有明确开发任务和可复现结果再加入；不为了软件用户量安排泛聊天题。

## 半年排期

每周可选周一、周三、周五发布；日期由你首发时间决定。阶段主题用于组织准备素材，每条都应能独立观看。

| 周次 | 准备重点 | 第 1 条 | 第 2 条 | 第 3 条 |
| --- | --- | --- | --- | --- |
| 1 | 少重复说明，找回误改 | [DG001 别每次都告诉 Codex 用 pnpm：把约定放进项目](./topic-cards.md#dg001) | [DG002 终端报错不用全选复制：把终端交给 Cursor](./topic-cards.md#dg002) | [DG003 VS Code：没提交就改坏了？从本地历史找回上次保存](./topic-cards.md#dg003) |
| 2 | 隔离任务，看清请求 | [DG004 Codex 同时改两个需求，先给它们分开目录](./topic-cards.md#dg004) | [DG005 TRAE 记不清上次怎么修的？用 @ 引用历史对话](./topic-cards.md#dg005) | [DG006 Apifox：接口明明填对了，真正发出去的地址在哪看](./topic-cards.md#dg006) |
| 3 | 缩小修改范围 | [DG007 Cursor 计划做好了，别只留在聊天里](./topic-cards.md#dg007) | [DG008 只改这一小段代码，TRAE 不必开一长串对话](./topic-cards.md#dg008) | [DG009 VS Code：AI 一次改了两件事，怎么只提交其中几行](./topic-cards.md#dg009) |
| 4 | 确认这次到底改了什么 | [DG010 仓库改了一堆，怎样只看 Codex 刚才这一轮](./topic-cards.md#dg010) | [DG011 Cursor 补全只想要前半句，别整段照单全收](./topic-cards.md#dg011) | [DG012 GitHub：发代码链接前按一下 Y，别让内容以后变了](./topic-cards.md#dg012) |
| 5 | 找回缺失配置与上下文 | [DG013 Codex 新工作树启动失败？被忽略的配置没跟过来](./topic-cards.md#dg013) | [DG014 只记得一个报错词，怎样找回 TRAE 那次对话](./topic-cards.md#dg014) | [DG015 新文件 Git 看不见？查是哪条忽略规则挡住了](./topic-cards.md#dg015) |
| 6 | 看懂工具正在做什么 | [DG016 Cursor 规则写了却没生效？先看文件后缀](./topic-cards.md#dg016) | [DG017 CodeBuddy CLI 看起来没动静？展开实际工具调用](./topic-cards.md#dg017) | [DG018 VS Code：想看变量又不想加 console.log？用日志断点](./topic-cards.md#dg018) |
| 7 | 先确认方案，再定位代码 | [DG019 先别动代码：用 Codex CLI 的计划模式确认改哪里](./topic-cards.md#dg019) | [DG020 TRAE：同一个需求想试两种方案？从回复处分叉对话](./topic-cards.md#dg020) | [DG021 VS Code：搜索结果太散？把它打开成一张带上下文的清单](./topic-cards.md#dg021) |
| 8 | 把模糊问题变成可见证据 | [DG022 界面哪里变歪了？把前后两张截图交给 Codex](./topic-cards.md#dg022) | [DG023 页面按钮说不清在哪？直接点给 Cursor 看](./topic-cards.md#dg023) | [DG024 后端把数字变成字符串，Apifox 能直接提醒吗](./topic-cards.md#dg024) |
| 9 | 接着做，少丢失工作 | [DG025 Codex CLI 终端关了，如何接着刚才的任务](./topic-cards.md#dg025) | [DG026 TRAE：改完一处字段，CUE 能提示下一处要改哪里](./topic-cards.md#dg026) | [DG027 Git：只想找回一个文件，不用把整个仓库回退](./topic-cards.md#dg027) |
| 10 | 限定规则与跨文件修改 | [DG028 前端规范别塞给所有文件：让 Cursor 按路径加载](./topic-cards.md#dg028) | [DG029 关掉终端后，CodeBuddy CLI 的任务怎样接着聊](./topic-cards.md#dg029) | [DG030 VS Code：改函数名怕漏文件？先预览一次符号重命名](./topic-cards.md#dg030) |
| 11 | 更快进入项目工作 | [DG031 Codex 顶部也能放一个‘启动项目’按钮](./topic-cards.md#dg031) | [DG032 Qoder CN 的规则没生效？试一次手动 @rule 引用](./topic-cards.md#dg032) | [DG033 GitHub：搜代码总被噪声淹没？把仓库和路径一起限定](./topic-cards.md#dg033) |
| 12 | 检查结果与错误记忆 | [DG034 Codex 说改完了，提交前让它再查一次](./topic-cards.md#dg034) | [DG035 AI 总记着旧偏好？找到 TRAE 的记忆文件改掉它](./topic-cards.md#dg035) | [DG036 VS Code：循环反复跑，只在异常那次停下来](./topic-cards.md#dg036) |
| 13 | 查清上下文与变量来源 | [DG037 新开 Cursor 对话，怎样带上上次讨论的结论](./topic-cards.md#dg037) | [DG038 CodeBuddy CLI 规范文件太长？用 @ 拆成几份](./topic-cards.md#dg038) | [DG039 Apifox：变量明明有值，为什么发出去却是空的](./topic-cards.md#dg039) |
| 14 | 减少环境准备的重复劳动 | [DG040 Codex：每开工作树都重新装依赖？把准备步骤存下来](./topic-cards.md#dg040) | [DG041 改完一个字段，Cursor 能带你跳到下一处](./topic-cards.md#dg041) | [DG042 VS Code：试插件前开个临时配置，别把日常环境弄乱](./topic-cards.md#dg042) |
| 15 | 解释改动与找回旧版本 | [DG043 让 Cursor 解释这次改动，先引用 Git Diff](./topic-cards.md#dg043) | [DG044 TRAE：AI 改错颜色后，怎样回到这轮修改之前](./topic-cards.md#dg044) | [DG045 Git：误删分支后，先从 reflog 找到那次提交](./topic-cards.md#dg045) |
| 16 | 反馈具体，比较清楚 | [DG046 让 Codex 改哪一行，直接在差异上留言](./topic-cards.md#dg046) | [DG047 Qoder CN：构建产物塞满索引？用 .qoderignore 排除它](./topic-cards.md#dg047) | [DG048 VS Code：AI 给了一段新配置，先和剪贴板对比再覆盖](./topic-cards.md#dg048) |
| 17 | 控制上下文，串起接口 | [DG049 Cursor：还没聊几句就占满上下文？打开这张明细](./topic-cards.md#dg049) | [DG050 后端规范总混进前端？给 TRAE 规则限定文件](./topic-cards.md#dg050) | [DG051 Apifox：创建完数据，还在手抄 ID 去查详情？](./topic-cards.md#dg051) |
| 18 | 把工作接回并保留检查 | [DG052 Codex 改好了，怎样把工作树任务接回日常目录](./topic-cards.md#dg052) | [DG053 允许 CodeBuddy 改文件，但跑命令仍先问你](./topic-cards.md#dg053) | [DG054 Git：已经共享的错误提交，怎样保留历史撤回效果](./topic-cards.md#dg054) |
| 19 | 复用规则与常用输入 | [DG055 同一个仓库，前端后端怎样给 Codex 不同规则](./topic-cards.md#dg055) | [DG056 TRAE：每次都粘同一段需求？把它变成 / 命令](./topic-cards.md#dg056) | [DG057 VS Code：常写的测试骨架，做成能按 Tab 填空的片段](./topic-cards.md#dg057) |
| 20 | 在真实界面验收 | [DG058 别只让 Cursor 说‘应该好了’，让它真点一次](./topic-cards.md#dg058) | [DG059 Qoder CN：接手小仓库，先用 Repo Wiki 找入口再对源码](./topic-cards.md#dg059) | [DG060 Chrome DevTools：后端还没给空列表，用本地覆盖先验收页面](./topic-cards.md#dg060) |
| 21 | 复用流程，修好工具习惯 | [DG061 同一套检查做了十遍，给 Codex 存成 Skill](./topic-cards.md#dg061) | [DG062 Claude Code 关掉后，按名字找回上次任务](./topic-cards.md#dg062) | [DG063 VS Code：快捷键按了没反应？看看它到底触发了什么](./topic-cards.md#dg063) |
| 22 | 从检查清单到本地验收 | [DG064 把 Cursor 常用检查清单做成一条斜杠命令](./topic-cards.md#dg064) | [DG065 提交前只检查这次改动，TRAE 的审查入口在哪](./topic-cards.md#dg065) | [DG066 GitHub：想在本地验收 PR，拿编号直接切过来](./topic-cards.md#dg066) |
| 23 | 检索历史与复现请求 | [DG067 只记得一个词，怎样找回上周的 Codex 对话](./topic-cards.md#dg067) | [DG068 Cursor：加了 .cursorignore 就安全了？先弄清它挡什么](./topic-cards.md#dg068) | [DG069 浏览器请求能用，怎样原样带进 Apifox](./topic-cards.md#dg069) |
| 24 | 审查代码，保留排错线索 | [DG070 Cursor 写完了，再单独运行一次 Agent Review](./topic-cards.md#dg070) | [DG071 Claude Code：长篇排错快占满上下文，压缩时明确保留重点](./topic-cards.md#dg071) | [DG072 Git：一个配置值是什么时候改的？按内容查历史](./topic-cards.md#dg072) |
| 25 | 尝试新思路与留意更新 | [DG073 Codex CLI：想试另一种思路，别把原对话改乱：Fork 一份](./topic-cards.md#dg073) | [DG074 GitHub：只想知道工具发新版，别订阅整仓库的讨论](./topic-cards.md#dg074) | [DG075 Chrome DevTools：鼠标一移开菜单就没了？把 hover 状态固定住](./topic-cards.md#dg075) |
| 26 | 补齐界面边界场景 | [DG076 Apifox：后端还没好，先把“空列表”界面测起来](./topic-cards.md#dg076) | [DG077 Git：一整行都红了？把 diff 缩到真正变化的字](./topic-cards.md#dg077) | [DG078 Chrome DevTools：测试深色模式，不用反复切电脑系统主题](./topic-cards.md#dg078) |

## 主计划的工具分布

| 工具 | 条数 |
| --- | ---: |
| Codex | 16 |
| Cursor | 14 |
| VS Code | 10 |
| TRAE | 10 |
| Apifox | 6 |
| GitHub | 4 |
| Git | 6 |
| CodeBuddy | 4 |
| Qoder CN | 3 |
| Chrome DevTools | 3 |
| Claude Code | 2 |

## 每条的拍摄结构

| 时间 | 画面和讲述 |
| --- | --- |
| 0 至 4 秒 | 用题卡的开头展示具体问题或操作结果 |
| 4 至 10 秒 | 显示软件名、适用端和这次实测版本 |
| 10 至 38 秒 | 录题卡的三步操作；环境准备放在录制前，等待过程可以剪掉并标注 |
| 38 至 48 秒 | 放大成功画面，保留能核对的结果 |
| 48 至 54 秒 | 只讲最影响使用的一个限制 |
| 54 至 58 秒 | 提醒可在网站搜对应关键词，查看完整步骤和原视频 |

三步操作若无法清楚放进 28 秒，就删去枝节或换更小的问题。不要用快速闪过的命令冒充观众能照做。AI 的生成结果只有实际跑通后才能写成肯定句；没有测量就不说“节省 80%”“零成本”或“肯定不会出错”。

## 一次准备多条的素材

准备一个不含真实业务数据的演示项目：两个简单页面、一处可稳定复现的错误、一个假 API 和一组测试数据。Git 操作用可丢弃的演示仓库；规则、计划、上下文和调试题可以复用这个项目。题卡中的“素材”是待准备的清单，不代表已生成或已测试。

先按工具集中录制，再按排期穿插发布。界面字号和窗口保持一致，录屏前关掉通知，使用假 Token 和测试账号。不要把真实客户项目和本机密钥拿来当演示素材。

## 博主素材如何变成自己的题

延续已有来源库：创作者帮助发现问题，官方文档确认功能，自己的案例和录屏形成教程。此次能确认的具体文章或资料入口如下；它们是启发来源，不替代逐题列出的官方操作依据。

| 创作者 | 可用的具体素材 | 如何转成短题 |
| --- | --- | --- |
| Matt Pocock | [AI Skills for Real Engineers](https://www.aihero.dev/skills) | 从重复检查和计划中找一个单点，自己写最小示例；不照搬整套流程。 |
| Matt Pocock | [The handoff Skill](https://www.aihero.dev/skills-handoff) | 找跨工具交接的具体问题；与产品内置 resume、fork、handoff 分清，不混用名称。 |
| Simon Willison | [Using Git with coding agents](https://simonwillison.net/guides/agentic-engineering-patterns/using-git-with-coding-agents/) | 将版本恢复与定位错误拆成一个操作，实际命令仍以 Git 官方文档和演示仓库为准。 |
| 宝玉 | [我的 AI 原生开发流程 一个真实案例的完整复盘](https://baoyu.io/blog/2026-08-24/ai-native-dev-workflow) | 借鉴先明确需求再验收的场景，用自己的项目演示计划与验证。 |
| Cole Medin | [AI coding 视频资料索引](https://github.com/coleam00/cole-medin-ai-coding/blob/main/index.md) | 后续按问题找具体视频和时间点；本轮不把资料索引冒充某条视频的逐项证据。 |

没有对应具体视频或文章的题，发现来源留空，不冒填某位博主。继续订阅的频道保留在[来源库](../../source-registry.md)，不把频道首页当作某项功能的证据。外部示例代码若要采用，另记固定提交和许可证；默认使用自己的假数据和示例。

## 复核和调整

每次开拍都重查官方入口和本机版本。版本敏感题在发布前再查一遍；过了 30 天仍未拍的题重新核对。常青题指问题和做法较稳定，不代表界面或快捷键永远不变。

第 4 周看哪类题能引出“我也遇到过”“照着成功了”等具体反馈，以及你做一条花了多久。第 8 周和第 13 周重排后续题，把反复出现的问题提前。播放、收藏和网站查找分开记录，样本少时不要凭单条播放量判断方向。

本表的准备分钟数只估算资料复核、环境和演示验证；另给每条录屏配音、剪辑和网页整理留约 60 至 120 分钟，按前两周实际耗时校准。若连续做不完，优先换准备门槛低的备选题，保持每条的一分钟单点价值。

## 来源与旧计划的关系

本计划沿用两份研究报告的“单点演示、自己的实测、网站可回查”方向。报告中的播放数字、粉丝规模和未来增长推断不作为本题库的入选标准。78 条排期更新了当前拍摄节奏，旧的 8 周计划保留为历史试运行方案。

题库经实测后再转成正式教程。后续采集可使用 JSON 中的稳定内容编号、官方 URL、核对时间和状态；抓取失败应进入待复核，不自动补写功能。
