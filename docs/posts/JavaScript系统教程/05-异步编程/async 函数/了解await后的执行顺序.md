---
title: "了解await后的执行顺序"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "同时将计算await后的表达式给副线程处理，并在有结果时，将计算await表达式的的值的任务放入当前宏任务的微任务队列中。此时，由于Promise.resolve(8)是一个立即可以得出结果的表达式，于是微任务队列中前立即被加入了计算await Promise.resolve(8。"
sidebarWeight: 55
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/async 函数/了解await后的执行顺序.md"
---
::: v-pre

# 了解await后的执行顺序

> 本节目标：理解“了解await后的执行顺序”的核心思路，并能把它用于实际开发或面试表达。
```
async function foo() {
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
}
async function bar() {
    console.log(4);
    console.log(await 6);
    console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
```

```
人个解释：
执行当前宏任务：
console.log(1);
打印出1；
```

```
执行函数foo()，执行代码：console.log(2)，
打印出2；
```

```
执行console.log(await Promise.resolve(8))时，
```

```
碰到await关键字，让出主线程；
```

同时将计算await后的表达式给副线程处理，并在有结果时，将计算await表达式的的值的任务放入当前宏任务的微任务队列中。此时，由于Promise.resolve(8)是一个立即可以得出结果的表达式，于是微任务队列中前立即被加入了计算await Promise.resolve(8) 表达式值微任务。

|   |
|---|
```
宏任务1
```
```
console.log(1);
console.log(2);
console.log(await Promise.resolve(8));// 让出线程，暂停
```text
|
```
微任务
```
```
（立即入列）计算await Promise.resolve(8)并执行之后代码
```

```
主线程继续执行：
console.log(3)；
```

```
进入函数bar()，执行代码
console.log(4);
```

```
碰到await关键字：console.log(await 6);
```

```
出让主线程；
```

```
将计算await后表达式的值交组副线程；
```

```
在计算得到结果后，将一个任务放入微任务队列；
```

由于计算6的值马上得到结果，于是计算await 表达式的值的任务被立即放入了微任务队列；

主线程继续执行：console.log(5)，到此为止，主线程上的任务全部执行完毕，现在任务队列如下图所示：

|   |   |
|---|---|
```
宏任务1
```
```
console.log(1);
console.log(2);
console.log(await Promise.resolve(8));// 让出线程，暂停
console.log(3);
console.log(4);
console.log(await 6);
// 让出主线程，暂停
console.log(5);
```text
|
```
微任务
```
```
（立即入列）计算await Promise.resolve(8);并执行之后代码
（立即入列）计算await 6;并执行之后代码；
```text
|

```
开始执行微任务：
```

```
计算await Promise.resolve(8)，即把Promise.resolve(8)表达式的值传给await，得到了值为8；
```

```
await求值完毕，继续执行await后面的代码：console.log(9);
```

```
foo函数出栈；
```

```
执行微任务await 6，即把6传给await,得到值为6；
```

```
await求值完毕，继续执行await后面的代码：console.log(7);
```

```
代码全部执行完毕，得到结果为：
1，2，3，4，5，8，9，6，7
```

:::
