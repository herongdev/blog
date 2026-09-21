---
title: "启用jsx 启用tsx"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "JSX 与工程化"
description: "调整 tsconfig. app. json \\{ \"compilerOptions\": \\{ \"jsx\": \"preserve\" // 👉 关键：告诉 TypeScript 这是 Vue 的 JSX 运行时， // 它会自动把 vue/jsx runtime 的类型（含 JSX。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/jsx,tsx/启用jsx 启用tsx.md"
---
::: v-pre

# 启用jsx 启用tsx

> 本节目标：理解“启用jsx 启用tsx”的核心思路，并能把它用于实际开发或面试表达。
```
安装开发插件：
"@vitejs/plugin-vue-jsx": "^2.0.1",
```

```
配置vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ==vueJsx== from '@vitejs/plugin-vue-jsx'
// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [vue(), ==vueJsx====()==],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

**调整** **tsconfig.****app.****json**\{ "compilerOptions": \{ =="jsx": "preserve"==
// 👉 关键：告诉 TypeScript 这是 Vue 的 JSX 运行时， // 它会自动把 vue/jsx-runtime 的类型（含 JSX.IntrinsicElements）引进来 =="jsxImportSource": "vue"==,
// 👉 若你显式写了 "types": [...]，别忘了把 "vue" 也补进去 "types": ["vite/client", "vue"] \}\}

- 修改后**重启 IDE / ts server**，\<input\> 等标签的
- JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' 报错即可消失。

:::
