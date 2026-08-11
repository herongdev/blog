---
title: "Reflect.isExtensible (target)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.isExtensible (target)”整理的概念、示例与实践笔记。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.isExtensible (target).md"
---
::: v-pre

# Reflect.isExtensible (target)

> 本节目标：理解“Reflect.isExtensible (target)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
const myObject = {};
// 旧写法Object.isExtensible(myObject) // true
// 新写法Reflect.isExtensible(myObject) // true
如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
Object.isExtensible(1) // falseReflect.isExtensible(1) // 报错
```

:::
