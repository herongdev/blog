---
title: App 审核慢于后端发布时，如何做版本兼容治理
date: 2026-04-19 10:00:00
tags:
  - 架构设计
  - 接口设计
  - 版本治理
  - App发布
  - 后端
categories:
  - 后端架构
  - 工程实践
---

## 一、问题背景

很多团队都会遇到同一个问题：

- Web 已经发了新版
- 后端也已经上了新版
- 但 App 还在审核，线上仍然有大量旧版客户端
- 旧版 App 请求到了新版后端，结果因为接口字段、状态枚举、参数要求变化而报错

这个问题本质上不是“App 审核慢”，而是**客户端生效速度慢于服务端发布速度**。
Apple 官方本身就支持 phased release，说明移动端天然会长期同时存在多个版本；而且即使开启分阶段发布，用户仍然可以手动下载最新版，所以线上一直会并存新老版本客户端。([Apple Developer][1])

---

## 二、整体实现思路

真正稳妥的方案，不是只喊一句“后端向前兼容”，而是把下面四件事一起做：

1. **接口默认只做兼容式演进**
2. **客户端显式上报版本和能力**
3. **新功能用开关灰度，而不是和发版强绑定**
4. **破坏性变更走 API 版本化和弃用周期**

这类思路和大厂公开的 API 治理方式是一致的：
Stripe 明确区分 major release 和月度 release，并说明月度发布只包含 backward-compatible changes；Google AIP 也把稳定 API 中原地做 breaking change 视为非常严肃的事情；Microsoft Graph 对 breaking change 和版本支持也有明确策略。([Stripe Docs][2])

---

## 三、先定规则：什么改动允许，什么改动不允许

这一层最重要，因为后面所有开关、灰度、版本控制，都是建立在“接口改动有纪律”之上的。

### 1）日常迭代允许的改动

这类改动通常是兼容式的：

- 新增接口
- 老接口新增**可选参数**
- 老接口响应新增字段
- 新增业务状态，但旧端有兜底逻辑
- 新功能默认关闭，先不对旧端生效

Stripe 官方文档明确表示，月度发布只做 backward-compatible changes，可以安全升级；这类思路本质上就是“尽量只做追加，不做破坏”。([Stripe Docs][2])

### 2）日常迭代不要做的改动

这类改动最容易把旧 App 打崩：

- 删除字段
- 字段改名
- 字段类型变化
- 把可选参数改成必填参数
- 改变原有字段语义
- 删除旧接口
- 让旧客户端必须传新 header / 新参数
- 返回旧客户端完全不认识且没有兜底处理的新状态

Google AIP 对稳定 API 的态度非常明确：在稳定 API 中原地做 breaking change 是极端手段；Microsoft Graph 也把 breaking change 单独纳入版本与支持策略中。([Google AIP][3])

---

## 四、不要只传版本号，要传“能力集”

很多团队现在只会让客户端上报：

- `appVersion`
- `platform`

这还不够。

更稳的做法是让每次请求都带上这几类信息：

- 平台：iOS / Android / Web
- App 版本号
- Build 号
- API 版本
- 能力集 capabilities

原因很简单：

你真正关心的，不是“它是不是 3.8.1”，而是：

- 这个客户端**会不会解析新字段**
- 这个客户端**认不认识新状态**
- 这个客户端**有没有接新流程**
- 这个客户端**是否支持某个新能力**

所以后端最好按“能力”判断，而不是只按版本号判断。

### 推荐请求头

```http
X-Client-Platform: ios
X-App-Version: 3.8.1
X-Build-Number: 20260419
X-Api-Version: v1
X-Capabilities: order_cancel_v2,payment_token_v3,profile_schema_v2
```

### 为什么能力比版本号更稳

因为同一个版本号，实际线上也可能出现不一致：

- iOS 审核包和 Android 热修包不同
- 部分用户已经灰度启用新功能
- 某个渠道包补过一个小修复
- Web 和 App 共用后端，但能力集并不一致

所以最稳妥的判断方式是：

```ts
if (capabilities.includes("order_cancel_v2")) {
  // 走新逻辑
} else {
  // 走兼容旧客户端的逻辑
}
```

---

## 五、新功能不要和发版绑死，要挂 Feature Flag

这是移动端治理里最关键的一层。

即使后端先上线了，也不要让“后端上线 = 新逻辑立刻对所有用户生效”。
正确做法是：**后端先支持新旧两套路径，新功能默认关闭，等 App 审核通过后再逐步打开。**

Firebase Remote Config 官方文档明确支持把参数当作 feature flags 使用，并支持逐步 rollout 到特定用户组，同时结合 Crashlytics 和 Analytics 观察发布效果。([Firebase][4])

### 开关建议至少支持这些维度

- 按平台开：只开 iOS，不开 Android
- 按版本开：只给 `>= 3.8.0`
- 按能力开：只给支持 `profile_schema_v2` 的客户端
- 按用户比例开：1%、5%、20%、100%
- 按用户白名单开：测试账号、内部账号
- 按地区 / 渠道开：需要时使用

---

## 六、发布流程改成“两阶段”，而不是“一次性上线”

这一步特别重要。

### 阶段 A：先上兼容后端

这一版后端要满足：

- 旧 App 调用时不报错
- 新 App 调用时能拿到新能力
- 新开关默认关闭
- 数据库先扩字段，不删旧字段
- 服务端允许新旧 DTO / VO 并存

### 阶段 B：等 App 生效后，再开启新能力

等审核通过、灰度包覆盖率上来后，再逐步启用：

- 先给测试用户
- 再给 1%
- 再给 5%
- 再给 20%
- 最后全量

Apple 的 phased release 文档明确给出了 7 天放量节奏：1%、2%、5%、10%、20%、50%、100%，而且可以暂停后继续。([Apple Developer][1])

所以你们要建立一个基本认知：

**客户端上线不是一个点，而是一段时间。**
因此后端兼容期也必须覆盖这一段时间，而不是“后端今天发了，明天就删旧逻辑”。

---

## 七、真遇到破坏性变更时，不要偷偷改老接口，直接升 API 版本

有些需求本身就不适合兼容：

- 返回结构必须重做
- 核心字段语义必须改变
- 老流程必须下线
- 老客户端根本无法理解新协议

这时候不要继续强行改 `/api/v1/...`，而应该：

- 保留 `/api/v1/...`
- 新增 `/api/v2/...`

或者通过请求头区分 API 版本。

Google AIP-185 专门规定了 Google API 的版本策略；Stripe 也明确区分 major release 和兼容式月度发布；Microsoft Graph 也有独立的版本支持和 breaking change 策略。([Google AIP][5])

### 一个简单判断标准

#### 不升版本，继续兼容

适用于：

- 新增字段
- 新增可选参数
- 新增非破坏性接口
- 新逻辑可以按开关控制

#### 升版本

适用于：

- 删除字段
- 字段改名
- 字段类型变化
- 响应结构重做
- 参数规则发生不兼容变化
- 旧端无法继续正确解析

---

## 八、最低支持版本和强制升级，只在少数场景用

很多团队一遇到兼容问题，就想“那就强制升级”。

这个手段能用，但不要滥用。

### 适合强制升级的场景

- 安全漏洞
- 合规风险
- 资金结算风险
- 旧协议会导致严重数据错误
- 某些核心能力必须整体升级才能保证业务正确性

### 不适合强制升级的场景

- 普通功能调整
- 页面样式变化
- 一个字段结构优化
- 新功能刚上线想偷懒不做兼容

也就是说，**强制升级是兜底方案，不是日常方案**。

---

## 九、观测一定要按“客户端版本”分桶

没有观测，兼容治理最后一定会失效。

至少要统计这些：

- 接口错误率：按 `platform + appVersion + buildNumber`
- 新旧接口调用量占比
- 某个 capability 的覆盖率
- 新状态 / 新字段触发后的错误率
- Crash 率按客户端版本分布
- 某个老版本的活跃用户量

Firebase 的 rollout 文档本身就强调：要结合 Crashlytics 和 Analytics 来衡量 rollout 的稳定性和成功情况。([Firebase][4])

只有拿到这些数据，你们才敢回答下面这些问题：

- 旧兼容逻辑什么时候能删？
- 某个版本是不是还在线上大量活跃？
- 某次异常是不是只出现在旧 App？
- 新开关是否可以从 5% 放到 20%？

---

## 十、推荐的服务端架构：加一层 BFF 或网关适配

如果你们现在是：

- Web 直接调业务后端
- App 直接调业务后端
- 页面字段和后端结构强耦合

那后面兼容成本会越来越高。

更稳的方式是：

- App / Web → BFF / API Gateway
- BFF / Gateway → 内部业务服务

BFF 层专门负责：

- 读取客户端版本 / 能力
- 新旧字段映射
- 旧端返回旧结构
- 新端返回新结构
- feature flag 决策
- 降级与兜底

这样内部服务可以更专注于业务，客户端兼容策略集中在边界层处理。

---

## 十一、分步落地方案

下面给你一个适合多数团队的落地步骤。

### 第一步：定义接口兼容红线

先把团队规范写清楚：

- 允许：新增接口、新增可选字段、新增可选参数
- 禁止：删字段、改名、改类型、改必填、改语义

这一步没有做，后面都会乱。

### 第二步：统一客户端请求元数据

网关层统一解析：

- platform
- appVersion
- buildNumber
- apiVersion
- capabilities

然后挂到统一的 `ClientContext` 上，后端各业务服务统一使用，不要每个接口手写一套版本判断。

### 第三步：所有新功能必须挂开关

凡是 App 相关需求，默认都要支持：

- 关闭
- 指定版本开启
- 按能力开启
- 按比例灰度

### 第四步：改发布流程

以后涉及 App 的需求，固定流程改成：

1. 后端先上兼容版本
2. 开关默认关闭
3. App 提审
4. 审核通过后灰度启用
5. 观察监控
6. 放量
7. 老逻辑进入弃用期
8. 覆盖率足够后再删除

### 第五步：建立弃用周期

不要“新版本一上，老逻辑立刻删”。
应该有一个明确的弃用窗口，例如：

- 发布公告日期
- 新客户端最低覆盖率目标
- 旧接口停止写入时间
- 旧接口彻底下线时间

---

## 十二、最简代码示例

下面只给最小必要示例，方便你们先把机制搭起来。

### 1）客户端请求头

```ts
// 请求时统一带上客户端元数据
const headers = {
  "X-Client-Platform": "ios",
  "X-App-Version": "3.8.1",
  "X-Build-Number": "20260419",
  "X-Api-Version": "v1",
  "X-Capabilities": ["order_cancel_v2", "profile_schema_v2"].join(","),
};
```

### 2）服务端解析 ClientContext

```ts
export interface ClientContext {
  platform: "ios" | "android" | "web" | "unknown";
  appVersion: string;
  buildNumber: string;
  apiVersion: string;
  capabilities: string[];
}

export function parseClientContext(
  headers: Record<string, string | string[] | undefined>,
): ClientContext {
  const capabilityHeader = headers["x-capabilities"];
  const capabilityValue = Array.isArray(capabilityHeader)
    ? capabilityHeader[0]
    : capabilityHeader;

  return {
    platform: normalizePlatform(headers["x-client-platform"]),
    appVersion: getSingleHeader(headers["x-app-version"]),
    buildNumber: getSingleHeader(headers["x-build-number"]),
    apiVersion: getSingleHeader(headers["x-api-version"]) || "v1",
    capabilities: capabilityValue
      ? capabilityValue
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
  };
}

function getSingleHeader(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

function normalizePlatform(
  value: string | string[] | undefined,
): ClientContext["platform"] {
  const platform = getSingleHeader(value).toLowerCase();

  if (platform === "ios") return "ios";
  if (platform === "android") return "android";
  if (platform === "web") return "web";
  return "unknown";
}
```

### 3）服务端不要直接按版本号硬切，优先按能力判断

```ts
export function supportsCapability(
  clientContext: ClientContext,
  capability: string,
): boolean {
  return clientContext.capabilities.includes(capability);
}
```

```ts
// 这里先判断 capability，再决定返回新旧结构，避免旧 App 直接拿到无法解析的数据
export function buildProfileResponse(
  clientContext: ClientContext,
  user: { id: string; nickname: string; avatar: string },
) {
  if (supportsCapability(clientContext, "profile_schema_v2")) {
    return {
      userId: user.id,
      profile: {
        nickname: user.nickname,
        avatar: user.avatar,
      },
    };
  }

  return {
    id: user.id,
    nickname: user.nickname,
    avatar: user.avatar,
  };
}
```

### 4）Feature Flag 决策示例

```ts
export interface FeatureFlagRule {
  featureKey: string;
  enabledPlatforms: string[];
  minAppVersionByPlatform: Record<string, string>;
  requiredCapability?: string;
}

export function isFeatureEnabled(
  clientContext: ClientContext,
  rule: FeatureFlagRule,
): boolean {
  if (!rule.enabledPlatforms.includes(clientContext.platform)) {
    return false;
  }

  const minVersion = rule.minAppVersionByPlatform[clientContext.platform];
  if (minVersion && compareVersion(clientContext.appVersion, minVersion) < 0) {
    return false;
  }

  // 这里额外叠加 capability 判断，避免某些渠道包版本号满足但实际能力未接入
  if (
    rule.requiredCapability &&
    !supportsCapability(clientContext, rule.requiredCapability)
  ) {
    return false;
  }

  return true;
}
```

```ts
export function compareVersion(current: string, target: string): number {
  const currentParts = current.split(".").map(Number);
  const targetParts = target.split(".").map(Number);
  const maxLength = Math.max(currentParts.length, targetParts.length);

  for (let index = 0; index < maxLength; index += 1) {
    const currentValue = currentParts[index] || 0;
    const targetValue = targetParts[index] || 0;

    if (currentValue > targetValue) return 1;
    if (currentValue < targetValue) return -1;
  }

  return 0;
}
```

### 5）控制器里使用

```ts
// 这里把客户端上下文放在入口层统一解析，业务层只消费标准化后的 ClientContext
const clientContext = parseClientContext(req.headers);

const profileFeatureRule = {
  featureKey: "profile_v2",
  enabledPlatforms: ["ios", "android"],
  minAppVersionByPlatform: {
    ios: "3.8.0",
    android: "3.8.0",
  },
  requiredCapability: "profile_schema_v2",
};

if (isFeatureEnabled(clientContext, profileFeatureRule)) {
  return buildProfileResponse(clientContext, user);
}

return buildProfileResponse(
  {
    ...clientContext,
    capabilities: [],
  },
  user,
);
```

---

## 十三、一个最容易执行的团队规范模板

你们可以直接把下面这几条定成规范。

### 接口规范

- 普通迭代只允许 additive change
- 破坏性变更必须升 `v2`
- 不允许在 `v1` 原地做不兼容修改

### 客户端规范

- 所有请求必须上报 `platform / appVersion / buildNumber / apiVersion / capabilities`
- 新功能接入后必须登记 capability 名称
- 旧版本必须对未知字段、未知枚举做兜底

### 发布规范

- 先发兼容后端
- 再发客户端
- 审核通过后开灰度
- 监控通过后再全量
- 旧逻辑不得在客户端全量前删除

### 运维规范

- 错误率必须按客户端版本分桶
- 开关必须支持快速关闭
- 旧接口下线前必须看活跃覆盖率

---

## 十四、结论

如果只让我给一句最核心的建议，那就是：

**把旧客户端当成长期存在的真实依赖，而不是一个“过两天就没人用了”的临时问题。**

一旦按这个前提设计，你们的方案自然就会变成：

- 默认兼容式演进
- 客户端上报能力
- 新功能先挂开关
- 发布分两阶段
- 破坏性变更走版本化
- 下线旧逻辑依赖真实覆盖率数据

这套方式，既适合你们现在的 Web + 后端 + App 并行迭代，也和公开的大厂 API 治理、移动端灰度发布思路一致。([Stripe Docs][2])

---

## 参考资料

- Stripe API Versioning：月度发布保持 backward-compatible，major release 才承载不兼容变更。([Stripe Docs][2])
- Microsoft Graph Versioning and Support：对 breaking changes 和版本支持有明确策略。([Microsoft Learn][6])
- Google AIP-185 / AIP-181：规定 API versioning 策略，并强调稳定 API 中原地做 breaking change 应极其谨慎。([Google AIP][5])
- Firebase Remote Config Rollouts：支持按参数作为 feature flags 进行渐进发布，并结合 Crashlytics / Analytics 观察效果。([Firebase][4])
- Apple Phased Release：7 天分阶段放量，且用户仍可手动更新。([Apple Developer][1])

你要是愿意，我下一条可以继续直接给你一篇 **“适合 NestJS 项目的版本兼容治理落地方案”**，我会按同样的 Hexo 格式写，并且把中间件、`ClientContext`、Feature Flag、接口版本目录结构都补出来。

[1]: https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases/?utm_source=chatgpt.com "Release a version update in phases - Update your app"
[2]: https://docs.stripe.com/api/versioning?utm_source=chatgpt.com "Versioning | Stripe API Reference"
[3]: https://google.aip.dev/181?utm_source=chatgpt.com "AIP-181: Stability levels"
[4]: https://firebase.google.com/docs/remote-config/rollouts?utm_source=chatgpt.com "Remote Config rollouts - Firebase"
[5]: https://google.aip.dev/185?utm_source=chatgpt.com "AIP-185: API Versioning"
[6]: https://learn.microsoft.com/en-us/graph/versioning-and-support?utm_source=chatgpt.com "Versioning, support, and breaking change policies for ..."
