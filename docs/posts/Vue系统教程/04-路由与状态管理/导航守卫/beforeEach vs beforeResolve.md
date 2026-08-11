---
title: "beforeEach vs beforeResolve"
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
description: "Vue Router 守卫体系： beforeEach vs beforeResolve 一、整体思路 在 Vue Router 中，导航守卫的触发顺序大致是： 1. 全局前置守卫 → router.beforeEach 2. 路由配置里单个路由的守卫 → beforeEnter。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/导航守卫/`beforeEach` vs `beforeResolve`.md"
---
::: v-pre

# beforeEach vs beforeResolve

> 本节目标：理解“beforeEach vs beforeResolve”的核心思路，并能把它用于实际开发或面试表达。
# Vue Router 守卫体系：****`beforeEach`** **vs** **`beforeResolve`
## 一、整体思路
在 Vue Router 中，导航守卫的触发顺序大致是：
1. ****全局前置守卫**** → `router.beforeEach`
2. ****路由配置里单个路由的守卫**** → `beforeEnter`
3. ****组件内的守卫**** → `beforeRouteEnter`
4. ****全局解析守卫**** → `router.beforeResolve`
5. ****全局后置守卫**** → `router.afterEach`
👉 其中 `beforeEach` 和 `beforeResolve` 看似相似，实际上适合放****不同阶段的逻辑****。

## 二、****`beforeEach`** **的作用
- ****时机****：在任何导航被触发时，最先执行。
- ****特点****：可取消，可重定向。
- ****常用用途****：
  1. ****身份认证检查****
     router.beforeEach((to, _from, next) =\> \{
       if (to.meta.requiresAuth && !userStore.isLoggedIn) \{
         return next(\{ name: 'login', query: \{ redirect: to.fullPath \} \})
       \}
       next()
     \})
     说明：适合做“是否允许进入”的逻辑。
  2. ****基础拦截（黑名单/白名单）****
     - 公共页面白名单 (`/login`, `/register`)
     - 需要角色权限的页面（如后台管理）
  3. ****页面级别 loading / NProgress****
     - 在导航一开始时启动页面进度条。

## 三、****`beforeResolve`** **的作用
- ****时机****：在所有异步路由组件被解析完成、且 `beforeEnter`/组件内 `beforeRouteEnter` 都通过后，才会触发。
- ****特点****：也可取消，可重定向，但它离导航“确认”最近。
- ****常用用途****：
  1. ****数据预取（Data Prefetch）****
     router.beforeResolve(async (to, _from, next) =\> \{
       try \{
         if (to.meta.prefetch) \{
           await api.fetchPageData(to.name as string)
         \}
         next()
       \} catch (err) \{
         console.error(err)
         next(false) // 阻止导航
       \}
     \})
     说明：确保进入页面前数据准备好。
  2. ****权限二次确认****
     - 在组件内动态加载权限数据后，再决定是否放行。
     - 避免因为异步校验导致用户先闪现页面。
  3. ****SSR/SEO 场景****
     - 确保进入路由前数据都加载完成，利于首屏完整渲染。

## 四、最佳实践推荐
在大厂或中大型项目里，通常会这样分工：
- ********`beforeEach`********
  - 全局身份校验（登录态、token 有效性）
  - 简单的白名单拦截（不需要请求接口即可判断的）
- ********`beforeResolve`********
  - 依赖接口/异步逻辑的权限判断（比如是否已绑定手机号、是否有二次验证）
  - 页面必要数据预取（接口请求 + loading）
  - 在 SSR/SEO 场景下，保证路由切换前就拿到数据
- ********`afterEach`********
  - 日志埋点（PV/UV 上报）
  - 停止进度条
  - 页面标题设置

## 五、总结
- `beforeEach` = ****粗过滤、身份校验、快速拦截****
- `beforeResolve` = ****细过滤、异步数据准备、SSR 数据依赖****
- 最佳实践：
  - ****能同步判断的放** **`beforeEach`********（快速决策）
  - ****要异步/依赖数据的放** **`beforeResolve`********（在确认前最后拦截）

要不要我帮你写一个 ****大厂级别的守卫注册文件模板****（带 `beforeEach`、`beforeResolve`、`afterEach` 三类逻辑分层）？这样你能直接落地用在你项目里。
 13. **什么时候会白屏？**
    - 如果你在 beforeEach 里做了 await fetch()，这时路由还没解析，Vue 还没去加载目标组件，\<router-view\> 里什么都没有——就会白屏。
14. **为什么 beforeResolve 不白屏？**
    - 路由在进入 beforeResolve 之前，已经把目标组件（包括所有异步组件）都「解析（import）」好了，这时虽然还没真正 mount，但 \<router-view\> 可以先渲染一个 Suspense fallback 或者是前一个路由的内容，不会直接出现纯白。
**具体做法**
**1. 在 App.vue 用 \<Suspense\> 包裹 \<router-view\>**
只需要调整这几行，不要贴整个文件。
\<template\>- \<router-view /\>+ \<Suspense\>+ \<template #default\>\<router-view/\>\</template\>+ \<!-- 异步组件加载前的骨架/Spinner --\>+ \<template #fallback\>\<LoadingSpinner/\>\</template\>+ \</Suspense\>\</template\>
这样，不管你是 beforeEach 还是 beforeResolve 里拦截，只要组件还没挂载，用户都能看到 \<Suspense\> 的 fallback，就不会白屏。

:::
