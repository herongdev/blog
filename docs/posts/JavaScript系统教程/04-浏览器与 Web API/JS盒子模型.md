---
title: "JS盒子模型"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "JS 盒子模型 【注意】 1. 这些值都是只读，只有 scrollLeft 和 scrollTop ，可读可写。 2. 获取到的值都是一个整数，而且 没有单位 。 3. 获取到的值，浏览器默认会进行 四舍五入 4. 获取的结果都是 复合样式值 （好几个元素的样式组合在一起的值）。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/BOM/JS盒子模型.md"
---
::: v-pre

# JS盒子模型

> 本节目标：理解“JS盒子模型”的核心思路，并能把它用于实际开发或面试表达。
`JS`**盒子模型**
**【注意】**
`1.`这些值都是只读，只有`scrollLeft`和`scrollTop`，可读可写。
`2.`获取到的值都是一个整数，而且==没有单位==。
`3.`获取到的值，浏览器默认会进行==四舍五入==
`4.`获取的结果都是==复合样式值==（好几个元素的样式组合在一起的值）。

**【**`client`**系列】**
**clientWidth**
当前元素可视窗口的宽度，不包括滚动条和边线，和内容是否溢出无关，等于`width+padding(`左右`)`。
**clientHeight**
当前元素可视窗口的高度，不包括滚动条和边线`=height+padding(`上下`)`。
**clientLeft**
当前元素的左边框的宽度`=`左`border`的宽度。
**clientTop**
当前元素上边框的宽度`=`上`border`的宽度。

`//`获取当前屏幕的宽度和高度

```

document.documentElement.clientWidth||document.body.clientWidth
function win(attr, value){
//
```

如果只传了一个参数，或者第二个参数为`undefined`，或者第二个参数为

```
null
//
```

则为读取属性值

```

if(value==undefined){
return document.documentElement[attr]||document.body[attr];
}
//
```

否则为设置属性

```

document.documentElement[attr]=value;
document.body[attr]=value;
}
```

**【****offset系列****】**

```
offsetWidth/ offsetHeight:
clientWidth/clientHeight +
```

左右/上下边框，和内容溢出无关。
`offsetParent:`
当前元素的父级参照物。
`offsetTop/offsetLeft:`
当前元素的外边框距离父级参照物内边框的偏移量。

```
function offset(el) {    var oLeft   = el.offsetLeft,        oTop    = el.offsetTop,        oParent = el.offsetParent;    while(oParent) {        //ie8
```

下不计算边框

```
        if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {            oLeft += oParent.clientLeft;            oTop  += oParent.clientTop;        }        oLeft += oParent.offsetLeft;        oTop  += oParent.offsetTop;        oParent = oParent.offsetParent;    }    return {'left': oLeft,'top': oTop} }offset(box2);//{left: 239, top: 218}
```

**【scroll系列】**
**scrollWidth****：**
当前盒子内容的宽度，没溢出的情况下`=`设置的`/`内容撑出的`width+padding`；溢出的时候：是真实盒子的宽度`+`溢出的宽度（包括溢出隐藏`+`溢出滚动）
**scrollHeight****：**
当前盒子内容的高度，没溢出的情况下`=`设置的`/`内容撑出的`height+padding`；有溢出的时候：真实盒子的高度`+`溢出的高度（包括溢出隐藏和溢出滚动）
`scrollTop`**：**因为设置了滚动条产生的
当前盒子内容卷去的高度【滚上去的高度】
`scrollLeft`**：**因为设置了滚动条产生的
当前盒子内容卷去的宽度【滚左边的高度】
`javascript`中元素的`scrollLeft`和`scrollTop`只能用于元素设置了`overflow`的`css`样式中。否者这两个属性没有任何意义。且`overflow`的值不能为`visible`，但可以为`hidden,auto,scroll`，`hidden`最常见。

**如何获取元素具体的某个样式值**
**方法**`1`**：**`[element].style.xxx` **操作获取**
只能获取所有写在元素行内上的样式（不写在行内，不管你写没写都获取不到，并且真实项目中我们很少会把样式写在行内上）
**方法**`2`**：获取当前元素所以经过浏览器计算过的样式**
经过计算的样式：只要当前元素可以在页面中呈现（或者浏览器渲染它了），那么它的样式都是被计算过的。
不管当前样式写在行内，内联还是外联或者没有写（浏览器会给元素设置一些默认样式），都可以获取到。
**【标准浏览器**`IE9+`**】**
获取当前元素所有被浏览器计算过的样式（对象）：
`window.getComputedStyle([element],[`==伪类，一般都写==`null])`
如：
`window.getComputedStyle(box,null).height`
**【**`IE6-8`**】**
`[element].currentStyle`获取经过计算的样式

:::
