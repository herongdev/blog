---
title: "UMD（Universal Module Definition）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "一、模块化基础概念 1.1 什么是模块化？ 模块化是一种编程方式，将程序划分成独立的部分（模块），每个模块负责特定的功能。通过模块化，代码可以更易于维护、复用和测试。模块化帮助开发者将复杂的应用拆解为更小、更可控的单元。 1.2 模块化的好处 代码复用：开发者可以将模块化的代码复。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Umd/UMD（Universal Module Definition）.md"
---
::: v-pre

# UMD（Universal Module Definition）

> 本节目标：理解“UMD（Universal Module Definition）”的核心思路，并能把它用于实际开发或面试表达。
一、模块化基础概念
1.1 什么是模块化？
模块化是一种编程方式，将程序划分成独立的部分（模块），每个模块负责特定的功能。通过模块化，代码可以更易于维护、复用和测试。模块化帮助开发者将复杂的应用拆解为更小、更可控的单元。

1.2 模块化的好处
- 代码复用：开发者可以将模块化的代码复用在不同项目中。
- 代码维护：模块化使得代码逻辑更清晰，更容易维护。
- 避免全局污染：模块化可以封装变量和函数，避免全局命名空间污染。

二、JavaScript 中的模块化
JavaScript 在很长一段时间内是没有原生模块系统的，主要是为了处理浏览器中的简单脚本。然而，随着应用的复杂性增加，开发者逐渐引入了模块化的概念和工具。

2.1 常见的模块化方案

- 全局对象模式：最早期的 JavaScript 模块是直接把功能暴露在全局对象中。
- IIFE（立即调用函数表达式）：通过函数立即执行来隔离作用域。
- CommonJS：Node.js 的模块规范，使用 `require()` 和 `module.exports`，适合服务端。
- AMD（Asynchronous Module Definition）：浏览器环境下的模块化规范，如 RequireJS 使用的标准，支持异步加载。
- ES6 模块（ESM）：JavaScript 的官方模块系统，使用 `import` 和 `export`，现在被广泛支持。

2.2 不同模块化方案的局限
- CommonJS：同步加载，不适合浏览器中异步加载的场景。
- AMD：浏览器友好，但在服务端环境（如 Node.js）使用时并不合适。
- ESM：虽然现代浏览器和 Node.js 都支持，但在旧版环境中可能不支持。

三、UMD 的引入
3.1 什么是 UMD？
UMD（Universal Module Definition）是一种为了解决跨平台兼容性的问题而引入的模块定义方式。它旨在让一个模块可以适应不同的 JavaScript 环境，从而实现模块的最大复用性。
3.2 为什么需要 UMD？
UMD 模块可以：
- 在浏览器中运行。
- 在 Node.js 中运行。
- 使用 AMD 加载器（如 RequireJS）加载。
UMD 提供了一种通用的解决方案，使模块可以在不同的模块化系统（AMD、CommonJS、浏览器）中都能正常工作。

四、UMD 的实现原理
4.1 典型的 UMD 模板
一个标准的 UMD 模块通常长这样：
(function (root, factory) \{
if (typeof define === "function" && define.amd) \{
// AMD 模块环境，如 RequireJS
define(factory);
\} else if (typeof module === "object" && module.exports) \{
// CommonJS 模块环境，如 Node.js
module.exports = factory();
\} else \{
// 浏览器环境，全局变量
root.MyModule = factory();
\}
\})(typeof self !== "undefined" ? self : this, function () \{
// 模块内容
var MyModule = \{
greet: function () \{
console.log("Hello, UMD!");
\}
\};
return MyModule;
\});

4.2 逐行解释
1. 立即调用函数表达式（IIFE）：
(function (root, factory) \{ ... \})(typeof self !== "undefined" ? self : this, function () \{ ... \});
- IIFE 是一种函数立即执行的方式，它在定义后立即调用，用于创建模块的隔离作用域，避免污染全局。
- `root`：表示全局对象，在浏览器中是 `window`，在 Node.js 中是 `global`，在 Web Worker 中是 `self`。
- `factory`：是一个工厂函数，用于生成模块的内容。

2. AMD 环境检测：
if (typeof define === "function" && define.amd) \{
define(factory);
\}
- 检查环境中是否存在 `define` 函数，并且 `define.amd` 存在。如果是这样，说明是 AMD 环境（如 RequireJS），调用 `define()` 来定义模块。

3. CommonJS 环境检测：
else if (typeof module === "object" && module.exports) \{
module.exports = factory();
\}
- 检查是否存在 `module.exports`，这通常表示是在 CommonJS 环境中（如 Node.js）。如果是这样，使用 `module.exports` 导出模块。

4. 全局变量定义：
else \{
root.MyModule = factory();
\}
- 如果不是 AMD 或 CommonJS 环境，那么就是浏览器环境。在全局对象（通常是 `window`）上创建一个 `MyModule` 变量，使其可以全局访问。

4.3 工厂函数 `factory()`
- 工厂函数负责模块内容的定义和返回。
- 在上面的例子中，`factory()` 函数定义了一个简单的模块 `MyModule`，并返回它。

五、UMD 示例及其使用场景
5.1 示例：创建一个简单的 UMD 模块
下面我们创建一个计算工具库，可以在各种环境中使用：
(function (root, factory) \{
if (typeof define === "function" && define.amd) \{
define(factory);
\} else if (typeof module === "object" && module.exports) \{
module.exports = factory();
\} else \{
root.Calculator = factory();
\}
\})(typeof self !== "undefined" ? self : this, function () \{
// 模块内容
return \{
add: function (a, b) \{
return a + b;
\},
subtract: function (a, b) \{
return a - b;
\},
\};
\});

5.2 在不同环境中使用
1. 浏览器环境：
\<script src="calculator.js"\>\</script\>
\<script\>
console.log(Calculator.add(5, 3)); // 输出：8
\</script\>

2. Node.js 环境：
const Calculator = require('./calculator');
console.log(Calculator.add(5, 3)); // 输出：8

3. RequireJS（AMD 环境）：
require(['calculator'], function(Calculator) \{
console.log(Calculator.add(5, 3)); // 输出：8
\});

六、总结
UMD 是一种通用的模块定义模式，用于实现一个模块在多种 JavaScript 环境中的兼容性。它的主要优势在于：
- 兼容 AMD、CommonJS、全局变量三种模块系统。
- 使得模块具有跨平台的能力，开发者可以在浏览器、Node.js 环境下以及其他模块化环境下复用同一个代码库。

UMD 的特点
1. 兼容性强：UMD 可以在多种模块系统中使用，确保模块具有最大的复用性。
2. 立即执行函数表达式（IIFE）：UMD 使用 IIFE 封装模块，避免全局污染。
3. 简单易用：虽然实现原理复杂，但一旦实现好一个 UMD 模板，开发者可以轻松复用这一模板，提升开发效率。

UMD 是在现代 JavaScript 开发中非常有用的工具，特别是在需要兼容多个 JavaScript 环境的情况下，如希望代码在浏览器、Node.js、以及一些旧的模块加载器中都可以复用的场景。希望这个教程能帮助你理解 UMD 模块的设计理念和实现细节。

:::
