---
title: 为什么“先手动继续访问不安全 HTTPS 后，WSS 突然能连上”？——背后的机制与永久修复清单
date: 2025-09-23
tags: [Websocket]
---

## 现象复盘

你没直接打开过 `https://test.gtctrader1203.top`。从 `http://localhost` 去连 `wss://test.gtctrader1203.top/ws` 一直挂起/失败。
当你**在浏览器手动打开** `https://test.gtctrader1203.top` 时，浏览器提示“证书不安全”，你选择 **继续访问**。之后，**同一浏览器里**再连 `wss://test.gtctrader1203.top/ws`，就能成功。

> 结论：这不是“访问一次才把证书下发”的问题，而是**浏览器在你手动放行后，建立了对该主机的临时信任/缓存了构建证书链所需的中间证书**，从而使同源的 WSS 随后得以通过 TLS 握手。

---

## 为什么“继续访问”能让 WSS 跟着好起来？

### 1) 浏览器的“临时例外”/信任记忆

- 对**非 HSTS** 域名，浏览器允许你在 HTTPS 警告页点“继续访问”。
- 一旦放行，**同一进程/会话**内，浏览器会对该主机名记住“可以带问题地继续连接”。
- 之后同源的 `wss://` 握手也会沿用这份“例外”，所以 **WSS 能连**。

> 注意：这种**仅对当前浏览器有效**，`wscat/Node.js` 或换浏览器/无头环境仍会失败。

### 2) AIA/中间证书自动抓取被“激活”

- 很多“证书不安全”其实是**中间证书链缺失**或链错误。
- 浏览器在你打开 HTTPS 页面时，可能通过 **AIA（Authority Information Access）** 去抓取缺失的中间证书，**把链补全并缓存**。
- 后续同源 WSS 再握手时就能组好完整链，通过验证。

> Node 客户端通常**不会主动**替你抓取缺失的中间证书，所以你在 `wscat` 里仍可能看到失败。

### 3) 路由命中变化/边缘节点切换

- 访问网页过程中，**DNS/Anycast/CDN 调度**可能把你切到“证书已更新的节点”。
- 于是之后的 WSS 也走到“对的节点/对的证书”，表面上像是“访问一次就好了”。

---

## 风险与误区

- **误区**：“必须先访问域名才能下发证书”。
  实际上 WSS 第一次握手时就会“下发”证书；你遇到的是**链路/证书配置问题**，不是“未下发”。
- **风险**：你点了“继续访问”，只是**本机/本浏览器**的临时绕过；生产用户、API 客户端、App、小程序、Node/后端**不会**享受这份“例外”，依旧会失败。
- **副作用**：有些域名启用了 **HSTS** 就**不能**“继续访问”；而你能继续，说明该域名大概率**未开启 HSTS**（这也是一个安全信号点）。

---

## 永久修复清单（按优先级）

> 目标是：不用“继续访问”，任何客户端（浏览器、`wscat`、服务器）都能**一次握手通过**。

### A. 证书必须“对域名、对链路、对所有节点”

1. **SAN 覆盖**：证书的 Subject Alternative Name 必须包含 `test.gtctrader1203.top`。
2. **完整链**：部署 **fullchain.pem**（服务端证书 + 中间证书链），**不要只放 leaf**。
3. **统一部署**：所有前端节点/负载均衡/边缘（CDN）都要同步新证书。
4. **OCSP Stapling（可选）**：在 Nginx/网关启用，可减少在线校验失败概率。

### B. SNI 与默认站点回退

1. **每个主机名独立 server/监听**：

   ```nginx
   server {
     listen 443 ssl http2;
     server_name test.gtctrader1203.top;

     ssl_certificate     /etc/nginx/ssl/test.gtctrader1203.top/fullchain.pem;
     ssl_certificate_key /etc/nginx/ssl/test.gtctrader1203.top/privkey.pem;

     location /ws/ {
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "Upgrade";
       proxy_set_header Host $host;
       proxy_read_timeout 300s;
       proxy_pass http://your_ws_upstream;
     }
   }
   ```

2. **避免 default_server 挂错证**：`listen 443 default_server` 不要加载其他站点证书，否则 **SNI 匹配失败就回落错证**。
3. **L4 代理/Ingress**：若是四层代理，需基于 **SNI 分流** 到正确的证书/后端。

### C. CDN/边缘注意事项

- 使用 CDN 时，**边缘证书**与**源站证书**是两套体系；确保 CDN 控制台里 **该主机名** 的证书处于有效状态并已下发到边缘。
- CDN 回源使用 **Full (strict)**（或等价严格模式），确保源站也有正确证书链。

---

## 自检脚本（快速定位到底哪里错）

### 1) 看你“当前拿到的证书”是谁

```bash
# 一定要带 -servername（SNI）
openssl s_client -connect test.gtctrader1203.top:443 -servername test.gtctrader1203.top -showcerts </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates
```

- `subject`/SAN 里必须含 `test.gtctrader1203.top`；`issuer` 应是受信任 CA；`notAfter` 未过期。

### 2) 找出“哪个 IP 节点还在回错证”

```bash
# 查 A 记录
nslookup test.gtctrader1203.top

# 用固定解析逐个测
# 把 <IP> 换成上一步返回的每个 IP
openssl s_client -connect <IP>:443 -servername test.gtctrader1203.top </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates
```

- 若只有**部分 IP**错：说明 **多节点未同步**。
- 若**全部 IP**错：说明 **server_name/证书路径** 配置有误。

### 3) 验证链完整性（是否缺中间证书）

```bash
openssl s_client -connect test.gtctrader1203.top:443 -servername test.gtctrader1203.top -showcerts </dev/null 2>/dev/null
# 检查输出里是否包含中间证书；服务端应返回整条链（fullchain）
```

### 4) Node/CLI 客户端严苛性验证

```bash
# Node/CLI 不吃“浏览器例外”，这里能通才是真通
npx wscat -c "wss://test.gtctrader1203.top/ws?x=1"
```

---

## 诊断决策树（简版）

- `openssl s_client` 显示的证书 **不是** `test.gtctrader1203.top` → **SNI/默认站点回错证**。
- 证书对域名，但浏览器第一次报“不安全”，`wscat` 也失败 → **中间证书链缺失**（fullchain 没配好）。
- 有时好有时坏 → **多节点未同步** / CDN 边缘尚未下发。
- 浏览器能继续、Node 不行 → **你只是本机放行**，请按“永久修复清单”处理。

---

## 建议的收尾动作

1. 在所有前端节点上确认：`server_name` 与 `ssl_certificate (fullchain.pem)` 指向**包含该域名的证书**。
2. 若接入 CDN，确认该域名的**边缘证书**已更新并处于有效状态。
3. 用 **逐 IP** 的方式验证所有节点证书一致。
4. 用 **`wscat`/后端服务** 再测一次，确保不依赖浏览器例外也能连通。
5. 考虑开启 **HSTS**（确认证书链/部署稳定后再开），避免用户继续访问不安全版本。

---

### 一句话总结

> 你之所以“访问一次就能连上”，是浏览器**为该主机建立了临时信任/补全了中间证书/切到了已更新节点**。
> 要想从根上解决，必须保证：**正确的 SAN、完整的证书链（fullchain）、所有节点同步、SNI 与默认站点不回落错证、CDN 边缘证书就位**。
