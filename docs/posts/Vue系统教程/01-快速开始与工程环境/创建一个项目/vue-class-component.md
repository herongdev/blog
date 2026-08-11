---
title: "vue-class-component"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "为了在 vue2 中使用 Ts ，我们要使用此插件： 官网地址为： } data 定义，注意响应式的坑 } 计算属性 计算属性可以声明为类属性 getter/setter ： } 生命周期钩子 也是直接声明为类原型上的方法；但实例本身不能直接调用它们， 声明自定义方法时，应避免使。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue-cli/创建一个项目/vue-class-component.md"
---
::: v-pre

# vue-class-component

> 本节目标：理解“vue-class-component”的核心思路，并能把它用于实际开发或面试表达。
为了在`vue2`中使用`Ts`，我们要使用此插件：
官网地址为：

```
Overview | Vue Class Component (vuejs.org)
<template>
```

```
 <div>
```

```
 <button v-on:click="decrement">-</button>
```

```
 {{ count }}
```

```
 <button v-on:click="increment">+</button>
```

```
 </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
// Define the component in class-style
@Component
export default class Counter extends Vue {
```

```
 // Class properties will be component data
```

```
 count = 0;
```

```
 // Methods will be component methods
```

```
 increment() {
```

```
 this.count++;
```
   `}`

```
 decrement() {
```

```
 this.count--;
```

```
 }
}
</script>
```

`data`定义，注意响应式的坑

```
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class HelloWorld extends Vue {
```

```
 // `message` will not be reactive value
```

```
 message = undefined
```

```
 // `message` will be reactive with `null` value
```

```
 message = null
```

```
 // See Hooks section for details about `data` hook inside class.
```

```
 data() {
```

```
 return {
```

```
 // `hello` will be reactive as it is declared via `data` hook.
```

```
 hello: undefined
```
     `}`

```
 }
}
```

==计算属性==
==计算属性可以声明为类属性== `getter/setter`==：==

```
<template>
```

```
 <input v-model="name" />
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class HelloWorld extends Vue {
```

```
 firstName = "John";
```

```
 lastName = "Doe";
```

```
 // Declared as computed property getter
```

```
 get name() {
```

```
 return this.firstName + " " + this.lastName;
```
   `}`

```
 // Declared as computed property setter
```

```
 set name(value) {
```

```
 const splitted = value.split(" ");
```

```
 this.firstName = splitted[0];
```

```
 this.lastName = splitted[1] || "";
```

```
 }
}
</script>
```

==生命周期钩子==
==也是直接声明为类原型上的方法；但实例本身不能直接调用它们，==
声明自定义方法时，应避免使用这些保留名称

```
import Component from 'vue-class-component'
@Component
export default class HelloWorld extends Vue {
```

```
 // Declare mounted lifecycle hook
```

```
 mounted() {
```

```
 console.log('mounted')
```
   `}`

```
 // Declare render function
```

```
 render() {
```

```
 return <div>Hello World!</div>
```

```
 }
}
```

其他选项
对于所有其他选项，请将它们传递给装饰器函数：

```
<template>
```

```
 <OtherComponent />
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import OtherComponent from "./OtherComponent.vue";
@Component({
```

```
 // Specify `components` option.
```

```
 // See Vue.js docs for all available options:
```

```
 // https://vuejs.org/v2/api/#Options-Data
```

```
 components: {
```

```
 OtherComponent,
```

```
 },
})
export default class HelloWorld extends Vue {}
</script>
```

附加挂钩
如果您使用一些 `Vue` 插件，例如`Vue` 路由器，您可能希望类组件解析它们提供的挂钩。在这种情况下，允许您注册此类钩子：

```
Component.registerHooks
// class-component-hooks.js
import Component from 'vue-class-component'
// Register the router hooks with their names
Component.registerHooks([
```

```
 'beforeRouteEnter',
```

```
 'beforeRouteLeave',
```

```
 'beforeRouteUpdate'
])
```
 注册钩子后，类组件将它们实现为类原型方法：

```
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class HelloWorld extends Vue {
```

```
 // The class component now treats beforeRouteEnter,
```

```
 // beforeRouteUpdate and beforeRouteLeave as Vue Router hooks
```

```
 beforeRouteEnter(to, from, next) {
```

```
 console.log('beforeRouteEnter')
```

```
 next()
```
   `}`

```
 beforeRouteUpdate(to, from, next) {
```

```
 console.log('beforeRouteUpdate')
```

```
 next()
```
   `}`

```
 beforeRouteLeave(to, from, next) {
```

```
 console.log('beforeRouteLeave')
```

```
 next()
```

```
 }
}
```

建议将此注册码写入单独的文件中，因为您必须在任何组件定义之前注册它们。您可以通过在主文件的顶部放置钩子注册的语句来确保执行顺序：

```
import
// main.js
// Make sure to register before importing any components
import './class-component-hooks'
import Vue from 'vue'
import App from './App'
new Vue({
```

```
 el: '#app',
```

```
 render: h => h(App)
})
```

自定义装饰器
您可以通过创建自己的装饰器来扩展此库的功能。`Vue` 类组件提供了帮助程序来创建自定义装饰器。

```
 createDecorator
```

需要一个回调函数作为第一个参数，回调函数将接收以下参数：

- `options`：`Vue` 组件选项对象。对此对象所做的更改将影响提供的组件。
- `key`：应用装饰器的属性或方法键。
- `parameterIndex`：如果自定义装饰器用于参数，则修饰参数的索引。

创建装饰器的示例，该装饰器在调用修饰方法时打印带有方法名称和传递参数的日志消息：

```
Log
// decorators.js
import { createDecorator } from 'vue-class-component'
// Declare Log decorator.
export const Log = createDecorator((options, key) => {
```

```
 //
```

保存原始方法

```
 const originalMethod = options.methods[key]
```

```
 // Wrap the method with the logging logic.
```

```
 options.methods[key] = function wrapperMethod(...args) {
```

```
 // Print a log.
```

```
 console.log(`Invoked: ${key}(`, ...args, ')')
```

```
 // Invoke the original method.
```

```
 originalMethod.apply(this, args)
```

```
 }
})
```

将其用作方法装饰器：

```
import Vue from 'vue'
import Component from 'vue-class-component'
import { Log } from './decorators'
@Component
class MyComp extends Vue {
```

```
 // It prints a log when `hello` method is invoked.
```

```
 @Log
```

```
 hello(value) {
```

```
 // ...
```

```
 }
}
```

在上面的代码中，当使用 调用方法时，将打印以下日志：

```
hello42
Invoked: hello( 42 )
```

类继承
可以扩展一个存在的类组件通过原生的继承语法；假设您有以下超类组件：

```
// super.js
import Vue from 'vue'
import Component from 'vue-class-component'
// Define a super class component
@Component
export default class Super extends Vue {
```

```
 superValue = 'Hello'
}
```

现对其进行扩展；

```
import Super from './super'
import Component from 'vue-class-component'
// Extending the Super class component
@Component
export default class HelloWorld extends Super {
```

```
 created() {
```

```
 console.log(this.superValue) // -> Hello
```

```
 }
}
```
 ==请注意，每个超类都必须是一个类组件。换句话说，它需要继承==`Vue`==构造函数作为祖先，并由==`@Component`==装饰器进行装饰。==

```
Mixins
Vue
```

类组件提供了`mixins`帮助函数，以类组件的方式使用`mixins`；通过使用`mixins`助手，`TypeScript`可以推断出`mixin`类型，并在组件类型中继承它们

```
;
// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'
// You can declare mixins as the same style as components.
@Component
export class Hello extends Vue {
```

```
 hello = 'Hello'
}
@Component
export class World extends Vue {
```

```
 world = 'World'
}
```

在类组件中使用它们

```
import Component, { mixins } from 'vue-class-component'
import { Hello, World } from './mixins'
// Use `mixins` helper function instead of `Vue`.
// `mixins` can receive any number of arguments.
@Component
export class HelloWorld extends mixins(Hello, World) {
```

```
 created() {
```

```
 console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
```

```
 }
}
```

类组件的注意事项
`Vue`类组件通过在底层实例化原始构造函数来收集类属性作为`Vue`实例数据。虽然我们可以像定义本机类那样定义实例数据，但有时我们需要知道它是如何工作的；

属性初始化器中的`this`值，注意类属性和类方法两个不同概念
如果你将一个箭头函数定义为一个类属性并在其中访问`this`函数，它将无法工作。这是因为`this`只是初始化类属性时，`Vue`实例的一个代理对象

```
:
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class MyComp extends Vue {
```

```
 foo = 123
```

```
 // DO NOT do this
```

```
 bar = () => {
```

```
 //
```

不会更新期望的属性值

```
 // `this` value is not a Vue instance in fact.
```

```
 this.foo = 456
```

```
 }
}
```

在这种情况下，你可以简单地定义一个方法而不是类属性，因为`Vue`会自动绑定该实例

```
:
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class MyComp extends Vue {
```

```
 foo = 123
```

```
 // DO this
```

```
 bar() {
```

```
 // Correctly update the expected property.
```

```
 this.foo = 456
```

```
 }
}
```

总是使用生命周期钩子而不是构造函数
当初始构造函数被调用来收集组件的初始数据时，建议不要自己声明构造函数

```
:
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Posts extends Vue {
```

```
 posts = []
```

```
 // DO NOT do this
```

```
 constructor() {
```

```
 fetch('/posts.json')
```

```
 .then(res => res.json())
```

```
 .then(posts => {
```

```
 this.posts = posts
```
       `})`

```
 }
}
```

上面的代码打算在组件初始化时获取`post`列表，但由于`Vue`类组件的工作方式，获取将被意外调用两次。
建议写生命周期钩子，比如`create`，而不是

```
constructor:
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Posts extends Vue {
```

```
 posts = []
```

```
 // DO this
```

```
 created() {
```

```
 fetch('/posts.json')
```

```
 .then(res => res.json())
```

```
 .then(posts => {
```

```
 this.posts = posts
```
       `})`

```
 }
}
```

`TypeScript`的应用
`props`属性定义
`Vue` 类组件没有用于 `props` 定义的专用 `API`。但是，您可以使用规范的`Vue.extend API` 来执行此操作：

```
<template>
```

```
 <div>{{ message }}</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
```

```
 props: {
```

```
 name: String,
```

```
 },
});
// Use defined props by extending GreetingProps.
@Component
export default class Greeting extends GreetingProps {
```

```
 get message(): string {
```

```
 // this.name will be typed
```

```
 return "Hello, " + this.name;
```

```
 }
}
</script>
Vue.extend
```

推断出定义的`prop`类型，可以通过继承`extends`它来在你的类组件中使用它们，即属性定义。

如果你有一个超类组件或`mixins`要扩展，使用`mixins`助手可以将定义好的属性与它们组合在一起；

```
<template>
```

```
 <div>{{ message }}</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import Super from "./super";
// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
```

```
 props: {
```

```
 name: String,
```

```
 },
});
// Use `mixins` helper to combine defined props and a mixin.
@Component
export default class Greeting extends mixins(GreetingProps, Super) {
```

```
 get message(): string {
```

```
 // this.name will be typed
```

```
 return "Hello, " + this.name;
```

```
 }
}
</script>
```

属性类型声明
有时候，你必须在类组件外定义组件属性和方法。例如，`Vue`的官方状态管理库`Vuex`提供了`mapGetters`和`mapActions`帮助程序来将存储映射到组件属性和方法。这些帮助程序需要在组件选项对象中使用。

即使在这种情况下，你也可以将组件选项传递给`@Component`装饰器的参数。但是，当属性和方法在运行时工作时，它不会在类型级别上自动声明它们。

你需要在类组件中手动声明它们的类型

```
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'
// Interface of post
import { Post } from './post'
@Component({
```

```
 computed: mapGetters([
```

```
 'posts'
```
   `]),`

```
 methods: mapActions([
```

```
 'fetchPosts'
```

```
 ])
})
export default class Posts extends Vue {
```

```
 // Declare mapped getters and actions on type level.
```

```
 // You may need to add `!` after the property name
```

```
 // to avoid compilation error (definite assignment assertion).
```

```
 // Type the mapped posts getter.
```

```
 posts!: Post[]
```

```
 // Type the mapped fetchPosts action.
```

```
 fetchPosts!: () => Promise<void>
```

```
 mounted() {
```

```
 // Use the mapped getter and action.
```

```
 this.fetchPosts().then(() => {
```

```
 console.log(this.posts)
```
     `})`

```
 }
}
```

`$refs`

```
Type Extension
$refs
```

类型被声明为最广泛的类型，以处理所有可能的`ref`类型。虽然这在理论上是正确的，但在大多数情况下，每个`ref`实际上只有一个特定的元素或组件。

你可以通过在类组件中重写`$refs`类型来指定一个特定的`ref`类型

```
:
<template>
```

```
 <input ref="input" />
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class InputFocus extends Vue {
```

```
 // annotate refs type.
```

```
 //
```

需要符号 `` `!` (definite assignment assertion ``明确分配断言`)`消除编译错误

```
 $refs!: {
```

```
 input: HTMLInputElement;
```
   `};`

```
 mounted() {
```

```
 // Use `input` ref without type cast.
```

```
 this.$refs.input.focus();
```

```
 }
}
</script>
```
 您可以访问输入类型，而不需要将类型转换为`$ref`。在上面的例子中，输入类型是在类组件中指定的。
注意，它应该是一个类型注释`(`使用冒号`:)`，而不是赋值`(=);`

```
Hooks Auto-complete
Vue
```

类组件为`TypeScript`提供了内置的钩子类型，可以在类组件声明中自动完成数据、渲染和其他生命周期钩子。要启用它，您需要导入位于`vue-class-component/hooks`的钩子类型

```
// main.ts
import 'vue-class-component/hooks' // import hooks type to enable auto-complete
import Vue from 'vue'
import App from './App.vue'
new Vue({
```

```
 render: h => h(App)
}).$mount('#app')
```

如果你想让它与自定义钩子一起工作，你可以手动添加它自己

```
:
import Vue from 'vue'
import { Route, RawLocation } from 'vue-router'
declare module 'vue/types/vue' {
```

```
 // Augment
```

增加 `component instance type`

```
 interface Vue {
```

```
 beforeRouteEnter?(
```

```
 to: Route,
```

```
 from: Route,
```

```
 next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
```

```
 ): void
```

```
 beforeRouteLeave?(
```

```
 to: Route,
```

```
 from: Route,
```

```
 next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
```

```
 ): void
```

```
 beforeRouteUpdate?(
```

```
 to: Route,
```

```
 from: Route,
```

```
 next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
```

```
 ): void
```

```
 }
}
```

在装饰器中注释组件类型
有些情况下，你想在`@Component`装饰器参数中的函数上使用你的组件类型。例如，要访问`watch`处理器中的组件方法

```
:
@Component({
```

```
 watch: {
```

```
 postId(id: string) {
```

```
 // To fetch post data when the id is changed.
```

```
 this.fetchPost(id) // -> Property 'fetchPost' does not exist on type 'Vue'.
```
     `}`

```
 }
})
class Post extends Vue {
```

```
 postId: string
```

```
 fetchPost(postId: string): Promise<void> {
```

```
 // ...
```

```
 }
}
```
 上面的代码会产生一个类型错误，表明`fetchPost`在`watch`处理程序中不存在。发生这种情况是因为`@Component`装饰器参数中的类型通常是基本`Vue`类型。但`Vue`基本类型中并没有`fetchPost`这个类型；

要使用您自己的组件类型`(`在本例中是`Post)`，您可以通过其类型参数来注释该装饰器。
`//` 用组件类型“`Post`”来注释装饰器，使装饰器参数中的“`this`”类型变为“`Post`”

```
@Component<Post>({
```

```
 watch: {
```

```
 postId(id: string) {
```

```
 this.fetchPost(id) // -> No errors
```
   `}`

```
 }
})
```

```
 class Post extends Vue {
```

```
 postId: string
```

```
 fetchPost(postId: string): Promise<void> {
```

```
 // ...
```

```
 }
}
```

:::
