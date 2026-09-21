---

title: PerformanceObserver 全面掌握（含你那段代码的逐行讲解）
date: 2025-11-08
tags: [Web性能, PerformanceObserver, Long Tasks, DevTools, 前端调试]
--------------------------------------------------------------

## 一、整体实现思路

* **PerformanceObserver 是什么**
  它是浏览器的 *Performance Timeline* 观察器，用来**订阅性能条目（PerformanceEntry）** 的到来，例如 `longtask`、`paint`、`resource`、`navigation`、`largest-contentful-paint`、`layout-shift`、`event` 等。每当浏览器把新的性能条目塞进时间线时，你注册的回调就会被调用，你就能**同步拿到发生了什么、何时发生、持续多久**。

* **为什么适合你现在的场景**
  你遇到的是“**过一段时间才突然卡死**”。不可能一直手动录制，所以让页面**自己监听**到异常征兆（比如 **Long Task > 200ms**）时，**自动开一次 CPU 采样**或者**打断点**，就能捕获“事发当时”的调用栈与热点函数。

* **用法范式**

  1. 构造 `new PerformanceObserver(callback)`；
  2. 调 `observe({ entryTypes: [...] })` 或 `observe({ type: 'xxx', buffered: true })` 开始订阅；
  3. 在回调里用 `list.getEntries()` 读取新条目（或 `takeRecords()` 主动取出）；
  4. 需要时 `disconnect()` 停止观察。

---

## 二、你的代码逐行讲解（带关键点）

```js
// 监控 Long Task，一旦 >200ms 立刻开始5秒 CPU Profile 并打印归因信息
(() => {
  let profiling = false; // 防抖：避免同时开启多个 profile

  // 创建观察器；当有新条目进入 Performance Timeline 时触发回调
  const po = new PerformanceObserver((list) => {
    // 一次回调里可能有多条条目，逐条处理
    for (const e of list.getEntries()) {
      // 只关心持续时间超过 200ms 的长任务，且当前未在采样中
      if (e.duration > 200 && !profiling) {
        profiling = true;
        const label = `spike-${Date.now()}`; // 唯一标签，方便在 Profiler 面板识别

        // 打印长任务的信息；attribution（若支持）可给出“归因”线索
        console.warn(
          "[LongTask]",
          e.duration.toFixed(1),
          "ms",
          e.attribution || []
        );

        console.profile(label); // 启动 DevTools 的 CPU 采样（Chrome/Edge/Fx 支持）
        setTimeout(() => {
          console.profileEnd(label); // 5 秒后结束本次采样
          profiling = false; // 允许下一次触发
        }, 5000);
      }
    }
  });

  // 订阅 longtask 条目；之后产生的长任务都会进入回调
  po.observe({ entryTypes: ["longtask"] });
})();
```

**要点解释：**

- `PerformanceObserver` 回调**运行在主线程**，但**只在性能条目生成时**触发；你这段逻辑很轻量，常驻无明显开销。
- `longtask` 条目来自 **Long Tasks API**。当主线程**单个任务 > 50ms** 会被记为 “长任务”；你用 `e.duration > 200` 作为阈值触发采样，更稳妥。
- `e.attribution`（如果有）会给出**归因上下文**（如来自某个 iframe/容器）。不同浏览器支持度略有差异，打印时要有兜底（你已经做了）。
- `console.profile/console.profileEnd` 会在 DevTools 的 **Performance/Profiler** 面板生成一条记录，名称就是 `spike-时间戳`。打开后看 **Bottom-Up / Self time** 即可锁定热点函数。

---

## 三、PerformanceObserver 快速上手（由浅入深）

### 1) 基础概念

- **PerformanceEntry**：所有条目都有 `name`、`entryType`、`startTime`、`duration`。
- **Timeline**：浏览器持续往里写条目。你可用

  - `performance.getEntriesByType('resource')` 拉历史，或
  - `PerformanceObserver` 持续订阅“新增条目”。

### 2) 订阅方式

- **多类型**：

  ```js
  const po = new PerformanceObserver(cb);
  po.observe({ entryTypes: ["resource", "paint", "longtask"] });
  ```

- **单类型 + buffered**：把**订阅前**已产生的条目也一并推给你（适合 `navigation`、`largest-contentful-paint`、`first-input`/`event` 等只在早期发生的条目）。

  ```js
  const po = new PerformanceObserver(cb);
  po.observe({ type: "largest-contentful-paint", buffered: true });
  ```

### 3) 实用的 entryType 一览

- `longtask`：主线程单任务 >50ms。**卡顿/掉帧**定位首选。
- `resource`：静态资源加载（请求时序、大小、协议）。
- `navigation`：整页加载时序（DNS、TCP、TTFB、DOM 解析等）。
- `paint`：`first-paint`、`first-contentful-paint`。
- `largest-contentful-paint`（LCP）：最大内容绘制。
- `layout-shift`（LS）/ `layout-shift` 组成 **CLS**：无用户输入触发的布局偏移。
- `event`：事件响应时序（与 **INP** 相关）；可配合 `performanceEventTiming`。
- `element`：元素级的自定义渲染计时（需设置 `elementtiming` 属性）。

> 具体可根据你关心的指标挑着订阅；不需要就别订阅，减少噪声。

### 4) 生命周期与控制

- `disconnect()`：停止观察；
- `takeRecords()`：**立即**把内部队列的条目取出来（不等待回调触发）；
- 一个页面可创建多个 `PerformanceObserver`，建议**按场景分组**（如“加载阶段一组、交互阶段一组”）。

---

## 四、进阶：如何把它用到“突发卡顿抓捕”

### 1) 自动采样（你已实现）

- 监听 `longtask`，**超过阈值**（建议 120–200ms）就 `console.profile` 开 N 秒；
- 每次只开一个采样，避免重叠（用开关变量防抖）。

### 2) 配合 DOM/监听器“暴增”触发

```js
// 5s 窗口统计 DOM/监听器暴增；超阈值触发一次 profile + debugger
(() => {
  let addNodes = 0,
    addListeners = 0,
    profiling = false;

  // 统计 DOM 新增
  const mo = new MutationObserver((muts) => {
    for (const m of muts) addNodes += m.addedNodes?.length || 0;
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // hook 监听器注册
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, opts) {
    addListeners++;
    return orig.call(this, type, listener, opts);
  };

  setInterval(() => {
    const nodes = addNodes,
      lis = addListeners;
    addNodes = 0;
    addListeners = 0;
    if (!profiling && (nodes > 500 || lis > 300)) {
      profiling = true;
      const label = `surge-${Date.now()}`;
      console.warn("[surge]", { nodes, lis });
      debugger; // 命中就断
      console.profile(label);
      setTimeout(() => {
        console.profileEnd(label);
        profiling = false;
      }, 5000);
    }
  }, 5000);
})();
```

### 3) `buffered: true` 的妙用

很多条目（例如 LCP）**只在加载早期出现**。如果你的观察器**晚于页面加载**才启动，务必：

```js
const po = new PerformanceObserver(cb);
// 把启动前的历史 LCP 也推送给你
po.observe({ type: "largest-contentful-paint", buffered: true });
```

### 4) 在 Worker 中使用

`PerformanceObserver` 也可在 **Dedicated Worker** 里使用（取决于条目类型与浏览器实现）。对“计算型突发”驻留在 Worker 的场景，在 **主线程**和 **Worker** 各自挂观察器更可靠。

---

## 五、与 DevTools 的配合与注意事项

- `console.profile`/`console.profileEnd` 需要 DevTools 支持（Chrome/Edge/Firefox OK，Safari 行为不同）；**即使 DevTools 未打开**，Chrome 也会记录，打开后可查看。
- **开销**：`PerformanceObserver` 自身很轻；真正的开销在 **采样**（profile）阶段，所以要**短时**（5–10s）、**有阈值**（>200ms/暴增）地触发。
- **归因**：`e.attribution` 支持度不一；若为空，可在业务关键路径加 `performance.mark/measure` 自定义埋点，配合 Timeline 更好读。

---

## 六、最简可复用模板

```js
// 统一封装一个“阈值触发采样”的观察器
function observeLongTaskAndProfile(thresholdMs = 200, durationMs = 5000) {
  let profiling = false;
  const po = new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.duration > thresholdMs && !profiling) {
        profiling = true;
        const label = `spike-${Date.now()}`;
        console.warn(
          "[LongTask]",
          e.duration.toFixed(1),
          "ms",
          e.attribution || []
        );
        console.profile?.(label); // 容错；部分环境可能无此 API
        setTimeout(() => {
          try {
            console.profileEnd?.(label);
          } finally {
            profiling = false;
          }
        }, durationMs);
      }
    }
  });
  po.observe({ entryTypes: ["longtask"] });
  return () => po.disconnect(); // 返回停止函数，供路由卸载时调用
}

// 使用：
const stop = observeLongTaskAndProfile(200, 5000);
// 路由卸载或页面销毁时：stop();
```

---

## 七、常见坑与最佳实践清单

- **不要一次订阅过多类型**：只订你分析需要的，降低噪声。
- **长任务阈值**：50ms 是标准定义，**触发动作建议 ≥120–200ms**，否则误报多。
- **配合 DOM/监听器检测**：卡死常见原因是“监听器/遮罩逐步堆积”，与 Long Task 联动更准。
- **路由/组件卸载记得 `disconnect()`**：避免内存与回调泄漏。
- **跨源 iframe**：`longtask` 可能只显示“同源/跨源容器”层面的归因，细节受同源策略限制。
- **采样时间**：5–10s 足够锁定热点；时间越长对性能影响越大。
- **Worker 与主线程分别观察**：计算密集型任务放到 Worker 后，主线程的 `longtask` 不再出现，但卡顿可能来自**事件风暴/样式抖动**，要分别看。

---

## 八、再给两个实战场景

### 场景 A：页面加载关键指标

```js
// 一次性拉取首屏关键指标
new PerformanceObserver((l) => {
  console.table(
    l.getEntries().map((e) => ({
      type: e.entryType,
      name: e.name,
      ts: e.startTime.toFixed(1),
      dur: e.duration.toFixed(1),
    }))
  );
}).observe({ entryTypes: ["navigation", "paint", "largest-contentful-paint"] });
```

### 场景 B：检测 Layout Shift 的来源

```js
// 订阅 layout-shift；过滤有用户输入的（不计入 CLS）
let cls = 0;
new PerformanceObserver((list) => {
  for (const e of list.getEntries()) {
    if (!e.hadRecentInput) {
      cls += e.value;
    }
  }
  console.log("CLS=", cls);
}).observe({ type: "layout-shift", buffered: true });
```

---

## 结语

- 记住三个关键词：**订阅（observe）→ 过滤（阈值/类型）→ 触发行动（profile/断点/埋点）**。
- 你的那段“Long Task 触发采样”是正确的思路：**轻量常驻 + 事发自捕**。
- 若你愿意贴一条 `spike-*` 采样里 **Bottom-Up Top1 的函数名与 URL:行号**，我可以直接给**最小修改片段**（复杂行上一行写中文注释），针对性把“偶发满核”根治掉。

看样子你的“长任务观测”完全没触发——这通常意味着**问题不在主线程**（如跑在 Dedicated Worker 里），或者**没有单次 >200ms 的长任务**，而是很多中短任务堆积到 100%（这同样会把页面拖死，但不会命中你设的阈值）。
下面给你一套“主线程 + Worker 双通道”的**低开销守株待兔方案**，不用一直录制；等异常出现时会自动留下可用的栈或 Profile。

---

## A. 主线程：用“忙碌占比”而不是 LongTask 来触发

> 放在页面初始化处。命中时会 `console.profile` + `debugger`（可直接断到现场）。

```js
// 复杂：用 rAF 估算 3 秒窗口的“忙碌占比”，>60% 即判定为异常并采样
(() => {
  let profiling = false;
  let last = performance.now();
  let winStart = last,
    busyMs = 0;

  function loop(t) {
    const gap = t - last;
    last = t;
    // 复杂：理想帧 16.7ms，多出来的当作“忙碌时间”
    busyMs += Math.max(0, gap - 16.7);

    // 复杂：每 3 秒窗口评估一次
    if (t - winStart >= 3000) {
      const ratio = busyMs / (t - winStart);
      if (ratio > 0.6 && !profiling) {
        profiling = true;
        const label = `busy-${Date.now()}`;
        console.warn("[busy-ratio]", (ratio * 100).toFixed(0) + "%");
        debugger;
        console.profile?.(label);
        setTimeout(() => {
          console.profileEnd?.(label);
          profiling = false;
        }, 5000);
      }
      winStart = t;
      busyMs = 0;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
```

**解释**：就算没有单个 >200ms 的长任务，**持续掉帧**也会触发；如果这段依旧**从不触发**而 CPU 却满了，基本可判定：**是 Worker 在烧 CPU**。

---

## B. 判断是否是 Worker 导致 + 标出“哪个 Worker”

> 不改你业务逻辑，只在主线程**包一层 Worker 构造器**，记录创建栈，并对每个 Worker 做“心跳 ping”。

```js
// 复杂：Hook Worker 构造，记录创建来源，并做 ping/pong 探测“卡死”的 Worker
(() => {
  const OrigWorker = window.Worker;
  const meta = new WeakMap();

  window.Worker = function (url, opts) {
    const w = new OrigWorker(url, opts);
    // 复杂：记录创建来源（第一条业务栈）
    const s =
      (new Error().stack || "")
        .split("\n")
        .slice(2)
        .find((l) => !/VM|snippet|DevTools/.test(l)) || "unknown";
    meta.set(w, { url: String(url), site: s, ok: 0, lost: 0 });

    // 复杂：心跳——每 2s 发一条，1s 内未回则记为 lost
    setInterval(() => {
      try {
        const id = Math.random().toString(36).slice(2);
        let hit = false;
        const to = setTimeout(() => {
          if (!hit) {
            const m = meta.get(w);
            m.lost++;
            console.warn("[worker timeout]", m.url, m.site, {
              lost: m.lost,
              ok: m.ok,
            });
          }
        }, 1000);
        const onMsg = (e) => {
          if (e && e.data === "pong:" + id) {
            hit = true;
            clearTimeout(to);
            w.removeEventListener("message", onMsg);
            const m = meta.get(w);
            m.ok++;
          }
        };
        w.addEventListener("message", onMsg);
        w.postMessage("ping:" + id);
      } catch (_) {}
    }, 2000);

    return w;
  };
})();
```

**怎么用**：等到 CPU 爆表那一刻，看 Console 哪个 `[worker timeout]` 一直报，就知道**是哪一个 Worker 失联/忙死**，并且能看到**创建位置的文件:行号**（`site`）。

> 若你的 Worker 自己不会回 `pong`，在 **Worker 脚本里**加下面 C-1 段（无需改业务逻辑）。

---

## C. Worker 端最小插桩（建议加在你能改到的每个 Worker 顶部）

### C-1 基础心跳（配合上面的 ping/pong）

```js
// 复杂：Worker 端心跳：收到 'ping:ID' 立刻回 'pong:ID'
self.addEventListener('message', (e) => {
  const v = e.data;
  if (typeof v === 'string' && v.startsWith('ping:')) {
    // 复杂：直接同步回执，证明 event loop 可用
    (self as any).postMessage('pong:' + v.slice(5));
  }
});
```

### C-2 Worker 自检“忙碌”并主动打断/采样

```js
// 复杂：用 setInterval 估算 Worker 事件循环的停顿；明显停顿则触发断点/短采样
(() => {
  let profiling = false, last = Date.now();
  setInterval(() => {
    const now = Date.now(), gap = now - last; last = now;
    if (gap > 200 && !profiling) {             // 明显卡顿
      profiling = true;
      // 复杂：触发断点；DevTools 已附上该 Worker 时会直接停到这里
      debugger;
      // 复杂：尽量兼容的“取样”——有的环境不支持 console.profile
      (console as any).profile?.('worker-spike');
      setTimeout(() => { (console as any).profileEnd?.('worker-spike'); profiling = false; }, 5000);
    }
  }, 100);
})();
```

> 有了 C-2，就算问题只发生在 Worker，**也能在那一刻自动停住**（`debugger;`）并生成 `worker-spike` 的 Profile。

---

## D. DevTools 操作要点（不录长期也能抓到）

1. **Sources → Threads**：展开每个 _Dedicated Worker_，先点开（保持连接）。
2. **出现异常时**，在 Sources 顶部按一次 **“|| 暂停”**：谁在忙，谁的栈就会显示。
3. **Performance** 不用一直录：靠 A/B/C 的自动触发，Profile 会以 `busy-* / worker-spike` 的名字出现在列表。

---

## E. 结果解读与修复指引（拿到文件:行号后）

- **定时器/重连越绑越多（常见 20 分钟爆）**

  - 修：在 `onUnmounted/useEffect return` 清理；为重连加“进行中守卫”。

  ```ts
  // 复杂：避免重连并发
  let reconnecting = false;
  function reconnect() {
    if (reconnecting) return;
    reconnecting = true;
    // ... 重连逻辑 ...
    setTimeout(() => (reconnecting = false), 800);
  }
  ```

- **Worker 死循环/大批量同步处理**

  - 修：加“分片 + 让步”，避免一次性吞掉事件循环。

  ```js
  // 复杂：Worker 内大循环每 N 次让步一次
  async function heavyLoop(N: number) {
    let fuse = 0;
    for (let i = 0; i < N; i++) {
      if (++fuse % 10000 === 0) await 0; // 在 Worker 可用 await Promise.resolve()
      // ... 原逻辑 ...
    }
  }
  ```

- **主线程布局/样式抖动**（若最后落在 `Recalculate Style/Layout`）

  - 修：批量改样式，用 `DocumentFragment`/一次性更改类名；避免读写交替。

---

### 你现在就做

1. 把 **A**（主线程忙碌占比）和 **B**（Worker 识别 + 心跳）先贴进 Console；
2. 能改 Worker 的话，把 **C-1/C-2** 加到 Worker 顶部；
3. 等到它再次爆发，发我**Console 报的 `[worker timeout]` 站点**或**断住时的文件:行号/Top 函数名**，我按你的框架给**最小修改片段**（复杂行上一行中文注释）。
