---
title: Ant Design Upload：不自动也不手动上传时，onChange 还会触发吗？
date: 2025-09-28
tags: [Ant Design, beforeUpload]
---

## 结论（TL;DR）

- **会触发**，但**只会在“列表变化”相关的节点触发**（如：选择文件加入列表、从列表移除文件）。
- **不会触发与网络请求相关的节点**（进度、成功、失败），因为根本没有发起上传。

---

## 触发规则一览

- ✅ **文件被选中加入 `fileList`** → 触发 `onChange`（通常 `status: 'uploading'` 或由实现决定，反正**没有进度与响应**）。
- ✅ **移除文件**（点击删除按钮或你手动更新 `fileList`）→ 触发 `onChange`。
- ❌ **上传进度**（`percent` 变化）→ 不会发生。
- ❌ **完成/失败**（`done`/`error`，带 `response`）→ 不会发生。

> 说明：`onChange` 的语义是“**上传组件内部的文件列表或状态发生变化**”，并不等同于“网络上传事件”。只要**列表变了**（增/删/替换），就会触发一次。

---

## 常见场景与表现

### 场景 A：`beforeUpload={() => false}`（阻止自动上传）

- 选择文件时：**会触发一次 `onChange`**（文件进入列表）。
- 不会有进度与完成态，因为没有上传。
- 你可以在 `onChange` 里拿到 `file.originFileObj` 自行处理（比如本地预览、转码、再走你自定义的上传逻辑）。

### 场景 B：完全手动控制 `fileList`

- 选择文件时：同样**会触发 `onChange`**（加入列表）。
- 之后只有当你**自己变更 `fileList`**（添加/移除/替换）才会再次触发。
- 只要你**不触发上传请求**，就不会有进度/完成回调。

---

## 开发建议（最小实践）

```ts
// 复杂逻辑：阻止自动上传，仅用于把文件放进列表 + onChange 通知你
const beforeUpload = () => false;
```

```ts
// 复杂逻辑：在 onChange 中仅处理“列表变化”而非“上传进度”
const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
  // 列表同步
  _fileList.value = fileList;

  // 没有发起上传时，不会出现 percent/response，这里避免做进度/完成相关逻辑
  console.log("[picked]", {
    name: file.name,
    status: file.status, // 可能是 'uploading' 或实现相关的状态；不可靠用它判断“是否已上传”
    percent: file.percent, // 基本为 undefined
    hasResponse: !!(file as any).response, // false
  });

  // 如果你要“手动上传”，此处触发你的自定义上传流程（例如自行发起请求）
  // uploadManually(file.originFileObj)
};
```

> 提示：**不要依赖 `status` 来判断“是否上传完成”**（在阻止上传的场景里它没有语义保证）。
> 更稳妥的方式是：**以是否存在 `response`（或你自定义的成功标记）为准**。

---

## 配套知识点回顾（结合上次总结）

- **时序**（自动上传）：选择 → `beforeUpload` → `transformFile`（若有）→ 发请求 → `onChange(uploading/0%)` → `onChange(…/100%)` → `onChange(done/error)`
- **第二次 100% 日志**通常来自 **XHR 进度事件**；
  文件从 `png → jpeg`、体积骤降属于 **`beforeUpload/transformFile` 的“前置替换”** 导致的属性变化。
- **不上传的场景**：仍会在**选择/删除**时触发 `onChange`，但**不会**有进度、完成态。

---

## 调试清单（适用于“禁用自动上传”）

- 在 `onChange` 打印：`file.name/status/percent/response`，确认**仅有列表变化**的触发。
- 若你在 `beforeUpload` 做了压缩/转码并返回新 `File`，可给返回对象打标（如 `__fromTransform=true`）方便在 `onChange` 溯源。
- 只有当你**真正发起上传请求**（无论是组件自动还是你手动）时，才会出现**进度与完成**相关的 `onChange` 触发。
