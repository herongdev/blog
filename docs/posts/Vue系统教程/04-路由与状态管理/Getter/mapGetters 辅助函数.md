---
title: "mapGetters 辅助函数"
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
description: "mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性： 使用对象展开运算符将 getter 混入 computed 对象中 如果你想将一个 getter 属性另取一个名字，使用对象形式： 把 this.doneCount 映射为 \\ 来自。"
sidebarWeight: 71
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Getter/mapGetters 辅助函数.md"
---
::: v-pre

# mapGetters 辅助函数

> 本节目标：理解“mapGetters 辅助函数”的核心思路，并能把它用于实际开发或面试表达。
`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：

```
import { mapGetters } from 'vuex'
export default {  // ...  computed: {  //
```

使用对象展开运算符将 `getter` 混入 `computed` 对象中

```
    ...mapGetters([      'doneTodosCount',      'anotherGetter',      // ...    ])  }}
```
 如果你想将一个 `getter` 属性另取一个名字，使用对象形式：

```
...mapGetters({  //
```

把 `` `this.doneCount` `` 映射为

```
 `this.$store.getters.doneTodosCount`  doneCount: 'doneTodosCount'})
```
 \> 来自

```
 <https://vuex.vuejs.org/zh/guide/getters.html>
```

:::
