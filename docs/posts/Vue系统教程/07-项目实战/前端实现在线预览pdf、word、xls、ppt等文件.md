---
title: "前端实现在线预览pdf、word、xls、ppt等文件"
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
description: "前端 发布于 、前端实现 pdf 文件在线预览功能 方式一 : 通过 a 标签 href 属性实现 pdf 文件理论上可以在浏览器直接打开预览但是需要打开新页面。在仅仅是预览 pdf 文件且 UI 要求不高的情况下可以直接通过 a 标签 href 属性实现预览 \\<a 文档地址。"
sidebarWeight: 60
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/前端实现在线预览pdf、word、xls、ppt等文件.md"
---
::: v-pre

# 前端实现在线预览pdf、word、xls、ppt等文件

> 本节目标：理解“前端实现在线预览pdf、word、xls、ppt等文件”的核心思路，并能把它用于实际开发或面试表达。
```
pdf
```

[前端](https://segmentfault.com/t/%E5%89%8D%E7%AB%AF)

```
web
```
 发布于

```
 2019-04-09
1
```

、前端实现`pdf`文件在线预览功能
方式一`:` 通过`a`标签`href`属性实现
`pdf`文件理论上可以在浏览器直接打开预览但是需要打开新页面。在仅仅是预览`pdf`文件且`UI`要求不高的情况下可以直接通过`a`标签`href`属性实现预览
`\<a`

```
href="
```

==文档地址==

```
"></a>
```
 方式二`:` 通过`jquery`插件`jquery.media.js`实现
这个插件可以实现`pdf`预览功能（包括其他各种媒体文件）但是对`word`等类型的文件无能为力。
实现方式：

```
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>  <script type="text/javascript" src="jquery.media.js"></script>html
```

==结构：==

```
      <body>          <div id="handout_wrap_inner"></div>      </body>
```

==调用方式：==

```
<script type="text/javascript">   $('#handout_wrap_inner').media({        width: '100%',        height: '100%',        autoplay: true,        src:'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',            }); </script>
```
 方式三`:` 直接通过页面内嵌

```
iframe
$("<iframe src='"+
```

```
this.previewUrl +"' width='100%' height='362px' frameborder='1'>").appendTo($(".video-handouts-preview"));
```
 此外还可以在`iframe`标签之间提供一个提示类似这样

```
<iframe :src="previewUrl" width="100%" height="100%">This browser does not support PDFs. Please download the PDF to view it: <a :href="previewUrl">Download PDF</a></iframe>
```
 方式四`:` 通过标签嵌入内容
`\<embed`

```
:src="previewUrl"
```

```
type="application/pdf"
```

```
width="100%"
```

```
height="100%">
```
 此标签`h5`特性中包含四个属性：高、宽、类型、预览文件`src`！
与`\< iframe \> \< / iframe \>` 不同，这个标签是自闭合的的，也就是说如果浏览器不支持`PDF`的嵌入，那么这个标签的内容什么都看不到！
方式五`:` 标签和`iframe`使用差别较小

```
<object :src="previewUrl" width="100%" height="100%">This browser does not support PDFs. Please download the PDF to view it: <a :href="previewUrl">Download PDF</a></object>
```
 方式六

```
: PDFObject
PDFObject
```

实际上也是通过标签实现的直接上代码

```
<!DOCTYPE html><html><head>    <title>Show PDF</title>    <meta charset="utf-8" />    <script type="text/javascript" src='pdfobject.min.js'></script>    <style type="text/css">        html,body,#pdf_viewer{            width: 100%;            height: 100%;            margin: 0;            padding: 0;        }    </style></head><body>    <div id="pdf_viewer"></div></body><script type="text/javascript">    if(PDFObject.supportsPDFs){        // PDF
```

_嵌入到网页_

```
        PDFObject.embed("index.pdf", "#pdf_viewer" );    } else {        location.href = "/canvas";    }        //
```

_还可以通过以下代码进行判断是否支持_`PDFObject`_预览_

```
    if(PDFObject.supportsPDFs){       console.log("Yay, this browser supports inline PDFs.");    } else {       console.log("Boo, inline PDFs are not supported by this browser");    }</script></html>
```
 方式七`: PDF.js`

```
demo
PDF.js
```

可以实现在`html`下直接浏览`pdf`文档，是一款开源的`pdf`文档读取解析插件，非常强大，能将`PDF`文件渲染成`Canvas`。`PDF.js`主要包含两个库文件，一个`pdf.js`和一个`pdf.worker.js`，一个负责`API`解析，一个负责核心解析。
`2`、`word`、`xls`、`ppt`文件在线预览功能
`word`、`ppt`、`xls`文件实现在线预览的方式比较简单可以直接通过调用微软的在线预览功能实现 `(`预览前提：资源必须是公共可访问的

```
)
<iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='100%' height='100%' frameborder='1'></iframe>
/src
```

_就是要实现预览的文件地址_

```
/
/
```

_具体文档看这微软接口文档_

```
/
/
```

_补充：_`google`_的文档在线预览实现同微软（资源必须是公共可访问的）_

```
/
<iframe
```

```
:src="'https://docs.google.com/viewer?url="fileurl"></iframe>
3
```

、`word`文件
`XDOC`可以实现预览以`DataURI`表示的`DOC`文档，此外`XDOC`还可以实现文本、带参数文本、`html`文本、`json`文本、公文等在线预览，具体实现方法请看官方文档下面这种方式可以实现快速预览`word`但是对文件使用的编辑器可能会有一些限制
`\<a`

```
href="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=http://www.xdocin.com/demo/demo.docx"
```

```
target="_blank"
```

```
rel="nofollow">XDOC</a>
4
```

、`excel`文件
目前`excel`文件已经有了类似`pdf.js`那样的解析`sheet.js`
总结
`1`、免费纯前端方式实现在线预览`word`、`excel`、`ppt`最优选择微软在线预览（不可编辑）
`2`、利用后端将文件转为图片，前端以图片形式预览（可行方案）
`3`、购买在线预览服务例如百度`DOC`文档服务、永中、`I DOC VIEW`等
 \> 来自

```
 <https://segmentfault.com/a/1190000018806682>
```

:::
