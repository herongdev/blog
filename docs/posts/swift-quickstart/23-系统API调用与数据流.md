---
title: Swift 入门（23）：系统API调用与数据流
date: 2025-09-17
categories: Swift
tags: [Swift, iOS, API, AuthenticationServices]
---

# Swift 入门（23）：系统 API 调用与数据流

> 本文专门讲解如何调用 iOS 系统 API，以 AuthenticationServices 框架的 Passkeys 实现为例，展示完整的数据流转和方法调用过程。

## 系统 API 调用的基本模式

### 典型的调用流程

```swift
// 1. 创建提供者（Provider）
let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: rpId)

// 2. 创建请求（Request）
let request = provider.createCredentialRegistrationRequest(
    challenge: fromB64url(challengeB64),
    name: userName,
    userID: fromB64url(userIdB64)
)

// 3. 创建控制器（Controller）
let controller = ASAuthorizationController(authorizationRequests: [request])

// 4. 配置控制器
controller.delegate = self
controller.presentationContextProvider = self

// 5. 存储回调
self.callback = cb

// 6. 执行请求
controller.performRequests()
```

## 逐步分解：类与方法详解

### 1. ASAuthorizationPlatformPublicKeyCredentialProvider

```swift
let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: rpId)
```

**类的作用**：

- 这是 Apple 提供的 **Passkeys 凭证提供者**
- 负责与系统的 Passkeys 存储进行交互
- `relyingPartyIdentifier` 是网站/应用的唯一标识符（如 "example.com"）

**初始化参数**：

```swift
// rpId 通常是域名，用于标识这个 Passkey 属于哪个网站
let rpId = "example.com"
let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: rpId)

// 实际数据示例
let rpId = "webauthn.example.com"  // 从服务器传来的 rp.id 字段
```

### 2. createCredentialRegistrationRequest 方法

```swift
let request = provider.createCredentialRegistrationRequest(
    challenge: fromB64url(challengeB64),  // Data 类型
    name: userName,                       // String 类型
    userID: fromB64url(userIdB64)        // Data 类型
)
```

**方法作用**：

- 创建一个 **注册请求**，用于生成新的 Passkey
- 将服务器提供的参数转换为系统可识别的格式

**参数详解**：

| 参数        | 类型     | 作用                     | 数据转换         |
| ----------- | -------- | ------------------------ | ---------------- |
| `challenge` | `Data`   | 防重放攻击的随机挑战码   | Base64URL → Data |
| `name`      | `String` | 用户标识符（通常是邮箱） | 直接使用         |
| `userID`    | `Data`   | 用户的唯一 ID            | Base64URL → Data |

#### 数据转换过程详解

```swift
// 服务器发送的原始数据（JSON）
let serverData = """
{
    "rp": {"id": "example.com"},
    "user": {
        "id": "dXNlcjEyMw==",           // Base64URL 编码的用户 ID
        "name": "alice@example.com",    // 用户邮箱
        "displayName": "Alice Smith"
    },
    "challenge": "Y2hhbGxlbmdl"         // Base64URL 编码的挑战码
}
"""

// 数据转换函数
func fromB64url(_ base64url: String) -> Data {
    // Base64URL → 标准 Base64 → Data
    var base64 = base64url
        .replacingOccurrences(of: "-", with: "+")
        .replacingOccurrences(of: "_", with: "/")

    // 添加填充
    let padding = (4 - base64.count % 4) % 4
    if padding > 0 {
        base64.append(String(repeating: "=", count: padding))
    }

    return Data(base64Encoded: base64) ?? Data()
}

// 实际转换过程
let challengeB64 = "Y2hhbGxlbmdl"              // 来自服务器
let challengeData = fromB64url(challengeB64)    // 转换为 Data
// challengeData = <63686161 6c6c656e 6765>     // "challenge" 的字节表示

let userIdB64 = "dXNlcjEyMw=="                 // 来自服务器
let userIdData = fromB64url(userIdB64)         // 转换为 Data
// userIdData = <75736572 313233>               // "user123" 的字节表示
```

### 3. ASAuthorizationController

```swift
let controller = ASAuthorizationController(authorizationRequests: [request])
```

**类的作用**：

- 这是 Apple 的 **授权控制器**
- 负责协调整个认证流程
- 管理用户界面的显示和用户交互

**初始化参数**：

```swift
// authorizationRequests 是一个数组，可以包含多个请求
let requests: [ASAuthorizationRequest] = [request]
let controller = ASAuthorizationController(authorizationRequests: requests)

// 也可以同时支持多种认证方式
let passkeyRequest = provider.createCredentialRegistrationRequest(...)
let passwordRequest = ASPasswordCredentialIdentity.init(...)
let allRequests = [passkeyRequest, passwordRequest]
let controller = ASAuthorizationController(authorizationRequests: allRequests)
```

### 4. 控制器配置

```swift
controller.delegate = self                      // 处理认证结果
controller.presentationContextProvider = self  // 提供显示窗口
self.callback = cb                             // 存储回调函数
```

#### delegate 的作用

```swift
// 当前类需要实现 ASAuthorizationControllerDelegate 协议
extension PasskeysManager: ASAuthorizationControllerDelegate {

    // 认证成功时调用 - 完整实现
    public func authorizationController(controller: ASAuthorizationController,
                                      didCompleteWithAuthorization authorization: ASAuthorization) {
        defer {
            self.callback = nil  // 确保回调被清理
        }

        if #available(iOS 16.0, *) {
            // 注册结果 → WebAuthn Create 格式
            if let reg = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialRegistration {
                let id = b64url(reg.credentialID)
                let data: [String: Any] = [
                    "id": id,
                    "rawId": id,
                    "type": "public-key",
                    "response": [
                        "attestationObject": b64url(reg.rawAttestationObject),
                        "clientDataJSON": b64url(reg.rawClientDataJSON)
                    ],
                    "transports": ["internal"]
                ]
                self.callback?(self.toJSON(["ok": true, "data": data]))
                return
            }

            // 登录结果 → WebAuthn Get 格式
            if let asr = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialAssertion {
                let id = b64url(asr.credentialID)
                let data: [String: Any] = [
                    "id": id,
                    "rawId": id,
                    "type": "public-key",
                    "response": [
                        "authenticatorData": b64url(asr.rawAuthenticatorData),
                        "clientDataJSON": b64url(asr.rawClientDataJSON),
                        "signature": b64url(asr.signature),
                        "userHandle": b64url(asr.userID)
                    ]
                ]
                self.callback?(self.toJSON(["ok": true, "data": data]))
                return
            }

            // 未知的凭证类型
            self.callback?(self.toJSON(["ok": false, "errMsg": "unsupported credential type"]))
        } else {
            // iOS 版本不支持
            self.callback?(self.toJSON(["ok": false, "errMsg": "iOS 16+ required"]))
        }
    }

    // 认证失败时调用
    func authorizationController(controller: ASAuthorizationController,
                               didCompleteWithError error: Error) {
        let result = ["ok": false, "errMsg": error.localizedDescription]
        callback?(toJSON(result))
        callback = nil
    }
}
```

#### 成功回调的详细分析

**1. 双重类型检查模式**

```swift
// 第一层：版本检查
if #available(iOS 16.0, *) {

    // 第二层：凭证类型检查
    if let reg = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialRegistration {
        // 处理注册结果
    } else if let asr = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialAssertion {
        // 处理登录结果
    } else {
        // 未知类型
    }

} else {
    // 版本不支持
}
```

**2. 数据转换流程**

```swift
// iOS 系统对象 → WebAuthn 标准格式

// 注册场景的数据转换
let reg = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialRegistration

// 系统数据
reg.credentialID           // Data 类型
reg.rawAttestationObject   // Data? 类型
reg.rawClientDataJSON      // Data 类型

// 转换为前端期望格式
let data = [
    "id": b64url(reg.credentialID),                    // Data → Base64URL
    "rawId": b64url(reg.credentialID),                 // Data → Base64URL
    "type": "public-key",                              // 固定值
    "response": [
        "attestationObject": b64url(reg.rawAttestationObject),  // Data? → Base64URL
        "clientDataJSON": b64url(reg.rawClientDataJSON)         // Data → Base64URL
    ],
    "transports": ["internal"]                         // 固定值，表示平台内置
]
```

**3. 两种认证场景的区别**

| 场景     | 系统类型                                                 | 关键数据                         | 用途             |
| -------- | -------------------------------------------------------- | -------------------------------- | ---------------- |
| **注册** | `ASAuthorizationPlatformPublicKeyCredentialRegistration` | `attestationObject`              | 创建新的 Passkey |
| **登录** | `ASAuthorizationPlatformPublicKeyCredentialAssertion`    | `signature`, `authenticatorData` | 验证已有 Passkey |

```swift
// 注册场景 - 创建新凭证
if let reg = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialRegistration {
    // 包含证明对象，用于服务器验证设备的合法性
    "attestationObject": b64url(reg.rawAttestationObject)
}

// 登录场景 - 验证已有凭证
if let asr = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialAssertion {
    // 包含签名数据，用于服务器验证用户身份
    "signature": b64url(asr.signature),
    "authenticatorData": b64url(asr.rawAuthenticatorData),
    "userHandle": b64url(asr.userID)
}
```

**4. b64url 函数的作用**

```swift
// 将 iOS 系统的 Data 对象转换为 WebAuthn 标准的 Base64URL 格式
func b64url(_ data: Data?) -> String {
    guard let data = data else { return "" }

    return data.base64EncodedString()
        .replacingOccurrences(of: "+", with: "-")
        .replacingOccurrences(of: "/", with: "_")
        .replacingOccurrences(of: "=", with: "")
}

// 使用示例
let credentialId = reg.credentialID                    // Data
let base64urlId = b64url(credentialId)                // Base64URL String
// "dXNlcjEyMw" （URL 安全的编码格式）
```

**5. 错误处理的层次**

```swift
// 层次1：版本兼容性错误
if #available(iOS 16.0, *) {
    // 支持的版本
} else {
    callback?(toJSON(["ok": false, "errMsg": "iOS 16+ required"]))
}

// 层次2：凭证类型错误
if let reg = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialRegistration {
    // 已知类型
} else {
    callback?(toJSON(["ok": false, "errMsg": "unsupported credential type"]))
}

// 层次3：系统级错误（在 didCompleteWithError 中处理）
func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
    callback?(toJSON(["ok": false, "errMsg": error.localizedDescription]))
}
```

#### presentationContextProvider 的作用

```swift
// 提供显示认证界面的窗口
extension PasskeysManager: ASAuthorizationControllerPresentationContextProviding {

    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        // 返回当前活跃的窗口
        return UIApplication.shared.windows.first { $0.isKeyWindow } ?? UIWindow()
    }
}
```

### 5. performRequests() 执行

```swift
controller.performRequests()
```

**方法作用**：

- 启动整个认证流程
- 这是一个 **异步方法**，会立即返回
- 实际的认证结果通过 delegate 方法返回

## 完整的数据流转过程

### 输入数据（来自前端/服务器）

```swift
// 1. 前端发送 JSON 字符串
let optionsJson = """
{
    "rp": {
        "id": "example.com",
        "name": "Example Corp"
    },
    "user": {
        "id": "dXNlcjEyMw==",
        "name": "alice@example.com",
        "displayName": "Alice Smith"
    },
    "challenge": "Y2hhbGxlbmdl",
    "pubKeyCredParams": [
        {"type": "public-key", "alg": -7}
    ]
}
"""
```

### 数据解析与转换

```swift
// 2. 解析 JSON
guard let data = optionsJson.data(using: .utf8),
      let options = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
      let rp = options["rp"] as? [String: Any],
      let rpId = rp["id"] as? String,
      let user = options["user"] as? [String: Any],
      let userIdB64 = user["id"] as? String,
      let userName = user["name"] as? String,
      let challengeB64 = options["challenge"] as? String else {
    return
}

// 3. Base64URL 解码
let challengeData = fromB64url(challengeB64)  // "Y2hhbGxlbmdl" → <challenge bytes>
let userIdData = fromB64url(userIdB64)        // "dXNlcjEyMw==" → <user123 bytes>
```

### 系统 API 调用

```swift
// 4. 创建系统对象
let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: rpId)
let request = provider.createCredentialRegistrationRequest(
    challenge: challengeData,    // Data 类型
    name: userName,              // "alice@example.com"
    userID: userIdData          // Data 类型
)

// 5. 配置并执行
let controller = ASAuthorizationController(authorizationRequests: [request])
controller.delegate = self
controller.presentationContextProvider = self
controller.performRequests()  // 异步执行
```

### 输出数据（返回给前端）

```swift
// 6. 在 delegate 方法中处理结果
func authorizationController(controller: ASAuthorizationController,
                           didCompleteWithAuthorization authorization: ASAuthorization) {

    if let credential = authorization.credential as? ASAuthorizationPlatformPublicKeyCredentialRegistration {

        // 提取系统返回的数据
        let credentialId = credential.credentialID                    // Data
        let attestationObject = credential.rawAttestationObject       // Data?
        let clientDataJSON = credential.rawClientDataJSON            // Data

        // 转换为前端期望的格式
        let response = [
            "ok": true,
            "id": credentialId.base64EncodedString(),                           // Data → Base64
            "rawId": credentialId.base64EncodedString(),                        // Data → Base64
            "type": "public-key",
            "response": [
                "attestationObject": attestationObject?.base64EncodedString() ?? "",  // Data → Base64
                "clientDataJSON": clientDataJSON.base64EncodedString()                // Data → Base64
            ]
        ]

        // 返回 JSON 字符串
        callback?(toJSON(response))
    }
}
```

## 常见问题与注意事项

### 1. iOS 版本兼容性

```swift
// Passkeys 需要 iOS 16+
@available(iOS 16.0, *)
func createPasskey() {
    let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: rpId)
    // ...
}

// 版本检查
if #available(iOS 16.0, *) {
    createPasskey()
} else {
    callback?(toJSON(["ok": false, "errMsg": "iOS 16+ required"]))
}
```

### 2. 错误处理

```swift
// 常见错误类型
func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
    let errorMessage: String

    if let authError = error as? ASAuthorizationError {
        switch authError.code {
        case .canceled:
            errorMessage = "用户取消了认证"
        case .invalidResponse:
            errorMessage = "无效的响应"
        case .notHandled:
            errorMessage = "认证未处理"
        case .failed:
            errorMessage = "认证失败"
        default:
            errorMessage = "未知错误: \(error.localizedDescription)"
        }
    } else {
        errorMessage = error.localizedDescription
    }

    callback?(toJSON(["ok": false, "errMsg": errorMessage]))
}
```

### 3. 内存管理

```swift
// 避免循环引用
class PasskeysManager {
    private var callback: ((String) -> Void)?

    func register(_ options: String, _ cb: @escaping (String) -> Void) {
        self.callback = cb
        // ... 执行认证
    }

    // 在 delegate 方法中清理回调
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        // 处理结果
        callback?(result)
        callback = nil  // 重要：清理引用
    }
}
```

## 小结

- **系统 API 调用**遵循：Provider → Request → Controller → Execute 的模式
- **数据转换**是关键：Base64URL ↔ Data ↔ 系统对象
- **异步处理**：通过 delegate 模式处理结果
- **错误处理**：统一的错误模型和版本兼容性检查
- **内存管理**：及时清理回调引用，避免内存泄漏

这种模式在 iOS 开发中极其常见，掌握了这个流程，你就能轻松调用其他系统 API！
