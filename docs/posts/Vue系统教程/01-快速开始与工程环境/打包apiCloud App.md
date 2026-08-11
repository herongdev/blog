---
title: "打包apiCloud App"
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
description: "app 一般打成多页面，利用 apicloud 的 api 不断打开页面，关闭页面，打开的页面覆盖在新页面上方； 在配置打包时，我们要打包一个 app 的： 一、默认入口文件，它一般由 config.xml 来指定，通过 html webpack plugin 来指定其模板： 二。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue-cli/打包apiCloud App.md"
---
::: v-pre

# 打包apiCloud App

> 本节目标：理解“打包apiCloud App”的核心思路，并能把它用于实际开发或面试表达。
`app`一般打成多页面，利用`apicloud`的`api`不断打开页面，关闭页面，打开的页面覆盖在新页面上方；

在配置打包时，我们要打包一个`app`的：
一、默认入口文件，它一般由`config.xml`来指定，通过`html-webpack-plugin`来指定其模板：

```
new HtmlWebpackPlugin({
```

```
 template: "./public/index.html",
```

```
 chunks: ["vendors", "libs", "config", "components"],
```

```
 minify: {
```

```
 collapseWhitespace: true,
```

```
 removeComments: true,
```

```
 removeRedundantAttributes: true,
```

```
 removeScriptTypeAttributes: true,
```

```
 removeStyleLinkTypeAttributes: true,
```

```
 useShortDoctype: true,
```

```
 },
}),
```

二、其它页面文件，我们通过`vue.config.js`的`pages`属性来进行，在这里可以指定页面的打包模板，这个模板配置会覆盖`html-webpack-plugin`的模板配置；

```
 pages[page] = {
```

```
 entry: vue.path,
```

```
 template: "./public/page.ejs",
```

```
 filename,
```

```
 page,
```

```
 chunks: ["vendors", "libs", "config", "components", page],
```

```
 name: "
```

数字工程

```
",
```

```
 timestamp,
```

```
 minify: {
```

```
 collapseWhitespace: true,
```

```
 removeComments: true,
```

```
 removeRedundantAttributes: true,
```

```
 removeScriptTypeAttributes: true,
```

```
 removeStyleLinkTypeAttributes: true,
```

```
 useShortDoctype: true,
```
     `},`
  `};`

`pages`

- `Type:` `Object`
- `Default:`

    ```
    undefined
    ```

    ==在== `multi-page` ==模式下构建应用。每个“==`page`==”应该有一个对应的== `JavaScript` ==入口文件。其值应该是一个对象，对象的== `key` ==是入口的名字，==`value` ==是：==
    - ==一个指定了==

        ```
        entry,
        ```

        ```
        template,
        ```

        ```
        filename,
        ```

         `title` ==和== `chunks` ==的对象== `(`==除了== `entry` ==之外都是可选的==`)`==；==
    - ==或一个指定其== `entry` ==的字符串。==  \> 来自

```
 <https://cli.vuejs.org/zh/config/#filenamehashing>
```

各配置含义如下：

```
module.exports = {
```

```
 pages: {
```

```
 index: {
```

```
 //
```

页面文件地址

```
 entry: 'src/index/main.js',
```

```
 //
```

模板来源

```
 template: 'public/index.html',
```
       `//` 在 `dist/index.html` 的输出的文件名

```
 filename: 'index.html',
```

```
 //
```

当使用 `title` 选项时，

```
 // template
```

中的 `title` 标签需要是 `\<title\>\<%= htmlWebpackPlugin.options.title %\>\</title\>`

```
 title: 'Index Page',
```

```
 //
```

在这个页面中包含的块，默认情况下会包含

```
 //
```

提取出来的通用 `chunk` 和 `vendor chunk`。

```
 chunks: ['chunk-vendors', 'chunk-common', 'index']
```
     `},`

```
 //
```

当使用只有入口的字符串格式时，

```
 //
```

模板会被推导为 `` `public/subpage.html` ``

```
 //
```

并且如果找不到的话，就回退到 `` `public/index.html` ``。

```
 //
```

输出文件名会被推导为 `` `subpage.html` ``。

```
 subpage: 'src/subpage/main.js'
```

```
 }
}
```

:::
