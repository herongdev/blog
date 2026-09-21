---
title: "给dom元素绑定js事件的三种方式"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "self challenge 2020 06 03 22:40:51 470 收藏 文章标签： javascript dom 版权 在html标签中直接绑定； js中获取到相应的dom元素后绑定； 使用addEventListener方法实现绑定； \\<! html内直接绑定 \\。"
sidebarWeight: 88
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/事件/给dom元素绑定js事件的三种方式.md"
---
::: v-pre

# 给dom元素绑定js事件的三种方式

> 本节目标：理解“给dom元素绑定js事件的三种方式”的核心思路，并能把它用于实际开发或面试表达。
self_challenge 2020-06-03 22:40:51 470 收藏
文章标签： javascript dom
版权

在html标签中直接绑定；
js中获取到相应的dom元素后绑定；
使用addEventListener方法实现绑定；

\<!--html内直接绑定 --\>
\<button onclick="alert('执行了html绑定的方法')"\>\</button\>

1
2

这种写法维护性差，用的很少。

\<button class="btn"\>dom0级绑定事件\</button\>
var btn = document.querySelector('.btn')
btn.onclick = function (e) \{
console.log(e)
\}

1
2
3
4
5

首先获取dom，再给dom绑定指定事件，优点兼容好，缺点一个事情不能多次绑定。

\<button class="btn"\>dom2级绑定事件\</button\>
var btn = document.querySelector('.btn')
btn.addEventListener('click',function()\{\},false)

1
2
3

获取dom后，通过addEventListener方法添加指定事件，它接受三个参数，第一添加的事件名，第二事件监听函数，第三是否冒泡或捕获。dom2级绑定事件也可以移出事件，代码如下：

// 使用removeEventListener()移除事件
btn.removeEventListener('click',function()\{\},false)
————————————————
版权声明：本文为CSDN博主「self_challenge」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/self_challenge/article/details/106534464

:::
