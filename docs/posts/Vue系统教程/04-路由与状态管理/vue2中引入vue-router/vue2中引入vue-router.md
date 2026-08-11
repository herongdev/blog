---
title: "vue2中引入vue-router"
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
description: "关健节点的执行顺序 一、在创建Vue实例时，我们要传入router配置，这时的router配置将是最先被使用的； 二、接下来，在到达任何路由对应的页面时，都会走beforeEach钩子；如果我们是从后端得到路由数据，可以在这里判断有没有拿到了路由数据，如果没有，等拿到后再next。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/vue2中引入vue-router/vue2中引入vue-router.md"
---
::: v-pre

# vue2中引入vue-router

> 本节目标：理解“vue2中引入vue-router”的核心思路，并能把它用于实际开发或面试表达。
关健节点的执行顺序
一、在创建Vue实例时，我们要传入router配置，这时的router配置将是最先被使用的；
二、接下来，在到达任何路由对应的页面时，都会走beforeEach钩子；如果我们是从后端得到路由数据，可以在这里判断有没有拿到了路由数据，如果没有，等拿到后再next()；或者先渲染路由，拿到后端路由数据后，resetRouter，再重定向到/；
三，刷新页面时的处理

1. ** 安装`vue-router` **：
npm install vue - router
yarn add vue - router

2. ** 引入并使用`vue-router` **：
在项目的入口文件（例如 `main.js`）中引入并使用 `vue-router`。

1. Vue.use(VueRouter);
2. new VueRouter
3. 给new Vue传入router配置
4. 定义真实的路由配置

import Vue from 'vue';
import App from './App.vue';
==import== ==VueRouter== ==from== =='vue-router'====;==
==import== ==routes== ==from== =='./routes'====;==

Vue.config.productionTip = false;

==Vue====.====use====(====VueRouter====);==
==const== ==router== ===== ==new== ==VueRouter====(\{==
==routes====,== ==//== ==使用的路由配置==
==mode:== =='history'====,== ==//== ==采用====history====模式去掉====URL====中的====#==
==\});==

new Vue(\{
render: h =\> h(App),
==router====,==
\}).$mount('#app');

3. ** 配置路由 **：
创建一个 `routes.js` 文件，定义应用的路由配置。
import Home from './components/Home.vue';
import About from './components/About.vue';
export default [
\{
path: '/',
name: 'Home',
component: Home,
\},
\{
path: '/about',
name: 'About',
component: About,
\},
];

4. ** 在组件中使用`\<router-view\>` 和`\<router-link\>` **：
在主组件或 `App.vue` 中使用 `\<router-view\>` 以显示路由匹配的组件，并使用 `\<router-link\>` 进行导航。
\<template\>
\<div id="app"\>
\<nav\>
\<router-link to="/"\>Home\</router-link\>
\<router-link to="/about"\>About\</router-link\>
\</nav\>
\<router-view\>\</router-view\>
\</div\>
\</template\>
\<script\>
export default \{
name: 'App',
\};
\</script\>
这样就完成了在 Vue 2 项目中引入和使用 `vue-router` 的基本步骤。

:::
