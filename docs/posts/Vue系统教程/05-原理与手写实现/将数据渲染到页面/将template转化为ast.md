---
title: "将template转化为ast"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "围绕“将template转化为ast”整理的概念、示例与实践笔记。"
sidebarWeight: 69
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/将数据渲染到页面/将template转化为ast.md"
---
::: v-pre

# 将template转化为ast

> 本节目标：理解“将template转化为ast”的核心思路，并能把它用于实际开发或面试表达。
```
template -> ast语法树（用来描述语法的，描述语法本身的） -> 描述成一个树结构 ->  将代码重组成js语法
```

```
模板编译原理
```

```
把template模板编译成render函数-》 虚拟DOM -》 diff算法比对虚拟DOM）
```

```
ast -> render返回 -> vnode -> 生成真实dom
```

```
更新的时候再次调用render -> 新的vnode  -> 新旧比对 -> 更新真实dom
```

:::
