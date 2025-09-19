---
title: Axios 封装（完整版）：支持「单次/作用域临时请求头」，可自动清除或手动清除
date: 2025-09-18
tags:
  - axios
  - http
  - 临时请求头
  - 自动清理
  - 拦截器
  - TypeScript
categories:
  - Web 前端
---

## 说明

- 新增能力：
  - `tempHeaders`：**单笔请求**的临时请求头字段（写在请求配置里，优先级最高，响应后自动失效）。
  - `useOnceHeader(headers)`：只对**下一笔请求**附加请求头；**该请求响应后自动清除**；同时**返回 `clear()`** 可手动提前清除。
  - `useScopedHeaders(headers, opts?)`：对**一段时间/作用域内**的所有请求附加请求头；返回 **`clear()`** 手动清除；可传 `autoClearAfterResponse` 与 `match`，实现**命中某次请求后自动清除**。
- 调整点：
  - 所有"临时头"统一在**主请求拦截器的最后一步**合并，确保优先级最高且不被后续逻辑覆盖。
  - 并发安全：`useOnceHeader` 仅影响**首个进入**的请求，命中后立即注销拦截器。

---

## 完整代码

> 直接替换你现有文件内容即可。

```ts
import axios from "axios";
import Cookie from "js-cookie";
import storage from "store";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HttpInstance, ResponseParser } from "./types";
import { buildAxiosConfigFromOptions } from "./call";
import { makeTrackedController, releaseController, cancelAll } from "./cancel";
import { STORAGE_KEYS } from "@/constants";
import { LOGIN_ROUTE } from "@/router/constants";
import {
  codeResponseParser,
  axiosDataFallbackParser,
} from "@/libs/http/parsers";

/** ========= 类型扩展：为单笔请求提供 tempHeaders 字段 ========= */
// 复杂逻辑：为单次请求提供 tempHeaders 扩展字段，优先级最高，仅本次请求生效
declare module "axios" {
  export interface AxiosRequestConfig {
    /** 仅本次请求生效、优先级最高的临时请求头 */
    tempHeaders?: Record<string, string>;
    /** 可选：不使用默认鉴权（已有 useAuth 语义时保持兼容） */
    useAuth?: boolean;
  }
}

const { ACCESS_TOKEN, TOKEN_TYPE, DEVICE_ID } = STORAGE_KEYS;

function createAxiosHttp(
  config: AxiosRequestConfig,
  opts: { authDefault?: boolean; publicPrefixes?: string[] } = {}
): HttpInstance {
  const authDefault = opts.authDefault ?? true;
  const publicPrefixes = opts.publicPrefixes ?? ["/api/pub"];

  const _axios = axios.create(config) as AxiosInstance;

  // 拦截器只注册一次；解析器以"可变数组"存放，setGlobalParser 仅更新此数组
  const __state = {
    parsers: [] as ResponseParser<any, any>[],

    // 复杂逻辑：作用域级临时头（通过 useScopedHeaders 注入，直到 clear() 或自动清除）
    scopedHeaders: [] as Array<{
      id: symbol;
      headers: Record<string, string>;
      match?: (cfg: AxiosRequestConfig) => boolean;
      autoClearAfterResponse?: boolean;
    }>,
  };

  /* ——— 业务增强方法：解析器设置 / Cookie 授权工具 ——— */
  // 只更新解析器数组，不再新增拦截器
  (_axios as any).setGlobalParser = (parsers: ResponseParser<any, any>[]) => {
    __state.parsers = Array.isArray(parsers) ? parsers.slice() : [];
  };
  // 可选同义方法
  (_axios as any).setParsers = (_axios as any).setGlobalParser;
  (_axios as any).setAuthorization = (
    token: string,
    expires: number | Date,
    name?: string
  ) => {
    Cookie.set(name ?? _axios.defaults.xsrfCookieName!, token, { expires });
  };
  (_axios as any).removeAuthorization = (name?: string) => {
    Cookie.remove(name ?? _axios.defaults.xsrfCookieName!);
  };
  (_axios as any).checkAuthorization = (name?: string) => {
    return Boolean(Cookie.get(name ?? _axios.defaults.xsrfCookieName!));
  };

  /* ——— 请求拦截器 ——— */
  _axios.interceptors.request.use((req) => {
    // 将外部 signal 与内部 AbortController 绑定，同时纳入全局取消池
    const abortController = makeTrackedController(
      (req as any).signal as AbortSignal | undefined
    );
    (req as any).signal = abortController.signal;
    (req as any).__abortController = abortController;

    // 根据前缀/开关决定是否附加 Authorization；无 token 且需要鉴权则中断
    const url = req.url || "";
    const isPublicByPrefix = publicPrefixes.some((p) => url.startsWith(p));
    const explicitAuth =
      typeof (req as any).useAuth === "boolean"
        ? (req as any).useAuth
        : undefined;
    const needAuth = explicitAuth ?? (authDefault && !isPublicByPrefix);
    const accToken = storage.get(ACCESS_TOKEN);
    const tokenType = storage.get(TOKEN_TYPE) || "Bearer";
    if (!needAuth) {
      // 明确不需要鉴权时，移除已合并进来的默认 Authorization 头，避免误带 token
      const headers = (req.headers || {}) as Record<string, any>;
      delete headers.Authorization;
      delete headers.authorization;
      req.headers = headers;
    } else {
      if (!accToken) {
        // 需要鉴权但没有 token，直接中断
        abortController.abort();
        return Promise.reject(new Error("UNAUTHENTICATED"));
      }
      // 需要鉴权且有 token，注入 Authorization
      req.headers = {
        ...req.headers,
        Authorization: `${tokenType} ${accToken}`,
      };
    }
    req.headers = { ...req.headers, "device-id": storage.get(DEVICE_ID) };

    // 自动添加 MFA passage key 头（如果存在）
    const mfaPassageKey = (window as any).__MFA_PASSAGE_KEY__;
    if (mfaPassageKey) {
      req.headers = { ...req.headers, "X-PASSAGE-KEY": mfaPassageKey };
    }

    // 复杂逻辑：作用域级临时头合并（支持可选 match 函数）
    if (__state.scopedHeaders.length) {
      for (const sc of __state.scopedHeaders) {
        if (!sc.match || sc.match(req)) {
          req.headers = { ...(req.headers || {}), ...sc.headers };
          // 命中且要求响应后自动清除 → 在响应拦截器处理（此处仅标记）
          const hitList: symbol[] = ((req as any).__scopedHitList ||= []);
          hitList.push(sc.id);
        }
      }
    }

    // 复杂逻辑：单笔请求级临时头（配置里的 tempHeaders，优先级最高）
    const onceHeaders = (req as any).__onceHeaders;
    const tempHeaders = (req as any).tempHeaders;
    if (tempHeaders && typeof tempHeaders === "object") {
      req.headers = { ...(req.headers || {}), ...tempHeaders };
      delete (req as any).tempHeaders; // 避免 axios 重试场景复用
    }
    if (onceHeaders && typeof onceHeaders === "object") {
      req.headers = { ...(req.headers || {}), ...onceHeaders };
      delete (req as any).__onceHeaders; // 避免复用
    }

    return req;
  });

  _axios.interceptors.response.use(
    async (res) => {
      // 请求完成后释放对应的 AbortController，避免泄漏
      releaseController(
        (res.config as any).__abortController as AbortController | undefined
      );

      // 复杂逻辑：自动清除"命中且要求响应后自动清除"的作用域临时头
      const hitList: symbol[] | undefined = (res.config as any).__scopedHitList;
      if (hitList?.length) {
        __state.scopedHeaders = __state.scopedHeaders.filter((sc) => {
          // 如果该作用域要求响应后自动清除且此次命中，则从 scopedHeaders 移除
          return !(sc.autoClearAfterResponse && hitList.includes(sc.id));
        });
      }

      // 依次尝试解析器；返回 undefined 表示跳过，继续传递原响应
      for (const p of __state.parsers) {
        try {
          const r = p(res);
          if (r !== undefined) return r;
        } catch (err) {
          throw err;
        }
      }

      // 没有解析器命中 → 透传原始响应
      return res;
    },
    async (err) => {
      // 401 统一处理——清 token、跳登录（避免在登录页重复跳转）
      if (err?.response?.status === 401) {
        storage.remove(ACCESS_TOKEN);
        storage.remove(TOKEN_TYPE);
        if (window.location.pathname !== LOGIN_ROUTE.path) {
          window.location.replace(LOGIN_ROUTE.path);
        }
      }

      // 复杂逻辑：错误同样需要清除命中作用域头（与成功分支一致）
      const hitList: symbol[] | undefined = (err?.config as any)
        ?.__scopedHitList;
      if (hitList?.length) {
        __state.scopedHeaders = __state.scopedHeaders.filter((sc) => {
          return !(sc.autoClearAfterResponse && hitList.includes(sc.id));
        });
      }

      // codeResponseParser 里可能抛出 'UNAUTHENTICATED'（无 response）
      if (err?.message === "UNAUTHENTICATED") {
        releaseController(
          (err?.config as any)?.__abortController as AbortController | undefined
        );
        return Promise.reject(err);
      }

      // 将带 response 的错误标准化；无 response 的视为网络层错误
      if (err?.response) {
        const e: any = new Error(err.response.statusText);
        e.status = err.response.status;
        e.code = err.response.data?.code;
        e.data = err.response.data;
        releaseController(
          (err?.config as any)?.__abortController as AbortController | undefined
        );
        return Promise.reject(e);
      }

      const e: any = new Error(err?.message || "Network Error");
      e.isNetworkError = true;
      releaseController(
        (err?.config as any)?.__abortController as AbortController | undefined
      );
      return Promise.reject(e);
    }
  );

  // 实例级取消（退出登录等场景集中取消所有未决请求）
  (_axios as any).cancelAll = cancelAll;

  // 实例级设置/移除鉴权头，并与本地存储联动
  (_axios as any).setAuthToken = (token?: string | null, type = "Bearer") => {
    if (token) {
      _axios.defaults.headers.common.Authorization = `${type} ${token}`;
      storage.set(ACCESS_TOKEN, token);
      storage.set(TOKEN_TYPE, type);
    } else {
      delete _axios.defaults.headers.common.Authorization;
      storage.remove(ACCESS_TOKEN);
      storage.remove(TOKEN_TYPE);
    }
  };

  /** ================== 单次 / 作用域 临时头 API ================== */

  // 复杂逻辑：仅"下一次请求"临时加头；该请求完成后自动清除；返回 clear() 可提前手动清除
  (_axios as any).useOnceHeader = (headers: Record<string, string>) => {
    let consumed = false;
    const id = _axios.interceptors.request.use((req) => {
      if (!consumed) {
        (req as any).__onceHeaders = headers;
        consumed = true;
        // 立刻注销，避免并发期间多请求同时命中
        _axios.interceptors.request.eject(id);
      }
      return req;
    });
    // 手动清除：若还未被消费，则提前注销
    const clear = () => {
      _axios.interceptors.request.eject(id);
    };
    return { clear };
  };

  // 复杂逻辑：在"作用域内"对所有请求加头；返回 clear()；可选命中后自动清除（autoClearAfterResponse + match）
  (_axios as any).useScopedHeaders = (
    headers: Record<string, string>,
    opts?: {
      /** 命中一次（成功/失败）后自动清除 */
      autoClearAfterResponse?: boolean;
      /** 仅匹配满足条件的请求加入临时头 */
      match?: (cfg: AxiosRequestConfig) => boolean;
    }
  ) => {
    const item = {
      id: Symbol("SCOPED_HEADERS"),
      headers,
      match: opts?.match,
      autoClearAfterResponse: opts?.autoClearAfterResponse ?? false,
    };
    __state.scopedHeaders.push(item);
    const clear = () => {
      __state.scopedHeaders = __state.scopedHeaders.filter(
        (it) => it.id !== item.id
      );
    };
    return { clear };
  };

  // 新增对象式入口 http.call，不覆盖 axios.request，零破坏兼容 get/post
  (_axios as any).call = async function <T = any>(
    options: Parameters<typeof buildAxiosConfigFromOptions>[0]
  ): Promise<T> {
    const cfg = buildAxiosConfigFromOptions(options);
    return _axios.request(cfg) as Promise<T>;
  };

  return _axios as unknown as HttpInstance;
}

// —— 创建实例 —— //
const http = createAxiosHttp(
  {
    timeout: 10000,
    baseURL: import.meta.env.VITE_API_URL as string,
    withCredentials: true,
    xsrfCookieName: "Authorization",
    xsrfHeaderName: "Authorization",
  },
  { authDefault: true, publicPrefixes: ["/api/pub"] }
);

// 默认注入解析器列表；外部如需替换，可再次调用 setGlobalParser
(http as any).setGlobalParser([codeResponseParser, axiosDataFallbackParser]);

export default http;
export { cancelAll };
```

---

## 使用示例

### 1) 单笔请求：配置里直接写 `tempHeaders`（响应后自动失效）

```ts
await http.call({
  url: "/api/ops",
  method: "POST",
  data: payload,
  // 复杂逻辑：仅本次请求附加
  tempHeaders: {
    "X-TRACE-ID": traceId,
    "X-FEATURE": "expA",
  },
});
```

### 2) 只对"下一次请求"生效：自动清除 + 可手动清除

```ts
// 注册：仅下一次请求带头
const { clear } = (http as any).useOnceHeader({ "X-Debug": "1" });

// 如果在发起该次请求前想撤销：
clear();

// 发起请求（若未手动 clear，则这一次会带上 X-Debug，完成后自动清除）
await http.get("/api/once");
```

### 3) 作用域临时头：手动清除

```ts
const { clear } = (http as any).useScopedHeaders({ 'X-Scope': 'admin' })
// ……期间所有请求都会带上 X-Scope: admin
await http.get('/api/a')
await http.post('/api/b', {...})
// 不再需要时手动清除
clear()
```

### 4) 命中某请求后自动清除（作用域头 + 自动清除 + 匹配条件）

```ts
const { clear } = (http as any).useScopedHeaders(
  { 'X-Task-Token': token },
  {
    autoClearAfterResponse: true,
    match: (cfg) => cfg.url?.startsWith('/api/task/do') === true,
  },
)
// 只要命中 /api/task/do* 的一次请求完成(成功/失败都算)，作用域头自动清除
await http.post('/api/task/do', {...})
// 若在命中前想撤销，可手动 clear()
```

---

## 备注

- "清除响应头"从浏览器端语义上等价于**不再向后续请求附加这些头**；已发出的那次请求头不能"撤回"。上述 API 已覆盖**自动清除**与**手动清除**两种需求。
- 所有临时头的最终合并都在**主请求拦截器尾部**执行，确保稳定的最高优先级。
