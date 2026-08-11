---
title: "js函数柯里化的实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“js函数柯里化的实现”整理的概念、示例与实践笔记。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js函数柯里化的实现.md"
---
::: v-pre

# js函数柯里化的实现

> 本节目标：理解“js函数柯里化的实现”的核心思路，并能把它用于实际开发或面试表达。
```
function curring(fn) {
  // 存储每次调用的时候传入的变量
  // 存储每次调用时传入的参数
  const inner = (args = []) => {
    return args.length >= fn.length
      ? fn(...args)
      : (...userArgs) => inner([...args, ...userArgs]);
  };
  return inner();
}
```

:::
