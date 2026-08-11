---
title: "(80m-5m)Class 的基本语法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“(80m-5m)Class 的基本语法”整理的概念、示例与实践笔记。"
sidebarWeight: 163
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(80m-5m)Class 的基本语法.md"
---
::: v-pre

# (80m-5m)Class 的基本语法

> 本节目标：理解“(80m-5m)Class 的基本语法”的核心思路，并能把它用于实际开发或面试表达。
```
**class****定义类**
```

```
基本上，class只是一个语法糖，它的绝大部分功能，ES5 都可以做到；
```

```
只是让对象原型的写法更加清晰、更像传统面向对象编程的语法而已。
```

```
如:
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
```

```
**总结**
```

```
ES6 的类，完全可以看作构造函数的另一种写法;
```

```
class类的数据类型就是函数;
```

```
类本身就指向构造函数。
```

```
class Point {  // ...}
typeof Point // "function"Point === Point.prototype.constructor // true
上面代码表明，
```

:::
