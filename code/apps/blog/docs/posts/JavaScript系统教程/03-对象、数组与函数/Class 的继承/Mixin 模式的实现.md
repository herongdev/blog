---
title: "Mixin 模式的实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "\\ 来自。"
sidebarWeight: 175
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/Class 的继承/Mixin 模式的实现.md"
---
::: v-pre

# Mixin 模式的实现

> 本节目标：理解“Mixin 模式的实现”的核心思路，并能把它用于实际开发或面试表达。
```
Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
const a = {  a: 'a'};const b = {  b: 'b'};const c = {...a, ...b}; // {a: 'a', b: 'b'}
上面代码中，c对象是a对象和b对象的合成，具有两者的接口。
```

```
下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。
function mix(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
    }
    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mix;
}
```

```
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class DistributedEdit extends mix(Loggable, Serializable) {  // ...}
```
 \> 来自

```
 <https://es6.ruanyifeng.com/#docs/class-extends>
```

:::
