---
title: "set()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "set方法用来拦截某个属性的赋值操作； 参数：可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选。 应用举例 一、利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/set().md"
---
::: v-pre

# set()

> 本节目标：理解“set()”的核心思路，并能把它用于实际开发或面试表达。
set方法用来拦截某个属性的赋值操作；
参数：可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选。

```
假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
    }
};
let person = new Proxy({}, validator);
person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。
```

**应用举例**
一、利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。

```
二、定义内部属性
有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
const handler = {
    get(target, key) {
        invariant(key, 'get');
        return target[key];
    },
    set(target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};
function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
  // Error: Invalid attempt to set private "_prop" property
上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
```

```
**第四个参数**
下面是set方法第四个参数的例子。
const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = receiver;  }};const proxy = new Proxy({}, handler);proxy.foo = 'bar';proxy.foo === proxy // true
上面代码中，set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身，请看下面的例子。
const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = receiver;  }};const proxy = new Proxy({}, handler);const myObj = {};Object.setPrototypeOf(myObj, proxy);
myObj.foo = 'bar';myObj.foo === myObj // true
上面代码中，设置myObj.foo属性的值时，myObj并没有foo属性，因此引擎会到myObj的原型链去找foo属性。myObj的原型对象proxy是一个 Proxy 实例，设置它的foo属性会触发set方法。这时，第四个参数receiver就指向原始赋值行为所在的对象myObj。
注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。
const obj = {};Object.defineProperty(obj, 'foo', {  value: 'bar',  writable: false,});
const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = 'baz';  }};
const proxy = new Proxy(obj, handler);proxy.foo = 'baz';proxy.foo // "bar"
上面代码中，obj.foo属性不可写，Proxy 对这个属性的set代理将不会生效。
注意，严格模式下，set代理如果没有返回true，就会报错。
'use strict';const handler = {  set: function(obj, prop, value, receiver) {    obj[prop] = receiver;   // 无论有没有下面这一行，都会报错    return false;  }};const proxy = new Proxy({}, handler);proxy.foo = 'bar';// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
上面代码中，严格模式下，set代理返回false或者undefined，都会报错。
```

:::
