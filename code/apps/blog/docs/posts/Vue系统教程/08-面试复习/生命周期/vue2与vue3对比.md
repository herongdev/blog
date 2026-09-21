---
title: "vue2与vue3对比"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "注意： beforeDestroy和destroyed这两个生命周期已经废弃，代替对应的生命周期分别是beforeUnmount和unmouted。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/生命周期/vue2与vue3对比.md"
---
::: v-pre

# vue2与vue3对比

> 本节目标：理解“vue2与vue3对比”的核心思路，并能把它用于实际开发或面试表达。
```
**一、生命周期****-vue2.0** **和****Vue3.0** **生命周期的区别**
```

|
|
```
**Vue2**
```
```
**Vue3**
```
```
beforeCreate
```
```
setup
```
```
created
```
```
setup
```
```
beforeMount
```
```
onBeforeMount
```
```
mounted
```
```
onMounted
```
```
beforeUpdate
```
```
onBeforeUpdate
```
```
updated
```
```
onUpdated
```
```
beforeDestroy
```
```
onBeforeUnmount
```
```
destroyed
```
```
onUnmounted
```
```
activated
```
```
onActivated
```
```
deactivated
```
```
onDeactivated
```

注意：
beforeDestroy和destroyed这两个生命周期已经废弃，代替对应的生命周期分别是beforeUnmount和unmouted

:::
