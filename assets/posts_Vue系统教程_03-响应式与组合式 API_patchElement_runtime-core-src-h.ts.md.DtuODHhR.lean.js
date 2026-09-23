import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"runtime-core-src-h.ts","description":"围绕“runtime-core-src-h.ts”整理的概念、示例与实践笔记。","frontmatter":{"title":"runtime-core-src-h.ts","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“runtime-core-src-h.ts”整理的概念、示例与实践笔记。","sidebarWeight":35,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/patchElement/runtime-core-src-h.ts.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-h.ts.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-h.ts.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-h.ts.md"};function r(t,l,c,o,u,h){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"runtime-core-src-h-ts",tabindex:"-1"},[s("runtime-core-src-h.ts "),n("a",{class:"header-anchor",href:"#runtime-core-src-h-ts","aria-label":'Permalink to "runtime-core-src-h.ts"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“runtime-core-src-h.ts”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"h方法在内部调vnode中的createVnode方法，创建虚拟dom，即返回一个对象；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"h方法是给用户来用的 具备着多样性：")]),s(`
`),n("span",{class:"line"},[n("span",null,`h('div', { style: { "color"：“red” } }, 'hello')`)]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', 'hello')")]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', null, 'hello', 'world')")]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', null, h('span'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', null, [h('span')])")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { isArray, isObject } from "@vue/shared";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { createVnode, isVnode } from "./vnode";')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第二个参数之后的都为children")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function h(type, propsOrChildren, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const l = arguments.length;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (l === 2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // isObject则可能是对象、函数或数组，如果不是数组，就是函数或对象了")]),s(`
`),n("span",{class:"line"},[n("span",null,`      // h('div',{style:{"color":'red'}})`)]),s(`
`),n("span",{class:"line"},[n("span",null,"      // h('div',h('span'))，h调用返回一个对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // h方法返回的vnode或属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (isVnode(propsOrChildren)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 虚拟节点就包装成数组，即当成子元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return createVnode(type, null, [propsOrChildren])")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return createVnode(type, propsOrChildren); // 属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 包含了!isObject()&&!isArray 和 isObject&&isArray的情况，则")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 一、是文本： h('div','hello')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 二、是数组： h('div',[h('span'),h('span')])，数组元素可以是文本或h调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"   //  所以属性值为null")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return createVnode(type, null, propsOrChildren); // 是数组或文本")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (l > 3) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      children = Array.from(arguments).slice(2)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (l === 3 && isVnode(children)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // h('div,{}',h('span'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      children = [children]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 其他")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // children的情况有两种 文本 / 数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return createVnode(type, propsOrChildren, children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=e(i,[["render",r]]);export{m as __pageData,v as default};
