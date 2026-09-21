---
title: "Ref(Map)"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "结论先行： 把 openOrderData 改成 const openOrderData ref(new Map\\<number, UnfoldOrderRow\\ ()) 后， Map 依旧只是“浅层”代理 ——Vue 会拦截 set / delete / clear 等操作来触。"
sidebarWeight: 138
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Vue 3 响应式 Map 全攻略/Ref(Map).md"
---
::: v-pre

# Ref(Map)

> 本节目标：理解“Ref(Map)”的核心思路，并能把它用于实际开发或面试表达。
****结论先行：****
把 `openOrderData` 改成
const openOrderData = ref(new Map\<number, UnfoldOrderRow\>())

后，****Map 依旧只是“浅层”代理****——Vue 会拦截 `set / delete / clear` 等操作来触发依赖收集，但你往里 `set` 的每一条 `row` 并不会被自动 `reactive()`。所以子属性仍然不是深度响应式，除非你在写入时手动包一层 `reactive(row)`。

### 为什么？
|   |   |   |   |
|---|---|---|---|
|**写法**|**Map 本身是否代理**|**value 自动深层代理？**|**操作语法**|
|reactive(new Map())|✅（返回 Proxy）|❌|直接 .set() / .delete()|
|ref(new Map())|✅（但包在 .value 里）|❌|openOrderData.value.set()|

- ****ref**** 只是给这整个 Map 再加了一层壳，需要通过 `.value` 访问。但里面的 Map 结构和行为与 `reactive(new Map())` ****完全一样****：只有键级别是可追踪的。
- 当你这样写：
  openOrderData.value.set(ticket, row) // row 是普通对象
  模板或 `watch` 在访问 `row.xxx` 时并不会追踪到后续的 `row.xxx = ...`，因为 `row` 不是 Proxy。

### 正确姿势（保持深度响应）
- openOrderData.value.set(ticket, row)
+ // 保证子对象可追踪
+ openOrderData.value.set(ticket, reactive(row) as any)

用 `reactive()` 包装一次就够了——后续你 `Object.assign(exist, patch)`、或直接 `exist.PROFIT = x` 都会触发视图 / 计算属性更新。

### 何时选** **`reactive(Map)`** **vs** **`ref(Map)`****？
- ****组件模板里经常读取** **`map`** **的 size、entries 等**** → `reactive` 更直观（无需 `.value`）
- ****需要在多个地方复用 Map 并希望替换整个 Map 对象**** → `ref` 方便你直接 `openOrderData.value = new Map()` 来触发更新
- 无论哪种，****value 本身都要自己** **`reactive`********，这点是一样的。

\> ****要点回顾****
\> - `Map` 的键层级可追踪，值需要手动 `reactive`。
\> - `ref(new Map())` 不会带来自带深层代理。
\> - 更新已有 Proxy 上的属性可用 `Object.assign`；新增属性在首次依赖收集后才能被追踪。

:::
