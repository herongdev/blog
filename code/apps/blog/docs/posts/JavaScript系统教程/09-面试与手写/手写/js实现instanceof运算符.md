---
title: "js实现instanceof运算符"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“js实现instanceof运算符”整理的概念、示例与实践笔记。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js实现instanceof运算符.md"
---
::: v-pre

# js实现instanceof运算符

> 本节目标：理解“js实现instanceof运算符”的核心思路，并能把它用于实际开发或面试表达。
```
instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
```

```
具体实现：
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype;
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

```
function isInstanceOf(instance: object, constructor) {
  let prototype = Object.getPrototypeOf(instance);
  while (prototype) {
    if (prototype === constructor.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}
```

:::
