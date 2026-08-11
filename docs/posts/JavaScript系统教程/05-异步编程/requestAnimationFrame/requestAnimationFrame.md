---
title: "requestAnimationFrame"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "requestAnimationFrame 在这段行情 ‑ 刷新逻辑里的作用 特性 说明 对行情表格更新的好处 执行时机 requestAnimationFrame(rAF) 回调总是在 浏览器下一帧绘制之前 触发（16.6 ms≈60 fps）。 ► 把 一帧内 到来的多条 W。"
sidebarWeight: 100
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/requestAnimationFrame/requestAnimationFrame.md"
---
::: v-pre

# requestAnimationFrame

> 本节目标：理解“requestAnimationFrame”的核心思路，并能把它用于实际开发或面试表达。
**requestAnimationFrame 在这段行情****‑****刷新逻辑里的作用**

|   |   |   |
|---|---|---|
|**特性**|**说明**|**对行情表格更新的好处**|
|**执行时机**|requestAnimationFrame(rAF) 回调总是在 **浏览器下一帧绘制之前** 触发（16.6 ms≈60 fps）。|► 把 _一帧内_ 到来的多条 WebSocket 数据 **压缩为一次 DOM 更新**。
► 避免短时间内多次 patch/DOM 重排，显著降低卡顿与 Layout Thrashing。|
|**节能暂停**|当页面切到后台 / tab 失焦，浏览器会 **停止 rAF** 调度；回到前台自动恢复。|► 后台时不刷帧、不消耗 CPU；前台恢复后第一帧再更新，数据仍保持最新。|
|**节流天然 60** **fps**|最多一帧一次；即使行情每毫秒一条，也只渲染 60 fps — 足够平滑。|► 不必手写节流 / 防抖；避免 setTimeout 引发的 _帧间抖动_。|

**是否“中断****‑****恢复”** **？**
是的：当标签页被隐藏、系统进入低电量模式等，浏览器主动暂停 rAF 队列；重新可见后继续调度，这就是“自动中断‑自动恢复”。

**requestIdleCallback（rIC）与 rAF 的区别**

|   |   |   |
|---|---|---|
|**对比项**|**requestAnimationFrame**|**requestIdleCallback**|
|触发时机|**渲染前**（Paint 之前）|**渲染后、空闲片段**（有 50 ms 预算时）|
|适合任务|影响布局、需要尽快显示的视觉更新|不影响首屏、可延后执行的“后台”任务（缓存计算、日志上报…）|
|在隐藏标签页|暂停|继续，但时间片不稳定，最低 1 fps|
|行情刷新是否合适|✅：需要及时展示价格|❌：可能被拖到最小空闲片段，导致价格延迟跳动|

**如果确实想用 rIC 执行「不重要的增量计算」**

ts
复制编辑
function scheduleIdleFlush() \{ requestIdleCallback(function idleCb(deadline) \{ while (deadline.timeRemaining() \> 0 && queue.length) \{ consumeOneTask() \} if (queue.length) requestIdleCallback(idleCb) // 还没做完继续 \})\}
**不建议** 用来驱动闪烁价格，因为 rIC 可能数百毫秒后才触发，视觉不流畅。

**其他可选方案及示例代码**

|   |   |   |
|---|---|---|
|**方案**|**代码片段**|**适用场景 & 对比**|
|**setTimeout + throttle**|ts\nconst flush = throttle(realFlush, 16);\nws.onmessage = () =\> \{ queue.push(msg); flush(); \}\n|简单易懂；但 setTimeout 与渲染帧 **不同步**，可能卡在“半帧”造成掉帧；后台标签仍照常执行→浪费。|
|**MessageChannel 微任务批量**|ts\nconst mc = new MessageChannel();\nmc.port1.onmessage = flush;\nfunction schedule()\{ mc.port2.postMessage(null); \}\n|微任务优先级比 rAF 高，**可能阻塞渲染**；刷新频率无法随帧率自适应。|
|**Web Worker 汇总 → 主线程一次性 postMessage**|主线程只在 message 里 patch。|把计算移到 Worker，减轻主线程 CPU；仍需 rAF 或 throttle 保证渲染节奏。|
|**Vue 3 watchPostEffect + nextTick 批量**|对 reactive queue watch，在 nextTick 统一更新。|仍然有一帧多次 Rerender 的可能；需要额外节流。|

**小结与实战推荐**

1. **行情闪烁/价格跳动** 属于明显的视觉更新 → **首选 requestAnimationFrame**。
2. 若有 **重量级计算**（指标统计、历史回放）可以放进 Web Worker + postMessage；主线程仍用 rAF 取结果、刷新 DOM。
3. requestIdleCallback 适合 “不展示也行” 的缓存逻辑，不适合实时价格。
4. 只要保证 **一帧一次**、更新 diff 最小，即可在万行表格中保持流畅滚动。

:::
