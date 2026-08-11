---
title: "Vue中自定义组件的v-model总结"
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
description: "一、 v model 的实际意义 使用 input 输入框打比方 相当于： 二、通过 model 配置实现 v model 的 prop 属性与 event 事件的自定义 例如这样定义： 实际上就相当于自定义组件 相当于 三、实际例子（封装一个分类筛选组件） 1. 组件实现代码。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Vue中自定义组件的v-model总结.md"
---
::: v-pre

# Vue中自定义组件的v-model总结

> 本节目标：理解“Vue中自定义组件的v-model总结”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
一、`v-model`的实际意义
`#`==使用==`input`==输入框打比方==

```
<input  type="text"  v-model="inputValue"   />#
```

==相当于：==

```
<input  type="text"  :value="inputValue"  @input="inputValue = $event.target.value"   />
```
 二、通过`model`配置实现`v-model`的`prop`属性与`event`事件的自定义
`#`==例如这样定义：==

```
model:{prop:"value",event:"change"},#
```

==实际上就相当于自定义组件==

```
<custom-comp   v-model="inputValue"/>#
```

==相当于==

```
<custom-comp   :value="inputValue"@change="inputValue"/>
```
 三、实际例子（封装一个分类筛选组件）
`1.`组件实现代码

```
<template><div class="sort-filter-wrap"v-if="sortList.length"><div      v-for="(item, index) in sortList"class="item-type":class="{ 'item-type-selected': item[format.key] === currentKey }":key="index"@click="selectSort(item[format.key])">{{item[format.title]}}</div></div></template><script>export default{//
```

==分类筛选组件==

```
name:"sortFilter",//
```

==定义实现==`v-modal`==的属性与事件==

```
model:{prop:"value",event:"change"},props:{//
```

==绑定的值==

```
value:{type:[String,Number],default:""},//
```

==格式==

```
format:{type:Object,default(){return{key:"type",title:"title"};}},//
```

==分类列表==

```
sortList:{type:Array,default:[]}},data(){return{//
```

==当前选择的==`key`==值==

```
currentKey:""};},watch:{//
```

==监听用户的值==

```
value(newValue){this.currentKey =newValue;}},//
```

==创建组件的时候设置默认值==

```
created(){this.currentKey =this.value;},methods:{//
```

==选择分类==

```
selectSort(value){#1.
```

==此处发送==`change`==事件是为了事先==`v-model`==，==`#2.`==父组件会自动将监听接收到的值赋值给父组件定义的变量==`#3.`==在父组件也可以“显示地”监听==`change`==事件做一些额外的处理操作==

```
this.$emit("change",value);}}};</script><style lang="scss"scoped>.sort-filter-wrap {display:flex;align-items:center;.item-type {min-width:68px;height:24px;border-radius:12px;text-align:center;line-height:24px;color:#515a6e;font-size:13px;font-weight:500;border:1px solid transparent;margin-right:5px;cursor:pointer;padding:0px 12px;}.item-type-selected,.item-type:hover {border:1px solid rgba(71,152,255,0.3);background:rgba(24,144,255,0.1);color:#4798ff;}}</style>
2.
```

在父组件使用该组件

```
<template><yd-sortfilterv-model="filterParams.state":format="{ key: 'state', title: 'title' }":sort-list="stateList"/></template><script>//
```

==导入分类筛选组件==

```
import sortFilterManage from "@components/tools/sortfilter";export default {  components: {    sortFilterManage  },  data() {    return {        //
```

==筛选参数==

```
        filterParams:{            state:''        },        //
```

==状态列表==

```
        stateList:[             {                state: "",                title: "
```

==全部==

```
"             },             {                state: 1,                title: "
```

==待审核==

```
"             },             {                state: 2,                title: "
```

==已发布==

```
"             },             {                state: 3,                title: "
```

==已打回==

```
"             }        ]    }  }}</script>
3.
```

实际效果

效果
 \> 来自

```
 <https://www.jianshu.com/p/41d9d0c1559d>
```

:::
