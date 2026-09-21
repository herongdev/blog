---
title: "完整 DEMO"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "保证能直接跑、可扩展、无坑！ ✅ 目录结构 bash 复制编辑 vite vue3 worker demo/ ├── index.html ├── package.json ├── tsconfig.json ├── vite.config.ts └── src/ ├── mai。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/webworkers/完整 DEMO.md"
---
::: v-pre

# 完整 DEMO

> 本节目标：理解“完整 DEMO”的核心思路，并能把它用于实际开发或面试表达。
保证能直接跑、可扩展、无坑！

**✅** **目录结构**

bash
复制编辑
vite-vue3-worker-demo/ ├── index.html ├── package.json ├── tsconfig.json ├── vite.config.ts └── src/ ├── main.ts ├── App.vue ├── types/ │ └── workerTypes.ts ├── utils/ │ └── processUnfoldOrders.ts └── workers/ └── ordersWorker.ts

**✅** **package.json**

json
复制编辑
\{ "name": "vite-vue3-worker-demo", "version": "1.0.0", "scripts": \{ "dev": "vite", "build": "vite build", "preview": "vite preview" \}, "dependencies": \{ "vue": "^3.4.0" \}, "devDependencies": \{ "@vitejs/plugin-vue": "^4.0.0", "typescript": "^5.0.0", "vite": "^5.0.0" \}\}

**✅** **vite.config.ts**

ts
复制编辑
import \{ defineConfig \} from 'vite'import vue from '@vitejs/plugin-vue'import path from 'path'
export default defineConfig(\{ plugins: [vue()], resolve: \{ alias: \{ '@': path.resolve(__dirname, './src') \} \}\})

**✅** **tsconfig.json**

json
复制编辑
\{ "compilerOptions": \{ "target": "ESNext", "module": "ESNext", "moduleResolution": "Bundler", "strict": true, "jsx": "preserve", "esModuleInterop": true, "skipLibCheck": true, "forceConsistentCasingInFileNames": true, "allowSyntheticDefaultImports": true, "baseUrl": ".", "paths": \{ "@/*": ["src/*"] \}, "types": ["vite/client"] \}, "include": ["src/**/*"], "exclude": ["node_modules"]\}

**✅** **src/types/workerTypes.ts**

ts
复制编辑
export interface ProcessOrdersData \{ orderData: any\}
export interface ProcessedOrdersResult \{ result: any\}
export type WorkerMessage = | \{ type: 'processOrders'; data: ProcessOrdersData \} | \{ type: 'processedOrders'; data: ProcessedOrdersResult \} | \{ type: 'error'; data: string \}

**✅** **src/utils/processUnfoldOrders.ts**

ts
复制编辑
export function processUnfoldOrders(orderData: any): any \{ console.log('worker内部处理订单', orderData) // 模拟计算逻辑 return \{ result: `已处理 ${orderData.length} 条订单数据` \}\}

**✅** **src/workers/ordersWorker.ts**

ts
复制编辑
import type \{ WorkerMessage, ProcessOrdersData \} from '@/types/workerTypes'
self.addEventListener('message', async (event: MessageEvent\<WorkerMessage\>) =\> \{ const \{ type, data \} = event.data
if (type === 'processOrders') \{ try \{ const \{ processUnfoldOrders \} = await import('@/utils/processUnfoldOrders') const result = processUnfoldOrders(data.orderData) self.postMessage(\{ type: 'processedOrders', data: result \}) \} catch (err) \{ self.postMessage(\{ type: 'error', data: (err as Error).message \}) \} \}\})

**✅** **src/main.ts**

ts
复制编辑
import \{ createApp \} from 'vue'import App from './App.vue'
createApp(App).mount('#app')

**✅** **src/App.vue**

vue
复制编辑
\<template\> \<div\> \<h1\>Vite + Vue3 + Worker DEMO\</h1\> \<button @click="handleProcess"\>开始处理订单\</button\> \<div v-if="result"\>\{\{ result \}\}\</div\> \</div\>\</template\>
\<script lang="ts" setup\>import type \{ WorkerMessage, ProcessOrdersData, ProcessedOrdersResult \} from '@/types/workerTypes'import \{ ref \} from 'vue'
const result = ref\<string\>('')
const worker = new Worker(new URL('@/workers/ordersWorker.ts', import.meta.url), \{ type: 'module' \})
worker.addEventListener('message', (event: MessageEvent\<WorkerMessage\>) =\> \{ if (event.data.type === 'processedOrders') \{ const data = event.data.data as ProcessedOrdersResult result.value = data.result \} else if (event.data.type === 'error') \{ result.value = `错误：${event.data.data}` \}\})
function handleProcess() \{ const orders: ProcessOrdersData = \{ orderData: Array(1000).fill(\{ id: 1, name: 'order' \}) \} worker.postMessage(\{ type: 'processOrders', data: orders \})\}\</script\>

**✅** **index.html**

html
复制编辑
\<!DOCTYPE html\>\<html lang="zh-CN"\> \<head\> \<meta charset="UTF-8" /\> \<title\>Vite Vue3 Worker Demo\</title\> \</head\> \<body\> \<div id="app"\>\</div\> \<script type="module" src="/src/main.ts"\>\</script\> \</body\>\</html\>

**🎯** **完整总结：**

- ✅ 完全兼容 Vite 新版 bundler 模式；
- ✅ 完全支持 TypeScript；
- ✅ Web Worker 动态 import，零踩坑；
- ✅ 可扩展性强，你以后复杂逻辑直接往 processUnfoldOrders 里加；
- ✅ Vue3 Composition API 里直接使用 worker；
- ✅ Worker 文件与主逻辑完全解耦；

你可以完全照着这个模板跑一套，
**以后任何重计算场景都可以用这套框架做 Worker。**

👉 **如果你愿意的话**
我还可以教你一个：
**进阶版：多 Worker + Worker Pool 线程池封装方案**
—— 适合你做：

- 大型订单聚合
- 股票筹码分布
- 复杂统计计算

:::
