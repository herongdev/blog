---
title: "自研 SLTP 输入体系"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "求职准备"
description: "下面是把「自研 SLTP 输入体系」并入并重排过 Top 8 的完整简历分析定稿。直接复制即可。 一、项目总览 维度 量级 代码总量 约 32.2 万行 TS/Vue（不含 lock/资源） 文件数 656 .vue + 1890 .ts + 11 .tsx + 23 .js 组。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/简历设计/Max 亮点/自研 SLTP 输入体系.md"
---
::: v-pre

# 自研 SLTP 输入体系

> 本节目标：理解“自研 SLTP 输入体系”的核心思路，并能把它用于实际开发或面试表达。
下面是把「自研 SLTP 输入体系」并入并重排过 Top 8 的完整简历分析定稿。直接复制即可。

---

## 一、项目总览

| 维度 | 量级 |
| --- | --- |
| 代码总量 | 约 **32.2 万行** TS/Vue（不含 lock/资源） |
| 文件数 | **656 .vue + 1890 .ts + 11 .tsx + 23 .js** |
| 组件子目录 | **121 个**（GTC 自研业务/UI 组件库） |
| 业务页面（page.vue） | **91 个** |
| 弹窗（Modal） | **71 个**（统一 ModalManager 注册/异步加载） |
| 业务大模块 | **14 个**（trading / pamm / copy-trading / introducing-broker / settings / withdraw / deposit / transfer / fund-details / contract-management / dashboard / files / activities / notifications …） |
| API 领域 | **24 个** |
| Pinia Store | **24 个** |
| 国际化 | **18 个语言包**，单语言包 **29 个 i18n namespace**（含 RTL 阿拉伯/波斯及维/拉/菲/越/泰/印尼/印地等小语种） |
| 安全验证因子 | **5 类 verifier**（email / sms / app / webauthn-passkey / mainDeviceAuth） |
| Web Worker | **3 个独立 worker**（quoteWorker / openPositionWorker / marketCalendarWorker），共享单例 + 热更释放 |
| 关键依赖 | Vue 3.5 + Pinia + vue-i18n + ant-design-vue + TanStack vue-table & vue-virtual + KLineCharts Pro + decimal.js + xstate + axios + Vite 8 + Tailwind 4 + Oxc |

业务定位：**面向外汇/差价合约（CFD）经纪商的多业务一体化客户端**——行情/下单/持仓/PAMM 资管/跟单/IB 佣金/出入金/转账/KYC/MFA/合规一站式金融交易门户。

---

## 二、技术亮点（按工程深度排序）

### 【技术亮点 1】实时行情虚拟列表：Web Worker + rAF 批处理 + 增量提交
- **文件位置**：
- `src/views/(public)/trading/_components/symbol-list/useSymbolList.ts`
- `src/views/(public)/trading/_components/symbol-list/quoteWorker.ts`
- `src/views/(public)/trading/_components/symbol-list/useQuoteWorkerManage.ts`
- `src/components/h-virtual-table/HVirtualTable.tsx`
- **实现内容**：共享 Worker 单例维护 `rowMap + rows`，主线程按 50ms（~20fps）rAF 帧聚合 `sendQuoteBatch`；Worker 计算 `spread / 涨跌幅 / Trend / Flip / 排序`，emit 整帧快照；同 symbol 多次更新合并为最后一次写入；接 `@tanstack/vue-virtual` 行虚拟化 + 自研粘性列偏移 + `ResizeObserver` 自适应。视图侧用 `provide/inject` 重构父子状态，刷新只拉基础全量、关键词只在前端过滤。
- **技术栈**：Vue 3 Composition API、module Worker、rAF、`@tanstack/vue-virtual`、`@tanstack/vue-table`、Pinia
- **业务价值**：单页同时承载千级品种实时报价，**20fps 平滑刷新、滚动不掉帧、关键词本地过滤即时生效**
- **简历建议表述**：自研「Worker 排序 + 主线程 rAF 帧聚合 + 虚拟滚动」三层架构，构建可承载数千交易品种的实时行情列表，每秒数百条报价合并为 20fps 单帧增量提交，并以 `provide/inject` 重构状态共享，根除"刷新错位"和"清空关键词无法恢复"两类线上问题。

---

### 【技术亮点 2】自研止盈止损（SL/TP）输入体系 ⭐
- **文件位置**：
- `src/components/sltp-manager/SLTPManager.vue`
- `src/components/SLTP-field/SLTPField.vue`、`src/components/SLTP-field/index.ts`
- `src/views/(public)/trading/_composables/useRange.ts`
- `src/views/(public)/trading/_composables/usePLPreview.ts`
- `src/views/(public)/trading/_composables/useEntryPrice.ts` / `useBasePrice.ts`
- `src/views/(public)/trading/_utils/sltp.ts`
- **实现内容**：
- 把"基准价 / 入场价 / 取值范围 / 盈亏预览"拆为 4 个独立 composable，再以 `SLTPField`（字段级）+ `SLTPManager`（组级）两层组件做 UI 封装；
- 用 `direction = tradeDirection × exitType` 把 buy/sell × TP/SL 四象限折叠为 ±1，自动推导出"价格"与"点数"双轨 range（`min / max / step / precision / suggestValue`），按品种 `digits` 配齐精度，按券商 `stop_level` 配齐 min；
- 输入框双单位实时换算，但对外 `modelValue` 始终保持价格语义、单一权威；换算逻辑抽离为纯函数 `convertValueOnModeChange`，可独立单测；
- 输入时实时输出 4 口径预览：**点数 / 金额 + 币种 / 百分比 / 反向价位**，全程 Decimal.js 精算，避免外汇 5 位小数 × 合约规模 × lots 的浮点累积误差；
- 用 `LazyScope` 工厂模式延迟实例化 controller，仅在「开关开启 ∧ 有报价」时创建 range / PnL，关闭即停订阅；
- 自动联动业务规则：报价缺失或 ask/bid 为 0 时静默禁用、记忆 enabled、恢复后还原；切换品种/方向时清空旧值；
- **复用面**：交易面板市价区、限价区、已成交单改 SL/TP 弹窗、挂单改 SL/TP 弹窗共 **4 个入口** 共享一份控制器。
- **技术栈**：Vue 3 Composition API、`defineModel`、`MaybeRefOrGetter` / `toValue`、Decimal.js、Antd Vue、TypeScript
- **业务价值**：止盈止损是经纪商最容易出错且直接影响真金白银的一处。该体系把"业务规则 + 数值精度 + UI 形态 + 复用"沉淀为一组积木，新增 SL/TP 入口零改造。
- **简历建议表述**：自研基于 Composition API 的止盈止损输入体系——以「4 个 composable + 2 层组件」沉淀经纪商业务规则，覆盖基准价/入场价语义分离、buy/sell × TP/SL 四象限方向折叠、price↔point 双单位双向同步且 `modelValue` 唯一权威、Decimal.js 精算的实时 4 口径盈亏预览、按报价有效性自动启停与状态记忆；同一套控制器复用于交易面板（市价 / 限价）与持仓 / 挂单改单弹窗 4 个入口，止盈止损相关线上故障显著下降。

---

### 【技术亮点 3】交易 WebSocket 客户端：指数退避 + 心跳 + 单飞鉴权 + 模块订阅池
- **文件位置**：`src/services/WebSocketClient.ts`、`src/store/socket/{socket,useSocketSubscription}.ts`、`src/composables/useTradeWs.ts`
- **实现内容**：30s 心跳；指数退避 base × 2^n（最大 30s，20% 抖动）；最多 10 次重连；事件分发器解耦 open/message/error/close。业务层 `pendingRequests` 实现基于 seq 的 cmd-response RPC（带 timeout/reject-all），`auth:ok` 自动恢复订阅；`ensureSocketAuth` 用 `loginInFlight` Promise 做单飞鉴权 + 1.5s 节流。订阅池用 `Map\<moduleKey, Set\<symbol\>\>` 维护各模块订阅意图，`scheduleSync` 在 rAF 里合并差异统一下发，组件卸载/切账号自动清理；`flushAll` 把行情 diff / 订单事件 / 资金面板三类异步消息一帧合流。
- **业务价值**：弱网/断线/切账号都能秒级自愈、不重复登录、不重复订阅；多面板共享单连接，带宽不随业务模块线性增长。
- **简历建议表述**：从零设计带心跳/指数退避/单飞鉴权的交易 WebSocket 客户端，封装基于 seq 的 cmd-response RPC，并以「模块订阅池 + rAF 合流」抽象多面板共享一条长连接，弱网下连接自愈与订阅恢复时间从 N 秒级降至亚秒级。

---

### 【技术亮点 4】K 线图表自定义 Datafeed：历史回填 + 实时 tick 合 bar + 缺口补历史 + 多周期对齐
- **文件位置**：`src/components/klinechart-pro/{CustomDatafeed,KlineChartPro}.{ts,tsx}`、`src/components/m-kline-chart/`
- **实现内容**：自实现 `Datafeed` 接口对接 `/api/kchart/chart`；监听 `quoteTick` 用 `getPeriodStart` 把 tick 落到对应 bar，同 bar 更新 H/L/C 与 volume，新周期开 bar，过去 tick 屏蔽；`(ts + bid + ask)` 三元组去重避免 volume 累加；`gapBars \> 1` 自动补 500 根历史，`isFillingGap + gapRetryAfter` 防重；周 K 用 4 天偏移对齐周一开盘；按 `serverOffsetSeconds` 还原 UTC，避开 GMT+2/+3 server time 错位；`syncKlineLocales` 与全站 i18n 联动。移动端单独 14+ 自研画图扩展（斐波那契/ABCD/XABCD/Gann/波浪/箭头等）。
- **业务价值**：行情图在切品种/周期/分辨率/网络抖动场景下秒内回填、零毛刺、无重复 K，对外汇 7×24 行情至关重要。
- **简历建议表述**：基于 KLineChartsPro 自研 CustomDatafeed，融合历史拉取、实时 tick 合 bar、跨周期对齐、缺口补历史与服务器时区还原五条流水，攻克外汇行情中"跨周补 K、并发 tick 重入、跨经纪商时差"等典型问题。

---

### 【技术亮点 5】金融级 MFA 安全编排器：可注册 verifier + 流程状态机 + Policy 拦截
- **文件位置**：`src/services/security/orchestrator.ts`、`verifiers/{email,sms,app,webauthn,mainDeviceAuth}.ts`、`flow/`、`verifierComponents/`
- **实现内容**：注册器加载所有 verifier，`runSecurityFlow` 据后端 `steps` 动态驱动；`policy.ts` 校验必选/可选 verifier，违反则弹 `RemoteLoginWarningModal` 终止流程。循环式 FSM：`while(true) { chooseMethod -\> doBegin -\> isPassed? -\> openStepsDialog -\> ... }`，支持 `switchMethod` / `onRestartFlow`，`mfaCleanFn` 退出时自动清理临时头。与 HTTP 层「作用域临时头」协同实现敏感动作（出金/改邮箱/远程登录/新设备）零侵入接入 step-up auth。
- **业务价值**：金融级多因子身份验证统一框架，新增验证方式只需写一个 verifier 模块。
- **简历建议表述**：从零设计统一 MFA 编排器，以注册器 + 循环 FSM 串联 5 类验证因子（email/sms/app/Passkey/主设备验证），与 HTTP 临时头协同实现 step-up 身份验证；新增验证方式从 0 到 1 接入约一日。

---

### 【技术亮点 6】独立 Web Worker 化的计算密集模块（持仓 / 行情 / 交易日历）
- **文件位置**：
- 行情：`src/views/(public)/trading/_components/symbol-list/quoteWorker.ts`
- 持仓：`src/views/(public)/trading/_components/order-tabs/workers/openPositionWorker.ts` 与 `composable/useOpenPostionWorker.ts`
- 交易日历：`src/store/marketCalendar/{marketCalendar,marketCalendarWorker}.ts`
- **实现内容**：
- **持仓 Worker**：维护 `unfoldRows / foldRows / totalStats / categoryStats / statsBySymbol` 五份索引，处理 `init-order / order-batch / quote-batch` 三类消息，dirty flag + `EMIT_INTERVAL=500ms` 节流，事件级精细化决定是否回拉挂单/平仓接口。
- **行情 Worker**：见亮点 1。
- **交易日历 Worker**：把 `sessions_trade`（按 weekday 分段，含午休）+ `tzBySymbol` + 节假日 Map（global + perSymbol）下沉到 Worker，单一 1s 心跳用 dayjs+tz 输出每个品种 isOpen / nextChangeTs / countdown，主线程零计算。`ensurePlaceholder` 立即占位避免首次切换闪"关闭中"，`updateSessions` 增量补品种。
- **业务价值**：高频行情 / 高频开平仓 / 全市场倒计时三种压力场景下主线程长任务清零，UI 始终丝滑。
- **简历建议表述**：在三个核心场景下把计算下沉到独立 Worker——行情排序与 diff、持仓与盈亏统计（500ms 节流 emit）、多时区交易日历（1s tick 输出 isOpen / nextChangeTs / countdown），主线程在数千品种 + 高频开平仓压力下保持 60fps 体验。

---

### 【技术亮点 7】HTTP 中台层：作用域临时头 + 全链取消 + 响应解析器链 + 401 回跳
- **文件位置**：`src/libs/http/{client,call,cancel,parsers,types}.ts`
- **实现内容**：自封装 axios 实例支持注册多个 `ResponseParser` 按链路解析；`makeCodeResponseParser` 抹平后端 `{ code, message, data }`。`useScopedHeaders / useOnceHeader` 实现作用域/单次临时头（MFA、第三方登录场景），命中后自动清除。`makeTrackedController` 把所有未决请求注册到全局取消池，登出/切账号一键 `cancelAll`；`useFetch` 实现 last-wins 防响应覆盖；统一 401 单点处理（清 token、`redirectToLogin`、`useReplace` 替换栈）。
- **业务价值**：所有页面共用一套鉴权/重试/取消/错误提示协议，新业务接入近乎零成本。
- **简历建议表述**：自研 HTTP 中台层，统一鉴权头注入、全局取消池、解析器链与 401 回跳；为 MFA、第三方登录等敏感场景设计「作用域临时头」，发起前后自动绑定/清理，杜绝 token 串味。

---

### 【技术亮点 8】品种规格分片缓存：单飞 + 优先级 + idle 预热 + 强引用 TTL
- **文件位置**：`src/store/symbolInfo/symbolInfo.ts`
- **实现内容**：MD5 串作 requestKey 做请求级单飞；symbol 级 `inflightBySymbol` 防同 symbol 并发；`CACHE_TTL` 控制本地缓存过期。`primeSymbolInfoCache` 先拉首屏可视 50 个 + 当前选中 tab，后续走 `requestIdleCallback`（含 setTimeout 兜底）按 `CHUNK_SIZE` 分片、并发度 2，不阻塞首屏；联动 `marketCalendarStore.updateSessions` 增量增补；账号切换自动清缓存。
- **简历建议表述**：自研品种规格的「请求级 + symbol 级双层单飞 + idle 分片 prime」缓存，使账号切换后首屏可视品种秒级展示，长尾品种空闲预热完成，避免后端被并发请求击穿。

---

### 【技术亮点 9】内容审核改写流程：编排器 + 二次校验 + 限流倒计时持久化
- **文件位置**：`src/services/content-review/{rewriteFlow,securityGuard,useRewriteConfirmDrawer}.ts`、`src/drawers/content-review/RewriteConfirmDrawer.vue`
- **实现内容**：`RewriteConfirmFlowOrchestrator` 类编排器统一 `pass / rate_limited / rewrite_required` 三分支；用户确认抽屉再次 `beforeConfirmReview` 防绕过。`usePersistentCountdown` 基于 sessionStorage 跨刷新恢复倒计时；应用于 PAMM / 跟单 / 信号源「名称 + 介绍」类自由文本场景。
- **简历建议表述**：抽象内容安全审核 + AI 改写编排器，串接「敏感词命中 → AI 改写建议 → 用户二次确认 → 限流冷却」全链路，并跨刷新持久化限流倒计时。

---

### 【技术亮点 10】统一 Modal/Drawer 管理器：注册式异步加载 + Promise 化 open
- **文件位置**：`src/store/{overlayManager,modalManager}/*.ts`、`src/components/modal-host/ModalHost.vue`
- **实现内容**：`modalStore.open('AddBankModal', { ...props, onSubmit })` 返回 Promise；70+ 业务弹窗统一在 `ModalHost` 渲染，全部 `defineAsyncComponent` + `preloadModal` 预加载，首屏不引入弹窗体积；与 NameNotMatch 跨页跳转、KYC step-up 等业务流配合，实现跨页跨弹窗的可中断/可恢复流程。
- **简历建议表述**：构建统一 Overlay 管理器，将 70+ 业务弹窗收敛为「按需异步注册 + Promise 化 open」原语，业务流程从回调地狱重写为线性 await，并支持跨页面/路由级流程恢复。

---

### 【技术亮点 11】路由守卫：开放重定向防护 + 第三方登录跨窗 + 三层权限
- **文件位置**：`src/router/{guards,routes}.ts`
- **实现内容**：`getSafeRedirect` 拦截 `http(s)://` 与协议相对外链防开放重定向；第三方登录（Google/Apple/微信）走 `BroadcastChannel('news')` 把 token 回传父窗、子窗自关；`accessGuard` 同时支持 `permissionsAnyOf / rolesAnyOf / featureFlagsAllOf / policy`（ABAC/ReBAC 风格 `auth.can({ action, resource })`）。
- **简历建议表述**：实现金融场景下安全可扩展的路由守卫体系，集成 redirect 安全校验、第三方登录跨窗回执、4 类元数据权限模型与策略校验。

---

### 【技术亮点 12】国际化体系：18 语言 + 命名空间分包 + 异步加载 + 图表 locale 同步
- **文件位置**：`src/locales/{loader.ts,index.ts,lang/\<locale\>/{global,settings,modals,...}.ts}`
- **实现内容**：18 语言（含 RTL 阿拉伯/波斯，及维吾尔/拉/菲/越/泰/印尼/印地等小语种），单语言 29 命名空间分包；按页面 `_locale/\<locale\>.ts` 局部覆盖；`syncKlineLocales` 异步注册图表语言包；`applyLanguage` 切语言时按需 import。
- **简历建议表述**：搭建覆盖 18 语言的 i18n 体系（含 RTL 与维/拉等小语种），按命名空间懒加载，并与图表/Antd 主题语言协同。

---

### 【技术亮点 13】金融业务横切风控：账户币种精度 / 姓名一致性 / 受限保留输入
- **文件位置**：
- `src/components/copy-trading/StartCopy.vue`、`src/views/(public)/pamm/components/Subscription.vue`
- `src/components/restriction-dialog/RestrictionDialog.vue` + `src/composables/useRestriction.ts`
- `src/composables/useMemberNameConcat.ts` + `src/modals/settings/{AddBankModal,AddWireBankModal}.vue`
- **实现内容**：
- 跨币种申购/跟单：扣款金额按**结算账户币种精度**（`walletPrecision` / `accountCurrencyPrecision`）而非信号币种精度（USC→USD 时强制 2 位小数），全程 Decimal.js；
- 银行/电汇姓名一致性：调用 `member_name_concat` 拿"按规则拼接姓名 + 是否命中规则"，**Add 模式自动填充为默认姓名，Edit 模式保留原值**；姓名拼接规则覆盖 4 顺序（FL/LF/LMF）× 4 分隔符（space/line/comma/none）；
- 出金姓名后端报错统一弹 `NameNotMatchModal`，确认后跳到 `(public).settings.home?tab=withdrawal-method`；
- `useRestriction` 拦截入金/出金/转账，命中风控时**保留表单数据、只禁用提交按钮**，避免清空表单激怒用户。
- **业务价值**：在金融/反洗钱合规要求下，最大限度减少用户失误重填，又不放过风控。

---

## 三、业务复杂度梳理

- **业务覆盖面**（14 大模块、91 页面、71 弹窗）：交易终端（多账户/多 MT 类型/SLTP/Trade Panel Overlay 与移动端 Page 双承接）、PAMM 资管（发布/审核/订阅/赎回 + 跨币种汇率折算）、3 种跟单模型（GTC / 平台内 / 平台外）、IB 经纪商（佣金 + 客户管理）、资金流转（多渠道入金/出金/转账/资金明细）、设置中心（邮箱/手机/2FA/Passkey/Authenticator/设备管理/IB 签名/出金方式/KYC）、合约管理 / 积分 / 活动 / 课程 / 工单 / 通知 / 仪表盘 Tour。
- **复杂业务规则与流程编排**：MFA Step-up（出金/改邮箱/远程登录/新设备登录强制 verifier policy）；内容审核改写（敏感词 → AI 改写 → 限流冷却，跨刷新可恢复）；跟单/PAMM 申购的多重 Decimal 校验与精度对齐；SL/TP 四象限规则；模块订阅池让 K 线/行情列表/Picker/PAMM 详情等 8+ 模块共享单连接 ws。
- **跨系统协同**：MT4 / MT5 / 服务器时区 / 经纪商 server_name 多套并存；前端按账户的 `mt_type / server_offset_seconds` 自适配。
- **多端适配**：组件按 `H-`（桌面）与 `M-`（移动端）双前缀分组，存在专门的移动端 Page Trade Panel 承接逻辑（`routeTradePanelViaPage`）。
- **多语言/多牌照**：18 语言 + RTL；姓名拼接规则、金额精度、合规弹窗等本地化业务差异均落到代码。

---

## 四、可量化指标（直接可写入简历）

| 维度 | 数值（可写简历的口径） |
| --- | --- |
| 工程规模 | **32+ 万行 TS/Vue 代码**、**91 个业务页面**、**70+ 业务弹窗**、**121 个组件子目录**、**24 个 API 领域**、**24 个 Pinia Store** |
| 国际化 | **18 种语言**（含 RTL），单语言 **29 命名空间** |
| 实时通信 | 单条 ws 多路复用（行情 + 订单 + 资金 + cmd-response RPC），心跳 30s、最大重连退避 30s、最多 10 次重连 |
| 行情吞吐 | 主线程 **20fps**（`FRAME_INTERVAL_MS=50ms`）帧聚合，单帧 diff 合并所有同 symbol 更新；列表千级品种 |
| K 线能力 | 9 周期（1m/5m/15m/30m/1h/4h/日/周/月/年），单次历史 500 根 + 缺口自动补；移动端 **14+ 自研画图扩展** |
| SLTP 体系 | 4 个 composable + 2 层组件，buy/sell × TP/SL 四象限自动方向折叠，price↔point 双单位双向同步，4 口径实时盈亏预览，**4 个业务入口共用一份控制器** |
| 安全能力 | **5 类 MFA verifier**，HTTP 全链取消、作用域/单次临时头、统一 401 回跳 |
| 合规能力 | 内容审核 + AI 改写 + 跨刷新限流倒计时；姓名拼接 4 顺序 × 4 分隔符；账户风控保留输入策略 |
| 多端 | 桌面 + 移动端双形态，M-* / H-* 组件双线，单代码库复用 |

---

## 五、最终：8 条最适合放进简历的核心亮点（按重要性）

1. **【实时行情列表 — Worker + rAF + 虚拟化】**
主导设计交易终端核心行情列表：自研 Quote Worker 承担排序与价差计算，主线程按 20fps rAF 帧聚合提交 diff，配合 `@tanstack/vue-virtual` 实现千级品种滚动 0 卡顿；并通过 `provide/inject` 重构父子刷新协同，根除"刷新错位、清空关键词不复原"等线上问题。

2. **【自研止盈止损（SL/TP）输入体系】** ⭐
以「4 个 composable + 2 层组件」沉淀经纪商 SL/TP 业务规则：基准价/入场价语义分离、buy/sell × TP/SL 四象限方向折叠、price↔point 双单位双向同步且 `modelValue` 唯一权威、Decimal.js 精算的实时 4 口径盈亏预览、按报价有效性自动启停与状态记忆；同一套控制器复用于交易面板（市价/限价）与持仓/挂单改单弹窗 4 个入口，新增 SL/TP 入口零改造。

3. **【交易 WebSocket 全链路】**
从零设计交易 WebSocket 客户端（指数退避重连、心跳、抖动）+ 业务层 Pinia store（基于 seq 的 cmd-response RPC、单飞鉴权、auth:ok 自动恢复订阅）+ 模块订阅池（rAF 合流的 sub/unsub），让多个面板共享单条长连接，弱网下连接自愈与订阅恢复时间从 N 秒级降至亚秒级。

4. **【K 线自定义 Datafeed】**
基于 KLineChartsPro 实现自定义 Datafeed：历史拉取 + 实时 tick 合 bar + 缺口自动补历史 + 服务器时区还原 + 周 K 偏移对齐；通过 `(ts+bid+ask)` 三元组去重 + `isFillingGap` 并发锁，攻克外汇行情中"跨周补 K、并发 tick 重入、跨经纪商时差"三类典型疑难。

5. **【金融级 MFA 编排框架】**
设计统一身份验证编排器：注册器加载 5 类 verifier（email/sms/app/Passkey/主设备验证），用循环 FSM 驱动 begin → 选择方式 → step-up → policy 校验 → submit；与 HTTP 层「作用域临时头」协同，敏感动作（出金/改邮箱/远程登录/新设备）零侵入接入 step-up auth。

6. **【独立 Web Worker 化的计算密集模块】**
在三个核心场景把计算下沉到 Worker——行情排序与 diff（quoteWorker）、持仓与盈亏统计（openPositionWorker，500ms 节流 emit）、多时区交易日历倒计时（marketCalendarWorker，1s tick），主线程长任务清零，UI 在高频行情 / 高频开平仓 / 全市场倒计时三种压力场景下保持 60fps 体验。

7. **【HTTP 中台层】**
自研 axios 中台：解析器链（统一抹平后端 code 协议）、全链 AbortController 取消池、`useScopedHeaders / useOnceHeader` 临时头机制、并发请求 last-wins 防覆盖、统一 401 回跳；为 MFA、第三方登录、内容审核等多场景提供原子化基础设施。

8. **【18 语言金融门户的 i18n + 跨流程编排 + 业务规则落地】**
构建覆盖 18 语言（含 RTL）、29 个命名空间懒加载的 i18n 体系；以 ModalManager（70+ 弹窗 Promise 化 open）+ 内容审核改写编排器 + persist 限流倒计时为基础原语，将 PAMM / 跟单 / 出金等跨页跨弹窗业务流改写为线性 `await`；同时落地账户币种精度（USD/USC/JPY 差异下按结算账户精度计算）、姓名拼接规则（FL/LF/LMF × space/line/comma/none）、风控保留表单等金融业务细节。

---

\> **使用建议**：
\> - 1～4 当作"技术深度题"重点写，对应面试 deep-dive；
\> - 5～7 作为"工程基建"，体现架构思维；
\> - 8 作为"业务深度"，证明你不是只懂技术。
\> - 每条精简到 2 行，且都带量化（fps / verifier 数 / 语言数 / 入口数 / 周期数 / 弹窗数等），与代码点一一对应。
\> - **第 2 条 SL/TP** 是金融经纪商面试官最爱听的"懂业务"信号，强烈建议在简历高位呈现，并在面试时准备好这几个 follow-up：Decimal 精度问题 / stop level 跨券商差异 / 四象限为什么用乘法折叠 / `modelValue` 为什么选价格语义。

需要我接着把 1~8 这八条按 STAR 结构落成中文/英文项目段落（带 1~2 个面试 deep-dive 题准备稿）吗？

:::
