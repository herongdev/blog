---
title: "三、MVVM原型(Mock版)"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "MVVM框架其实就是在原先的View和Model之间增加了一个VM层完成以下工作。完成数据与视图的监听。我们这一步先写一个Mock版本。其实就是先针对固定的视图和数据模型实现监听。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/min-vue/三、MVVM原型(Mock版)/三、MVVM原型(Mock版).md"
---
::: v-pre

# 三、MVVM原型(Mock版)

> 本节目标：理解“三、MVVM原型(Mock版)”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
MVVM框架其实就是在原先的View和Model之间增加了一个VM层完成以下工作。完成数据与视图的监听。我们这一步先写一个Mock版本。其实就是先针对固定的视图和数据模型实现监听。

:::
