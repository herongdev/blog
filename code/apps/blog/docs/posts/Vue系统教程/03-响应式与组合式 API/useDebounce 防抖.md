---
title: "useDebounce 防抖"
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
description: "在 Vue 3 中给输入添加防抖/节流（基于 @vueuse/core） 想要在输入框中避免每次键入都触发查询请求，推荐使用 @vueuse/core 的 ref 版防抖/节流。两种常用方式如下： 防抖：useDebounce（推荐用于输入搜索） 场景：用户停止输入一段时间后再触。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/Vueuse/useDebounce 防抖.md"
---
::: v-pre

# useDebounce 防抖

> 本节目标：理解“useDebounce 防抖”的核心思路，并能把它用于实际开发或面试表达。
### 在 Vue 3 中给输入添加防抖/节流（基于 @vueuse/core）
想要在输入框中避免每次键入都触发查询请求，推荐使用 @vueuse/core 的 ref 版防抖/节流。两种常用方式如下：

### 防抖：useDebounce（推荐用于输入搜索）
- 场景：用户停止输入一段时间后再触发（例如 300ms）。
- 优点：避免频繁请求，体验自然。
```vue
<template>
  <a-input v-model:value="innerKeyword" allowClear :placeholder="t('search')" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
const keyword = defineModel<string>('keyword', { default: '' }) // 对外暴露的值
const innerKeyword = ref(keyword.value) // 输入框内部值
// 300ms 防抖后的只读 ref
const debouncedKeyword = useDebounce(innerKeyword, 300)
// 仅在防抖后的值变化时，同步回外部
watch(debouncedKeyword, (val) => {
  keyword.value = val
})
</script>
```
- 解释：`useDebounce(innerKeyword, 300)` 返回一个“防抖后的 ref”。只有当 `innerKeyword` 在 300ms 内不再变化，`debouncedKeyword` 才更新。我们监听它再同步到外层的 `keyword`。
### 节流：useThrottle（固定节奏触发）
- 场景：希望按固定间隔触发（例如每 300ms 最多触发一次）。
```ts
import { useThrottle } from '@vueuse/core'
const throttledKeyword = useThrottle(innerKeyword, 300)
watch(throttledKeyword, (val) => {
  keyword.value = val
})
```
### 函数版防抖：useDebounceFn（适合控制副作用调用）
- 场景：你想“防抖调用某个函数”，而不是“防抖一个 ref”。
```ts
import { useDebounceFn } from '@vueuse/core'
import { watch } from 'vue'
const debounceSearch = useDebounceFn((val: string) => {
  // 发请求 / 过滤列表 / 其他副作用
}, 300)
watch(innerKeyword, (val) => debounceSearch(val))
```
- 可在组件卸载时（可选）取消未决调用：
```ts
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  // 某些版本含 cancel，可选调用
  ;(debounceSearch as any).cancel?.()
})
```
### 选择建议
- 输入搜索：优先用“ref 版防抖”`useDebounce`，实现最简单，自动管理生命周期。
- 固定频率：用 `useThrottle`。
- 精细控制函数调用（如立即 flush、错误处理）：用 `useDebounceFn`。

### 实战要点
- Ant Design Vue 的 `a-input` 用 `v-model:value`，不要用 `@change`（接近失焦触发，不适合实时搜索）。
- 防抖时长建议从 300ms 起，根据需求微调。
- 避免形成双向 watch 回环：只监听“防抖后的 ref”去回写外层值即可。

:::
