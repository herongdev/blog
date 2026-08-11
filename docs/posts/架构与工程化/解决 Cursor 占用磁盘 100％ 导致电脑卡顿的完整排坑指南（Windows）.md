---
title: 解决 Cursor 占用磁盘 100% 导致电脑卡顿的完整排坑指南（Windows）
date: 2025-10-22
categories:
---

## 一、现象与结论

- 症状：**C 盘磁盘活动时间接近 100%**，但**读写速率只有几 MB/s、平均响应 300ms+**。
- 结论：这不是带宽被占满，而是**海量小文件随机 I/O**造成**长队列 + 高延迟**。
- 常见诱因：**Cursor/TS 语言服务索引**、**Windows Defender/搜索索引**同时扫你的工程，外加 `node_modules/.next/dist/.git` 等巨量小文件。

> 目标：把不必要的扫描与监听“关掉/绕开”，让真实开发 I/O 回到可接受范围。

---

## 二、整体思路（先做 1 ～ 3）

1. **查凶手**：资源监视器定位哪个进程、哪条路径在疯狂打盘。
2. **杀毒与搜索排除**：把工程与缓存目录从 Defender 和 Windows 搜索索引中排除（对可信仓库）。
3. **限制编辑器索引/监听**：配置 Cursor/VSCode 的 `watcherExclude`、`search.exclude` 等，并优化 `.cursorignore`。
4. **保证 SSD 空间与健康**：预留 15–20% 空间，执行 TRIM/ReTrim，更新固件/驱动。
5. **复测**：活动时间应降到 10–20% 以内，平均响应 < 20ms（空闲更低）。

---

## 三、分步实现

### 步骤 1 ｜定位“谁在打磁盘”

1. 打开 **任务管理器 → 进程**，按“**磁盘**”排序。
2. 打开 **资源监视器（resmon）→ 磁盘**：

   - 看“**具有最大活动时间的进程**”。
   - 展开“**磁盘活动**”，观察**文件路径**（常见：`Cursor.exe` / `node.exe` / `TypeScript Server` / `MsMpEng.exe` / 工程目录下的 `node_modules/.next/dist/.git` 等）。

### 步骤 2 ｜排除杀毒与系统索引（强烈推荐）

> 仅对**可信**的代码仓库使用排除。

**以管理员身份**打开 PowerShell，按需替换路径后执行：

```powershell
# 在修改处上一行给注释：排除你的工程与常见前端缓存目录
Add-MpPreference -ExclusionPath "D:\work\your-repo","C:\Users\你的用户名\AppData\Local\pnpm-store","C:\Users\你的用户名\AppData\Local\npm-cache","C:\Users\你的用户名\AppData\Local\Cursor"

# 在修改处上一行给注释：可选——排除相关进程（减少实时扫描干扰）
Add-MpPreference -ExclusionProcess "cursor.exe","node.exe","git.exe"
```

再到 **设置 → 隐私和安全性 → Windows 搜索**：把你的**工程根目录**加入**不编入索引**的路径。

### 步骤 3 ｜限制 Cursor/VSCode 的文件监控与索引

在工作区创建/编辑 **`.vscode/settings.json`**：

```jsonc
{
  // 在修改处上一行给注释：停止对大目录的文件系统监控，减少事件风暴
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/.next/**": true,
    "**/dist/**": true,
    "**/.turbo/**": true,
    "**/build/**": true,
    "**/.dart_tool/**": true
  },

  // 在修改处上一行给注释：从搜索中排除上述目录，避免频繁全盘扫描
  "search.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/.next": true,
    "**/dist": true,
    "**/.turbo": true,
    "**/build": true,
    "**/.dart_tool": true
  },

  // 在修改处上一行给注释：关闭大仓库的 TS 项目诊断，减轻索引压力
  "typescript.tsserver.experimental.enableProjectDiagnostics": false
}
```

> **Cursor 专属**：若有 “**Codebase / Repo Map / Embeddings / Index workspace**” 等索引功能，**先关掉**再观察曲线。

### 步骤 4 ｜完善 `.cursorignore`

你已添加了 `.cursorignore`，建议在“已有规则”基础上补充几条**容易漏掉**的目录（只贴新增/调整部分）：

```gitignore
# 在修改处上一行给注释：忽略包管理器全局/本地存储与锁定缓存
.pnpm-store/
npm-cache/
yarn-error.log

# 在修改处上一行给注释：忽略 LLM/Embeddings/搜索缓存（若存在）
.vector_cache/
.embeddings/
.repo-map/

# 在修改处上一行给注释：忽略临时拉链/导出产物
*.zip
*.7z
```

> 你的原始片段已经很完善（见文末“附录 · 配置汇总”），上面仅是**增量补强**。

### 步骤 5 ｜保证 SSD 空间与健康

- **至少保留 15–20% 空间**（512G 盘建议空出 ≥70–100G）。
- 可删再装：`node_modules/`、`.next/`、`dist/` 等。
- 固件/驱动：更新 **SSD 固件** 与 **主板存储控制器驱动**；设备管理器确认 **AHCI**&开启写缓存。

### 步骤 6 ｜ TRIM / ReTrim 与快速自检

以管理员身份打开 **命令提示符**：

```cmd
:: 在修改处上一行给注释：0 表示已启用 TRIM
fsutil behavior query DisableDeleteNotify

:: 在修改处上一行给注释：对 SSD 执行 ReTrim
defrag C: /L

:: 在修改处上一行给注释：简易磁盘状态（仅粗略参考）
wmic diskdrive get status
```

### 步骤 7 ｜（可选）WSL 的工程位置

若使用 WSL，优先把仓库放在 Linux 文件系统（`\\wsl$\<distro>\home\...`），避免跨盘随机 I/O。

### 步骤 8 ｜复测与回归

- 任务管理器里 **C 盘活动时间**应降到 **< 10–20%**；
- **平均响应时间**应回落到 **< 20ms**。
  若仍异常：回到**资源监视器 → 磁盘**，按“**文件**”列定位残余热路径，针对性再加排除/忽略。

---

## 四、一分钟速览清单（可直接照做）

1. 资源监视器锁定**进程 + 路径**。
2. PowerShell 执行 `Add-MpPreference -ExclusionPath ...` 与 `-ExclusionProcess ...`。
3. `.vscode/settings.json` 配置 `files.watcherExclude` 与 `search.exclude`。
4. `.cursorignore` 覆盖常见大目录与缓存。
5. 保留 ≥15% SSD 空间，执行 `defrag C: /L`，更新固件与驱动。
6. 复测活动时间与响应时间。

---

## 五、常见问答

**Q1：为什么活动时间 100% 但带宽只有几 MB/s？**
A：因为都是**小文件随机 I/O**，磁盘在“排队”等寻道/擦写，**延迟**而非**吞吐**成了瓶颈。

**Q2：排除杀毒会不会不安全？**
A：仅对**可信仓库与缓存目录**排除即可，保持系统盘与下载区常规防护。

**Q3：.cursorignore 与 .gitignore 要一样吗？**
A：高度重叠但不必完全一致。`.cursorignore` 关注“**不参与索引/上下文**”，可更激进些；`.gitignore` 关注版本管理。

---

## 六、附录 · 可复制的脚本与配置汇总

### 1）PowerShell（管理员）

```powershell
# 在修改处上一行给注释：排除工程与缓存目录（请替换为你的真实路径）
Add-MpPreference -ExclusionPath "D:\work\your-repo","C:\Users\你的用户名\AppData\Local\pnpm-store","C:\Users\你的用户名\AppData\Local\npm-cache","C:\Users\你的用户名\AppData\Local\Cursor"

# 在修改处上一行给注释：可选——排除相关进程
Add-MpPreference -ExclusionProcess "cursor.exe","node.exe","git.exe"
```

### 2）`.vscode/settings.json`

```jsonc
{
  // 在修改处上一行给注释：限制文件系统监控
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/.next/**": true,
    "**/dist/**": true,
    "**/.turbo/**": true,
    "**/build/**": true,
    "**/.dart_tool/**": true
  },
  // 在修改处上一行给注释：限制全局搜索
  "search.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/.next": true,
    "**/dist": true,
    "**/.turbo": true,
    "**/build": true,
    "**/.dart_tool": true
  },
  // 在修改处上一行给注释：减轻 TS 索引
  "typescript.tsserver.experimental.enableProjectDiagnostics": false
}
```

### 3）`.cursorignore`（在你已配置基础上的推荐完整版）

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
dist-ssr/
build/
out/
.next/

# Cache directories
.cache/
.temp/
.tmp/
.turbo/
.pnpm-store/
npm-cache/

# Test coverage
coverage/
.nyc_output/

# Logs
logs/
*.log
yarn-error.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Generated files
components.d.ts
auto-imports.d.ts
*.tsbuildinfo

# LLM / Embeddings（如 Cursor 生成）
.vector_cache/
.embeddings/
.repo-map/

# Assets（如很大）
# public/pdfpreview/
dist.zip
*.zip
*.7z

# Docs build
docs/.vitepress/dist/
docs/.vitepress/cache/
```

### 4）SSD 维护（CMD 管理员）

```cmd
fsutil behavior query DisableDeleteNotify
defrag C: /L
wmic diskdrive get status
```

---

## 七、结语

上述流程兼顾**快速止损**与**长期稳态**：先找元凶、再“减扫描 + 减监听”，最后做 SSD 维护。按文中顺序执行后，Cursor 引起的卡顿通常能显著缓解或彻底消失。若你有特殊路径仍在高频读写，把那条路径贴出来，我再帮你做**精确化排除**。
