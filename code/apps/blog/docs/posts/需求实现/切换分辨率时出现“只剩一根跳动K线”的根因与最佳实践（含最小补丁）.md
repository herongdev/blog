---

title: 切换分辨率时出现“只剩一根跳动K线”的根因与最佳实践（含最小补丁）
date: 2025-09-30
tags: [klinecharts-pro, WebSocket, 重试, 指数退避, 数据一致性, Vue3]
---------------------------------------------------------

## 核心结论

- 现象本质：**历史K线请求失败**或被**并发/竞态覆盖**时，实时报价（tick）仍在推送，被图表库拼接成“最后一根跳动K线”，导致前面的历史段缺失。
- **最佳实践**：

  1. **历史优先**：只有当**历史加载成功**（且首屏K线已渲染）后，才**接入**实时流；历史失败时**缓冲**实时tick，不直接灌入图表。
  2. **指数退避重试**（含抖动 jitter），**可取消**（切分辨率/切品种时立即取消旧请求与旧订阅）。
  3. **单航道/状态机**控制数据流：`idle → loading → ready → error`；在 `ready` 前，WebSocket 的 tick 只进**内存缓冲**；到 `ready` 再一次性“补写+追平”。
  4. **防竞态**：切换周期/品种时，**取消上一次历史请求**与**解绑旧socket**，只允许**最近一次**请求落地。

> 你当前 `KLineChartPro.tsx` 已经完善了尺寸自适应与实例切换，但没有对“历史加载成功后再接Realtime”做强约束，容易在历史失败时出现“孤根跳动K线”。

---

## 设计示意

- `CustomDatafeed` 维护：

  - `state: 'idle' | 'loading' | 'ready' | 'error'`
  - `currentReqToken`（用于取消过期请求）
  - `realtimeBuffer: Tick[]`（历史加载前暂存）
  - `fetchCandlesWithRetry()`（指数退避+取消）
  - 事件：`onHistoryReady`, `onHistoryError`, `onRealtimeTick`

- `KLineChartPro.tsx / Chart.vue`：

  - 切换分辨率/品种 → **先取消旧的** → 触发 `datafeed.loadHistory` → `onHistoryReady` 后再 `attachRealtime()` 并将 `realtimeBuffer` 一次性合并。

---

## 需要修改的代码（最小补丁）

### A) `CustomDatafeed.ts` —— 加重试、缓冲与可取消

```ts
// 复杂逻辑：为每次历史拉取生成一个 token；新请求开始时使旧 token 失效，从而“取消”旧请求的落地
let currentReqToken = 0;

// 复杂逻辑：在历史未 ready 前，把 socket tick 暂存到缓冲区
const realtimeBuffer: Array<{
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}> = [];

// 复杂逻辑：状态机，控制历史与实时的接入顺序
let state: "idle" | "loading" | "ready" | "error" = "idle";

// 复杂逻辑：指数退避 + 抖动；支持最大重试次数和超时
async function fetchCandlesWithRetry(
  params,
  {
    maxAttempts = 5,
    baseDelay = 300, // ms
    jitter = true,
    timeoutMs = 10000, // 单次请求超时
  } = {}
) {
  const myToken = ++currentReqToken;
  state = "loading";
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // 复杂逻辑：若该请求已过期（被新请求替换），直接中断
      if (myToken !== currentReqToken) throw new Error("Request cancelled");

      // 复杂逻辑：为请求包一层超时
      const res = await withTimeout(doFetchCandles(params), timeoutMs);
      if (myToken !== currentReqToken) throw new Error("Request cancelled");

      // 复杂逻辑：成功 → 进入 ready，回放缓冲区
      state = "ready";
      emit("historyReady", res);
      if (realtimeBuffer.length) {
        emit("patchRealtime", realtimeBuffer.splice(0, realtimeBuffer.length));
      }
      return res;
    } catch (err) {
      // 复杂逻辑：被取消则直接退出；否则指数退避
      if ((err as Error).message === "Request cancelled") return;
      if (attempt === maxAttempts) {
        state = "error";
        emit("historyError", err);
        return;
      }
      const delay = baseDelay * 2 ** (attempt - 1);
      const sleep = jitter
        ? delay * (0.5 + Math.random()) // 抖动降低雪崩
        : delay;
      await wait(sleep);
    }
  }
}

// 复杂逻辑：供外部调用——切换分辨率/品种时拉取历史；开始前清空缓冲并重置状态
async function loadHistory(params) {
  // 切换请求：使旧请求失效、清空缓冲、重置状态
  ++currentReqToken;
  realtimeBuffer.length = 0;
  state = "loading";
  return fetchCandlesWithRetry(params);
}

// 复杂逻辑：socket tick 到来时的策略：历史未就绪 → 只入缓冲；历史 ready → 直接派发
function onSocketTick(tick) {
  if (state !== "ready") {
    realtimeBuffer.push(tick);
  } else {
    emit("realtimeTick", tick);
  }
}
```

> `doFetchCandles(params)` 与 `emit(...)`、`withTimeout`、`wait` 为你现有/易补充的工具函数。若已有同名函数，按项目实参对齐即可。

---

### B) `KLineChartPro.tsx` —— 切换品种/分辨率时的接入顺序

```ts
// 复杂逻辑：当切换 symbol / period 时，先取消旧数据流，再按“历史→实时”的顺序接入
function applySymbolOrPeriod(next) {
  // 1) 解绑旧 realtime（避免旧流插入导致竞态）
  datafeed.detachRealtime?.();

  // 2) 拉取历史（带指数退避）
  datafeed.loadHistory({
    symbol: next.symbol,
    resolution: next.resolution, // 例如 '1D'|'1W'|'1M'|'1Y'
    from: next.from,
    to: next.to,
  });

  // 3) 监听历史 ready 后，再 attach 实时；同时回放缓冲（由 datafeed 内部 emit('patchRealtime')）
  const offReady = datafeed.on("historyReady", (candles) => {
    chartInstance?.applyNewData?.(candles, true); // true 表示刷新
    datafeed.attachRealtime?.(); // 现在才接入 socket
    offReady();
  });

  // 4) 历史失败：提示 & 不接入 realtime（避免“孤根跳动K线”）；等待用户重试或自动重试
  const offError = datafeed.on("historyError", (err) => {
    noticeApi.error({
      message: t("kline.load-failed"),
      description: String(err),
    });
    offError();
  });
}
```

> 你当前 `setSymbol` 是直接切实例或 `setSymbol(...)`；在外层把**历史加载和实时接入拆开**，可彻底规避“历史失败但实时还在写”的问题。

---

### C) （可选）重试策略参数与统一超时

```ts
// 复杂逻辑：在 datafeed 构造参数里暴露重试配置，便于后续按不同分辨率调参
new CustomDatafeed({
  // ... 原有参数
  retry: {
    maxAttempts: 5, // 最高重试5次
    baseDelay: 300, // 300ms 起步
    jitter: true, // 开启抖动
    timeoutMs: 10000, // 单次请求超时10s
  },
});
```

---

## 常见坑位与对策

1. **竞态**：快速切换 “日 → 周 → 月 → 年”，上一个请求慢返回把**后一个**结果覆盖。

   - 对策：**请求令牌/序列号**判断，过期请求直接丢弃（见 `currentReqToken`）。

2. **实时重复订阅**：忘解绑，产生**多路重复写入**。

   - 对策：切换前 `detachRealtime()`；仅在 `historyReady` 后 `attachRealtime()`。

3. **历史与实时边界对齐**：历史的最后一根时间戳，要与实时的第一笔对齐，避免重叠或断档。

   - 对策：在 `patchRealtime` 回放时，以**历史最后一根**时间戳为基准做“**去重/补齐**”。

4. **失败后的 UI**：不要让“孤根跳动 K 线”误导用户。

   - 对策：历史失败时保持**空态或旧数据**，并提供“重试按钮/自动重试提示”。

5. **服务器限流**：指数退避+抖动是业界通用策略（AWS/GCP/Cloudflare 文档同口径）。

   - 对策：同时对相同参数的短时间重复请求做**合并/去抖**。

---

## 你可以这样落地（实施顺序）

1. 在 `CustomDatafeed` 实装**状态机 + 指数退避重试 + 可取消 + 实时缓冲**。
2. 在 `KLineChartPro.tsx` 的分辨率/品种切换路径上，改为**“先历史后实时”**（见补丁 B）。
3. 在 UI 上对历史失败给出**明确提示**与**重试**；保留上一次成功数据，避免“空白 + 跳动一根”。
4. 加入**监控埋点**（拉取耗时、失败率、重试次数、最终是否成功）以便后续优化阈值。

如需要，我可以基于你 `CustomDatafeed.ts` 的实际方法名，把上面的伪代码改成**可直接粘贴的补丁**版本（保持你项目的类型与命名风格）。
