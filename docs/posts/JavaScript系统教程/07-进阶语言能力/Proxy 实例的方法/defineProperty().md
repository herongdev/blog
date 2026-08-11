---
title: "defineProperty()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“defineProperty()”整理的概念、示例与实践笔记。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/defineProperty().md"
---
::: v-pre

# defineProperty()

> 本节目标：理解“defineProperty()”的核心思路，并能把它用于实际开发或面试表达。
```
defineProperty方法拦截了Object.defineProperty操作。
var handler = {  defineProperty (target, key, descriptor) {    return false;  }};var target = {};var proxy = new Proxy(target, handler);proxy.foo = 'bar' // 不会生效
上面代码中，defineProperty方法返回false，导致添加新属性总是无效。
注意，如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。
```

:::
