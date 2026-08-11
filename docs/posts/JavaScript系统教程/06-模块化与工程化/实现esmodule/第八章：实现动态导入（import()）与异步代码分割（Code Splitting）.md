---
title: "第八章：实现动态导入（import()）与异步代码分割（Code Splitting）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "太棒了，我们正式进入： 🧩 ✅ 本章目标： 支持在模块中写 const mod await import('./a.mjs') 动态加载依赖模块而非一开始全部打包 实现 基础的代码分割 ：只加载需要的模块 💡 背景：动态导入是啥？ // ✅ 动态导入，不会在程序启动时立刻加载co。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第八章：实现动态导入（import()）与异步代码分割（Code Splitting）.md"
---
::: v-pre

# 第八章：实现动态导入（import()）与异步代码分割（Code Splitting）

> 本节目标：理解“第八章：实现动态导入（import()）与异步代码分割（Code Splitting）”的核心思路，并能把它用于实际开发或面试表达。
太棒了，我们正式进入：

**🧩**
✅ 本章目标：

- 支持在模块中写 const mod = await import('./a.mjs')
- 动态加载依赖模块而非一开始全部打包
- 实现**基础的代码分割**：只加载需要的模块

**💡** **背景：动态导入是啥？**
// ✅ 动态导入，不会在程序启动时立刻加载const mod = await import('./a.mjs');console.log(mod.foo);
相比静态 import ... from ...，动态导入允许你 **按需懒加载模块**，并触发**异步加载流程**，适用于：

- 路由懒加载
- 功能分块（组件、插件）
- 异步初始化流程（如编辑器或图表库）

**🧱** **项目结构**
dynaloader/├── src/│ ├── main.mjs│ └── feature.mjs├── loader.js # 支持 import() 的 loader└── run.js # 启动入口

**✍️** **src/feature.mjs**
export const heavy = 'This is a heavy feature loaded lazily';
**✍️** **src/main.mjs**
console.log('Main loaded');
const mod = await import('./feature.mjs');console.log('Dynamically imported:', mod.heavy);

**🔧** **loader.js — 实现 import() 运行时动态加载**
const fs = require('fs');const path = require('path');const acorn = require('acorn');
const moduleCache = new Map();
async function loadModule(filePath) \{ const absPath = path.resolve(__dirname, filePath); if (moduleCache.has(absPath)) return moduleCache.get(absPath);
const code = fs.readFileSync(absPath, 'utf-8');
// 构造 async 函数支持 import() const wrapped = ` return async function(dynamicImport, exports) { ${code // 转换 export const foo = ... → exports.foo = ... .replace(/export\s+const\s+(\w+)\s*=\s*(.*);/g, (_, name, val) =\> { return `const $\{name\} = $\{val\}; exports.$\{name\} = $\{name\};`; }) // 替换 import() 为 dynamicImport() 调用 .replace(/import\((['"].+?['"])\)/g, (_, path) =\> { return `await dynamicImport($\{path\})`; })} } `;
const exports = \{\}; const factory = new Function(wrapped)(); const dynamicImport = async (targetPath) =\> \{ const fullPath = path.resolve(path.dirname(absPath), targetPath.slice(1, -1) + '.mjs'); return await loadModule(fullPath); \};
await factory(dynamicImport, exports);
moduleCache.set(absPath, exports); return exports;\}
module.exports = \{ loadModule \};

**🚀** **run.js — 执行入口**
const \{ loadModule \} = require('./loader');
(async () =\> \{ await loadModule('./src/main.mjs');\})();

**✅** **运行并观察结果**
node run.js
输出应该为：
Main loadedDynamically imported: This is a heavy feature loaded lazily

**🔍** **本章实现要点**

|   |   |
|---|---|
|**功能点**|**实现方式**|
|动态导入 import()|替换为 await dynamicImport(...) 并绑定加载器|
|支持模块导出|exports.xxx = xxx|
|模块缓存|使用 Map 防止重复加载|
|懒加载模块|动态执行才加载对应代码|
|模拟 code splitting|各模块分别存在于 .mjs 文件|

**✅** **本章成果**

- ✔ 模拟了动态导入 import()
- ✔ 懒加载模块，提升加载性能
- ✔ 模拟代码分割（每个模块一个 chunk）

**🔮** **下一章预告（第九章）**
我们现在已经有了：

- 静态 import/export 分析
- 模块依赖图构建
- Tree Shaking
- top-level await
- 动态导入（import）
- 模块缓存

接下来我们可以尝试：
**第九章：模拟一个真实的 Rollup/Vite 打包器接口（CLI）和输出 bundle 文件 + map**
你是否想继续？我会在第九章中整合前面内容，让你拥有一个基础但完整的打包工具 🎁
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
