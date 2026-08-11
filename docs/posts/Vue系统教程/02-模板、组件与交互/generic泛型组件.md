---
title: "generic泛型组件"
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
description: "vue3.3更新了generic泛型组件，赶快学起来，更好的封装你的组件把 有梦想的程序猿 90后程序媛阿姨一枚 ​关注她 vue3.3更新了一个非常好用的东西，generic泛型组件，它能够推断出传入prop的类型，让我们得到更好的类型提示。看了一下，目前很少人讲得很好，于是开。"
sidebarWeight: 94
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/generic泛型组件.md"
---
::: v-pre

# generic泛型组件

> 本节目标：理解“generic泛型组件”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
vue3.3更新了generic泛型组件，赶快学起来，更好的封装你的组件把
 [](https://www.zhihu.com/people/88-27-13-90-1)

[有梦想的程序猿](https://www.zhihu.com/people/88-27-13-90-1)
90后程序媛阿姨一枚
​关注她
vue3.3更新了一个非常好用的东西，[generic](https://zhida.zhihu.com/search?content_id=241217384&content_type=Article&match_order=1&q=generic%E6%B3%9B%E5%9E%8B%E7%BB%84%E4%BB%B6&zhida_source=entity)泛型组件，它能够推断出传入prop的类型，让我们得到更好的类型提示。看了一下，目前很少人讲得很好，于是开一篇文章讲一下，献丑了。
在vue3中，我们已经能够通过定义props的类型，得到比较好的组件类型提示。但是面对一种情况，我们似乎就无可奈何，那就是prop是复杂数据类型，严格来说，是不确定属性的对象。此时我们只能给一个object类型来定义，但导致的结果是，我们得不到很好的类型提示。
常见的例子是，拿[ant-design-vue](https://zhida.zhihu.com/search?content_id=241217384&content_type=Article&match_order=1&q=ant-design-vue&zhida_source=entity)的a-table来说，它需要传入两个prop，dataSource和columns，其中dataSource的属性就是不确定的。ant-design-vue对dataSource的类型定义是object[]，以至于使用作用域插槽时，得不到比较好的类型提示。
==js复制代码\<template\>====== ==\<a-table :dataSource====="dataSource"== ==:columns====="columns"====\>====== ==\<template== ==#====bodyCell====="\{ record, column \}"====\>====== ==\<span v-if====="column.dataIndex === 'name'"====\>\{\{ record \}\}\<====/span\>====== ==\<====/template\>====== ==\<====/a-table\>========\<====/template\>========​========\<script setup lang====="ts"====\>========const dataSource = [====== ==\{====== ==key:== =='1'====,====== ==name:== =='Mike'====,====== ==age:== ==32====,====== ==address:== =='10 Downing Street'====,====== ==\},====== ==\{====== ==key:== =='2'====,====== ==name:== =='John'====,====== ==age:== ==42====,====== ==address:== =='10 Downing Street'====,====== ==\},========]========​========const columns = [====== ==\{====== ==title:== =='Name'====,====== ==dataIndex:== =='name'====,====== ==key:== =='name'====,====== ==\},====== ==\{====== ==title:== =='Age'====,====== ==dataIndex:== =='age'====,====== ==key:== =='age'====,====== ==\},====== ==\{====== ==title:== =='Address'====,====== ==dataIndex:== =='address'====,====== ==key:== =='address'====,====== ==\},========]========\<====/script\>======

接着让我们手写一个Table.vue，并用泛型组件来完善它，关键点在于使用==generic="T extends object"==
==ts复制代码==_// Table.vue___==​========\<====template====\>====== ==\<====table====\>====== ==\<====thead====\>====== ==\<====tr====\>====== ==\<====th== ==v====-====for========="(item, index) in columns"== ==:====key========="index"====\>\{\{ item.title \}\}\</====th====\>====== ==\</====tr====\>====== ==\</====thead====\>====== ==\<====tbody====\>====== ==\<====tr== ==v====-====for========="(item, index) in dataSource"== ==:====key========="index"====\>====== ==\<====td== ==v====-====for========="header in columns"====\>====== ==\<====slot== ==name========="bodyCell"== ==:====record========="item"== ==:====column========="header"====\>====== ==\{\{ item[header.dataIndex as keyof T] \}\}====== ==\</====slot====\>====== ==\</====td====\>====== ==\</====tr====\>====== ==\</====tbody====\>====== ==\</====table====\>========\</====template====\>========​========\<====script== ==setup== ==lang========="ts"== ==generic========="T extends object"====\>========defineProps\<\{====== ==columns: \{ title:== ==string====; dataIndex:== ==string====; key:== ==string== ==\}[]====== ==dataSource:== ==T====[]========\}\>()========\</====script====\>======
使用Table组件:
==js复制代码\<template\>====== ==\<a-table :dataSource====="dataSource"== ==:columns====="columns"== ==:pagination====="false"====\>====== ==\<template== ==#====bodyCell====="\{ record, column \}"====\>====== ==\<span v-if====="column.dataIndex === 'name'"====\>\{\{ record.name \}\}\<====/span\>====== ==\<====/template\>====== ==\<====/a-table\>========​====== ==\<Table :dataSource====="dataSource"== ==:columns====="columns"====\>====== ==\<template== ==#====bodyCell====="\{ record, column \}"====\>====== ==\<span v-if====="column.dataIndex === 'name'"====\>\{\{ record.name \}\}\<====/span\>====== ==\<====/template\>====== ==\<====/Table\>========\<====/template\>========​========\<script setup lang====="ts"====\>========import Table from== =='./components/Table.vue'========​========const dataSource = [====== ==\{====== ==key:== =='1'====,====== ==name:== =='Mike'====,====== ==age:== ==32====,====== ==address:== =='10 Downing Street'====,====== ==\},====== ==\{====== ==key:== =='2'====,====== ==name:== =='John'====,====== ==age:== ==42====,====== ==address:== =='10 Downing Street'====,====== ==\},========]========​========const columns = [====== ==\{====== ==title:== =='Name'====,====== ==dataIndex:== =='name'====,====== ==key:== =='name'====,====== ==\},====== ==\{====== ==title:== =='Age'====,====== ==dataIndex:== =='age'====,====== ==key:== =='age'====,====== ==\},====== ==\{====== ==title:== =='Address'====,====== ==dataIndex:== =='address'====,====== ==key:== =='address'====,====== ==\},========]========\<====/script\>======
效果是一模一样

不同的是，我们得到了很好的类型提示：

存在问题：泛型组件ref实例丢失
我们在使用组件的时候，有时候也会用到组件实例上的一些方法，例如清除form表单。使用泛型组件之后，会导致组件的实例丢失，目前vue官方还未解决这个问题。
比如，在Table中暴露一个清除数据的方法

普通组件通过==InstanceType\<typeof Table\>==就可以拿到组件的类型和方法，然后调用。但是使用了泛型组件，导致Table的类型丢失，无法推导出类型来。
解决方案
幸好有大神找出了另一个方法，[# vue3.3 generic](https://link.zhihu.com/?target=https%3A//juejin.cn/post/7247433208437850169) 泛型组件无法获取实例类型解决方案
下面是演示：先创建一个ts文件
==ts复制代码import Table from== =='./components/Table.vue'========import \{ ref \} from== =='vue'========​======_/**泛型组件出口类型 */_======type GenericComponentExports\<====D== ==extends== ==(====...p====:== ==any====[])== =======\>== ==any====\> ======= _//这里获取组件通用类型___ ==import(===='vue'====).ComponentPublicInstance &====== _//这里获取defineExpose暴露的数据类型___ ==Parameters\<====NonNullable====\<====NonNullable====\<====ReturnType====\<====D====\>[===='__ctx'====]\>[===='expose'====]\>\>[====0====]========​========export function useTableRef\<====T== ==extends== ==any====[]== ===== ==any====[]====\>() \{====== _//获得组件实例类型，能够正确的获得defineExpose暴露的类型与通用的组件类型___ ==type Instance = GenericComponentExports\<====typeof== ==Table====\>====== ==return ref\<====Instance== ==&== ==\{== ==data====:== ==T== ==\}\>()========\}======
然后不再使用ref，改用这个useTableRef，则重新得到了组件的方法

并且成功调用

\> 来自 \<[https://zhuanlan.zhihu.com/p/688891566](https://zhuanlan.zhihu.com/p/688891566)\>

:::
