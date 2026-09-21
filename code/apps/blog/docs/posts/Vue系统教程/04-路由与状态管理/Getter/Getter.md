---
title: "Getter"
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
description: "有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数： 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。 Vuex 允许我们在 store 中定义“ getter ”（可。"
sidebarWeight: 70
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Getter/Getter.md"
---
::: v-pre

# Getter

> 本节目标：理解“Getter”的核心思路，并能把它用于实际开发或面试表达。
有时候我们需要从 `store` 中的 `state` 中派生出一些状态，例如对列表进行过滤并计数：

```
computed: {  doneTodosCount () {    return this.$store.state.todos.filter(todo => todo.done).length  }}
```
 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

`Vuex` 允许我们在 `store` 中定义“`getter`”（可以认为是 `store` 的计算属性）。就像计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
`Getter` 接受 `state` 作为其第一个参数：

```
const store = new Vuex.Store({  state: {    todos: [      { id: 1, text: '...', done: true },      { id: 2, text: '...', done: false }    ]  },  getters: {    doneTodos: state => {      return state.todos.filter(todo => todo.done)    }  }})
```

:::
