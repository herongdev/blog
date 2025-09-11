---
title: GTC Checkbox & Radio 轻量化重构（支持 Ant Design Vue）
date: 2025-09-05 16:25:03
tags:
---

---

title: GTC Checkbox & Radio 轻量化重构（支持 Ant Design Vue）
date: 2025-09-05
tags: \[Vue3, Ant Design Vue, 组件封装, v-model]

---

## 思路概述

- 用 `defineModel` 直接驱动 `a-checkbox-group` / `a-radio-group`，去掉中间层 `innerValue` 与 `watch`，减少响应式开销与同步复杂度。
- 加上 `defineOptions({ inheritAttrs: false })`，避免 attrs 同时落在根节点与 `a-*group` 上导致副作用。
- `Checkbox` 明确 `value` 为 **数组**，默认 `[]`；`Radio` 的 `value` 为任意，默认 `null`。

---

## 最简实现步骤

1. 删除 `innerValue` 与所有 `watch`。
2. 用 `const value = defineModel<...>('value', { default: ... })`，模板直接 `v-model:value="value"`。
3. 设置 `inheritAttrs: false`，并将 `attrs` 仅透传给 `a-*group`。

---

## 完整代码（Checkbox）

```vue
<template>
  <div
    class="gtc-checkbox"
    :class="[`gtc-checkbox-${size}`, disabled ? 'is-disabled' : '']"
  >
    <a-checkbox-group v-model:value="value" :disabled="disabled" v-bind="attrs">
      <slot />
    </a-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

// 复杂：避免 attrs 同时落到根节点与 a-checkbox-group
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const props = defineProps({
  size: { type: String, default: "md" },
  disabled: { type: Boolean, default: false },
});

// 复杂：CheckboxGroup 期望数组；默认应为 []
const value = defineModel<any[]>("value", { default: [] });
</script>

<style lang="less" scoped>
.gtc-checkbox {
  .ant-checkbox-wrapper {
    color: var(--ink-950);
  }
  .ant-checkbox {
    &-inner {
      border-color: var(--rim-300);
      background: none;
      box-shadow: none;
    }
    &-checked .ant-checkbox-inner {
      background-color: var(--blue-primary);
      border-color: var(--blue-primary);
    }
    &:hover .ant-checkbox-inner {
      border-color: var(--ink-400);
    }
  }
}

.gtc-checkbox-sm .ant-checkbox-inner {
  width: 14px;
  height: 14px;
}
.gtc-checkbox-md .ant-checkbox-inner {
  width: 16px;
  height: 16px;
}
.gtc-checkbox-lg .ant-checkbox-inner {
  width: 18px;
  height: 18px;
}

.is-disabled {
  .ant-checkbox-inner {
    background: var(--ground-50);
    border-color: var(--rim-300);
  }
}
</style>
```

---

## 完整代码（Radio）

```vue
<template>
  <div
    class="gtc-radio"
    :class="[`gtc-radio-${size}`, disabled ? 'is-disabled' : '']"
  >
    <a-radio-group v-model:value="value" :disabled="disabled" v-bind="attrs">
      <slot />
    </a-radio-group>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

// 复杂：避免 attrs 同时落到根节点与 a-radio-group
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const props = defineProps({
  size: { type: String, default: "md" },
  disabled: { type: Boolean, default: false },
});

// 复杂：RadioGroup 接收单值；默认 null
const value = defineModel<any>("value", { default: null });
</script>

<style lang="less" scoped>
.gtc-radio {
  .ant-radio-wrapper {
    color: var(--ink-950);
  }
  .ant-radio-inner {
    border-color: var(--rim-300);
    background: none;
    box-shadow: none;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: var(--blue-primary);
  }
  .ant-radio-checked .ant-radio-inner::after {
    background-color: var(--blue-primary);
  }
  .ant-radio:hover .ant-radio-inner {
    border-color: var(--ink-400);
  }
}

.gtc-radio-sm .ant-radio-inner {
  width: 14px;
  height: 14px;
}
.gtc-radio-md .ant-radio-inner {
  width: 16px;
  height: 16px;
}
.gtc-radio-lg .ant-radio-inner {
  width: 18px;
  height: 18px;
}

.is-disabled {
  .ant-radio-inner {
    background: var(--ground-50);
    border-color: var(--rim-300);
  }
}
</style>
```

---

## 备注

- 现在两个组件都是\*\*“零 watch、零中间层”\*\*：父表单直接通过 `v-model:value` 与 antd 组件对齐；
- 与你表单规则的“复选框至少选一项”自定义校验配合使用即可（在 `getValidationRules` 里对 `checkbox` 做长度判断）。
