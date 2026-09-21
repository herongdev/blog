---
title: 微信开放平台网站扫码登录：WxLogin 二维码从哪来
date: 2026-05-23
tags:
  - 微信登录
  - 微信开放平台
  - Next.js
  - OAuth
categories:
  - 登录鉴权
---

网站应用里的微信扫码登录二维码，**不是我们自己画出来的**，而是 **微信开放平台前端登录组件** 生成的。搞清这条链路，后面排查「二维码出不来」「iframe 里 Oops」会快很多。

---

## 整体流程（四步）

```text
1. 页面加载 wxLogin.js → 挂载 window.WxLogin
2. new WxLogin({ ... }) → 在指定 DOM 里插入 iframe
3. iframe 加载 open.weixin.qq.com/.../qrconnect → 微信渲染二维码
4. 用户扫码确认 → 跳 redirect_uri 带 code → 后端换 token / 写登录态
```

---

## 1. 页面加载微信脚本

在登录页（例如 Next.js `app/.../sign-in/page.tsx`）引入官方脚本：

```tsx
<Script
  src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
  strategy="afterInteractive"
  onLoad={() => setWechatReady(true)}
/>
```

`wxLogin.js` 会在浏览器里挂一个全局对象：

```ts
window.WxLogin
```

脚本没加载成功时，后面 `new WxLogin` 不会执行，页面上也就不会出现二维码容器里的内容。

---

## 2. 调用 `new WxLogin(...)`

脚本加载完成后，在**已挂载的 DOM 容器**上初始化：

```ts
new window.WxLogin({
  self_redirect: false,
  id: "wechat-login",
  appid: wechatAppId,
  scope: "snsapi_login",
  redirect_uri: redirectUri,
  state: "your-login-state",
  style: "black",
  href: "",
  stylelite: 0,
  fast_login: true,
})
```

常见参数含义：

| 参数 | 作用 |
|------|------|
| `id` | 二维码挂载的 DOM 容器，例如 `<div id="wechat-login" />` |
| `appid` | 微信开放平台 **网站应用** 的 AppID |
| `scope` | 网站扫码登录固定为 `snsapi_login` |
| `redirect_uri` | 编码后的回调地址；**参与生成二维码链接**，且扫码后跳回此地址（须与开放平台配置一致） |
| `state` | 防 CSRF / 标记登录来源，回调时会原样带回 |

页面上需要预留空容器：

```html
<div id="wechat-login"></div>
```

---

## 3. 微信组件插入 iframe（二维码在这）

`WxLogin` **不会**直接返回一张二维码图片 URL。它会在 `#wechat-login` 里 **插入一个 iframe**，地址大致指向：

```txt
https://open.weixin.qq.com/connect/qrconnect
  ?appid=...
  &redirect_uri=...
  &response_type=code
  &scope=snsapi_login
  &state=...
```

**二维码在 iframe 内部由微信自己渲染**。我们在 DevTools 里看到的往往是「一个 iframe」，而不是 `<img>` 标签。

若 `appid`、`redirect_uri`、授权域名等校验不通过，iframe 里可能直接显示 **Oops** 等错误页，而不是二维码。

> 下面一节专门说明：**`redirect_uri` 在还没扫码时就已经影响二维码能否生成**，不只是扫码后的跳转地址。

---

## 重要：`redirect_uri` 在出码阶段就会参与校验

很多人以为：`redirect_uri` 只和用户**扫码之后**跳回哪里有关。  
**有关系，但不是「扫码后才有关系」。**

微信这个二维码不是我们自己画的一张静态图，而是开放平台根据 `new WxLogin({ ... })` 传入的参数 **生成 / 渲染** 出来的登录组件：

```ts
new WxLogin({
  appid,
  scope: "snsapi_login",
  redirect_uri,
  state,
  // ...
})
```

其中 **`redirect_uri` 是生成二维码链接的一部分**。二维码里编码的不是单纯图片 URL，而是一条微信授权地址，大致是：

```txt
https://open.weixin.qq.com/connect/qrconnect
  ?appid=xxx
  &redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Fsign-in%2Fwechat...
  &response_type=code
  &scope=snsapi_login
  &state=xxx
```

微信在**展示二维码组件时**，就可能先校验这些参数是否合法，尤其是：

- `appid` 是否正确  
- `redirect_uri` 的域名是否在开放平台配置过  
- `scope` 是否允许（网站扫码为 `snsapi_login`）  
- 参数是否 **URL 编码** 正确  
- 当前页面 / iframe 加载环境是否符合微信规则  

所以你**虽然还没扫码**，微信组件在生成二维码时**已经知道**扫码后要跳哪里。  
若 `redirect_uri` 是 `http://localhost:8081/...`，而开放平台只配置了 `localhost` 默认 **80 端口** 的回调，它可能**直接不渲染二维码**，iframe 里显示：

```txt
Oops! Something went wrong :(
```

可以对比理解：

| | 普通图片 | 微信登录二维码 |
|--|----------|----------------|
| 你给什么 | 一个图片 URL | 一组授权参数（含 `redirect_uri`） |
| 展示前 | 浏览器直接拉取展示 | 微信**先校验参数**，再生成可扫的码 |
| `redirect_uri` 何时生效 | 不涉及 | **出码时**已写入链接；**扫码后**再用于跳转 |

**结论：回调地址影响的不只是扫码后的跳转，也影响二维码能不能被微信生成出来。**

典型踩坑：`redirect_uri` 带了非默认端口、路径与后台登记不一致、未 `encodeURIComponent`、http/https 与配置不符——都会表现为 **Oops 而不是二维码**，容易误以为是 `wxLogin.js` 没加载。

---

## 4. 扫码后：微信回调 + 后端换票

用户扫码并确认后，浏览器会跳到你传入的 `redirect_uri`，并追加查询参数，例如：

```txt
/api/sign-in/wechat?code=xxx&state=your-login-state
```

（实际 URL 还可能带业务自定义参数，如 `customState=...`。）

后端 Next API Route（或其它框架的路由）用 `code` 请求微信：

**第一步：换 access_token**

```txt
GET https://api.weixin.qq.com/sns/oauth2/access_token
```

常用 query：

- `appid`
- `secret`（`WECHAT_APP_SECRET`，**只放服务端**）
- `code`
- `grant_type=authorization_code`

得到 `access_token`、`openid`（及可能的 `unionid` 等）。

**第二步：拉用户信息（可选）**

```txt
GET https://api.weixin.qq.com/sns/userinfo
```

用 `access_token` + `openid` 取昵称、头像等，再写入数据库、发 session / cookie，完成登录。

```text
用户扫码
  → 微信跳 redirect_uri?code=...
  → 服务端用 code + secret 换 access_token
  → 再拉 userinfo（如需）
  → 建用户 / 更新资料 → 设置登录 cookie
```

---

## 心智模型图

```mermaid
sequenceDiagram
  participant Page as 你的网站
  participant WxJS as wxLogin.js
  participant Iframe as 微信 iframe
  participant WX as 微信服务器
  participant API as 你的后端

  Page->>WxJS: 加载脚本
  WxJS->>Page: window.WxLogin
  Page->>WxJS: new WxLogin({ appid, redirect_uri, ... })
  WxJS->>Iframe: 插入 qrconnect iframe（含 redirect_uri）
  Iframe->>WX: 校验 appid / redirect_uri / scope
  alt 参数合法
    WX->>Iframe: 渲染二维码
  else 参数不合法
    WX->>Iframe: Oops 错误页
  end
  Note over Iframe,WX: 用户手机扫码确认
  WX->>Page: 302 redirect_uri?code&state
  Page->>API: /api/sign-in/wechat?code=...
  API->>WX: oauth2/access_token
  WX->>API: access_token, openid
  API->>WX: sns/userinfo（可选）
  API->>Page: Set-Cookie / 登录成功
```

---

## 二维码出不来：通常卡在哪

| 阶段 | 现象 | 常见原因 |
|------|------|----------|
| 1 | 容器一直是空的 | `wxLogin.js` 未加载（网络、CSP、脚本被拦） |
| 2 | 无 iframe | `wechatReady` 为 false 时没执行 `new WxLogin`；`id` 与 DOM 不一致 |
| 3 | iframe 有，里面是 Oops | `appid` 错、非网站应用、`redirect_uri` **在出码阶段校验失败**（域名/端口/路径/编码与开放平台不一致）、**授权域名**未配置 |
| 4 | 能扫码，回调 4xx/5xx | 后端 `secret`、code 过期、redirect 路由未实现 |

排查顺序建议：**Network 里 wxLogin.js 是否 200 → Elements 里是否有 iframe → iframe 内是否 Oops → 开放平台授权回调域与 redirect_uri**。

---

## 实践注意：localhost 与「别拦 WxLogin」

有的项目会在「本地域名」时**不加载**二维码、只显示文字提示。若你确认 **localhost 在微信开放平台已配好授权回调页**，技术上应 **允许 `WxLogin` 正常初始化**，把错误信息放在旁边做诊断，而不是在代码里直接拦截 `new WxLogin`。

否则会出现：本机其实能配通，却被前端逻辑提前挡住，误以为「微信组件坏了」。

---

## 和 uni-app / 小程序微信登录的区别

| | 网站扫码（本文） | uni-app `uni.login` 等 |
|--|------------------|-------------------------|
| 场景 | PC / H5 浏览器打开网站 | App、小程序 |
| 前端 | `wxLogin.js` + iframe | 各端 SDK / `uni.login` 拿 code |
| scope | `snsapi_login` | 因端而异 |
| 配置 | 微信开放平台 **网站应用** | 移动应用 / 小程序 AppID |

站内另有 [uniapp 微信登录](./uniapp%20微信登录.md) 笔记，可对照看 code 换 token 的后半段相似、前端入口不同。

---

## 一句话总结

> **二维码 = 微信根据授权参数（含 `redirect_uri`）生成 iframe 内的登录码；参数在出码阶段就会校验；扫码后带 `code` 回跳 `redirect_uri`，再由服务端换票登录。**

前端只负责挂脚本和容器。**能不能出码**（含 `redirect_uri` 是否与开放平台一致）、**扫码后能不能回来**，都取决于 `WxLogin` 参数与开放平台配置——且很多错误在**还没扫码**时就会以 iframe 内 Oops 暴露出来。
