---
title: "histoiy 对象"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为history是window对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的URL,不过，借。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/BOM/histoiy 对象.md"
---
::: v-pre

# histoiy 对象

> 本节目标：理解“histoiy 对象”的核心思路，并能把它用于实际开发或面试表达。
history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为history是window对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的history对象与特定的window对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的URL,不过，借由用户访何过的页面列表，同样可以在不知道实际URL的情况下实现后退和前进。

```
使用go()方法可以在用户的历史记录中任意跳转，可以向后也可以向前。这个方法接受一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转(类似于单击浏览器的“后退”按钮)，正数表示向前跳转(类似于单击浏览器的噴进”按钮E来看下面的例子。
//后退一页
history.go(-1);
history.go(1);
history.go(2);
也可以给go()方法传递一个字符串参数，此时浏览器会跳转到历史记录中包含该字符串的第一
位置一可能后退，也可能前进，具体要看那个位置最近。如果历史记录中不包含该字符串，那么这个方法什么也不做，例如：
// 跳转到最近的wrox.com
history.go("wrox.com");
// 跳转到最近的 nczonline.net页面
history.go("nczonline.net");
另外，还可以使用两个简写方法back()和forward()。来代替go()顾名思义，这两个方法可以
模仿浏览器的“后退”和“前进”按钮°
history.back();
history.forward();
```

```
除了上述几个方法外，history对象还有一个length属性，保存着历史记录的数量。这个数量
包括所有历史记录，即所有向后和向前的记录。对于加载到窗口、标签页或框架中的第一个页面而言，history.length等于0。通过像下面这样测试该属性的值，可以确定用户是否一开始就打开了你的页面
if (history.length == 0) {
    // 这应该是用户打开窗口后的第一个貢面
}
history并不常用，但在创建自定义的“后退”和“前进”按钮，以及检测当前页面是不是
用户历史记录中的第一个页面时，还是必须使用它。
```

注意：当页面的URL改变时，就会生成一条历史记录。在IE8及更高版本、Opera、Firefox、Safari3及更高版本以及Chrome中，这里所说的改变包括URL中hash的支
化(因此，设置location.hash会在这些浏浏览器中生成一条新的历史记录)•

:::
