---
title: "JSX深入"
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
description: "因为 jsx 会被转化成普通的 JavaScript 对象，所以可以 在 if 或者 for 语句里使用 JSX ； 将它赋值给变量； 当作参数传入； 作为返回值： 书写规范 最外层加小括号：推荐这样，因为可以防止 分号自动插入 的 bug 。 大小写约定： 原生的 html 标。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX深入/JSX深入.md"
---
::: v-pre

# JSX深入

> 本节目标：理解“JSX深入”的核心思路，并能把它用于实际开发或面试表达。
因为`jsx`会被转化成普通的`JavaScript`对象，所以可以

- 在`if` 或者 `for` 语句里使用 `JSX`；
- 将它赋值给变量；
- 当作参数传入；
- 作为返回值：
**书写规范**

- ==最外层加小括号：推荐这样，因为可以防止== ==分号自动插入== ==的== `bug`==。==
- ==大小写约定：==
    - ==原生的==`html`==标签使用小写；==
    - ==以==`\<`==加上大写字母开头的标签，表示组件；==
- ==属性名：==
    - ==要驼峰命名：====如==

        ```
        tabindex
        ```

         ==则应为== `tabIndex`==。==
    - ==不能是关键字：====像==`class`==需要写成==`className`==，==`for`==需要写成==`htmlFor`==；==
    - `style`==要采用对象的方式。==
- **属性值：**
    - 使用引号来定义以字符串为值的属性：

    ```
    const element = <div tabIndex="0"></div>;
    ```

    - 使用大括号来定义以 `JavaScript` 表达式为值的属性：

    ```
    const element = <img src={user.avatarUrl}></img>;
    ```

- ==标签间的内容：==
    - ==标签之间的内容对应着该==`JSX`==所生成的元素的==`children`==属性；==
    - `JSX` ==防注入攻击==

    你可以放心地在 `JSX` 当中使用用户输入：

    ```
    const title = response.potentiallyMaliciousInput;//
    ```

    直接使用是安全的：

    ```
    const element = <h1>{title}</h1>;
    React DOM
    ```

    在渲染之前默认会 [过滤](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) 所有传入的值，所有的内容在渲染之前都被转换成了字符串。它可以确保你的应用不会被注入攻击，可以有效地防止 `XSS(`跨站脚本`)` 攻击。

- ==自闭合：如果== `JSX` ==标签是闭合式的，要在结尾处用== `/\>`

:::
