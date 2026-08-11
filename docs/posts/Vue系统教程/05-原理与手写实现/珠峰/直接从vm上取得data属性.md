---
title: "直接从vm上取得data属性"
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
description: "对vm上data属性的访问，代理到vm.options.data上去。 这个操作发生在对数据的监测完成之后。"
sidebarWeight: 81
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/珠峰/直接从vm上取得data属性.md"
---
::: v-pre

# 直接从vm上取得data属性

> 本节目标：理解“直接从vm上取得data属性”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
对vm上data属性的访问，代理到vm.options.data上去。

这个操作发生在对数据的监测完成之后。

:::
