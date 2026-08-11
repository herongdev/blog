---
title: "resetRouter"
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
description: "确实在你调用 resetRouter 之后，如果不明确指定导航路径，可能会出现 404 错误。这是因为在重置路由器时，路由的配置会发生变化，而之前的路由信息可能已经失效。因此，在这种情况下，需要明确指定导航路径以确保导航的正确性。 原理解析 重置路由器： resetRouter。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/vue2中引入vue-router/resetRouter.md"
---
::: v-pre

# resetRouter

> 本节目标：理解“resetRouter”的核心思路，并能把它用于实际开发或面试表达。
确实在你调用 resetRouter 之后，如果不明确指定导航路径，可能会出现 404 错误。这是因为在重置路由器时，路由的配置会发生变化，而之前的路由信息可能已经失效。因此，在这种情况下，需要明确指定导航路径以确保导航的正确性。

原理解析

- 重置路由器：
    - resetRouter 会重置路由匹配器，使得路由器使用新的路由配置。
    - 在调用 resetRouter 后，之前的路由匹配可能会失效，因为路由配置已经被更新。
- 确保路径有效：
    - 在导航守卫中，调用 next 方法时，需要确保路径是新的路由配置中有效的路径。
    - 明确指定路径（如 \{ path: to.path, replace: true \}）可以确保导航到正确的路径，避免 404 错误。

在 `vue-router` 中，重置路由是一项高级操作，通常用于动态更新应用程序的路由配置。这种操作常见于需要根据用户权限动态加载路由的场景。以下是详细的讲解，包括重置路由的操作步骤、影响以及涉及到的方法和 API。

重置路由的操作步骤
1. **创建新的路由匹配器**：使用新的路由配置创建一个新的 `router.matcher`，该匹配器将替换当前的路由匹配器。
2. **更新路由匹配器**：将新的匹配器赋值给现有的 `router` 实例，从而更新路由配置。
3. **更新 Vuex**：将新的路由信息保存到 Vuex 中，确保状态管理中的路由信息是最新的。
4. **打印新的路由配置**：输出新的路由配置，便于调试和验证。
代码示例
export function resetRouter(routes = []) \{
router.matcher = createRouter(routes).matcher;
const routersList = router.matcher.getRoutes();
// 将路由信息保存到 Vuex 中
store.commit('route/setRoutes', routersList);
// 打印设置后的路由
console.log("Reset Routes:", routersList);
\}

详细讲解
1. **创建新的路由匹配器**
const newMatcher = createRouter(routes).matcher;
`createRouter` 是一个创建新的 `VueRouter` 实例的函数。通过传入新的路由配置 `routes`，创建一个新的路由匹配器 `matcher`。
2. **更新路由匹配器**
router.matcher = newMatcher;
将新的匹配器赋值给现有的 `router` 实例，从而更新路由配置。这会使得路由器使用新的路由配置来匹配接下来的导航请求。
3. **更新 Vuex**
const routersList = router.matcher.getRoutes();
store.commit('route/setRoutes', routersList);
使用 `router.matcher.getRoutes()` 获取所有新的路由信息，然后将其提交到 Vuex 的 `route/setRoutes` mutation 中。这确保了状态管理中的路由信息是最新的，便于在应用的其他部分使用这些信息。

涉及到的方法和 API
1. **createRouter**
`createRouter` 是一个用于创建新的 `VueRouter` 实例的函数。它接收一个包含路由配置的数组，并返回一个新的 `VueRouter` 实例。
function createRouter(routes) \{
return new VueRouter(\{
mode: 'history',
routes
\});
\}
2. **router.matcher**
`matcher` 是 `VueRouter` 实例的一个内部属性，负责管理路由匹配逻辑。通过更新 `matcher`，可以动态更改路由配置。
3. **router.matcher.getRoutes**
`getRoutes` 方法返回当前路由器的所有路由配置。这对于在重置路由后获取新的路由信息非常有用。
const routersList = router.matcher.getRoutes();
4. **store.commit**
`store.commit` 方法用于提交一个 mutation。这在更新 Vuex 状态时非常有用。
store.commit('route/setRoutes', routersList);

影响
1. **路由配置更新**：通过重置路由，应用的路由配置将会动态更新。这对于根据用户权限加载不同的路由非常有用。
2. **导航行为变化**：由于路由配置已更新，导航行为可能会变化。需要确保所有新的导航请求都能正确匹配新的路由配置。
3. **状态管理同步**：通过将新的路由信息保存到 Vuex 中，确保状态管理中的路由信息与实际的路由配置保持一致。

示例用法
假设你有一个权限管理系统，根据用户角色动态加载路由。在用户登录后，根据用户角色获取路由配置并重置路由：
import router from '@/router';
import store from '@/store';
import \{ getRoutes \} from '@/api/permissions';
// 用户登录后，根据权限重置路由
async function onLogin() \{
const routes = await getRoutes();
resetRouter(routes);
router.push('/');
\}
通过这种方式，可以实现根据用户权限动态加载路由，并确保路由配置的灵活性和动态性。

:::
