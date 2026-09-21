---
title: "vue中style的scope属性"
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
description: "在 vue 项目中通常会给 style 标签加上 scope 属性，以此来实现样式的私有化，避免全局污染。但有的时候这个属性又会带来麻烦：当引入第三方组件且需要修改其样式时，通常出现没有修改成功的情况 一、 scope 实现私有化样式的原理 通过给 DOM 元素结构上以及 css。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Class和style属性/vue中style的scope属性.md"
---
::: v-pre

# vue中style的scope属性

> 本节目标：理解“vue中style的scope属性”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
在`vue`项目中通常会给`style`标签加上`scope`属性，以此来实现样式的私有化，避免全局污染。但有的时候这个属性又会带来麻烦：当引入第三方组件且需要修改其样式时，通常出现没有修改成功的情况

一、`scope`实现私有化样式的原理

通过给`DOM`元素结构上以及`css`样式上添加一个不重复的标记，来保证其唯一性，以此达到样式的私有化

例如：当使用第三方插件`elementui`的`button`、`dialog`组件，并在`style`标签上加上`scoped`的属性

```
<template>
  <div class="login-page">
    <h1>{{ msg }}</h1>
    <div>
      <el-button type="success" @click="login">
```

登录

```
</el-button>
      <el-button type="success" @click="dialogVisible = true">
```

弹框

```
</el-button>
    </div>
    <el-input></el-input>
    <div>
      <el-dialog
        title="
```

提示

```
1111"
        :visible.sync="dialogVisible"
      >

```

这是一个弹框

```
      </el-dialog>
    </div>
  </div>
</template>
```

```
<style lang="less" scoped>
  @import "../less/login.less";
</style>
```

`login.less`文件

```
.login-page{
  h1{
    cursor: pointer;
    background: #f00;
  }
  .el-button{
    width: 200px;
  }
  .el-input{
    width: 100px;
  }   .el-dialog{
    width:200px;
    height: 300px;
    background: #ddd;
  }
}
```

在浏览器运行后的`DOM`显示结果为：
`1`、`el-button`元素加上了`data`属性，且其`css`也加上了`data`属性选择器
`2`、`el-dialog`组件元素只有最外层元素有`data`属性，从第二层元素起就没有，且虽然在`login.less`文件中改变其样式，但是没有效果

由此可以看出：
`1`、添加`scoped`属性之后，`DOM`节点添加了一个不重复的`data`属性来表示其唯一性
`2`、添加`scoped`属性之后，`DOM`节点的`css`选择器末尾添加了`data`属性选择器来私有化该元素的样式
`3`、添加`scoped`属性之后，会给组件的最外部添加`data`属性，如果组件里面还有包含其他组件，那么其他组件是作用不到的

二、解决引入第三方组件并修改其样式不生效的问题
`1`、解决方案一：因为`vue`文件中可以出现多个`style`，所以可以使用两个`style`，一个`style`加上`scoped`属性，一个`style`不加`scoped`属性，
且将第三方组件中嵌套的元素样式放置在不带`scoped`的`style`元素内，这样子第三方组件中的嵌套元素中样式就可以生效了

```
<template>
  <div class="login-page">
    <h1>{{ msg }}</h1>
    <div>
      <el-button type="success" @click="login">
```

登录

```
</el-button>
      <el-button type="success" @click="dialogVisible = true">
```

弹框

```
</el-button>
    </div>
    <el-input></el-input>
    <div>
      <el-dialog
        title="
```

提示

```
1111"
        :visible.sync="dialogVisible"
      >

```

这是一个弹框

```
      </el-dialog>
    </div>
  </div>
</template>
```

```
<style lang="less" scoped>
  @import "../less/login.less";
</style>
<style lang="less">
   .el-dialog{//
```

将第三方组件中嵌套的元素样式放置在不带`scoped`的`style`元素内，这样子第三方组件中的嵌套元素中样式就可以生效了

```
      width:200px;
      height: 300px;
      background: #ddd;
    }
</style>
login.less
```

文件

```
.login-page{
  h1{
    cursor: pointer;
    background: #f00;
  }
  .el-button{
    width: 200px;
  }
  .el-input{
    width: 100px;
  }
}
```

`2`、解决方案二：使用深度选择器： `\<\<\<` 或者 `/deep/`
穿透性的改变第三方组件的样式需要加上`deep,`如果是`stylus`使用 `\>\>\> ,`如果是`less` 或者`sass`就使用 `/deep/`

```
<template>
  <div class="login-page">
    <h1>{{ msg }}</h1>
    <div>
      <el-button type="success" @click="login">
```

登录

```
</el-button>
      <el-button type="success" @click="dialogVisible = true">
```

弹框

```
</el-button>
    </div>
    <el-input></el-input>
    <div>
      <el-dialog
        title="
```

提示

```
1111"
        :visible.sync="dialogVisible"
      >

```

这是一个弹框

```
      </el-dialog>
    </div>
  </div>
</template>
```

```
<style lang="less" scoped>
  @import "../less/login.less";
</style>
```

`login.less`文件

```
.login-page{
  h1{
    cursor: pointer;
    background: #f00;
  }
  .el-button{
    width: 200px;
  }
  .el-input{
    width: 100px;
  }
  //
```

穿透性的改变第三方组件的样式需要加上`deep,`如果是`stylus`使用 `\>\>\> ,`如果是`less` 或者`sass`就使用

```
  /deep/
  /deep/.el-dialog{
        width:200px;
        height: 300px;
        background: #ddd;
  }
}
```

`el-dialog`成功产生效果为所自定义的样式：

:::
