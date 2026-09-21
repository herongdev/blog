---
title: "next()、throw()、return() 的共同点"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“next()、throw()、return() 的共同点”整理的概念、示例与实践笔记。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/next()、throw()、return() 的共同点.md"
---
::: v-pre

# next()、throw()、return() 的共同点

> 本节目标：理解“next()、throw()、return() 的共同点”的核心思路，并能把它用于实际开发或面试表达。
```
next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
next()是将yield表达式替换成一个值。
const g = function* (x, y) {  let result = yield x + y;  return result;};
const gen = g(1, 2);gen.next(); // Object {value: 3, done: false}
gen.next(1); // Object {value: 1, done: true}// 相当于将 let result = yield x + y// 替换成 let result = 1;
上面代码中，第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相当于替换成undefined。
throw()是将yield表达式替换成一个throw语句。
gen.throw(new Error('出错了')); // Uncaught Error: 出错了// 相当于将 let result = yield x + y// 替换成 let result = throw(new Error('出错了'));
return()是将yield表达式替换成一个return语句。
gen.return(2); // Object {value: 2, done: true}// 相当于将 let result = yield x + y// 替换成 let result = return 2;
```

:::
