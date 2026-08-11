---
title: "Sentry 是什么"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "Sentry 是什么 Sentry 是一个 开源（BSL 1.1 许可） 的实时错误跟踪与性能监控平台，帮助开发者在生产环境中快速定位并修复崩溃、慢请求等问题，同时提供对应用端到端性能的可观测性。官方 SaaS 部署在 sentry.io，也可自建（Docker‑Compose。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/安全/Sentry 是什么.md"
---
::: v-pre

# Sentry 是什么

> 本节目标：理解“Sentry 是什么”的核心思路，并能把它用于实际开发或面试表达。
**Sentry 是什么**
Sentry 是一个 **开源（BSL 1.1 许可）** 的实时错误跟踪与性能监控平台，帮助开发者在生产环境中快速定位并修复崩溃、慢请求等问题，同时提供对应用端到端性能的可观测性。官方 SaaS 部署在 sentry.io，也可自建（Docker‑Compose / Kubernetes）实例。citeturn7view0

**核心功能一览**

|   |   |   |
|---|---|---|
|**功能**|**说明**|**适用语言/框架**|
|**Issue Tracking**|自动去重、按异常类型聚类，展示完整 stack trace、breadcrumbs 与用户设备信息|见下方官方 SDK 列表|
|**Alerts & Notification**|阈值或规则触发的邮件 / Slack / PagerDuty 等告警|全栈|
|**Performance Monitoring (APM)**|追踪事务 (transactions) 和跨度 (spans)，可视化慢查询、N+1、外部调用瓶颈|JS / Python / Java / Go 等|
|**Profiling**|采样 CPU/内存火焰图，找出热函数|Python、Node、Java 等|
|**Release Health & Code Mapping**|版本发布跟踪、自动关联 suspect commit / PR|GitHub、GitLab 等|
|**Session Replay**|回放用户会话（点击、网络、Console、Canvas 等），定位“看得见却复现不了”的问题；现已支持 Web＋移动端 React‑Native/Android/iOS|Web SDK ≥ 7.59；移动端 Open Betaciteturn9search0turn9search2|

**官方 SDK 覆盖**

- **前端**：JavaScript（含 Vue / React / Angular）、Electron、React‑Native
- **后端**：Python、Django、Flask，Node/Express，Java/Kotlin，Go，Rust，PHP/Laravel…共 20 + 官方 SDK，可满足绝大多数技术栈citeturn7view0

**与前端（Vue / Next.js）集成示例**
pnpm add @sentry/vue @sentry/tracing # Vue 3
// main.ts 或 entry.client.tsimport * as Sentry from "@sentry/vue";import \{ BrowserTracing \} from "@sentry/tracing";
Sentry.init(\{ app, dsn: "[https://\<key\>@sentry.io/\<project\>](https://<key>@sentry.io/<project>)", integrations: [new BrowserTracing()], tracesSampleRate: 0.2, // APM 采样率 replaysSessionSampleRate: 0.1, // Replay 采样率 replaysOnErrorSampleRate: 1.0 // 出错时必录\});
Next.js 14（App Router）可使用 @sentry/nextjs，同时在 middleware.ts 添加 Sentry.wrapApiHandler* / wrapServerComponent* 以捕获服务端异常。

**自建 vs SaaS**

|   |   |   |
|---|---|---|
|**方案**|**亮点**|**注意事项**|
|**SaaS** (sentry.io)|5 分钟开箱、托管升级、内置多云存储|免费额度(5k events/月)，超量计费|
|**Self****‑****Hosted**|数据完全自持、无限事件量|需要 Postgres + ClickHouse + Kafka（Docker Compose 一键部署）；升级需跟随官方 release 节奏|

最新版 25.4.0（2025‑04‑15）中改进了 Java 自动代码映射、Issue 列表滚动表现等细节citeturn1view0。

**适合你的场景？**

- **多端产品**：前后端一个平台统一可观测，省去分散日志方案
- **快速迭代**：实时发现致命错误，配合 Git commit 自动定位责任代码
- **性能敏感**：APM + Profiling 找到慢事务和 CPU 热点
- **用户体验**：Session Replay 让“客服无法复现”的问题只需点开录像

如果你正维护 Vue / Next.js 项目，Sentry 几乎是部署成本最低、社区最活跃的一站式监控方案之一。
 \> 来自 \<[https://chatgpt.com/c/680773ed-ddf4-8004-a547-5f2b201cc436](https://chatgpt.com/c/680773ed-ddf4-8004-a547-5f2b201cc436)\>

:::
