---
title: "js深拷贝"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js深拷贝.md"
---
::: v-pre

# js深拷贝

> 本节目标：理解“js深拷贝”的核心思路，并能把它用于实际开发或面试表达。
深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。

```
**JSON.stringify()**
==JSON.parse(JSON.stringify(obj))==是目前比较常用的深拷贝方法之一，它的原理就是利用==JSON.stringify== 将==js==对象序列化（JSON字符串），再使用==JSON.parse==来反序列化(还原)==js==对象。
这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，当使用过==JSON.stringify()==进行处理之后，都会消失。
let obj1 = {
  a: 0,
  b: {
    c: 0,
  },
};
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 1;
console.log(obj1); // {a: 1, b: {c: 1}}
console.log(obj2); // {a: 0, b: {c: 0}}
```

```
**lodash****的****_.cloneDeep**
var _ = require('lodash');
var obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f); // false
**手写实现**
function deepCopy(object) {
  if (!object || typeof object !== 'object') return;
  let newObject = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] =
        typeof object[key] === 'object' ? deepCopy(object[key]) : object[key];
    }
  }
  return newObject;
}
```

:::
