---

title: Pinia 并发去重与初始化策略实战：以 SVG 列表为例
date: 2025-09-10 10:00:00
categories:

* 前端工程化
* Vue
  tags:
* Pinia
* useFetch
* 并发去重
* 初始化策略
* 失败重试

---

> 本文面向在 **Vue 3 + Pinia** 项目中使用 `useFetch`/接口拉取数据的同学，示例围绕「获取品种 SVG 列表」展开，落地三个高频问题：**并发去重（按参数维度）**、**稳健的 reset**、**失败后的可重试**。文末还给出 TTL、Abort、SWR 的可选扩展。

---

# 背景

很多项目会把「字典类/静态资源」放到全局 Store 并懒加载（init）。常见实现：

- 组件 A、B 同时挂载，各自 `init()` ——> **重复请求**
- 先用参数 `image_type=A` 拉了一次；随后用 `image_type=B` 再 `init()` ——> **错复用旧 Promise**
- `reset()` 粗暴把 `loading=false` ——> **与请求状态打架**
- 请求失败后 `_initPromise` 仍被占用 ——> **无法重试**

本文提供一版**通用模板**来避开这些坑。

---

# 常见坑位与根因

1. **并发重复请求**
   只做了「有无 in-flight Promise」的判断，却**没区分参数**：不同参数也会被“去重”。

2. **参数维度错乱**
   `init(A)` 正在请求时调用 `init(B)`，因为沿用相同 `_initPromise`，后者**拿到的是 A 的结果**。

3. **reset 不当**
   直接把 `loading=false`，破坏 `useFetch` 的内部状态机；同时没清掉参数 key，**后续“误以为已加载”**。

4. **失败不可重试**
   请求失败后 `_initPromise` 仍被引用，下一次 `init` 直接返回失败的 Promise，**卡死**。

---

# 最终方案（可直接复用）

## 设计要点

- **参数去重**：对 `params` 做稳定序列化（`JSON.stringify`）生成 `key`，仅当「key 相同」时复用 in-flight Promise。
- **失败清理**：出错时**清空** `_initPromise`，让下一次可以重新发起。
- **reset 温和**：不瞎改 `loading`，只清 `data`、`lastParamsKey`、`_initPromise`。
- **命中缓存**：当 `data` 已有且 `key` 一致时，直接返回（不再请求）。

## 完整代码

> 可以直接复制到 Hexo 代码块里使用（Pinia Store）。

```ts
import { defineStore } from "pinia";
import { useFetch } from "@/composables";

type InitParams = { image_type?: string; symbol?: string[] };

// 复杂逻辑：将参数序列化为稳定的去重 key，避免不同参数误用同一个 Promise/结果
const toKey = (p?: InitParams) => JSON.stringify(p ?? {});

export const useSvgStore = defineStore("svgStore", () => {
  const { data, loading, fetchData } = useFetch({
    url: "/api/symbol/svg_list",
    autoFetch: false,
  });

  // 复杂逻辑：只对“相同参数”的并发做去重
  let _initPromise: Promise<void> | null = null;
  let lastParamsKey = "";

  // 复杂逻辑：更稳健的 reset——不强改 loading；清空数据、参数 key 与 in-flight Promise
  const reset = () => {
    data.value = null;
    lastParamsKey = "";
    _initPromise = null;
  };

  // 复杂逻辑：参数去重 + 并发去重 + 失败后可重试
  const init = async (params?: InitParams) => {
    const key = toKey(params);

    // 同参数且已有进行中的请求 => 复用该 Promise；不同参数则允许重新发起
    if (_initPromise && key === lastParamsKey) return _initPromise;

    _initPromise = (async () => {
      // 已有数据且是同一参数 => 跳过请求
      if (
        Array.isArray(data.value) &&
        data.value.length > 0 &&
        key === lastParamsKey
      )
        return;
      try {
        await fetchData(params);
        lastParamsKey = key;
      } catch (e) {
        // 失败时清除占位，让下一次能重新尝试
        _initPromise = null;
        throw e;
      }
    })();

    return _initPromise;
  };

  return {
    loading,
    data,
    init,
    reset,
    fetchData,
  };
});

export default useSvgStore;
```

---

# 使用方式

## 1) 首屏懒加载（并发安全）

```ts
import { onMounted } from "vue";
import { useSvgStore } from "@/store/svg";

export default {
  setup() {
    const svgStore = useSvgStore();

    onMounted(() => {
      // 多个组件同时调用也没关系：同参数只会发一次请求
      svgStore.init({ image_type: "all" });
    });

    return { svgStore };
  },
};
```

## 2) 不同参数的加载

```ts
await svgStore.init({ image_type: "crypto" }); // 拉取加密品种
await svgStore.init({ image_type: "forex" }); // 拉取外汇品种（不会复用上一次 Promise）
```

## 3) 重新拉取

```ts
svgStore.reset();
// 下次再调用 init，会重新请求
await svgStore.init({ image_type: "all" });
```

---

# FAQ

### Q1：为什么去掉 `watch(data)`？

- 这类全局“静态资源”通常**只需在显示层消费**。在 Store 中 watch `data` 而不做任何处理，属于**冗余依赖**，会引发不必要的响应式开销。

### Q2：为什么 `reset` 不设置 `loading=false`？

- `loading` 由 `useFetch` 内部控制。外部强制改 `loading`，可能与尚在进行的请求状态冲突（比如请求刚开始你就把它改回 false）。**正确做法**是清空数据和并发标记，让下一次调用去自然驱动加载状态。

### Q3：如果我需要**强制刷新**（忽略已存在数据），怎么办？

- 最简单：`reset()` 后再 `init(params)`。
- 或扩展 `init(params, { force: true })`，当 `force` 为真时跳过“已有数据”判断。

---

# 进阶扩展（可选）

## 1) TTL 缓存（过期后自动重拉）

```ts
let ttlMs = 10 * 60 * 1000;
let fetchedAt = 0;

const isExpired = () => Date.now() - fetchedAt > ttlMs;

const init = async (params?: InitParams, opts?: { force?: boolean }) => {
  const key = toKey(params);
  if (_initPromise && key === lastParamsKey) return _initPromise;

  _initPromise = (async () => {
    const hasData = Array.isArray(data.value) && data.value.length > 0;
    if (!opts?.force && hasData && key === lastParamsKey && !isExpired())
      return;

    try {
      await fetchData(params);
      fetchedAt = Date.now();
      lastParamsKey = key;
    } catch (e) {
      _initPromise = null;
      throw e;
    }
  })();

  return _initPromise;
};
```

## 2) AbortController（中止旧请求）

若你的 `useFetch` 支持传入 `AbortSignal`，在「参数变化较频繁」的场景里，可以中止旧请求：

```ts
let controller: AbortController | null = null;

const init = async (params?: InitParams) => {
  const key = toKey(params);
  if (_initPromise && key === lastParamsKey) return _initPromise;

  controller?.abort();
  controller = new AbortController();

  _initPromise = (async () => {
    try {
      await fetchData({ ...(params || {}), signal: controller!.signal });
      lastParamsKey = key;
    } catch (e) {
      if ((e as any)?.name === "AbortError") return;
      _initPromise = null;
      throw e;
    }
  })();

  return _initPromise;
};
```

## 3) SWR（stale-while-revalidate）

- 先用缓存的 `data` 立即显示（哪怕过期）
- 背景里静默拉最新数据，成功后再更新 `data`
- 用户体验：**快**且**新**

---

# 调试建议

- 在 `init` 前后打印：`console.log('[svg:init]', params, lastParamsKey, !!_initPromise)`
- 捕获 `fetchData` 的异常信息：网络失败、接口 4xx/5xx 时，观察 `_initPromise` 是否被清理。
- 在 DevTools 的 **Network** 面板确认：并发相同参数的请求真的只发了一次，不同参数各自发一次。

---

# 总结

这套模板的核心是：**用参数 key 管理 in-flight Promise**，**reset 只清状态不碰 loading**，**错误要清空占位以便重试**。实际接入后：

- 并发安全 ✅
- 参数正确 ✅
- 重置与重试 ✅
- 扩展能力强（TTL/Abort/SWR）✅

把它抽象成你的「Store 初始化规范」，下次再遇到类似的“字典/基础数据”拉取，就能一把梭～
