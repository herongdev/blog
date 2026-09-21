---
title: "arguments"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "在JavaScript中，arguments是一个内置对象，它代表了当前函数被调用时传递给该函数的所有参数。它是一个类数组对象，可以通过数字索引来访问每个参数，就像访问一个数组中的元素一样。 arguments对象包含以下属性和方法： arguments.length：该属性表示。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(5m)Function类型/arguments.md"
---
::: v-pre

# arguments

> 本节目标：理解“arguments”的核心思路，并能把它用于实际开发或面试表达。
在JavaScript中，arguments是一个内置对象，它代表了当前函数被调用时传递给该函数的所有参数。它是一个类数组对象，可以通过数字索引来访问每个参数，就像访问一个数组中的元素一样。

arguments对象包含以下属性和方法：

arguments.length：该属性表示传递给函数的参数个数。

arguments[index]：该属性返回传递给函数的第index个参数。注意，arguments对象的下标从0开始。

arguments.callee：该属性返回当前正在执行的函数的引用。在严格模式下，该属性被禁用。

arguments.caller：该属性返回调用当前函数的函数的引用。

注意，arguments对象是一个类数组对象，它没有数组的所有方法，如push()和pop()等。但是，可以将arguments对象转换为数组，以便使用数组的方法，如下所示：

javascript
Copy code
function myFunction() \{
var args = Array.prototype.slice.call(arguments);
// 使用数组的方法访问参数
\}
上面的代码使用Array.prototype.slice.call()方法将arguments对象转换为一个数组，然后就可以使用数组的方法来访问参数了。

总之，arguments对象是一个非常有用的内置对象，它可以让你在函数内部访问所有传递给函数的参数。

:::
