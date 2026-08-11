---
title: "Generator.prototype.throw()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Generator.prototype.throw()”整理的概念、示例与实践笔记。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/Generator.prototype.throw().md"
---
::: v-pre

# Generator.prototype.throw()

> 本节目标：理解“Generator.prototype.throw()”的核心思路，并能把它用于实际开发或面试表达。
```
Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
var g = function* () {  try {    yield;  } catch (e) {    console.log('内部捕获', e);  }};
var i = g();i.next();
try {  i.throw('a');  i.throw('b');} catch (e) {  console.log('外部捕获', e);}// 内部捕获 a// 外部捕获 b
上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
```

```
throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
var g = function* () {  try {    yield;  } catch (e) {    console.log(e);  }};
var i = g();i.next();i.throw(new Error('出错了！'));// Error: 出错了！(…)
注意，不要混淆遍历器对象的throw方法和全局的throw命令。上面代码的错误，是用遍历器对象的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获。
var g = function* () {  while (true) {    try {      yield;    } catch (e) {      if (e != 'a') throw e;      console.log('内部捕获', e);    }  }};
var i = g();i.next();
try {  throw new Error('a');  throw new Error('b');} catch (e) {  console.log('外部捕获', e);}// 外部捕获 [Error: a]
上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。
```

```
如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
var g = function* () {  while (true) {    yield;    console.log('内部捕获', e);  }};
var i = g();i.next();
try {  i.throw('a');  i.throw('b');} catch (e) {  console.log('外部捕获', e);}// 外部捕获 a
上面代码中，Generator 函数g内部没有部署try...catch代码块，所以抛出的错误直接被外部catch代码块捕获。
如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。
var gen = function* gen(){  yield console.log('hello');  yield console.log('world');}
var g = gen();g.next();g.throw();// hello// Uncaught undefined
上面代码中，g.throw抛出错误以后，没有任何try...catch代码块可以捕获这个错误，导致程序报错，中断执行。
```

```
throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
function* gen() {  try {    yield 1;  } catch (e) {    console.log('内部捕获');  }}
var g = gen();g.throw(1);// Uncaught 1
上面代码中，g.throw(1)执行时，next方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。这种行为其实很好理解，因为第一次执行next方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时throw方法抛错只可能抛出在函数外部。
```

```
throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
var gen = function* gen(){  try {    yield console.log('a');  } catch (e) {    // ...  }  yield console.log('b');  yield console.log('c');}
var g = gen();g.next() // ag.throw() // bg.next() // c
上面代码中，g.throw方法被捕获以后，自动执行了一次next方法，所以会打印b。另外，也可以看到，只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历。
另外，throw命令与g.throw方法是无关的，两者互不影响。
var gen = function* gen(){  yield console.log('hello');  yield console.log('world');}
var g = gen();g.next();
try {  throw new Error();} catch (e) {  g.next();}// hello// world
上面代码中，throw命令抛出的错误不会影响到遍历器的状态，所以两次执行next方法，都进行了正确的操作。
这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield表达式，可以只用一个try...catch代码块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次catch语句就可以了。
Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
function* foo() {  var x = yield 3;  var y = x.toUpperCase();  yield y;}
var it = foo();
it.next(); // { value:3, done:false }
try {  it.next(42);} catch (err) {  console.log(err);}
上面代码中，第二个next方法向函数体内传入一个参数 42，数值是没有toUpperCase方法的，所以会抛出一个 TypeError 错误，被函数体外的catch捕获。
一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
function* g() {  yield 1;  console.log('throwing an exception');  throw new Error('generator broke!');  yield 2;  yield 3;}
function log(generator) {  var v;  console.log('starting generator');  try {    v = generator.next();    console.log('第一次运行next方法', v);  } catch (err) {    console.log('捕捉错误', v);  }  try {    v = generator.next();    console.log('第二次运行next方法', v);  } catch (err) {    console.log('捕捉错误', v);  }  try {    v = generator.next();    console.log('第三次运行next方法', v);  } catch (err) {    console.log('捕捉错误', v);  }  console.log('caller done');}
log(g());// starting generator// 第一次运行next方法 { value: 1, done: false }// throwing an exception// 捕捉错误 { value: 1, done: false }// 第三次运行next方法 { value: undefined, done: true }// caller done
上面代码一共三次运行next方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。
```

:::
