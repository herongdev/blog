---
title: "Browserify"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "在运行打包命令时将 NODE ENV 设置为 \"production\" 。这等于告诉 vueify 避免引入热重载和开发相关的代码。 对打包后的文件进行一次全局的 转换。这使得压缩工具能清除掉 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如： NODE ENV prod。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/工具/生产环境部署/Browserify.md"
---
::: v-pre

# Browserify

> 本节目标：理解“Browserify”的核心思路，并能把它用于实际开发或面试表达。
- 在运行打包命令时将 `NODE_ENV` 设置为 `"production"`。这等于告诉 `vueify` 避免引入热重载和开发相关的代码。
- 对打包后的文件进行一次全局的

    ```
     envify
    ```

    转换。这使得压缩工具能清除掉 `Vue` 源码中所有用环境变量条件包裹起来的警告语句。例如：

`NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m \> build.js`

- 或者在 `Gulp` 中使用

    ```
     envify
    ```

    ：

    ```
    //
    ```

    使用 `envify` 的自定义模块来定制环境变量

    ```
    var envify = require('envify/custom')browserify(browserifyOptions)  .transform(vueify)  .transform(    //
    ```

    必填项，以处理 `node_modules` 里的文件

    ```
        { global: true },    envify({ NODE_ENV: 'production' })  )  .bundle()
    ```

- 或者配合 `Grunt` 和

    ```
     grunt-browserify
    ```

    使用

    ```
     envify
    ```

    ：

    ```
    //
    ```

    使用 `envify` 自定义模块指定环境变量

    ```
    var envify = require('envify/custom')browserify: {  dist: {    options: {
    ```

           `//` 该函数用来调整 `grunt-browserify` 的默认指令

    ```

    ```

    ```
    configure: b => b        .transform('vueify')        .transform(
    ```

               `//` 用来处理 `` `node_modules` `` 文件

    ```
              { global: true },          envify({ NODE_ENV: 'production' })        )        .bundle()    }  }}
    ```

:::
