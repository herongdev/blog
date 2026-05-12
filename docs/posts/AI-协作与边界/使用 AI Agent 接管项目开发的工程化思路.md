---
title: 使用 AI Agent 接管项目开发的工程化思路
date: 2026-05-12 00:00:00
tags:
  - AI Agent
  - 工程化
  - 项目规范
  - Cursor
  - Claude Code
  - Codex
categories:
  - AI 编程
---

## 一、整体实现思路

如果以后希望新功能、需求优化、Bug 修复、重构都尽量交给 AI Agent 完成，核心不是简单地加一个 `README.md` 或 `CLAUDE.md`，而是要把项目改造成：

> AI 能读懂、能修改、能验证、能回滚的工程系统。

所以整体思路是：

```txt
项目文档化
  ↓
需求模板化
  ↓
代码规范化
  ↓
验证自动化
  ↓
任务小步化
  ↓
经验沉淀化
```

也就是说，人主要负责：

* 定方向
* 定业务规则
* 定验收标准
* Review AI 的结果

AI 主要负责：

* 阅读上下文
* 拆解任务
* 修改代码
* 补测试
* 总结变更

自动化工具负责：

* lint
* typecheck
* test
* build
* CI 检查

---

## 二、第一步：整理项目入口文件

建议先补齐这些文件：

```txt
project-root/
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── docs/
│   ├── 00-project-overview.md
│   ├── 01-architecture.md
│   ├── 02-code-style.md
│   ├── 03-business-rules.md
│   └── 07-agent-workflow.md
```

其中：

| 文件               | 作用                      |
| ---------------- | ----------------------- |
| `README.md`      | 给人看的项目入口                |
| `AGENTS.md`      | 给通用 AI Agent 看的项目规则     |
| `CLAUDE.md`      | 给 Claude Code 看的项目记忆    |
| `docs/`          | 存放项目结构、业务规则、接口、数据库、开发流程 |
| `.cursor/rules/` | 给 Cursor 的项目规则          |

---

## 三、README.md 怎么写

`README.md` 不需要特别长，主要让人快速知道这个项目是什么、怎么跑、常用命令是什么。

````md
# 项目名称

## 项目定位

这是一个什么项目，解决什么问题，目标用户是谁。

## 技术栈

- Frontend:
- Backend:
- Database:
- Cache:
- Queue:
- AI Provider:

## 本地启动

```bash
pnpm install
pnpm dev
```

## 常用命令

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 主要目录

* src/modules：业务模块
* src/common：公共能力
* docs：项目文档
````

---

## 四、AGENTS.md 怎么写

`AGENTS.md` 是给 AI Agent 看的核心规则文件。

它应该告诉 AI：

- 这个项目是什么
- 修改代码前要先读哪些文档
- 不能做什么
- 修改后要怎么验证
- 输出格式有什么要求

最简示例：

````md
# AGENTS.md

## Role

你是本项目的 AI 编程助手，负责辅助实现新功能、修复 bug、重构代码和补充测试。

## Project Overview

修改代码前，请先阅读：

- docs/00-project-overview.md
- docs/01-architecture.md
- docs/02-code-style.md
- docs/03-business-rules.md

## Before Coding

在修改代码前，必须先完成：

1. 复述你理解的需求
2. 列出可能影响的文件
3. 给出修改方案
4. 标明风险点

## Coding Rules

- 不要无意义重构
- 不要扩大需求范围
- 不要引入未确认的新依赖
- 修改代码时优先保持现有架构
- 关键逻辑必须补充中文注释
- TypeScript 项目禁止使用 any
- 后端接口必须考虑错误处理和边界条件

## Verification

修改完成后，优先运行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

如果无法运行，必须说明原因，并给出人工检查点。

## Output Style

回答时优先给必要修改点，不要重复输出完整文件，除非用户明确要求。
````

---

## 五、CLAUDE.md 怎么写

如果你使用 Claude Code，可以单独准备 `CLAUDE.md`。

```md
# CLAUDE.md

## 项目协作方式

本项目使用 AI Agent 辅助开发，但所有改动必须保持小步、可验证、可回滚。

## 用户偏好

- 默认使用中文交流
- 代码修改只给必要片段
- 不要重复输出完整代码
- 关键逻辑上一行加中文注释
- 优先给可执行方案，不要空泛解释

## 开发原则

- 先读 docs，再改代码
- 先方案，后实现
- 先复用现有模块，不随意新建抽象
- 不为“看起来高级”而重构
- 不确定业务规则时，先标出假设

## 必读文档

- docs/00-project-overview.md
- docs/01-architecture.md
- docs/03-business-rules.md
- docs/07-agent-workflow.md
```

---

## 六、docs 目录怎么设计

推荐先建这几个文档：

```txt
docs/
├── 00-project-overview.md
├── 01-architecture.md
├── 02-code-style.md
├── 03-business-rules.md
├── 04-api-design.md
├── 05-database.md
├── 06-testing.md
├── 07-agent-workflow.md
└── adr/
```

### 1. 项目概览

```md
# 项目概览

## 项目目标

这个项目要解决什么问题。

## 核心用户

谁会使用这个系统。

## 核心模块

- 用户模块
- 内容模块
- 采集模块
- AI 处理模块
- 后台管理模块

## 当前阶段

当前优先级是什么，哪些功能先不做。
```

### 2. 架构说明

```md
# 架构说明

## 技术栈

- Frontend:
- Backend:
- Database:
- Cache:
- Queue:
- AI:

## 数据流

用户请求
  → Controller
  → Service
  → Repository
  → Database

AI 任务
  → Job
  → Queue
  → Worker
  → Model API
  → Result Storage

## 模块边界

每个模块负责什么，不负责什么。
```

### 3. 代码规范

```md
# 代码规范

## 命名规则

- 方法名使用完整可读名称，不使用无意义缩写
- 布尔值使用 is/has/can/should 开头
- 查询方法使用 find/get/list/search 区分语义

## TypeScript 规则

- 禁止 any
- DTO、Entity、Response 必须有明确类型
- 条件判断较多时，优先抽成具名函数

## 注释规则

- 不解释显而易见的代码
- 只解释业务规则、边界条件和容易误解的逻辑
```

### 4. 业务规则

这个文件非常重要，因为 AI 最容易出错的地方通常不是语法，而是业务理解。

```md
# 业务规则

## 内容生成规则

- 无来源则不写
- URL 必须来自可信来源
- AI 摘要不能虚构原文没有的信息
- 低可信来源只能作为补充阅读

## 用户规则

- 普通用户可以查看公开内容
- 管理员可以管理内容
- 未登录用户不能访问后台接口

## 排序规则

- 优先展示高质量内容
- 低质量内容降权
- 已读内容可以降低展示优先级
```

---

## 七、Agent 开发流程怎么写

建议单独建：

```txt
docs/07-agent-workflow.md
```

内容如下：

```md
# Agent 开发流程

## 新功能流程

1. 阅读相关 docs
2. 复述需求
3. 列出影响范围
4. 给出实现方案
5. 小步修改
6. 补充测试或验证方式
7. 总结改动

## Bug 修复流程

1. 复现问题
2. 定位原因
3. 判断影响范围
4. 最小改动修复
5. 补充回归验证方式

## 重构流程

1. 不改变外部行为
2. 先列出重构目标
3. 一次只重构一个方向
4. 保留兼容层
5. 必须给出验证方式
```

---

## 八、任务模板怎么准备

建议建目录：

```txt
docs/tasks/
├── feature-template.md
├── bugfix-template.md
└── refactor-template.md
```

### 新功能模板

```md
# Feature Request

## 背景

为什么要做这个功能。

## 目标

这个功能最终要达到什么效果。

## 用户路径

用户会怎么使用它。

## 业务规则

- 规则 1
- 规则 2
- 规则 3

## 非目标

这次明确不做什么。

## 影响范围

- 前端：
- 后端：
- 数据库：
- 定时任务：
- AI 逻辑：

## 验收标准

- [ ] 能正常创建
- [ ] 能正常查询
- [ ] 异常情况有提示
- [ ] 权限校验正确
- [ ] 构建通过
```

### Bug 修复模板

```md
# Bug Report

## 问题现象

具体表现是什么。

## 复现步骤

1.
2.
3.

## 期望结果

应该是什么样。

## 实际结果

现在是什么样。

## 相关文件

如果已知，列出来。

## 修复要求

- 不扩大修改范围
- 优先最小改动
- 修复后说明根因
- 给出回归验证方式
```

### 重构模板

```md
# Refactor Request

## 当前问题

现在代码哪里不好。

## 重构目标

希望改善什么。

## 约束

- 不改变外部接口
- 不改变数据库结构
- 不影响现有功能
- 不引入新依赖

## 验收标准

- [ ] 原功能正常
- [ ] 代码重复减少
- [ ] 模块边界更清晰
- [ ] 测试或构建通过
```

---

## 九、自动验证命令必须准备好

AI Agent 编程一定要有验证命令。

否则 AI 改得越快，风险越大。

`package.json` 建议补这些命令：

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "build": "pnpm typecheck && vite build",
    "check": "pnpm lint && pnpm typecheck && pnpm test"
  }
}
```

然后要求 AI 每次修改后都说明：

```txt
已执行：
- pnpm lint
- pnpm typecheck
- pnpm test

如果没有执行，需要说明原因。
```

---

## 十、Cursor 规则怎么放

如果你使用 Cursor，可以加：

```txt
.cursor/
└── rules/
    ├── project.mdc
    ├── backend.mdc
    ├── frontend.mdc
    └── testing.mdc
```

例如：

```md
---
description: Backend coding rules
globs:
  - "backend/**/*.ts"
alwaysApply: false
---

# Backend Rules

- 使用 NestJS 风格组织代码
- Service 负责业务逻辑
- Controller 只负责入参、出参和鉴权
- Entity 不写业务逻辑
- DTO 必须显式定义字段
- 不允许使用 any
- 新增接口时需要同步补充错误处理
```

---

## 十一、以后怎么向 AI 提需求

不要直接说：

```txt
帮我做一个用户积分系统。
```

这种说法边界太大，AI 容易乱改。

建议这样说：

```md
我要新增“用户积分系统”。

请先不要写代码，先阅读：

- AGENTS.md
- CLAUDE.md
- docs/00-project-overview.md
- docs/01-architecture.md
- docs/03-business-rules.md

然后输出：

1. 你理解的需求
2. 需要新增/修改的文件
3. 数据表设计
4. 接口设计
5. 前端页面影响
6. 风险点
7. 分阶段实现计划

确认方案后，再开始改代码。
```

---

## 十二、推荐落地顺序

### 第 1 阶段：建立项目上下文

先补：

```txt
README.md
AGENTS.md
CLAUDE.md
docs/00-project-overview.md
docs/01-architecture.md
docs/02-code-style.md
```

目标：让 AI 进入项目后不迷路。

---

### 第 2 阶段：沉淀业务规则

再补：

```txt
docs/03-business-rules.md
docs/04-api-design.md
docs/05-database.md
```

目标：减少 AI 乱猜业务。

---

### 第 3 阶段：建立任务模板

再补：

```txt
docs/tasks/feature-template.md
docs/tasks/bugfix-template.md
docs/tasks/refactor-template.md
```

目标：以后所有需求都能按模板输入。

---

### 第 4 阶段：建立自动校验

补齐：

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

目标：AI 改完后可以快速验证。

---

### 第 5 阶段：沉淀架构决策

新增：

```txt
docs/adr/
```

每次重要技术选择写一篇 ADR：

```md
# 0001-use-xxx

## 背景

为什么需要做这个选择。

## 决策

最终选择什么。

## 原因

为什么这样选。

## 影响

带来什么好处和代价。
```

目标：避免以后 AI 不知道历史原因，反复推翻架构。

---

## 十三、最终建议

如果你现在要开始落地，不要一上来写一大堆文档。

先建最小版本：

```txt
README.md
AGENTS.md
CLAUDE.md
docs/
├── 00-project-overview.md
├── 01-architecture.md
├── 02-code-style.md
├── 03-business-rules.md
└── 07-agent-workflow.md
```

然后以后每次新需求都按这个格式：

```md
请按本项目 Agent 开发流程处理这个需求。

需求：

xxx

要求：

1. 先不要直接改代码
2. 先阅读 AGENTS.md、CLAUDE.md 和 docs 目录
3. 复述你理解的需求
4. 列出影响文件
5. 给出实现方案
6. 等我确认后再开始修改
```

这样项目会慢慢变成一个 AI 友好的工程资产。

真正的 Agent 编程，不是让 AI 随便写代码，而是：

> 把项目经验沉淀成 AI 可读取的上下文；
> 把需求拆成 AI 可执行的小任务；
> 把修改结果交给自动化验证；
> 把每次踩坑反向更新成项目规则。
