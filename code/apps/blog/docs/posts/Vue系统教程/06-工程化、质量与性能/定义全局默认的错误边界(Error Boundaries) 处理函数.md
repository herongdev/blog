---
title: "定义全局默认的错误边界(Error Boundaries) 处理函数"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "考虑到整个应用的健壮性，针对每个主要组件设计错误边界(Error Boundaries)策略在 React 16 以后是有必要的。 2.1 定义用于 Error Boundaries 处理的 HOC 组件 一种简单的方式是设计一个 HOC 组件，然后用装饰器模式应用于要包裹的业务。"
sidebarWeight: 72
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/错误处理/定义全局默认的错误边界(Error Boundaries) 处理函数.md"
---
::: v-pre

# 定义全局默认的错误边界(Error Boundaries) 处理函数

> 本节目标：理解“定义全局默认的错误边界(Error Boundaries) 处理函数”的核心思路，并能把它用于实际开发或面试表达。
考虑到整个应用的健壮性，针对每个主要组件设计错误边界(Error Boundaries)策略在 React 16 以后是有必要的。
**2.1 定义用于 Error Boundaries 处理的 HOC 组件**
一种简单的方式是设计一个 HOC 组件，然后用装饰器模式应用于要包裹的业务组件：

```
export default tip => EBWrapComponent => {
    return class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
        static getDerivedStateFromError(error) {
            return { hasError: true };
        }
        componentDidCatch(error, info) {
            console.error(error, info.componentStack);
        }
        render() {
            if (this.state.hasError) {
                if (!tip) return;
                return <h2>{tip}</h2>;
            }
            return <EBWrapComponent />;
        }
    }
}
```

应用示例：

```
@ErrorBoundary('i am not ok')
export default class LzwmeTestComponent extends React.Component {
    // ...
}
```
 \> 来自 \<[http://lzw.me/a/react-16-error-boundaries.html](http://lzw.me/a/react-16-error-boundaries.html)\>

:::
