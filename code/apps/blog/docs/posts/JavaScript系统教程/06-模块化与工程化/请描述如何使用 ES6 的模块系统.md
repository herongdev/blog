---
title: "请描述如何使用 ES6 的模块系统"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "使用 ES6 的模块系统可以让开发者更方便地组织和管理 JavaScript 代码，支持模块化开发，从而提高代码的可维护性和可读性。以下是关于如何使用 ES6 模块系统的详细说明。 基本语法 ES6 模块系统引入了两个新的关键字： export 和 import 。 1. 导出模。"
sidebarWeight: 54
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/请描述如何使用 ES6 的模块系统.md"
---
::: v-pre

# 请描述如何使用 ES6 的模块系统

> 本节目标：理解“请描述如何使用 ES6 的模块系统”的核心思路，并能把它用于实际开发或面试表达。
使用 ES6 的模块系统可以让开发者更方便地组织和管理 JavaScript 代码，支持模块化开发，从而提高代码的可维护性和可读性。以下是关于如何使用 ES6 模块系统的详细说明。

### 基本语法
ES6 模块系统引入了两个新的关键字：`export` 和 `import`。

#### 1. 导出模块（Export）
模块中的任何变量、函数或类都可以通过 `export` 关键字导出。

**命名导出（Named Export）**：
命名导出允许在一个模块中导出多个值。
// math.js
export const pi = 3.14159;
export function add(x, y) \{
return x + y;
\}

**默认导出（Default Export）**：
默认导出是指一个模块中只能有一个默认导出。
// math.js
const pi = 3.14159;
export default pi;

#### 2. 导入模块（Import）
通过 `import` 关键字可以引入其他模块导出的变量、函数或类。

**导入命名导出**：
// main.js
import \{ pi, add \} from './math.js';
console.log(pi); // 3.14159
console.log(add(2, 3)); // 5

**导入默认导出**：
// main.js
import pi from './math.js';
console.log(pi); // 3.14159

**导入所有导出**：
可以使用 `* as` 语法将模块中的所有导出导入为一个命名空间对象。
// main.js
import * as math from './math.js';
console.log(math.pi); // 3.14159
console.log(math.add(2, 3)); // 5

### 使用 ES6 模块的实际场景
#### 1. 在浏览器中使用模块
现代浏览器已经原生支持 ES6 模块，只需要在 HTML 文件中使用 `type="module"`。
\<!DOCTYPE html\>
\<html lang="en"\>
\<head\>
\<meta charset="UTF-8"\>
\<title\>ES6 Modules\</title\>
\<script type="module" src="main.js"\>\</script\>
\</head\>
\<body\>
\</body\>
\</html\>

#### 2. 在 Node.js 中使用模块
Node.js 从 v12.17.0 开始支持 ES6 模块，需要将文件扩展名设置为 `.mjs`，或者在 `package.json` 中添加 `"type": "module"`。
// package.json
\{
"type": "module"
\}

然后可以使用标准的 ES6 模块语法。
// math.mjs
export const pi = 3.14159;
export function add(x, y) \{
return x + y;
\}
// main.mjs
import \{ pi, add \} from './math.mjs';
console.log(pi); // 3.14159
console.log(add(2, 3)); // 5

:::
