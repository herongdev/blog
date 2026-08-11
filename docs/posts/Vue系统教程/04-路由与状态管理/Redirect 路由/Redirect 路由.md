---
title: "Redirect 路由"
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
description: "这个 redirect 路由主要是一个 中转跳转页 ，在大厂项目里很常见，作用和场景大概有这几个： 1. 登录回跳 当用户访问某个需要登录的页面时，你会把他重定向到 /user?redirect /xxx 。 登录完成后，会跳到 /redirect?to /xxx 。 redir。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/Redirect 路由/Redirect 路由.md"
---
::: v-pre

# Redirect 路由

> 本节目标：理解“Redirect 路由”的核心思路，并能把它用于实际开发或面试表达。
这个 `redirect` 路由主要是一个 ****中转跳转页****，在大厂项目里很常见，作用和场景大概有这几个：

### 1. 登录回跳
- 当用户访问某个需要登录的页面时，你会把他重定向到 `/user?redirect=/xxx`。
- 登录完成后，会跳到 `/redirect?to=/xxx`。
- `redirect` 页内部逻辑就是：读取 query 参数 `to`，然后用 `router.replace` 去真正的目标页面。
- 这样可以避免「登录守卫」和 `next({ path: ... })` 里出现多层嵌套跳转的问题。

### 2. 处理外链/动态跳转
- 有时需要根据参数跳转到站内/外的不同页面，比如：
  `/redirect?to=https%3A%2F%2Fexample.com` → 最终会 `window.location.href` 到外部。
- 可以在这页里做统一处理（白名单校验 / 埋点统计）。

### 3. 清理多余状态
- 一些场景下（比如登录态切换、刷新 token），需要「中间页」来清理缓存，再跳到目标地址。
- 例如退出登录后跳 `/redirect?to=/user`，先清理 token，再跳转。

### 4. SSR / 异步数据场景下的兜底
- 在 Next.js/Nuxt 等框架里会有 `/_redirect` 这种机制。
- Vue 项目里模仿一个 `redirect` 页，保证跳转行为一致可控。

✅ 总结一句：
`redirect` 路由本身不会展示 UI，而是一个 ****通用跳板页****，专门负责「安全可控的跳转」，常用于 ****登录回跳****、****外链处理****、****状态清理****。

:::
