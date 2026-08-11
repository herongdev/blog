---
title: "Object.values()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Object.values()”整理的概念、示例与实践笔记。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.values().md"
---
::: v-pre

# Object.values()

> 本节目标：理解“Object.values()”的核心思路，并能把它用于实际开发或面试表达。
```
Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj = { foo: 'bar', baz: 42 };Object.values(obj)// ["bar", 42]
返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。
const obj = { 100: 'a', 2: 'b', 7: 'c' };Object.values(obj)// ["b", "c", "a"]
上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
Object.values只返回对象自身的可遍历属性。
const obj = Object.create({}, {p: {value: 42}});Object.values(obj) // []
上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。
const obj = Object.create({}, {p:  {    value: 42,    enumerable: true  }});Object.values(obj) // [42]
Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });// ['abc']
如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
Object.values('foo')// ['f', 'o', 'o']
上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。
如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
Object.values(42) // []Object.values(true) // []
```

:::
