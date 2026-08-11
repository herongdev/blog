---
title: "setup中的生命周期"
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
description: "在 Vue 3 中， setup 函数是组件选项 API 的替代，用于在组件的生命周期中更早地组织和运行响应式逻辑。理解 setup 中的 onMounted 和组件的 mounted 选项的执行顺序，对于编写高效且可预测的 Vue 应用是很重要的。 执行顺序 setup() 函。"
sidebarWeight: 160
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/生命周期/setup中的生命周期.md"
---
::: v-pre

# setup中的生命周期

> 本节目标：理解“setup中的生命周期”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 中，`setup` 函数是组件选项 API 的替代，用于在组件的生命周期中更早地组织和运行响应式逻辑。理解 `setup` 中的 `onMounted` 和组件的 `mounted` 选项的执行顺序，对于编写高效且可预测的 Vue 应用是很重要的。

### 执行顺序
- **`setup()`** 函数：在组件实例被创建和初始化属性之后立即调用，这发生在生命周期钩子 `beforeCreate` 和 `created` 之间。在 `setup` 函数中，可以访问到传入的 `props` 和上下文对象（`context`），但是此时组件的 DOM 还未挂载或渲染。

- **`onMounted()`**：在 `setup` 函数中使用的 `onMounted` 钩子，是 Composition API 的一部分，它会在组件的 `mounted` 生命周期钩子之后执行。也就是说，`setup` 中的 `onMounted` 钩子在组件的 DOM 已经被挂载到文档中之后运行。

- **组件的 `mounted` 钩子**：这是一个来自 Vue 2 的标准生命周期钩子，用于标示组件已经被挂载到 DOM 上。当使用 `mounted` 钩子时，你可以安全地进行 DOM 操作和相关的后处理逻辑。

### 执行顺序总结
1. **`setup()`** 函数执行。
2. **组件的 `mounted` 钩子执行**。
3. **`setup` 中的 `onMounted()` 执行**。

这意味着，在 `mounted` 钩子中定义的逻辑会在 `setup` 中通过 `onMounted` 定义的逻辑之前执行。这一顺序对于需要在组件完全渲染之后立即运行的初始化代码来说非常重要，特别是当这些代码依赖于 DOM 的情况下。

### 示例代码

这里是一个简单的示例，展示了如何在一个 Vue 3 组件中使用这些钩子：

```vue
<template>
<div ref="divRef">Hello, world!</div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
setup() {
const divRef = ref(null);

onMounted(() => {
console.log('onMounted from setup:', divRef.value.textContent);
});

return { divRef };
},
mounted() {
console.log('mounted from options API');
}
}
</script>
```

在这个例子中，控制台首先会打印出由组件的 `mounted` 钩子触发的消息，然后是 `setup` 中的 `onMounted` 钩子的消息。

了解这些钩子的执行顺序可以帮助你更好地规划组件的初始化和渲染逻辑，确保你的应用表现出预期的行为。

:::
