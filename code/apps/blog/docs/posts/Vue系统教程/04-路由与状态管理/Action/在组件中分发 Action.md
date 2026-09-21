---
title: "在组件中分发 Action"
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
description: "你在组件中使用 this.$store.dispatch('xxx') 分发 action ，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store ）： 将 this.increment()。"
sidebarWeight: 68
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Action/在组件中分发 Action.md"
---
::: v-pre

# 在组件中分发 Action

> 本节目标：理解“在组件中分发 Action”的核心思路，并能把它用于实际开发或面试表达。
你在组件中使用 `this.$store.dispatch('xxx')` 分发 `action`，或者使用 `mapActions` 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```
import { mapActions } from 'vuex'
export default {  // ...  methods: {    ...mapActions([      'increment', //
```

将 `` `this.increment()` `` 映射为

```
 `this.$store.dispatch('increment')`
// `mapActions`
```

也支持载荷：

```
      'incrementBy' //
```

将 `` `this.incrementBy(amount)` `` 映射为

```
 `this.$store.dispatch('incrementBy', amount)`    ]),    ...mapActions({      add: 'increment' //
```

将 `` `this.add()` `` 映射为

```
 `this.$store.dispatch('increment')`    })  }}
```

:::
