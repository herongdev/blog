---
title: "element-ui table 表格组件实现可拖拽效果（行、列）"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "1. 首先安装 或者 依赖 Sortable.js ，所以下载了 vuedraggable ，我们便可以直接引入 Sortable 使用 Sortable 的特性。 是 Sortable 一种加强，实现组件化的思想，可以结合 Vue ，使用起来更方便 2. 示例代码 需要注意的是。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/element-ui table 表格组件实现可拖拽效果（行、列）.md"
---
::: v-pre

# element-ui table 表格组件实现可拖拽效果（行、列）

> 本节目标：理解“element-ui table 表格组件实现可拖拽效果（行、列）”的核心思路，并能把它用于实际开发或面试表达。
`1.`首先安装

```
npminstallsortable.js--save//
```

_或者_

```
npmi-Svuedraggable// vuedraggable
```

_依赖_ `Sortable.js`_，所以下载了_`vuedraggable`_，我们便可以直接引入_`Sortable`_使用_`Sortable`_的特性。_

```
// vuedraggable
```

_是_`Sortable`_一种加强，实现组件化的思想，可以结合_`Vue`_，使用起来更方便_
`2.`示例代码
需要注意的是`element table`务必指定`row-key`，`row-key`必须是唯一的，如`ID`，不然会出现排序不对的情况

```
<template><divstyle="width:800px"><el-table:data="tableData"border:row-key="getRowKey"align="left"><el-table-columnv-for="(item, index) in col":key="`col_${index}`":prop="dropCol[index].prop":label="item.label"></el-table-column></el-table><prestyle="text-align: left">{{dropCol}}</pre><hr><prestyle="text-align: left">{{tableData}}</pre></div></template><script>importSortablefrom'sortablejs'exportdefault{data(){return{col:[{label:'
```

==日期==

```
',prop:'date'},{label:'
```

==姓名==

```
',prop:'name'},{label:'
```

==地址==

```
',prop:'address'}],dropCol:[{label:'
```

==日期==

```
',prop:'date'},{label:'
```

==姓名==

```
',prop:'name'},{label:'
```

==地址==

```
',prop:'address'}],tableData:[{id:'1',date:'2016-05-02',name:'
```

==王小虎==

```
1',address:'
```

==上海市普陀区金沙江路== `100` ==弄==

```
'},{id:'2',date:'2016-05-04',name:'
```

==王小虎==

```
2',address:'
```

==上海市普陀区金沙江路== `200` ==弄==

```
'},{id:'3',date:'2016-05-01',name:'
```

==王小虎==

```
3',address:'
```

==上海市普陀区金沙江路== `300` ==弄==

```
'},{id:'4',date:'2016-05-03',name:'
```

==王小虎==

```
4',address:'
```

==上海市普陀区金沙江路== `400` ==弄==

```
'}]}},mounted(){//
```

_阻止默认行为_

```
document.body.ondrop=function(event){event.preventDefault();event.stopPropagation();};this.rowDrop()this.columnDrop()},methods:{getRowKey(){returnrow.id},//
```

_行拖拽_

```
rowDrop(){consttbody=document.querySelector('.el-table__body-wrapper tbody')const_this=thisSortable.create(tbody,{onEnd({newIndex,oldIndex}){constcurrRow=_this.tableData.splice(oldIndex,1)[0]_this.tableData.splice(newIndex,0,currRow)}})},//
```

_列拖拽_

```
columnDrop(){constwrapperTr=document.querySelector('.el-table__header-wrapper tr')this.sortable=Sortable.create(wrapperTr,{animation:180,delay:0,onEnd:evt=>{constoldItem=this.dropCol[evt.oldIndex]this.dropCol.splice(evt.oldIndex,1)this.dropCol.splice(evt.newIndex,0,oldItem)}})}}}</script>
```
 \> 来自

```
 <https://zhuanlan.zhihu.com/p/77681533>
```

:::
