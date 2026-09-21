---
title: "undefined"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "围绕“undefined”整理的概念、示例与实践笔记。"
sidebarWeight: 73
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/undefined.md"
---
::: v-pre

# undefined

> 本节目标：理解“undefined”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
Undefined类型只有一个值，即undefined。
```

```
已声明未赋值的变量，值默认是undefined的。
```

```
undefined不是保留字，可以用做标识符。
```

```
**void**
void 运算符对给定的表达式进行求值，无论结果是多少，都会返回原始值undefined。
因此我们可以按惯例用void 0（也可以跟其它表达式）来代替undefined进行判断：
var data;
console.log(data === void 0); //true
```

```
注意void运算符的优先级：
```

:::
