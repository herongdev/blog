---
title: "jsObject.create"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“jsObject.create”整理的概念、示例与实践笔记。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/jsObject.create.md"
---
::: v-pre

# jsObject.create

> 本节目标：理解“jsObject.create”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
**1. 手写**
思路：将传入的对象作为原型
function create(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}
```

```
没有原型的对象：
```

:::
