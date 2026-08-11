---
title: "Array(100).map(x = 1)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "Array(100) 将会创建一个稀疏数组 (sparse array)，即不存在真实元素，节省内存空间。在控制台上显示为 [empty] // [empty × 100]Array(100) 正因为没有元素，所以它也不会有 map 操作，所以 Array(100).map(x。"
sidebarWeight: 82
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-数组/Array(100).map(x = 1).md"
---
::: v-pre

# Array(100).map(x = 1)

> 本节目标：理解“Array(100).map(x = 1)”的核心思路，并能把它用于实际开发或面试表达。
Array(100) 将会创建一个稀疏数组 (sparse array)，即不存在真实元素，节省内存空间。在控制台上显示为 [empty]
// [empty × 100]Array(100)
正因为没有元素，所以它也不会有 map 操作，所以 Array(100).map(x =\> 1) 仍然返回为 [empty]
那如何生成100个元素为1的数组呢？
可以使用 Array.from
Array.from(Array(100),x=\>1)

```
而在 ES5 中借用 apply
Array.apply(null,Array(100)).map(x=>1)
```

```
根据楼下提示，再添加一个 fill
Array(100).fill(1)
```
 \> 来自

```
 <https://github.com/shfshanyue/Daily-Question/issues/170>
```

:::
