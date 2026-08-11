---
title: "vue3 import报错：has no default export"
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
description: "在 vue3 项目 ts 写法报错组件没有默认导出，是因为 Vetur v0.35.0 不支持 vue3 版本，需要下载 Vue Language Features (Volar) v0.29.8 在计算属性上使用toRef取可选属性时，将失去响应性。"
sidebarWeight: 55
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/vue3 import报错：has no default export.md"
---
::: v-pre

# vue3 import报错：has no default export

> 本节目标：理解“vue3 import报错：has no default export”的核心思路，并能把它用于实际开发或面试表达。
在`vue3`项目`ts`写法报错组件没有默认导出，是因为`Vetur-v0.35.0`不支持`vue3`版本，需要下载`Vue Language Features (Volar)-v0.29.8`

```
<template>
     <MyHeader></MyHeader>
</template>
<script setup lang="ts">
import MyHeader from "../components/MyHeader.vue";
</script>
```

在计算属性上使用toRef取可选属性时，将失去响应性；

:::
