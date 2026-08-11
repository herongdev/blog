---
title: "Generator 函数的this"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "围绕“Generator 函数的this”整理的概念、示例与实践笔记。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Generator函数/Generator 函数的this.md"
---
::: v-pre

# Generator 函数的this

> 本节目标：理解“Generator 函数的this”的核心思路，并能把它用于实际开发或面试表达。
```
Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
function* g() {}
g.prototype.hello = function () {  return 'hi!';};
let obj = g();
obj instanceof g // trueobj.hello() // 'hi!'
上面代码表明，Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
function* g() {  this.a = 11;}
let obj = g();obj.next();obj.a // undefined
上面代码中，Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。
Generator 函数也不能跟new命令一起用，会报错。
function* F() {  yield this.x = 2;  yield this.y = 3;}
new F()// TypeError: F is not a constructor
上面代码中，new命令跟构造函数F一起使用，结果报错，因为F不是构造函数。
那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？
下面是一个变通方法。首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。
function* F() {  this.a = 1;  yield this.b = 2;  yield this.c = 3;}var obj = {};var f = F.call(obj);
f.next();  // Object {value: 2, done: false}f.next();  // Object {value: 3, done: false}f.next();  // Object {value: undefined, done: true}
obj.a // 1obj.b // 2obj.c // 3
上面代码中，首先是F内部的this对象绑定obj对象，然后调用它，返回一个 Iterator 对象。这个对象执行三次next方法（因为F内部有两个yield表达式），完成 F 内部所有代码的运行。这时，所有内部属性都绑定在obj对象上了，因此obj对象也就成了F的实例。
上面代码中，执行的是遍历器对象f，但是生成的对象实例是obj，有没有办法将这两个对象统一呢？
一个办法就是将obj换成F.prototype。
function* F() {  this.a = 1;  yield this.b = 2;  yield this.c = 3;}var f = F.call(F.prototype);
f.next();  // Object {value: 2, done: false}f.next();  // Object {value: 3, done: false}f.next();  // Object {value: undefined, done: true}
f.a // 1f.b // 2f.c // 3
再将F改成构造函数，就可以对它执行new命令了。
function* gen() {  this.a = 1;  yield this.b = 2;  yield this.c = 3;}
function F() {  return gen.call(gen.prototype);}
var f = new F();
f.next();  // Object {value: 2, done: false}f.next();  // Object {value: 3, done: false}f.next();  // Object {value: undefined, done: true}
f.a // 1f.b // 2f.c // 3
```

:::
