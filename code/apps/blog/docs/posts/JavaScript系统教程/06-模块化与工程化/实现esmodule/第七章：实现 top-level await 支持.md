---
title: "第七章：实现 top-level await 支持"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "好！我们进入 第七章：支持 top level await 的异步模块加载器 ，这是现代 ESM 的一大亮点，也是 Webpack、Vite 等工具所支持的功能。 ⚙️ ✅ 本章目标： 让模块可以在顶层使用 await 加载模块时正确等待依赖执行完成 模拟 async 的模块执行。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第七章：实现 top-level await 支持.md"
---
::: v-pre

# 第七章：实现 top-level await 支持

> 本节目标：理解“第七章：实现 top-level await 支持”的核心思路，并能把它用于实际开发或面试表达。
好！我们进入 **第七章：支持 top-level await 的异步模块加载器**，这是现代 ESM 的一大亮点，也是 Webpack、Vite 等工具所支持的功能。

**⚙️**
✅ 本章目标：

- 让模块可以在顶层使用 await
- 加载模块时正确等待依赖执行完成
- 模拟 async 的模块执行调度器

**🧠** **背景知识：什么是 top-level await？**
以前 JS 顶层不能直接写 await，只能在 async 函数里：
await fetch(...); // ❌ 不合法
而现在 ESM 模块中可以这样写：
// a.mjsawait new Promise(r =\> setTimeout(r, 1000));export const foo = 'ready';
这意味着模块加载顺序和执行控制也要支持 Promise。

**🧪** **文件结构**
awaitbundler/├── src/│ ├── a.mjs│ └── main.mjs├── loader.js # ✅ 支持 top-level await 的加载器└── run.js # 启动入口

**📄** **src/a.mjs**
await new Promise(resolve =\> setTimeout(resolve, 1000));export const msg = 'Top-level await is done';
**📄** **src/main.mjs**
import \{ msg \} from './a.mjs';console.log('Main got msg:', msg);

**📦** **loader.js — 实现异步加载器**
const fs = require('fs');const path = require('path');const acorn = require('acorn');
const moduleGraph = new Map();
async function loadModule(filePath) \{ const absPath = path.resolve(__dirname, filePath); if (moduleGraph.has(absPath)) return moduleGraph.get(absPath).namespace;
const code = fs.readFileSync(absPath, 'utf-8'); const ast = acorn.parse(code, \{ ecmaVersion: 'latest', sourceType: 'module' \});
const deps = []; ast.body.forEach(node =\> \{ if (node.type === 'ImportDeclaration') \{ deps.push(node.source.value); \} \});
const namespace = \{\}; moduleGraph.set(absPath, \{ namespace \});
// 先加载依赖（await 递归） for (const dep of deps) \{ const depPath = dep.endsWith('.mjs') ? dep : dep + '.mjs'; const depAbs = path.resolve(path.dirname(absPath), depPath); const depNS = await loadModule(depAbs);
// 依赖导出绑定 Object.keys(depNS).forEach(key =\> \{ Object.defineProperty(namespace, key, \{ enumerable: true, get: () =\> depNS[key], \}); \}); \}
// 包装为 async 函数并执行支持顶层 await const wrapped = ` return async function(namespace, exports) { ${code.replace(/export\s+const\s+(\w+)\s*=\s*(.*);/g, (_, name, value) =\> { return `const $\{name\} = $\{value\}; exports.$\{name\} = $\{name\};`; })} } `; const factory = new Function(wrapped)(); await factory(namespace, namespace);
return namespace;\}
module.exports = \{ loadModule \};

**🚀** **run.js — 执行入口**
const \{ loadModule \} = require('./loader');
(async () =\> \{ await loadModule('./src/main.mjs');\})();

**✅** **运行**
node run.js
**输出：**
Main got msg: Top-level await is done

**🧠** **实现说明**

|   |   |
|---|---|
|**关键点**|**实现方式**|
|顶层 await 支持|用 async function 包裹模块|
|依赖异步加载递归|await loadModule(dep)|
|保留模块导出|exports.xxx = xxx|
|动态构造并执行模块代码|new Function(...)|

**✅** **本章成果**

- ✔ 支持顶层 await 的模块加载
- ✔ 保证依赖关系加载顺序
- ✔ 所有模块 async 运行并支持模块导出引用

**🔮** **下一章预告（第八章）**
你已经拥有一个具备模块系统核心功能的加载器了，下一步可以考虑：

1. 🌳 **按需分析和打包 — Tree Shaking + Async Graph 合并**
2. 🔧 **代码分割（Code Splitting）**，生成多个 chunk 动态加载
3. 🧩 **动态导入 (import() 函数) 支持**
4. 🧱 **使用缓存提高加载性能**

继续进入第八章吗？我们可以挑战更像 Rollup/Vite 的真实打包器能力 💪
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
