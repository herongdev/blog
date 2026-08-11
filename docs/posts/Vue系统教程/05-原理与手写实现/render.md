---
title: "render"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "正则方法exec与正则的g元字符是冲突的； 如果加了g，只能匹配一次，不加则会循环匹配。"
sidebarWeight: 47
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/render.md"
---
::: v-pre

# render

> 本节目标：理解“render”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
解析模板
```

```
在src下新建文件夹compiler,建立主文件
```

```
ast是语法层面的，可以描述css,html,等其它；
vnode用来描述dom;
```

正则方法exec与正则的g元字符是冲突的；
如果加了g，只能匹配一次，不加则会循环匹配；

```
所以，我们会把lastIndex置为0； b'nü'm
```

:::
