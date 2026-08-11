---
title: "表单中两个select 互斥"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "一、用两个状态值保存两个formitem的值； 二、再用两个值记录两个select的选项，但这两个选项是计算属性，计算中的依赖项分别是另外一个表单项的现在选中的值，然后用初始的options进行map，对于相等的选项设置禁用。"
sidebarWeight: 70
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/表单中两个select 互斥.md"
---
::: v-pre

# 表单中两个select 互斥

> 本节目标：理解“表单中两个select 互斥”的核心思路，并能把它用于实际开发或面试表达。
一、用两个状态值保存两个formitem的值；
二、再用两个值记录两个select的选项，但这两个选项是计算属性，计算中的依赖项分别是另外一个表单项的现在选中的值，然后用初始的options进行map，对于相等的选项设置禁用；

:::
