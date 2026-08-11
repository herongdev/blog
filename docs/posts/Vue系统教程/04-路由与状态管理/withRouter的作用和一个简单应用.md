---
title: "withRouter的作用和一个简单应用"
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
description: "作用： 把不是通过路由切换过来的组件中，将 react router 的 history 、 location 、 match 三个对象传入 props 对象上 默认情况下必须是经过路由匹配渲染的组件才存在 this.props ，才拥有路由参数，才能使用编程式导航的写法，执行。"
sidebarWeight: 118
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/路由/withRouter的作用和一个简单应用.md"
---
::: v-pre

# withRouter的作用和一个简单应用

> 本节目标：理解“withRouter的作用和一个简单应用”的核心思路，并能把它用于实际开发或面试表达。
**作用：**把不是通过路由切换过来的组件中，将`react-router` 的 `history`、`location`、`match` 三个对象传入`props`对象上

默认情况下必须是经过路由匹配渲染的组件才存在`this.props`，才拥有路由参数，才能使用编程式导航的写法，执行`this.props.history.push('/detail')`跳转到对应路由的页面
然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用`withRouter`就可以给此组件传入路由参数，此时就可以使用`this.props`
 \> 来自

```
 <https://www.cnblogs.com/luowenshuai/p/9526341.html>
```

:::
