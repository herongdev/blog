---
title: "Promise.finally"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "不会采用回调中成功promise的结果，但如果其中返回的promise出错，会传递到后面的.catch中； then方法会等待参数函数执行完（如果是promise），再执行； Promise.resolve会等待参数promise执行完； 上层失败，会把失败传到后面的.catch。"
sidebarWeight: 74
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/Promise.finally.md"
---
::: v-pre

# Promise.finally

> 本节目标：理解“Promise.finally”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
不会采用回调中成功promise的结果，但如果其中返回的promise出错，会传递到后面的.catch中；

```
在成功和失败的回调中各调用一次；
```

```
增加方法一般优先在原有方法上拓展；
```

then方法会等待参数函数执行完（如果是promise），再执行；
Promise.resolve会等待参数promise执行完；

上层失败，会把失败传到后面的.catch
自身参数失败，也会把失败传到后面的.catch

```
实现promise.allSettled
```

:::
