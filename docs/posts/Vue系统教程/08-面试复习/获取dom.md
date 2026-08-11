---
title: "获取dom"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "分类： 前端 标签： Vue.js前端 作者：阿俊来玩掘金 链接：https://juejin.cn/post/6978069303438344205 来源：稀土掘金 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/获取dom.md"
---
::: v-pre

# 获取dom

> 本节目标：理解“获取dom”的核心思路，并能把它用于实际开发或面试表达。
```
**体验****setup****周期，** **和****onBeforeMount****周期**
<template>  <div></div></template>
<scriptlang="ts">import{ defineComponent, onBeforeMount, onBeforeUnmount } from'vue';
exportdefaultdefineComponent({  name: '',  setup(){    // 相当于beforeCreated 和 createdconsole.log('setUp...');    onBeforeMount(() =>{      console.log('onBeforeMount...');    })     onMounted(()=>{      console.log('onMounted...');      })  },});</script>![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f2ffc2502554c3f9db63c19cbbb2e1b~tplv-k3u1fbpfcp-watermark.image)<stylescoped></style>
**onBeforeUpdate****当数据发生的时候执行**
 {{name}}    <button @click="name='李四'">改变名字</button>     letname = ref('张三')      onBeforeUpdate(()=>{      console.log('onBeforeUpdate');    })
```

```
**onUpdated onBeforeUnmount onUnmounted** **这几个生命周期一起尝试**
onUpdated(()=>{ // 数据更新时console.log('onUpdated');    })    onBeforeUnmount(()=>{ // 页面销毁之前console.log('onBeforeUnmount');    })    onUnmounted(()=>{ // 页面销毁console.log('onUnmounted..');    })
```

```
**onActivated onDeactivated** **开启了****keeplive****缓存才会执行**
需要注意的是keep-alive的写法在vue3中变成slot形式了
App.vue中 <router-view v-slot="{ Component }">    <keep-alive><component:is="Component"/></keep-alive></router-view>    life.vue中    onActivated(()=>{      console.log('onActivated..');    })    onDeactivated(()=>{      console.log('onDeactivated');    })
```

```
**二、** **获取****Dom****和****nextTick**
在vue2中可以使用this.$refs获取一个dom或者多个dom, 但在vue3中获取dom和vue2有些不同
**Vue3****中获取单个****dom**
setup相当于create, 此时页面还没有初始化, 因此在nextTick中获取dom
<template>  <div><divref="name">张三</div></div></template>
<scriptlang="ts">import{ defineComponent,nextTick ,ref} from'vue';
exportdefaultdefineComponent({  name: '',  setup(){      letname = ref<any>('')      nextTick(()=>{        console.log(name.value,'dom');        console.log(name.value.innerHTML,'内容');      })      return{        name      }  }});</script><stylescoped></style>
```

```
**vue3****中获取多个****dom,** **获取多个****dom****得用方法**
<div :ref="getFruit">香蕉</div><div:ref="getFruit">梨子</div><div:ref="getFruit">菠萝</div>setup(){      letname = ref<any>('')      nextTick(()=>{        console.log(name.value,'dom');        console.log(name.value.innerHTML,'内容');      })      letgetFruit = (e:any) =>{        console.log(e);      }      return{        name,        getFruit      }  }
```

```
**需要在****nextTick****中获取****dom**
letname = ref<any>('')      letfruitArr:any[] = []      letgetFruit = (el:any) =>{        fruitArr.push(el)      }       nextTick(()=>{        console.log(name.value,'dom');        console.log(name.value.innerHTML,'内容');        console.log(fruitArr,'fruitArr数据..');       })
```

```
**在****vue3****中****,** **用****vue2****的方式获取****dom**
在setup后接着写生命周期方法就好了 mounted () {    console.log((thisasany).$refs['name'].innerHTML,'vue2中mouted');  }
```

分类：
前端
标签：
Vue.js前端
作者：阿俊来玩掘金
链接：https://juejin.cn/post/6978069303438344205
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

:::
