---
title: "props传递"
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
description: "在 Vue 3 的 \\<script setup\\ 中，直接传递 props.unit 是否能保持响应性取决于子组件如何处理它。以下是具体分析和解决方案： 1. 直接传递 props.unit 的响应性问题 父组件传递的是 computed 的解包值（如 currency.val。"
sidebarWeight: 145
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/props传递.md"
---
::: v-pre

# props传递

> 本节目标：理解“props传递”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 的 ==\<script setup\>== 中，直接传递 ==props.unit== 是否能保持响应性取决于子组件如何处理它。以下是具体分析和解决方案：

==1. 直接传递== ==props.unit== ==的响应性问题==

- ==父组件传递的是== ==computed== ==的解包值（如== ==currency.value====），子组件通过== ==props.unit== ==接收时：========vue========复制========下载========\<!-- 父组件 --\>========\<DataItemVue== ==:unit====="====currency====" /\>== ==\<!-- currency 是 computed --\>============\<!-- 子组件接收到的实际是 currency.value（字符串，非响应式） --\>==
- ==结果：========如果== ==currency== ==变化，子组件的== ==props.unit== ==不会自动更新，因为它已经是静态值。==
==2. 如何保持响应性？==
==方法 1：子组件用== ==toRef== ==包装 props==
==在子组件中将== ==props.unit== ==转为== ==ref====，以保持对父级变化的响应：==
typescript
复制
下载
// 子组件 (DataItemVue)import \{ toRef \} from 'vue';
const props = defineProps\<\{ unit: string; // 父组件传递的是解包后的值\}\>();
// 将 props.unit 转为响应式引用const unitRef = toRef(props, 'unit');
// 传递给孙组件时，直接传递 unitRef（响应式）\<GrandChildComponent :unit="unitRef" /\>
==原理：==
==toRef(props, 'unit')== ==会创建一个与父组件== ==unit== ==源保持同步的== ==ref====，即使父组件重新渲染传递新值，====unitRef== ==也会更新。==

==方法 2：父组件传递整个== ==computed== ==对象==
==修改父组件，直接传递== ==computed== ==而非其值：==
vue
复制
下载
\<!-- 父组件 --\>\<DataItemVue :unit="currency" /\> \<!-- currency 是 computed 对象 --\>
\<!-- 子组件声明 props 时接受 ComputedRef --\>\<script setup lang="ts"\>const props = defineProps\<\{ unit: string | ComputedRef\<string\>; // 明确允许 ComputedRef\}\>();\</script\>
==优点：==
==子组件可以直接使用== ==props.unit====（无需== ==toRef====），因为它本身就是响应式的。==

==3. 关键对比==

|   |   |   |   |
|---|---|---|---|
|方法|是否需要修改父组件|子组件处理方式|响应性保证|
|直接传递 ==props.unit==|❌ 否|需用 ==toRef(props, 'unit')==|✅ 可靠|
|传递 ==computed== 对象|✅ 是|直接使用 ==props.unit==|✅ 更直接|

==4. 代码示例（方法 1：子组件处理）==
==子组件 (====DataItemVue====)==
typescript
复制
下载
import \{ toRef \} from 'vue';
const props = defineProps\<\{ unit: string; // 父组件传递的是解包后的值\}\>();
// 转为响应式const unitRef = toRef(props, 'unit');
// 传递给孙组件\<GrandChildComponent :unit="unitRef" /\>
==孙组件 (====GrandChildComponent====)==
==直接使用== ==unit== ==prop，它会随父组件的== ==currency== ==变化自动更新：==
typescript
复制
下载
const props = defineProps\<\{ unit: string; // 实际接收的是响应式 unitRef\}\>();

==5. 注意事项==

- ==toRef== ==vs== ==computed==
- ==toRef(props, 'unit')====：适用于 props 是静态值但需响应父级更新。==
- ==computed(() =\> props.unit)====：适用于需要派生逻辑的场景（如格式化）。==
- ==TypeScript 类型========如果父组件可能传递== ==computed== ==或普通值，子组件 props 类型应声明为联合类型：========typescript========复制========下载========defineProps====\<====\{====== ==unit====:== ==string== ==|== ==ComputedRef====\<====string====\>====;========\}====\>====();==
==总结==

- ==直接传递== ==props.unit== ==到孙组件：需在子组件中用== ==toRef== ==包装以保持响应性。==
- ==最佳实践：==
- ==如果可控父组件，优先传递== ==computed== ==对象（====\<Child :unit="computedValue" /\>====）。==
- ==否则，在子组件中用== ==toRef(props, 'unit')== ==转为响应式引用再传递。==

这样可以确保 ==unit== 的响应性在整个组件链中完整传递。
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28](https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28)\>

\> 来自 \<[https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28](https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28)\>

:::
