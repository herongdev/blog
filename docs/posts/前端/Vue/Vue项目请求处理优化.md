---
title: Vue项目pinia中的Store中的请求时机管理
date: 2025-09-05 18:07:15
tags: [store请求]
---

现在的我的 vue+vite+pinia 项目有个问题，我的有些请求，我在 store 中就直接调用，但 store 的执行时机很早，这时用户可能没有登录，发出这些需要 token 的请求是不合适的，但如果我们把请求放到具体页面中，那每个页面都要请求，违背了我们放入 store 中的初衷，如何处理？

**核心结论**：

> **把“请求放在 Store”与“何时触发请求”解耦**。
> 数据仍由 Pinia Store 管，但所有“首次加载/刷新”的触发统一由**受保护布局(ProtectedLayout)**或**集中启动钩子**在“已登录且当前路由需要鉴权”时一次性触发。
> 请求层（Axios 封装）负责：自动带 Token、401 统一刷新/重试、（可选）对标记 `auth` 的请求在无 Token 时直接拒绝。

## 路由：只给受保护页面打上 `requiresAuth`

**修改位置：`src/router/index.ts`**

```ts
// 在需要登录的路由上增加 meta.requiresAuth
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/pages/dashboard/index.vue'),
  meta: { requiresAuth: true }
}
```

## 受保护布局：只在“已登录 && 受保护路由”时触发各 Store 的初始化

**新增文件：`src/composables/useAppBootstrap.ts`**

```ts
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useXStore } from "@/stores/x"; // 你的其他数据模块按需引入

export function useAppBootstrap() {
  const router = useRouter();
  const auth = useAuthStore();
  const user = useUserStore();
  const x = useXStore();

  // 复杂逻辑：仅在“已登录 && 当前路由需要鉴权”时做一次性初始化（可幂等）
  watch(
    [
      () => auth.isAuthenticated,
      () => router.currentRoute.value.meta.requiresAuth,
    ],
    async ([ok, need]) => {
      if (ok && need) {
        // 复杂逻辑：各 store 的 init() 必须“幂等”，重复调用不重复发请求
        await Promise.all([user.init(), x.init()]);
      }
    },
    { immediate: true }
  );
}
```

**在你的受保护布局/根布局里调用（例如 `src/layouts/ProtectedLayout.vue`）**：

```ts
// <script setup>
// 复杂逻辑：在受保护布局挂载时调用集中引导
import { useAppBootstrap } from "@/composables/useAppBootstrap";
useAppBootstrap();
// </script>
```

> 如果你没有单独的布局文件，可以在 `App.vue` 里根据 `route.meta.requiresAuth` 切出一个“受保护区域”再调用 `useAppBootstrap()`。

---

## Store：移除“定义即请求”的副作用，提供幂等 `init()`

**修改位置：`src/stores/user.ts`（示例）**

```ts
// 删除：顶层的立即请求（例如 defineStore 里一创建就 fetch 的代码）

// 新增：幂等 init()
let _initPromise: Promise<void> | null = null;

export const useUserStore = defineStore("user", () => {
  const profile = ref<User | null>(null);

  // 复杂逻辑：单例 Promise，保证多处调用只触发一次真实请求
  async function init() {
    if (_initPromise) return _initPromise;
    _initPromise = (async () => {
      if (profile.value) return;
      const { data } = await http.get("/me", { meta: { auth: true } });
      profile.value = data;
    })();
    return _initPromise;
  }

  // 可选：在登出时清理，便于下次重新 init
  function reset() {
    profile.value = null;
    _initPromise = null;
  }

  return { profile, init, reset };
});
```

> 你的其他 Store（如 `x.ts`、`projects.ts` 等）都按这个\*\*“删除副作用 + 提供幂等 init()”\*\*的模式改一遍。

---

## 请求层：自动带 Token、401 统一刷新并队列重试、无 Token 阻断受保护请求

**修改位置：`src/http/axios.ts`（或你的请求封装文件）**

**（1）扩展 Axios 类型，支持 `meta.auth` 与 `_retry`**

```ts
// 复杂逻辑：为请求增加自定义元信息与重试标记
declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: { auth?: boolean };
    _retry?: boolean;
  }
}
```

**（2）请求拦截：自动加 Authorization；无 Token 且需要鉴权时直接拒绝**

```ts
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

export const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE });

http.interceptors.request.use((config) => {
  const auth = useAuthStore();

  // 复杂逻辑：仅对标记了 meta.auth 的请求自动带 token
  if (config.meta?.auth) {
    if (!auth.token) {
      // 复杂逻辑：阻断未登录时的鉴权请求（避免在 /user/login 等页面误发）
      return Promise.reject(new Error("AUTH_REQUIRED"));
    }
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${auth.token}`,
    };
  }
  return config;
});
```

**（3）响应拦截：统一处理 401，带刷新队列（避免并发多次刷新）**

```ts
let refreshing = false;
let waitQueue: Array<() => void> = [];

http.interceptors.response.use(
  (r) => r,
  async (error) => {
    const auth = useAuthStore();
    const { response, config } = error || {};
    if (response?.status === 401 && config && !config._retry) {
      // 复杂逻辑：给当前请求打 _retry，防止递归
      config._retry = true;

      if (!refreshing) {
        refreshing = true;
        try {
          await auth.refreshToken(); // 你在 auth store 中实现这个方法
          refreshing = false;
          // 复杂逻辑：刷新成功后，放行所有队列中的请求
          waitQueue.splice(0).forEach((fn) => fn());
          return http(config);
        } catch (e) {
          refreshing = false;
          // 复杂逻辑：刷新失败，清空队列并跳转登录
          waitQueue.splice(0).forEach((fn) => fn());
          auth.logout();
          router.replace({
            name: "login",
            query: { redirect: router.currentRoute.value.fullPath },
          });
          return Promise.reject(e);
        }
      }

      // 复杂逻辑：如果正在刷新，把当前请求加入队列，等待刷新完成后重试
      return new Promise((resolve, reject) => {
        waitQueue.push(() => http(config).then(resolve).catch(reject));
      });
    }
    return Promise.reject(error);
  }
);
```

---

## Auth Store：提供 `isAuthenticated`、`refreshToken()`、`logout()`

**修改位置：`src/stores/auth.ts`**

```ts
export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const refresh = ref<string | null>(null);

  // 复杂逻辑：派生登录态，集中判断是否有有效 token
  const isAuthenticated = computed(() => !!token.value);

  async function setToken(t: string, r?: string) {
    token.value = t;
    if (r) refresh.value = r;
  }

  async function refreshToken() {
    // 复杂逻辑：用 refresh_token 换新 token，失败则抛错
    const { data } = await axios.post("/auth/refresh", {
      refresh_token: refresh.value,
    });
    token.value = data.access_token;
    refresh.value = data.refresh_token ?? refresh.value;
  }

  function logout() {
    token.value = null;
    refresh.value = null;
    // 复杂逻辑：通知其他 store 清空并重置 init()
    useUserStore().reset();
    // 其他 store 同理按需 reset()
  }

  return { token, isAuthenticated, setToken, refreshToken, logout };
});
```

---

## 登录成功后：只需设置 token 并跳转，初始化会自动发生

**修改位置：`/user/login` 提交成功回调处**

```ts
// 复杂逻辑：写入 token 并跳到受保护路由；受保护布局会自动触发所有 store.init()
await authStore.setToken(res.access_token, res.refresh_token);
router.replace((route.query.redirect as string) || "/");
```

---

## 为什么这是“最佳做法”

1. **单一职责清晰**：Store 只做“状态与方法”，不在定义期发请求；“什么时候发”交给受保护布局的引导钩子统一触发。
2. **避免重复请求**：`init()` 使用**单例 Promise**，多次调用只会发一次请求。
3. **页面无侵入**：页面无需关心是否登录、是否首发，页面只消费 Store 的 state。
4. **错误集中处理**：401 统一刷新与队列重试，避免因并发导致多次刷新或脏状态。
5. **登录页零干扰**：登录页不再误发需要 Token 的请求；即使误调，Axios 层也会拦截并拒绝。
6. **易扩展**：新增数据域时，只需在受保护引导中 `store.init()` 一行接入。

---

如果你愿意，我可以基于你当前的目录结构，把上述“幂等 init + 受保护布局引导 + Axios 刷新队列”的改动**逐个落到你的具体文件**（只贴需要改的片段）。你把相关文件名和关键片段贴给我就行。
