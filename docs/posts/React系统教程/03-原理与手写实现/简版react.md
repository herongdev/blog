---
title: "简版react"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "初始化项目： npx命令或yarn create命令 使用 create react app 脚手架创建 app 后，删除了不必要的文件： 即 src 和 public 目录下 ( 除 index.html 外 ) 所有文件； 安装依赖： 修改 package.json 文件：。"
sidebarWeight: 72
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/简版react.md"
---
::: v-pre

# 简版react

> 本节目标：理解“简版react”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
初始化项目：
npx命令或yarn create命令

```
npx create-react-app my-app
```

```
cd my-app
```

```
npm start
```

使用`create-react-app`脚手架创建`app`后，删除了不必要的文件：
即`src`和`public`目录下`(`除`index.html`外`)`所有文件；

安装依赖：

```
yarn add cross-env
```

修改`package.json`文件：
"scripts": \{
  "start": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts start",
  "build": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts build",
  "test": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts test",
  "eject": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts eject"
\},

`DISABLE_NEW_JSX_TRANSFORM`意思是用旧的转换方式去转换`JSX;`

为什么要有新的`jsx`转换；
因为如果我们在一个文件中定义了`jsx`语法，`babel`会使用用`React.createElement`来进行转换，但我们的文件中又没有引入 `import React from 'react'`；所以，为不了报错，我们就要这样引入；但这样引入之后，我们实际代码中又没有使用引入的`React`，所以`eslint`会报错或警告，说变量定义未使用，所以才有了新的`jsx`转换方法；它会自动引入`react/jsx-runtime`这个包来转换；

运行`yarn start`，打开`localhost:3000`，可看到效果；

:::
