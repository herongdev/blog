---
title: "Mutation 必须是同步函数"
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
description: "一条重要的原则就是要记住 mutation 必须是同步函数。为什么？请参考下面的例子： 现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录， devtools 都需要捕捉到前一状态和后一状态的快照。"
sidebarWeight: 81
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Mutation/Mutation 必须是同步函数.md"
---
::: v-pre

# Mutation 必须是同步函数

> 本节目标：理解“Mutation 必须是同步函数”的核心思路，并能把它用于实际开发或面试表达。
一条重要的原则就是要记住 `mutation` 必须是同步函数。为什么？请参考下面的例子：

```
mutations: {  someMutation (state) {    api.callAsyncMethod(() => {      state.count++    })  }}
```
 现在想象，我们正在 `debug` 一个 `app` 并且观察 `devtool` 中的 `mutation` 日志。每一条 `mutation` 被记录，`devtools` 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 `mutation` 中的异步函数中的回调让这不可能完成：因为当 `mutation` 触发的时候，回调函数还没有被调用，`devtools` 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

:::
