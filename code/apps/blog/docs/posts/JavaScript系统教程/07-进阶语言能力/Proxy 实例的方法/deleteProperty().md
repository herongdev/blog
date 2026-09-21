---
title: "deleteProperty()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“deleteProperty()”整理的概念、示例与实践笔记。"
sidebarWeight: 8
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/deleteProperty().md"
---
::: v-pre

# deleteProperty()

> 本节目标：理解“deleteProperty()”的核心思路，并能把它用于实际开发或面试表达。
```
deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {  deleteProperty (target, key) {    invariant(key, 'delete');    delete target[key];    return true;  }};function invariant (key, action) {  if (key[0] === '_') {    throw new Error(`Invalid attempt to ${action} private "${key}" property`);  }}
var target = { _prop: 'foo' };var proxy = new Proxy(target, handler);delete proxy._prop// Error: Invalid attempt to delete private "_prop" property
上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
```

:::
