---
title: "component"
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
description: "用法 ：渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。\\<! 动态组件由 vm 实例的 componentId property 控制 \\ \\<component :is \"componentId\"\\ \\</component\\ \\<! 也能够渲染注册过的组。"
sidebarWeight: 96
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/动态组件/component.md"
---
::: v-pre

# component

> 本节目标：理解“component”的核心思路，并能把它用于实际开发或面试表达。
```
**Props**：
is - string | ComponentDefinition | ComponentConstructor
inline-template - boolean
```

**用法**：渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。\<!-- 动态组件由 vm 实例的 `componentId` property 控制 --\>\<component :is="componentId"\>\</component\>\<!-- 也能够渲染注册过的组件或 prop 传入的组件 --\>\<component :is="$options.components.child"\>\</component\>
 \> 来自

```
 <https://cn.vuejs.org/v2/api/#%E5%86%85%E7%BD%AE%E7%9A%84%E7%BB%84%E4%BB%B6>
```

:::
