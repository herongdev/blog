---
title: "Reflect.getPrototypeOf(obj)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.getPrototypeOf(obj)”整理的概念、示例与实践笔记。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.getPrototypeOf(obj).md"
---
::: v-pre

# Reflect.getPrototypeOf(obj)

> 本节目标：理解“Reflect.getPrototypeOf(obj)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
const myObj = new FancyThing();
// 旧写法Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。
Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}Reflect.getPrototypeOf(1) // 报错
```

:::
