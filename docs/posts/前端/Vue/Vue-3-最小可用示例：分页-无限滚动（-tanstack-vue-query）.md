---
title: Vue 3 最小可用示例：分页 & 无限滚动（@tanstack/vue-query）
date: 2025-09-06 14:49:38
tags:
---

---

title: Vue 3 最小可用示例：分页 & 无限滚动（@tanstack/vue-query）
date: 2025-09-06
tags:

- Vue3
- TanStack Vue Query
- 分页
- 无限滚动

---

## 前提

已安装并在 `main.ts` 里注册了 `@tanstack/vue-query`（你之前那步已经完成）。下面示例直接复用你的 `http.call` 封装。

---

## 一、页码分页（page/pageSize）

### 1) 组合式函数：`usePagedItems.ts`

```ts
// src/features/demo/usePagedItems.ts
"use client";

import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { http } from "@/lib/http";

// 复杂逻辑上一行注释：后端返回 PageResp 结构（list/total/page/pageSize）
type Item = { id: string; title: string };
type PageResp<T> = { list: T[]; total: number; page: number; pageSize: number };

// 复杂逻辑上一行注释：拉取某页数据的纯函数，便于测试与复用
async function fetchPage(
  page: number,
  pageSize: number
): Promise<PageResp<Item>> {
  return http.call<PageResp<Item>>({
    url: "/api/items",
    method: "GET",
    params: { page, pageSize },
  });
}

export function usePagedItems(initialPageSize = 20) {
  const page = ref(1);
  const pageSize = ref(initialPageSize);

  const query = useQuery({
    // 复杂逻辑上一行注释：将页码作为 queryKey 的一部分，命中不同页的缓存
    queryKey: () => ["items", page.value, pageSize.value],
    // 复杂逻辑上一行注释：当 page 或 pageSize 改变时，自动按新 key 请求/复用缓存
    queryFn: () => fetchPage(page.value, pageSize.value),
    staleTime: 60_000,
    keepPreviousData: true, // 复杂逻辑上一行注释：翻页时保留上一页数据，避免闪烁
  });

  // 复杂逻辑上一行注释：对外暴露翻页方法
  const next = () => {
    page.value += 1;
  };
  const prev = () => {
    page.value = Math.max(1, page.value - 1);
  };
  const setPage = (p: number) => {
    page.value = Math.max(1, p);
  };

  return { page, pageSize, ...query, next, prev, setPage };
}
```

### 2) 组件示例：`PagedList.vue`

```vue
<!-- src/views/PagedList.vue -->
<script setup lang="ts">
import { usePagedItems } from "@/features/demo/usePagedItems";

const { data, isFetching, error, page, next, prev } = usePagedItems(10);
</script>

<template>
  <div class="p-4 space-y-3">
    <div class="flex items-center gap-2">
      <button class="border px-3 py-1 rounded" @click="prev">上一页</button>
      <span>第 {{ page }} 页</span>
      <button class="border px-3 py-1 rounded" @click="next">下一页</button>
    </div>

    <div v-if="isFetching">加载中...</div>
    <div v-else-if="error" class="text-red-600">
      出错：{{ (error as any)?.message }}
    </div>

    <ul v-else class="list-disc pl-5">
      <li v-for="it in data?.list ?? []" :key="it.id">{{ it.title }}</li>
    </ul>
  </div>
</template>
```

---

## 二、无限滚动（cursor/nextCursor）

### 1) 组合式函数：`useInfiniteItems.ts`

```ts
// src/features/demo/useInfiniteItems.ts
"use client";

import { computed } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { http } from "@/lib/http";

type Item = { id: string; title: string };
// 复杂逻辑上一行注释：后端返回游标结构（items + nextCursor），没有更多时 nextCursor 为空/undefined
type CursorResp<T> = { items: T[]; nextCursor?: string | null };

async function fetchByCursor(
  cursor: string | null,
  limit: number
): Promise<CursorResp<Item>> {
  // 复杂逻辑上一行注释：第一页用 null/空串，后续带上 nextCursor
  return http.call<CursorResp<Item>>({
    url: "/api/items/cursor",
    method: "GET",
    params: { cursor, limit },
  });
}

export function useInfiniteItems(limit = 20) {
  const q = useInfiniteQuery({
    queryKey: ["items-infinite", limit],
    // 复杂逻辑上一行注释：pageParam 是上一次 getNextPageParam 返回的值；第一页由 initialPageParam 提供
    queryFn: ({ pageParam }) => fetchByCursor(pageParam ?? null, limit),
    initialPageParam: null as string | null,
    // 复杂逻辑上一行注释：从返回值中取下一页的游标；无则表示到底
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 60_000,
  });

  // 复杂逻辑上一行注释：将多页的 items 扁平合并，便于组件直接渲染
  const flatItems = computed(
    () => q.data.value?.pages.flatMap((p) => p.items) ?? []
  );

  return { ...q, flatItems };
}
```

### 2) 组件示例（IntersectionObserver 自动触底加载）：`InfiniteList.vue`

```vue
<!-- src/views/InfiniteList.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useInfiniteItems } from "@/features/demo/useInfiniteItems";

const { flatItems, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
  useInfiniteItems(15);

const sentinel = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // 复杂逻辑上一行注释：使用 IntersectionObserver 观察“页尾哨兵”，进入视口即加载下一页
  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (e.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
        fetchNextPage();
      }
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );

  if (sentinel.value) observer.observe(sentinel.value);
});

onBeforeUnmount(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value);
  observer = null;
});
</script>

<template>
  <div class="p-4 space-y-3">
    <div v-if="error" class="text-red-600">
      出错：{{ (error as any)?.message }}
    </div>

    <ul class="space-y-2">
      <li v-for="it in flatItems" :key="it.id" class="border rounded p-2">
        {{ it.title }}
      </li>
    </ul>

    <!-- 复杂逻辑上一行注释：页尾“哨兵”元素，用于触发下一页加载 -->
    <div
      ref="sentinel"
      class="h-8 flex items-center justify-center text-gray-500"
    >
      <span v-if="isFetchingNextPage">加载更多...</span>
      <span v-else-if="!hasNextPage">没有更多了</span>
      <span v-else>下拉加载</span>
    </div>

    <!-- 兜底：手动加载更多按钮（可选） -->
    <div class="text-center">
      <button
        class="mt-2 border px-3 py-1 rounded"
        :disabled="!hasNextPage || isFetchingNextPage"
        @click="fetchNextPage()"
      >
        {{
          isFetchingNextPage
            ? "加载中…"
            : hasNextPage
            ? "加载更多"
            : "没有更多了"
        }}
      </button>
    </div>
  </div>
</template>
```

---

## 关键点与小贴士

- **keepPreviousData**：页码分页时避免闪屏；无限滚动用 `useInfiniteQuery` 不需要它。
- **queryKey 设计**：把影响结果的入参（如 `page/pageSize`、`limit/filters`）放进 key，缓存才可命中。
- **getNextPageParam**：返回 `undefined` 代表“没有下一页”；返回游标字符串（或对象）将作为下一次 `pageParam` 传入。
- **触底加载**：`IntersectionObserver` 比 `scroll` 事件更稳、成本更低；确保有合理的 `rootMargin/threshold`。
- **错误重试**：默认会自动重试 2 次（取决于你的全局设置）。对幂等读接口通常是安全的。

需要我把这两个 Demo 接到你现有的某个真实接口（比如你“价格趋势”或“攻略列表”）上，我可以直接给**最小改动的代码片段**。
