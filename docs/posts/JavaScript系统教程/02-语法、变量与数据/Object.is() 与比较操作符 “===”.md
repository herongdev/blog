---
title: "Object.is() 与比较操作符 “===”"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "两等号判等，会在比较时进行类型转换。 三等号判等（判断严格），比较时不进行隐式类型转换，（类型不同则会返回 false ）。 Object.is 在三等号判等的基础上特别处理了 NaN 、 0 和 +0 ，保证 0 和 +0 不再相同，但 Object.is(NaN, NaN)。"
sidebarWeight: 94
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/运算符/Object.is() 与比较操作符 “===”.md"
---
::: v-pre

# Object.is() 与比较操作符 “===”

> 本节目标：理解“Object.is() 与比较操作符 “===””的核心思路，并能把它用于实际开发或面试表达。
==两等号判等，会在比较时进行类型转换。====== ==三等号判等（判断严格），比较时不进行隐式类型转换，（类型不同则会返回====false====）。======
==Object.is== ==在三等号判等的基础上特别处理了== ==NaN== ==、====-0== ==和== ==+0== ==，保证== ==-0== ==和== ==+0== ==不再相同，但== ==Object.is(NaN, NaN)== ==会== ==返回== ==true.======
==Object.is== ==应被认为有其特殊的用途，而不能用它认为它比其它的相等对比更宽松或严格。==

:::
