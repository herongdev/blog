---
title: "Module"
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
description: "由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时， store 对象就有可能变得相当臃肿。 为了解决以上问题， Vuex 允许我们将 store 分割成模块（ module ）。每个模块拥有自己的 state 、 mutation 、 action。"
sidebarWeight: 74
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Module/Module.md"
---
::: v-pre

# Module

> 本节目标：理解“Module”的核心思路，并能把它用于实际开发或面试表达。
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，`store` 对象就有可能变得相当臃肿。

为了解决以上问题，`Vuex` 允许我们将 `store` 分割成模块（`module`）。每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、甚至是嵌套子模块——从上至下进行同样方式的分割：

```
const moduleA = {  state: () => ({ ... }),  mutations: { ... },  actions: { ... },  getters: { ... }}
const moduleB = {  state: () => ({ ... }),  mutations: { ... },  actions: { ... }}
const store = new Vuex.Store({  modules: {    a: moduleA,    b: moduleB  }})
store.state.a // -> moduleA
```

的状态

```
store.state.b // -> moduleB
```

的状态``

**模块的局部状态**
对于模块内部的 `mutation` 和 `getter`，接收的第一个参数是模块的局部状态对象。

```
const moduleA = {  state: () => ({    count: 0  }),  mutations: {    increment (state) {      //
```

这里的 `` `state` `` 对象是模块的局部状态

```
      state.count++    }  },
getters: {    doubleCount (state) {      return state.count * 2    }  }}
```

同样，对于模块内部的 `action`，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```
const moduleA = {  // ...  actions: {    incrementIfOddOnRootSum ({ state, commit, rootState }) {      if ((state.count + rootState.count) % 2 === 1) {        commit('increment')      }    }  }}
```
 对于模块内部的 `getter`，根节点状态会作为第三个参数暴露出来：

```
const moduleA = {  // ...  getters: {    sumWithRootCount (state, getters, rootState) {      return state.count + rootState.count    }  }}
```

:::
