---
title: "Object构造函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Object构造函数”整理的概念、示例与实践笔记。"
sidebarWeight: 167
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(90M)创建对象/(1m)Object构造函数.md"
---
::: v-pre

# Object构造函数

> 本节目标：理解“Object构造函数”的核心思路，并能把它用于实际开发或面试表达。
```
使用Objcect 构造函数创建实例，然后再为它添加属性和方法；
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function () {
alert(this.name);
};
```

:::
