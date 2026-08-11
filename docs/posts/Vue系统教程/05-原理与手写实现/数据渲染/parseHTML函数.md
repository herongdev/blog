---
title: "parseHTML函数"
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
description: "可以不停地截取模板，直到把模板全部解析完成。 做一个while循环， 看一下是不是标签或是文本； 如果是标签，我们把标签名和属性解析出来； 在匹配属性时，要进行判断 ： 1，要有属性 2，不能为开始标签的结束标签 即下面这个判断 如果是文本。"
sidebarWeight: 74
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/数据渲染/parseHTML函数.md"
---
::: v-pre

# parseHTML函数

> 本节目标：理解“parseHTML函数”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
可以不停地截取模板，直到把模板全部解析完成。

做一个while循环，
看一下是不是标签或是文本；

如果是标签，我们把标签名和属性解析出来；
在匹配属性时，要进行判断 ：
1，要有属性
2，不能为开始标签的结束标签
即下面这个判断

如果是文本，

:::
