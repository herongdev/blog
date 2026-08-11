---
title: "script的crossorigin属性"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语言与运行时"
description: "1. 同源策略 如果两个页面的 协议 ， 端口 和 域名 都相同，则两个页面具有相同的 源 （origin）。 同源策略 是一种安全机制，它限制了非同源脚本之间的 交互方式 。 例如，在使用XMLHttpRequest或 \\<img\\ 标签时，会受到同源策略的约束。 这些交互通常。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/概述/(10m)script的crossorigin属性.md"
---
::: v-pre

# script的crossorigin属性

> 本节目标：理解“script的crossorigin属性”的核心思路，并能把它用于实际开发或面试表达。
**1. 同源策略**
如果两个页面的**协议**，**端口**和**域名**都相同，则两个页面具有相同的**源**（origin）。

**同源策略**是一种安全机制，它限制了非同源脚本之间的**交互方式**。
例如，在使用XMLHttpRequest或 \<img\> 标签时，会受到同源策略的约束。

这些交互通常分为三类：
（1）通常允许跨域写操作（Cross-origin writes）。例如链接（links），重定向以及表单提交。
（2）通常允许跨域资源嵌入（Cross-origin embedding）。
（3）**通常不允许跨域读操作**（Cross-origin reads）。但常可以通过内嵌资源来巧妙的进行读取访问。
例如，可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法，或 [availability of an embedded resource](https://www.grepular.com/Abusing_HTTP_Status_Codes_to_Expose_Private_Information)。

以下是可能嵌入跨域的资源的一些示例：
（1）\<script src="..."\>\</script\> 标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。
（2）\<link rel="stylesheet" href="..."\> 标签嵌入CSS。
（3）\<img\>嵌入图片。支持的图片格式包括PNG,JPEG,GIF,BMP,SVG,...
（4）\<video\> 和 \<audio\>嵌入多媒体资源。
（5）\<object\>, \<embed\> 和 \<applet\> 的插件。
（6）@font-face引入的字体。一些浏览器允许跨域字体（ cross-origin fonts），一些需要同源字体（same-origin fonts）。
（7）\<frame\> 和 \<iframe\> 载入的任何资源。站点可以使用X-Frame-Options消息头来阻止这种形式的跨域交互。

**2. 跨域资源共享**
跨域资源共享 [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)，通过在服务器端设置 [Access-Control-Allow-Origin](https://www.w3.org/TR/cors/#http-access-control-allow-origin) 响应头，
允许浏览器发起跨域请求，例如，跨域 [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)，[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 请求。
[Access-Control-Allow-Origin](https://www.w3.org/TR/cors/#http-access-control-allow-origin) 的值为发起跨域请求的那个域名，表示允许这个域名的网页访问当前资源。
服务器端可以通过请求头中的 [Origin](https://www.w3.org/TR/cors/#http-origin) 字段，来判断某个请求是否跨域请求。

```
**3. onerror信息**
服务器端如果没有设置 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)，
普通的跨域<script>标签，将只向window.onerror反馈尽量少的内容。
window.onerror = (...args) => console.log(args);  // ["Script error.", "", 0, 0, null]
给<script>标签添加 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-crossorigin) 属性，
并在服务器端设置 [Access-Control-Allow-Origin](https://www.w3.org/TR/cors/#http-access-control-allow-origin) 响应头，允许脚本被跨域访问，
就可以在window.onerror中获取更详细的日志信息。
[    "Uncaught ReferenceError: a is not defined",     "[http://127.0.0.1:8081/index.js](http://127.0.0.1:8081/index.js)",     1,     1,     ReferenceError: a is not defined        at [http://127.0.0.1:8081/index.js:1:1](http://127.0.0.1:8081/index.js:1:1)]
**注：**
普通<script>标签是可以加载跨域脚本的，
但如果给跨域<script>标签添加了crossorigin属性，
（且服务器端**没有**设置[Access-Control-Allow-Origin](https://www.w3.org/TR/cors/#http-access-control-allow-origin) 响应头），
就会出现以下错误，
Access to Script at '[http://127.0.0.1:8081/index.js](http://127.0.0.1:8081/index.js)' from origin '[http://127.0.0.1:8080](http://127.0.0.1:8080)' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin '[http://127.0.0.1:8080](http://127.0.0.1:8080)' is therefore not allowed access.
**示例代码：**
（1）在./test-cors1/ 文件夹下启动静态网站，监听8080端口
<!-- ./test-cors1/index.html --><script crossorigin src="http://127.0.0.1:8081/index.js"></script>
（2）在./test-cors2/ 文件夹下启动静态网站，监听8081端口
// ./test-cors2/index.jsa;
```

**4. crossorigin属性**
[crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 属性不止可以用于\<script\>标签，还可以用与\<img\>，\<video\>等标签，
用于配置 CORS 的请求数据，见下表，

|
|
```
**Keyword**
```
```
**State**
```
```
**Request Mode**
```
```
**Credentials Mode**
```
```
the attribute is omitted
```
```
No CORS
```
```
"no-cors"
```
```
"omit"
```
```
""
```
```
Anonymous
```
```
"cors"
```
```
"same-origin"
```
```
"anonymous"
```
```
Anonymous
```
```
"cors"
```
```
"same-origin"
```
```
"use-credentials"
```
```
Use Credentials
```
```
"cors"
```
```
"include"
```

不同的crossorigin值，指定了不同的[Request Mode](https://fetch.spec.whatwg.org/#concept-request-mode) 和 [Credentials Mode](https://fetch.spec.whatwg.org/#concept-request-credentials-mode)。
其中，术语use credentials指的是，cookies，http authentication 和客户端ssl证书。
The term [user credentials](https://www.w3.org/TR/cors/#user-credentials) for the purposes of this specification means **cookies**, **HTTP authentication**, and **client-side SSL certificates** that would be sent based on the user agent's previous interactions with the origin. Specifically it does not refer to proxy authentication or the Origin header.

```
**参考**
[MDN: Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
[MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
[MDN: script - crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-crossorigin)
[MDN: The crossOrigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)
[W3C HTML5: CORS settings attributes](https://www.w3.org/TR/html5/infrastructure.html#cors-settings-attributes)
[W3C: CORS](https://www.w3.org/TR/cors/)
[Wikipedia: Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
```
 \> 来自 \<[https://www.jianshu.com/p/a45c9d089c93](https://www.jianshu.com/p/a45c9d089c93)\>

:::
