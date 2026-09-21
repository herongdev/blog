---
title: "setPrototypeOf()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“setPrototypeOf()”整理的概念、示例与实践笔记。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/setPrototypeOf().md"
---
::: v-pre

# setPrototypeOf()

> 本节目标：理解“setPrototypeOf()”的核心思路，并能把它用于实际开发或面试表达。
```
setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。
下面是一个例子。
var handler = {  setPrototypeOf (target, proto) {    throw new Error('Changing the prototype is forbidden');  }};var proto = {};var target = function () {};var proxy = new Proxy(target, handler);Object.setPrototypeOf(proxy, proto);// Error: Changing the prototype is forbidden
上面代码中，只要修改target的原型对象，就会报错。
注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf方法不得改变目标对象的原型。
```

:::
