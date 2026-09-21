---
title: "focus 和 blur的透明化处理"
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
description: "在 HTML 和 DOM 事件模型中，并非所有事件都会冒泡。有些事件，如 focus 和 blur ，是不冒泡的。这意味着当你在一个子元素上触发这类事件时，它们不会自动向上传播到父元素。为了解决这一点，HTML5 引入了 focusin 和 focusout 事件作为 focus。"
sidebarWeight: 109
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/自定义事件/`focus` 和 `blur`的透明化处理.md"
---
::: v-pre

# focus 和 blur的透明化处理

> 本节目标：理解“focus 和 blur的透明化处理”的核心思路，并能把它用于实际开发或面试表达。
在 HTML 和 DOM 事件模型中，并非所有事件都会冒泡。有些事件，如 `focus` 和 `blur`，是不冒泡的。这意味着当你在一个子元素上触发这类事件时，它们不会自动向上传播到父元素。为了解决这一点，HTML5 引入了 `focusin` 和 `focusout` 事件作为 `focus` 和 `blur` 的冒泡版本。

### **为什么 `focus` 事件不冒泡？**

`focus` 事件设计为不冒泡主要是基于它的特定用途：`focus` 事件通常与用户界面的直接交互（如输入控件的聚焦）相关。冒泡可能会导致一些不必要的复杂性或混乱。例如，如果 `focus` 事件冒泡，那么任何父元素都可以接收到多个嵌套元素的 `focus` 事件，这可能不是开发者预期的行为。

### **如何处理组件中的 `focus` 事件**

在 Vue.js 中，如果你想监听一个组件内部的 `focus` 事件，你需要明确地在组件内部处理和转发这个事件，因为它不会自动冒泡到父组件。这就是为什么在组件开发中，尤其是在封装如 `\<input\>` 元素这样的组件时，开发者需要明确地使用 `v-on` 或者 `$listeners` 来在内部元素上设置监听器。

### **使用 `$listeners` 和 `v-on`**

在 Vue 2 中，`$listeners` 对象包含了绑定到组件上的所有事件监听器。通过在组件内部的具体元素上使用 `v-on="$listeners"`，你可以将这些监听器应用到组件的内部元素上。这是一种透明地处理内部事件的方法，使得使用组件就像使用普通 HTML 元素一样直观。

对于需要冒泡的 `focus` 事件处理，Vue 2 组件可以利用 `focusin` 事件（它是冒泡的），或者组件内部可以捕获 `focus` 事件然后手动 `$emit` 到父组件。这样做可以保证父组件能够响应到子组件的 `focus` 事件。

### **示例代码**

```vue
<template>
<div>
<label>
{{ label }}
<input
v-bind="$attrs"
:value="value"
@focusin="handleFocus"
@input="handleInput"
>
</label>
</div>
</template>

<script>
export default {
props: ['label', 'value'],
methods: {
handleFocus(event) {
// Emit focus event to parent
this.$emit('focus', event);
},
handleInput(event) {
this.$emit('input', event.target.value);
}
}
}
</script>
```

在这个组件中，我们直接在 `\<input\>` 元素上监听 `focusin` 事件，并将它作为 `focus` 事件向外传播。这样父组件就可以像监听原生 `focus` 事件一样监听 `focus` 事件，即使在不冒泡的情况下也能正常工作。

:::
