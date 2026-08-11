---
title: "Boolean"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "强制转布尔类型： 使用Boolean()函数来进行强制类型转换。 理论上，除了falsy值（假值）强制转布尔类型结果为false，其它都是true。 假值对象：浏览器在某些特定情况下，自己创建了一些外来值，这些就是'假值对象'，假值对象强制转换为布尔类型时返回false。如doc。"
sidebarWeight: 58
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/Boolean/Boolean.md"
---
::: v-pre

# Boolean

> 本节目标：理解“Boolean”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
Boolean类型只有两个字面值：true和false；
```

```
falsy值是指转布尔值类型时返回false的值：
• undefined
• null
• false
• +0、-0 和 NaN
• ""
```

**强制转布尔类型：**
使用Boolean()函数来进行强制类型转换。
理论上，除了falsy值（假值）强制转布尔类型结果为false，其它都是true。

```
**特殊情况**
```

假值对象：浏览器在某些特定情况下，自己创建了一些外来值，这些就是'假值对象'，假值对象强制转换为布尔类型时返回false。如document.all，它是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供。

```
**布尔值的隐式强制转换**
```

```
if (..) 语句中的条件判断表达式。
```

```
三元运算符：? : 中的条件判断表达式。
```

```
for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
```

```
while (..) 和 do..while(..) 循环中的条件判断表达式。
```

```
逻辑运算符： 逻辑或||、逻辑与&&和逻辑非!。
```

:::
