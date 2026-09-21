---
title: "Generator 与状态机"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Generator 与状态机”整理的概念、示例与实践笔记。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator 与状态机/Generator 与状态机.md"
---
::: v-pre

# Generator 与状态机

> 本节目标：理解“Generator 与状态机”的核心思路，并能把它用于实际开发或面试表达。
```
Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。
var ticking = true;var clock = function() {  if (ticking)    console.log('Tick!');  else    console.log('Tock!');  ticking = !ticking;}
上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。这个函数如果用 Generator 实现，就是下面这样。
var clock = function* () {  while (true) {    console.log('Tick!');    yield;    console.log('Tock!');    yield;  }};
上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。
```

:::
