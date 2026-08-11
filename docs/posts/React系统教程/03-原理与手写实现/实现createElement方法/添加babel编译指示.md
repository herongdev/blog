---
title: "添加babel编译指示"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "围绕“添加babel编译指示”整理的概念、示例与实践笔记。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/实现createElement方法/添加babel编译指示.md"
---
::: v-pre

# 添加babel编译指示

> 本节目标：理解“添加babel编译指示”的核心思路，并能把它用于实际开发或面试表达。
```
_/** @jsx Didact.createElement */_
const element = (
<div id="foo">
<a>bar</a>
<b />
</div>
)
这样babel会使用我们定义的方法Didact.createElement来编译jsx文件
```

:::
