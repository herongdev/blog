---
title: PDF pdfjs pdf.js 重置 第一页 预览组件：实现浏览位置重置功能
date: 2025-10-24
categories:
  - Frontend
  - Vue
  - Components
tags:
  - PDF.js
  - Vue3
  - Component Design
  - LocalStorage
---

# PDF 预览组件：实现浏览位置重置功能

## 背景

在使用 PDF.js 的预览组件时，它会自动记住用户上次浏览的页面位置，即使刷新浏览器也会恢复到上次的位置。虽然这个特性提升了用户体验，但在某些场景下我们需要强制重置到第 1 页。

## 问题分析

### PDF.js 的历史记录机制

PDF.js 使用 `localStorage` 存储浏览历史：

```javascript
// 存储位置在 viewer.js 中
localStorage.setItem("pdfjs.history", databaseStr);
localStorage.getItem("pdfjs.history");
```

历史数据结构：

```json
{
  "files": [
    {
      "fingerprint": "文件指纹",
      "page": 5,
      "zoom": "auto",
      "scrollLeft": 0,
      "scrollTop": 100
    }
  ]
}
```

### 需求场景

1. **表单重新填写**：用户重新开始填写协议时，应从第 1 页开始
2. **多次签署**：同一份文档多次签署，每次都应该从头开始
3. **测试场景**：开发测试时需要清除历史状态

## 解决方案

### 核心思路

1. **URL Hash 参数**：通过 `#page=1` 强制跳转到第 1 页
2. **清除历史记录**：从 localStorage 中删除特定文件的历史
3. **iframe 刷新**：重新加载 iframe 以应用新的 URL

### 实现代码

#### 1. 组件状态管理

```vue
<template>
  <iframe ref="iframeRef" :src="iframePdfUrl" class="pdf-iframe" />
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

const shouldResetToFirstPage = defineModel<boolean>("resetToFirstPage", {
  default: true, // 默认总是重置到第1页
});
const iframeRef = ref<HTMLIFrameElement | null>(null);

const iframePdfUrl = computed(() => {
  let url =
    "/pdfpreview/web/viewer.html?file=" + encodeURIComponent(props.pdfUrl);
  // 如果需要重置到第1页，添加 #page=1 参数
  if (shouldResetToFirstPage.value) {
    url += "#page=1";
  }
  return url;
});
</script>
```

#### 2. 清除历史记录方法

```typescript
/**
 * 清除指定文件的浏览历史（重置到第1页）
 * @param fileUrl 文件URL，不传则清除当前文件的历史
 */
function clearPdfHistory(fileUrl?: string): void {
  try {
    const historyStr = localStorage.getItem("pdfjs.history");
    if (!historyStr) return;

    const history = JSON.parse(historyStr);
    const targetUrl = fileUrl || props.pdfUrl;

    // 删除指定文件的历史记录
    if (history.files && Array.isArray(history.files)) {
      history.files = history.files.filter((item: any) => {
        return !item.fingerprint || !targetUrl.includes(item.fingerprint);
      });
    }

    localStorage.setItem("pdfjs.history", JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to clear PDF history:", e);
  }
}
```

#### 3. 重置到第 1 页

```typescript
/**
 * 重新加载 PDF 并重置到第1页
 */
function resetToFirstPage(): void {
  clearPdfHistory();
  shouldResetToFirstPage.value = true;
  // 刷新 iframe
  if (iframeRef.value) {
    iframeRef.value.src = iframePdfUrl.value;
  }
  // 重置标志
  nextTick(() => {
    shouldResetToFirstPage.value = false;
  });
}
```

#### 4. 清除所有历史

```typescript
/**
 * 清除所有 PDF 浏览历史
 */
function clearAllPdfHistory(): void {
  try {
    localStorage.removeItem("pdfjs.history");
  } catch (e) {
    console.warn("Failed to clear all PDF history:", e);
  }
}
```

#### 5. 暴露方法

```typescript
// 暴露方法供父组件调用
defineExpose({
  resetToFirstPage,
  clearPdfHistory,
  clearAllPdfHistory,
});
```

## 使用示例

### 方式 1：通过 ref 调用（推荐）

```vue
<template>
  <PDFSigner ref="pdfSignerRef" :pdfUrl="contractUrl" v-model:value="signed" />
  <button @click="handleRestart">重新开始</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pdfSignerRef = ref<InstanceType<typeof PDFSigner> | null>(null);
const signed = ref(false);

// 重置当前 PDF 到第1页
function handleRestart() {
  pdfSignerRef.value?.resetToFirstPage();
  signed.value = false;
}
</script>
```

### 方式 2：通过 v-model 控制

```vue
<template>
  <PDFSigner
    :pdfUrl="contractUrl"
    v-model:value="signed"
    v-model:resetToFirstPage="shouldReset"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const signed = ref(false);
const shouldReset = ref(true); // 默认重置

// 当用户重新打开表单时
watch(formVisible, (visible) => {
  if (visible) {
    shouldReset.value = true;
  }
});
</script>
```

## API 文档

### Props

| 属性               | 类型      | 默认值 | 说明                         |
| ------------------ | --------- | ------ | ---------------------------- |
| `pdfUrl`           | `string`  | -      | PDF 文件的 URL               |
| `resetToFirstPage` | `boolean` | `true` | 是否重置到第 1 页（v-model） |

### 方法（通过 ref 调用）

| 方法                    | 参数           | 返回值 | 说明                       |
| ----------------------- | -------------- | ------ | -------------------------- |
| `resetToFirstPage()`    | -              | `void` | 立即重置当前 PDF 到第 1 页 |
| `clearPdfHistory(url?)` | `url?: string` | `void` | 清除指定 PDF 的历史记录    |
| `clearAllPdfHistory()`  | -              | `void` | 清除所有 PDF 的浏览历史    |

## 工作原理

### 流程图

```
用户调用 resetToFirstPage()
    ↓
1. 清除 localStorage 中的历史记录
    ↓
2. 设置 shouldResetToFirstPage = true
    ↓
3. iframePdfUrl 计算属性重新计算
    ↓
4. URL 变为：viewer.html?file=xxx#page=1
    ↓
5. 刷新 iframe.src
    ↓
6. PDF.js 读取 #page=1 参数
    ↓
7. 跳转到第1页 ✅
    ↓
8. 重置 shouldResetToFirstPage = false
```

### 关键点

1. **双重保障**：既清除历史，又使用 URL hash 强制跳转
2. **异步重置**：使用 `nextTick` 确保 URL 更新后再重置标志
3. **错误处理**：localStorage 操作都包含 try-catch
4. **灵活性**：提供三种不同粒度的清除方法

## 最佳实践

### 1. 在表单场景中使用

```vue
<template>
  <a-modal v-model:open="visible" @afterClose="handleClose">
    <PDFSigner ref="pdfRef" :pdfUrl="agreementUrl" v-model:value="agreed" />
  </a-modal>
</template>

<script setup lang="ts">
const pdfRef = ref(null);
const visible = ref(false);

// 每次打开模态框时重置
watch(visible, (isVisible) => {
  if (isVisible) {
    nextTick(() => {
      pdfRef.value?.resetToFirstPage();
    });
  }
});
</script>
```

### 2. 在多步骤表单中使用

```typescript
// 用户返回到第一步时重置 PDF
function goToFirstStep() {
  currentStep.value = 1;
  pdfSignerRef.value?.resetToFirstPage();
}
```

### 3. 性能优化

```typescript
// 只在必要时清除历史
function conditionalReset(forceReset: boolean) {
  if (forceReset) {
    pdfSignerRef.value?.resetToFirstPage();
  }
  // 否则保持用户的浏览位置
}
```

## 注意事项

1. **默认值设置**：`resetToFirstPage` 默认为 `true`，确保每次加载都从第 1 页开始
2. **安全性**：localStorage 操作都有异常处理，避免浏览器限制导致错误
3. **跨组件使用**：如果项目中有多处使用 PDF 预览，考虑封装为全局工具函数
4. **浏览器兼容性**：确保目标浏览器支持 localStorage

## 扩展思路

### 1. 记住特定用户的浏览位置

```typescript
function clearPdfHistoryForUser(userId: string, fileUrl: string) {
  const key = `pdfjs.history.${userId}`;
  localStorage.removeItem(key);
}
```

### 2. 添加浏览进度统计

```typescript
function getPdfProgress(): number {
  const historyStr = localStorage.getItem("pdfjs.history");
  // 解析并返回浏览进度百分比
  return progress;
}
```

### 3. 自动重置过期历史

```typescript
function clearExpiredHistory(days: number = 7) {
  // 清除超过指定天数的浏览历史
}
```

## 总结

通过结合 localStorage 操作和 URL hash 参数，我们实现了灵活的 PDF 浏览位置重置功能。这个方案：

- ✅ 简单易用：一行代码即可重置
- ✅ 功能完整：提供多种重置粒度
- ✅ 健壮性好：包含错误处理和边界情况
- ✅ 向后兼容：不影响现有功能

## 参考资源

- [PDF.js 官方文档](https://mozilla.github.io/pdf.js/)
- [Vue 3 defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

_最后更新：2025-10-24_
