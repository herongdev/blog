---
title: "深入理解v-model之自定义组件用法（vue3和vue2对比分析）"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "根据上一篇《深入理解 v model 之表单用法》基本对 v model 有了比较深的理解，接下来我们看看它如何在自定义组件中使用。 在 vue3 中 当在自定义组件中使用 v model 时，组件接收一个属性 modelValue 的值，然后通过触发 update:modelV。"
sidebarWeight: 112
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/自定义事件/深入理解v-model之自定义组件用法（vue3和vue2对比分析）.md"
---
::: v-pre

# 深入理解v-model之自定义组件用法（vue3和vue2对比分析）

> 本节目标：理解“深入理解v-model之自定义组件用法（vue3和vue2对比分析）”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
根据上一篇《[深入理解](https://juejin.im/post/6877143018160259085) `v-model` 之表单用法》基本对 `v-model` 有了比较深的理解，接下来我们看看它如何在自定义组件中使用。
**在** `vue3` **中**
当在自定义组件中使用`v-model`时，组件接收一个属性`modelValue`的值，然后通过触发`update:modelValue`事件来更新该值：

```
<custom-comp v-model="msg"></custom-comp><!--
```

等价于

```
 --><custom-comp :model-value="msg" @update:model-value="msg = $event"></custom-comp><!--
```

建议命名按照`kebab-cased`规范，如：`model-value`，而不是

```
modelValue -->
```

复制代码
`v-model` **实现**
根据上面的定义规则，我们可以这样实现一个自定义 `input` 组件：
`//` 示例`1`：自定义`input`组件

```
//
```

实现`1`：

```
app.component('custom-input', {  props: ['modelValue'],  template: `    <input      :value="modelValue"      @input="$emit('update:modelValue', $event.target.value)"    >  `,});//
```

实现`2`：使用`input`的`v-model + computed(`计算属性

```
)app.component('custom-input', {  props: ['modelValue'],  computed: {    value: {      get() {        return this.modelValue;      },      set(v) {        this.$emit('update:modelValue', v);      },    },  },  template: `    <input v-model="value">  `,});
```

复制代码
使用：

```
<custom-input v-model="msg"></custom-input>;
```

复制代码
上面示例只是对 `input` 做了一层包装，如果自定义组件里面不包含 `input` 又该如何实现呢？为了加深理解，我们看下面一个自定义 `count` 组件示例：
`//` 示例`2`：自定义`count`组件

```
app.component('custom-count', {  props: {    modelValue: Number,  },  methods: {    increment() {      this.$emit('update:modelValue', ++this.modelValue);    },    decrement() {      this.$emit('update:modelValue', --this.modelValue);    },  },  template: `    <button @click="increment">+1</button> ~     <button @click="decrement">-1</button>    <p>{{modelValue}}</p>  `,});
```

复制代码
使用：

```
<custom-count v-model="num"></custom-count>;
```

复制代码
我们来看看[实现效果](https://codepen.io/cleam_lee/pen/ExKMYKE)：

`v-model` **参数**
通过示例我们发现 `v-model` 是接收属性`modelValue`的值，然后触发事件`update:modelValue`来更新该值，那么我们可不可以修改这个属性名`modelValue`呢？该如何操作？其实我们只需要给`v-model`添加参数即可，比如：`v-model:mv`，这样就将`modelValue`换成了`mv`。
我们来将上面的自定义组件改造一下：

```
app.component('custom-input', {  props: ['mv'],  template: `    <input      :value="mv"      @input="$emit('update:mv', $event.target.value)"    >  `,});
```

复制代码
使用方式就变成了：

```
<custom-input v-model:mv="msg"></custom-input>;
```

复制代码
**多个** `v-model` **绑定**
正是由于 `vue3` 中新增了 `v-model` 的参数传递，所以自定义组件可以同时支持多个`v-model`的绑定：

```
<user-name v-model:first-name="firstName" v-model:last-name="lastName"></user-name>
```

复制代码
组件实现就变成了：

```
app.component('user-name', {  props: {    firstName: String,    lastName: String,  },  template: `    <input       type="text"      :value="firstName"      @input="$emit('update:firstName', $event.target.value)">
<input      type="text"      :value="lastName"      @input="$emit('update:lastName', $event.target.value)">  `,});
```

复制代码
[实现效果](https://codepen.io/cleam_lee/pen/MWyRpvg)：

**在** `vue2` **中**
当在自定义组件中使用`v-model`时，组件接收一个属性`value`的值，然后通过触发`input`事件来更新该值，这样便实现了`v-model`：

```
<custom-comp v-model="msg"></custom-comp><!--
```

等价于

```
 --><custom-comp :value="msg" @input="msg = $event"></custom-comp>
```

复制代码
`v-model` **实现**
实现方式类似，我们看下 `vue2` 中实现一个自定义 `input` 组件：
`//` 示例`1`：自定义`input`组件

```
Vue.component('comp-input', {  props: {    value: String,  },  template: `    <input      type="text"      :value="value"      @input="$emit('input', $event.target.value)"    >  `,});
```

复制代码
**自定义** `v-model` **属性**
同样在 `vue2` 中也支持修改接收的属性名，只是和 `vue3` 不同，`vue2` 是通过在组件中指定属性 `model` 的 `prop` 和 `event` 来修改：
`//` 示例`2`：自定义`count`组件

```
Vue.component('custom-count', {  model: {    prop: 'v', // default: value    event: 'i', // default: input  },  props: {    v: Number,  },  data() {    return {      count: this.v,    };  },  template: `<button @click="$emit('i', ++count)">+1</button>`,});
```

复制代码
我们看到在这个示例里面多了一个`model`属性，并指定了两个属性：`prop`和`event`，没错，这正是 `v-model` 需要的属性和事件名，只是他们的默认值为`value`和`input`，我们通过修改 `model` 属性的 `prop` 和 `event` 就实现了自定义。
[在线效果](https://codepen.io/cleam_lee/pen/mdPvWvY)：

关于为什么要出来一个 `model` 属性，[官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)也有说明，就是为了避免和 `value` 值有其他用途时和 `v-model` 产生冲突，比如单选框、复选框，具体可以查看官方[示例](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)。
**总结**
自定义组件的 `v-model` 我们通过在 `vue3` 和 `vue2` 中的实现都讲解了一遍，而且也能发现了其中的差异：

1. `vue3` 默认属性名、事件名为：`modelValue`和`update:modelValue`；而 `vue2` 中则是：`value`和`input`；
2. `vue3` 中直接通过 `v-model` 后面参数`v-model:foo`来指定属性名，而且修改体现在父组件中，并且支持绑定多个 `v-model`；而 `vue2` 中通过子组件的`model` 属性中的`prop`值和`event`值来指定属性名和事件名，修改体现在子组件中。

接下来我们来看下一篇：《[深入理解](https://juejin.im/post/6877745193097887751) `v-model` 之修饰符（`vue3` 和 `vue2` 对比分析）》。
 \> 来自

```
 <https://juejin.im/post/6877383634349719565>
```

:::
