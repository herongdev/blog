---
title: "ES6 的支持"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "Node.js 是 JavaScript 的服务器运行环境（runtime）。它对 ES6 的支持度更高。除了那些默认打开的功能，还有一些语法功能已经实现了，但是默认没有打开。使用下面的命令，可以查看 Node.js 默认没有打开的 ES6 实验性语法。 // Linux & M。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/历史与版本/ES6 的支持.md"
---
::: v-pre

# ES6 的支持

> 本节目标：理解“ES6 的支持”的核心思路，并能把它用于实际开发或面试表达。
```
目前，各大浏览器对 ES6 的支持可以查看[kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)。
```

Node.js 是 JavaScript 的服务器运行环境（runtime）。它对 ES6 的支持度更高。除了那些默认打开的功能，还有一些语法功能已经实现了，但是默认没有打开。使用下面的命令，可以查看 Node.js 默认没有打开的 ES6 实验性语法。
// Linux & Mac$ node --v8-options | grep harmony
// Windows$ node --v8-options | findstr harmony

:::
