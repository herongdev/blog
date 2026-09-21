---
title: "Symbol.prototype.description"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "围绕“Symbol.prototype.description”整理的概念、示例与实践笔记。"
sidebarWeight: 63
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/Symbol 类型/Symbol.prototype.description.md"
---
::: v-pre

# Symbol.prototype.description

> 本节目标：理解“Symbol.prototype.description”的核心思路，并能把它用于实际开发或面试表达。
```
创建 Symbol 的时候，可以添加一个描述。
const sym = Symbol('foo');
上面代码中，sym的描述就是字符串foo。
但之前读取Symbol的描述要显式转为字符串：
const sym = Symbol('foo');
String(sym) // "Symbol(foo)"sym.toString() // "Symbol(foo)"
[ES2019](https://github.com/tc39/proposal-Symbol-description) 提供了一个实例属性description，直接返回Symbol的描述。
const sym = Symbol('foo');
sym.description // "foo"
```

:::
