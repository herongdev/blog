---
title: "then的值穿透"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "如果then方法的成功回调和失败回调没有传入，我们给它两个默认值： 成功回调就直接把之前成功的结果返回就行； 失败回调就直接把之前失败的原因当错误抛出；不能返回一错误值，因为返回值会被当成成功的值，传递给下一下then的成功回调。"
sidebarWeight: 82
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/then的值穿透.md"
---
::: v-pre

# then的值穿透

> 本节目标：理解“then的值穿透”的核心思路，并能把它用于实际开发或面试表达。
如果then方法的成功回调和失败回调没有传入，我们给它两个默认值：

- 成功回调就直接把之前成功的结果返回就行；
- 失败回调就直接把之前失败的原因当错误抛出；不能返回一错误值，因为返回值会被当成成功的值，传递给下一下then的成功回调；

```
onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
```

:::
