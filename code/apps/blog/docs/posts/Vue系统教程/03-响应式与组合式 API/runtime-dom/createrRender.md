---
title: "createrRender"
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
description: "\\ 来自。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/createrRender.md"
---
::: v-pre

# createrRender

> 本节目标：理解“createrRender”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
这个函数是runtime-core中的方法；
```

```
新建packages/runtime-core目录：
package.json
{
  "name": "@vue/runtime-core",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "buildOptions": {
    "name": "VueRuntimeCORE",
    "formats": [
      "cjs",
      "esm-bundler"
    ]
  }
}
```

```
scr/index.ts
export { createRenderer } from './renderer'
export { h } from './h'
```

```
export * from './vnode'
```

```
**createRenderer**
const { render, createApp } = createRenderer<Node, Element>({
  patchProp,
  ...nodeOps
})
```

```
==参数==
==HostNode== ==和== ==HostElement====。==
```

```
==HostNode==
```

```
==类型：====Node==
```

```
==详细：========宿主环境中的节点。==
```

```
==HostElement==
```

```
==类型：====Element==
```

```
==详细：========宿主环境中的元素。==
```

\> 来自

```
 <https://v3.cn.vuejs.org/api/global-api.html#createrenderer>
```

```
==对于====runtime-dom====，====HostNode== ==将是== ==DOM== ==Node== ==接口，====HostElement== ==将是== ==DOM== ==Element== ==接口。==
```

```
==自定义渲染器可以传入特定于平台的类型，如下所示：==
import { createRenderer } from 'vue'
let renderer = createRenderer({
  createElement(element) {
    // setData()
    return document.createElement(element);
  },
  setElementText(el, text) {
    el.innerHTML = text;
  },
  insert(el, container) {
    container.appendChild(el);
  },
  patchProp(el, key, prevValue, nextValue) {
    console.log(el, key, nextValue)
  }
})
```

:::
