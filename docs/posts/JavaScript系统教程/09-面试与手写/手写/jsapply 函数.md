---
title: "jsapply 函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“jsapply 函数”整理的概念、示例与实践笔记。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/jsapply 函数.md"
---
::: v-pre

# jsapply 函数

> 本节目标：理解“jsapply 函数”的核心思路，并能把它用于实际开发或面试表达。
```
Function.prototype.myApply = function (context, args) {
  // 即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
  // 不是函数将无法使用()调用
  if (typeof this !== 'function') {
    console.error('type error');
  }
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  args = Array.isArray(args) ? args : [];
  // 调用函数
  const result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```

:::
