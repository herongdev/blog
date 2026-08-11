---
title: "vue-router 路由模式有几种？"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/vue-router 路由模式有几种？.md"
---
::: v-pre

# vue-router 路由模式有几种？

> 本节目标：理解“vue-router 路由模式有几种？”的核心思路，并能把它用于实际开发或面试表达。
```
vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：
switch (mode) {
    case 'history':
        this.history = new HTML5History(this, options.base)
        break
    case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
    case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
    default:
        if (process.env.NODE_ENV !== 'production') {
            assert(false, `invalid mode: ${mode}`)
        }
}
```

```
其中，3 种路由模式的说明如下：
```

```
hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
```

```
history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
```

abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

:::
