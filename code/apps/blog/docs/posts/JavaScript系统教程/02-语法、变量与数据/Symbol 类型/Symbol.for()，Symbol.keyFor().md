---
title: "Symbol.for()，Symbol.keyFor()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "Symbol.for() 与 Symbol() 相同：这两种写法，都会生成新的 Symbol。 区别：前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。"
sidebarWeight: 62
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/Symbol 类型/Symbol.for()，Symbol.keyFor().md"
---
::: v-pre

# Symbol.for()，Symbol.keyFor()

> 本节目标：理解“Symbol.for()，Symbol.keyFor()”的核心思路，并能把它用于实际开发或面试表达。
```
Symbol.for()接受一个字符串作为参数，然后搜索有没有以该参数作为描述的Symbol值。如果有，就返回这个Symbol值，否则就新建一个以该字符串为描述的Symbol值，并将其注册到全局。利用这点，我们可以重新使用同一个Symbol值。
let s1 = Symbol.for('foo');let s2 = Symbol.for('foo');
s1 === s2 // true
上面代码中，s1和s2都是 Symbol 值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值。
```

**Symbol.for()****与****Symbol()**
相同：这两种写法，都会生成新的 Symbol。
区别：前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。
Symbol.for("bar") === Symbol.for("bar")// true
Symbol("bar") === Symbol("bar")// false
上面代码中，由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。

```
**Symbol.keyFor()**
该方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");Symbol.keyFor(s2) // undefined
上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined。
```

```
**Symbol****值****登记的名字，是全局环境的**
Symbol.for()为Symbol值登记的名字，是全局环境的，不管有没有在全局环境运行。
function foo() {  return Symbol.for('bar');}
const x = foo();const y = Symbol.for('bar');console.log(x === y); // true
上面代码中，Symbol.for('bar')是函数内部运行的，但是生成的Symbol值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值。
```

```
Symbol.for()的这个全局登记特性，可以用在不同的iframe或service worker中取到同一个值。
iframe = document.createElement('iframe');iframe.src = String(window.location);document.body.appendChild(iframe);
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')// true
上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。
```

:::
