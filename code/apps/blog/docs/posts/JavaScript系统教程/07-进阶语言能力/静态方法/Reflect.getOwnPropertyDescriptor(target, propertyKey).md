---
title: "Reflect.getOwnPropertyDescriptor(target, propertyKey)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.getOwnPropertyDescriptor(target, propertyKey)”整理的概念、示例与实践笔记。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.getOwnPropertyDescriptor(target, propertyKey).md"
---
::: v-pre

# Reflect.getOwnPropertyDescriptor(target, propertyKey)

> 本节目标：理解“Reflect.getOwnPropertyDescriptor(target, propertyKey)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
var myObject = {};Object.defineProperty(myObject, 'hidden', {  value: true,  enumerable: false,});
// 旧写法var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
// 新写法var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。
```

:::
