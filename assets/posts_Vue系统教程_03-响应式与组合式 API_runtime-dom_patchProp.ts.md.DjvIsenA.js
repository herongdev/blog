import{_ as n,o as a,c as t,j as s,a as e}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"patchProp.ts","description":"围绕“patchProp.ts”整理的概念、示例与实践笔记。","frontmatter":{"title":"patchProp.ts","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“patchProp.ts”整理的概念、示例与实践笔记。","sidebarWeight":43,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/patchProp.ts.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/patchProp.ts.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/patchProp.ts.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/patchProp.ts.md"};function o(c,l,r,i,u,d){return a(),t("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"patchprop-ts",tabindex:"-1"},[e("patchProp.ts "),s("a",{class:"header-anchor",href:"#patchprop-ts","aria-label":'Permalink to "patchProp.ts"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“patchProp.ts”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"// dom属性的操作api")]),e(`
`),s("span",{class:"line"},[s("span",null,'import { patchAttr } from "./modules/attr";')]),e(`
`),s("span",{class:"line"},[s("span",null,'import { patchClass } from "./modules/class";')]),e(`
`),s("span",{class:"line"},[s("span",null,'import { patchEvent } from "./modules/event";')]),e(`
`),s("span",{class:"line"},[s("span",null,'import { patchStyle } from "./modules/style";')]),e(`
`),s("span",{class:"line"},[s("span",null,"// null->值：添加属性")]),e(`
`),s("span",{class:"line"},[s("span",null,"// 值->值：修改属性")]),e(`
`),s("span",{class:"line"},[s("span",null,"// 值->null：删除属性")]),e(`
`),s("span",{class:"line"},[s("span",null,"export function patchProp(el, key, prevValue, nextValue) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"  // 类名  el.className")]),e(`
`),s("span",{class:"line"},[s("span",null,"  if (key === 'class') {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    patchClass(el, nextValue)")]),e(`
`),s("span",{class:"line"},[s("span",null,`    // el  style {color:'red',fontSzie:'12'}  {color:'blue',background:"red"}`)]),e(`
`),s("span",{class:"line"},[s("span",null,"  } else if (key === 'style') {// 样式  el.style")]),e(`
`),s("span",{class:"line"},[s("span",null,"    patchStyle(el, prevValue, nextValue)")]),e(`
`),s("span",{class:"line"},[s("span",null,"  } else if (/^on[^a-z]/.test(key)) {  // events  addEventListener")]),e(`
`),s("span",{class:"line"},[s("span",null,"    patchEvent(el, key, nextValue);")]),e(`
`),s("span",{class:"line"},[s("span",null,"  } else { // 普通属性 // el.setAttribute")]),e(`
`),s("span",{class:"line"},[s("span",null,"    patchAttr(el, key, nextValue);")]),e(`
`),s("span",{class:"line"},[s("span",null,"  }")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])])],-1)])])}const f=n(p,[["render",o]]);export{m as __pageData,f as default};
