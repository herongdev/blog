---
title: "getPrototypeOf()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/getPrototypeOf().md"
---
::: v-pre

# getPrototypeOf()

> 本节目标：理解“getPrototypeOf()”的核心思路，并能把它用于实际开发或面试表达。
getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

```
Object.prototype.__proto__
```

```
Object.prototype.isPrototypeOf()
```

```
Object.getPrototypeOf()
```

```
Reflect.getPrototypeOf()
```

```
instanceof
```

```
下面是一个例子。
var proto = {};var p = new Proxy({}, {  getPrototypeOf(target) {    return proto;  }});Object.getPrototypeOf(p) === proto // true
上面代码中，getPrototypeOf方法拦截Object.getPrototypeOf()，返回proto对象。
注意，getPrototypeOf方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象。
```

:::
