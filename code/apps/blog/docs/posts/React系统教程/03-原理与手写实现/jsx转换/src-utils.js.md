---
title: "src-utils.js"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "// 转换文本或数字为特殊的。"
sidebarWeight: 52
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/jsx转换/src-utils.js.md"
---
::: v-pre

# src-utils.js

> 本节目标：理解“src-utils.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { REACT_TEXT } from "./constants";
```

`//` 转换文本或数字为特殊的

```
vdom
export function wrapToVdom(element) {
  return typeof element === "string" || typeof element === "number"
    ? { type: REACT_TEXT, props: { content: element } }
    : element;
}
```

:::
