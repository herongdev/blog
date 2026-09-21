---
title: "第十二章：生成模块依赖图可视化（支持 Graphviz 和 HTML）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "好，我们继续进入： 🧭 ✅ 本章目标： 追踪模块之间的依赖关系 输出可视化的依赖图（.dot for Graphviz，或 HTML 可视化） 用图形一眼看清模块结构、主干路径、孤立模块等 🧱 示例结构 graphvizbundler/├── src/│ ├── main.mjs。"
sidebarWeight: 49
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第十二章：生成模块依赖图可视化（支持 Graphviz 和 HTML）.md"
---
::: v-pre

# 第十二章：生成模块依赖图可视化（支持 Graphviz 和 HTML）

> 本节目标：理解“第十二章：生成模块依赖图可视化（支持 Graphviz 和 HTML）”的核心思路，并能把它用于实际开发或面试表达。
好，我们继续进入：

**🧭**
✅ 本章目标：

- 追踪模块之间的依赖关系
- 输出可视化的依赖图（.dot for Graphviz，或 HTML 可视化）
- 用图形一眼看清模块结构、主干路径、孤立模块等

**🧱** **示例结构**
graphvizbundler/├── src/│ ├── main.mjs│ ├── a.mjs│ ├── b.mjs│ └── config.json├── bundler.js└── graph.dot # ✅ 输出的 Graphviz 源码

**📄** **示例代码**
**src/a.mjs**
import config from './config.json';export const msg = 'A + ' + config.appName;
**src/b.mjs**
export const b = 'module B';
**src/main.mjs**
import \{ msg \} from './a.mjs';import \{ b \} from './b.mjs';
console.log(msg, b);

**✍️** **bundler.js 添加可视化输出**
我们在打包完成后，**生成 .dot 文件**，可用 Graphviz 生成图：
**✅** **步骤一：修改 parseModule() 添加模块名字段**
return \{ id: id++, name: path.relative(__dirname, absPath), absPath, rawCode, deps, isESM, isJSON: ext === '.json'\};

**✅** **步骤二：添加 generateGraphDot(modules) 函数**
function generateGraphDot(modules) \{ const lines = ['digraph G \{', ' node [shape=box, style=filled, color=lightblue];'];
for (const mod of modules) \{ for (const dep of mod.deps) \{ const targetAbs = path.resolve(path.dirname(mod.absPath), dep.endsWith('.json') || dep.endsWith('.mjs') ? dep : dep + '.js'); const target = modules.find(m =\> m.absPath === targetAbs); if (target) \{ lines.push(` "${mod.name}" -\> "${target.name}";`); \} \} \}
lines.push('\}'); return lines.join('\n');\}

**✅** **步骤三：打包完成后输出 .dot 文件**
const graphDot = generateGraphDot(modules);fs.writeFileSync('graph.dot', graphDot);console.log('✅ 依赖图导出完成：graph.dot');

**🖼️** **使用 Graphviz 生成图**
**安装 Graphviz（如未安装）：**

- macOS: brew install graphviz
- Ubuntu: sudo apt install graphviz

**生成 PNG 图：**
dot -Tpng graph.dot -o graph.png
也可以生成 SVG：
dot -Tsvg graph.dot -o graph.svg

**✅** **示例输出（graph.dot）**
digraph G \{ node [shape=box, style=filled, color=lightblue]; "src/main.mjs" -\> "src/a.mjs"; "src/main.mjs" -\> "src/b.mjs"; "src/a.mjs" -\> "src/config.json";\}

**✅** **效果图示（Graphviz 渲染后）**
+------------------+| src/main.mjs |+------------------+ | \ | \ v v+------------+ +------------+| src/a.mjs | | src/b.mjs |+------------+ +------------+ | v+-------------------+| src/config.json |+-------------------+

**✅** **本章成果**

|   |   |
|---|---|
|**功能**|**实现**|
|构建模块依赖图|✔|
|输出 Graphviz .dot 文件|✔|
|支持 JSON/JS/ESM 模块|✔|
|可视化调用结构|✔|

**🔮** **第十三章预告（可选方向）**

下一步我们可以探索：

2. **输出 HTML 图形界面（支持点击查看模块内容）**
3. **打包多个入口文件，生成多个 bundle 文件（多页面应用场景）**
4. **生成每个模块的体积统计（可视化优化空间）**

你想继续哪个方向？我可以继续带你写下一章 ✅
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
