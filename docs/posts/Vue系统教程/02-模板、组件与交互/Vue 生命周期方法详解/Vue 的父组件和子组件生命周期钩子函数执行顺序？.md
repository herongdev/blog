---
title: "Vue 的父组件和子组件生命周期钩子函数执行顺序？"
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
description: "Vue 父组件和子组件生命周期钩子函数执行顺序 1. 加载渲染过程 加载渲染过程发生在组件挂载（ mount ）时，涉及父组件和子组件的生命周期钩子函数执行顺序如下： 父组件的 beforeCreate 父组件的 created 父组件的 beforeMount 子组件的 bef。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Vue 生命周期方法详解/Vue 的父组件和子组件生命周期钩子函数执行顺序？.md"
---
::: v-pre

# Vue 的父组件和子组件生命周期钩子函数执行顺序？

> 本节目标：理解“Vue 的父组件和子组件生命周期钩子函数执行顺序？”的核心思路，并能把它用于实际开发或面试表达。
Vue 父组件和子组件生命周期钩子函数执行顺序

1. 加载渲染过程
加载渲染过程发生在组件挂载（`mount`）时，涉及父组件和子组件的生命周期钩子函数执行顺序如下：
- 父组件的 `beforeCreate`
- 父组件的 `created`
- 父组件的 `beforeMount`
- 子组件的 `beforeCreate`
- 子组件的 `created`
- 子组件的 `beforeMount`
- 子组件的 `mounted`
- 父组件的 `mounted`

2. 子组件更新过程
当子组件的数据发生变化时，父组件和子组件的生命周期钩子函数执行顺序如下：
- 父组件的 `beforeUpdate`
- 子组件的 `beforeUpdate`
- 子组件的 `updated`
- 父组件的 `updated`

3. 父组件更新过程
当父组件的数据发生变化且不影响子组件时，生命周期钩子函数执行顺序如下：

1. 父组件的 `beforeUpdate`
2. 父组件的 `updated`

当父组件的数据发生变化且影响子组件时，生命周期钩子函数的执行顺序如下：

1. **父组件的 beforeUpdate**
2. **子组件的 beforeUpdate**
3. **子组件的 updated**
4. **父组件的 updated**

4. 销毁过程
当组件被销毁时，涉及父组件和子组件的生命周期钩子函数执行顺序如下：
- 父组件的 `beforeDestroy`
- 子组件的 `beforeDestroy`
- 子组件的 `destroyed`
- 父组件的 `destroyed`

重要点
1. **子组件 `mounted` 后，父组件才能 `mounted`**：
- 子组件的 `mounted` 钩子在父组件的 `mounted` 钩子之前执行。   2. **子组件 `destroy` 后，父组件才能 `destroy`**：
- 子组件的 `destroyed` 钩子在父组件的 `destroyed` 钩子之前执行。   3. **父组件 `mount` 时，才开始子组件的生命周期**：
- 父组件的 `beforeMount` 钩子开始时，子组件的生命周期才会被触发。

:::
