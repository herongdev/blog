---
title: Vite+Vue3 无损引入“二次验证/Step-Up Authentication”的最佳实践
date: 2025-09-13
tags:
---

## 为什么是“Step-Up”，而不是到处塞 MFA 弹窗？

“Step-Up Authentication（按需提升认证强度）”的核心思想：**只有在访问敏感资源或执行高风险操作时才触发更强认证**，其余场景保持无感体验。业界标准把这种“按需抬升”的需求讲得很清楚：

- OAuth 2.0 的 _Step-up Authentication Challenge Protocol（RFC 9470）_ 定义了**资源服务**如何向**客户端**发出“当前令牌强度/新鲜度不够，请抬升”的挑战机制。([IETF Datatracker][1])
- OpenID Connect 通过 `acr_values`（要求的认证保证级别）与 `max_age`（认证新鲜度）实现**按需重认证**。([openid.net][2])
- OWASP 与 NIST 建议：对**修改敏感设置、支付、提权**等操作启用额外验证，并优先使用抗钓鱼要素（如 WebAuthn/Passkeys）。([OWASP Cheat Sheet Series][3])
- FIDO 联盟给出了 _Passkeys_ 的落地与 UX 指南，强调**抗钓鱼、设备/生态无缝**。([FIDO Alliance][4])

> 结论：把“二次验证”作为**策略驱动**的“中间步骤”，由后端决定是否挑战、挑战什么；前端只负责**编排**与**体验**。

---

## 总体架构（前后端协同）

### 1) 后端：策略与挑战（Policy → Challenge）

- 后端根据**操作类型、用户风险、上下文**（IP/设备/金额/频率等）判定是否需要 Step-Up，返回**挑战描述**（类型、可选要素、过期时间、绑定的 actionId/nonce）。参考 RFC 9470 的思路，也可在 API 返回 `WWW-Authenticate`/业务错误码 `step_up_required`。([IETF Datatracker][1])
- 支持 OIDC 生态时，结合 `acr_values`/`max_age` 做**会话新鲜度**控制。([openid.net][2])
- **强绑定**：挑战签发应与**具体操作**与**参数摘要**绑定，服务端校验防重放。

### 2) 前端：编排与无侵入集成（Orchestrator）

- \*\*Orchestrator（编排器）\*\*接收挑战，**按策略动态加载对应验证器插件**（SMS/Email/TOTP/WebAuthn…），验证成功产出 `verificationToken` 或“短期抬升态”。
- **请求拦截与重放**：当 API 返回“需要 Step-Up”，拦截器暂停原请求 → 触发编排 → 携带验证结果**自动重试**，对各业务**零侵入**。
- **TTL（新鲜度）**：在前端维护**短期“已抬升”态**，与后端 `max_age`/服务端 TTL 对齐；超过 TTL 再次挑战。([openid.net][2])

---

## 引入模式对比与组合拳

### A. **HTTP 拦截器（首选：无侵入）**

- 对所有 API 统一处理 `step_up_required`（或 401 + `insufficient_authentication`）。
- 优点：**改动最小**；对“提交后补挑战”的场景尤其友好。
- 适合你现在“基本业务完成后”的**插入式改造**。

### B. **动作包装器/装饰器（细粒度）**

- 提供 `verifiedAction(policyKey, fn)`：在点击“转账”“删除”“导出敏感数据”前**先确保验证**。
- 优点：**显式**、便于审计与埋点；与指令/路由守卫可混用。

### C. **自定义指令 `v-verify`（模板友好）**

- 作用到按钮/链接，自动完成**拦截-挑战-放行**。

### D. **路由守卫 + meta**

- 对**进入敏感页面**或**离开页面触发关键提交**的路由，基于 `meta.requiresStepUp` 或 `meta.stepUpPolicy` 调用 Orchestrator。
- 注意：你提到的 `meta` 很合适，但**仍建议搭配拦截器**兜底（防绕过）。

> 组合拳：**拦截器兜底 + 动作包装器/指令标注关键按钮 + 路由守卫保护敏感视图**。

---

## 验证器插件化（Strategy + Adapter）

为后续“新增/调整验证方式”做到**无修改核心逻辑**：

**接口约束（示意）**

```ts
// 复杂逻辑：统一的验证器接口，便于动态加载与替换
export interface StepUpVerifier {
  type: "sms" | "email" | "totp" | "webauthn" | string;
  // 上一行：开始验证，返回验证结果（token/证明）；可能需要展示弹窗
  start(challenge: ChallengePayload): Promise<{ token: string }>;
}
```

**动态注册**

```ts
// 上一行：插件注册表，按类型选择具体验证器
const registry = new Map<string, () => Promise<StepUpVerifier>>();
registry.set(
  "webauthn",
  async () => (await import("./verifiers/webauthn")).webauthnVerifier
);
registry.set("sms", async () => (await import("./verifiers/sms")).smsVerifier);
// ... email, totp, etc.
```

> WebAuthn/Passkeys 是首选要素（抗钓鱼），NIST/OWASP 均建议**减少对短信 OTP 的依赖**。([pages.nist.gov][5])

---

## 与后端的“挑战”契约（建议草案）

```json
{
  "error": "step_up_required",
  "actionId": "transfer:create",
  "nonce": "b64u-abc...",
  "expiresIn": 180,
  "allowed": ["webauthn", "totp", "sms", "email"],
  "webauthnOptions": {
    "challenge": "b64u-...",
    "rpId": "example.com",
    "userVerification": "required"
  },
  "display": { "title": "二次验证", "hint": "本次操作金额 ¥10,000" }
}
```

- **actionId/nonce**：与具体操作和参数摘要绑定，成功后服务端只接受**一次性**使用。
- **allowed**：后端**发号施令**，前端只做编排；便于灰度/风控。
- **webauthnOptions**：与通行密钥交互时的公参。

> 若接 OIDC/OAuth：服务端也可通过 `acr`、`max_age` 判定是否“够强/够新鲜”。([openid.net][2])

---

## 最小落地代码（仅给**需要调整**的片段）

> 说明：以下片段为**插入式**改造，你可逐步替换具体实现。按你的偏好，对复杂逻辑我在**上一行加注释**。

### 1) Axios 拦截器（统一拦截并重试）

```ts
// 上一行：拦截 step_up_required，触发编排，拿到 token 后自动重试原请求
instance.interceptors.response.use(
  (r) => r,
  async (err) => {
    const res = err.response;
    if (res?.data?.error === "step_up_required") {
      const challenge = res.data as ChallengePayload;
      const token = await orchestrator.ensure(challenge);
      // 上一行：把验证 token 附加到原请求头并重试
      const cfg = {
        ...err.config,
        headers: {
          ...(err.config?.headers || {}),
          "X-Verification-Token": token,
        },
      };
      return instance.request(cfg);
    }
    throw err;
  }
);
```

### 2) 编排器 Orchestrator（核心最小实现）

```ts
// 上一行：根据挑战类型动态选择验证器，并缓存短期抬升态（TTL）
export const orchestrator = {
  lastElevatedAt: 0,
  ttlMs: 2 * 60 * 1000, // 与后端对齐
  async ensure(challenge: ChallengePayload): Promise<string> {
    const now = Date.now();
    if (now - this.lastElevatedAt < this.ttlMs) return "__ELEVATED__";
    const pick = challenge.allowed[0]; // 可加策略：优选 webauthn
    const loader = registry.get(pick);
    if (!loader) throw new Error("No verifier for " + pick);
    const verifier = await loader();
    const { token } = await verifier.start(challenge);
    this.lastElevatedAt = Date.now();
    return token;
  },
};
```

### 3) 动作包装器（按钮点击装饰）

```ts
// 上一行：包装敏感动作，先请求后端“可否直通”，若需抬升则自动挑战
export async function verifiedAction<T>(
  policyKey: string,
  action: () => Promise<T>
): Promise<T> {
  const pre = await api.verify.check(policyKey); // 返回 ok 或 step_up_required + challenge
  if (pre.ok) return action();
  const token = await orchestrator.ensure(pre.challenge);
  return actionWithToken(action, token); // 你的 action 内部或拦截器会带上 token
}
```

### 4) 指令 `v-verify`

```ts
// 上一行：在模板上用 v-verify="'transfer:create'" 包裹按钮点击
app.directive("verify", {
  mounted(el, binding) {
    const policyKey: string = binding.value;
    el.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      await verifiedAction(policyKey, async () => {
        el.dispatchEvent(new CustomEvent("verified-click", { bubbles: true }));
      });
    });
  },
});
```

### 5) 路由守卫 + meta（可选强化）

```ts
// 上一行：进入敏感路由前检查新鲜度；不够新鲜则拉起挑战
router.beforeEach(async (to) => {
  const policyKey = to.meta?.stepUpPolicy as string | undefined;
  if (!policyKey) return true;
  const pre = await api.verify.check(policyKey);
  if (pre.ok) return true;
  const token = await orchestrator.ensure(pre.challenge);
  api.setVerificationToken(token);
  return true;
});
```

---

## 后端落地注意事项（要点）

- **响应语义**：使用统一错误码 `step_up_required`，或遵循 RFC 9470 的挑战头部（更标准化）。([IETF Datatracker][1])
- **一事一令牌**：`verificationToken` **与 actionId+参数摘要 绑定**，一次有效，过期即失效，服务端强校验重放与跨用。
- **新鲜度**：对抬升态设置 `max_age`（如 2–5 分钟），并在 ID/Access Token 的 `auth_time`/`acr` 中反映。([openid.net][2])
- **要素优先级**：优先 WebAuthn/Passkeys → TOTP → 邮箱 → 短信（NIST/OWASP 不鼓励短信作为唯一高保证要素）。([pages.nist.gov][5])
- **速率限制与风控**：挑战频控、验证码发送速率、设备指纹；与风控联动只影响**是否挑战/挑战强度**。
- **审计**：记录 `actionId / subject / acr / auth_time / challengeId / 结果`，支持追溯。
- **合规**：支付相关可参考 PSD2/SCA（如果涉欧）。([WIRED][6])

---

## SPA/前端工程的细节最佳实践

- **拦截器优先**：对“提交后才知道要二次验证”的路径最友好。
- **懒加载验证器**：以 `registry.set('webauthn', () => import(...))` 方式，减少首屏成本。
- **UI 独立**：一个统一的 `StepUpModal` 通过事件总线/Pinia 控制，**编排与 UI 分离**，便于换壳。
- **并发队列**：同一时刻只处理一个挑战；后续相同原因的请求**复用**验证结果（TTL 内）。
- **可观测性**：对每次挑战上报埋点（触发原因、耗时、放弃率），做 UX 调优。
- **灰度/开关**：用**特性开关**（env 或远程配置）控制“哪些 policy 生效、优先要素顺序”。
- **安全基线**：参考 OWASP ASVS 清单做验收。([OWASP][7])

---

## 业界资料（便于与你的后端/安全同学对齐）

- Auth0/Okta 的 Step-Up 实践与示例，理解**产品化语义**与**接入点**。([Auth0][8])
- NIST 800-63B 数字身份指南（AAL、OTP 要求等）与最新修订页。([pages.nist.gov][5])
- OWASP MFA/Authentication Cheat Sheets 与 ASVS。([OWASP Cheat Sheet Series][3])
- OAuth 2.0 Step-Up Challenge（RFC 9470），OpenID Connect `max_age`/`acr_values`。([IETF Datatracker][1])
- FIDO/Passkeys 与 UX 指南。([FIDO Alliance][4])
- SPA 安全最佳实践总览（token/重认证/前端风险面）。([Curity][9])

---

## 渐进式落地路线图（建议）

1. **第 1 天**：后端统一 `step_up_required` 响应语义；前端加 **Axios 拦截器**（空实现）。
2. **第 2–3 天**：实现 Orchestrator + 插件注册表；先接 **WebAuthn** 与 **TOTP** 两类验证器。
3. **第 4 天**：把**高风险按钮**替换为 `verifiedAction` 或 `v-verify`；对敏感路由加 `meta.stepUpPolicy`。
4. **第 5 天**：接通后端**短期抬升 TTL** 与绑定校验；完成**审计埋点**。
5. **第 6–7 天**：补充 **SMS/Email** 兜底，要素优先级策略；按 ASVS 走一轮安全自测。([OWASP][7])

---

## 你可以直接复制使用的“接口与约定”清单

- 前端入口：`verifiedAction(policyKey, fn)`、`v-verify` 指令、路由 `meta.stepUpPolicy`。
- 服务端约定：`step_up_required` 挑战载荷（含 `actionId/nonce/allowed/webauthnOptions/expiresIn`），成功返回 `verificationToken`。
- 传递方式：请求头 `X-Verification-Token` 或基于会话的“短期抬升”。
- TTL：2–5 分钟（与 `max_age` 对齐），超时重新挑战。([openid.net][2])

---

### 最后一句

**不要在每个页面硬塞 MFA**。把“二次验证”抽象成**策略 + 编排 + 验证器插件**三段式，再用**拦截器兜底**，你就能在现有 Vite+Vue3 项目中**低改动、高可维护**地完成“中间步骤”的无损引入。

[1]: https://datatracker.ietf.org/doc/rfc9470/?utm_source=chatgpt.com "RFC 9470 - OAuth 2.0 Step Up Authentication Challenge ..."
[2]: https://openid.net/specs/openid-connect-core-1_0.html?utm_source=chatgpt.com "OpenID Connect Core 1.0 incorporating errata set 2"
[3]: https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html?utm_source=chatgpt.com "Multifactor Authentication - OWASP Cheat Sheet Series"
[4]: https://fidoalliance.org/passkeys/?utm_source=chatgpt.com "Passkeys: Passwordless Authentication"
[5]: https://pages.nist.gov/800-63-3/sp800-63b.html?utm_source=chatgpt.com "NIST Special Publication 800-63B"
[6]: https://www.wired.com/story/online-shopping-psd2-strong-customer-authentication?utm_source=chatgpt.com "Your online shopping will soon require more than just a bank card"
[7]: https://owasp.org/www-project-application-security-verification-standard/?utm_source=chatgpt.com "OWASP Application Security Verification Standard (ASVS)"
[8]: https://auth0.com/docs/secure/multi-factor-authentication/step-up-authentication?utm_source=chatgpt.com "Add Step-up Authentication"
[9]: https://curity.io/resources/learn/spa-best-practices/?utm_source=chatgpt.com "Using OAuth for Single Page Applications | Best Practices"

好的，我按你们\*\*“由管理后台下发策略 → 前端在特定页面按策略执行多要素验证（MFA）→ 验证通过后继续流程”**的模式，给出**可无损接入**的最佳实现方案。以下只给到**需要新增/修改的关键代码片段\*\*（新文件我给最小完整实现），复杂逻辑我在**上一行加注释**。

---

## 一、核心思路（贴合你们现状）

1. **策略拉取**：在进入“需保护的页面/操作”时，调用
   `POST /api/security/begin`（可携带 `security_code`、`credential_type`、可选 `passage_key`）。
   返回的数据里包含：

- `status`：1 已验证，0 未验证
- `steps: Step[]`：**多步骤编排**；每个 Step 是一组 `conditions`，`operator` 为 **AND/OR**
- `passage_key`：本轮验证会话标识（后续各要素提交时携带）

2. **前端编排**：

- 以**编排器 Orchestrator**承接 `steps` 并驱动 UI：当 `AND` 时逐个做完；`OR` 时由用户**任选其一**完成。
- **验证器插件化**（Strategy）：`sms_validate`、`email_validate`、`app_validate`、`biometric_validate` 等各自封装调用**各自后端发送/校验接口**（你们已有或即将提供），统一产出 `{ ok, proof }`。
- 统一通过 `passage_key + security_code` 绑定，必要时调用 `/api/security/begin` **带回 `passage_key` 进行复核**，以拿到最新 `status=1`。
- **最小侵入**：提供 `verifiedAction(security_code, action)` 与 `v-verify` 指令；老业务只需在**关键按钮**或**提交前**套一层即可。

> 注：你们的 `begin` 返回已把“要验证什么、AND/OR 关系”表达清楚，前端只做**编排**与**展现**，这正是最佳职责边界。

---

## 二、类型与 API 封装（新增文件：`/src/security/types.ts`、`/src/security/api.ts`）

### `/src/security/types.ts`（新文件：完整最小实现）

```ts
// 上一行：与后端约定的类型（仅关键字段），供全局复用
export interface SecurityBeginReq {
  security_code: string;
  credential_type?: "1" | "2";
  passage_key?: string;
  [k: string]: any;
}

export interface SecurityBeginRes {
  code: number;
  message: string;
  data: {
    begin_time: string;
    expire_time: string;
    passage_key: string;
    security_code: string;
    status: "0" | "1";
    steps: Step[];
    use_cnt: string;
    [k: string]: any;
  };
}

export interface Step {
  operator: "AND" | "OR";
  conditions: Condition[];
  [k: string]: any;
}

export interface Condition {
  type:
    | "sms_validate"
    | "email_validate"
    | "app_validate"
    | "biometric_validate"
    | string;
  result: "pending" | "passed" | "failed" | string;
  failed_cnt: number;
  send_cnt: number;
  parameters: { length?: number; [k: string]: any };
  [k: string]: any;
}

export type VerifyProof = { ok: boolean; proof?: string; detail?: any };
```

### `/src/security/api.ts`（新文件：完整最小实现）

```ts
import axios from "axios";
import type { SecurityBeginReq, SecurityBeginRes } from "./types";

// 上一行：统一封装 begin 接口，后续可插入重试/鉴权
export async function apiSecurityBegin(payload: SecurityBeginReq) {
  const { data } = await axios.post<SecurityBeginRes>(
    "/api/security/begin",
    payload
  );
  if (data.code !== 0 && data.code !== 200)
    throw new Error(data.message || "security begin failed");
  return data.data;
}
```

> 说明：其它要素的**发送/校验接口**（例如 `/api/security/sms/send`、`/api/security/sms/verify`、`/api/security/webauthn/verify` 等）由**各验证器插件**各自调用，避免耦合。

---

## 三、编排器 Orchestrator（新增：`/src/security/orchestrator.ts`）

> 编排器职责：**拉策略 → 执行 AND/OR → 复核状态**；内部通过**注册表**调用各验证器插件。

```ts
import { apiSecurityBegin } from "./api";
import type { Condition, Step, VerifyProof } from "./types";

// 上一行：验证器接口，插件需实现 start()，自行完成发送/校验与 UI 交互
export interface Verifier {
  // 上一行：执行该要素的完整流程（含弹窗/输入/调用后端），返回是否成功与证明
  start(ctx: {
    condition: Condition;
    passageKey: string;
    securityCode: string;
  }): Promise<VerifyProof>;
}

// 上一行：插件注册表，按后端的 type 选择具体验证器
const registry = new Map<string, () => Promise<Verifier>>();
export function registerVerifier(
  type: string,
  loader: () => Promise<Verifier>
) {
  registry.set(type, loader);
}

// 上一行：核心编排：处理 AND/OR；支持 UI 选择 OR 内的要素（通过 onPick 回调）
export async function runSecurityFlow(input: {
  securityCode: string;
  credentialType?: "1" | "2";
  passageKey?: string;
  // 上一行：用于 OR 场景让用户选择具体要素（比如弹出选择器）
  onPick?: (conds: Condition[]) => Promise<Condition>;
}) {
  let { passageKey } = input;
  // 上一行：1) 拉取/刷新策略（可复用传入的 passageKey 提升并发体验）
  const begin = await apiSecurityBegin({
    security_code: input.securityCode,
    credential_type: input.credentialType,
    passage_key: passageKey,
  });
  passageKey = begin.passage_key;

  // 已验证直接放行
  if (begin.status === "1") return { ok: true, passageKey };

  // 上一行：2) 逐步执行 steps
  for (const step of begin.steps) {
    // AND：每个都要过
    if (step.operator === "AND") {
      for (const cond of step.conditions) {
        // 上一行：失败可允许重试或切换通道（此处最小实现为循环直到成功或抛错上层处理）
        const ok = await runOneCondition(cond, input.securityCode, passageKey);
        if (!ok) throw new Error("验证未通过");
      }
    } else {
      // OR：任选其一
      const choice = input.onPick
        ? await input.onPick(step.conditions)
        : preferChoice(step.conditions);
      const ok = await runOneCondition(choice, input.securityCode, passageKey);
      if (!ok) throw new Error("验证未通过");
    }
  }

  // 上一行：3) 复核状态，确保服务端已将 status 置为 1（对齐风控与新鲜度）
  const confirm = await apiSecurityBegin({
    security_code: input.securityCode,
    credential_type: input.credentialType,
    passage_key: passageKey,
  });
  if (confirm.status !== "1") throw new Error("服务端未确认验证通过");
  return { ok: true, passageKey };
}

// 上一行：执行单个条件（按 type 动态加载插件，失败时可在内部控制重试/错误提示）
async function runOneCondition(
  cond: Condition,
  securityCode: string,
  passageKey: string
) {
  const loader = registry.get(cond.type);
  if (!loader) throw new Error(`未注册验证器: ${cond.type}`);
  const verifier = await loader();
  const { ok } = await verifier.start({
    condition: cond,
    passageKey,
    securityCode,
  });
  return ok;
}

// 上一行：OR 默认优先选择更强抗钓鱼要素；你也可改为总是让用户选择
function preferChoice(conds: Condition[]) {
  const order = [
    "biometric_validate",
    "app_validate",
    "totp_validate",
    "email_validate",
    "sms_validate",
  ];
  const ranked = [...conds].sort(
    (a, b) => order.indexOf(a.type) - order.indexOf(b.type)
  );
  return ranked[0] || conds[0];
}
```

---

## 四、验证器插件（示例：短信与通行密钥）

> 你们的验证接口路径未给出，我用占位 `/api/security/sms/send|verify`、`/api/security/webauthn/verify` 示意；你只需把**请求路径和参数名**替换为后端实际实现即可。

### `/src/security/verifiers/sms.ts`（新文件：最小实现）

```ts
import axios from "axios";
import type { Verifier } from "../orchestrator";
import type { Condition } from "../types";

// 上一行：弹窗交互最小实现（请替换为你们的全局弹窗/表单组件）
async function promptCode(length = 6): Promise<string> {
  const input = window.prompt(`请输入短信验证码（${length}位）`) || "";
  return input.trim();
}

export default {
  // 上一行：发送验证码 + 输入 + 校验，最终返回 ok
  async start({ condition, passageKey, securityCode }) {
    await axios.post("/api/security/sms/send", {
      passage_key: passageKey,
      security_code: securityCode,
    });
    const code = await promptCode(condition.parameters?.length ?? 6);
    const { data } = await axios.post("/api/security/sms/verify", {
      passage_key: passageKey,
      security_code: securityCode,
      code,
    });
    return { ok: data?.code === 0 || data?.code === 200 };
  },
} satisfies Verifier;
```

### `/src/security/verifiers/webauthn.ts`（新文件：最小实现）

```ts
import axios from "axios";
import type { Verifier } from "../orchestrator";

// 上一行：调用 WebAuthn 验证（navigator.credentials.get），并提交给后端核验
export default {
  async start({ passageKey, securityCode }) {
    // 上一行：从后端获取 assertion options（含 challenge、rpId 等）
    const { data: optResp } = await axios.post(
      "/api/security/webauthn/options",
      {
        passage_key: passageKey,
        security_code: securityCode,
      }
    );
    const options = optResp.data;

    // 上一行：拉起通行密钥验证（浏览器原生框）
    const cred = (await navigator.credentials.get({
      publicKey: {
        challenge: base64urlToBuffer(options.challenge),
        timeout: options.timeout ?? 60000,
        rpId: options.rpId,
        allowCredentials: options.allowCredentials?.map((c: any) => ({
          id: base64urlToBuffer(c.id),
          type: "public-key",
          transports: c.transports,
        })),
        userVerification: options.userVerification ?? "required",
      },
    })) as PublicKeyCredential;

    // 上一行：把客户端证明发回后端校验
    const verification = await axios.post("/api/security/webauthn/verify", {
      passage_key: passageKey,
      security_code: securityCode,
      id: cred.id,
      type: cred.type,
      rawId: bufferToBase64url(cred.rawId),
      response: {
        clientDataJSON: bufferToBase64url(cred.response.clientDataJSON),
        authenticatorData: bufferToBase64url(
          (cred.response as any).authenticatorData
        ),
        signature: bufferToBase64url((cred.response as any).signature),
        userHandle: bufferToBase64url(
          (cred.response as any).userHandle || new ArrayBuffer(0)
        ),
      },
    });
    return {
      ok: verification.data?.code === 0 || verification.data?.code === 200,
    };
  },
} satisfies Verifier;

// 工具函数
function base64urlToBuffer(b64u: string) {
  const pad = "=".repeat((4 - (b64u.length % 4)) % 4);
  const b64 = (b64u + pad).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const buf = new ArrayBuffer(raw.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < raw.length; ++i) view[i] = raw.charCodeAt(i);
  return buf;
}
function bufferToBase64url(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.byteLength; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
```

### **在入口处注册插件**（修改片段：`/src/security/register.ts`）

```ts
import { registerVerifier } from "./orchestrator";

// 上一行：按需懒加载（避免首屏体积）
registerVerifier(
  "sms_validate",
  async () => (await import("./verifiers/sms")).default
);
registerVerifier(
  "biometric_validate",
  async () => (await import("./verifiers/webauthn")).default
);
// 可继续：email_validate、app_validate ...
```

---

## 五、交互层：统一 StepUp 弹窗（任选其一/必须全部）

> 如果你已有全局弹窗系统（如基于 Ant Design Vue/Element Plus），只需在 **OR 场景**里提供**要素选择器**。我给一个**事件驱动**的最小示例。

### 选择器回调（修改片段：`/src/security/ui.ts`）

```ts
import type { Condition } from "./types";

// 上一行：弹出选择器，返回用户选中的 Condition；可替换为你们现有的 Modal
export async function pickOne(conds: Condition[]): Promise<Condition> {
  const label = (c: Condition) =>
    ((
      {
        sms_validate: "短信验证",
        email_validate: "邮箱验证",
        app_validate: "验证器 App",
        biometric_validate: "通行密钥",
      } as any
    )[c.type] || c.type);
  const names = conds.map(label).join(" / ");
  const ok =
    window.prompt(
      `本步骤可任选其一：${names}\n请输入你选择的方式（例如：短信验证）`
    ) || "";
  const found = conds.find((c) => label(c) === ok.trim());
  return found || conds[0];
}
```

---

## 六、对业务“无损”接入的两种方式

### A. **动作包装器**（推荐，用于按钮/提交）

**新增文件：**`/src/security/verifiedAction.ts`

```ts
import { runSecurityFlow } from "./orchestrator";
import { pickOne } from "./ui";

// 上一行：包装敏感动作；先执行二次验证，通过后再执行 action
export async function verifiedAction<T>(
  securityCode: string,
  action: () => Promise<T>
): Promise<T> {
  const { ok } = await runSecurityFlow({
    securityCode,
    onPick: async (conds) => pickOne(conds),
  });
  if (!ok) throw new Error("二次验证未通过");
  return action();
}
```

**使用处仅需改动一行**（示例：提交转账）：

```ts
// 上一行：用 verifiedAction 包一层，security_code 用管理后台配置的唯一值
await verifiedAction("transfer:create", async () => {
  await api.transfer.submit(form);
});
```

### B. **自定义指令 `v-verify`**（无需改动方法签名，模板友好）

**新增文件：**`/src/security/directive.ts`

```ts
import type { DirectiveBinding } from "vue";
import { runSecurityFlow } from "./orchestrator";
import { pickOne } from "./ui";

// 上一行：点击前触发验证，通过后再“转发一次 click”事件给业务层
export const vVerify = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const securityCode = binding.value;
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      const { ok } = await runSecurityFlow({ securityCode, onPick: pickOne });
      if (ok) {
        // 上一行：验证通过后模拟一次“已验证点击”，由业务层监听
        el.dispatchEvent(new CustomEvent("verified-click", { bubbles: true }));
      }
    });
  },
};
```

**使用处模板只需轻改**：

```vue
<!-- 上一行：在按钮上加 v-verify，并在业务里监听 verified-click -->
<button v-verify="'transfer:create'" @verified-click="onSubmit">转账</button>
```

---

## 七、可选兜底：Axios 响应拦截器（当后端在提交后才提示需验证）

> 许多时候，用户点了“提交”，后端此时才返回“需要验证”。为**无感**体验，可在响应拦截里识别约定的错误码（例如 `code=46001`），触发编排并**自动重放**原请求。

**修改片段：`/src/request/interceptor.ts`**

```ts
import axios from "axios";
import { runSecurityFlow } from "@/security/orchestrator";
import { pickOne } from "@/security/ui";

axios.interceptors.response.use(
  (r) => r,
  async (error) => {
    const res = error?.response;
    // 上一行：示例错误码/标识，请与你们后端约定（这里用 message=step_up_required 占位）
    if (
      res?.data?.message === "step_up_required" &&
      res?.data?.data?.security_code
    ) {
      const securityCode = res.data.data.security_code as string;
      const { ok } = await runSecurityFlow({ securityCode, onPick: pickOne });
      if (ok) {
        // 上一行：把验证态绑定到会话后，重放原请求（通常无需额外头）
        return axios.request(error.config);
      }
    }
    throw error;
  }
);
```

---

## 八、工程与体验要点（落地建议）

- **按需懒加载**验证器，避免首屏增重；失败可**退回选择器**改用其它通道（OR 步骤）。
- **统一弹窗容器**：推荐用你们现有的全局 Modal（我用 `window.prompt` 仅做最小演示）。
- **复核机制**：完成所有 Step 后再次 `begin(passage_key)` 确认 `status=1`，避免前端单边判断。
- **失败处理**：`failed_cnt`、`send_cnt` 用于 UI 提示与频控；连续失败时提供**改用其他要素**的入口。
- **可观测性**：在编排器各阶段打埋点（触发来源、用时、放弃率、切换通道），便于后续 UX 调优。
- **无损改造顺序**：
  1）落地 `runSecurityFlow + 注册表` →
  2）在关键按钮外层用 `verifiedAction` 包住 →
  3）必要时加 **拦截器兜底** →
  4）逐步替换为统一 Modal 交互与更友好的表单 UI。

---

如果你把**短信/邮箱/验证器 App**的**具体接口**路径与参数名给我，我可以把上面的插件示例改成**可直接调用**的版本；或者把你们的**全局弹窗组件**名字告诉我，我把 `window.prompt` 的占位实现替换成你们的 UI 组件调用即可。

你说得对：要“代码最少、好维护、好扩展、用起来顺手”，就该**把“启用判断 + 编排执行”封进一个外观（Facade）服务**，再在**入口层**提供三件套（**装饰器、指令、包装器**）——业务侧按喜好任选其一即可。
内部用**Strategy（验证器插件）+ Composite（AND/OR 组合）+ Decorator（方法装饰器）**。下面只给**需要新增/修改的片段**；复杂逻辑我在**上一行加注释**。

---

## 1) 外观服务（Facade）：`MFAService`（集中最小 API，10 个场景一处配置）

**新增片段：`/src/security/mfa.service.ts`**

```ts
// 上一行：统一外观：缓存 list、调用 begin、执行编排（对外只暴露 isRequired / ensure / run）
export const MFAService = {
  _map: new Map<string, true>(),
  _fetchedAt: 0,
  _ttlMs: 60_000,

  // 上一行：拉取并缓存 /api/security/list，O(1) 判断是否启用
  async isRequired(code: string) {
    const now = Date.now();
    if (this._map.size === 0 || now - this._fetchedAt > this._ttlMs) {
      const list = await apiSecurityList();
      this._map = new Map(list.map((i) => [i.model_value, true]));
      this._fetchedAt = now;
    }
    return this._map.has(code);
  },

  // 上一行：执行完整的“拉策略→按 AND/OR 执行→复核”并处理 OR 的选择
  async ensure(
    code: string,
    opts?: {
      credentialType?: "1" | "2";
      onPick?: (c: Condition[]) => Promise<Condition>;
    }
  ) {
    return runSecurityFlow({
      securityCode: code,
      credentialType:
        opts?.credentialType ??
        (/\b(iPhone|iPad|Mac|Safari)\b/i.test(navigator.userAgent) ? "1" : "2"),
      onPick: opts?.onPick ?? pickOne,
    });
  },
};
```

> 说明：`apiSecurityList`、`runSecurityFlow`、`pickOne` 你已按前文有基础实现，无需改结构。

---

## 2) **包装器**（函数式最少侵入，适合按钮/提交）

**新增/修改片段：`/src/security/verifiedAction.ts`**

```ts
// 上一行：用 Facade 收口：先看 list，启用才执行编排；否则直通
export async function verifiedAction<T>(
  securityCode: string,
  action: () => Promise<T>
): Promise<T> {
  if (!(await MFAService.isRequired(securityCode))) return action();
  const { ok } = await MFAService.ensure(securityCode);
  if (!ok) throw new Error("二次验证未通过");
  return action();
}
```

**使用处只改一行（示例）**：

```ts
// 上一行：把原有提交包一层即可
await verifiedAction("bind_auth", () => api.bindAuthApp(form));
```

---

## 3) **装饰器**（Decorator）：一行声明给方法加 MFA（Controller/Service 最好用）

**新增片段：`/src/security/decorators.ts`**

```ts
// 上一行：方法装饰器：自动在调用前执行 MFA，成功后再调用原方法
export function RequireMFA(code: string) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      if (await MFAService.isRequired(code)) {
        const { ok } = await MFAService.ensure(code);
        if (!ok) throw new Error("二次验证未通过");
      }
      // 上一行：验证通过后才执行原方法
      return original.apply(this, args);
    };
  };
}
```

**使用处（示例，仅改方法签名一行）**：

```ts
// 上一行：在页面/Store 方法上加装饰器即可
@RequireMFA('bind_auth')
async function onSubmit() {
  await api.bindAuthApp(form);
}
```

---

## 4) **自定义指令**（Directive）：模板最友好，零改业务事件签名

**新增/修改片段：`/src/security/directive.ts`**

```ts
// 上一行：点击前执行 MFA，通过后分发“verified-click”事件给原业务逻辑
export const vVerify = {
  mounted(el: HTMLElement, binding: { value: string }) {
    const code = binding.value;
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      if (await MFAService.isRequired(code)) {
        const { ok } = await MFAService.ensure(code);
        if (!ok) return;
      }
      // 上一行：验证通过后再补发一次“已验证点击”事件
      el.dispatchEvent(new CustomEvent("verified-click", { bubbles: true }));
    });
  },
};
```

**使用处（模板只加指令与事件名）**：

```vue
<!-- 上一行：不改原方法，只把 @click 换成 @verified-click -->
<button v-verify="'bind_auth'" @verified-click="onSubmit">绑定验证器</button>
```

---

## 5) **验证器插件**（Strategy）：一次注册，全站可用

**新增/修改片段：`/src/security/register.ts`**

```ts
// 上一行：注册验证器策略；可懒加载，类型由后端 conditions.type 决定
registerVerifier(
  "sms_validate",
  async () => (await import("./verifiers/sms")).default
);
registerVerifier(
  "email_validate",
  async () => (await import("./verifiers/email")).default
);
registerVerifier(
  "app_validate",
  async () => (await import("./verifiers/app")).default
);
registerVerifier(
  "biometric_validate",
  async () => (await import("./verifiers/webauthn")).default
);
```

---

## 6) **组合模式**（Composite）：AND/OR 由编排器已实现，无需业务关心

> 你已有 `runSecurityFlow(steps)`，内部是**AND 全过 / OR 让用户选 1 个**。
> 如需“OR 时给默认推荐”，只改一处排序逻辑即可：
> **修改片段：`/src/security/orchestrator.ts`**

```ts
// 上一行：OR 优先级：通行密钥 > App/TOTP > 邮箱 > 短信
const order = [
  "biometric_validate",
  "app_validate",
  "totp_validate",
  "email_validate",
  "sms_validate",
];
```

---

## 7) **路由集成**（可选）：提示徽标 + 守卫预检（无需阻塞）

**修改片段：路由配置与守卫**

```ts
// 上一行：在敏感页面 meta 写上唯一 code（与后台 list 的 model_value 一致）
meta: {
  security_code: "bind_auth";
}
```

```ts
// 上一行：进入路由前标注 mfaRequired 供 UI 显示徽标（不强制挑战）
router.beforeResolve(async (to) => {
  const code = to.meta?.security_code as string | undefined;
  if (code) (to.meta as any).mfaRequired = await MFAService.isRequired(code);
  return true;
});
```

---

## 8) **提交后兜底**（拦截器）：策略临时变化仍然无感

**修改片段：`/src/request/interceptor.ts`**

```ts
// 上一行：当后端临时要求 Step-up 时，自动执行 MFA 并重放请求
if (
  res?.data?.message === "step_up_required" &&
  res?.data?.data?.security_code
) {
  const code = res.data.data.security_code as string;
  const { ok } = await MFAService.ensure(code);
  if (ok) return axios.request(error.config);
}
```

---

## 9) 你在 10 个场景里的“改动成本”对比

- 喜欢**最少改动**：用**装饰器** → 只在方法上加 `@RequireMFA('code')`。
- 喜欢**模板清晰**：用**指令** → 在按钮上加 `v-verify="'code'"`，把 `@click` 改为 `@verified-click`。
- 喜欢**函数式**：用**包装器** → `await verifiedAction('code', () => doSomething())`。

> 三者**共用同一个 Facade/编排/策略注册**，因此**维护点只有一处**；后续新增第 11、12 个场景，只是**填一个 code**，没有新样板代码。

---

## 10) 为什么这是“最佳做法”（结合你的诉求）

- **代码最少**：业务侧只写一个 `code`；其余都在 Facade/编排层。
- **易维护**：`/api/security/list`、`/api/security/begin` 的变化只改 `MFAService` 或 `orchestrator`。
- **易扩展**：新增验证方式只需 `registerVerifier('xxx', loader)`。
- **使用方便**：三种入口（装饰器/指令/包装器）覆盖 Controller、模板、函数三类习惯。
- **设计模式落地**：

  - Facade（`MFAService`）收口复杂度；
  - Strategy（`registerVerifier`）插拔验证器；
  - Composite（`runSecurityFlow` 的 AND/OR）；
  - Decorator（`@RequireMFA`）零侵入增强。

如果你确定采用**哪一种入口为主**（比如全用装饰器），我可以把对应那条链路再“打磨到 3 行就能用”的程度，并把你们实际的短信/邮箱/APP/通行密钥接口参数**替换进插件**。
