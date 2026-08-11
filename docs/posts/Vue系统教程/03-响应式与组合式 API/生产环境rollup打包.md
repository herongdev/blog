---
title: "生产环境rollup打包"
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
description: "围绕“生产环境rollup打包”整理的概念、示例与实践笔记。"
sidebarWeight: 114
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/生产环境rollup打包.md"
---
::: v-pre

# 生产环境rollup打包

> 本节目标：理解“生产环境rollup打包”的核心思路，并能把它用于实际开发或面试表达。
```
==rollup.config.js==
import path from 'path';
// 获取packages目录
const packagesDir = path.resolve(__dirname, 'packages');
// 获取对应的模块
const packageDir = path.resolve(packagesDir, process.env.TARGET);
// 全部以打包目录来解析文件
const resolve = p => path.resolve(packageDir, p);
const pkg = require(resolve('package.json'));
const name = path.basename(packageDir); // 获取包的名字
// 配置打包信息
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  }
}
// 获取formats
const packageFormats = process.env.FORMATS && process.env.FORMATS.split(',');
const packageConfigs = packageFormats || pkg.buildOptions.formats;
```

```
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import tsPlugin from 'rollup-plugin-typescript2'
function createConfig(format, output) {
 // rollup打output配置比较多样
  output.sourcemap = process.env.SOURCE_MAP;
  output.exports = 'named';
  let external = []
  if (format === 'global') {
    output.name = pkg.buildOptions.name
  } else { // cjs/esm 不需要打包依赖文件
    external = [...Object.keys(pkg.dependencies || {})]
  }
  return {
    input: resolve('src/index.ts'),
    output,
    external,
    plugins: [
      json(),
      tsPlugin(),
      commonjs(),
      nodeResolve()
    ]
  }
}
// 开始打包把
export default packageConfigs.map(format => createConfig(format, outputConfigs[format]));
```

```
==#====build.js==
const fs = require('fs');
const execa = require('execa')
const targets = fs.readdirSync('packages').filter(f => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false;
  }
  return true;
});
async function runParallel(source, iteratorFn) {
  const ret = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item))
    ret.push(p);
  }
  return Promise.all(ret)
}
async function build(target) {
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      `TARGET:${target}`
    ],
    { stdio: 'inherit' }
  )
}
runParallel(targets, build)
```

:::
