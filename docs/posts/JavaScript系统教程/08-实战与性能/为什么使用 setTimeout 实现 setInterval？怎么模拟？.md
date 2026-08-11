---
title: "为什么使用 setTimeout 实现 setInterval？怎么模拟？"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "\\ 来自 \\<https://github.com/CavsZhouyou/Front End Interview Notebook/blob/master/JavaScript/JavaScript.md\\。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/经典方法/为什么使用 setTimeout 实现 setInterval？怎么模拟？.md"
---
::: v-pre

# 为什么使用 setTimeout 实现 setInterval？怎么模拟？

> 本节目标：理解“为什么使用 setTimeout 实现 setInterval？怎么模拟？”的核心思路，并能把它用于实际开发或面试表达。
```
==相关知识点：==
 ==思路是使用递归函数，不断地去执行 setTimeout 从而达到 setInterval 的效果======
==function== ==mySetInterval====(fn, timeout) {======   ==// 控制器，控制定时器是否继续执行======   ==var== ==timer== ===== =={======     ==flag====:== ==true======   ==};======
==// 设置递归函数，模拟定时器执行。======   ==function== ==interval====() {======     ==if== ==(timer.====flag====) {======       ==fn();======       ==setTimeout====(interval, timeout);======     ==}======   ==}======
==// 启动定时器======   ==setTimeout====(interval, timeout);======
==// 返回控制器======   ==return== ==timer;====== ==}==
==回答：==
 ==setInterval 的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间立即执行，它真正的作用是每隔一段时====== ==间将事件加入事件队列中去，只有当当前的执行栈为空的时候，才能去从事件队列中取出事件执行。所以可能会出现这样的情况，====== ==就是当前执行栈执行的时间很长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候，这些事件会依次执行，因====== ==此就不能到间隔一段时间执行的效果。======
==针对 setInterval 的这个缺点，我们可以使用 setTimeout 递归调用来模拟 setInterval，这样我们就确保了只有一个事====== ==件结束了，我们才会触发下一个定时器事件，这样解决了 setInterval 的问题。======
==详细资料可以参考：== ==《用 setTimeout 实现 setInterval》== ==《setInterval 有什么缺点？》==
```
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
