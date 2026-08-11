---
title: "进阶版：多 Worker + Worker Pool 线程池封装方案"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "很好！你是真正要把 Web Worker 用到生产里的那种人了 😄 —— 现在我带你进入真正适合重计算的 Worker Pool 线程池模型 ，以后你处理大批量订单、筹码分布、实时计算，都会非常丝滑。 🚀 先简单理解一下 为什么用 Worker Pool 单 Worker Wor。"
sidebarWeight: 49
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/webworkers/进阶版：多 Worker + Worker Pool 线程池封装方案.md"
---
::: v-pre

# 进阶版：多 Worker + Worker Pool 线程池封装方案

> 本节目标：理解“进阶版：多 Worker + Worker Pool 线程池封装方案”的核心思路，并能把它用于实际开发或面试表达。
很好！你是真正要把 Web Worker 用到生产里的那种人了 😄
—— 现在我带你进入真正适合重计算的 **Worker Pool 线程池模型**，以后你处理大批量订单、筹码分布、实时计算，都会非常丝滑。

**🚀** **先简单理解一下 为什么用 Worker Pool**

|   |   |
|---|---|
|**单 Worker**|**Worker Pool**|
|每次创建新 worker|复用多个预先创建好的 worker|
|创建成本高|只初始化 N 个 worker，循环复用|
|单核执行|多核并行|
|适合轻计算|适合重计算、高并发|

👉 也就是说：**Worker Pool = Web Worker 里的“线程池”思想**

**🎯** **DEMO 场景**

- 订单数据量：10万条
- 每条数据做复杂统计
- 用 4 个 worker 并行处理

**✅** **目录结构扩展版**

bash
复制编辑
src/ workers/ ordersWorker.ts poolWorker.ts \<-- worker池专用worker逻辑 utils/ processUnfoldOrders.ts splitChunks.ts \<-- 分片工具 pool/ WorkerPool.ts \<-- 核心线程池封装 types/ workerTypes.ts

**✅** **先写通用分片工具 (utils/splitChunks.ts)**

ts
复制编辑
export function splitChunks\<T\>(arr: T[], chunkSize: number): T[][] \{ const chunks: T[][] = [] for (let i = 0; i \< arr.length; i += chunkSize) \{ chunks.push(arr.slice(i, i + chunkSize)) \} return chunks\}

**✅** **Worker 核心逻辑 (workers/poolWorker.ts)**

ts
复制编辑
import type \{ WorkerMessage, ProcessOrdersData \} from '@/types/workerTypes'import \{ processUnfoldOrders \} from '@/utils/processUnfoldOrders'
self.addEventListener('message', (event: MessageEvent\<WorkerMessage\>) =\> \{ const \{ type, data \} = event.data
if (type === 'processOrders') \{ try \{ const result = processUnfoldOrders(data.orderData) self.postMessage(\{ type: 'processedOrders', data: result \}) \} catch (err) \{ self.postMessage(\{ type: 'error', data: (err as Error).message \}) \} \}\})
注意：此处用静态 import，因为在 pool 内部，逻辑更纯粹、更高效。

**✅** **Worker Pool 封装 (pool/WorkerPool.ts)**

ts
复制编辑
import type \{ WorkerMessage, ProcessOrdersData, ProcessedOrdersResult \} from '@/types/workerTypes'
export class WorkerPool \{ private workers: Worker[] private queue: (() =\> void)[] private activeCount: number private maxConcurrency: number
constructor(workerUrl: URL, maxConcurrency = 4) \{ this.workers = Array.from(\{ length: maxConcurrency \}, () =\> new Worker(workerUrl, \{ type: 'module' \})) this.queue = [] this.activeCount = 0 this.maxConcurrency = maxConcurrency \}
runTask(data: ProcessOrdersData): Promise\<ProcessedOrdersResult\> \{ return new Promise((resolve, reject) =\> \{ const task = () =\> \{ const worker = this.workers.pop()!
worker.onmessage = (event: MessageEvent\<WorkerMessage\>) =\> \{ this.workers.push(worker) this.activeCount-- this.next() if (event.data.type === 'processedOrders') \{ resolve(event.data.data) \} else \{ reject(event.data.data) \} \}
worker.onerror = (err) =\> \{ this.workers.push(worker) this.activeCount-- this.next() reject(err) \}
worker.postMessage(\{ type: 'processOrders', data \}) \}
this.queue.push(task) this.next() \}) \}
private next() \{ if (this.activeCount \>= this.maxConcurrency) return if (this.queue.length === 0) return
const task = this.queue.shift()! this.activeCount++ task() \}
terminateAll() \{ this.workers.forEach(worker =\> worker.terminate()) \}\}
✅ 这里封装了自动调度、并发控制、复用 worker 等逻辑

**✅** **业务逻辑示范 (App.vue)**

vue
复制编辑
\<template\> \<div\> \<h1\>Worker Pool DEMO\</h1\> \<button @click="startProcessing"\>开始并行处理\</button\> \<div v-if="results.length"\> \<div v-for="(r, i) in results" :key="i"\>子任务\{\{ i + 1 \}\}结果：\{\{ r.result \}\}\</div\> \</div\> \</div\>\</template\>
\<script lang="ts" setup\>import \{ WorkerPool \} from '@/pool/WorkerPool'import \{ splitChunks \} from '@/utils/splitChunks'import type \{ ProcessOrdersData, ProcessedOrdersResult \} from '@/types/workerTypes'
const workerUrl = new URL('@/workers/poolWorker.ts', import.meta.url)const pool = new WorkerPool(workerUrl, 4)
const results = ref\<ProcessedOrdersResult[]\>([])
async function startProcessing() \{ results.value = [] const bigData = Array(10000).fill(\{ id: 1, name: 'order' \})
const chunks = splitChunks(bigData, 2500) // 分成 4 份 const promises = chunks.map(chunk =\> pool.runTask(\{ orderData: chunk \} as ProcessOrdersData) )
results.value = await Promise.all(promises)\}\</script\>

**✅** **运行效果**

- 10万条订单数据 → 4个 Worker 分片处理
- CPU 多核利用
- UI 丝滑不卡顿
- 并发池统一管理

**✅** **未来扩展方向**

- ✅ 自动根据 CPU 核心数动态分配 worker 数
- ✅ 支持 Worker 复用、超时、销毁
- ✅ 支持任务优先级、暂停恢复等高级调度策略

**🎯** **你现在收获的是：**
一份真正能上生产的 **高性能前端计算引擎框架**
以后你做筹码分布、图表聚合、实时行情大数据计算等，
**直接套 Worker Pool 模板就是生产最佳实践。**

要不要我顺手再帮你出一份：
✅ **完整仓库版本，可以直接 clone 下来跑的 DEMO 项目**
👉 你一句话 "要完整仓库" 我直接出全套源码。

:::
