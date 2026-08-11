---
title: "js类型判断函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“js类型判断函数”整理的概念、示例与实践笔记。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js类型判断函数.md"
---
::: v-pre

# js类型判断函数

> 本节目标：理解“js类型判断函数”的核心思路，并能把它用于实际开发或面试表达。
```
function isType(typeName, val) {
  return Object.prototype.toString.call(val) === `[object ${typeName}]`;
}
function curring(fn) {
  // 存储每次调用的时候传入的变量
  // 存储每次调用时传入的参数
  const inner = (args = []) => {
    return args.length >= fn.length
      ? fn(...args)
      : (...userArgs) => inner([...args, ...userArgs]);
  };
  return inner();
}
// 柯里化:让函数变得更具体一些;反柯里化:让函数范围变的更大一些
let util = {};
[
  'Null',
  'Undefined',
  'Boolean',
  'Number',
  'String',
  'BigInt',
  'Symbol',
  'Function',
  'Object',
].forEach((typeName) => {
  util['is' + typeName] = curring(isType)(typeName);
});
```

:::
