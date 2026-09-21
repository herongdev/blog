---
title: "promise的then的方法的第二个参数中处理错误和使用then().catch"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "在promise的then的方法的第二个参数中处理错误和使用then().catch来处理错误有什么区别 在使用 Promise 时，你可以选择在 then 的第二个参数中处理错误或者使用链式的 .catch。这两种方法都可以捕获错误，但它们的行为略有不同。 1. then 的第。"
sidebarWeight: 125
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/错误处理/promise的then的方法的第二个参数中处理错误和使用then().catch.md"
---
::: v-pre

# promise的then的方法的第二个参数中处理错误和使用then().catch

> 本节目标：理解“promise的then的方法的第二个参数中处理错误和使用then().catch”的核心思路，并能把它用于实际开发或面试表达。
在promise的then的方法的第二个参数中处理错误和使用then().catch来处理错误有什么区别

在使用 Promise 时，你可以选择在 then 的第二个参数中处理错误或者使用链式的 .catch。这两种方法都可以捕获错误，但它们的行为略有不同。

1. then 的第二个参数处理错误
当你这样做：

somePromise .then(result=\>\{ // handle result\}, error=\>\{ // handle error\});
这里的错误处理只会捕获 somePromise 的错误。如果在处理结果的 then 回调中抛出一个错误，这个错误不会被这个错误处理器捕获。

2. 使用 .catch 处理错误
当你使用 .catch：
somePromise .then(result=\>\{ // handle resultthrownewError('Oops'); \}) .catch(error=\>\{ // handle error\});
这里的 .catch 将会捕获 somePromise 的错误，也会捕获上一个 .then 的回调中抛出的任何错误。
主要区别：

- 使用 then 的第二个参数仅处理该 Promise 的错误。它不会处理此回调之后的任何新产生的错误。
- 使用 .catch 会捕获该错误处理器之前的所有错误，包括前一个 .then 中产生的错误。

通常，为了代码的清晰性和确保所有的潜在错误都被捕获，建议使用 .catch 方法进行错误处理。这可以确保你不会遗漏任何潜在的错误，并且代码结构更为清晰和一致。

:::
