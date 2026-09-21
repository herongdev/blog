---
title: "watchEffect"
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
description: "watchEffect ： 自动追踪依赖，无需显式指定。 立即执行回调函数。 异步更新队列 ：Vue 会将回调函数的重新执行放入一个异步更新队列中，确保在同一个事件循环中多次依赖变化只会触发一次回调执行。 清理副作用 ：每次重新执行前会调用清理函数（如果有）。 watch ： 需。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/watchEffect.md"
---
::: v-pre

# watchEffect

> 本节目标：理解“watchEffect”的核心思路，并能把它用于实际开发或面试表达。
- **watchEffect**：

    - 自动追踪依赖，无需显式指定。
    - 立即执行回调函数。**异步更新队列**：Vue 会将回调函数的重新执行放入一个异步更新队列中，确保在同一个事件循环中多次依赖变化只会触发一次回调执行。
    - **清理副作用**：每次重新执行前会调用清理函数（如果有）。
- **watch**：

    - 需要显式指定监听的目标。
    - 不会立即执行回调函数，除非设置 \{ immediate: true \}。

**6. 注意事项**

- **避免无限循环**：如果在 watchEffect 的回调函数中修改了响应式数据，可能会导致无限循环。例如：watchEffect(() =\> \{ count.value++; // 这会导致无限循环\});
- **性能优化**：如果回调函数中包含复杂的逻辑或高频率的依赖变化，可能会导致性能问题。可以通过 onInvalidate 清理副作用或使用 watch 替代。

:::
