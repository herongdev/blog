下面我给出**一套“单一入口：包装器 verifiedAction”方案**（Vite+Vue3+Pinia），目标是：**改动最少、好维护、好扩展、使用方便**。
实现要点：

- **Facade 外观服务 + Orchestrator 编排器 + Strategy 插件**（短信/邮箱/验证器 App/通行密钥）。
- 只在你的**关键提交流程**上包一层 `verifiedAction('security_code', () => yourAction())` 即可。
- 管理后台通过 `/api/security/list` 下发哪些模块需要 MFA；前端本地缓存 60s，**O(1)** 判断；需要才触发 `/api/security/begin` 的**AND/OR**组合验证编排。
- **所有新文件**都放到 `src/security/`，原有业务只需在**关键按钮的方法**里增加一行包装调用；以及在 `src/main.ts` **新增一行 import** 完成验证器注册。

> 你要求“对于调整的代码，给完整代码；说明目录位置”。下面逐个文件给出**目录与完整代码**。复杂逻辑我按你的习惯在**上一行加注释**。

---

# 新增文件（放入你的项目）

## 1）`src/security/types.ts`

```ts
export interface SecurityBeginReq {
  security_code: string;
  credential_type?: "1" | "2";
  passage_key?: string;
  [k: string]: any;
}

export interface Parameters {
  length?: number;
  [k: string]: any;
}

export interface Condition {
  type:
    | "sms_validate"
    | "email_validate"
    | "app_validate"
    | "biometric_validate"
    | string;
  result?: "pending" | "passed" | "failed" | string;
  failed_cnt?: number;
  send_cnt?: number;
  parameters?: Parameters;
  [k: string]: any;
}

export interface Step {
  operator: "AND" | "OR";
  conditions: Condition[];
  [k: string]: any;
}

export interface SecurityBeginData {
  begin_time: string;
  expire_time: string;
  passage_key: string;
  security_code: string;
  status: "0" | "1";
  steps: Step[];
  use_cnt: string;
  [k: string]: any;
}

export interface SecurityBeginRes {
  code: number;
  message: string;
  data: SecurityBeginData;
}

export type VerifyProof = { ok: boolean; proof?: string; detail?: any };

// 上一行：统一的验证器接口，便于动态加载与替换
export interface Verifier {
  // 上一行：执行该要素的完整流程（含弹窗/输入/调用后端），返回是否成功
  start(ctx: {
    condition: Condition;
    passageKey: string;
    securityCode: string;
  }): Promise<VerifyProof>;
}
```

---

## 2）`src/security/api.ts`

```ts
import { http } from "@/libs";
import type { SecurityBeginReq, SecurityBeginRes } from "./types";

// 上一行：统一封装 begin 接口，后续可插入重试/鉴权
export async function apiSecurityBegin(payload: SecurityBeginReq) {
  const resp = await http.call<SecurityBeginRes>({
    url: "/api/security/begin",
    method: "POST",
    data: payload,
  });
  if (resp.code !== 0 && resp.code !== 200)
    throw new Error(resp.message || "security begin failed");
  return resp.data;
}

// 上一行：获取开启 MFA 的业务模块清单
export async function apiSecurityList(): Promise<
  Array<{ model_code: string; model_value: string }>
> {
  const resp = await http.call<{
    code: number;
    message: string;
    data: Array<{ model_code: string; model_value: string }>;
  }>({
    url: "/api/security/list",
    method: "POST",
  });
  if (resp.code !== 200)
    throw new Error(resp.message || "security list failed");
  return resp.data || [];
}
```

---

## 3）`src/security/orchestrator.ts`

```ts
import { apiSecurityBegin } from "./api";
import type { Condition, VerifyProof, Verifier } from "./types";

// 上一行：插件注册表，按后端的 type 选择具体验证器
const registry = new Map<string, () => Promise<Verifier>>();
export function registerVerifier(
  type: string,
  loader: () => Promise<Verifier>
) {
  registry.set(type, loader);
}

// 上一行：OR 默认优先选择更强抗钓鱼要素
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

// 上一行：核心编排：处理 AND/OR；支持 UI 选择 OR 内的要素（通过 onPick 回调）
export async function runSecurityFlow(input: {
  securityCode: string;
  credentialType?: "1" | "2";
  passageKey?: string;
  onPick?: (conds: Condition[]) => Promise<Condition>;
}) {
  let { passageKey } = input;
  // 上一行：1) 拉取/刷新策略
  const begin = await apiSecurityBegin({
    security_code: input.securityCode,
    credential_type: input.credentialType,
    passage_key: passageKey,
  });
  passageKey = begin.passage_key;

  if (begin.status === "1") return { ok: true, passageKey };

  for (const step of begin.steps) {
    if (step.operator === "AND") {
      for (const cond of step.conditions) {
        const ok = await runOneCondition(cond, input.securityCode, passageKey);
        if (!ok) throw new Error("验证未通过");
      }
    } else {
      const choice = input.onPick
        ? await input.onPick(step.conditions)
        : preferChoice(step.conditions);
      const ok = await runOneCondition(choice, input.securityCode, passageKey);
      if (!ok) throw new Error("验证未通过");
    }
  }

  // 上一行：3) 复核状态
  const confirm = await apiSecurityBegin({
    security_code: input.securityCode,
    credential_type: input.credentialType,
    passage_key: passageKey,
  });
  if (confirm.status !== "1") throw new Error("服务端未确认验证通过");
  return { ok: true, passageKey };
}
```

---

## 4）`src/security/mfa.service.ts`

```ts
import { apiSecurityList } from "./api";
import { runSecurityFlow } from "./orchestrator";
import type { Condition } from "./types";
import { pickOne } from "./ui";

// 上一行：统一外观：缓存 list、调用 begin、执行编排
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

  // 上一行：执行完整的“拉策略→按 AND/OR 执行→复核”
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

---

## 5）`src/security/verifiedAction.ts`（业务入口——你只需用它包住关键动作）

```ts
import { MFAService } from "./mfa.service";

// 上一行：包装器：先看 list，启用才执行编排；否则直通
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

---

## 6）`src/security/ui.ts`（OR 场景下的方式选择弹窗，Ant Design Vue 实现）

```ts
import { Modal, Radio } from "ant-design-vue";
import type { Condition } from "./types";
import { createVNode, reactive } from "vue";

function labelOf(c: Condition) {
  const map: Record<string, string> = {
    sms_validate: "短信验证",
    email_validate: "邮箱验证",
    app_validate: "验证器 App",
    biometric_validate: "通行密钥",
  };
  return map[c.type] || c.type;
}

// 上一行：弹出选择器，返回用户选中的 Condition
export async function pickOne(conds: Condition[]): Promise<Condition> {
  const state = reactive({ value: conds[0]?.type });
  return new Promise((resolve) => {
    const m = Modal.confirm({
      title: "选择一种验证方式",
      content: () =>
        createVNode(
          Radio.Group,
          {
            value: state.value,
            "onUpdate:value": (v: string) => (state.value = v),
            style: "display:flex; flexDirection:column; gap:12px;",
          },
          {
            default: () =>
              conds.map((c) =>
                createVNode(
                  Radio,
                  { value: c.type, style: "display:block; margin:8px 0;" },
                  { default: () => labelOf(c) }
                )
              ),
          }
        ),
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        const found = conds.find((c) => c.type === state.value) || conds[0];
        resolve(found);
      },
      onCancel: () => resolve(conds[0]),
    });
  });
}
```

---

## 7）`src/security/register.ts`（注册所有验证器插件，应用启动时 import 一次）

```ts
import { registerVerifier } from "./orchestrator";

// 上一行：按需懒加载（避免首屏体积）
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

## 8）`src/security/verifiers/sms.ts`（短信验证插件）

```ts
import { http } from "@/libs";
import type { Verifier } from "../types";
import { Modal, Input, message } from "ant-design-vue";
import { createVNode, ref } from "vue";

// 上一行：发送验证码 + 输入 + 校验
export default {
  async start({ passageKey, securityCode, condition }) {
    await http.call({
      url: "/api/security/sms/send",
      method: "POST",
      data: { passage_key: passageKey, security_code: securityCode },
    });

    const codeRef = ref("");
    // 上一行：用 Modal 实现输入框（可替换为你们统一弹窗组件）
    await new Promise<void>((resolve, reject) => {
      const m = Modal.confirm({
        title: "短信验证",
        content: () =>
          createVNode(Input, {
            value: codeRef.value,
            maxlength: condition.parameters?.length ?? 6,
            placeholder: "请输入短信验证码",
            "onUpdate:value": (v: string) => (codeRef.value = v),
          }),
        okText: "验证",
        cancelText: "取消",
        onOk: () => resolve(),
        onCancel: () => reject(new Error("取消验证")),
      });
    });

    const resp = await http.call<{ code: number; message: string }>({
      url: "/api/security/sms/verify",
      method: "POST",
      data: {
        passage_key: passageKey,
        security_code: securityCode,
        code: codeRef.value,
      },
    });

    const ok = resp.code === 0 || resp.code === 200;
    if (!ok) message.error(resp?.message || "短信验证失败");
    return { ok };
  },
} satisfies Verifier;
```

---

## 9）`src/security/verifiers/email.ts`（邮箱验证插件）

```ts
import { http } from "@/libs";
import type { Verifier } from "../types";
import { Modal, Input, message } from "ant-design-vue";
import { createVNode, ref } from "vue";

export default {
  async start({ passageKey, securityCode, condition }) {
    await http.call({
      url: "/api/security/email/send",
      method: "POST",
      data: { passage_key: passageKey, security_code: securityCode },
    });

    const codeRef = ref("");
    await new Promise<void>((resolve, reject) => {
      Modal.confirm({
        title: "邮箱验证",
        content: () =>
          createVNode(Input, {
            value: codeRef.value,
            maxlength: condition.parameters?.length ?? 6,
            placeholder: "请输入邮箱验证码",
            "onUpdate:value": (v: string) => (codeRef.value = v),
          }),
        okText: "验证",
        cancelText: "取消",
        onOk: () => resolve(),
        onCancel: () => reject(new Error("取消验证")),
      });
    });

    const resp = await http.call<{ code: number; message: string }>({
      url: "/api/security/email/verify",
      method: "POST",
      data: {
        passage_key: passageKey,
        security_code: securityCode,
        code: codeRef.value,
      },
    });

    const ok = resp.code === 0 || resp.code === 200;
    if (!ok) message.error(resp?.message || "邮箱验证失败");
    return { ok };
  },
} satisfies Verifier;
```

---

## 10）`src/security/verifiers/app.ts`（验证器 App 插件——推送+轮询示意）

```ts
import { http } from "@/libs";
import type { Verifier } from "../types";
import { Modal, message } from "ant-design-vue";

// 上一行：验证器 App：一般为“推送 + 轮询”确认
export default {
  async start({ passageKey, securityCode }) {
    // 上一行：后端发送推送，返回一个 ticket，前端轮询查询结果
    const init = await http.call<{
      code: number;
      message: string;
      data: { ticket: string };
    }>({
      url: "/api/security/app/push",
      method: "POST",
      data: { passage_key: passageKey, security_code: securityCode },
    });
    if (init.code !== 200 && init.code !== 0) {
      message.error(init.message || "发送验证请求失败");
      return { ok: false };
    }

    const ticket = init.data.ticket;
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    let ok = false;

    // 上一行：简单轮询 30 秒，每 2 秒一次
    for (let i = 0; i < 15; i++) {
      const poll = await http.call<{
        code: number;
        message: string;
        data: { status: "pending" | "approved" | "rejected" };
      }>({
        url: "/api/security/app/poll",
        method: "POST",
        data: { ticket, passage_key: passageKey, security_code: securityCode },
      });
      if (poll.data.status === "approved") {
        ok = true;
        break;
      }
      if (poll.data.status === "rejected") {
        ok = false;
        break;
      }
      await wait(2000);
    }

    if (!ok) message.error("验证器 App 未通过或超时");
    return { ok };
  },
} satisfies Verifier;
```

---

## 11）`src/security/verifiers/webauthn.ts`（通行密钥/生物识别）

```ts
import { http } from "@/libs";
import type { Verifier } from "../types";

// 上一行：调用 WebAuthn 验证（navigator.credentials.get），并提交给后端核验
export default {
  async start({ passageKey, securityCode }) {
    // 上一行：从后端获取 assertion options（含 challenge、rpId 等）
    const optResp = await http.call<{
      code: number;
      message: string;
      data: any;
    }>({
      url: "/api/security/webauthn/options",
      method: "POST",
      data: { passage_key: passageKey, security_code: securityCode },
    });
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
    const verification = await http.call<{ code: number; message: string }>({
      url: "/api/security/webauthn/verify",
      method: "POST",
      data: {
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
      },
    });
    const ok = verification.code === 0 || verification.code === 200;
    return { ok };
  },
} satisfies Verifier;

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

---

# 修改文件（给出完整代码）

> 只需在应用入口 `main.ts` **新增一行**，确保验证器在应用启动时完成注册。

## 12）`src/main.ts`（完整文件，新增 `import '@/security/register'`）

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "@/App.vue";
import router from "@/router";
import i18n, { loadLocaleData } from "@/locales";
import directives from "@/directives";
import "@/security/register";
import "virtual:svg-icons-register";
import "@/assets/styles/main.css";
import { mountIconCollector } from "@/plugins";
import videojs from "video.js";
import { http } from "@/libs";
import {
  codeResponseParser,
  axiosDataFallbackParser,
} from "@/libs/http/parsers";

// 先挂载图标拦截器 → 再挂载解析器，且解析器顺序为：业务壳 → fallback
mountIconCollector(http);
http.setGlobalParser([codeResponseParser, axiosDataFallbackParser]);

// 挂到全局，语言包才能访问到
// @ts-ignore
window.videojs = videojs;
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

// 在 Pinia 激活后（确保 store 可用）
app.use(router);
app.use(i18n);
app.use(directives);
app.mount("#app");
// 请求账户信息

loadLocaleData(i18n, "zh-CN");
```

---

# 如何使用（业务侧只改一行）

在任意需要二次验证的动作（例如“绑定验证器 App”、“发起提现”、“重置安全设置”……）的提交方法里：

```ts
import { verifiedAction } from "@/security/verifiedAction";

// 上一行：把原有提交包一层即可；'bind_auth' 要与后台 /api/security/list 的 model_value 对上
await verifiedAction("bind_auth", async () => {
  await api.bindAuthApp(formData);
});
```

> 运行过程：
> 1）`verifiedAction` 先用 `/api/security/list` 本地判断该模块是否启用；没启用就**直接执行**你的原逻辑；
> 2）启用了则调用 `/api/security/begin` 获取 `steps`，**AND 全过、OR 让用户选一个**；
> 3）成功后再次 `begin(passage_key)` 复核 `status=1`，**再继续**你的原逻辑（无侵入）；
> 4）后续新增/调整验证方式，只需添加一个 `verifiers/xxx.ts` 并在 `register.ts` 注册即可。

---

# 说明与后续可选增强

- 目前我**未改动你的 HTTP 拦截器**（避免大改）；若你希望“提交后服务端才要求二次验证”也**自动抬升并重放**，再告诉我你们约定的错误码/标识（例如 `message='step_up_required'`），我再给你**完整替换版** `src/libs/http/interceptors.ts`。
- 如果你更喜欢**模板改动**而不是方法改动，我可以再提供**自定义指令** `v-verify` 的完整文件；不过就“代码改动最少”而言，**包装器**是最稳的。
- 你也可以把**路由 meta.security_code** 用来标识“此页面包含需要 MFA 的操作”，但是否触发仍以 `verifiedAction` 为准。

需要我把某个**具体业务页面**改成示例（替换为 `verifiedAction`）吗？把文件路径发我，我直接给你**该文件的完整改造版**。
