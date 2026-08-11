---
title: "Ts、babel、webpack中的模块转换"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "常用的 JS 的模块： CommonJS （简称 cjs ） ES module （简称 esm ） UMD 存在的主要模块交互如下： esm 引入其它包： esm 会被转为 cjs 引入 esm ：会被转为 cjs ； 引入 cjs ：不作转换； cjs 引入其它包：不作转换。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Ts、babel、webpack中的模块转换/Ts、babel、webpack中的模块转换.md"
---
::: v-pre

# Ts、babel、webpack中的模块转换

> 本节目标：理解“Ts、babel、webpack中的模块转换”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
常用的 `JS` 的模块：

- `CommonJS`（简称 `cjs`）
- `ES module`（简称 `esm`）
- `UMD`

```
js
```

存在的主要模块交互如下：

- `esm`引入其它包：`esm` 会被转为 `cjs`

    - 引入`esm`：会被转为 `cjs`；
    - 引入`cjs`：不作转换；
- `cjs`引入其它包：不作转换；

    - 导入 `esm`，会被转为 `cjs`
    - 导入 `cjs`：不作转换

总结：
任意模块

- 如果它是`cjs`格式，则不进行转换；

```
如果它是esm格式，就会转换为cjs格式；
```

**如何兴**`esm`**转换为**`cjs?`
一、`TS`、`babel`对于`import`导入的转译规则

- 如果是默认导入：`TS` 在读这个模块的时候会去读取上面的 `default` 属性
- 如果非默认导入：`TS` 会去读这个模块顶层对象上面对应的属性；
- 如果是

    ```
     import * as  xxx
    ```

    导入：`xxx`会被当成这个模块的顶层对象，即直接读该模块；

```
举例如下：
 // 转换前，默认导入时，将顶层对象的default导出当成顶层对象
import React from 'react';
console.log(React)
// 转换后，将default导出作为模块顶层对象的的Default属性，取它的default属性；
var React = require('react');
console.log(React['default'])
// before
import { Component } from 'react';
console.log(Component);
// after
var React = require('react');
console.log(React.Component)
// before
import * as React from 'react';
console.log(React);
// after
var React = require('react');
console.log(React);
```

二、`TS`、`babel` 对 `export` 变量的转译规则为：

- 先给 `module.exports` 增加一个 `__esModule: true` 的属性，表明是一个 `esm` 模块；
- 如果是`export default`默认导出的变量：`TS` 会将其放在 `module.exports` 的 `default` 属性上；
- 如果是`export`导出的变量：`TS` 会将其放在 `module.exports` 对应变量名的属性上；

举例如下：
// before
export const name = "esm";
export default \{
  name: "esm default",
\};
// after
exports.__esModule = true;
exports.name = "esm";
exports["default"] = \{
  name: "esm default"
\}

TS 开启 esModuleInterop 后的编译规则
tsconfig配置文件中，esModuleInterop 这个属性默认为 false。改成 true 之后：

- `TS` 对于 `import` 的转译规则会发生一些变化；
- `export` 的规则不会变：

在处理导入时，对于：

- 默认导入
- `namespace`（`*`）导入

`TS` 使用了两个 `helper` 函数来帮忙，如下可知：
// before
import React from 'react';
console.log(React);
// after 代码经过简化
var react = __importDefault(require('react'));
console.log(react['default']);
// before
import \{ Component \} from 'react';
console.log(Component);
// after 代码经过简化
var react = require('react');
console.log(react.Component);
// before
import * as React from 'react';
console.log(React);
// after 代码经过简化
var react = _importStar(require('react'));
console.log(react);

```
 __importDefaul源码简化如下：
var __importDefault = function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
可见：
```

- 如果目标模块是`esm`，先转换为`cjs`，就直接返回目标模块；因为源`esm`如果有`export default`，则它的`exports`是有`default`属性的；要考虑源`esm`没有`default`导出，但我们却默认导入的情况；
- 如果不是`esm`转换的`cjs`模块，则它的`exports`上是没有`default`属性的，就将目标模块挂在一个对象的 `defalut` 上，返回该对象。

分析：
import React from 'react';
// ------
console.log(React);
编译后再层层翻译：
// TS 编译
const React = __importDefault(require('react'));
// 翻译 require
const React = __importDefault(\{ Children: Children, Component: Component \});
// 翻译 __importDefault
const React = \{ default: \{ Children: Children, Component: Component \} \};
// -------
// 读取 React：
console.log(React.default);
// 最后一步翻译：
console.log(\{ Children: Children, Component: Component \})

```
 __importStar源码简化如下：
var __importStar = function (mod) {
  if (mod && mod.__esModule) {
    return mod;
  }
  var result = {};
  for (var k in mod) {
    if (k !== "default" && mod.hasOwnProperty(k)) {
      result[k] = mod[k]
    }
  }
  result["default"] = mod;
  return result;
};
```

**可见**：

- 如果目标模块是`esm`，先转换为`cjs`，就直接返回目标模块。
- 否则将目标模块上所有的除了 `default` 以外的属性挪到 `result` 上；
- 将目标模块自己挂到 `result.default` 上

```
babel 的规则
babel 默认的转译规则和 TS 开启 esModuleInterop 的情况差不多，也是通过两个 helper 函数来处理的
```

- `_interopRequireDefault` 类似 `__importDefault`
- `_interopRequireWildcard` 类似 `__importStar`

**特殊的** **webpack**
一般开发中，babel 和 TS 都会配合 webpack 来使用。
而 TS 和 webpack 的结合有两种方式：

- `ts-loader`
- `@babel/preset-typescript`

如果是使用 `ts-loader`，那么 `webpack` 会将源代码先交给 `tsc` 来编译，然后处理编译后的代码。经过 `tsc` 编译后，所有的模块都会变成 `cjs`，所以 `babel` 也不会处理，直接交给 `webpack` 来以 `cjs` 的方式处理模块。

如果是使用的

```
 @babel/preset-typescript
```

，那么 `webpack` 不会调用 `tsc`，`tsconfig.json` 也会被忽略掉。而是直接用 `babel` 去编译 `ts` 文件。这个编译过程相比调用 `tsc` 会轻量许多，因为 `babel` 只会简单的移除所有 `ts` 相关的代码，不会做类型检查。一般在这种情况下，一个 `ts` 模块经过 `babel` 的 `@babel/preset-env` 和 `@babel/preset-typescript` 两个 `preset` 处理。后者做的事情很简单，仅仅去掉所有 `ts` 相关的代码，不会处理模块，而前者会将 `esm` 转成 `cjs`。然而 `webpack` 的 `babel-loader` 在调用 `babel.transform` 时，传了这样一个 `caller` 选项：

从而导致 `babel` 保留了 `esm` 的 `import export`

因为 `webpack` 自己有一套模块机制，用来处理 `cjs esm AMD UMD` 等各种各样的模块。`webpack` 希望自己直接来处理用户写的模块，而不是让 `babel` 处理一遍再交给自己处理一遍。
对于 `cjs` 引用 `esm`，`webpack` 的编译机制比较特别：
// 代码经过简化
// before
import cjs from "./cjs";
console.log(cjs);
// after
var cjs = __webpack_require__("./src/cjs.js");
var cjsdefault = __webpack_require__.n(cjs);
console.log(cjsdefault.a);

```
// before
import esm from "./esm";
console.log(esm);
// after
var esm = __webpack_require__("./src/esm.js");
console.log(esm["default"]);
其中`_webpack_require__` 类似于 `require`，返回目标模块的 `module.exports` 对象。
`_webpack_require__.n` 这个函数接收一个参数对象，返回一个对象，该返回对象的 `a` 属性（我也不知道为什么属性名叫 `a`）会被设为参数对象。所以上面源代码的 `console.log(cjs)` 会打印出 `cjs.js` 的 `module.exports`
```

由于 `webpack` 为模块提供了一个 `runtime`，所以 `webpack` 处理模块对于 `webpack` 自己而言很自由，在模块闭包里注入代表 `module require exports` 的变量就可以了；
**总结：**
目前很多常用的包是基于 `cjs / UMD` 开发的，而写前端代码一般是写 `esm`，所以常见的场景是 `esm` 导入 `cjs` 的库。但是由于 `esm` 和 `cjs` 存在概念上的差异，最大的差异点在于 `esm` 有 `default` 的概念而 `cjs` 没有，所以在 `default` 上会出问题。
`TS babel webpack` 都有自己的一套处理机制来处理这个兼容问题，核心思想基本都是通过 `default` 属性的增添和读取

:::
