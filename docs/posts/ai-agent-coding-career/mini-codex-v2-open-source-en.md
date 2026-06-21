---
title: "Mini Codex v2 Foundation Course: Build a Reviewable, Verifiable Coding Agent from Scratch"
description: "An English entry point for the Mini Codex v2 foundation course: build a small coding agent runtime with task state, permission gates, planning, diff review, verification, trace, and eval."
date: 2026-06-19
lang: en-US
alternateZh: /posts/ai-agent-coding-career/mini-codex-v2-open-source
alternateEn: /posts/ai-agent-coding-career/mini-codex-v2-open-source-en
tags: [Mini Codex, Coding Agent, AI Engineer, Codex, Open Course]
keywords: [Mini Codex, Coding Agent, Codex tutorial, AI application engineer, open course]
---

# Mini Codex v2 Foundation Course

[中文版](/posts/ai-agent-coding-career/mini-codex-v2-open-source)

This is not another prompt-template collection, and it is not a thin chatbot wrapper.

The goal is concrete:

```text
start from an empty folder
-> build a local Mini Codex
-> turn one coding request into a trackable, reviewable, verifiable, replayable engineering task
```

Primary reading page:

[Mini Codex course page](https://mianshiti.net/welcome/mini-codex)

Open-source repository:

[https://github.com/herongdev/min-codex-hands-on-v2](https://github.com/herongdev/min-codex-hands-on-v2)

## Who This Is For

This course is for developers who already know basic frontend, backend, or full-stack development and are using tools such as Codex, Cursor, or Claude Code.

You do not need to master a complex agent framework first. The more important questions are:

```text
Why is a Coding Agent different from a chatbot?
Why should the model not touch the file system directly?
Why is a prompt not a security boundary?
Why should code changes go through a plan and a diff review?
Why does "done" require verification evidence?
Why do trace and eval decide whether the agent can improve over time?
```

## What You Will Build

By the end of the foundation course, you will have a small but complete Mini Codex:

```text
enter one coding request
-> save it as a task
-> generate a plan
-> wait for your approval
-> modify files
-> run checks
-> save the process
-> inspect the result in a desktop workbench
```

It does not try to copy every capability of the official Codex product. The foundation course focuses on one thing: making the smallest safe coding-agent loop work.

## Course Outline

The open foundation course includes:

1. Lab 00: Environment and practice workspace
2. Lab 01: Save the first task
3. Lab 02: Pause a task for human approval
4. Lab 03: Tool Registry and permission boundaries
5. Lab 04: Make the first real code change
6. Lab 05: Trace, Replay, and Eval
7. Lab 06: Backend API and SSE
8. Lab 07: Desktop workbench
9. Lab 07b: UI polish and design system
10. Lab 08: Compare the boundary with real Codex-style tools
11. Real Codex capability upgrade map
12. Demo cases
13. Eval ledger

## Publishing Boundary

This release open-sources the foundation course and the public upgrade direction only.

The v2 Advanced course is maintained separately and is not part of this open-source release. The site and repository do not expose private advanced-course paths or commercial-course content.

## Why Start With the Foundation

The hard part of AI coding is not asking a model to generate code. The hard part is putting generated code inside an engineering system:

```text
state
permissions
planning
review
verification
replay
evaluation
```

Once these foundations are working, RAG, memory, MCP, subagents, Git worktrees, and dashboards become much easier to reason about.

Start here:

[Open the Mini Codex course page](https://mianshiti.net/welcome/mini-codex)
