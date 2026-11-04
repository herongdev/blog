# 声稿 SonaDraft 官网

正式地址：https://tingji.herong.info/ 。支持页 `/support/`；当前隐私 `/privacy/`；历史政策 `/privacy/versions/`。纯静态 HTML / CSS，无广告、外部字体、Cookie 分析或上传表单。

该目录是声稿 SonaDraft 应用仓库生成的站点镜像。政策唯一来源：`/Users/ronnie/Documents/my-project/voice-transcriber/code/assets/legal/privacy-policy.json`。在该项目 `code` 目录执行 `python3 tools/build_website.py`，再把 `release/site/` 的内容复制到本目录；保留旧政策归档。修改政策必须提高版本号并同步应用和商店隐私申报。不要直接改镜像中的政策文字造成两个版本分叉。

独立发布：`bash code/infra/tingji/deploy.sh`。主站 GitHub Actions 不负责本站，不能把本站放进 `/var/www/herongsite`。发布目录 `/var/www/tingji/releases/<UTC-id>/`，current 原子链接，上一链接目标记在 previous 文件中。

脚本仅接受既有目标 `root@115.190.214.176`，使用严格 SSH 主机密钥校验和非交互认证；不负责首次建站、证书或 Nginx 配置。上传前记录当前版本，激活前再次核对，若其他发布已切换则停止。切换或健康检查失败时，仅在 `current` 仍指向本次版本的情况下恢复上一链接，不覆盖后来发布的版本；候选与历史 release 均保留。健康检查固定访问该服务器上的正式 HTTPS 域名。

本地校验（在 blog 仓库根目录执行；不会连接服务器）：

```bash
python3 code/infra/tingji/check-site.py
python3 code/infra/tingji/test-deploy.py
bash -n code/infra/tingji/deploy.sh
```

静态检查默认只读相邻 `voice-transcriber` 仓库中的政策源；位置不同时使用 `--policy-source <文件路径>`。它验证政策镜像、页面资源和锚点、canonical、sitemap、robots；部署测试使用临时目录及假的 SSH、rsync、curl，覆盖成功、失败回滚、并发版本保护和错误目标。自动检查不代表浏览器视觉验收或已发布。

HTTPS：`/etc/nginx/conf.d/tingji.herong.info.conf`，证书 `/etc/letsencrypt/live/tingji.herong.info/`，Certbot 续期。Nginx 配置镜像在 `code/infra/tingji/`，实际更新前检查服务器配置；不可整体覆盖主站配置。

2026-10-13 已创建 A 记录 `tingji.herong.info → 115.190.214.176`，Record ID 50889573。首次版本 `20261013-v1`。现有主页、博客和其他子站保留。
