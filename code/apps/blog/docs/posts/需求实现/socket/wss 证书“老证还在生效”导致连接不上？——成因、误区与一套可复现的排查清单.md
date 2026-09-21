---
title: wss 证书“老证还在生效”导致连接不上？——成因、误区与一套可复现的排查清单
date: 2025-09-23
tags:
---

## 结论先说

- **“我没在浏览器里直接访问这个域名，所以证书没下发到本地”是个误区。**
  只要你的前端从 `http://localhost` 去连 `wss://test.gtctrader1203.top/ws`，**TLS 握手就会发生，服务端会下发证书**；是否在地址栏访问过该域名不相关。WSS 与 HTTPS 一样，先走 TLS，后 `Upgrade` 成 WebSocket。([Heroku 开发中心][1])
- 你先前用 `wscat` 看到 **“Hostname/IP does not match certificate's altnames: cert for [www.52wukong.com”\*\*，这不是“本地缓存旧证书”，而是\*\*服务端链路在](http://www.52wukong.com”**，这不是“本地缓存旧证书”，而是**服务端链路在) SNI/证书选择上给了错证书**（常见于多域名共用一套 443 的场景或 CDN/负载均衡未同步）。([Server Fault][2])

---

## 为什么会“总是拿到旧/错证书”

> 下面几条是**命中率最高**的成因，按实际遇到的频率从高到低列出。

1. **SNI 对应关系错了 / 命中默认站点**

- 同一 IP:443 配了多个 `server_name`，但某个子域未正确匹配，Nginx/代理就会回落到“默认证书”（例如另一个站点的 `www.52wukong.com`），客户端自然报 **SAN 不匹配**。([Stack Overflow][3])

2. **多前端实例未统一**（CDN/负载均衡/多台网关）

- 证书更新只生效在**部分节点**，DNS 轮询或 CDN 调度把你分配到**还没更新的边缘/实例**，于是断续出现“还是旧证”。（Cloudflare 等厂商论坛里不少类似个案。）([Cloudflare 社区][4])

3. **DNS 指向了“旧 IP”**

- 本机或上游 DNS 缓存未刷新，仍解析到旧的终端，旧终端上挂着老证。

4. **K8s/Ingress/ALB 证书绑定错误**

- 证书 Secret 没滚动、Listener 没切到新证，或 SNI 规则没覆盖该主机名，导致网关层挑错证书。

> 注：**浏览器/Node 并不会“长期缓存服务端证书内容”来复用**（会缓存中间证书/会话票据等，但不会导致“总是拿到旧证”这种主观错觉）。如果你确实总看到旧证，**基本都是服务端/链路层在给错证**，不是“因为我没访问过域名所以证书没到本地”。([Super User][5])

---

## 一套可复现的排查路径（5 ～ 10 分钟搞定）

### 1）直连看“到底发来哪张证”

```bash
# 关键：一定加 -servername 来模拟 SNI
openssl s_client -connect test.gtctrader1203.top:443 -servername test.gtctrader1203.top -showcerts </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates
```

- 如果 `subject`/`SAN` 里不含 `test.gtctrader1203.top`，就是服务端在**该 IP:443 + SNI** 场景下回了错证。([Major Hayden][6])

### 2）固定解析到某个 IP 验证“谁在给错证”

```bash
# 先查 A 记录（拿到每个回源 IP）
nslookup test.gtctrader1203.top

# 针对每个 IP 分别测试（用 --resolve 固定目标）
curl -v --resolve test.gtctrader1203.top:443:目标IP https://test.gtctrader1203.top/ws/
# 或者
openssl s_client -connect 目标IP:443 -servername test.gtctrader1203.top
```

- 逐个 IP 测一下，**哪台节点在回错证**一目了然：

  - 如果只有**部分 IP**错 → **多实例没同步/某节点没换证**；
  - 如果**所有 IP 都错** → **Nginx/Ingress server_name 或证书路径配置错**。

### 3）断言是否 CDN 层问题

- 若接入了 CDN（如 Cloudflare/阿里云 CDN），记住：**边缘证书与源站证书是两回事**。你需在 **CDN 控制台**为 `test.gtctrader1203.top` 正确签/配证书，模式尽量用 **Full (strict)**，并确认边缘节点已就绪。([Cloudflare 社区][7])

### 4）Nginx/Ingress 必查清单（只核对关键项）

```nginx
# 确保有单独匹配 test.gtctrader1203.top 的 server 块
server {
  listen 443 ssl http2;
  server_name test.gtctrader1203.top;

  # 挂“包含 test.gtctrader1203.top 的证书”
  ssl_certificate     /etc/nginx/ssl/test.gtctrader1203.top/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/test.gtctrader1203.top/privkey.pem;

  # WebSocket 升级
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

- **不要让 443 的 `default_server` 端口用到别站的证书**（否则 SNI 匹配失败时会回落成“错证”）。([Server Fault][2])

---

## 你的场景的最可能根因（结合你前面的报错）

> `wscat` 报“证书的 SAN 里写的是 \*\*[www.52wukong.com\*\*”，而你连的是](http://www.52wukong.com**”，而你连的是) **test.gtctrader1203.top**。

高度怀疑以下其一：

1. **该域名对应的某个前端节点没同步新证**，你分配到了旧节点；
2. **Nginx/Ingress 上 `server_name` 未覆盖 `test.gtctrader1203.top`**，或 `listen 443 default_server` 上挂的是 `www.52wukong.com` 的证书，SNI 未命中时回落成它；
3. **CDN 边缘证书仍是旧证**（即便你源站已更新，终端用户面对的是边缘证）。

---

## 快速修复建议（按优先顺序）

1. **逐 IP 定位“哪个节点回错证”**（上面的 `--resolve`/`s_client` 方法）。

   - 只要锁定是**个别 IP**，去那台机器/那组 Listener 上换证或改 server 块即可。

2. **检查 Nginx/Ingress 配置**

   - `server_name` 必须包含 `test.gtctrader1203.top`；
   - 该 `server` 块下挂的 `ssl_certificate` 必须是**包含该主机名**的证书；
   - 避免把“别站”的证书挂在 `default_server` 上；
   - 如用 L4 `stream` 代理，要么启用 `ssl_preread` + SNI 分流，要么用 SAN 证书覆盖所有域名。([Server Fault][2])

3. **有 CDN 就到 CDN 控制台核证书**

   - 确认 `test.gtctrader1203.top` 的**边缘证书**已签发/部署；
   - 必要时**关开 Universal SSL**触发重签；模式改成 **Full (strict)** 并确保证书链完整。([Cloudflare 社区][4])

4. **本机验证刷新**

   - 清理本机 DNS 缓存，或直接 `--resolve` 固定 IP 测；
   - 换网络（手机热点）排除上游缓存。

---

## 一键对照脚本（拷贝即用）

```bash
# 1) 看解析
nslookup test.gtctrader1203.top

# 2) 逐 IP 验证证书（把 X.X.X.X 换成上步查到的每个 IP）
for ip in X.X.X.X Y.Y.Y.Y; do
  echo "== testing $ip =="
  openssl s_client -connect $ip:443 -servername test.gtctrader1203.top </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
done

# 3) 直连域名（含 SNI）看当前边缘/节点到底回什么证（不固定 IP）
openssl s_client -connect test.gtctrader1203.top:443 -servername test.gtctrader1203.top </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates
```

---

## 小贴士

- **只改源站证书不一定生效到终端用户**：如果前面有 CDN/边缘/负载，**用户看到的是最前端的证书**。
- **WSS 与 HTTPS 的“混合内容”限制**：HTTPS 页面不能连 `ws://`，但 HTTP 页面可以连 `wss://`——与你的场景无关（你是 `http://localhost` → `wss://…`，是允许的）。([Stack Overflow][8])
- **诊断一定带 `-servername`**：否则很多工具（含 `openssl s_client`）可能取默认证书，掩盖 SNI 问题本质。([Major Hayden][6])

---

## 复盘 checklist（上线前自测 5 条）

1. `openssl s_client -servername test.gtctrader1203.top` 显示的 SAN **包含该域名**。
2. 用 `--resolve` 针对 **每个 IP** 都验证过，不存在“某台还回旧证”。
3. CDN 控制台里 `test.gtctrader1203.top` 的**边缘证书**状态正常，模式 **Full (strict)**。
4. Nginx/Ingress 的 `server_name` 与证书匹配，**default_server 不挂错证**。
5. 前端从 `http://localhost` 连 `wss://…` 正常，不存在“混合内容”问题。

> 如果需要，我可以根据你当前的 **Nginx/Ingress/CDN 配置片段（只要关键几行）**，给出“只改这几行”的修复版。

[1]: https://devcenter.heroku.com/articles/websocket-security?utm_source=chatgpt.com "WebSocket Security"
[2]: https://serverfault.com/questions/923501/why-does-nginx-require-default-ssl-server-to-have-a-certificate?utm_source=chatgpt.com "Why does nginx require default ssl server to have a ..."
[3]: https://stackoverflow.com/questions/26517238/nginx-using-wrong-ssl-certificate?utm_source=chatgpt.com "nginx using wrong ssl certificate"
[4]: https://community.cloudflare.com/t/ssl-hostname-mismatch-error-after-certificate-renewal-process/630523?utm_source=chatgpt.com "SSL Hostname Mismatch Error After Certificate Renewal ..."
[5]: https://superuser.com/questions/390664/do-web-browsers-cache-ssl-certificates?utm_source=chatgpt.com "Do web browsers cache SSL certificates?"
[6]: https://major.io/p/using-openssls-s_client-command-with-web-servers-using-server-name-indication-sni/?utm_source=chatgpt.com "Using OpenSSL's s_client command with web servers ..."
[7]: https://community.cloudflare.com/t/help-ssl-experts-hostname-mismatch-issue/330350?utm_source=chatgpt.com "Help ssl experts! hostname mismatch issue"
[8]: https://stackoverflow.com/questions/9745249/websocket-with-ssl?utm_source=chatgpt.com "WebSocket with SSL"
