---
title: "ESM"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "ES6 的模块化使用的是 import/export 关键字来实现导入和导出，并且自动采用的是严格模式（ use strict ），考虑到都是运行在模块之中，所以 ES6 实际上把整个语言都升到了严格模式。 在 ES6 中每一个模块即是一个文件，在文件中定义变量、函数、对象在外部。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/前端模块化发展历史/ESM.md"
---
::: v-pre

# ESM

> 本节目标：理解“ESM”的核心思路，并能把它用于实际开发或面试表达。
`ES6` ==的模块化使用的是== `import/export` ==关键字来实现导入和导出，并且自动采用的是严格模式（==`use strict`==），考虑到都是运行在模块之中，所以== `ES6` ==实际上把整个语言都升到了严格模式。==
==在== `ES6` ==中每一个模块即是一个文件，在文件中定义变量、函数、对象在外部是无法获取的。如果想要获取模块内的内容，就必须使用== `export` ==关键字来对其进行暴露。我们把之前的公用脚本用== `ES6` ==的形式再重构一遍：==

```
// utils.jsconst show = () => {  document.getElementById(id).setAttribute('style', 'display: block');}const hide = () => {  document.getElementById(id).setAttribute('style', 'display: none');}
export {    show,  hide}//
```

==或者直接抛出方法==

```
export const show = (id) => {  document.getElementById(id).setAttribute('style', 'display: block');}export const hide = (id) => {  document.getElementById(id).setAttribute('style', 'display: none');}
//
```

==外部引入模块==

```
import { show, hide } from './utils'
```
 **浏览器的支持**
`CommonJS` ==规范是服务器端的模块化方案，浏览器是不支持的，因为浏览器并不能识别== `require` ==关键字，所以这时候我们需要对代码进行编译使得浏览器认识它们。==`Browserify` ==等工具的出现解决了这个问题，通过对它对代码进行编译，再通过== `Gulp` ==完成自动化构建，这是早期的开发模式。==
==再后来就到了我们现在的== `React`==、==`Vue` ==大行其道，它们都采用== `ES6` ==的模块化方式编写代码，用组件拼接的方式完成业务，也都是通过== `Webpack` ==完成构建打包自动化。但是在使用== `ES6` ==的时候，还是需要用==

```
babel
```

 ==去把== `ES6` ==代码编译成== `ES5`==，因为浏览器的迭代更新速度是比不上== `ECMA` ==标准的更新速度的，为了让从事前端的同学们能马上用上最新鲜的语法糖，必须用==

```
babel
```

 ==进行编译，编译完之后的代码，浏览器才能正常运行。==
**总结**
==本章节简单回顾了前端模块化发展的历史，从最初的刀耕火种，到传统的模块化，再到现在的== `ES6` ==模块化，意在让大家能清晰的认识前端模块化的历史进程，其中有些知识点可以展开再细讲，同学们有兴趣的话可以深入学习。想要把== `Vue`==、==`React` ==等现代前端框架学好，模块化的知识是必不可少的。如果初学者一上来就学习== `Vue`==、==`React` ==等框架，可能可以简单的使用，但是无法做到深入理解，所以还是希望同学们能把这篇文章好好读完。==
 \> 来自

```
 <https://juejin.im/book/6844733826191589390/section/6844733826271281159>
```

:::
