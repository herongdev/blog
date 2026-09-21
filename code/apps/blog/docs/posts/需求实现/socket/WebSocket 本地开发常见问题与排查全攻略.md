---
title: WebSocket 本地开发常见问题与排查全攻略
date: 2025-09-23
tags: \[Hexo, WebSocket, TLS, Nginx, 本地开发, 教程]
---

## 前言

在本地开发 Web 应用时，经常会遇到 **WebSocket (ws / wss)** 连接失败的问题，比如浏览器控制台显示 “Pending” 或 “Error 1006”。
本文整理了常见原因、调试工具、协议关系，以及证书在其中的作用，帮助你快速定位和解决问题。

---

## 协议关系总览

### HTTP 与 WebSocket

- **HTTP**：基于请求-响应模型，短连接。
- **WebSocket**：基于 TCP 的全双工长连接，通常通过 HTTP **Upgrade** 握手建立。

### 明文 vs 加密

- `ws://` —— 明文 WebSocket，基于 TCP/80。
- `wss://` —— 加密 WebSocket，基于 TLS/443，相当于 `https://`。

### 混合内容限制

- **HTTPS 页面** → 只能连 **wss\://**，不能连 ws\://（被浏览器拦截）。
- **HTTP 页面** → 可以连 ws\:// 也可以连 wss\://。

> ⚠️ 本地常见问题：`http://localhost:3000` 去连 `wss://example.com` 是允许的，但 `https://example.com` 去连 `ws://localhost:3000` 会被拦截。

---

## 证书在其中的作用

### TLS 证书校验流程

1. **浏览器发起 TLS 握手**，带上 `SNI`（Server Name Indication）。
2. **服务器返回证书**。
3. 浏览器校验证书链：

   - 域名是否包含在证书的 **Subject Alternative Name (SAN)**。
   - 证书是否过期。
   - 证书是否由受信任 CA 签发。
   - 链是否完整（是否缺中间证书）。

### 常见报错

- `Hostname/IP does not match certificate's altnames`
  → 证书里没有目标域名。
- `NET::ERR_CERT_AUTHORITY_INVALID`
  → 自签证书未被信任。
- `NET::ERR_CERT_DATE_INVALID`
  → 证书过期或本地时间不对。
- `526 Invalid SSL certificate`（Cloudflare）
  → 源站证书有问题。

---

## WebSocket 连接失败的常见原因

1. **证书域名不匹配**（最常见）。

   - 例如访问 `wss://test.example.com`，但证书只包含 `www.example.com`。

2. **Origin 白名单未放行**。

   - 服务端拦截了来自 `http://localhost:3000` 的请求。

3. **Nginx/CDN 未配置 WS 升级**。

   - 缺少 `Upgrade`、`Connection` 头，握手失败。

4. **网络代理/防火墙拦截**。

   - 公司网络或系统代理阻断了 wss 流量。

5. **JWT/鉴权失败**。

   - token 过期或签发时间与服务器时间偏差大。

---

## Nginx WebSocket 必备配置

```nginx
# 复杂逻辑：升级头透传
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen 443 ssl http2;
  server_name example.com;

  ssl_certificate     /etc/nginx/ssl/example.com/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/example.com/privkey.pem;

  location /ws/ {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    proxy_read_timeout 300s;
    proxy_pass http://your_ws_upstream;
  }
}
```

---

## 测试 WebSocket 的常用工具

### 1. wscat（最常用）

- 安装：`npm install -g wscat`
- 使用：

  ```bash
  wscat -c "wss://example.com/ws?token=xxx"
  ```

- 功能：交互式 CLI，可以手动发消息、收消息。

### 2. websocat

- 安装：`brew install websocat` (macOS) 或下载二进制。
- 使用：

  ```bash
  websocat wss://example.com/ws
  ```

- 特点：更轻量，支持管道操作，可以脚本化测试。

### 3. curl（只能测试握手）

- 用于确认 `101 Switching Protocols`：

  ```bash
  curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
       -H "Host: example.com" -H "Origin: http://localhost:3000" \
       https://example.com/ws
  ```

- 缺点：不能维持 WebSocket 会话。

### 4. 浏览器 DevTools

- 在 **Network → WS** 里查看：

  - `101 Switching Protocols` 是否成功。
  - `Close Code` 是否 1006/1008。
  - `Security` 看证书是否正常。

---

## 快速排查步骤

1. **浏览器 Network**：看是否 `101` 握手成功。
2. **命令行 wscat**：排除前端代码影响。
3. **OpenSSL**：检查证书链。

   ```bash
   openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
   ```

4. **服务端日志**：看握手是否被拒绝（403/400/404）。

---

## 总结

- **本地 http 页面连远端 wss 是允许的**，问题大多出在证书或服务端配置。
- 证书必须包含访问的域名，否则浏览器直接拒绝。
- 推荐用 **wscat/websocat** 先测通道，再结合 DevTools 和 OpenSSL 确认问题。
- 若前面有 Nginx/CDN，一定要加上 `Upgrade/Connection` 头。

---

要不要我再写一篇 **“证书校验与 SAN 配置专门篇”**，里面详细讲 **多域名证书、泛域名证书、SNI 配置** 这些实战？
