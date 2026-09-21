---
title: "Promise.any()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Promise.any()”整理的概念、示例与实践笔记。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise使用/Promise.any().md"
---
::: v-pre

# Promise.any()

> 本节目标：理解“Promise.any()”的核心思路，并能把它用于实际开发或面试表达。
```
Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的[提案](https://github.com/tc39/proposal-promise-any) 。
Promise.any()跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。
const promises = [  fetch('/endpoint-a').then(() => 'a'),  fetch('/endpoint-b').then(() => 'b'),  fetch('/endpoint-c').then(() => 'c'),];try {  const first = await Promise.any(promises);  console.log(first);} catch (error) {  console.log(error);}
上面代码中，Promise.any()方法的参数数组包含三个 Promise 操作。其中只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。如果所有三个操作都变成rejected，那么await命令就会抛出错误。
Promise.any()抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误。下面是 AggregateError 的实现示例。
new AggregateError() extends Array -> AggregateError
const err = new AggregateError();err.push(new Error("first error"));err.push(new Error("second error"));throw err;
捕捉错误时，如果不用try...catch结构和 await 命令，可以像下面这样写。
Promise.any(promises).then(  (first) => {    // Any of the promises was fulfilled.  },  (error) => {    // All of the promises were rejected.  });
下面是一个例子。
var resolved = Promise.resolve(42);var rejected = Promise.reject(-1);var alsoRejected = Promise.reject(Infinity);
Promise.any([resolved, rejected, alsoRejected]).then(function (result) {  console.log(result); // 42});
Promise.any([rejected, alsoRejected]).catch(function (results) {  console.log(results); // [-1, Infinity]});
```

:::
