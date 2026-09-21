---
title: "preventExtensions()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“preventExtensions()”整理的概念、示例与实践笔记。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/preventExtensions().md"
---
::: v-pre

# preventExtensions()

> 本节目标：理解“preventExtensions()”的核心思路，并能把它用于实际开发或面试表达。
```
preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
var proxy = new Proxy({}, {  preventExtensions: function(target) {    return true;  }});
Object.preventExtensions(proxy)// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
上面代码中，proxy.preventExtensions方法返回true，但这时Object.isExtensible(proxy)会返回true，因此报错。
为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。
var proxy = new Proxy({}, {  preventExtensions: function(target) {    console.log('called');    Object.preventExtensions(target);    return true;  }});
Object.preventExtensions(proxy)// "called"// Proxy {}
```

:::
