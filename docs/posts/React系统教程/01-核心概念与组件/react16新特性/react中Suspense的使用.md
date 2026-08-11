---
title: "react中Suspense的使用"
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
description: "OtherComponent是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了Suspense之后，可优化交互。 在\\<OtherComponent /\\ 外面使用Suspense标签，并在fallback中声明OtherComponent加载完成前做的事，即可优化。"
sidebarWeight: 8
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/新特性/react16新特性/react中Suspense的使用.md"
---
::: v-pre

# react中Suspense的使用

> 本节目标：理解“react中Suspense的使用”的核心思路，并能把它用于实际开发或面试表达。
```
关于Suspense的使用，先来看下示例代码
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
        </div>
    );
}
```

OtherComponent是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了Suspense之后，可优化交互。

在\<OtherComponent /\>外面使用Suspense标签，并在fallback中声明OtherComponent加载完成前做的事，即可优化整个页面的交互

```
fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <section>
                    <OtherComponent />
                    <AnotherComponent />
                </section>
            </Suspense>
        </div>
    );
}
```
 \> 来自

```
 <https://segmentfault.com/a/1190000020247862?utm_source=tag-newest>
```

:::
