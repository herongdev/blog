---
title: "gpt实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "let lastCall 0; const initialHeight (safeAreaHeight 2) / 3; const miniHeight 100; const draggableAreaHeight ref(initialHeight); let startY 0。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/事件难点考点/gpt实现.md"
---
::: v-pre

# gpt实现

> 本节目标：理解“gpt实现”的核心思路，并能把它用于实际开发或面试表达。
let lastCall = 0;
const initialHeight = (safeAreaHeight * 2) / 3;
const miniHeight = 100;
const draggableAreaHeight = ref(initialHeight);
let startY = 0;
const throttle = (func, limit) =\> \{
return (...args) =\> \{
const now = Date.now();
if (now - lastCall \> limit) \{
lastCall = now;
func(...args);
\}
\};
\};
const onTouchStart = (event) =\> \{
startY = event.touches[0].screenY;
initialTouchHeight = draggableAreaHeight.value;
\};
const throttledOnTouchMove = throttle((event) =\> \{
const onTouchMove = (event) =\> \{
const moveY = event.touches[0].screenY;
const distance = moveY - startY;
let newHeight = initialHeight - distance;
newHeight = Math.max(Math.min(newHeight, safeAreaHeight), miniHeight);
draggableAreaHeight.value = newHeight;
\};
\}, 50);

:::
