---
title: "在带命名空间的模块注册全局 action"
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
description: "若需要在带命名空间的模块注册全局 action ，你可添加 root: true ，并将这个 action 的定义放在函数 handler 中。例如： \\{ actions: \\{ someOtherAction(\\{ dispatch \\}) \\{ dispatch('some。"
sidebarWeight: 77
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Module/在带命名空间的模块注册全局 action.md"
---
::: v-pre

# 在带命名空间的模块注册全局 action

> 本节目标：理解“在带命名空间的模块注册全局 action”的核心思路，并能把它用于实际开发或面试表达。
若需要在带命名空间的模块注册全局 `action`，你可添加 `root: true`，并将这个 `action` 的定义放在函数 `handler` 中。例如：
\{
  actions: \{
    someOtherAction(\{ dispatch \}) \{
      dispatch('someAction')
    \}
  \},
  modules: \{
    foo: \{
      namespaced: true,
        actions: \{
        someAction: \{
          root: true,
            handler(namespacedContext, payload) \{ ... \} // -\> 'someAction'
        \}
      \}
    \}
  \}
\}

:::
