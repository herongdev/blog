---
title: "js 中倒计时的纠偏实现？"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "在前端实现中我们一般通过 setTimeout 和 setInterval 方法来实现一个倒计时效果。但是使用这些方法会存在时间偏差的问题， 这是由于 js 的程序执行机制造成的，setTimeout 和 setInterval 的作用是隔一段时间将回调事件加入到事件队列中，因此。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/js 中倒计时的纠偏实现？.md"
---
::: v-pre

# js 中倒计时的纠偏实现？

> 本节目标：理解“js 中倒计时的纠偏实现？”的核心思路，并能把它用于实际开发或面试表达。
==在前端实现中我们一般通过 setTimeout 和 setInterval 方法来实现一个倒计时效果。但是使用这些方法会存在时间偏差的问题，====== ==这是由于 js 的程序执行机制造成的，setTimeout 和 setInterval 的作用是隔一段时间将回调事件加入到事件队列中，因此事件====== ==并不是立即执行的，它会等到当前执行栈为空的时候再取出事件执行，因此事件等待执行的时间就是造成误差的原因。======
==一般解决倒计时中的误差的有这样两种办法：======
==（1）第一种是通过前端定时向服务器发送请求获取最新的时间差，以此来校准倒计时时间。======
==（2）第二种方法是前端根据偏差时间来自动调整间隔时间的方式来实现的。这一种方式首先是以 setTimeout 递归的方式来实现倒======     ==计时，然后通过一个变量来记录已经倒计时的秒数。每一次函数调用的时候，首先将变量加一，然后根据这个变量和每次的间隔======     ==时间，我们就可以计算出此时无偏差时应该显示的时间。然后将当前的真实时间与这个时间相减，这样我们就可以得到时间的偏======     ==差大小，因此我们在设置下一个定时器的间隔大小的时候，我们就从间隔时间中减去这个偏差大小，以此来实现由于程序执行所======     ==造成的时间误差的纠正。======
==详细资料可以参考：== ==《JavaScript 前端倒计时纠偏实现》==
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
