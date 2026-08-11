---
title: "404 not-found notfound not found"
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
description: "\\{ path: '/:pathMatch(. ) ', redirect: \\{ name: 'not found' \\}, meta: \\{ public: true \\}, \\}, 1. 作用 这是 Vue Router 4 的 兜底路由（catch all route）。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/404 not-found notfound not found.md"
---
::: v-pre

# 404 not-found notfound not found

> 本节目标：理解“404 not-found notfound not found”的核心思路，并能把它用于实际开发或面试表达。
\{
  path: '/:pathMatch(.*)*',
  redirect: \{ name: 'not-found' \},
  meta: \{ public: true \},
\},

### 1. 作用
这是 Vue Router 4 的****兜底路由（catch-all route）****。
- `/:pathMatch(.*)*` 会匹配所有没有命中的路径。
- `redirect: { name: 'not-found' }` 会把用户导向你定义好的 `not-found` 页面。
- `meta: { public: true }` 确保未登录用户访问不存在的路由时，不会被守卫拦截，还能正常看到 404 页。

### 2. 好处
- ****统一处理****：不论用户输什么奇怪地址，都能落到 `not-found` 页面。
- ****安全性****：不会暴露系统结构（不匹配的路由不会报错，而是跳转 404）。
- ****守卫配合****：有了 `public: true`，不需要登录也能访问 404 页。

### 3. 潜在问题
- 你在 `children` 里也定义了 `not-found` 页面：
  \{
    path: 'not-found',
    name: 'not-found',
    component: () =\> import('@/views/not-found/page.vue'),
    meta: \{ public: true \},
  \}
  这样相当于有两种方式进入 `not-found`：
  - 显式访问 `/not-found`
  - 未匹配时重定向过去
    → ****没问题****，但算是“重复入口”。
- 如果想避免 `/not-found` 被用户直接访问，也可以只保留兜底路由，不显式写 `/not-found`。

### 4. 最佳实践建议
- 保留现在的写法，没错。
- 如果你喜欢整洁，可以：
  - 移除 `path: 'not-found'` 的定义，只留兜底路由；
  - 直接在兜底路由里用 `component` 而不是 `redirect`，少跳转一步：
    \{
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () =\> import('@/views/not-found/page.vue'),
      meta: \{ public: true \},
    \}

这样用户输错地址就直接落到 404 页，而不是“先重定向再加载”。

:::
