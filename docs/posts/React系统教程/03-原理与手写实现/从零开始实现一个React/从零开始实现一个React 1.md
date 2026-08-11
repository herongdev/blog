---
title: "从零开始实现一个React 1"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "前言 React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。 提起React，总是。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/从零开始实现一个React 1.md"
---
::: v-pre

# 从零开始实现一个React 1

> 本节目标：理解“从零开始实现一个React 1”的核心思路，并能把它用于实际开发或面试表达。
**前言**
==React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。==
==提起React，总是免不了和Vue做一番对比==
==Vue====的====API====设计非常简洁，但是其实现方式却让人感觉是“魔法”，开发者虽然能马上上手，但其原理却很难说清楚。==
==相比之下====React====的设计哲学非常简单，虽然有很多需要自己处理的细节问题，但它没有引入任何新的概念，相对更加的干净和简单。==
 \> **大致思路：**

1.

```
使用Diff算法避免Dom的重描，提高效率。
```

```
使用异步的setState方法来优化得渲染。
```

:::
