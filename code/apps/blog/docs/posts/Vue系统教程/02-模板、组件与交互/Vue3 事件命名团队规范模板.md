---
title: "Vue3 事件命名团队规范模板"
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
description: "Vue 3 事件命名规范 1. 基本原则 JS 中触发事件（emit）使用 camelCase（小驼峰） 父组件模板中监听事件使用 kebab case（短横线） 事件名 必须语义化 ，避免 click1 、 changeData 这种模糊命名 不允许大写字母开头，防止和组件名冲。"
sidebarWeight: 108
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/自定义事件/Vue3 事件命名团队规范模板.md"
---
::: v-pre

# Vue3 事件命名团队规范模板

> 本节目标：理解“Vue3 事件命名团队规范模板”的核心思路，并能把它用于实际开发或面试表达。
# Vue 3 事件命名规范
## 1. 基本原则
- ****JS 中触发事件（emit）使用 camelCase（小驼峰）****
- ****父组件模板中监听事件使用 kebab-case（短横线）****
- 事件名****必须语义化****，避免 `click1`、`changeData` 这种模糊命名
- 不允许大写字母开头，防止和组件名冲突
- 避免与 Vue 内置事件（`click`、`input` 等）同名
---
## 2. 命名规则
|   |   |   |   |
|---|---|---|---|
|**类型**|**JS emit 命名**|**模板监听命名**|**示例**|
|动作事件|camelCase|kebab-case|emit('formSubmit') → @form-submit="..."|
|状态更新（v-model 协议）|update:属性名|update:属性名（kebab-case）|emit('update:modelValue') → @update:model-value="..."|
|模块作用域事件|模块名+动作|模块名-动作|emit('userLogin') → @user-login="..."|

## 3. 命名建议
1. ****动作类事件**** → 使用动词开头，表达执行了什么操作
   - ✅ `submitForm` → `@submit-form`
   - ✅ `loadData` → `@load-data`
   - ❌ `form`、`data`（没有动作语义）
2. ****状态变更事件**** → 使用 `update:` 前缀
   - ✅ `update:modelValue`
   - ✅ `update:currentPage`
   - ❌ `modelValueChange`（不符合 v-model 协议）
3. ****模块作用域**** → 模块名+动作
   - ✅ `userLogin` → `@user-login`
   - ✅ `menuSelect` → `@menu-select`
4. ****避免歧义****：事件名应能从字面理解触发时机，不要依赖上下文猜测。
---
## 4. 示例
```vue
<!-- 子组件 Child.vue -->
<script setup>
const emit = defineEmits(['formSubmit', 'update:modelValue', 'menuSelect'])
function handleSubmit() {
  emit('formSubmit', { name: '张三' })
}
function selectMenu(menuId) {
  emit('menuSelect', menuId)
}
</script>
<template>
  <button @click="handleSubmit">提交</button>
</template>
```
```vue
<!-- 父组件 Parent.vue -->
<template>
  <Child
    @form-submit="onFormSubmit"
    @update:model-value="(val) => (formValue = val)"
    @menu-select="onMenuSelect"
  />
</template>
```
---
## 5. 审查要求
- ****Code Review 阶段****，发现以下情况必须修改：
  1. 模板中监听事件使用了 camelCase
  2. emit 的事件名与监听的事件名风格不一致
  3. 事件名语义不明确
---
✅ ****记忆口诀****
\> emit 驼峰，监听短横；动作用动词，状态用 update:；模块要加前缀。
---
如果你愿意，我可以帮你配一个 ****正则检查规则****，让项目在提交代码时自动校验事件命名是否符合规范，这样团队就不会有人写错。
你要我帮你配吗？这样结合 ESLint/Husky 就能强制执行规范。

:::
