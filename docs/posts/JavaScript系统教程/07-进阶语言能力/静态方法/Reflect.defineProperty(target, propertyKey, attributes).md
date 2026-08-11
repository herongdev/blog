---
title: "Reflect.defineProperty(target, propertyKey, attributes)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Reflect.defineProperty(target, propertyKey, attributes)”整理的概念、示例与实践笔记。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/静态方法/Reflect.defineProperty(target, propertyKey, attributes).md"
---
::: v-pre

# Reflect.defineProperty(target, propertyKey, attributes)

> 本节目标：理解“Reflect.defineProperty(target, propertyKey, attributes)”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
function MyDate() {  /*…*/}
// 旧写法Object.defineProperty(MyDate, 'now', {  value: () => Date.now()});
// 新写法Reflect.defineProperty(MyDate, 'now', {  value: () => Date.now()});
如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。
这个方法可以与Proxy.defineProperty配合使用。
const p = new Proxy({}, {  defineProperty(target, prop, descriptor) {    console.log(descriptor);    return Reflect.defineProperty(target, prop, descriptor);  }});
p.foo = 'bar';// {value: "bar", writable: true, enumerable: true, configurable: true}
p.foo // "bar"
上面代码中，Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成了赋值。
```

:::
