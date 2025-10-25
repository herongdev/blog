---

title: 阻止大文件/非法文件出现在 Ant Design Vue Upload 列表（LIST_IGNORE 与兜底过滤）
date: 2025-10-24
categories:

# 背景问题

`beforeUpload` 返回 `false` **只会阻止“自动上传”**，不会阻止组件把文件加入受控的 `fileList`。因此当文件超体积/类型不符时，仍会“出现在预览里”。
解决要点：**返回 `Upload.LIST_IGNORE`**，让组件 **忽略该文件，连列表都不进**。

---

# 实现思路（总览）

1. **校验不通过 → 返回 `Upload.LIST_IGNORE`**（类型、大小、数量）。
2. **老版本兼容**：若当前 `ant-design-vue` 不支持 `LIST_IGNORE`，用 `@change` 事件二次过滤 `fileList`。
3. **与裁剪弹窗协同**：只有在全部校验通过后，**再**创建占位项、`open` 裁剪弹窗；失败时不改 `fileList`、不建 URL、直接提示。

---

# 分步实现

## 步骤一：引入 `Upload`（为了使用 `LIST_IGNORE`）

```ts
// 复杂逻辑：引入 Upload 以使用 LIST_IGNORE，从源头阻止加入列表
import { Upload } from "ant-design-vue";
```

## 步骤二：改造 `handleBeforeUpload` 的返回值

仅展示**需要修改的片段**：

```ts
const handleBeforeUpload = (file) => {
  // …你的类型白名单构建逻辑保持不变…

  // 复杂逻辑：类型不符时直接忽略，不进入 fileList
  if (allowedMimeTypes.size > 0 && !allowedMimeTypes.has(file.type)) {
    window.GtcNotification(
      "error",
      t("components.imageUpload.invalid-file-type")
    );
    return Upload.LIST_IGNORE;
  }

  // 复杂逻辑：超出大小时直接忽略，不进入 fileList
  if (file.size > props.maxSize) {
    const maxSizeMB = (props.maxSize / (1024 * 1024)).toFixed(1);
    window.GtcNotification(
      "error",
      t("components.imageUpload.file-size-exceeded", { maxSize: maxSizeMB })
    );
    return Upload.LIST_IGNORE;
  }

  // 复杂逻辑：超过数量限制时直接忽略，不进入 fileList
  if (_fileList.value.length >= props.maxCount) {
    window.GtcNotification(
      "error",
      t("components.imageUpload.max-count-exceeded", {
        maxCount: props.maxCount,
      })
    );
    return Upload.LIST_IGNORE;
  }

  // …以下“通过校验后”的流程保持不变（创建占位项 + 打开裁剪弹窗）…
};
```

> ✅ 这样做后，不合规文件**不会**进入 `_fileList`，自然也不会出现在预览区。

## 步骤三（可选）：老版本兜底（无 `LIST_IGNORE`）

如果你当前版本报错或不识别 `Upload.LIST_IGNORE`，采用 `@change` 过滤：

```vue
<!-- 复杂逻辑：老版本兜底——在 change 时强制过滤不合规文件 -->
<a-upload
  v-if="!props.readonly"
  v-model:file-list="_fileList"
  v-bind="attrs"
  :before-upload="handleBeforeUpload"
  @change="onUploadChange"
  accept=".jpg,.jpeg,.png,.gif,.bmp"
  @preview="handlePreview"
/>
```

```ts
// 复杂逻辑：过滤掉超大小/类型不符的文件，保证 _fileList 不“脏进来”
const onUploadChange = ({ fileList }) => {
  _fileList.value = fileList.filter((f) => {
    const okSize = typeof f.size === "number" ? f.size <= props.maxSize : true;
    const okType =
      !f.type || allowedMimeTypes.size === 0 || allowedMimeTypes.has(f.type);
    return okSize && okType;
  });
};
```

---

# 最小可运行示例（精简版）

```vue
<template>
  <a-upload
    v-model:file-list="fileList"
    :before-upload="before"
    accept=".jpg,.jpeg,.png,.gif,.bmp"
  >
    <a-button>选择图片</a-button>
  </a-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Upload } from "ant-design-vue"; // 复杂逻辑：为使用 LIST_IGNORE 引入 Upload

const fileList = ref<any[]>([]);

const before = (file: File) => {
  const maxSize = 2 * 1024 * 1024;

  // 复杂逻辑：大小校验失败，直接忽略
  if (file.size > maxSize) return Upload.LIST_IGNORE;

  // 复杂逻辑：类型校验失败，直接忽略
  if (!/^image\/(jpeg|png|gif|bmp)$/.test(file.type)) return Upload.LIST_IGNORE;

  // 通过校验，允许进入列表（若需手动上传/裁剪，这里 return false 并自己管理列表）
  return true;
};
</script>
```

> 如果你要**手动上传 + 裁剪**，把最后的 `return true` 换成 `return false`，并在**通过校验**后自行插入占位项与打开裁剪弹窗（就像你当前组件里做的那样）。

---

# 与现有组件协同的注意点

- **只在通过全部校验后**再执行：

  - `URL.createObjectURL(file)`；
  - 向 `_fileList` 写入“uploading 占位项”；
  - 打开裁剪弹窗（`open.value = true`）。

- 校验失败时**不要改动 `_fileList`**，也不要创建/泄露临时 URL。
- 预览函数 `handlePreview` 会用 `originFileObj` → `getBase64`，若文件被忽略不进列表，就不会触发误预览。

---

# 常见坑位与建议

1. **iOS HEIC**：有些手机拍照是 `image/heic`，不在 `accept` 列表会被忽略。需要支持可在映射里加 `image/heic`/`.heic`。
2. **文件对象缺失 size/type**：来自拖拽或粘贴的文件有时缺字段，务必写“容错判断”（示例兜底里已演示）。
3. **占位项写早了**：把占位项写入 `_fileList` 的逻辑放在**所有校验之后**，否则会出现“虽然被拒，但还在列表里”的错觉。

---

# 快速检查清单（Checklist）

- [ ] 三处校验失败路径都已改为 `return Upload.LIST_IGNORE`。
- [ ] 老版本已加 `@change="onUploadChange"` 并二次过滤（如需）。
- [ ] 失败分支**不触碰** `_fileList`、不建 URL、只提示。
- [ ] 通过校验后再写占位项与打开裁剪弹窗。
- [ ] `URL.revokeObjectURL` 在关闭/取消后调用，避免泄露。

---

# 结论

- 想让**不合规文件完全不出现在预览/列表**：用 `Upload.LIST_IGNORE`。
- 版本不支持时，用 `@change` **强制过滤**。
- 与裁剪流程配合：**先校验，后占位**，才能彻底避免“return false 仍出现在预览”的问题。
