---
title: "class类中的方法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“class类中的方法”整理的概念、示例与实践笔记。"
sidebarWeight: 157
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(5m)class类中的方法.md"
---
::: v-pre

# class类中的方法

> 本节目标：理解“class类中的方法”的核心思路，并能把它用于实际开发或面试表达。
```
不用function关键字：直接把函数定义放进去了就可以了。
```

```
方法间不用逗号分隔：加了会报错。
```

```
类的内部所有定义的方法不可枚举
```

```
这一点与 ES5 的行为不一致。ES5中自定义的原型属性和方法默认都是可枚举的。
class Point {
    constructor(x, y) {
        // ...
    }
    toString() {
        // ...
    }
}
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
  // ["constructor","toString"]
```

```
**Generator** **方法**
如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
class Foo {  constructor(...args) {    this.args = args;  }  * [Symbol.iterator]() {    for (let arg of this.args) {      yield arg;    }  }}
for (let x of new Foo('hello', 'world')) {  console.log(x);}// hello// world
上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
```

:::
