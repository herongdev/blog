---
title: "event.stopImmediatePropagation"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "阻止事件冒泡并且阻止相同事件的其他侦听器被调用。 语法 节 event.stopImmediatePropagation(); 备注 节 如果有多个相同类型事件的事件监听函数绑定到同一个元素，当该类型的事件触发时，它们会按照被添加的顺序执行。如果其中某个监听函数执行了 event。"
sidebarWeight: 65
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/易错方法/event.stopImmediatePropagation.md"
---
::: v-pre

# event.stopImmediatePropagation

> 本节目标：理解“event.stopImmediatePropagation”的核心思路，并能把它用于实际开发或面试表达。
阻止事件冒泡并且阻止相同事件的其他侦听器被调用。
**语法****节**
`event.stopImmediatePropagation();`
**备注****节**
如果有多个相同类型事件的事件监听函数绑定到同一个元素，当该类型的事件触发时，它们会按照被添加的顺序执行。如果其中某个监听函数执行了 `event.stopImmediatePropagation()`方法，则当前元素剩下的监听函数将不会被执行。（译者注：注意区别 `event.stopPropagation` ）
**例子** **节**

```
<!DOCTYPE html><html>    <head>        <style>            p { height: 30px; width: 150px; background-color: #ccf; }            div {height: 30px; width: 150px; background-color: #cfc; }        </style>    </head>    <body>        <div>            <p>paragraph</p>        </div>        <script>            const p = document.querySelector('p')            p.addEventListener("click", (event) => {              alert("
```

我是`p`元素上被绑定的第一个监听函数

```
");            }, false);
p.addEventListener("click", (event) => {              alert("
```

我是`p`元素上被绑定的第二个监听函数

```
");              event.stopImmediatePropagation();              //
```

执行`stopImmediatePropagation`方法`,`阻止`click`事件冒泡`,`并且阻止`p`元素上绑定的其他`click`事件的事件监听函数的执行

```
.            }, false);
p.addEventListener("click",(event) => {              alert("
```

我是`p`元素上被绑定的第三个监听函数

```
");              //
```

该监听函数排在上个函数后面，该函数不会被执行

```
            }, false);
document.querySelector("div").addEventListener("click", (event) => {              alert("
```

我是`div`元素`,`我是`p`元素的上层元素

```
");              // p
```

元素的`click`事件没有向上冒泡，该函数不会被执行

```
            }, false);        </script>    </body></html>
```
 **浏览器兼容性**
 \> 来自

```
 <https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation>
```

:::
