---
title: "组合 Action"
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
description: "Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action ，以处理更加复杂的异步流程？ 首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise ，并且 stor。"
sidebarWeight: 69
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Action/组合 Action.md"
---
::: v-pre

# 组合 Action

> 本节目标：理解“组合 Action”的核心思路，并能把它用于实际开发或面试表达。
`Action` 通常是异步的，那么如何知道 `action` 什么时候结束呢？更重要的是，我们如何才能组合多个 `action`，以处理更加复杂的异步流程？
首先，你需要明白 `store.dispatch` 可以处理被触发的 `action` 的处理函数返回的 `Promise`，并且 `store.dispatch` 仍旧返回 `Promise`：

```
actions: {  actionA ({ commit }) {    return new Promise((resolve, reject) => {      setTimeout(() => {        commit('someMutation')        resolve()      }, 1000)    })  }}
```
 现在你可以：

```
store.dispatch('actionA').then(() => {  // ...})
```
 在另外一个 `action` 中也可以：

```
actions: {  // ...  actionB ({ dispatch, commit }) {    return dispatch('actionA').then(() => {      commit('someOtherMutation')    })  }}
```

最后，如果我们利用

```
async / await
```

，我们可以如下组合 `action`：
`//` 假设 `getData()` 和 `getOtherData()` 返回的是

```
 Promise
actions: {  async actionA ({ commit }) {    commit('gotData', await getData())  },  async actionB ({ dispatch, commit }) {    await dispatch('actionA') //
```

等待 `actionA` 完成

```
    commit('gotOtherData', await getOtherData())  }}
```
 一个 `store.dispatch` 在不同模块中可以触发多个 `action` 函数。在这种情况下，只有当所有触发函数完成后，返回的 `Promise` 才会执行。
 \> 来自

```
 <https://vuex.vuejs.org/zh/guide/actions.html>
```

:::
