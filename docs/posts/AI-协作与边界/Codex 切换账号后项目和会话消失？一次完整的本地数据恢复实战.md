---
title: Codex 切换账号后项目和会话消失？一次完整的本地数据恢复实战
date: 2026-07-26 16:30:00
updated: 2026-07-26 16:30:00
categories:
  - AI 工具
  - 故障排查
tags:
  - Codex
  - ChatGPT
  - 数据恢复
  - macOS
  - Hexo
description: 从服务器代理、账号切换和本地数据清理导致的 Codex 项目消失出发，讲清本地项目、会话和账号的边界，并通过备份、快照比对、状态合并和退出后写回恢复项目与会话。
---

有一种故障很容易让人误判：代码仓库明明还在磁盘上，Codex 左侧却只剩一个项目，过去的会话也像被清空了。

我遇到的情况更复杂一些：中间使用过服务器代理模式，切换过登录方式，也删除、替换过部分本地数据。后来重新使用个人账户登录，之前积累的项目和会话全部不见了。

最后确认，代码没有丢，会话文件也大部分还在。真正丢失的是 Codex 用来组织项目和会话的本地目录信息。本文给出一套可复用、可验证、尽量不破坏现有数据的恢复方法。

<!-- more -->

## 完成本文后，你能解决什么

你将能够：

- 判断丢失的是代码、会话文件，还是 Codex 的项目目录；
- 区分代理、账号认证和本地工作区数据，避免把三者混为一谈；
- 从 `$HOME/.codex` 或旧备份中找到项目快照；
- 在不覆盖新会话的情况下，合并旧项目和会话归属；
- 解释为什么“应用运行时写回状态”看似成功，重启后却又失败；
- 建立一套切换账号、重装应用和清理代理前的备份流程。

本文以 macOS 上的 ChatGPT/Codex 桌面版为例。内部文件名可能随版本变化，因此先备份、再验证，永远比直接覆盖更重要。

## 先理解：账号、代理和本地历史不是同一层

可以把 Codex 的数据分成三层：

```text
代码仓库
  -> Git 仓库、源码、未提交修改

Codex 本地状态
  -> 项目列表、会话索引、会话正文、项目与会话的归属关系

账号与网络
  -> ChatGPT 登录、授权令牌、服务器代理、云端能力
```

服务器代理改变的是网络请求经过哪里，账号切换改变的是当前认证身份。它们不会自动把一台电脑上的本地项目目录迁移到另一个账户，也不应被当成备份方案。

OpenAI 官方文档说明，Codex 的 **Local** 和 **Worktree** 会话运行在用户电脑上；桌面端的本地 Work 会话也保留在本机，而 Codex 有独立的开发工作流历史。这意味着：切换账号后界面历史发生变化时，应同时检查本地状态，而不是立刻认定数据已在云端被删除。

- [Codex environments：Local 与 Worktree 在本机运行](https://learn.chatgpt.com/docs/environments/modes)
- [桌面端本地会话与 Codex 独立历史](https://learn.chatgpt.com/docs/whats-new#keep-work-conversations-and-projects-together-on-desktop)

> 本文后续涉及的 `$HOME/.codex` 文件结构来自一次真实故障恢复，不是稳定公开 API。不同版本可能使用不同文件名或数据库结构。

## 第一步：停止删除，做完整备份

不要先重装，不要清空缓存，不要把旧 `.codex` 整目录覆盖到新目录。

先打开独立的“终端”应用，执行：

```bash
backup_dir="$HOME/codex-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"
cp -a "$HOME/.codex" "$backup_dir/.codex"
echo "备份位置：$backup_dir"
```

如果桌面上已经有旧的 `.codex` 备份，也保留原样：

```bash
cp -a "$HOME/Desktop/.codex" "$backup_dir/desktop-codex"
```

如果实际目录叫 `.codex-before-restore-日期`，把命令中的源路径替换成真实名称。

### 不要分享这些文件

`.codex` 可能包含认证信息、配置、对话正文、代码路径和工具日志。特别注意：

- 不要把 `auth.json` 发给别人；
- 不要把整个 `.codex` 上传到公开网盘或 Git 仓库；
- 不要为了恢复项目，把旧账户的认证文件复制给新账户；
- 教程截图中应隐藏用户名、邮箱、绝对路径和会话内容。

## 第二步：确认代码仓库还在

项目列表消失，不代表项目目录被删除。先检查常用代码目录：

```bash
find "$HOME/Documents" -maxdepth 4 -type d -name .git -print 2>/dev/null
```

如果仓库仍在，Git 状态也正常：

```bash
git -C "$HOME/path/to/project" status
```

那么代码层基本安全，接下来恢复的是 Codex 的目录和会话关系。

## 第三步：盘点会话与项目快照

常见的关键数据包括：

```text
$HOME/.codex/.codex-global-state.json
$HOME/.codex/.codex-global-state.json.bak
$HOME/.codex/..codex-global-state.json.tmp-*
$HOME/.codex/session_index.jsonl
$HOME/.codex/sessions/
$HOME/.codex/archived_sessions/
$HOME/.codex/logs_*.sqlite
$HOME/.codex/state_*.sqlite
```

其中：

- `session_index.jsonl` 可用于判断历史会话索引是否还在；
- `sessions/` 和 `archived_sessions/` 可能保存会话记录；
- `.codex-global-state.json` 保存桌面端当前项目目录等状态；
- 临时的 `..codex-global-state.json.tmp-*` 有时保留着故障前的完整项目列表；
- SQLite 文件可能包含更多运行和索引状态，但不建议在不了解表结构时直接修改。

先统计会话索引：

```bash
wc -l "$HOME/.codex/session_index.jsonl"
find "$HOME/.codex/sessions" "$HOME/.codex/archived_sessions" \
  -type f -name '*.jsonl' 2>/dev/null | wc -l
```

再查看有哪些全局状态快照：

```bash
find "$HOME/.codex" -maxdepth 1 -type f \
  \( -name '*global-state*' -o -name '*.bak' \) -print
```

故障案例中，当前状态只有 1 个项目，但旧临时快照包含 19 个项目和 122 条历史会话归属；会话索引本身有 821 条。这说明“会话还在，项目目录丢了”。

## 第四步：先预览，不要直接写回

下载或保存本文附带的 `recover-codex-projects.mjs`，然后在终端中运行预览：

```bash
node recover-codex-projects.mjs \
  --codex-home "$HOME/.codex"
```

如果旧快照位于另一个备份目录：

```bash
node recover-codex-projects.mjs \
  --codex-home "$HOME/.codex" \
  --source-dir "$HOME/Desktop/.codex-before-restore"
```

没有全局 Node.js 时，可以使用 ChatGPT 桌面应用自带的 Node：

```bash
node_bin="/Applications/ChatGPT.app/Contents/Resources/cua_node/bin/node"
"$node_bin" recover-codex-projects.mjs \
  --codex-home "$HOME/.codex" \
  --source-dir "$HOME/Desktop/.codex-before-restore"
```

预览输出应包含：

```json
{
  "applied": false,
  "before": {
    "projects": 1,
    "assignments": 4
  },
  "after": {
    "projects": 19,
    "assignments": 126
  }
}
```

重点检查：

- `sourceSnapshot` 是否真的是旧快照；
- `after.projects` 是否符合记忆；
- `projects[].rootPath` 是否指向真实目录；
- `directoryExists` 为 `false` 的项目是否确实已经移动或删除。

## 第五步：完全退出应用，再执行恢复

这是整个恢复流程最容易失败的地方。

如果在 ChatGPT/Codex 仍运行时修改 `.codex-global-state.json`，文件可能暂时显示恢复成功；但应用退出时会把内存中的旧状态重新写回磁盘，于是重启后仍只看到一个项目。

正确顺序：

1. 保持独立的“终端”应用打开；
2. 在 ChatGPT/Codex 中按 `Command + Q` 完全退出；
3. 确认主进程已经消失；
4. 从终端执行恢复；
5. 验证文件后再重新打开应用。

确认进程：

```bash
pgrep -x ChatGPT || echo "ChatGPT 已退出"
pgrep -x Codex || echo "Codex 已退出"
```

执行恢复：

```bash
node recover-codex-projects.mjs \
  --codex-home "$HOME/.codex" \
  --source-dir "$HOME/Desktop/.codex-before-restore" \
  --apply
```

脚本会：

- 选择项目数量最多、会话归属最完整的状态快照；
- 按项目根目录去重；
- 保留当前新项目和新会话；
- 修正同一路径对应的新旧项目 ID；
- 合并历史会话的项目归属；
- 写入前备份当前状态；
- 使用临时文件加原子重命名，降低半写入风险；
- 同步更新 `.codex-global-state.json.bak`。

备份默认写入：

```text
$HOME/codex-recovery-backups/<时间戳>/
```

验证成功后重新打开：

```bash
open -a ChatGPT
```

## 为什么直接覆盖整个 `.codex` 很危险

旧目录中可能同时包含：

- 过期登录凭据；
- 旧版配置格式；
- 当前账号不再适用的插件或 MCP 配置；
- 较旧的数据库；
- 新会话不存在于旧备份中的状态。

整目录覆盖可能把“项目丢失”升级成“认证、插件、数据库和新会话一起损坏”。

更安全的恢复范围是：

```text
旧项目目录
+ 旧项目顺序
+ 历史会话归属
+ 当前新项目和新会话
= 合并后的全局状态
```

不要迁移：

```text
旧 auth.json
旧账户令牌
来源不明的 config.toml
未经验证的 SQLite 整库
```

## 如果让 Codex 自己修复，为什么普通后台脚本也会失败

本次恢复中还踩到了第二个坑：Codex 自己启动了一个 `nohup` 后台脚本，计划等应用退出后再写回状态。但 ChatGPT/Codex 退出时，它的子进程也被清理，脚本没有机会继续执行。

因此有两种可靠方式：

### 推荐：在独立终端手动执行

这是最简单、最透明的方法。应用退出后，终端仍然存在，可以直接执行恢复命令。

### 自动化：交给 macOS `launchd`

`launchd` 由操作系统管理，不依赖 ChatGPT/Codex 进程。适合必须由自动化程序完成“等待退出 -> 写回 -> 验证 -> 重启”的场景。

执行前必须验证：

```bash
launchctl print "gui/$(id -u)/你的任务标签"
```

应看到：

```text
state = running
active count = 1
```

仅看到任务已提交不够；还要检查独立日志，避免任务因为找不到 `node` 而以退出码 `127` 失败。`launchd` 环境的 `PATH` 很短，脚本内应使用 Node、`open`、`date` 等命令的绝对路径。

对于普通读者，没有必要先上 `launchd`。独立终端方案足够可靠。

## 服务器代理和账号切换前的正确做法

以后准备切换代理、组织账号或个人账号时，先完成下面的检查：

### 1. 保存代码

```bash
git -C "$HOME/path/to/project" status
git -C "$HOME/path/to/project" diff
```

未提交修改至少复制到独立备份，不要假设 Codex 会话能替代 Git。

### 2. 备份 Codex 本地状态

```bash
backup_dir="$HOME/codex-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"
cp -a "$HOME/.codex" "$backup_dir/.codex"
```

备份应离线保存并限制访问权限。

### 3. 记录项目清单

```bash
find "$HOME/Documents" -maxdepth 4 -type d -name .git -print \
  > "$backup_dir/git-projects.txt"
```

### 4. 只清理明确目标

如果只是更换代理，不要顺手删除：

```text
$HOME/.codex/sessions/
$HOME/.codex/archived_sessions/
$HOME/.codex/session_index.jsonl
$HOME/.codex/*global-state*
$HOME/.codex/*.sqlite
```

如果只是退出账号，也不要把“清凭据”和“删历史”混成一个操作。

### 5. 切换后立刻做最小验证

- 原项目是否还在列表；
- 最近会话能否搜索；
- 新建一个测试项目后，重启是否仍存在；
- `$HOME/.codex` 中的索引文件是否还在增长；
- 代理关闭后，登录和本地项目是否仍可分别工作。

## 故障判断速查表

| 现象 | 更可能的问题 | 首选检查 |
|---|---|---|
| 项目列表消失，但代码目录还在 | 项目目录状态丢失 | `*global-state*` 快照 |
| 项目还在，会话标题不见 | 会话索引缺失 | `session_index.jsonl` |
| 索引有很多行，界面仍为空 | 当前状态未挂回项目或应用未重新加载 | 会话归属、完全退出重开 |
| 修改文件后立刻恢复，重启又丢 | 运行中的应用在退出时覆盖文件 | 退出后写回 |
| 旧目录有记录，新目录没有 | 清理、重装或账户切换期间换了状态目录 | 对比两个 `.codex` |
| 代理可用但历史没回来 | 网络恢复不等于本地状态恢复 | 检查本机文件 |
| 仓库目录真的不存在 | 代码层丢失 | Git 远端、Time Machine、磁盘备份 |

## 回滚方法

如果恢复后项目显示异常，先完全退出应用，再回滚刚才的备份：

```bash
cp "$HOME/codex-recovery-backups/<时间戳>/.codex-global-state.before-restore.json" \
  "$HOME/.codex/.codex-global-state.json"
cp "$HOME/.codex/.codex-global-state.json" \
  "$HOME/.codex/.codex-global-state.json.bak"
```

然后重新打开 ChatGPT。

不要删除恢复目录，直到确认：

- 项目数量正确；
- 每个项目路径正确；
- 历史会话能打开；
- 新建会话后重启仍然存在；
- 当前个人账号登录和插件配置正常。

## 最终结论

遇到“切换账号后 Codex 项目和会话消失”，先不要把它理解成云端永久删除。

按照下面的顺序排查：

```text
代码目录是否存在
  -> 会话文件是否存在
  -> 会话索引是否存在
  -> 旧项目快照是否存在
  -> 合并旧项目与当前新状态
  -> 完全退出应用
  -> 写回、验证、重启
```

最重要的经验有三条：

1. 账号认证、服务器代理和本地历史是三套不同问题；
2. 恢复时只合并必要状态，不整目录覆盖；
3. 修改 Codex 状态必须在应用完全退出后完成。

只要代码目录、会话文件或旧状态快照仍在，项目列表消失通常还有恢复空间。真正决定恢复成功率的，不是重装次数，而是是否及时停止删除、保存原始证据，并在写回前理解哪一层数据出了问题。
