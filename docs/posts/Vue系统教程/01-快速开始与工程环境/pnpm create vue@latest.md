---
title: "pnpm create vue@latest"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "这一指令将会安装并执行 create vue，它是 Vue 官方的项目脚手架工具。 然后在交互命令中启用相应功能； √ Project name: ... organization √ Add TypeScript? ... No / Yes √ Add JSX Support?。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/创建项目/pnpm create vue@latest.md"
---
::: v-pre

# pnpm create vue@latest

> 本节目标：理解“pnpm create vue@latest”的核心思路，并能把它用于实际开发或面试表达。
```
执行行命令
pnpm create vue@latest
```

这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。
然后在交互命令中启用相应功能；
√ Project name: ... organization
√ Add TypeScript? ... No / Yes
√ Add JSX Support? ... No / Yes
√ Add Vue Router for Single Page Application development? ... No / Yes
√ Add Pinia for state management? ... No / Yes
√ Add Vitest for Unit Testing? ... No / Yes
√ Add Cypress for End-to-End testing? ... No / Yes
√ Add ESLint for code quality? ... No / Yes
√ Add Prettier for code formatting? ... No / Yes

如果不确定是否要开启某个功能，你可以直接按下回车键选择 No。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：
\> cd \<your-project-name\>
\> npm install
\> npm run dev

你现在应该已经运行起来了你的第一个 Vue 项目！请注意，生成的项目中的示例组件是使用[组合式](https://cn.vuejs.org/guide/introduction.html#composition-api) API 和 \<script setup\> 编写的，而非[选项式](https://cn.vuejs.org/guide/introduction.html#options-api) API。下面是一些补充提示：

```
推荐的 IDE 配置是 [Visual Studio Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展。如果使用其他编辑器，参考 [IDE](https://cn.vuejs.org/guide/scaling-up/tooling.html#ide-support) 支持章节。
```

更多工具细节，包括与后端框架的整合，我们会在[工具链指南](https://cn.vuejs.org/guide/scaling-up/tooling.html)进行讨论。

```
要了解构建工具 Vite 更多背后的细节，请查看 [Vite](https://cn.vitejs.dev/) 文档。
```

```
如果你选择使用 TypeScript，请阅读 [TypeScript](https://cn.vuejs.org/guide/typescript/overview.html) 使用指南。
```

当你准备将应用发布到生产环境时，请运行：
\> npm run build
此命令会在 ./dist 文件夹中为你的应用创建一个生产环境的构建版本。关于将应用上线生产环境的更多内容，请阅读[生产环境部署指南](https://cn.vuejs.org/guide/best-practices/production-deployment.html)。
 \> 来自

```
 <https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application>
```

:::
