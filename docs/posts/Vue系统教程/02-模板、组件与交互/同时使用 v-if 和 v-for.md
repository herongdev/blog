---
title: "同时使用 v-if 和 v-for"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "在 Vue 中，如果在同一个元素上同时使用 v if 和 v for ，会有优先级问题。Vue 的不同版本对此处理略有不同。 Vue 2 中的优先级 在 Vue 2 中， v for 的优先级高于 v if 。这意味着 v for 会首先被解析，然后在每个循环的过程中应用 v i。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/同时使用 `v-if` 和 `v-for.md"
---
::: v-pre

# 同时使用 v-if 和 v-for

> 本节目标：理解“同时使用 v-if 和 v-for”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 中，如果在同一个元素上同时使用 `v-if` 和 `v-for`，会有优先级问题。Vue 的不同版本对此处理略有不同。

Vue 2 中的优先级
在 Vue 2 中，`v-for` 的优先级高于 `v-if`。这意味着 `v-for` 会首先被解析，然后在每个循环的过程中应用 `v-if`。
\<template\>
\<ul\>
\<li v-for="item in items" v-if="item.isActive" :key="item.id"\>
\{\{ item.name \}\}
\</li\>
\</ul\>
\</template\>
\<script\>
export default \{
data() \{
return \{
items: [
\{ id: 1, name: 'Item 1', isActive: true \},
\{ id: 2, name: 'Item 2', isActive: false \},
// 更多项...
]
\};
\}
\};
\</script\>
在这个例子中，`v-for` 会遍历 `items` 数组，然后在每个 `li` 元素上应用 `v-if` 判断。

Vue 3 中的优先级
在 Vue 3 中，这种优先级没有改变，仍然是 `v-for` 优先于 `v-if`。
\<template\>
\<ul\>
\<li v-for="item in items" v-if="item.isActive" :key="item.id"\>
\{\{ item.name \}\}
\</li\>
\</ul\>
\</template\>
\<script\>
export default \{
data() \{
return \{
items: [
\{ id: 1, name: 'Item 1', isActive: true \},
\{ id: 2, name: 'Item 2', isActive: false \},
// 更多项...
]
\};
\}
\};
\</script\>

优先级解释
在 Vue 2 和 Vue 3 中，`v-for` 都先于 `v-if` 解析。解析的顺序是这样的：
1. **`v-for` 优先**：首先解析 `v-for`，将每一项渲染成独立的虚拟 DOM 节点。
2. **`v-if` 次之**：然后在每个独立的虚拟 DOM 节点上应用 `v-if`，决定是否渲染该节点。
避免混用的推荐方式
正如之前所建议的，避免在同一个元素上同时使用 `v-if` 和 `v-for` 可以提高性能和代码可读性。你可以通过以下方式优化：
#使用计算属性进行过滤
\<template\>
\<ul\>
\<li v-for="item in filteredItems" :key="item.id"\>
\{\{ item.name \}\}
\</li\>
\</ul\>
\</template\>
\<script\>
export default \{
data() \{
return \{
items: [
\{ id: 1, name: 'Item 1', isActive: true \},
\{ id: 2, name: 'Item 2', isActive: false \},
// 更多项...
]
\};
\},
computed: \{
filteredItems() \{
return this.items.filter(item =\> item.isActive);
\}
\}
\};
\</script\>
这样可以避免在模板中进行不必要的条件判断，提高代码的可读性和性能。

:::
