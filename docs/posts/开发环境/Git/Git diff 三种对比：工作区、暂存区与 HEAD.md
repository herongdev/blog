---
title: Git diff 三种对比：工作区、暂存区与 HEAD
date: 2026-06-13
tags:
  - Git
  - 版本控制
  - 开发环境
categories:
  - 开发环境
description: 弄清 HEAD、暂存区、工作区三层关系，以及 git diff、git diff --cached、git diff HEAD 各自比较什么。
---

## 工作区相对 HEAD 的「未暂存变更」

Git 里文件大致有三个地方：

```text
HEAD（最近一次提交）
  ↓
暂存区（git add 之后）
  ↓
工作区（你磁盘上正在改的文件）
```

不带参数的 `git diff` 比较的是：

```text
工作区里的内容  vs  暂存区里的内容
```

如果文件还没 `git add`，那暂存区还是上次提交的样子，所以效果上就是：

```text
你改动了、但还没 git add 的那些差异
```

也就是注释里说的「**未暂存变更**」。

---

## 三种 diff 命令对比

| 命令 | 看什么 |
|------|--------|
| `git diff` | 工作区 vs 暂存区（未 add 的改动） |
| `git diff --cached` | 暂存区 vs HEAD（已 add、未 commit 的改动） |
| `git diff HEAD` | 工作区 vs HEAD（所有未提交的改动） |

不带参数时用的是第一种，所以**看不到**已经 `git add` 进暂存区的内容。

---

## 一句话记忆

```text
git diff          → 还没 add 的
git diff --cached → 已经 add、还没 commit 的
git diff HEAD     → 上面两种加在一起（所有未提交）
```
