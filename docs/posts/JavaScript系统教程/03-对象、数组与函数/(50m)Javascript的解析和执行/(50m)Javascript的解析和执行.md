---
title: "Javascript的解析和执行"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "执行过程 解析代码 \\ 变量提升 \\ 创建执行上下文 \\ 执行代码 当执行到一个函数的时候，就会重复上面解析执行的过程。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(50m)Javascript的解析和执行/(50m)Javascript的解析和执行.md"
---
::: v-pre

# Javascript的解析和执行

> 本节目标：理解“Javascript的解析和执行”的核心思路，并能把它用于实际开发或面试表达。
```
**描述型脚本语言**
```

```
不需要编译成中间语言；
```

```
由JS引擎边解析边执行。
```

```
如：
test(); // this is a function!
function test() {
    console.log("this is a function!");
}
```

**执行过程**
解析代码-\>变量提升-\>创建执行上下文-\>执行代码
当执行到一个函数的时候，就会重复上面解析执行的过程。

:::
