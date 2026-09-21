---
title: "@vue-cli-plugin-typescript"
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
description: "英文原版 vue cli 的 typescript 插件 使用 TypeScript + ts loader + 实现线程外的快速类型检查。 配置 TypeScript 可以通过 tsconfig.json 进行配置。 从 3.0.0 rc.6 起， typescript 会改为。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue-cli/创建一个项目/@vue-cli-plugin-typescript.md"
---
::: v-pre

# @vue-cli-plugin-typescript

> 本节目标：理解“@vue-cli-plugin-typescript”的核心思路，并能把它用于实际开发或面试表达。
==英文原版==
`vue-cli` ==的== `typescript` ==插件==
==使用== `TypeScript +` `ts-loader` `+`

```
fork-ts-checker-webpack-plugin
```

 ==实现线程外的快速类型检查。==
==配置==
`TypeScript` ==可以通过== `tsconfig.json` ==进行配置。==
==从== `3.0.0-rc.6` ==起，==`typescript` ==会改为一个这个包的== `peer dependency`==，所以你可以通过更新你项目中的== `package.json` ==来指定== `TypeScript` ==的版本。==
==这个插件可以配合== `@vue/cli-plugin-babel` ==使用。当使用== `Babel` ==时，该插件将会输出== `ES2015` ==并将其它基于浏览器目标的自动的== `polyfill` ==委托给== `Babel`==。==
==注入的命令==
==如果在项目创建的时候选择了==

```
TSLint
```

==，则会注入== `vue-cli-service lint`==。==
==缓存==

```
cache-loader
```

 ==默认开启，被缓存的东西存储在== `\<projectRoot\>/node_modules/.cache/ts-loader`==。==
==并行执行==

```
thread-loader
```

 ==会在多核机器上默认开启。你可以在== `vue.config.js` ==中设置== `parallel: false` ==将其关闭。==
==在已创建的项目中安装==
`vue add @vue/typescript`
==注入的== `webpack-chain` ==规则==

- `config.rule('ts')`
- `config.rule('ts').use('ts-loader')`
- `config.rule('ts').use('babel-loader')` `(`当配合 `@vue/cli-plugin-babel` 使用时`)`
- `config.rule('ts').use('cache-loader')`
- `config.plugin('fork-ts-checker')`
 \> 来自

```
 <https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-typescript/README.md>
```

:::
