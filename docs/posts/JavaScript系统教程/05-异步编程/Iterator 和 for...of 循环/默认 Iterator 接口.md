---
title: "默认 Iterator 接口"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可。"
sidebarWeight: 28
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Iterator 和 for...of 循环/默认 Iterator 接口.md"
---
::: v-pre

# 默认 Iterator 接口

> 本节目标：理解“默认 Iterator 接口”的核心思路，并能把它用于实际开发或面试表达。
一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。

```
**S****ymbol.iterator**
至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。
Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。
const obj = {  [Symbol.iterator] : function () {    return {      next: function () {        return {          value: 1,          done: true        };      }    };  }};
上面代码中，对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。
```

**原生具备** **Iterator** **接口的数据结构**
有些数据结构原生部署了Symbol.iterator属性，另外一些数据结构没有（比如对象）。具体如下：

```
Array
```

```
TypedArray
```

- ```
    类数组
    ```

    ```
    函数的 arguments 对象
    ```

    ```
    NodeList 对象
    ```

```
Map
```

```
Set
```

```
String
```

```
下面的例子是数组的Symbol.iterator属性。
let arr = ['a', 'b', 'c'];let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }iter.next() // { value: 'b', done: false }iter.next() // { value: 'c', done: false }iter.next() // { value: undefined, done: true }
```

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

```
一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
class RangeIterator {  constructor(start, stop) {    this.value = start;    this.stop = stop;  }
[Symbol.iterator]() { return this; }
next() {    var value = this.value;    if (value < this.stop) {      this.value++;      return {done: false, value: value};    }    return {done: true, value: undefined};  }}
function range(start, stop) {  return new RangeIterator(start, stop);}
for (var value of range(0, 3)) {  console.log(value); // 0, 1, 2}
上面代码是一个类部署 Iterator 接口的写法。Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象。
```

```
下面是通过遍历器实现指针结构的例子。
function Obj(value) {  this.value = value;  this.next = null;}
Obj.prototype[Symbol.iterator] = function() {  var iterator = { next: next };
    var current = this;
  function next() {    if (current) {      var value = current.value;      current = current.next;      return { done: false, value: value };    } else {      return { done: true };    }  }  return iterator;}
var one = new Obj(1);var two = new Obj(2);var three = new Obj(3);
one.next = two;two.next = three;
for (var i of one){  console.log(i); // 1, 2, 3}
上面代码首先在构造函数的原型链上部署Symbol.iterator方法，调用该方法会返回遍历器对象iterator，调用该对象的next方法，在返回一个值的同时，自动将内部指针移到下一个实例。
下面是另一个为对象添加 Iterator 接口的例子。
let obj = {  data: [ 'hello', 'world' ],  [Symbol.iterator]() {    const self = this;    let index = 0;    return {      next() {        if (index < self.data.length) {          return {            value: self.data[index++],            done: false          };        } else {          return { value: undefined, done: true };        }      }    };  }};
```

```
对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];// 或者NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')] // 可以执行了
NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的Symbol.iterator属性，可以看到没有任何影响。
下面是另一个类似数组的对象调用数组的Symbol.iterator方法的例子。
let iterable = {  0: 'a',  1: 'b',  2: 'c',  length: 3,  [Symbol.iterator]: Array.prototype[Symbol.iterator]};for (let item of iterable) {  console.log(item); // 'a', 'b', 'c'}
注意，普通对象部署数组的Symbol.iterator方法，并无效果。
let iterable = {  a: 'a',  b: 'b',  c: 'c',  length: 3,  [Symbol.iterator]: Array.prototype[Symbol.iterator]};for (let item of iterable) {  console.log(item); // undefined, undefined, undefined}
如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。
var obj = {};
obj[Symbol.iterator] = () => 1;
[...obj] // TypeError: [] is not a function
上面代码中，变量obj的Symbol.iterator方法对应的不是遍历器生成函数，因此报错。
有了遍历器接口，数据结构就可以用for...of循环遍历（详见下文），也可以使用while循环遍历。
var $iterator = ITERABLE[Symbol.iterator]();var $result = $iterator.next();while (!$result.done) {  var x = $result.value;  // ...  $result = $iterator.next();}
上面代码中，ITERABLE代表某种可遍历的数据结构，$iterator是它的遍历器对象。遍历器对象每次移动指针（next方法），都检查一下返回值的done属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（next方法），不断循环。
```

```
可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。
var str = new String("hi");
[...str] // ["h", "i"]
str[Symbol.iterator] = function() {  return {    next: function() {      if (this._first) {        this._first = false;        return { value: "bye", done: false };      } else {        return { done: true };      }    },    _first: true  };};
[...str] // ["bye"]str // "hi"
上面代码中，字符串 str 的Symbol.iterator方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。
```

当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

:::
