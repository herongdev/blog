---
title: "Iterator 和 for...of 循环"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Iterator 的遍历过程 （1）创建一个指针对象，指向当前数据结构的起始位置。 （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。 （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。 （4）不断调用指针对象的next方法，直到它。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Iterator 和 for...of 循环/Iterator 和 for...of 循环.md"
---
::: v-pre

# Iterator 和 for...of 循环

> 本节目标：理解“Iterator 和 for...of 循环”的核心思路，并能把它用于实际开发或面试表达。
```
JavaScript表示集合的数据结构：
```

```
数组（Array）
```

```
对象（Object）
```

```
Map
```

```
Set
```

```
**Iterator****（遍历器）的概念**
遍历器（Iterator）
```

- ```
    对于任意数据结构，可以按
    ```

    ```
    一致的方式
    ```

    ```
    有序地
    ```

    ```
    访问所有成员；
    ```

```
创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
```

Iterator 的遍历过程
（1）创建一个指针对象，指向当前数据结构的起始位置。
（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
也就是说，遍历器对象本质上，就是一个指针对象。

每一次调用next方法，都会返回数据结构的当前成员的信息。
具体来说，就是返回一个包含value和done两个属性的对象。
其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

```
下面是一个模拟next方法返回值的例子。
var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }it.next() // { value: "b", done: false }it.next() // { value: undefined, done: true }
function makeIterator(array) {  var nextIndex = 0;  return {    next: function() {      return nextIndex < array.length ?        {value: array[nextIndex++], done: false} :        {value: undefined, done: true};    }  };}
```

```
**遍历器生成函数**
上面代码定义了一个遍历器生成函数：
```

```
遍历器函数作用就是返回一个遍历器对象。
```

```
**简写**
对于遍历器对象来说，done: false和value: undefined属性都是可以省略的，因此上面的makeIterator函数可以简写成下面的形式。
function makeIterator(array) {  var nextIndex = 0;  return {    next: function() {      return nextIndex < array.length ?        {value: array[nextIndex++]} :        {done: true};    }  };}
```

```
由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。
var it = idMaker();
it.next().value // 0it.next().value // 1it.next().value // 2// ...
function idMaker() {  var index = 0;
return {    next: function() {      return {value: index++, done: false};    }  };}
上面的例子中，遍历器生成函数idMaker，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。
```

```
如果使用 TypeScript 的写法，遍历器接口（Iterable）、指针对象（Iterator）和next方法返回值的规格可以描述如下。
interface Iterable {
    [Symbol.iterator](): Iterator,
}
interface Iterator {
    next(value?: any): IterationResult,
}
interface IterationResult {
    value: any,
    done: boolean,
}
```

:::
