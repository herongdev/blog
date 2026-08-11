---
title: "ESM 单例"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "1. 重点速览 • ESM 单例 ： import 的模块只执行一次，后续导入都复用同一份实例。 • 响应式 Store ： reactive({}) 充当轻量全局状态，无需 Pinia。 • 集中计算 ： watch(now, ...) 只注册一次，按时钟批量刷新所有 mark。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/ESM 单例.md"
---
::: v-pre

# ESM 单例

> 本节目标：理解“ESM 单例”的核心思路，并能把它用于实际开发或面试表达。
1. 重点速览
• **ESM 单例**：`import` 的模块只执行一次，后续导入都复用同一份实例。
• **响应式 Store**：`reactive({})` 充当轻量全局状态，无需 Pinia。
• **集中计算**：`watch(now, ...)` 只注册一次，按时钟批量刷新所有 market。
• **Hook 只读接口**：`useMarketState(symbolId)` 每次返回 `readonly(computed(...))`，组件感知但无法乱改。

2. 详细拆解
2-1 模块单例机制
// useMarketState.ts
const marketStates = reactive\<Record\<string, MarketState\>\>(\{\});
// 这里在模块顶层 —— 初始化一次

在任何组件里 `import { useMarketState } ...`，引擎保证：
• 代码只跑第一次；
• `marketStates`、`watch`、`holidaySet` 等只创建一份。

2-2 顶层响应式全局状态
const marketStates = reactive\<Record\<string, MarketState\>\>(\{\});
- 用对象索引 (`marketId`) 分区，天然隔离。
- Vue3 响应式代理，组件读取时自动依赖收集。

2-3 定时 watch 与计算逻辑
watch(
  now,
  (minute) =\> \{
    for (const marketId of Object.keys(dynamicSessionMap)) \{
      marketStates[marketId] = computeState(marketId, minute);
    \}
  \},
  \{ immediate: true \}
);

• `now` 来自 `useMarketClock`（每分钟自增）。
• **单 watch，多 market**：一次遍历把所有市场状态更新完。
• 避免在每个组件里各自 setInterval。

2-4 Hook 封装 & 组件使用
export function useMarketState(symbolId: string) \{
  // 动态场景：直接用 symbolId 作为 marketId
  const state = computed(() =\> marketStates[symbolId]);
  return \{ state: readonly(state) \};
\}
- 组件只拿到当前合约的视图，不感知全局实现细节。
- 任何组件卸载不影响 watch；复用高效。

3. 最小可运行示例

(1) useMarketClock.ts — 1 行核心
import \{ ref \} from 'vue';
export function useMarketClock() \{
  const now = ref(dayjs());
  setInterval(() =\> (now.value = dayjs()), 60_000);
  return \{ now \};
\}

(2) useMarketState.ts — 精简版
import \{ reactive, computed, readonly, watch \} from 'vue';
import \{ useMarketClock \} from './useMarketClock';
type MarketState = \{ isOpen: boolean \};
const marketStates = reactive\<Record\<string, MarketState\>\>(\{\});
const \{ now \} = useMarketClock();
function computeState(id: string) \{
  // ★ 真实逻辑可复杂，这里简写为“偶数分钟开市”
  return \{ isOpen: now.value.minute() % 2 === 0 \};
\}
watch(now, () =\> \{
  for (const id of Object.keys(marketStates))
    marketStates[id] = computeState(id);
\});
export function useMarketState(id: string) \{
  marketStates[id] ??= computeState(id);      // 首次填充
  const state = computed(() =\> marketStates[id]);
  return \{ state: readonly(state) \};
\}

(3) Component.vue
\<script setup lang="ts"\>
import \{ useMarketState \} from '@/composables/useMarketState';
const \{ state \} = useMarketState('EURUSD');
\</script\>
\<template\>
  \<div\>\{\{ state.isOpen ? 'OPEN' : 'CLOSED' \}\}\</div\>
\</template\>

👉 复制三文件即可运行，验证「单 watch 全局刷新」+「多组件共享」效果。
4. 常见问题 & 进阶
| 场景 | 风险 | 解决方案 |
|------|------|-----------|
| HMR 开发热更新 | 旧 watch 未注销 | `import.meta.hot.dispose(stopWatch)` |
| SSR | 同服务器跨请求数据串联 | 把全局状态放到 per-request 上下文 |
| 多时钟源 | 需要多份计算循环 | 将 clock 和 state 封装到类/Pinia store，实例化多份 |

参考
• Vue 官方文档「组合式 API – 响应式基础」
• ES Modules Loading – WHATWG Spec
• HMR 处理示例 \<[https://vitejs.dev/guide/api-hmr.html](https://vitejs.dev/guide/api-hmr.html)\>

:::
