---
title: "js使用Promise封装AJAX请求"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "围绕“js使用Promise封装AJAX请求”整理的概念、示例与实践笔记。"
sidebarWeight: 8
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试/手写/js使用Promise封装AJAX请求.md"
---
::: v-pre

# js使用Promise封装AJAX请求

> 本节目标：理解“js使用Promise封装AJAX请求”的核心思路，并能把它用于实际开发或面试表达。
```
==// promise== ==封装实现：========function getJSON(url) {======  ==//== ==创建一个== ==promise== ==对象======  ==let promise = new Promise(function(resolve, reject) {======    ==let xhr = new XMLHttpRequest();======    ==//== ==新建一个== ==http== ==请求======    ==xhr.open("GET", url, true);======    ==//== ==设置状态的监听函数======    ==xhr.onreadystatechange = function() {======      ==if (this.readyState !== 4) return;======      ==//== ==当请求成功或失败时，改变== ==promise== ==的状态======      ==if (this.status === 200) {======        ==resolve(this.response);======      ==} else {======        ==reject(new Error(this.statusText));======      ==}======    ==};======    ==//== ==设置错误监听函数======    ==xhr.onerror = function() {======      ==reject(new Error(this.statusText));======    ==};======    ==//== ==设置响应的数据类型======    ==xhr.responseType = "json";======    ==//== ==设置请求头信息======    ==xhr.setRequestHeader("Accept", "application/json");======    ==//== ==发送== ==http== ==请求======    ==xhr.send(null);======  ==});======  ==return promise;========}======
```

:::
