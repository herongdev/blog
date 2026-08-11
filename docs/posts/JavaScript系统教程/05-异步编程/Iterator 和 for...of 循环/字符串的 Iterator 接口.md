---
title: "字符串的 Iterator 接口"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“字符串的 Iterator 接口”整理的概念、示例与实践笔记。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Iterator 和 for...of 循环/字符串的 Iterator 接口.md"
---
::: v-pre

# 字符串的 Iterator 接口

> 本节目标：理解“字符串的 Iterator 接口”的核心思路，并能把它用于实际开发或面试表达。
```
字符串是一个类似数组的对象，也原生具有 Iterator 接口。
var someString = "hi";typeof someString[Symbol.iterator]// "function"
var iterator = someString[Symbol.iterator]();
iterator.next()  // { value: "h", done: false }iterator.next()  // { value: "i", done: false }iterator.next()  // { value: undefined, done: true }
上面代码中，调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。
```

:::
