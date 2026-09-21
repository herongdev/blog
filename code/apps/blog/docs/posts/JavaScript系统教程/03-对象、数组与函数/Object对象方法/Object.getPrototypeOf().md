---
title: "Object.getPrototypeOf()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Object.getPrototypeOf()”整理的概念、示例与实践笔记。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.getPrototypeOf().md"
---
::: v-pre

# Object.getPrototypeOf()

> 本节目标：理解“Object.getPrototypeOf()”的核心思路，并能把它用于实际开发或面试表达。
```
该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
Object.getPrototypeOf(obj);
下面是一个例子。
function Rectangle() {  // ...}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype// true
Object.setPrototypeOf(rec, Object.prototype);Object.getPrototypeOf(rec) === Rectangle.prototype// false
如果参数不是对象，会被自动转为对象。
// 等同于 Object.getPrototypeOf(Number(1))Object.getPrototypeOf(1)// Number {[[PrimitiveValue]]: 0}
// 等同于 Object.getPrototypeOf(String('foo'))Object.getPrototypeOf('foo')// String {length: 0, [[PrimitiveValue]]: ""}
// 等同于 Object.getPrototypeOf(Boolean(true))Object.getPrototypeOf(true)// Boolean {[[PrimitiveValue]]: false}
Object.getPrototypeOf(1) === Number.prototype // trueObject.getPrototypeOf('foo') === String.prototype // trueObject.getPrototypeOf(true) === Boolean.prototype // true
如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)// TypeError: Cannot convert undefined or null to object
Object.getPrototypeOf(undefined)// TypeError: Cannot convert undefined or null to object
```

:::
