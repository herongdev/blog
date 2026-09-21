---
title: "Ref"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "将基本类型值变成响应式的； 也可以包装对象； 取值要使用val.value; 内部原理是defineProperty; 新增src/ref.ts 在这之前，先导出它 代码如下：。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Ref/Ref.md"
---
::: v-pre

# Ref

> 本节目标：理解“Ref”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
将基本类型值变成响应式的；

也可以包装对象；

取值要使用val.value;

内部原理是defineProperty;
新增src/ref.ts
在这之前，先导出它

代码如下：

:::
