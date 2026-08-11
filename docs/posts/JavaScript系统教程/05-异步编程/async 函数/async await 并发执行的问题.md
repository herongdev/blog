---
title: "async await 并发执行的问题"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "这个也可以实现 , 但是和 Promise.all 是有本质区别的； 注意： for 循环后的同步代码会在 aysn 函数中 await 后面的代码之前执行； \\ 来自。"
sidebarWeight: 49
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/async 函数/async await 并发执行的问题.md"
---
::: v-pre

# async await 并发执行的问题

> 本节目标：理解“async await 并发执行的问题”的核心思路，并能把它用于实际开发或面试表达。
```
for (let i = 0; i < 5; i++) {        (async () => {let res = await sleep({            i:i,        });        console.log(res);})()    }
```
 这个也可以实现`,`但是和 `Promise.all`是有本质区别的；
注意：
`for`循环后的同步代码会在`aysn`函数中`await`后面的代码之前执行；

```
let tasks = [];for (let i = 0; i < 5; i++) {    tasks.push(this.sleep({        i:i,    }));}await Promise.all(tasks);
```
 \> 来自

```
 <https://segmentfault.com/q/1010000013094828>
```

:::
