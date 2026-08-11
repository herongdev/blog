---
title: "Reflect.ownKeys (target)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.ownKeys (target)”整理的概念、示例与实践笔记。"
sidebarWeight: 30
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.ownKeys (target).md"
---
::: v-pre

# Reflect.ownKeys (target)

> 本节目标：理解“Reflect.ownKeys (target)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
var myObject = {  foo: 1,  bar: 2,  [Symbol.for('baz')]: 3,  [Symbol.for('bing')]: 4,};
// 旧写法Object.getOwnPropertyNames(myObject)// ['foo', 'bar']
Object.getOwnPropertySymbols(myObject)//[Symbol(baz), Symbol(bing)]
// 新写法Reflect.ownKeys(myObject)// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

:::
