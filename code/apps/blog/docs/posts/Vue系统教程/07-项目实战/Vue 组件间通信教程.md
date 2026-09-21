---
title: "Vue 组件间通信教程"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "一、父子组件通信 1. 使用 props 和 $emit Vue 2 & Vue 3 父组件传递数据给子组件 ： \\<! 父组件 \\ \\<template\\ \\<div\\ \\<child component :myTitle \"parentTitle\"\\ \\</child com。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/Vue 组件间通信教程.md"
---
::: v-pre

# Vue 组件间通信教程

> 本节目标：理解“Vue 组件间通信教程”的核心思路，并能把它用于实际开发或面试表达。
一、父子组件通信
1. 使用 `props` 和 `$emit`
**Vue 2 & Vue 3**
- **父组件传递数据给子组件**：
\<!-- 父组件 --\>
\<template\>
\<div\>
\<child-component :myTitle="parentTitle"\>\</child-component\>
\</div\>
\</template\>
\<script\>
export default \{
data() \{
return \{
parentTitle: '张三'
\};
\}
\};
\</script\>
\<!-- 子组件 --\>
\<template\>
\<div\>\{\{ myTitle \}\}\</div\>
\</template\>
\<script\>
export default \{
props: ['myTitle']
\};
\</script\>

- **子组件向父组件传递数据**：
\<!-- 父组件 --\>
\<template\>
\<div\>
\<child-component @message="handleMessage"\>\</child-component\>
\</div\>
\</template\>
\<script\>
export default \{
methods: \{
handleMessage(msg) \{
console.log('Message from child:', msg);
\}
\}
\};
\</script\>
\<!-- 子组件 --\>
\<template\>
\<button @click="sendMessage"\>Send Message\</button\>
\</template\>
\<script\>
export default \{
methods: \{
sendMessage() \{
this.$emit('message', 'Hello from child!');
\}
\}
\};
\</script\>

2. 使用 `ref` 和 `$parent / $children`
**Vue 2 & Vue 3**
- **父组件访问子组件方法**：
\<!-- 父组件 --\>
\<template\>
\<div\>
\<child-component ref="childRef"\>\</child-component\>
\<button @click="accessChildMethod"\>Access Child Method\</button\>
\</div\>
\</template\>
\<script\>
export default \{
methods: \{
accessChildMethod() \{
this.$refs.childRef.childMethod();
\}
\}
\};
\</script\>
\<!-- 子组件 --\>
\<template\>
\<div\>Child Component\</div\>
\</template\>
\<script\>
export default \{
methods: \{
childMethod() \{
console.log('Child Method Called');
\}
\}
\};
\</script\>
二、兄弟组件通信
1. 使用事件总线（Event Bus）
**Vue 2**
// event-bus.js
import Vue from 'vue';
export const EventBus = new Vue();
\<!-- 兄弟组件一 --\>
\<template\>
\<button @click="sendMessage"\>Send Message\</button\>
\</template\>
\<script\>
import \{ EventBus \} from '../event-bus';
export default \{
methods: \{
sendMessage() \{
EventBus.$emit('message', 'Hello from Sibling One');
\}
\}
\};
\</script\>
\<!-- 兄弟组件二 --\>
\<template\>
\<div\>\{\{ message \}\}\</div\>
\</template\>
\<script\>
import \{ EventBus \} from '../event-bus';
export default \{
data() \{
return \{
message: ''
\};
\},
created() \{
EventBus.$on('message', (msg) =\> \{
this.message = msg;
\});
\}
\};
\</script\>
**Vue 3**
// event-bus.js
import \{ createApp \} from 'vue';
export const EventBus = createApp(\{\});
\<!-- 兄弟组件一 --\>
\<template\>
\<button @click="sendMessage"\>Send Message\</button\>
\</template\>
\<script\>
import \{ EventBus \} from '../event-bus';
export default \{
methods: \{
sendMessage() \{
EventBus.config.globalProperties.$emit('message', 'Hello from Sibling One');
\}
\}
\};
\</script\>
\<!-- 兄弟组件二 --\>
\<template\>
\<div\>\{\{ message \}\}\</div\>
\</template\>
\<script\>
import \{ EventBus \} from '../event-bus';
export default \{
data() \{
return \{
message: ''
\};
\},
created() \{
EventBus.config.globalProperties.$on('message', (msg) =\> \{
this.message = msg;
\});
\}
\};
\</script\>
三、跨级组件通信
1. 使用 `provide/inject`
**Vue 2**
\<!-- 祖先组件 --\>
\<template\>
\<descendant-component\>\</descendant-component\>
\</template\>
\<script\>
export default \{
provide() \{
return \{
message: 'Hello from Ancestor'
\};
\}
\};
\</script\>
\<!-- 后代组件 --\>
\<template\>
\<div\>\{\{ message \}\}\</div\>
\</template\>
\<script\>
export default \{
inject: ['message']
\};
\</script\>
**Vue 3**
\<!-- 祖先组件 --\>
\<template\>
\<descendant-component\>\</descendant-component\>
\</template\>
\<script\>
import \{ provide \} from 'vue';
export default \{
setup() \{
provide('message', 'Hello from Ancestor');
\}
\};
\</script\>
\<!-- 后代组件 --\>
\<template\>
\<div\>\{\{ message \}\}\</div\>
\</template\>
\<script\>
import \{ inject \} from 'vue';
export default \{
setup() \{
const message = inject('message');
return \{ message \};
\}
\};
\</script\>
2. 使用 Vuex
**Vue 2 & Vue 3**
// store/index.js
import \{ createStore \} from 'vuex';
export default createStore(\{
state: \{
message: ''
\},
mutations: \{
setMessage(state, message) \{
state.message = message;
\}
\}
\});
\<!-- 兄弟组件一 --\>
\<template\>
\<button @click="sendMessage"\>Send Message\</button\>
\</template\>
\<script\>
export default \{
methods: \{
sendMessage() \{
this.$store.commit('setMessage', 'Hello from Sibling One');
\}
\}
\};
\</script\>
\<!-- 兄弟组件二 --\>
\<template\>
\<div\>\{\{ message \}\}\</div\>
\</template\>
\<script\>
export default \{
computed: \{
message() \{
return this.$store.state.message;
\}
\}
\};
\</script\>
四、使用 `$attrs` 和 `$listeners`
**Vue 2**
\<!-- 父组件 --\>
\<template\>
\<child-component v-bind="$attrs" v-on="$listeners"\>\</child-component\>
\</template\>
\<!-- 子组件 --\>
\<template\>
\<grandchild-component v-bind="$attrs" v-on="$listeners"\>\</grandchild-component\>
\</template\>
**Vue 3**
\<!-- 父组件 --\>
\<template\>
\<child-component v-bind="$attrs" v-on="$attrs"\>\</child-component\>
\</template\>
\<!-- 子组件 --\>
\<template\>
\<grandchild-component v-bind="$attrs" v-on="$attrs"\>\</grandchild-component\>
\</template\>
总结
在 Vue 中，组件通信方式有很多，可以根据具体需求选择合适的通信方式。父子组件之间通常使用 `props` 和 `$emit`，兄弟组件之间可以通过事件总线，跨级组件可以使用 `provide/inject` 或 Vuex。对于更复杂的应用场景，Vuex 是一个强大的状态管理工具。希望这个教程能够帮助你更好地理解和应用 Vue 中的组件通信方式。

:::
