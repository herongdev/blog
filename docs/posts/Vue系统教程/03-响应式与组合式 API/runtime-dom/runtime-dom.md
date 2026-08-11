---
title: "runtime-dom"
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
description: "围绕“runtime-dom”整理的概念、示例与实践笔记。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/runtime-dom.md"
---
::: v-pre

# runtime-dom

> 本节目标：理解“runtime-dom”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
新建包runtime-dom，新建package.json
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
dist/index.html
```

```
<body>
  <div id="app"></div>
  <script src="./runtime-dom.global.js"></script>
  <script>
    let { createRenderer, h } = VueRuntimeDOM
    // 渲染器渲染的是虚拟dom，接受一个配置，其中有patchProp方法
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
    render(
      h('h1', { style: {} }, [
        h('li', { key: 'a' }, 'a'),
        h('li', { key: 'b' }, 'b'),
        h('li', { key: 'c' }, 'c'),
        h('li', { key: 'd' }, 'd'),
        h('li', { key: 'e', style: { color: 'red' } }, 'e'),
        h('li', { key: 'f' }, 'f'),
        h('li', { key: 'g' }, 'g')
      ]
      ), app);
    setTimeout(() => {
      render(
        h('h1', {}, [
          h('li', { key: 'a' }, 'a'),
          h('li', { key: 'b' }, 'b'),
          h('li', { key: 'e' }, 'e'),
          h('li', { key: 'c' }, 'c'),
          h('li', { key: 'd' }, 'd'),
          h('li', { key: 'h' }, 'h'),
          h('li', { key: 'f' }, 'f'),
          h('li', { key: 'g' }, 'g')
        ]
        ), app);
    }, 1000)
  </script>
</body>
```

:::
