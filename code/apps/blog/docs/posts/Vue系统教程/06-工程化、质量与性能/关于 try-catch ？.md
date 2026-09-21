---
title: "关于 try-catch ？"
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
description: "try / catch 很棒但它仅能用于命令式代码（ imperative code ）： 然而， React 组件是声明式的并且具体指出 什么 需要被渲染： \\<Button /\\ 错误边界保留了 React 的声明性质，其行为符合你的预期。例如，即使一个错误发生在 compo。"
sidebarWeight: 70
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/错误处理/关于 try-catch ？.md"
---
::: v-pre

# 关于 try-catch ？

> 本节目标：理解“关于 try-catch ？”的核心思路，并能把它用于实际开发或面试表达。
`try / catch` 很棒但它仅能用于命令式代码（`imperative code`）：

```
try {  showButton();} catch (error) {  // ...}
```
 然而，`React` 组件是声明式的并且具体指出 _什么_ 需要被渲染：
`\<Button /\>`

错误边界保留了 `React` 的声明性质，其行为符合你的预期。例如，即使一个错误发生在 `componentDidUpdate` 方法中，并且由某一个深层组件树的 `setState` 引起，其仍然能够冒泡到最近的错误边界。

:::
