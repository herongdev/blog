---
title: "Web Worker 在多组件场景实战避坑"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "一、为什么要「共享」 Worker 1. 浏览器为每个 Worker 启一个线程，频繁 new / terminate 成本高。 2. 订单、报价等数据对全站是 全局 的，多组件共享一个 Worker 更符合业务模型。 3. 统一数据处理 + 减少主线程开销。 于是我们常写一个“。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/webworkers/Web Worker 在多组件场景实战避坑.md"
---
::: v-pre

# Web Worker 在多组件场景实战避坑

> 本节目标：理解“Web Worker 在多组件场景实战避坑”的核心思路，并能把它用于实际开发或面试表达。
一、为什么要「共享」 Worker
1. 浏览器为每个 Worker 启一个线程，频繁 new / terminate 成本高。
2. 订单、报价等数据对全站是 **全局** 的，多组件共享一个 Worker 更符合业务模型。
3. 统一数据处理 + 减少主线程开销。

于是我们常写一个“单例工厂”：

```
// workers/index.ts
let shared: Worker | null = null;
export const getOrderWorker = () => {
  if (!shared) {
    shared = new Worker(new URL('./orderWorker.ts', import.meta.url), {
      type: 'module',
    });
  }
  return shared;
};
```

二、最大陷阱：`worker.onmessage = …` 会互相覆盖
`onmessage` 是 **单个函数引用**。
如果组件 A 先赋值，随后组件 B 再赋值，就会把 A 的监听彻底顶掉——A 再也收不到消息，这正是你遇到的问题。

三、最佳实践：事件监听器模式
1. **注册**——用 `addEventListener`，一个 Worker 可以拥有 N 个监听函数。
2. **清理**——在组件卸载时 `removeEventListener`。
3. **不 terminate**——既然是共享实例，就别在任何单个组件里 `terminate()`，交给应用退出时统一处理（或根组件）。

模板代码（以 Vue3 的组合式为例）：

```
import { onMounted, onUnmounted } from 'vue';
import { getOrderWorker } from '@/workers';
export function useSomething() {
  const worker = getOrderWorker();
  const handleMessage = ({ data }: MessageEvent<any>) => {
    // …
```

你的业务逻辑

```
 …
  };
  onMounted(() => {
    worker.addEventListener('message', handleMessage);
  });
  onUnmounted(() => {
    worker.removeEventListener('message', handleMessage);
    //
```

不 `terminate`！

```
  });
}
```

四、与业务事件结合的两种思路
1. **主动拉取 + 被动推送**
­– 初始化或分页时自己请求接口；
­– Worker 通过自定义 `type / eventType` 推送变更，组件只关心自己需要的事件。
2. **全推模式（流式）**
­– WebSocket / SSE 直接把原始数据推到 Worker；
­– Worker 负责增量计算，主线程组件纯渲染。

五、额外注意事项
1. TypeScript 类型安全
```ts
interface WorkerMsg<T = any> { type: string; data: T }
const send = (msg: WorkerMsg) => self.postMessage(msg);
```
2. 清理定时器 / interval
Worker 里 `setInterval` 也要 `clearInterval`；在主线程用 `useIntervalFn` 时同理。
3. 错误处理
`worker.addEventListener('error', ...)`，防止 Worker 崩溃静默失效。
4. SharedWorker vs 普通 Worker
浏览器还提供 `SharedWorker` 专为多标签页共享，但在单页应用中“代码层单例”已足够。

六、Checklist：下次写 Worker 前先过一遍
☐ 是否需要全局共享？
☐ 是否用工厂函数保证单例？
☐ 所有组件都通过 `addEventListener` 订阅消息？
☐ 在 `onUnmounted` 做 `removeEventListener`？
☐ 没有任何组件随意 `terminate()`？
☐ Worker 内是否给消息定义了明确的 `type` 字段？
☐ 是否做了错误 / 断线重连处理？

:::
