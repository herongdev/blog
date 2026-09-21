---
title: "defineModel初始值不同步问题"
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
description: "顶部操作 新增股东 股东表单列表 请输入 删除按钮 删除股东。"
sidebarWeight: 143
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/defineModel初始值不同步问题.md"
---
::: v-pre

# defineModel初始值不同步问题

> 本节目标：理解“defineModel初始值不同步问题”的核心思路，并能把它用于实际开发或面试表达。
```
<template>
  <!--
```

顶部操作

```
 -->
  <div class="group-action" v-if="!readonly && !disabled">
    <a-button
      type="primary"
      ghost
      size="small"
      :disabled="disabled"
      @click="addHolder"
    >
      <plus-outlined />
```

新增股东

```
    </a-button>
  </div>
  <!--
```

股东表单列表

```
 -->
  <a-form
    v-for="(holder, i) in model"
    :key="i"
    :model="holder"
    layout="vertical"
    class="holder-form"
  >
    <a-form-item
      v-for="field in props.formFieldSettings"
      :key="field.name"
      :label="field.label"
      :name="field.name"
      :rules="[
        field.required
          ? { required: true, message: '
```

请输入

```
' + field.label }
          : {},
      ]"
    >
      <component
        :is="getComponent(field.controlType).component"
        v-model:value="holder[field.name]"
        v-bind="{
          readonly,
          options: field.options ?? [],
        }"
      />
    </a-form-item>
    <!--
```

删除按钮

```
 -->
    <div v-if="model.length > 1 && !readonly && !disabled" class="remove-box">
      <a-button danger ghost size="small" @click="removeHolder(i)">
        <delete-outlined />
```

删除股东

```
      </a-button>
    </div>
    <a-divider v-if="i !== model.length - 1" />
  </a-form>
</template>
<script setup>
import { defineProps, defineModel, watch } from "vue";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import CONTROL_MAP from "../";
const props = defineProps({
  formFieldSettings: { type: Array, required: true },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});
const model = defineModel("value", {
  type: Array,
});
watch(
  model,
  (newModel) => {
    if (!newModel) {
      model.value = [{}];
    }
  },
  { immediate: true }
);
function addHolder() {
  if (props.disabled || props.readonly) return;
  model.value.push({});
}
function removeHolder(i) {
  if (props.disabled || props.readonly) return;
  if (model.value.length > 1) model.value.splice(i, 1);
}
function getComponent(type, more = {}) {
  const map = {
    text: CONTROL_MAP.MInput,
    phone: CONTROL_MAP.MPhone,
    country: CONTROL_MAP.MCountry,
    number: CONTROL_MAP.MInputNumber,
    password: CONTROL_MAP.MPasswordInput,
    textarea: CONTROL_MAP.MTextarea,
    select: CONTROL_MAP.MSelect,
    multiple_select: CONTROL_MAP.MSelect,
    checkbox: CONTROL_MAP.MCheckbox,
    radio: CONTROL_MAP.MRadio,
    file: CONTROL_MAP.MFileUpload,
    image: CONTROL_MAP.MImageUpload,
    date: CONTROL_MAP.MDatePicker,
    time: CONTROL_MAP.MTimePicker,
    agrement: CONTROL_MAP.MAgreementReader,
    stockholder: CONTROL_MAP.MStockholder,
    percent: CONTROL_MAP.MPercent,
  };
  const comp = map[type] || CONTROL_MAP.MInput;
  return { component: comp, props: more };
}
</script>
<style scoped lang="scss">
.group-action {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.holder-form {
  border-radius: 4px;
  margin-bottom: 24px;
}
.remove-box {
  text-align: right;
  margin-top: 8px;
}
</style>
```

:::
