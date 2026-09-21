---
title: "PureComponent、React.memo"
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
description: "在 React 工作流中，如果只有父组件发生状态更新，即使父组件传给子组件的所有 Props 都没有修改，也会引起子组件的 Render 过程。 从 React 的声明式设计理念来看，如果子组件的 Props 和 State 都没有改变，那么其生成的 DOM 结构和副作用也不应该。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/PureComponent、React.memo.md"
---
::: v-pre

# PureComponent、React.memo

> 本节目标：理解“PureComponent、React.memo”的核心思路，并能把它用于实际开发或面试表达。
在 React 工作流中，如果只有父组件发生状态更新，即使父组件传给子组件的所有 Props 都没有修改，也会引起子组件的 Render 过程。

从 React 的声明式设计理念来看，如果子组件的 Props 和 State 都没有改变，那么其生成的 DOM 结构和副作用也不应该发生改变。

当子组件符合声明式设计理念时，就可以忽略（路过）子组件本次的 Render 过程。

PureComponent 和 React.memo 就是应对这种场景的。
PureComponent 是对类组件的 Props 和 State 进行浅比较；
React.memo 是对函数组件的 Props 进行浅比较。

:::
