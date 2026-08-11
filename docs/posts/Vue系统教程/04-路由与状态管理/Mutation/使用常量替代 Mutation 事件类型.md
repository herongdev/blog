---
title: "使用常量替代 Mutation 事件类型"
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
description: "使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然： 我们可以使用 ES2015 风格的计算属性命名功能。"
sidebarWeight: 84
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Mutation/使用常量替代 Mutation 事件类型.md"
---
::: v-pre

# 使用常量替代 Mutation 事件类型

> 本节目标：理解“使用常量替代 Mutation 事件类型”的核心思路，并能把它用于实际开发或面试表达。
使用常量替代 `mutation` 事件类型在各种 `Flux` 实现中是很常见的模式。这样可以使 `linter` 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 `app` 包含的 `mutation` 一目了然：

```
// mutation-types.jsexport const SOME_MUTATION = 'SOME_MUTATION'
// store.jsimport Vuex from 'vuex'import { SOME_MUTATION } from './mutation-types'
const store = new Vuex.Store({  state: { ... },  mutations: {    //
```

我们可以使用 `ES2015` 风格的计算属性命名功能来使用一个常量作为函数名

```
    [SOME_MUTATION] (state) {      // mutate state    }  }})
```
 用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

:::
