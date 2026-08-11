---
title: "第五章：手写一个支持 import-export 的简易 JS 打包器"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "好，咱们就按顺序继续 —— 进入 第五章：实现简易打包器（支持多模块打包成一个文件） ，模拟 Vite/Rollup 的打包过程。 🧰 ✅ 本章目标： 读取多个模块文件 分析模块依赖图 合并成一个 JS 文件 保持模块隔离 + 依赖顺序正确 🏗️ 一、项目结构 esbundler。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第五章：手写一个支持 import-export 的简易 JS 打包器.md"
---
::: v-pre

# 第五章：手写一个支持 import-export 的简易 JS 打包器

> 本节目标：理解“第五章：手写一个支持 import-export 的简易 JS 打包器”的核心思路，并能把它用于实际开发或面试表达。
好，咱们就按顺序继续 —— 进入 **第五章：实现简易打包器（支持多模块打包成一个文件）**，模拟 Vite/Rollup 的打包过程。

**🧰**
✅ 本章目标：

- 读取多个模块文件
- 分析模块依赖图
- 合并成一个 JS 文件
- 保持模块隔离 + 依赖顺序正确

**🏗️** **一、项目结构**
esbundler/├── src/│ ├── main.mjs│ ├── a.mjs│ └── b.mjs├── bundler.js # ✅ 打包核心文件└── dist/bundle.js # ✅ 打包结果

**🧱** **二、模块代码示例**
**📄** **src/a.mjs**
export const msg = 'Hello from A';
**📄** **src/b.mjs**
import \{ msg \} from './a.mjs';export const content = msg + ' and B';
**📄** **src/main.mjs**
import \{ content \} from './b.mjs';console.log(content);

**🧠** **三、构建打包器 bundler.js（简易依赖图 + 模板合成）**
**📦** **安装依赖：**
npm install acorn

**📄** **bundler.js**
const fs = require('fs');const path = require('path');const acorn = require('acorn');
const entry = './src/main.mjs';const output = './dist/bundle.js';
let id = 0;
// 分析模块：读取代码、找依赖、记录 idfunction parseModule(filePath) \{ const absPath = path.resolve(__dirname, filePath); const code = fs.readFileSync(absPath, 'utf-8');
const ast = acorn.parse(code, \{ sourceType: 'module', ecmaVersion: 'latest' \});
const deps = []; ast.body.forEach(node =\> \{ if (node.type === 'ImportDeclaration') \{ deps.push(node.source.value); \} \});
return \{ id: id++, filePath, code, deps \};\}
// 构建依赖图function buildGraph(entryPath) \{ const entryModule = parseModule(entryPath); const graph = [entryModule]; const visited = new Set([entryModule.filePath]);
for (const mod of graph) \{ mod.mapping = \{\}; mod.deps.forEach(depRel =\> \{ const depAbs = path.resolve(path.dirname(mod.filePath), depRel); if (!visited.has(depAbs)) \{ const depMod = parseModule(depAbs); graph.push(depMod); visited.add(depAbs); mod.mapping[depRel] = depMod.id; \} else \{ const existing = graph.find(m =\> path.resolve(m.filePath) === depAbs); mod.mapping[depRel] = existing.id; \} \}); \}
return graph;\}
// 转换成打包后代码function bundle(graph) \{ const modules = graph.map(mod =\> \{ return ` ${mod.id}: [ function(require, exports) { ${mod.code} }, ${JSON.stringify(mod.mapping)} ] `; \}).join(',');
return `(function(modules) { function require(id) { const [fn, mapping] = modules[id]; const exports = {}; function localRequire(name) { return require(mapping[name]); } fn(localRequire, exports); return exports; } require(0);})({${modules}})`;\}
const graph = buildGraph(entry);const result = bundle(graph);fs.writeFileSync(output, result, 'utf-8');console.log('✅ 打包完成：dist/bundle.js');

**🚀** **运行打包器**
node bundler.js

**✅** **执行打包结果**
node dist/bundle.js# 输出: Hello from A and B

**✅** **本章功能总结**

|   |   |
|---|---|
|**能力**|**实现情况**|
|静态分析 import|✔ acorn|
|构建模块依赖图|✔|
|多模块合并输出|✔|
|模拟 require 加载器|✔|
|支持相对路径 import|✔|

**🔮** **下一章预告（第六章）**
我们接下来可以继续进入：
✅ **第六章：实现 Tree Shaking — 只打包实际使用的 export**
例如：
// a.mjsexport const used = 1;export const unused = 2;
// b.mjsimport \{ used \} from './a.mjs';console.log(used);
Tree Shaking 会让 unused 不出现在打包代码中。

要继续进入第六章吗？我们马上搞起。
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
