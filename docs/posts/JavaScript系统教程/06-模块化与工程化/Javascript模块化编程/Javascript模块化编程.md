---
title: "Javascript模块化编程"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "随着网站逐渐变成 \" 互联网应用程序 \" ，嵌入网页的 Javascript 代码越来越庞大，越来越复杂。 网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等 ...... 开发者不得不使用软件工程的方法，管理网页的业务逻辑。 Javascript 模块化编程，已。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Javascript模块化编程/Javascript模块化编程.md"
---
::: v-pre

# Javascript模块化编程

> 本节目标：理解“Javascript模块化编程”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
随着网站逐渐变成`"`[互联网应用程序](http://en.wikipedia.org/wiki/Web_application)`"`，嵌入网页的`Javascript`代码越来越庞大，越来越复杂。

网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等`......`开发者不得不使用软件工程的方法，管理网页的业务逻辑。

`Javascript`模块化编程，已经成为一个迫切的需求。

理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

但是，`Javascript`不是一种模块化编程语言，它不支持`"`[类](http://www.ruanyifeng.com/blog/2012/07/three_ways_to_define_a_javascript_class.html)`"`（`class`），更遑论`"`模块`"`（`module`）了。（正在制定中的

```
ECMAScript
```

标准第六版，将正式支持`"`类`"`和`"`模块`"`，但还需要很长时间才能投入实用。）

`Javascript`社区做了很多努力，在现有的运行环境中，实现`"`模块`"`的效果。本文总结了当前＂`Javascript`模块化编程＂的最佳实践，说明如何投入实用。虽然这不是初级教程，但是只要稍稍了解`Javascript`的基本语法，就能看懂。

:::
