---
title: "调用 Iterator 接口的场合"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "（ 4 ）其他场合 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Iterator 和 for...of 循环/调用 Iterator 接口的场合.md"
---
::: v-pre

# 调用 Iterator 接口的场合

> 本节目标：理解“调用 Iterator 接口的场合”的核心思路，并能把它用于实际开发或面试表达。
```
**（****1****）解构赋值**
对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;// x='a'; y='b'
let [first, ...rest] = set;// first='a'; rest=['b','c'];
```

```
**（****2****）扩展运算符**
扩展运算符（...）也会调用默认的 Iterator 接口。
// 例一var str = 'hello';[...str] //  ['h','e','l','l','o']
// 例二let arr = ['b', 'c'];['a', ...arr, 'd']// ['a', 'b', 'c', 'd']
这可将任何部署了 Iterator 接口的数据结构，转为数组。
…放在有值的变量前叫扩展运算符。
放在新声明的变量前并放在赋值运算符左边进行赋值，叫解构运算符。
```

```
**（****3****）****yield***
yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
let generator = function* () {  yield 1;  yield* [2,3,4];  yield 5;};
var iterator = generator();
iterator.next() // { value: 1, done: false }iterator.next() // { value: 2, done: false }iterator.next() // { value: 3, done: false }iterator.next() // { value: 4, done: false }iterator.next() // { value: 5, done: false }iterator.next() // { value: undefined, done: true }
```

**（****4****）其他场合**
由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

```
for...of
```

```
Array.from()
```

```
Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
```

```
Promise.all()
```

```
Promise.race()
```

:::
