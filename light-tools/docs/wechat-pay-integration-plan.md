# 微信支付接入方案

适用范围：`light-tools` 的课程购买和后续工具会员。

## 推荐路径

第一阶段继续使用现有“创建订单 + 手动收款 + 后台开通”的 MVP。这样可以先卖课验证转化率，不被资质、HTTPS、证书和回调开发卡住。

第二阶段接入微信支付 API v3 Native 支付。用户在网页点击购买后生成订单，服务端调用微信 Native 下单接口得到二维码链接，页面展示二维码，用户用微信扫码付款。微信异步通知到站点后，服务端验签、解密通知内容，把订单改成 `paid`，再自动写入课程授权。

如果后续大部分成交发生在公众号或微信内浏览器，再追加 JSAPI 支付。JSAPI 的体验更顺，但需要公众号/小程序 AppID、OAuth 获取 OpenID，接入链路更长。

## 生产前置条件

- 微信支付商户号 `mch_id`
- 公众号、小程序或移动应用的 `appid`
- API v3 密钥
- 商户 API 私钥和证书序列号
- 微信支付平台证书或平台公钥，用于校验回调签名
- 线上 HTTPS 域名
- 可公网访问的支付回调地址

当前生产站点已经按 HTTPS 准备。真实支付上线前确认站点地址保持为：

```text
https://herong.info/file-tools
```

支付通知地址建议：

```text
https://herong.info/file-tools/api/payments/wechat/notify
```

## 环境变量

```bash
WECHAT_PAY_ENABLED=true
WECHAT_PAY_APPID=
WECHAT_PAY_MCH_ID=
WECHAT_PAY_API_V3_KEY=
WECHAT_PAY_PRIVATE_KEY_PATH=/run/secrets/wechat_pay_private_key.pem
WECHAT_PAY_CERT_SERIAL_NO=
WECHAT_PAY_PLATFORM_CERT_PATH=/run/secrets/wechatpay_platform_cert.pem
WECHAT_PAY_NOTIFY_URL=https://herong.info/file-tools/api/payments/wechat/notify
```

当前代码也支持把 PEM 内容直接放到环境变量中：

```bash
WECHAT_PAY_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
WECHAT_PAY_PLATFORM_CERT="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
```

生产环境更推荐文件挂载方式。仓库中的 `docker-compose.prod.yml` 会把 `./secrets` 挂到容器内 `/run/secrets/light-tools`。

## 服务端流程

1. 用户登录课程账号。
2. 用户点击购买高级课。
3. 服务端创建本地订单，状态为 `pending`。
4. 服务端调用微信支付 Native 下单接口。
5. 保存微信二维码链接，返回订单页给前端。
6. 前端展示二维码，并轮询本地订单状态。
7. 微信支付回调 `/api/payments/wechat/notify`。
8. 服务端校验微信签名，解密回调内容。
9. 本地订单改为 `paid`，记录 `transaction_id`。
10. 给用户邮箱对应账号写入课程授权。
11. 前端轮询到已支付后跳转 `/courses/me`。

## 数据模型建议

当前 MVP 用 `course-access.json`。真实支付上线时建议迁移到数据库：

```text
users
orders
payments
course_entitlements
```

支付回调必须幂等：同一个微信 `transaction_id` 或本地 `order_id` 多次通知时，只能开通一次权限。

## 选择结论

课程站第一版最稳的是：

```text
手动微信收款 MVP -> 微信 Native 扫码支付 -> 微信 JSAPI 支付 -> 支付宝补充
```

不建议一开始同时接多个支付渠道。先把微信 Native 跑通，订单、授权、退款和对账逻辑稳定后，再加支付宝。

## 官方文档入口

- Native 支付产品介绍：https://pay.wechatpay.cn/doc/v3/merchant/4012791874
- JSAPI / 小程序下单：https://pay.wechatpay.cn/doc/v3/merchant/4012791856
- H5 支付产品介绍：https://pay.wechatpay.cn/doc/v3/merchant/4012791832
- 商户订单号查询订单：https://pay.wechatpay.cn/doc/v3/merchant/4012526919
