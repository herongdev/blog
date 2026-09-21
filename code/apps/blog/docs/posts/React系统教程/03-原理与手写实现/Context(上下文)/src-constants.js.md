---
title: "src-constants.js"
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
description: "围绕“src-constants.js”整理的概念、示例与实践笔记。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Context(上下文)/src-constants.js.md"
---
::: v-pre

# src-constants.js

> 本节目标：理解“src-constants.js”的核心思路，并能把它用于实际开发或面试表达。
```
export const REACT_TEXT = Symbol('REACT_TEXT');
export const REACT_ELEMENT = Symbol('react.element');
// 以下是dom操作类型常量
// 插入，移动和删除元素
export const PLACEMENT = 'PLACEMENT';
export const MOVE = 'MOVE';
export const DELETION = 'DELETION';
// 以下为react中特殊组件Api，共四个，它们都是返回一个对象，并且用$$typeof来区分这些对象，从而进行特殊处理，还有react.memo
export const REACT_FORWARD_REF = Symbol('react.forward_ref');
//片断
export const REACT_FRAGMENT = Symbol('react.fragment');
//提供点
export const REACT_PROVIDER = Symbol('react.provider');
//消息者
export const REACT_CONTEXT = Symbol('react.context');
```

:::
