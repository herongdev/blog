---
title: iOS 混合应用调试：WebView、原生界面与网络请求
date: 2026-08-03 22:50:00
categories:
  - iOS
  - 调试
tags:
  - WKWebView
  - Safari Web Inspector
  - Xcode
  - DCloud
  - Instruments
---

# iOS 混合应用调试：WebView、原生界面与网络请求

iOS 混合应用通常同时包含三种内容：

```text
iOS 原生窗口和控制器
└── UIKit / SwiftUI 原生界面
    ├── 原生行情图表
    └── DCloud / Uni 容器
        └── WKWebView
            └── HTML、CSS、JavaScript
```

没有一个调试器能完整检查所有层级：

- Safari Web Inspector 负责 `WKWebView` 内部的 HTML、CSS 和 JavaScript。
- Xcode View Debugger 负责原生 `UIView`、`UIViewController` 和约束。
- Instruments 或代理工具负责完整的 App 网络请求。

## 一、Safari Web Inspector 最适合什么场景

Safari Web Inspector 本质上是 iOS WebView 版本的浏览器开发者工具。

它适合排查：

- Uni 页面中文字大小、行高、颜色。
- `margin`、`padding`、圆角和边框。
- CSS 是否被其他选择器覆盖。
- 安全区变量是否正确。
- 元素为什么被遮挡或裁剪。
- `z-index`、绝对定位和弹窗层级。
- JavaScript 报错。
- 本地存储、Cookie。
- WebView 发起的页面资源和网络请求。
- 页面实际视口尺寸。

例如当前真机页面中，可以直接看到：

```css
font-size: 16px;
font-family: "PingFang SC";
width: 375px;
height: 812px;
```

这比根据截图猜字号和间距准确得多。

### 开启方式

从 iOS 16.4 开始，每个 `WKWebView` 都需要单独设置 `isInspectable = true`，默认值是 `false`。[Apple WKWebView 文档](https://developer.apple.com/documentation/webkit/wkwebview/isinspectable)

Swift：

```swift
#if DEBUG
if #available(iOS 16.4, *) {
    webView.isInspectable = true
}
#endif
```

Objective-C：

```objc
#if DEBUG
if (@available(iOS 16.4, *)) {
    webView.inspectable = YES;
}
#endif
```

然后完成以下设置：

1. iPhone 打开“设置 → Safari → 高级 → 网页检查器”。
2. Mac Safari 或 Safari Technology Preview 打开设置。
3. 在高级设置中启用开发者功能。
4. 连接手机并启动 Debug App。
5. 从 `Develop → Inspect Apps and Devices` 选择设备和页面。

WebKit 官方也明确说明，远程检查支持开发者 App 中设置为可检查的 `WKWebView`、`JSContext` 和 `SFSafariViewController`。[WebKit 官方说明](https://webkit.org/web-inspector/enabling-web-inspector/)

### DCloud/Uni 的特殊点

DCloud 页面外面还有一层自己的 Frame 和 WebEngine，不能只检查最外层 `UIView`。

当前 App 中实际链路类似：

```text
PDRCoreAppFrame
└── H5WEWKWebview
    └── WKWebView
        └── Uni 页面 DOM
```

必须找到最后真正的 `WKWebView`，再设置：

```objc
webView.inspectable = YES;
```

当前真机运行时已经确认有两个可检查的 `WKWebView`：

```text
pages/index/index[2]
View
```

另一个 `H5WeexViewRootView` 不是 `WKWebView`，因此不能使用 Safari 检查。这类 nvue/Weex 原生渲染页面需要走 Xcode 原生调试链路。

## 二、原生元素能不能这样调试

可以调试，但不能使用 Safari Web Inspector。

Safari 只能进入 WebView 内部，不认识下面这些原生对象：

- `UIView`
- `UILabel`
- `UIButton`
- `UIViewController`
- SwiftUI View
- 原生行情图表
- `CALayer`
- Core Graphics 或 Metal 绘制内容

原生界面应当使用 Xcode 的 View Debugger。

### 使用 Xcode View Debugger

操作流程：

1. 使用 Xcode 运行 App，或者通过 `Debug → Attach to Process` 附加到正在运行的 App。
2. 在手机上进入需要检查的页面。
3. 点击 Xcode 调试栏中的“Debug View Hierarchy”按钮。
4. Xcode 暂停 App，并生成当前界面的三维层级。
5. 选择某个 View，查看右侧 Object Inspector 和 Size Inspector。

它可以检查：

- View 的真实 `frame` 和 `bounds`。
- 父子 View 层级。
- 哪个 View 覆盖在最上面。
- `hidden`、`alpha`、背景颜色。
- Safe Area。
- Auto Layout 约束。
- 内容是否超出父容器。
- `clipsToBounds` 是否导致裁剪。
- UIKit、SwiftUI 和 WebView 之间的整体层级。

Apple 官方将它用于检查 UIKit 和 SwiftUI 的尺寸、位置及约束问题，并支持三维展示整个 View 栈。[Apple View Debugger 文档](https://developer.apple.com/documentation/Xcode/diagnosing-issues-in-the-appearance-of-your-running-app)

### Safari 与 Xcode 看到的内容有什么区别

假设当前页面层级为：

```text
UIWindow
└── MarketDetailViewController
    ├── NativeChartView
    └── PDRCoreAppFrame
        └── WKWebView
            └── Uni 弹窗 DOM
```

Xcode View Debugger 能看到：

```text
UIWindow
MarketDetailViewController
NativeChartView
PDRCoreAppFrame
WKWebView
```

但看不到 `WKWebView` 里面的 `<div>`、文字和 CSS。

Safari Web Inspector 能看到：

```html
<body>
  <div class="trade-popup">
    <button>买涨</button>
  </div>
</body>
```

但看不到下面的 `NativeChartView` 和原生控制器。

因此混合页面出现遮挡或层级问题时，需要两个工具配合：

- Xcode 确认“整个 WebView 在原生详情的上面还是下面”。
- Safari 确认“弹窗在 WebView 内部的 z-index 是否正确”。

## 三、原生行情图表如何调试

原生自绘图表和普通原生控件还有一点区别。

例如整个 K 线图可能只是一个：

```text
RichChartView
```

蜡烛、影线、坐标文字和网格线都是在同一个 View 中通过 Core Graphics 或 Metal 绮制的，不是独立的 `UILabel` 或 `UIView`。

因此 Xcode View Debugger只能检查：

- 整个图表 View 的大小。
- 图表是否被裁剪。
- 图表与顶部、底部安全区的关系。
- 图表 View 的原生层级。

它不能像 HTML 一样点中“某一根 K 线”查看样式。

内部绘制参数需要通过以下方式检查：

- 在布局或绘制方法中设置断点。
- 使用 LLDB 查看字体、线宽、缩放比例和坐标。
- Core Graphics 图表检查 `UIScreen.main.scale` 与像素对齐。
- Metal 图表使用 Xcode Metal Debugger。
- 通过截图进行像素级对比。

## 四、原生元素的辅助检查工具

Xcode 还提供 Accessibility Inspector：

```text
Xcode
→ Open Developer Tool
→ Accessibility Inspector
```

它适合检查：

- 元素是否可点击。
- 点击区域是否足够大。
- Accessibility Label。
- 文字是否被裁剪。
- 颜色对比度。
- VoiceOver 顺序。
- 当前原生元素在屏幕上的实际范围。

Apple 官方说明它可以连接真机、选择前台 App，并直接在手机上高亮目标元素。[Accessibility Inspector 文档](https://developer.apple.com/documentation/Accessibility/accessibility-inspector)

## 五、网络请求怎么抓

网络抓取需要先判断请求是从哪里发出的。

### 1. WKWebView 内部请求

如果请求由当前 WebView 的以下方式发起：

- `fetch`
- `XMLHttpRequest`
- 页面资源加载
- 图片、CSS、JavaScript
- WebSocket

可以使用 Safari Web Inspector 的 `Network` 面板：

1. 打开目标 WebView 的检查器。
2. 切换到 `Network`。
3. 清空旧记录。
4. 在手机上重新执行操作。
5. 点击请求查看 Headers、Payload、Response 和 Timing。

这种方式最适合调试普通 H5 请求。

### 2. Uni API 或原生 SDK 请求

以下请求不一定出现在 Safari Network 中：

- `uni.request`
- `uni.connectSocket`
- DCloud 原生网络模块。
- iOS 原生 `URLSession`。
- 原生行情 WebSocket。
- 登录、运营商认证等第三方 SDK。
- CTP 或行情组件自己的网络连接。

原因是它们可能通过 JS Bridge 交给原生层执行，并不是由当前 `WKWebView` 的 WebKit 网络进程发起。

DCloud 官方也将 `uni.request`、WebSocket、上传下载等定义为跨平台 App API，而不只是浏览器中的 XHR。[DCloud 网络 API](https://uniapp.dcloud.net.cn/api/request/request)

### 3. 使用 Instruments 抓原生 HTTP

原生请求推荐使用：

```text
Xcode
→ Product
→ Profile
→ Network
```

开始录制后，在手机上重现操作。

`HTTP Traffic` 可以查看：

- 请求 URL。
- HTTP 方法。
- Request Header。
- Request Body。
- Response Header。
- Response Body。
- DNS、连接和等待耗时。
- 请求属于哪个 `URLSession`。
- HTTP 重定向和多次事务。

Apple 官方说明 Instruments 能捕获 URL Loading System 中加密和未加密的 HTTP 流量，并在分析记录里以未加密形式保存请求内容，因此调试账号、Token 和交易数据时要妥善处理 trace 文件。[Apple HTTP Traffic 文档](https://developer.apple.com/documentation/Foundation/analyzing-http-traffic-with-instruments)

### 4. 使用 Charles 或 Proxyman 抓整机流量

当请求来源不明确时，可以使用系统代理：

```text
iPhone
→ 当前 Wi-Fi
→ 配置代理
→ 手动
→ Mac IP + 代理端口
```

然后在手机上安装并信任调试证书。

这种方式适合：

- WebView 请求。
- Uni 原生请求。
- `URLSession` 请求。
- 第三方 SDK 请求。
- 普通 HTTPS 和 WebSocket。
- 判断请求到底有没有发出。

但有两个限制：

- 使用证书绑定（Certificate Pinning）的请求通常无法解密。
- 私有二进制 TCP、行情协议或经过二次加密的数据，即使抓到连接，也不一定能看懂业务内容。

不要为了抓包关闭正式环境的证书校验；应使用 Debug 环境或专门的测试开关。

## 六、当前项目的推荐组合

| 调试目标 | 首选工具 |
|---|---|
| Uni 弹窗字体、间距、颜色 | Safari Web Inspector |
| Uni 弹窗遮罩、DOM 层级 | Safari Web Inspector |
| Uni JavaScript 报错 | Safari Console |
| 原生详情与 Uni WebView 的前后关系 | Xcode View Debugger |
| 原生状态栏、安全区、控制器层级 | Xcode View Debugger |
| 原生图表整体尺寸和裁剪 | Xcode View Debugger |
| K 线、影线、字体的具体绘制参数 | LLDB、绘制代码断点、截图对比 |
| WebView 的 fetch/XHR | Safari Network |
| `uni.request`、原生 SDK、`URLSession` | Instruments HTTP Traffic |
| 整机 HTTPS/WebSocket 排查 | Charles 或 Proxyman |
| 点击区域、可访问性、文字裁剪 | Accessibility Inspector |

最核心的结论是：

> Safari 负责 WebView 内部，Xcode 负责原生 View 外部，Instruments 或代理工具负责完整网络。混合应用需要组合使用，不能期待一个工具同时看穿所有层级。
