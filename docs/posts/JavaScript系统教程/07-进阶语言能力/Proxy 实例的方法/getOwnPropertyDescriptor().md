---
title: "getOwnPropertyDescriptor()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“getOwnPropertyDescriptor()”整理的概念、示例与实践笔记。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/getOwnPropertyDescriptor().md"
---
::: v-pre

# getOwnPropertyDescriptor()

> 本节目标：理解“getOwnPropertyDescriptor()”的核心思路，并能把它用于实际开发或面试表达。
```
getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
var handler = {  getOwnPropertyDescriptor (target, key) {    if (key[0] === '_') {      return;    }    return Object.getOwnPropertyDescriptor(target, key);  }};var target = { _foo: 'bar', baz: 'tar' };var proxy = new Proxy(target, handler);Object.getOwnPropertyDescriptor(proxy, 'wat')// undefinedObject.getOwnPropertyDescriptor(proxy, '_foo')// undefinedObject.getOwnPropertyDescriptor(proxy, 'baz')// { value: 'tar', writable: true, enumerable: true, configurable: true }
上面代码中，handler.getOwnPropertyDescriptor方法对于第一个字符为下划线的属性名会返回undefined。
```

:::
