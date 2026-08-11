---
title: "获取url中的查询键值对"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“获取url中的查询键值对”整理的概念、示例与实践笔记。"
sidebarWeight: 116
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-正则/实例/获取url中的查询键值对.md"
---
::: v-pre

# 获取url中的查询键值对

> 本节目标：理解“获取url中的查询键值对”的核心思路，并能把它用于实际开发或面试表达。
```
getUrlParam(key, search = window.location.search) {
  if (!key) {
    let params = {};
    search.replace(/([^=?&]*)=([^&]*)/g, (_, key, value) => {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
      return params;
    });
    return params;
  }
  let pattern = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  let match = search.substr(1).match(pattern);
  return match !== null ? decodeURIComponent(match[2]) : null;
},
```

:::
