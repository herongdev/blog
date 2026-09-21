---
title: "Proxy.revocable()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "围绕“Proxy.revocable()”整理的概念、示例与实践笔记。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Proxy/Proxy 实例的方法/Proxy.revocable().md"
---
::: v-pre

# Proxy.revocable()

> 本节目标：理解“Proxy.revocable()”的核心思路，并能把它用于实际开发或面试表达。
```
Proxy.revocable方法返回一个可取消的 Proxy 实例。
let target = {};let handler = {};
let {proxy, revoke} = Proxy.revocable(target, handler);
proxy.foo = 123;proxy.foo // 123
revoke();proxy.foo // TypeError: Revoked
Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。
Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
```

:::
