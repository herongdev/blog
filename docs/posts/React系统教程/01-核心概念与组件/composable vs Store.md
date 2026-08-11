---
title: "composable vs Store"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "推荐放在 src/composables/market/useAllMarketStates.ts ，而 不是 写成 Pinia/Vuex Store。 维度 放在 composable ( ✅ 推荐) 放在 Store ( ⛔ 此场景不划算) 职责 纯计算 + 定时调度 + 提。"
sidebarWeight: 90
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/composable vs Store.md"
---
::: v-pre

# composable vs Store

> 本节目标：理解“composable vs Store”的核心思路，并能把它用于实际开发或面试表达。
**推荐放在 src/composables/market/useAllMarketStates.ts ，而** **不是** **写成 Pinia/Vuex Store。**

|   |   |   |
|---|---|---|
|**维度**|**放在 composable (****✅** **推荐)**|**放在 Store (****⛔** **此场景不划算)**|
|职责|纯计算 + 定时调度 + 提供只读状态|需要 mutation/action 语义；更多模板代码|
|依赖|只用 reactive / watch，无额外库|必须引入 Pinia/Vuex，同步维护 state/action|
|Devtools 需求|开闭市状态对调试意义不大|能在 Devtools 时间旅行，但价值有限|
|运行时|timerService 已确保单例；composable 内部自带“只注册一次”的 guard|Store 也能做到，但多一层包装|
|迁移灵活性|若以后想换成 WebSocket 推送，只改这一文件|Store mutation 语义会受到限制|

**什么时候改写成 Store 更合适？**

- 需要在 Devtools 中实时查看 / 编辑 allStates
- 不止一个前端项目共享同一状态（微前端）
- 拆分权限：某些角色只能看部分 symbol，需要 Store 层做过滤

若未来真的要转换，只需：

1. 把 allStates 挂到 state，
2. 把 recalcAll、增删监听封装成 actions，
3. timerService 调用逻辑保持不变。

在当前业务里，上述收益不明显，故保持 composable 文件最简单、最轻量。

:::
