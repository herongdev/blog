---
title: "props 传递"
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
description: "在 Vue 3 的 \\<script setup\\ 中，当你将 computed 值作为 props 传递给子组件时，Vue 会自动解包（unwrapping），这意味着子组件接收到的确实是基本值而非响应式对象。但如果你希望保持响应性并继续传递给孙组件，可以通过以下方式解决： 问。"
sidebarWeight: 144
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/props 传递.md"
---
::: v-pre

# props 传递

> 本节目标：理解“props 传递”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 的 \<script setup\> 中，当你将 computed 值作为 props 传递给子组件时，Vue 会自动解包（unwrapping），这意味着子组件接收到的确实是基本值而非响应式对象。但如果你希望保持响应性并继续传递给孙组件，可以通过以下方式解决：

问题分析

4. 自动解包机制Vue 3 在模板中会自动解包 ref 和 computed，所以子组件 DataItemVue 的 unit prop 接收到的是 currency.value（字符串）而非 computed 对象。
5. 响应性断裂当 currency 变化时，子组件无法感知，因为它拿到的是静态值。
解决方案
方案 1：直接传递 computed 给子组件（推荐）
通过 v-bind 传递整个 computed 对象（而非解包后的值），子组件需用 toRef 保持响应性。
父组件（修改传递方式）
vue
复制
下载
\<template\> \<DataItemVue :label="t('trading.account.equity')" :value="balanceNow" :unit="currency" \<!-- 直接传递 computed 对象 --\> :decimals="2" /\>\</template\>
子组件 (DataItemVue)
typescript
复制
下载
import \{ toRef \} from 'vue';
const props = defineProps\<\{ unit: string | ComputedRef\<string\>; // 允许接受 ComputedRef // ...其他 props\}\>();
// 保持响应性：无论传入的是普通值还是 computed，都转为 refconst unitRef = toRef(props, 'unit');
孙组件
子组件通过 unitRef 将响应式值继续向下传递即可。

方案 2：在子组件内部重新计算（备用）
如果无法修改父组件，可以在子组件内部用 computed 根据 props 重新生成响应式值。
子组件 (DataItemVue)
typescript
复制
下载
import \{ computed \} from 'vue';
const props = defineProps\<\{ unit: string; // 父组件传入的是解包后的值 // ...其他 props\}\>();
// 重新包装为响应式（仅适用于同步依赖）const unitRef = computed(() =\> props.unit);
局限性

10. 仅适用于 props.unit 的同步变化（如父组件重新渲染时传递新值）。
11. 如果 unit 的源头是异步更新的（如 API 请求），此方法无法感知变化。
方案 3：使用 Provide/Inject（跨层级响应性）
如果组件层级较深，可通过 provide 和 inject 共享响应式对象。
父组件
typescript
复制
下载
import \{ provide \} from 'vue';
const currency = computed(() =\> props.dynamicAccount?.CURRENCY ?? '');provide('currency', currency); // 提供响应式对象
孙组件
typescript
复制
下载
import \{ inject \} from 'vue';
const currency = inject\<ComputedRef\<string\>\>('currency'); // 注入响应式对象

关键区别

|   |   |   |
|---|---|---|
|方案|适用场景|响应性保证|
|直接传递 computed|父子组件直接传递|✅ 完整响应性|
|子组件重新计算|无法修改父组件时|⚠️ 仅同步变化响应|
|Provide/Inject|跨多层级组件|✅ 完整响应性|

最佳实践

19. 优先方案 1：直接传递 computed，子组件用 toRef 处理。
20. 复杂场景用方案 3：如多个孙组件需要共享同一响应式状态。
21. 避免方案 2：除非明确知道 props 会随父组件更新同步变化。
代码修正示例（方案 1）
父组件
vue
复制
下载
\<template\> \<DataItemVue :unit="currency" \<!-- 传递 computed --\> :value="balanceNow" :label="t('trading.account.equity')" :decimals="2" /\>\</template\>
子组件 (DataItemVue)
typescript
复制
下载
import \{ toRef \} from 'vue';
const props = defineProps\<\{ unit: string | ComputedRef\<string\>; // ...其他 props\}\>();
// 保持响应性const unitRef = toRef(props, 'unit');
// 传递给孙组件\<GrandChildComponent :unit="unitRef" /\>
孙组件
直接使用 unitRef 即可自动响应变化。

通过以上方法，你可以确保 unit 的响应性在整个组件链中保持传递。
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28](https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28)\>
             \> 来自 \<[https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28](https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28)\>

:::
