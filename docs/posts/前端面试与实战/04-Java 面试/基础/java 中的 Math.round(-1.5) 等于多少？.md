---
title: "java 中的 Math.round(-1.5) 等于多少？"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "Java 面试"
description: "Math 提供了三个与取整有关的方法：ceil、floor、round。 ceil（向上取整） ： Math.ceil(11.3) 12 Math.ceil( 11.3) 11 floor（向下取整） ： Math.floor(11.3) 11 Math.floor( 11.3)。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/java/基础/java 中的 Math.round(-1.5) 等于多少？.md"
---
::: v-pre

# java 中的 Math.round(-1.5) 等于多少？

> 本节目标：理解“java 中的 Math.round(-1.5) 等于多少？”的核心思路，并能把它用于实际开发或面试表达。
- Math 提供了三个与取整有关的方法：ceil、floor、round。
- **ceil（向上取整）**：
    - Math.ceil(11.3) = 12
    - Math.ceil(-11.3) = -11
- **floor（向下取整）**：
    - Math.floor(11.3) = 11
    - Math.floor(-11.3) = -12
- **round（四舍五入）**：加0.5然后向下取整。
    - Math.round(11.3) = 11
    - Math.round(11.8) = 12
    - Math.round(-11.3) = -11
    - Math.round(-11.8) = -12

:::
