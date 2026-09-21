---
title: "Ref,reactive,shallowRef"
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
description: "ref([]) ：深层响应式，会跟踪数组本身和内部元素变化。push / splice 会自动触发 UI 更新。 reactive([]) ：和 ref([]) 类似，也是深层响应式，数组内部变化会触发 UI 更新。 shallowRef([]) ：只跟踪 .value 这个引用。"
sidebarWeight: 137
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Ref,reactive,shallowRef.md"
---
::: v-pre

# Ref,reactive,shallowRef

> 本节目标：理解“Ref,reactive,shallowRef”的核心思路，并能把它用于实际开发或面试表达。
- **ref([])**：深层响应式，会跟踪数组本身和内部元素变化。push / splice 会自动触发 UI 更新。
- **reactive([])**：和 ref([]) 类似，也是深层响应式，数组内部变化会触发 UI 更新。
- **shallowRef([])**：只跟踪 .value 这个引用本身，不跟踪内部元素变化。
    - 如果只是 .value.push()、.value.splice() 等修改数组内部数据，不会触发 UI 更新。
    - 必须调用 **triggerRef()** 来手动触发更新，或者直接替换 .value 才会更新 UI。

:::
