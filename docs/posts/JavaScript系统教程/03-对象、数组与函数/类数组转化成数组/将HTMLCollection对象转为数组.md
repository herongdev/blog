---
title: "将HTMLCollection对象转为数组"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "通过 document.getElementsByTagName('li') 获取到的 dom 元素 list 是个伪数组 htmlCollection ，无法直接使用数组的 forEach 等方法，可用下面一些方法转换： 1 、 ES5 转真数组： 、隐式迭代并创建一个新的数组。"
sidebarWeight: 102
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-数组/类数组转化成数组/将HTMLCollection对象转为数组.md"
---
::: v-pre

# 将HTMLCollection对象转为数组

> 本节目标：理解“将HTMLCollection对象转为数组”的核心思路，并能把它用于实际开发或面试表达。
通过`document.getElementsByTagName('li')`获取到的`dom`元素`list`是个伪数组`htmlCollection` ，无法直接使用数组的`forEach`等方法，可用下面一些方法转换：
`1`、`ES5`转真数组：

```
letarr =Array.prototype.slice.call(htmlCollection )
2
```

、隐式迭代并创建一个新的数组对象，这会消耗额外的资源
`let arr = [].slice.call(htmlCollection);`
这适用于所有浏览器，包括早期的 `IE` 版本。

```
letarr =[];[].push.apply(arr,htmlCollection);
3
```

、
`ES6`方法，还有`Array.from` ：

```
letarr =Array.from(htmlCollection);
ECMAScript 2015
```

还提供了扩展运算符，它在功能上等同于`Array.from`
（但请注意， `Array.from`支持映射函数作为第二个参数）。
`let arr = [...htmlCollection];`
对于 `IE7` 及更早版本等旧浏览器，您只需使用兼容功能，例如：

```
functiontoArray(x){for(leti =0,a =[];i <x.length;i++)a.push(x[i]);returna}
```
 \> 来自

```
 <https://www.jianshu.com/p/c0822d0c3dee>
```

:::
