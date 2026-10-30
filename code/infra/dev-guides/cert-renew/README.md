# media.herong.info 证书自动续期

本目录是 `media.herong.info` 已部署的证书自动化脚本：Certbot 用 HTTP-01 申请 Let's Encrypt 证书，上传到火山引擎证书中心，再把证书 ID 绑定到已有 TOS 自定义域名。Certbot 自身定期续期；deploy hook 在续期成功时同步，另有每日 reconcile 定时器重试失败的同步并校验线上叶子证书指纹。

**待迁移依赖（2026-10-20）：** 当前任务运行在即将到期的旧 ECS `115.190.214.176`。用户指定的新服务器 `101.96.210.172` 属于另一个云账号，已完成服务器接入，但媒体续期尚未迁移。TOS 桶、媒体域名及现有绑定证书可保留原账号，但旧 ECS 停机前必须迁移续期运行环境及访问原账号资源的授权；原实例角色不会自动成为新账号服务器的权限。已绑定证书当前仍有效至 2027-01-18，不能把首签和 dry-run 成功当作迁移已经完成。

**2026-10-20 验收：** 正式证书已签发，到期日为 2027-01-18；证书中心导入成功。已完成一次性的 **TOS 访问证书中心** 跨服务授权，随后由本脚本将证书 ID 绑定到 `herong-media` 的自定义域名。TOS 返回 `CertBound`，绑定的证书 ID 与脚本状态一致；北京地域解析出的四个地址各连续三轮提供与本地 Certbot 证书相同的叶子证书。已知企业素材通过 HTTPS 返回 200，桶根目录路径返回 403。`certbot-renew.timer` 和 `herong-media-cert-reconcile.timer` 均已启用，`certbot renew --dry-run --cert-name media.herong.info` 成功。授权刚完成时若接口短暂返回错误，保持证书状态文件并重试 reconcile；每日任务也会重试。新的正式续期尚未发生，届时仍需观察首次自动续期和证书替换。

**TOS 跨服务角色审计：** IAM 控制台显示角色 `ServiceRoleforCertificateAccessTOS` 创建于 2026-10-20 21:35:49。其信任策略为 `Effect: Allow`、`Principal.Service: ["tos"]`、`Action: ["sts:AssumeRole"]`，仅允许 TOS 服务代入；角色只附加一个系统策略 `TOSAccessForCertificate`，其授权为 `Effect: Allow`、`Action: ["certificate_service:CertificateGetInstance"]`、`Resource: ["*"]`。因此，这项证书实例读取权限覆盖账号内全部证书实例，并未限制到 `herong-media` 或本域名；策略没有授予证书写入操作。此角色供 TOS 服务读取绑定所需证书信息，与官网 ECS 使用的专用角色 `HerongMediaCertRenewal` 相互独立；后者的对象写入和域名绑定权限按桶及前缀限定。

## 先决条件

1. `media.herong.info` 的 CNAME 已指向 `herong-media.tos-cn-beijing.volces.com`，并已在该桶预绑定。**先验证该域名在 HTTP 下能直接返回 TOS 对象，不能跳转到 HTTPS 或首页。**
2. 桶策略仅给 `.well-known/acme-challenge/*` 额外开放匿名 `GetObject`；企业和教程目录的公开规则保持原样。此挑战目录中的短期随机 token 是 HTTP-01 所必需。不要开放整桶或 `ListBucket`。
3. 首选给承载现有 Certbot 的 ECS 实例绑定**专用 IAM 实例角色**。角色权限仅覆盖挑战对象 `PutObject`/`DeleteObject`、此桶自定义域名的 `GetBucketCustomDomain`/`PutBucketCustomDomain`、证书中心的 `ImportCertificate`。Python SDK 的查询方法名为 `list_bucket_custom_domain`，底层对应 TOS 的 `GET /?customdomain`。挑战内容读取使用匿名 HTTP 和单独的桶公开读取规则，不需要角色 `GetObject`。先检查实例当前角色，不能覆盖已有角色。现成策略草案见上级目录 `media-cert-ecs-role-policy.json`；应用前在 IAM 控制台校验动作与资源范围。TOS 对象权限必须限定到 `trn:tos:::herong-media/.well-known/acme-challenge/*`，域名操作限定此桶。证书中心如不支持资源级限制，只给导入动作；不得给删除证书或其他账户管理权限。
4. 不传 `--env-file` 时，实例角色的临时 STS 凭据由 SDK 经 IMDSv2 自动获取。跨账号服务器如使用原媒体账号的专用 AK/SK，应显式传 `--env-file /etc/herong-media-cert/cloud.env`，文件必须由 root 拥有且权限为 `0600`。**显式文件优先并独占使用，不尝试 IMDS；文件缺失或权限错误时直接失败，不回退到新服务器可能已有的其他账号角色。**脚本不会自动读取 shell 环境或用户家目录凭据。文件格式为纯 `KEY=value`，允许 `VOLCENGINE_ACCESS_KEY`、`VOLCENGINE_SECRET_KEY`、可选 `VOLCENGINE_SESSION_TOKEN`。不要将密钥写入仓库、日志、命令行或聊天。
5. 现有服务器已注册 Let's Encrypt 正式及测试账号，Certbot 为 3.1.0。复用现有账号；不要自动注册新账号、改联系人邮箱或替用户接受新服务条款。

## 服务器安装（执行前核对现有状态）

这组命令仅供在官网服务器上单独执行；不部署企业展示、Nginx、其他站点或桶策略。先检查 `certbot --version`、`certbot certificates`、`systemctl status certbot-renew.timer`、`df -h`、当前 ECS 角色、TOS 桶策略和 `curl -i http://media.herong.info/.well-known/acme-challenge/不存在的token`。最后一项应直接返回 TOS 404，不应跳转。安装命令中的源码位置替换为实际传输目录；不要在 `/var/www/herongsite` 内放置脚本。

```bash
install -d -o root -g root -m 0755 /opt/herong-media-cert
install -d -o root -g root -m 0700 /var/lib/herong-media-cert
install -o root -g root -m 0644 media_cert.py requirements.txt /opt/herong-media-cert/
install -o root -g root -m 0755 certbot-hook.sh certbot-deploy-hook.sh /opt/herong-media-cert/
python3 -m venv /opt/herong-media-cert/venv
/opt/herong-media-cert/venv/bin/pip install --requirement /opt/herong-media-cert/requirements.txt
install -o root -g root -m 0644 herong-media-cert-reconcile.service herong-media-cert-reconcile.timer /etc/systemd/system/
systemctl daemon-reload
```

`certbot-hook.sh` 和 `certbot-deploy-hook.sh` 默认使用 ECS 角色。静态凭据回退时，只可在**本地副本**的调用中显式追加 `--env-file /etc/herong-media-cert/cloud.env`，或按相同原则部署专用 root-only wrapper；不要改为 `source` 凭据文件。不要把环境文件复制到 `/opt/herong-media-cert`。

## 首次签发

首先确认实例角色能通过 IMDSv2 获得临时凭据，且上述角色权限已完成。以下命令复用服务器上已注册的账号，不传 `--agree-tos` 或 `--email`：

```bash
certbot certonly --manual --preferred-challenges http \
  --manual-auth-hook '/opt/herong-media-cert/certbot-hook.sh auth' \
  --manual-cleanup-hook '/opt/herong-media-cert/certbot-hook.sh cleanup' \
  --deploy-hook /opt/herong-media-cert/certbot-deploy-hook.sh \
  --non-interactive \
  --cert-name media.herong.info -d media.herong.info
```

Certbot 可能不在首次签发时执行 deploy hook；签发成功后手动运行一次：

```bash
/opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py reconcile
/opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py check
```

检查 `certbot certificates` 确认证书名称与路径正确。检查 `curl -I https://media.herong.info/projects/enterprise/v1/assets/<已知文件>` 为 200，且该域名下**已知私有对象**为 403。`check` 每轮重新解析 A/AAAA 地址，对每个地址建立新的 TLS 连接，多轮比对所见叶子证书的 SHA256；它不会仅凭证书中心接口或一次随机连接宣称成功。若 TOS 尚在传播，reconcile 会失败并由下面的定时器重试。

## 续期与日常验收

Certbot 现有续期 timer 必须保持启用；不要为了该域名停止其他站点的续期。确认 `certbot renew --dry-run --cert-name media.herong.info` 成功，且模拟续期不修改正式 TOS 绑定。Certbot 正式续期时调用 deploy hook；每日 timer 再对比本地 Certbot 证书、TOS 域名绑定和线上 TLS 指纹，因此即使 deploy hook 中途失败也会重试。**每日 timer 只 reconcile，不负责触发 Certbot 续期。**

```bash
systemctl enable --now herong-media-cert-reconcile.timer
systemctl list-timers certbot-renew.timer herong-media-cert-reconcile.timer --all
systemctl start herong-media-cert-reconcile.service
journalctl -u herong-media-cert-reconcile.service -n 50 --no-pager
```

若现有 `certbot-renew.timer` 不存在或未启用，先用系统发行版的 Certbot timer/service 启用续期，再依赖本目录的 reconcile timer。不要再开一套会并发执行 Certbot 的定时器。定期检查两个 timer、`certbot certificates` 到期日，以及 `media_cert.py check`。TOS 私有桶根目录不应因证书自动化变为公开。

脚本仅在 `CERTBOT_DOMAIN=media.herong.info` 时创建/清理 `herong-media/.well-known/acme-challenge/<token>`。上传使用禁止覆盖；清理前再次读取并比对验证码，避免删除被替换的对象。上传后会轮询 `http://media.herong.info/.well-known/acme-challenge/<token>`，只有精确内容可公开读取才允许 Certbot 继续。所有云端异常只输出异常类型，避免 SDK 错误正文泄露私钥。

## 新账号服务器迁移（运行环境已准备，待凭据与切换）

用户已确认原账号和 TOS 存储继续保留。原账号已有的 `ServiceRoleforCertificateAccessTOS`、媒体 CNAME 和桶策略继续使用。新服务器已存在 ask-around 的 IP 证书及每 6 小时运行的续期任务，不能把媒体 lineage 放进它扫描的 `/etc/letsencrypt/renewal/`，也不能停掉或改写这个任务。

当前最小接入方案是原媒体账号下另建无控制台登录的证书续期 IAM 用户，仅绑定上级 `media-cert-ecs-role-policy.json` 的三条权限；**不要复用教程图片上传用户或扩大其权限**。创建密钥和授权仍须执行时确认。专用凭据写入新机 `/etc/herong-media-cert/cloud.env`，root 所有、`0600`；所有媒体钩子和 reconcile 都显式传此文件。当前代码没有跨账号 AssumeRole 功能，`--role-name` 只选择本机 ECS 元数据角色，不能用来指定其他账号角色。

### 迁移材料和隔离路径

通过经过验证的 SSH 通道只传媒体相关材料，不把私钥或 ACME 账号密钥经过聊天、公共目录或日志：

- 原 `live/media.herong.info/` 的符号链接及其 `archive/media.herong.info/` 目标。
- 原 `renewal/media.herong.info.conf` 引用的生产 ACME 账号目录；复用原有注册，避免重新接受协议。
- 若执行 dry-run，另带旧机已经注册的测试环境 ACME 账号。测试和正式 ACME 账号相互独立；有多个账号时先确认使用哪个，不自动注册。
- `/var/lib/herong-media-cert/state.json`；记录的是原媒体账号的证书实例 ID，继续使用原账号凭据时应保留。
- 本目录脚本和固定依赖。不复制其他域名、原机的全部 `/etc/letsencrypt/` 或其他应用配置。

新机媒体专用目录为 `/etc/herong-media-acme`（Certbot config）、`/var/lib/herong-media-acme`（work）、`/var/log/herong-media-acme`（logs），均由 root 所有、`0700`；证书和账户私钥文件保持私有。另创建空的 root-only `/etc/herong-media-acme/cli.ini`，每次显式 `--config` 指向它，避免读取其他应用的全局配置。媒体 lineage 因此是 `/etc/herong-media-acme/live/media.herong.info`。在新副本中只重写此媒体 renewal 文件的 archive/live 绝对路径及钩子路径，保留账号、服务端地址和证书名称。备份原副本并验证所有 live 链接仍指向该媒体 archive；不能覆盖其他证书配置。

可安装的钩子及 `-cross-account` 后缀的四个 systemd 模板位于本目录 `cross-account/`。安装前核对真实二进制路径，以 root 权限创建所需目录，使用 `systemd-analyze verify` 校验单元。先安装、不启用；真实凭据、lineage 迁移及验收通过后才启用两个 timer。

安装到 `/opt/herong-media-cert/certbot-cross-account-hook.sh` 的钩子模板：

```sh
#!/bin/sh
set -eu
umask 077
case "${1:-}" in auth|cleanup) ;; *) exit 2 ;; esac
exec /opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py "$1" \
  --env-file /etc/herong-media-cert/cloud.env
```

安装到 `/opt/herong-media-cert/certbot-cross-account-deploy-hook.sh` 的模板：

```sh
#!/bin/sh
set -eu
umask 077
[ "${RENEWED_LINEAGE:-}" = /etc/herong-media-acme/live/media.herong.info ] || exit 0
exec /opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py reconcile \
  --env-file /etc/herong-media-cert/cloud.env --lineage "$RENEWED_LINEAGE"
```

两个钩子 root 所有、`0755`。此部署钩子与原钩子的 lineage 检查不同，迁移后不能继续使用只接受旧 `/etc/letsencrypt/live/` 路径的版本。新媒体 renewal 配置中使用上述 auth/cleanup/deploy hooks。reconcile 服务的 `ConditionPathExists` 与 `ExecStart --lineage` 也使用新路径，并显式加 `--env-file /etc/herong-media-cert/cloud.env`；状态目录继续为 `/var/lib/herong-media-cert`。

### 单域名续期和切换

复用新机已审计的 Certbot 5.8.0 二进制，但每次都带三个独立目录和单域名限制：

```bash
/opt/ask-around-test/certbot/bin/certbot renew --non-interactive \
  --config /etc/herong-media-acme/cli.ini \
  --cert-name media.herong.info \
  --config-dir /etc/herong-media-acme \
  --work-dir /var/lib/herong-media-acme \
  --logs-dir /var/log/herong-media-acme
```

这条命令作为新增 `herong-media-cert-renew-cross-account.service` 的 `ExecStart`，用独立 timer 每 12 小时运行。媒体使用 TOS HTTP-01 手动钩子，不使用 Nginx/standalone 插件，也不 reload Nginx。若服务启用 `ProtectSystem=strict`，仅给三个隔离目录及 `/var/lib/herong-media-cert` 必要写权限。不要再启用一个扫描全部 `/etc/letsencrypt/` 的系统 Certbot timer；不要更改 `ask-around-cert-renew.service` 或其定时器。

切换顺序：新机以现有证书运行 `check` 和带专用 env 的 `reconcile`，预期为 `already-current`；使用已有测试 ACME 账号对上述单域名命令加 `--dry-run`，验证挑战上传及清理，**不加 `--run-deploy-hooks`**，不把测试证书导入正式证书中心。只有这些检查通过、独立媒体 renew/reconcile 两个 timer 安装并验证后，才在旧机停用媒体 reconcile timer，并把旧媒体 renewal 文件移出原机的扫描目录到 root 私有归档；旧机全局续期服务继续处理其他证书。记录切换前文件与 timer 状态以便回退。整个过程不需要重新签发现有有效证书。

2026-10-20 已在新机准备专用 SDK venv、三组隔离目录、空 cli.ini 和两份专用钩子；四份服务/timer 模板暂存于 `/opt/herong-media-cert/cross-account/`，未安装启用。新机 16 项单元测试及 `systemd-analyze verify` 通过。SDK 5.0.53 的通用 wheel 从本机缓存经 SSH 传输并核对 SHA256，其余依赖从服务器既有镜像安装，版本未降级。

当前限制：尚未建立新媒体 IAM 凭据、尚未传输 lineage/账号或启用新机媒体 timer。原账号创建草稿已停在审阅页，用户名为 `herong-media-cert-renewer`，仅附加已有 `HerongMediaCertRenewal`，控制台访问关闭；创建用户及密钥仍待当下确认。旧机续期继续保留。Certbot 官方建议多实例分别指定 config/work/logs 目录以隔离锁：[官方文档](https://eff-certbot.readthedocs.io/en/stable/using.html#lock-files)。[Let's Encrypt 测试环境](https://letsencrypt.org/docs/staging-environment/)说明测试账号与正式账号分别注册。

参考：[Certbot 手动认证钩子](https://eff-certbot.readthedocs.io/en/stable/using.html#manual)、[火山引擎 TOS 自定义域名 API](https://docs.volcengine.com/docs/TorchObjectStorage/PutBucketCustomDomain?lang=zh)、[证书中心新版 API](https://docs.volcengine.com/docs/CertificateCenter/APIoverview-2?lang=zh)、[ECS 角色凭据官方说明](https://github.com/volcengine/volcengine-python-sdk/blob/master/docs/1-Credentials-zh.md)。
