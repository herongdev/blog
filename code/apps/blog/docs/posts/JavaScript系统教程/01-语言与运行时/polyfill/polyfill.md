---
title: "polyfill"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "一个 polyfill 就是一个用在浏览器 API 上的 shim 如： es5 shim 是一个 shim( 而不是 polyfill) 的例子 ， 它在 ECMAScript 3 的引擎上实现了 ECMAScript 5 的新特性 ，因为 它能在 Node.js 上使用 和。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/polyfill/polyfill.md"
---
::: v-pre

# polyfill

> 本节目标：理解“polyfill”的核心思路，并能把它用于实际开发或面试表达。
```
Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API；比如：
以下全局对象：
```

```
Iterator、
```

```
Generator、
```

```
Set、
```

```
Map、
```

```
Proxy、
```

```
Reflect、
```

```
Symbol、
```

```
Promise
```

```
以及全局对象上新拓展的方法：
```

```
Object.assign
```

```
Array.from
```

```
等都不会转码。
```

```
==Polyfill== ==一般用于实现浏览器并不支持的原生== ==API== ==的代码。==
安装命令如下：
$ npm install --save-dev core-js regenerator-runtime
然后，在脚本头部，加入如下两行代码。
import 'core-js';import 'regenerator-runtime/runtime';// 或者require('core-js');require('regenerator-runtime/runtime);
Babel 默认不转码的 API 非常多，详细清单可以查看babel-plugin-transform-runtime模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/runtime-corejs3-definitions.js)文件。
**shi****m****和****polyfill**
一个 shim
```

```
是一个库，有自己的 API，而不是单纯实现原生不支持的 API。
```

```
它将一个新的API引入到一个旧的环境中
```

```
仅靠旧环境中已有的手段实现
```

**一个****polyfill****就是一个用在浏览器****API****上的****shim**
**如：****es5-shim****是一个****shim(****而不是****polyfill)****的例子****，****它在****ECMAScript 3****的引擎上实现了****ECMAScript 5****的新特性****，因为****它能在****Node.js****上使用****和****浏览器****同样使用，****所以它不是****polyfill****。**
如下是对`html5`各特性提供支持的`Polyfill`：`https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills`

:::
