---
title: "new Worker(...URL) 何时会「出问题」"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "场景 会发生什么 是否需要改进 正常页面刷新 (F5 / 浏览器刷新) 整个 JS 进程重启，旧 Worker 进程随之销毁 不用管 Vite 热更新 (HMR) 1. Vite 会重新编译并 重新执行 创建 Worker 的模块； 2. 若你每次都 new Worker(...。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/webworkers/`new Worker(...URL)` 何时会「出问题」.md"
---
::: v-pre

# new Worker(...URL) 何时会「出问题」

> 本节目标：理解“new Worker(...URL) 何时会「出问题」”的核心思路，并能把它用于实际开发或面试表达。
|   |   |   |
|---|---|---|
|**场景**|**会发生什么**|**是否需要改进**|
|**正常页面刷新 (F5 / 浏览器刷新)**|整个 JS 进程重启，旧 Worker 进程随之销毁|**不用管**|
|**Vite 热更新 (HMR)**|1. Vite 会重新编译并 _重新执行_ 创建 Worker 的模块；
2. 若你每次都 new Worker(...)，旧 Worker 仍存活，新旧 Worker 并存 → **多余线程 / 内存泄漏**|✔️ **建议用单例**|
|**SPA 内多次进入同一组件**|组件卸载时若没手动 worker.terminate()，下一次挂载又 new，也会并存|✔️ **建议复用或组件销毁时 terminate**|
|**异常 (Worker 抛错 / 主线程捕获不到)**|Worker 线程仍存活；你重新 new Worker 会得到第二个实例；旧实例没用却占资源|✔️ **单例 + onerror 兜底 terminate**|

## 推荐：**模块级单例 + 离开页面自动终止**
### 1. 单例工厂 (****`workers/orderWorkerFactory.ts`****)
```ts
// workers/orderWorkerFactory.ts
let sharedWorker: Worker | null = null
export function getOrderWorker() {
  if (sharedWorker === null) {
    sharedWorker = new Worker(new URL('./orderWorker.ts', import.meta.url), { type: 'module' })
    /* 可选：记录错误并重建 */
    sharedWorker.addEventListener('error', (e) => {
      console.error('OrderWorker error', e)
      sharedWorker?.terminate()
      sharedWorker = null
    })
  }
  return sharedWorker
}
```
- 模块顶层 `sharedWorker` 只初始化一次，****同模块多次 import 仍共用****。
- HMR 时该模块会重新执行并 ****把 old Worker 覆盖****；可以在 `import.meta.hot.dispose` 手动 terminate 旧实例，避免泄漏。
```ts
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    sharedWorker?.terminate()
    sharedWorker = null
  })
}
```

### 2. 组合式封装 (****`useQuoteWorker.ts`****) —— 保证单例
```ts
import { getOrderWorker } from '@/workers/orderWorkerFactory'
let _instance: ReturnType<typeof createQuoteWorkerApi> | null = null
export function useQuoteWorker() {
  if (_instance) return _instance
  _instance = createQuoteWorkerApi()
  return _instance
}
function createQuoteWorkerApi() {
  const worker = getOrderWorker() // ← 单例
  /* ... 其余逻辑保持不变 ... */
}
```
### 3. 组件卸载时可选** **`terminate`
如果 Worker 仅在交易页用，离开交易页后不再需要，可在路由离开或组件 `onUnmounted` 时：
```ts
const worker = getOrderWorker()
onUnmounted(() => {
  worker.terminate()
  // 如果还想将来再用，则 getOrderWorker 内 sharedWorker = null
})
```
---

## 什么时候仍然可以直接** **`new Worker(...)`****？
- 页面级单例场景（App 只用一次，且组件不会热重载）。
- 服务器端渲染中你已判断 `typeof Worker !== 'undefined'`。
- 快速 PoC / 脚手架阶段：先跑通再抽单例。
---

## 小结
1. ****HMR + SPA 多实例**** 场景下，建议用 ****模块顶层单例**** 或工厂函数缓存 Worker。
2. 热更新时用 `import.meta.hot.dispose()` ****terminate 旧 Worker****，防内存泄漏。
3. 业务离开页面时，如果 Worker 不再需要，手动 `.terminate()` 并清空缓存。
4. 创建 Worker 失败 / 运行期抛错时要 ****catch & 置 null****，确保下次能重新构造。
按上面改成 `getOrderWorker()` 工厂，你就不会因为热更新或多次进入组件而累积无用 Worker 了。

:::
