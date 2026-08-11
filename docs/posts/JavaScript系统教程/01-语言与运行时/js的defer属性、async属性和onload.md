---
title: "js的defer属性、async属性和onload"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "围绕“js的defer属性、async属性和onload”整理的概念、示例与实践笔记。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/js的defer属性、async属性和onload.md"
---
::: v-pre

# js的defer属性、async属性和onload

> 本节目标：理解“js的defer属性、async属性和onload”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
首先看一下defer和async属性与html解析的时间关系
```

```
js的onload事件的加载时机是在js脚本下载并且执行完毕后，才会触发
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        var el = document.createElement('script')
        el.async = true
        el.type = 'text/javascript'
        el.src = './test.js'
        el.onload = function () {
            console.log('async加载完了')
        }
        document.head.appendChild(el)
    </script>
</body>
</html>
```

```
./test.js
console.log('async javasciprt')
```

```
打印结果
async javasciprt
async加载完了
```

:::
