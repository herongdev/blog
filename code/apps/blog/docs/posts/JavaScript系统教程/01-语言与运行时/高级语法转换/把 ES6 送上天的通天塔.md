---
title: "把 ES6 送上天的通天塔"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "Babel组成 Babel 就是一套解决方案，用来把 ES6 的代码转化为浏览器或者其它环境支持的代码。 注意：不是转化为 ES5 ，因为不同类型以及不同版本的浏览器对 ES6 新特性的支持程度都不一样，对于浏览器已经支持的部分， Babel 可以不转化，所以 Babel 会依赖。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/高级语法转换/把 ES6 送上天的通天塔.md"
---
::: v-pre

# 把 ES6 送上天的通天塔

> 本节目标：理解“把 ES6 送上天的通天塔”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
Babel组成

`Babel` 就是一套解决方案，用来把 `ES6` 的代码转化为浏览器或者其它环境支持的代码。

注意：不是转化为 `ES5` ，因为不同类型以及不同版本的浏览器对 `ES6` 新特性的支持程度都不一样，对于浏览器已经支持的部分，`Babel` 可以不转化，所以 `Babel` 会依赖浏览器的版本，后面会讲到。 这里可以先参考

```
browerslist
```

 项目。

历史
在学习任何一门知识前，我都习惯先了解它的历史，这样才能深刻理解它存在意义。
`Babel` 的作者是 `FaceBook` 的工程师 `Sebastian McKenzie`。他在 `2014` 年发布了一款 `JavaScript` 的编译器 `6to5`。从名字就能看出来，它主要的作用就是将 `ES6` 转化为 `ES5`。

这里的 `ES6` 指 `ES2015`，因为当时还没有正式发布， `ES2015` 的名字还未被正式确定

于是很多人评价，`6to5` 只是 `ES6` 得到支持前的一个过渡方案，它的作者非常不同意这个观点，认为 `6to5` 不光会按照标准逐步完善，依然具备非常大的潜力反过来影响并推进标准的制定。正因为如此 `6to5` 的团队觉得 `'6to5'` 这个名字并没有准确的传达这个项目的目标。加上 `ES6` 正式发布后，被命名为 `ES2015`，对于 `6to5` 来说更偏离了它的初衷。于是 `2015` 年 `2` 月 `15` 号，`6to5` 正式更名为 `Babel`。

`Babel` 是巴比伦文化里的通天塔；
安装依赖包
`npm install --save-dev @babel/core @babel/cli @babel/preset-env`
后面会介绍这些包的作用，先看用法

增加 `babel` 命令来编译 `src` 目录下的文件到 `dist` 目录

```
:
{
```

```
 "name": "demo",
```

```
 "version": "1.0.0",
```

```
 "description": "",
```

```
 "main": "src/index.js",
```

```
 "scripts": {
```

```
 "babel": "babel src --out-dir dist",
```

```
 "test": "echo \"Error: no test specified\" && exit 1"
```
   `},`

```
 "keywords": [],
```

```
 "author": "",
```

```
 "license": "ISC",
```

```
 "devDependencies": {
```

```
 "@babel/cli": "^7.8.4",
```

```
 "@babel/core": "^7.9.0",
```

```
 "@babel/preset-env": "^7.9.0"
```

```
 }
}
```

增加 `Babel` 配置文件
在工程的根目录添加 `babel.config.js` 文件，增加 `Babel` 编译的配置，没有配置是不进行编译的。

```
const presets = [
```

```
 ['@babel/env', { debug: true }]
]
const plugins = []
module.exports = {
```

```
 presets,
```

```
 plugins
}
```

上例中 `debug` 配置是为了打印出 `Babel` 工作时的日志，可以方便的看来，`Babel` 转化了哪些语法。

1. `presets` 主要是配置用来编译的预置，`plugins` 主要是配置完成编译的插件，具体的含义后面会讲
2. 推荐用 `Javascript` 文件来写配置文件，而不是 `JSON` 文件，这样可以根据环境来动态配置需要使用的 `presets` 和 `plugins`

```
const presets = [['@babel/env', { debug: true }]]
constplugins = []
if (process.env["ENV"] === "prod") {
```

```
 plugins.push()
}
module.exports = { presets, plugins }
```

编译的结果
配置好后，我们运行 `npm run babel` 命令，可以看到 `dist` 文件夹下生成了 `index.js` 文件，内容如下所示

```
// src/index.js
const add = (a, b) => a + b
// dist/index.js
"use strict";
var add = function add(a, b) {
```

```
 return a + b;
};
```
 ==可以看到，==`ES6` ==的== `const` ==被转化为== `var` ==，箭头函数被转化为普通函数。同时打印出来如下日志：==

```
$ yarn babel
yarn run v1.22.11
$ babel src --out-dir dist
@babel/preset-env: `DEBUG` option
```

```
Using targets:
{}
Using modules transform: auto
Using plugins:
  proposal-class-static-block { }
  proposal-private-property-in-object { }
  proposal-class-properties { }
  proposal-private-methods { }
  proposal-numeric-separator { }
  proposal-logical-assignment-operators { }
  proposal-nullish-coalescing-operator { }
  proposal-optional-chaining { }
  proposal-json-strings { }
  proposal-optional-catch-binding { }
  transform-parameters { }
  proposal-async-generator-functions { }
  proposal-object-rest-spread { }
  transform-dotall-regex { }
  proposal-unicode-property-regex { }
  transform-named-capturing-groups-regex { }
  transform-async-to-generator { }
  transform-exponentiation-operator { }
  transform-template-literals { }
  transform-literals { }
  transform-function-name { }
  transform-arrow-functions { }
  transform-block-scoped-functions { }
  transform-classes { }
  transform-object-super { }
  transform-shorthand-properties { }
  transform-duplicate-keys { }
  transform-computed-properties { }
  transform-for-of { }
  transform-sticky-regex { }
  transform-unicode-escapes { }
  transform-unicode-regex { }
  transform-spread { }
  transform-destructuring { }
  transform-block-scoping { }
  transform-typeof-symbol { }
  transform-new-target { }
  transform-regenerator { }
  transform-member-expression-literals { }
  transform-property-literals { }
  transform-reserved-words { }
  proposal-export-namespace-from { }
  transform-modules-commonjs
  proposal-dynamic-import
Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
Successfully compiled 1 file with Babel (1451ms).
Done in 2.27s.
```

`Babel` 工作流程
前面提到 `Babel` 其实就是一个纯粹的 `JavaScript` 的编译器，任何一个编译器工作流程大致都可以分为如下三步：

- `Parser` 解析源文件
- `Transfrom` 转换
- `Generator` 生成新文件

`Babel` 也不例外，如下图所示`:`

因为 `Babel` 使用是

```
acorn
```

 这个引擎来做解析，这个库会先将源码转化为[抽象语法树](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Abstract_syntax_tree) `(AST)`，再对 `AST` 作转换，最后将转化后的 `AST` 输出，便得到了被 `Babel` 编译后的文件。

`Babel` 为每一个新的语法提供了一个插件，在 `Babel` 的配置中配置了哪些插件，就会把插件对应的语法给转化掉。插件被命名为 `@babel/plugin-xxx` 的格式。
 \> 来自

```
 <https://zhuanlan.zhihu.com/p/129089156>
```

:::
