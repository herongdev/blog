---
title: "打包的umd文件解析"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "先判断是不是 common.js ，即 node 环境； 再判断是不是 amd 环境； 执行一个变量声明而已 如果有 globalThis 则使用它作为顶层对象（ es2020 新增，有可能没有） 没有就用自身作为顶层对象 浏览器和 Web Worker 里面， self 也指向。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/一.使用Rollup搭建开发环境/打包的umd文件解析.md"
---
::: v-pre

# 打包的umd文件解析

> 本节目标：理解“打包的umd文件解析”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
(function (global, factory) {
  //
```

先判断是不是`common.js`，即`node`环境；

```
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    //
```

再判断是不是`amd`环境；

```
    : typeof define === "function" && define.amd
      ? define(factory)
      : (
        //
```

执行一个变量声明而已

```
        (global =
          //
```

如果有`globalThis`则使用它作为顶层对象（`es2020`新增，有可能没有）

```
          //
```

没有就用自身作为顶层对象

```
          // self:
```

浏览器和 `Web Worker` 里面，`self`也指向顶层对象，但是 `Node` 没有

```
self
          typeof globalThis !== "undefined" ? globalThis : global || self),
        //
```

给`global`变量加上`Vue`属性

```
        (global.Vue = factory()));
})(
  //
```

第一个参数是`this`对象

```
  // this
```

对象在不同的环境中指代不一样

```
  this,
  //
```

第二个参数是一个函数，它执行返回一个构造函数

```
Vue
  function () {
    "use strict";
    // .....
    function Vue(options) { }
    initMixin(Vue); //
```

导出`vue`给别人使用

```
    return Vue;
  });
//# sourceMappingURL=vue.js.map
```

`globalThis` **对象**
`JavaScript` 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是`window`，但 `Node` 和 `Web Worker` 没有`window`。
- 浏览器和 `Web Worker` 里面，`self`也指向顶层对象，但是 `Node` 没有`self`。
- `Node` 里面，顶层对象是`global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`关键字，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，
    - `Node.js` 模块中`this`返回的是当前模块；
    - `ES6` 模块中`this`返回的是`undefined`。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 `CSP`（`Content Security Policy`，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
`//` 方法一

```
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);
//
```

方法二

```
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
ES2020
```

在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。
垫片库

```
global-this
```

模拟了这个提案，可以在所有环境拿到`globalThis`。
 \> 来自

```
 <https://es6.ruanyifeng.com/?search=globalThis&x=0&y=0#docs/let>
```

:::
