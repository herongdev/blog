---
title: "第十章：支持 CommonJS 模块打包（与 ESM 混用）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "太好了，我们继续进入： 🔁 ✅ 本章目标： 支持 require() 加载模块 支持 module.exports / exports.xxx 与 ESModule 形式混用 实现 Node 中常见项目的兼容打包能力（如工具库） 🧱 文件结构 cjsbundler/├── src。"
sidebarWeight: 51
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第十章：支持 CommonJS 模块打包（与 ESM 混用）.md"
---
::: v-pre

# 第十章：支持 CommonJS 模块打包（与 ESM 混用）

> 本节目标：理解“第十章：支持 CommonJS 模块打包（与 ESM 混用）”的核心思路，并能把它用于实际开发或面试表达。
太好了，我们继续进入：

**🔁**
✅ 本章目标：

- 支持 require() 加载模块
- 支持 module.exports / exports.xxx
- 与 ESModule 形式混用
- 实现 Node 中常见项目的兼容打包能力（如工具库）

**🧱** **文件结构**
cjsbundler/├── src/│ ├── esm.mjs // 使用 import/export│ ├── cjs.js // 使用 require/module.exports│ └── main.mjs // 混用两种模块├── bundler.js // 打包器支持 require + import└── dist/bundle.js

**📄** **src/cjs.js**
const secret = 'from CJS module';module.exports = \{ secret \};
**📄** **src/esm.mjs**
export const message = 'from ESM module';
**📄** **src/main.mjs**
import \{ message \} from './esm.mjs';const \{ secret \} = require('./cjs.js');
console.log('ESM:', message);console.log('CJS:', secret);

**⚙️** **bundler.js —— 支持 ESM + CJS 混合打包**
我们修改 parseModule() 支持 .js 文件时作为 CommonJS 加载。
**✅** **步骤一：检测模块类型（通过扩展名判断）**
更新 parseModule() 函数：
function parseModule(filePath) \{ const absPath = path.resolve(filePath); if (visited.has(absPath)) return null; visited.add(absPath);
const rawCode = fs.readFileSync(absPath, 'utf-8'); const isESM = filePath.endsWith('.mjs'); const deps = [];
if (isESM) \{ const ast = acorn.parse(rawCode, \{ sourceType: 'module', ecmaVersion: 'latest' \});
for (const node of ast.body) \{ if (node.type === 'ImportDeclaration') \{ deps.push(node.source.value); \} \} \} else \{ const requireRegex = /require\(['"](.+?)['"]\)/g; let match; while ((match = requireRegex.exec(rawCode))) \{ deps.push(match[1]); \} \}
return \{ id: id++, absPath, rawCode, deps, isESM \};\}

**✅** **步骤二：transformCode 添加 CJS 模块处理**
更新 transformCode()：
function transformCode(mod) \{ let code = mod.rawCode;
if (mod.isESM) \{ code = code .replace(/export\s+const\s+(\w+)\s*=\s*(.*);/g, (_, name, value) =\> \{ return `const ${name} = ${value}; exports.${name} = ${name};`; \}) .replace(/import\s+\{[^\}]+\}\s+from\s+['"][^'"]+['"];/g, '') .replace(/import\((['"].+?['"])\)/g, (_, imp) =\> \{ const abs = path.resolve(path.dirname(mod.absPath), imp.slice(1, -1) + '.mjs'); const targetMod = modules.find(m =\> m.absPath === abs); return `await __require(${targetMod?.id})`; \}); \} else \{ code = code .replace(/require\(['"](.+?)['"]\)/g, (_, relPath) =\> \{ const abs = path.resolve(path.dirname(mod.absPath), relPath.endsWith('.js') ? relPath : relPath + '.js'); const target = modules.find(m =\> m.absPath === abs); return `await __require(${target.id})`; \}); \}
return code;\}

**✅** **步骤三：bundle() 保持不变（每个模块还是 async function）**

**🚀** **打包与运行**
node bundler.js src/main.mjs --out dist/bundle.jsnode dist/bundle.js

**✅** **结果**
ESM: from ESM moduleCJS: from CJS module

**✅** **本章成就**

|   |   |
|---|---|
|**能力**|**实现**|
|支持 CommonJS require|✔|
|支持 module.exports / exports|✔|
|混合使用 ESM 与 CJS|✔|
|动态转换路径并绑定模块 ID|✔|
|打包结果兼容多种模块语法|✔|

**🔮** **第十一章预告**
下一步我们可以实现：
**支持 .json 模块加载（兼容 import data from './config.json' 和 require('./data.json')）**
这也是 Web 项目中非常常见的场景，尤其是国际化、配置文件等。
是否继续？我来为你写第十一章 ✅
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
