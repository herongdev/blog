---
title: "runtime"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "Vue 中为了解耦， 将逻辑分成了两个模块 运行时核心runtime core：不依赖于平台的，browser、test、小程序、app、canvas等，靠的是虚拟dom。"
sidebarWeight: 53
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime.md"
---
::: v-pre

# runtime

> 本节目标：理解“runtime”的核心思路，并能把它用于实际开发或面试表达。
**Vue****中为了解耦，** **将逻辑分成了两个模块**
运行时核心runtime-core：不依赖于平台的，browser、test、小程序、app、canvas等，靠的是虚拟dom；

```
针对不同平台的运行时，如：
```

```
runtime-dom就是vue针对浏览器平台的；
```

```
runtime-test就是单元测试用的；
```

```
渲染器
```

:::
