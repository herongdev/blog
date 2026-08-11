---
title: "Iterator 接口与 Generator 函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Iterator 接口与 Generator 函数”整理的概念、示例与实践笔记。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Iterator 和 for...of 循环/Iterator 接口与 Generator 函数.md"
---
::: v-pre

# Iterator 接口与 Generator 函数

> 本节目标：理解“Iterator 接口与 Generator 函数”的核心思路，并能把它用于实际开发或面试表达。
```
Symbol.iterator方法的最简单实现，是使用Generator函数。
let myIterable = {  [Symbol.iterator]: function* () {    yield 1;    yield 2;    yield 3;  }}[...myIterable] // [1, 2, 3]
// 或者采用下面的简洁写法
let obj = {  * [Symbol.iterator]() {    yield 'hello';    yield 'world';  }};
for (let x of obj) {  console.log(x);}// "hello"// "world"
```

:::
