---
title: "jsnew 操作符"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“jsnew 操作符”整理的概念、示例与实践笔记。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/jsnew 操作符.md"
---
::: v-pre

# jsnew 操作符

> 本节目标：理解“jsnew 操作符”的核心思路，并能把它用于实际开发或面试表达。
```
在调用 ==new== 的过程中会发生以上四件事情：
（1）首先创建了一个新的空对象；
（2）设置原型，将对象的原型设置为函数的 prototype 对象；
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）；
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
function myNew(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('myNew的首参数必须是函数');
  }
  const context = Object.create(ctor.prototype);
  const result = ctor.apply(context, args);
  return typeof result === 'object' || typeof result === 'object'
    ? result
    : context;
}
```

:::
