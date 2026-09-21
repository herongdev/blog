---
title: "jsbind 函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“jsbind 函数”整理的概念、示例与实践笔记。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/jsbind 函数.md"
---
::: v-pre

# jsbind 函数

> 本节目标：理解“jsbind 函数”的核心思路，并能把它用于实际开发或面试表达。
```
Function.prototype.myBind = function (context, ...args) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const fn = this;
  return function Fn(...innerArgs) {
    return fn.apply(this instanceof Fn ? this : context, [
      ...args,
      ...innerArgs,
    ]);
  };
};
```

```
在函数Fn的内部，如果this instanceof Fn，表明是使用new 进行调用；
```

:::
