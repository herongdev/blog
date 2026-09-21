---
title: "keep-alive 的使用场景和原理"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "使用场景 \\<keep alive\\ 是 Vue.js 提供的一个内置组件，用于缓存动态组件，避免重复渲染，提高性能。常见的使用场景包括： 1. 组件切换 ：在同一个视图中切换不同的子组件时，使用 \\<keep alive\\ 可以避免组件被销毁和重建，从而保留组件的状态和缓存。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/`keep-alive` 的使用场景和原理.md"
---
::: v-pre

# keep-alive 的使用场景和原理

> 本节目标：理解“keep-alive 的使用场景和原理”的核心思路，并能把它用于实际开发或面试表达。
#### 使用场景
`\<keep-alive\>` 是 Vue.js 提供的一个内置组件，用于缓存动态组件，避免重复渲染，提高性能。常见的使用场景包括：
1. **组件切换**：在同一个视图中切换不同的子组件时，使用 `\<keep-alive\>` 可以避免组件被销毁和重建，从而保留组件的状态和缓存。
2. **路由组件缓存**：在使用 Vue Router 时，对需要缓存的路由组件使用 `\<keep-alive\>`，可以在用户切换路由时保留组件状态和数据。
3. **提升性能**：对于一些性能开销较大的组件，使用 `\<keep-alive\>` 可以减少组件销毁和重建的频率，提升性能。

#### 示例
##### 基本使用
\<template\>
\<div id="app"\>
\<button @click="currentComponent = 'ComponentA'"\>Show Component A\</button\>
\<button @click="currentComponent = 'ComponentB'"\>Show Component B\</button\>
\<keep-alive\>
\<component :is="currentComponent"\>\</component\>
\</keep-alive\>
\</div\>
\</template\>
\<script\>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';
export default \{
data() \{
return \{
currentComponent: 'ComponentA'
\};
\},
components: \{
ComponentA,
ComponentB
\}
\};
\</script\>
##### 路由组件缓存
\<template\>
\<div id="app"\>
\<router-view\>\</router-view\>
\</div\>
\</template\>
\<script\>
export default \{
name: 'App'
\};
\</script\>

// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';
Vue.use(Router);
export default new Router(\{
routes: [
\{
path: '/',
name: 'Home',
component: Home
\},
\{
path: '/about',
name: 'About',
component: About,
meta: \{ keepAlive: true \}
\}
]
\});

\<template\>
\<div id="app"\>
\<keep-alive\>
\<router-view v-if="$route.meta.keepAlive"\>\</router-view\>
\</keep-alive\>
\<router-view v-if="!$route.meta.keepAlive"\>\</router-view\>
\</div\>
\</template\>

#### 原理
`\<keep-alive\>` 的实现原理是通过缓存不活动的组件实例，当组件重新激活时，恢复之前的状态，而不是重新创建组件实例。以下是其主要原理：
1. **缓存机制**：`\<keep-alive\>` 会将不活动的组件实例缓存到内存中，而不是销毁它们。
2. **生命周期钩子**：使用 `\<keep-alive\>` 的组件会新增两个生命周期钩子：
- `activated`：当组件被激活时调用。
- `deactivated`：当组件被停用时调用。
3. **VNode 的缓存**：`\<keep-alive\>` 通过维护一个缓存对象，将不活动的组件对应的 VNode 缓存起来。当组件需要重新激活时，从缓存中取出对应的 VNode。
#### 代码实现（简化版）
以下是 `\<keep-alive\>` 的简化实现示例：
const KeepAlive = \{
name: 'keep-alive',
abstract: true,
props: \{
include: RegExp,
exclude: RegExp
\},
created() \{
this.cache = Object.create(null);
this.keys = [];
\},
destroyed() \{
for (const key in this.cache) \{
pruneCacheEntry(this.cache, key, this.keys);
\}
\},
render() \{
const vnode = this.$slots.default ? this.$slots.default[0] : null;
if (vnode && vnode.componentOptions) \{
const key = vnode.key == null
? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '')
: vnode.key;
if (this.cache[key]) \{
vnode.componentInstance = this.cache[key].componentInstance;
this.keys.splice(this.keys.indexOf(key), 1);
this.keys.push(key);
\} else \{
this.cache[key] = vnode;
this.keys.push(key);
if (this.max && this.keys.length \> parseInt(this.max)) \{
pruneCacheEntry(this.cache, this.keys[0], this.keys, this._vnode);
\}
\}
vnode.data.keepAlive = true;
\}
return vnode || (this.$slots.default && this.$slots.default[0]);
\}
\};
function pruneCacheEntry(cache, key, keys, current) \{
const entry = cache[key];
if (entry && (!current || entry.tag !== current.tag)) \{
entry.componentInstance.$destroy();
\}
cache[key] = null;
keys.splice(keys.indexOf(key), 1);
\}
### 总结
`\<keep-alive\>` 组件用于缓存动态组件，避免重复渲染，提高性能。它通过缓存组件实例和 VNode，在组件重新激活时恢复之前的状态，提供了高效的组件管理方式。常用于组件切换和路由组件缓存等场景。

:::
