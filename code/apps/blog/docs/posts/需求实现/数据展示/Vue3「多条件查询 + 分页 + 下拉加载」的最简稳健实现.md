---
title: Vue3「多条件查询 + 分页 + 下拉加载」的最简稳健实现
date: 2025-10-30
tags:
---

## 思路（先讲核心，再讲细节）

目标：**多参数筛选**与**分页下拉加载**同时存在，仍能做到——

- 不重复请求；
- 不出现竞态回填（旧请求覆盖新状态）；
- 条件变化重置为第一页，翻页只做追加；
- 引用变化（如新数组/对象）不误触发请求。

关键设计：

1. **稳定查询签名 `queryKey`**：把真正影响查询的字段（symbol、排序、loginId、serverName、起止时间秒级）序列化成字符串；同值同 Key，引用变化不触发。
2. **合并监听**：`watch([queryKey, page])` 一把抓住“条件变化/页码变化”，在回调里区分**替换加载**（条件变）与**追加加载**（仅页码变）。
3. **丢弃过期响应**：利用 `watch` 的 `onInvalidate`，新一轮触发时让上一轮回调处于“失效”态，**请求完成也不落地**（keepLatest）。
4. **单一锁**：仅用 `useFetch` 的 `loading` 作为“正在请求”的唯一锁；`loadMore` 在 `!loading && hasMore` 时才翻页。

---

## 步骤（按落地顺序）

1. **状态与请求器**

   - 建立 `params`（含 `page/page_size/symbol/orderBy/dateRange/serverName/loginId`）。
   - 准备 `useFetch`（`loading`、`fetchData`）。

2. **账户联动**

   - 监听选中账户，写入 `serverName/loginId` 到 `params`。

3. **稳定查询签名**

   - 计算 `queryKey = JSON.stringify({ symbol, orderField, order, serverName, loginId, start, end })`，其中 `start/end` 用 **秒级时间戳**归一化。

4. **合并监听并请求**

   - `watch([queryKey, params.page])`：

     - 若“**条件变**且**page ≠ 1**”，**先改 page=1 并 return**（下一轮再请求，避免双发）。
     - 用 `onInvalidate` 注册“失效回调”，新一轮触发则把本轮响应丢弃。
     - **条件变**→ 清空数据与 `hasMore`，整页重查；**页码变**→ 追加数据。
     - 更新 `hasMore = current_page < ceil(total/per_page)`。

5. **加载更多**

   - `loadMore()`：在 `hasMore && !loading` 时执行 `params.page++`。

6. **可选的小优化**

   - `updateParams` 做浅比较后再 `Object.assign`，减少无意义触发。

---

## 最小教学代码（可直接拷贝运行的骨架）

> 只保留核心；复杂逻辑的地方，**上一行有中文注释**。

```ts
import { reactive, ref, computed, watch } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

type SortOrder = "asc" | "desc";
interface OrderBy {
  field?: string;
  order?: SortOrder;
}
interface Params {
  dateRange: string[];
  page: number;
  page_size: number;
  symbol: string;
  orderBy: OrderBy;
  serverName?: string;
  loginId?: string;
}

// 假设：外部提供 useFetch 和 selectedAccount
// useFetch 返回 { loading, fetchData }，fetchData(query) → { current_page, data, per_page, total }
export function useClosePositionMini(useFetch: any, selectedAccountRef: any) {
  const dataSource = ref<any[]>([]);
  const hasMore = ref(false);

  const { loading, fetchData } = useFetch({
    url: "/api/trade/order_close",
    autoFetch: false,
  });

  const params = reactive<Params>({
    dateRange: [],
    page: 1,
    page_size: 20,
    symbol: "",
    orderBy: {},
    serverName: undefined,
    loginId: undefined,
  });

  // 复杂逻辑：账户切换→绑定 serverName/loginId，触发后续查询
  watch(
    () => selectedAccountRef.value?.loginid,
    () => {
      params.loginId = selectedAccountRef.value?.loginid;
      params.serverName = selectedAccountRef.value?.server_name;
    },
    { immediate: true }
  );

  // 复杂逻辑：稳定查询签名，去除无关引用差异
  const queryKey = computed(() => {
    const [start, end] = (params.dateRange || []).map((d) =>
      dayjs.utc(d).unix()
    );
    return JSON.stringify({
      symbol: params.symbol || "",
      orderField: params.orderBy.field || "",
      order: params.orderBy.order || "",
      serverName: params.serverName || "",
      loginId: params.loginId || "",
      start: start || 0,
      end: end || 0,
    });
  });

  // 复杂逻辑：合并监听“条件/页码”，使用 onInvalidate 丢弃过期响应
  watch(
    () => [queryKey.value, params.page] as const,
    async ([newKey, newPage], [oldKey, oldPage], onInvalidate) => {
      // 复杂逻辑：若条件变更但页码不是 1，先校正页码为 1，避免一口气发两次请求
      if (newKey !== oldKey && newPage !== 1) {
        params.page = 1;
        return;
      }

      // 复杂逻辑：仅页码变化 → 追加；否则 → 条件变化，整页替换
      const append = newKey === oldKey && newPage !== oldPage;

      // 复杂逻辑：注册失效回调；其间若有新触发，本次响应作废
      let cancelled = false;
      onInvalidate(() => {
        cancelled = true;
      });

      // 复杂逻辑：条件变化前清空数据与 hasMore，避免旧状态干扰
      if (!append) {
        dataSource.value = [];
        hasMore.value = false;
      }

      const { server_name, loginid } = selectedAccountRef.value ?? {};
      if (!server_name || !loginid) return;

      // 复杂逻辑：统一秒级时间，减少“同一天不同格式”造成的伪变化
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
      // 复杂逻辑：若已失效，直接丢弃结果
      if (cancelled) return;

      // 复杂逻辑：替换或追加，并计算 hasMore
      dataSource.value = append ? [...dataSource.value, ...data] : data;
      hasMore.value = current_page < Math.ceil(total / per_page);
    },
    { immediate: true, flush: "post" }
  );

  // 复杂逻辑：用 loading 作为唯一“请求中”锁，避免快速多次触发
  const loadMore = () => {
    if (hasMore.value && !loading.value) {
      params.page += 1;
    }
  };

  // 复杂逻辑：仅当值真正变化时再合并，避免新引用同值触发
  const updateParams = (partial: Partial<Params>) => {
    let changed = false;
    for (const k in partial) {
      // @ts-expect-error 索引访问比较
      if (partial[k] !== params[k]) changed = true;
    }
    if (!changed) return;
    Object.assign(params, partial);
  };

  return { params, dataSource, hasMore, loading, loadMore, updateParams };
}
```

> 小结：**稳定签名 + 合并监听 + 失效丢弃 + 单一锁**，是“多条件 + 分页 + 下拉”的最小闭环。这样实现，既稳又简，足以覆盖多数表格场景。
