---
title: "Proxy"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截； 用途 因此提供了一种机制，可以对外界的访问进行过滤和改写。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy/Proxy.md"
---
::: v-pre

# Proxy

> 本节目标：理解“Proxy”的核心思路，并能把它用于实际开发或面试表达。
```
**是什么**
```

在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截；

```
属于一种“元编程”（meta programming），即对编程语言进行编程。
```

**用途**
因此提供了一种机制，可以对外界的访问进行过滤和改写。

:::
