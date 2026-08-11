---
title: "请求缓存composable"
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
description: "⚠️ 监听 loginid 变化 1. 若缓存已有数据，直接复用，避免重复请求 2. 若无数据，则发请求拉取，并在返回时写入缓存 先占位，防止并发场景下同一 loginid 多次请求 当接口返回后同步更新缓存 始终取当前 loginid 对应记录，保证响应式 ⚠️ 组合首尾固定选。"
sidebarWeight: 158
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/请求缓存composable.md"
---
::: v-pre

# 请求缓存composable

> 本节目标：理解“请求缓存composable”的核心思路，并能把它用于实际开发或面试表达。
```
import { shallowRef, computed, watchEffect, watch, unref, type MaybeRef } from 'vue'
import { useFetchListData } from '@/composables'
export const firstOption = { label: 'Favorites', value: 'favorites' }
export const lastOption = { label: 'All', value: '' }
const cache = shallowRef<
  Record<string, { loading: boolean; list: { label: string; value: string }[] }>
>({})
export function useSymbolType(loginid: MaybeRef<string>) {
  const idRef = computed(() => unref(loginid))
  /*
   *
```

⚠️ 监听 `loginid` 变化
   `* 1.` 若缓存已有数据，直接复用，避免重复请求
   `* 2.` 若无数据，则发请求拉取，并在返回时写入缓存

```
   */
  watch(
    idRef,
    (id) => {
      if (!cache.value[id]) {
        //
```

先占位，防止并发场景下同一 `loginid` 多次请求

```
        cache.value[id] = { loading: true, list: [] }
        const { data, loading } = useFetchListData<{ id: number; title: string }[]>({
          url: '/api/trade/get_type_list',
          params: { loginid: id },
        })
        //
```

当接口返回后同步更新缓存

```
        watchEffect(() => {
          if (data.value) {
            cache.value[id] = {
              loading: loading.value,
              list: data.value.map(({ title }) => ({ label: title, value: title })),
            }
          }
        })
      }
    },
    { immediate: true },
  )
  //
```

始终取当前 `loginid` 对应记录，保证响应式

```
  const record = computed(() => cache.value[idRef.value])
  return {
    loading: computed(() => record.value.loading),
    //
```

⚠️ 组合首尾固定选项，形成完整下拉列表

```
    options: computed(() => [firstOption, ...record.value.list, lastOption]),
  }
}
```

:::
