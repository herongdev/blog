---
title: "String str=i 与 String str=new String(i) 一样吗？"
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
description: "String str \"i\" 会将字符串分配到常量池中。如果常量池中已存在 \"i\"，则直接返回地址。 String str new String(\"i\") 会创建一个新的 String 对象并分配到堆中，即使内容相同，仍会创建新的对象。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/java/基础/String str=i 与 String str=new String(i) 一样吗？.md"
---
::: v-pre

# String str=i 与 String str=new String(i) 一样吗？

> 本节目标：理解“String str=i 与 String str=new String(i) 一样吗？”的核心思路，并能把它用于实际开发或面试表达。
- String str="i" 会将字符串分配到常量池中。如果常量池中已存在 "i"，则直接返回地址。
- String str=new String("i") 会创建一个新的 String 对象并分配到堆中，即使内容相同，仍会创建新的对象。

:::
