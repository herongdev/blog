---
title: "clientX,offsetX,screenX,pageX"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "6种属性可分为三大类： 1.鼠标指针 相对于屏幕 的坐标：screenX/Y 2.相对于页面且不考虑滚动条是否滚动：clientX/Y,X/Y 3.相对于页面且考虑滚动条：pageX/Y,layerX/Y,offsetX/Y offsetX/Y为鼠标指针相对于当前元素（块级或行内。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/clientX,offsetX,screenX,pageX.md"
---
::: v-pre

# clientX,offsetX,screenX,pageX

> 本节目标：理解“clientX,offsetX,screenX,pageX”的核心思路，并能把它用于实际开发或面试表达。
==6种属性可分为三大类：==
==1.鼠标指针====相对于屏幕====的坐标：screenX/Y==
==2.相对于页面且不考虑滚动条是否滚动：clientX/Y,X/Y==
==3.相对于页面且考虑滚动条：pageX/Y,layerX/Y,offsetX/Y==

offsetX/Y为鼠标指针相对于当前元素（块级或行内块）且**不包含边框**的坐标，行内元素则无效（返回父级的坐标）。

==推荐使用：==
==screenX/Y：鼠标位置相对于屏幕的坐标==
==pageX/Y：相对于文档边缘（包含滚动条距离）==
==clientX/Y：相对于当前页面且不包含滚动条距离==
==offsetX/Y：相对于当前元素（块或行内块），除safari外不包含边框。==
==其他：==
==X/Y：与clientX/Y相同，firefox不支持==
==layerX/Y：除IE外与pageX/Y相同，IE11下与clientX/Y相同。非官方属性。==

:::
