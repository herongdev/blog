---
title: "umd标准格式"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "(function (root, factory) \\{ if (typeof define 'function' && define.amd) \\{ // AMD. Register as an anonymous module. define([], factory); \\}。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Umd/umd标准格式.md"
---
::: v-pre

# umd标准格式

> 本节目标：理解“umd标准格式”的核心思路，并能把它用于实际开发或面试表达。
(function (root, factory) \{
if (typeof define === 'function' && define.amd) \{
// AMD. Register as an anonymous module.
define([], factory);
\} else if (typeof module === 'object' && module.exports) \{
// Node. Does not work with strict CommonJS, but
// only CommonJS-like environments that support module.exports,
// like Node.
module.exports = factory();
\} else \{
// Browser globals (root is window)
root.myModule = factory();
\}
\}(typeof self !== 'undefined' ? self : this, function () \{
// Module logic here
var myModule = \{
hello: function() \{
return "Hello World!";
\}
\};
return myModule;
\}));

该代码段的结构是这样的：
- 首先定义了一个自执行的匿名函数，这个函数接受两个参数：`root` 和 `factory`。
- 函数体内部首先检查是否存在 `module.exports`（CommonJS 环境，如 Node.js）或 `define.amd`（AMD 环境，如 RequireJS）。
- 根据环境的不同，它会以不同的方式导出模块。

下面是一个简化的 UMD 模块示例，用于演示这种格式的基本结构。假设我们有一个模块，它导出一个对象，该对象有一个 `hello` 方法：

这个示例代码定义了一个 UMD 模块，该模块在不同的环境下（如 AMD, CommonJS, 或者全局变量）都可以使用。在浏览器中，模块将作为全局变量 `myModule` 可用。在 Node.js 环境中，它可以通过 `require` 引入。在 AMD 环境中，它可以通过 `define` 引入。

您可以将这段代码保存为一个 JavaScript 文件，然后根据您的环境进行测试。在浏览器中，您可以直接通过 `\<script\>` 标签引入它，并使用 `myModule.hello()` 来调用它的方法。在 Node.js 或 AMD 环境中，您可以使用相应的模块引入方式。

:::
