---
title: 一个 downloadFile 就够了：直链与鉴权下载自动切换（Vue/TS）
date: 2025-09-06 15:13:25
tags: [前端, 下载, TypeScript, Fetch]
---

## 需求背景

- 有的文件**公开直链**，直接点就能下；
- 有的需要**携带 Cookie/Token、自定义 Header 或用 POST** 才能拿到二进制流；
- 我们希望**一个函数**即可应对两类场景，并自动选择最优策略。

## 设计要点

- **优先直链（a.click）**：不加 header/body/credentials 时，直接跳转下载；
- **按需请求（fetch→Blob）**：当需要鉴权/自定义 Header/POST，先拿 Blob，再用 Object URL 触发下载；
- **文件名解析**：未显式传 `fileName` 时，尝试从 `Content-Disposition` 读取；
- **内存友好**：使用 Object URL 并及时 `URL.revokeObjectURL`。

## 代码

```ts
export type DownloadOptions = Omit<RequestInit, "signal"> & {
  fileName?: string;
  forceRequest?: boolean;
};

function _pickNameFromContentDisposition(
  cd: string | null
): string | undefined {
  if (!cd) return;
  const star = cd.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
  const norm = cd.match(/filename=([^;]+)/i);
  const raw = (star?.[1] ?? norm?.[1])?.trim().replace(/^["']|["']$/g, "");
  try {
    return raw ? decodeURIComponent(raw) : undefined;
  } catch {
    return raw;
  }
}

export async function downloadFile(url: string, options: DownloadOptions = {}) {
  const { fileName, forceRequest, ...req } = options;
  const needRequest =
    !!forceRequest ||
    (req.method && req.method.toUpperCase() !== "GET") ||
    !!req.headers ||
    !!req.body ||
    !!req.credentials;

  if (!needRequest) {
    const a = document.createElement("a");
    a.href = url;
    if (fileName) a.download = fileName; // 跨域直链可能被忽略
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  const res = await fetch(url, req);
  if (!res.ok)
    throw new Error(`Download failed: ${res.status} ${res.statusText}`);

  let name =
    fileName ??
    _pickNameFromContentDisposition(res.headers.get("content-disposition"));
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = href;
  if (name) a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(href);
}
```

## 使用示例

### 直链（公开资源）

```ts
await downloadFile("https://cdn.example.com/file.pdf", {
  fileName: "文档.pdf",
});
```

### 携带 Cookie/Token

```ts
await downloadFile("/api/report/export", {
  credentials: "include",
  headers: { Authorization: "Bearer xxx" },
  fileName: "报表.xlsx",
});
```

### POST 导出

```ts
await downloadFile("/api/export", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: "Bearer xxx" },
  body: JSON.stringify({ range: "2025-01-01~2025-09-01" }),
  fileName: "导出.csv",
});
```

## 注意事项

- **跨域直链**时，浏览器可能**忽略 `download` 文件名**，以服务器或默认名为准；
- 如需强制走请求分支，可传 `forceRequest: true`；
- 服务器若返回 `Content-Disposition`，无需传 `fileName` 也能自动命名；
- 大文件下载建议结合服务端分片/断点续传方案（本函数仅负责触发下载）。
