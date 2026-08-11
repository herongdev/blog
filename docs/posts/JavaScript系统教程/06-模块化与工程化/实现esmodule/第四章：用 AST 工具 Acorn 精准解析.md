---
title: "第四章：用 AST 工具 Acorn 精准解析"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "好！我们继续进入： 🔥 import/export，构建模块依赖图 🚀 目标： 使用 acorn 来替代正则 准确识别 import 和 export 语句（避免正则误判、漏判） 构建静态模块依赖图，为后续打包、Tree Shaking 做准备 🛠️ 环境准备 npm init。"
sidebarWeight: 52
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第四章：用 AST 工具 Acorn 精准解析.md"
---
::: v-pre

# 第四章：用 AST 工具 Acorn 精准解析

> 本节目标：理解“第四章：用 AST 工具 Acorn 精准解析”的核心思路，并能把它用于实际开发或面试表达。
好！我们继续进入：

**🔥** **import/export，构建模块依赖图**
🚀 **目标：**

- 使用 [acorn](https://github.com/acornjs/acorn) 来替代正则
- 准确识别 import 和 export 语句（避免正则误判、漏判）
- 构建静态模块依赖图，为后续打包、Tree Shaking 做准备

**🛠️** **环境准备**
npm init -ynpm install acorn

**📁** **项目结构**
esloader/├── main.js├── loader.js├── a.mjs├── b.mjs└── parser.js # ✅ 新增：使用 acorn 解析模块依赖

**✍️** **第一步：编写 parser.js**
const acorn = require('acorn');const fs = require('fs');
function parseModule(filePath) \{ const code = fs.readFileSync(filePath, 'utf-8');
// 使用 ECMAScript 模块语法解析 const ast = acorn.parse(code, \{ ecmaVersion: 'latest', sourceType: 'module' \});
const imports = []; const exports = [];
for (const node of ast.body) \{ if (node.type === 'ImportDeclaration') \{ const defaultImport = node.specifiers.find(s =\> s.type === 'ImportDefaultSpecifier'); const namedImports = node.specifiers .filter(s =\> s.type === 'ImportSpecifier') .map(s =\> s.imported.name); imports.push(\{ from: node.source.value, default: defaultImport?.local.name, named: namedImports \}); \}
if (node.type === 'ExportNamedDeclaration') \{ if (node.declaration) \{ exports.push(\{ type: 'named', name: node.declaration.id?.name || '(multiple)' \}); \} \}
if (node.type === 'ExportDefaultDeclaration') \{ exports.push(\{ type: 'default', value: code.slice(node.start + 15, node.end).trim() \}); \} \}
return \{ imports, exports \};\}
module.exports = \{ parseModule \};

**✅** **示例输出（调试用）**
// 调试 parser.jsconst \{ parseModule \} = require('./parser');console.log(parseModule('./a.mjs'));

**🧠** **第二步：更新 loader.js，使用 parser.js**
const fs = require('fs');const path = require('path');const \{ parseModule \} = require('./parser');
const moduleGraph = new Map();
async function loadModule(filePath) \{ const absPath = path.resolve(__dirname, filePath);
if (moduleGraph.has(absPath)) \{ return moduleGraph.get(absPath).namespace; \}
const code = fs.readFileSync(absPath, 'utf-8'); const \{ imports, exports \} = parseModule(absPath);
const namespace = \{\}; moduleGraph.set(absPath, \{ namespace \});
// 加载依赖模块并绑定 import for (const imp of imports) \{ const depPath = imp.from.endsWith('.mjs') ? imp.from : imp.from + '.mjs'; const depNamespace = await loadModule(depPath);
if (imp.default) \{ Object.defineProperty(namespace, imp.default, \{ enumerable: true, get: () =\> depNamespace.default \}); \}
for (const name of imp.named) \{ Object.defineProperty(namespace, name, \{ enumerable: true, get: () =\> depNamespace[name] \}); \} \}
// 替换 export（只处理 named 和 default） let transformedCode = code; for (const exp of exports) \{ if (exp.type === 'named') \{ transformedCode = transformedCode.replace( new RegExp(`export\\s+(const|let|var|function)\\s+${exp.name}`), `namespace.${exp.name} = $1 ${exp.name}` ); \} else if (exp.type === 'default') \{ transformedCode = transformedCode.replace( /export\s+default\s+(.+)/, `namespace.default = $1` ); \} \}
const fn = new Function('namespace', 'exports', transformedCode); fn(namespace, namespace);
return namespace;\}
module.exports = \{ loadModule \};

**✅** **第三步：运行 main.js**
const \{ loadModule \} = require('./loader');
(async () =\> \{ await loadModule('./b.mjs');\})();

**🧾** **输出示例：**
默认导入： I am the default export具名导入： FOO

**🎓** **第四章总结：为什么要引入 AST？**

|   |   |
|---|---|
|**正则方式问题**|**AST方式优势**|
|容易误匹配、难支持复杂语法|精准定位语法结构|
|不支持多行复杂导入|能解析任意复杂结构|
|不适合静态分析（如 Tree Shaking）|可构建完整依赖图|

**🔮** **下一章预告（第五章）**
如果你想继续，我们可以：
**✅** **第五章候选主题：**

1. **实现打包器：把多模块打包成一个 JS 文件**（模拟 Vite/Rollup）
2. 模拟 top-level await 异步模块加载
3. 静态分析并实现 Tree Shaking（只打包被使用的 export）

你希望下一章我们深入哪个方向？选一个我继续写完整教程 📘
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
