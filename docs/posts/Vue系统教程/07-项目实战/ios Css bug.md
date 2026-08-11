---
title: "ios Css bug"
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
description: "父容器 scale 样式发生变化时，也应用变形时； 在 ios 中， 如果子容器中一个元素是绝对定位的，并且 top,right,bottom,left 都为 0 ，那么这个子容器的尺寸会跟随父容器一起变化； 但如果子容器中还有一个元素没有绝对定位，没有脱离文档流，那么即使他的尺。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/ios Css bug.md"
---
::: v-pre

# ios Css bug

> 本节目标：理解“ios Css bug”的核心思路，并能把它用于实际开发或面试表达。
父容器`scale`样式发生变化时，也应用变形时；
在`ios`中，
如果子容器中一个元素是绝对定位的，并且`top,right,bottom,left`都为`0`，那么这个子容器的尺寸会跟随父容器一起变化；
但如果子容器中还有一个元素没有绝对定位，没有脱离文档流，那么即使他的尺寸发生了变化，爷容器的`overflow:scroll`样式不会生效；
也就是说不会出现滚动条；

:::
