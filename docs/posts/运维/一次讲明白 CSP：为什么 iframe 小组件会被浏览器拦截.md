---
title: 一次讲明白 CSP：为什么 iframe 小组件会被浏览器拦截
date: 2026-04-24
tags:
  - Web安全
  - CSP
  - iframe
  - Nginx
  - 宝塔
categories:
  - 前端工程排障
---

# 一、整体思路

CSP，全称是 **Content Security Policy**，中文一般叫**内容安全策略**。

它的作用可以简单理解为：

> 服务器告诉浏览器：这个页面允许加载哪些来源的脚本、图片、样式、字体、接口、iframe 等资源。

所以 CSP 不是后端业务逻辑，也不是前端框架功能，而是一个**浏览器安全策略**。

你这次的问题，本质是：

```txt
页面想加载 iframe：
https://gtchome.returning.ai/

但是当前页面的 CSP 只允许加载自己站点的资源：
default-src 'self' data:

所以浏览器直接拦截 iframe。
```

MDN 对 `default-src` 的说明是：它会作为其他资源指令的兜底规则；如果更具体的规则没有写，浏览器就会用 `default-src` 来判断是否允许加载。([MDN Web Docs][1])

# 二、CSP 是在哪里生效的？

CSP 通常是通过 HTTP 响应头下发的。

比如你现在看到的：

```http
content-security-policy:
default-src 'self' 'unsafe-inline' 'unsafe-eval' data:;
img-src * data:;
font-src * data:;
```

这表示服务器返回页面或资源时，顺便告诉浏览器：

```txt
这个页面默认只能加载自己站点的资源；
图片可以任意来源；
字体可以任意来源；
但 iframe 没有单独放行规则。
```

重点是：**CSP 是浏览器执行的。**

服务器只是返回这个规则，真正拦截资源的是浏览器。

所以排查时要看：

```txt
DevTools → Network → 主页面请求 → Response Headers → Content-Security-Policy
```

如果这里有 CSP，浏览器就会按它来执行。

# 三、几个最常见的 CSP 指令

## 1. default-src

```http
default-src 'self' data:
```

它是默认规则。

如果某类资源没有专门配置，比如没有写 `frame-src`，浏览器就会退回使用 `default-src`。

你的错误里这句话非常关键：

```txt
Note that 'frame-src' was not explicitly set, so 'default-src' is used as a fallback.
```

翻译一下就是：

```txt
你没有配置 frame-src，所以我用 default-src 来判断 iframe。
```

而你的 `default-src` 里面没有：

```txt
https://gtchome.returning.ai
```

所以 iframe 被拦截。

## 2. img-src

```http
img-src * data:
```

控制图片来源。

这表示图片可以从任意来源加载，也可以加载 base64 / data URL。

## 3. font-src

```http
font-src * data:
```

控制字体来源。

这表示字体可以从任意来源加载。

## 4. script-src

```http
script-src 'self'
```

控制 JavaScript 脚本来源。

你当前响应头里没单独写 `script-src`，所以脚本也会走 `default-src`。

但是你现在的 CSP 写了：

```http
default-src 'self' 'unsafe-inline' 'unsafe-eval' data:
```

所以内联脚本、`eval` 这类危险能力也被允许了。

从安全角度看，这不是很理想，但这是另一个问题。

## 5. frame-src

```http
frame-src 'self' https://gtchome.returning.ai
```

控制**当前页面允许嵌入哪些 iframe**。

MDN 对 `frame-src` 的说明是：它用于指定页面中的 `<frame>`、`<iframe>` 等嵌套浏览上下文可以从哪些来源加载；如果没有配置 `frame-src`，浏览器会先看 `child-src`，再回退到 `default-src`。([MDN Web Docs][2])

你这次最需要加的就是它。

## 6. child-src

```http
child-src 'self' https://gtchome.returning.ai
```

它是更早期/更宽泛的子资源控制方式，可以影响 iframe、worker 等。

为了兼容，一般可以和 `frame-src` 一起加。

## 7. frame-ancestors

这个容易和 `frame-src` 搞混。

```http
frame-ancestors 'self'
```

它控制的是：

> 当前页面允许被谁 iframe 嵌入。

而 `frame-src` 控制的是：

> 当前页面允许 iframe 加载谁。

区别如下：

| 指令              | 作用                              | 你的问题是否相关 |
| ----------------- | --------------------------------- | ---------------- |
| `frame-src`       | 我这个页面可以嵌入哪些 iframe     | 相关             |
| `frame-ancestors` | 我这个页面可以被哪些页面嵌入      | 不直接相关       |
| `X-Frame-Options` | 老式的“我能不能被别人 iframe”控制 | 不直接相关       |

MDN 明确区分了：`frame-src` 是控制页面里 iframe 能加载哪里，`frame-ancestors` 是控制哪些父页面能嵌入当前页面。([MDN Web Docs][3])

# 四、结合你这次的问题看

你现在的响应头是：

```http
content-security-policy:
default-src 'self' 'unsafe-inline' 'unsafe-eval' data:;
img-src * data:;
font-src * data:;
```

它没有：

```http
frame-src
```

所以浏览器处理 iframe 时会这样判断：

```txt
1. 页面要 iframe 加载 https://gtchome.returning.ai/
2. 浏览器检查 CSP
3. 没有 frame-src
4. 没有 child-src
5. 回退到 default-src
6. default-src 只允许 'self'、data:
7. gtchome.returning.ai 不是当前站点
8. 拦截
```

所以报错：

```txt
Framing 'https://gtchome.returning.ai/' violates the following Content Security Policy directive: "default-src 'self' data:".
```

# 五、为什么生产正常，测试环境挂了？

因为 CSP 是**每个站点自己返回的响应头**。

生产环境可能返回的是：

```http
frame-src 'self' https://gtchome.returning.ai ...
```

或者生产根本没有这么严格的 CSP。

而测试环境 `https://stag.gtctrader1203.top/user` 返回的是：

```http
default-src 'self' ...
```

并且没写 `frame-src`。

所以生产正常，测试挂了，非常合理。

这也说明：

```txt
widget 服务本身大概率没有坏。
```

真正的问题是：

```txt
测试环境宿主站点 CSP 没放行 widget iframe 域名。
```

# 六、应该加在哪里？

你们是 PHP + 宝塔，优先看这几个地方：

```txt
1. 宝塔站点 Nginx 配置
2. 宝塔站点 Apache 配置，如果你们用的是 Apache
3. PHP 项目里的 header() 设置
4. 框架中间件，比如 Laravel / ThinkPHP / Yii 的响应头配置
5. Cloudflare 的 Transform Rules / Response Headers
6. 宝塔安全插件、防火墙、反向代理配置
```

你返回头里有：

```http
server: cloudflare
cf-cache-status: MISS
```

说明经过了 Cloudflare。

所以如果宝塔和 PHP 里都找不到，就要去 Cloudflare 查是否配置了响应头修改规则。

# 七、宝塔 Nginx 修改方式

宝塔后台进入：

```txt
网站 → stag.gtctrader1203.top → 设置 → 配置文件
```

搜索：

```txt
Content-Security-Policy
```

如果有类似：

```nginx
add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:;";
```

改成：

```nginx
# 放行 Returning.ai 小组件 iframe 来源，避免 frame-src 缺失时回退 default-src 导致 iframe 被拦截
add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:; frame-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai; child-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai;" always;
```

然后测试 Nginx 配置：

```bash
nginx -t
```

没问题后重载：

```bash
nginx -s reload
```

或者在宝塔里点：

```txt
保存 → 重载 Nginx
```

# 八、PHP 中修改方式

如果是在 PHP 里设置的，可能是这种：

```php
header("Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:;");
```

改成：

```php
// 放行 Returning.ai 小组件 iframe 来源，避免浏览器使用 default-src 兜底拦截 iframe
header("Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:; frame-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai; child-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai;");
```

PHP 项目里可以全局搜索：

```txt
Content-Security-Policy
```

或者：

```txt
default-src
```

# 九、Cloudflare 里可能在哪里改？

如果宝塔和 PHP 里都找不到 CSP，那很可能是 Cloudflare 加的。

去 Cloudflare 后台看：

```txt
Rules → Transform Rules → Modify Response Header
```

或者：

```txt
Rules → Configuration Rules
```

找有没有设置：

```txt
Content-Security-Policy
```

如果有，把原来的值改成包含 `frame-src` 的版本。

改完后，建议清缓存：

```txt
Caching → Purge Cache → Purge Everything
```

至少清这些：

```txt
https://stag.gtctrader1203.top/user
相关 JS 文件
```

因为你现在响应头里有：

```http
cache-control: max-age=43200
```

说明缓存时间是 12 小时。

# 十、`X-Frame-Options: SAMEORIGIN` 要不要动？

你响应头里还有：

```http
x-frame-options: SAMEORIGIN
```

这个很多人会误会。

它控制的是：

```txt
当前页面是否允许被别人 iframe 嵌入。
```

不是控制：

```txt
当前页面是否允许嵌入别人。
```

你现在是：

```txt
stag.gtctrader1203.top 页面想嵌入 gtchome.returning.ai
```

所以主要看 `frame-src`。

除非未来你发现另一个报错：

```txt
Refused to display 'xxx' in a frame because it set 'X-Frame-Options' to 'SAMEORIGIN'
```

那才是被 iframe 的那个站点自己不允许被嵌入。

你现在的报错明确是 CSP：

```txt
frame-src was not explicitly set, so default-src is used as a fallback
```

所以先不用动 `X-Frame-Options`。

# 十一、CSP 常见值解释

## `'self'`

表示当前站点同源。

比如你现在页面是：

```txt
https://stag.gtctrader1203.top/user
```

那么 `'self'` 允许：

```txt
https://stag.gtctrader1203.top/xxx
```

但不允许：

```txt
https://gtchome.returning.ai/
https://prod-widgets.returning.ai/
```

因为它们不是同源。

## `data:`

允许 data URL，比如 base64 图片：

```txt
data:image/png;base64,...
```

## `*`

表示任意来源。

比如：

```http
img-src * data:
```

表示图片随便加载。

但是一般不建议所有资源都用 `*`，尤其是：

```http
script-src *
frame-src *
```

安全风险更高。

## `'unsafe-inline'`

允许内联脚本或内联样式。

比如：

```html
<script>
  alert(1);
</script>
```

从安全角度看，`unsafe-inline` 会削弱 CSP 防护能力。

## `'unsafe-eval'`

允许 `eval()`、`new Function()` 之类的动态执行。

这也会削弱 CSP 防护能力。

你们当前 CSP 里有：

```http
'unsafe-inline' 'unsafe-eval'
```

短期为了不影响老项目可以先保留；如果以后要提升安全性，再逐步清理。

# 十二、推荐你们这次最终配置

按你当前情况，先不要大改，只做最小修复：

```http
Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:; frame-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai; child-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai;
```

如果写在 Nginx：

```nginx
# 在原有 CSP 基础上补充 iframe 白名单，不改变现有脚本、图片、字体策略
add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:; frame-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai; child-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai;" always;
```

# 十三、排查流程

以后遇到 CSP 问题，可以按这个顺序：

## 1. 看 Console 报错

重点看：

```txt
violates the following Content Security Policy directive
```

比如：

```txt
script-src
img-src
connect-src
frame-src
default-src
```

它会告诉你是哪类资源被拦了。

## 2. 看 Network 响应头

看主页面或对应资源的：

```txt
Content-Security-Policy
```

注意有时候 CSP 不在 HTML 页面上，而是在 JS 文件、接口、反代层上。

## 3. 判断缺哪个指令

常见对应关系：

| 报错资源          | 应该看哪个指令                         |
| ----------------- | -------------------------------------- |
| JS 加载失败       | `script-src`                           |
| CSS 加载失败      | `style-src`                            |
| 图片加载失败      | `img-src`                              |
| 字体加载失败      | `font-src`                             |
| 接口请求失败      | `connect-src`                          |
| iframe 加载失败   | `frame-src`                            |
| WebSocket 失败    | `connect-src`                          |
| 页面不能被 iframe | `frame-ancestors` 或 `X-Frame-Options` |

## 4. 只加必要域名

不要一上来写：

```http
frame-src *
```

更推荐：

```http
frame-src 'self' https://gtchome.returning.ai https://prod-widgets.returning.ai
```

这样安全边界更清楚。

# 十四、你这次可以怎么跟团队解释

这次问题是测试环境站点的 CSP 拦截了 iframe。当前响应头里只有：

`default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src * data:; font-src * data:;`

没有配置 `frame-src`，所以浏览器加载 iframe 时回退到 `default-src`，而 `default-src` 只允许本站来源，导致 `https://gtchome.returning.ai/` 被拦截。

处理方式不是改 widget 代码，而是在 `stag.gtctrader1203.top` 这个宿主站点的 CSP 响应头里补充：

`frame-src 'self' https://gtchome.returning.ai https://gtctc.returning.ai https://production.returning.ai https://prod-widgets.returning.ai;`

如果是宝塔/Nginx 配置的 CSP，就在站点配置里改；如果是 PHP header 或 Cloudflare Response Header 规则加的，就在对应位置改。改完后因为经过 Cloudflare，建议清缓存。

# 十五、最后一句话总结

CSP 的核心不是“资源能不能访问”，而是：

```txt
浏览器是否允许当前页面加载这个来源的资源。
```

你这次就是：

```txt
资源 gtchome.returning.ai 本身可能是好的；
但是 stag.gtctrader1203.top 的 CSP 没允许 iframe 加载它；
所以浏览器拦了。
```

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/default-src?utm_source=chatgpt.com "Content-Security-Policy: default-src directive - MDN Web Docs"
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-src?utm_source=chatgpt.com "Content-Security-Policy: frame-src directive - MDN Web Docs"
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors?utm_source=chatgpt.com "Content-Security-Policy: frame-ancestors directive - HTTP | MDN"
