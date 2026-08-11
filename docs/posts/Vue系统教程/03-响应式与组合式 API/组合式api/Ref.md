---
title: "Ref"
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
description: "在组合式api中，我们将处理特定业务的代码放在一起，这样会便于维护，而不用在理清业务逻辑时，在vue的不同生命周期，watch等中来回查看业务； 由于代码放在一起，所以代码会比较长，又不便于快速阅读来进行理解了。这时，我们将一些代码封装到一个函数中，并给这个函数取一个能很好解决代。"
sidebarWeight: 116
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/组合式api/Ref.md"
---
::: v-pre

# Ref

> 本节目标：理解“Ref”的核心思路，并能把它用于实际开发或面试表达。
在组合式api中，我们将处理特定业务的代码放在一起，这样会便于维护，而不用在理清业务逻辑时，在vue的不同生命周期，watch等中来回查看业务；

由于代码放在一起，所以代码会比较长，又不便于快速阅读来进行理解了。这时，我们将一些代码封装到一个函数中，并给这个函数取一个能很好解决代码作用的名字；

这个函数最终是返回一个我们想要的值，由于vue是响应式设计的，我们要在值变化的时候，变化相应逻辑得到计算变量，或将最新的变化的值渲染出来；所以，我们不当要求这个封装的函数返回一个变量值，还要返回一个能更改这个变量的方法，这样我们可以随时调用这个方法来改变这个值，而值的改变引发一系列变化，最终体现在视图更新上；

从这里，我们看到，我们返回的这个方法是要能改变我们返回的变量的，并且，多次调用这个方法时，改变的这个变量要还是之前的那个变量，而不是返回一个全新的变量；如果这个变量是基本值，比如：

```
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
//
```

在我们的组件内

```
setup (props) {
  let repositories = []
  const getUserRepositories = async () => {
    repositories = await fetchUserRepositories(props.user)
  }
  return {
    repositories,
    getUserRepositories //
```

返回的函数与方法的行为相同

```
  }
}
```

在这个setup方法中，我们返回了变量repositories和getUserRepositories方法；
这个变量是定义在方法外面，我们在方法内直接改变了这个定义在外部的变量；

这只是一个普通的函数，封装了一个逻辑来精简主逻辑；当我们在主逻辑代码中调用这个方法来获得最新的变量时，如果这个变量只是一个基本类型的值，比如number类型，它之前是1，我们调用方法后，它变成了100，基本类型值的变化，我们无法进行proxy代理进行拦截的，proxy代理的必须是一个对象，我们对对象的属性进行变化，或对这个对象进行操作时，我们才能进行拦截，加入自己的逻辑，所以，为了能让这个number类型的值的变化被我们感应到，从而进行拦截，我们必须将它变成一个对象，所以，我们封装的这个方逻辑它必须返回值为对象的变量，同时还返回一个修改外部变量的方法，这样，当我们调用方法改变这个对象类型而不是基本类型的变量时，vue才能感应到这个值的变化，从而对这个值的变化调用相应的副作用，进而更新渲染；

在vue中，提供了一个方法ref，它可以将一个传入的值包装在一个对象中，这个对象拥有value属性，这个属性存储着这个传入的值，最后ref将这个对象返回；这样的话，我们封装的业务返回的变量将始终是一个对象，而返回的这个方法只是修改了这个对象的value属性中保存的值，这个对象还是之前的那个对象，也就是说始终是同一个内存地址，变化的只是它的value属性的值；

这样，对同一个对象的属性，比如value进行修改时，Proxy将能对这个进行拦截，也就是获取值的时候进行计算，初始获取的时候还收集依赖，设置值的时候通知订阅方这个变化。

Ref还有一个重要的使用是让返回的这个对象变成了响应性的，也就是说，value值的获取和修改都已经被代理，会被拦截；

总而言之，为了不丢掉响应性，我们封装的返回一个变量和修改变量方法的逻辑中，返回的变量不管是基本类型还是引用类型，我们都使用Ref进行包装；我们一般把这个封装函数叫做hooks，钩子函数；

在上例中：
回到我们的例子，让我们创建一个响应式的

```
 repositories
```

变量：

```
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'
//
```

在我们的组件中

```
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }
  return {
    repositories,
    getUserRepositories
  }
}
```
 完成！现在，每当我们调用 `getUserRepositories` 时，`repositories` 都将发生变化，视图也会更新以反映变化。

我们一般会在setup中调用其它钩子函数；此外我们还会在：

- 生命周期
- watch

中调用钩子函数；
也就是说，我们会在这些时候调用方法来改变那个值，从而更新视图；

所以，在我们的钩子函数中，要使用onMounted ，watch等，使所有相关业务的逻辑代码全部在一起；

值得注意的是，钩子函数中返回的变量是Ref包装过的，具备响应性的；

:::
