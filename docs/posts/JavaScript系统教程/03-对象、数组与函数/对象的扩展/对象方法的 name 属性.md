---
title: "对象方法的 name 属性"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“对象方法的 name 属性”整理的概念、示例与实践笔记。"
sidebarWeight: 59
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/对象的扩展/对象方法的 name 属性.md"
---
::: v-pre

# 对象方法的 name 属性

> 本节目标：理解“对象方法的 name 属性”的核心思路，并能把它用于实际开发或面试表达。
```
函数的name属性，返回函数名。
对象方法也是函数，因此也有name属性。
const person = {  sayName() {    console.log('hello!');  },};
person.sayName.name   // "sayName"
```

```
如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {  get foo() {},  set foo(x) {}};
obj.foo.name// TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"descriptor.set.name // "set foo"
```

```
**特殊情况**
```

```
bind方法创造的函数，name属性返回bound加上原函数的名字；
```

```
Function构造函数创造的函数，name属性返回anonymous。
```

```
(new Function()).name // "anonymous"
var doSomething = function() {  // ...};doSomething.bind().name // "bound doSomething"
```

```
**Symbo****l****方法名**
如果对象的方法是一个Symbol值，那么name属性返回的是这个Symbol值的描述。
const key1 = Symbol('description');const key2 = Symbol();let obj = {  [key1]() {},  [key2]() {},};obj[key1].name // "[description]"obj[key2].name // ""
上面代码中，key1对应的 Symbol 值有描述，key2没有。
```

:::
