---
title: "Vue 响应式数据原理"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "Vue 3.x 响应式数据原理 Vue 3 引入了全新的响应式系统，它是基于 Proxy API 实现的，较 Vue 2 的 Object.defineProperty 方式有了很大的提升。下面详细介绍 Vue 3 的响应式数据原理，并对比 Vue 2 的实现方式。 Vue 3。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/Vue 响应式数据原理.md"
---
::: v-pre

# Vue 响应式数据原理

> 本节目标：理解“Vue 响应式数据原理”的核心思路，并能把它用于实际开发或面试表达。
### Vue 3.x 响应式数据原理
Vue 3 引入了全新的响应式系统，它是基于 Proxy API 实现的，较 Vue 2 的 Object.defineProperty 方式有了很大的提升。下面详细介绍 Vue 3 的响应式数据原理，并对比 Vue 2 的实现方式。
#### Vue 3 响应式数据原理
1. **Proxy**：Vue 3 使用 Proxy 来实现响应式代理。Proxy 可以直接拦截对对象的所有操作，使得 Vue 3 可以轻松监听对象的变化。
2. **Reactive API**：Vue 3 提供了 `reactive` 和 `ref` 这两个 API 来创建响应式对象。
- `reactive`：用于将一个普通对象转换为响应式对象。
- `ref`：用于创建一个持有单个值的响应式对象。
3. **响应式追踪与更新**：当你访问响应式对象的属性时，Proxy 会通过 `get` 拦截器进行依赖收集；当你修改属性时，Proxy 会通过 `set` 拦截器进行依赖触发，更新相关的视图。
import \{ reactive, ref, effect \} from 'vue';
const state = reactive(\{ count: 0 \});
const count = ref(0);
effect(() =\> \{
console.log(state.count); // 依赖收集
console.log(count.value); // 依赖收集
\});
state.count++; // 触发依赖更新
count.value++; // 触发依赖更新
#### Vue 2 响应式数据原理
1. **Object.defineProperty**：Vue 2 使用 `Object.defineProperty` 为对象的每个属性添加 getter 和 setter，从而实现对属性的监听。这种方式有一些局限性，比如无法监听数组的索引变化和新属性的添加。
2. **依赖收集与派发更新**：Vue 2 在对象的 getter 中进行依赖收集，在 setter 中派发更新。每个响应式对象都有一个 Dep 实例，存储依赖它的 Watcher。
function defineReactive(obj, key, val) \{
const dep = new Dep();   Object.defineProperty(obj, key, \{
get() \{
dep.depend();
return val;
\},
set(newVal) \{
val = newVal;
dep.notify();
\}
\});
\}
class Dep \{
constructor() \{
this.subs = [];
\}
depend() \{
if (Dep.target) \{
this.subs.push(Dep.target);
\}
\}
notify() \{
this.subs.forEach(sub =\> sub.update());
\}
\}
class Watcher \{
constructor(fn) \{
Dep.target = this;
this.fn = fn;
this.fn();
Dep.target = null;
\}
update() \{
this.fn();
\}
\}
const state = \{ count: 0 \};
defineReactive(state, 'count', state.count);
new Watcher(() =\> \{
console.log(state.count); // 依赖收集
\});
state.count++; // 触发依赖更新

Vue 3 和 Vue 2 对比

|   |   |   |
|---|---|---|
|**特性**|**Vue 2**|**Vue 3**|
|响应式实现方式|Object.defineProperty|Proxy|
|依赖收集与更新|在 getter 和 setter 中手动实现|Proxy 自动拦截对象的所有操作|
|数组和新增属性的监听|需要额外的处理，如 Vue.set|Proxy 能直接监听数组和新增属性的变化|
|性能和灵活性|性能相对较低，灵活性受限|性能更高，更加灵活|
|API|Vue 实例化时创建响应式对象|reactive 和 ref API 创建响应式对象|

总结
Vue 3 通过使用 Proxy 进行响应式数据的实现，使得性能和灵活性得到了大幅提升。同时提供了 `reactive` 和 `ref` API，更加直观和方便地创建响应式对象。相较于 Vue 2，Vue 3 的响应式系统更加现代化和高效。

:::
