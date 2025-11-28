---
title: Chrome 为何“一个标签 100% CPU 卡死，其他标签却很顺”？——多进程与调度的真相
date: 2025-11-10
tags: [浏览器内核与性能, 性能, Chrome, 多进程, 渲染器]
description: 这一篇从官方文档出发，系统解释 Chrome 的多进程模型、渲染线程结构、事件循环与长任务、后台节流与冻结、GPU 共享进程等；并给出可复制的最小演示与排障步骤，帮助你从根因上理解“为何一个标签会卡死而不拖累其它标签”。
---

## 概览（读者收益）

- 明确 **“一个标签卡死 ≠ 整机满核”**：大多数卡顿是该标签 **渲染进程的主线程** 被长任务堵住，OS 不能把“一个线程里的活”拆给多核并行。其它标签在其它渲染进程里，互不阻塞。([Chrome for Developers][1])
- 了解 **Chrome 多进程 + 站点隔离** 如何实现跨标签/跨站的性能与故障隔离。([chromium.org][2])
- 掌握 **后台标签节流/冻结**、**GPU 共享进程的影响**、以及 **开发者侧的避坑与优化手段**（`scheduler.yield`、`scheduler.postTask`、Web Workers、OffscreenCanvas、WASM 线程）。([Chromium Blog][3])

---

## 整体思路

1. **架构层面**：Chrome 把浏览器拆成 Browser、GPU、Network 和「大量 Renderer」。默认一个站点（含跨站 iframe 时可能更多）对应一个或数个 **渲染进程**，从根上隔离卡顿与崩溃。([chromium.org][2])
2. **进程内侧**：**渲染进程只有一个主线程** 负责 JS/样式/布局；还有 **合成线程**、**栅格线程**、V8 后台线程等，动画/滚动可在合成线程保持一定流畅，但遇到需要主线程参与的工作仍会卡。([Chrome for Developers][1])
3. **调度与限流**：前台优先用户输入/动画；后台标签的定时器被强力节流（M87 起 **每分钟 1 次唤醒**），并可进一步 **冻结**。([Chromium Blog][3])

---

## 原理详解

### 1）多进程与站点隔离：为什么别的标签不受影响

- Chrome 的 **多进程架构**：Browser（主控/UI/权限）、**Renderer（每站点/站点实例）**、**GPU（全局共享）**、Network（网络服务）。某个标签卡死，通常局限在它的渲染进程，不会拖垮其它标签的渲染进程。([chromium.org][2])
- **站点隔离（Site Isolation）** 进一步把跨站 iframe 拆到不同渲染进程，实现更强隔离与安全。([Chromium][4])

### 2）渲染器内部：主线程为何会把 CPU「吃满」

- **主线程（Main thread）**：执行 JS、样式计算、布局、部分绘制准备，是交互是否卡顿的关键。**一个渲染进程只有一个主线程**。([Chrome for Developers][1])
- **合成线程（Compositor）**：在不依赖主线程的情况下可处理输入、合成滚动、层合成，减轻卡顿表象；但遇到需要主线程参与的布局/脚本时依然卡。([chromium.org][5])
- **事件循环与长任务**：超过 50ms 的任务记为 **Long Task**，会堵住输入、动画帧回调等，DevTools 有明确标注与定位方法。([Chrome for Developers][6])

### 3）“多核为什么救不了一个卡死的标签？”

- OS 能把 **线程** 调度到任意核心，但**无法把单个线程的同步计算自动拆分**到多核并行；你的长 JS/布局任务若不主动拆分或并行化，就只能**吃满一个核心**。解决在于 **把工作分出去**（Worker/WASM 线程）或 **切片让路**（`scheduler.yield`/`postTask`）。([MDN Web Docs][7])

### 4）后台标签的节流/冻结规则

- **M87 起**：后台标签 **JS 定时器唤醒降到每分钟 1 次**，实测可把 CPU 降至原来的 1/5，显著省电。([Chromium Blog][3])
- **更激进的“链式定时器”节流**：Chrome 88 对长时间隐藏页面的连续定时器进一步限制，防止“假活跃”。([Chrome for Developers][8])

### 5）例外：GPU 共享进程可能造成跨标签抖动

- **GPU 进程是共享的**。若某标签发起极重的 WebGL/Canvas/GPU 工作，GPU 排队与同步会让别的标签渲染任务等待，出现跨标签掉帧。([chromium.org][9])

---

## 典型“卡死”根因清单（对照排查）

- 主线程长任务（死循环、巨量同步计算、密集 DOM 操作）。([Chrome for Developers][6])
- 强制同步布局/大面积重排/重绘卡在主线程。([Chrome for Developers][1])
- 背景页仍在高频定时器/轮询（被节流但仍可能干扰唤醒时序）。([Chrome for Developers][10])
- GPU 侧的长栅格/绘制或 WebGL 调用导致的排队。([chromium.org][9])

---

## 最小演示（可拷贝）：阻塞 vs. 让路 vs. 真并行

> 目标：体验“一个核被吃满”和“切片/并行化后恢复交互”的区别。

### A. 阻塞主线程（请勿在线上使用）

```html
<button id="block">阻塞5秒</button>
<script>
  document.getElementById("block").onclick = () => {
    const t0 = performance.now();
    // 下面这行是“长任务”示例：忙等 5 秒，完全堵住主线程
    while (performance.now() - t0 < 5000) {} // 阻塞事件循环
  };
</script>
```

> 打开 DevTools Performance 录制，你会看到主线程一整条长任务，伴随红三角告警。([Chrome for Developers][6])

### B. 切片让路（`scheduler.yield`，自动继承优先级）

```js
async function heavyWorkChunked(total = 10_000_000) {
  let acc = 0;
  for (let i = 0; i < total; i++) {
    acc += i & 1;
    // 在复杂逻辑前切片，让出主线程处理输入/渲染
    if ((i & 0x3fff) === 0)
      await (self.scheduler?.yield
        ? scheduler.yield()
        : new Promise((r) => setTimeout(r)));
  }
  return acc;
}
```

> `scheduler.yield()` 由浏览器调度优先处理用户关键任务，再延续你的计算；不支持的浏览器回退到 `setTimeout`。([Chrome for Developers][11])

### C. 真并行：把重计算丢进 Worker（可配合 OffscreenCanvas）

**main.js**

```js
const w = new Worker("./worker.js");
// 复杂逻辑：把大数组交给 worker 并传输所有权，避免拷贝
const buf = new ArrayBuffer(4 * 5_000_000);
w.postMessage({ buf }, [buf]);

w.onmessage = (e) => {
  console.log("结果", e.data);
};
```

**worker.js**

```js
self.onmessage = (e) => {
  const view = new Uint32Array(e.data.buf);
  // 在 worker 线程里做重计算，不阻塞页面主线程
  let s = 0;
  for (let i = 0; i < view.length; i++) s += view[i] & 1;
  self.postMessage(s);
};
```

**OffscreenCanvas（可选，主线程仍流畅滚动/输入）**

```js
// 把 <canvas> 控制权转移给 worker
const offscreen = document.querySelector("canvas").transferControlToOffscreen();
w.postMessage({ canvas: offscreen }, [offscreen]);
```

> Web Workers 把 JS 任务搬到独立线程执行；OffscreenCanvas 允许在 worker 中绘图；两者组合能显著降低主线程压力。([MDN Web Docs][12])

### D. 极限并行：WASM 线程（适合重数值/图像/视频）

> 通过 Emscripten/工具链开启 **WebAssembly Threads**，借助 `SharedArrayBuffer + Atomics` 在多个 Worker 上真正并行执行。需满足跨域隔离头（COOP/COEP）。([web.dev][13])

---

## 排障步骤（实战清单）

1. **录制性能**：DevTools → Performance，确认是否为 **主线程长任务**；注意长任务红三角与火焰图热点。([Chrome for Developers][6])
2. **分离重活**：能 Worker 的尽量 Worker；像素/绘制走 OffscreenCanvas；大对象用 **可转移对象**（ArrayBuffer/OffscreenCanvas）避免拷贝。([MDN Web Docs][14])
3. **切片让路**：用 `scheduler.yield()` 或 `scheduler.postTask({ priority })` 把同步循环拆成微批次。([Chrome for Developers][11])
4. **检查 GPU 路径**：WebGL/Canvas 动画掉帧时同时看 **GPU 进程** 与合成阶段（“Life of a Pixel”、“cc 流程”文档有助定位）。([chromium.org][15])
5. **后台策略**：确认是否被 **后台节流/冻结** 影响期望行为（例如依赖 setInterval 的后台轮询）。([Chromium Blog][3])

---

## FAQ

**Q：任务管理器里看到“CPU 100%”，为何还有别的核心空闲？**
A：这通常表示 **某个线程**（多为该标签渲染进程的主线程）把一个核心打满。OS 不会把单个线程的同步计算自动拆到多个核心上；要么切片（`scheduler.yield/postTask`），要么并行（Worker/WASM 线程）。([Chrome for Developers][1])

**Q：为什么这个标签卡了，别的标签还流畅？**
A：因为它们在 **不同的渲染进程**，互不阻塞；只有共享的 **GPU 进程** 在极端情况下会造成跨标签抖动。([chromium.org][2])

**Q：后台页为什么“像睡着了一样”？**
A：Chrome 为省电与降噪，对后台标签的 **JS 定时器** 进行强节流（M87 起 **1 分钟 1 次**），并在更长时间后可能 **冻结**。这是浏览器层的策略，并非你的代码 bug。([Chromium Blog][3])

---

## 参考与延伸

- **多进程架构 / 站点隔离**：Chromium Design Docs；Process Model 与 Site Isolation 论文/说明；Chrome for Developers 站点隔离解读。([chromium.org][2])
- **RenderingNG / 线程与合成**：RenderingNG 架构、Compositor Thread、Life of a Pixel / cc 文档。([Chrome for Developers][1])
- **长任务识别**：DevTools Performance 指南、参考文档。([Chrome for Developers][6])
- **任务调度 API**：`scheduler.yield`（Chrome 官方博客）、`scheduler.postTask`（MDN）、长任务优化文章。([Chrome for Developers][11])
- **后台节流与冻结**：M87 背景定时器“每分钟 1 次”公告、Chrome 88 定时器“密集节流”。([Chromium Blog][3])
- **Workers / OffscreenCanvas / WASM 线程**：MDN 文档与 web.dev 教程。([MDN Web Docs][12])

---

## 尾声

一句话打包：**Chrome 用多进程把标签隔离；每个渲染进程只有一个主线程，卡顿多半是它被长任务堵住——这不是“多核不给力”，而是“你的活没拆开”**。前台用 **切片 + 优先级调度** 保交互，后台有 **节流/冻结** 防滥用；重活交给 **Worker/OffscreenCanvas/WASM 线程**，才能真正把多核吃起来。([Chrome for Developers][1])

[1]: https://developer.chrome.com/docs/chromium/renderingng-architecture?utm_source=chatgpt.com "RenderingNG architecture | Chromium - Chrome for Developers"
[2]: https://www.chromium.org/developers/design-documents/multi-process-architecture/?utm_source=chatgpt.com "Multi-process Architecture"
[3]: https://blog.chromium.org/2020/11/tab-throttling-and-more-performance.html?utm_source=chatgpt.com "Tab throttling and more performance improvements in ..."
[4]: https://chromium.googlesource.com/chromium/src/%2B/main/docs/process_model_and_site_isolation.md?utm_source=chatgpt.com "Chromium Docs - Process Model and Site Isolation"
[5]: https://www.chromium.org/developers/design-documents/compositor-thread-architecture/?utm_source=chatgpt.com "Compositor Thread Architecture"
[6]: https://developer.chrome.com/docs/devtools/performance?utm_source=chatgpt.com "Analyze runtime performance | Chrome DevTools"
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/postTask?utm_source=chatgpt.com "Scheduler: postTask() method - Web APIs - MDN Web Docs"
[8]: https://developer.chrome.com/blog/timer-throttling-in-chrome-88?utm_source=chatgpt.com "Heavy throttling of chained JS timers beginning in Chrome 88"
[9]: https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/?utm_source=chatgpt.com "GPU Accelerated Compositing in Chrome"
[10]: https://developer.chrome.com/blog/background_tabs?utm_source=chatgpt.com "Background tabs in chrome 57 | Blog"
[11]: https://developer.chrome.com/blog/use-scheduler-yield?utm_source=chatgpt.com "Use scheduler.yield() to break up long tasks | Blog"
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API?utm_source=chatgpt.com "Web Workers API - Web APIs | MDN"
[13]: https://web.dev/articles/webassembly-threads?utm_source=chatgpt.com "Using WebAssembly threads from C, C++ and Rust | Articles"
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Worker?utm_source=chatgpt.com "Worker - Web APIs - MDN Web Docs"
[15]: https://www.chromium.org/developers/design-documents/chromium-graphics/?utm_source=chatgpt.com "Chromium Graphics // Chrome GPU"
