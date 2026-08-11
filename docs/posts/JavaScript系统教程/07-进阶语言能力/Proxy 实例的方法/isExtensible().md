---
title: "isExtensible()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“isExtensible()”整理的概念、示例与实践笔记。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/isExtensible().md"
---
::: v-pre

# isExtensible()

> 本节目标：理解“isExtensible()”的核心思路，并能把它用于实际开发或面试表达。
```
isExtensible方法拦截Object.isExtensible操作。
var p = new Proxy({}, {  isExtensible: function(target) {    console.log("called");    return true;  }});
Object.isExtensible(p)// "called"// true
上面代码设置了isExtensible方法，在调用Object.isExtensible时会输出called。
注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。
这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
Object.isExtensible(proxy) === Object.isExtensible(target)
下面是一个例子。
var p = new Proxy({}, {  isExtensible: function(target) {    return false;  }});
Object.isExtensible(p)// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
```

:::
