---

title: 自动上传校验在“100% 但仍 uploading”时不应报错：两种最佳改法
date: 2025-09-28
tags:

- Ant Design
- Upload
- 表单校验
- UX

---

## 结论（TL;DR）

你的校验器在 `percent=100` 但 `status==='uploading'` 时会因为 `!hasDone` 而报 “必填未满足” 的错。这会让用户误以为失败。**应将“上传中”与“失败/未选择”区分处理**：

- **做法 A（推荐）**：拆成**两个规则**——

  - 变更时（`change`）：只报**明确失败**，对“上传中”不报错；
  - 提交时（`submit`）：如果仍有“上传中”，**阻止提交并提示“正在上传”**；若无成功项，再给“必填未满足”的错。

- **做法 B（备选）**：仍用**单个规则**，但**在 change 阶段**遇到“上传中”**直接通过**（不报错），最终提交时**额外做一次强制校验**。

---

## 仅给需要修改的代码片段

### 做法 A：**双规则**（强烈推荐，体验最佳）

```ts
// 复杂逻辑：变更时——只拦截“明确失败”，上传中不报错（避免误导）
const uploadChangeRule = (label: string) => async (_: any, v: any[]) => {
  const list = (v ?? []).filter((f) => f?.status !== "removed");
  const hasError = list.some((f) => f?.status === "error");
  if (hasError) {
    throw new Error(t("files.form.rule.uploadError", { label }));
  }
  // 上传中（包括 percent=100 但仍 uploading）不在 change 阶段报错，交给提交阶段兜底
  return Promise.resolve();
};
```

```ts
// 复杂逻辑：提交时——统一兜底：有 uploading 则提示“正在上传”；无 done 则提示“至少成功 1 个”
const uploadSubmitRule =
  (label: string, required = true) =>
  async (_: any, v: any[]) => {
    const list = (v ?? []).filter((f) => f?.status !== "removed");
    const hasError = list.some((f) => f?.status === "error");
    if (hasError) {
      throw new Error(t("files.form.rule.uploadError", { label }));
    }
    const hasUploading = list.some((f) => f?.status === "uploading");
    if (hasUploading) {
      // 复杂逻辑：阻止提交，给“仍在上传”的明确提示
      throw new Error(t("files.form.rule.uploading", { label })); // 如：`{label} 正在上传，请稍候`
    }
    const hasDone = list.some((f) => f?.status === "done");
    if (required && !hasDone) {
      throw new Error(t("files.form.rule.uploadInvalid", { label })); // 如：`请至少成功上传 1 个 {label}`
    }
    return Promise.resolve();
  };
```

```ts
// 复杂逻辑：在 rules 中分别挂载两个规则；一个仅在 change 触发，另一个仅在 submit 触发
else if (['image', 'file'].includes(field.controlType ?? '')) {
  rules.push(
    { validator: uploadChangeRule(field.label), trigger: ['change'] },
    { validator: uploadSubmitRule(field.label, field.required !== false), trigger: ['submit'] },
  )
}
```

### 做法 B：**单规则**（最小改动；提交前需再触发一次校验）

```ts
// 复杂逻辑：在 change 阶段遇到 uploading 不报错；提交时需再次校验才能拦住
const uploadRequiredValidator =
  (label: string, required = true) =>
  async (_: any, v: any[], context?: { trigger?: string }) => {
    const list = (v ?? []).filter((f) => f?.status !== "removed");

    // 失败优先
    if (list.some((f) => f?.status === "error")) {
      throw new Error(t("files.form.rule.uploadError", { label }));
    }

    const hasUploading = list.some((f) => f?.status === "uploading");
    const hasDone = list.some((f) => f?.status === "done");

    // 复杂逻辑：change 时若还在上传中，不报错（避免误导）
    if ((context as any)?.trigger === "change" && hasUploading) {
      return Promise.resolve();
    }

    // 提交或其它场景：严格兜底
    if (hasUploading) {
      throw new Error(t("files.form.rule.uploading", { label }));
    }
    if (required && !hasDone) {
      throw new Error(t("files.form.rule.uploadInvalid", { label }));
    }
    return Promise.resolve();
  };
```

```ts
// 复杂逻辑：挂载为单规则（仍建议触发 ['change', 'submit']，以便提交时能拦住）
else if (['image', 'file'].includes(field.controlType ?? '')) {
  rules.push({
    validator: uploadRequiredValidator(field.label, field.required !== false),
    trigger: ['change', 'submit'],
  })
}
```

---

## 关键点说明

- **为什么会误报？**
  你的原始规则在 `uploading`（即便 `percent=100`）时 `!hasDone` 为真，于是走了“必填未满足”的报错分支，容易被用户理解为**失败**。
- **为什么双规则更好？**

  - **change** 阶段专注即时反馈：只提示**明确失败**；
  - **submit** 阶段统一兜底：拦住“仍在上传”与“没有成功文件”的情况。
    这样既不误导用户，又能确保提交时严谨把关。

- **percent=100 仍可能是 uploading**：请坚持**仅以 `status==='done'` 判断成功**。
- **文案建议**：增加 `files.form.rule.uploading`，例如：`{label} 正在上传，请稍候`。

---

## 小结

- 将“上传中”与“失败/未满足必填”分离处理，避免在 100% 但未 `done` 时误报“失败/未满足”。
- **推荐用双规则**分治 `change` 与 `submit`；若不便拆分，**单规则**也需在 `change` 遇到 `uploading` 时**直接通过**，把严格校验留到提交阶段。
