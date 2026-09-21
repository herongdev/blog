---
title: "$patch"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "1. 基本用法 ts 复制编辑 store.$patch(\\{ // 只写你要改的字段 openOrders: newMap, totalStats: \\{ ... \\},\\}) 合并 ：你传给 $patch 的对象，会 浅合并 到当前 store.state 上。 原子性 ：所。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/pinia/$patch.md"
---
::: v-pre

# $patch

> 本节目标：理解“$patch”的核心思路，并能把它用于实际开发或面试表达。
**1. 基本用法**

ts
复制编辑
store.$patch(\{ // 只写你要改的字段 openOrders: newMap, totalStats: \{ ... \},\})

- **合并**：你传给 $patch 的对象，会 **浅合并** 到当前 store.state 上。
- **原子性**：所有变更视为一个“事务”，要么全部生效，要么都不生效。

**2. 实现原理**

1. **浅合并******Pinia 会遍历你传入的每个字段（如 openOrders、totalStats），然后执行类似 state[field] = payload[field] 的操作。
2. **Vue 响应式******因为 store.state 是 Vue 的 reactive 对象，属性赋值会自动通知依赖它的所有 computed、watcher、组件更新。
3. **触发更新**
    - 对象类型（如 ref 或 reactive(Map)) 直接替换引用会触发相应的依赖更新。
    - 如果你用 $patch 改的是普通字段（number/string/boolean），也是同理。

**3. 性能考量**

- **一次赋值 vs. 多次循环******用 $patch 把 openOrders 整个替换成新 Map，只做了一次属性赋值（state.openOrders = newMap），比你自己写 deleteOpen + upsertOpen 那几百/几千次循环要轻量得多。
- **Array.from 还是要做遍历******虽然 $patch 本身不遍历 Map，但如果后续的 computed(() =\> Array.from(store.openOrders)) 仍然会把 Map 转成数组——这一步是视图层必须的。但它只在引用变化时执行一次，并且其内部迭代性能对几万条也在毫秒级。
- **批量更新只触发一次渲染******所有属性赋值都会在同一个“tick”里批量通知 Vue，Vue 会合并这些更新，只触发一次组件重新渲染。相比你手动多次调用 store.upsertOne（每次都可能触发一次渲染检查），性能更优。

**4. 小结**

- $patch **主要做的事**就是「把你给的字段」一次性赋值到 store.state；背后依赖 Vue 的 reactive 系统来触发更新。
- **性能开销**＝一次对象属性赋值 + Vue 批量调度更新，远小于自己做多次循环赋值所产生的多次调度。
- 唯一无法避免的遍历是你在视图层将 Map 转为数组的那一行，但那也是 UI 渲染必须走的路径。

总的来说，使用 $patch 做初始全量替换，影响的只是那一次赋值和后续一次视图派生，**性能是完全可接受的**，也是社区推荐的做法。

:::
