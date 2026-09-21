---
title: "location 对象"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是很特别的一个对象，因为它既是window对象的属性，也是document对象的属性；换句话说，window.location和document。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/BOM/location 对象/location 对象.md"
---
::: v-pre

# location 对象

> 本节目标：理解“location 对象”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是很特别的一个对象，因为它既是window对象的属性，也是document对象的属性；换句话说，window.location和document .location引用的是同一个对象。

location对象的作用不只表现在它保存着当前文档的信息，还表现在它将URL解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。下表列出了location对象的所有属性(注：省略了每个属性前面的location前缀）

```
査询字符串参数
虽然通过上面的属性可以访问到location对象的大多数信息，但其中访问URL包含的査询字符
串的属性并不方便。location.search返回从问号到URL末尾的所有内容，但却没有办法逐个
访何其中的每个査询字符串参数。为此，可以像下面这样创建一个函数，用以解析査询字符串，然后返回包含所有参数的一个对象：
function getQueryStringArgs() {
    // 取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        // 保存数据对象
        args = {},
        // 取得每一项
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        // 在 for循环中使用
        i = 0,
        len = items.length;
    // 逐个将每一项加到args对象中
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
```

:::
