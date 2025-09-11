---
title: 最小可用的 TanStack Query 集成（Next.js 14 · App Router · TS）
date: 2025-09-06 14:41:39
tags:
---

---

title: 最小可用的 TanStack Query 集成（Next.js 14 · App Router · TS）
date: 2025-09-06
tags:

- TanStack Query
- React Query
- Next.js 14
- TypeScript

---

## 目标

在**不改动你现有 http 封装**（`http.call` + `api/modules/price.ts`）前提下，最小成本接入 TanStack Query，用于价格趋势这类“读多写少”的数据获取与缓存。

---

## 步骤总览

1. 安装依赖
2. 新增 `QueryProvider` 并在 `app/layout.tsx` 注入
3. 写一个最小的 `usePriceTrend` 查询 Hook
4. 在一个客户端组件里调用展示

> 说明：只给**新增/变更**的文件内容；复杂逻辑在上一行加注释。

---

## 1) 安装

```bash
pnpm add @tanstack/react-query
# 可选：开发工具
pnpm add -D @tanstack/react-query-devtools
```

---

## 2) Provider：在全局注入 QueryClient

**新增：`src/lib/query/QueryProvider.tsx`**

```tsx
"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 可选：开发时打开
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function QueryProvider({ children }: PropsWithChildren) {
  // 复杂逻辑上一行注释：用 useState 确保在客户端持久化一个 QueryClient 单例
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 复杂逻辑上一行注释：避免频繁重复请求，数据 5 分钟内视为新鲜
            staleTime: 5 * 60 * 1000,
            // 复杂逻辑上一行注释：失败最多重试 2 次，指数退避
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
```

**修改：`src/app/layout.tsx`（只贴需要插入的代码）**

```tsx
// ➊ 新增这一行
import QueryProvider from "@/lib/query/QueryProvider";

// ... 省略你的现有代码
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {/* ➋ 用 Provider 包裹全局 */}
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

---

## 3) 查询 Hook：封装价格趋势获取

**新增：`src/features/price-trend/queries.ts`**

```ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { priceApi } from "@/api/modules/price";

// 复杂逻辑上一行注释：以业务语义定义查询 Hook，统一 queryKey 与调用的 API 函数
export function usePriceTrend(gameId: string, stores: string[]) {
  return useQuery({
    // 复杂逻辑上一行注释：queryKey 决定缓存命中；包含关键入参
    queryKey: ["priceTrend", gameId, stores],
    // 复杂逻辑上一行注释：交给领域 API，返回 Promise<any>
    queryFn: () => priceApi.getTrend({ gameId, stores }),
    // 复杂逻辑上一行注释：没有必要参数时不发起请求
    enabled: Boolean(gameId) && stores.length > 0,
    // 可选：覆盖全局默认值
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
```

> 你之前已经有 `priceApi.getTrend`，这里直接复用即可。

---

## 4) 页面示例：客户端组件中使用

**新增：`src/app/price-trend-demo/page.tsx`（最小可跑 Demo 页）**

```tsx
"use client";

import { useState } from "react";
import { usePriceTrend } from "@/features/price-trend/queries";

export default function PriceTrendDemoPage() {
  const [gameId, setGameId] = useState("wukong");
  const [stores, setStores] = useState<string[]>(["Steam", "Epic"]);

  const { data, isLoading, error, refetch } = usePriceTrend(gameId, stores);

  return (
    <div className="p-4 space-y-3">
      <div className="flex gap-2 items-center">
        <input
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="gameId"
          className="border px-2 py-1 rounded"
        />
        <button
          // 复杂逻辑上一行注释：演示手动刷新（一般可不需要，TanStack 会按策略自动刷新）
          onClick={() => refetch()}
          className="px-3 py-1 rounded border"
        >
          Refresh
        </button>
      </div>

      {isLoading && <div>加载中...</div>}
      {error && (
        <div className="text-red-600">出错了：{(error as any)?.message}</div>
      )}

      <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
```

> 想接上图表时，把 `data` 交给你的图表组件即可；后续可以把 `stores` 做成可搜索多选，与你主页筛选一致。

---

## 可选：SSR 预取（以后再加）

最小集成里我们**不做 SSR**，直接用客户端渲染即可；若将来需要 SSR/Hydration，可用 `@tanstack/react-query` 的 `dehydrate/hydrate` 在 Server Component 里预取数据、在 Client 端复水。等你需要时我再给“最小 SSR 版本”的差异补丁即可。

下面给你**Vue 3 最小可用示例**（基于 `@tanstack/vue-query`，不改你的 http 封装与 `priceApi`）。只包含**必要的新文件/改动**；复杂逻辑已在上一行加注释。

---

### 1) 安装

```bash
pnpm add @tanstack/vue-query
# 可选：开发工具
pnpm add -D @tanstack/vue-query-devtools
```

---

### 2) 全局注册 Vue Query 插件

**新增：`src/plugins/vue-query.ts`**

```ts
// 复杂逻辑上一行注释：创建全局 QueryClient，设定默认缓存/重试策略
import {
  QueryClient,
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 复杂逻辑上一行注释：5 分钟内视为新鲜，避免频繁请求
      staleTime: 5 * 60 * 1000,
      // 复杂逻辑上一行注释：失败自动重试 2 次，指数退避
      retry: 2,
      // 聚焦窗口时不强制刷新（按需可改为 true）
      refetchOnWindowFocus: false,
    },
  },
});

export function installVueQuery(app: import("vue").App) {
  const options: VueQueryPluginOptions = { queryClient };
  app.use(VueQueryPlugin, options);
  // 可选：开发工具
  // if (import.meta.env.DEV) {
  //   const { VueQueryDevtools } = await import('@tanstack/vue-query-devtools')
  //   app.use(VueQueryDevtools, { initialIsOpen: false })
  // }
}
```

**修改：`src/main.ts`（只贴需要新增的行）**

```ts
import { createApp } from "vue";
import App from "./App.vue";

// + 新增：注册 Vue Query 插件
import { installVueQuery } from "@/plugins/vue-query";

const app = createApp(App);
installVueQuery(app);
app.mount("#app");
```

---

### 3) 查询 Hook（Composable）

**新增：`src/features/price-trend/usePriceTrend.ts`**

```ts
// 复杂逻辑上一行注释：以业务语义封装 useQuery，统一 queryKey 与调用的 API
import { useQuery } from "@tanstack/vue-query";
import { priceApi } from "@/api/modules/price";

export function usePriceTrend(gameId: string, stores: string[]) {
  return useQuery({
    // 复杂逻辑上一行注释：queryKey 决定缓存命中；包含关键入参
    queryKey: ["priceTrend", gameId, stores],
    // 复杂逻辑上一行注释：交给领域 API，返回 Promise
    queryFn: () => priceApi.getTrend({ gameId, stores }),
    // 复杂逻辑上一行注释：参数不全时不发起请求
    enabled: Boolean(gameId) && stores.length > 0,
    // 可选：覆盖默认策略
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
```

> 这里直接复用你已有的 `priceApi.getTrend`（基于 `http.call`）。

---

### 4) 最小页面示例（组件中使用）

**新增：`src/views/PriceTrendDemo.vue`**

```vue
<script setup lang="ts">
import { ref } from "vue";
import { usePriceTrend } from "@/features/price-trend/usePriceTrend";

const gameId = ref("wukong");
const stores = ref<string[]>(["Steam", "Epic"]);

const { data, isLoading, error, refetch } = usePriceTrend(
  gameId.value,
  stores.value
);
</script>

<template>
  <div class="p-4 space-y-3">
    <div class="flex gap-2 items-center">
      <input
        v-model="gameId"
        placeholder="gameId"
        class="border px-2 py-1 rounded"
      />
      <button class="px-3 py-1 rounded border" @click="refetch()">
        Refresh
      </button>
    </div>

    <div v-if="isLoading">加载中...</div>
    <div v-else-if="error" class="text-red-600">
      出错了：{{ (error as any)?.message }}
    </div>

    <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto"
      >{{ JSON.stringify(data ?? null, null, 2) }}
    </pre>
  </div>
</template>
```

> 路由按你的项目来：例如在 `vue-router` 里把该组件挂到 `/price-trend-demo`。

---

#### 可选：当 `gameId/stores` 在页面中会变更时

把 `usePriceTrend(gameId.value, stores.value)` 改成**侦听式**：

```ts
const { data, isLoading, error, refetch } = usePriceTrend(
  // 复杂逻辑上一行注释：传入原始值即可；依赖变化时 useQuery 会按 key 缓存/重取
  gameId.value,
  stores.value
);
```

若你希望**自动**随着 `gameId/stores` 的变更而刷新，可在外层 `watch([gameId, stores], refetch)`；不过通常让 `queryKey` 变化即可自动生效（会根据 key 命中缓存或重新请求）。

---

### 5) 与你现有封装的关系

- **无需修改** `http.call` / `client.ts` / `cancel.ts`；Vue Query 只是把“请求何时发起、如何缓存/重试/并发合并”的**状态机**托管出去。
- 其他简单页面仍可直接用 `http.get/post` 或 `http.call`。把 **“读多写少、复用度高”的接口**（比如价格趋势、列表）逐步迁到 Vue Query 即可，**按需引入**、零破坏。

如果你需要 **SSR（Nuxt 3）** 的最小示例或 **分页/无限滚动** 的 Query 示例，我也可以在此基础上给出只含必要代码的增量补丁。
