---
title: "vue中涉及的字符串模板与dom模板"
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
description: "字符串模板 字符串模板就是写在 vue 中的 template 中定义的模板，如 .vue 的单文件组件模板和定义组件时 template 属性值的模板。字符串模板不会在页面初始化参与页面的渲染，会被 vue 进行解析编译之后再被浏览器渲染，所以不受限于 html 结构和标签的命。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/基础/vue中涉及的字符串模板与dom模板.md"
---
::: v-pre

# vue中涉及的字符串模板与dom模板

> 本节目标：理解“vue中涉及的字符串模板与dom模板”的核心思路，并能把它用于实际开发或面试表达。
字符串模板
字符串模板就是写在`vue`中的`template`中定义的模板，如`.vue`的单文件组件模板和定义组件时`template`属性值的模板。字符串模板不会在页面初始化参与页面的渲染，会被`vue`进行解析编译之后再被浏览器渲染，所以不受限于`html`结构和标签的命名。
`dom`模板`(`或者称为`Html`模板

```
)
dom
```

模板就是写在`html`文件中，一打开就会被浏览器进行解析渲染的，所以要遵循`html`结构和标签的命名，否则浏览器不解析也就不能获取内容了。
下面的例子不会被正确渲染`,` 会被解析成`mycomponent,`但是注册的`vue`的组件是`MyComponent`，因此无法渲染。

```
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>Vue Component</title>
</head>
<body>
  <div id="app">
    Hello Vue
    <MyComponent></MyComponent>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
  <script>
    //
```

全局注册

```
    Vue.component('MyComponent', {
      template: '<div>
```

组件类容

```
</div>'
    });
    new Vue({
      el: '#app'
    });
  </script>
</body>
</html>
```

所以，下面的例子就可以正常显示了：

```
<!DOCTYPE <html>
<head>
  <meta charset="utf-8">
  <title>Vue Component</title>
</head>
<body>
  <div id="app">Hello Vue
    <my-component></my-component>
  </div>
  <script src="https: //cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js">
  </script>
  <script>//
```

全局注册

```
    Vue.component('my-component', {
      template: '<div>
```

组件类容

```
</div>'
    });
    new Vue({
      el: '#app'
    });
  </script>
</body>
</html>
```

因为`html`对大小写不敏感，所以在`DOM`模板中使用组件必须使用`kebab-case`命名法`(`短横线命名`)`。

因此`,`对于组件名称的命名，可参考如下实现：
一、在单文件组件、`JSX`和字符串模板中：

```
PascalCase
<MyComponent/>
```
 二、在 `DOM` 模板中

```
:kebab-case
<my-component></my-component>
```
 三、或者在所有地方:

```
kebab-case
<my-component></my-component>
```

:::
