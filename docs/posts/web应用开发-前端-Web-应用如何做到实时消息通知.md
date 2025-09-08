---
title: web应用开发/前端/Web 应用如何做到实时消息通知
date: 2025-09-05 14:10:20
tags:
---

---

title: Web 应用如何做到“实时消息通知”
date: 2025-09-05
categories: \[Web 实时通讯, 架构设计]
tags: \[WebSocket, SSE, Web Push, 长轮询, 消息队列, Redis, 可用性, 安全]
description: 面向前端/全栈开发者，从选型到最小可行代码，教你在 Web 应用中实现稳定的实时消息通知。

---

# 总览

**目标**：在浏览器里第一时间看到来自服务端的新消息（聊天、新订单、系统告警等）。
**常见方案**：

- **WebSocket**：全双工、低延迟、最通用。
- **SSE（Server-Sent Events）**：服务端到客户端的单向推送，轻量、易用。
- **长轮询（Long Polling）**：兼容性最佳的兜底方案。
- **Web Push（Service Worker）**：浏览器级推送，页面不在前台也能收到（需用户同意）。

**快速选型**（简表）：

| 需求/约束                | 推荐                         |
| ------------------------ | ---------------------------- |
| 双向通信（聊天/协作）    | **WebSocket**                |
| 只下行推送、需超轻量     | **SSE**                      |
| 公司网络/代理限制 WS     | **SSE 或 长轮询**            |
| 需离线/后台通知          | **Web Push**                 |
| 海量连接、水平扩展       | **WS + Redis Pub/Sub 或 MQ** |
| 服务端易实现、兼容老后端 | **长轮询**                   |

---

# 实现思路（一图流）

1. **连接层**：浏览器（WS/SSE/HTTP） ↔ 反向代理（Nginx/Ingress） ↔ **推送网关服务**
2. **消息路由层**：**Redis Pub/Sub / Kafka / RabbitMQ** 做 fan-out 与广播
3. **业务层**：订单/聊天/告警服务把事件写入 **消息总线**
4. **状态与可靠性**：在线用户表、订阅关系、**Ack/重试/幂等**、**断线重连**、**心跳**、**权限校验**

---

# 分步实践

## 方案一：WebSocket（最通用）

### 最小可行后端（Node.js + `ws`）

```js
// 复杂逻辑：保存连接、鉴权、心跳、按用户分组转发
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map(); // userId -> Set<ws>

wss.on("connection", (ws, req) => {
  // 复杂逻辑：从 ?token= 解析并校验用户身份
  const token = new URL(req.url, "http://x").searchParams.get("token");
  let userId = null;
  try {
    userId = jwt.verify(token, process.env.JWT_SECRET).sub;
  } catch {
    ws.close();
    return;
  }

  if (!clients.has(userId)) clients.set(userId, new Set());
  clients.get(userId).add(ws);

  // 复杂逻辑：心跳保活，清理僵尸连接
  ws.isAlive = true;
  ws.on("pong", () => (ws.isAlive = true));

  ws.on("message", (buf) => {
    // 这里可处理客户端上行，如已读回执/输入中状态
  });

  ws.on("close", () => {
    clients.get(userId).delete(ws);
    if (clients.get(userId).size === 0) clients.delete(userId);
  });
});

// 复杂逻辑：定时 ping
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// 示例：向某用户推送
export function pushToUser(userId, payload) {
  const set = clients.get(userId);
  if (!set) return;
  const msg = JSON.stringify(payload);
  set.forEach((ws) => ws.readyState === ws.OPEN && ws.send(msg));
}
```

### 前端最小连接封装（浏览器）

```js
// 复杂逻辑：自动重连、指数退避、前台/后台状态感知
export function createWsClient(urlWithToken, onMsg) {
  let ws,
    retry = 0,
    timer;

  const connect = () => {
    ws = new WebSocket(urlWithToken);
    ws.onopen = () => {
      retry = 0;
    };
    ws.onmessage = (e) => onMsg(JSON.parse(e.data));
    ws.onclose = () => scheduleReconnect();
    ws.onerror = () => ws.close();
  };

  const scheduleReconnect = () => {
    clearTimeout(timer);
    const delay = Math.min(30000, 1000 * 2 ** retry++);
    timer = setTimeout(connect, delay);
  };

  // 复杂逻辑：页面隐藏时减小重连频率
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && ws?.readyState !== WebSocket.OPEN) {
      retry = Math.max(retry, 4); // 慢一些
    }
  });

  connect();
  return () => {
    clearTimeout(timer);
    ws?.close();
  };
}
```

### Nginx 反代（启用 WS 协议升级）

```nginx
# 复杂逻辑：确保 upgrade 头转发
location /ws/ {
  proxy_pass http://realtime:8080;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_read_timeout 60s;
}
```

---

## 方案二：SSE（Server-Sent Events，轻量下行推送）

### 后端（Node.js + Express）

```js
// 复杂逻辑：SSE 连接池、心跳注释行、按用户推送
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const streams = new Map(); // userId -> res

app.get("/sse", (req, res) => {
  const token = req.query.token;
  let userId;
  try {
    userId = jwt.verify(token, process.env.JWT_SECRET).sub;
  } catch {
    return res.sendStatus(401);
  }

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();
  streams.set(userId, res);

  // 复杂逻辑：心跳，防止中间设备断开
  const hb = setInterval(() => res.write(":hb\n\n"), 25000);

  req.on("close", () => {
    clearInterval(hb);
    streams.delete(userId);
  });
});

export function ssePush(userId, data) {
  const res = streams.get(userId);
  if (!res) return;
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

app.listen(8081);
```

### 前端

```js
// 复杂逻辑：SSE 自动重连由浏览器原生完成
const ev = new EventSource(`/sse?token=${encodeURIComponent(token)}`);
ev.onmessage = (e) => {
  const payload = JSON.parse(e.data);
  // 渲染消息
};
```

**何时用 SSE**：仅需服务端 → 浏览器推送（如系统广播、价格/进度更新），无需上行交互；在某些企业代理/防火墙下比 WS 更稳定。

---

## 方案三：长轮询（兼容兜底）

### 后端（Koa/Express 任意）

```js
// 复杂逻辑：如果没有新消息就挂起请求，直到有消息或超时
const waiters = new Map(); // userId -> res[]

app.get("/poll", (req, res) => {
  const userId = auth(req); // 自行实现鉴权
  (waiters.get(userId) ?? waiters.set(userId, []).get(userId)).push(res);
  req.setTimeout(65000); // 与前端超时一致
  req.on("close", () => cleanup(userId, res));
});

function notify(userId, payload) {
  const list = waiters.get(userId) || [];
  for (const res of list) res.json(payload);
  waiters.set(userId, []);
}
```

### 前端

```js
// 复杂逻辑：递归调用保持“长连接”效果
async function longPoll() {
  try {
    const r = await fetch("/poll", { credentials: "include" });
    if (r.ok) {
      const data = await r.json();
      // 处理消息
    }
  } catch (_) {
    /* 忽略网络错误 */
  } finally {
    setTimeout(longPoll, 100);
  } // 轻微间隔
}
longPoll();
```

---

## 方案四：Web Push（离线/后台通知）

> 适合 **提醒类** 场景：即便用户没打开页面、浏览器在后台，仍可收到通知（需 HTTPS 与用户授权）。

### 前端注册 Service Worker

```js
// 复杂逻辑：注册 SW 并申请通知权限，然后向后端上报订阅
const reg = await navigator.serviceWorker.register("/sw.js");
const permission = await Notification.requestPermission();
if (permission === "granted") {
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "<VAPID_PUBLIC_KEY_BASE64URL>",
  });
  await fetch("/push/subscribe", { method: "POST", body: JSON.stringify(sub) });
}
```

### Service Worker 接收

```js
// 复杂逻辑：展示系统级通知
self.addEventListener("push", (e) => {
  const data = e.data?.json() ?? {};
  e.waitUntil(
    self.registration.showNotification(data.title || "通知", {
      body: data.body,
    })
  );
});
```

### 后端发送（Node.js + web-push）

```js
// 复杂逻辑：使用 VAPID 签名向浏览器推送
import webpush from "web-push";
webpush.setVapidDetails(
  "mailto:admin@example.com",
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

// subs 为持久化的订阅列表
export async function sendPush(sub, payload) {
  await webpush.sendNotification(sub, JSON.stringify(payload));
}
```

---

# 可扩展与高可用

- **水平扩展**：WS/SSE 多实例时，用 **Redis Pub/Sub** 或 **消息队列（Kafka/RabbitMQ）** 做广播/定向投递。
- **在线表/路由**：`userId -> connectionIds`（内存 + Redis）。
- **可靠性**：业务消息落库 → 推送 → 客户端 **Ack** → 未 Ack 重试；**消息去重键** 防止重复渲染。
- **断线重连**：客户端带 **上次 offset/lastId** 续传（SSE 原生有 `Last-Event-ID`）。
- **背压控制**：批量合并（coalesce）、节流；超大消息用链接拉取。
- **监控告警**：连接数、发送量、队列堆积、投递耗时、重试率、失败率。

---

# 安全与合规

- **鉴权**：连接时附带 **短期 JWT**，服务端校验与续期；不同通道（WS/SSE/HTTP）统一鉴权层。
- **权限**：服务端二次校验资源访问（不要把 topic 名称当权限）。
- **限流**：IP / 用户 / 通道维度限速；异常断开与重连风暴保护。
- **加密**：HTTPS/WSS；敏感字段服务端脱敏。
- **审计**：关键通知落库，包含投递结果与阅读状态。

---

# 最简“端到端”范例清单

> 你可以基于此快速拼装生产可用的实时通知：

1. **连接层**：WebSocket（上面 Node + `ws` 代码）
2. **消息总线**：Redis（`PUBLISH notifications:user:123 {...}`）
3. **业务写入**：订单服务下单成功 → 发布事件
4. **推送网关**：订阅 Redis 通道 → `pushToUser(userId, payload)`
5. **前端**：`createWsClient` 接收 → 写入本地状态/弹出提醒
6. **兜底**：前端检测 WS 不可用则回退 SSE/长轮询
7. **离线补充**：允许用户开启 Web Push 作后台提醒

---

# 常见坑与排错

- **公司代理挡 WS**：优先尝试 **SSE**；Nginx/Ingress 需正确配置 `Upgrade/Connection`。
- **连接泄漏**：记得 **清理 close** 事件、设置 **心跳**。
- **消息乱序/重复**：加入 **自增 offset / 事件时间戳 / 幂等键**。
- **大房间广播**：用 **频道广播 + 客户端过滤** 或 **服务端分片广播**。
- **移动网络切换**：重连后用 **lastId** 请求增量补齐。

---

# 结语

- **单点小流量**：直接 **SSE 或 WS** 即可。
- **中大型/海量**：**WS + Redis/MQ**，加上 **Ack/重试/幂等/监控**。
- **提醒类**：配上 **Web Push**，覆盖离线/后台。

需要我结合你现有技术栈（如 Next.js、Spring Boot、NestJS、Redis、Kafka）给出**最小改造的落地方案**和**只改动的代码片段**吗？我可以按你的项目结构直接贴可替换的文件/增量修改。
