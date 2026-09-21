---
title: "v-model双向绑定的原理"
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
description: "简介 v model 是 Vue 中用于双向数据绑定的指令。它不仅可以应用于表单元素，也可以应用于自定义组件。本文将详细说明 v model 在表单元素和自定义组件中的使用。 在表单元素中的使用 输入框 (input) \\<template\\ \\<div\\ \\<input v m。"
sidebarWeight: 51
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/表单双向绑定/v-model双向绑定的原理.md"
---
::: v-pre

# v-model双向绑定的原理

> 本节目标：理解“v-model双向绑定的原理”的核心思路，并能把它用于实际开发或面试表达。
简介
`v-model` 是 Vue 中用于双向数据绑定的指令。它不仅可以应用于表单元素，也可以应用于自定义组件。本文将详细说明 `v-model` 在表单元素和自定义组件中的使用。
在表单元素中的使用
输入框 (input)
\<template\>
\<div\>
\<input v-model="message" placeholder="Type something"\>
\<p\>Message is: \{\{ message \}\}\</p\>
\</div\>
\</template\>
\<script\>
export default \{
data() \{
return \{
message: ''
\};
\}
\};
\</script\>
在这个例子中，`v-model` 绑定了一个输入框和一个数据属性 `message`。当用户在输入框中输入时，`message` 会自动更新，反之亦然。
复选框 (checkbox)
\<template\>
\<div\>
\<input type="checkbox" v-model="checked"\>
\<p\>Checked: \{\{ checked \}\}\</p\>
\</div\>
\</template\>
\<script\>
export default \{
data() \{
return \{
checked: false
\};
\}
\};
\</script\>
单选框 (radio)
\<template\>
\<div\>
\<input type="radio" value="Option1" v-model="picked"\> Option 1
\<input type="radio" value="Option2" v-model="picked"\> Option 2
\<p\>Picked: \{\{ picked \}\}\</p\>
\</div\>
\</template\>
\<script\>
export default \{
data() \{
return \{
picked: ''
\};
\}
\};
\</script\>
选择框 (select)
\<template\>
\<div\>
\<select v-model="selected"\>
\<option disabled value=""\>Please select one\</option\>
\<option\>A\</option\>
\<option\>B\</option\>
\<option\>C\</option\>
\</select\>
\<p\>Selected: \{\{ selected \}\}\</p\>
\</div\>
\</template\>
\<script\>
export default \{
data() \{
return \{
selected: ''
\};
\}
\};
\</script\>
在自定义组件中的使用
Vue 2 中自定义组件的 v-model
在 Vue 2 中，自定义组件默认使用 `value` 作为 prop，`input` 作为事件。
\<!-- CustomInput.vue --\>
\<template\>
\<input :value="value" @input="$emit('input', $event.target.value)"\>
\</template\>
\<script\>
export default \{
props: ['value']
\};
\</script\>
在父组件中使用：
\<template\>
\<div\>
\<CustomInput v-model="message"\>\</CustomInput\>
\<p\>Message is: \{\{ message \}\}\</p\>
\</div\>
\</template\>
\<script\>
import CustomInput from './CustomInput.vue';
export default \{
components: \{
CustomInput
\},
data() \{
return \{
message: ''
\};
\}
\};
\</script\>
Vue 3 中自定义组件的 v-model
在 Vue 3 中，自定义组件默认使用 `modelValue` 作为 prop，`update:modelValue` 作为事件。
\<!-- CustomInput.vue --\>
\<template\>
\<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"\>
\</template\>
\<script\>
export default \{
props: ['modelValue']
\};
\</script\>
在父组件中使用：
\<template\>
\<div\>
\<CustomInput v-model="message"\>\</CustomInput\>
\<p\>Message is: \{\{ message \}\}\</p\>
\</div\>
\</template\>
\<script\>
import CustomInput from './CustomInput.vue';
export default \{
components: \{
CustomInput
\},
data() \{
return \{
message: ''
\};
\}
\};
\</script\>
自定义 v-model 的属性和事件
在 Vue 3 中，你可以通过传递参数来自定义 `v-model` 的 prop 和事件名称。例如，使用 `v-model:title` 来绑定 `title` prop，并监听 `update:title` 事件：
\<!-- CustomInput.vue --\>
\<template\>
\<input :value="title" @input="$emit('update:title', $event.target.value)"\>
\</template\>
\<script\>
export default \{
props: ['title']
\};
\</script\>
在父组件中使用：
\<template\>
\<div\>
\<CustomInput v-model:title="title"\>\</CustomInput\>
\<p\>Title is: \{\{ title \}\}\</p\>
\</div\>
\</template\>
\<script\>
import CustomInput from './CustomInput.vue';
export default \{
components: \{
CustomInput
\},
data() \{
return \{
title: ''
\};
\}
\};
\</script\>
结论
`v-model` 是 Vue 中实现双向数据绑定的强大工具，不仅可以用于表单元素，也可以用于自定义组件。通过了解其在 Vue 2 和 Vue 3 中的不同实现方式，可以更加灵活地使用 `v-model` 来满足各种开发需求。

:::
