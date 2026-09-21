---
title: "jsx的默认插槽、具名插槽、作用域插槽使用"
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
description: "默认插槽和具名插槽： 子组件： 默认插槽 具名插槽 ) 父组件： }, // 默认插槽 // 具名插槽 ) 效果： 作用域插槽： 子组件： 作用域插槽 ) 父组件： }, 今年 岁 ) } )。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/jsx的默认插槽、具名插槽、作用域插槽使用.md"
---
::: v-pre

# jsx的默认插槽、具名插槽、作用域插槽使用

> 本节目标：理解“jsx的默认插槽、具名插槽、作用域插槽使用”的核心思路，并能把它用于实际开发或面试表达。
默认插槽和具名插槽：
子组件：

```
<script>
export default {
```

```
 name: 'HellHome',
```

```
 render() {
```

```
 return (
```

```
 <div class="hello">
```

```
 <h1>
```

默认插槽

```
</h1>
```

```
 {this.$slots.default}
```

```
 <h1>
```

具名插槽

```
</h1>
```

```
 {this.$slots.mike}
```

```
 </div>
```
     `)`

```
 }
}
</script>
```
 父组件：

```
<script>
import HellHome from '@/components/HellHome.vue'
export default {
```

```
 name: 'Home',
```

```
 components: {
```

```
 HellHome
```
   `},`

```
 render() {
```

```
 return (
```

```
 <div class="home">
```

```
 <HellHome>
```
           `//`默认插槽

```
 <div>kkk</div>
```
           `//`具名插槽

```
 <div slot="mike">mike</div>
```

```
 </HellHome>
```

```
 </div>
```
     `)`

```
 }
}
</script>
```
 效果：

作用域插槽：
子组件：

```
<script>
export default {
```

```
 name: 'HelloAbout',
```

```
 render() {
```

```
 return (
```

```
 <div class="hello">
```

```
 <h1>
```

作用域插槽

```
</h1>
```

```
 {this.$scopedSlots.person({ name: 'john', age: 65 })}
```

```
 </div>
```
     `)`

```
 }
}
</script>
```

父组件：

```
<script>
import HelloAbout from '@/components/HelloAbout.vue'
export default {
```

```
 name: 'About',
```

```
 components: {
```

```
 HelloAbout
```
   `},`

```
 render() {
```

```
 return (
```

```
 <div class="about">
```

```
 <HelloAbout
```

```
 scopedSlots={{
```

```
 person: (props) => {
```

```
 return (
```

```
 <div style="backgroundColor:orange">
```

```
 {props.name}
```

今年

```
 {props.age}
```

岁

```
 </div>
```
               `)`
            `}`

```
 }}
```

```
 ></HelloAbout>
```

```
 </div>
```
     `)`

```
 }
}
</script>
https://blog.csdn.net/weixin_46115860/article/details/108872497
```

:::
