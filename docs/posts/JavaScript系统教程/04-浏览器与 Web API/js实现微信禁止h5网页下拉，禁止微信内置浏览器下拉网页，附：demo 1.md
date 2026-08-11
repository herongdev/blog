---
title: "js实现微信禁止h5网页下拉，禁止微信内置浏览器下拉网页，附：demo 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "在微信里面打开的链接页面如果没有经过特殊处理，下拉的话，会出现这样的情况： 大概就是一个深灰色的背景，还有一个源站的域名。 本人觉得这个非常丑，并且有时候就不想别人下拉看到我们的源站域名。 所以我这里做了一个 demo 让大家看看： 微信扫码： 代码： 禁止下拉 禁止下拉！ \\<。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/js实现微信禁止h5网页下拉，禁止微信内置浏览器下拉网页，附：demo 1.md"
---
::: v-pre

# js实现微信禁止h5网页下拉，禁止微信内置浏览器下拉网页，附：demo 1

> 本节目标：理解“js实现微信禁止h5网页下拉，禁止微信内置浏览器下拉网页，附：demo 1”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
在微信里面打开的链接页面如果没有经过特殊处理，下拉的话，会出现这样的情况：

大概就是一个深灰色的背景，还有一个源站的域名。
本人觉得这个非常丑，并且有时候就不想别人下拉看到我们的源站域名。
所以我这里做了一个`demo`让大家看看：
微信扫码：

代码：

```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<title>
```

==禁止下拉==

```
</title>
<style type="text/css">
.scroll{
position:absolute;
overflow:scroll;
-webkit-overflow-scrolling: touch;
top:0;
left:0;
bottom:0;
right:0;
}
</style>
</head>
<body>
<div class="scroll">
```
 ==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==禁止下拉！==`\<br/\>`
==是不是可以啊！！！==
==是的话==
==那就赞赏一下吧！==

```
<img src="http://wxpad.cn/yunpan/cdn/imgsrc/1519366332.jpg" style="width: 100%;" />
</div>
</body>
<script type="text/javascript">
//
```

==禁止下拉==

```
var overscroll = function(el) {
el.addEventListener('touchstart', function() {
var top = el.scrollTop
, totalScroll = el.scrollHeight
, currentScroll = top + el.offsetHeight
//If we're at the top or the bottom of the containers
//scroll, push up or down one pixel.
//
//this prevents the scroll from "passing through" to
//the body.
if(top === 0) {
el.scrollTop = 1
} else if(currentScroll === totalScroll) {
el.scrollTop = top - 1
}
})
el.addEventListener('touchmove', function(evt) {
//if the content is actually scrollable, i.e. the content is long enough
//that scrolling can occur
if(el.offsetHeight < el.scrollHeight)
evt._isScroller = true
})
}
overscroll(document.querySelector('.scroll'));
document.body.addEventListener('touchmove', function(evt) {
//In this case, the default behavior is scrolling the body, which
//would result in an overflow.  Since we don't want that, we preventDefault.
if(!evt._isScroller) {
evt.preventDefault()
}
})
</script>
</html>
```
 其中
`\<div class="scroll"\>\</div\>`是整个主体，你只需要把你的项目代码写在这个`div`之间，就可以了！
 \> 来自

```
 <https://blog.csdn.net/weixin_39927850/article/details/79353228>
```

**微信浏览器禁止页面下拉查看网址**
我们经常会遇到这样的情况就是在微信浏览器下拉网页时会显示带有网址的黑底，如图：

那如何禁止出现这样的情形呢？
一开始我使用如下代码来禁止：
`$(`==‘==`body`==’==`).on(`==‘==`touchmove`==’==`,` `function` `(event)`

```
{event.preventDefault();});
```

==或者==

```
document.addEventListener('touchmove',
```

 `function(e){e.preventDefault()},`

```
false);
```
 然而这并不能很好的解决问题，因为这样他把原生的`scroll`效果给禁止了，于是我又冥思苦想了很久，使用如下代码可解决浏览器下拉出现网址这个问题：
`var` `overscroll` `=` `function(el)`

```
{
```

  `el.addEventListener('touchstart',` `function()` `{`    `var` `top` `=`

```
el.scrollTop
```

      `,` `totalScroll` `=`

```
el.scrollHeight
```

      `,` `currentScroll` `=` `top` `+` `el.offsetHeight;`    ``    `if(top` `===` `0)`

```
{
```

      `el.scrollTop` `=`

```
1;
```

    `}` `else` `if(currentScroll` `===` `totalScroll)`

```
{
```

      `el.scrollTop` `=` `top` `-`

```
1;
```

```
}
```

```
});
```

  `el.addEventListener('touchmove',` `function(evt)` `{`   ``    `if(el.offsetHeight` `\<`

```
el.scrollHeight)
```

      `evt._isScroller` `=`

```
true;
```

```
});}overscroll(document.querySelector('.scroll'));document.body.addEventListener('touchmove',
```

 `function(evt)` `{`  ``  `if(!evt._isScroller)`

```
{
```

```
evt.preventDefault();
```

```
}});
```
 \> 来自

```
 <https://blog.csdn.net/qq_36926807/article/details/80915803>
```

:::
