---
title: "html预加载之link标签"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "html预加载之link标签 anshaobiao6449 于 2019 05 11 21:59:00 发布 488 收藏 文章标签： javascript ViewUI 版权 我们之前提及过link rel 里面有preload和prefetch、modulepreload，都。"
sidebarWeight: 8
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/html预加载之link标签.md"
---
::: v-pre

# html预加载之link标签

> 本节目标：理解“html预加载之link标签”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
html预加载之link标签

[anshaobiao6449](https://blog.csdn.net/anshaobiao6449)

于 2019-05-11 21:59:00 发布

488

 收藏
文章标签： ==javascript== ==ViewUI==
版权
我们之前提及过link rel 里面有preload和prefetch、modulepreload，都是用于预加载资源

```
<link rel="preload" href="..." as="..."><link rel="modulepreload" href="..."><link rel="prefetch" href="...">
```
 注意preload需要写上正确的[as属性](https://www.w3.org/TR/preload/#as-attribute)，才能正常工作喔(prefetch不需要)。
**1. 但是preload和prefetch有什么区别呢？**
我们翻看w3c的[preload规范](https://www.w3.org/TR/preload)，里面有提及：

大致意思就是：
preload是用于预加载当前页的资源，浏览器会优先加载它们
prefetch是用于预加载后续导航使用的资源，浏览器也会加载它们，但优先级不高
补充：
值得注意的是preload的as如果是video，现在浏览器还是没有支持，可以改用as=“fetch”替代 或者 video本身的[preload="auto"属性](https://developers.google.com/web/fundamentals/media/fast-playback-with-video-preload#video_preload_attribute)代替
`\<!-- video`的

```
preload --><video src="..." controls="controls" preload="auto"></video><!-- link
```

的`preload`，`as`不要写`video`，因为浏览器还没有支持

```
 --><link rel="preload" as="fetch" href="..."><video src="..." controls="controls"></video>
```

[](https://developers.google.com/web/fundamentals/media/fast-playback-with-video-preload#support)

 2. modulepreload和preload
既然有了preload，为什么还有新增一个modulepreload呢？
我们看到developers.google.com有一篇文章专门介绍modulepreload，里面有一段专门的解释：

大概意思是说，使用link preload来预加载JavaScript Module会有2个问题：
1. 预加载如果是跨域并需要开启credentials模式(跨域带cookies)，会遇到一些麻烦（具体什么麻烦，没太看懂?）
2. preload没有属性可以提供来辨别这个js资源是一个JavaScript Module，这让浏览器没办法预加载完后马上处理成JavaScript Module来备用，只能等到调用的时候再处理
modulepreload更多详情：[查看](https://developers.google.com/web/updates/2017/12/modulepreload)

转载于:https://www.cnblogs.com/amiezhang/p/10850254.html
 \> 来自 \<[https://blog.csdn.net/anshaobiao6449/article/details/101121464?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-101121464-blog-84170557.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-101121464-blog-84170557.pc_relevant_default&utm_relevant_index=1](https://blog.csdn.net/anshaobiao6449/article/details/101121464?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-101121464-blog-84170557.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-101121464-blog-84170557.pc_relevant_default&utm_relevant_index=1)\>

:::
