---
title: "function getBytes(params) {"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "function getBytes(params) \\{ let bytes params.length, i 0; for (; i \\< bytes; i++) if (params.charCodeAt(i) \\ 255) bytes++; return bytes; \\}。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/经典方法/function getBytes(params) {.md"
---
::: v-pre

# function getBytes(params) {

> 本节目标：理解“function getBytes(params) {”的核心思路，并能把它用于实际开发或面试表达。
function getBytes(params) \{
let bytes = params.length,
i = 0;
for (; i \< bytes; i++) if (params.charCodeAt(i) \> 255) bytes++;

return bytes;
\}

:::
