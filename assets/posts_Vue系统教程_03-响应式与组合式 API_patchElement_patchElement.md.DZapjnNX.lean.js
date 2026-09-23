import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"patchElement","description":"围绕“patchElement”整理的概念、示例与实践笔记。","frontmatter":{"title":"patchElement","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“patchElement”整理的概念、示例与实践笔记。","sidebarWeight":34,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/patchElement/patchElement.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/patchElement.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/patchElement.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/patchElement/patchElement.md"};function i(c,s,o,r,u,d){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"patchelement",tabindex:"-1"},[e("patchElement "),n("a",{class:"header-anchor",href:"#patchelement","aria-label":'Permalink to "patchElement"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“patchElement”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<head>")]),e(`
`),n("span",{class:"line"},[n("span",null,'  <meta charset="UTF-8">')]),e(`
`),n("span",{class:"line"},[n("span",null,'  <meta http-equiv="X-UA-Compatible" content="IE=edge">')]),e(`
`),n("span",{class:"line"},[n("span",null,'  <meta name="viewport" content="width=device-width, initial-scale=1.0">')]),e(`
`),n("span",{class:"line"},[n("span",null,"  <title>Document</title>")]),e(`
`),n("span",{class:"line"},[n("span",null,"</head>")]),e(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),e(`
`),n("span",{class:"line"},[n("span",null,'  <div id="app"></div>')]),e(`
`),n("span",{class:"line"},[n("span",null,'  <script src="./runtime-dom.global.js"><\/script>')]),e(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),e(`
`),n("span",{class:"line"},[n("span",null,"    let { createRenderer, h, render, Text } = VueRuntimeDOM")]),e(`
`),n("span",{class:"line"},[n("span",null,"    render(h('h1', { style: { color: 'red' } }, '1111'), app);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    setTimeout(() => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      render(h('h1', { style: { color: 'blue', background: 'red' } }, '1111'), app);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }, 1000)")]),e(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),e(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),e(`
`),n("span",{class:"line"},[n("span",null,"</html>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"runtime-dom/package.json")]),e(`
`),n("span",{class:"line"},[n("span",null,"{")]),e(`
`),n("span",{class:"line"},[n("span",null,'  "name": "@vue/runtime-dom",')]),e(`
`),n("span",{class:"line"},[n("span",null,'  "version": "1.0.0",')]),e(`
`),n("span",{class:"line"},[n("span",null,'  "description": "",')]),e(`
`),n("span",{class:"line"},[n("span",null,'  "main": "index.js",')]),e(`
`),n("span",{class:"line"},[n("span",null,'  "buildOptions": {')]),e(`
`),n("span",{class:"line"},[n("span",null,'    "name": "VueRuntimeDOM",')]),e(`
`),n("span",{class:"line"},[n("span",null,'    "formats": [')]),e(`
`),n("span",{class:"line"},[n("span",null,'      "cjs",')]),e(`
`),n("span",{class:"line"},[n("span",null,'      "esm-bundler",')]),e(`
`),n("span",{class:"line"},[n("span",null,'      "global"')]),e(`
`),n("span",{class:"line"},[n("span",null,"    ]")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"runtime-dom/src/index.ts")]),e(`
`),n("span",{class:"line"},[n("span",null,'import { createRenderer } from "@vue/runtime-core";')]),e(`
`),n("span",{class:"line"},[n("span",null,'import { nodeOps } from "./nodeOps";')]),e(`
`),n("span",{class:"line"},[n("span",null,'import { patchProp } from "./patchProp";')]),e(`
`),n("span",{class:"line"},[n("span",null,"const renderOptions = Object.assign(nodeOps, { patchProp }); export function render(vnode, container) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 在创建渲染器的时候 传入选项")]),e(`
`),n("span",{class:"line"},[n("span",null,"  createRenderer(renderOptions).render(vnode, container)")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,'export * from "@vue/runtime-core"')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"runtime-core/src/index.ts")]),e(`
`),n("span",{class:"line"},[n("span",null,"export { createRenderer } from './renderer'")]),e(`
`),n("span",{class:"line"},[n("span",null,"export { h } from './h'")]),e(`
`),n("span",{class:"line"},[n("span",null,"export * from './vnode'")])])])])],-1)])])}const v=l(p,[["render",i]]);export{h as __pageData,v as default};
