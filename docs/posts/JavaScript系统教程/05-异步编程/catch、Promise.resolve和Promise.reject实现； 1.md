---
title: "catch、Promise.resolve和Promise.reject实现； 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“catch、Promise.resolve和Promise.reject实现； 1”整理的概念、示例与实践笔记。"
sidebarWeight: 61
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/catch、Promise.resolve和Promise.reject实现； 1.md"
---
::: v-pre

# catch、Promise.resolve和Promise.reject实现； 1

> 本节目标：理解“catch、Promise.resolve和Promise.reject实现； 1”的核心思路，并能把它用于实际开发或面试表达。
```
catch(onRejected) {
  return this.then(null, onRejected)
}
```

:::
