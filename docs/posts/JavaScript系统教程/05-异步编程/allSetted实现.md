---
title: "allSetted实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "// polyfills.js if (!Promise.allSettled) \\{ Promise.allSettled function (promises) \\{ return new Promise(function (resolve) \\{ if (!Array.is。"
sidebarWeight: 47
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/allSetted实现.md"
---
::: v-pre

# allSetted实现

> 本节目标：理解“allSetted实现”的核心思路，并能把它用于实际开发或面试表达。
// polyfills.js
if (!Promise.allSettled) \{
Promise.allSettled = function (promises) \{
return new Promise(function (resolve) \{
if (!Array.isArray(promises)) \{
return resolve([]);
\}
var results = [];
var completed = 0;
for (let i = 0; i \< promises.length; i++) \{
promises[i]
.then(function (value) \{
results[i] = \{ status: "fulfilled", value: value \};
if (++completed === promises.length) \{
return resolve(results);
\}
\})
.catch(function (reason) \{
results[i] = \{ status: "rejected", reason: reason \};
if (++completed === promises.length) \{
return resolve(results);
\}
\});
\}
\});
\};
\}
export default null;

:::
