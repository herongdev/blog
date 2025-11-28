---
title: Axios 鉴权最佳实践：prefix + useAuth 显式开关（含最小改动补丁）
date: 2025-09-06 16:20:26
tags:
---

## 目标

- 保留按前缀（如 `/api/pub`）**自动放行**的白名单机制；
- 支持**逐请求显式关闭鉴权**（即便该接口不在白名单里）；
- 避免与 Axios 自带的 `config.auth`（Basic Auth）混淆；
- 兼容历史 `(req as any).auth` 写法，**渐进迁移**到 `useAuth`。

## 方案总览

1. **类型扩展**：给 `AxiosRequestConfig` 增加 `useAuth?: boolean`。
2. **对象式入口透传**：`http.call({... useAuth })` 直达拦截器。
3. **拦截器优先级**：优先读 `useAuth` → 回退老的 `auth` → 再按前缀与实例默认值判定。
4. **显式移除头**：当不需要鉴权时，从请求头里**删除** `Authorization`，避免误带默认 token。
5. **调用方式**：`http.get/post(..., { useAuth:false })` 或 `http.call({ useAuth:false })`。

---

## 关键改动（最小补丁）

### 1) 扩展 Axios 配置

> 避免与 Basic Auth 的 `config.auth` 冲突，用单独的 `useAuth`。

```ts
// src/types/http/axios.d.ts
declare module "axios" {
  export interface AxiosRequestConfig {
    /** 覆盖实例默认鉴权：true=强制带token；false=强制不带token */
    useAuth?: boolean;
  }
}
```

### 2) 对象式入口支持 `useAuth`

```ts
// src/lib/http/types.ts（RequestOptions 中新增）
useAuth?: boolean
```

```ts
// src/lib/http/call.ts（buildAxiosConfigFromOptions 末尾透传）
if (typeof (options as any).useAuth === "boolean") {
  (cfg as any).useAuth = (options as any).useAuth;
}
```

### 3) 请求拦截器：判定与显式移除头

```ts
// src/lib/http/client.ts（拦截器内替换判定片段）

// 1) 优先 useAuth，回退旧的 auth
const explicitAuth =
  typeof (req as any).useAuth === "boolean"
    ? (req as any).useAuth
    : typeof (req as any).auth === "boolean"
    ? (req as any).auth
    : undefined;

const needAuth = explicitAuth ?? (authDefault && !isPublicByPrefix);
const accToken = storage.get(ACCESS_TOKEN);
const tokenType = storage.get(TOKEN_TYPE) || "Bearer";

// 2) 不需要鉴权：显式移除 Authorization，避免误带默认头
if (!needAuth) {
  const h = (req.headers || {}) as Record<string, any>;
  delete h.Authorization;
  delete h.authorization;
  req.headers = h;
} else {
  // 需要鉴权但无 token：中断
  if (!accToken) {
    abortController.abort();
    return Promise.reject(new Error("UNAUTHENTICATED"));
  }
  // 需要鉴权且有 token：注入
  req.headers = { ...req.headers, Authorization: `${tokenType} ${accToken}` };
}
```

---

## 调用方式示例

### A) 传统 axios 三参（推荐）

```ts
// 公开接口（不走 /api/pub，但也不需要 token）
await http.get("/api/third/get_login_credential_code", { useAuth: false });

// POST 且不带 token
await http.post("/api/third/login_by_credential", payload, { useAuth: false });
```

### B) 对象式入口

```ts
await http.call({
  url: "/api/third/get_login_credential_code",
  method: "GET",
  useAuth: false,
});

await http.call({
  url: "/api/third/login_by_credential",
  method: "POST",
  data: payload,
  useAuth: false,
});
```

---

## 兼容与迁移

- 旧代码里的 `(req as any).auth = false` 仍可用（拦截器已回退支持），但**建议逐步统一到 `useAuth`**。
- 仍保留 `publicPrefixes`（如 `/api/pub`）自动放行；`useAuth:false` 仅在**个别不走白名单的公开接口**上使用。

---

## 常见坑

- **不要**再用 `config.auth = false`：那是 Basic Auth，类型不对、语义也不对。
- 如果调用过 `http.setAuthToken` 写了默认头，**不显式移除**就会误带 token；本方案在拦截器中已处理。
- 确保 `tsconfig.json` 的 `include` 覆盖到 `src/types`，让编辑器识别 `useAuth` 类型。

---

## 验收清单

- [ ] `src/types/http/axios.d.ts` 已生效（编辑器能识别 `useAuth`）。
- [ ] `http.call` 能接收 `useAuth` 并透传到拦截器。
- [ ] 拦截器在 `useAuth:false` 时**不发送 Authorization**；在需要鉴权但无 token 时**立即中断**。
- [ ] 现网公开接口（不在 `/api/pub`）能通过 `{ useAuth:false }` 正常调用。

> 结论：这套改动**小而稳**，语义清晰、类型安全，满足“前缀白名单 + 逐请求显式关闭鉴权”的企业级最佳实践。

```
::contentReference[oaicite:0]{index=0}
```
