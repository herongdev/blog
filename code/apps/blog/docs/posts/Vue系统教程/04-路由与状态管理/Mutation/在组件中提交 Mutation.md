---
title: "在组件中提交 Mutation"
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
description: "你可以在组件中使用 this.$store.commit('xxx') 提交 mutation ，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store ）。 import \\{ mapMuta。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Mutation/在组件中提交 Mutation.md"
---
::: v-pre

# 在组件中提交 Mutation

> 本节目标：理解“在组件中提交 Mutation”的核心思路，并能把它用于实际开发或面试表达。
你可以在组件中使用 `this.$store.commit('xxx')` 提交 `mutation`，或者使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用（需要在根节点注入 `store`）。
import \{ mapMutations \} from 'vuex'
export default \{
  // ...
  methods: \{
    ...mapMutations([
      // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'increment',
      // `mapMutations` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'incrementBy'
    ]),
    ...mapMutations(\{
      // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      add: 'increment'
    \})
  \}
\}

下一步：`Action`
在 `mutation` 中混合异步调用会导致你的程序很难调试。例如，当你调用了两个包含异步回调的 `mutation` 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 `Vuex` 中，`mutation` 都是同步事务：

```
store.commit('increment')//
```

任何由 `"increment"` 导致的状态变更都应该在此刻完成。``
为了处理异步操作，让我们来看一看

```
Action
```

。
 \> 来自

```
 <https://vuex.vuejs.org/zh/guide/mutations.html>
```

:::
