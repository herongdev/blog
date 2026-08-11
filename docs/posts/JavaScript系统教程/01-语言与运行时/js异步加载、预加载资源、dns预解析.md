---
title: "js异步加载、预加载资源、dns预解析"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "js异步加载、预加载资源、dns预解析 huangpb0624 已于 2022 05 22 16:15:04 修改 2255 收藏 3 分类专栏： JavaScript 性能优化 文章标签： 异步加载 预加载 版权 JavaScript 同时被 2 个专栏收录 61 篇文章4 订。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/js异步加载、预加载资源、dns预解析.md"
---
::: v-pre

# js异步加载、预加载资源、dns预解析

> 本节目标：理解“js异步加载、预加载资源、dns预解析”的核心思路，并能把它用于实际开发或面试表达。
js异步加载、预加载资源、dns预解析

huangpb0624

已于 2022-05-22 16:15:04 修改

2255
收藏 3
分类专栏： JavaScript 性能优化 文章标签： 异步加载 预加载
版权

JavaScript
同时被 2 个专栏收录
61 篇文章4 订阅
订阅专栏

性能优化
9 篇文章0 订阅
订阅专栏
异步加载 js 文件的几种方式
\<script src="a.js"\>\</script\>
以上写法是平常常用的写法，浏览器遇到该 script 脚本会立即加载并执行此脚本，是一个同步的过程。

有时候我们想让 script 脚本异步加载，那要怎么处理呢？

方式一：在 \<script\> 标签中加上 defer 或 async 属性
\<script async src="script.js"\>\</script\>
\<script defer src="script.js"\>\</script\>
defer 和 async 机制在加载 js 脚本方面是相同的，都是异步的（相较于 HTML 解析）。区别在于对 js 脚本的执行时间上：

defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行（即，渲染完再执行），而且是按照 defer 脚本的声明顺序来执行脚本的。
async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染（下载完就执行），多个async脚本是不能保证加载顺序的。
如果 \<script\> 标签同时有 async 和 defer，浏览器会优先遵从 async 属性并忽略 defer 属性。

由于 async 不能保证脚本的执行顺序，所以在实际开发中，大部分用的是 defer。

方式二：加载 ES6 模块
\<script type="module" src="foo.js"\>\</script\>
添加 type="module" 属性，可以让浏览器异步加载 ES6 模块，效果等同于添加 defer。

\<script type="module" src="foo.js"\>\</script\>
\<!-- 等同于 --\>
\<script type="module" src="foo.js" defer\>\</script\>
当然，如有需要你也可以换成 async 属性。

\<script type="module" src="foo.js" async\>\</script\>
方式三：动态创建 \<script\> 标签
动态创建的 \<script\> 标签，设置 src 并不会开始下载，而是要添加到文档中，JS文件才会开始下载。

function loadAsync(url) \{
let script = document.createElement('script');
script.src = url;
// 插入到文档中才会开始下载
document.body.appendChild(script);
\}
方式四：XHR 异步加载JS
let xhr = new XMLHttpRequest();
xhr.open("get", "js/xxx.js",true);
xhr.send();
xhr.onreadystatechange = function() \{
if (xhr.readyState == 4 && xhr.status == 200) \{
eval(xhr.responseText);
\}
\}
预加载资源
prefetch 和 preload
prefetch（常用）

兼容性：IE11

prefetch 和 preload 一样，都是对资源进行预加载，但是 prefetch 预加载的是其他页面会用到的资源。

注意：prefetch 仅提前加载，并不执行

当然，prefetch 不会像 preload 一样，在页面渲染的时候加载资源，而是利用浏览器空闲时间来下载。当进入下一页面，就可直接从 disk cache 里面取，既不影响当前页面的渲染，又提高了其他页面加载渲染的速度。

使用方式：

\<!-- 对资源进行 prefetch 预加载 --\>
\<link rel="prefetch" href="next.css" /\>
\<link rel="prefetch" href="next.js" /\>
preload

使用 preload 可以对当前页面所需的脚本、样式等资源进行提前加载，而无需等到 html 解析到资源时才进行加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

使用方式：

将 link 标签的 rel 属性的值设为 preload，as 属性的值为资源类型（如script、style、audio、video、font、image等）。

\<!-- 提前加载资源 --\>
\<link rel="preload" href="style.css" as="style"\>
\<link rel="preload" href="main.js" as="script"\>   \<!-- 使用资源 --\>
\<link rel="stylesheet" href="style.css"\>
\<script src="main.js" defer\>\</script\>
总结：对当前页面需要的资源，使用 preload 进行预加载。对其它页面需要的资源进行 prefetch 预加载。

subresource 和 prerender
subresource

subresource 可以用来指定资源是当前页面资源的最高优先级，如果资源买上就会用到，推荐使用 subresource。

使用方式：

\<link rel="subresource" href="styles.css"\>
prerender

prerender 是一个重量级的选项，它可以让浏览器提前加载指定页面的所有资源。

使用方式：

\<link rel="prerender" href="/thenextpage.html" /\>
prerender 就像是在后台打开了一个隐藏的 tab，会下载所有的资源、创建DOM、渲染页面、执行js等等。如果用户进入指定的链接，隐藏的这个页面就会立马进入用户的视线。

但是要注意，一定要在十分确定用户会点击某个链接时才使用该特性，否则客户端会无端的下载很多资源和渲染这个页面。

正如任何提前动作一样，预判总是有一定风险出错。如果提前的动作是昂贵的（比如高CPU、耗电、占用带宽），就要谨慎使用了。

可以利用 Page Visibility API 来防止页面在还没真正展示给用户时就触发了 js 的执行。

dns预解析
\<head\>
\<link rel="dns-prefetch" href="//img.alicdn.com/" /\>
\<link rel="dns-prefetch" href="https://cdn.bootcss.com"\>
\</head\>
预先解析域名并把结果缓存起来 。

普遍来说合理的dns prefetching能对页面性能带来50ms ~ 300ms的提升。

手动dns prefetching的代码实际上还是会增加html的代码量的，特别是域名多的情况下。
所以，最优的方案应该是：通过js初始化一个iframe异步加载一个页面，而这个页面里包含本站所有的需要手动dns prefetching的域名。

正确的使用姿势
1.对静态资源域名做手动dns prefetching。
2.对js里会发起的跳转、请求做手动dns prefetching。
3.不用对超链接做手动dns prefetching，因为chrome会自动做dns prefetching。
4.对重定向跳转的新域名做手动dns prefetching，比如：页面上有个A域名的链接，但访问A会重定向到B域名的链接，这么在当前页对B域名做手动dns prefetching是有意义的。
————————————————
版权声明：本文为CSDN博主「huangpb0624」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/huangpb123/article/details/84170557

:::
