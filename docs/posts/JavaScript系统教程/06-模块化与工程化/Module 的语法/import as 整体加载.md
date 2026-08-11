---
title: "import as 整体加载"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "围绕“import as 整体加载”整理的概念、示例与实践笔记。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/import  as 整体加载.md"
---
::: v-pre

# import as 整体加载

> 本节目标：理解“import as 整体加载”的核心思路，并能把它用于实际开发或面试表达。
```
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
下面是一个circle.js文件，它输出两个方法area和circumference。
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

```
现在，加载这个模块。
// main.js
import { area, circumference } from './circle';
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

```
上面写法是逐一指定要加载的方法，整体加载的写法如下。
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

```
**注意：**
模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
import * as circle from './circle';
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () { };
```

:::
