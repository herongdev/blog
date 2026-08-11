---
title: "Generator.prototype.return()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Generator.prototype.return()”整理的概念、示例与实践笔记。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/Generator.prototype.return().md"
---
::: v-pre

# Generator.prototype.return()

> 本节目标：理解“Generator.prototype.return()”的核心思路，并能把它用于实际开发或面试表达。
```
Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
function* gen() {  yield 1;  yield 2;  yield 3;}
var g = gen();
g.next()        // { value: 1, done: false }g.return('foo') // { value: "foo", done: true }g.next()        // { value: undefined, done: true }
上面代码中，遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。并且，Generator 函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。
如果return方法调用时，不提供参数，则返回值的value属性为undefined。
function* gen() {  yield 1;  yield 2;  yield 3;}
var g = gen();
g.next()        // { value: 1, done: false }g.return() // { value: undefined, done: true }
如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。
function* numbers () {  yield 1;  try {    yield 2;    yield 3;  } finally {    yield 4;    yield 5;  }  yield 6;}var g = numbers();g.next() // { value: 1, done: false }g.next() // { value: 2, done: false }g.return(7) // { value: 4, done: false }g.next() // { value: 5, done: false }g.next() // { value: 7, done: true }
上面代码中，调用return()方法后，就开始执行finally代码块，不执行try里面剩下的代码了，然后等到finally代码块执行完，再返回return()方法指定的返回值。
```

:::
