---
title: Swift 模块化编程速成：以 PasskeysNative 为例
date: 2025-09-17
tags: [ios, swift, 模块化]
---

# 你将收获

- 如何为 iOS 代码划清**模块边界**，只暴露稳定的 **Public API**。
- 选择 **Swift Package** / **XCFramework** 输出形态，以及最小可行的集成步骤。
- 设计**输入输出契约**（JSON 入参与回调），稳定错误模型与平台兼容策略。
- 进阶：协议抽象、依赖倒置、可测试性、并发模型、二进制分发与文档化。

---

# 场景设定：把 `PasskeysNative` 做成可复用模块

你的类大致长这样（节选，便于说明；不复述完整代码）：

```swift
@objc public class PasskeysNative: NSObject, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    // ... JSON / Base64url 工具方法（internal/private）
    // ... @objc public func register(_ optionsJson: String, _ cb: @escaping (String) -> Void)
    // ... @objc public func authenticate(_ optionsJson: String, _ cb: @escaping (String) -> Void)
    // ... ASAuthorizationControllerDelegate 回调
}
```

> 目标：把它抽为 **独立模块**，对外只暴露 `register(optionsJson, cb)` 与 `authenticate(optionsJson, cb)`，内部细节（Base64 工具、iOS 16+ 适配、系统回调）全部**隐藏**。

# 第一部分 · 最常用最重要（先用起来）

## 1. 划定模块边界与对外 API

**原则**：

- 仅把**稳定能力**标注为 `public` / `@objc` 暴露给上层（UTS/JS 桥）。
- 细节工具与策略（Base64url、JSON 解析、错误组装）一律 `internal`/`private`。
- **输入**：`optionsJson`（WebAuthn 标准字段，经由前端/服务器下发）。
- **输出**：统一的回调 JSON：`{"ok": true, "data": {...}} | {"ok": false, "errMsg": "..."}`。

**建议 API（示意）**：

```swift
@objc public protocol PasskeysAPI {
    // 复杂：跨语言回调形态与线程切换
    // ↑ 在复杂逻辑上一行加注释
    func register(_ optionsJson: String, _ cb: @escaping (String) -> Void)
    func authenticate(_ optionsJson: String, _ cb: @escaping (String) -> Void)
}
```

> 说明：把协议放在模块 `Public` 目录，类 `PasskeysNative` 作为默认实现，后续可无痛替换（比如接入外部安全 Key 的实现）。

## 2. 产物类型：Swift Package vs XCFramework（怎么交付）

**Swift Package（首选）**

- 优点：源码分发、版本化清晰、集成简单（Xcode/SwiftPM 原生支持）。
- 适合团队内部与持续演进。

**XCFramework（二进制）**

- 优点：隐藏源码、冷启动更快、适合跨项目/商业分发。
- 用法：`xcodebuild -create-xcframework -framework ... -output Passkeys.xcframework`。

> 推荐：**先 SwiftPM，后期有保密/性能诉求再补二进制 XCFramework**。

## 3. 输入输出契约（最易踩坑的地方）

- **输入**：`PublicKeyCredentialCreationOptions` / `RequestOptions` 的**对象本体**（不是 `{ publicKey: {} }` 外包一层）。
- **字段**：`rp.id`、`challenge`、`user.id`/`user.name`、`rpId` 等必须存在。
- **编码**：二进制字段（`challenge`、`user.id`、`rawId`等）统一 **Base64URL**。
- **输出**：遵循 WebAuthn 前端预期形态（`id/rawId/type/response/...`）。
- **错误**：固定 `ok/errMsg` 键，便于前端/UTS 无分支解析。

> 小贴士：JSON 序列化失败、必填字段缺失、平台版本不符，**都走同一错误模型**，前端体验最稳定。

## 4. 平台/版本兼容策略（iOS 16+）

- `ASAuthorizationPlatformPublicKeyCredential*` 需要 **iOS 16+**。
- 在 API 内部用 `#available(iOS 16.0, *)` **短路返回**统一错误（`"iOS 16+ required"`）。
- 不把平台细节泄露到 API 边界之外（对外只看 `ok/errMsg`）。

## 第二部分 · 深入与难点（架构/工程化）

### A. 面向协议的抽象与依赖倒置

- **问题**：未来可能接入 FIDO 外置 Key、模拟器桩件或切换到不同系统 API。
- **做法**：抽象协议并**依赖接口**而非具体类。

```swift
// 复杂：抽象系统提供者，便于注入 mock 与多实现
// ↑ 在复杂逻辑上一行加注释
protocol CredentialProvider {
    func makeRegistrationRequest(rpId: String, challenge: Data, userName: String, userId: Data) -> ASAuthorizationRequest
    func makeAssertionRequest(rpId: String, challenge: Data) -> ASAuthorizationRequest
}
```

> `PasskeysNative` 通过构造函数接收 `CredentialProvider`，测试时注入 **FakeProvider**。

### B. 并发模型：从回调到 async/await（可选）

- 门面层保留回调（兼容跨语言），**内部**可封装为 `async`：

  - 回调转 `CheckedContinuation`。
  - 上层 Swift 调用者可获得 `let result = try await client.register(options:)` 的良好体验。
  - 对外仍只暴露回调方法，保持跨语言稳定。

### C. 错误域与分类

- 自定义 `PasskeysError: Error`，内部归类：

  - `.invalidOptions(field: String)`、`.platformUnsupported(min: "iOS16")`、`.system(Error)`、`.encoding`。

- **统一映射**到 `errMsg` 字符串，**不上抛内部类型**到跨语言边界。

### D. 跨语言边界与可见性

- 需要 `@objc` + `NSObject` + `public` 才能被 UTS/JS 调用。
- 注意 `nullability` 与 Swift/ObjC 桥接（`String?` / `Data?`）。
- `JSONSerialization` 用 `try?` + 可控的默认值**收口错误**。

## E. 测试策略

- **单测**：

  - Base64URL 编解码（空输入、无填充、多填充）。
  - JSON 契约（必填字段缺失 → 错误）。
  - iOS16 可用性分支。

- **组件测试**：

  - 用 Fake `CredentialProvider` 模拟成功/失败/取消回调。

- **UI/集成**：

  - 最小 Demo App 调通真实设备的注册/登录流程。

## F. 工程化：版本与分发

- **语义化版本**：`MAJOR.MINOR.PATCH`。

  - 修改 JSON 字段 →**MAJOR**。
  - 新增字段（向后兼容）→**MINOR**。
  - 修复/优化 →**PATCH**。

- **二进制分发**（可选）：出 `*.xcframework` + 校验脚本（`codesign --verify`）。

## G. 文档化与可发现性

- 用 **DocC** 为 `PasskeysAPI` 生成文档；
- 在包内提供 `Examples/`，含最小调用样例与 JSON 模版。

---

# 目录结构建议（可直接照搬）

```
PasskeysKit/
├─ Package.swift
├─ Sources/
│  └─ PasskeysKit/
│     ├─ Public/
│     │  ├─ PasskeysAPI.swift
│     │  └─ PasskeysErrors.swift
│     └─ Internal/
│        ├─ PasskeysNative.swift
│        ├─ CredentialProvider.swift
│        ├─ Base64URL.swift
│        └─ JSONCoder.swift
└─ Tests/
   └─ PasskeysKitTests/
      ├─ Base64URLTests.swift
      ├─ OptionsParsingTests.swift
      └─ PlatformAvailabilityTests.swift
```

---

# 模块化落地清单（Checklist）

- [ ] Public API **最小化**，仅暴露 `register/authenticate`。
- [ ] 输入/输出 JSON 契约文档齐全，错误模型统一。
- [ ] `#available(iOS 16, *)` 在内部**短路**，不外泄平台细节。
- [ ] SwiftPM 集成通过；必要时补 XCFramework。
- [ ] 协议抽象 + 依赖注入，测试可控。
- [ ] 版本语义化与变更日志。
- [ ] DocC 文档与 `Examples/` 示例齐备。

---

# 常见坑位与规避

- **Base64URL** 填充处理：注意 `=` 去/补；空字符串与非法字符要兜底为空 `Data()`。
- **回调置空**：一次请求结束后 `callback = nil`，避免多次触发或悬挂引用。
- **线程语义**：系统回调不保证在主线程；UI 更新前**切主线程**。
- **`presentationAnchor`**：确保返回 **keyWindow**；多场景时注意窗口切换。
- **版本分支**：把 `iOS 16+` 检查放在**最前**，尽早失败、错误可预期。
- **跨语言兼容**：`@objc public` 与 `NSObject` 继承别漏；字符串编码用 UTF-8。

---

# 结语

把功能做成**小而稳的模块**，先对外统一契约，再在内部迭代实现，是 Swift/iOS 项目长期可维护的关键。你现在的 `PasskeysNative` 已经很接近理想门面：**只需把工具与系统细节收入 Internal，把 API 抽到 Public 协议里**，就能在不破坏上层调用的前提下，持续演进到更专业的工程形态。
