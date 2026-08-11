---
title: "在带命名空间的模块内访问全局内容（Global Assets）"
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
description: "如果你希望使用全局 state 和 getter ， rootState 和 rootGetters 会作为第三和第四参数传入 getter ，也会通过 context 对象的属性传入 action 。 若需要在全局命名空间内分发 action 或提交 mutation ，将 {。"
sidebarWeight: 76
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Module/在带命名空间的模块内访问全局内容（Global Assets）.md"
---
::: v-pre

# 在带命名空间的模块内访问全局内容（Global Assets）

> 本节目标：理解“在带命名空间的模块内访问全局内容（Global Assets）”的核心思路，并能把它用于实际开发或面试表达。
如果你希望使用全局 `state` 和 `getter`，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 `getter`，也会通过 `context` 对象的属性传入 `action`。

若需要在全局命名空间内分发 `action` 或提交 `mutation`，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。
modules: \{
  foo: \{
    namespaced: true,
      getters: \{
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter(state, getters, rootState, rootGetters) \{
        getters.someOtherGetter // -\> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -\> 'someOtherGetter'
      \},
      someOtherGetter: state =\> \{ ... \}
    \},
    actions: \{
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction(\{ dispatch, commit, getters, rootGetters \}) \{
        getters.someGetter // -\> 'foo/someGetter'
        rootGetters.someGetter // -\> 'someGetter'
        dispatch('someOtherAction') // -\> 'foo/someOtherAction'
        dispatch('someOtherAction', null, \{ root: true \}) // -\> 'someOtherAction'
        commit('someMutation') // -\> 'foo/someMutation'
        commit('someMutation', null, \{ root: true \}) // -\> 'someMutation'
      \},
      someOtherAction(ctx, payload) \{ ... \}
    \}
  \}
\}

:::
