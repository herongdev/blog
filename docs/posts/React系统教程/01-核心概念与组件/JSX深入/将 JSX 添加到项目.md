---
title: "将 JSX 添加到项目"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "将 JSX 添加到项目中并不需要诸如打包工具或开发服务器那样复杂的工具。 本质上，添加 JSX 就像添加 CSS 预处理器一样 。 步骤 1 ： 执行 npm init y 步骤 2 ： 执行 npm install babel cli@6 babel preset react。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX深入/将 JSX 添加到项目.md"
---
::: v-pre

# 将 JSX 添加到项目

> 本节目标：理解“将 JSX 添加到项目”的核心思路，并能把它用于实际开发或面试表达。
将 JSX 添加到项目中并不需要诸如打包工具或开发服务器那样复杂的工具。
本质上，添加 JSX **就像添加** **CSS** **预处理器一样**。

**步骤** **1****：** 执行 npm init -y
**步骤** **2****：** 执行 npm install babel-cli@6 babel-preset-react-app@3
安装 JSX 预处理器后，为项目加入了一个生产就绪（production-ready）的 JSX 配置环境。

```
**运行** **JSX** **预处理器**
创建一个名为 src 的文件夹并执行这个终端命令：
npx babel --watch src --out-dir . --presets react-app/prod
```

```
不要等待它运行结束 —— 这个命令启动了一个对 JSX 的自动监听器。
```

:::
