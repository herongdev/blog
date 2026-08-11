---
title: "Promise.reject()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Promise.reject()”整理的概念、示例与实践笔记。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise使用/Promise.reject().md"
---
::: v-pre

# Promise.reject()

> 本节目标：理解“Promise.reject()”的核心思路，并能把它用于实际开发或面试表达。
```
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');// 等同于const p = new Promise((resolve, reject) => reject('出错了'))
p.then(null, function (s) {  console.log(s)});// 出错了
上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。
注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。
const thenable = {  then(resolve, reject) {    reject('出错了');  }};
Promise.reject(thenable).catch(e => {  console.log(e === thenable)})// true
上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。
```

:::
