---
title: "第十三章：生成 HTML 可视化模块依赖图（可点击查看内容）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "太棒了，我们继续进入： 🌐 ✅ 本章目标： 基于我们前面构建的模块依赖关系 生成一个 交互式 HTML 页面 支持：点击模块节点 → 展示模块代码内容 无需 Graphviz，浏览器直接查看 🧱 项目结构（新增） htmlvizbundler/├── src/│ ├── main。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/实现esmodule/第十三章：生成 HTML 可视化模块依赖图（可点击查看内容）.md"
---
::: v-pre

# 第十三章：生成 HTML 可视化模块依赖图（可点击查看内容）

> 本节目标：理解“第十三章：生成 HTML 可视化模块依赖图（可点击查看内容）”的核心思路，并能把它用于实际开发或面试表达。
太棒了，我们继续进入：

**🌐**
✅ 本章目标：

- 基于我们前面构建的模块依赖关系
- 生成一个**交互式 HTML 页面**
- 支持：点击模块节点 → 展示模块代码内容
- 无需 Graphviz，浏览器直接查看

**🧱** **项目结构（新增）**
htmlvizbundler/├── src/│ ├── main.mjs│ ├── a.mjs│ └── b.mjs├── bundler.js└── dist/ ├── bundle.js └── graph.html # ✅ HTML 可视化输出

**✨** **可视化效果：**

- 模块名以节点图显示（box）
- 连线表示依赖关系
- 点击模块名 → 展示其代码内容（右侧预览）
- 全部基于 HTML + JS + SVG 渲染

**✅** **bundler.js：添加 HTML 依赖图导出功能**
在打包后添加如下方法：

**✍️** **添加 generateHtmlGraph(modules) 函数**
function escapeHTML(str) \{ return str.replace(/[\<\>&"]/g, (ch) =\> (\{ '\<': '&lt;', '\>': '&gt;', '&': '&amp;', '"': '&quot;' \}[ch]));\}
function generateHtmlGraph(modules) \{ const nodes = modules.map(m =\> \{ return `\<div class="node" data-id="${m.id}" onclick="showCode(${m.id})"\>${m.name}\</div\>`; \}).join('');
const edges = modules.flatMap(m =\> \{ return m.deps.map(dep =\> \{ const targetAbs = path.resolve(path.dirname(m.absPath), dep.endsWith('.json') || dep.endsWith('.mjs') ? dep : dep + '.js'); const target = modules.find(t =\> t.absPath === targetAbs); return target ? `\<line x1="${m.id * 150 + 80}" y1="40" x2="${target.id * 150 + 80}" y2="40" stroke="gray" /\>` : ''; \}); \}).join('');
const scripts = `\<script\>const codes = $\{JSON.stringify(modules.reduce((acc, m) =\> \{ acc[m.id] = escapeHTML(m.rawCode); return acc;\}, \{\}))\};
function showCode(id) \{ document.getElementById('code').innerHTML = '\<pre\>' + codes[id] + '\</pre\>';\}\</script\>`;
return `\<!DOCTYPE html\>\<html\>\<head\> \<meta charset="utf-8" /\> \<style\> body { font-family: sans-serif; display: flex; } .graph { padding: 20px; min-width: 400px; } .node { padding: 5px 10px; margin: 8px; border: 1px solid #aaa; border-radius: 6px; display: inline-block; background: #eef; cursor: pointer; } #code { padding: 20px; background: #f7f7f7; border-left: 1px solid #ccc; white-space: pre-wrap; flex: 1; } \</style\>\</head\>\<body\> \<div class="graph"\> \<h3\>模块依赖图\</h3\> ${nodes} \<svg width="100%" height="80"\>${edges}\</svg\> \</div\> \<div id="code"\>\<em\>点击模块查看源码\</em\>\</div\> ${scripts}\</body\>\</html\>`;\}

**✍️** **在打包流程末尾加上：**
const html = generateHtmlGraph(modules);fs.writeFileSync('dist/graph.html', html, 'utf-8');console.log('✅ 可视化 HTML 依赖图生成完成：dist/graph.html');

**✅** **运行打包**
node bundler.js src/main.mjs --out dist/bundle.js
然后打开 dist/graph.html，就能：

- 浏览依赖结构图
- 点击每个模块查看代码内容

**🧾** **效果截图（示意）：**
+-------------------------+| src/main.mjs | ◀── 点击 → 展示源码+-------------------------+ ↓ ↓+----------------+ +----------------+| src/a.mjs | | src/b.mjs |+----------------+ +----------------+

**✅** **本章成果**

|   |   |
|---|---|
|**能力**|**实现**|
|输出模块关系可视化 HTML|✔|
|点击节点查看模块源码|✔|
|无需 Graphviz，纯浏览器实现|✔|
|支持所有类型模块（json/cjs/esm）|✔|

**🔮** **下一章预告（第十四章）**
你已经实现了一个包含：

- 模块分析器
- 模拟打包器
- Tree Shaking
- top-level await
- 动态导入
- CommonJS 和 JSON 混合模块
- 可视化工具

下一章可以挑战：
**支持多入口打包（MPA 或微前端）+ 自动共享模块（缓存）分析**
是否继续？我带你完成真正可应用的微型打包器构建体系 ✅
 \> 来自 \<[https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985](https://chatgpt.com/c/6805aef6-e7b4-8004-ab43-9a137f666985)\>

:::
