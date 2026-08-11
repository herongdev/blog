---
title: "patchElement"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "围绕“patchElement”整理的概念、示例与实践笔记。"
sidebarWeight: 34
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/patchElement/patchElement.md"
---
::: v-pre

# patchElement

> 本节目标：理解“patchElement”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="./runtime-dom.global.js"></script>
  <script>
    let { createRenderer, h, render, Text } = VueRuntimeDOM
    render(h('h1', { style: { color: 'red' } }, '1111'), app);
    setTimeout(() => {
      render(h('h1', { style: { color: 'blue', background: 'red' } }, '1111'), app);
    }, 1000)
  </script>
</body>
</html>
```

```
runtime-dom/package.json
{
  "name": "@vue/runtime-dom",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "buildOptions": {
    "name": "VueRuntimeDOM",
    "formats": [
      "cjs",
      "esm-bundler",
      "global"
    ]
  }
}
```

```
runtime-dom/src/index.ts
import { createRenderer } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";
const renderOptions = Object.assign(nodeOps, { patchProp }); export function render(vnode, container) {
  // 在创建渲染器的时候 传入选项
  createRenderer(renderOptions).render(vnode, container)
}
export * from "@vue/runtime-core"
```

```
runtime-core/src/index.ts
export { createRenderer } from './renderer'
export { h } from './h'
export * from './vnode'
```

:::
