---
title: "Object.setPrototypeOf()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Object.setPrototypeOf()”整理的概念、示例与实践笔记。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.setPrototypeOf().md"
---
::: v-pre

# Object.setPrototypeOf()

> 本节目标：理解“Object.setPrototypeOf()”的核心思路，并能把它用于实际开发或面试表达。
```
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
// 格式Object.setPrototypeOf(object, prototype)
// 用法const o = Object.setPrototypeOf({}, null);
该方法等同于下面的函数。
function setPrototypeOf(obj, proto) {  obj.__proto__ = proto;  return obj;}
下面是一个例子。
let proto = {};let obj = { x: 10 };Object.setPrototypeOf(obj, proto);
proto.y = 20;proto.z = 40;
obj.x // 10obj.y // 20obj.z // 40
上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。
如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
Object.setPrototypeOf(1, {}) === 1 // trueObject.setPrototypeOf('foo', {}) === 'foo' // trueObject.setPrototypeOf(true, {}) === true // true
由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})// TypeError: Object.setPrototypeOf called on null or undefined
```

:::
