---
title: "React 工作流"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "React 是声明式 UI 库，负责将 State 转换为页面结构（虚拟 DOM 结构）后，再转换成真实 DOM 结构，交给浏览器渲染。 当 State 发生改变时，React 会先进行调和（Reconciliation）阶段，调和阶段结束后立刻进入提交（Commit）阶段，提交。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/React 工作流.md"
---
::: v-pre

# React 工作流

> 本节目标：理解“React 工作流”的核心思路，并能把它用于实际开发或面试表达。
React 是声明式 UI 库，负责将 State 转换为页面结构（虚拟 DOM 结构）后，再转换成真实 DOM 结构，交给浏览器渲染。

当 State 发生改变时，React 会先进行调和（Reconciliation）阶段，调和阶段结束后立刻进入提交（Commit）阶段，提交阶段结束后，新 State 对应的页面才被展示出来。

**React** **的调和阶段需要做两件事。**
**1****、计算出目标** **State** **对应的虚拟** **DOM** **结构。**
**2****、寻找「将虚拟** **DOM** **结构修改为目标虚拟** **DOM** **结构」的最优更新方案。**
React 按照深度优先遍历虚拟 DOM 树的方式，在一个虚拟 DOM 上完成两件事的计算后，再计算下一个虚拟 DOM。第一件事主要是调用类组件的 render 方法或函数组件自身。第二件事为 React 内部实现的 Diff 算法，Diff 算法会记录虚拟 DOM 的更新方式（如：Update、Mount、Unmount），为提交阶段做准备。

React 的提交阶段也需要做两件事。
**1****、将调和阶段记录的更新方案应用到** **DOM** **中。**
**2****、调用暴露给开发者的钩子方法，如：****componentDidUpdate****、****useLayoutEffect** **等。** 提交阶段中这两件事的执行时机与调和阶段不同，在提交阶段 React 会先执行 1，等 1 完成后再执行 2。因此在子组件的 componentDidMount 方法中，可以执行 document.querySelector('.parentClass') ，拿到父组件渲染的 .parentClass DOM 节点，尽管这时候父组件的 componentDidMount 方法还没有被执行。

useLayoutEffect 的执行时机与 componentDidMount 相同，可参考[线上代码](https://codesandbox.io/s/cdm-yu-commit-jieduanzhixingshunxu-fzu1w?file=/src/App.js)进行验证。
由于调和阶段的「Diff 过程」和提交阶段的「应用更新方案到 DOM」都属于 React 的内部实现，开发者能提供的优化能力有限，本文仅有一条优化技巧（[列表项使用](#heading-7) key 属性)与它们有关。实际工程中大部分优化方式都集中在调和阶段的「计算目标虚拟 DOM 结构」过程，该过程是优化的重点，React 内部的 Fiber 架构和并发模式也是在减少该过程的耗时阻塞。对于提交阶段的「执行钩子函数」过程，开发者应保证钩子函数中的代码尽量轻量，避免耗时阻塞，相关的优化技巧参考本文的[避免在](#heading-18) didMount、didUpdate 中更新组件 State。

**定义** **Render** **过程**
本文为了叙述方便， **将调和阶段中「计算目标虚拟** **DOM** **结构」过程称为** **Render** **过程** 。触发 React 组件的 Render 过程目前有三种方式，分别为 forceUpdate、State 更新、父组件 Render 触发子组件 Render 过程。

:::
