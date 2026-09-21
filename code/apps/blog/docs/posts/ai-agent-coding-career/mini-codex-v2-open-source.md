---
title: Mini Codex v2 基础课开源：从零手写一个可审批、可验证、可复盘的 Coding Agent
description: Mini Codex v2 基础课开源发布说明：用一套可运行的动手 Lab，理解 Coding Agent 的任务状态、权限边界、计划、diff、验证、trace 和 eval。
date: 2026-06-19
lang: zh-CN
alternateZh: /posts/ai-agent-coding-career/mini-codex-v2-open-source
alternateEn: /posts/ai-agent-coding-career/mini-codex-v2-open-source-en
tags: [Mini Codex, Coding Agent, AI 应用工程师, Codex, 开源课程]
keywords: [Mini Codex, Coding Agent, Codex 教程, AI 应用工程师, 开源课程]
---

# Mini Codex v2 基础课开源

[English version](/posts/ai-agent-coding-career/mini-codex-v2-open-source-en)

这套课不是提示词模板，也不是再做一个聊天套壳。

它的目标很具体：

```text
从一个空目录开始
-> 做出一个本地 Mini Codex
-> 让一次代码需求变成可追踪、可审批、可验证、可复盘的工程任务
```

GitHub 仓库：

[https://github.com/herongdev/min-codex-hands-on-v2](https://github.com/herongdev/min-codex-hands-on-v2)

## 适合谁

适合已经会基础前后端开发，并且正在使用 Codex、Cursor、Claude Code 这类 AI 编程工具的人。

你不需要先懂复杂 Agent 框架。更重要的是先理解这些工程问题：

```text
为什么 Coding Agent 不是 Chatbot
为什么模型不能直接碰文件系统
为什么 prompt 不是安全边界
为什么改代码前要先生成计划和 diff
为什么没有 verify 就不能说任务完成
为什么 trace / eval 决定工具能不能持续变好
```

## 课程会做出什么

完成基础课后，你会得到一个最小但完整的 Mini Codex：

```text
输入一句代码修改需求
-> 保存任务
-> 给出计划
-> 等你确认
-> 修改文件
-> 运行检查
-> 保存过程
-> 在桌面界面查看
```

它不会复制官方 Codex 的全部能力。基础课只追求一件事：把最小闭环跑稳。

## 课程目录

公开基础课包含：

1. Lab 00：环境准备和练习目录
2. Lab 01：保存第一条任务
3. Lab 02：让任务能停下来等你确认
4. Lab 03：Tool Registry 和权限边界
5. Lab 04：第一次真实代码修改
6. Lab 05：Trace、Replay 和 Eval
7. Lab 06：后端 API 和 SSE
8. Lab 07：桌面工作台
9. Lab 07b：UI 美化和设计系统
10. Lab 08：对照真实 Codex 能力边界
11. 真实 Codex 功能升级包
12. 练习案例
13. 复盘台账

## 开源边界

本次只开源基础课和公开升级方向。

v2 Advanced 进阶课独立维护，暂不随基础课仓库开源。展示页和 GitHub 仓库也不会公开进阶课目录、私有路径或商业课正文。

## 为什么先开源基础课

AI 编程真正难的不是让模型生成代码，而是把生成代码这件事放进工程约束里：

```text
有状态
有权限
有计划
有审查
有验证
有回放
有复盘
```

先把这些基础能力亲手跑一遍，再讨论 RAG、Memory、MCP、Subagent、Git worktree、质量面板，才不容易把高级名词做成空架子。

下一步从仓库 README 开始：

[进入 Mini Codex v2 基础课](https://github.com/herongdev/min-codex-hands-on-v2)
