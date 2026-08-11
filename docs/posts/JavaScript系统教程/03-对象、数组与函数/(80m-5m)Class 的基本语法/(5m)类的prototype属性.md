---
title: "类的prototype属性"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“类的prototype属性”整理的概念、示例与实践笔记。"
sidebarWeight: 161
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(5m)类的prototype属性.md"
---
::: v-pre

# 类的prototype属性

> 本节目标：理解“类的prototype属性”的核心思路，并能把它用于实际开发或面试表达。
```
类也有prototype属性，指向原型对象。
```

```
事实上，类的所有方法都定义在类的prototype属性上面。
```

```
class Point {
    constructor() {
      // ...
    }
  toString() {
      // ...
    }
  toValue() {
      // ...
    }
  }
  // 等同于
  Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
  };
在类的实例上面调用方法，其实就是调用原型上的方法。
class B {}let b = new B();
b.constructor === B.prototype.constructor // true
上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。
```

```
**可操作类的原型对象**
由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
Object.assign方法可以很方便地一次向类添加多个方法。
class Point {  constructor(){    // ...  }}
Object.assign(Point.prototype, {  toString(){},  toValue(){}});
```

:::
