---
title: "CDN 链接"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "生产环境： \\<script crossorigin src \"https://unpkg.com/react@16/umd/react.production.min.js\"\\ \\</script\\ \\<script crossorigin src \"https://unpkg.。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/安装/CDN 链接.md"
---
::: v-pre

# CDN 链接

> 本节目标：理解“CDN 链接”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
可以通过 CDN 获得 React 和 ReactDOM 的 UMD 版本。
**开发环境：**
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

**生产环境：**
\<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"\>\</script\>
\<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"\>\</script\>
如果需要加载指定版本的 react 和 react-dom，可以把 16 替换成所需加载的版本号。

**crossorigin** **属性**
建议设置 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 属性：
\<script crossorigin src="..."\>\</script\>
同时建议验证使用的 CDN 是否设置了 Access-Control-Allow-Origin: * 请求头：

[](https://react.docschina.org/static/89baed0a6540f29e954065ce04661048/13ae7/cdn-cors-header.png)

```
这样能在 React 16 及以上的版本中有更好的[错误处理体验](https://react.docschina.org/blog/2017/07/26/error-handling-in-react-16.html)
```

script不加crossorigin，在页面报错，只能看到script error这个错误，无详细信息，添加了crossorigin之后，服务端同时配置Access-Control-Allow-Origin，就可以获取详细错误消息；
 \> 来自

```
 <https://react.docschina.org/docs/cdn-links.html>
```

:::
