---
title: "前端页面如何优雅的显示PDF：原理说明"
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
description: "编程琐事 关注【编程琐事】了解更多互联网编程知识 1. Getting Started 原理：获得 PDF 对象，获取所有的 Page 页面，为每一个页面创建一个 Canvas ，通过 Page 的 render 方法把页面渲染到对应的页面 Canvas 优点：能够动态渲染相应的。"
sidebarWeight: 61
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/前端页面如何优雅的显示PDF：原理说明.md"
---
::: v-pre

# 前端页面如何优雅的显示PDF：原理说明

> 本节目标：理解“前端页面如何优雅的显示PDF：原理说明”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
[](https://www.zhihu.com/people/lius.ac.cn)

[](https://www.zhihu.com/people/lius.ac.cn)

[编程琐事](https://www.zhihu.com/people/lius.ac.cn)
关注【编程琐事】了解更多互联网编程知识
`1. Getting Started`

- 原理：获得 `PDF` 对象，获取所有的 `Page` 页面，为每一个页面创建一个 `Canvas`，通过 `Page` 的 `render` 方法把页面渲染到对应的页面 `Canvas`
- 优点：能够动态渲染相应的页面
- 缺点：他的方式是获得每页数据在相应的 `div` 中创建一个 `Canvas` 频繁的操作 `Dom` 需要单独的设置文字 导致卡顿，不适合大文件

获取文件对象

```
var loadingTask = pdfjsLib.getDocument(url)loadingTask.promise.then(pdf=>{    # PDF
```

==能够获取到==`PDF`==的页数==

```
})
```
 这里的`PDF`就是文件的信息，可以通过`PDF`渲染相应的页面。
获得每页对象

```
pdf.getPage(num).then(page=>{    # num
```

==显示每页==

```
    # page
```

==就是==`PDF`==每页数据对象==

```
})
```
 渲染到页面
`var scale = 1.5; #` ==缩放大小==

```
var viewport = page.getViewport({ scale: scale, });
#
```

==创建一个== `Canvas` ==画布==

```
var canvas = document.getElementById('the-canvas');var context = canvas.getContext('2d');canvas.height = viewport.height;canvas.width = viewport.width;
var renderContext = {  canvasContext: context,  viewport: viewport};#
```

==把== `page` ==信息== `render` ==到== `Canvas` ==中==

```
page.render(renderContext);
```
 动态设置缩放
`#` ==设置默认缩放比率==

```
const oriViewport = page.getViewport({ scale: 1 });  const defaultScale = Math.min(maxWidth, contentWidth) / oriViewport.width;
var desiredWidth = window.devicePixelRatio; #
```

==设备像素比例==

```
 #
```

==默认缩放比率== `*` ==设备像素比率== ==让渲染出来的页面更清晰，解决==`PDF`==放大缩小产生的模糊现象==

```
  const viewport = page.getViewport({ scale: scale * devicePixelRatio });;
```
 使用 `setDocument` 方式

- 原理：通过获得显示 `PDF` 的 `div` 使用 `setDocument` 方法渲染到页面
- 优点：渲染页面快，适合大文件`,` 不需要自己渲染字体
- 缺点：暂时没有找的动态设置放大缩小方法

```
const open = () => {    const loadingTask = pdfjsLib.getDocument({      url,      maxImageSize: MAX_IMAGE_SIZE,      cMapUrl: CMAP_URL,      cMapPacked: CMAP_PACKED,    });    pdfLoadingTask = loadingTask;    // eslint-disable-next-line func-names    loadingTask.promise.then(_pdfDocument => {      // Document loaded, specifying document for the viewer.      pdfDocument = _pdfDocument;      pdfViewer.setDocument(_pdfDocument);      pdfLinkService.setDocument(_pdfDocument);      pdfHistory.initialize({ fingerprint: _pdfDocument.fingerprint });    });  };
const initUI = () => {    const linkService = new pdfjsViewer.PDFLinkService();    pdfLinkService = linkService;    const container = document.getElementById('viewerContainer');    // eslint-disable-next-line no-underscore-dangle    const _pdfViewer = new pdfjsViewer.PDFViewer({      container,      linkService,      useOnlyCssZoom: USE_ONLY_CSS_ZOOM,      textLayerMode: TEXT_LAYER_MODE,    });    pdfViewer = _pdfViewer;    linkService.setViewer(_pdfViewer);    pdfHistory = new pdfjsViewer.PDFHistory({      linkService,    });    linkService.setHistory(pdfHistory);  };
initUI()  open()
```
 编辑于 `04-09`
 \> 来自

```
 <https://zhuanlan.zhihu.com/p/127983877>
```
  \> 来自

```
 <https://zhuanlan.zhihu.com/p/127983877>
```

:::
