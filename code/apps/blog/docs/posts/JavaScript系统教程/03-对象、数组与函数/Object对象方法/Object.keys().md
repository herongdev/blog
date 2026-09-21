---
title: "Object.keys()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Object.keys()”整理的概念、示例与实践笔记。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.keys().md"
---
::: v-pre

# Object.keys()

> 本节目标：理解“Object.keys()”的核心思路，并能把它用于实际开发或面试表达。
```
ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };Object.keys(obj)// ["foo", "baz"]
ES2017 [引入](https://github.com/tc39/proposal-object-values-entries)了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
let {keys, values, entries} = Object;let obj = { a: 1, b: 2, c: 3 };
for (let key of keys(obj)) {  console.log(key); // 'a', 'b', 'c'}
for (let value of values(obj)) {  console.log(value); // 1, 2, 3}
for (let [key, value] of entries(obj)) {  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]}
```

:::
