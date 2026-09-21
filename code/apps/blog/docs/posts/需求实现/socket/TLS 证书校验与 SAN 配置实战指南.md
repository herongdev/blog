---
title: TLS 证书校验与 SAN 配置实战指南
date: 2025-09-23
tags: \[Hexo, TLS, HTTPS, WebSocket, SAN, 证书配置]
---

## 前言

在配置 `https://` 或 `wss://` 服务时，最常见的坑就是 **证书域名不匹配**。
浏览器会严格校验证书里的 **Subject Alternative Name (SAN)** 字段，如果访问的域名不在里面，就会直接拒绝连接。
本文专门讲解 SAN 的作用、配置方式，以及实战中的几种证书选择。

---

## 证书校验规则

### 1. 域名校验

- 浏览器验证访问的域名是否出现在证书的 **SAN** 列表中。
- 早期证书使用 `CN=commonName`，但现在必须依赖 **SAN**。

### 2. 常见报错

- `NET::ERR_CERT_COMMON_NAME_INVALID`
  → 域名不在 SAN 中。
- `Hostname/IP does not match certificate's altnames`
  → 证书和访问的主机名不匹配。
- `NET::ERR_CERT_AUTHORITY_INVALID`
  → 证书不是受信任的 CA 签发。

### 3. SAN 支持多域名

- 一个证书可以包含多个域名：

  ```
  DNS:example.com
  DNS:www.example.com
  DNS:api.example.com
  ```

- 访问这些域名时，浏览器都会信任。

---

## 证书类型对比

### 单域名证书

- 只包含一个域名（如 `www.example.com`）。
- 访问 `api.example.com` 会报错。

### 多域名证书（SAN 证书）

- 支持多个完全不同的域名。
- 适合同一机构有多个子服务。

### 泛域名证书

- 格式：`*.example.com`
- 可以匹配 `a.example.com`、`b.example.com`，但**不包括二级子域名**（例如 `a.b.example.com`）。

---

## OpenSSL 查看 SAN

```bash
openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"
```

输出示例：

```
X509v3 Subject Alternative Name:
    DNS:example.com, DNS:www.example.com, DNS:api.example.com
```

---

## 实战：证书配置方法

### 1. 使用 Let’s Encrypt（推荐）

借助 **certbot** 自动申请和续期：

```bash
sudo certbot certonly --nginx -d example.com -d www.example.com -d api.example.com
```

- 自动生成包含多个域名的 SAN 证书。
- 自动续期。

### 2. 自签证书（测试环境）

```bash
openssl req -new -newkey rsa:2048 -nodes -keyout test.key -out test.csr \
  -subj "/CN=test.local"

# 在 openssl.cnf 中手动添加 SAN
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = test.local

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = test.local
DNS.2 = localhost
```

然后签发：

```bash
openssl x509 -req -in test.csr -signkey test.key -out test.crt -days 365 \
  -extensions v3_req -extfile openssl.cnf
```

---

## Nginx 中的证书配置

```nginx
server {
  listen 443 ssl http2;
  server_name example.com www.example.com api.example.com;

  ssl_certificate     /etc/nginx/ssl/example.com/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/example.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:8080;
  }
}
```

- `server_name` 可以列出多个域名。
- 证书必须覆盖这些域名，否则会校验失败。

---

## 常见坑与解决方案

1. **证书只签了一个域名**
   → 访问二级域名时报错，需要申请 SAN 或泛域名证书。

2. **使用 CDN（如 Cloudflare）**

   - CDN 前端证书正常，但 **源站证书** 也必须正确，否则 “Full SSL” 模式会报错。

3. **测试环境本地域名**

   - 使用 `mkcert` 或自签证书，加上 `localhost`、`127.0.0.1` 到 SAN。

4. **多项目共用一台服务器**

   - 使用 SNI（Server Name Indication），不同域名返回不同证书。

---

## 工具推荐

- **openssl**：查看证书链与 SAN。
- **mkcert**：本地快速签发受信任证书。
- **ssllabs.com**：在线检测证书配置与兼容性。
- **certbot**：自动申请/续期 Let’s Encrypt 证书。

---

## 总结

- **SAN 是现代证书的核心**，必须包含访问的所有域名。
- 本地测试推荐 **mkcert**，线上推荐 **Let’s Encrypt**。
- Nginx/Apache/CDN 配置时要确保证书和 `server_name` 对齐。
- 遇到 `Hostname/IP does not match certificate's altnames`，第一步就是 `openssl s_client` 看证书里的 SAN。

---

要不要我再写一篇 **“多环境开发下证书最佳实践（本地/测试/生产统一方案）”**，结合 mkcert + Let’s Encrypt + CI/CD 自动化续期？
