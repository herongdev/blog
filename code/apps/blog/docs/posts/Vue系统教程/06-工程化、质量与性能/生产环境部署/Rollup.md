---
title: "Rollup"
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
description: "使用 ：。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/工具/生产环境部署/Rollup.md"
---
::: v-pre

# Rollup

> 本节目标：理解“Rollup”的核心思路，并能把它用于实际开发或面试表达。
使用

```
 @rollup/plugin-replace
```

：

```
const replace = require('@rollup/plugin-replace')rollup({  // ...  plugins: [    replace({      'process.env.NODE_ENV': JSON.stringify( 'production' )    })  ]}).then(...)
```

:::
