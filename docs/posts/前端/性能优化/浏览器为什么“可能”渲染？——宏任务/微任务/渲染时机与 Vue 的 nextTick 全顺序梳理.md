---
title: 重点-浏览器为什么“可能”渲染？——宏任务/微任务/渲染时机与 Vue 的 nextTick 全顺序梳理
date: 2025-10-11
---

## TL;DR（结论先行）

- 一个“浏览器帧”的**典型顺序**（简化）：

  1. **Task（宏任务）**
  2. **Microtasks（微任务检查点）**：`Promise.then`/`queueMicrotask`
  3. **`requestAnimationFrame` 回调**
  4. **Microtasks（再次检查点）**
  5. **渲染机会（样式计算/布局/绘制/合成）** ← **这里“可能”发生绘制**
  6. **`requestIdleCallback`**（若本帧有空闲）

- “**可能**渲染”的原因：浏览器**有权跳过这一帧的绘制**（无可见变更/后台标签页/性能节流/被连续微任务“饿死”等）。
- **Vue 3** 把更新**批量**安排在**微任务**里；`nextTick` 的回调会在**本轮 DOM patch 完成之后**执行，仍属于微任务阶段。

---

## 为什么是“可能发生一次绘制”？

浏览器每一帧**只有一个“渲染机会”**，但是否真的去绘制，取决于以下条件：

1. **没有可见变化**：样式/布局/像素都没变 → 跳过绘制。
2. **页面不可见/后台标签**：根据 Page Visibility/节流策略，绘制频率被大幅降低甚至暂停。
3. **节流与合成优化**：有些变更（如仅合成层 transform/opacity）可由合成器线程处理，不一定每帧主线程都要完整“样式 → 布局 → 绘制”。
4. **主线程被占用**：若你在一帧中不断塞入微任务，可能导致**微任务饥饿**，渲染时机被一再推迟。
5. **浏览器合帧/省电策略**：屏幕刷新率/系统负载/节能模式下，浏览器可主动减少绘制帧数。

> 所以规范里描述为“**update the rendering**（更新渲染）”，这一步**提供绘制的机会**，但不保证**一定**输出一帧像素。

---

## 事件循环——标准顺序图（可记忆版本）

**一帧内的关键阶段：**

```
[1] 宏任务（Task）      例如：setTimeout 回调、事件回调、脚本执行入口
[2] 微任务检查点        例如：Promise.then / queueMicrotask
[3] requestAnimationFrame 回调（可见文档）
[4] 微任务检查点        一些实现会在 rAF 后再跑一次微任务，清理尾巴
[5] 更新渲染（样式/布局/绘制/合成）← 可能绘制，也可能跳过
[6] requestIdleCallback（若本帧还有空闲时间）
→ 下一帧或下一个 Task
```

**与三个常见 API 的关系：**

- `setTimeout(cb, 0)`：排入 **[1] 宏任务**（下一轮 Task）。
- `Promise.then / queueMicrotask`：排入 **[2]/[4] 微任务**（本轮 Task 结束立刻执行，**渲染前**）。
- `requestAnimationFrame`：发生在 **[3]**，**微任务之后、渲染之前**。

---

## Vue 3 的渲染时机与 nextTick 在哪？

**Vue 3 的核心点：批处理 + 微任务调度。**

- 当你修改响应式数据时，Vue **不会立刻渲染**，而是把渲染任务放进一个队列；
- 这个队列的**刷新（flushJobs）被安排在微任务**中（通常通过 `Promise.resolve()`）；
- **DOM patch（渲染）发生在这个微任务的 flush 过程中**；
- `nextTick` 会把你的回调**排在渲染 flush 之后**的微任务里，因此**能读到更新后的 DOM**。

### 把 Vue 放进整体时间线（单帧）：

```
同步代码（你的事件处理 / 方法调用）
  └─ 触发响应式变更：Vue 把渲染任务加入队列（不立即渲染）
Task 结束
↓
Microtasks 检查点：
  ├─ Vue flushJobs：执行计算/patch → 更新真实 DOM
  └─ Vue 的 nextTick 回调（在 flush 之后）→ 你读到“已更新”的 DOM
↓
requestAnimationFrame
↓
（再次 Microtasks 检查点，视实现而定）
↓
渲染机会（可能绘制）
```

> 这也解释了：**为什么 `await nextTick()` 后读取 DOM 是安全的**——因为 Vue 的 patch 已在**同一轮微任务**的**更早阶段**完成。

---

## `queueMicrotask` / `Promise.then` / `setTimeout` 的位次对比

- **`queueMicrotask` 与 `Promise.then`**：同属微任务，发生在**Task 结束后、rAF 与渲染之前**。

  - 差别在于语义与开销：`queueMicrotask` 更轻，不引入 Promise 链；`then` 便于链式处理。

- **`setTimeout`**：下一轮 **Task**，发生在**渲染机会之后**（通常会比 microtask 晚一拍甚至一整帧）。

这就是在 i18n 初始化里**优先用 `queueMicrotask`**的原因：
**不阻塞首屏**，但**尽可能早**（在本轮渲染前）触发语言包懒加载与切换，缩短“临时英文 → 目标语言”的可见窗口。

---

## 常见疑惑与例外

### 1) 为什么我改了样式却没立刻看到？

可能落在以下情况：

- 改动还在**微任务阶段**，浏览器**尚未进入渲染机会**；
- 改动只影响合成层，由合成器线程合成，**不会每次都触发布局/绘制**；
- 页面在后台或被节流，这一帧**被跳过**。

### 2) 连续大量微任务会怎样？

- 可能造成**微任务饥饿**（一直在跑微任务，导致 rAF/渲染迟迟不到）；
- 解决：在密集计算中**分片**（`setTimeout`/`scheduler.postTask`/`requestIdleCallback`）或使用 Web Worker。

### 3) `nextTick` 和 `requestAnimationFrame` 谁先？

- **先 `nextTick`（微任务），后 `rAF`（渲染前阶段）**。
- 想在**真正绘制完成**后读取（例如截图/像素检测），考虑在 `rAF` 内再排一个 `setTimeout(0)`（下一轮 Task），或使用 `await paint` 类的策略（需自定义同步点）。

---

## 开发中怎么用这套顺序做判断？

- **读更新后的 DOM**：`await nextTick()`（Vue）或确保逻辑在**微任务**里执行。
- **尽快触发但不阻塞**：用 `queueMicrotask`。
- **让出一帧，避免卡顿**：用 `setTimeout(0)` 或 `requestIdleCallback`（有空闲才跑）。
- **和绘制对齐**：用 `requestAnimationFrame`，它在渲染前回调里给你**最后时刻**的控制权。

---

## 口袋卡片（Cheat Sheet）

- **帧序**：Task → Microtasks → rAF → Microtasks → **Render(可能)** → Idle → Next Task
- **微任务**：Promise.then / queueMicrotask / Vue 的 flush 与 nextTick
- **宏任务**：setTimeout / 事件回调 / 网络回调
- **“可能”渲染**：无可见变化、后台、节流、合成优化、微任务饥饿，都可能跳过
- **Vue**：更新合并 → 微任务阶段 flush → DOM patch 完成 → `nextTick` 回调 → rAF → 绘制

---

### 一句话总结

**把“微任务在前、渲染在后”的大框架记住**：Vue 的 DOM 更新发生在微任务的 flush 中，`nextTick` 也在微任务中但晚于 patch；rAF 在渲染前；真正绘制**可能**发生，也可能被跳过。掌握这个顺序，你就知道**该把哪段代码放在哪个阶段**，以换来更稳的时序与更快的体验。
