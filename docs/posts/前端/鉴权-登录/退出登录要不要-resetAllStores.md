---
title: 退出登录要不要 resetAllStores
date: 2025-09-05 20:45:33
tags: [Pinia, Vue Router, 退出登录, 副作用控制]
---

## 结论

- **应该保留 `resetAllStores()`**（避免残留用户数据/权限态），但**直接在登出时先重置**会触发一堆 `watchEffect` / `watch` 的依赖变化，从而在组件卸载前**又发出请求**。
- 正确做法：**先撤鉴权与在途请求 → 跳公开页卸载组件 → 最后再 `resetAllStores()`**；同时在页面副作用里用 `isAuthenticated`/`isLoggingOut` 做**登录短路**。

## 推荐顺序（一眼抄）

1. **标记登出中**（`isLoggingOut = true`）
2. **取消所有在途请求**（`http.cancelAll()`）
3. **清鉴权**（`http.setAuthToken(null)` + 清本地 `ACCESS_TOKEN/TOKEN_TYPE` + 清内存 `token`）
4. **跳到公开路由**（`router.replace('/user')`）
5. **最后** `resetAllStores()`
6. **清掉登出标记**（`isLoggingOut = false`）

## 仅需修改的代码片段

### A) `auth` Store：按顺序登出（在 store 内部做跳转，保证顺序）

```ts
// 新增
import { useRouter } from "vue-router";

// 新增
const isLoggingOut = ref(false);
```

```ts
// 调整 logout（顺序：撤鉴权→跳公开页→reset）
async function logout() {
  const router = useRouter();
  try {
    isLoggingOut.value = true;
    await http.post("/api/pub/loginOut").catch(() => {});

    // 复杂逻辑：统一掐断飞行中的请求，避免“卸载前再打一次”
    http.cancelAll?.();

    // 复杂逻辑：清鉴权（默认头 + 本地存储 + 内存）
    http.setAuthToken?.(null);
    storage.remove(ACCESS_TOKEN);
    storage.remove(TOKEN_TYPE);
    token.value = null;
    refresh.value = null;

    // 复杂逻辑：先跳到公开页，卸载受保护组件，阻断其副作用
    await router.replace({ name: "user" });

    // 复杂逻辑：组件已卸载，再重置所有 store，安全不抖动
    resetAllStores();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    isLoggingOut.value = false;
  }
}
```

> 这样**无需**在组件里再 `router.push('/user')`；如果你保留组件层跳转，记得删除那一行以免重复。

---

### B) 页面副作用：加“登录短路”（防抖再保险）

> 示例：你在 `public/dashboard` 页和分析卡片里原来用 `watchEffect` 拉数据。

```ts
// 复杂逻辑：登出过程/未登录时直接短路，不发请求
import { useAuthStore } from '@/plugins'
import { storeToRefs } from 'pinia'
const { isAuthenticated, isLoggingOut } = storeToRefs(useAuthStore())

watch(/* 精确依赖或 isAuthenticated */ , () => {
  if (!isAuthenticated.value) return
  if (isLoggingOut?.value) return
  // 这里再发请求
}, { immediate: true })
```

> 说明：**副作用短路 + A 部分的顺序**，两层兜底，基本杜绝“退出时还在请求”。

---

## 什么时候可以“不 resetAllStores”？

- 仅在**演示/临时**场景；正式项目**不建议**。不重置会遗留：上一个用户的**列表数据、选择态、分页、缓存**等，存在隐私与越权风险。

---

## 小结

- **不是不要 `resetAllStores()`，而是要把它放在最后**，并在副作用处加“登录短路”。
- 真正能解决“跳转后还在请求”的，是**顺序**（撤鉴权 → 跳公开页 → 重置）+ **取消在途** + **副作用短路**。
