import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"生产环境rollup打包","description":"围绕“生产环境rollup打包”整理的概念、示例与实践笔记。","frontmatter":{"title":"生产环境rollup打包","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“生产环境rollup打包”整理的概念、示例与实践笔记。","sidebarWeight":114,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/生产环境rollup打包.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/生产环境rollup打包.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/生产环境rollup打包.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/生产环境rollup打包.md"};function t(u,l,c,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"生产环境rollup打包",tabindex:"-1"},[s("生产环境rollup打包 "),n("a",{class:"header-anchor",href:"#生产环境rollup打包","aria-label":'Permalink to "生产环境rollup打包"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“生产环境rollup打包”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==rollup.config.js==")]),s(`
`),n("span",{class:"line"},[n("span",null,"import path from 'path';")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 获取packages目录")]),s(`
`),n("span",{class:"line"},[n("span",null,"const packagesDir = path.resolve(__dirname, 'packages');")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 获取对应的模块")]),s(`
`),n("span",{class:"line"},[n("span",null,"const packageDir = path.resolve(packagesDir, process.env.TARGET);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 全部以打包目录来解析文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"const resolve = p => path.resolve(packageDir, p);")]),s(`
`),n("span",{class:"line"},[n("span",null,"const pkg = require(resolve('package.json'));")]),s(`
`),n("span",{class:"line"},[n("span",null,"const name = path.basename(packageDir); // 获取包的名字")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 配置打包信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"const outputConfigs = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'esm-bundler': {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    file: resolve(`dist/${name}.esm-bundler.js`),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    format: 'es'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  cjs: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    file: resolve(`dist/${name}.cjs.js`),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    format: 'cjs'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  global: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    file: resolve(`dist/${name}.global.js`),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    format: 'iife'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 获取formats")]),s(`
`),n("span",{class:"line"},[n("span",null,"const packageFormats = process.env.FORMATS && process.env.FORMATS.split(',');")]),s(`
`),n("span",{class:"line"},[n("span",null,"const packageConfigs = packageFormats || pkg.buildOptions.formats;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import json from '@rollup/plugin-json'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import commonjs from '@rollup/plugin-commonjs';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { nodeResolve } from '@rollup/plugin-node-resolve'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import tsPlugin from 'rollup-plugin-typescript2'")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createConfig(format, output) {")]),s(`
`),n("span",{class:"line"},[n("span",null," // rollup打output配置比较多样")]),s(`
`),n("span",{class:"line"},[n("span",null,"  output.sourcemap = process.env.SOURCE_MAP;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  output.exports = 'named';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let external = []")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (format === 'global') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    output.name = pkg.buildOptions.name")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else { // cjs/esm 不需要打包依赖文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"    external = [...Object.keys(pkg.dependencies || {})]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    input: resolve('src/index.ts'),")]),s(`
`),n("span",{class:"line"},[n("span",null,"    output,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    external,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    plugins: [")]),s(`
`),n("span",{class:"line"},[n("span",null,"      json(),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      tsPlugin(),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      commonjs(),")]),s(`
`),n("span",{class:"line"},[n("span",null,"      nodeResolve()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 开始打包把")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default packageConfigs.map(format => createConfig(format, outputConfigs[format]));")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==#====build.js==")]),s(`
`),n("span",{class:"line"},[n("span",null,"const fs = require('fs');")]),s(`
`),n("span",{class:"line"},[n("span",null,"const execa = require('execa')")]),s(`
`),n("span",{class:"line"},[n("span",null,"const targets = fs.readdirSync('packages').filter(f => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!fs.statSync(`packages/${f}`).isDirectory()) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"async function runParallel(source, iteratorFn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const ret = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (const item of source) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const p = Promise.resolve().then(() => iteratorFn(item))")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ret.push(p);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return Promise.all(ret)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"async function build(target) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  await execa(")]),s(`
`),n("span",{class:"line"},[n("span",null,"    'rollup',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    [")]),s(`
`),n("span",{class:"line"},[n("span",null,"      '-c',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      '--environment',")]),s(`
`),n("span",{class:"line"},[n("span",null,"      `TARGET:${target}`")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    { stdio: 'inherit' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"runParallel(targets, build)")])])])])],-1)])])}const f=a(i,[["render",t]]);export{g as __pageData,f as default};
