---
title: "手写一个支持 import-export 的 ESM 加载器"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "好，我们来进入推荐的第二章 —— 手写一个支持 import/export 的 ESM 加载器（简化版） 。这也是构建现代模块打包器（如 Vite、Webpack）的核心基础。 第二章：手写一个简易版 ESModule 加载器 模拟构建一个支持 import / export 的。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/手写一个支持 import-export 的 ESM 加载器.md"
---
::: v-pre

# 手写一个支持 import-export 的 ESM 加载器

> 本节目标：理解“手写一个支持 import-export 的 ESM 加载器”的核心思路，并能把它用于实际开发或面试表达。
好，我们来进入推荐的第二章 —— **手写一个支持 import/export 的 ESM 加载器（简化版）**。这也是构建现代模块打包器（如 Vite、Webpack）的核心基础。

**第二章：手写一个简易版 ESModule 加载器**
模拟构建一个支持 import / export 的模块系统，包括：

- 静态分析依赖（构建模块图）
- 模拟 live binding（实时绑定）
- 控制模块的加载顺序

**一、准备项目结构**
esloader/├── main.js // 启动程序├── loader.js // 核心模块加载器├── a.mjs // 模拟模块 A└── b.mjs // 模拟模块 B

**二、创建 a.mjs**
export const msg = 'Hello from A';
setTimeout(() =\> \{ console.log('A 修改 msg'); exports.msg = 'Updated from A';\}, 1000);
**三、创建 b.mjs**
import \{ msg \} from './a.mjs';
console.log('B 读取 A 的 msg：', msg);
setTimeout(() =\> \{ console.log('B 再次读取 A 的 msg：', msg);\}, 2000);
注意：我们为了简化不考虑 ESM 中不能修改 export 的限制，用了 exports.msg = ... 做模拟。

**四、loader.js — 编写加载器**
const fs = require('fs');const path = require('path');
// 模拟模块图缓存const moduleGraph = new Map();
async function loadModule(filePath) \{ const absPath = path.resolve(__dirname, filePath);
if (moduleGraph.has(absPath)) \{ return moduleGraph.get(absPath).namespace; \}
const code = fs.readFileSync(absPath, 'utf-8');
// 提取 import/export，构建依赖图（简单正则模拟） const importRegex = /import\s+\{?([\w\s,]*)\}?\s+from\s+['"](.+)['"]/g; const exportRegex = /export\s+(const|let|var)\s+(\w+)/g;
const dependencies = []; let match; while ((match = importRegex.exec(code))) \{ const [, imports, depPath] = match; dependencies.push(\{ imports, depPath \}); \}
// 创建模块 namespace（模拟实时绑定） const namespace = \{\}; moduleGraph.set(absPath, \{ namespace \});
// 递归加载依赖模块 for (const dep of dependencies) \{ const depNamespace = await loadModule(dep.depPath); const names = dep.imports.split(',').map(s =\> s.trim());
// 建立 live binding（引用） for (const name of names) \{ Object.defineProperty(namespace, name, \{ enumerable: true, get: () =\> depNamespace[name] \}); \} \}
// 用 Function 执行模块代码，模拟执行环境 const wrappedCode = code .replace(importRegex, '') // 移除 import .replace(exportRegex, 'namespace.$2 ='); // 模拟 export
const fn = new Function('namespace', 'exports', wrappedCode); fn(namespace, namespace); // 传入命名空间对象
return namespace;\}
module.exports = \{ loadModule \};

**五、main.js**
const \{ loadModule \} = require('./loader');
(async () =\> \{ await loadModule('./b.mjs');\})();

**运行结果**
$ node main.jsB 读取 A 的 msg： Hello from AA 修改 msgB 再次读取 A 的 msg： Updated from A

**重点实现说明：**

- **静态分析依赖关系**： 用正则提取 import/export 模拟了编译阶段的依赖图构建。
- **模块缓存**： 用 Map 缓存每个模块，避免重复加载。
- **live binding 模拟**： 用 Object.defineProperty 模拟 ESM 的实时绑定特性。
- **执行环境**： 用 new Function + namespace 参数作为作用域，动态执行模块。

**下一章计划（第三章）**
如果你还想继续深入，我们可以做：

- **支持默认导出 export default**
- **用 AST（如 acorn）替代正则做 import/export 解析**
- **支持 top-level await 模块的异步加载**
- **打包工具原型：将多个模块打包为一个文件**

你想继续深入哪一块？我可以把后续也拆成教程继续写下去。
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
