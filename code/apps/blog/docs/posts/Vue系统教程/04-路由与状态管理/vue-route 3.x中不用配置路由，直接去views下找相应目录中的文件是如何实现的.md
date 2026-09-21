---
title: "vue-route 3.x中不用配置路由，直接去views下找相应目录中的文件是如何实现的"
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
description: "在 Vue Router 3.x 中，要实现自动匹配 views 目录下的文件作为路由，你需要在创建路由配置时使用动态导入和遍历文件的方法。下面是一个实现的例子： 首先，安装 require.context 的 TypeScript 类型定义： bash Copy code np。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/vue-route 3.x中不用配置路由，直接去views下找相应目录中的文件是如何实现的.md"
---
::: v-pre

# vue-route 3.x中不用配置路由，直接去views下找相应目录中的文件是如何实现的

> 本节目标：理解“vue-route 3.x中不用配置路由，直接去views下找相应目录中的文件是如何实现的”的核心思路，并能把它用于实际开发或面试表达。
在 Vue Router 3.x 中，要实现自动匹配 views 目录下的文件作为路由，你需要在创建路由配置时使用动态导入和遍历文件的方法。下面是一个实现的例子：

首先，安装 require.context 的 TypeScript 类型定义：

bash
Copy code
npm install --save-dev @types/webpack-env
然后，修改 router.js 或 router.ts 文件：

javascript
Copy code
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 自动生成路由
function loadView(view) \{
return () =\> import(`@/views/${view}.vue`);
\}

const requireContext = require.context("@/views", true, /\.vue$/);
const routes = [];

requireContext.keys().forEach((fileName) =\> \{
const fileNameParts = fileName.split("/");
const componentName = fileNameParts[fileNameParts.length - 1].replace(/\.vue$/, "");
const routePath = "/" + fileName.replace(/^\.\/(.*)\.\w+$/, "$1");

routes.push(\{
path: routePath,
name: componentName,
component: loadView(routePath.substring(1)),
\});
\});

export default new Router(\{
routes,
\});
在这个例子中，我们使用了 require.context（一个 Webpack 提供的方法）来获取 views 目录下所有 .vue 文件。遍历这些文件，生成相应的路由配置，并使用动态导入的方式加载对应组件。这样，在你的应用中，所有 views 目录下的 .vue 文件将自动作为路由进行匹配。

注意：这种方法依赖于 Webpack，只能在使用 Webpack 打包的项目中使用。如果你的项目没有使用 Webpack，请考虑使用其他方法实现类似功能。

:::
