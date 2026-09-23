import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"h","description":"围绕“h”整理的概念、示例与实践笔记。","frontmatter":{"title":"h","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“h”整理的概念、示例与实践笔记。","sidebarWeight":42,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/runtime-dom/h.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/h.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/h.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/runtime-dom/h.md"};function r(t,l,c,u,o,d){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"h",tabindex:"-1"},[s("h "),n("a",{class:"header-anchor",href:"#h","aria-label":'Permalink to "h"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“h”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"h方法是给用户来用的 具备着多样性：")]),s(`
`),n("span",{class:"line"},[n("span",null,`h('div', { style: { "color"：“red” } }, 'hello')`)]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', 'hello')")]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', null, 'hello', 'world')")]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', null, h('span'))")]),s(`
`),n("span",{class:"line"},[n("span",null,"h('div', null, [h('span')])")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { isArray, isObject } from "@vue/shared";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { createVnode, isVnode } from "./vnode";')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第三个参数之后的都为children")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function h(type, propsOrChildren, children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const l = arguments.length;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (l === 2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 为什么要将儿子包装成数组， 因为元素可以循环创建。 文本不需要包装了")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // isObject则可能是对象、函数或数组")]),s(`
`),n("span",{class:"line"},[n("span",null,`      // h('div',{style:{"color":'red'}})`)]),s(`
`),n("span",{class:"line"},[n("span",null,"      // h('div',h('span'))，h调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 虚拟节点或属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (isVnode(propsOrChildren)) { // 虚拟节点就包装成数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return createVnode(type, null, [propsOrChildren])")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return createVnode(type, propsOrChildren); // 属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 包含了!isObject()&&!isArray 和 isObject&&isArray的情况")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // h('div','hello'),文本")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // h('div',[h('span'),h('span')])，数组，数组元素可以是文本或h调用")]),s(`
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
