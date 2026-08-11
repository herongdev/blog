---
title: "Prop.属性名传入composable失去响应"
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
description: "在 Vue 组件内部，props 是一个 reactive 对象，Vue 会对其所有属性（包括嵌套属性，如 props.quote.ask）进行深层响应式监听。这意味着在组件的模板或 setup 脚本中，直接访问 props.quote 或 props.quote.ask 会触发。"
sidebarWeight: 133
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Prop.属性名传入composable失去响应/Prop.属性名传入composable失去响应.md"
---
::: v-pre

# Prop.属性名传入composable失去响应

> 本节目标：理解“Prop.属性名传入composable失去响应”的核心思路，并能把它用于实际开发或面试表达。
- 在 Vue 组件内部，props 是一个 reactive 对象，Vue 会对其所有属性（包括嵌套属性，如 props.quote.ask）进行深层响应式监听。这意味着在组件的模板或 setup 脚本中，直接访问 props.quote 或 props.quote.ask 会触发依赖收集，任何变化都会导致相关 computed 或渲染更新。
- **问题出在 composable**：当你将 props.quote 直接传递给 useSLTPValidation（如 quote: props.quote），props.quote 被“剥离”为一个普通 JavaScript 对象。虽然它在组件内是响应式的，但在 composable 中，quote 只是一个普通对象（QuotePayload 类型），不再与 Vue 的响应式系统关联。
- **原因**：Vue 的响应式系统依赖于 reactive 或 Ref 对象的访问。props.quote 本身不是一个独立的 Ref，而是 reactive(props) 的一个属性。当你将 props.quote 传递到 composable 时，相当于传递了它的值（一个普通对象 \{ ask: number, bid: number \}），而不是一个响应式引用。因此，在 composable 中访问 quote[key]（如 quote.ask）时，Vue 无法跟踪到 props.quote 的变化。

**Vue 依赖收集的机制**

- Vue 的响应式依赖收集基于以下规则：
    - 对于 reactive 对象，访问其属性（如 props.quote 或 props.quote.ask）会触发依赖收集。
    - 对于 Ref 对象，访问 .value（如 quoteRef.value）会触发依赖收集。
- 在 composable 中，quote 是一个普通对象（非 reactive 或 Ref）。因此，访问 quote[key] 不会触发任何依赖收集，因为 Vue 无法知道 quote 与 props.quote 的关系。
- 即使 props 在组件内是 reactive 的，composable 接收到的 quote 已脱离了 props 的响应式上下文，Vue 不再能跟踪其变化。

:::
