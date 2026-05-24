---
title: 地点图片派生图实践：原图入库 + COS 裁切 + card/thumb/detail
date: 2026-05-24 10:00:00
updated: 2026-05-24 10:00:00
tags:
  - 腾讯云 COS
  - 图片处理
  - Node.js
  - NestJS
  - 遛娃口袋地图
categories:
  - 工程实践
description: 用「原图先上线、后台生成 WebP 派生图」的方式，为小程序首页/列表/详情分别提供 card、thumb、detail 尺寸，并在 API 层做优雅回退。
---

## 背景与目标

遛娃口袋地图的地点图来自批量采集，单张原图往往 1～3MB。若直接给小程序首页卡片和地图 marker 使用，会拖慢首屏、浪费流量。

本方案的核心思路是：

1. **先把 `original` 原图上传到 COS 并写入 `lwpm_place_media`**
2. **后台脚本用 COS 数据万象（`imageMogr2`）生成 `card` / `thumb` / `detail` 派生图**
3. **公开 API 按场景选图；派生图未就绪时自动回退 `original`**

这样上线不必等全部派生图跑完——用户先看到能用的图，派生图生成后接口自动切换到更小体积的 WebP。

---

## 整体流程

```mermaid
flowchart LR
  A[manifest 本地图片] --> B[import-place-media.mjs]
  B --> C[(lwpm_place_media<br/>variant=original)]
  C --> D[generate-place-media-variants.mjs]
  D --> E[COS 原图 URL + imageMogr2]
  E --> F[fetch 处理后字节流]
  F --> G[putCosObject 写入 variants/]
  G --> H[(lwpm_place_media<br/>card/thumb/detail)]
  H --> I[place.service 公开接口]
  I --> J[小程序首页/详情]
```

---

## 数据模型

迁移脚本：`code/database/migrations/manual-20260524-add-place-media-variants.sql`

在 `lwpm_place_media` 上新增两列：

| 字段 | 类型 | 含义 |
|------|------|------|
| `variant` | `ENUM('original','card','thumb','detail')` | 图片用途变体 |
| `source_media_id` | `BIGINT NULL` | 派生图指向的原图 `id` |

索引设计：

- `idx_place_media_variant (place_id, variant, role, sort_order)`：按地点 + 变体查图
- `uk_place_media_source_variant (source_media_id, variant)`：**同一原图每种变体只保留一条**，脚本可幂等重跑

Entity 映射见 `place-media.entity.ts`：

```typescript
export enum MediaVariant {
  ORIGINAL = 'original',
  CARD = 'card',
  THUMB = 'thumb',
  DETAIL = 'detail',
}

@Column({ type: 'enum', enum: MediaVariant, default: MediaVariant.ORIGINAL })
variant: MediaVariant = MediaVariant.ORIGINAL;

@Column({ name: 'source_media_id', type: 'bigint', nullable: true })
sourceMediaId: number | null = null;
```

**一行原图 + 多行派生图** 都落在同一张表，用 `variant` 区分，用 `source_media_id` 串起来。

---

## 变体规格（variantSpecs）

脚本：`code/scripts/generate-place-media-variants.mjs`

```javascript
const variantSpecs = {
  card: 'imageMogr2/thumbnail/900x/format/webp/quality/82',
  thumb: 'imageMogr2/thumbnail/320x320!/format/webp/quality/75',
  detail: 'imageMogr2/thumbnail/1280x/format/webp/quality/85',
};
```

| 变体 | COS 处理链 | 典型用途 |
|------|------------|----------|
| `card` | 宽 900px、WebP、质量 82 | 首页推荐流卡片、列表主图 |
| `thumb` | 320×320 裁剪、WebP、质量 75 | 小缩略图、地图 marker |
| `detail` | 宽 1280px、WebP、质量 85 | 详情页轮播/大图 |
| `original` | 无（上传时保留原格式） | 回退、审核对照、后续再派生 |

参数挂在 **原图 CDN URL 的 query** 上，由 COS 实时处理并返回结果字节流，脚本再 **落盘到独立 object key**，避免每次访问都走实时处理。

---

## 阶段一：原图入库

脚本：`code/scripts/import-place-media.mjs`

### 做什么

- 读取 `manifest.json` / `manifest.csv`（字段：`place_id`、`local_path` 等）
- 默认 **dry-run**；加 `--upload` 才真正 `PUT` 到 COS 并写库
- 按 `sha1` 去重，同一地点同图不重复插入
- 写入时固定 `variant = 'original'`

### Object Key 规则

```text
places/{place_id}/{sha1前12位}_{宽}x{高}.{ext}
```

派生图使用另一套路径（见下一阶段）：

```text
places/{place_id}/variants/{原图id}_{variant}_{sha1前12位}.webp
```

### 常用命令

```bash
cd code

# 试跑：只校验 manifest、算 sha1，不上传
node scripts/import-place-media.mjs \
  --manifest ../outputs/place-images-20260524/manifest.json \
  --env .env.prod \
  --limit 10

# 正式上传
node scripts/import-place-media.mjs \
  --manifest ../outputs/place-images-20260524/manifest.json \
  --env .env.prod \
  --upload
```

### 环境变量

```env
MEDIA_COS_BUCKET=...
MEDIA_COS_REGION=ap-guangzhou
MEDIA_COS_SECRET_ID=...
MEDIA_COS_SECRET_KEY=...
MEDIA_CDN_BASE_URL=https://your-bucket.cos.region.myqcloud.com

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=...
DB_PASS=...
DB_NAME=liuwapocketmap
```

`putCosObject()` 使用 COS 签名 V1（`q-sign-algorithm=sha1`），从本地文件流式 `PUT` 到 `bucket.cos.region.myqcloud.com`。

---

## 阶段二：生成派生图

脚本：`code/scripts/generate-place-media-variants.mjs`

### 1. 选出待处理原图

```sql
SELECT id, place_id, object_key, COALESCE(cdn_url, url) AS source_url, ...
FROM lwpm_place_media
WHERE stage = 'final'
  AND media_type = 'image'
  AND variant = 'original'
  AND review_status = 'approved'
  AND COALESCE(cdn_url, url) IS NOT NULL
ORDER BY id ASC
LIMIT ?
```

### 2. `generateVariant()` 核心步骤

```javascript
async function generateVariant(conn, row, variant, dryRun) {
  // 幂等：已有同 source + variant 则跳过
  const [existing] = await conn.execute(
    'SELECT id FROM lwpm_place_media WHERE source_media_id = ? AND variant = ? LIMIT 1',
    [row.id, variant],
  );
  if (existing.length) return 'skipped';

  // 在原图 URL 上拼接 COS 图片处理参数
  const sourceUrl = `${row.source_url}${row.source_url.includes('?') ? '&' : '?'}${variantSpecs[variant]}`;
  const bytes = await fetchBuffer(sourceUrl);

  const sha1 = crypto.createHash('sha1').update(bytes).digest('hex');
  const objectKey = `places/${row.place_id}/variants/${row.id}_${variant}_${sha1.slice(0, 12)}.webp`;
  const cdnUrl = `${config.cdnBaseUrl}/${objectKey}`;

  if (dryRun) return 'dry_run';

  await putCosObject(objectKey, bytes, 'image/webp');
  await conn.execute(`INSERT INTO lwpm_place_media (...) VALUES (...)`);
  return 'generated';
}
```

要点：

- **处理**：`fetch(原图CDN + imageMogr2 参数)` 拿到 WebP 二进制
- **存储**：`putCosObject` 把结果写到 `variants/` 前缀，与 original 分离
- **关联**：`variant` = `card|thumb|detail`，`source_media_id` = 原图 `id`
- **元数据**：脚本内联解析 PNG/WebP 头得到 `width`/`height`，写入 `size_bytes`、`sha1`

### 3. 常用命令

```bash
cd code

# 试跑：不 PUT、不写库
node scripts/generate-place-media-variants.mjs \
  --env .env.prod \
  --limit 50 \
  --dry-run

# 生成 card + thumb + detail（默认三种全跑）
node scripts/generate-place-media-variants.mjs \
  --env .env.prod \
  --limit 200

# 只补 card
node scripts/generate-place-media-variants.mjs \
  --env .env.prod \
  --variants card \
  --limit 500
```

---

## 阶段三：后端按场景选图

文件：`code/apps/backend/src/modules/place/place.service.ts`

设计原则：**优先派生图，没有则回退原图**（`NOT EXISTS` 子查询保证不会同时返回原图和其派生图）。

### 首页 / 公开列表：`card` → `thumb` → `original`

子查询 `image_urls` 逻辑摘要：

```sql
AND pm.variant IN ('card','thumb','original')
AND (
  pm.variant IN ('card','thumb')
  OR NOT EXISTS (
    SELECT 1 FROM lwpm_place_media mv
    WHERE mv.source_media_id = pm.id
      AND mv.variant IN ('card','thumb')
      ...
  )
)
ORDER BY
  CASE WHEN pm.role = 'cover' THEN 0 ELSE 1 END,
  CASE pm.variant WHEN 'card' THEN 0 WHEN 'thumb' THEN 1 ELSE 2 END,
  pm.sort_order ASC, pm.id ASC
```

含义：

- 若某张原图已有 `card` 或 `thumb` 派生行，**列表里不再暴露这条 `original`**
- 若派生图还没生成，**暂时用 `original` 顶上**，业务不中断
- 排序上 `cover` 角色优先，同角色下 `card` 优于 `thumb` 优于 `original`

### 详情页：`detail` → `original`

```sql
AND pm.variant IN ('detail','original')
AND (
  pm.variant = 'detail'
  OR NOT EXISTS (
    SELECT 1 FROM lwpm_place_media mv
    WHERE mv.source_media_id = pm.id
      AND mv.variant = 'detail'
      ...
  )
)
ORDER BY
  CASE WHEN role = 'cover' THEN 0 ELSE 1 END,
  CASE WHEN variant = 'detail' THEN 0 ELSE 1 END,
  sort_order ASC, id ASC
```

详情需要更大图，因此单独用 `detail` 变体，回退策略与列表相同。

---

## 与「实时 COS 处理」的对比

| 方式 | 优点 | 缺点 |
|------|------|------|
| URL 拼 `imageMogr2` 实时处理 | 不占额外存储 | 每次访问都处理；CDN 缓存键复杂；大图首次慢 |
| **本方案：处理一次、写入 variants/** | 接口 URL 稳定；体积可控；易统计 | 需批处理脚本；存储略增 |

本项目选择 **批处理落库**，公开 API 只读固定 `cdn_url`，小程序侧无需关心处理参数。

---

## 运维检查清单

1. **迁移已执行**：`manual-20260524-add-place-media-variants.sql`（及更早的 COS 扩展迁移）
2. **原图已入库**：`variant='original'` 且 `review_status='approved'`
3. **派生脚本跑完**：按 `source_media_id` + `variant` 查缺补漏
4. **抽查 URL**：`card` 体积应明显小于 `original`
5. **接口验证**：列表 `imageUrls` 首条应为 WebP variants；无派生时仍为原图

```sql
-- 某地点各变体数量
SELECT variant, COUNT(*) AS cnt
FROM lwpm_place_media
WHERE place_id = '你的place_id' AND stage = 'final'
GROUP BY variant;

-- 缺 card 派生的原图（待补跑）
SELECT o.id, o.place_id, o.cdn_url
FROM lwpm_place_media o
LEFT JOIN lwpm_place_media c
  ON c.source_media_id = o.id AND c.variant = 'card'
WHERE o.variant = 'original'
  AND o.stage = 'final'
  AND o.review_status = 'approved'
  AND c.id IS NULL
LIMIT 20;
```

---

## 相关文件索引

| 环节 | 路径 |
|------|------|
| 原图入库脚本 | `code/scripts/import-place-media.mjs` |
| 派生图脚本 | `code/scripts/generate-place-media-variants.mjs` |
| 变体字段迁移 | `code/database/migrations/manual-20260524-add-place-media-variants.sql` |
| COS 字段迁移 | `code/database/migrations/manual-20260524-extend-place-media-for-cos.sql` |
| Entity | `code/apps/backend/src/shared/entities/place-media/place-media.entity.ts` |
| 公开选图 | `code/apps/backend/src/modules/place/place.service.ts` |
| 导入方案（Phase 1） | `code/docs/11-place-media-import-plan.md` |

---

## 小结

- **`original`**：manifest 导入的唯一真相源，先保证能访问。
- **`card` / `thumb` / `detail`**：按场景预生成 WebP，通过 `source_media_id` 挂到原图。
- **API**：用 SQL `NOT EXISTS` 实现「有派生用派生、没有用原图」，上线与批处理解耦。
- **脚本**：`variantSpecs` 集中管理 COS 参数；`generateVariant` + `putCosObject` 负责拉取、上传、幂等写库。

按「导入原图 → 批量派生 → 接口自动切换」三步走，即可在不影响业务的前提下，把小程序图片流量和首屏耗时压下来。
