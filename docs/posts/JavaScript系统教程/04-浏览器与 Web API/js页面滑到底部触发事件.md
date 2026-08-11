---
title: "js页面滑到底部触发事件"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "文档的总高度 浏览器视口的高度 \\ 来自。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/js页面滑到底部触发事件.md"
---
::: v-pre

# js页面滑到底部触发事件

> 本节目标：理解“js页面滑到底部触发事件”的核心思路，并能把它用于实际开发或面试表达。
```
function getScrollTop(){
var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
if(document.body){
bodyScrollTop = document.body.scrollTop;
}
if(document.documentElement){
documentScrollTop = document.documentElement.scrollTop;
}
scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
return scrollTop;
}
//
```

_文档的总高度_

```
function getScrollHeight(){
var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
if(document.body){
bodyScrollHeight = document.body.scrollHeight;
}
if(document.documentElement){
documentScrollHeight = document.documentElement.scrollHeight;
}
scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
return scrollHeight;
}
//
```

_浏览器视口的高度_

```
function getWindowHeight(){
var windowHeight = 0;
if(document.compatMode == "CSS1Compat"){
windowHeight = document.documentElement.clientHeight;
}else{
windowHeight = document.body.clientHeight;
}
return windowHeight;
}
window.onscroll = function(){
if(getScrollTop() + getWindowHeight() == getScrollHeight()){
moreReconmend();
//	console.log("getScrollTop:"+getScrollTop()+"**getWindowHeight:"+getWindowHeight()+"**getScrollHeight:"+getScrollHeight())
}
};
```
 \> 来自

```
 <https://blog.csdn.net/qq_29301417/article/details/78684495>
```

:::
