---
title: "在html中使用javascript"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "要让 JavaScript 既能与 HTML 页面共存，又不影响页面在浏览器中的呈现这个问题，最终的决定就是为 Web 增加统一的脚本支持，并被正式纳入 HTML 规范当中： 向 HTML 页面中插入 JavaScript 的主要方法，就是使用 这个元素。 它主要有下列 4 个属。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/在html中使用javascript.md"
---
::: v-pre

# 在html中使用javascript

> 本节目标：理解“在html中使用javascript”的核心思路，并能把它用于实际开发或面试表达。
要让`JavaScript`既能与`HTML`页面共存，又不影响页面在浏览器中的呈现这个问题，最终的决定就是为`Web`增加统一的脚本支持，并被正式纳入`HTML`规范当中：

向`HTML`页面中插入`JavaScript`的主要方法，就是使用

```
<script>
```

这个元素。
它主要有下列`4`个属性：

- `async`：可选。表示应该立即下载脚本，但不应妨碍页面中的其操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。
- `defer`：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
- `src`：可选。表示包含要执行代码的外部文件。
- `type`：可选。可以看成是`language`的替代属性，表示编写代码使用的脚本语言的内容类型（也称为`MIME`类型），其默认值仍`text/javascript`。

:::
