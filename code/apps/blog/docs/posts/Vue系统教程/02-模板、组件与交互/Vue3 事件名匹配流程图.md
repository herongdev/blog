---
title: "Vue3 事件名匹配流程图"
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
description: "视觉版（更形象） 记忆口诀 \\ emit 用驼峰，监听用短横 \\ 子组件 emit('myEvent') \\ 父组件 @my event \"...\"。"
sidebarWeight: 107
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/自定义事件/Vue3 事件名匹配流程图.md"
---
::: v-pre

# Vue3 事件名匹配流程图

> 本节目标：理解“Vue3 事件名匹配流程图”的核心思路，并能把它用于实际开发或面试表达。
```
          子组件 emit('myEvent')
                  │
                  ▼
        defineEmits(['myEvent'])
                  │
                  ▼
   Vue 内部事件注册表保存 'myEvent' (原样)
                  │
                  ▼
        模板编译阶段（父组件模板）
                  │
                  ▼
<Child @my-event="handler">   <-- 模板中的事件名会被编译成小写+kebab-case
                  │
                  ▼
   Vue 将 "my-event" 转换成 "myEvent" 去匹配注册的事件
                  │
                  ▼
          匹配成功 → 调用 handler()
```
---
### 视觉版（更形象）
```
 子组件
 ┌───────────────────────────────┐
 │ emit('myEvent', data)         │
 └───────────────┬───────────────┘
                 │
                 ▼
         Vue 保留原名 'myEvent'
                 │
                 ▼
 父组件模板
 ┌───────────────────────────────┐
 │ <Child @my-event="onChild" /> │  ← 必须写成 kebab-case
 └───────────────────────────────┘
                 │
                 ▼
   编译器将 my-event → myEvent 匹配 emit
                 │
                 ▼
          调用 onChild(data)
```
---
### 记忆口诀
\> ****emit 用驼峰，监听用短横****
\> 子组件 `emit('myEvent')`
\> 父组件 `@my-event="..."`

:::
