---
title: "v-show"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "v show 指令也可以用于根据条件展示元素，如： 带有 v show 的元素始终会被渲染并保留在 DOM 中。 v show 只是简单地切换元素的 CSS property display。 注意： v show 不支持 \\<template\\ 元素，也不支持 v else。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/条件渲染/v-show.md"
---
::: v-pre

# v-show

> 本节目标：理解“v-show”的核心思路，并能把它用于实际开发或面试表达。
==v-show== ==指令也可以用于根据条件展示元素，如：==

```
<h1 v-show="ok">Hello!</h1>
```
 ==带有== `v-show` ==的元素始终会被渲染并保留在== `DOM` ==中。==
==v-show 只是简单地切换元素的 CSS property display。==

==注意：==`v-show` ==不支持== `\<template\>` ==元素，也不支持== `v-else`==。==

```
v-if
```

 `vs`

```
v-show
v-if
```

 ==是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。==
`v-if` ==也是====惰性的====：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。==
==相比之下，==`v-show` ==就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于== `CSS` ==进行切换。==
==一般来说，==`v-if` ==有更高的切换开销，而== `v-show` ==有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用== `v-show` ==较好；如果在运行时条件很少改变，则使用== `v-if` ==较好。==

:::
