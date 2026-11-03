# 文件工具正式发布回执

- 发布时间：2026-11-03（上海时间）；源码提交 `4a77bd2`。
- URL：https://herong.info/file-tools （最终 `/file-tools/tools`，HTTP 200）。
- release：`20261103T050046Z-4a77bd2-chrome`；image `light-tools-web:20261103-shared-chrome`，实际镜像摘要 `sha256:43925eccc92cd46f29ee127345cf3922b11028c4dbd53d14b5dea08e37fd6675`。
- 运行：linux/amd64，Node 24.22.0，原 Compose 项目 `herong-light-tools` / container `light-tools-web`，回环3001，health为healthy。
- current指向本次release；previous保留`releases/20261024T075359Z-final`，旧镜像保留。回滚命令：`bash /opt/herong-light-tools/releases/20261103T050046Z-4a77bd2-chrome/activate.sh 20261024T075359Z-final`。本轮未执行线上回滚演练。
- 真实数据卷`herong-light-tools-data-20261024T075359Z-final`、runtime.env和secrets挂载不变；course-access文件SHA完全一致，仍4用户/2权益/2订单，runtime和secrets内容摘要一致。私有数据备份只存服务器`/var/backups/herong-light-tools/20261103T050046Z-4a77bd2-chrome`，未复制进本机或公共源码。
- 原图片预估effect同步reset导致的lint阻断已最小修复；全量lint/typecheck和Linux标准next build全部通过，不使用--no-lint。Dockerfile保留APT HTTPS并用Node内置Mozilla根证书初始化slim缺失的系统CA，未关闭TLS验证。
- 候选容器：公共头尾各1、六菜单为正式URL、robots index/follow；真实JPG/PNG/WebP预估与转换下载正常；FFmpeg MP4→GIF实际成功。
- 正式边缘：MP4→GIF HTTP200/image-gif/GIF89a/1176B/TLS验证0；正式浏览器PNG→JPG输出512×512、12114B/JPEG签名正确、页面无pageerror，实际查看结果和共享页脚截图。未做真实账号登录或支付交易。
- 发布后可用空间：5,877,739,520B，仍保留本次259MiB传输归档，没有清理任何镜像、卷或缓存。
- 本机4374临时候选容器已移除，镜像保留；原用户4373预览未动。所有浏览器自有会话已关闭。日志和JSON均为同目录`tools-*`，图片为仓库根`output/playwright/tools-{release,live}-image-convert.png`。
