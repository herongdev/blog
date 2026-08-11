---
title: "vm上的内部属性"
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
description: "围绕“vm上的内部属性”整理的概念、示例与实践笔记。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/vm上的内部属性.md"
---
::: v-pre

# vm上的内部属性

> 本节目标：理解“vm上的内部属性”的核心思路，并能把它用于实际开发或面试表达。
```
vm._uid = uid++
vm._isVue = true
vm.$options
vm.$el = el
vm._renderProxy = vm
vm._self = vm
vm._update()
vm._render()
vm._update(vm._render(), hydrating)
const { render, _parentVnode } = vm.$options
```

:::
