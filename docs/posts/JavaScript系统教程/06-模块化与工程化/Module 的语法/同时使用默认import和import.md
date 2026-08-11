---
title: "同时使用默认import和import"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "围绕“同时使用默认import和import”整理的概念、示例与实践笔记。"
sidebarWeight: 30
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/同时使用默认import和import.md"
---
::: v-pre

# 同时使用默认import和import

> 本节目标：理解“同时使用默认import和import”的核心思路，并能把它用于实际开发或面试表达。
```
如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。
import _, { each, forEach } from 'lodash';
```

```
对应上面代码的export语句如下。
export default function (obj) { // ···}
export function each(obj, iterator, context) { // ···}
export { each as forEach };
上面代码的最后一行的意思是，暴露出forEach接口，默认指向each接口，即forEach和each指向同一个方法。
```

:::
