---
title: "useMemo 减少组件 Render 过程耗时"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "useMemo 是一种缓存机制提速，当它的依赖未发生改变时，就不会触发重新计算。一般用在「计算派生状态的代码」非常耗时的场景中，如：遍历大列表做统计信息。 拓展知识 React 官方并不保证 useMemo 一定会进行缓存，所以可能在依赖不改变时，仍然执行重新计算。参考 How。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/useMemo 减少组件 Render 过程耗时.md"
---
::: v-pre

# useMemo 减少组件 Render 过程耗时

> 本节目标：理解“useMemo 减少组件 Render 过程耗时”的核心思路，并能把它用于实际开发或面试表达。
useMemo 是一种缓存机制提速，当它的依赖未发生改变时，就不会触发重新计算。一般用在「计算派生状态的代码」非常耗时的场景中，如：遍历大列表做统计信息。
**拓展知识**

React 官方并不保证 useMemo 一定会进行缓存，所以可能在依赖不改变时，仍然执行重新计算。参考 [How to memoize calculations](https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations)

缓存优化往往是最简单有效的优化方式，但 useMemo 缓存加速只能缓存最近一次函数执行的结果，如果想缓存更多次函数执行的结果，可使用 [memoizee](https://www.npmjs.com/package/memoizee)。

:::
