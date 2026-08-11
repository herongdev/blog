---
title: "ES6 模块加载 CommonJS 模块"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "首先，就是this关键字。ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的加载实现/ES6 模块加载 CommonJS 模块.md"
---
::: v-pre

# ES6 模块加载 CommonJS 模块

> 本节目标：理解“ES6 模块加载 CommonJS 模块”的核心思路，并能把它用于实际开发或面试表达。
```
目前，一个模块同时支持 ES6 和 CommonJS 两种格式的常见方法是，package.json文件的main字段指定 CommonJS 入口，给 Node.js 使用；module字段指定 ES6 模块入口，给打包工具使用，因为 Node.js 不认识module字段。
有了上一节的条件加载以后，Node.js 本身就可以同时处理两种模块。
// ./node_modules/pkg/package.json{  "type": "module",  "main": "./index.cjs",  "exports": {    "require": "./index.cjs",    "default": "./wrapper.mjs"  }}
上面代码指定了 CommonJS 入口文件index.cjs，下面是这个文件的代码。
// ./node_modules/pkg/index.cjsexports.name = 'value';
然后，ES6 模块可以加载这个文件。
// ./node_modules/pkg/wrapper.mjsimport cjsModule from './index.cjs';export const name = cjsModule.name;
注意，import命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。
// 正确import packageMain from 'commonjs-package';
// 报错import { method } from 'commonjs-package';
还有一种变通的加载方法，就是使用 Node.js 内置的module.createRequire()方法。
// cjs.cjsmodule.exports = 'cjs';
// esm.mjsimport { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjs = require('./cjs.cjs');cjs === 'cjs'; // true
上面代码中，ES6 模块通过module.createRequire()方法可以加载 CommonJS 模块
**CommonJS** **模块加载** **ES6** **模块**
CommonJS 的require命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。
(async () => {  await import('./my-app.mjs');})();
上面代码可以在 CommonJS 模块中运行。
**Node.js** **的内置模块**
Node.js 的内置模块可以整体加载，也可以加载指定的输出项。
// 整体加载import EventEmitter from 'events';const e = new EventEmitter();
// 加载指定的输出项import { readFile } from 'fs';readFile('./foo.txt', (err, source) => {  if (err) {    console.error(err);  } else {    console.log(source);  }});
**加载路径**
ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。import命令和package.json文件的main字段如果省略脚本的后缀名，会报错。
// ES6 模块中将报错import { something } from './index';
为了与浏览器的import加载规则相同，Node.js 的.mjs文件支持 URL 路径。
import './foo.mjs?query=1'; // 加载 ./foo 传入参数 ?query=1
上面代码中，脚本路径带有参数?query=1，Node 会按 URL 规则解读。同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。由于这个原因，只要文件名中含有:、%、#、?等特殊字符，最好对这些字符进行转义。
目前，Node.js 的import命令只支持加载本地模块（file:协议）和data:协议，不支持加载远程模块。另外，脚本路径只支持相对路径，不支持绝对路径（即以/或//开头的路径）。
最后，Node 的import命令是异步加载，这一点与浏览器的处理方法相同。
**内部变量**
ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。
```

首先，就是this关键字。ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。
其次，以下这些顶层变量在 ES6 模块之中都是不存在的。

```
arguments
```

```
require
```

```
module
```

```
exports
```

```
__filename
```

```
__dirname
```

:::
