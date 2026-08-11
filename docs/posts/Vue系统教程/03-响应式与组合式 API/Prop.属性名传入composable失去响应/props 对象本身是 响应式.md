---
title: "props 对象本身是 响应式"
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
description: "在 Vue 3 中，props 对象本身是 响应式 （reactive）的，但其 响应性是浅级的 （shallow），不会自动对嵌套对象做深度转换或跟踪。 1. props 的底层实现 Vue 会在内部对传入组件的 props 对象先做一次 shallowReactive()（再。"
sidebarWeight: 134
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Prop.属性名传入composable失去响应/props 对象本身是 响应式.md"
---
::: v-pre

# props 对象本身是 响应式

> 本节目标：理解“props 对象本身是 响应式”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 中，props 对象本身是 **响应式** （reactive）的，但其 **响应性是浅级的**（shallow），不会自动对嵌套对象做深度转换或跟踪。

1. **props 的底层实现******Vue 会在内部对传入组件的 props 对象先做一次 shallowReactive()（再包装上一层 shallowReadonly()），所以：
    - **顶层属性**（如 props.foo、props.bar）是响应式、可追踪变化的。
    - **嵌套对象**（如 props.user = \{ name: 'Alice' \}）并不会被 Vue 再一次深度转换，因此对子属性的直接修改不会触发渲染更新，除非该对象本身在父组件里已经是响应式的。 [piesdoc.com](https://piesdoc.com/docs/vue3/props/?utm_source=chatgpt.com)[GitHub](https://github.com/vuejs/docs/issues/849?utm_source=chatgpt.com)
2. **监听（watch）默认也是浅级******import \{ defineComponent, watch \} from 'vue'export default defineComponent(\{ props: \{ user: Object \}, setup(props) \{ // 默认只会在 props.user 整个引用变化时触发 watch(() =\> props.user, (newVal, oldVal) =\> \{ console.log('user 引用变了') \})// 若要深度监听嵌套字段，必须明确开启 deep watch(() =\> props.user, (newVal) =\> \{ console.log('user 内部属性也变了') \}, \{ deep: true \}) \}\})
    - 不加 \{ deep: true \} 时，只追踪顶层引用变化。
    - 加上 \{ deep: true \} 后，才会递归地监听所有子属性。
3. **如果需要对子属性做响应**
    - 可以在父组件中把嵌套对象先用 reactive() 或 ref() 包装，再传入子组件；
    - 或在子组件中对 props 做一次深度转换（如 toRefs(props.user) / reactive(props.user)），但要注意这样可能破坏单向数据流的原则。

**总结：**

- **Vue 3 的 props 是响应式的，但只对顶层属性做浅级响应**；
- 对嵌套对象或数组的深度监听，需要手动开启 \{ deep: true \} 或在父级自己构建深度响应式对象。

:::
