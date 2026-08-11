---
title: "不展不好开发环境esbuild打大道得"
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
description: "创建开发时执行脚本， 位置在根目录的 scripts/ 下面，参数为要打包的模块：。"
sidebarWeight: 58
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/不展不好开发环境esbuild打大道得.md"
---
::: v-pre

# 不展不好开发环境esbuild打大道得

> 本节目标：理解“不展不好开发环境esbuild打大道得”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==创建开发时执行脚本，== ==位置在根目录的====scripts/====下面，参数为要打包的模块：==

```
==修改根目录下的====package.json====文件，添加====srcipts====，名为====dev====：==
"scripts": {
  "dev": "node scripts/dev.js reactivity -f global"
}
其中reactivity -f global均为命令行参数，可以使用命令行工具解析出来；
reactiivity为包的名称，-f表示打包后的格式选项，-f后的值为打包格式
```

```
==新建====scripts/dev.ts==
const { build } = require('esbuild')
const { resolve } = require('path')
const args = require('minimist')(process.argv.slice(2));
运行npm run dev时，node会去package.json的sciripts中找到dev命令对应的值，即以下命令：
$ node scripts/dev.ts reactivity -f global
```

```
打印args，输出如下：
{ _: [ 'reactivity' ], f: 'global' }
可见，如果参数前有-或--，就会被当成属性名，而接下来的参数被当作这个属性名的属性值；
如果没有--或-，就会被放在键名为_的属性上，其属性值为一个数组，依次为每个没有--或-开头的参数；如：
$ node scripts/dev.ts reactivity -f global --x xxx abadd
{ _: [ 'reactivity', 'abadd' ], f: 'global', x: 'xxx' }
```

```
// 最好与要打包的包文件夹同名，方便找到要打包的包的package.json文件，以及拼接输出目录地址dist
// 开发环境下，一般只打包packages/下的一个包，这样可以加快打包速度，我们对文件的修改马上就能看到结果；
const target = args._[0] || 'reactivity';
const format = args.f || 'global';
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));
const outputFormat = format.startsWith('global')// 输出的格式，值为esbuild支持的配置项
  ? 'iife'
  : format === 'cjs'
    ? 'cjs'
    : 'esm'
const outfile = resolve( // 输出的文件
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
)
build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  bundle: true, // 把所有的包打包到一起
  sourcemap: true,
  format: outputFormat,// iife|cjs|esm
  globalName: pkg.buildOptions?.name,
  platform: format === 'cjs' ? 'node' : 'browser',
  watch: { // 监控文件变化
    onRebuild(error) {
      if (!error) console.log(`rebuilt~~~~`)
    }
  }
}).then(() => {
  console.log('watching~~~')
})
```

```
build配置选项中，指定了：
```

```
入口；
```

```
打包后的文件路径和文件名；
```

```
产生的代码的模块格式类型；
```

```
代码运行的平台；
```

```
如果打包成iife格式，全局的变量名是什么；
```

```
输入pnpm run dev进行打包，速度非常快，适合开发环境中使用：
```

```
打包后的文件：
```

```
packages/reactivity/dist/reactivity.global.js
var VueReactivity = (() => {
})();
//# sourceMappingURL=reactivity.global.js.map
其中的 var VueReactivity正是我们配置的globalName，也是packages/reactivity/package.json中buildOptions中配置的name选项；
我们在修改代码的时候，esbuild会立即进行打包，速度非常快：
var VueReactivity = (() => {
  // packages/shared/src/index.ts
  var isObject = (arg) => {
    return arg && typeof arg === "object";
  };
  // packages/reactivity/src/index.ts
  console.log(isObject({}));
})();
//# sourceMappingURL=reactivity.global.js.map
```

:::
