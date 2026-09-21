---
title: "useMemo、useCallback 实现稳定的 Props 值"
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
description: "如果传给子组件的派生状态或函数，每次都是新的引用，那么 PureComponent 和 React.memo 优化就会失效。所以需要使用 useMemo 和 useCallback 来生成稳定值，并结合 PureComponent 或 React.memo 避免子组件重新 Ren。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/useMemo、useCallback 实现稳定的 Props 值.md"
---
::: v-pre

# useMemo、useCallback 实现稳定的 Props 值

> 本节目标：理解“useMemo、useCallback 实现稳定的 Props 值”的核心思路，并能把它用于实际开发或面试表达。
如果传给子组件的派生状态或函数，每次都是新的引用，那么 PureComponent 和 React.memo 优化就会失效。所以需要使用 useMemo 和 useCallback 来生成稳定值，并结合 PureComponent 或 React.memo 避免子组件重新 Render。

```
**拓展知识**
useCallback 是「useMemo 的返回值为函数」时的特殊情况，是 React 提供的便捷方式。在 [React Server Hooks](https://github.com/facebook/react/blob/ee432635724d5a50301448016caa137ac3c0a7a2/packages/react-dom/src/server/ReactPartialRendererHooks.js#L452) 代码 中，useCallback 就是基于 useMemo 实现的。尽管 React Client Hooks 没有使用同一份代码，但 [useCallback](https://github.com/facebook/react/blob/ee432635724d5a50301448016caa137ac3c0a7a2/packages/react-reconciler/src/ReactFiberHooks.new.js#L1590) 的代码逻辑和 [useMemo](https://github.com/facebook/react/blob/ee432635724d5a50301448016caa137ac3c0a7a2/packages/react-reconciler/src/ReactFiberHooks.new.js#L1613) 的代码逻辑仍是一样的。
```

:::
