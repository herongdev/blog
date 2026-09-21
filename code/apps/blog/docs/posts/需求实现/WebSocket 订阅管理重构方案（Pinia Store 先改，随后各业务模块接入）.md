---

title: WebSocket 订阅管理重构方案（Pinia Store 先改，随后各业务模块接入）
date: 2025-09-30
tags:

- Vue3
- Pinia
- WebSocket
- 实时行情

---

## 目标

- **单连接多路复用**：所有模块共享一个 WebSocket。
- **多订阅池聚合**：各模块（SymbolList / OrderTabs / TradePanel/ChartPanel）各自维护自己的订阅池（`Set<string>`），**Store 统一求并集**后与真实订阅做**差量同步**。
- **固定订阅（pinned）**：当前选中 Symbol 永远订阅，不受虚拟滚动影响。
- **高频变更防抖/节流**：虚拟滚动/Tab 切换时订阅变更**合并到 RAF** 批量执行。
- **幂等与缓存清理**：只对真正需要变化的 Symbol 调用订阅/退订；退订后清理本地缓存。

---

## 改造顺序

1. **先改 Pinia `socketStore`**（新增「模块订阅池」与「统一同步器」）。
2. 再在 **各业务模块** 用极少改动接入（只调用 Store 的 update API，不再直接调用 `wsService.subscribe`）。

---

## 一、修改 `socketStore`（仅给出需要新增/替换的片段）

> 说明：下面每段代码都**只贴需要调整的部分**。**复杂逻辑**的代码段**上一行**已加注释说明。

### 1) 增加「模块订阅池」与「固定订阅集合」

```ts
// 【新增】模块级订阅池与全局固定订阅
// 复杂逻辑：各模块用独立 Set 维护自身需要的 symbols，Store 统一求并集，避免互相干扰
const moduleSubscriptions = reactive(new Map<string, Set<string>>());
// 复杂逻辑：pinnedSymbols 始终参与全局订阅（如当前选中 Tab 的 symbol）
const pinnedSymbols = reactive(new Set<string>());
```

### 2) 计算「目标订阅集合」的工具函数

```ts
// 【新增】聚合所有模块 + pinned 的目标订阅集合
const computeDesiredSet = (): Set<string> => {
  const desired = new Set<string>();
  moduleSubscriptions.forEach((set) => set.forEach((s) => desired.add(s)));
  pinnedSymbols.forEach((s) => desired.add(s));
  return desired;
};
```

### 3) RAF 批量同步调度器

```ts
// 【新增】订阅同步调度（与 queueSubscribe 思路一致）
let syncRafId: number | null = null;
const scheduleSync = () => {
  if (syncRafId != null) return;
  syncRafId = requestAnimationFrame(() => {
    syncRafId = null;
    syncActiveSubscriptions();
  });
};
```

### 4) 核心：统一「差量同步」到真实 WebSocket 订阅

```ts
// 【新增】统一差量同步 desired ↔ current，支持批量/幂等/缓存清理
const syncActiveSubscriptions = () => {
  const desired = computeDesiredSet();
  const current = wsService.getActiveSubs(); // Set<string>

  // 复杂逻辑：快速路径——完全一致时直接返回，避免无谓开销
  if (desired.size === current.size) {
    let identical = true;
    for (const s of desired) {
      if (!current.has(s)) {
        identical = false;
        break;
      }
    }
    if (identical) return;
  }

  // 复杂逻辑：计算差集，退订 current - desired，订阅 desired - current
  const toUnsub: string[] = [];
  current.forEach((s) => {
    if (!desired.has(s)) toUnsub.push(s);
  });

  const toSub: string[] = [];
  desired.forEach((s) => {
    if (!current.has(s)) toSub.push(s);
  });

  // 复杂逻辑：退订先行，确保不会保留无用缓存
  if (toUnsub.length > 0) {
    // 若 wsService 支持批量 API，优先批量
    if ((wsService as any).batchUnsubscribe) {
      (wsService as any).batchUnsubscribe(toUnsub);
    } else {
      toUnsub.forEach((s) => wsService.unsubscribe(s));
    }
    // 同步清理本地缓存，防止残留
    toUnsub.forEach((s) => {
      lastQuoteMap.delete(s);
      prevQuoteSnapshot.delete(s);
    });
  }

  if (toSub.length > 0) {
    if ((wsService as any).batchSubscribe) {
      (wsService as any).batchSubscribe(toSub);
    } else {
      toSub.forEach((s) => wsService.subscribe(s));
    }
  }
};
```

### 5) 提供模块级 API（替代原 `subscribe()` 的直接语义）

```ts
// 【新增】模块池：全量替换（适合虚拟滚动每次给出完整可见集合）
const updateModulePool = (moduleKey: string, symbols: readonly string[]) => {
  moduleSubscriptions.set(moduleKey, new Set(symbols));
  scheduleSync();
};

// 【新增】模块池：增量打补丁（可选：有些模块喜欢 add/remove）
const patchModulePool = (
  moduleKey: string,
  patch: { add?: string[]; remove?: string[] } = {}
) => {
  const set = moduleSubscriptions.get(moduleKey) ?? new Set<string>();
  patch.add?.forEach((s) => set.add(s));
  patch.remove?.forEach((s) => set.delete(s));
  moduleSubscriptions.set(moduleKey, set);
  scheduleSync();
};

// 【新增】模块卸载/隐藏时清空池
const removeModulePool = (moduleKey: string) => {
  if (moduleSubscriptions.has(moduleKey)) {
    moduleSubscriptions.delete(moduleKey);
    scheduleSync();
  }
};

// 【新增】固定订阅（当前选中 Tab）
const setPinned = (symbols: readonly string[] | string | null | undefined) => {
  pinnedSymbols.clear();
  if (typeof symbols === "string") pinnedSymbols.add(symbols);
  else if (Array.isArray(symbols)) symbols.forEach((s) => pinnedSymbols.add(s));
  scheduleSync();
};
```

### 6) **废弃/包裹**旧的 `subscribe()`（可选）

> 若已有大量调用，可以**临时保留**，但建议逐步切到「模块池」API。下面给一个最小包裹迁移：

```ts
// 【替换原 subscribe】：标注为内部/兼容用，尽快迁移到模块池 API
const subscribe = (
  symbols: string[],
  mode: "append" | "update" = "update",
  pinned?: Set<string>
) => {
  // 复杂逻辑：用“临时模块池”来走统一差量逻辑；不再直接触达 wsService
  const TEMP_KEY = "__legacy__";
  const base = moduleSubscriptions.get(TEMP_KEY) ?? new Set<string>();
  if (mode === "update") {
    moduleSubscriptions.set(TEMP_KEY, new Set(symbols));
  } else {
    symbols.forEach((s) => base.add(s));
    moduleSubscriptions.set(TEMP_KEY, base);
  }
  if (pinned && pinned.size) setPinned(Array.from(pinned));
  scheduleSync();
};
```

### 7) 断线重连时恢复订阅

```ts
// 【修改】在 auth:ok 或 connect 成功后，恢复当前 UI 的订阅
async function resubscribeAndWarmupSpecs() {
  // 复杂逻辑：统一由 syncActiveSubscriptions 恢复（避免 UI 空窗）
  syncActiveSubscriptions();
  // …若还需拉取规格，可在此补充（保持你原注释结构即可）
}
```

### 8) reset/close 时清理订阅池

```ts
// 【修改】在 reset() 末尾增加
moduleSubscriptions.clear();
pinnedSymbols.clear();
```

### 9) 导出新增 API

```ts
// 【新增导出】把新增的 API 暴露给业务模块使用
return {
  // ...原有导出
  updateModulePool,
  patchModulePool,
  removeModulePool,
  setPinned,
  // 可选导出：便于调试查看
  moduleSubscriptions,
  pinnedSymbols,
};
```

---

## 二、各业务模块接入方式（仅说明需要改动的调用点）

> 原则：**模块不再直接调用 `wsService.subscribe/unsubscribe`**；改为**只维护自身订阅池**并调用 `socketStore.updateModulePool / patchModulePool / removeModulePool / setPinned`。

### 1) `SymbolList`（虚拟滚动）

```ts
// 【新增】在可见行变化回调里，提交当前可见 symbols 的全集
// 复杂逻辑：虚拟滚动会高频触发，最好在回调里做一个 RAF/防抖再调用 updateModulePool
import { useSocketStore } from "@/store";
const socketStore = useSocketStore();
let rafId: number | null = null;

const onVisibleDataUpdated = (rows: SymbolTabItem[]) => {
  const symbols = rows.map((r) => r.symbol);
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    rafId = null;
    socketStore.updateModulePool("SymbolList", symbols);
  });
};

// 【新增】组件卸载时清空模块池
onUnmounted(() => {
  socketStore.removeModulePool("SymbolList");
});
```

### 2) `OrderTabs`（列表/分页/展开）

```ts
// 【新增】在“可视订单/行情列表”变化时提交池
import { useSocketStore } from "@/store";
const socketStore = useSocketStore();

const commitVisible = (symbols: string[]) => {
  // 复杂逻辑：可视区 + 你的业务筛选（如只对持仓/挂单相关 symbol 订阅）
  socketStore.updateModulePool("OrderTabs", symbols);
};

onUnmounted(() => {
  socketStore.removeModulePool("OrderTabs");
});
```

### 3) `TradePanel / ChartPanel`（当前选中始终订阅）

```ts
// 【新增】当选中 Tab/Symbol 变化时，设置 pinned
import { useSocketStore } from "@/store";
const socketStore = useSocketStore();

watch(
  () => tradeStore.selectedTab?.symbol,
  (sym) => {
    // 复杂逻辑：pinned 保证图表/交易面板不断流
    socketStore.setPinned(sym || null);
  },
  { immediate: true }
);

onUnmounted(() => {
  // 复杂逻辑：若面板关闭不想再 pinned，可清空（或由上层统一管理）
  socketStore.setPinned(null);
});
```

#### 📌 补充：`immediate: true` 的作用与时机

结论先说：

- `immediate: true` 时：**创建监听器后立刻触发一次**（不管值有没有变化），之后再在**值变化时**继续触发。

  - 这第一次调用里：`newValue` 是当前值，`oldValue` 在 Vue 3 中通常是 `undefined`。
  - 触发的具体时机受 `flush` 影响：默认 `pre` 表示在组件渲染前；`post` 在渲染后；`sync` 立刻同步执行。

- `immediate: false`（默认）：**只有当值发生变化时才触发**，不会在创建时先跑一次。

最小示例（Vue 3）：

```ts
const count = ref(0);

watch(
  count,
  (newVal, oldVal) => {
    console.log("watch fired:", { newVal, oldVal }); // 第一次 oldVal 通常是 undefined
  },
  { immediate: true } // 先执行一次，然后每次 count 变化再执行
);
```

如果你只想"值变了才执行"，就不要开 `immediate`。
如果你想在 DOM 更新后拿到最新渲染结果再处理，配合：`{ immediate: true, flush: 'post' }`。

---

### 4) 顶部 `NavTabs` 切换

```ts
// 【新增】在 handleChangeSymbol 里同步 pinned
import { useSocketStore } from "@/store";
const socketStore = useSocketStore();

function handleChangeSymbol(symbol: SymbolTabItem): void {
  // ...你原有逻辑
  socketStore.setPinned(symbol.symbol);
}
```

---

## 三、细节建议

- **命名与 Key**：给每个模块一个稳定的 `moduleKey`（如 `'SymbolList' | 'OrderTabs' | 'TradePanel'`），如果有多个实例（例如多个列表），用 `'SymbolList#1'` 这类前缀确保唯一。
- **批量 API**：若后端支持，给 `WebSocketService` 增加 `batchSubscribe(list)`/`batchUnsubscribe(list)`，上面的 `syncActiveSubscriptions` 已做了**能力检测**并优先使用批量。
- **节流窗口**：你当前 RAF 合并已足够，若仍觉得频繁，可把 `scheduleSync` 换成 `useDebounceFn(syncActiveSubscriptions, 100)`（注意 Store 里引用 `@vueuse/core`）。
- **Topic 粒度扩展**：如果后续区分 `QUOTE:`、`DEPTH:` 等不同通道，可把订阅键改成 `'QUOTE:EURUSD'` 这种带前缀字符串，模块池照样工作。
- **调试**：开发阶段可以将 `moduleSubscriptions` 与 `pinnedSymbols` 挂到 devtool 面板或在控制台打印，快速定位谁在占用某个 symbol。

---

## 四、迁移指引（最小改动）

1. 在 `socketStore` 中**按上文片段**加入 `moduleSubscriptions`、`pinnedSymbols`、`computeDesiredSet`、`scheduleSync`、`syncActiveSubscriptions`、以及四个 API：`updateModulePool / patchModulePool / removeModulePool / setPinned`；并在 `resubscribeAndWarmupSpecs`/`reset`/`return` 做对应小改。
2. 保留你当前 `subscribe()` 兼容入口（如上所示临时包裹），**新代码一律用模块池 API**。
3. 在 **SymbolList / OrderTabs / TradePanel(ChartPanel) / NavTabs** 的相应回调里，仅**提交各自的池**与**设置 pinned**，**不再直接触达 wsService**。
4. 验证：

   - Tab 切换：旧 Tab 若不在任何池内且非 pinned，应被退订。
   - 虚拟滚动：离开视窗的 symbol 若无其他模块引用，应被退订；进入视窗的应被订阅。
   - 断线重连：`auth:ok` 后 `syncActiveSubscriptions()` 恢复所有目标订阅。

---

## 五、效果

- 订阅**幂等**、**无抖动**、**按需**。
- 模块间彻底解耦：只维护自己的 `Set`，其余交给 Store。
- pinned 保障关键面板不断流。
- 扩展性强：后续新增模块/通道只需新增一个池。

如果你愿意，我可以再根据你 `WebSocketService` 的现有能力，**补一版 `batchSubscribe/batchUnsubscribe` 的实现片段**（同样只给最小改动），以吃满批量协议的性能红利。

下面按你的偏好「**只给需要修改的代码片段**，复杂逻辑在上一行加注释」给出对 `tradeStore` 的最小改动——目的：**由 Tabs 只维持“当前选中”为 pinned 订阅**，其它 Tab 不参与订阅；真正的订阅由各模块的池（SymbolList / OrderTabs / TradePanel/ChartPanel）+ `socketStore.setPinned()` 汇总。

---

### 1) 引入 `socketStore.setPinned`，替换原来的 `queueSubscribe`

```ts
// ✅ 新增：引入 setPinned
import {
  useSymbolInfoStore,
  useAccountStore,
  storeToRefs,
  useSocketStore,
} from "@/store";
const socketStore = useSocketStore();
```

```ts
// 复杂逻辑：Tabs 只保证“当前选中 Symbol”一直订阅（pinned），不再通过 queueSubscribe 叠加订阅
const updateActiveSymbol = (tab: SymbolTabItem) => {
  const prevActive = selectedTab.value?.symbol;
  if (prevActive === tab.symbol) return;
  selectedTab.value = tab;

  const token = ++lastFetchToken;

  // ...（fetchSpecs 逻辑保持不变）...

  // 🔁 替换这里：由 pinned 保证不断流
  // socketStore.queueSubscribe(tab.symbol)
  socketStore.setPinned(tab.symbol);
};
```

---

### 2) `updateTabs` 在没有选中项时，显式清空 pinned

```ts
// 复杂逻辑：当没有可选 Tab 时，需要清空 pinned，避免残留订阅
const updateTabs = (
  newTabs: SymbolTabItem[],
  newSelected?: SymbolTabItem | null
) => {
  _tabs.value = newTabs;
  const desired = newSelected
    ? newSelected
    : selectedTab.value &&
      newTabs.some((t) => t.symbol === selectedTab.value!.symbol)
    ? selectedTab.value
    : newTabs[0] ?? null;

  if (desired) {
    updateActiveSymbol(desired);
  } else {
    selectedTab.value = null;
    // ✅ 新增：清空 pinned
    socketStore.setPinned(null);
  }
};
```

---

### 3) `reset()` 时同步清空 pinned（避免跨账号/页面残留）

```ts
// 复杂逻辑：重置时，连同 pinned 一起清掉，防止“旧选中”在新会话继续订阅
const reset = () => {
  _tabs.value = [];
  selectedTab.value = null;
  skipCloseOrderConfirm.value = false;

  if (fetchSpecsTimeout) {
    clearTimeout(fetchSpecsTimeout);
    fetchSpecsTimeout = null;
  }
  if (waitAccountStop) {
    try {
      waitAccountStop();
    } catch {}
    waitAccountStop = null;
  }
  lastFetchToken = 0;

  // ✅ 新增：清空 pinned
  socketStore.setPinned(null);
};
```

---

### 4) 初次挂载/恢复时，立即将选中 Tab 写入 pinned（保持旧行为）

```ts
// 复杂逻辑：当从本地恢复或初次赋值时，让 pinned 立即就位（避免短暂空窗）
watch(
  selectedTab,
  (tab) => {
    if (!tab) return;
    if (lastFetchToken === 0) {
      updateActiveSymbol(tab);
    } else {
      // ✅ 新增：防止某些恢复路径下 missed 的 pinned 更新
      socketStore.setPinned(tab.symbol);
    }
  },
  { immediate: true }
);
```

> 如果你不希望这段 `else` 分支重复触发，可以保留你原逻辑不变；仅当你观察到“恢复后首屏未订阅”再启用此分支。

---

## 各业务模块怎么配合（只给调用点）

> 原则：**模块只管自己的订阅池**，调用 `socketStore.updateModulePool(moduleKey, symbols)`；**不要直接触达 `wsService`**。Tabs 的“非选中”不再订阅，需求由 pinned + 其它模块池保证。

**SymbolList（虚拟滚动）**

```ts
// 复杂逻辑：可见行变化高频，合并到 RAF 再提交
let rafId: number | null = null;
const onVisibleDataUpdated = (rows: SymbolTabItem[]) => {
  const symbols = rows.map((r) => r.symbol);
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    rafId = null;
    socketStore.updateModulePool("SymbolList", symbols);
  });
};

onUnmounted(() => {
  socketStore.removeModulePool("SymbolList");
});
```

**OrderTabs（如果有“可见/展开”子表格）**

```ts
const commitVisibleSymbols = (symbols: string[]) => {
  socketStore.updateModulePool("OrderTabs", symbols);
};
onUnmounted(() => socketStore.removeModulePool("OrderTabs"));
```

**TradePanel / ChartPanel（如果组件内需要额外订阅，比如指标/深度）**

```ts
// 如果仅依赖 selectedTab 的报价/行情，不需要专门池；pinned 已覆盖
// 若还要额外 topic（如 DEPTH:xxx），用带前缀 key 管理
watch(
  () => extraTopics.value,
  (topics) => {
    socketStore.updateModulePool("ChartPanel#depth", topics);
  },
  { immediate: true }
);
onUnmounted(() => socketStore.removeModulePool("ChartPanel#depth"));
```

**NavTabs 切换（可选，若你在 tradeStore 里已 setPinned，这里不必重复）**

```ts
function handleChangeSymbol(symbol: SymbolTabItem) {
  // ...你的原有逻辑
  socketStore.setPinned(symbol.symbol); // 可省略，tradeStore 已做
}
```

---

## 说明

- 这样改完后：

  - **Tabs** 只维持“当前选中”为 pinned；**其它 Tab 一律不订阅**（满足你的“非选中要取消订阅”的要求）。
  - **真正订阅**由：SymbolList/OrderTabs 的**可见集合** + pinned **并集**统一决定。
  - **断线重连**：`socketStore` 的 `resubscribeAndWarmupSpecs()` 会用当前池 + pinned 自动恢复。

- 若后续你要区分不同通道（如 `QUOTE:EURUSD` / `DEPTH:EURUSD`），直接把模块池里的字符串加前缀即可，`socketStore` 的“求并集+差量同步”无需改动。

需要我顺手把 `socketStore` 添加 `batchSubscribe/batchUnsubscribe` 的落地实现（只改几行）吗？我可以按照你 `WebSocketService` 的现状给最小补丁。
