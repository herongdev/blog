---
title: "创建react项目"
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
description: "围绕“创建react项目”整理的概念、示例与实践笔记。"
sidebarWeight: 66
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/创建react项目 /创建react项目.md"
---
::: v-pre

# 创建react项目

> 本节目标：理解“创建react项目”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
一、npx命令或yarn create命令
```

```
npx create-react-app my-app
```

```
cd my-app
```

```
npm start
```

```
生成的项目目录结构如下：
```

```
已经帮我们安装好了相关依赖；
其中还生成了git仓库；
package.json
{
  "name": "my-react-demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

:::
