---
title: "Mutation 需遵守 Vue 的响应规则"
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
description: "既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项： 1. 最好提前在你的 store 中初始化好所有所需属性。 2. 当需要在对。"
sidebarWeight: 82
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Mutation/Mutation 需遵守 Vue 的响应规则.md"
---
::: v-pre

# Mutation 需遵守 Vue 的响应规则

> 本节目标：理解“Mutation 需遵守 Vue 的响应规则”的核心思路，并能把它用于实际开发或面试表达。
既然 `Vuex` 的 `store` 中的状态是响应式的，那么当我们变更状态时，监视状态的 `Vue` 组件也会自动更新。这也意味着 `Vuex` 中的 `mutation` 也需要与使用 `Vue` 一样遵守一些注意事项：

1. 最好提前在你的 `store` 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该
3. 使用

    ```
    Vue.set(obj, 'newProp', 123),
    ```

    或者
4. 以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

    ```
    state.obj = { ...state.obj, newProp: 123 }
    ```

:::
