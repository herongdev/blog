---
title: "JSX"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "补充主题"
description: "如果你写了很多 render 函数，可能会觉得下面这样的代码写起来很痛苦： 特别是对应的模板如此简单的情况下： 这就是为什么会有一个 插件 ，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上。 将 h 作为 createElement 的别名是 Vue。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/可复用和组合/渲染函数 & JSX/JSX.md"
---
::: v-pre

# JSX

> 本节目标：理解“JSX”的核心思路，并能把它用于实际开发或面试表达。
==如果你写了很多== `render` ==函数，可能会觉得下面这样的代码写起来很痛苦：==

```
createElement(
    'anchored-heading',
    {
        props: { level: 1 }
    },
    [
        createElement('span', 'Hello'),
        ' world!'
    ]
)
```
 ==特别是对应的模板如此简单的情况下：==

```
<anchored-heading :level="1">  <span>Hello</span> world!</anchored-heading>
```
 ==这就是为什么会有一个==

```
Babel
```

==插件====，用于在== `Vue` ==中使用== `JSX` ==语法，它可以让我们回到更接近于模板的语法上。==

```
import AnchoredHeading from './AnchoredHeading.vue'
new Vue({
    el: '#demo',
    render: function (h) {
        return (
            <AnchoredHeading level={1}>
                <span>Hello</span> world!
            </AnchoredHeading>
        )
    }
})
```
 ==将== `h` ==作为== `createElement` ==的别名是== `Vue` ==生态系统中的一个通用惯例，实际上也是== `JSX` ==所要求的。从== `Vue` ==的== `Babel` ==插件的==

```
3.4.0
```

==版本====开始，我们会在以== `ES2015` ==语法声明的含有== `JSX` ==的任何方法和== `getter` ==中== `(`==不是函数或箭头函数中==`)` ==自动注入== `const h = this.$createElement`==，这样你就可以去掉== `(h)` ==参数了。对于更早版本的插件，如果== `h` ==在当前作用域中不可用，应用会抛错。==
==要了解更多关于== `JSX` ==如何映射到== `JavaScript`==，请阅读====使用文档====。==

:::
