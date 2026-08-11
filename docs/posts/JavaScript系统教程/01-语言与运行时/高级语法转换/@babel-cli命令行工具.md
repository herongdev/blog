---
title: "@babel-cli命令行工具"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "围绕“@babel-cli命令行工具”整理的概念、示例与实践笔记。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/高级语法转换/@babel-cli命令行工具.md"
---
::: v-pre

# @babel-cli命令行工具

> 本节目标：理解“@babel-cli命令行工具”的核心思路，并能把它用于实际开发或面试表达。
```
它的安装命令如下。
$ npm install --save-dev @babel/cli
```

```
基本用法如下。
# 转码结果输出到标准输出$ npx babel example.js
# 转码结果写入一个文件# --out-file 或 -o 参数指定输出文件$ npx babel example.js --out-file compiled.js# 或者$ npx babel example.js -o compiled.js
# 整个目录转码# --out-dir 或 -d 参数指定输出目录$ npx babel src --out-dir lib# 或者$ npx babel src -d lib
# -s 参数生成source map文件$ npx babel src -d lib -s
```

:::
