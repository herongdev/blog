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
description: "【注意】 1. 这些值都是只读，只有 scrollLeft 和 scrollTop ，可读可写。 2. 获取到的值都是一个整数，而且 没有单位 。 3. 获取到的值，浏览器默认会进行 四舍五入 4. 获取的结果都是 复合样式值 （好几个元素的样式组合在一起的值）。 一、 clie。"
sidebarWeight: 34
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/JS盒子模型.md"
---
::: v-pre

# JS盒子模型

> 本节目标：理解“JS盒子模型”的核心思路，并能把它用于实际开发或面试表达。
**【注意】**
`1.`这些值都是只读，只有`scrollLeft`和`scrollTop`，可读可写。
`2.`获取到的值都是一个整数，而且==没有单位==。
`3.`获取到的值，浏览器默认会进行==四舍五入==
`4.`获取的结果都是==复合样式值==（好几个元素的样式组合在一起的值）。

**一、**`client`**系列**
clientWidth/clientHeight：

```
可视窗口的宽度；
```

```
不包括滚动条和边框；
```

```
和内容是否溢出无关；
```

```
等于width+padding。
```

```
clientLeft：当前元素的左边框的宽度。
clientTop：当前元素上边框的宽度。
```

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

if(value== null){
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

**offset系列**
`offsetWidth/offsetHeight`：`clientWidth/clientHeight+`左右`/`上下边框，和内容溢出无关。
`offsetTop/offsetLeft`：当前元素的外边框距离父级参照物内边框的偏移量
`offsetParent`：当前元素的父级参照物。
计算当前元素相对`body`的偏移量

```
function offset(el) {
    var oLeft = el.offsetLeft,
        oTop = el.offsetTop,
        oParent = el.offsetParent;
    while (oParent) {
        //ie8
```

下不计算边框

```
        if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
            oLeft += oParent.clientLeft;
            oTop += oParent.clientTop;
        }
        oLeft += oParent.offsetLeft;
        oTop += oParent.offsetTop;
        oParent = oParent.offsetParent;
    }
    return { 'left': oLeft, 'top': oTop }
}
offset(box2);//{left: 239, top: 218}
```

计算当前元素相对于特定`id`且有定位样式元素的偏移量：
`const` `GetOffsetTop` `=`

```
(el,
```

```
parentId)
```

 `=\>` `{`
  `let` `oTop` `=`

```
el.offsetTop;
```
   `let` `oParent` `=`

```
el.offsetParent;
```
   `while`

```
(oParent)
```

 `{`
    `if`

```
(oParent.id
```

 `===`

```
parentId)
```

```
return;
```
     `oTop` `+=`

```
oParent.offsetTop;
```
     `oParent` `=`

```
oParent.offsetParent;
```
   `}`
  `return`

```
oTop;
};
```

`scroll`**系列**
scrollWidth/scrollHeight**：**

```
没溢出时等于内容的宽度或高度+padding；
```

溢出时等于被内容撑出的content的宽度或高度（相当于内容的高度或宽度），再加上元素的padding-top或padding-left（包括溢出隐藏+溢出滚动），padding值只取上面或左边的。

```
**注意：这个值是从内容的容器元素上去取。**
```

```
scrollTop/scrollLeft：盒子设置overflow:auto/scroll后，内容卷去的高度或宽度。
```

注意：`overflow`的值不能为`visible`，但可以为`hidden,auto,scroll`，`hidden`最常见。

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
