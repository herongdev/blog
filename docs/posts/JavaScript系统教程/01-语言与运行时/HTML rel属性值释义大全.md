---
title: "HTML rel属性值释义大全"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "HTML rel属性值释义大全 这篇文章发布于 2019年06月3日，星期一，00:28，归类于 HTML相关。 阅读 25373 次, 今日 7 次 13 条评论 by zhangxinxu from https://www.zhangxinxu.com/wordpress/?。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/HTML rel属性值释义大全.md"
---
::: v-pre

# HTML rel属性值释义大全

> 本节目标：理解“HTML rel属性值释义大全”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**HTML rel属性值释义大全**
这篇文章发布于 2019年06月3日，星期一，00:28，归类于 [HTML相关](https://www.zhangxinxu.com/wordpress/category/html/)。 阅读 25373 次, 今日 7 次 ==13 条评论==
by [zhangxinxu](https://www.zhangxinxu.com/) from  [https://www.zhangxinxu.com/wordpress/?p=8488](https://www.zhangxinxu.com/wordpress/?p=8488)
本文欢迎分享与聚合，全文转载就不必了，尊重版权，圈子就这么大，若急用可以联系授权。

**一、HTML rel属性值索引**
HTML中有一个名为`rel`的属性，是relationship这个单词的缩写，指明两个文档之间的关系，专门用来链接相关元素上，如`\<a\>`、`\<area\>`、`\<form\>`或`\<link\>`元素上，因此`rel`的属性值也是“链接类型”的代称。
`rel`支持非常多的属性值，包含的知识非常多，且有些属性值非常重要，完整细读至少需要30分钟时间。
[alternate](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#alternateRel)[archives](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#archivesRel)[author](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#authorRel)[bookmark](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#bookmarkRel)[canonical](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#canonicalRel)[dns-prefetch](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#dns-prefetchRel)[external](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#externalRel)[first](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#firstRel)[help](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#helpRel)[icon](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#iconRel)[import](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#importRel)[index](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#indexRel)[last](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#lastRel)[license](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#licenseRel)[manifest](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#manifestRel)[modulepreload](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#modulepreloadRel)[next](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#nextRel)[nofollow](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#nofollowRel)[noopener](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#noopenerRel)[noreferrer](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#noreferrerRel)[opener](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#openerRel)[pingback](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#pingbackRel)[preconnect](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#preconnectRel)[prefetch](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#prefetchRel)[preload](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#preloadRel)[prerender](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#prerenderRel)[prev](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#prevRel)[search](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#searchRel)[shortlink](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#shortlinkRel)[sidebar](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#sidebarRel)[stylesheet](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#stylesheetRel)[tag](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#tagRel)[up](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#upRel)
**二、33个rel属性值完全展示**
**1. rel=”alternate”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

单词alternate有交替、替换的意思。顾名思意就是链接有替换内容。主要有下面3大应用场景，有些场景还非常实用。

6. 用在`\<link\>`元素中，和`stylesheet`链接类型一起使用，配合`title`属性（必须），可以定义替换CSS，可以以一种体验更好的方式实现类似换肤这种功能。

兼容性非常好，IE，Chrome和Firefox均支持这种更原生的换肤效果实现。具体原理与实现可以参见这篇热门文章：“[link rel=alternate网站换肤功能最佳实现](https://www.zhangxinxu.com/wordpress/2019/02/link-rel-alternate-website-skin/)”。

9. 如果网站包含RSS订阅。可以使用该值进行指明，需要设置type属性值为`application/rss+xml`或者`application/atom+xml`（ATOM是一种订阅网志的格式。一种Web feed，和RSS相类似）。例如：\<link rel="alternate"type="application/rss+xml"href="https://zhangxinxu.com/feed"/\>或者使用在指向RSS订阅地址的`\<a\>`元素上：\<arel="alternate"type="application/rss+xml"href="https://zhangxinxu.com/feed"\>RSS订阅\</a\>
10. 还可以用来定义用来替换的页面。场景较多，例如：
11. media响应处理，小于640像素时候，告诉用户或者设备（或搜索引擎），还有移动站页面，例如：\<linkrel="alternate"media="only screen and (max-width: 640px)"href="https://m.zhangxinxu.com/"/\>
12. 多语言时候告诉用户或者设备（或搜索引擎）还有其他语言的网站，需要`hreflang`属性同时设置，例如西班牙语：\<linkrel="alternate"href="http://es.zhangxinxu.com/"hreflang="es"/\>或者直接链接也可以：\<ahref="http://es.zhangxinxu.com/"hreflang="es"rel="alternate"\>西班牙语\</a\>
13. 指向另外的格式，例如PDF文件，需要`type`属性同时设置（值为对应文件的MIME type值）。
14. 或者上面混合使用。

**2. rel=”archives”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

archives语义是归档。此`rel`属性值可以用来定义指向归档语义的超链接。例如，我的博客的每月索引页的`\<a\>`链接就可以使用这个值。
例如：
\<ahref="https://www.zhangxinxu.com/wordpress/2019/05/"rel="archives"\>2019年五月\</a\>
注意后面有`s`，直接`rel="archive"`是不正确的，不要使用。
**3. rel=”author”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

链接指向作者介绍页。
例如：
\<ahref="https://www.zhangxinxu.com/life/about/"rel="author"\>张鑫旭\</a\>
链接地址支持直接`href`属性值以`mailto:`开头，可以呼起邮件客户端发送邮件，但是在网页中其实不推荐这么做，因为容易被爬虫把邮箱爬过去。推荐作为是链接地址执行作者信息介绍页面，然后通过`rel="author"`增强这个链接的语义。
**4. rel=”bookmark”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>|\<link\>、\<form\>|

bookmark的语义是书签。
通常用在指向文章内容的永久链接上，例如[本站的列表页](https://www.zhangxinxu.com/wordpress/)每一个文章链接元素就有设置`rel=bookmark`。

**5. rel=”canonical”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

canonical是规范的意思，只能作用在`\<link\>`元素上，此值的作用与搜索引擎有关，可以为类似网页或重复网页指定规范网页。
拿Google搜索举例，如果您的某一个网页可通过多个网址访问，或者您的不同网页包含类似内容（例如，某个网页既有移动版，又有桌面版），那么 Google 会将这些网页视为同一个网页的重复版本。Google 会选择一个网址作为规范版本并抓取该网址，而将所有其他网址视为重复网址并降低对这些网址的抓取频率。
如果您未明确告知 Google 哪个网址是规范网址，Google 就会替您做出选择，或会将这两个版本视为同等重要，这可能会导致出现一些不当的行为。
那如何让Google知道哪个网址是最规范最优先的呢？其中一个方法就是rel=canonical `\<link\>`标记。
例如wordpress文章链接地址有多种URL表示，比如我希望用户通过 [https://www.zhangxinxu.com/wordpress/2019/05/html-a-rel/（而非](https://www.zhangxinxu.com/wordpress/2019/05/html-a-rel/（而非) [https://www.zhangxinxu.com/wordpress/?p=8488）访问这篇文章。则可以在](https://www.zhangxinxu.com/wordpress/?p=8488）访问这篇文章。则可以在<head>中新增如下所示的代码)`\<head\>`中新增如下所示的代码：
\<linkrel="canonical"href="https://www.zhangxinxu.com/wordpress/2019/05/html-a-rel/"/\>
如果规范网页有移动版，还可以为其添加

```
rel="alternate"
```

 链接，并使该链接指向此网页的移动版（本站没有专门移动页面，下面地址仅示意）：
\<linkrel="alternate"media="only screen and (max-width: 640px)"href="http://m.zhangxinxu.com/wordpress/2019/05/html-a-rel/"\>
rel=canonical `\<link\>`标记方法的优点是可以映射无限多个重复网页，不足是在大型网站或网址经常改变的网站上维护映射会比较复杂，且仅适用于 HTML 网页，不适用于 PDF 之类的文件（在这种情况下，您可以使用 `rel=canonical` HTTP 标头）。
**6. rel=”dns-prefetch”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

只能作用在`\<link\>`元素上，作用是DNS预读取。允许浏览器在用户单击链接之前进行DNS查找和协议握手，可以提高页面资源加载速度。
例如：
\<linkrel="dns-prefetch"href="http://www.zhangxinxu.com/"\>
此时域名“www.zhangxinxu.com”将被预先解析。
此时如果页面中有链接地址的域名也是“www.zhangxinxu.com”，那么当用户点击这个链接的时候，新打开的页面就少了DNS向上查找这一步，因为之前浏览器已经DNS预读取了，页面呈现速度就会快一些，虽然快的并不是很多，但能快一点是快一点。
**7. rel=”external”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

external是外部的意思。当链接指向的是外部资源或外部链接的时候，可以使用该属性。主要作用是告诉搜索引擎，这是一个外部链接。常常和`nofollow`值一起使用，例如：
\<ahref="http://example.com/"rel="external nofollow"\>Foobar\</a\>
需要注意的是`rel=external`和链接在新窗口打开没有任何关系。
**8. rel=”first”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

表示指向一个序列页面资源的第一个资源。其它类似的rel链接资源类型有 `last`，`prev`和`next`。
**9. rel=”help”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>、\<form\>|–|

33. 如果元素是`\<a\>`或`\<area\>`，则表示超链接指向一个资源，该资源对元素的父元素及其子元素提供了进一步的帮助。
34. 如果元素是`\<link\>`，则表示超链接指向一个资源，该资源将对整个页面提供进一步的帮助。

例如我之前制作的一个[SVG在线压缩工具](https://www.zhangxinxu.com/sp/svgo/)，选中任意SVG，有下图所示的一个文案和图标：

问号图标是一个超链接，用来对上下文进行帮助说明，也就是解释CSS转义是什么，此时就非常使用使用`rel="help"`，代码如下：
CSS转义\<ahref="//www.zhangxinxu.com/wordpress/?p=7957"class="icon-a icon-help"title="这个用在什么地方？"rel="help"\>\<svgwidth="18"height="18"\>\<usexlink:href="#icon-help"\>\</use\>\</svg\>\</a\>
**10. rel=”icon”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

这个比较常用，可以指定网站小图标。
指定网页favicon，我们常常会在`icon`类型前面加上`shortcut` link类型，例如：
\<linkrel="shortcut icon"href="favicon.ico"/\>
现在已经9021年了，`shortcut`这种link类型早已不符合规范，浏览器直接无视，因此，没有必要再使用了，我们直接使用`icon`类型即可。
//zxx: 根据热心小伙伴评论反馈，增加原因说明。（更新于2019-06-21）
参考下 大漠的《弄懂Favicon》一文的说法 “IE 5本打算用shortcut icon来表示页面和图标之间的关系，但是当这份规范把rel属性值所表示的关系用空格分开后，这样理论上shortcut icon是创建了两种关系，即shortcut和icon。直到2010年HTML5规范把icon单独作为标准标识符。所以，在非IE浏览器中指定favicon时，可以不加shortcut属性。”
例如：
\<linkrel="icon"href="favicon.ico"/\>
我们也可以使用PNG格式的图像作为favicon，如果是多个icon，我们还可以使用`type`或者`sizes`等属性指定不同的类型和尺寸。例如：
\<link rel="icon"type="image/png"href="/path/to/icons/favicon-16x16.png"sizes="16x16"\>\<link rel="icon"type="image/png"href="/path/to/icons/favicon-32x32.png"sizes="32x32"\>...
favicon如果深入，涉及到的知识点会很多，这里不展开，之后会专门写文章介绍。
**11. rel=”import”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

就是HTML Imports，Web Components开发重要组成部分之一，例如：
\<linkrel="import"href="module.html"\>
HTML Imports居然没有专门写文章介绍，失策，这个回头补上。
**12. rel=”index”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

表示超链接指向的页面资源是某个具有层级结构的一部分。
如果还存在一个或多个`up`链接类型，则`up`链接类型的数目表示层次结构中当前页面的深度。
这个属性在HTML5规范出来之后就已经被舍弃了，大家了解即可。
**13. rel=”last”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

表示指向序列页面的最后一个页面。其它类似的rel链接资源类型有 `first`，`prev`和`next`。
**14. rel=”license”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>、\<form\>|–|

license语义是许可证，你也可以理解为版权说明。例如一个指向MIT license说明或者BSD license说明的超链接，就可以使用此`rel`属性值。
\<ahref="/somesite/bsd-license"rel="license"\>BSD license\</a\>
`copyright`这个值虽然同义，也能识别，但是是不正确的请不要使用。
**15. rel=”manifest”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

指定清单文件，用做Web应用程序清单部署，例如：
\<linkrel="manifest"href="/manifest.webmanifest"\>
`.webmanifest`是约定俗成扩展名，返回文件内容类型需要是：`Content-Type: application/manifest+json`，也支持`.json`扩展名的清单文件。
manifest可以让webapp变得更加native，离线开发时候也很有用。
**16. rel=”modulepreload”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

`modulepreload`可以用来预加载原生模块脚本，例如：
\<head\>\<linkrel="modulepreload"href="super-critical-stuff.mjs"\>\</head\>[...]\<scripttype="module"src="super-critical-stuff.mjs"\>
为何不使用`\<link rel="preload"\>`加载模块JS呢？因为`\<script type="module"\>`没有`crossorigin`属性，和普通的`\<script\>`、`\<link\>`元素不一样。更多关于`modulepreload`知识可以参见[这篇文章](https://developers.google.com/web/updates/2017/12/modulepreload)。
**17. rel=”next”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>、\<form\>|–|

表示指向序列页面的下一个页面。其它类似的rel链接资源类型有 `first`，`last`和`prev`。
**18. rel=”nofollow”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<form\>|\<link\>|

`rel=nofollow`可让网站站长告诉搜索引擎“不要跟踪此网页上的链接”或“不要跟踪此特定链接”。
例如登录页面无需抓取，可以：
\<ahref="signin.php"rel="nofollow"\>登录\</a\>
但是，不同搜索引擎策略不一样，至少Google是不抓取的。
**19. rel=”noopener”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<form\>|\<link\>|

这是一个很重要的且常用的`rel`属性值，与安全相关。
如果我们的链接元素没有设置`noopener`，则在新窗口打开这个链接的时候，则这个新窗口页面可以通过`window.opener`获取来源页面的窗体对象，于是可以改变原页面URL地址之类的事情。
例如这里有个名为“[About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)”的测试页面，此时URL地址是“https://mathiasbynens.be/demo/opener”。
点击测试页面上前两个测试链接（直接点击，不要按住Ctrl键再点击），例如点击下面这个跨域地址：

此时会进入另外一个不同域名的测试页面，可以看到域名和文案，我翻译下就是：

此时，我们在回到之前页面，会发现URL后面被悄悄地增加了一个锚点地址，同时页面上出现了一些有趣的文字：

这里仅仅是一个简单的恶作剧，实际上如果是真实的页面场景，不怀好意的人可以把你这个原页面跳转到一个高仿的诈骗页面，是不是很危险的一件事情？
因此，如果您的网站上有外部的链接地址，一定要记得加上`noopener`。
**20. rel=”noreferrer”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<form\>|\<link\>|

当导航到其他页面的时候，可以阻止浏览器向跳转页面发送页面地址以及其他值。
看描述以为作用和在页面头部设置referer meta信息一样：
\<metaname="referrer"content="no-referrer"\>
结果在Firefox以及Chrome浏览器下测试了下，不知道是不是我打开方式的的问题，没有效果。例如新浪微博图床图片前段时间不允许外站访问了，但是设置referrer为`no-referrer`是可以呈现的，但是使用`rel="noreferrer"`链接测试的时候依然无法显示。
后来我翻了下，我之前有一篇[关于document.referrer的狗粮文](https://www.zhangxinxu.com/wordpress/2017/02/js-page-url-document-referrer/)，其中有提到`rel="noreferrer"`。那就是如何页面是通过设置了`rel="noreferrer"`的`\<a\>`元素访问，则此时`document.referrer`是空，没有来源。
**21. rel=”opener”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<form\>|\<link\>|

这是个还处于实验阶段的新特性。`opener`和`noopener`的语义完全是相反的，表示超链接出去的页面有`window.opener`，为什么会有这个属性值呢？
因为2018年10月10日“萌节”这天，cdume在related HTML规范讨论中发表了如下提议：
Windows opened via \<a target=_blank\> should not have an opener by default
也就是设置了`target=_blank`的`\<a\>`元素默认就没有`opener`，这样更安全。收到很多点赞，规范也会跟进。于是就有问题了，如果开发者希望页面有opener该怎么处理呢？
于是就有了`rel="opener"`，如果一个链接元素设置了`target=_blank`，同时希望新开页面有`window.opener`对象，则可以给链接元素添加`rel="opener"`。
**22. rel=”pingback”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

pingback估计了解的开发人员不多，如果是wordpress资深用户，应该会比较熟悉。在运管WordPress博客的时候，后台评论经常看到来自某一篇文章的pingback，表示你这篇文章被引用了。pingback可以让Web作者追踪什么人链接至他的文章。
pingback有专门的调用与协议规范，有兴趣可以参见[pingback 1.0规范](http://www.hixie.ch/specs/pingback/pingback)。
例如我的博客头部HTML中就有相关使用：
\<linkrel="pingback"href="https://www.zhangxinxu.com/wordpress/xmlrpc.php"/\>
**23. rel=”preconnect”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

实验阶段属性值。由于是渐进增强特性，因此，可以放心使用。
作用是告知浏览器提前连接链接地址对应站点，不过只是连接，并不会公开任何私人信息或者下载任何内容。好处是打开链接内容的时候可以更快的获取（节约了 DNS 查询、重定向以及指向处理用户请求的最终服务器的若干往返）。
例如：
\<linkrel="preconnect"href="https://www.zhangxinxu.com"\>
上面这段HTML作用是浏览器知道我们打算连接到 [www.zhangxinxu.com](http://www.zhangxinxu.com) 并从其中获取内容，然后浏览器会提前做好连接。
但是`preconnect`并不是没有成本的，千万不能滥用。`\<link rel="preconnect"\>`会占用宝贵的 CPU 时间，如果用户没有在 10 秒内使用该连接，资源浪费的情况就会变得更严重，因为当浏览器关闭连接时，所有已完成的连接都将遭到浪费。
因此，尽可能使用 `\<link rel="preload"\>`，一些特殊场景下使用 `\<link rel="preconnect"\>`。
**24. rel=”prefetch”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>（\<a\>、\<area\>之后可能会实现）|\<a\>、\<area\>、\<form\>|

`prefetch`表示预获取，通常是一些静态资源。语法如下：
\<linkrel="prefetch"href="(url)"\>
prefetch 最适合抢占用户下一步可能进行的操作并为其做好准备，例如搜索结果列表中首个产品的详情页面或搜索分页内容的下一页。
\<linkrel="prefetch"href="page-2.html"\>
prefetch兼容性还不错，除了目前Safari不支持以为，其他浏览器都挺不错的，如下图所示：

**25. rel=”preload”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

`preload`表示预加载。告诉浏览器这些资源你先帮我加载，之后我要使用。例如：
\<link rel="preload"as="script"href="super-important.js"\>\<link rel="preload"as="style"href="critical.css"\>
请注意，\<link rel=”preload”\>是强制浏览器执行的指令，不只是可选提示，与上面的`preconnect`和`prefetch`是不一样的。
因此，使用`preload`时一定要保证内容会被使用，如果提取的资源3秒内没有被当前页面使用，Chrome开发者工具的控制台会触发警告！

`preload`的兼容性如下截图：

虽然Safari浏览器支持了，但是Firefox却还需要手动开启，不过看样子Firefox很快就会绿色支持了。总之，兼容性还是可以的，可以用起来，优化网页资源的开发与调用。
**26. rel=”prerender”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

`prerender`表示预渲染。告知浏览器在背后先默默渲染页面，当用户之后导航到这个页面时候会大大加快加载速度。
语法如下：
\<linkrel="prerender"href="(url)"\>
和`prefetch`区别在于，`prefetch`获取页面并不会加载页面中的css和js资源，更多是页面本身，但是`prerender`已经在背后默默做起渲染的事情，预处理要更进一步。
目前兼容性不算很好，也就Chrome PC端支持不错，且也是刚支持不久。

**27. rel=”prev”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>、\<form\>|–|

表示指向序列页面的上一个页面。其它类似的`rel`链接资源类型有 `first`，`last`和`next`。
**28. rel=”search”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>、\<form\>|–|

表示链接地址是当前网站或资源对于的搜索文档接口页面。
以及其他一些类似插件的作用。例如我们设置`type`属性值为`application/opensearchdescription+xml`，则对应的资源（[OpenSearch描述文件](https://developer.mozilla.org/en-US/docs/Web/OpenSearch)）可以作为Firefox或者Internet Explorer的搜索插件。
例如在`\<head\>`标签里加上：
\<link rel="search"type="application/opensearchdescription+xml"href="provider.xml"title="关键词搜索"/\>
provider.xml的内容为：
\<?xml version="1.0" encoding="utf-8"?\>\<OpenSearchDescriptionxmlns="http://a9.com/-/spec/opensearch/1.1/"\>\<InputEncoding\>UTF-8\</InputEncoding\>\<ShortName\>关键词搜索\</ShortName\>\<Description\>关键词搜索\</Description\>\<Imageheight="16"width="16"type="image/vnd.microsoft.icon"\>/favicon.ico\</Image\>\<Urltype="text/html"template="/wordpress/?s=\{searchTerms\}"/\>\</OpenSearchDescription\>
我弄个了简单的[静态页面](https://www.zhangxinxu.com/study/201906/rel-search.html)测试了下，嘿哟喂，真的可以（Firefox浏览器下截图）。

这样，网站所有页面，就算没有搜索框也可以搜索了，不过Chrome浏览器地址栏没搜索框，Firefox和IE浏览器支持，这投入产出比有些低，不过可以作为有趣的案例和同事分享分享。
**29. rel=”shortlink”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|不详|

网站当前页面对应的短链接，这样分享链接的时候要更容易（微博字数限制，微信或QQ中地址呈现等）。
例如，我的这篇博客文章头部就有`shortlink`的应用，HTML如下：
\<linkrel='shortlink'href='https://www.zhangxinxu.com/wordpress/?p=8488'/\>
**30. rel=”sidebar”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<form\>|\<link\>|

`sidebar`曾经是HTML规范的一部分，但是最近已经从规范中删除掉了，Firefox 63之后的版本已经不支持。这里不展开，其语义就是指向可以帮助浏览二级浏览上下文的资源，例如侧边栏。
**31. rel=”stylesheet”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<link\>|\<a\>、\<area\>、\<form\>|

指向样式表资源，例如：
\<link rel="stylesheet"href="./dashicons.min.css"type="text/css"media="all"/\>
这个几乎每一个网页都会使用，大家应该都很熟，就不多说了。
**32. rel=”tag”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>|\<link\>、\<form\>|

表示指向表述当前文档标签的链接。例如wordpress文章中的标签链接都有设置该属性值，例如：

因此SEO会更加精准，质量更高。
**33. rel=”up”**

|   |   |
|---|---|
|**允许使用的链接元素**|**不允许使用的链接元素**|
|\<a\>、\<area\>、\<link\>|\<form\>|

表示当前页面是层次结构的一部分，并且超链接指向该结构的更高级别资源。
`up`链接类型的数量表示当前页面和链接资源之间的深度差。
**三、结束语**
嘛呀，不简单，1万三千多字，这样的长篇通常没什么人会耐心看完的，历史经验告诉我，HTML范畴，又是小众属性，内容又长，虽然是稀缺技术资源内容，但注定要压箱底落灰。
但这样的内容恰恰是那些真正热爱技术的人需要的，抛开表面与功利，做真正有价值，且价值深远的事情。
本文很多rel属性值都是只做了简单的介绍，偏广度，以后有机会，会从深度角度介绍一些属性值。
**参考文档：**

104. [Link_types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
105. [整合重复网址](https://support.google.com/webmasters/answer/139066?hl=zh-Hans)
106. [对特定链接使用rel=”nofollow”](https://support.google.com/webmasters/answer/96569?hl=zh-Hans)
107. [资源优先级 – 让浏览器助您一臂之力](https://developers.google.com/web/fundamentals/performance/resource-prioritization?hl=zh-cn)

以上，感谢阅读到这里！
«上一篇 [小tips: 如何借助content属性显示CSS var变量值](https://www.zhangxinxu.com/wordpress/2019/05/content-css-var/)
[纯CSS图片滤镜项目CSSgram简介](https://www.zhangxinxu.com/wordpress/2019/06/css-filters-cssgram/) 下一篇»
（本篇完）
 是不是学到了很多？可以分享到微信！
 有话要说？点击[这里](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/#comment)。
本文为原创文章，欢迎分享，勿全文转载，如果内容你实在喜欢，可以加入收藏夹，永不过期，而且还会及时更新知识点以及修正错误，阅读体验也更好。
本文地址： [https://www.zhangxinxu.com/wordpress/?p=8488](https://www.zhangxinxu.com/wordpress/?p=8488)
**相关文章**

109. [实现a元素href URL链接自动刷新或新窗口打开](https://www.zhangxinxu.com/wordpress/2019/10/a-href-target-window-blank-refresh/)(0.224)
110. [HTML \<area\>\<map\>标签及在实际开发中的应用](https://www.zhangxinxu.com/wordpress/2017/05/html-area-map/)(0.160)
111. [HTML audio基础API完全使用指南](https://www.zhangxinxu.com/wordpress/2019/07/html-audio-api-guide/)(0.160)
112. [基于用户行为的图片等资源预加载](https://www.zhangxinxu.com/wordpress/2016/06/image-preload-based-on-user-behavior/)(0.154)
113. [借助Service Worker和cacheStorage缓存及离线开发](https://www.zhangxinxu.com/wordpress/2017/07/service-worker-cachestorage-offline-develop/)(0.154)
114. [JS获取上一访问页面URL地址document.referrer实践](https://www.zhangxinxu.com/wordpress/2017/02/js-page-url-document-referrer/)(0.103)
115. [小tips: 页面链接跳转历史URL不记录的兼容处理](https://www.zhangxinxu.com/wordpress/2017/02/page-link-url-history-null-not-record/)(0.103)
116. [link rel=alternate网站换肤功能最佳实现](https://www.zhangxinxu.com/wordpress/2019/02/link-rel-alternate-website-skin/)(0.101)
117. [利用废弃的html rel import实现页面include功能](https://www.zhangxinxu.com/wordpress/2021/07/html-rel-import-include/)(0.101)
118. [详细介绍HTML favicon尺寸 格式 制作等相关知识](https://www.zhangxinxu.com/wordpress/2019/06/html-favicon-size-ico-generator/)(0.095)
119. [基于原生HTML的UI组件开发](https://www.zhangxinxu.com/wordpress/2016/01/development-of-ui-components-based-on-native-html/)(RANDOM - 0.006)

分享到：
标签： [a](https://www.zhangxinxu.com/wordpress/tag/a/), [area](https://www.zhangxinxu.com/wordpress/tag/area/), [dns-prefetch](https://www.zhangxinxu.com/wordpress/tag/dns-prefetch/), [form](https://www.zhangxinxu.com/wordpress/tag/form/), [html](https://www.zhangxinxu.com/wordpress/tag/html/), [link](https://www.zhangxinxu.com/wordpress/tag/link/), [manifest](https://www.zhangxinxu.com/wordpress/tag/manifest/), [nofollow](https://www.zhangxinxu.com/wordpress/tag/nofollow/), [noopener](https://www.zhangxinxu.com/wordpress/tag/noopener/), [noreferrer](https://www.zhangxinxu.com/wordpress/tag/noreferrer/), [OpenSearch](https://www.zhangxinxu.com/wordpress/tag/opensearch/), [preconnect](https://www.zhangxinxu.com/wordpress/tag/preconnect/), [prefetch](https://www.zhangxinxu.com/wordpress/tag/prefetch/), [preload](https://www.zhangxinxu.com/wordpress/tag/preload/), [prerender](https://www.zhangxinxu.com/wordpress/tag/prerender/), [referrer](https://www.zhangxinxu.com/wordpress/tag/referrer/), [rel](https://www.zhangxinxu.com/wordpress/tag/rel/), [shortlink](https://www.zhangxinxu.com/wordpress/tag/shortlink/)

**发表评论（目前13条评论）**
 名称 (必须)
 邮件地址(不会被公开) (必须)
 122.

 **sitemap.xml说道：******==2020年10月19日 18:16========sitemap.xml 应该用哪个rel呢======**回复**

 **贾明说道：******==2020年09月9日 19:03========文章有错别字：除了目前Safari不支持以为 。以为 =\> 以外======**回复**

 **RED说道：******==2019年11月21日 07:21========我在 MDN 上看到 index 与 archives 皆已废弃========请问有替代选项吗？========我的 blog 非常需要这两个属性啊======**回复**

 **XboxYan说道：******==2019年09月30日 14:19========已经被淘汰了，不用再写了~======**回复**

 **XboxYan说道：******==2019年09月30日 14:19========rel=”import” href=”module.html”======**回复**

 **masterkong说道：******==2019年06月21日 16:35========原文中 “现在已经9021年了，shortcut这种link类型早已不符合规范，浏览器直接无视，因此，没有必要再使用了，我们直接使用icon类型即可。” 建议更详细说明下shortcut为何不符合规范。========可以参考下 大漠的《弄懂Favicon》一文的说法 “IE 5本打算用shortcut icon来表示页面和图标之间的关系，但是当这份规范把rel属性值所表示的关系用空格分开后，这样理论上shortcut icon是创建了两种关系，即shortcut和icon。直到2010年HTML5规范把icon单独作为标准标识符。所以，在非IE浏览器中指定favicon时，可以不加shortcut属性。”======**回复**

 **SukkaW说道：******==2019年06月6日 15:15========rel=”noreferrer” 应该现在的规范应该是不能用在 meta 标签中的吧，现代浏览器应该遵守的是 Referrer Policy。======**回复**

 **喵喵土说道：******==2019年06月6日 10:58========14. rel=”license”========\<a href=”/somesite/bsd-license” rel=”nofollow”\>BSD license\</a\>========这里没有写 rel=”license” ？只要写 license就行？======**回复**

 **小忆说道：******==2019年06月3日 14:50========每次看大神的文章都会学到很多新东西======**回复**

 **bilibili说道：******==2019年06月3日 10:49========zxx大神的每篇文章都为我打开了新世界======**回复**

 **jojo说道：******==2019年06月3日 10:03========第20条，写成了前端时间======**回复**

 **yukapril说道：******==2019年06月3日 09:49========完整的看完了，受教。期待张老师对HTML Imports研究文章==
 \> 来自 \<[https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/)\>

HTML rel属性值索引33个rel属性值完全展示结束语

\> 来自 \<[https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/](https://www.zhangxinxu.com/wordpress/2019/06/html-a-link-rel/)\>

:::
