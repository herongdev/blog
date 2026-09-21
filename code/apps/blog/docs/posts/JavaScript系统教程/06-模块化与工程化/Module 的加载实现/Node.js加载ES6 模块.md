---
title: "Node.js加载ES6 模块"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的加载实现/Node.js加载ES6 模块.md"
---
::: v-pre

# Node.js加载ES6 模块

> 本节目标：理解“Node.js加载ES6 模块”的核心思路，并能把它用于实际开发或面试表达。
Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

```
Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。
如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
{   "type": "module"}
一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。
```

# 解释成 ES6 模块$ node my-app.js
如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。

```
总结为一句话：
```

```
.mjs文件总是以 ES6 模块加载
```

```
.cjs文件总是以 CommonJS 模块加载
```

```
.js文件的加载取决于package.json里面type字段的设置。
```

```
如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。
```

```
如果type字段为module，则解释为Es6模块。
```

**注意：**ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。

```
**main** **字段**
package.json文件有两个字段可以指定模块的入口文件：main和exports。比较简单的模块，可以只使用main字段，指定模块加载的入口文件。
// ./node_modules/es-module-package/package.json{  "type": "module",  "main": "./src/index.js"}
上面代码指定项目的入口脚本为./src/index.js，它的格式为 ES6 模块。如果没有type字段，index.js就会被解释为 CommonJS 模块。
然后，import命令就可以加载这个模块。
// ./my-app.mjs
import { something } from 'es-module-package';// 实际加载的是 ./node_modules/es-module-package/src/index.js
上面代码中，运行该脚本以后，Node.js 就会到./node_modules目录下面，寻找es-module-package模块，然后根据该模块package.json的main字段去执行入口文件。
这时，如果用 CommonJS 模块的require()命令去加载es-module-package模块会报错，因为 CommonJS 模块不能处理export命令。
```

```
exports 字段
exports字段的优先级高于main字段。它有多种用法。
（1）子目录别名
package.json文件的exports字段可以指定脚本或子目录的别名。
// ./node_modules/es-module-package/package.json{  "exports": {    "./submodule": "./src/submodule.js"  }}
上面的代码指定src/submodule.js别名为submodule，然后就可以从别名加载这个文件。
import submodule from 'es-module-package/submodule';// 加载 ./node_modules/es-module-package/src/submodule.js
下面是子目录别名的例子。
// ./node_modules/es-module-package/package.json{  "exports": {    "./features/": "./src/features/"  }}
import feature from 'es-module-package/features/x.js';// 加载 ./node_modules/es-module-package/src/features/x.js
如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
// 报错import submodule from 'es-module-package/private-module.js';
// 不报错import submodule from './node_modules/es-module-package/private-module.js';
```

```
（2）main 的别名
exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，并且可以直接简写成exports字段的值。
{  "exports": {    ".": "./main.js"  }}
// 等同于{  "exports": "./main.js"}
由于exports字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。
{  "main": "./main-legacy.cjs",  "exports": {    ".": "./main-modern.cjs"  }}
上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是main-legacy.cjs，新版本的 Node.js 的入口文件是main-modern.cjs。
```

```
**（****3****）条件加载**
利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
{  "type": "module",  "exports": {    ".": {      "require": "./main.cjs",      "default": "./main.js"    }  }}
上面代码中，别名.的require条件指定require()命令的入口文件（即 CommonJS 的入口），default条件指定其他情况的入口（即 ES6 的入口）。
上面的写法可以简写如下。
{  "exports": {    "require": "./main.cjs",    "default": "./main.js"  }}
注意，如果同时还有其他别名，就不能采用简写，否则或报错。
{ // 报错  "exports": {    "./feature": "./lib/feature.js",    "require": "./main.cjs",    "default": "./main.js"  }}
```

:::
