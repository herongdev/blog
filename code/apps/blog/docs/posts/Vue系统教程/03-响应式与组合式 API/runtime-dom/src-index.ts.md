---
title: "src-index.ts"
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
description: "围绕“src-index.ts”整理的概念、示例与实践笔记。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/src-index.ts.md"
---
::: v-pre

# src-index.ts

> 本节目标：理解“src-index.ts”的核心思路，并能把它用于实际开发或面试表达。
```
import { createRenderer } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";
const renderOptions = Object.assign(nodeOps, { patchProp }); // domAPI 属性api
export function render(vnode, container) {
  // 在创建渲染器的时候 传入选项
  createRenderer(renderOptions).render(vnode, container)
}
export * from "@vue/runtime-core"
Runtime-dom主要提供nodeOps和patchProp方法。即特定平台渲染页面元素的方法和应用属性的方法。
```

:::
