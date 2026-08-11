---
title: "Vue Router 路由钩子函数概述"
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
description: "Vue Router 提供了一些路由钩子函数，允许你在路由变化前后执行一些逻辑。这些钩子函数包括全局守卫、路由独享守卫、组件内守卫等。它们的执行顺序也有一定的规则。以下是对这些钩子函数的详细介绍和执行顺序说明。 全局守卫 1. 全局前置守卫 (beforeEach) 在每个路由改。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/Vue Router 路由钩子函数概述.md"
---
::: v-pre

# Vue Router 路由钩子函数概述

> 本节目标：理解“Vue Router 路由钩子函数概述”的核心思路，并能把它用于实际开发或面试表达。
Vue Router 提供了一些路由钩子函数，允许你在路由变化前后执行一些逻辑。这些钩子函数包括全局守卫、路由独享守卫、组件内守卫等。它们的执行顺序也有一定的规则。以下是对这些钩子函数的详细介绍和执行顺序说明。

全局守卫
1. **全局前置守卫 (beforeEach)**
- 在每个路由改变前执行。
- 用于权限验证、重定向等。
router.beforeEach((to, from, next) =\> \{
// 做一些处理...
next();
\});
2. **全局解析守卫 (beforeResolve)**
- 在路由改变被确认前，且在所有组件内守卫和异步路由组件被解析之后执行。
router.beforeResolve((to, from, next) =\> \{
// 做一些处理...
next();
\});
3. **全局后置守卫 (afterEach)**
- 在每个路由改变后执行，不接受 next 参数。
router.afterEach((to, from) =\> \{
// 做一些处理...
\});
#### 路由独享守卫
1. **beforeEnter**
- 在路由配置中直接定义，只对某个特定路由有效。
const router = new VueRouter(\{
routes: [
\{
path: '/some-path',
component: SomeComponent,
beforeEnter: (to, from, next) =\> \{
// 做一些处理...
next();
\}
\}
]
\});

组件内守卫
1. **beforeRouteEnter**
- 在路由进入该组件前调用。
export default \{
beforeRouteEnter(to, from, next) \{
// 做一些处理...
next();
\}
\};
2. **beforeRouteUpdate**
- 在当前路由改变时调用，适用于当前组件被复用的情况。
export default \{
beforeRouteUpdate(to, from, next) \{
// 做一些处理...
next();
\}
\};
3. **beforeRouteLeave**
- 在导航离开该组件的路由时调用。
export default \{
beforeRouteLeave(to, from, next) \{
// 做一些处理...
next();
\}
\};

执行顺序
1. **导航触发，先调用全局的 beforeEach 守卫**。
2. **调用路由配置中 beforeEnter 守卫**。
3. **解析异步路由组件**。
4. **在失活的组件 (即将离开的组件) 内调用 beforeRouteLeave 守卫**。
5. **调用组件内的 beforeRouteUpdate 守卫**（如果存在）。
6. **在激活的组件 (即将进入的组件) 内调用 beforeRouteEnter 守卫**。
7. **调用全局的 beforeResolve 守卫**。
8. **导航被确认，调用全局的 afterEach 钩子**。

示例
const router = new VueRouter(\{
routes: [
\{
path: '/home',
component: Home,
beforeEnter: (to, from, next) =\> \{
console.log('路由独享 beforeEnter');
next();
\}
\},
\{
path: '/about',
component: About
\}
]
\});
router.beforeEach((to, from, next) =\> \{
console.log('全局 beforeEach');
next();
\});
router.beforeResolve((to, from, next) =\> \{
console.log('全局 beforeResolve');
next();
\});
router.afterEach((to, from) =\> \{
console.log('全局 afterEach');
\});
new Vue(\{
router,
render: h =\> h(App)
\}).$mount('#app');

总结
通过上面的介绍和示例，可以清楚地了解 Vue Router 中各类钩子函数的用途及其执行顺序。合理使用这些钩子函数，可以有效地控制路由行为，实现权限控制、数据预加载等功能。在实际项目中，结合具体需求选择合适的钩子函数进行处理，可以提高代码的可维护性和可读性。

:::
