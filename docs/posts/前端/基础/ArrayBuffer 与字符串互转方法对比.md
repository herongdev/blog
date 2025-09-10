---
title: ArrayBuffer 与字符串互转方法对比
date: 2025-09-10
categories: 前端开发
tags: [JavaScript, ArrayBuffer, TextDecoder, 编码]
---

# ArrayBuffer 与字符串互转方法对比

在前端开发中，处理二进制数据时经常会遇到 **ArrayBuffer**。如果需要和字符串互转，可以使用多种方式。本文整理了常见方案，并给出对比。

## 1. 使用 TextDecoder / TextEncoder （推荐）

### 思路

- `TextEncoder`：将字符串转为 `Uint8Array`（底层是 `ArrayBuffer`）。
- `TextDecoder`：将 `ArrayBuffer` 解码为字符串。

### 示例

```js
// 字符串 -> ArrayBuffer
const encoder = new TextEncoder();
const uint8 = encoder.encode("你好，世界");
const buffer = uint8.buffer;

// ArrayBuffer -> 字符串
const decoder = new TextDecoder("utf-8");
const text = decoder.decode(buffer);
console.log(text); // 你好，世界
```

✅ 特点：支持多种编码（UTF-8、GBK 等），最标准化。
❌ 缺点：在老旧浏览器可能不支持。

## 2. 使用 JSON + Buffer（适合传输 JSON 数据）

### 示例

```js
// 对象 -> ArrayBuffer
const obj = { msg: "Hello" };
const str = JSON.stringify(obj);
const uint8 = new TextEncoder().encode(str);

// ArrayBuffer -> 对象
const text = new TextDecoder().decode(uint8);
const data = JSON.parse(text);
console.log(data.msg); // Hello
```

✅ 特点：适合结构化数据传输。
❌ 缺点：仅适合 JSON 格式。

## 3. 使用 base64 中转（跨语言兼容）

### 示例

```js
// ArrayBuffer -> base64 -> 字符串
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// base64 -> ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}
```

✅ 特点：跨平台、跨语言兼容。
❌ 缺点：编码后体积会增加 \~33%。

## 4. 手工遍历 Uint8Array

### 示例

```js
// ArrayBuffer -> 字符串（逐字节转码）
function bufferToString(buffer) {
  const bytes = new Uint8Array(buffer);
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return result;
}

// 字符串 -> ArrayBuffer
function stringToBuffer(str) {
  const buffer = new ArrayBuffer(str.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return buffer;
}
```

✅ 特点：无依赖，浏览器通用。
❌ 缺点：只适合 ASCII，遇到中文/emoji 会乱码。

---

# 总结对比

| 方法                    | 优点                 | 缺点             | 适用场景        |
| ----------------------- | -------------------- | ---------------- | --------------- |
| **TextDecoder/Encoder** | 标准化，支持多种编码 | 老旧浏览器不支持 | 现代前端项目    |
| **JSON + Buffer**       | 简单，适合对象       | 限制于 JSON 格式 | 结构化数据      |
| **base64**              | 跨语言兼容           | 数据体积膨胀     | 网络传输，存储  |
| **手工遍历**            | 通用，无依赖         | 中文乱码         | 简单 ASCII 数据 |

---

💡 **最佳实践**：

- 处理文本 → 推荐 **TextDecoder/Encoder**
- 传输 JSON → 用 **JSON.stringify + TextEncoder**
- 跨语言通信 → 用 **base64**
