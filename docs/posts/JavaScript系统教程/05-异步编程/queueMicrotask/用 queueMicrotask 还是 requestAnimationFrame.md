---
title: "用 queueMicrotask 还是 requestAnimationFrame"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "短答： 更合适。 因为我们只是把 core 的内部状态“同步到响应式 state”（纯数据更新），希望 在同一个事件循环内、下一拍微任务 就合并写回， 不延迟到下一帧 。rAF 会等到 下一次重绘前 （一帧后的宏任务），多出一帧的延迟，还会在后台标签页被 节流/暂停 ，而微任务不。"
sidebarWeight: 95
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/queueMicrotask/用 queueMicrotask 还是 requestAnimationFrame.md"
---
::: v-pre

# 用 queueMicrotask 还是 requestAnimationFrame

> 本节目标：理解“用 queueMicrotask 还是 requestAnimationFrame”的核心思路，并能把它用于实际开发或面试表达。
短答： **更合适。**
因为我们只是把 core 的内部状态“同步到响应式 state”（纯数据更新），希望**在同一个事件循环内、下一拍微任务**就合并写回，**不延迟到下一帧**。rAF 会等到**下一次重绘前**（一帧后的宏任务），多出一帧的延迟，还会在后台标签页被**节流/暂停**，而微任务不会。

**为什么选 queueMicrotask**

1. **时序更贴合 Vue 3 的调度******Vue 的 nextTick/job flush 本身就跑在**微任务**上。我们用 queueMicrotask 合并写回，能让：
2. 本轮同步/Promise 链的多次 sync() 合并成**一次**，
3. 然后在同一个宏任务里触发依赖更新，**不必等到下一帧**。
4. **避免 UI 延迟与“看见旧值”******rAF 至少晚一个 frame。像 blur → finalize → 校验 这种提交点，如果用 rAF，外部 watch/校验提示可能**滞后一帧**，交互上会“慢半拍”。
5. **SSR/Node/测试环境更稳******rAF 在 SSR/Node 不存在、在后台标签会被节流；queueMicrotask 在这些环境都能工作（实在不行还可以 Promise.resolve().then 兜底）。
6. **与异步校验的相对顺序更可控******你现在是 core.validate().then(sync)。then 本身是微任务；sync 再 queueMicrotask，两者会在**同一宏任务内**按顺序执行完（不会拖到下一帧）。若换成 rAF，可能导致**校验已完成但界面晚一帧才反映**。

**何时才考虑 requestAnimationFrame？**

- 你要做**读/写布局**或动画节奏控制（如测量 DOM 尺寸、避免 layout thrash），需要把写入放到下一帧前统一批处理时；
- 或者你确实想**有意识地**把更新延迟到下一帧（视觉合成前）。

当前场景只是**写响应式数据**，没有测量/动画，**不需要 rAF**。

**简洁实现（含兜底）**

// 用微任务合并多次 sync；同一宏任务只进来一次let pending = false
const scheduleMicrotask: (fn: () =\> void) =\> void = typeof queueMicrotask === 'function' ? queueMicrotask // 兜底：老环境用 Promise 微任务 : (fn) =\> Promise.resolve().then(fn)
const sync = () =\> \{ if (pending) return pending = true scheduleMicrotask(() =\> \{ pending = false // 真正的状态写回（一次性） Object.assign(state, \{ rawValue: core.state.rawValue, formattedValue: core.state.formattedValue, isValid: core.state.isValid, errors: [...core.state.errors], validating: core.state.validating, \}) \})\}

:::
