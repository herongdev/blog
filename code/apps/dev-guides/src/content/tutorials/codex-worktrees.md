---
title: 'Codex 同时处理两个任务，工作树怎样避免文件互相覆盖？'
summary: '官方文档介绍了 Codex 桌面版的工作树隔离，可用于并行任务。具体操作步骤尚未亲测。'
tool: codex
status: lead
updatedAt: 2026-10-20
platform: 'Codex 桌面版；需 Git 仓库'
keywords: ['worktree', '工作树', '并行任务', '文件冲突', '隔离']
searchClues: ['两个任务改代码', '同时改一个仓库', 'Codex 任务互相覆盖', '让两个任务不打架']
themes: ['parallel-work']
officialSources:
  - title: 'Codex Worktrees 官方文档'
    url: 'https://learn.chatgpt.com/docs/environments/git-worktrees'
---

Codex 官方文档介绍了用独立工作树隔离同一仓库中的任务。这个功能适合需要并行处理改动、又不想让任务直接改同一个工作目录的情况。

## 使用前注意

- 需要 Git 仓库；具体入口与界面以当前 Codex 桌面版为准。
- 工作树能隔离文件改动，合并结果时仍可能遇到冲突。

本站尚未亲测创建和合并流程。需要立即操作时，请先查看下方官方文档。
