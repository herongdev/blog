---
title: 自动上传 & 文件必填：业界最佳校验实践全案（Ant Design Upload 适用）
date: 2025-09-28
tags: []
---

## 总体目标（TL;DR）

- **用户心智一致**：界面显式告诉用户“必须成功上传至少 1 个文件”。
- **状态可见**：进度、失败、成功三类状态清晰分层；错误总是可定位到**具体文件**。
- **提交可控**：**禁止在“无成功文件”时提交**；存在失败文件时提供“一键清除失败并重传”。
- **工程稳健**：以**`status==='done'`** 为唯一成功标准；忽略 `percent=100`；容错后端返回结构。

---

## 设计原则

1. **成功定义唯一化**：只认 `status==='done'`（拿到后端响应且解析成功）。
2. **错误优先级高于必填**：只要列表中存在 `error`，先报“上传失败”；没有错误再判断“必填”。
3. **校验与 UI 同步**：错误既体现在表单校验红框，也体现在文件项的错误提示（`file.response`/`file.error?.message`）。
4. **异步一致性**：上传中（`uploading`）不视为满足必填；禁止提交按钮或通过表单校验。
5. **可恢复性**：提供“**清除失败文件**”与“**重试**”操作；支持批量重试。
6. **可配置语义**：必填语义明确为“**至少成功上传 1 个**”，不等价于“已选择”。

---

## 状态机与用户路径

- `empty`（初始无文件）
- `uploading(n)`（n 个文件上传中）
- `done(k)`（k≥1 成功）
- `error(m)`（m≥1 失败，可与 `done` 并存）
- `mixed`（同时有 `done` 与 `error`）

**提交按钮启用条件**：

- `done(k≥1)`：✅ 允许
- `mixed`：⚠️ 建议 **允许提交但警告** 或 **不允许提交并提示清理失败**（按业务定）
- 其他：❌ 禁止（无成功文件）

---

## 校验策略矩阵

| 列表状态                         | 是否有 error | 是否有 done | 校验结果                               | 提示文案建议                               |
| -------------------------------- | -----------: | ----------: | -------------------------------------- | ------------------------------------------ |
| 空                               |           否 |          否 | 未通过                                 | “请至少成功上传 1 个文件”                  |
| 全部上传中                       |           否 |          否 | 未通过（阻止提交）                     | “正在上传，请稍候或取消上传”               |
| 存在失败且无成功                 |           是 |          否 | 未通过                                 | “上传失败，请重新选择或重试”               |
| 存在失败且也有成功               |           是 |          是 | **按业务**：通常通过；或要求先清理失败 | “部分文件上传失败，是否重试或移除失败项？” |
| 无失败但无成功（可能全在上传中） |           否 |          否 | 未通过                                 | “请等待上传完成或重试”                     |
| 至少一个成功且无失败             |           否 |          是 | 通过                                   | —                                          |

> **推荐默认**：存在成功即可通过；失败项给黄色警告而非红色报错，但“提交后端”只取成功文件。

---

## 交互与文案（推荐）

- **失败项**：在文件卡片内显示 `失败原因` + `重试` + `移除失败`。
- **全局表单提示**：

  - 失败优先：“{label} 上传失败，请重新选择或重试”。
  - 必填不足：“请至少成功上传 1 个 {label}”。

- **提交按钮**：在“无成功文件”时置灰，并在 hover/点击时给出 tooltip：“需要至少 1 个成功上传的文件”。

---

## 技术实现建议（AntD Upload + Form）

1. **仅使用 `change` 触发校验**：`blur` 不稳定。
2. **过滤参与校验的文件**：排除 `removed`。
3. **统一解析响应**：兼容 `{ data.file_path }` / `{ url }` 等，解析失败视为 `error`。
4. **在 `onChange` 的 `done` 分支写回 `url/thumbUrl`**，不要在 `uploading` 阶段写业务字段。
5. **避免以 `percent=100` 判断成功**。
6. **支持“清除失败”快捷动作**：将 `fileList` 中 `status==='error'` 的项移除。

---

## 最小校验器（仅需粘贴/替换的片段）

```ts
// 复杂逻辑：自动上传最佳实践校验器——失败优先，其次必填（至少一个 done）
const uploadRequiredValidator =
  (label: string, required = true) =>
  async (_: any, v: any[]) => {
    // 参与校验的有效文件（排除已移除）
    const list = (v ?? []).filter((f) => f?.status !== "removed");

    // 复杂逻辑：若存在 error，优先报错（引导重试/重选）
    if (list.some((f) => f?.status === "error")) {
      throw new Error(t("files.form.rule.uploadError", { label }));
    }

    // 复杂逻辑：成功定义唯一化——必须至少有一个 done
    const hasDone = list.some((f) => f?.status === "done");

    // 必填语义：至少成功上传 1 个
    if (required && !hasDone) {
      throw new Error(t("files.form.rule.uploadInvalid", { label }));
    }

    return Promise.resolve();
  };
```

```ts
// 复杂逻辑：把上面的校验器挂到你的规则上（只给需要的改动）
else if (['image', 'file'].includes(field.controlType ?? '')) {
  rules.push({
    validator: uploadRequiredValidator(field.label, field.required !== false),
    trigger: ['change'],
  })
}
```

---

## 辅助增强（可选但强烈建议）

```ts
// 复杂逻辑：提供“一键清除失败文件”的工具方法，便于引导用户快速恢复
function clearFailedFiles(list: any[]) {
  return (list ?? []).filter((f) => f?.status !== "error");
}
```

```ts
// 复杂逻辑：统一解析服务端响应为可预览的 URL，解析失败则把文件标记为 error
function extractUrl(resp: unknown): string | undefined {
  const url = (resp as any)?.data?.file_path ?? (resp as any)?.url;
  return typeof url === "string" ? url : undefined;
}
```

```ts
// 复杂逻辑：在 onChange 中仅在 done 分支写回 url/thumbUrl，并在解析失败时回退为 error
if (file.status === "done") {
  const rawUrl = extractUrl(file.response);
  if (rawUrl) {
    const url = props.transformResponse
      ? props.transformResponse(rawUrl)
      : rawUrl;
    _fileList.value = fileList.map((f) =>
      f.uid === file.uid ? { ...f, url, thumbUrl: url } : f
    );
  } else {
    _fileList.value = fileList.map((f) =>
      f.uid === file.uid
        ? { ...f, status: "error", response: "Invalid response format" }
        : f
    );
  }
}
```

---

## 边界情况建议

- **用户快速反复选择/删除**：以 `uid` 为准同步 `fileList`，避免重复项；必要时做**节流**。
- **断网/超时**：前端设置合理超时；把超时统一映射为 `error`，附可读消息。
- **文件过大/类型不符**：在 `beforeUpload` 前置拦截（大小/类型校验），避免无谓流量。
- **多文件与部分失败**：推荐**通过校验**（已有成功）+ **橙色警告**（存在失败），后端只接收成功文件的 `url`。

---

## 可观测性与日志

- 记录：用户选择、开始上传、进度 100%、完成/失败、重试/清理失败次数。
- 产物：埋点区分“因必填失败阻止提交”和“因上传失败阻止提交”，利于后续优化。

---

## 易错点清单

- ❌ 把 `percent=100` 误当作成功。
- ❌ 在 `uploading` 阶段就写回业务字段（`url`）。
- ❌ 把“选择了文件”当作“满足必填”。
- ❌ 遇到 `error` 仍允许提交但后端又依赖失败文件。
- ✅ 以 `done` 为准；失败优先；空或仅上传中均视为未满足必填。

---

## 小结

- **原则**：失败优先 → 成功至少一项 → 其余忽略。
- **实现**：`status==='done'` 唯一成功判定；`error` 直接校验失败；`change` 触发足够。
- **体验**：给“清除失败/重试”的快速入口，保证从错误态到可提交态的“最短路径”。
