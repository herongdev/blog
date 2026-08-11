---
title: "使用我们的Vue"
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
description: "围绕“使用我们的Vue”整理的概念、示例与实践笔记。"
sidebarWeight: 57
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/使用我们的Vue/使用我们的Vue.md"
---
::: v-pre

# 使用我们的Vue

> 本节目标：理解“使用我们的Vue”的核心思路，并能把它用于实际开发或面试表达。
```
在index.html中加如下以代码，测试我们自己的vue
<body>
    <script src="vue.js"></script>
    <div id="app">{{message}}</div>
<script>
    new Vue({
        el: "#app",
        data: {
            message: 'hello zf'
        }
    })
</script>
</body>
```

:::
