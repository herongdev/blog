---
title: "defineProps 和 defineEmits"
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
description: "在 \\<script setup\\ 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits ，它们具备完整的类型推断并且在 \\<script setup\\ 中是直接可用的： defineProps 和 defineEmits 都。"
sidebarWeight: 67
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/单文件组件script setup/defineProps 和 defineEmits.md"
---
::: v-pre

# defineProps 和 defineEmits

> 本节目标：理解“defineProps 和 defineEmits”的核心思路，并能把它用于实际开发或面试表达。
在 `\<script setup\>` 中必须使用 `defineProps` 和 `defineEmits` `API` 来声明 `props` 和 `emits` ，它们具备完整的类型推断并且在 `\<script setup\>` 中是直接可用的：

```
<script setup>
const props = defineProps({
  foo: String,
});
const emit = defineEmits(["change", "delete"]);
// setup code
</script>
```

- `defineProps` 和 `defineEmits` 都是只在 `\<script setup\>` 中才能使用的编译器宏。他们不需要导入且会随着 `\<script setup\>` 处理过程一同被编译掉。
- `defineProps` 接收与

    ```
    props
    ```

     选项相同的值，`defineEmits` 也接收

    ```
    emits
    ```

     选项相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 `setup` 中提升到模块的范围。因此，传入的选项不能引用在 `setup` 范围中声明的局部变量。这样做会引起编译错误。但是，它_可以_引用导入的绑定，因为它们也在模块范围内。在设置属性默认值时，可以使用`imprort`的值和全局变量，不能使用局部变量；

如果使用了 `Typescript`，[使用纯类型声明来声明](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BB%85%E9%99%90-typescript-%E7%9A%84%E5%8A%9F%E8%83%BD) `prop` 和 `emits` 也是可以的。

:::
