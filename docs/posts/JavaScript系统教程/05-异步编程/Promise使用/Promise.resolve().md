---
title: "Promise.resolve()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Promise.resolve()方法可以将现有对象转为 Promise 对象。 Promise.resolve()等价于下面的写法。 Promise.resolve('foo')// 等价于new Promise(resolve \\ resolve('foo'))。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise使用/Promise.resolve().md"
---
::: v-pre

# Promise.resolve()

> 本节目标：理解“Promise.resolve()”的核心思路，并能把它用于实际开发或面试表达。
Promise.resolve()方法可以将现有对象转为 Promise 对象。
Promise.resolve()等价于下面的写法。
Promise.resolve('foo')// 等价于new Promise(resolve =\> resolve('foo'))

```
**参数：分四种情况**
**一、参数是一个** **Promise** **实例：**如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
**二、参数是一个**thenable**对象，**thenable对象指的是具有then方法的对象，比如下面这个对象。
let thenable = {  then: function(resolve, reject) {    resolve(42);  }};
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
let thenable = {  then: function(resolve, reject) {    resolve(42);  }};
let p1 = Promise.resolve(thenable);p1.then(function(value) {  console.log(value);  // 42});
上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。
```

```
**三、参数不是具有**then**方法的对象，或根本就不是对象**
如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
const p = Promise.resolve('Hello');
p.then(function (s){  console.log(s)});// Hello
上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。
```

```
**四、不带有任何参数**
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
const p = Promise.resolve();
p.then(function () {  // ...});
上面代码的变量p就是一个 Promise 对象。
```

```
需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
setTimeout(function () {  console.log('three');}, 0);
Promise.resolve().then(function () {  console.log('two');});
console.log('one');
// one// two// three
上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
```

:::
