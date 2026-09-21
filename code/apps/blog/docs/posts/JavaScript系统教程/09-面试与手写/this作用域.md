---
title: "this作用域"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“this作用域”整理的概念、示例与实践笔记。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试题/this作用域.md"
---
::: v-pre

# this作用域

> 本节目标：理解“this作用域”的核心思路，并能把它用于实际开发或面试表达。
```
var myObject = {
foo: 'bar',
func: function () {
var self = this;
console.log(this.foo);
console.log(self.foo);
(function () {
console.log(this.foo);
console.log(self.foo);
})();
}
}
myObject.func();
```

:::
