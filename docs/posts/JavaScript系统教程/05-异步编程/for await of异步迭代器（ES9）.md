---
title: "for await of异步迭代器（ES9）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "异步迭代器 (for await of) ：循环等待每个 Promise 对象变为 resolved 状态才进入下一步。 我们知道 for … of 是同步运行的，有时候一些任务集合是异步的，那这种遍历怎么办呢？ 这里写了几个小任务，分别是 2000ms 、 100ms 、 30。"
sidebarWeight: 63
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/for await of异步迭代器（ES9）.md"
---
::: v-pre

# for await of异步迭代器（ES9）

> 本节目标：理解“for await of异步迭代器（ES9）”的核心思路，并能把它用于实际开发或面试表达。
异步迭代器`(for-await-of)`：循环等待每个`Promise`对象变为`resolved`状态才进入下一步。

我们知道 `for`…`of` 是同步运行的，有时候一些任务集合是异步的，那这种遍历怎么办呢？

```
function Gen(time) {
```

```
 return new Promise(function (resolve, reject) {
```

```
 setTimeout(function () {
```

```
 resolve(time);
```

```
 }, time);
```

```
 });
}
async function test() {
```

```
 let arr = [Gen(2000), Gen(100), Gen(3000)];
```

```
 for (let item of arr) {
```

```
 console.log(Date.now(), item.then(console.log));
```

```
 }
}
test();
// 100
// 2000
// 3000
```
 这里写了几个小任务，分别是 `2000ms` 、`100ms`、`3000ms`后任务结束。在上述遍历的过程中可以看到三个任务是同步启动的，然后输出上也不是按任务的执行顺序输出的，这显然不太符合我们的要求。

聪明的同学一定能想起来 `await` 的作用，它可以中断程序的执行直到这个 `Promise` 对象的状态发生改变，我们修改上面的代码：

```
function Gen(time) {
```

```
 return new Promise(function (resolve, reject) {
```

```
 setTimeout(function () {
```

```
 resolve(time);
```

```
 }, time);
```

```
 });
}
async function test() {
```

```
 let arr = [Gen(2000), Gen(100), Gen(3000)];
```

```
 for (let item of arr) {
```

```
 console.log(Date.now(), await item.then(console.log));
```

```
 }
}
test();
// 1560090138232 Promise {<pending>}
// 1560090138234 Promise {<pending>}
// 1560090138235 Promise {<pending>}
// 100
// 2000
// 3000
```
 从返回值看确实是按照任务的先后顺序进行的，其中原理也有说明是利用了 `await` 中断程序的功能。

在 `ES9` 中也可以用 `for`…`await`…`of` 的语法来操作：

```
function Gen(time) {
```

```
 return new Promise(function (resolve, reject) {
```

```
 setTimeout(function () {
```

```
 resolve(time);
```

```
 }, time);
```

```
 });
}
async function test() {
```

```
 let arr = [Gen(2000), Gen(100), Gen(3000)];
```

```
 for await (let item of arr) {
```

```
 console.log(Date.now(), item);
```

```
 }
}
test();
// 1560092345730 2000
// 1560092345730 100
// 1560092346336 3000
```
 从这个结果来看和第二种写法效果差不多，但是工作原理确完全不同，重点观察下输出的时间（`Chrome Console`）`,` 第二种写法是代码块中有 `await` 导致等待 `Promise` 的状态而不再继续执行；第三种写法是整个代码块都不执行，等待 `arr` 当前的值（`Promise`状态）发生变化之后，才执行代码块的内容。

回想我们之前给数据结构自定义遍历器是同步的，如果想定义适合 `for`…`await`…`of` 的异步遍历器该怎么做呢？答案是 `Symbol.asyncIterator`。

```
let obj = {
```

```
 count: 0,
```

```
 Gen(time) {
```

```
 return new Promise(function (resolve, reject) {
```

```
 setTimeout(function () {
```

```
 resolve({ done: false, value: time });
```

```
 }, time);
```
     `});`
  `},`

```
 [Symbol.asyncIterator]() {
```

```
 let self = this;
```

```
 return {
```

```
 next() {
```

```
 self.count++;
```

```
 if (self.count < 4) {
```

```
 return self.Gen(Math.random() * 1000);
```

```
 } else {
```

```
 return Promise.resolve({
```

```
 done: true,
```

```
 value: "",
```
           `});`
        `}`
      `},`
    `};`

```
 },
};
async function test() {
```

```
 for await (let item of obj) {
```

```
 console.log(Date.now(), item);
```

```
 }
}
// 1560093560200 649.3946561938179
// 1560093560828 624.6310222512955
// 1560093561733 901.9497480464518
```

:::
