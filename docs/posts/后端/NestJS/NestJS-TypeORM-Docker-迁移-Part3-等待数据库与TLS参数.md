---

title: NestJS + TypeORM + Docker 迁移（Part 3）— 等待数据库与 TLS 参数
date: 2025-11-17
tags:

- Docker
- NestJS
- TypeORM
- MySQL

categories:
- 后端
description: 在容器启动阶段可靠等待 DB，并用兼容参数禁用 TLS 验证，避免本地/自签证书报错。

---

## 症状与根因

- mysql TLS 连接报错（Certificate verification failure）
  - 根因：等待 DB 阶段使用的客户端默认启用 TLS，自签证书校验失败。

---

## 固定模板（entrypoint.sh 节选）

```bash
# 等待 DB（兼容 mariadb 客户端）
until mysql --ssl=FALSE --ssl-verify-server-cert=OFF \
  -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" \
  -e "SELECT 1" > /dev/null 2>&1; do
  sleep 1
done
```

- 使用 `--ssl=FALSE --ssl-verify-server-cert=OFF` 禁用 TLS 与服务端证书校验（本地/自签场景）。
- 保持循环静默输出，避免日志刷屏；退出码为 0 后再继续迁移。

---

## 日志输出建议

在探活成功后补充打印目标信息，便于排查：

```bash
echo "Migrations target DB → host=${DB_HOST} port=${DB_PORT} user=${DB_USER} db=${DB_NAME} (NODE_ENV=${NODE_ENV})"
```

确保后续看到：Waiting for database → Database is ready → Running migrations … → Nest application started。
