# 教程图片云端启用清单

已选方案是复用北京地域（`cn-beijing`）的私有桶 `herong-media`，教程图片只放在 `dev-guides/tutorials/`。桶已重建，企业展示的 26 个素材已复制到 `projects/enterprise/v1/assets/`，且 26/26 个原公开链接及对象大小已验证。桶策略仅对企业素材、教程图片和 ACME 临时验证对象三个前缀开放匿名读取；`https://herong.info` 的 `GET`、`HEAD` CORS 已配置。`media.herong.info` 的 TXT、CNAME、TOS 域名和 HTTPS 证书绑定均已完成。2026-10-20 已通过 Certbot 脚本签发证书，续期与同步定时器已启用，并验收线上 HTTPS。教程专用 IAM 凭据已配置，本机写作台已完成真实粘贴上传、保存、重开及图片显示验收。`.env.media.local` 权限为 `0600` 且被 Git 忽略，不要将该文件或 AK/SK 提交到 Git。

## 存储与权限

`MEDIA_S3_BUCKET` 使用 `herong-media`。桶保持私有；当前桶策略仅为 `projects/enterprise/v1/assets/*`、`dev-guides/tutorials/*` 和 `.well-known/acme-challenge/*` 开放匿名 `GetObject`，不开放桶根目录或 `ListBucket`。ACME 验证对象由证书续期脚本创建并清理。以后修改前仍须读取并保存实际桶策略，合并全部现有声明；`PutBucketPolicy` 会覆盖整个策略。[官方说明](https://docs.volcengine.com/docs/TorchObjectStorage/PutBucketPolicy?lang=en)

当前代码只会调用 S3 `HeadObject` 和 `PutObject`。上传子账号的最小权限示例（复用现有桶时）是：

```json
{
  "Statement": [{
    "Effect": "Allow",
    "Action": ["tos:GetObject", "tos:PutObject"],
    "Resource": ["trn:tos:::herong-media/dev-guides/tutorials/*"]
  }]
}
```

已创建教程专用 IAM 用户 `herong-dev-guides-uploader`，禁用控制台登录，仅附加一个自定义策略 `HerongTutorialMediaUpload`，动作与资源范围与上例完全一致。未授予列桶、删除对象或桶策略权限。密码 App 现有的 `herong-media-uploader` 仍仅用于 `projects/enterprise/v1/assets/*`，没有复用为教程上传账号。真实权限验证中，`ListObjectsV2`、向教程前缀外无害探针键执行 `PutObject`、删除不存在的测试键、`GetBucketPolicy` 均返回 403 `AccessDenied`，没有越权写入成功。[TOS IAM 策略示例](https://docs.volcengine.com/docs/TorchObjectStorage/IAMpolicyexamples?lang=en)；[查询对象需要 `tos:GetObject`](https://docs.volcengine.com/docs/TorchObjectStorage/DeterminingWhetheranObjectExistsNodejsSDK?lang=zh)。

教程目录已应用的公开读取声明如下；企业目录也有独立的同类声明：

```json
{
  "Sid": "DevGuidesPublicGet",
  "Effect": "Allow",
  "Principal": ["*"],
  "Action": ["tos:GetObject"],
  "Resource": ["trn:tos:::herong-media/dev-guides/tutorials/*"]
}
```

企业素材的匿名链接和对象大小已逐一验证；线上领域页的 22 张图片与 4 个视频也已在浏览器中加载成功，控制台没有报错。真实教程上传的原图、更新图匿名 HTTPS `HEAD` 和 `GET` 均返回 200，类型均为 `image/png`，大小分别为 25116、25127 字节，下载内容的哈希分别与上传前优化后的图片一致。`https://herong.info` 的 `GET`、`HEAD` CORS 已配置并通过企业页面验收。[桶策略参数](https://docs.volcengine.com/docs/TorchObjectStorage/Bucketpolicytemplatesandparameters?lang=en)；[TOS 权限判定](https://docs.volcengine.com/docs/TorchObjectStorage/HowTOSauthenticatesrequests?lang=zh)。

## 媒体域名

`media.herong.info` 已完成 DNS TXT、CNAME 和 TOS 域名绑定，首期直接访问 TOS。Let's Encrypt 证书已签发，存于服务器 `/etc/letsencrypt/live/media.herong.info/`，到期日为 2027-01-18；已授权 TOS 访问证书中心，并由[证书同步脚本](../../infra/dev-guides/cert-renew/README.md)完成绑定。TOS 显示证书已绑定，域名解析出的四个地址均通过证书指纹和 HTTPS 校验；已知企业素材与实际教程原图均返回 200，桶根目录路径返回 403。目录公开读取规则没有扩大到整桶。[TOS 自定义域名](https://docs.volcengine.com/docs/TorchObjectStorage/PutBucketCustomDomain?lang=zh)。

如果以后改用 CDN，须重新核对回源权限与路径访问控制；上传账号的前缀限制不会自动约束 CDN。尤其要实测私有对象不能经媒体域名访问。[CDN 访问控制](https://docs.volcengine.com/docs/Informationdeliverynetwork/Overviewofaccesscontrol?lang=zh)。

## 本机写作与真实验收

在 `blog/code` 运行 `pnpm dev:guides:author`，打开 `http://127.0.0.1:4331/`，新建或打开草稿，粘贴或拖入已经裁剪、遮盖敏感信息的截图，看到“图片已上传并验证可访问”后保存。图片上传目录、哈希文件名和媒体 URL 由写作服务管理，日常写作无需处理云端路径。配置文件只在服务启动时读取，更换本机媒体配置后需重启写作台。

2026-10-20 已通过真实写作台完成以下验收，测试稿保存在不参与公开构建的 `drafts/media-upload-check-20261020.md`：

- 粘贴原图后生成自有 HTTPS URL，保存并重开后图片仍可解码，尺寸为 900×480。
- 再次粘贴完全相同的图片复用同一个 URL，TOS `Last-Modified` 没有变化。
- 粘贴更新后的不同图片生成另一个 URL；保存重开后两张图均可解码为 900×480。
- 两张图的匿名 `HEAD/GET`、类型、字节数和优化后内容哈希均已核对，原图 `Last-Modified` 保持为 `2026-10-20T14:22:08Z`；上传子账号的上述四项越权操作均返回 403。
- `astro check` 检查 20 个文件，无错误、警告或提示；`media:check` 和 Astro 静态构建均通过。
- 本地写作服务的 `/.env.media.local` 请求返回 SPA HTML，不含凭据；通过 Vite `/@fs/` 请求配置文件的绝对路径返回 403，同样未泄露凭据。

测试图片位于 `dev-guides/tutorials/media-upload-check-20261020/`：原图为 `b9063c5d7536089a6d5445a954086244352ad073e503810fa0b1dd6b5912b944.png`，更新图为 `ee3d640d0fcc1ee0309441920c12450b5d8a6f61ba06ef3f96a89ed96eaf4bec.png`。这些验收素材没有作为公开教程发布。

每次正式发文前仍需运行 `pnpm media:check`、`pnpm check`、`pnpm build`，在预览中检查步骤、图片和视频链接。修改媒体权限或 CDN 配置后，应使用已知私有对象重新核对匿名读取被拒绝；企业演示前缀已公开，不适合作为私有反例。

公开网站和媒体域名的上线是两件事。发布站点仍需 `dev.herong.info` 的独立 DNS、证书、静态托管与 CI。
