---
title: "React Profiler 定位 Render 过程瓶颈"
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
description: "React Profiler 是 React 官方提供的性能审查工具，本文只介绍笔者的使用心得，详细的使用手册请移步官网文档。 Profiler 只记录了 Render 过程耗时 开发者可以通过 Profiler 查看组件 Render 过程耗时，但无法知晓提交阶段的耗时。尽管。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/React Profiler 定位 Render 过程瓶颈.md"
---
::: v-pre

# React Profiler 定位 Render 过程瓶颈

> 本节目标：理解“React Profiler 定位 Render 过程瓶颈”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
React Profiler 是 React 官方提供的性能审查工具，本文只介绍笔者的使用心得，详细的使用手册请移步[官网文档](https://zh-hans.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)。

**Profiler** **只记录了** **Render** **过程耗时**
开发者可以通过 Profiler 查看组件 Render 过程耗时，但无法知晓提交阶段的耗时。尽管 Profiler 面板中有 _Committed at_ 字段，但这个字段是相对于录制开始时间，根本没有意义。
因为笔者也曾期望能在 Profiler 中查看提交阶段耗时，一顿踩过坑后诚心建议**不要期望通过** **Profiler** **定位非** **Render** **过程的性能瓶颈问题**。
笔者通过[测试代码](https://codesandbox.io/s/react-profiler-shifoutongji-componentdidmount-zhixingshijian-yosid)验证了 Profiler 中的统计信息不包括提交阶段，有兴趣的读者可以看看。

**开启「记录组件更新原因」**
点击面板上的齿轮，然后勾选「Record why each component rendered while profiling.」，如下图。

然后点击面板中的虚拟 DOM 节点，右侧便会展示该组件重新 Render 的原因。

**定位产生本次** **Render** **过程原因**
由于 React 的批量更新（Batch Update）机制，产生一次 Render 过程可能涉及到很多个组件的状态更新。那么如何定位是哪些组件状态更新导致的呢？

在 Profiler 面板左侧的虚拟 DOM 树结构中，从上到下审查每个发生了渲染的（不会灰色的）组件。如果组件是由于 State 或 Hook 改变触发了 Render 过程，那它就是我们要找的组件，如下图。

:::
