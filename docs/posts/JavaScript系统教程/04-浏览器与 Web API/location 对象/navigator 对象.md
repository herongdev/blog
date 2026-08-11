---
title: "navigator 对象"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "最早由Netscape Navigator 2.0引入的navigator对象，现在已经成为识别客户端浏览器的事实标准。虽然其他浏览器也通过其他方式提供了相同或相似的信息（例如，IE中的window.clientlnformation和Opera中的window.opera）,但。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/BOM/location 对象/navigator 对象.md"
---
::: v-pre

# navigator 对象

> 本节目标：理解“navigator 对象”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
最早由Netscape Navigator 2.0引入的navigator对象，现在已经成为识别客户端浏览器的事实标准。虽然其他浏览器也通过其他方式提供了相同或相似的信息（例如，IE中的window.clientlnformation和Opera中的window.opera）,但navigator对象却是所有支持JavaScript的浏览器所共有的。与其他BOM对象的情况一样，每个浏览器中的navigator对象也都有一套自己的属性。下表列出了存在于所有浏览器中的属性和方法，以及支持它们的浏览器版本。

```
表中的这些navigator对象的属性通常用于检测网页的浏览器类型。
```

检测插件
检测浏览器中是否安装了特定的插件是一种最常见的检测例程。对于非IE浏览器，可以使用
plugins数组来达到这个目的。该数组中的每一项都包含下列属性。

```
name：插件的名字。
```

```
description：插件的描述。
```

```
filename：插件的文件名。
```

```
length：插件所处理的MIME类型数最。
```

```
一般来说，name属性中会包含检测插件必需的所有信息，但有时候也不完全如此。在检测插件时,需要像下面这样循环迭代每个插件并将插件的name与给定的名字进行比较。
// 检测插件（在IE中无效）
function hasPlugin(name) {
    name = name.toLowerCase();
    for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}
// 检测Flash
alert(hasPlugin("Flash"));
// 检测QuickTime
alert(hasPlugin("QuickTime"));
这个hasPlugin()函数接受一个参数：要检测的插件名。第一步是将传入的名称转换为小写形式，以便于比较。然后，迭代plugins数组，通过indexO£()检测每个name属性，以确定传入的名称是否出现在字符申的某个地方。比较的字符串都使用小写形式可以避免因大小写不一致导致的错误。而传入的参数应该尽可能具体，以避免混淆。应该说，像Flash和QuickTime这样的字符串就比较具体了，不容易导致混淆。在Fixefbx、Sa&ri、Opera和Chrome中可以使用这种方法来检测插件。
```

注意：每个插件对象本身也是一个MimeType对象的数组，这些对象可以通过方括号语
法来访冋。每个MimeType刘象有4个属性：包含MIME类型描述的description、回指插件对象的enabledPlugin、表示与MIME类型对应的文件扩展名的字符串suffixes (以逗号分隔)和表示完整MIME类型字符串的type。

```
检测IE中的插件比较麻烦，因为IE不支持Netscape式的插件。在IE中检测插件的唯一方式就是使用专有的Activexobject类型，并尝试创建一个特定插件的实例。IE是以COM对象的方式实现插件的，而COM对象使用唯一标识符来标识。因此，要想检査特定的插件，就必须知道其COM标识符。例如，Flash的标识符是shockwaveFlash.shockwaaeFlash。知道唯一标识符之后，就可以编写类似下面的函数来检测IE中是否安装相应插件了。
// 检测IE中的插件
function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex) {
        return false;
    }
}
// 检测Flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
// 检测QuickTime
alert(hasIEPlugin("QuickTime.QuickTime"));
在这个例子中，函数hasiEPluginOR接收一个COM标识符作为参数。在函数内部，首先会尝
试创建一个COM对象的实例。之所以要在try-catch语句中进行实例化，是因为创建未知COM对象会导致抛出错误。这样，如果实例化成功，则函数返回true,否則，如果抛出了错误，则执行catch块，结果就会返回false。例子最后检测IE中是否安装了 Flash和QuickTime插件。鉴于检测这两种插件的方法差别太大，因此典型的做法是针对每个插件分别创建检测函数，而不是使用前面介绍的通用检测方法。来看下面的例子。
// 检测所有浏览器中的 Flash
function hasFlash() {
    var result = hasPlugin("Flash");
    if (!result) {
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}
// 检测所有浏览器中的 QuickTime
function hasQuickTime() {
    var result = hasPlugin("QuickTime");
    if (!result) {
        result = hasIEPlugin("QuickTime.QuickTime");
    }
    return result;
}
// 检测Flash
alert(hasFlash());
// 检测QuickTime
alert(hasQuickTime());
上面代码中定义了两个函数：hasFlashO和hasQuickTimeE 每个函数都是先尝试使用不针对
IE的插件检测方法。如果返回了 false (在IE中会这样)，那么再使用针对IE的捕件检测方法。如果IE的插件检测方法再返回false,则整个方法也将返回false只要任何一次检测返回true,整个方法都会返回true
```

plugins集合有一个名叫refresh()的方法，用于刷新plugins以反映最新安装的插件。这个方法接收一个参数：表示是否应该重新加载页面的一个布尔值。如果将这个值设,为true,则会重新加载包舍插件的所有页面；否则，只更新plugins集合，不重新加载页面。

注册处理程序
Firefox 2 为 navigator 对象新増了 registerContentHandler()和registerProtocolHandler()方法(这两个方法是在HTML5中定义的，相关内容将在第22章讨论X,这两个方法可以让一个站点指明它可以处理特定类型的信息。随着RSS阅读器和在线电子邮件程序的兴起，注册处理程序就为像使用桌面应用程序一样默认使用这些在线应用程序提供了一种方式。其中，registerCOntentHandler。方法接收三个参数：要处理的MIME类型、可以处理该MIME类型的页面的URL以及应用程序的名称。举个例子，要将一个站点注册为处理RSS源的处理程序，可以使用如下代码。
navigator.registerContentHandler("application/rss+xml",
    "http://www.somereader.com?feed=%s", "Some Reader");
第一个参数是RSS源的MIME类型第二个参数是应该接收RSS源URL的URL,其中的%s表示
RSS源URL,由浏览器自动插入。当下一次请求RSS源时，浏览器就会打开指定的URL,而相应的
Web应用程序将以适当方式来处理该请求。

注意：Firefox 4及之前版本只允许在registercontentHandler（）方法中使用三个
MIME : application/rss+xml，application/atom+xml 和 application/
vnd.mozilla.maybe.feed，这三个MIME类型的作用都一样,即为RSS或ATOM新闻源（feed）注册处理程序。

类似的调用方式也适用于registerProtocolHandler（） ,它也接收三个参数：要处理的协
议（例如，mailto或ftp）,处理该协议的页面的URL和应用程序的名称。例如，要想将一个应用程序注册为默认的邮件客户端，可以使用如下代码：
navigator.registerProtocolHandler("mailto",
    "http://www.somemailclient.com?cmd=%s", "Some Mail Client");
这个例子注册了一个mailto协议的处理程序,该程序指向一个基于Web的电子邮件客户端。同样，第二个参数仍然是处理相应请求的URL,而%s则表示原始的请求。

```
注意：Firefox 2虽然实现了 registerProtocolHandler（）,但该方法还不能用，Firefox 3完整实现这个方法。
```

:::
