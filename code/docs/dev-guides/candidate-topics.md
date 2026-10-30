# 首批一分钟视频候选题

整理日期：2026-10-20。下表仅证明**官方公开资料写有相应功能**；尚未在当前账号和安装环境中亲测。所有题的状态都是`官方已核、待实测`，不能直接作为“我试过”的视频结论。上线前须将具体版本、平台、套餐、测试仓库或测试账号、录屏、结果补入[来源卡模板](./source-registry.md#每条视频或教程的来源记录模板)。

| 顺位 | 一分钟问题与画面 | 官方具体依据 | 实测门槛/限制 |
| --- | --- | --- | --- |
| 1 | **Codex 两个任务同时改一个仓库，怎样隔离文件？** 用 Local 和独立 Worktree 各改一处，展示目录和审查入口。 | [Codex Worktrees 文档](https://learn.chatgpt.com/docs/environments/git-worktrees) | 需 Git 仓库和可用的桌面版；用测试仓库，约 2–3 小时准备。 |
| 2 | **TRAE 输入 `@` 后，怎样找到历史对话和项目规则？** 对比手动复制上下文与引用菜单。 | [TRAE 2026-10-15 更新，v3.4.1–3.4.4](https://docs.trae.cn/ide_changelog) | 核对当前安装版的菜单和账号权限，约 1–2 小时。 |
| 3 | **Apifox 请求失败，最终发出的 URL 和请求头在哪看？** 故意设错测试环境变量，打开“实际请求”。 | [2026-08-31 官方产品更新](https://apifox.com/blog/features-2026-8/)、[“实际请求”帮助文档](https://docs.apifox.com/actual-request) | 用假接口和假凭据；准确记录安装版，约 1–2 小时。 |
| 4 | **VS Code Agent 会话太多，怎样快速整理？** 展示 Compact View、F2 改名及待审批时的展开。 | [VS Code 1.139 发布说明](https://code.visualstudio.com/updates/v1_139) | 需该版本及可用的 Agents Window，约 1–1.5 小时。 |
| 5 | **TRAE 一个项目涉及多个仓库，怎样一起查找？** 同一项目挂多个路径，搜索跨路径文件。 | [TRAE 2026-10-08 更新，v3.4.0](https://docs.trae.cn/ide_changelog) | 先确认当前 Agent 窗口和路径权限，准备两个测试仓库，约 1–2 小时。 |
| 6 | **Cursor 出门后能否继续处理电脑上的 Agent？** 用 iPhone 查看本地任务并回复一次。 | [Cursor 2026-10-06 Remote Control 更新](https://cursor.com/changelog/remote-control-local-agents) | 官方当前说明为 iOS；电脑须开机联网，企业账号需要管理员启用；约 2–3 小时。 |
| 7 | **Cursor 两个项目的内置浏览器会串登录态吗？** 两个测试工作区分别登录测试站点。 | [Cursor IDE 3.21 发布说明](https://prod.cursor.com/docs/release-notes/ide) | 功能按工作区隔离；当前安装版与测试账号需核对，约 2–3 小时。 |
| 8 | **Codex 工作树缺少被 Git 忽略的本地配置，怎样补进来？** 用无敏感内容的假配置演示 `.worktreeinclude`。 | [Codex Worktrees 文档“Copy ignored local files”](https://learn.chatgpt.com/docs/environments/git-worktrees) | 只适用于桌面版管理的本地工作树；不能展示真实 `.env`，约 2–3 小时。 |
| 9 | **CodeBuddy 的项目规范太长，能拆成多个文件吗？** 用 `CODEBUDDY.md` 中的 `@path` 引入测试规范，再让 Agent 按规范执行。 | [CodeBuddy IDE 4.12.1 发布说明](https://www.codebuddy.cn/docs/ide/release-notes/release-notes)、[记忆文件文档](https://www.codebuddy.cn/docs/cli/memory) | 发布说明与详细 CLI 文档需在当前 IDE 中交叉实测，约 2–3 小时。 |
| 10 | **GitHub Actions 引用 tag 后，怎么固定实际执行的提交？** 在测试 workflow 里生成 lockfile 并展示固定 commit。 | [GitHub 2026-10-14 公开预览公告](https://github.blog/changelog/2026-10-14-github-actions-workflow-lockfiles-in-public-preview/) | 公开预览、需 `gh actions-lock`；锁定不等于验证依赖安全。演示较复杂，约 3–4 小时。 |
| 11 | **Qoder CN 的 Quest 视窗下线后，旧对话怎么导入？** 用真实旧数据演示“设置→个人→数据导入”。 | [Qoder CN Quest 下线通知](https://docs.qoder.cn/product-overview/quest-retirement-notice) | 需要同机旧数据；若没有真实可用数据就放弃此题，不制造假迁移画面。 |

**首轮实测顺序**：Codex 工作树 → TRAE `@` → Apifox 实际请求。三题分别代表 AI 编程主线、国产 AI IDE、日常 API 调试；优先发布画面最清楚、结果最稳定的一题。Cursor Remote Control 需要 iPhone 和持续联网，GitHub Lockfiles 处于公开预览，Qoder Quest 迁移需要旧数据，先作为备选。

首批暂不安排豆包。若以后找到明确的开发任务和官方具体功能说明，再新增候选并亲测。
