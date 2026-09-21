# 放行 → 申请 → 挂载 → 巡检：Let’s Encrypt + Certbot + Nginx 证书全流程

最容易记的思路只有四个词：

> 放行 → 申请 → 挂载 → 巡检

把它想成办身份证：

- CAA 是“允许哪些机构办证”的白名单。
- Certbot 是自动办证员。
- Nginx 是真正向小程序、浏览器出示证书的人。
- systemd timer 是每天检查证书是否快过期的值班员。

完整流程是：

```text
DNS 允许 Let’s Encrypt 发证
        ↓
Certbot 通过 HTTP 验证域名属于你
        ↓
Let’s Encrypt 签发证书
        ↓
Nginx 改用新证书
        ↓
systemd 定期运行 certbot renew
        ↓
续期成功后重新加载 Nginx
```

## 一、我们当前做到哪里了

已经完成：

- 旧证书和 Nginx 配置已备份到：

```text
/root/certificate-backups/20260718-105646
```

- 服务器已经安装：

```text
certbot 3.1.0
python3-certbot-nginx
```

- Nginx 配置检查通过。
- `certbot-renew.timer` 已启用且正在运行。
- 下一次自动检查已经进入 systemd 计划。

尚未完成：

- 公网 DNS 目前查询到的仍然只有：

```text
0 issue "digicert.com"
```

- Let’s Encrypt 证书还没有签发。
- Nginx 仍指向已经过期的旧证书：

```text
/etc/nginx/ssl/api.herong.info/api.herong.info_bundle.crt
/etc/nginx/ssl/api.herong.info/api.herong.info.key
```

也就是说：现在只是“办证员和自动续期值班员已经就位”，还需要你把刚才两条 CAA 保存，才能正式办证。

---

# 二、完整具体操作教程

## 第一步：DNS 放行 Let’s Encrypt

进入火山引擎：

```text
云解析 DNS
→ 公网域名管理
→ herong.info
→ 管理
→ 记录管理
```

编辑根域名 `@` 的 CAA 记录，确保同时存在：

```text
0 issue "digicert.com"
0 issue "letsencrypt.org"
```

配置如下：

| 配置项 | 内容 |
|---|---|
| 域名 | `@` |
| 记录类型 | `CAA` |
| TTL | `10分钟` |
| 线路 | `默认线路` |
| 记录值一 | `0 issue "digicert.com"` |
| 记录值二 | `0 issue "letsencrypt.org"` |

为什么不能只保留 DigiCert？

因为 CAA 是发证机构白名单。只保留 `digicert.com` 时，Let’s Encrypt 必须拒绝签发。Let’s Encrypt 官方使用的 CAA 标识就是 `letsencrypt.org`。[Let’s Encrypt CAA 说明](https://letsencrypt.org/docs/caa/)

为什么保留 DigiCert？

因为将来如果仍想购买或使用 DigiCert 系证书，不需要再次修改 DNS。

## 第二步：确认 DNS 已生效

在 Mac 终端执行：

```bash
dig @vip1.volcengine-dns.com +short CAA herong.info
```

这是直接查询火山引擎权威 DNS，应该看到：

```text
0 issue "digicert.com"
0 issue "letsencrypt.org"
```

再检查公共 DNS：

```bash
dig @1.1.1.1 +short CAA herong.info
dig @8.8.8.8 +short CAA herong.info
```

公共 DNS 可能受缓存影响，稍晚几分钟才显示两条。如果权威 DNS 已显示两条，就说明火山引擎已经保存成功。

## 第三步：服务器安装 Certbot

登录服务器：

```bash
ssh root@<服务器公网IP>
```

CentOS Stream 9 安装命令：

```bash
dnf install -y epel-release
dnf install -y certbot python3-certbot-nginx
```

检查：

```bash
certbot --version
nginx -t
```

我们这台服务器已经完成这一步。

## 第四步：正式申请证书

推荐准备一个接收证书到期提醒的邮箱，然后运行：

```bash
certbot --nginx \
  --cert-name api.herong.info \
  -d api.herong.info \
  --agree-tos \
  --email YOUR_EMAIL \
  --redirect \
  --non-interactive
```

将 `YOUR_EMAIL` 换成自己的邮箱。

如果暂时不愿提供邮箱，可以使用：

```bash
certbot --nginx \
  --cert-name api.herong.info \
  -d api.herong.info \
  --agree-tos \
  --register-unsafely-without-email \
  --redirect \
  --non-interactive
```

不过这种方式收不到到期或续期异常邮件。

`--nginx` 会自动完成三件事：

1. 在 Nginx 中临时配置 HTTP 验证地址。
2. 让 Let’s Encrypt 验证 `api.herong.info` 确实指向这台服务器。
3. 签发成功后，把 Nginx 改成使用新证书并重新加载。

Certbot 官方也推荐使用 `certbot --nginx` 自动申请和配置 Nginx。[Certbot 官方教程](https://certbot.eff.org/instructions?os=centosrhel7&ws=nginx)

## 第五步：确认 Nginx 已改用新证书

签发成功后，证书一般位于：

```text
/etc/letsencrypt/live/api.herong.info/fullchain.pem
/etc/letsencrypt/live/api.herong.info/privkey.pem
```

检查 Nginx：

```bash
grep -n "ssl_certificate" /etc/nginx/conf.d/api.herong.info.conf
```

应该指向：

```nginx
ssl_certificate /etc/letsencrypt/live/api.herong.info/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/api.herong.info/privkey.pem;
```

然后检查并重新加载：

```bash
nginx -t
systemctl reload nginx
```

这里使用 `fullchain.pem` 很重要，它包含站点证书和中间证书，避免微信小程序或部分客户端报告“证书链不完整”。

## 第六步：配置自动续期

启用 Certbot 的 systemd 定时器：

```bash
systemctl enable --now certbot-renew.timer
```

检查状态：

```bash
systemctl is-enabled certbot-renew.timer
systemctl is-active certbot-renew.timer
systemctl list-timers certbot-renew.timer --all
```

正常结果应包含：

```text
enabled
active
```

定时器并不是每天都重新申请证书，而是每天检查。只有证书进入续期窗口时，`certbot renew` 才会真正向 Let’s Encrypt 申请新证书。

这台服务器目前已经是：

```text
enabled
active
```

## 第七步：续期后自动重载 Nginx

创建续期成功后的部署钩子：

```bash
mkdir -p /etc/letsencrypt/renewal-hooks/deploy
```

创建文件：

```text
/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

内容：

```sh
#!/bin/sh
set -eu

/usr/sbin/nginx -t
/usr/bin/systemctl reload nginx
```

增加执行权限：

```bash
chmod 755 /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

这个钩子的作用是：

```text
证书成功续期
→ 先检查 Nginx 配置
→ 检查通过后平滑重载
→ 新连接开始使用新证书
```

应该使用 `deploy-hook`，因为它只在证书真正续期成功后执行，而不是每次定时检查都重载 Nginx。[Certbot 续期钩子说明](https://eff-certbot.readthedocs.io/en/stable/using.html#renewing-certificates)

## 第八步：模拟一次自动续期

运行：

```bash
certbot renew --dry-run
```

看到类似下面的结果才算通过：

```text
Congratulations, all simulated renewals succeeded
```

再检查：

```bash
nginx -t
```

这一步相当于“消防演习”：不会替换正式证书，但会验证未来自动续期的申请链路是否可用。

## 第九步：从公网验收证书

查看证书签发机构、域名和有效期：

```bash
echo | openssl s_client \
  -connect api.herong.info:443 \
  -servername api.herong.info \
  2>/dev/null |
openssl x509 -noout -subject -issuer -dates
```

应该看到：

- `subject` 包含 `api.herong.info`
- `issuer` 是 Let’s Encrypt 相关签发机构
- `notAfter` 是新的未来日期

验证完整证书链：

```bash
echo | openssl s_client \
  -connect api.herong.info:443 \
  -servername api.herong.info \
  -verify_return_error 2>&1 |
tail -20
```

应出现：

```text
Verify return code: 0 (ok)
```

## 第十步：验证真实接口

健康检查：

```bash
curl -fsS -D - https://api.herong.info/api/v1/health
```

首页接口：

```bash
curl -fsS -D - https://api.herong.info/api/v1/digests/home-feed
```

最终应同时满足：

- 不再出现 `certificate has expired`
- TLS 验证通过
- HTTP 状态为 `200`
- 首页接口返回合法 JSON
- 小程序不再显示“加载失败”

---

# 三、以后怎么维护

平时不需要手动续证书，只需偶尔检查：

```bash
systemctl status certbot-renew.timer
certbot certificates
journalctl -u certbot-renew.service --since "30 days ago"
```

修改 Nginx、防火墙、DNS 或迁移服务器后，再运行一次：

```bash
certbot renew --dry-run
```

最重要的四条原则：

1. 不要删除 `letsencrypt.org` CAA。
2. 不要关闭公网 TCP 80，否则 HTTP 验证可能失败。
3. 不要把 Nginx 改回旧的 `/etc/nginx/ssl/...` 证书。
4. 不要手工复制续期证书；永远让 Nginx使用 `/etc/letsencrypt/live/...` 路径。

你只要记住这一句就够了：

> DNS 允许发证，Certbot 负责办证，Nginx 负责用证，systemd 负责续证。

你保存刚才的两条 CAA 后，我就可以继续执行正式签发和完整验收。
