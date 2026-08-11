---
title: "Reflect.apply(func, thisArg, args)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.apply(func, thisArg, args)”整理的概念、示例与实践笔记。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.apply(func, thisArg, args).md"
---
::: v-pre

# Reflect.apply(func, thisArg, args)

> 本节目标：理解“Reflect.apply(func, thisArg, args)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
const ages = [11, 33, 12, 54, 18, 96];
// 旧写法const youngest = Math.min.apply(Math, ages);const oldest = Math.max.apply(Math, ages);const type = Object.prototype.toString.call(youngest);
// 新写法const youngest = Reflect.apply(Math.min, Math, ages);const oldest = Reflect.apply(Math.max, Math, ages);const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

:::
