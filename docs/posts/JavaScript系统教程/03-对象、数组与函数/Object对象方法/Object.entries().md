---
title: "Object.entries()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Object.entries()”整理的概念、示例与实践笔记。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.entries().md"
---
::: v-pre

# Object.entries()

> 本节目标：理解“Object.entries()”的核心思路，并能把它用于实际开发或面试表达。
```
Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };Object.entries(obj)// [ ["foo", "bar"], ["baz", 42] ]
除了返回值不一样，该方法的行为与Object.values基本一致。
如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
Object.entries({ [Symbol()]: 123, foo: 'abc' });// [ [ 'foo', 'abc' ] ]
上面代码中，原对象有两个属性，Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。
Object.entries的基本用途是遍历对象的属性。
let obj = { one: 1, two: 2 };for (let [k, v] of Object.entries(obj)) {  console.log(    `${JSON.stringify(k)}: ${JSON.stringify(v)}`  );}// "one": 1// "two": 2
Object.entries方法的另一个用处是，将对象转为真正的Map结构。
const obj = { foo: 'bar', baz: 42 };const map = new Map(Object.entries(obj));map // Map { foo: "bar", baz: 42 }
自己实现Object.entries方法，非常简单。
// Generator函数的版本function* entries(obj) {  for (let key of Object.keys(obj)) {    yield [key, obj[key]];  }}
// 非Generator函数的版本function entries(obj) {  let arr = [];  for (let key of Object.keys(obj)) {    arr.push([key, obj[key]]);  }  return arr;}
```

:::
