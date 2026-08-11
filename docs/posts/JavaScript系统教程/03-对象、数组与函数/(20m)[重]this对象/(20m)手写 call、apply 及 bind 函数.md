---
title: "手写 call、apply 及 bind 函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "然后调用首参数 context.fn() ，这样，相当于在 context 下调用 fn ，那 fn 中的 this 自然就指向了首参数 fn ； 实现 call 方法 call 方法接受一个指定的 this 值和若干个参数，然后调用函数并返回结果。 Function.proto。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(20m)[重]this对象/(20m)手写 call、apply 及 bind 函数.md"
---
::: v-pre

# 手写 call、apply 及 bind 函数

> 本节目标：理解“手写 call、apply 及 bind 函数”的核心思路，并能把它用于实际开发或面试表达。
```
==call====函数实现：==
==思路：==
```

```
==在首参数下新建一个属性====fn====，属性值为====this====，即调用====call====的函数实例；==
```

==然后调用首参数====context.fn()====，这样，相当于在====context====下调用====fn====，那====fn====中的====this====自然就指向了首参数====fn====；==

```
==删除====context====的====fn====属性；==
```

```
==返回执行结果；==
```

```
Function.prototype.myCall = function (context) {
    // 获取参数，所有方法第一步看参数是否合法，多了，少了(没传或少传)
    let args = [...arguments].slice(1),
        result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window;
    // 将调用函数设为对象的方法
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
}
```

```
==apply== ==函数实现==
Function.prototype.myApply = function (context) {
    let result = null;
    context = context || window;
    // 将函数设为对象的方法
    context.fn = this;
    // 调用方法
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    // 将属性删除
    delete context.fn;
    return result;
}
```

```
==bind== ==函数实现==
Function.prototype.myBind = function (context) {
    // 获取参数
    var args = [...arguments].slice(1),
        fn = this;
    return function Fn() {
        // 根据调用方式，传入不同绑定值，函数调用和构造函数调用
        return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments));
    }
}
```

实现 `call` 方法
`call` 方法接受一个指定的 `this` 值和若干个参数，然后调用函数并返回结果。
Function.prototype.myCall = function(context, ...args) \{
// 如果 context 是 null 或 undefined，设为全局对象（浏览器中为 window）
context = context || window;
// 使用 Symbol 确保属性的唯一性，防止覆盖已有属性
const fnSymbol = Symbol();
// 将当前函数（this）作为 context 的属性
context[fnSymbol] = this;
// 调用函数并保存结果
const result = context[fnSymbol](...args);
// 删除临时属性
delete context[fnSymbol];
// 返回结果
return result;
\};
// 示例
function greet() \{
console.log(this.name);
\}
const obj = \{ name: 'Alice' \};
greet.myCall(obj); // 输出: Alice

实现 `apply` 方法
`apply` 方法类似于 `call` 方法，但它接受的是参数数组。
Function.prototype.myApply = function(context, args) \{
// 如果 context 是 null 或 undefined，设为全局对象（浏览器中为 window）
context = context || window;
// 使用 Symbol 确保属性的唯一性，防止覆盖已有属性
const fnSymbol = Symbol();
// 将当前函数（this）作为 context 的属性
context[fnSymbol] = this;
// 调用函数并保存结果
const result = context[fnSymbol](...(args || []));
// 删除临时属性
delete context[fnSymbol];
// 返回结果
return result;
\};
// 示例
function sum(a, b) \{
return a + b;
\}
console.log(sum.myApply(null, [2, 3])); // 输出: 5

实现 `bind` 方法
`bind` 方法返回一个新的函数，这个函数在调用时，会将 `this` 设置为提供的值，并在调用时带上提供的参数。
Function.prototype.myBind = function(context, ...args) \{
const fn = this;
return function(...newArgs) \{
return fn.apply(context, args.concat(newArgs));
\};
\};
// 示例
function multiply(a, b) \{
return a * b;
\}
const multiplyByTwo = multiply.myBind(null, 2);
console.log(multiplyByTwo(5)); // 输出: 10

总结
- **`call`**：将函数的 `this` 设置为指定的对象，并立即执行该函数。
- **`apply`**：将函数的 `this` 设置为指定的对象，并立即执行该函数，参数以数组形式传递。
- **`bind`**：返回一个新的函数，将函数的 `this` 设置为指定的对象，并可选地传入参数，该函数在调用时将带上这些参数。
这些方法的手动实现帮助理解了 JavaScript 函数的 `this` 绑定和参数传递机制。在实际开发中，使用内置的 `call`、`apply` 和 `bind` 方法更为简洁和高效。

:::
