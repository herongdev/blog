---
title: "pureComponent与memo"
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
description: "会做一个浅比较； 这个函数接受一个函数和一个对比函数作为参数； 返回一个对象： function memo(type, compare shallowEquals) \\{ return \\{ $$typeof: REACT MEMO, type,//函数组件 compare \\}。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/性能优化 /pureComponent与memo.md"
---
::: v-pre

# pureComponent与memo

> 本节目标：理解“pureComponent与memo”的核心思路，并能把它用于实际开发或面试表达。
会做一个浅比较；

这个函数接受一个函数和一个对比函数作为参数；
返回一个对象：
function memo(type, compare = shallowEquals) \{
  return \{
    $$typeof: REACT_MEMO,
    type,//函数组件
    compare
  \}
\}

:::
