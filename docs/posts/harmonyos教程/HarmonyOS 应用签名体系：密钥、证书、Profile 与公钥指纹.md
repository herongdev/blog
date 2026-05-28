---
title: HarmonyOS 应用签名体系：密钥、证书、Profile 与公钥指纹
date: 2026-05-27 00:00:00
tags:
  - HarmonyOS
  - 应用签名
  - DevEco Studio
  - AppGallery Connect
categories:
  - HarmonyOS
---

可以把鸿蒙签名体系理解成一句话：

**华为要确认：这个应用真的是你这个开发者打出来的、包名没被冒充、权限没乱申请、调试设备/上架环境是被允许的。**

几个东西分别扮演不同角色。

---

## 1. 密钥：你的“私章”

**密钥**本质上是一对东西：

```txt
私钥：你自己保存，用来给应用签名
公钥：别人拿来验证这个签名是不是你签的
```

你打包 HAP / APP 时，DevEco Studio 会用你的**私钥**给应用做数字签名。别人不能拿你的公钥去伪造签名，只能用公钥验证“这个包是不是由对应私钥签出来的”。

所以人话就是：

> **私钥 = 你盖章用的章。
> 公钥 = 别人验证这个章是不是真的。**

华为文档里也明确说，密钥文件通常是 `.p12`，里面包含非对称加密用的公钥和私钥，用于数字签名和验证。([Huawei Developer][1])

---

## 2. 密钥库：装“私章”的保险柜

**密钥库**通常就是你本地的 `.p12` 文件。

它不是单纯一个“密码”，而是一个文件，里面保存你的密钥信息，通常会有密码保护。

你可以理解为：

```txt
密钥库 .p12 = 保险柜
私钥 = 保险柜里的私章
密码 = 打开保险柜的钥匙
```

打包时 DevEco Studio 需要知道：

```txt
密钥库文件路径
密钥库密码
密钥别名
密钥密码
```

这些信息缺一个，签名就签不了。

最重要的是：**`.p12` 丢了很麻烦，泄露更严重。**

因为它控制你应用的签名身份。

---

## 3. 证书：华为给你的“身份认证文件”

你自己生成密钥之后，还要向 AppGallery Connect 申请证书。

证书一般是 `.cer` 文件。

它的作用不是拿来签名，而是证明：

```txt
这个公钥/签名身份，是华为认可的某个开发者/应用使用的
```

你可以理解为：

```txt
私钥 = 你的私章
证书 = 权威机构给这个章开的证明
```

没有证书，系统或平台不知道这个签名身份是否合法。

鸿蒙调试、发布都会涉及证书。AppGallery Connect 里有调试证书、发布证书等管理入口。([Huawei Developer][2])

---

## 4. Profile：应用的“通行证”

**Profile 文件**通常是 `.p7b`。

它非常关键，但很多人容易把它和证书混在一起。

证书回答的是：

```txt
你是谁？
```

Profile 回答的是：

```txt
你这个应用能不能跑？
能在哪些设备上跑？
用的是哪个包名？
用了哪个证书？
允许哪些权限？
```

华为文档里说，Profile 文件包含应用/元服务的包名、数字证书信息、允许申请的证书权限列表，以及允许调试的设备列表等信息。([Huawei Developer][3])

所以人话就是：

> **证书证明“签名身份是真的”；
> Profile 证明“这个应用在这个场景下被允许运行”。**

调试版 Profile 通常会绑定调试设备。

发布版 Profile 用于正式上架。

---

## 5. 公钥指纹：公钥的“身份证号码”

**公钥指纹**通常是 SHA-256 指纹。

它不是公钥本身，而是从公钥/证书算出来的一串摘要。

类似：

```txt
公钥很长，不方便到处填
所以对它做 SHA-256
得到一串唯一性很强的指纹
```

你可以理解为：

```txt
公钥 = 一个人的完整身份资料
公钥指纹 = 这个人的身份证号 / 指纹编号
```

为什么要填公钥指纹？

因为很多华为服务要确认：

```txt
当前调用我的这个应用，真的是你在 AppGallery Connect 里登记过的应用
```

比如 HMS Core、登录、推送、地图、支付、分享等服务，可能需要根据包名 + 签名指纹来识别应用身份。

AppGallery Connect 文档里也提到，可以添加 SHA-256 证书/公钥指纹，平台也可以根据签名证书计算 SHA-256 指纹。([Huawei Developer][4])

---

## 6. 它们完整串起来是这样的

开发时大概流程是：

```txt
1. DevEco Studio 生成密钥库 .p12
        ↓
2. 根据密钥生成证书请求 CSR
        ↓
3. 去 AppGallery Connect 申请证书 .cer
        ↓
4. 用证书、包名、设备、权限等生成 Profile .p7b
        ↓
5. 在 DevEco Studio 配置 .p12 + .cer + .p7b
        ↓
6. 打包时用私钥签名
        ↓
7. 手机/系统/AppGallery 校验签名、证书、Profile
```

官方文档也提到，构建应用需要用到密钥 `.p12`、证书 `.cer` 和 Profile `.p7b`，然后在 DevEco Studio 中配置签名信息。([Huawei Developer][5])

---

## 7. 一张表说清楚

| 名称      |        文件后缀 | 人话理解      | 主要作用           |
| ------- | ----------: | --------- | -------------- |
| 密钥      |           — | 私章/公章对    | 私钥签名，公钥验证      |
| 密钥库     |      `.p12` | 装私章的保险柜   | 保存私钥、公钥等签名材料   |
| 证书      |      `.cer` | 华为认可的身份证明 | 证明这个签名身份合法     |
| Profile |      `.p7b` | 应用通行证     | 绑定包名、证书、权限、设备等 |
| 公钥指纹    | SHA-256 字符串 | 公钥的身份证号   | 给华为服务识别应用身份    |

---

## 8. Debug 和 Release 的区别

开发调试时一般用：

```txt
Debug 证书
Debug Profile
```

它通常会绑定调试设备，所以不是任何设备都能装。

正式发布时用：

```txt
Release 证书
Release Profile
```

这个用于上架和正式分发。

注意一个非常重要的点：**正式应用的签名不要随便换。**华为 FAQ 提到，HarmonyOS 应用目前不支持变更签名；如果密钥文件丢失，需要生成新密钥、重新申请发布证书和发布 Profile。([Huawei Developer][6])

所以 `.p12` 一定要备份好。

---

## 9. 最容易混淆的地方

你可以这样记：

```txt
.p12：我用什么私钥签名？
.cer：华为怎么证明这个签名身份？
.p7b：这个应用被允许怎么运行？
SHA-256 指纹：华为服务怎么快速识别这个应用？
```

再简单一点：

```txt
密钥库 = 保险柜
私钥 = 盖章的章
证书 = 章的官方证明
Profile = 应用运行通行证
公钥指纹 = 这个章的唯一编号
```

---

## 10. 实际开发中你最该注意的

第一，`.p12` 和密码一定要保存好，最好进团队密码库或安全备份，不要只放某个人电脑上。

第二，Debug 和 Release 分开管理，不要拿调试签名去做正式包。

第三，接华为服务时，包名、签名证书、公钥指纹必须匹配，否则经常出现“本地能跑，服务调用失败”。

第四，换电脑、换同事、CI/CD 打包时，最容易缺的就是 `.p12`、密码、`.cer`、`.p7b` 这几样。

[1]: https://developer.huawei.com/consumer/cn/doc/hiai-Guides/signature-information-harmonyos-0000001246159273?utm_source=chatgpt.com "配置应用签名信息-开发准备-HarmonyOS-机器学习服务"
[2]: https://developer.huawei.com/consumer/en/doc/app/agc-help-add-debugcert-0000001914263178?utm_source=chatgpt.com "Requesting a Debug Certificate-Debugging Your App ..."
[3]: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing?utm_source=chatgpt.com "配置调试签名"
[4]: https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748?utm_source=chatgpt.com "(可选）配置应用签名证书指纹-开发应用-AppGallery Connect ..."
[5]: https://developer.huawei.com/consumer/cn/doc/hmscore-common-Guides/harmony-signature-info-0000001167185654?utm_source=chatgpt.com "配置应用签名信息-将HMS Core添加至HarmonyOS应用"
[6]: https://developer.huawei.com/consumer/en/doc/app/agc-help-releasefaq-0000001110342644?utm_source=chatgpt.com "FAQs-Releasing an App-AppGallery Connect Help Center"
