---
title: "2-Installation & Motivation"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "To install the stable 稳定的 或者，您可以在 上访问这些文件、下载它们，或者将包管理器指向它们。 unpkg 是一个前端常用的公共 CDN ，它通过 URL 语法完成了别人 web 界面内才能达到的效果，简洁而优雅，在流行的类库、框架文档中常常能看到它的身影。"
sidebarWeight: 91
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/2-Installation & Motivation.md"
---
::: v-pre

# 2-Installation & Motivation

> 本节目标：理解“2-Installation & Motivation”的核心思路，并能把它用于实际开发或面试表达。
`To install the stable`稳定的

```
 version:
npm install --save redux
```
 或者，您可以在

```
unpkg unpkg
```

上访问这些文件、下载它们，或者将包管理器指向它们。
`unpkg` 是一个前端常用的公共 `CDN`，它通过 `URL` 语法完成了别人 `web` 界面内才能达到的效果，简洁而优雅，在流行的类库、框架文档中常常能看到它的身影。

最常见的情况是，人们使用`Redux`作为`CommonJS`模块的集合。这些模块是在`Webpack`、`Browserify`或

```
node
```

环境中导入`redux`时得到的。如果您喜欢特立独行使用`Rollup`，我们也支持。
如果不使用`module bundler`模块绑定器也可以。`redux npm`包在`dist`文件夹中包含预编译的生产和开发`UMD`构建。它们可以直接使用，不需要绑定器，因此与许多流行的`JavaScript`模块加载器和环境兼容。例如，您可以将`UMD`构建作为`\<script\>`标记放在页面上，或者告诉`Bower`安装它。`UMD`构建使`Redux`作为一个`window.Redux`全局变量使用。
`The Redux source code is written in ES2015 but we precompile both CommonJS and UMD builds to ES5 so they work in`

```
any modern browser. You don't need to use Babel or a module bundler to
```

```
get started with Redux.
```

`Complementary Packages`
最有可能的是，您还需要

```
the React bindings
```

 `and`

```
the developer tools.
npm install --save react-reduxnpm install --save-dev redux-devtools
```
 注意，与`Redux`本身不同，`Redux`生态系统中的许多包不提供`UMD`构建，因此我们建议使用`CommonJS`模块绑定器，如

```
Webpack
```

 `and`

```
Browserify
```

以获得最佳的开发体验。

\> 来自

```
 <https://redux.js.org/introduction/installation>
```

`Motivation`
随着`JavaScript`单页面应用程序的需求变得越来越复杂，我们的代码必须管理比以往任何时候都多的状态。此状态可以包括服务器响应和缓存的数据，以及尚未`persisted`持久化到服务器的本地创建的数据。`UI`状态的复杂性也在增加，因为我们需要管理活动路由、选择的选项卡、`spinners`旋转器、分页控件等等。
管理这种不断变化的状态是困难的。如果一个模型可以更新另一个模型，那么一个视图可以更新一个模型，这个模型更新另一个模型，而这又可能导致另一个视图更新。在某种程度上，你不再理解应用程序中发生了什么，因为你已经失去了对其状态的时间、原因和方式的控制。当系统不透明且不确定时，很难重现错误或添加新特性。
如果这还不够糟糕，考虑一下在前端产品开发中越来越常见的新需求。作为开发人员，我们需要在执行路由转换之前处理 `optimistic`乐观更新、`server-side rendering`服务器端呈现、获取数据等等。我们发现自己在试图处理一个以前从未处理过的复杂性，我们不可避免地会问`:`是时候放弃了吗`?`答案是否定的。
这种复杂性很难处理，因为我们混合了两个人类很难理解的概念：突变和异步。我叫它们

```
Mentos and Coke
```

曼妥思和可乐。两者在分离时都很好，但在一起就会造成混乱。`React`等库试图通过删除异步和直接`DOM`操作来解决视图层中的这个问题。然而，管理数据的状态是由您自己决定的。这就是`Redux`的切入点。
在`Flux`、`CQRS`和事件来源的步骤中，`Redux`试图通过对更新的方式和时间施加一定的限制，使状态突变成为可预测的。这些限制反映在`Redux`的三个原则中。

\> 来自

```
 <https://redux.js.org/introduction/motivation>
```

:::
