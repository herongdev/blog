---
title: "Reflect.setPrototypeOf(obj, newProto)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.setPrototypeOf(obj, newProto)”整理的概念、示例与实践笔记。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.setPrototypeOf(obj, newProto).md"
---
::: v-pre

# Reflect.setPrototypeOf(obj, newProto)

> 本节目标：理解“Reflect.setPrototypeOf(obj, newProto)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
const myObj = {};
// 旧写法Object.setPrototypeOf(myObj, Array.prototype);
// 新写法Reflect.setPrototypeOf(myObj, Array.prototype);
myObj.length // 0
如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false。
Reflect.setPrototypeOf({}, null)// trueReflect.setPrototypeOf(Object.freeze({}), null)// false
如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
Object.setPrototypeOf(1, {})// 1
Reflect.setPrototypeOf(1, {})// TypeError: Reflect.setPrototypeOf called on non-object
如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
Object.setPrototypeOf(null, {})// TypeError: Object.setPrototypeOf called on null or undefined
Reflect.setPrototypeOf(null, {})// TypeError: Reflect.setPrototypeOf called on non-object
```

:::
