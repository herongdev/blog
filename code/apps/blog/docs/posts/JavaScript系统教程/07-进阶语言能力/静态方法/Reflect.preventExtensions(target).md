---
title: "Reflect.preventExtensions(target)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.preventExtensions(target)”整理的概念、示例与实践笔记。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.preventExtensions(target).md"
---
::: v-pre

# Reflect.preventExtensions(target)

> 本节目标：理解“Reflect.preventExtensions(target)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
var myObject = {};
// 旧写法Object.preventExtensions(myObject) // Object {}
// 新写法Reflect.preventExtensions(myObject) // true
如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错。
// ES5 环境Object.preventExtensions(1) // 报错
// ES6 环境Object.preventExtensions(1) // 1
// 新写法Reflect.preventExtensions(1) // 报错
```

:::
