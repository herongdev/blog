---

title: Ant Design Upload：beforeUpload 与 onChange 的先后顺序、影响时机与三次触发全梳理
date: 2025-09-28
tags:

* Ant Design
* Upload
* 文件上传
* 前端实践

---

## 总览结论（TL;DR）

- **时序**（自动上传场景）：
  ① 用户选文件 → ② `beforeUpload`（可返回 false/Promise） → ③ `transformFile`（若配置）→ ④ 发起请求（或 `customRequest`）→ ⑤ `onChange`（`uploading/0%`）→ ⑥ `onChange`（进度多次，含 `100%`）→ ⑦ `onChange`（`done`/`error`，含 `response`）。
- **第二次 `onChange`**（你看到的 100% 但尚未 `done`）是 **XHR 进度事件**触发；
  文件的 **类型/体积变化** 来自 **`beforeUpload/transformFile` 的压缩或转码**，通常在**发请求前**就已发生，因此第二次日志里会看到“已被替换后的文件信息”。
- **影响时机**：

  - **阻止上传**：`beforeUpload` 返回 `false`（仍可进文件列表，需手动上传）。
  - **替换文件**：`beforeUpload` 返回 `Promise<File|Blob>` 或配置 `transformFile`，在**请求前**完成替换；后续 `onChange` 里拿到的就是**替换后的文件**。

---

## 事件顺序与分支详解

### 1) 选择文件

- 组件捕获到文件对象，准备进入上传管线。

### 2) `beforeUpload(file, fileList)`

- **调用时机**：**在任何网络请求发送前**。
- **用途**：校验、拦截、改名、异步压缩/转码（也可放到 `transformFile`）。
- **返回值语义**：

  - `false`：**阻止自动上传**。文件通常仍会进列表（取决于框架/版本配置），你需要自行触发上传。
  - `Promise<File|Blob>`：**用返回值替换原文件**（常用于压缩、改格式）。
  - `true | void`：继续后续流程（保持原文件或交由 `transformFile` 处理）。

### 3) `transformFile(file)`（若配置）

- **调用时机**：`beforeUpload` 之后、请求之前。
- **典型用途**：**统一处理二次转换**（如图片压缩、EXIF 纠正、格式转换）。
- **返回值**：`File|Blob|Promise<...>`，**最终进入请求体**的就是这里的返回值。
- **与 `beforeUpload` 的关系**：可二选一或同时使用；**先前的替换会成为这里的入参**。

### 4) 发起请求（或 `customRequest`）

- 由组件内部或你的 `customRequest` 完成实际的 XHR/Fetch 上传。

### 5) `onChange` —— 初始入列

- **状态**：`status: 'uploading'`，`percent: 0`（或极低）。
- **文件对象**：此时**已是替换后的文件**（若前面有压缩/转码）。
- **作用**：你可同步 `fileList`，轻量更新 UI。

### 6) `onChange` —— 进度更新（多次）

- **状态**：`status: 'uploading'`，`percent` 逐步变化，**可能到 `100%`**。
- **触发源**：XHR 的 `progress` 事件；**100% 仅代表字节发完**，不等于服务端完成处理。
- **你此前的场景**：**第二次日志**就是这一类（`percent: 100`，仍是 `'uploading'`）。

### 7) `onChange` —— 完成/失败

- **状态**：`status: 'done'`（成功，带 `response`）或 `status: 'error'`。
- **操作**：解析返回结构、写回 `url/thumbUrl`、提示成功；失败则统一错误提示。

---

## 与你上次问题的“合并总结”

- **为什么三次日志？**
  入列（`uploading/0%`）→ 进度（`uploading/100%`）→ 完成（`done`）。
- **第二次到底是谁触发？**
  **XHR 进度**；**压缩只改变文件属性**，不直接触发 `onChange`，但会影响你在第二次日志里看到的 `type/size`。
- **`png → jpeg` 与体积骤降**？
  来自 **`beforeUpload/transformFile` 的替换**。
- **链接后缀与真实 MIME 不一致**？
  多由后端命名策略导致，功能不受影响；如需一致性，与服务端约定统一策略。

---

## 最小代码补强（仅给“需要修改”的片段）

```ts
// 复杂逻辑：在 transform/beforeUpload 阶段给替换后的文件打标，便于 onChange 溯源
const transformFile = async (origin: File) => {
  const out = await maybeCompressToJPEG(origin); // 你的压缩逻辑
  (out as any).__fromTransform = true;
  return out;
};
```

```ts
// 复杂逻辑：在 onChange 顶部增加一行调试，区分来源与阶段
console.log("[trace]", {
  uid: file.uid,
  status: file.status,
  percent: file.percent,
  type: (file as any).type,
  size: (file as any).size,
  replaced: (file as any).__fromTransform === true, // 是否被替换
  hasResponse: !!(file as any).response, // 是否已有服务端响应
});
```

```ts
// 复杂逻辑：完成态才做业务写回，避免在进度阶段反复抖动 UI
if (file.status === "done") {
  const rawUrl =
    (file.response as any)?.data?.file_path ?? (file.response as any)?.url;
  if (rawUrl) {
    const url = props.transformResponse
      ? props.transformResponse(rawUrl)
      : rawUrl;
    _fileList.value = fileList.map((f) =>
      f.uid === file.uid ? { ...f, url, thumbUrl: url } : f
    );
    window.GtcNotification(
      "success",
      t("components.fileUpload.upload-success", { fileName: file.name })
    );
  } else {
    _fileList.value = fileList.map((f) =>
      f.uid === file.uid
        ? { ...f, status: "error", response: "Invalid response format" }
        : f
    );
    window.GtcNotification(
      "error",
      t("components.fileUpload.upload-failed", {
        fileName: file.name,
        error: t("components.fileUpload.invalid-response-format"),
      })
    );
  }
}
```

---

## 常见陷阱与建议

- **陷阱 1：在 `uploading` 阶段做重业务** → UI 抖动/多次覆盖。
  **建议**：进度阶段只做轻量同步；**完成态**（`done`）再写业务字段。
- **陷阱 2：混淆“进度 100%”与“完成”**。
  **建议**：以 `status` 判定阶段；`percent=100` 仍是 `uploading`。
- **陷阱 3：不知道替换发生了没**。
  **建议**：对替换后的文件**打标**（如 `__fromTransform`），在 `onChange` 打印查看。
- **陷阱 4：服务端返回结构不稳**。
  **建议**：抽取统一的 `extractUrl` 方法，兼容 `data.file_path`/`url` 等不同格式。

---

## 调试清单（Checklist）

- 在 `beforeUpload/transformFile` 里为返回文件加 `__fromTransform=true`。
- 在 `onChange` 打印：`status/percent/type/size/response/replaced`。
- 仅在 `done` 分支解析 `response` 并更新 `url/thumbUrl`。
- 若使用 `customRequest`，确保也按上述时序调用 `onProgress/onSuccess/onError`。

---

## 参考时序（可打印验证）

```
选择文件
  ↳ beforeUpload (可返回 false / Promise)
  ↳ transformFile (如配置)
  ↳ 发起请求（或 customRequest）
      ↳ onChange: uploading, 0%
      ↳ onChange: uploading, ...%, 100%
      ↳ onChange: done / error（含 response）
```

> 如果 `beforeUpload` 返回 `false`：**不会自动发请求**；文件可进列表但**不会进入后续进度与完成态**，需要你手动触发上传（方式依框架/版本而异）。
