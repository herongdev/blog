---
title: "js节流函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "节流： 节流函数允许一个函数在规定的时间内只执行一次。 自己理解：高频事件触发时，会不断调用函数，但调用的频率由我们控制。 两者区别： 防抖只有高频事件停止后才会调用函数； 节流在高频事件触发的过程中会不断调用函数，但在规定时间内只会执行一次。 比如在页面的无限加载场景下，我们需。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js节流函数.md"
---
::: v-pre

# js节流函数

> 本节目标：理解“js节流函数”的核心思路，并能把它用于实际开发或面试表达。
**节流：**
节流函数允许一个函数在规定的时间内只执行一次。
自己理解：高频事件触发时，会不断调用函数，但调用的频率由我们控制。
两者区别：

- 防抖只有高频事件停止后才会调用函数；
- 节流在高频事件触发的过程中会不断调用函数，但在规定时间内只会执行一次。

比如在页面的无限加载场景下，我们需要用户在滚动页面时，**每隔一段时间发一次** `Ajax` **请求，而不是在用户停下滚动页面操作时才去请求数据**。
主要有两种实现方法：

- 时间戳
- 定时器

**时间戳实现**：
var throttle = function (func, delay) \{
    var prev = Date.now();
    return function () \{
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev \>= delay) \{
            func.apply(context, args);
            prev = Date.now();
        \}
    \}
\}

**定时器实现：**
当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行；直到`delay`秒后，定时器执行执行函数，清空定时器，这样就可以设置下个定时器。
var throttle = function (func, delay) \{
    var timer = null;
    return funtion()\{
        var context = this;
        var args = arguments;
        if (!timer) \{
            timer = setTimeout(function () \{
                func.apply(context, args);
                timer = null;
            \}, delay);
        \}
    \}
\}

- 当第一次触发事件时，肯定不会立即执行函数，而是在`delay`秒后才执行。
- 之后[连续不断](https://www.baidu.com/s?wd=%E8%BF%9E%E7%BB%AD%E4%B8%8D%E6%96%AD&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)触发事件，也会每`delay`秒执行一次。
- 当最后一次停止触发后，由于定时器的`delay`延迟，可能还会执行一次函数。

可以综合使用时间戳与定时器，完成一个事件触发时立即执行，触发完毕还能执行一次的节流函数：
var throttle = function (func, delay) \{
    var timer = null;
    var startTime = Date.now();
    return function () \{
        var curTime = Date.now();
        var remaining = delay - (curTime - startTime);
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        if (remaining \<= 0) \{
            func.apply(context, args);
            startTime = Date.now();
        \} else \{
            timer = setTimeout(func, remaining);
        \}
    \}
\}
需要在每个`delay`时间中一定会执行一次函数，因此在节流函数内部使用开始时间、当前时间与`delay`来计算`remaining`，当`remaining\<=0`时表示该执行函数了，如果还没到时间的话就设定在`remaining`时间后再触发。当然在`remaining`这段时间中如果又一次发生事件，那么会取消当前的计时器，并重新计算一个`remaining`来判断当前状态。

:::
