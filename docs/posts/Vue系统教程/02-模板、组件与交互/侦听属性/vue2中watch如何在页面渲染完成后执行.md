---
title: "vue2中watch如何在页面渲染完成后执行"
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
description: "在 Vue 2 中，如果你想让 watch 在页面渲染完成后执行，可以使用 Vue 的 nextTick 函数来实现这个目的。nextTick 用于在下一个 DOM 更新循环之后延迟执行回调函数。这样就可以确保 watch 在渲染完成后执行。以下是一个示例： \\<template。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/侦听属性/vue2中watch如何在页面渲染完成后执行.md"
---
::: v-pre

# vue2中watch如何在页面渲染完成后执行

> 本节目标：理解“vue2中watch如何在页面渲染完成后执行”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 2 中，如果你想让 watch 在页面渲染完成后执行，可以使用 Vue 的 nextTick 函数来实现这个目的。nextTick 用于在下一个 DOM 更新循环之后延迟执行回调函数。这样就可以确保 watch 在渲染完成后执行。以下是一个示例：

\<template\>
\<div\>
\<input v-model="inputValue" /\>
\<p\>\{\{ message \}\}\</p\>
\</div\>
\</template\>

\<script\>
export default \{
data() \{
return \{
inputValue: '',
message: '',
\};
\},
watch: \{
inputValue(newVal, oldVal) \{
this.$nextTick(() =\> \{
// 确保在 DOM 更新后执行
this.updateMessage(newVal, oldVal);
\});
\},
\},
methods: \{
updateMessage(newVal, oldVal) \{
this.message = `新值：${newVal}，旧值：${oldVal}`;
\},
\},
\};
\</script\>
在这个示例中，我们创建了一个包含文本输入框和一个段落的组件。我们使用 watch 来监视 inputValue 数据属性的变化。每当 inputValue 发生变化时，我们都会调用 updateMessage 方法，但是我们将其包装在 this.$nextTick 函数中，以确保它在 DOM 更新完成后执行。这样一来，我们就可以确保 message 在页面渲染完成后更新。

在 Vue 3 中，要在页面渲染完成后执行 watch，您可以使用 Vue 的 nextTick 函数和新的 Composition API。以下是一个使用 Vue 3 和 Composition API 的示例：

html
Copy code
\<template\>
\<div\>
\<input v-model="inputValue" /\>
\<p\>\{\{ message \}\}\</p\>
\</div\>
\</template\>

\<script\>
import \{ ref, watch, nextTick \} from 'vue';

export default \{
setup() \{
const inputValue = ref('');
const message = ref('');

watch(inputValue, (newVal, oldVal) =\> \{
nextTick(() =\> \{
// 确保在 DOM 更新后执行
updateMessage(newVal, oldVal);
\});
\});

function updateMessage(newVal, oldVal) \{
message.value = `新值：${newVal}，旧值：${oldVal}`;
\}

return \{
inputValue,
message,
\};
\},
\};
\</script\>
在这个 Vue 3 示例中，我们使用了 Composition API 的 setup 函数和 ref、watch、nextTick 从 'vue' 中导入。我们创建了两个响应式引用（inputValue 和 message），并使用 watch 来监视 inputValue 的变化。当 inputValue 发生变化时，我们将调用 updateMessage 函数，并使用 nextTick 确保它在 DOM 更新完成后执行。这样，我们可以确保 message 在页面渲染完成后更新。

:::
