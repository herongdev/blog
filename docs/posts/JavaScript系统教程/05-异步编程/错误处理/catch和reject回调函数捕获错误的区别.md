---
title: "catch和reject回调函数捕获错误的区别"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "一、then成功回调中拋出的错误，在同一个then方法的失败回调中捕获不到，而catch方法可以捕获到。 二、在then的错误回调和catch方法都存在的情况下，只有错误回调能捕获到，如果错误回调不存在，则catch方法会捕获到。"
sidebarWeight: 124
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/错误处理/catch和reject回调函数捕获错误的区别.md"
---
::: v-pre

# catch和reject回调函数捕获错误的区别

> 本节目标：理解“catch和reject回调函数捕获错误的区别”的核心思路，并能把它用于实际开发或面试表达。
一、then成功回调中拋出的错误，在同一个then方法的失败回调中捕获不到，而catch方法可以捕获到。
二、在then的错误回调和catch方法都存在的情况下，只有错误回调能捕获到，如果错误回调不存在，则catch方法会捕获到。

```
类似于错误会先经过then的错误回调，再经过catch函数；
```

```
另外，错误一旦被捕获，就不再向外抛出；
```

:::
