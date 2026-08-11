---
title: "transition-group"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "\\ 来自 \\<https://cn.vuejs.org/v2/api/ %E5%86%85%E7%BD%AE%E7%9A%84%E7%BB%84%E4%BB%B6\\。"
sidebarWeight: 115
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/过渡和动画/transition-group.md"
---
::: v-pre

# transition-group

> 本节目标：理解“transition-group”的核心思路，并能把它用于实际开发或面试表达。
```
**Props**：
```

```
tag - string，默认为 span
```

```
move-class - 覆盖移动过渡期间应用的 CSS 类。
```

```
除了 mode，其他 attribute 和 <transition> 相同。
```

```
**事件**：
```

```
事件和 <transition> 相同。
```

```
**用法**：<transition-group> 元素作为多个元素/组件的过渡效果。<transition-group> 渲染一个真实的 DOM 元素。默认渲染 <span>，可以通过 tag attribute 配置哪个元素应该被渲染。注意，每个 <transition-group> 的子节点必须有**独立的** **key**，动画才能正常工作<transition-group> 支持通过 CSS transform 过渡移动。当一个子节点被更新，从屏幕上的位置发生变化，它会被应用一个移动中的 CSS 类 (通过 name attribute 或配置 move-class attribute 自动生成)。如果 CSS transform property 是“可过渡”property，当应用移动类时，将会使用 [FLIP](https://aerotwist.com/blog/flip-your-animations/) 技术使元素流畅地到达动画终点。
<transition-group tag="ul" name="slide">
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</transition-group>
**参考**：[过渡：进入，离开和列表](https://cn.vuejs.org/v2/guide/transitions.html)
```
 \> 来自 \<[https://cn.vuejs.org/v2/api/#%E5%86%85%E7%BD%AE%E7%9A%84%E7%BB%84%E4%BB%B6](https://cn.vuejs.org/v2/api/#%E5%86%85%E7%BD%AE%E7%9A%84%E7%BB%84%E4%BB%B6)\>

:::
