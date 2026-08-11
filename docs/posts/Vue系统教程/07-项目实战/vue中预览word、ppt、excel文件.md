---
title: "vue中预览word、ppt、excel文件"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "附件在浏览器中，能被打开预览的有 pdf 和图片格式的文件，对于 office 文件，在浏览器输入相应的 url ，浏览器会默认下载它，想要浏览变得很麻烦，必须下载才能看。 最近发现 Office Web Viewer 可以在浏览器中查看 Office 文档，使用方法 \\< 文档。"
sidebarWeight: 51
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/vue中预览word、ppt、excel文件.md"
---
::: v-pre

# vue中预览word、ppt、excel文件

> 本节目标：理解“vue中预览word、ppt、excel文件”的核心思路，并能把它用于实际开发或面试表达。
==附件在浏览器中，能被打开预览的有==`pdf`==和图片格式的文件，对于==`office`==文件，在浏览器输入相应的==`url`==，浏览器会默认下载它，想要浏览变得很麻烦，必须下载才能看。==
最近发现`Office Web Viewer`可以在浏览器中查看`Office`文档，使用方法

```
http://view.officeapps.live.com/op/view.aspx?src=
```

 `\<`文档位置

```
>
vue
```

里面直接定义点击附件事件方法，`window.open( )`打开即可食用
例如：

```
https://view.officeapps.live.com/op/view.aspx?src=newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx
```
 因为这个是`office`官方的接口，但毕竟是第三方的，对于在线的机密性文件，有风险隐患。对于公开性文件，没那么机密的可以用这个在线预览。
 \> 来自

```
 <https://www.jianshu.com/p/cf6f9532eccf>
```

:::
