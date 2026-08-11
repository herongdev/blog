---
title: "@babel-preset-env"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "上面提到过 @babel/preset 其实是转换插件的集合，最常用的就是 @babel/preset env ，它包含了 大部分 ES6 的语法，具体包括哪些插件，可以在 Babel 的日志中看到。如果源码中使用了不在 @babel/preset env 中的语法，会报错，手动。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/常用技巧/把 ES6 送上天的通天塔/@babel-preset-env.md"
---
::: v-pre

# @babel-preset-env

> 本节目标：理解“@babel-preset-env”的核心思路，并能把它用于实际开发或面试表达。
上面提到过 `@babel/preset-*` 其实是转换插件的集合，最常用的就是 `@babel/preset-env`，它包含了 大部分 `ES6` 的语法，具体包括哪些插件，可以在 `Babel` 的日志中看到。如果源码中使用了不在 `@babel/preset-env` 中的语法，会报错，手动在 `plugins` 中增加即可。

例如 `ES6` 明确规定，`Class` 内部只有静态方法，没有静态属性。但现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上 `static` 关键字。

```
// src/index.js
const add = (a, b) => a + b
class Person {
    static a = 'a';
    static b;
    name = 'morrain';
    age = 18
}
```
 编译时就会报如下错误：
根据报错的提示，添加 `@babel/plugin-proposal-class-properties` 即可。

```
npm install --save-dev @babel/plugin-proposal-class-properties// babel.config.jsconst presets = [  [    '@babel/env',    {      debug: true    }  ]]const plugins = ['@babel/plugin-proposal-class-properties']
module.exports = { presets, plugins }
@babel/preset-env
```

中还有一个非常重要的参数 `targets`，最早的时候我们就提过，`Babel` 转译是按需的，对于环境支持的语法可以不做转换的。就是通过配置 `targets` 属性，让 `Babel` 知道目标环境，从而只转译环境不支持的语法。如果没有配置会默认转译所有 `ES6` 的语法

```
// src/index.jsconstadd=(a,b)=>a+b// dist/index.js
```

_没有配置_

```
targets"use strict";var
```

```
add=function add(a,b){return a+b;};
```

按如下配置

```
targets
// babel.config.js
const presets = [['@babel/env', { debug: true, targets: { chrome: '58' } }]]
const plugins = ['@babel/plugin-proposal-class-properties']
module.exports = { presets, plugins }
```
 编译后的结果如下：

```
// src/index.jsconstadd=(a,b)=>a+b// dist/index.js
```

_配置_

```
targets  chrome 58"use strict";const
```

`add=(a,b)=\>a+b;`
可以看到 `const` 和箭头函数都没有被转译，因为这个版本的 `chrome` 已经支持了这些特性。可以根据需求灵活的配置目标环境
为后方便后续的讲解，把 `targets` 的配置去掉，让 `Babel` 默认转译所有语法。

:::
