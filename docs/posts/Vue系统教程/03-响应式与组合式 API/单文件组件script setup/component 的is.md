---
title: "component 的is"
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
description: "在vue3中，内置组件的component 的is属性为什么不能引入在\\<script setup\\ 中引入的组件，被引入的组件也是\\<script setup\\ 这种方式写的 在 Vue 3 中，\\<script setup\\ 是一个新的语法糖，让你能够使用 Compositi。"
sidebarWeight: 65
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/单文件组件script setup/component 的is.md"
---
::: v-pre

# component 的is

> 本节目标：理解“component 的is”的核心思路，并能把它用于实际开发或面试表达。
在vue3中，内置组件的component 的is属性为什么不能引入在\<script setup\>中引入的组件，被引入的组件也是\<script setup\>这种方式写的
在 Vue 3 中，\<script setup\> 是一个新的语法糖，让你能够使用 Composition API 编写更简洁的组件。不过，与传统的 Vue 组件语法有一些区别，所以可能在使用内置组件的 component 的 is 属性时，出现问题。要解决这个问题，请尝试以下步骤：

确保在 \<script setup\> 中正确导入组件。如果使用 import 语句，确保组件已正确导出。例如：
// ChildComponent.vue
\<script setup\>
export default \{\}
\</script\>
// ParentComponent.vue
\<script setup\>
import ChildComponent from './ChildComponent.vue'
\</script\>

对于使用 \<script setup\> 的组件，不能直接使用 is 属性来动态引入组件。但是，你可以将被引入的组件定义为 ref 对象，然后使用 v-is 指令实现动态引入。例如，在父组件中：
// ParentComponent.vue
\<script setup\>
import \{ ref \} from 'vue'
import ChildComponent from './ChildComponent.vue'

const componentRef = ref(ChildComponent)
\</script\>
使用 v-is 指令在父组件中引入子组件：
\<template\>
\<component v-is="componentRef"\>\</component\>
\</template\>
这样，就可以在父组件中使用 Composition API 的 \<script setup\> 语法引入一个子组件。

:::
