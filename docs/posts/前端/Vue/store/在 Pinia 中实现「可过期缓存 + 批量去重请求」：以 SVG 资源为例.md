---
title: 在 Pinia 中实现「可过期缓存 + 批量去重请求」：以 SVG 资源为例
date: 2025-09-23
tags: [并发控制, 缓存设计, 前端工程化]
---

## 目标与整体思路

我们要做一个 **可过期的本地缓存**，并且在页面多处同时请求同一资源时，**只发一次网络请求**（去重/合并）；接口支持批量查询时，要 **把多个 symbol 合并为一次批量请求**；请求完成后，**watch 自动合并数据**进缓存；为消除 `watch` 异步带来的竞态问题，使用 `nextTick()` 保证 **“先入库，再 resolve”**。

**核心设计：**

1. **缓存结构**：`Map<string, { item: SvgItem; updatedAt: number }>`，用 `updatedAt` 做 TTL。
2. **去重并发**：`inflight: Map<string, Promise<SvgItem | null>>`，同一 symbol 只有一个在途 Promise。
3. **批量请求**：`fetchBatch(symbols)` 统一调用接口，一次性返回，按索引把结果分摊给每个 symbol 的 `inflight`。
4. **自动入库**：`watch(data)` → `mergeList()` 把接口结果写入 `svgMap`。
5. **消除竞态**：`await nextTick()` 等 `watch` 把数据合并完 **再** resolve（否则偶发“空值”）。
6. **保障接口**：`ensureSvg` / `ensureSvgs` —— 按需拉取、复用在途、最终返回“齐整的结果”。

---

## 实现步骤

### 步骤一：定义缓存与 TTL

```ts
// 复杂逻辑：RecordEntry 里带 updatedAt 以支持 TTL 过期判定
const svgMap = reactive<Map<string, RecordEntry>>(new Map());
export const DEFAULT_TTL_MS = 12 * 60 * 60 * 1000;
```

### 步骤二：监听接口数据并合并到缓存

```ts
// 复杂逻辑：统一把服务端返回列表合并到 Map，写入最新时间戳
function mergeList(list: SvgItem[] | null | undefined) {
  if (!Array.isArray(list) || list.length === 0) return;
  const now = Date.now();
  for (const item of list) {
    if (!item || !(item as any).symbol) continue;
    svgMap.set((item as any).symbol, { item, updatedAt: now });
  }
}

watch(data, (newData) => mergeList(newData));
```

### 步骤三：过期判断与只读查询

```ts
// 复杂逻辑：用 updatedAt 与 TTL 判定是否过期
const isStale = (symbol: string, ttlMs = DEFAULT_TTL_MS) => {
  const ts = svgMap.get(symbol)?.updatedAt;
  if (!ts) return true;
  return Date.now() - ts > ttlMs;
};

const getCached = (s: string) => svgMap.get(s)?.item;
```

### 步骤四：并发去重（inflight）与批量请求

```ts
// 复杂逻辑：同一 symbol 只存在一个在途 Promise，避免并发打爆接口
const inflight = new Map<string, Promise<SvgItem | null>>();

async function fetchBatch(symbols: string[], image_type: string = "svg") {
  if (symbols.length === 0) return;

  // 复杂逻辑：等待 watch 合并完成后再返回，消除竞态
  const batchPromise = (async () => {
    await fetchData({ image_type, symbol: symbols });
    await nextTick();
    return symbols.map((s) => svgMap.get(s)?.item ?? null);
  })();

  // 复杂逻辑：把一次批量请求的结果拆分到每个 symbol 的在途 Promise
  symbols.forEach((s, idx) => {
    const p = batchPromise.then((arr) => arr[idx] ?? null);
    inflight.set(
      s,
      p.finally(() => inflight.delete(s))
    );
  });

  await batchPromise;
}
```

### 步骤五：保障单个与多个资源可用（ensure 系列）

```ts
// 复杂逻辑：优先返回未过期缓存；如有在途，则复用；否则触发最小批量
async function ensureSvg(
  symbol: string,
  opts?: EnsureOpts
): Promise<SvgItem | null> {
  const ttl = opts?.ttlMs ?? DEFAULT_TTL_MS;
  const entry = svgMap.get(symbol);
  if (entry && !isStale(symbol, ttl)) return entry.item;

  const inq = inflight.get(symbol);
  if (inq) return inq;

  await fetchBatch([symbol], opts?.image_type);
  return svgMap.get(symbol)?.item ?? null;
}
```

```ts
// 复杂逻辑：批量保障；只请求“缺失/过期且不在 in-flight”的 symbols；顺序与数量严格对齐
async function ensureSvgs(symbols: string[], opts?: EnsureOpts) {
  const ttl = opts?.ttlMs ?? DEFAULT_TTL_MS;
  const needFetch: string[] = [];

  for (const symbol of symbols) {
    if (isStale(symbol, ttl) && !inflight.has(symbol)) needFetch.push(symbol);
  }

  if (needFetch.length) await fetchBatch(needFetch, opts?.image_type);

  const waits = symbols.map(
    (s) => inflight.get(s) ?? Promise.resolve(svgMap.get(s)?.item ?? null)
  );
  const results = await Promise.all(waits);

  const map = new Map<string, SvgItem | null>();
  symbols.forEach((s, i) => map.set(s, results[i]));
  return map;
}
```

---

## 最简使用示例

```ts
// 复杂逻辑：页面加载时保障一批资源，渲染直接用缓存读取
const store = useSvgStore();

// 复杂逻辑：确保 ABC 三个 symbol 可用（缺失/过期会自动拉取）
await store.ensureSvgs(["A", "B", "C"]);

// 复杂逻辑：渲染取用时不再发请求
const a = store.getCached("A");
```

---

## 关键细节与常见坑

1. **`watch(data)` 是异步回调**

   - `fetchData` resolve 并不意味着 `svgMap` 已更新。
   - **解决**：`fetchBatch` 里 `await nextTick()`，确保合并完成再对外 resolve。

2. **批量请求的结果与 symbol 顺序对齐**

   - 不要用 `Promise.all(inflight.values())`，因为 `Map.values()` 的顺序取决于插入时机，**不等于** `symbols` 顺序。
   - **解决**：构造 `waits = symbols.map(...)`，逐项对应。

3. **避免重复请求**

   - `inflight` 里的 symbol 不再加入新的批量；等它完成再读缓存即可。
   - 这是典型的 **请求去重（de-dup）**。

4. **TTL 策略**

   - `isStale` 以 `updatedAt` + `ttlMs` 判定；**不存在也视为过期**。
   - 热点资源可适当延长 TTL，冷门资源保持默认即可。

5. **数据一致性**

   - 对外只暴露 `SvgItem`（聚合后的读取），内部结构 `RecordEntry` 不泄漏。
   - `reset()` 清空数据时要同步清 `inflight`（如有需要可补一行 `inflight.clear()`）。

---

## 可扩展优化建议

- **错误缓存（negative cache）**：接口确认“不存在”的 symbol，可短期缓存 `null`，避免频繁重试。
- **请求合并窗口**：在 `ensureSvgs` 里引入一个短暂的“收敛时间窗”（如 0\~10ms），把同一帧发起的多次 ensure 合并为单次批量请求。
- **命中率追踪**：埋点统计 “缓存命中/过期/请求发起/合并数量”等指标，评估 TTL 与批量策略效果。
- **SSR 兼容**：若在 SSR 场景中使用，注意仅在客户端访问 `window`/`sessionStorage` 等对象，并考虑把首屏结果通过 hydration 注入。

---

## 完整代码参考

> 你已经给出了完整实现，这里点名两个关键改动，便于回顾：
>
> 1. `fetchBatch` 里 **加入 `await nextTick()`**。
> 2. `ensureSvgs` 里 **逐 symbol 构造 `waits`**，**按顺序回填**结果。

---

## 总结

这套模式把 **可过期缓存（TTL）**、**并发去重（inflight）**、**批量请求** 和 **异步副作用消歧（nextTick）** 有机结合：

- **快**：缓存命中直接返回；
- **省**：并发去重、批量请求减少网络开销；
- **稳**：`nextTick` 消除竞态，结果有序且可预测。

拿它做图片、配置、元数据等“读多改少”的资源缓存，非常趁手。
