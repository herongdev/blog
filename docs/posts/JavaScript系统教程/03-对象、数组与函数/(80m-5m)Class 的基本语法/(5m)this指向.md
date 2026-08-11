---
title: "this指向"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“this指向”整理的概念、示例与实践笔记。"
sidebarWeight: 158
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(5m)this指向.md"
---
::: v-pre

# this指向

> 本节目标：理解“this指向”的核心思路，并能把它用于实际开发或面试表达。
```
类的方法内部如果含有this，它默认指向类的实例。
但单独使用类原型上的方法时，很可能报错，原因是this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined）。
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }
    print(text) {
        console.log(text);
    }
}
const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

```
解决方法
一、在构造方法中绑定this，这样就不会找不到print方法了。
class Logger {  constructor() {    this.printName = this.printName.bind(this);  }
// ...}
```

```
二、使用箭头函数。
class Obj {  constructor() {    this.getThis = () => this;  }}
const myObj = new Obj();myObj.getThis() === myObj // true
箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。
```

```
三、还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
}
const logger = selfish(new Logger());
```

:::
