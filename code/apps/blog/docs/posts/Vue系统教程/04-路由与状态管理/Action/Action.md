---
title: "Action"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "Action 类似于 mutation ，不同在于： Action 提交的是 mutation ，而不是直接变更状态。 Action 可以包含任意异步操作。 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit。"
sidebarWeight: 66
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Action/Action.md"
---
::: v-pre

# Action

> 本节目标：理解“Action”的核心思路，并能把它用于实际开发或面试表达。
`Action` 类似于 `mutation`，不同在于：

- `Action` 提交的是 `mutation`，而不是直接变更状态。
- `Action` 可以包含任意异步操作。

```
const store = new Vuex.Store({  state: {    count: 0  },  mutations: {    increment (state) {      state.count++    }  },  actions: {    increment (context) {      context.commit('increment')    }  }})
Action
```

函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 `mutation`，或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`。当我们在之后介绍到

```
Modules
```

 时，你就知道 `context` 对象为什么不是 `store` 实例本身了。

**解构写法**
实践中，我们会经常用到 `ES2015` 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```
actions: {  increment ({ commit }) {    commit('increment')  }}
```

:::
