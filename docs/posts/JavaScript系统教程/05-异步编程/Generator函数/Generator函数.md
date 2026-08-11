---
title: "Generator函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。 返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。 正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/Generator函数.md"
---
::: v-pre

# Generator函数

> 本节目标：理解“Generator函数”的核心思路，并能把它用于实际开发或面试表达。
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

```
**语法上：**
```

```
是状态机，封装了多个内部状态。
```

```
是遍历器对象生成函数，会返回一个遍历器对象。
```

返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。

```
**形式上：**Generator 函数是一个普通函数，但是有两个特征：
```

function关键字与函数名之间有一个星号，function关键字与函数名之间的星号没有明确规定。

```
function * foo(x, y) { ··· }function *foo(x, y) { ··· }function* foo(x, y) { ··· }function*foo(x, y) { ··· }
```

```
函数体内部使用yield表达式，定义不同的内部状态；
```

```
function* helloWorldGenerator() {  yield 'hello';  yield 'world';  return 'ending';}
var hw = helloWorldGenerator();
```

```
该函数有三个状态：hello，world 和 return 语句（结束执行）。
```

```
**调用：**
```

```
调用Generator函数会返回一个遍历器对象（Iterator Object）。
```

必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。

```
换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
hw.next()// { value: 'hello', done: false }
hw.next()// { value: 'world', done: false }
hw.next()// { value: 'ending', done: true }
hw.next()// { value: undefined, done: true }
上面代码一共调用了四次next方法。
第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。
第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。
第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。
第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。
```

```
总结一下：
```

执行Generator函数会返回一个遍历器对象。但Generator内的代码并不会执行，直到调用遍历器对象的next方法为止；

以后每次调用遍历器对象的next方法，就会返回函数内部的每一个状态值，这个状态值是一个对象，包含着value和done两个属性。比方说第一次调用，会开始执行函数内部的代码，同时还会执行第一个yield后的表达式，然后停止执行；并不会执行yield后面表达式之后到第二个yield表达式之前的代码；

value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

:::
