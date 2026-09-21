---
title: "第十四章：支持多入口打包 + 模块共享分析（MPA - 微前端模式）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "非常棒！欢迎进入本系列最后一个里程碑： 🏁 ✅ 本章目标： 支持多个入口（多个页面 / 子应用） 为每个入口单独打包 自动提取 共享模块 ，生成公共依赖 chunk 模拟 Vite/Webpack 的 SplitChunks 与多入口输出功能 🧱 示例结构 multientryb。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第十四章：支持多入口打包 + 模块共享分析（MPA - 微前端模式）.md"
---
::: v-pre

# 第十四章：支持多入口打包 + 模块共享分析（MPA - 微前端模式）

> 本节目标：理解“第十四章：支持多入口打包 + 模块共享分析（MPA - 微前端模式）”的核心思路，并能把它用于实际开发或面试表达。
非常棒！欢迎进入本系列最后一个里程碑：

**🏁**
✅ 本章目标：

- 支持多个入口（多个页面 / 子应用）
- 为每个入口单独打包
- 自动提取**共享模块**，生成公共依赖 chunk
- 模拟 Vite/Webpack 的 SplitChunks 与多入口输出功能

**🧱** **示例结构**
multientrybundler/├── src/│ ├── admin/│ │ └── index.mjs # 管理后台入口│ ├── user/│ │ └── index.mjs # 用户端入口│ ├── shared/│ │ ├── api.mjs # 所有页面共享模块│ │ └── util.mjs├── bundler.js # 多入口打包器└── dist/ ├── admin.bundle.js ├── user.bundle.js └── shared.bundle.js # ✅ 自动提取共享 chunk

**✅** **示例模块**
**📄** **shared/api.mjs**
export const fetchData = () =\> 'Fetched data';
**📄** **shared/util.mjs**
export const log = msg =\> console.log('[LOG]', msg);
**📄** **admin/index.mjs**
import \{ fetchData \} from '../shared/api.mjs';import \{ log \} from '../shared/util.mjs';
log('Admin:' + fetchData());
**📄** **user/index.mjs**
import \{ fetchData \} from '../shared/api.mjs';console.log('User page fetch:', fetchData());

**✍️** **bundler.js 核心逻辑（多入口 + chunk 拆分）**
**✅** **步骤 1：支持多个 entry**
const entryMap = \{ admin: './src/admin/index.mjs', user: './src/user/index.mjs'\};

**✅** **步骤 2：构建每个入口的模块依赖图（使用 DFS）**
let globalId = 0;const allModules = new Map();
function collectModules(entryPath) \{ const visited = new Set(); const queue = [entryPath]; const result = [];
while (queue.length \> 0) \{ const current = path.resolve(queue.pop()); if (visited.has(current)) continue; visited.add(current);
const raw = fs.readFileSync(current, 'utf-8'); const ast = acorn.parse(raw, \{ sourceType: 'module', ecmaVersion: 'latest' \});
const deps = []; for (const node of ast.body) \{ if (node.type === 'ImportDeclaration') \{ deps.push(node.source.value); \} \}
const mod = \{ id: globalId++, name: current, rawCode: raw, deps: [], dependents: [], \}; result.push(mod); allModules.set(current, mod);
for (const dep of deps) \{ const full = path.resolve(path.dirname(current), dep); mod.deps.push(full); queue.push(full); \} \}
return result;\}

**✅** **步骤 3：分析模块出现次数 → 提取共享模块**
function findSharedModules(modGraphs) \{ const countMap = \{\}; modGraphs.flat().forEach(m =\> \{ countMap[m.name] = (countMap[m.name] || 0) + 1; \});
return Object.entries(countMap) .filter(([_, count]) =\> count \> 1) .map(([name]) =\> name);\}

**✅** **步骤 4：为每个入口输出一个 bundle，同时输出 shared.bundle.js**
function generateChunk(mods, sharedNames, outFile) \{ const used = mods.filter(m =\> !sharedNames.includes(m.name)); const code = used.map(m =\> transform(m)).join('\n'); fs.writeFileSync(`dist/${outFile}`, code, 'utf-8');\}
function generateSharedChunk(sharedNames) \{ const sharedMods = Array.from(allModules.values()).filter(m =\> sharedNames.includes(m.name)); const code = sharedMods.map(m =\> transform(m)).join('\n'); fs.writeFileSync(`dist/shared.bundle.js`, code, 'utf-8');\}
transform(m) 就是我们之前章节中用来将 export 转为 exports.xxx = xxx 的转换器。

**✅** **最后完整执行流程**
const allGraphs = Object.entries(entryMap).map(([name, file]) =\> \{ return \{ name, modules: collectModules(file) \};\});
const sharedNames = findSharedModules(allGraphs.map(g =\> g.modules));generateSharedChunk(sharedNames);
for (const graph of allGraphs) \{ generateChunk(graph.modules, sharedNames, `${graph.name}.bundle.js`);\}
console.log('✅ 多入口打包完成，已拆分 shared.bundle.js');

**✅** **执行结果**
node bundler.js
生成：
dist/├── admin.bundle.js├── user.bundle.js└── shared.bundle.js

**✅** **本章成就**

|   |   |
|---|---|
|**功能**|**实现**|
|多入口打包支持（admin/user）|✔|
|自动构建依赖图|✔|
|分析共享模块并提取 shared chunk|✔|
|输出多个 bundle 文件|✔|
|支持微前端 / 多页面打包|✔|

**🎉** **恭喜！**
你已经手工实现了一个具备以下核心能力的**迷你打包器**：

- ✅ ESM/CJS/JSON 全支持
- ✅ import() 动态导入
- ✅ top-level await
- ✅ Tree Shaking
- ✅ 可视化依赖图（.dot + HTML）
- ✅ 多入口打包与共享模块提取

**🧠** **想进一步？**
以下是可以继续优化的方向：

1. **生成完整 Source Map**
2. **使用 Rollup 插件体系结构实现扩展**
3. **构建成 npm 包 / CLI 工具发布**
4. **加入压缩（如 Terser）支持**
5. **服务端打包 SSR 支持**

如果你对其中某项感兴趣，我们可以继续深挖！你想继续挑战哪个方向？💪
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
