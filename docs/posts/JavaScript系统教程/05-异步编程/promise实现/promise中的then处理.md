---
title: "promise中的then处理"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "取一个对象的值也可能会出错，因为属性如果是通过definedPropoty定义的，在getter中抛出了错误；还有可能第一次取不出错，第二次取再报错。"
sidebarWeight: 76
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/promise中的then处理.md"
---
::: v-pre

# promise中的then处理

> 本节目标：理解“promise中的then处理”的核心思路，并能把它用于实际开发或面试表达。
取一个对象的值也可能会出错，因为属性如果是通过definedPropoty定义的，在getter中抛出了错误；还有可能第一次取不出错，第二次取再报错；

:::
