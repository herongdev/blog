---
title: "与 Iterator 接口的关系"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“与 Iterator 接口的关系”整理的概念、示例与实践笔记。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/与 Iterator 接口的关系.md"
---
::: v-pre

# 与 Iterator 接口的关系

> 本节目标：理解“与 Iterator 接口的关系”的核心思路，并能把它用于实际开发或面试表达。
```
任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
var myIterable = {};myIterable[Symbol.iterator] = function* () {  yield 1;  yield 2;  yield 3;};
[...myIterable] // [1, 2, 3]
上面代码中，Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。
Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
function* gen(){  // some code}
var g = gen();
g[Symbol.iterator]() === g// true
```

:::
