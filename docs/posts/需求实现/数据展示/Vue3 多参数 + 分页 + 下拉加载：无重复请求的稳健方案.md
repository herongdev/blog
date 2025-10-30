---
title: Vue3 多参数 + 分页 + 下拉加载：无重复请求的稳健方案（改进版）
date: 2025-10-30
tags: [Vue3]
---

## 整体实现思路（在你实现的基础上再收口一点）

你的实现已经非常接近“标准答案”。这次我只做**增量优化**，目标是三点：

1. 让“**有意义的条件变化**”具备**稳定的判等**能力（不被引用变化误触发）；
2. 防止**并发竞态**与**乱序回填**（翻页/筛选切换交错时丢弃过期响应）；
3. 让“触底加载”更稳，提供 **IntersectionObserver** 方案替代滚动距离判断（可选增强）。

下面仅给**需要调整的代码片段**；复杂逻辑我按你的习惯在上一行写中文注释。

---

## 改动 1：引入稳定的 `queryKey`（去引用、去噪声）

> 作用：把会影响查询的**有效字段**压成一个稳定字符串。等价值 → 等价 key，避免“新引用但值相同”导致的误触发。

在 `useClosePosition()` 内新增：

```ts
// 复杂逻辑：构造稳定的“查询签名”，仅取对查询有意义的字段，且做字段归一化
const queryKey = computed(() => {
  const { symbol, orderBy, serverName, loginId, dateRange } = params;
  const [start, end] = (dateRange || []).map((d) => dayjs.utc(d).unix());
  return JSON.stringify({
    symbol: symbol || "",
    orderField: orderBy.field || "",
    order: orderBy.order || "",
    serverName: serverName || "",
    loginId: loginId || "",
    // 注意：把日期转为秒，确保不同字符串格式不会导致“伪变化”
    start,
    end,
  });
});
```

把你原先的**条件数组 watch**替换为 **watch(queryKey)**：

```ts
// 复杂逻辑：仅当“有效查询条件”发生实质变动时触发（忽略引用变化）
watch(
  () => queryKey.value,
  () => {
    if (params.page !== 1) {
      // 复杂逻辑：重置页码但抑制 page watch 的“追加分支”
      suppressNextPageWatch.value = true;
      params.page = 1;
    } else {
      // 已在第 1 页，直接整页重查
      // 复杂逻辑：条件变化时重置数据和 hasMore，避免旧状态干扰
      dataSource.value = [];
      hasMore.value = false;
      fetchClosedOrders(params as Params, false);
    }
  },
  { flush: "post", immediate: true }
);
```

---

## 改动 2：加入“丢弃过期响应”的 **keepLatest** 护栏

> 作用：当“旧请求后返回、新请求先返回”时，**忽略旧响应**，避免数据回退/错页。

在 `useClosePosition()` 顶部新增计数器，并在 `fetchClosedOrders` 内使用：

```ts
// 复杂逻辑：请求序列号；只采纳最后一次发起后的响应，丢弃过期响应
let reqSeq = 0;
```

```ts
// 避免内部变量名与外层 params 重名，且修正 hasMore 计算
const fetchClosedOrders = async (
  params: Params,
  append = false
): Promise<void> => {
  const { server_name, loginid } = selectedAccount.value ?? {};
  if (!server_name || !loginid) {
    console.error("缺少账户信息");
    return;
  }

  // 复杂逻辑：为本次请求打上序列号戳
  const localSeq = ++reqSeq;

  const { page_size, page, symbol, dateRange, orderBy } = params;
  const [start, end] = (dateRange || []).map((date) => dayjs.utc(date).unix());
  const { field, order } = orderBy;

  try {
    const query: Record<string, any> = {
      start,
      end,
      page,
      page_size,
      exchange_name: server_name,
      loginid,
      symbol,
    };
    if (field && order) {
      query.order_by = { [field]: order };
    }

    const { current_page, data, per_page, total } = await fetchData(query);

    // 复杂逻辑：若此时已有更新的请求在路上/已完成，则丢弃本响应
    if (localSeq !== reqSeq) return;

    if (append) {
      // 创建新数组引用以触发表格更新
      dataSource.value = [...dataSource.value, ...data];
    } else {
      dataSource.value = data;
    }

    // 更稳妥的 hasMore 判定
    hasMore.value = current_page < Math.ceil(total / per_page);
  } catch (error) {
    console.error(
      "获取订单数据失败:",
      error instanceof Error ? error.message : error
    );
  } finally {
    isFetching.value = false;
  }
};
```

> 说明：`keepLatest` 让**翻页中突然切换筛选**、或**网络延迟**时的回填完全安全。

---

## 改动 3：条件变化时**显式清空**与**重置 hasMore**

把你在条件 watch 中的分支补齐（上面片段已包含）：

```ts
// 复杂逻辑：条件变化会让此前的分页语义失效，必须清空现有数据并重算 hasMore
dataSource.value = [];
hasMore.value = false;
```

---

## 改动 4（可选增强）：用 **IntersectionObserver** 更稳地触发“加载更多”

> 你当前用“滚动剩余距离”判断，简单有效；若想更稳、更省计算，可用 IO 监听“哨兵元素”。

在 `HVirtualTable`（或封装层）里**新增一个可选哨兵**：

```ts
// 复杂逻辑：当使用 IO 模式时，在列表底部放置一个“哨兵” div 被看见即触发 load-more
const useIo = ref(true); // 可做成 props
const ioSentinel = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;

onMounted(() => {
  if (!useIo.value || !parentRef.value) return;
  io = new IntersectionObserver(
    (entries) => {
      const first = entries[0];
      if (first?.isIntersecting && props.hasMore && !props.loading) {
        emit("load-more");
      }
    },
    {
      root: parentRef.value,
      threshold: 0.1,
    }
  );
  if (ioSentinel.value) io.observe(ioSentinel.value);
});
onBeforeUnmount(() => {
  io?.disconnect();
  io = null;
});
```

在渲染末尾**追加一个“哨兵”**（只在 infinite 模式下渲染）：

```tsx
{
  this.mode === "infinite" && (
    <div ref="ioSentinel" style={{ height: "1px" }} />
  );
}
```

> 滚动判断可以作为**降级方案**保留；推荐优先 IO，减少滚动事件上的计算与抖动。

---

## 改动 5：`loadMore` 的“瞬时加锁”仍旧正确，但再加一层兜底

> 你已经在同步处上锁了，这是最关键的；建议在**翻页 watch**里也判一下锁，避免边界情况下重复触发。

```ts
// 复杂逻辑：page 变化 → 追加；若被抑制则走整页重查
watch(
  () => params.page,
  (n, o) => {
    if (suppressNextPageWatch.value) {
      suppressNextPageWatch.value = false;
      fetchClosedOrders(params as Params, false);
      return;
    }
    if (n !== o) {
      // 复杂逻辑：兜底防抖，若锁还在则跳过（极端场景下的二次触发保护）
      if (isFetching.value) return;
      fetchClosedOrders(params as Params, true);
    }
  }
);
```

---

## 额外小优化（非必须）

- **排序字段变更**后可把 `hasMore` 直接置 `false`，等响应回来再更新，避免 UI 误读；
- `updateParams` 内对外暴露时可做一次**浅比较**，**值未变**就不 `assign`，减少 watch 触发；
- 如果支持**预取**，可以在数据超过阈值时先请求下一页，返回后拼在一个隐藏缓冲区，真实滚动到底再合并，用户更丝滑（实现成本略高，这里不展开）。

---

## 最简代码示例（只演示新思路，不替换你的现有代码）

> 仅演示 **queryKey + keepLatest** 两点，复杂逻辑前有注释。

```ts
import { ref, reactive, computed, watch } from "vue";

export function useInfiniteQuery() {
  const ds = ref<any[]>([]);
  const hasMore = ref(false);
  const isFetching = ref(false);
  const p = reactive({
    page: 1,
    page_size: 20,
    kw: "",
    sort: { field: "", order: "" as "asc" | "desc" | "" },
    range: [] as string[],
  });

  // 复杂逻辑：仅取有效字段并做归一化，得到稳定 key
  const queryKey = computed(() => {
    const [s, e] = (p.range || []).map((d) => +new Date(d));
    return JSON.stringify({
      kw: p.kw || "",
      field: p.sort.field || "",
      order: p.sort.order || "",
      s: s || 0,
      e: e || 0,
    });
  });

  // 复杂逻辑：只保留最新请求的响应
  let seq = 0;
  const fetchList = async (append = false) => {
    const id = ++seq;
    try {
      const { data, page, pages } = await api.list(p); // 伪接口
      if (id !== seq) return;
      ds.value = append ? [...ds.value, ...data] : data;
      hasMore.value = page < pages;
    } finally {
      isFetching.value = false;
    }
  };

  watch(
    queryKey,
    () => {
      if (p.page !== 1) p.page = 1;
      ds.value = [];
      hasMore.value = false;
      fetchList(false);
    },
    { immediate: true }
  );

  watch(
    () => p.page,
    (n, o) => {
      if (n !== o) fetchList(true);
    }
  );

  const loadMore = () => {
    if (hasMore.value && !isFetching.value) {
      isFetching.value = true;
      p.page += 1;
    }
  };

  return { ds, hasMore, loadMore, p };
}
```

---

## 结论

- 你的“两路 watch + 抑制标志 + 同步加锁”结构已经**很稳**了；
- 本次优化的关键在于**queryKey 去引用化**与**keepLatest 反竞态**：这两个点落下去，基本把“多参数 + 分页 + 下拉加载更多”的边角全补齐；
- 触底触发建议逐步切到 **IntersectionObserver**，更省心。

如需，我可以把上述改动直接**合到你当前代码**（保持最小 diff），或者给一份**可抽离的通用 composable**（`usePagedQuery`）给项目多处复用。

你的这版已经很稳了 👍。如果你想**再精简**变量数量，我给你一个“**单观察者 + 可取消回调 + 只用一个锁**”的做法，可以**删掉这三个变量**：

- `suppressNextPageWatch`（用合并 watch 的“页码校正”替代）
- `isFetching`（用 `loading` 作为唯一锁）
- `reqSeq`（用 `watch` 的 `onInvalidate` 丢弃过期响应）

下面只给**需要替换/新增的代码片段**，并在复杂逻辑上一行中文注释。

---

```ts
// ✅ 保留：queryKey 计算逻辑不变
const queryKey = computed(() => {
  const { symbol, orderBy, serverName, loginId, dateRange } = params;
  const [start, end] = (dateRange || []).map((d) => dayjs.utc(d).unix());
  return JSON.stringify({
    symbol: symbol || "",
    orderField: orderBy.field || "",
    order: orderBy.order || "",
    serverName: serverName || "",
    loginId: loginId || "",
    start: start || 0,
    end: end || 0,
  });
});
```

```ts
// ✅ 新方案：合并“条件变化/页码变化”为一个 watch，统一发请求
// 复杂逻辑：区分“替换加载（条件变化）”与“追加加载（页码变化）”，并使用 onInvalidate 丢弃过期响应
watch(
  () => [queryKey.value, params.page] as const,
  async ([newKey, newPage], [oldKey, oldPage], onInvalidate) => {
    // 复杂逻辑：条件变化但页码不是1时，先把页码校正为1，等下一轮 watch 再请求（避免双发）
    if (newKey !== oldKey && newPage !== 1) {
      params.page = 1;
      return;
    }

    // 复杂逻辑：append 表示仅页码变化（追加）；否则为条件变化（替换）
    const append = newKey === oldKey && newPage !== oldPage;

    // 复杂逻辑：注册失效回调；期间若有新一轮触发，则本次响应丢弃
    let cancelled = false;
    onInvalidate(() => {
      cancelled = true;
    });

    // 复杂逻辑：条件变化前清空现有数据和 hasMore，避免旧状态干扰
    if (!append) {
      dataSource.value = [];
      hasMore.value = false;
    }

    const { server_name, loginid } = selectedAccount.value ?? {};
    if (!server_name || !loginid) return;

    const [start, end] = (params.dateRange || []).map((d) =>
      dayjs.utc(d).unix()
    );
    const query: Record<string, any> = {
      start,
      end,
      page: params.page,
      page_size: params.page_size,
      exchange_name: server_name,
      loginid,
      symbol: params.symbol,
    };
    if (params.orderBy.field && params.orderBy.order) {
      query.order_by = { [params.orderBy.field]: params.orderBy.order };
    }

    const { current_page, data, per_page, total } = await fetchData(query);
    // 复杂逻辑：若期间产生了新请求，本次结果作废
    if (cancelled) return;

    // 复杂逻辑：替换或追加落地
    dataSource.value = append ? [...dataSource.value, ...data] : data;
    hasMore.value = current_page < Math.ceil(total / per_page);
  },
  { immediate: true, flush: "post" }
);
```

```ts
// ✅ 替换 loadMore，只用 loading 当唯一“状态锁”
/* 复杂逻辑：以 useFetch 暴露的 loading 作为唯一加锁变量，防止快速多次翻页 */
const loadMore = () => {
  if (hasMore.value && !loading.value) {
    params.page += 1;
  }
};
```

```ts
// （可选小优化）减少无效触发：浅比较后再合并
/* 复杂逻辑：仅在值真正变化时才合并，避免因为新引用但值相同而触发请求 */
const updateParams = (partial: Partial<Params>) => {
  let changed = false;
  for (const k in partial) {
    // @ts-ignore
    if (partial[k] !== params[k]) changed = true;
  }
  if (!changed) return;
  Object.assign(params, partial);
};
```

---

### 为什么这样可以少三个变量？

- `suppressNextPageWatch` → 利用**合并 watch**内的“页码校正”分支：当条件变更但 `page!==1` 时，**先改 page=1 并 return**，下一轮再真正发请求。不会出现双请求，自然不再需要 suppress。
- `isFetching` → 触发“加载更多”只看 `!loading.value` 即可；`loading` 由 `useFetch` 维护，是真正的请求锁。
- `reqSeq` → 用 `onInvalidate` 就能**丢弃过期响应**（上一轮 watch 的异步回调在下一轮被标记失效），等价于 keepLatest，无需手动计数器。

> 前提：`fetchData` 是**幂等**的纯请求函数，且 `useFetch` 的 `loading` 能正确反映进行中的请求（通常都可以）。旧请求无法取消也没关系，我们只是**不落地**它的结果。

---

### 适用边界 & 说明

- 如果你的 `useFetch` 支持 `AbortController`，也可以在 `onInvalidate` 里直接 `abort()`，进一步节流网络占用；否则按上面的**结果丢弃**也足够稳。
- 如果“外部更新 params”时总是会把 `page` 一起设置为 `1`，那合并 watch 里“页码校正”的分支几乎不会触发，但保留它能防御漏设。
- `queryKey` 是稳定判等的关键（去格式差异、去引用差异），建议保留。

---

**结论**：把两个 watch 合并 + 用 `onInvalidate` 代替 `reqSeq` + 用 `loading` 代替 `isFetching`，逻辑更直观，也更少共享状态；但依旧具备你之前方案的**可靠性**（无重复请求、无竞态回填、翻页与筛选语义清晰）。
