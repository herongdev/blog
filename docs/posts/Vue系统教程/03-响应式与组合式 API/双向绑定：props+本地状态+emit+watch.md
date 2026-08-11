---
title: "双向绑定：props+本地状态+emit+watch"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "标签 + 描述 数值输入 + 模式下拉 校验错误 库的完整配置 双向绑定：数值 双向绑定：模式 是止损 (true) 还是止盈 显示标签 提示文案 本地状态，同步到外层 监听本地改动，通知父组件 如果外部修改了 v model ，也同步回来 计算输入控件需要的 校验所有规则，取出。"
sidebarWeight: 130
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/双向绑定/双向绑定：props+本地状态+emit+watch.md"
---
::: v-pre

# 双向绑定：props+本地状态+emit+watch

> 本节目标：理解“双向绑定：props+本地状态+emit+watch”的核心思路，并能把它用于实际开发或面试表达。
```
<template>
  <div class="sltp-field">
    <!--
```

标签 `+` 描述

```
 Tooltip -->
    <p class="flex items-center justify-between mb-1 font-medium">
      <span>{{ label }}</span>
      <a-tooltip placement="top">
        <template #content>
          <div>{{ desc }}</div>
        </template>
        <icon-question-circle size="16" class="cursor-pointer ml-1" />
      </a-tooltip>
    </p>
    <!--
```

数值输入 `+` 模式下拉

```
 -->
    <div class="flex gap-2 mb-1">
      <NumberInput
        v-model="localValue"
        :step="fieldMeta.step"
        :fixed="fieldMeta.precision"
        :min="fieldMeta.min"
        :max="fieldMeta.max"
        class="flex-1"
      />
      <a-select v-model="localMode" class="w-20">
        <a-option v-for="m in modes" :key="m" :value="m">
          {{ m }}
        </a-option>
      </a-select>
    </div>
    <!--
```

校验错误

```
 -->
    <p v-if="errorMsg" class="text-red-500 text-xs">
      {{ errorMsg }}
    </p>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    getStopLossMeta,
    getTakeProfitMeta,
    validateCombined,
    ErrorMessageKeys,
    ValueModeOptions,
  } from './SLTP';
  import type { SLTPConfig, ValueMode } from './SLTP';
  interface Props {
    /** SLTP
```

库的完整配置

```
 */
    config: SLTPConfig;
    /**
```

双向绑定：数值

```
 */
    modelValue: number;
    /**
```

双向绑定：模式

```
 */
    modeValue: ValueMode;
    /**
```

是止损`(true)`还是止盈

```
(false) */
    isStop: boolean;
    /**
```

显示标签

```
 */
    label: string;
    /**
```

提示文案

```
 */
    desc: string;
  }
  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update:modelValue', v: number): void;
    (e: 'update:modeValue', v: ValueMode): void;
  }>();
  //
```

本地状态，同步到外层

```
 v-model
  const localValue = ref(props.modelValue);
  const localMode = ref(props.modeValue);
  //
```

监听本地改动，通知父组件

```
  watch(localValue, (v) => emit('update:modelValue', v));
  watch(localMode, (v) => emit('update:modeValue', v));
  //
```

如果外部修改了 `v-model`，也同步回来

```
  watch(
    () => props.modelValue,
    (v) => {
      if (v !== localValue.value) localValue.value = v;
    }
  );
  watch(
    () => props.modeValue,
    (v) => {
      if (v !== localMode.value) localMode.value = v;
    }
  );
  //
```

计算输入控件需要的

```
 min/max/step/precision
  const fieldMeta = computed(() =>
    props.isStop
      ? getStopLossMeta(props.config)
      : getTakeProfitMeta(props.config)
  );
  //
```

校验所有规则，取出当前的 `“StopLoss...”` 或 `“TakeProfit...”` 错误

```
  const allErrors = computed(() => validateCombined(props.config));
  const currentError = computed(() => {
    const prefix = props.isStop ? 'StopLoss' : 'TakeProfit';
    return allErrors.value.find((e) => e.startsWith(prefix)) ?? null;
  });
  //
```

按照 `i18n key` 映射成用户可见文案

```
  const { t } = useI18n();
  const errorMsg = computed(() =>
    currentError.value ? t(ErrorMessageKeys[currentError.value]) : ''
  );
  //
```

下拉可选项

```
  const modes = ValueModeOptions;
</script>
```

:::
