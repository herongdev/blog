---
title: "ecma262中定义"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "typeof 除了能区分可调用对象类型，不能细致区分其它对象类型； 检测一个未被声明的对象，不会报错，而是返回\"undefined\" 再检测为000开头后，还会检测是否实现了call方法，实现了call方法为函数，没有为对象。"
sidebarWeight: 70
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/ecma262中定义.md"
---
::: v-pre

# ecma262中定义

> 本节目标：理解“ecma262中定义”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
typeof
除了能区分可调用对象类型，不能细致区分其它对象类型；
检测一个未被声明的对象，不会报错，而是返回"undefined"

```
插件封闭
```

```
typeof底层机制
```

再检测为000开头后，还会检测是否实现了call方法，实现了call方法为函数，没有为对象；

:::
