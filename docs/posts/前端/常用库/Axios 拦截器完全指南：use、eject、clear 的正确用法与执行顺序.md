---
title: Axios 拦截器完全指南：use、eject、clear 的正确用法与执行顺序
date: 2025-09-18
tags:
  - axios
  - 拦截器
  - interceptors
  - use
  - eject
  - clear
  - TypeScript
categories:
  - Web 前端
---

结论先说：**有的**。
在 Axios 里，`interceptors.request` 和 `interceptors.response` 都是一个 `AxiosInterceptorManager`，它们至少有这三个方法：

- `use(onFulfilled, onRejected?, options?) → id`
- `eject(id) → void`（按 id 移除单个拦截器）
- `clear() → void`（**一次性清空**该方向上的所有拦截器）

官方文档明确了 `use/eject` 的用法；npm 的 README 还例示了 `clear()`。另外，请求拦截器支持第三个 `options` 参数（`synchronous` / `runWhen`），**响应拦截器暂不支持**。([Axios][1])

---

# 一页版教程（含"为什么"和"怎么用"）

## 1）能做什么？（API 总览）

- **添加：**
  `const id = axios.interceptors.request.use(fn, errFn, { synchronous, runWhen })`
  `const id = axios.interceptors.response.use(fn, errFn)`
  `options` 只对**请求**拦截器生效（`synchronous` 让处理同步；`runWhen(cfg)=>boolean` 控制是否执行）。([Axios][1])
- **移除单个：**
  `axios.interceptors.request.eject(id)` / `instance.interceptors.response.eject(id)`。([Axios][1])
- **清空全部：**
  `instance.interceptors.request.clear()` / `instance.interceptors.response.clear()`（npm README 示例中提供）。

> 提醒：全局 `axios` 和你通过 `axios.create()` 得到的 **实例** 各有独立的 `interceptors`，不要混用。([Axios][1])

---

## 2）执行顺序（容易踩坑）

- **请求拦截器（request）：按注册的逆序（LIFO）** 执行。官方 issue 中有明确讨论与源码链路（`unshift`）说明。([GitHub][2])
- **响应拦截器（response）：按注册顺序（FIFO）** 执行，官方 README 的 "Multiple Interceptors" 段落写明。

---

## 3）最常用的三种写法

### A. 只加一次拦截器，之后按需移除

```ts
// 添加
const id = instance.interceptors.response.use(
  (res) => {
    // ...统一处理
    return res;
  },
  (err) => Promise.reject(err)
);

// 条件满足时移除
instance.interceptors.response.eject(id);
```

（`eject(id)` 是官方支持的标准方式。）([Axios][1])

### B. 清空所有拦截器（重置到"未添加"状态）

```ts
instance.interceptors.request.clear();
instance.interceptors.response.clear();
```

（`clear()` 用于**一次性**"全移除"。）

### C. 仅在特定条件下运行请求拦截器（不阻塞主线程）

```ts
function onlyGet(cfg) {
  return cfg.method === "get";
}
instance.interceptors.request.use(
  (cfg) => {
    /* ... */ return cfg;
  },
  null,
  { synchronous: true, runWhen: onlyGet } // 仅请求拦截器支持
);
```

（`synchronous` & `runWhen` 目前**只支持请求拦截器**。）([Axios][1])

---

## 4）最佳实践 & 易错点

- **拦截器放在模块初始化处**，避免在 React 组件 render/每次调用里重复 `use` 导致堆积；需要撤销时用 `eject(id)` 或 `clear()`。
- **顺序相关的逻辑**要考虑"请求逆序 / 响应顺序"的特性；比如你想让某个请求头**最后**合并，应该最后注册或在一个统一的主请求拦截器末尾处理。([GitHub][2])
- **选用实例级拦截器**（`axios.create()`）隔离不同后端域/不同项目的策略，避免全局互相影响。([Axios][1])
- **性能注意：** 默认请求拦截器当作异步处理，会创建 Promise；确实是同步逻辑时加 `synchronous: true` 可减少排队延迟。

---

## 5）官方参考（要点直链）

- Axios 文档：拦截器增删、请求拦截器 `options` 示例、实例化区别。([Axios][1])
- npm README：`clear()` 示例、请求拦截器 `options` 仅此方向支持、响应多拦截器执行顺序。
- 执行顺序的官方 issue 讨论（请求逆序）：([GitHub][2])

---

如果你愿意，我可以把你现有封装里关于"一次性头/作用域头"的实现，改成**只在一个主请求拦截器里收口**，并用返回的 `id`/`clear()` 做完整生命周期管理——这样就和上面这些规则完全对齐。

[1]: https://axios-http.com/docs/interceptors "Interceptors | Axios Docs"
[2]: https://github.com/axios/axios/issues/841?utm_source=chatgpt.com "Order of applying request interceptors is reversed. #841"
