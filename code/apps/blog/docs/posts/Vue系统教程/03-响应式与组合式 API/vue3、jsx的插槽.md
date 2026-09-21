---
title: "vue3、jsx的插槽"
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
description: "一、 setup 的两个参数，插槽在 vue3 的体现 的写法 非响应式对象，等同于 ​ // 插槽 ( 非响应式对象，等同于 ​ // 触发事件 ( 方法，等同于 ​ // 暴露公共 property ( 函数 ：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。"
sidebarWeight: 56
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/vue3、jsx的插槽.md"
---
::: v-pre

# vue3、jsx的插槽

> 本节目标：理解“vue3、jsx的插槽”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
一、`setup`的两个参数，插槽在`vue3`的体现

```
{/* jsx
```

_的写法_

```
 */}import{defineComponent}from'vue';exportdefaultdefineComponent({name:'',setup(props,context){// Attribute (
```

_非响应式对象，等同于_

```
 $attrs)console.log(context.attrs)
```

==​==`//` _插槽_ `(`_非响应式对象，等同于_

```
 $slots)console.log(context.slots)
```

==​==`//` _触发事件_ `(`_方法，等同于_

```
 $emit)console.log(context.emit)
```

==​==`//` _暴露公共_ `property (`_函数_

```
)console.log(context.expose)return{};},});
props
```

：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
`context`：上下文对象 `(`也可以解构成

```
{attrs, slots, emit, expose})
attrs:
```

值为对象，包含：组件外部传递过来，但没有在`props`配置中声明的属性`,`
相当于 `this.$attrs`。
`slots:` 收到的插槽内容`,` 相当于 `this.$slots`。
`emit:` 分发自定义事件的函数`,` 相当于 `this.$emit`。
`expose:` 暴露公共 `property (`函数`)`。
注意：`attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 `attrs.x` 或 `slots.x` 的方式引用 `property`。请注意，与 `props` 不同，`attrs` 和 `slots` 的 `property` 是非响应式的。如果你打算根据 `attrs` 或 `slots` 的更改应用副作用，那么应该在 `onBeforeUpdate` 生命周期钩子中执行此操作。
二、插槽分类
`1`、匿名插槽（默认插槽：就是没有给名字的，默认为：`default`）；
`2`、具名插槽（默认插槽：有`name`的，在一些`UI`框架中已经定义好的，只能调用定义好的插槽名，才会生效）；
`3`、自定义插槽；`(`根据自己的需求进行命名`)`
三、话不多说，先上实现的效果图

布局容器`-`实现效果图
四、`vue3`、`jsx`的实现方式
`1`、代码实现：插槽 `slots` ，构建容器布局

```
{/* jsx
```

_的写法_

```
 */}setup(props,context){return()=>({/*
```

_利用插槽_ _构建容器布局_ _核心代码块_

```
 */}<><divclass="layout"><divclass={{'content':true,}}>{/*
```

_上下布局，头部部分_

```
 */}{context.slots['top-section']?(<divclass="top-section">{/* <slot name="top-section"></slot> */}{context.slots['top-section']?.()}</div>):null}
```

==​==

```
{/*
```

_上下布局，主容器部分_

```
 */}<divclass={{'container-section-flex':context.slots['aside-section'],'container-section':true,}}>{/*
```

_主容器_ _左右布局，左边部分_

```
 */}{context.slots['aside-section']?(<divclass="aside-section">{/* <slot name="aside-section"></slot> */}{context.slots['aside-section']?.()}</div>):null}
```

==​==

```
{/*
```

_主容器_ _左右布局，右边部分_

```
 */}<divclass="main-section"v-loading={props.loading}element-loading-text="
```

==拼命加载中==

```
...">{/*
```

_主容器_ _头部部分_

```
 */}{context.slots['head-section']?(<divclass="head-section">{/* <slot name="head-section"></slot> */}{context.slots['head-section']?.()}</div>):null}
```

==​==

```
{/*
```

_主容器_ _选项部分_

```
 */}{context.slots['opts-section']?(<divclass="opts-section">{/* <slot name="opts-section"></slot> */}{context.slots['opts-section']?.()}</div>):null}
```

==​==

```
{/* <!--
```

_主容器_ _数据内容部分_

```
 --> */}<divclass="data-section"style="overflow: hidden;">{/* <slot name="data-section"></slot> */}{context.slots['data-section']?.()}</div>{/*
```

_主容器_ _分页部分_

```
 */}<divclass="paging-section">{/* <slot name="paging-section"></slot> */}{context.slots['paging-section']?.()}</div></div></div></div>{/*
```

_默认插槽：_

```
<slot></slot> */}{context.slots['default']?.()}</div></>);},
```
 样式自己需要写！！！！
`2`、插槽调用（`v-slots={ }`）

```
{/* jsx
```

_的写法_ _核心调用代码块_

```
*/}constslots={{/*
```

_默认插槽_

```
 */}default:()=>{return(<><span>{'
```

==默认区域==

```
'}</span></>);},{/*
```

_自定义插槽_

```
 */}'top-section':()=>{return(<><span>{'
```

==头部导航栏==

```
'}</span></>);},'aside-section':()=>{return(<><span>{'
```

==侧边导航栏==

```
'}</span></>);},'main-section':()=>{return(<><span>{'
```

==主体内容区==

```
'}</span></>);},'head-section':()=>{return(<><span>{'
```

==头部内容区==

```
'}</span></>);},'opts-section':()=>{return(<><span>{'
```

==中间内容区==

```
'}</span></>);},'data-section':()=>{return(<><span>{'
```

==数据展示区==

```
'}</span></>);},'paging-section':()=>{return(<><span>{'
```

==底部区==

```
'}</span></>);},};
```

==​==

```
return()=>({/*
```

_插槽布局组件调用_

```
 */}<content-layoutv-slots={slots}/>)
```
 五、对比`vue2`的`template`的模板写法
`1`、`template`模板代码实现方式

```
 <slot ></slot>
<template><divclass="container-layout"><divclass="container"><!--
```

_上下布局，头部部分_

```
 --><divclass="top-section"v-if="$slots['top-section']"><slotname="top-section"></slot></div><!--
```

_上下布局，主容器部分_

```
 --><divclass="container-section":class="{'container-section-flex': $slots['aside-section']}"><!--
```

_主容器_ _左右布局，左边部分_

```
 --><divclass="aside-section"v-if="$slots['aside-section']"><slotname="aside-section"></slot></div><!--
```

_主容器_ _左右布局，右边部分_

```
 --><divclass="main-section"v-loading="loading"element-loading-text="
```

==拼命加载中==

```
..."><!--
```

_主容器_ _头部部分_

```
 --><divclass="head-section"v-if="$slots['head-section']"><slotname="head-section"></slot></div><!--
```

_主容器_ _选项部分_

```
 --><divclass="opts-section"v-if="$slots['opts-section']"><slotname="opts-section"></slot></div><!--
```

_主容器_ _数据内容部分_

```
 --><div><slotname="data-section"></slot></div><div><slotname="paging-section"></slot></div></div></div></div><slot></slot></div></template>
```

==​==``==​==

`2`、插槽调用（ `\<template v-slot:name /\>` 或者 `\<template #name /\>`）
`{/*` ==部分调用==

```
 */}<div><templatev-slot:top-section>
```

==顶部导航栏==

```
</template><template#aside-section>
```

==侧边菜单栏==

```
</template><template#data-section>
```

==数据内容部分==

```
</template><template#default>
```

==默认数据==

```
</template></div>
```

==​==
`------------------ 2022.04.22` 追更 解决

```
wilikeit
```

提出的 `slot-scope`的问题 `----------------------`
六、回调参数：以`el-upload`为例：

```
 slot-scope="{file}"
1
```

、`vue2`的模板写法
`\<!-- vue2 template`_写法_

```
  --><el-upload><divslot="file"slot-scope="{file}"@click="handlePictureCardPreview(file)"><imgclass="el-upload-list__item-thumbnail":src="file.url"alt=""/></div></el-upload>
```

==​==
`2`、`vue3`、`tsx`的模板写法

```
{/* tsx
```

_写法_

```
 */}constuploadSlot={file:(file:any)=>{console.log(file);//
```

_打印结果，图_`6-3`_如示_

```
return(<><div><imgclass="el-upload-list__item-thumbnail"src={file.url}alt=""/></div></>);})}
```

==​==

```
<el-uploadv-slots={uploadSlot}/>
3
```

、`file`回调值，效果图

图`6-3 file`回调值，效果图

`--------------------- 2022.04.27` 追更 解决

```
wilikeit
```

提出的 `@node-click`的问题 `----------------------`
七、解决

```
wilikeit
```

提出的`\<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" /\>`中`@node-click`这种怎么写在`jsx`中的问题
特别提示： `onClick={` 这里写的是函数，而不是变量变量，有的同学一直在这里写变量，导致函数一直无法响应

```
 }
constfun=()=>{}//
```

_错误写法_

```
onClick={fun}//
```

_正确写法_

```
,onClick={()=>{fun}}
```

```
interfaceTree{label:string;children?:Tree[];}consthandleNodeClick=(data:Tree,node:any,obj:any)=>{console.log(data,node,obj);};constdata:Tree[]=[{label:'Level one 1',children:[{label:'Level two 1-1',children:[{label:'Level three 1-1-1',},],},],},]constdefaultProps={children:'children',label:'label',};<!--vuetemplate
```

==写法==

```
--><el-tree:data="data":props="defaultProps"@node-click="handleNodeClick"/>{/* tsx
```

_的写法_

```
 */}<el-treedata={data}props={defaultProps}onNodeClick={(e:any,node:any,obj:any)=>{handleNodeClick(e,node,obj);}}/>{/*
```

_点击事件效果，如下图_`7-1`_所示_

```
 */}
```

```
@wilikeit
```
 将`@node-click`转化成`onNodeClick`（或者`onNode-click` 也可以，但不规范，有时也不生效）
传参问题：事件`node-click`有三个回调参数，三个参数：对应于节点点击的节点对象， `TreeNode` ==节点== 属性，事件对象
`(e: any, node: any, obj: any)`

图`7-1`、`node`点击事件打印结果`-`实现效果图
有不理解的，请在评论区告诉我！有求必应！
最后，原创不易，点个赞再走呗！
编辑于 `2022-04-27 10:40`
 \> 来自

```
 <https://zhuanlan.zhihu.com/p/501806945>
```

:::
