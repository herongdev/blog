---
title: "yield 表达式"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。 遍历器对象的 next 方法的运行逻辑 （1）遇到yield表达式，会执行yield后面的语句，并将紧跟在yield后。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/yield 表达式.md"
---
::: v-pre

# yield 表达式

> 本节目标：理解“yield 表达式”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。

**遍历器对象的****next****方法的运行逻辑**
（1）遇到yield表达式，会执行yield后面的语句，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值，然后函数停止执行；
（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
（3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

```
需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
function* gen() {  yield  123 + 456;}
上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。
```

```
**y****ield****与****return**
相同处：返回紧跟在语句后面的那个表达式的值。
区别：
```

在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行；

```
而return语句不具备位置记忆的功能，return后函数就退出了。
```

```
只能执行一次（或者说一个）return语句。
```

```
可以执行多次（或者说多个）yield表达式。
```

```
**不用****yield****表达式**
这时就变成了一个单纯的暂缓执行函数。
function* f() {  console.log('执行了！')}
var generator = f();
setTimeout(function () {  generator.next()}, 2000);
只有调用next方法时，函数f才会执行。
```

```
**yield****使用**
yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
(function (){  yield 1;})()// SyntaxError: Unexpected number
在循环中使用yield，如：
var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {  a.forEach(function (item) {    if (typeof item !== 'number') {      yield* flat(item);    } else {      yield item;    }  });};
for (var f of flat(arr)){  console.log(f);}
上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield表达式（这个函数里面还使用了yield*表达式，详细介绍见后文）。一种修改方法是改用for循环。
var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {  var length = a.length;  for (var i = 0; i < length; i++) {    var item = a[i];    if (typeof item !== 'number') {      yield* flat(item);    } else {      yield item;    }  }};
for (var f of flat(arr)) {  console.log(f);}// 1, 2, 3, 4, 5, 6
另外，yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* demo() {  console.log('Hello' + yield); // SyntaxError  console.log('Hello' + yield 123); // SyntaxError
  console.log('Hello' + (yield)); // OK  console.log('Hello' + (yield 123)); // OK}
yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo() {  foo(yield 'a', yield 'b'); // OK  let input = yield; // OK}
```

```
**异步的迭代，只能用递归**
```

**await****后面跟执行器返回的是一个****timer****，没有实际意义；**
**await****后面如果跟普通值** **，会被****Promise.resolve****包装成****promise,****放到任务队列之中**

:::
