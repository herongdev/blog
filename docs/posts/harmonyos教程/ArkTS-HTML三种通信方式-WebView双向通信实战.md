---
title: ArkTS ↔ HTML 三种通信方式：runJavaScript、JavaScriptProxy 与 WebMessagePort（含最小示例）
date: 2025-10-30
tags:
  - HarmonyOS
  - ArkTS
  - WebView
  - WebMessagePort
  - 原生与H5
categories:
  - 开发笔记
---

没问题～一句话概括：**ArkTS ↔ HTML** 在鸿蒙里主要有三条通道——

1. ArkTS 调 JS：`WebviewController.runJavaScript / runJavaScriptExt`
2. JS 调 ArkTS：`javaScriptProxy / registerJavaScriptProxy` 注入原生对象
3. 双向消息通道：`createWebMessagePorts + postMessage`（WebMessagePort）

下面把“主要 API + 最常见用法”捋清楚（含小例子）。

---

## 1) ArkTS 调用网页里的 JS

**什么时候用**：把 Store 里的数据推给网页、调用 `window.LifeChart.setAll(...)` 等。

- `controller.runJavaScript(script: string)`：异步执行一段 JS。常在 `onPageEnd` 后调用，确保网页已就绪。（[华为开发者官网][1]）
- `controller.runJavaScriptExt(script: string)`：也是执行 JS，但**能拿返回值**（Promise 风格，返回 JsValue，可 `getString()/getNumber()` 等）。（[华为开发者官网][2]）

**示例（ArkTS）**：

```ts
// 页面加载完后注入
.onPageEnd(() => {
  // 推数据
  const data = [{ question: '人生', percent: 0.38 }];
  this.controller.runJavaScript(
    `window.LifeChart && window.LifeChart.setData(${JSON.stringify(data)})`
  );

  // 取网页返回值（如读取 document.title）
  this.controller.runJavaScriptExt('document.title').then(result => {
    const title = result.getString(); // ArkWeb JsValue
    console.info('[WebTitle]', title);
  });
});
```

> 要点：把注入放在 `onPageEnd` 等网页完成回调之后，避免目标函数尚未挂载。（[华为开发者官网][1]）

---

## 2) 网页调用 ArkTS（注入原生对象）

**什么时候用**：H5 希望直接触发原生能力（如读取设置、调用端能力等）。

- **初始化时注入：**`javaScriptProxy`（Web 组件属性）
- **初始化完成后注入：**`controller.registerJavaScriptProxy(...)`

这两个都能把 ArkTS 对象“挂”到前端环境里（通常是 `window.XXX`），JS 直接调你暴露的方法。（[华为开发者官网][3]）

**示例（ArkTS，在 `onControllerAttached` 里注册）：**

```ts
this.controller.registerJavaScriptProxy({
  name: "NativeBridge", // 前端可直接调用 NativeBridge.xxx()
  methodList: ["hello", "update"],
  object: {
    hello: (): string => {
      return "Hi from ArkTS";
    },
    update: (json: string): void => {
      // 处理来自 H5 的数据
      // ... 更新 Store 或执行业务
    },
  },
});
```

**示例（网页 JS 调用原生）：**

```js
// H5
const msg = window.NativeBridge.hello();
window.NativeBridge.update(JSON.stringify({ age: 30 }));
```

> 官方文档场景叫“前端页面调用应用侧函数”，支持 **`javaScriptProxy`** 与 **`registerJavaScriptProxy()`** 两种注入时机。（[OpenHarmony][4]）

---

## 3) 双向消息通道（更通用/更安全）

**什么时候用**：需要**持续**、**双工**传递数据（如事件流、较大 JSON），且不想暴露大量同步方法。

- 建通道：`controller.createWebMessagePorts()`
- 发送端口到 H5：`controller.postMessage(...)`（把其中一个端口发给网页）
- 收消息/发消息：ArkTS 侧 `WebMessagePort.onMessageEvent / postMessageEvent`；H5 侧使用 `MessagePort` 的 `onmessage / postMessage`。（[cnblogs.com][5]）

**ArkTS（建立通道并把端口发给 H5）：**

```ts
const ports = this.controller.createWebMessagePorts();
ports[1].onMessageEvent((msg) => {
  const payload = msg.getString ? msg.getString() : "";
  console.info("[H5->ETS]", payload);
});
// 把 ports[0] 发给网页，网页保存后即可双向通信
this.controller.postMessage("__init_port__", [ports[0]], "*");
```

**H5（接收端口并通信）：**

```js
let h5Port = null;
window.addEventListener("message", (e) => {
  if (e.data === "__init_port__" && e.ports?.[0]) {
    h5Port = e.ports[0];
    h5Port.onmessage = (evt) => console.log("[ETS->H5]", evt.data);
    // 向 ArkTS 发消息
    h5Port.postMessage(JSON.stringify({ type: "PING" }));
  }
});
```

> 该方案基于 **WebMessagePort**，自 API9 起提供，适合做**持久双工**通道；官方也推荐用消息通道替代过度的对象注入以提升安全性。（[cnblogs.com][5]）

---

## 4) 其它有用回调

- `onPageBegin / onPageEnd / onProgressChange`：注入时机与进度控制。（[CSDN 博主][6]）
- `onConsole / onAlert / onConfirm / onPrompt`：接管网页日志与弹框（便于调试与原生 UI 替换）。（[华为开发者官网][7]）

---

## 5) 选型建议（实践经验）

- **推数据到 H5**：优先 `runJavaScript*`，简单直接（我们前面给你的 G2 图表就是这样做）。（[Medium][8]）
- **H5 触发原生能力**：少量方法用 `registerJavaScriptProxy`；多而频的交互更建议 **消息通道**。（[华为开发者官网][9]）
- **时机**：所有注入/调用尽量放在 `onPageEnd` 之后。（[华为开发者官网][1]）

如果你要，我可以把这三种方式的**最小模板**直接嵌到你现有的 `LifeChart` 组件和 `index.html` 里，按你现在的项目结构一键跑通。

[1]: https://developer.huawei.com/consumer/cn/forum/topic/0210121903108098084?utm_source=chatgpt.com "10、OpenHarmony Web子系统开发常见问题-华为开发者话题"
[2]: https://developer.huawei.com/consumer/en/doc/best-practices/bpta-harmony-application-security?utm_source=chatgpt.com "Application Security Coding-Application ..."
[3]: https://developer.huawei.com/consumer/en/codelab/HarmonyOS-WebView/?utm_source=chatgpt.com "Using WebView"
[4]: https://docs.openharmony.cn/pages/v4.1/en/application-dev/web/web-in-page-app-function-invoking.md?utm_source=chatgpt.com "Invoking Application Functions on the Frontend Page"
[5]: https://www.cnblogs.com/hencins/p/17623151.html?utm_source=chatgpt.com "调研capacitor兼容openharmony平台可行性- 汪淼焱"
[6]: https://blog.csdn.net/yong_19930826/article/details/146799987?utm_source=chatgpt.com "Harmonyos之加载本地web页面原创"
[7]: https://developer.huawei.com/consumer/en/doc/harmonyos-guides/web-dialog?utm_source=chatgpt.com "Displaying Web Page Dialog Boxes"
[8]: https://medium.com/%40yang45472/call-the-front-end-page-function-f9dbe24141c2?utm_source=chatgpt.com "Call the front-end page function | by Yang"
[9]: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V13/web-in-page-app-function-invoking-V13?utm_source=chatgpt.com "前端页面调用应用侧函数"
