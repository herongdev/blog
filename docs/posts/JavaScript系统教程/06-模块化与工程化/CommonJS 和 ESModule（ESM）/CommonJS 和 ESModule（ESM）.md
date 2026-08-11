---
title: "CommonJS 和 ESModule（ESM）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "CommonJS 和 ESModule（ESM） 是两种 JavaScript 模块化标准，常见于 Node.js 和现代浏览器环境。下面是它们的主要区别： 1. 引入方式 CommonJS const fs require('fs'); ESModule import fs f。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/CommonJS 和 ESModule（ESM）/CommonJS 和 ESModule（ESM）.md"
---
::: v-pre

# CommonJS 和 ESModule（ESM）

> 本节目标：理解“CommonJS 和 ESModule（ESM）”的核心思路，并能把它用于实际开发或面试表达。
CommonJS 和 ESModule（ESM） 是两种 JavaScript 模块化标准，常见于 Node.js 和现代浏览器环境。下面是它们的主要区别：

**1. 引入方式**

- **CommonJS******const fs = require('fs');
- **ESModule******import fs from 'fs';

**2. 导出方式**

- **CommonJS******module.exports = \{ a, b \};
- **ESModule******export const a = 1;export default function() \{\}

**3. 加载机制**

- **CommonJS** 是**同步加载**，适用于服务器端。
- **ESModule** 是**异步加载**，适用于浏览器环境，也被 Node.js 支持。

**4. 执行时机**

- **CommonJS** 是**立即执行**，require 是运行时加载。
- **ESModule** 是**静态分析**，import 是编译时加载（提升作用）。

**5. 默认导出差异**

- CommonJS 的 module.exports 是一个对象或函数
- ESM 的 export default 是真正的默认导出

**6. 兼容性**

- CommonJS 是 Node.js 默认模块系统（但新版本已支持 ESM）
- ESM 是浏览器原生支持、Node.js 的新标准模块系统

**7. 文件扩展名**

- CommonJS 通常是 .js
- ESM 通常是 .mjs 或在 package.json 中设置 "type": "module"

**总结对比表：**

|   |   |   |
|---|---|---|
|**特性**|**CommonJS**|**ESModule**|
|语法|require / module.exports|import / export|
|加载方式|同步|异步|
|执行时机|运行时|编译时|
|默认导出|module.exports = xxx|export default xxx|
|使用场景|Node.js（旧）|Node.js（新）和浏览器|

如果你是在 Node.js 项目中开发：

- 默认使用 CommonJS
- 可以通过配置 ESM 来启用 import/export（如设置 "type": "module"）

需要我根据你当前项目类型具体说明使用哪种更合适也可以告诉我。
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
