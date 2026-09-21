---
title: "Reflect.get()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.get()”整理的概念、示例与实践笔记。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.get().md"
---
::: v-pre

# Reflect.get()

> 本节目标：理解“Reflect.get()”的核心思路，并能把它用于实际开发或面试表达。
```
**Reflect.get(target, name, receiver)**
Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
}
Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

```
如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};
var myReceiverObject = {
    foo: 4,
    bar: 4,
};
Reflect.get(myObject, 'baz', myReceiverObject) // 8
如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错
```

:::
