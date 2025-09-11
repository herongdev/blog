---
title: 在你现有 uvue 登录页集成“一键通行密钥登录”（含回退注册），完整代码可直接替换
date: 2025-09-05
tags: [uni-app x, UTS 插件, Passkeys, WebAuthn, 一键直登]
---

## 目标

把我们讨论的“**先尝试通行密钥登录 → 失败自动回退到 JIT 注册并登录**”接到你这份 **uvue（uni-app x）页面** 上，**保留原有微信登录按钮**，新增一个“通行密钥登录”按钮。
支持：

- **App 端（Android/iOS）**：走你自定义的 **UTS 插件** `@/uni_modules/pass-keys`（`getPasskey`/`createPasskey`）。
- **H5 端**：走浏览器 WebAuthn（`navigator.credentials.get/create`）。
- **设备唯一**：用 `deviceIdentifier`（App 用 `plus.device.uuid`，H5 用本地生成）传后端，便于 `deviceId -> userId` 绑定。

> 复杂逻辑均在代码**上一行加中文注释**。下面给出**整文件覆盖式代码**（符合你“Passkeys 项目优先给完整文件”的约定）。

---

## 完整代码（直接替换你当前页面）

```vue
<template>
  <view class="container">
    <view class="header">
      <text class="title">欢迎使用商户平台</text>
    </view>

    <view v-if="!baseUrl" class="tip">
      <text class="tip-text">未配置后端地址，请先配置</text>
      <button size="mini" @tap="openConfig">去配置</button>
    </view>

    <view class="actions">
      <button
        type="primary"
        :disabled="!baseUrl || loading"
        @tap="onWeChatLogin"
      >
        {{
          baseUrl
            ? isWeChatInstalled
              ? "微信登录"
              : "登录"
            : "请先配置后端地址"
        }}
      </button>

      <!-- 新增：通行密钥一键登录（失败自动回退注册并登录） -->
      <button
        style="margin-top:12rpx"
        :disabled="!baseUrl || loading"
        @tap="onPasskeyLogin"
      >
        {{ loading ? "处理中..." : "通行密钥登录" }}
      </button>
    </view>

    <view v-if="loading" class="loading-mask">
      <view class="loading-box"><text>处理中...</text></view>
    </view>

    <view v-if="showConfig" class="modal-mask" @tap="closeConfig">
      <view class="modal" @tap.stop>
        <text class="modal-title">配置后端地址</text>
        <input
          class="modal-input"
          type="text"
          v-model="configInput"
          placeholder="例如：https://api.example.com"
        />
        <view class="modal-actions">
          <button size="mini" @tap="closeConfig">取消</button>
          <button type="primary" size="mini" @tap="saveConfig">保存</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// #ifdef APP-PLUS
// 复杂逻辑：App 端引入你的 UTS 插件（Android/iOS 调平台原生 Credential/AuthenticationServices）
import * as passkeys from "@/uni_modules/pass-keys";
// #endif

export default {
  data() {
    return {
      baseUrl: "",
      loading: false,
      isWeChatInstalled: true,
      showConfig: false,
      configInput: "",
      // 复杂逻辑：设备唯一标识；App=plus.device.uuid；H5=本地生成并持久化
      deviceId: "",
    };
  },
  onLoad() {
    this.baseUrl = uni.getStorageSync("BASE_URL") || "";
    // 复杂逻辑：初始化设备ID（用于 deviceId -> userId 绑定与风控）
    // #ifdef APP-PLUS
    this.deviceId =
      plus && plus.device && plus.device.uuid
        ? plus.device.uuid
        : "app-" + Date.now();
    // #endif
    // #ifdef H5
    const key = "DEVICE_ID";
    this.deviceId = localStorage.getItem(key);
    if (!this.deviceId) {
      this.deviceId =
        crypto?.randomUUID?.() ||
        "web-" + Date.now() + "-" + Math.random().toString(16).slice(2);
      localStorage.setItem(key, this.deviceId);
    }
    // #endif
  },
  methods: {
    openConfig() {
      this.configInput = this.baseUrl;
      this.showConfig = true;
    },
    closeConfig() {
      this.showConfig = false;
    },
    saveConfig() {
      this.baseUrl = (this.configInput || "").trim();
      uni.setStorageSync("BASE_URL", this.baseUrl);
      this.showConfig = false;
      uni.showToast({ title: "已保存", icon: "success" });
    },

    // 复杂逻辑：统一 POST 封装；把 deviceIdentifier 一并传给后端（也可由 Header 传）
    async post(path, body) {
      return await new Promise((resolve, reject) => {
        uni.request({
          url: `${this.baseUrl}${path}`,
          method: "POST",
          data: { deviceIdentifier: this.deviceId, ...(body || {}) },
          dataType: "json",
          header: { "content-type": "application/json" },
          success: (res) => resolve(res.data),
          fail: reject,
        });
      });
    },

    // 保留原有：微信登录
    async onWeChatLogin() {
      if (!this.baseUrl) return;
      this.loading = true;
      try {
        let code = "";
        // 小程序端获取 code
        // #ifdef MP-WEIXIN
        const res = await new Promise((resolve, reject) => {
          uni.login({ provider: "weixin", success: resolve, fail: reject });
        });
        code = res.code || "";
        // #endif

        // 其他端未集成微信登录，给出提示
        // #ifndef MP-WEIXIN
        throw new Error("当前平台未集成微信登录");
        // #endif

        if (!code) throw new Error("获取登录凭证失败");
        const data = await this.post("/admin/wechat/login", { code });
        if (
          data &&
          data.success === true &&
          data.userInfo &&
          data.userInfo.approved === true &&
          data.userInfo.token
        ) {
          uni.setStorageSync("TOKEN", data.userInfo.token);
          uni.showToast({ title: "登录成功", icon: "success" });
          setTimeout(() => {
            uni.reLaunch({ url: "/pages/index/index" });
          }, 600);
        } else {
          throw new Error(data?.message || "登录失败");
        }
      } catch (e) {
        uni.showToast({ title: e?.message || String(e), icon: "none" });
      } finally {
        this.loading = false;
      }
    },

    // ================== 通行密钥一键登录入口（失败回退注册） ==================
    async onPasskeyLogin() {
      if (!this.baseUrl) return;
      this.loading = true;
      try {
        // 复杂逻辑：步骤A——请求登录 options（无用户名直登；后端可按设备ID定向返回 allowCredentials）
        const resp = await this.post("/passkeys/login/options", {});
        const options = resp.options || resp;

        // #ifdef APP-PLUS
        // 复杂逻辑：App 端调用 UTS 插件进行“使用通行密钥”
        const requestOptionsJson = JSON.stringify(options);
        const authRespJson = await passkeys.getPasskey(requestOptionsJson, {
          conditional: true,
        });
        const verifyBody = JSON.parse(authRespJson);
        // #endif

        // #ifdef H5
        // 复杂逻辑：H5 端使用 WebAuthn —— 将 base64url 字段转 ArrayBuffer
        const publicKey = this.toWebAuthnRequestOptions(options);
        // 复杂逻辑：若支持条件UI，mediation='conditional'，否则 'required'（需用户手势）
        const mediation = (await this.isConditionalUI())
          ? "conditional"
          : "required";
        const assertion = await navigator.credentials.get({
          publicKey,
          mediation,
        });
        const verifyBody = this.packAssertion(assertion);
        // #endif

        // 复杂逻辑：步骤B——提交登录 verify
        const verify = await this.post("/passkeys/login/verify", verifyBody);
        this.onLoginSucceed(verify);
      } catch (e) {
        // 复杂逻辑：登录失败（无凭据/取消/过期）→ 步骤C——回退到 JIT 注册
        try {
          const jit = await this.post(
            "/passkeys/register-or-login/options",
            {}
          );
          const userId = jit.userId || jit?.user?.id;
          const creationOptions = jit.options || jit;

          // #ifdef APP-PLUS
          // 复杂逻辑：App 端调用 UTS 插件“创建通行密钥”
          const creationOptionsJson = JSON.stringify(creationOptions);
          const regRespJson = await passkeys.createPasskey(creationOptionsJson);
          const verifyRegBody = {
            ...JSON.parse(regRespJson),
            userId,
            deviceIdentifier: this.deviceId,
          };
          // #endif

          // #ifdef H5
          // 复杂逻辑：H5 端 WebAuthn —— 转换 base64url → ArrayBuffer，发起 create
          const publicKey = this.toWebAuthnCreationOptions(creationOptions);
          const attestation = await navigator.credentials.create({ publicKey });
          const verifyRegBody = {
            ...this.packAttestation(attestation),
            userId,
            deviceIdentifier: this.deviceId,
          };
          // #endif

          // 复杂逻辑：步骤D——提交注册 verify（完成入库+设备唯一绑定+签发会话）
          const verify = await this.post(
            "/passkeys/register-or-login/verify",
            verifyRegBody
          );
          this.onLoginSucceed(verify, true);
        } catch (e2) {
          uni.showToast({ title: e2?.message || String(e2), icon: "none" });
        }
      } finally {
        this.loading = false;
      }
    },

    // 复杂逻辑：登录/注册成功后的统一处理（落 token + 跳转）
    onLoginSucceed(verify, isRegister = false) {
      if (verify?.verified) {
        if (verify.token) {
          uni.setStorageSync("TOKEN", verify.token);
        }
        uni.showToast({
          title: isRegister ? "已注册并登录" : "登录成功",
          icon: "success",
        });
        setTimeout(() => {
          uni.reLaunch({ url: "/pages/index/index" });
        }, 600);
      } else {
        throw new Error("校验失败");
      }
    },

    // ================== H5 专用辅助：WebAuthn 转换与打包 ==================
    // #ifdef H5
    // 复杂逻辑：检测是否支持条件UI
    async isConditionalUI() {
      try {
        return !!(await PublicKeyCredential.isConditionalMediationAvailable?.());
      } catch {
        return false;
      }
    },
    // 复杂逻辑：base64url → ArrayBuffer
    b64urlToBuf(b64url) {
      const pad = "=".repeat((4 - (b64url.length % 4)) % 4);
      const b64 = (b64url + pad).replace(/-/g, "+").replace(/_/g, "/");
      const bin = atob(b64);
      const buf = new ArrayBuffer(bin.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
      return buf;
    },
    // 复杂逻辑：ArrayBuffer/Uint8Array → base64url
    bufToB64url(buf) {
      const b = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
      let s = "";
      for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
      return btoa(s)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
    },
    // 复杂逻辑：将登录 options（服务端 base64url）转为 WebAuthn 可用结构
    toWebAuthnRequestOptions(serverOpts) {
      const opts = JSON.parse(JSON.stringify(serverOpts));
      if (typeof opts.challenge === "string")
        opts.challenge = this.b64urlToBuf(opts.challenge);
      if (Array.isArray(opts.allowCredentials)) {
        opts.allowCredentials = opts.allowCredentials.map((c) => ({
          ...c,
          id: typeof c.id === "string" ? this.b64urlToBuf(c.id) : c.id,
        }));
      }
      return opts;
    },
    // 复杂逻辑：将注册 options 转为 WebAuthn 可用结构
    toWebAuthnCreationOptions(serverOpts) {
      const opts = JSON.parse(JSON.stringify(serverOpts));
      if (typeof opts.challenge === "string")
        opts.challenge = this.b64urlToBuf(opts.challenge);
      if (opts.user && typeof opts.user.id === "string")
        opts.user.id = this.b64urlToBuf(opts.user.id);
      if (Array.isArray(opts.excludeCredentials)) {
        opts.excludeCredentials = opts.excludeCredentials.map((c) => ({
          ...c,
          id: typeof c.id === "string" ? this.b64urlToBuf(c.id) : c.id,
        }));
      }
      return opts;
    },
    // 复杂逻辑：将 get() 结果打包为后端可校验的 JSON（统一 base64url）
    packAssertion(cred) {
      const resp = cred.response;
      return {
        id: cred.id,
        rawId: this.bufToB64url(cred.rawId),
        type: cred.type,
        response: {
          clientDataJSON: this.bufToB64url(resp.clientDataJSON),
          authenticatorData: this.bufToB64url(resp.authenticatorData),
          signature: this.bufToB64url(resp.signature),
          userHandle: resp.userHandle
            ? this.bufToB64url(resp.userHandle)
            : null,
        },
        clientExtensionResults: cred.getClientExtensionResults?.() || {},
      };
    },
    // 复杂逻辑：将 create() 结果打包为后端可校验的 JSON（统一 base64url）
    packAttestation(cred) {
      const resp = cred.response;
      return {
        id: cred.id,
        rawId: this.bufToB64url(cred.rawId),
        type: cred.type,
        response: {
          clientDataJSON: this.bufToB64url(resp.clientDataJSON),
          attestationObject: this.bufToB64url(resp.attestationObject),
        },
        clientExtensionResults: cred.getClientExtensionResults?.() || {},
      };
    },
    // #endif
  },
};
</script>

<style>
.container {
  padding: 24rpx;
}
.header {
  margin-top: 40rpx;
  margin-bottom: 24rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 600;
  text-align: center;
}
.tip {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx;
  margin: 12rpx 0;
  border: 1px solid #ffc107;
  background: #fff8e1;
  border-radius: 12rpx;
}
.tip-text {
  color: #8d6e63;
  font-size: 26rpx;
}
.actions {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
}
.loading-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-box {
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
}
.modal-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 80%;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}
.modal-title {
  font-size: 30rpx;
  font-weight: 600;
}
.modal-input {
  border: 1px solid #eee;
  margin: 16rpx 0;
  padding: 12rpx;
  border-radius: 8rpx;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12rpx;
}
</style>
```

---

## 说明与对接要点

- **后端路由**保持为：

  - `/passkeys/login/options` → 返回 `PublicKeyCredentialRequestOptions`（`challenge`/`allowCredentials[].id` 为 **base64url**）。
  - `/passkeys/login/verify` → 接收 `packAssertion` 结果。
  - `/passkeys/register-or-login/options` → 返回 `{ userId, options }`（注册用，`challenge`/`user.id` 为 **base64url**）。
  - `/passkeys/register-or-login/verify` → 接收 `packAttestation` + `{ userId, deviceIdentifier }`。

- **设备唯一**：页面已在所有请求体中带上 `deviceIdentifier`（`this.deviceId`），你的服务端即可写入/校验 `dvc:owner:*`。
- **H5 前置条件**：需 HTTPS 或 `localhost`；Safari/移动端有平台限制。
- **App 端**：确保 `@/uni_modules/pass-keys` 已实现 `getPasskey`/`createPasskey` 且返回 **JSON 字符串**（与我们前面约定一致）。

需要我把 **“已登录场景的绑定按钮”** 也加到这个页面吗（即 `/passkeys/register/options|verify`，走绑定而非 JIT）？如果要，加哪个位置，我按你“只给改动段”的规范再补。
