---
title: "vue3 setup动态子组件"
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
description: "你可以通过使用动态组件和 import 函数来实现这个需求。 首先，你需要创建一个对象，这个对象将字符串映射到相应的组件文件。 然后，在父组件中根据类型字符串动态地加载子组件。 这里有一个示例说明如何实现这个功能： 创建子组件（例如 ComponentA.vue 和 Compon。"
sidebarWeight: 68
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/单文件组件script setup/vue3 setup动态子组件.md"
---
::: v-pre

# vue3 setup动态子组件

> 本节目标：理解“vue3 setup动态子组件”的核心思路，并能把它用于实际开发或面试表达。
你可以通过使用动态组件和 import 函数来实现这个需求。
首先，你需要创建一个对象，这个对象将字符串映射到相应的组件文件。
然后，在父组件中根据类型字符串动态地加载子组件。

这里有一个示例说明如何实现这个功能：

创建子组件（例如 ComponentA.vue 和 ComponentB.vue）：
ComponentA.vue：
\<template\>
\<div\>Component A\</div\>
\</template\>

\<script setup\>
// Your component logic here
\</script\>

ComponentB.vue：
\<template\>
\<div\>Component B\</div\>
\</template\>

\<script setup\>
// Your component logic here
\</script\>

在父组件中，根据字符串类型动态地加载子组件：
ParentComponent.vue：
\<template\>
\<div\>
\<component :is="dynamicComponent"\>\</component\>
\</div\>
\</template\>

\<script setup\>
import \{ ref, watchEffect \} from 'vue';

// 创建一个对象，将字符串类型映射到相应的组件文件
const componentMap = \{
'component-a': () =\> import('./ComponentA.vue'),
'component-b': () =\> import('./ComponentB.vue'),
\};

// 定义一个响应式的 ref，用于存储当前选择的组件类型
const componentType = ref('component-a'); // 假设它来自一个数据源或用户输入
const dynamicComponent = ref(null);

// 使用 watchEffect 根据 componentType 动态地加载对应的组件
watchEffect(async () =\> \{
const loadComponent = componentMap[componentType.value];
if (loadComponent) \{
dynamicComponent.value = (await loadComponent()).default;
\} else \{
dynamicComponent.value = null;
\}
\});
\</script\>

这样，在 ParentComponent.vue 中，\<component\> 标签的 :is 属性将根据 componentType 的值来动态地加载相应的子组件。当 componentType 的值改变时，子组件会相应地更新。

请注意，为了让这个示例在生产环境中正常工作，你需要配置 Vue 和你的构建工具（例如 Webpack 或 Vite）以支持动态 import() 语法。如果你使用的是 Vue CLI，这应该已经默认支持了。

:::
