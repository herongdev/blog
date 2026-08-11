---
title: "ReactBaseClasses"
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
description: "围绕“ReactBaseClasses”整理的概念、示例与实践笔记。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX深入/ReactBaseClasses.md"
---
::: v-pre

# ReactBaseClasses

> 本节目标：理解“ReactBaseClasses”的核心思路，并能把它用于实际开发或面试表达。
```
export function Component(props) {
    this.props = props;
}
Component.prototype.isReactComponent = {};
/* class Component{
    static isReactComponent=true;
    constructor(props){
        this.props = props;
    }
} */
```

:::
