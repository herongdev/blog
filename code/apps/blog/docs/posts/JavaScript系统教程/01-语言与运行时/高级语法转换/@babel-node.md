---
title: "@babel-node"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "模块的babel node命令，提供一个支持 ES6 的 REPL 环境。 它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。 首先，安装这个模块。 $ npm install save dev @babel/node 然后，执行babel node。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/高级语法转换/@babel-node.md"
---
::: v-pre

# @babel-node

> 本节目标：理解“@babel-node”的核心思路，并能把它用于实际开发或面试表达。
模块的babel-node命令，提供一个支持 ES6 的 REPL 环境。
它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

首先，安装这个模块。
$ npm install --save-dev @babel/node
然后，执行babel-node就进入 REPL 环境。
$ npx babel-node\> (x =\> x * 2)(1)2
babel-node命令可以直接运行 ES6 脚本。将上面的代码放入脚本文件es6.js，然后直接运行。
# es6.js 的代码# console.log((x =\> x * 2)(1));$ npx babel-node es6.js2

```
@babel/register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。
$ npm install --save-dev @babel/register
使用时，必须首先加载@babel/register。
// index.jsrequire('@babel/register');require('./es6.js');
然后，就不需要手动对index.js转码了。
$ node index.js2
需要注意的是，@babel/register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。
```

:::
