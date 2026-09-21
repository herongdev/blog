---
title: "props的immediate"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "在 Vue 中使用 watch 函数时， immediate 选项的作用是控制侦听器是否应该在初始化时立即执行一次回调函数。这里是它的作用差异： 1. 带有 immediate: true : 当侦听器被创建时，它的回调函数会立即执行一次。 这对于根据侦听的属性的初始值执行一些操。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/props的immediate.md"
---
::: v-pre

# props的immediate

> 本节目标：理解“props的immediate”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 中使用 `watch` 函数时，`immediate` 选项的作用是控制侦听器是否应该在初始化时立即执行一次回调函数。这里是它的作用差异：

1. **带有 `immediate: true`**:
- 当侦听器被创建时，它的回调函数会立即执行一次。
- 这对于根据侦听的属性的初始值执行一些操作（例如，初始化状态或执行依赖于这些属性的副作用）非常有用。
- 在你的案例中，这意味着当组件初始化时，如果 `props.modelValue` 已经有值，侦听器的回调函数会立即运行，允许组件根据这些初始值更新 `picker-view` 的显示。

2. **不带 `immediate: true`**:
- 侦听器创建后，其回调函数只会在侦听
/'']的属性发生变化时执行。
- 这意味着如果属性在组件初始化时已经有值，这个初始值不会触发回调函数。
- 在你的案例中，这意味着如果 `props.modelValue` 在组件初始化时已经设置了值，`picker-view` 的显示不会根据这些值更新，直到 `modelValue` 发生变化。

根据你的需求，使用 `immediate: true` 是合理的，因为你希望组件能够根据 `props.modelValue` 的初始值立即更新 `picker-view` 的状态，无论这个值是在组件初始化之前还是之后设置的。

:::
