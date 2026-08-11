---
title: "async、defer、DOMContentLoaded、onload"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "async 属性 下载 ：\\<script\\ 标签设置 async 属性后，JavaScript 文件会与 HTML 文档解析并行下载，下载不会阻塞 HTML 文档的解析。 执行 ：下载完成后立即执行，执行时会阻塞 HTML 文档的解析。 执行顺序 ：如果有多个设置 async。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/async、defer、DOMContentLoaded、onload.md"
---
::: v-pre

# async、defer、DOMContentLoaded、onload

> 本节目标：理解“async、defer、DOMContentLoaded、onload”的核心思路，并能把它用于实际开发或面试表达。
**async 属性**

- **下载**：\<script\> 标签设置 async 属性后，JavaScript 文件会与 HTML 文档解析并行下载，下载不会阻塞 HTML 文档的解析。
- **执行**：下载完成后立即执行，执行时会阻塞 HTML 文档的解析。
- **执行顺序**：如果有多个设置 async 属性的 \<script\> 标签，谁先下载完谁先执行，顺序无法保证。
- **DOMContentLoaded 事件**：async 脚本的执行与 DOMContentLoaded 事件的触发无关，HTML 文档解析完毕就会触发 DOMContentLoaded 事件，不管 async 脚本是否下载或执行完毕。
- **onload 事件**：async 脚本下载并执行完毕后才有可能触发 onload 事件。
- 在浏览器解析 HTML 文档完成后，如果存在 defer 属性的 \<script\> 标签，浏览器的行为如下：
    - 完成 HTML 文档的解析：浏览器首先完成整个 HTML 文档的解析，构建完整的 DOM 树。
    - 执行 defer 脚本：在 DOM 树构建完成后，但在触发 DOMContentLoaded 事件之前，浏览器会按顺序执行所有 defer 属性的 \<script\> 标签。此时，文档已经解析完成，但尚未开始渲染。
    - 触发 DOMContentLoaded 事件：所有 defer 脚本执行完毕后，浏览器触发 DOMContentLoaded 事件。
    - 开始渲染页面：触发 DOMContentLoaded 事件后，浏览器完成页面的渲染。

**defer 属性**

- **下载**：\<script\> 标签设置 defer 属性后，JavaScript 文件会与 HTML 文档解析并行下载，下载不会阻塞 HTML 文档的解析。
- **执行**：下载完成后不会立即执行，而是在 HTML 文档解析完成后按顺序执行。
- **执行顺序**：如果有多个设置 defer 属性的 \<script\> 标签，按在文档中出现的顺序执行。
- **DOMContentLoaded 事件**：所有 defer 脚本执行完毕后，才会触发 DOMContentLoaded 事件。
- **onload 事件**：defer 脚本下载并执行完毕后才有可能触发 onload 事件。

**onload 事件**

- **触发时机**：无论是 async 还是 defer 属性的 \<script\> 标签，onload 事件都会在脚本下载并执行完毕后触发。

**如果文件中同时有 async 和 defer 的 \<script\>**

1. 浏览器解析 HTML 文档，遇到 async 和 defer 脚本时开始下载。
2. async 脚本下载完成后立即执行，执行过程中会阻塞 HTML 文档解析，但不会影响 DOMContentLoaded 事件的触发。
3. HTML 文档解析完成后，执行所有 defer 脚本。
4. 所有 defer 脚本执行完毕后，触发 DOMContentLoaded 事件。
5. **所有资源（包括 async 和 defer 脚本、图像、样式表等）加载完毕后**，触发 onload 事件。

:::
