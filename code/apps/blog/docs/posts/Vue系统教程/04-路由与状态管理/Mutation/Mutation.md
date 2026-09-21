---
title: "Mutation"
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
description: "更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 。 Vuex 中的 mutation 非常类似于事件：都有一个字符串的事件类型 (type) 和一个回调函数 (handler)。 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作。"
sidebarWeight: 83
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Mutation/Mutation.md"
---
::: v-pre

# Mutation

> 本节目标：理解“Mutation”的核心思路，并能把它用于实际开发或面试表达。
- 更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 `mutation`。
- Vuex 中的 mutation 非常类似于事件：都有一个字符串的事件类型 (type) 和一个回调函数 (handler)。
- 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```
const store = new Vuex.Store({  state: {    count: 1  },  mutations: {    increment (state) {      //
```

变更状态

```
      state.count++    }  }})
```
 你不能直接调用一个 `mutation handler`。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 `mutation` 时，调用此函数。”

**唤醒**`mutation`
要唤醒一个 `mutation handler`，你需要以相应的 `type` 调用 `store.commit` 方法：

```
store.commit('increment')
```

**提交载荷（**`Payload`**）**
你可以向 `store.commit` 传入额外的参数，即 `mutation` 的 载荷（`payload`）：

```
// ...mutations: {  increment (state, n) {    state.count += n  }}
store.commit('increment', 10)
```
 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 `mutation` 会更易读：

```
// ...mutations: {  increment (state, payload) {    state.count += payload.amount  }}
store.commit('increment', {  amount: 10})
```

**对象风格的提交方式**
提交 `mutation` 的另一种方式是直接使用包含 `type` 属性的对象：

```
store.commit({  type: 'increment',  amount: 10})
```
 当使用对象风格的提交方式，整个对象都作为载荷传给 `mutation` 函数，因此 `handler` 保持不变：

```
mutations: {  increment (state, payload) {    state.count += payload.amount  }}
```

:::
