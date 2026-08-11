---
title: "patchProp.ts"
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
description: "围绕“patchProp.ts”整理的概念、示例与实践笔记。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/patchProp.ts.md"
---
::: v-pre

# patchProp.ts

> 本节目标：理解“patchProp.ts”的核心思路，并能把它用于实际开发或面试表达。
```
// dom属性的操作api
import { patchAttr } from "./modules/attr";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/event";
import { patchStyle } from "./modules/style";
// null->值：添加属性
// 值->值：修改属性
// 值->null：删除属性
export function patchProp(el, key, prevValue, nextValue) {
  // 类名  el.className
  if (key === 'class') {
    patchClass(el, nextValue)
    // el  style {color:'red',fontSzie:'12'}  {color:'blue',background:"red"}
  } else if (key === 'style') {// 样式  el.style
    patchStyle(el, prevValue, nextValue)
  } else if (/^on[^a-z]/.test(key)) {  // events  addEventListener
    patchEvent(el, key, nextValue);
  } else { // 普通属性 // el.setAttribute
    patchAttr(el, key, nextValue);
  }
}
```

:::
