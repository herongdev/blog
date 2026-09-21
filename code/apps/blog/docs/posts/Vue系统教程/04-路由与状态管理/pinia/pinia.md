---
title: "pinia"
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
description: "vue3发布以后，pinia也随着诞生， 代替 Vuex 做状态管理，比较直观的好处就是： 不用在区分 同步调用 和 异步调用 了； store 的修改动作 action 作为常规函数调用，而不是使用 dispatch 方法或者是 commit 去调用； 当然最重要的还是对 TS。"
sidebarWeight: 98
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/数据流/pinia/pinia.md"
---
::: v-pre

# pinia

> 本节目标：理解“pinia”的核心思路，并能把它用于实际开发或面试表达。
vue3发布以后，pinia也随着诞生， 代替 Vuex 做状态管理，比较直观的好处就是：

- 不用在区分 同步调用 和 异步调用 了；
- store 的修改动作 action 作为常规函数调用，而不是使用 dispatch 方法或者是 commit 去调用；
- 当然最重要的还是对 TS 支持比较友好

随着 Vue 3 的 Composition API 的推出，出现了一些新的状态管理库，例如 Pinia，它提供了一个更加简洁的 API 并充分利用了组合式 API 的特点。

**Pinia vs Vuex:**

- 更简洁的API: Pinia 的 API 更简洁，更易于理解，尤其对于那些熟悉 Vue 3 的 Composition API 的开发者来说。
- 完全基于组合式API: 与 Vuex 的 mapGetters、mapActions 和 mapMutations 等辅助函数不同，Pinia 通过 Composition API 提供了更加直观的方式来访问状态、getters 和 actions。
- Devtools 集成: Pinia 也与 Vue Devtools 完美集成，提供了对状态、actions 等的视图。

如何使用 Pinia:
一、首先，你需要安装它：
npm install @pinia/vue
npm install @pinia/core

二、然后，设置 Pinia：
main.js/main.ts
import \{ createApp \} from 'vue'
import \{ createPinia \} from '@pinia/vue'
import App from './App.vue'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')

三、接下来，创建你的第一个 store：
stores/counter.js
import \{ defineStore \} from '@pinia/core'
export const useCounterStore = defineStore(\{
id: 'counter',
state: () =\> (\{
count: 0
\}),
getters: \{
double: state =\> state.count * 2,
expo: state =\> state.count ** 2,
\},
actions: \{
increment() \{
this.count++
\}
\}
\})

四、现在，在你的组件中使用这个 store：
YourComponent.vue
\<template\>
\<div\>
\<p\>Count: \{\{ count \}\}\</p\>
\<p\>Double: \{\{ double \}\}\</p\>
\<p\>Expo: \{\{ expo \}\}\</p\>
\<button @click="increment"\>Increment\</button\>
\</div\>
\</template\>
\<script\>
import \{ useCounterStore \} from '@/stores/counter'
export default \{
setup() \{
const counter = useCounterStore()   return \{
count: counter.count,
double: counter.double,
expo: counter.expo,
increment: counter.increment,
\}
\}
\}
\</script\>
这只是一个简单的示例，但你可以看到 Pinia 的工作方式与 Vuex 有很大的不同，尤其是在其与组合式 API 的集成方面。如果你喜欢组合式 API 的工作方式，那么使用 Pinia 作为状态管理工具可能是一个很好的选择。

另外的使用方式：
import \{ ref \} from "vue";
import \{ defineStore \} from "pinia";
export const useCounterStore = defineStore("counter", () =\> \{
const count = ref(0);
function increment() \{
count.value++;
\}
return \{ count, increment \};
\});
相比组合式API，在不同组件中调用useCounterStore返回的store是同一个引用，而不是每次调用都创建一个新的引用；

在 Vue 3 的 Composition API 中，每次调用一个 ref 或 reactive 定义的 setup 函数或 composable 函数时，它都会返回一个新的引用。这意味着，如果两个组件都调用了相同的 composable 函数，那么这两个组件中的数据引用是彼此独立的。

而在 Pinia（或 Vuex）中，情况则不同。当你定义一个 store（如 useCounterStore）并在多个组件中使用时，你实际上是在访问同一个 store 的单一实例。这意味着所有使用这个 store 的组件都共享相同的数据状态。

举例说明：
使用 Composition API 的情况：
function useCounter() \{
const count = ref(0);
function increment() \{
count.value++;
\}
return \{ count, increment \};
\}
// 在 ComponentA 和 ComponentB 中都调用 useCounter
// 这两个组件中的 count 是不同的引用，彼此独立。

使用 Pinia 的情况：
export const useCounterStore = defineStore("counter", () =\> \{
const count = ref(0);
function increment() \{
count.value++;
\}
return \{ count, increment \};
\});
// 在 ComponentA 和 ComponentB 中都调用 useCounterStore
// 这两个组件中的 count 是相同的引用，共享同一状态。
因此，如果你需要在多个组件之间共享和管理状态，Pinia 或 Vuex 这样的状态管理库是很有用的。

:::
