---
title: "construct()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“construct()”整理的概念、示例与实践笔记。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/construct().md"
---
::: v-pre

# construct()

> 本节目标：理解“construct()”的核心思路，并能把它用于实际开发或面试表达。
```
construct方法用于拦截new命令，下面是拦截对象的写法。
var handler = {  construct (target, args, newTarget) {    return new target(...args);  }};
construct方法可以接受三个参数。
```

```
target：目标对象
```

```
args：构造函数的参数对象
```

```
newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
```

```
var p = new Proxy(function () {}, {  construct: function(target, args) {    console.log('called: ' + args.join(', '));    return { value: args[0] * 10 };  }});
(new p(1)).value// "called: 1"// 10
construct方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function() {}, {  construct: function(target, argumentsList) {    return 1;  }});
new p() // 报错// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
```

:::
