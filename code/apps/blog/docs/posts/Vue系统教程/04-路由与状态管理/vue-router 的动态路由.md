---
title: "vue-router 的动态路由"
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
description: "vue router 的动态路由是指在应用程序运行时动态添加、删除或修改路由配置的功能。动态路由通常用于处理用户权限控制、多语言支持、动态菜单等场景。通过 vue router 的动态路由，可以在应用初始化时不加载所有的路由，而是根据实际情况（如用户角色、权限等）动态地决定哪些路。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/`vue-router` 的动态路由.md"
---
::: v-pre

# vue-router 的动态路由

> 本节目标：理解“vue-router 的动态路由”的核心思路，并能把它用于实际开发或面试表达。
`vue-router` 的动态路由是指在应用程序运行时动态添加、删除或修改路由配置的功能。动态路由通常用于处理用户权限控制、多语言支持、动态菜单等场景。通过 `vue-router` 的动态路由，可以在应用初始化时不加载所有的路由，而是根据实际情况（如用户角色、权限等）动态地决定哪些路由应该添加到路由配置中。

以下是一个简单的示例：
// 假设我们有一个 Vue 实例
const router = new VueRouter(\{
routes: [
\{
path: '/home',
component: HomeComponent
\}
]
\});
// 之后我们可以在需要时动态添加新的路由
const newRoute = \{
path: '/admin',
component: AdminComponent
\};
router.addRoute(newRoute);
// 也可以删除某个路由
router.removeRoute('/admin');

使用动态路由的主要优势是灵活性，可以根据具体业务需求在运行时调整路由配置，从而提升应用的适应性和扩展性。

使用 vue-router 的动态路由时，路由会立即生效。也就是说，当你使用 router.addRoute 方法添加新的路由或使用 router.removeRoute 方法删除现有路由后，这些更改会立即反映在应用程序中。

:::
