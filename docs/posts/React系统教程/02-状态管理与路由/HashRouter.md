---
title: "HashRouter"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "状态管理与路由"
description: "利用 hash 实现路由切换。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/HashRouter.md"
---
::: v-pre

# HashRouter

> 本节目标：理解“HashRouter”的核心思路，并能把它用于实际开发或面试表达。
利用`hash`实现路由切换

```
Public\hash.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hash</title>
</head>
<body>
    <ul>
        <li><a href="#/a">/a</a></li>
        <li><a href="#/b">/b</a></li>
    </ul>
    <div id="root"></div>
    <script>
        window.addEventListener('hashchange',()=>{
            console.log(window.location.hash);
            let pathname = window.location.hash.slice(1);
            document.getElementById('root').innerHTML = pathname;
        });
    </script>
</body>
</html>
```

:::
