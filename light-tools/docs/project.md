# 个人网站小工具箱项目文档

版本：v0.1  
适用对象：Codex / 开发者 / 后续协作者  
项目代号：`LightTools`，正式名称后续可改为「轻工具箱」「文件快处理」「轻办工具箱」等。

---

## 1. 项目一句话定位

做一个面向中文用户的轻量文件处理工具站，主打：

> 不强制登录、打开即用、隐私友好、支持本地处理优先、在线处理补充、后期通过大文件/批量/高速/桌面版/API 盈利。

项目不要宣传成「破解 WPS 会员功能」或「免费替代 WPS 会员」。对外表达应是：

> 免费在线 PDF、图片、视频小工具。多数轻量任务在浏览器本地完成，敏感文件不上传服务器。

---

## 2. 核心目标

### 2.1 产品目标

1. 先上线一个可用的文件工具站，而不是一开始做大而全平台。
2. 第一阶段聚焦 5 个高频工具：
   - PDF 合并
   - PDF 拆分
   - 图片转 PDF
   - 图片压缩 / 格式转换
   - MP4 转 GIF
3. 建立后续扩展能力：任务队列、会员额度、支付、SEO 页面、桌面版下载入口。
4. 所有工具页面都要适合 SEO，能通过搜索词获得自然流量。
5. 尽量把能在浏览器完成的任务放在浏览器端执行，降低服务器成本，也增强隐私卖点。

### 2.2 商业目标

第一阶段不强制付费，先做流量。第二阶段通过以下方式盈利：

1. 免费额度限制：每天次数、文件大小、批量数量。
2. 会员：无限次数、大文件、批量处理、无广告、任务历史。
3. 单次付费：1 元/3 元/9.9 元，用于临时大文件转换。
4. 桌面版：批量处理、本地处理、隐私场景收费。
5. API：后期面向开发者和小企业。

---

## 3. 用户画像

### 3.1 办公用户

典型人群：行政、老师、财务、文员、学生、自由职业者。  
需求：合并 PDF、拆分 PDF、图片转 PDF、压缩文件、转格式。  
痛点：不想下载大型软件、不想注册、不想开会员、不放心上传合同/简历/身份证。

### 3.2 电商/内容运营用户

典型人群：淘宝、拼多多、抖店、闲鱼、公众号、小红书运营。  
需求：图片压缩、图片改尺寸、WebP/JPG/PNG 互转、视频转 GIF、视频压缩。  
痛点：经常批量处理素材，在线工具次数限制多，桌面批量工具愿意付费。

### 3.3 开发者/站长/小团队

需求：API 批量转换、自动化文件处理。  
痛点：不想自己维护 FFmpeg、Ghostscript、LibreOffice、OCR 环境。

---

## 4. 首版 MVP 范围

### 4.1 必做工具

| 工具 | 路由 | 首版处理方式 | 免费限制建议 | 备注 |
|---|---|---|---|---|
| PDF 合并 | `/tools/pdf-merge` | 浏览器本地优先，后端备用 | 单次最多 10 个文件，每个 30MB | 用于 SEO 引流 |
| PDF 拆分 | `/tools/pdf-split` | 浏览器本地优先，后端备用 | 单文件 50MB | 支持按页码范围拆分 |
| 图片转 PDF | `/tools/image-to-pdf` | 浏览器本地处理 | 单次最多 20 张图 | 最适合快速上线 |
| 图片压缩 | `/tools/image-compress` | 浏览器端或后端 sharp | 单次最多 20 张图 | 后期加批量收费 |
| MP4 转 GIF | `/tools/mp4-to-gif` | 后端 FFmpeg 队列 | 免费最大 50MB/30 秒 | 后端任务型工具 |

### 4.2 暂不做

以下功能先不在第一版实现，避免项目失控：

- PDF 转 Word
- Word/Excel/PPT 转 PDF
- OCR
- PDF 编辑器
- 电子签名
- 云盘同步
- 团队协作
- 移动 App
- 企业后台

这些功能后续可以作为第二阶段、第三阶段扩展。

---

## 5. 技术原则

### 5.1 本地优先

工具分两类：

#### A. 浏览器本地处理工具

适合处理：

- PDF 合并
- PDF 拆分
- 图片转 PDF
- 图片压缩
- 图片格式转换
- 二维码生成
- 文本格式化

优点：

- 不上传用户文件
- 成本低
- 速度快
- 隐私卖点强

限制：

- 受浏览器内存限制
- 大 PDF、大图片可能卡顿
- 移动端性能较弱

#### B. 服务器处理工具

适合处理：

- MP4 转 GIF
- 视频压缩
- 音频提取
- PDF 压缩
- OCR
- Office 转 PDF

优点：

- 稳定
- 可以处理复杂格式
- 能做队列、进度、重试

限制：

- 有服务器成本
- 要处理隐私、清理、安全隔离

### 5.2 工具页面独立化

每个工具必须有独立 URL，例如：

```text
/tools/pdf-merge
/tools/pdf-split
/tools/image-to-pdf
/tools/mp4-to-gif
```

每个页面必须有：

1. SEO 标题
2. 一句话描述
3. 上传区域
4. 参数选项
5. 生成按钮
6. 进度状态
7. 下载结果
8. 使用步骤
9. 常见问题
10. 隐私说明
11. 相关工具推荐

### 5.3 不依赖第三方收费办公接口

禁止做法：

- 调用 WPS、Smallpdf、iLovePDF 等第三方收费接口绕过限制。
- 使用他人网站接口当后端。
- 使用 WPS 商标、Logo、会员文案做引流。
- 宣传「破解」「绕过会员」「白嫖」。

推荐做法：

- 使用开源库。
- 自己部署文件处理服务。
- 能浏览器本地完成就本地完成。
- 明确开源组件许可证。

---

## 6. 推荐技术架构

### 6.1 总体架构

首版建议使用单仓库 monorepo：

```text
light-tools/
  apps/
    web/              # Next.js 网站
    worker/           # 后台任务 Worker，用于 FFmpeg、Ghostscript 等
  packages/
    shared/           # 共享类型、工具配置、校验逻辑
    file-core/        # 文件处理核心逻辑封装
  prisma/             # 数据库 schema 与迁移
  infra/              # docker-compose、nginx、部署脚本
  docs/               # 项目文档
```

### 6.2 技术选型

| 模块 | 技术 | 说明 |
|---|---|---|
| 前端/服务端 | Next.js + TypeScript | App Router，SEO 友好 |
| UI | Tailwind CSS + shadcn/ui 风格组件 | 快速做干净界面 |
| 表单校验 | zod | 前后端共享校验 |
| 数据库 | PostgreSQL | 会员、任务、订单、统计 |
| ORM | Prisma | 类型友好，迁移方便 |
| 队列 | Redis + BullMQ | 视频/PDF 压缩等异步任务 |
| 文件处理 | FFmpeg / qpdf / Ghostscript / sharp / pdf-lib | 按工具选择 |
| 存储 | 本地临时目录，后期接对象存储 | MVP 先简单 |
| 测试 | Vitest + Playwright | 单元测试 + 页面流程测试 |
| 部署 | Docker Compose + Nginx | VPS 快速上线 |

### 6.3 为什么这样选

- Next.js 的 Route Handler 适合做 `/api/*` 上传、创建任务、下载接口；官方文档说明 Route Handler 支持 GET、POST、PUT、PATCH、DELETE、HEAD、OPTIONS 等 HTTP 方法。
- Next.js Server Functions / Server Actions 可以用于简单表单和数据修改，但它们可被直接 POST 访问，所以涉及任务、支付、额度、下载时必须在服务端做认证和权限校验。
- `pdf-lib` 支持在 JavaScript 环境创建和修改 PDF，也支持 Split and Merge，适合浏览器端 PDF 合并/拆分的 MVP。
- `sharp` 是 Node.js 高性能图片处理库，适合服务端图片压缩、格式转换、生成缩略图等。
- FFmpeg 是通用视频/音频处理命令行工具，适合 MP4 转 GIF、视频压缩、提取音频等。
- qpdf 适合 PDF 合并、拆分、线性化、结构转换等内容保留型处理。
- Ghostscript 可用于 PDF 渲染、转换和压缩相关任务，但 PDF 压缩要给用户明确不同压缩等级会影响清晰度。
- BullMQ 基于 Redis，适合后台任务队列、重试、任务状态管理。

---

## 7. 目录结构设计

```text
light-tools/
  package.json
  pnpm-workspace.yaml
  turbo.json
  .env.example
  README.md

  apps/
    web/
      package.json
      next.config.ts
      src/
        app/
          layout.tsx
          page.tsx
          tools/
            page.tsx
            pdf-merge/
              page.tsx
            pdf-split/
              page.tsx
            image-to-pdf/
              page.tsx
            image-compress/
              page.tsx
            mp4-to-gif/
              page.tsx
          api/
            health/
              route.ts
            jobs/
              route.ts
              [jobId]/
                route.ts
                download/
                  route.ts
            upload/
              route.ts
        components/
          site/
            Header.tsx
            Footer.tsx
            ToolCard.tsx
          tools/
            FileDropzone.tsx
            ToolShell.tsx
            JobProgress.tsx
            DownloadPanel.tsx
            LocalProcessNotice.tsx
        lib/
          tool-registry.ts
          seo.ts
          browser-files.ts
          api-client.ts
        styles/
          globals.css

    worker/
      package.json
      src/
        index.ts
        queues.ts
        processors/
          mp4-to-gif.ts
          pdf-compress.ts
        services/
          ffmpeg.ts
          temp-dir.ts
          file-cleanup.ts

  packages/
    shared/
      package.json
      src/
        tools.ts
        limits.ts
        schemas.ts
        types.ts
        errors.ts
    file-core/
      package.json
      src/
        pdf/
          merge.ts
          split.ts
          image-to-pdf.ts
        image/
          compress.ts
        video/
          gif-options.ts
        safe-path.ts

  prisma/
    schema.prisma
    migrations/

  infra/
    docker-compose.yml
    nginx.conf
    Dockerfile.web
    Dockerfile.worker

  docs/
    project.md
    api.md
    deployment.md
    privacy.md
```

---

## 8. 工具注册表设计

所有工具统一由 `tool-registry.ts` 管理，避免页面重复写配置。

示例类型：

```ts
export type ToolProcessMode = 'browser' | 'server' | 'hybrid';

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: 'pdf' | 'image' | 'video' | 'text' | 'office';
  processMode: ToolProcessMode;
  acceptedMimeTypes: string[];
  maxFilesFree: number;
  maxFileSizeMbFree: number;
  maxFilesPro: number;
  maxFileSizeMbPro: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

首版配置：

```ts
export const tools: ToolDefinition[] = [
  {
    id: 'pdf-merge',
    slug: 'pdf-merge',
    name: 'PDF 合并',
    shortDescription: '把多个 PDF 合并成一个文件',
    longDescription: '支持拖拽多个 PDF 文件，按顺序合并，优先在浏览器本地完成。',
    category: 'pdf',
    processMode: 'browser',
    acceptedMimeTypes: ['application/pdf'],
    maxFilesFree: 10,
    maxFileSizeMbFree: 30,
    maxFilesPro: 100,
    maxFileSizeMbPro: 500,
    seo: {
      title: 'PDF 合并 - 免费在线合并多个 PDF 文件',
      description: '免费在线合并 PDF 文件，支持拖拽排序，优先浏览器本地处理，不上传文件。',
      keywords: ['PDF 合并', '合并 PDF', '多个 PDF 合成一个']
    }
  }
];
```

---

## 9. 首版页面设计

### 9.1 首页 `/`

页面模块：

1. Hero 区：一句话说明
2. 工具分类入口：PDF、图片、视频、文字
3. 热门工具卡片
4. 隐私说明：本地处理优先
5. 会员预告或桌面版预告
6. FAQ

首页文案建议：

```text
轻量文件工具箱
不用安装大型软件，打开网页就能处理 PDF、图片和视频。
多数轻量任务在浏览器本地完成，文件不上传服务器。
```

### 9.2 工具列表页 `/tools`

功能：

- 按分类筛选
- 搜索工具名称
- 展示每个工具是否「本地处理」或「服务器处理」

### 9.3 工具页统一布局

所有工具页面使用 `ToolShell`：

```text
[工具标题]
[一句话说明]
[隐私标签：本地处理 / 上传处理]
[上传区域]
[参数选项]
[开始处理按钮]
[进度/结果]
[使用步骤]
[常见问题]
[相关工具]
```

---

## 10. 核心功能详细规格

## 10.1 PDF 合并

### 路由

```text
/tools/pdf-merge
```

### 用户流程

1. 用户拖入多个 PDF。
2. 页面显示文件列表。
3. 用户可拖拽排序。
4. 点击「开始合并」。
5. 浏览器本地生成新 PDF。
6. 用户下载 `merged.pdf`。

### 首版参数

- 输出文件名，默认：`merged.pdf`
- 是否保留原始顺序
- 文件排序：手动拖拽

### 技术实现

优先用 `pdf-lib` 在浏览器中执行：

1. `PDFDocument.create()` 创建输出 PDF。
2. 逐个读取用户选择的 PDF。
3. `copyPages` 拷贝页面。
4. `addPage` 添加到输出文档。
5. `save()` 生成 Uint8Array。
6. 用 Blob 下载。

### 限制

免费用户：

```text
最多 10 个 PDF
单个 PDF 最大 30MB
总大小最大 100MB
```

超出后提示：

```text
当前文件较大，浏览器处理可能变慢。升级后可使用服务器高速合并和更大文件支持。
```

### 验收标准

- 能合并 2 个以上 PDF。
- 合并后页数正确。
- 拖拽排序后输出顺序正确。
- 文件不上传服务器。
- 处理失败时有明确错误提示。

---

## 10.2 PDF 拆分

### 路由

```text
/tools/pdf-split
```

### 用户流程

1. 用户上传一个 PDF。
2. 页面显示页数。
3. 用户输入页码范围。
4. 点击「开始拆分」。
5. 生成一个或多个 PDF。
6. 单个结果直接下载，多个结果打包为 zip 下载。

### 页码范围格式

支持：

```text
1-3
5
7-9
1-3,5,7-9
```

### 技术实现

浏览器端使用 `pdf-lib`：

1. 加载 PDF。
2. 解析页码范围。
3. 创建新 PDF。
4. copy 指定页。
5. 保存输出。

多个输出时：

- MVP 可先只生成一个 PDF。
- 后续用 JSZip 打包多个文件。

### 验收标准

- 输入 `1-3` 能导出前三页。
- 输入非法页码要提示错误。
- 超过总页数要提示错误。
- 原文件不上传服务器。

---

## 10.3 图片转 PDF

### 路由

```text
/tools/image-to-pdf
```

### 用户流程

1. 用户上传 JPG/PNG/WebP 图片。
2. 页面显示图片列表。
3. 用户拖拽排序。
4. 选择页面方向和边距。
5. 点击「生成 PDF」。
6. 下载 PDF。

### 参数

```text
页面大小：A4 / 原图尺寸
方向：自动 / 竖版 / 横版
边距：无 / 小 / 中 / 大
图片适配：等比适应 / 铺满裁切
输出文件名：images.pdf
```

### 技术实现

浏览器端：

- 可用 `pdf-lib` 创建 PDF。
- 使用浏览器 FileReader 读取图片。
- 根据图片尺寸计算页面大小。
- 将图片嵌入 PDF。

### 验收标准

- 支持 JPG、PNG。
- 首版 WebP 可选，无法嵌入时提示转 JPG。
- 多图顺序正确。
- 输出 PDF 可正常打开。

---

## 10.4 图片压缩 / 格式转换

### 路由

```text
/tools/image-compress
```

### 用户流程

1. 用户上传图片。
2. 选择输出格式：保持原格式 / JPG / PNG / WebP。
3. 设置质量：推荐 80。
4. 点击「开始压缩」。
5. 显示压缩前后大小。
6. 下载结果。

### 首版处理方式

MVP 可浏览器 Canvas 实现基础压缩：

- JPG/WebP 输出质量控制。
- PNG 可暂时只做尺寸缩放，不承诺强压缩。

后端增强版使用 `sharp`：

- 批量压缩
- 更稳定的 WebP/AVIF/JPEG 输出
- 更好的性能

### 验收标准

- 单张 JPG 压缩后大小下降。
- 显示压缩比例。
- 批量文件可逐个下载。
- 后续支持打包下载 zip。

---

## 10.5 MP4 转 GIF

### 路由

```text
/tools/mp4-to-gif
```

### 用户流程

1. 用户上传 MP4。
2. 选择参数：
   - 开始时间
   - 截取时长
   - 帧率
   - 宽度
   - 是否循环
3. 点击「生成 GIF」。
4. 文件上传到服务器。
5. 创建后台任务。
6. 页面轮询任务进度。
7. 完成后下载 GIF。

### 免费限制

```text
最大文件：50MB
最大时长：30 秒
输出宽度：最大 720px
帧率：最大 12fps
```

### 会员限制

```text
最大文件：1GB
最大时长：5 分钟
输出宽度：最大 1080px
帧率：最大 24fps
支持批量
```

### FFmpeg 命令建议

生成调色板：

```bash
ffmpeg -y -ss <start> -t <duration> -i input.mp4 \
  -vf "fps=<fps>,scale=<width>:-1:flags=lanczos,palettegen" \
  palette.png
```

生成 GIF：

```bash
ffmpeg -y -ss <start> -t <duration> -i input.mp4 -i palette.png \
  -lavfi "fps=<fps>,scale=<width>:-1:flags=lanczos[x];[x][1:v]paletteuse" \
  output.gif
```

### 安全要求

- 不能用字符串拼接 shell 命令。
- 必须用 `spawn(command, args)` 传参数数组。
- 文件名必须改成内部随机 ID。
- 每个任务独立临时目录。
- 任务完成后删除原始视频。
- 设置超时，例如免费任务最多 120 秒。
- 限制输出文件大小。

### 验收标准

- 上传 MP4 后能生成 GIF。
- 参数能影响输出结果。
- 页面显示处理中、成功、失败。
- 失败时显示可理解错误，不暴露服务器路径。
- 临时文件会自动清理。

---

## 11. 后端任务系统设计

### 11.1 任务状态

```ts
export type JobStatus =
  | 'queued'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'expired';
```

### 11.2 创建任务流程

```text
用户提交文件
  -> 校验文件大小/MIME/额度
  -> 保存到临时目录或对象存储
  -> 创建 Job 记录
  -> 推送 BullMQ 队列
  -> 返回 jobId
  -> 前端轮询 /api/jobs/:jobId
```

### 11.3 Worker 流程

```text
读取任务
  -> 创建工作目录
  -> 下载/复制输入文件
  -> 执行处理命令
  -> 校验输出文件
  -> 更新 Job 状态
  -> 删除原始临时文件
```

### 11.4 下载流程

```text
用户点击下载
  -> GET /api/jobs/:jobId/download
  -> 校验任务存在
  -> 校验任务属于当前用户/匿名会话
  -> 校验未过期
  -> 返回文件流
```

### 11.5 轮询策略

前端每 1.5 秒轮询一次，最多 5 分钟。  
后期可以改成 SSE 或 WebSocket。

---

## 12. API 设计

### 12.1 健康检查

```http
GET /api/health
```

响应：

```json
{
  "ok": true,
  "version": "0.1.0"
}
```

### 12.2 创建服务器任务

```http
POST /api/jobs
Content-Type: multipart/form-data
```

字段：

```text
toolId=mp4-to-gif
file=<binary>
options={"start":0,"duration":5,"fps":12,"width":720}
```

响应：

```json
{
  "jobId": "job_xxx",
  "status": "queued"
}
```

### 12.3 查询任务状态

```http
GET /api/jobs/:jobId
```

响应：

```json
{
  "jobId": "job_xxx",
  "toolId": "mp4-to-gif",
  "status": "processing",
  "progress": 42,
  "message": "正在生成 GIF"
}
```

成功响应：

```json
{
  "jobId": "job_xxx",
  "toolId": "mp4-to-gif",
  "status": "succeeded",
  "progress": 100,
  "downloadUrl": "/api/jobs/job_xxx/download"
}
```

失败响应：

```json
{
  "jobId": "job_xxx",
  "toolId": "mp4-to-gif",
  "status": "failed",
  "errorMessage": "视频处理失败，请确认文件格式是否正确"
}
```

### 12.4 下载结果

```http
GET /api/jobs/:jobId/download
```

返回：

```text
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="output.gif"
```

---

## 13. 数据库设计

首版 Prisma schema 设计方向：

```prisma
model User {
  id        String   @id @default(cuid())
  email     String?  @unique
  name      String?
  plan      String   @default("free")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  jobs      Job[]
  payments  PaymentOrder[]
}

model AnonymousSession {
  id        String   @id @default(cuid())
  tokenHash String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  jobs      Job[]
}

model Job {
  id                 String   @id @default(cuid())
  toolId             String
  status             String
  progress           Int      @default(0)
  message            String?
  errorMessage        String?
  inputFilePath       String?
  outputFilePath      String?
  outputFileName      String?
  outputMimeType      String?
  inputSizeBytes      BigInt?
  outputSizeBytes     BigInt?
  optionsJson         Json?
  userId              String?
  anonymousSessionId  String?
  expiresAt           DateTime?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  user                User?   @relation(fields: [userId], references: [id])
  anonymousSession    AnonymousSession? @relation(fields: [anonymousSessionId], references: [id])

  @@index([toolId, createdAt])
  @@index([status, createdAt])
}

model UsageCounter {
  id                 String   @id @default(cuid())
  subjectType         String   // user | anonymous | ip
  subjectKey          String
  toolId              String
  dayKey              String   // yyyy-mm-dd
  count               Int      @default(0)
  totalInputBytes     BigInt   @default(0)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@unique([subjectType, subjectKey, toolId, dayKey])
}

model PaymentOrder {
  id          String   @id @default(cuid())
  userId      String
  provider    String   // alipay | wechat | stripe
  plan        String
  amountCents Int
  currency    String   @default("CNY")
  status      String   // pending | paid | failed | refunded
  providerOrderId String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
}
```

MVP 可以先不启用 User 和 PaymentOrder，只保留 AnonymousSession、Job、UsageCounter。

---

## 14. 额度系统设计

### 14.1 免费用户限制

```ts
export const FREE_LIMITS = {
  dailyServerJobs: 3,
  maxVideoSizeMb: 50,
  maxVideoDurationSeconds: 30,
  maxGifWidth: 720,
  maxGifFps: 12,
  maxPdfFiles: 10,
  maxPdfFileSizeMb: 30,
  maxImageFiles: 20,
  maxImageFileSizeMb: 20
};
```

### 14.2 会员限制

```ts
export const PRO_LIMITS = {
  dailyServerJobs: 300,
  maxVideoSizeMb: 1024,
  maxVideoDurationSeconds: 300,
  maxGifWidth: 1080,
  maxGifFps: 24,
  maxPdfFiles: 100,
  maxPdfFileSizeMb: 500,
  maxImageFiles: 500,
  maxImageFileSizeMb: 100
};
```

### 14.3 匿名用户识别

首版：

- 设置 `lt_session` HttpOnly cookie。
- 数据库保存 token hash。
- 不要依赖 fingerprint 做强追踪。
- IP 只用于限流，不长期展示给业务侧。

---

## 15. 文件安全与隐私设计

### 15.1 文件处理原则

1. 用户上传文件只用于完成本次转换。
2. 原始文件处理完成后尽快删除。
3. 免费用户输出文件默认保留 24 小时。
4. 会员输出文件可选保留 7 天。
5. 不读取、不分析、不训练用户文件内容。
6. 不把文件转发给第三方工具接口。

### 15.2 临时目录结构

```text
/tmp/light-tools/
  jobs/
    job_xxx/
      input/
      output/
      work/
```

### 15.3 文件名策略

用户原文件名只用于展示和下载名。  
服务器内部存储使用随机 ID：

```text
input_01.mp4
output.gif
palette.png
```

禁止直接拼接用户文件名到路径。

### 15.4 校验要求

每个上传文件必须校验：

- 扩展名
- MIME type
- 文件魔数
- 文件大小
- 工具是否接受该类型

### 15.5 命令执行安全

禁止：

```ts
exec(`ffmpeg -i ${userFileName} output.gif`)
```

必须：

```ts
spawn('ffmpeg', ['-y', '-i', inputPath, outputPath], {
  cwd: jobDir,
  shell: false
});
```

### 15.6 清理任务

每日或每小时执行：

```text
删除 expired job 的 input/output/work 文件
把过期任务状态改为 expired
删除孤儿临时目录
```

---

## 16. SEO 设计

### 16.1 每个工具页的 SEO 模板

页面标题：

```text
{工具名} - 免费在线{核心动作} | 轻工具箱
```

描述：

```text
免费在线{工具名}，支持拖拽上传，简单快速。{本地处理说明/隐私说明}。
```

### 16.2 首批关键词

PDF 合并：

```text
PDF 合并
合并 PDF
多个 PDF 合成一个
PDF 拼接
在线合并 PDF
```

PDF 拆分：

```text
PDF 拆分
PDF 提取页面
PDF 分割
PDF 按页拆分
```

图片转 PDF：

```text
图片转 PDF
JPG 转 PDF
PNG 转 PDF
多张图片合成 PDF
```

MP4 转 GIF：

```text
MP4 转 GIF
视频转 GIF
在线生成 GIF
视频截取 GIF
```

图片压缩：

```text
图片压缩
JPG 压缩
PNG 压缩
WebP 转 JPG
图片变小
```

### 16.3 FAQ 模板

每个工具页底部至少写 5 个 FAQ：

1. 这个工具免费吗？
2. 文件会上传服务器吗？
3. 支持多大的文件？
4. 处理后的文件会保存多久？
5. 为什么处理失败？

### 16.4 结构化数据

后续可以加 JSON-LD：

- `SoftwareApplication`
- `FAQPage`
- `BreadcrumbList`

---

## 17. 付费设计

### 17.1 初始价格建议

```text
单次大文件处理：1 元
当天不限次数：3 元
7 天会员：9.9 元
月会员：19 元
年会员：99 元
桌面版个人永久：69 元
桌面版专业永久：199 元
```

### 17.2 免费与付费差异

| 功能 | 免费 | 会员 |
|---|---|---|
| 每日服务器任务 | 3 次 | 300 次 |
| 广告 | 有 | 无 |
| 视频大小 | 50MB | 1GB |
| 批量处理 | 不支持 | 支持 |
| 输出保留 | 24 小时 | 7 天 |
| 下载速度 | 普通 | 优先 |
| 桌面版 | 试用 | 完整版 |

### 17.3 支付接入顺序

1. 先做人工兑换码/激活码，验证付费需求。
2. 再接支付宝。
3. 再接微信支付。
4. 后续考虑 Paddle/Stripe 面向海外。

MVP 阶段不要一开始就花很多时间做复杂支付后台。

---

## 18. 合规与法律注意事项

### 18.1 ICP 备案

如果网站使用中国大陆服务器并通过域名提供服务，需要考虑 ICP 备案。  
如果先用海外服务器，可以先不做 ICP，但中国大陆访问速度可能受影响。

### 18.2 隐私政策

必须有：

```text
/privacy
/terms
```

隐私政策要写清楚：

- 收集哪些信息
- 为什么收集
- 文件如何处理
- 文件保存多久
- 如何删除
- 是否使用第三方服务
- 联系方式

### 18.3 敏感文件提醒

上传区下方建议写：

```text
请勿上传违法、侵权或你无权处理的文件。涉及身份证、合同、财务等敏感文件时，建议优先使用本地处理工具或桌面版。
```

### 18.4 商标风险

不要在页面标题、Logo、广告词中使用：

```text
WPS 会员替代
WPS 破解版
免费破解 WPS
```

可以使用通用词：

```text
PDF 合并
PDF 拆分
图片转 PDF
视频转 GIF
```

---

## 19. 部署方案

### 19.1 MVP 单机部署

一台 VPS：

```text
Nginx
Next.js web
Worker
PostgreSQL
Redis
本地磁盘临时目录
```

Docker Compose 服务：

```yaml
services:
  web:
    build:
      context: .
      dockerfile: infra/Dockerfile.web
    env_file: .env
    depends_on:
      - postgres
      - redis

  worker:
    build:
      context: .
      dockerfile: infra/Dockerfile.worker
    env_file: .env
    depends_on:
      - postgres
      - redis
    volumes:
      - ./data:/data

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: lighttools
      POSTGRES_PASSWORD: lighttools
      POSTGRES_DB: lighttools
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 19.2 后续扩展

当流量起来后：

- Web 和 Worker 分开机器
- 文件输出放对象存储
- Redis 用云服务
- PostgreSQL 用云数据库
- Worker 横向扩容
- CDN 加速静态资源

---

## 20. 环境变量设计

`.env.example`：

```env
NODE_ENV=development
APP_URL=http://localhost:3000

DATABASE_URL=postgresql://lighttools:lighttools@localhost:5432/lighttools
REDIS_URL=redis://localhost:6379

FILE_STORAGE_DRIVER=local
LOCAL_STORAGE_ROOT=/data/light-tools
JOB_RETENTION_HOURS_FREE=24
JOB_RETENTION_HOURS_PRO=168

MAX_UPLOAD_MB_FREE=50
MAX_UPLOAD_MB_PRO=1024

FFMPEG_PATH=ffmpeg
GHOSTSCRIPT_PATH=gs
QPDF_PATH=qpdf

SESSION_COOKIE_NAME=lt_session
SESSION_SECRET=replace_me

ENABLE_PAYMENTS=false
ALIPAY_APP_ID=
ALIPAY_PRIVATE_KEY=
ALIPAY_PUBLIC_KEY=
WECHAT_PAY_MCH_ID=
WECHAT_PAY_API_V3_KEY=
```

---

## 21. 开发命令

建议使用 pnpm：

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
```

开发依赖启动：

```bash
docker compose -f infra/docker-compose.yml up -d postgres redis
```

数据库迁移：

```bash
pnpm prisma migrate dev
```

Worker：

```bash
pnpm --filter worker dev
```

Web：

```bash
pnpm --filter web dev
```

---

## 22. 代码规范

1. 全项目 TypeScript strict。
2. 所有工具参数必须用 zod 校验。
3. 所有文件大小限制必须前后端都校验。
4. API 返回统一格式。
5. 错误不要泄露服务器路径、命令行完整参数、内部堆栈。
6. 文件路径必须使用安全 join，禁止信任用户输入路径。
7. Worker 中执行命令必须使用 spawn 参数数组。
8. 所有工具逻辑放在 `packages/file-core` 或 `apps/worker/src/processors`，页面不要写复杂处理逻辑。
9. 每个工具至少有一个单元测试或流程测试。
10. 新增工具必须先在 `tool-registry` 注册。

---

## 23. UI 风格要求

### 23.1 整体感觉

- 简洁
- 可信
- 中文友好
- 不要像广告站
- 不要弹窗骚扰
- 不要强制登录

### 23.2 组件

核心组件：

- `FileDropzone`
- `SelectedFileList`
- `ToolOptionsPanel`
- `PrimaryActionButton`
- `ProgressBar`
- `ResultDownloadCard`
- `PrivacyNotice`
- `RelatedTools`
- `ToolFaq`

### 23.3 上传区文案

本地工具：

```text
把文件拖到这里，或点击选择文件
该工具会在你的浏览器中处理文件，不会上传到服务器。
```

服务器工具：

```text
把文件拖到这里，或点击选择文件
该工具需要上传到服务器处理，完成后会自动清理临时文件。
```

---

## 24. 埋点与数据分析

首版记录匿名事件即可：

```text
tool_page_view
tool_file_selected
tool_process_started
tool_process_succeeded
tool_process_failed
tool_download_clicked
upgrade_click
```

不要记录用户文件名和文件内容。  
可以记录：

- 工具 ID
- 文件大小区间
- 是否成功
- 处理耗时
- 错误类型

用于判断哪个工具值得继续优化。

---

## 25. 测试计划

### 25.1 单元测试

- 页码范围解析
- 文件大小限制
- 工具参数 zod 校验
- 安全路径处理
- GIF 参数规范化

### 25.2 浏览器流程测试

- 首页加载
- 工具页加载
- PDF 合并流程
- 图片转 PDF 流程
- MP4 转 GIF 创建任务流程

### 25.3 Worker 测试

准备小样本文件：

```text
test-fixtures/sample.mp4
test-fixtures/a.pdf
test-fixtures/b.pdf
test-fixtures/image.jpg
```

验证：

- Worker 能处理 MP4 转 GIF。
- 失败任务状态正确。
- 输出文件存在且大于 0 字节。
- 任务结束后临时文件清理。

---

## 26. 路线图

### 阶段 0：项目初始化

目标：仓库能跑起来。

任务：

- 初始化 pnpm workspace。
- 初始化 Next.js web。
- 初始化 worker app。
- 配置 TypeScript、ESLint、Prettier。
- 配置 Prisma。
- 配置 Docker Compose 的 Postgres 和 Redis。
- 实现 `/api/health`。

验收：

- `pnpm dev` 能启动网站。
- 首页能打开。
- `/api/health` 返回 ok。

### 阶段 1：基础网站与工具注册表

目标：有一个像样的网站壳。

任务：

- 首页
- 工具列表页
- 工具注册表
- Header/Footer
- ToolCard
- ToolShell
- SEO metadata 工具函数

验收：

- 首页能看到 5 个工具入口。
- 每个工具页面路由存在。
- 页面标题和描述正确。

### 阶段 2：浏览器本地工具

目标：先上线不用服务器处理的工具。

任务：

- PDF 合并
- PDF 拆分
- 图片转 PDF
- 图片压缩基础版

验收：

- 4 个工具都能在浏览器端完成。
- 文件不上传服务器。
- 失败有错误提示。

### 阶段 3：后端任务系统

目标：支持 MP4 转 GIF。

任务：

- Job 数据表
- AnonymousSession
- `/api/jobs` 创建任务
- `/api/jobs/:jobId` 查询状态
- `/api/jobs/:jobId/download` 下载
- BullMQ 队列
- Worker 处理 MP4 转 GIF
- 临时文件清理

验收：

- 上传 MP4 能生成 GIF。
- 页面能显示进度。
- 下载可用。
- 任务失败可恢复展示。

### 阶段 4：限额与基础转化

目标：建立商业化基础。

任务：

- 免费额度限制
- 使用次数计数
- 超额提示
- 会员页静态版
- 桌面版下载页
- 兑换码后台简化版

验收：

- 匿名用户每天超过服务器任务次数会被限制。
- 工具页有升级入口。
- 可手动给用户开通会员。

### 阶段 5：支付与会员

目标：开始收费。

任务：

- 用户登录
- 支付订单
- 支付宝接入
- 微信支付接入
- 会员状态
- 订单回调

验收：

- 用户可购买会员。
- 支付成功后额度提升。
- 订单状态可追踪。

### 阶段 6：高级工具

目标：扩展高价值工具。

候选：

- PDF 压缩
- PDF 转图片
- 视频压缩
- 音频提取
- OCR 图片转文字
- Office 转 PDF
- 批量图片改尺寸

---

## 27. 给 Codex 的首个任务提示词

把下面这段作为第一次给 Codex 的任务：

```text
请根据 docs/project.md 中的项目文档，初始化一个名为 light-tools 的 pnpm monorepo。

第一轮只完成阶段 0 和阶段 1，不要实现支付，不要实现复杂文件处理。

具体要求：
1. 创建 pnpm workspace，包含 apps/web、apps/worker、packages/shared、packages/file-core。
2. apps/web 使用 Next.js + TypeScript + App Router。
3. 添加 Tailwind CSS。
4. 创建首页 `/`、工具列表页 `/tools`、五个工具占位页：
   - `/tools/pdf-merge`
   - `/tools/pdf-split`
   - `/tools/image-to-pdf`
   - `/tools/image-compress`
   - `/tools/mp4-to-gif`
5. 在 packages/shared 中创建工具注册表类型和首批 5 个工具配置。
6. apps/web 从工具注册表渲染首页工具卡片和工具列表页。
7. 实现 `/api/health`，返回 `{ ok: true }`。
8. 添加 .env.example。
9. 添加基础 README，写明启动命令。
10. TypeScript 开启 strict。
11. 页面 UI 要简洁、中文、移动端可用。
12. 不要引入数据库、支付、登录，先保留扩展位置即可。

完成后请列出创建的文件、如何启动、以及下一步建议。
```

---

## 28. 给 Codex 的第二个任务提示词

阶段 1 完成后，再给 Codex：

```text
在当前 light-tools 项目中实现浏览器本地工具的基础能力。

本轮只实现：
1. PDF 合并 `/tools/pdf-merge`
2. PDF 拆分 `/tools/pdf-split`
3. 图片转 PDF `/tools/image-to-pdf`

要求：
- 尽量使用浏览器本地处理，不上传文件。
- 使用 pdf-lib 实现 PDF 相关能力。
- 添加 FileDropzone、SelectedFileList、DownloadPanel 等复用组件。
- PDF 合并支持多个文件、拖拽排序、生成 merged.pdf。
- PDF 拆分支持页码范围，例如 `1-3,5,7-9`。
- 图片转 PDF 支持 JPG/PNG，多张图片按顺序生成 PDF。
- 所有错误要给中文提示。
- 添加必要的单元测试，尤其是页码范围解析。
- 不要实现会员、支付和后端队列。

完成后说明使用方式和测试命令。
```

---

## 29. 给 Codex 的第三个任务提示词

```text
在当前 light-tools 项目中实现后端任务系统 MVP，用于 MP4 转 GIF。

要求：
1. 添加 Prisma schema：Job、AnonymousSession、UsageCounter。
2. 添加 Docker Compose 中的 Postgres 和 Redis。
3. 添加 BullMQ 队列。
4. 实现 POST `/api/jobs`，接收 multipart/form-data，支持 toolId=mp4-to-gif。
5. 实现 GET `/api/jobs/:jobId` 查询任务状态。
6. 实现 GET `/api/jobs/:jobId/download` 下载输出文件。
7. apps/worker 实现 MP4 转 GIF processor。
8. Worker 使用 ffmpeg，必须用 spawn 参数数组，不能用 shell 字符串拼接。
9. 每个任务创建独立临时目录。
10. 免费限制：最大 50MB、最大 30 秒、最大 720px、最大 12fps。
11. 处理完成后删除原始输入文件，输出文件保留 24 小时。
12. 页面 `/tools/mp4-to-gif` 接入任务 API，显示上传、处理中、成功下载、失败提示。
13. 添加 .env.example 中缺失的变量。

完成后说明本地如何安装 FFmpeg、如何启动 web/worker、如何测试一次转换。
```

---

## 30. README 首版建议内容

```md
# LightTools

一个轻量中文文件处理工具箱。首版支持 PDF 合并、PDF 拆分、图片转 PDF、图片压缩、MP4 转 GIF。

## 开发

pnpm install
pnpm dev

## 环境

- Node.js
- pnpm
- PostgreSQL
- Redis
- FFmpeg，服务器任务需要

## 工具

- PDF 合并：浏览器本地处理
- PDF 拆分：浏览器本地处理
- 图片转 PDF：浏览器本地处理
- 图片压缩：浏览器本地处理/后端增强
- MP4 转 GIF：服务器 FFmpeg 处理

## 隐私

能在浏览器本地处理的工具不会上传文件。服务器处理工具只为完成转换临时保存文件，并在任务完成后自动清理。
```

---

## 31. 参考资料

- Next.js Route Handlers: https://nextjs.org/docs/app/api-reference/file-conventions/route
- Next.js Server Actions / Server Functions 安全提醒: https://nextjs.org/docs/app/getting-started/mutating-data
- pdf-lib: https://pdf-lib.js.org/
- sharp: https://sharp.pixelplumbing.com/
- FFmpeg: https://www.ffmpeg.org/
- FFmpeg filters: https://ffmpeg.org/ffmpeg-filters.html
- qpdf: https://github.com/qpdf/qpdf
- Ghostscript PDF optimization: https://ghostscript.com/blog/optimizing-pdfs.html
- BullMQ: https://docs.bullmq.io/
- 个人信息保护法: https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm
- 非经营性互联网信息服务备案管理办法: https://www.cac.gov.cn/2005-02/09/c_1112147171.htm

---

## 32. 当前最小可行上线版本定义

真正的 MVP 不需要会员、不需要登录、不需要支付。  
只要满足下面条件就可以上线测试：

1. 首页能打开。
2. 5 个工具页面能打开。
3. PDF 合并能用。
4. PDF 拆分能用。
5. 图片转 PDF 能用。
6. MP4 转 GIF 能用。
7. 有隐私政策页面。
8. 有基础 SEO title/description。
9. 服务器任务有大小限制和自动清理。
10. 出错时用户知道下一步怎么做。

先上线，再根据访问量决定下一个工具。不要一开始追求完美。
