---
title: "RegExp的实例属性"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "global ： 布尔值，表示是否设置了g标志 ignoreCase: 布尔值，表示是否设置了i标志 multiline: 布尔值，表示是否设置了m标志 lastIndex: 整数，表示开始搜索一下个匹配项的字符位置，从0算起。 source: 正则表达式的字符串表示，按照字面量。"
sidebarWeight: 109
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-正则/RegExp类型/RegExp的实例属性.md"
---
::: v-pre

# RegExp的实例属性

> 本节目标：理解“RegExp的实例属性”的核心思路，并能把它用于实际开发或面试表达。
**global****：**布尔值，表示是否设置了g标志
**ignoreCase:**布尔值，表示是否设置了i标志
**multiline:**布尔值，表示是否设置了m标志
**lastIndex:**整数，表示开始搜索一下个匹配项的字符位置，从0算起。
**source:**正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

通过这些属性可以获一个正则表达式各方面信息，但却没有多大用处，因为这些信息全部包含在模式声明中，一目了然。

:::
