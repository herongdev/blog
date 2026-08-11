---
title: "Reflect.set"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.set”整理的概念、示例与实践笔记。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.set.md"
---
::: v-pre

# Reflect.set

> 本节目标：理解“Reflect.set”的核心思路，并能把它用于实际开发或面试表达。
```
**Reflect.set(target, name, value, receiver)**
Reflect.set方法设置target对象的name属性等于value。
var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    },
}
myObject.foo // 1
Reflect.set(myObject, 'foo', 2);
myObject.foo // 2
Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
```

```
**this****绑定**
如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
var myObject = {
    foo: 4,
    set bar(value) {
        return this.foo = value;
    },
};
var myReceiverObject = {
    foo: 0,
};
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```

```
注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。
let p = {
    a: 'a'
};
let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};
let obj = new Proxy(p, handler);
obj.a = 'A';
  // set
  // defineProperty
上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty拦截。这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。
let p = {
    a: 'a'
};
let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};
let obj = new Proxy(p, handler);
obj.a = 'A';
// set
如果第一个参数不是对象，Reflect.set会报错。
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错
```

:::
