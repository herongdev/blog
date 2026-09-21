---
title: "hash和history"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "hash 模式 概念：在URL中符号“ ”以及 后面的字符称之为hash； 读取：用window.location.hash读取； 特点： 对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。 history 模式 history采用HTML5的新特性； 使用两个。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/hash和history.md"
---
::: v-pre

# hash和history

> 本节目标：理解“hash和history”的核心思路，并能把它用于实际开发或面试表达。
**hash****模式**
概念：在URL中符号“#”以及#后面的字符称之为hash；
读取：用window.location.hash读取；
特点：

```
hash虽然在URL中，但不被包括在HTTP请求中；
```

```
用来指导浏览器动作，对服务端安全无用；
```

```
hash改变不会重加载页面。
```

对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

**history****模式**
history采用HTML5的新特性；
使用两个新方法：pushState（），replaceState（）对浏览器历史记录栈进行修改；以及使用popState事件的监听到状态变更。

history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 [http://www.xxx.com/items/id](http://www.xxx.com/items/id)。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。

需要服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

在vue-router中，我们使用history模式时，后端需要做什么处理吗

在 Vue-router 中，当我们使用 history 模式时，后端确实需要进行一些处理。这是因为使用 history.pushState API 更改浏览器地址栏的 URL 不会向服务器发出请求。但是，当用户在浏览器中直接输入一个 URL 时，服务器将收到请求并尝试处理该请求。

为了确保使用 history 模式的单页应用（SPA）能够正常工作，后端需要做以下处理：

对于所有与 Vue 应用相关的路径（例如：/dashboard、/profile 等），无论是直接访问还是通过 Vue-router 导航的路径，后端都应将请求重定向到 Vue 应用的入口文件（通常是 index.html）。
确保后端正确处理静态资源（例如 JavaScript、CSS 和图片文件）的请求，不要将这些请求重定向到 index.html。
配置服务器允许客户端处理 404 错误，即当用户尝试访问一个不存在的路径时，将请求重定向到 index.html。这样，Vue-router 可以自己处理未定义的路由，例如显示一个 404 页面。
以下是在一些流行服务器上实现这种行为的方法：

Nginx:
在 Nginx 配置文件中使用 try_files 指令来重定向所有非静态资源请求到 index.html。
location / \{
try_files $uri $uri/ /index.html;
\}

Apache:
在项目根目录中创建或修改 .htaccess 文件，添加以下配置：
\<IfModule mod_rewrite.c\>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %\{REQUEST_FILENAME\} !-f
RewriteCond %\{REQUEST_FILENAME\} !-d
RewriteRule . /index.html [L]
\</IfModule\>

Express (Node.js):
使用 history() 中间件来处理重定向。
const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();

app.use(history());
app.use(express.static('public'));

app.listen(3000, () =\> \{
console.log('Server is listening on port 3000');
\});
注意：这些示例配置可能需要根据实际项目情况进行调整。

:::
