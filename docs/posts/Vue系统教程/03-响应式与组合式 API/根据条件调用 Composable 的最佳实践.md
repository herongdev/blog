---
title: "根据条件调用 Composable 的最佳实践"
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
description: "1. 背景和问题 在 Vue 3 中，composable 是封装状态逻辑的强大工具，但当需要根据条件（如 props.visible）调用时，可能导致性能浪费或响应式问题。例如，在金融交易系统的 sltp field.vue 中，仅当 props.visible true 时调。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/composable/根据条件调用 Composable 的最佳实践.md"
---
::: v-pre

# 根据条件调用 Composable 的最佳实践

> 本节目标：理解“根据条件调用 Composable 的最佳实践”的核心思路，并能把它用于实际开发或面试表达。
**1. 背景和问题**
在 Vue 3 中，composable 是封装状态逻辑的强大工具，但当需要根据条件（如 props.visible）调用时，可能导致性能浪费或响应式问题。例如，在金融交易系统的 sltp-field.vue 中，仅当 props.visible = true 时调用 useSLTP：
const \{ difference, meta \} = useSLTP(toRef(props, 'config'), props.isStopLoss);
**问题**：

- 无条件调用导致隐藏组件时的计算浪费。
- 条件调用可能丢失响应式。
- TypeScript 类型安全需保证。

**2. 解决方案**
**方法 1：使用 computed 包装**
const defaultMeta: FieldMeta = \{ min: -Number.MAX_VALUE, max: Number.MAX_VALUE, step: 1, precision: 2 \};const defaultDifference: DifferenceMetrics | null = null;
const sltpData = computed(() =\> \{ if (!props.visible) \{ return \{ difference: ref(defaultDifference), meta: ref(defaultMeta) \}; \} return useSLTP(toRef(props, 'config'), props.isStopLoss);\});
const \{ difference, meta \} = sltpData.value;
**优点**：简洁、响应式、性能优。 **适用**：纯数据、无副作用的 composable。
**方法 2：使用 watch 控制**
const difference = ref\<DifferenceMetrics | null\>(defaultDifference);const meta = ref\<FieldMeta\>(defaultMeta);
watch( () =\> props.visible, (visible) =\> \{ if (visible) \{ const \{ difference: newDifference, meta: newMeta \} = useSLTP(toRef(props, 'config'), props.isStopLoss); difference.value = newDifference.value; meta.value = newMeta.value; \} \}, \{ immediate: true \});
**优点**：灵活，支持副作用。 **适用**：有定时器、事件监听的 composable。
**方法 3：使用 ref 手动触发**
const sltpInstance = ref(null);
watchEffect(() =\> \{ if (props.visible) \{ sltpInstance.value = useSLTP(toRef(props, 'config'), props.isStopLoss); \} else \{ sltpInstance.value = null; \}\});
const difference = computed(() =\> sltpInstance.value ? sltpInstance.value.difference.value : defaultDifference);
**优点**：精确控制，适合资源管理。 **适用**：需销毁或重用的 composable。
**3. 最佳实践**

1. **优先** computed：适合简单条件，保持响应式。
2. **默认值**：提供类型安全默认值（如 defaultMeta）。
3. **响应式**：用 ref 包装默认值。
4. **边界处理**：UI 显示占位符（如 -）。
5. **日志**：记录无效参数警告。
6. **性能**：监控 composable 开销。
7. **测试**：验证条件切换和边界条件。

**4. 示例：sltp-field.vue**
const sltpData = computed(() =\> \{ if (!props.visible) \{ return \{ difference: ref(defaultDifference), meta: ref(defaultMeta) \}; \} return useSLTP(toRef(props, 'config'), props.isStopLoss);\});
**效果**：仅 visible = true 时计算，符合金融系统性能要求。
**5. 常见问题**
**Q1：副作用如何处理？**

- 使用 watch，在 onUnmounted 清理。

**Q2：多条件如何组合？**

- 在 computed 中检查多个条件。

**6. 总结**
computed 是条件调用 composable 的首选，结合默认值和边界处理，确保性能和鲁棒性。在金融系统中，优化计算和用户体验至关重要。

:::
