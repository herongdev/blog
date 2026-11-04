# 今日变量数据保留与清理记录

更新时间：2026-09-23

## 目标

今日变量暂停运营期间，仅保留可继续用于训练、评估和恢复业务的人工资产及其完整关联数据。不能只保留标签，还必须保留对应原文、事件、上下文、来源和人工判断依据。

账号、系统配置、模型运行记录和模型权重不属于本次资讯清理范围。

## 保留口径

- 历史人工标签：`item_keep_labels`、`closure_labels`、`event_match_labels`，以及已回答的归档人工任务。
- 新评审表中已确认、已纠错或已提升为 Golden 的记录；有 `reviewed_by`、`reviewed_at` 或 `is_golden` 的记录同样保留。
- 已人工处理的首页发布评审、人工反馈、人工 rationale、pair rationale。
- 人工确认或明确进入 train/eval 的监督数据、对应 bundle 和 target。
- 上述记录引用的 `raw_items`、`events`、`event_items`、`sources` 和反馈对应的 `feed_items`。
- 从人工标注原文反查所属事件，再保留这些事件下的原始来源；从人工评审事件反查全部原始来源，形成一次关联闭包。

机器待审、教师模型自动结果、可重建向量、事件表示、候选队列和流水线临时记录不作为人工资产保留。

## 只读统计结果

统计基于旧服务器 `115.190.214.176` 的 `maquanyifenzhong` 数据库：

| 项目 | 保留 | 候选删除 |
| --- | ---: | ---: |
| 原始资讯 `raw_items` | 5,898 | 394,175 |
| 事件 `events` | 4,295 | 207,409 |
| 事件与原文关系 `event_items` | 5,989 | 其余非保留关系 |
| 来源配置 | 110 | 来源配置本身不删除 |

核心人工资产数量：

- 历史 `item_keep_labels`：1,104 条，关联 1,016 条原文。
- 已回答的历史 item keep 归档任务：600 条。
- 新 item keep 人工评审：71 条。
- closure 人工评审：221 条。
- event match 新人工评审：172 条；历史人工标签：390 条。
- event tier 人工/Golden 评审：3,181 条。
- 首页人工发布评审：2,962 条。
- 人工 rationale：135 条；用户反馈：64 条。
- 监督数据中当前只有 1 个 bundle 的 target 明确为 `human_confirmed/eval` 或 `human_inferred`，两条 target 均保留。

## 清理前备份

旧服务器保留原始整库备份：

- 文件：`today-variable-mysql-preseed.sql.gz`
- 大小：2,514,400,118 bytes
- SHA-256：`99ea716daf44fb8b5d77b238c10457e3d48e377ae006be5a2b46f748ea634dec`

为本次清理另建便携恢复包。它包含完整数据库结构和所有不可重建数据，只排除以下明确可重建的大表数据：

- `embedding_artifacts`
- `vector_refs`
- `event_representations`
- `ingest_filter_decisions`
- `pipeline_runs`
- `feed_workset_items`
- `event_match_annotation_candidates`

便携恢复包：

- Gzip：`today-variable-precleanup-portable.sql.gz`，约 453MB，SHA-256 `11b69a00a25a9af1b4ed707f31d129f7d98258327201be3d901ef424c15172aa`
- XZ：`today-variable-precleanup-portable.sql.xz`，约 248MB，SHA-256 `cfa262a60a8483d064a47ccd094c250cd371905c2e667a96a714ce6ddd9f691b`
- 本地目录：`/Users/ronnie/Documents/backups/today-variable/2026-09-21/`

只有本地 XZ 文件通过 `xz -t` 且 SHA-256 完全一致后，才允许执行删除。

## 空间回收原则

先清空可重建表以立即回收约 3.8GB 的逻辑表空间，再删除非保留资讯和机器待审记录。InnoDB 行删除后不会自动归还磁盘，需要在可用空间充足时逐表执行表重建；不并行重建大表，不对整库盲目执行 `OPTIMIZE TABLE`。

清理完成后再次导出保留库、验证人工标签到原文/事件/来源的关联完整性，并停止临时启动的 MySQL 容器。项目恢复运营时由源码迁移重建被清空的派生表。

## 2026-09-23 执行结果

- 已清空 `embedding_artifacts`、`vector_refs`、`event_representations`、`ingest_filter_decisions`、`pipeline_runs`、`feed_workset_items`、`event_match_annotation_candidates` 等可重建表的数据，表结构保留。
- 已删除 394,175 条非保留原文和 207,409 个非保留事件。
- 最终保留 5,898 条原文、4,295 个事件、5,989 条事件—原文关系。
- 保留历史 item keep 标签 1,104 条、历史 event match 标签 390 条、新 item keep 人工评审 71 条、closure 人工评审 221 条、event match 人工评审 172 条、event tier 人工/Golden 评审 3,181 条、首页人工发布评审 2,962 条、人工 rationale 135 条、用户反馈 64 条。
- 保留 1 个人工/eval supervision bundle 和 2 条 target。
- 保留 ID 清单已固化为 `retention_keep_raw_ids_20260923`、`retention_keep_event_ids_20260923`、`retention_keep_feed_item_ids_20260923`。
- 人工标签、人工评审、反馈、事件关系和来源的缺失/孤儿检查均为 0；关键表 `CHECK TABLE ... QUICK` 均返回 `OK`。
- MySQL 数据卷从约 11GB 降至约 2.1GB。
- 整台服务器磁盘占用从清理前最高 91% 降至 59%，可用空间由约 3.5GB 增至约 16GB。
- 临时 MySQL 容器和镜像已经删除，今日变量继续保持停运。
- 旧服务器仍保留清理前完整备份 `today-variable-mysql-preseed.sql.gz` 和配置运行环境备份，作为回滚依据。
