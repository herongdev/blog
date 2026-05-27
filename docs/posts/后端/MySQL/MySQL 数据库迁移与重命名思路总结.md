---
title: MySQL 数据库迁移与重命名思路总结
date: 2026-05-27
tags:
  - MySQL
  - 数据库迁移
  - 数据库重命名
  - 表重命名
categories:
  - 数据库
---

## 背景

这次问题的核心是把旧库 `liuwapocketmap` 迁移成新库 `liuwadi`。

同时需要把旧表前缀 `lwpm_` 改成新表前缀 `lwd_`。

迁移目标不是重新造一套空表再导数据。

迁移目标是保留原有数据、主键、索引、自增值和表关系。

## 最重要的认知

MySQL 不推荐直接重命名数据库。

正确方式是创建一个新的空数据库。

然后把旧库里的表整体移动到新库。

移动表时顺便修改表名。

这个动作应该使用 `RENAME TABLE` 完成。

`CREATE DATABASE` 只会创建一个空库。

创建新库不会删除旧库数据。

只要不执行 `DROP DATABASE liuwapocketmap`，旧库数据就还在。

## 为什么不能直接重新建表再导数据

重新建表再导数据容易出现字段不一致。

重新建表再导数据容易遇到外键顺序问题。

重新建表再导数据可能导致自增值、索引、约束和触发器不一致。

重新建表再导数据也容易在 DBeaver Data Transfer 中触发 `TRUNCATE` 和外键冲突。

所以这次更适合走整体迁表方案。

## 为什么之前会遇到外键问题

`TRUNCATE` 不只是看表里有没有数据。

只要一张表被其他表的外键引用，MySQL 就可能禁止 `TRUNCATE`。

即使目标表是空表，外键结构存在也会拦截。

所以数据库工具里的 `Truncate before load` 很容易导致失败。

这种情况下不要用右键清表或 Data Transfer 自动清表。

## 为什么需要 root 账号

应用账号通常只拥有旧库内部权限。

应用账号一般不能创建新库。

应用账号一般不能跨库移动表。

应用账号也不能给新数据库授权新用户。

所以数据库重命名和跨库迁移应该使用 root 或高权限账号执行。

## 正确迁移思路

第一步是停止应用服务，避免迁移时还有新数据写入旧库。

第二步是确认旧库数据还在。

第三步是创建新数据库 `liuwadi`。

第四步是确认新数据库是空库。

第五步是删除旧库中依赖旧表名的视图和触发器。

第六步是生成 `RENAME TABLE` 迁移语句。

第七步是把 `liuwapocketmap.lwpm_*` 整体移动成 `liuwadi.lwd_*`。

第八步是检查新库中的数据量是否和旧库一致。

第九步是在新库中重建触发器。

第十步是在新库中重建视图。

第十一步是创建并授权新的应用账号 `liuwadi`。

第十二步是修改应用环境变量连接新库。

第十三步是重启应用并验证接口。

第十四步是确认线上运行正常后再考虑删除旧库。

## 表名迁移关系

`liuwapocketmap.lwpm_client` 会变成 `liuwadi.lwd_client`。

`liuwapocketmap.lwpm_place` 会变成 `liuwadi.lwd_place`。

`liuwapocketmap.lwpm_post` 会变成 `liuwadi.lwd_post`。

`liuwapocketmap.lwpm_tag` 会变成 `liuwadi.lwd_tag`。

所有 `lwpm_` 开头的业务表都应该统一改成 `lwd_` 开头。

`migrations` 表一般可以保留原名。

## 触发器处理思路

旧触发器依赖旧表名。

迁表前应该先删除旧触发器。

迁表后应该在新库里重建新触发器。

`trg_lwpm_place_bi_geo` 应该改成 `trg_lwd_place_bi_geo`。

`trg_lwpm_place_bu_geo` 应该改成 `trg_lwd_place_bu_geo`。

触发器逻辑本身可以保持不变。

## 视图处理思路

旧视图依赖旧表名。

迁表前应该先删除旧视图。

迁表后应该在新库里重建新视图。

`lwpm_v_public_places` 应该改成 `lwd_v_public_places`。

`lwpm_v_public_posts` 应该改成 `lwd_v_public_posts`。

视图内部引用的表名也要全部从 `lwpm_` 改成 `lwd_`。

## 权限处理思路

旧账号 `liuwapocketmap` 只适合访问旧库。

新库最好创建新账号 `liuwadi`。

新账号只授权访问 `liuwadi.*`。

应用配置也应该同步改成新库名、新用户名和新密码。

这样后续维护更清晰。

## 风险控制

迁移前不要删除旧库。

迁移中不要使用 Data Transfer 反复导入。

迁移中不要手动新建一套 `lwd_*` 空表。

迁移中不要随便 `TRUNCATE` 有外键关系的表。

迁移后先验证数据量。

迁移后再验证视图。

迁移后再验证触发器。

迁移后最后验证应用功能。

旧库应该等应用稳定运行后再删除。

## 最终结论

这次数据库迁移的核心不是复制数据。

这次数据库迁移的核心是创建新库并整体移动旧表。

`CREATE DATABASE` 负责准备新库。

`RENAME TABLE` 负责保留数据并完成表名迁移。

重建触发器和视图负责修复旧表名依赖。

重新授权账号负责让应用连接新库。

确认应用正常后才能清理旧库。
