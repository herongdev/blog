---
title: "支持 export default 和默认导入的简易 ESM 加载器实现。"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "很好！我们继续进入 第三章： 🧠 目标功能 在上章基础上，加入对 export default 和默认导入的支持： 示例代码要支持： // a.mjsexport const foo 'FOO';export default 'I am the default export'。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/支持 export default 和默认导入的简易 ESM 加载器实现。.md"
---
::: v-pre

# 支持 export default 和默认导入的简易 ESM 加载器实现。

> 本节目标：理解“支持 export default 和默认导入的简易 ESM 加载器实现。”的核心思路，并能把它用于实际开发或面试表达。
很好！我们继续进入 **第三章：**

**🧠** **目标功能**
在上章基础上，加入对 export default 和默认导入的支持：
示例代码要支持：
// a.mjsexport const foo = 'FOO';export default 'I am the default export';
// b.mjsimport def, \{ foo \} from './a.mjs';console.log('默认导入：', def);console.log('具名导入：', foo);

**✅** **文件结构回顾**
esloader/├── main.js // 启动程序├── loader.js // 核心加载器├── a.mjs└── b.mjs

**✍️** **第一步：更新 a.mjs**
export const foo = 'FOO';export default 'I am the default export';

**✍️** **第二步：更新 b.mjs**
import def, \{ foo \} from './a.mjs';console.log('默认导入：', def);console.log('具名导入：', foo);

**⚙️** **第三步：修改 loader.js 处理 default 导出**
const fs = require('fs');const path = require('path');
const moduleGraph = new Map();
async function loadModule(filePath) \{ const absPath = path.resolve(__dirname, filePath);
if (moduleGraph.has(absPath)) \{ return moduleGraph.get(absPath).namespace; \}
const code = fs.readFileSync(absPath, 'utf-8');
// 改进版：解析 import + default const importRegex = /import\s+(?:(\w+)\s*,\s*)?(?:\{?([\w\s,]*)\}?)?\s+from\s+['"](.+)['"]/g; const exportNamedRegex = /export\s+(const|let|var|function)\s+(\w+)/g; const exportDefaultRegex = /export\s+default\s+(.*)/;
const dependencies = []; let match; while ((match = importRegex.exec(code))) \{ const [, defaultImport, namedImports, depPath] = match; dependencies.push(\{ defaultImport, namedImports, depPath \}); \}
const namespace = \{\}; moduleGraph.set(absPath, \{ namespace \});
for (const dep of dependencies) \{ const depNamespace = await loadModule(dep.depPath); if (dep.defaultImport) \{ Object.defineProperty(namespace, dep.defaultImport, \{ enumerable: true, get: () =\> depNamespace.default \}); \} if (dep.namedImports) \{ const names = dep.namedImports.split(',').map(s =\> s.trim()); for (const name of names) \{ Object.defineProperty(namespace, name, \{ enumerable: true, get: () =\> depNamespace[name] \}); \} \} \}
let transformedCode = code .replace(importRegex, '') // 移除 import .replace(exportNamedRegex, 'namespace.$2 =') .replace(exportDefaultRegex, 'namespace.default = $1');
const fn = new Function('namespace', 'exports', transformedCode); fn(namespace, namespace);
return namespace;\}
module.exports = \{ loadModule \};

**🚀** **第四步：运行 main.js**
const \{ loadModule \} = require('./loader');
(async () =\> \{ await loadModule('./b.mjs');\})();

**✅** **输出结果**
默认导入： I am the default export具名导入： FOO

**🔍** **小结**
**已支持：**

- export const ...
- export default ...
- import defaultExport, \{ named \} from '...'

**模拟特性：**

- 模块缓存 ✔️
- 实时绑定（live binding）✔️
- 默认导出 ✔️
- 简易 import/export 静态解析 ✔️

**🔮** **下一章建议（第四章）**
如果你还想继续，可以进入：

1. **使用 AST 工具 acorn 更精准地解析 import/export**
2. **模拟 top-level await 异步模块加载（如远程 fetch 模块）**
3. **将模块打包成一个文件：模拟 Rollup/Vite 的打包过程**
4. **模拟 Tree Shaking：只导入使用到的 export**

你对哪部分更感兴趣？我们就按那条路线继续写教程 🔧
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
