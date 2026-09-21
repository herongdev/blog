---
title: "fastclick的介绍和使用"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "移动端点击延迟事件 1. 移动端浏览器在派发点击事件的时候，通常会出现 300ms 左右的延迟 2. 原因 : 移动端的双击会缩放导致 click 判断延迟 解决方式 1. 禁用缩放 \\<meta name \"viewport\" content \"user scalable no。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/fastclick的介绍和使用.md"
---
::: v-pre

# fastclick的介绍和使用

> 本节目标：理解“fastclick的介绍和使用”的核心思路，并能把它用于实际开发或面试表达。
**移动端点击延迟事件**
`1.` 移动端浏览器在派发点击事件的时候，通常会出现`300ms`左右的延迟
`2.` 原因`:` 移动端的双击会缩放导致`click`判断延迟

**解决方式**
`1.` 禁用缩放
   `` `\<meta name = "viewport" content="user-scalable=no" \> ` ``
    缺点`:` 网页无法缩放
`2.` 更改默认视口宽度
    `` `\<meta name="viewport" content="width=device-width"\>` ``
    缺点`:` 需要浏览器的支持
`3.` `css touch-action`
    `touch-action`的默为 `auto`，将其置为 `none` 即可移除目标元素的 `300` 毫秒延迟
    缺点`:` 新属性，可能存在浏览器兼容问题
`4.` `tap`事件
    `zepto`的`tap`事件`,` 利用`touchstart`和`touchend`来模拟`click`事件
    缺点`:` 点击穿透
`5.` `fastclick`
    原理`:` 在检测到`touchend`事件的时候，会通过`DOM`自定义事件立即出发模拟一个`click`事件，并把浏览器在`300ms`之后真正的`click`事件阻止掉
    缺点`:` 脚本相对较大
    使用`:`
    ` ```JS `
    `//` 引入
   `\<script type='application/javascript' src='/path/to/fastclick.js'\>\</script\>`
    `//` 使用了`jquery`的时候
    `$(function() {`
        `FastClick.attach(document.body);`
    `});`
    `//` 没使用`jquery`的时候
    `if ('addEventListener' in document) {`
        `document.addEventListener('DOMContentLoaded', function() {`
            `FastClick.attach(document.body);`
        `}, false);`
    `}`
    ` ``` `
    在`vue`中使用
    ` ```js `
    `//` 安装
    `npm install fastclick -S`
    `//` 引入
    `import FastClick from 'fastclick'`
    `//` 使用
    `FastClick.attach(document.body);`

`touchstart`： 当在屏幕上按下手指时触发
`touchmove`： 当在屏幕上移动手指时触发
`touchend`： 当在屏幕上抬起手指时触发
`touchcancel` 当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的`touch`操作， 即触发`touchcancel`。一般会在`touchcancel`时暂停游戏、存档等操作。
`//` 用法同普通的`click`事件
 \> 来自

```
 <https://www.cnblogs.com/QQPrincekin/p/10382755.html>
```

:::
