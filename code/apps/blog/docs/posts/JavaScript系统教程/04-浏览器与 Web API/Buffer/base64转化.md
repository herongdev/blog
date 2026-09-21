---
title: "base64转化"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "围绕“base64转化”整理的概念、示例与实践笔记。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Buffer/Buffer/base64转化.md"
---
::: v-pre

# base64转化

> 本节目标：理解“base64转化”的核心思路，并能把它用于实际开发或面试表达。
```
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str) {
    let buf = Buffer.from(str);
    let result = '';
    for (let b of buf) {
        result += b.toString(2);
    }
    return result.match(/(\d{6})/g).map(val => parseInt(val, 2)).map(val => CHARTS[val]).join('');
}
let r = transfer('a');
console.log(r);
```

:::
