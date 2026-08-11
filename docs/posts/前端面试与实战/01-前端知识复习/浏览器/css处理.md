---
title: "css处理"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "前端知识复习"
description: "浏览器在下载和处理 CSS 文件时，不会停止 HTML 的解析过程，但会停止 HTML 的渲染过程。这里详细解释一下这个过程： 浏览器下载 CSS 文件时的行为 1. 开始解析 HTML ： 浏览器从上到下解析 HTML 文件，遇到 \\<link\\ 标签时，会发现外部 CSS 文。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/复习大纲/浏览器/css处理.md"
---
::: v-pre

# css处理

> 本节目标：理解“css处理”的核心思路，并能把它用于实际开发或面试表达。
浏览器在下载和处理 CSS 文件时，不会停止 HTML 的解析过程，但会停止 HTML 的渲染过程。这里详细解释一下这个过程：

### 浏览器下载 CSS 文件时的行为

1. **开始解析 HTML**：
- 浏览器从上到下解析 HTML 文件，遇到 `\<link\>` 标签时，会发现外部 CSS 文件。

2. **下载 CSS 文件**：
- 浏览器开始异步下载 CSS 文件，不会阻塞 HTML 的解析过程。

3. **继续解析 HTML**：
- 浏览器继续解析 HTML 文件，构建 DOM 树。

4. **等待 CSSOM 完成**：
- 尽管 HTML 的解析没有被阻塞，但浏览器在构建 CSSOM 树（CSS 对象模型）时，渲染进程会等待 CSS 文件下载和解析完成。浏览器需要确保 CSSOM 树和 DOM 树都构建完成后，才能进行下一步的布局和绘制。这是因为 CSS 样式可能会影响页面的布局。

详细示例流程
以下是一个详细的示例流程，展示浏览器如何处理 CSS 文件的下载和 HTML 解析：
1. HTML 文件示例
\<!DOCTYPE html\>
\<html\>
\<head\>
\<title\>Example\</title\>
\<link rel="stylesheet" type="text/css" href="styles.css"\>
\</head\>
\<body\>
\<h1\>Hello, World!\</h1\>
\<p\>This is a paragraph.\</p\>
\</body\>
\</html\>

2. 解析过程
1. **解析 HTML**：
- 浏览器开始解析 HTML 文件，遇到 `\<link\>` 标签时，发现需要下载 `styles.css` 文件。

2. **下载 CSS 文件**：
- 浏览器异步下载 `styles.css` 文件。

3. **继续解析 HTML**：
- 浏览器继续解析 HTML 文件，构建 DOM 树。

4. **等待 CSSOM 完成**：
- 浏览器等待 CSS 文件下载完成并解析成 CSSOM 树。此时浏览器会暂停渲染，但继续解析 HTML 文件。

5. **构建 CSSOM 树**：
- CSS 文件下载并解析完成后，浏览器构建 CSSOM 树。

6. **合并 DOM 和 CSSOM**：
- 浏览器将 DOM 树和 CSSOM 树结合，生成渲染树。

7. **布局和绘制**：
- 浏览器进行布局（计算每个元素的位置和大小）并绘制（将元素绘制到屏幕上）。

影响页面渲染的因素
- **CSS 文件的下载和解析**：CSS 文件的下载和解析会影响页面的首次渲染时间，因为浏览器需要等待 CSSOM 树完成构建。
- **JavaScript 的执行**：如果 HTML 文件中包含 JavaScript，并且在 `\<head\>` 部分引入的 JavaScript 没有使用 `async` 或 `defer` 属性，浏览器会暂停 HTML 的解析，直到 JavaScript 执行完成。这会影响页面的渲染时间。[async、defer、DomContentLoaded、onLoad](async%E5%92%8Cdefer)

性能优化建议
1. **将 CSS 放在 `\<head\>`**：确保 CSS 文件在 HTML 文件的 `\<head\>` 部分引用，这样可以尽早开始下载和解析 CSS 文件。
2. **减少 CSS 文件的大小**：尽量精简 CSS 文件，减少不必要的样式定义。
3. **使用异步加载 JavaScript**：在引入 JavaScript 文件时，使用 `async` 或 `defer` 属性，确保 JavaScript 文件不会阻塞 HTML 的解析。
\<script src="script.js" async\>\</script\>
\<!-- 或者 --\>
\<script src="script.js" defer\>\</script\>

:::
