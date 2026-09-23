import{_ as l,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"runtime-core-src-vnode.ts","description":"围绕“runtime-core-src-vnode.ts”整理的概念、示例与实践笔记。","frontmatter":{"title":"runtime-core-src-vnode.ts","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“runtime-core-src-vnode.ts”整理的概念、示例与实践笔记。","sidebarWeight":37,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/patchElement/runtime-core-src-vnode.ts.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-vnode.ts.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-vnode.ts.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-vnode.ts.md"};function c(i,e,r,o,u,d){return a(),p("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"runtime-core-src-vnode-ts",tabindex:"-1"},[s("runtime-core-src-vnode.ts "),n("a",{class:"header-anchor",href:"#runtime-core-src-vnode-ts","aria-label":'Permalink to "runtime-core-src-vnode.ts"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“runtime-core-src-vnode.ts”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { isArray, isString, ShapeFlags } from "@vue/shared";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export const Text = Symbol('Text')")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function isVnode(value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return !!(value && value.__v_isVnode)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function isSameVnode(n1, n2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 要求是标签名和key都相等")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (n1.type === n2.type) && (n1.key === n2.key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function createVnode(type, props, children = null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 虚拟节点类型ShapeFlags：组件、元素、文本；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 1为元素，其它为0，1和0均当作二进制数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const vnode = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    children,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el: null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    key: props?.['key'],")]),s(`
`),n("span",{class:"line"},[n("span",null,"    __v_isVnode: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    shapeFlag")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 为ShapeFlags加上children标识")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (children) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 默认为0，即不影响原ShapFlags类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let type = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // children不是数组，就是文本；或是默认值null")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isArray(children)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type = ShapeFlags.ARRAY_CHILDREN;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 是否考虑null值？")]),s(`
`),n("span",{class:"line"},[n("span",null,"      children = String(children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      type = ShapeFlags.TEXT_CHILDREN;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    vnode.shapeFlag |= type")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return vnode")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=l(t,[["render",c]]);export{m as __pageData,v as default};
