---
title: "SharedArrayBuffer限制"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "使用 SharedArrayBuffer （共享内存）虽然可以让主线程和 Web Worker 直接操作同一块内存，但仍然需要借助 postMessage 进行 初始通信 ，以传递 SharedArrayBuffer 的引用。这是因为： 1. SharedArrayBuffer。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/webworkers/`SharedArrayBuffer`限制.md"
---
::: v-pre

# SharedArrayBuffer限制

> 本节目标：理解“SharedArrayBuffer限制”的核心思路，并能把它用于实际开发或面试表达。
使用 `SharedArrayBuffer`（共享内存）虽然可以让主线程和 Web Worker 直接操作同一块内存，但仍然需要借助 `postMessage` 进行****初始通信****，以传递 `SharedArrayBuffer` 的引用。这是因为：

1. ********`SharedArrayBuffer`** **本身也需要传递****：
   - 虽然 `SharedArrayBuffer` 是共享的，但主线程和 Worker 之间仍然需要通过 `postMessage` 第一次传递这个缓冲区的引用，让 Worker 知道该操作哪块内存。
   - 例如：
     ```javascript
     // 主线程
     const sharedBuffer = new SharedArrayBuffer(1024)
     worker.postMessage({ buffer: sharedBuffer })
     // Worker 线程
     self.onmessage = (e) => {
       const sharedBuffer = e.data.buffer
       const sharedArray = new Int32Array(sharedBuffer)
     }
     ```
2. ****共享内存 ≠ 自动同步****：
   - `SharedArrayBuffer` 允许多线程直接读写同一块内存，但****线程间如何协调读写****仍然需要开发者自己处理（比如通过 `Atomics` 操作实现同步）。
   - `postMessage` 的通信是“消息通知”，而 `SharedArrayBuffer` 是“数据共享”，二者用途不同。

3. ****为什么不能绕过** **`postMessage`****？****
   - Web Worker 的设计本质是隔离的线程，没有直接访问主线程变量的能力。`postMessage` 是唯一安全的跨线程通信机制。
   - 即使使用共享内存，也需要一个方式让 Worker 知道共享内存的位置（通过 `postMessage` 传递引用）。

### 补充：直接同步 vs 消息通信
- ********`postMessage`********：每次通信需要序列化/反序列化数据，适合低频、结构化消息。
- ********`SharedArrayBuffer`** **+** **`Atomics`********：适合高频、实时数据共享（如游戏、音视频处理），但需要手动处理线程同步问题。

如果你希望完全避免 `postMessage`，目前 Web 平台没有其他标准方式可以让 Worker 直接访问主线程的内存。

:::
