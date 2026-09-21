---
title: "作为对象属性的 Generator 函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“作为对象属性的 Generator 函数”整理的概念、示例与实践笔记。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/作为对象属性的 Generator 函数.md"
---
::: v-pre

# 作为对象属性的 Generator 函数

> 本节目标：理解“作为对象属性的 Generator 函数”的核心思路，并能把它用于实际开发或面试表达。
```
如果一个对象的属性是 Generator 函数，可以简写成下面的形式。
let obj = {  * myGeneratorMethod() {    ···  }};
上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个 Generator 函数。
它的完整形式如下，与上面的写法是等价的。
let obj = {  myGeneratorMethod: function* () {   // ···  }};
```

:::
