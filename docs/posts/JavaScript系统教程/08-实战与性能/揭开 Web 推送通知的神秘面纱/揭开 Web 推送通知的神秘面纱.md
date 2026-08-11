---
title: "揭开 Web 推送通知的神秘面纱"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "十一月21 2023 对于我最近的 One Day Build： Expense Tracking 项目，我想在渐进式 Web 应用程序中启用通知。ChatGPT 很难为我生成任何好的代码，我也很难在网上找到任何最起码的清晰解释。 这篇博文旨在介绍实现 Web 推送通知所需的所有。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/需求实现/揭开 Web 推送通知的神秘面纱/揭开 Web 推送通知的神秘面纱.md"
---
::: v-pre

# 揭开 Web 推送通知的神秘面纱

> 本节目标：理解“揭开 Web 推送通知的神秘面纱”的核心思路，并能把它用于实际开发或面试表达。
十一月21 2023
对于我最近的 One Day Build： Expense Tracking 项目，我想在渐进式 Web 应用程序中启用通知。ChatGPT 很难为我生成任何好的代码，我也很难在网上找到任何最起码的清晰解释。

这篇博文旨在介绍实现 Web 推送通知所需的所有部分。我还创建了一个带有 node.js 后端的完整最小工作示例，供那些喜欢只查看代码的人使用：

[https://github.com/pqvst/minimal-web-push](https://github.com/pqvst/minimal-web-push)

Web 推送如何工作？
简而言之，Web 推送的工作原理是您的应用与浏览器供应商提供的“推送服务”进行交互。为此有三个主要步骤，如下图所示：

Web 推送概述

1. 创建订阅
客户端代码创建 Web 推送订阅，并将该订阅发送到后端。订阅只是一些 JSON，其中包含唯一（特定于浏览器的）终结点和一些加密密钥。下面是 Firefox 订阅的示例（因此是 mozilla.com 端点）。

\{
"endpoint": "[https://updates.push.services.mozilla.com/wpush/v2/...](https://updates.push.services.mozilla.com/wpush/v2/...)",
"expirationTime": null,
"keys": \{
"auth": "...",
"p256dh": "..."
\}
\}
在 Safari 中，您将收到一个 Apple 端点 （[https://web.push.apple.com/...](https://web.push.apple.com/...），在)），在 Chrome 中，您将收到一个 Google 端点 （[https://fcm.googleapis.com/fcm/send/...](https://fcm.googleapis.com/fcm/send/...）)）。

2. 发送通知
后端代码使用订阅详细信息向浏览器供应商托管的推送服务发送推送通知。然后，推送服务确保将其发送回您的浏览器。

3. 处理通知
您的浏览器会收到推送通知，并在 Service Worker 中触发回调。然后，您的 Service Worker 可以选择显示通知或执行您想要执行的任何其他操作。

先决条件：VAPID 密钥
需要 VAPID 密钥才能确保 Web 推送在所有主要浏览器上都能正常工作。VAPID 代表 Voluntary Application Server Identification （VAPID），本质上只是如何生成一组公钥-私钥的规范。尽管有这个名字，但它们实际上并不是真正自愿的，因为 Chrome 和 Safari 都要求您提供 VAPID 密钥。我测试过的唯一不需要它们的浏览器是 Firefox。

如果您尝试在没有 VAPID 密钥的情况下在 Safari 中订阅推送通知，您将收到以下错误：
Subscribing for push requires an applicationServerKey

在Chrome中，您将收到以下内容：
DOMException: Registration failed - missing applicationServerKey, and gcm_sender_id not found in manifest

虽然从技术上讲，您可以自己生成 VAPID 密钥，但使用生成器（如 vapidkeys.com）要容易得多，它将为您生成一组密钥。

**服务器端实现**
为了从后端应用程序服务器发送 Web 推送通知，您必须正确构造、编码和加密消息。根据您使用的编程语言，您很可能会找到一个库来帮助您解决这个问题。

如果您使用的是 node.js 后端，那么添加 Web 推送支持非常容易。有一个名为 ==web-push== 的不错库，它负责为您制作 Web 推送通知。

1. 导入和配置 Web 推送
import webPush from 'web-push';
==要开始使用，只需调用该函数来设置 VAPID 密钥。请务必同时包含电子邮件地址（以 为前缀）。==web-push mailto:

// TODO: Generate VAPID keys (e.g. [https://vapidkeys.com/](https://vapidkeys.com/))
const vapid = \{
publicKey: '...',
privateKey: '...',
\};

webPush.setVapidDetails(
'[mailto:\<email-address\>](mailto:<email-address>)',
vapid.publicKey,
vapid.privateKey
);

2. 商店订阅
Web 推送订阅是在客户端生成的，因此很可能需要某种方式将订阅从前端传递到后端。然后，您还需要以某种方式保存它们，例如将其存储在数据库中或仅将它们保存在持久化的 JSON 文件中。如果您不保存订阅数据，那么当您的服务器重新启动时，您将丢失所有现有订阅！

app.post('/subscribe', authenticateRequest, (req, res) =\> \{
const sub = req.body;
// TODO: Persist subscription (e.g. to db)
res.status(200).end();
\});

广播通知
您唯一需要实现的另一件事是实际创建和发送新通知的方法。如果我们向所有订阅广播通知，那么我们只需循环访问已保存的订阅数组并使用 Web 推送库进行调用即可。
如果用户撤消了您页面上的通知权限（或者订阅已过期），您将收到错误。您可以捕获这些错误并删除无效的订阅。
async function pushNotification(payload) \{
await Promise.all(subscriptions.map(async (sub) =\> \{
try \{
await webPush.sendNotification(sub, payload); // throws if not successful
\} catch (err) \{
console.log(sub.endpoint, '-\>', err.message);
// TODO: Delete subscription (e.g. from db)
\}
\}));
\}

// Test send notification
pushNotification('This is a test notification!');

客户端
客户端实现稍微复杂一些。您将需要两个文件：一个用于 Service Worker，一个用于主客户端应用程序。我们唯一需要放入服务器工作线程的是处理传入通知的回调。
Service Worker: /sw.js
self.addEventListener('push', (event) =\> \{
const options = \{
body: event.data.text(),
icon: '/apple-touch-icon.png',
badge: '/badge.png',
\};
event.waitUntil(self.registration.showNotification('My App', options));
\});

为什么我们把调用包装在 ==event.waitUntil== 中？由于 service-worker 作为后台进程运行，因此 server worker 可能会暂停/终止它。通过包装承诺，我们告诉浏览器工作正在进行中，在工作完成之前，它不应该终止我们的 Service Worker。

客户端应用: /client.js
在我们的主应用程序脚本中，我们必须负责请求通知权限，注册我们的 Service Worker，并使用浏览器的 ==pushManager== API 实际创建推送通知订阅。

在我们的主应用程序脚本中，我们必须负责请求通知权限，注册我们的 Service Worker，并使用浏览器的 [pushManager](https://developer.mozilla.org/en-US/docs/Web/API/PushManager) API 实际创建推送通知订阅。
1. 请求通知权限
首先，我们需要确保我们有权推送通知（没有这个，我们的通知就毫无意义）。在页面上的某个位置，您可能希望显示一个链接或按钮，用户可以单击该链接或按钮来启用通知。
==\<a====id====="promptLink"====onclick====="onPromptClick()"====\>====Enable notifications====\</a\>==
如果通知已经被授予（或拒绝），我们可以隐藏链接，或相应地更新 UI。

function updatePrompt() \{
if ('Notification' in window) \{
if (Notification.permission == 'granted' || Notification.permission == 'denied') \{
promptLink.style.display = 'none';
\} else \{
promptLink.style.display = 'block';
\}
\}
\}
function onPromptClick() \{
if ('Notification' in window) \{
Notification.requestPermission().then((permission) =\> \{
updatePrompt();
if (permission === 'granted') \{
console.log('Notification permission granted.');
init();
\} else if (permission === 'denied') \{
console.warn('Notification permission denied.');
\}
\});
\}
\}

2. 注册 Service Worker 并启用推送通知
接下来，我们确保 Service Worker 得到支持并注册我们的 Service Worker，以便我们可以接收通知。最后，我们将使用浏览器 API 请求推送通知订阅，然后将其发送到后端服务器。pushManager

对于此步骤，您将需要您的 VAPID 公钥（确保仅在客户端代码中包含您的公钥，并对私钥保密）。

这个过程是不言自明的。确保 Service Worker 受支持，注册 Service Worker，然后检查我们是否已经有一个活动的推送通知订阅，否则，创建一个新订阅。

在这两种情况下，我们都会将订阅数据发送到后端，以确保它被存储。

const vapidPublicKey = '...';
async function initServiceWorker() \{
if ('serviceWorker' in navigator) \{
const swRegistration = await navigator.serviceWorker.register('sw.js');
const subscription = await swRegistration.pushManager.getSubscription();
if (subscription) \{
console.log('User is already subscribed:', subscription);
sendSubscriptionToServer(subscription);
\} else \{
const subscription = await swRegistration.pushManager.subscribe(\{
userVisibleOnly: true,
applicationServerKey: vapidPublicKey
\});
console.log('User subscribed:', subscription);
sendSubscriptionToServer(subscription);
\}
\} else \{
console.warn('Service worker is not supported');
\}
\}
function sendSubscriptionToServer(subscription) \{
fetch('/subscribe', \{
method: 'post',
body: JSON.stringify(subscription),
headers: \{ 'content-type': 'application/json' \}
\});
\}
window.addEventListener('load', () =\> \{
initServiceWorker();
updatePrompt();
\});

调试提示：重新加载 Service Worker
请注意，当您重新加载页面时，Service Worker 不会自动重新加载。如果您在本地工作并对 Service Worker 进行更改，则需要在浏览器的开发工具中手动重新加载 Service Worker，或者您可以启用该选项以在页面重新加载时自动重新加载 Service Worker！

奖励功能：可点击的通知
您可能想要做的另一件事是使您的通知可点击。最初，我以为单击通知会自动打开关联的页面。然而，事实并非如此。您必须在 Service Worker 中自行实现此功能。

实现此目的的代码比我预期的要复杂一些。这是我在网上找到的最好的例子，它确保在单击通知后清除通知，然后打开一个新的浏览器实例/选项卡或聚焦现有选项卡（如果它已经打开）。

const targetUrl = '...';
self.addEventListener('notificationclick', (event) =\> \{
self.console.log('notificationclick');
event.notification.close(); // Android needs explicit close.
event.waitUntil(
clients.matchAll(\{type: 'window'\}).then( windowClients =\> \{
// Check if there is already a window/tab open with the target URL
for (var i = 0; i \< windowClients.length; i++) \{
var client = windowClients[i];
// If so, just focus it.
if (client.url === targetUrl && 'focus' in client) \{
return client.focus();
\}
\}
// If not, then open the target URL in a new window/tab.
if (clients.openWindow) \{
return clients.openWindow(targetUrl);
\}
\})
);
\});
从我到目前为止的测试来看，这似乎在所有浏览器（Firefox、Chrome、Safari、Android、iOS）上运行良好。

:::
