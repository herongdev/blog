---
title: "Vue 3 子父组件事件命名最佳实践表"
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
description: "Vue 3 子父组件事件命名最佳实践表 场景 子组件定义 & 触发 (emit) 父组件监听 (模板中) 说明 推荐方式（常用） emit('myEvent') @my event \"handler\" JS 中用 camelCase ，模板中用 kebab case ，保证兼容性。"
sidebarWeight: 106
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/自定义事件/Vue 3 子父组件事件命名最佳实践表.md"
---
::: v-pre

# Vue 3 子父组件事件命名最佳实践表

> 本节目标：理解“Vue 3 子父组件事件命名最佳实践表”的核心思路，并能把它用于实际开发或面试表达。
## Vue 3 子父组件事件命名最佳实践表
|   |   |   |   |
|---|---|---|---|
|**场景**|**子组件定义 & 触发 (emit)**|**父组件监听 (模板中)**|**说明**|
|**推荐方式（常用）**|emit('myEvent')|@my-event="handler"|JS 中用 **camelCase**，模板中用 **kebab-case**，保证兼容性和可读性|
|**全短横线**|emit('my-event')|@my-event="handler"|两边全用 kebab-case，可以，但 JS 不够自然，不建议|
|**全驼峰（不推荐）**|emit('myEvent')|@myEvent="handler"|在模板中写 camelCase **可能失效**，因为模板会转小写匹配，尤其在 DOM 模板中|
|**带命名空间**|emit('formSubmit')|@form-submit="handler"|用短横线分隔多个词，表示模块或功能作用域（推荐）|

### 推荐命名规则
1. ****JS 中 emit****：`camelCase`（如 `myEvent`、`formSubmit`）
2. ****父组件模板监听****：`kebab-case`（如 `@my-event`、`@form-submit`）
3. ****事件是动作**** → 用动词（`submitForm` → `@submit-form`）
4. ****事件是状态变化**** → 用 `update:` 前缀（Vue v-model 协议，例如 `update:modelValue` → `@update:model-value`）
5. 不要用大写字母开头（防止和组件名混淆）

### 实战示例
\<!-- Child.vue --\>
\<script setup\>
const emit = defineEmits(['formSubmit', 'update:modelValue'])
function submit() \{
  emit('formSubmit', \{ name: '张三' \})
\}
function changeValue(val) \{
  emit('update:modelValue', val)
\}
\</script\>
\<template\>
  \<button @click="submit"\>提交\</button\>
\</template\>

\<!-- Parent.vue --\>
\<template\>
  \<Child @form-submit="handleFormSubmit" @update:model-value="(val) =\> (formValue = val)" /\>
\</template\>
\<script setup\>
function handleFormSubmit(data) \{
  console.log('提交数据:', data)
\}
\</script\>

📌 ****总结口诀****
\> ****emit 驼峰，监听短横****
\> 动作用动词，状态用 update:

我建议你在团队中直接制定 ****事件命名规范文档****，这样不会有人在模板里误用 camelCase。
如果你愿意，我可以帮你出一份 ****Vue3 事件命名团队规范模版****，直接可放进项目 README。
这样新同事入项就能快速遵守。

:::
