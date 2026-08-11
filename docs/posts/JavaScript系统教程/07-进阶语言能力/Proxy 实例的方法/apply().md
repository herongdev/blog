---
title: "apply()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“apply()”整理的概念、示例与实践笔记。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/apply().md"
---
::: v-pre

# apply()

> 本节目标：理解“apply()”的核心思路，并能把它用于实际开发或面试表达。
```
apply方法拦截函数的调用，call和apply操作。
apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
var handler = {  apply (target, ctx, args) {    return Reflect.apply(...arguments);  }};
下面是一个例子。
var target = function () { return 'I am the target'; };var handler = {  apply: function () {    return 'I am the proxy';  }};
var p = new Proxy(target, handler);
p()// "I am the proxy"
上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
```

```
下面是另外一个例子。
var twice = {  apply (target, ctx, args) {    return Reflect.apply(...arguments) * 2;  }};function sum (left, right) {  return left + right;};var proxy = new Proxy(sum, twice);proxy(1, 2) // 6proxy.call(null, 5, 6) // 22proxy.apply(null, [7, 8]) // 30
上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
```

```
另外，直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxy, null, [9, 10]) // 38
```

:::
