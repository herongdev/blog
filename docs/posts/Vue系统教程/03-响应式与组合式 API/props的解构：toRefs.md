---
title: "props的解构：toRefs"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "当然，您可以直接使用 props.tabList 。但在 Vue 3 的 Composition API 中，为了保留 Vue 2 的响应性，我们经常使用 toRefs 来解构 props 或 reactive 对象。这是因为当直接解构一个响应式对象时，您可能会失去其响应性。 比。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/props的解构：toRefs.md"
---
::: v-pre

# props的解构：toRefs

> 本节目标：理解“props的解构：toRefs”的核心思路，并能把它用于实际开发或面试表达。
当然，您可以直接使用 `props.tabList`。但在 Vue 3 的 Composition API 中，为了保留 Vue 2 的响应性，我们经常使用 `toRefs` 来解构 `props` 或 `reactive` 对象。这是因为当直接解构一个响应式对象时，您可能会失去其响应性。

比如：

```javascript
let { tabIndex } = props; // 这会失去响应性
tabIndex++; // 该更改不会反映回原 `props.tabIndex`
```

但使用 `toRefs`：

```javascript
const { tabIndex } = toRefs(props); // 保留响应性
tabIndex.value++; // 该更改会反映回原 `props.tabIndex`
```

如果您不打算对这些属性进行任何更改，或者不关心它们的响应性，那么直接使用 `props.tabList` 是完全可以的。但如果您需要保留其响应性，建议使用 `toRefs` 进行解构。

:::
