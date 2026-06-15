---
title: AI Agent 编码转岗路线
description: 面向程序员的 Agent 编码能力升级路线：从会用 AI 写代码，到能设计可计划、可审批、可验证、可回放的 Coding Agent Runtime。
date: 2026-06-13
tags: [AI Agent, Coding Agent, AI 应用工程师, 程序员转型, Agent 编码]
---

# AI Agent 编码转岗路线

这不是一个“背几个提示词就转 AI”的系列。

这个栏目解决的是一个更具体的问题：

```text
程序员如何从会用 AI 写代码，
升级为能设计、控制和验证 Coding Agent 的工程师。
```

## 适合谁

适合：

```text
有 1-5 年开发经验
会前端、后端或全栈其中一个方向
已经在用 Cursor / Copilot / Codex / Claude Code
但说不清 agent 背后的工程系统
想转向 AI 应用工程师、Agent 工程师、AI 提效工具工程师
```

暂时不适合：

```text
完全零基础转码
只想学提示词模板
只想做一次性 AI 套壳
期待保就业或保薪资承诺
```

## 主线项目

主线项目叫 Mini Codex。

它不是为了复制成熟产品，而是为了训练一套可迁移的工程能力：

```text
用户任务
-> Agent Run
-> 状态机
-> 读取项目上下文
-> Tool Registry
-> Permission Policy
-> 生成 plan
-> 人工确认
-> 生成 diff
-> 人工确认
-> apply patch
-> verify
-> repair
-> trace
-> eval
```

学完后，你应该能说清：

```text
为什么 Coding Agent 不是 Chatbot
为什么模型不能直接碰文件系统
为什么 prompt 不是安全边界
为什么 diff review 是 human gate 的核心
为什么没有 verify 就不能说任务完成
为什么 trace / eval 决定 agent 能不能持续变好
```

## 免费课

免费课暂定：

```text
7 天手写 Mini Coding Agent
```

你会从 0 做出一个本地 CLI 版 Mini Codex：

```text
Day 0：为什么 AI 编程不是 prompt 技巧
Day 1：创建 Agent Run，让任务可持久化
Day 2：状态机，让 Agent 不能乱跑
Day 3：Tool Registry，模型只提意图
Day 4：Permission Policy，Prompt 不是安全边界
Day 5：Plan / Diff Review，不让 AI 静默改仓库
Day 6：Apply / Verify，完成必须可证明
Day 7：Trace / Eval，把一次成功变成持续改进
```

课程平台入口：

- [进入课程列表](/file-tools/courses)
- 本地开发时访问 `http://127.0.0.1:3000/courses`

## 高级课

高级课会继续把 toy but runnable 升级到 work-useful：

```text
真实模型适配
AGENTS.md / 项目规则
Code Context Collector
prompt injection 防护
sandbox profile
checkpoint / rollback
Git / worktree
MCP
skills
hooks
memory
subtask / subagent
desktop workbench
eval dashboard
面试作品包装
```

## 第一批文章

建议从这些主题开始读：

```text
1. AI 编程最难的不是生成代码，而是控制它怎么改代码
2. Coding Agent 和 Copilot 到底差在哪
3. 为什么第一课要写 Agent Run，而不是先调模型
4. Tool Registry：模型不能直接碰你的文件系统
5. Prompt 不是安全边界：手写一个最小权限策略
6. 为什么我不让 AI 静默改仓库，而是先生成 diff
7. 没有 verify 的 AI 编码，只是“看起来完成”
```

后面这个栏目会围绕一个原则展开：

```text
少讲玄学，多讲可运行的工程闭环。
```
