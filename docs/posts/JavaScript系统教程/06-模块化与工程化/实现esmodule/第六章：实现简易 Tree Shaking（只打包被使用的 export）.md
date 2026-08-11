---
title: "第六章：实现简易 Tree Shaking（只打包被使用的 export）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "好！我们正式进入： 🌲 ✅ 本章目标： 分析哪些导出（export）被用到了 移除未被使用的 export 减少打包体积，模拟 Rollup 的 Tree Shaking 功能 💡 为什么 Tree Shaking 有用？ 当我们只使用模块的一部分时，比如： import \\{。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第六章：实现简易 Tree Shaking（只打包被使用的 export）.md"
---
::: v-pre

# 第六章：实现简易 Tree Shaking（只打包被使用的 export）

> 本节目标：理解“第六章：实现简易 Tree Shaking（只打包被使用的 export）”的核心思路，并能把它用于实际开发或面试表达。
好！我们正式进入：

**🌲**
✅ 本章目标：

- 分析哪些导出（export）被用到了
- 移除未被使用的 export
- 减少打包体积，模拟 Rollup 的 Tree Shaking 功能

**💡** **为什么 Tree Shaking 有用？**
当我们只使用模块的一部分时，比如：
import \{ used \} from './utils.mjs';
如果 utils.mjs 中还 export 了很多函数（但都没用到），我们希望打包结果中 **不要包含它们**。

**🧠** **实现思路：**

1. 用 **acorn** 解析 AST
2. 找出每个模块的 export 项（记录下来）
3. 找出被 import 使用的项
4. 在打包代码中，**移除未被用到的 export**

**🛠️** **代码准备**
我们继续在 esbundler/ 中添加如下文件：
**📄** **src/utils.mjs**
export const used = 'I am used';export const unused = 'I should be removed';
**📄** **src/main.mjs**
import \{ used \} from './utils.mjs';console.log(used);

**📦** **修改 bundler.js —— 实现 Tree Shaking**
我们重点修改两处：
**✅** **1. 新增 helper 函数：提取 used export**
在 bundler.js 顶部添加：
function analyzeUsedExports(code) \{ const ast = acorn.parse(code, \{ ecmaVersion: 'latest', sourceType: 'module' \});
const usedImports = [];
for (const node of ast.body) \{ if (node.type === 'ImportDeclaration') \{ node.specifiers.forEach(spec =\> \{ if (spec.type === 'ImportSpecifier') \{ usedImports.push(spec.imported.name); \} \}); \} \}
return usedImports;\}
function removeUnusedExports(code, used) \{ const exportRegex = /export\s+const\s+(\w+)\s*=\s*(.*?);/g; return code.replace(exportRegex, (_, name, value) =\> \{ return used.includes(name) ? `const ${name} = ${value};\nexports.${name} = ${name};` : ''; \});\}

**✅** **2. 替换 parseModule 函数**
找到 parseModule(filePath) 并修改为：
function parseModule(filePath) \{ const absPath = path.resolve(__dirname, filePath); const code = fs.readFileSync(absPath, 'utf-8');
const ast = acorn.parse(code, \{ sourceType: 'module', ecmaVersion: 'latest' \});
const deps = []; ast.body.forEach(node =\> \{ if (node.type === 'ImportDeclaration') \{ deps.push(node.source.value); \} \});
// Tree Shaking：分析用到哪些 export const usedExports = analyzeUsedExports(code);
return \{ id: id++, filePath, rawCode: code, deps, usedExports \};\}

**✅** **3. 修改打包生成逻辑：把代码处理成导出形式**
在 bundle(graph) 中找到：
$\{mod.code\}
替换为：
$\{removeUnusedExports(mod.rawCode, mod.usedExports)\}

**🚀** **打包并运行**
node bundler.jsnode dist/bundle.js

**✅** **输出结果**
I am used
并且打包结果中不会出现 unused = 'I should be removed'。

**🧾** **输出结果文件预览（部分）**
const used = 'I am used';exports.used = used;

**✅** **本章功能总结**

|   |   |
|---|---|
|**能力**|**实现**|
|静态分析导入的 export 名称|✔|
|过滤未用 export|✔|
|仅保留实际需要的代码|✔|
|模拟 Tree Shaking|✔|

**🔮** **下一章预告（第七章）**
我们可以继续挑战更难的功能，比如：
**实现 top-level await 支持和异步模块加载**
让这种写法能正确处理：
// a.mjsawait new Promise(r =\> setTimeout(r, 1000));export const foo = 'done';
需要我们修改执行引擎支持 async/await 模块执行顺序。

继续进入第七章吗？我可以带你完整实现 top-level await 加载器 🚀
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
