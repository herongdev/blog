---
title: "让您彻底弄清offset"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "offsetWidth 与 offsetHeight 元素的可视宽度，这个宽度包括元素的边框 (border) ，水平 padding ，垂直滚动条宽度，元素本身宽度等。 offsetHeight 跟 offsetWidth 类似，只是方向改为垂直方向上的。 另外经过测试可以发现。"
sidebarWeight: 69
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/让您彻底弄清offset.md"
---
::: v-pre

# 让您彻底弄清offset

> 本节目标：理解“让您彻底弄清offset”的核心思路，并能把它用于实际开发或面试表达。
`offsetWidth`**与**`offsetHeight`
元素的可视宽度，这个宽度包括元素的边框`(border)`，水平`padding`，垂直滚动条宽度，元素本身宽度等。
`offsetHeight`跟`offsetWidth`类似，只是方向改为垂直方向上的。
另外经过测试可以发现，即使元素加上水平或垂直滚动条，`offsetWidth`跟`offsetHeight`的值是不会更改的，因为浏览器渲染时把滚动条的宽度（或高度）算在了元素本身的宽度（或高度）中了。
通过代码及图中数值，我们不难看出

```
:
offsetWidth=(border-width)*2+(padding-left)+(width)+(padding-right)
offsetHeight=(border-width)*2+(padding-top)+(height)+(padding-bottom)
```

`offsetLeft`**与**`offsetTop`
这两个属性与 `offsetParent`有关，返回对象元素边界的左上角顶点相对于`offsetParent`的左上角顶点的水平**偏移量**。从这个定义中我们可以明确地知道`offsetLeft`与当前元素的`margin-left`和`offsetParent`的`padding-left`有关。也就是说应该是：
`offsetLeft=(offsetParent`**的**`padding-left)+(`**中间元素的**`offsetWidth)+(`**当前元素的**`margin-left)`**。**
`offsetTop=(offsetParent`**的**`padding-top)+(`**中间元素的**`offsetHeight)+(`**当前元素的**`margin-top)`**。**
但通过上面的例子我们可以看到，当`offsetParent`为`body`时，对于`offsetLeft`与`offsetTop`的值有三种，分别是：`IE6/7`中的`40`，`IE8/9/10` 和 `Chrome`中的`70`，以及`FireFox`中的`50`。
通过这些数值我们可以知道，当`offsetParent`为`body`时情况比较特殊`:`
**在**`IE8/9/10`**及**`Chrome`**中，**`offsetLeft = (body`**的**`margin-left)+(body`**的**`border-width)+(body`**的**`padding-left)+(`**当前元素的**`margin-left)`**。**
**在**`FireFox`**中，**`offsetLeft = (body`**的**`margin-left)+(body`**的**`padding-left)+(`**当前元素的**`margin-left)`**。**

`offsetParent`
终于到`offsetParent`了。
`offsetParent`属性返回一个对象的引用，这个对象是距离调用 `offsetParent`的元素最近的（在包含层次中最靠近的），并且是已进行过`CSS`定位的容器元素。 如果这个容器元素未进行`CSS`定位`,` 则`offsetParent`属性的取值为根元素的引用。

总的来说两条规则：
`1`、如果当前元素的父级元素没有进行`CSS`定位（`position`为`absolute`或`relative`），`offsetParent`为`body`。
`2`、如果当前元素的父级元素中有`CSS`定位（`position`为`absolute`或`relative`），`offsetParent`取最近的那个父级元素。

:::
