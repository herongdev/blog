# 今日变量暂停记录

2026-09-23，用户授权暂停旧服务器 `115.190.214.176` 的今日变量六项服务、删除容器与对应镜像，保留全部数据卷、模型和配置。此操作不是迁移完成；新服务器的数据不完整。禁止据此删除旧数据。

## 恢复依据

- 原 Compose：`/opt/today-variable/today-variable/docker-compose.prod.yaml`；恢复前核对该项目原有环境文件，不公开凭据。
- 后端镜像：`crpi-tszoj5zgyyzneya4.cn-shenzhen.personal.cr.aliyuncs.com/herong/today-variable:99c6856b`，digest `sha256:32fbca2cc543c78dc8e874bb2159ca61546abc5ebe44bc4fa6e6ba2c20e82111`。
- 模型镜像：同仓库 `model-api-627f5586`，digest `sha256:f02cee1cec827b5a9e526fb710817d20b20b347b5e04a19a2f808ceaf8267aa7`。
- 依赖镜像：`docker.m.daocloud.io/library/mysql:8.0.36`、`docker.m.daocloud.io/library/rabbitmq:3.13-management`、`docker.m.daocloud.io/library/redis:7-alpine`、`docker.m.daocloud.io/qdrant/qdrant:v1.13.4`。
- 业务库名称 `maquanyifenzhong`；数据卷前缀 `maquanyifenzhong_maquanyifenzhong-`，保留 `db-data`、`rabbitmq-data`、`redis-data`、`qdrant-data`。恢复必须显式复用现有卷，不创建同名用途的新空卷覆盖入口。
- 模型与缓存挂载在 `/opt/maquanyifenzhong-runtime/apps/model-api/` 下，日志在 `/opt/maquanyifenzhong-runtime/logs/`；全部保留。
- 原 RabbitMQ 容器 hostname 是 `39378dfcd038`。恢复前核对原 nodename 和卷内 Mnesia 目录，固定原节点身份或采用官方迁移流程，不能用随机新 hostname 宣称队列已恢复。
- Redis 手动 SAVE 因要求认证未执行成功；需核对正常关闭及原持久化配置，不能声称已生成独立 Redis 备份。
- 原代码和锁文件保留；模型 Dockerfile 依赖的 torch wheel 在本机 `/Users/ronnie/Documents/my-project/maquanyifenzhong/today-variable/apps/model-api/vendor/`，服务器源码目录并无此 vendor，不在服务器兜底构建。

恢复需先获取匹配镜像，启动存储和中间件并验证旧数据，再启动模型和后端；评估是否开启采集与定时任务，防止恢复即大量写入。API 暂停期间不可用，Nginx 配置未删除。保留的数据仍在原服务器，不等于拥有异地备份。容器日志和可写层随容器删除，不支持原地撤销，恢复需重建容器。
