---

title: Ant Design Vue 表单集成详解：useInjectFormItemContext 与 onFieldChange/onFieldBlur
date: 2025-09-19
tags:

* Vue3
* ant-design-vue
* Form
* 自定义组件

---

## 这俩是干嘛用的？

当你的**自定义组件**放在 `<a-form-item>` 里时，`Form.Item` 并不知道**什么时候该把这个字段标记为“已改动/已失焦”，也不知道何时触发校验**。
`useInjectFormItemContext()` 就是把 `Form.Item` 的**上下文（上下游通信口）**注入进来，提供几个方法让你**主动通知**表单：

- `id`：当前表单项的字段 id。
- `onFieldChange()`：告诉 `Form.Item`：**值变了**（触发该字段的 `change` 校验、状态更新、联动等）。
- `onFieldBlur()`：告诉 `Form.Item`：**失焦了**（触发该字段的 `blur` 校验、显示“touched”等）。

而你看到的 `nextTick(() => ctx && ctx.onFieldChange())` 是为了**等 v-model 把值真正更新进 DOM/响应式系统后**，再通知 `Form.Item`，避免“校验读到旧值”的竞态。

> 官方迁移文档也强调：自定义组件若希望被 `Form.Item` 校验，需要注入 `{ id, onFieldChange, onFieldBlur }` 并调用对应方法。([Ant Design Vue][1])

---

## 典型用法一：值变化时触发校验（`onFieldChange`）

最常见的写法是**在 v-model 的 setter 里调用**：

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useInjectFormItemContext } from "ant-design-vue/es/form/FormItemContext";

const ctx = useInjectFormItemContext();

const model = defineModel<string>("value", { default: "" });

const _value = computed({
  get: () => model.value,
  set: (v: string) => {
    model.value = v;
    // 等值写回去再触发校验，避免读到旧值
    Promise.resolve().then(() => ctx?.onFieldChange());
  },
});
</script>

<template>
  <input
    :value="_value"
    @input="_value = ($event.target as HTMLInputElement).value"
  />
</template>
```

---

## 典型用法二：失焦触发校验（`onFieldBlur`）

当规则是 `trigger: 'blur'` 时，需要在组件**失焦**时调用：

```vue
<input
  :value="_value"
  @input="_value = ($event.target as HTMLInputElement).value"
  @blur="ctx?.onFieldBlur()"
/>
```

---

## 典型用法三：异步完成后手动触发（比如上传、远程校验）

有些值不是即时写入（如上传成功后才有 URL），这时在**终态**回调里触发：

```ts
// 上传成功，真正拿到 file_path 后再触发
function onUploadDone(filePath: string) {
  internalUrl.value = filePath;
  // 通知表单：值已变更，可做校验/联动
  Promise.resolve().then(() => ctx?.onFieldChange());
}
```

---

## 典型用法四：自定义选择器/自动完成组件

- 输入过程中用 `onFieldChange()`（`change` 触发）。
- 选择面板关闭或输入框失焦时用 `onFieldBlur()`（`blur` 触发）。

```ts
function onSelect(v: string) {
  model.value = v;
  Promise.resolve().then(() => ctx?.onFieldChange());
}
function onBlur() {
  ctx?.onFieldBlur();
}
```

---

## 我到底该在什么时候调用？

| 场景                              | 调用什么          | 说明                                                        |
| --------------------------------- | ----------------- | ----------------------------------------------------------- |
| v-model 值**刚被改动**            | `onFieldChange()` | 触发 `rules` 里 `trigger: 'change'` 的校验与依赖更新        |
| 输入框**失去焦点**                | `onFieldBlur()`   | 触发 `rules` 里 `trigger: 'blur'` 的校验，并标记“touched”   |
| 异步把值写回（上传成功/远程拿值） | `onFieldChange()` | 在值**真正可用**时触发（常配 `nextTick/Promise.resolve()`） |
| 只读或不想触发表单行为            | 都不调用          | 由外部表单自行控制                                          |

---

## 为什么很多示例里要 `nextTick`/微任务再调用？

短答案：**防竞态**。
长答案：有时你在 `set` 里刚写入 `model.value`，同时又 `emit('update:value')` 给父级，表单这会儿读取值可能还没更新。把 `onFieldChange()` 放在 `nextTick/Promise.resolve()` 里，可以保证**值先稳定**，校验再跑，减少“明明改了但规则读到旧值”的诡异现象。

等价写法：

```ts
import { nextTick } from "vue";
nextTick(() => ctx?.onFieldChange()); // 宏任务前的下个渲染周期
Promise.resolve().then(() => ctx?.onFieldChange()); // 微任务，更常用更轻量
```

---

## 最小可运行示例

### 1）自定义输入，支持 `change`/`blur` 触发

```vue
<!-- MyInput.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useInjectFormItemContext } from "ant-design-vue/es/form/FormItemContext";

const ctx = useInjectFormItemContext();
const model = defineModel<string>("value", { default: "" });

const _value = computed({
  get: () => model.value,
  set: (v: string) => {
    model.value = v;
    Promise.resolve().then(() => ctx?.onFieldChange());
  },
});
const onBlur = () => ctx?.onFieldBlur();
</script>

<template>
  <input
    :value="_value"
    @input="_value = ($event.target as HTMLInputElement).value"
    @blur="onBlur"
  />
</template>
```

```vue
<!-- 使用处 -->
<a-form
  :model="{ name: '' }"
  :rules="{
    name: [{ required: true, message: '必填', trigger: ['change', 'blur'] }],
  }"
>
  <a-form-item name="name" label="姓名">
    <MyInput v-model:value="form.name" />
  </a-form-item>
</a-form>
```

### 2）上传成功后再通知表单

```vue
<!-- MyUpload.vue（节选） -->
<script setup lang="ts">
import { useInjectFormItemContext } from "ant-design-vue/es/form/FormItemContext";
const ctx = useInjectFormItemContext();
const url = defineModel<string>("value", { default: "" });

function onUploadDone(filePath: string) {
  url.value = filePath;
  // 等值写入后通知 FormItem
  Promise.resolve().then(() => ctx?.onFieldChange());
}
</script>
```

---

## 常见坑位

- **只改 v-model，不调 `onFieldChange`/`onFieldBlur`**：`Form.Item` 不会知道你动了值/失焦了，自然**不校验**、不展示错误。
- **在旧值阶段触发校验**：把 `onFieldChange` 放在同步 `emit` 之前，容易读到旧值——用 **`nextTick/Promise.resolve()`** 包起来。
- **自定义组件的事件名不匹配**：表单的 `trigger` 写了 `blur`，但你组件从没触发 `blur`，当然不会校验。
- **多个触发时机**：需要同时支持 `change` 和 `blur` 的校验时，**两个都记得调用**。

---

## 官方出处

- Ant Design Vue 表单（自定义组件说明，v3 文档）：提到需要注入 `{ id, onFieldChange, onFieldBlur }` 并调用。([Ant Design Vue][1])

---

## 结论

- `useInjectFormItemContext()` = 把 `Form.Item` 的“通知口”拿到手。
- `onFieldChange()` / `onFieldBlur()` = 你来**告诉表单**“我变了/我失焦了”。
- `nextTick/微任务再触发` = **值先稳定**，校验更可靠。

照着上面的最小示例接入，你的自定义组件就能像内置控件一样，**被 `<a-form-item>` 正确收集、校验、展示状态**。

[1]: https://www.antdv.com/components/form-cn?utm_source=chatgpt.com "Form 表单"
