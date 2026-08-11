---
title: "Reflect.has(obj, name)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.has(obj, name)”整理的概念、示例与实践笔记。"
sidebarWeight: 28
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.has(obj, name).md"
---
::: v-pre

# Reflect.has(obj, name)

> 本节目标：理解“Reflect.has(obj, name)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.has方法对应name in obj里面的in运算符。
var myObject = {  foo: 1,};
// 旧写法'foo' in myObject // true
// 新写法Reflect.has(myObject, 'foo') // true
如果第一个参数不是对象，Reflect.has和in运算符都会报错。
**Reflect.deleteProperty(obj, name)**
Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
const myObj = { foo: 'bar' };
// 旧写法delete myObj.foo;
// 新写法Reflect.deleteProperty(myObj, 'foo');
该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。
**Reflect.construct(target, args)**
Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
function Greeting(name) {  this.name = name;}
// new 的写法const instance = new Greeting('张三');
// Reflect.construct 的写法const instance = Reflect.construct(Greeting, ['张三']);
```

:::
