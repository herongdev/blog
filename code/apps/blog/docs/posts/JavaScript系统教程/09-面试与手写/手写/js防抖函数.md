---
title: "js防抖函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "一些高频事件，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能。 对这类事件要进行防抖动或者节流处理 高见高频事件： 鼠标的 scroll,resize,mouseomove touchMove input 的 onchange/oninput 防。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js防抖函数.md"
---
::: v-pre

# js防抖函数

> 本节目标：理解“js防抖函数”的核心思路，并能把它用于实际开发或面试表达。
一些高频事件，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能。
对这类事件要进行防抖动或者节流处理
高见高频事件：

- 鼠标的`scroll,resize,mouseomove`
- `touchMove`
- `input`的`onchange/oninput`

**防抖动**
它的做法是限制下次函数调用之前必须等待的时间间隔。正确实现 `debouncing` 的方法是将若干个函数调用合成一次，并在给定时间过去之后仅被调用一次。
高频事件不断触发时不调用，等高频事件停止触发后，在指定的时间后调用一次。

```
// 函数防抖的实现
function debounce(fn, wait) {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
注意对this的处理：
debounce方法返回一个函数，如果这个函数是在特定的环境中执行，我们希望传入的fn函数也是在这个环境下执行，即同this指向；
```

```
**箭头函数绑定****this**
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
```

```
测试：
function f() {
  console.log(this.name);
}
const fb = debounce(f, 1000);
fb.call({ name: 'hr' });
```

```
// 当用户滚动时被调用的函数
function foo() {
    console.log('You are scrolling!');
}
// 在 debounce 中包装我们的函数，过 2 秒触发一次
let elem = document.getElementById('container');
elem.addEventListener('scroll', debounce(foo, 2000));
```

[更进一步](https://www.baidu.com/s?wd=%E6%9B%B4%E8%BF%9B%E4%B8%80%E6%AD%A5&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)，我们不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 `n` 秒后，才可以重新触发执行。
这里增加一个`immediate`参数来设置是否要立即执行：
function debounce(func, delay, immediate) \{
    var timer = null;
    return function () \{
        var context = this;
        var args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) \{
            //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
            var doNow = !timer;
            //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
            timer = setTimeout(function () \{
                timer = null;
            \}, delay);
            //立即执行
            if (doNow) \{
                func.apply(context, args);
            \}
        \} else \{
            timer = setTimeout(function () \{
                func.apply(context, args);
            \}, delay);
        \}
    \}
\}

:::
