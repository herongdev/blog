---
title: "当resolve值为promise时 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "当resolve值为promise时，表示我们的成功值中有异步操作，这时，我们必须等待异步有结果，状态凝固后，才能触发之后通过.then添加的回调函数； 但如果reject的值为一个promise时，表示已经状态凝固，并且出错，我们不再等待一个出错的promise的结果。"
sidebarWeight: 88
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/当resolve值为promise时 1.md"
---
::: v-pre

# 当resolve值为promise时 1

> 本节目标：理解“当resolve值为promise时 1”的核心思路，并能把它用于实际开发或面试表达。
当resolve值为promise时，表示我们的成功值中有异步操作，这时，我们必须等待异步有结果，状态凝固后，才能触发之后通过.then添加的回调函数；

但如果reject的值为一个promise时，表示已经状态凝固，并且出错，我们不再等待一个出错的promise的结果；

:::
