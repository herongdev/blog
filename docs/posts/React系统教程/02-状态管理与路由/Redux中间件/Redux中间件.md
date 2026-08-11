---
title: "Redux中间件"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "状态管理与路由"
description: "如果没有中间件的运用， redux 的工作流程是这样 action \\ reducer ，这是相当于同步操作，由 dispatch 触发 action 后，直接去 reducer 执行相应的动作； 但是在某些比较复杂的业务逻辑中，这种同步的实现方式并不能很好的解决我们的问题。比如。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/Redux中间件 /Redux中间件.md"
---
::: v-pre

# Redux中间件

> 本节目标：理解“Redux中间件”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
如果没有中间件的运用，`redux` 的工作流程是这样 `action -\> reducer`，这是相当于同步操作，由`dispatch` 触发`action`后，直接去`reducer`执行相应的动作；

但是在某些比较复杂的业务逻辑中，这种同步的实现方式并不能很好的解决我们的问题。比如我们有一个这样的需求，点击按钮 `-\>` 获取服务器数据 `-\>` 渲染视图，因为获取服务器数据是需要异步实现，所以这时候我就需要引入中间件改变`redux`同步执行的流程，形成异步流程来实现我们所要的逻辑；

有了中间件，`redux` 的工作流程就变成这样 `action -\> middlewares -\> reducer`，点击按钮就相当于`dispatch` 触发`action`，接下去获取服务器数据 `middlewares` 的执行，当 `middlewares` 成功获取到服务器就去触发`reducer`对应的动作，更新需要渲染视图的数据；

中间件的机制可以让我们改变数据流，实现如异步 `action` ，`action` 过滤，日志输出，异常报告等功能。

:::
