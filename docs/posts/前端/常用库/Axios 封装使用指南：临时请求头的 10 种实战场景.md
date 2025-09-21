---
title: Axios 封装使用指南：临时请求头的 10 种实战场景
date: 2025-09-18
tags:
  - axios
  - 临时请求头
  - 使用示例
  - 最佳实践
  - TypeScript
  - 作用域管理
categories:
  - Web 前端
---

明白～现在**不改你的封装**，只告诉你在其它地方"怎么用"。我给你**可直接粘贴的调用示例**，涉及到的复杂逻辑我都放在代码上一行评论里了。

---

### 1) 作用域临时头：加 → 用 → 手动清

```ts
import http from "@/libs/http";

// 复杂逻辑：开启一个"作用域"，期间所有请求都会带上这些头
const { clear } = (http as any).useScopedHeaders({
  "X-ENV": "staging",
  "X-TRACE-ID": traceId,
});

await http.get("/api/a");
await http.post("/api/b", payload);

// 复杂逻辑：用完手动清除（之后的请求不再携带这些头）
clear();
```

---

### 2) 推荐写法（更安全）：try/finally 保证一定清除

```ts
import http from "@/libs/http";

const scope = (http as any).useScopedHeaders({ "X-TEAM": "backend" });
try {
  // 复杂逻辑：这段期间发起的请求都会自动带上 X-TEAM
  await http.get("/api/projects");
  await http.post("/api/projects", body);
} finally {
  // 复杂逻辑：无论成功还是异常，最终都清理作用域头，避免"遗留"
  scope.clear();
}
```

---

### 3) 跨模块清除：用 id 传递"钥匙"

```ts
// === A 模块：开启作用域，并把 id 传给 B 模块 ===
import http from "@/libs/http";
export const headerScope = (http as any).useScopedHeaders({
  "X-SESSION": sessionId,
});
// headerScope.id 可被别的模块用来清除

// === B 模块：拿到 id 后清除 ===
import http from "@/libs/http";
import { headerScope } from "./moduleA";

// 复杂逻辑：通过 id 定点清理你想清除的作用域头
(http as any).removeScopedHeadersById(headerScope.id);
```

> 说明：你的封装里 `useScopedHeaders` 返回 `{ id, clear }`，并提供了 `(http as any).removeScopedHeadersById(id)`，方便跨模块释放。

---

### 4) 并发一批请求：开作用域 → `Promise.all` → 清

```ts
import http from "@/libs/http";

const { clear } = (http as any).useScopedHeaders({ "X-BATCH": batchId });
try {
  // 复杂逻辑：这批并发都会带上 X-BATCH
  await Promise.all([
    http.get("/api/a"),
    http.get("/api/b"),
    http.get("/api/c"),
  ]);
} finally {
  clear();
}
```

---

### 5) 只想影响"下一次请求"：`useOnceHeader`

```ts
import http from "@/libs/http";

// 复杂逻辑：仅下一次请求携带这些头；该请求完成后自动恢复；如需撤销可调用 clear()
const { clear } = (http as any).useOnceHeader({ "X-ONCE": "1" });

// 如果临时变卦不想带了：clear()

await http.post("/api/submit", payload); // 只有这一笔会带 X-ONCE
```

---

### 6) 只改"某一笔请求"：`tempHeaders`（无需手动清）

```ts
import http from "@/libs/http";

// 复杂逻辑：仅本次请求追加头，响应后自动失效
await http.call({
  url: "/api/orders",
  method: "POST",
  data: order,
  tempHeaders: {
    "X-REQUEST-ID": requestId,
    "X-FEATURE": "expA",
  },
});
```

---

### 7) 结合"无需鉴权"的公开接口（与你现有 `useAuth:false` 兼容）

```ts
import http from "@/libs/http";

// 复杂逻辑：公开接口 + 临时头只影响本次
await http.call({
  url: "/api/pub/ping",
  method: "GET",
  // 复杂逻辑：明确不走鉴权
  useAuth: false,
  tempHeaders: { "X-Debug": "1" },
});
```

---

### 8) 在 Vue 组件/Hook 中临时加头

```ts
// 复杂逻辑：进入页面时加头，离开页面时自动清除
onMounted(() => {
  const scope = (http as any).useScopedHeaders({ "X-PAGE": "settings" });
  onBeforeUnmount(() => scope.clear());
});
```

---

### 9) 在 Redux/Pinia/服务层中包一层"带头请求"

```ts
// 复杂逻辑：封装一个 helper，传入 headers 与一个任务函数，自动加头并在结束时清理
export async function withHeaders<T>(
  headers: Record<string, string>,
  task: () => Promise<T>
) {
  const scope = (http as any).useScopedHeaders(headers);
  try {
    return await task();
  } finally {
    scope.clear();
  }
}

// 使用
await withHeaders({ "X-ROLE": "admin" }, () => http.get("/api/admin/stats"));
```

---

### 10) 小结（怎么选）

- **只影响一笔请求** → `tempHeaders`（最简单，不用清）。
- **影响一段时间/一批请求** → `useScopedHeaders` + `clear()`（或用 `id` 跨模块清）。
- **只影响下一笔** → `useOnceHeader`（自动清，也可手动 `clear()` 取消）。

这样你在任何地方都能"加头 → 发请求 → 手动清除"，且不需要再调整封装本身。
