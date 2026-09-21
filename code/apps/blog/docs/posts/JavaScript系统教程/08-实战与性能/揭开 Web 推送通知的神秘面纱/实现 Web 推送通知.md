---
title: "实现 Web 推送通知"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "当然，我会以教程形式为您重写这篇关于实现 Web 推送通知的文章，尽量确保内容完整且易于理解。 教程：实现 Web 推送通知 简介 Web 推送通知是一种允许网站向用户的设备发送信息的技术，即使在用户未打开网站的时候也能进行。这个教程将指导您如何为您的网站或 Progressiv。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/需求实现/揭开 Web 推送通知的神秘面纱/实现 Web 推送通知.md"
---
::: v-pre

# 实现 Web 推送通知

> 本节目标：理解“实现 Web 推送通知”的核心思路，并能把它用于实际开发或面试表达。
当然，我会以教程形式为您重写这篇关于实现 Web 推送通知的文章，尽量确保内容完整且易于理解。

# 教程：实现 Web 推送通知

## 简介
Web 推送通知是一种允许网站向用户的设备发送信息的技术，即使在用户未打开网站的时候也能进行。这个教程将指导您如何为您的网站或 Progressive Web App (PWA) 实现这一功能。我们还会提供一个包含 Node.js 后端的最小工作示例。

## 如何工作？
Web 推送的工作流程分为三个主要步骤：

1. **创建订阅**：
- 客户端代码创建一个 Web 推送订阅，并将其发送到您的后端。
- 订阅是包含特定浏览器端点和一些加密密钥的 JSON 对象。

2. **发送通知**：
- 您的后端使用订阅详情向浏览器厂商提供的推送服务发送推送通知。
- 推送服务确保通知发送到您的浏览器。

3. **处理通知**：
- 浏览器接收到推送通知，并在您的 Service Worker 中触发一个回调。
- 您的 Service Worker 可以选择显示通知或执行其他操作。

## 预备条件：VAPID 密钥
为了确保 Web 推送在所有主流浏览器上工作，需要使用 VAPID（自愿应用服务器标识）密钥，这是一种公钥-私钥生成规范。

## 服务端实现
要从后端发送 Web 推送通知，您需要正确构建、编码和加密消息。根据您使用的编程语言，您可能会找到帮助您完成此任务的库。

对于 Node.js 后端，可以使用 `web-push` 库轻松添加 Web 推送支持。

### 步骤 1：导入并配置 web-push
```javascript
import webPush from 'web-push';

// 设置 VAPID 密钥
const vapid = {
publicKey: '您的公钥',
privateKey: '您的私钥'
};

webPush.setVapidDetails(
'[mailto:](mailto:您的邮箱地址)您的邮箱地址',
vapid.publicKey,
vapid.privateKey
);
```

### 步骤 2：存储订阅
在客户端生成的 Web 推送订阅需要传递给后端，并且您需要以某种方式保存这些订阅，例如存储在数据库或一个持久的 JSON 文件中。

### 步骤 3：广播通知
要发送新通知，只需遍历保存的订阅并使用 `web-push` 库的 `sendNotification` 方法。如果用户撤销了通知权限或订阅已过期，您会收到错误。可以捕获这些错误并移除无效的订阅。

## 客户端实现
客户端实现更为复杂。您需要两个文件：一个用于您的 Service Worker，另一个用于您的主客户端应用程序。

### Service Worker (`/sw.js`)
在 Service Worker 中，您需要处理传入通知的回调。

```javascript
self.addEventListener('push', event => {
const options = {
body: event.data.text(),
icon: '/apple-touch-icon.png',
badge: '/badge.png'
};
event.waitUntil(
self.registration.showNotification('My App', options)
);
});
```

### 客户端应用 (`/client.js`)
在主应用脚本中，您需要处理请求通知权限、注册 Service Worker 并创建推送通知订阅。

#### 步骤 1：请求通知权限
确保我们有权限推送通知。您可以在页面上提供一个链接或按钮让用户点击以启用通知。

#### 步骤 2：注册 Service Worker 并启用推送通知
确保支持 Service Worker，注册 Service Worker，然后检查我们是否已经有一个活动的推送通知订阅，否则创建一个新的订阅。

在这两种情况下，我们都将订阅数据发送到后端以确保存储。

```javascript
const vapidPublicKey = '您的公钥';

async function initServiceWorker() {
if ('serviceWorker' in navigator) {
const swRegistration = await navigator.serviceWorker.register('/sw.js');
// ...
} else {
console.warn('Service worker is not supported');
}

}
```

在这段代码中，我们首先检查浏览器是否支持 Service Worker，并注册我们的 Service Worker。然后，我们检查是否已经存在一个推送通知订阅。如果存在，我们将其发送到服务器。如果不存在，我们创建一个新的订阅并发送它。

#### 接下来的步骤

- **发送订阅到服务器**：
创建函数 `sendSubscriptionToServer` 用来将生成的订阅信息发送到您的后端。

```javascript
function sendSubscriptionToServer(subscription) {
fetch('/subscribe', {
method: 'post',
body: JSON.stringify(subscription),
headers: { 'content-type': 'application/json' }
});
}
```

- **初始化 Service Worker 和更新提示**：
在页面加载时，初始化 Service Worker 并更新通知权限的提示状态。

```javascript
window.addEventListener('load', () => {
initServiceWorker();
updatePrompt();
});
```

## 调试小贴士：重新加载 Service Worker
请注意，重新加载页面时，Service Worker 不会自动重新加载。如果您在本地工作并对 Service Worker 进行更改，您需要在浏览器的开发者工具中手动重新加载 Service Worker，或者启用在页面重新加载时自动重新加载 Service Worker 的选项。

## 可点击通知的额外功能
您可能还希望使通知可点击。最初，我以为点击通知会自动打开关联页面。然而，这并非如此。您需要在 Service Worker 中自己实现这一点。

这是我在网上找到的最好的示例代码，确保在点击通知后清除通知，然后如果已经打开了相应的标签页，则聚焦该标签页，否则在新的浏览器实例/标签中打开。

```javascript
const targetUrl = '您的目标URL';

self.addEventListener('notificationclick', event => {
event.notification.close(); // Android 需要显式关闭。
event.waitUntil(
clients.matchAll({ type: 'window' }).then(windowClients => {
for (var i = 0; i < windowClients.length; i++) {
var client = windowClients[i];
if (client.url === targetUrl && 'focus' in client) {
return client.focus();
}
}
if (clients.openWindow) {
return clients.openWindow(targetUrl);
}
})
);
});
```

从我的测试来看，这在所有浏览器（Firefox、Chrome、Safari、Android、iOS）上都工作良好。

---

这篇文章简洁地介绍了如何在您的网站或 Progressive Web App 中实现 Web 推送通知。希望这个教程对您有所帮助！

:::
