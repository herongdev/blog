---
title: 在 TSX 中使用 useModel 与 defineModel
date: 2025-09-08 16:08:08
tags:
---

明白了 ✅ 你想要的是一篇 **Hexo 博客文章**（Markdown 格式），内容是总结在 **TSX 中使用 `useModel` 和 `defineModel`** 的经验。下面就是可以直接放到 Hexo `source/_posts/` 目录下的文章。

---

````markdown
---
title: 在 TSX 中使用 useModel 与 defineModel
date: 2025-09-08 12:00:00
tags:
  - Vue3
  - TSX
  - useModel
  - defineModel
  - 前端开发
categories:
  - Vue
---

## 前言

在 Vue 3.5 之后，官方新增了 `useModel` 作为组合式 API，可以替代 `defineModel`。  
对于在 **TSX/JSX** 中开发的同学来说，这两个 API 的用法和坑点略有不同，这里做一个总结。

---

## 一、defineModel 的问题

`defineModel` 是一个宏（类似 `defineProps`、`defineEmits`），它在 **SFC 单文件组件（.vue）** 下用得最多。

```vue
<script setup lang="ts">
const modelValue = defineModel<string>();
const phoneCode = defineModel<string>({ name: "phoneCode" });
</script>
```
````

但是在 **TSX** 文件中：

- 有些构建工具未必支持宏展开；
- 如果不指定 `name`，所有 `defineModel` 都会指向 `modelValue`；
- 在 TSX 渲染时必须 `.value` 才能取值。

所以在 TSX 下使用 `defineModel` 有兼容性风险。

---

## 二、useModel 的优势

`useModel` 是一个组合式函数，不依赖编译宏，在 TSX 环境下更稳定。

### 基础用法

```ts
import { defineComponent, useModel } from "vue";

export default defineComponent({
  props: {
    modelValue: String,
    phoneCode: [String, Number],
  },
  emits: ["update:modelValue", "update:phoneCode"],
  setup(props) {
    const modelValue = useModel(props, "modelValue");
    const phoneCode = useModel(props, "phoneCode", {
      get: (v) => String(v ?? ""), // 可选：统一类型
      set: (v) => String(v ?? ""),
    });

    return () => (
      <div>
        <span>{modelValue.value}</span>
        <span>{phoneCode.value}</span>
      </div>
    );
  },
});
```

### 特点

- 自动绑定到 `update:xxx` 事件；
- TSX 中赋值/取值时都用 `.value`；
- 可通过 `get/set` 做类型转换。

---

## 三、实践中的对比

在一个 `CountrySelector` 组件中，如果需要绑定多个字段：

### defineModel 写法

```ts
const modelValue = defineModel<string>();
const countryEnName = defineModel<string>({ name: "countryEnName" });
```

### useModel 写法

```ts
const modelValue = useModel(props, "modelValue");
const countryEnName = useModel(props, "countryEnName");
```

**区别总结**：

- `defineModel` 写起来更简洁，但在 TSX 下支持不完善；
- `useModel` 稳定、灵活，推荐在 TSX 文件中使用。

---

## 四、总结

- **SFC (`.vue`) 中推荐 `defineModel`**，简洁直观；
- **TSX/JSX 中推荐 `useModel`**，稳定无宏依赖；
- 渲染时注意 `.value`；
- `useModel` 的 `get/set` 可以帮助我们做类型转换，尤其是字符串/数字混用的场景。

---

你在 TSX 中遇到 `v-model` 需求时，优先用 `useModel`，可以少掉很多坑。

```

```
