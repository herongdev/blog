---
title: "Vue 的 Diff 算法简介"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "Vue 的 Diff 算法简介 Vue.js 的 diff 算法用于比较两个虚拟 DOM 树，并确定如何高效地将变化应用到实际的 DOM 上。diff 算法是 Vue 性能优化的关键之一，因为它通过最小化 DOM 操作来提升渲染性能。 Vue 2 的 Diff 算法 Vue 2。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/Vue 的 Diff 算法简介.md"
---
::: v-pre

# Vue 的 Diff 算法简介

> 本节目标：理解“Vue 的 Diff 算法简介”的核心思路，并能把它用于实际开发或面试表达。
Vue 的 Diff 算法简介
Vue.js 的 diff 算法用于比较两个虚拟 DOM 树，并确定如何高效地将变化应用到实际的 DOM 上。diff 算法是 Vue 性能优化的关键之一，因为它通过最小化 DOM 操作来提升渲染性能。

Vue 2 的 Diff 算法
Vue 2 使用的是基于 [snabbdom](https://github.com/snabbdom/snabbdom) 的 diff 算法。这个算法的主要特性包括：
1. **逐层比较**：
- 从根节点开始，对新旧虚拟 DOM 树的每一层进行比较。   2. **同层比较**：
- 只比较同一层级的节点，不会跨层比较。   3. **四种节点操作**：
- **创建新节点**：在新虚拟 DOM 树中存在而旧虚拟 DOM 树中不存在的节点。
- **删除旧节点**：在旧虚拟 DOM 树中存在而新虚拟 DOM 树中不存在的节点。
- **更新节点**：新旧虚拟 DOM 树中都存在的节点，但属性或子节点不同。
- **移动节点**：同一层级的节点顺序发生变化时，需要移动节点。
4. **通过 key 进行优化**：
- 在列表渲染中使用 `key` 属性来标识节点，避免不必要的重新渲染和移动操作。

示例：
const oldVNode = h('div', [
h('p', 'Old Paragraph 1'),
h('p', 'Old Paragraph 2')
]);
const newVNode = h('div', [
h('p', 'New Paragraph 1'),
h('p', 'Old Paragraph 2')
]);
// Vue 会通过 diff 算法比较 oldVNode 和 newVNode，并更新实际 DOM。

Vue 3 的 Diff 算法
Vue 3 对 diff 算法进行了优化，以提高性能和减少内存消耗。主要的改进包括：
1. **静态提升**：
- Vue 3 会在编译阶段识别出静态节点，并在渲染过程中跳过这些节点的比较和更新。
2. **块级优化**：
- 使用“块”来分割虚拟 DOM 树，将相同类型的节点分组，减少比较的复杂度。
3. **Fragment 支持**：
- 支持多个根节点（Fragment），使得 diff 算法可以处理更复杂的场景。
4. **更智能的列表对比**：
- 改进了列表对比算法，使用双端比较技术（双指针）来优化节点移动的性能。
#### 示例：
const oldVNode = h('div', [
h('p', \{ key: 1 \}, 'Old Paragraph 1'),
h('p', \{ key: 2 \}, 'Old Paragraph 2')
]);
const newVNode = h('div', [
h('p', \{ key: 1 \}, 'New Paragraph 1'),
h('p', \{ key: 2 \}, 'Old Paragraph 2')
]);
// Vue 3 会通过更高效的 diff 算法比较 oldVNode 和 newVNode，并更新实际 DOM。

总结
- **Vue 2**：使用的是基于 snabbdom 的 diff 算法，通过逐层和同层比较，并结合 `key` 属性优化列表渲染。
- **Vue 3**：对 diff 算法进行了多项改进，如静态提升、块级优化、Fragment 支持和更智能的列表对比，使其性能和内存消耗更优。
这些优化使得 Vue 3 在处理复杂场景和大型应用时，能够提供更高的性能和更好的用户体验。

:::
