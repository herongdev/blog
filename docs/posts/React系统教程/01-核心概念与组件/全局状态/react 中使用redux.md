---
title: "react 中使用redux"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "使用 Redux 流程 1. 定义当前项目有什么功能（常量）： actionTypes.js。"
sidebarWeight: 102
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/react 中使用redux.md"
---
::: v-pre

# react 中使用redux

> 本节目标：理解“react 中使用redux”的核心思路，并能把它用于实际开发或面试表达。
使用`Redux`流程

1. 定义当前项目有什么功能（常量）：`actionTypes.js`

```
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
```

```
定义当前项目的默认状态，放到reducer中：reducer.js
```

```
let initialState = {
};
```

```
创建容器
```

```
let store = createStore(reducer)
```

```
可以在外面进行派发动作，默认渲染一次。
```

:::
